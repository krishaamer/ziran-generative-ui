"use client";

import { useActions, useUIState } from "ai/rsc";
import { Button } from "@/components/ui/button";
import type { AI } from "../../app/action";

export default function Analyst() {

  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();
 
  return (
    <>
      <div
        style={{ height: "500px", width: "100%" }}
        className="rounded-lg shadow-lg ring overflow-hidden"
      >
        <h1 className="text-3xl">產品來源</h1>
      </div>
      <Button
        variant="outline"
        size="lg"
        className="p-2 rounded-lg flex flex-row gap-2 cursor-pointer mt-2 r-0"
        onClick={async () => {
          const response = await submitUserMessage(
            `Analyse the stock data from previous conversation.`
          );
          setMessages((currentMessages) => [...currentMessages, response]);
        }}
      >
        Explain
      </Button>
    </>
  );
}
