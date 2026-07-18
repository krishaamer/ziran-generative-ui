import "server-only";

import { tool, type InferUITools, type UIMessage } from "ai";
import { z } from "zod";

export type StockPoint = {
  t: number;
  c: number;
};

async function fetchStockHistory(ticker: string): Promise<StockPoint[]> {
  const apiKey = process.env.POLY_API_KEY;
  if (!apiKey) return [];

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const from = threeMonthsAgo.toISOString().split("T")[0];
  const to = new Date().toISOString().split("T")[0];
  const symbol = ticker.trim().toUpperCase();
  const url = new URL(
    `https://api.polygon.io/v2/aggs/ticker/${encodeURIComponent(symbol)}/range/1/day/${from}/${to}`,
  );
  url.searchParams.set("apiKey", apiKey);

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return [];

    const payload: unknown = await response.json();
    if (
      !payload ||
      typeof payload !== "object" ||
      !("results" in payload) ||
      !Array.isArray(payload.results)
    ) {
      return [];
    }

    return payload.results.flatMap((item): StockPoint[] => {
      if (
        item &&
        typeof item === "object" &&
        "t" in item &&
        "c" in item &&
        typeof item.t === "number" &&
        typeof item.c === "number"
      ) {
        return [{ t: item.t, c: item.c }];
      }
      return [];
    });
  } catch {
    return [];
  }
}

const ready = async () => ({ ready: true as const });

export const tools = {
  show_map: tool({
    description: "Show a map of sustainable companies and services nearby.",
    inputSchema: z.object({}),
    execute: ready,
  }),
  show_product_origin: tool({
    description: "Visualize the geographic origin of a product.",
    inputSchema: z.object({}),
    execute: ready,
  }),
  show_product_materials: tool({
    description: "Show an interactive explanation of product materials.",
    inputSchema: z.object({}),
    execute: ready,
  }),
  show_factories: tool({
    description: "Show factories and supply-chain locations on a map.",
    inputSchema: z.object({}),
    execute: ready,
  }),
  show_pigs: tool({
    description: "Show pig farms and pork-production locations in Taiwan.",
    inputSchema: z.object({}),
    execute: ready,
  }),
  stock_history: tool({
    description: "Show the last three months of price history for a stock.",
    inputSchema: z.object({
      ticker: z.string().min(1).describe("The stock ticker symbol"),
    }),
    execute: async ({ ticker }) => ({
      ticker: ticker.trim().toUpperCase(),
      stockData: await fetchStockHistory(ticker),
    }),
  }),
  show_personal: tool({
    description: "Show the personal sustainability data form.",
    inputSchema: z.object({}),
    execute: ready,
  }),
  show_login: tool({
    description: "Show the user login interface.",
    inputSchema: z.object({}),
    execute: ready,
  }),
  show_balance: tool({
    description: "Show the user's account balance and transactions.",
    inputSchema: z.object({}),
    execute: ready,
  }),
  show_passport: tool({
    description: "Show a digital product passport with ESG information.",
    inputSchema: z.object({}),
    execute: ready,
  }),
};

export type ChatMessage = UIMessage<unknown, never, InferUITools<typeof tools>>;
