import "server-only";

import { createAI, createStreamableUI, getMutableAIState } from "ai/rsc";
import { kv } from "@vercel/kv";
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
import Personal from "@/components/llm-personal";
import LoginScreen from "@/components/llm-login";
import Factories from "@/components/llm-factories";
import Origin from "@/components/llm-origin";
import Materials from "@/components/llm-materials";
import { messageRateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const stockData = {
  ticker: "KO",
  queryCount: 68,
  resultsCount: 68,
  adjusted: true,
  results: [
    {
      v: 13218008,
      vw: 60.2579,
      o: 60.08,
      c: 60.39,
      h: 60.46,
      l: 59.87,
      t: 1705035600000,
      n: 114601,
    },
    {
      v: 11826910,
      vw: 60.0678,
      o: 60.39,
      c: 59.99,
      h: 60.43,
      l: 59.85,
      t: 1705381200000,
      n: 136795,
    },
    {
      v: 8982132,
      vw: 59.9845,
      o: 59.86,
      c: 59.99,
      h: 60.21,
      l: 59.82,
      t: 1705467600000,
      n: 105092,
    },
    {
      v: 10397682,
      vw: 59.9569,
      o: 59.69,
      c: 60.16,
      h: 60.23,
      l: 59.525,
      t: 1705554000000,
      n: 106150,
    },
    {
      v: 14392600,
      vw: 59.8843,
      o: 60.26,
      c: 59.83,
      h: 60.28,
      l: 59.64,
      t: 1705640400000,
      n: 116642,
    },
    {
      v: 14314265,
      vw: 59.6578,
      o: 59.755,
      c: 59.57,
      h: 60.065,
      l: 59.44,
      t: 1705899600000,
      n: 129319,
    },
    {
      v: 14481643,
      vw: 59.8063,
      o: 59.53,
      c: 59.85,
      h: 60,
      l: 59.46,
      t: 1705986000000,
      n: 115208,
    },
    {
      v: 16370484,
      vw: 59.215,
      o: 59.8,
      c: 58.91,
      h: 59.81,
      l: 58.89,
      t: 1706072400000,
      n: 134332,
    },
    {
      v: 14899712,
      vw: 59.0022,
      o: 59.01,
      c: 59.16,
      h: 59.17,
      l: 58.66,
      t: 1706158800000,
      n: 128352,
    },
    {
      v: 13025072,
      vw: 59.3361,
      o: 59.25,
      c: 59.37,
      h: 59.49,
      l: 59.125,
      t: 1706245200000,
      n: 109480,
    },
    {
      v: 14547070,
      vw: 59.5373,
      o: 59.34,
      c: 59.73,
      h: 59.79,
      l: 59.17,
      t: 1706504400000,
      n: 114989,
    },
    {
      v: 22061536,
      vw: 59.7761,
      o: 59.85,
      c: 59.9,
      h: 60.02,
      l: 59.445,
      t: 1706590800000,
      n: 116891,
    },
    {
      v: 22836998,
      vw: 59.6867,
      o: 60.1,
      c: 59.49,
      h: 60.45,
      l: 59.29,
      t: 1706677200000,
      n: 147557,
    },
    {
      v: 15870884,
      vw: 60.5995,
      o: 59.57,
      c: 60.98,
      h: 61.005,
      l: 59.36,
      t: 1706763600000,
      n: 138379,
    },
    {
      v: 17269006,
      vw: 60.5535,
      o: 60.82,
      c: 60.54,
      h: 60.87,
      l: 60.23,
      t: 1706850000000,
      n: 141453,
    },
    {
      v: 12759569,
      vw: 60.0911,
      o: 60.38,
      c: 60.04,
      h: 60.38,
      l: 59.88,
      t: 1707109200000,
      n: 120641,
    },
    {
      v: 12777150,
      vw: 59.883,
      o: 59.96,
      c: 59.94,
      h: 60.05,
      l: 59.68,
      t: 1707195600000,
      n: 113017,
    },
    {
      v: 10259892,
      vw: 60.0425,
      o: 60.07,
      c: 59.99,
      h: 60.21,
      l: 59.94,
      t: 1707282000000,
      n: 100718,
    },
    {
      v: 12874761,
      vw: 59.7321,
      o: 59.89,
      c: 59.83,
      h: 59.97,
      l: 59.41,
      t: 1707368400000,
      n: 129078,
    },
    {
      v: 15235251,
      vw: 59.4103,
      o: 59.47,
      c: 59.56,
      h: 59.58,
      l: 59.03,
      t: 1707454800000,
      n: 134137,
    },
    {
      v: 13516782,
      vw: 59.4931,
      o: 59.66,
      c: 59.7,
      h: 59.76,
      l: 58.96,
      t: 1707714000000,
      n: 148610,
    },
    {
      v: 24195706,
      vw: 59.427,
      o: 59.5,
      c: 59.35,
      h: 60.655,
      l: 58.79,
      t: 1707800400000,
      n: 211978,
    },
    {
      v: 15872453,
      vw: 59.2593,
      o: 59.17,
      c: 59.29,
      h: 59.59,
      l: 59.035,
      t: 1707886800000,
      n: 147078,
    },
    {
      v: 13695848,
      vw: 59.3974,
      o: 59.42,
      c: 59.4,
      h: 59.59,
      l: 59.13,
      t: 1707973200000,
      n: 123329,
    },
    {
      v: 13947057,
      vw: 59.4029,
      o: 59.35,
      c: 59.39,
      h: 59.62,
      l: 58.955,
      t: 1708059600000,
      n: 120090,
    },
    {
      v: 18339324,
      vw: 60.5399,
      o: 59.595,
      c: 60.7,
      h: 60.84,
      l: 59.51,
      t: 1708405200000,
      n: 173804,
    },
    {
      v: 14378264,
      vw: 61.1037,
      o: 60.99,
      c: 61.24,
      h: 61.28,
      l: 60.83,
      t: 1708491600000,
      n: 129905,
    },
    {
      v: 12982799,
      vw: 61.0185,
      o: 60.99,
      c: 61.15,
      h: 61.25,
      l: 60.5,
      t: 1708578000000,
      n: 120594,
    },
    {
      v: 13544914,
      vw: 61.2539,
      o: 61.09,
      c: 61.2,
      h: 61.62,
      l: 61,
      t: 1708664400000,
      n: 116585,
    },
    {
      v: 10336096,
      vw: 60.8764,
      o: 61.24,
      c: 60.71,
      h: 61.27,
      l: 60.66,
      t: 1708923600000,
      n: 118975,
    },
    {
      v: 9931088,
      vw: 60.3781,
      o: 60.54,
      c: 60.34,
      h: 60.78,
      l: 60.12,
      t: 1709010000000,
      n: 111115,
    },
    {
      v: 7726536,
      vw: 60.2916,
      o: 60.37,
      c: 60.4,
      h: 60.49,
      l: 60.06,
      t: 1709096400000,
      n: 94393,
    },
    {
      v: 18152651,
      vw: 60.063,
      o: 60.35,
      c: 60.02,
      h: 60.64,
      l: 59.9,
      t: 1709182800000,
      n: 119336,
    },
    {
      v: 10927564,
      vw: 59.5944,
      o: 59.9,
      c: 59.53,
      h: 59.9,
      l: 59.34,
      t: 1709269200000,
      n: 134809,
    },
    {
      v: 10150243,
      vw: 59.7383,
      o: 59.23,
      c: 59.81,
      h: 59.95,
      l: 59.22,
      t: 1709528400000,
      n: 133185,
    },
    {
      v: 12309959,
      vw: 59.6325,
      o: 59.91,
      c: 59.52,
      h: 60.11,
      l: 59.42,
      t: 1709614800000,
      n: 118154,
    },
    {
      v: 12378815,
      vw: 59.6242,
      o: 59.52,
      c: 59.55,
      h: 59.995,
      l: 59.38,
      t: 1709701200000,
      n: 114507,
    },
    {
      v: 13686859,
      vw: 59.4354,
      o: 59.69,
      c: 59.44,
      h: 59.77,
      l: 59.24,
      t: 1709787600000,
      n: 120821,
    },
    {
      v: 13239013,
      vw: 59.4343,
      o: 59.3,
      c: 59.52,
      h: 59.79,
      l: 58.97,
      t: 1709874000000,
      n: 128484,
    },
    {
      v: 14114260,
      vw: 60.0933,
      o: 59.78,
      c: 60.24,
      h: 60.29,
      l: 59.575,
      t: 1710129600000,
      n: 140698,
    },
    {
      v: 12684645,
      vw: 60.5496,
      o: 60.32,
      c: 60.5,
      h: 60.75,
      l: 60.21,
      t: 1710216000000,
      n: 120136,
    },
    {
      v: 13909460,
      vw: 61.0746,
      o: 60.88,
      c: 61.12,
      h: 61.21,
      l: 60.8001,
      t: 1710302400000,
      n: 130168,
    },
    {
      v: 13996609,
      vw: 60.5499,
      o: 60.58,
      c: 60.5,
      h: 60.8,
      l: 60.4,
      t: 1710388800000,
      n: 130061,
    },
    {
      v: 36849930,
      vw: 59.934,
      o: 60.02,
      c: 59.88,
      h: 60.45,
      l: 59.64,
      t: 1710475200000,
      n: 143093,
    },
    {
      v: 15856481,
      vw: 60.1395,
      o: 59.89,
      c: 60.13,
      h: 60.4,
      l: 59.801,
      t: 1710734400000,
      n: 138609,
    },
    {
      v: 15030627,
      vw: 60.2269,
      o: 60.24,
      c: 60.23,
      h: 60.35,
      l: 60.06,
      t: 1710820800000,
      n: 118555,
    },
    {
      v: 15258764,
      vw: 60.5946,
      o: 60.18,
      c: 60.75,
      h: 60.81,
      l: 60.155,
      t: 1710907200000,
      n: 116189,
    },
    {
      v: 13067077,
      vw: 60.6065,
      o: 60.56,
      c: 60.47,
      h: 60.99,
      l: 60.32,
      t: 1710993600000,
      n: 127437,
    },
    {
      v: 11502843,
      vw: 60.5339,
      o: 60.52,
      c: 60.49,
      h: 60.79,
      l: 60.43,
      t: 1711080000000,
      n: 92850,
    },
    {
      v: 13144651,
      vw: 60.3787,
      o: 60.48,
      c: 60.4,
      h: 60.71,
      l: 60.12,
      t: 1711339200000,
      n: 127498,
    },
    {
      v: 13277388,
      vw: 60.5535,
      o: 60.5,
      c: 60.54,
      h: 60.71,
      l: 60.38,
      t: 1711425600000,
      n: 103639,
    },
    {
      v: 12551216,
      vw: 61.0086,
      o: 60.79,
      c: 61.03,
      h: 61.43,
      l: 60.7,
      t: 1711512000000,
      n: 114078,
    },
    {
      v: 13683528,
      vw: 61.1532,
      o: 61.14,
      c: 61.18,
      h: 61.26,
      l: 60.995,
      t: 1711598400000,
      n: 107897,
    },
    {
      v: 11668686,
      vw: 60.7719,
      o: 61.18,
      c: 60.68,
      h: 61.3,
      l: 60.63,
      t: 1711944000000,
      n: 135127,
    },
    {
      v: 13017260,
      vw: 60.3182,
      o: 60.45,
      c: 60.15,
      h: 60.73,
      l: 60.11,
      t: 1712030400000,
      n: 133278,
    },
    {
      v: 13672922,
      vw: 59.9981,
      o: 60.05,
      c: 59.83,
      h: 60.39,
      l: 59.78,
      t: 1712116800000,
      n: 144834,
    },
    {
      v: 14320686,
      vw: 59.4967,
      o: 60.09,
      c: 59.3,
      h: 60.15,
      l: 59.17,
      t: 1712203200000,
      n: 131336,
    },
    {
      v: 10157760,
      vw: 59.4203,
      o: 59.25,
      c: 59.51,
      h: 59.68,
      l: 58.9101,
      t: 1712289600000,
      n: 132227,
    },
    {
      v: 10279735,
      vw: 59.2661,
      o: 59.4,
      c: 59.27,
      h: 59.47,
      l: 59.07,
      t: 1712548800000,
      n: 126001,
    },
    {
      v: 10792141,
      vw: 59.534,
      o: 59.48,
      c: 59.72,
      h: 59.74,
      l: 59.13,
      t: 1712635200000,
      n: 109381,
    },
    {
      v: 11861881,
      vw: 58.9172,
      o: 59.32,
      c: 58.92,
      h: 59.39,
      l: 58.69,
      t: 1712721600000,
      n: 138954,
    },
    {
      v: 11109007,
      vw: 59.0686,
      o: 59.15,
      c: 59.05,
      h: 59.37,
      l: 58.785,
      t: 1712808000000,
      n: 110266,
    },
    {
      v: 12250949,
      vw: 58.419,
      o: 58.95,
      c: 58.28,
      h: 59.01,
      l: 58.13,
      t: 1712894400000,
      n: 134306,
    },
    {
      v: 11279668,
      vw: 58.348,
      o: 58.61,
      c: 58.14,
      h: 58.805,
      l: 58.04,
      t: 1713153600000,
      n: 141473,
    },
    {
      v: 10874630,
      vw: 58.1354,
      o: 58.25,
      c: 58.06,
      h: 58.38,
      l: 57.93,
      t: 1713240000000,
      n: 128227,
    },
    {
      v: 13443693,
      vw: 58.3769,
      o: 58.28,
      c: 58.51,
      h: 58.555,
      l: 58.1,
      t: 1713326400000,
      n: 129352,
    },
    {
      v: 10915487,
      vw: 58.813,
      o: 58.62,
      c: 58.91,
      h: 58.98,
      l: 58.54,
      t: 1713412800000,
      n: 110630,
    },
    {
      v: 20166346,
      vw: 59.8491,
      o: 59.1,
      c: 60.17,
      h: 60.355,
      l: 58.995,
      t: 1713499200000,
      n: 153772,
    },
  ],
  status: "DELAYED",
  request_id: "53dd2d19367b07b8ef2c480f50b22908",
  count: 68,
};

const brands = [
  "3m",
  "canon",
  "csd",
  "debuyer",
  "lanew",
  "loreal",
  "nikon",
  "olympus",
  "panasonic",
  "pentax",
  "philips",
  "sony",
];

kv.set("brandsData", brands);

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

  const clientData = await kv.get("userData");
  const brandsData = await kv.get("brandsData");
  const investingData = await kv.get("investingData");
  
  const completion = runOpenAICompletion(openai, {
    model: "gpt-4-turbo",
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
You can show a map of factories in the area to help the user understand where the product come from.
You can show a map where the user can purchase sustainable products or repair their clothes.

You can show the product origin visually.
You can show the product materials visually.
You can create comparison tables using markdown.
You can invent ESG scores for companies based on fictional sustainability reports.
You can save personal user data to be later used.
You can show the user digital product passports with made up information.
You can allow the user log in.
You can tell the user about the history of a stock and how it's performed over the years. Include info abuout their product lines and how sustainable are their products. Make a table.
Address the user in a friendly tone and in Chinese use more informal words.
The user is from generation-z in the their early 20s.

Messages inside [] means that it's a UI element or a user event. For example:
- "[Price of AAPL = 100]" means that an interface of the stock price of AAPL is shown to the user.
- "[User has changed the amount of AAPL to 10]" means that the user has changed the amount of AAPL to 10 in the UI.

If you want to show sustainable stocks, call \`list_stocks\`.
If you want to show a map, call \`show_map\`.
If you want to show the product origin, call \`show_product_origin\`.
If you want to show the product materials, call \`show_product_materials\`.
If you want to show factories, call \`show_factories\`.
If you want to show personal data saving form, call \`show_personal\`.
If you want to show user login form, call \`show_login\`.

Complement function calls with text responses from your own data.
If the user wants to complete an impossible task, respond that you are an AI and cannot do that. 

Here is some user data you can use to personalize your responses and offer specific advice:
${clientData}

The user has previously bought products from the following brands: ${brands.join(",")}

The user currently owns investments in the following companies: ${investingData}

This is the peformance of the user KO stock ownership in recent months: ${JSON.stringify(stockData)}
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
      {
        name: "show_factories",
        description: "Show factories",
        parameters: z.object({}),
      },
      {
        name: "stock_history",
        description: "Stock history",
        parameters: z.object({}),
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

  completion.onFunctionCall("show_personal", async () => {
    reply.update("Loading personal data..");

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

  completion.onFunctionCall("show_factories", async () => {
    reply.update(<Factories />);

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
