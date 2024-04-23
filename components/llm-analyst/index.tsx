"use client";

import { useActions, useUIState } from "ai/rsc";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BotMessage } from "../shared/message";
import type { AI } from "../../app/action";

export default function Analyst({ stockData, ticker }: { stockData: any, ticker: string }) {
  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();

  const content = JSON.stringify(stockData);

  console.log(ticker);

  return (
    <>
      <h1>Ticker: {ticker}</h1>
      <BotMessage>從Polygon.io收到原始股市數據</BotMessage>
      <ScrollArea className="h-[500px] w-full rounded-xl border text-card-foreground shadow py-2 ring-1 ring-offset-2 ring-orange-950 bg-amber-200 dark:bg-amber-950">
        {content}
      </ScrollArea>
      <Button
        variant="outline"
        size="lg"
        className="mt-2 inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white hover:text-white  bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg shadow-md transition ease-in-out duration-150 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200"
        onClick={async () => {
          const response = await submitUserMessage(
            `Please analyze the following stock data and make a chart with the company name and 3 months of stock prices: ${content}`
          );
          setMessages((currentMessages) => [...currentMessages, response]);
        }}
      >
        解釋數據
      </Button>
    </>
  );
}