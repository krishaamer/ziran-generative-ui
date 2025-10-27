import "server-only";

import { createAI, createStreamableUI, getMutableAIState } from "ai/rsc";
import { kv } from "@vercel/kv";
import OpenAI from "openai";
import { Skeleton } from "@/components/ui/skeleton";
import { BotMessage } from "@/components/shared/message";
import { sleep, runOpenAICompletion } from "@/lib/utils";
import { z } from "zod";
import SimpleMap from "@/components/llm-map";
import Balance from "@/components/llm-balance";
import Passport from "@/components/llm-passport";
import Personal from "@/components/llm-personal";
import { LoginScreen } from "@/components/llm-login";
import Factories from "@/components/llm-factories";
import Pigs from "@/components/llm-pigs";
import Origin from "@/components/llm-origin";
import Analyst from "@/components/llm-analyst";
import Materials from "@/components/llm-materials";
import { messageRateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const fetchStockData = async (ticker: string) => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const fromDate = threeMonthsAgo.toISOString().split("T")[0];
  const toDate = new Date().toISOString().split("T")[0]; // Today's date

  try {
    const h = headers();
    const host = h.get("x-forwarded-host") || h.get("host");
    const protocol = h.get("x-forwarded-proto") || "http";
    const origin = host ? `${protocol}://${host}` : "";

    const url = origin
      ? `${origin}/api/polygon?symbol=${ticker}&from=${fromDate}&to=${toDate}`
      : `/api/polygon?symbol=${ticker}&from=${fromDate}&to=${toDate}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    if (
      (json.status === "OK" || json.status === "DELAYED") &&
      Array.isArray(json.results)
    ) {
      return json.results;
    } else {
      console.log("Error fetching stock data:", json);
    }
  } catch (error) {
    console.log("Error fetching stock data:", error);
  }

  return false; 
};

async function submitUserMessage(content: string) {
  "use server";

  const reply = createStreamableUI(
    <BotMessage className="items-center">
      <Skeleton className="h-[25px] w-full rounded-lg" />
    </BotMessage>
  );

  const ip = headers().get("x-real-ip") ?? "local";
  const rl = await messageRateLimit.limit(ip);

  if (!rl.success) {
    reply.done(
      <BotMessage animated={false}>Rate limit exceeded. Try again in 1 minute.</BotMessage>
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

  const clientData = await kv.get("userData");
  const investingData = await kv.get("investingData");
  const brandsData = await kv.get("brandsData");

  const completion = runOpenAICompletion(openai, {
    model: "gpt-4o",
    response_format: { type: "text" },
    stream: true,
    messages: [
      {
        role: "system",
        content: `\
You are a friendly sustainability assistant for college students in Taiwan and you can help students with sustainable shopping, saving and investing, step by step. Your goal is to help students better understand how using their money supports companies. Think very carefully.

Your should respond to the user briefly in Chinese using traditional characters. Even if the question is in English, provide an answer in Chinese.
You and the user can discuss stock prices and the user can adjust the amount of stocks they want to buy, or place an order, in the UI.
You can show a map of sustainable companies in the area.
You can show a map of factories in the area to help the user understand where the product come from.
You can show a map of pig factories in Taiwan that produce pork as well images of pigs.
You can show a map where the user can purchase sustainable products or repair their clothes.
You can teach the user how to be more environmentally friendly by using the data they have shared such as the brands they bought before and offer personalized suggestions.
You can show the product origin visually.
You can show the product materials visually.
You can create comparison tables using markdown.
You can invent ESG scores for companies based on fictional sustainability reports.
You can save personal user data to be later used.
You can show the user digital product passports with made up information.
You can allow the user log in.
You can show the user their account balance.
You can calculate the likely distance a product has traveled to reach the user.
You can tell the user about the history of a stock and how it's performed over the years. Include info abuout their product lines and how sustainable are their products. Make a table.
You can compare the product to other similar products and provide more sustainable alternatives.
You can show a digital product passport that details the ESG data of this product.

If you want to show stock history for a particular stock, call \`stock_history\`.
If you want to show a map, call \`show_map\`.
If you want to show the product origin, call \`show_product_origin\`.
If you want to show the product materials, call \`show_product_materials\`.
If you want to show factories, call \`show_factories\`.
If you want to show pigs or pork factories, call \`show_pigs\`.
If you want to show personal data saving form, call \`show_personal\`.
If you want to show user login form, call \`show_login\`.
If you want to show user their account balance, call \`show_balance\`.
If you want to show user the digital product passport which shows product ESG, call \`show_passport\`.

The user requests for these functions may be in Chinese.
Address the user in a friendly tone and in Chinese and use more informal words.
The user is from generation-z in the their early 20s.
Complement function calls with text responses from your own data.

Here is some user data you can use to personalize your responses and offer specific advice:
${clientData}

The user has previously bought products from the following brands: ${brandsData}

The user has previously invested in the following companies: ${investingData}
`,
      },
      ...aiState.get().map((info: any) => ({
        role: info.role,
        content: info.content,
        name: info.name,
      })),
    ],
    functions: [
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
      {
        name: "show_factories",
        description: "Show factories",
        parameters: z.object({}),
      },
      {
        name: "show_pigs",
        description: "Show pigs",
        parameters: z.object({}),
      },
      {
        name: "stock_history",
        description: "Stock history",
        parameters: z.object({
          ticker: z.string().describe("The symbol of the stock"),
        }),
      },
      {
        name: "show_personal",
        description: "Show personal",
        parameters: z.object({}),
      },
      {
        name: "show_login",
        description: "Show login",
        parameters: z.object({}),
      },
      {
        name: "show_balance",
        description: "Show balance",
        parameters: z.object({}),
      },
      {
        name: "show_passport",
        description: "Show passport",
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

  completion.onFunctionCall("stock_history", async ({ ticker }) => {
    reply.update(<BotMessage>加載股票歷史數據中...</BotMessage>);

    const stockData = await fetchStockData(ticker);
    const content = JSON.stringify(stockData);

    reply.done(<Analyst stockData={stockData} ticker={ticker} />);

    aiState.done([
      ...aiState.get(),
      {
        role: "function",
        name: "stock_history",
        content,
      },
    ]);
  });

  completion.onFunctionCall("show_personal", async () => {
    reply.update(<BotMessage>Loading personal data..</BotMessage>);

    await sleep(500);

    reply.done(<Personal />);

    aiState.done([
      ...aiState.get(),
      {
        role: "function",
        name: "show_personal",
        content: "",
      },
    ]);
  });

  completion.onFunctionCall("show_login", async () => {
    reply.update(<LoginScreen />);
    reply.done(<LoginScreen />);

    aiState.done([
      ...aiState.get(),
      {
        role: "function",
        name: "show_login",
        content: "",
      },
    ]);
  });

  completion.onFunctionCall("show_map", async () => {
    reply.update("Getting map...");

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

  completion.onFunctionCall("show_balance", async () => {
    reply.update("Getting your account balance...");

    await sleep(500);

    reply.done(<Balance />);

    aiState.done([
      ...aiState.get(),
      {
        role: "function",
        name: "show_balance",
        content: "",
      },
    ]);
  });

  completion.onFunctionCall("show_passport", async () => {
    reply.update("Getting your digital product passport..");

    await sleep(500);

    reply.done(<Passport />);

    aiState.done([
      ...aiState.get(),
      {
        role: "function",
        name: "show_passport",
        content: "",
      },
    ]);
  });

  completion.onFunctionCall("show_factories", async () => {
    reply.update("尋找工廠...");

    await sleep(500);

    reply.done(<Factories />);

    aiState.done([
      ...aiState.get(),
      {
        role: "function",
        name: "show_factories",
        content: "",
      },
    ]);
  });

  completion.onFunctionCall("show_pigs", async () => {
    reply.update("尋找工廠...");

    await sleep(500);

    reply.done(<Pigs />);

    aiState.done([
      ...aiState.get(),
      {
        role: "function",
        name: "show_pigs",
        content: "",
      },
    ]);
  });

  completion.onFunctionCall("show_product_origin", async () => {
    reply.update("Getting product origin...");

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
    reply.update("Getting product materials...");

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
  },
  initialUIState,
  initialAIState,
});
