"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Textarea from "react-textarea-autosize";

export default function Investing() {
  const [investingData, setInvestingData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/investing")
      .then((response) => response.json())
      .then((data) => {
        setInvestingData(
          typeof data.investingData === "string" ? data.investingData : ""
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch investing data", error);
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await fetch("/api/investing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ investingData }),
    });
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex flex-col space-y-3">
          <h2>加載中...</h2>
          <Skeleton className="h-[50px] w-full rounded-lg" />
          <div className="space-y-2 pb-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border bg-background p-4"
      >
        <Textarea
          className="w-full resize-none bg-transparent focus-within:outline-none"
          value={investingData}
          onChange={(e) => setInvestingData(e.target.value)}
          placeholder="我的投資經驗"
          required
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="submit"
              size="sm"
              className={`px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg shadow-md transition ease-in-out duration-150 ${
                investingData.trim()
                  ? "hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200"
                  : "cursor-not-allowed opacity-50"
              }`}
              disabled={!investingData.trim()}
            >
              儲存
            </Button>
          </TooltipTrigger>
          <TooltipContent>儲存個人資料</TooltipContent>
        </Tooltip>
      </form>
    </div>
  );
}
