import "server-only";

import { createAI, createStreamableUI, getMutableAIState } from "ai/rsc";
import OpenAI from "openai";

import {
  spinner,
  BotCard,
  BotMessage,
  SystemMessage,
  Stocks,
} from "@/components/llm-stocks";

import {
  runAsyncFnWithoutBlocking,
  sleep,
  formatNumber,
  runOpenAICompletion,
} from "@/lib/utils";
import { z } from "zod";
import { StocksSkeleton } from "@/components/llm-stocks/stocks-skeleton";
import SimpleMap from "@/components/llm-map";
import Origin from "@/components/llm-origin";
import Materials from "@/components/llm-materials";
import { messageRateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

async function confirmPurchase(symbol: string, price: number, amount: number) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  const purchasing = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
      <p className="mb-2">
        Purchasing {amount} ${symbol}...
      </p>
    </div>
  );

  const systemMessage = createStreamableUI(null);

  runAsyncFnWithoutBlocking(async () => {
    // You can update the UI at any point.
    await sleep(1000);

    purchasing.update(
      <div className="inline-flex items-start gap-1 md:items-center">
        {spinner}
        <p className="mb-2">
          Purchasing {amount} ${symbol}... working on it...
        </p>
      </div>
    );

    await sleep(1000);

    purchasing.done(
      <div>
        <p className="mb-2">
          You have successfully purchased {amount} ${symbol}. Total cost:{" "}
          {formatNumber(amount * price)}
        </p>
      </div>
    );

    systemMessage.done(
      <SystemMessage>
        You have purchased {amount} shares of {symbol} at ${price}. Total cost ={" "}
        {formatNumber(amount * price)}.
      </SystemMessage>
    );

    aiState.done([
      ...aiState.get(),
      {
        role: "system",
        content: `[User has purchased ${amount} shares of ${symbol} at ${price}. Total cost = ${
          amount * price
        }]`,
      },
    ]);
  });

  return {
    purchasingUI: purchasing.value,
    newMessage: {
      id: Date.now(),
      display: systemMessage.value,
    },
  };
}

async function submitUserMessage(content: string) {
  "use server";

  const reply = createStreamableUI(
    <BotMessage className="items-center">{spinner}</BotMessage>
  );

  const ip = headers().get("x-real-ip") ?? "local";
  const rl = await messageRateLimit.limit(ip);

  if (!rl.success) {
    reply.done(
      <BotMessage>Rate limit exceeded. Try again in 1 minute.</BotMessage>
    );
    return {
      id: Date.now(),
      display: reply.value,
    };
  }

  const aiState = getMutableAIState<typeof AI>();
  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content,
    },
  ]);

  const completion = runOpenAICompletion(openai, {
    model: "gpt-4-turbo-preview",
    response_format: { type: "text" },
    stream: true,
    messages: [
      {
        role: "system",
        content: `\
You are a friendly sustainability assistant for college students in Taiwan and you can help students with sustainable shopping, saving and investing, step by step. Your goal is to help students better understand how using their money supports companies.

Your should respond to the user briefly both in English and Chinese using traditional characters. Even if the question is in Chinese, always provide also an English answer. If the question is in English, also provide a Chinese answer.
You and the user can discuss stock prices and the user can adjust the amount of stocks they want to buy, or place an order, in the UI.
You can show a map of sustainable companies in the area.
You can show a map where the user can purchase sustainable products or repair their clothes.

You can show the product origin visually,
You can show the product materials visually,

Messages inside [] means that it's a UI element or a user event. For example:
- "[Price of AAPL = 100]" means that an interface of the stock price of AAPL is shown to the user.
- "[User has changed the amount of AAPL to 10]" means that the user has changed the amount of AAPL to 10 in the UI.

If you want to show sustainable stocks, call \`list_stocks\`.
If you want to show a map, call \`show_map\`.
If you want to show the product origin, call \`show_product_origin\`.
If you want to show the product materials, call \`show_product_materials\`.

Complement function calls with text responses from your own data.
If the user wants to complete an impossible task, respond that you are an AI and cannot do that.`,
      },
      ...aiState.get().map((info: any) => ({
        role: info.role,
        content: info.content,
        name: info.name,
      })),
    ],
    functions: [
      {
        name: "list_stocks",
        description: "List three sustainable stocks that are trending.",
        parameters: z.object({
          stocks: z.array(
            z.object({
              symbol: z.string().describe("The symbol of the stock"),
              price: z.number().describe("The price of the stock"),
              delta: z.number().describe("The change in price of the stock"),
            })
          ),
        }),
      },
      {
        name: "show_map",
        description: "Show map with results",
        parameters: z.object({}),
      },
      {
        name: "show_product_origin",
        description: "Show product origin",
        parameters: z.object({}),
      },
      {
        name: "show_product_materials",
        description: "Show product materials",
        parameters: z.object({}),
      },
    ],
    temperature: 0,
  });

  completion.onTextContent((content: string, isFinal: boolean) => {
    reply.update(<BotMessage>{content}</BotMessage>);
    if (isFinal) {
      reply.done();
      aiState.done([...aiState.get(), { role: "assistant", content }]);
    }
  });

  completion.onFunctionCall("list_stocks", async ({ stocks }) => {
    reply.update(
      <BotCard>
        <StocksSkeleton />
      </BotCard>
    );

    await sleep(1000);

    reply.done(
      <BotCard>
        <Stocks stocks={stocks} />
      </BotCard>
    );

    aiState.done([
      ...aiState.get(),
      {
        role: "function",
        name: "list_stocks",
        content: JSON.stringify(stocks),
      },
    ]);
  });

  completion.onFunctionCall("show_map", async () => {
    reply.update(<SimpleMap />);

    await sleep(500);

    reply.done(<SimpleMap />);

    aiState.done([
      ...aiState.get(),
      {
        role: "function",
        name: "show_map",
        content: "",
      },
    ]);
  });

  completion.onFunctionCall("show_product_origin", async () => {
    reply.update(<Origin />);

    await sleep(500);

    reply.done(<Origin />);

    aiState.done([
      ...aiState.get(),
      {
        role: "function",
        name: "show_product_origin",
        content: "",
      },
    ]);
  });

  completion.onFunctionCall("show_product_materials", async () => {
    reply.update(<Materials />);

    await sleep(500);

    reply.done(<Materials />);

    aiState.done([
      ...aiState.get(),
      {
        role: "function",
        name: "show_product_materials",
        content: "",
      },
    ]);
  });

  return {
    id: Date.now(),
    display: reply.value,
  };
}

// Define necessary types and create the AI.

const initialAIState: {
  role: "user" | "assistant" | "system" | "function";
  content: string;
  id?: string;
  name?: string;
}[] = [];

const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    submitUserMessage,
    confirmPurchase,
  },
  initialUIState,
  initialAIState,
});
