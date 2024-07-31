"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function Personal() {
  const [clientData, setClientData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/personal")
      .then((response) => response.json())
      .then((data) => {
        setClientData(
          typeof data.clientData === "string" ? data.clientData : ""
        );
        setIsLoading(false); // Stop loading after data is received
      })
      .catch((error) => {
        console.error("Failed to fetch personal data", error);
        setIsLoading(false); // Stop loading on error
      });
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await fetch("/api/personal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientData }),
    });
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex flex-col space-y-3">
          <h2>加載中...</h2>
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-end">
      <textarea
        className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 mb-2"
        value={clientData}
        onChange={(e) => setClientData(e.target.value)}
        placeholder="我的基本個人財務資訊"
        required
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="submit"
            size={"sm"}
            className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg shadow-md transition ease-in-out duration-150 ${
              clientData.trim()
                ? "hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200"
                : "cursor-not-allowed opacity-50"
            }`}
            disabled={!clientData.trim()}
          >
            儲存財務目標
          </Button>
        </TooltipTrigger>
        <TooltipContent>儲存個人資料</TooltipContent>
      </Tooltip>
    </form>
  );
}
