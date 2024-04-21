import React, { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Polygon from "@/components/llm-polygon";
import Personal from "@/components/llm-personal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TabBar from "./tab-bar";
import Brands from "./brands";

export function EmptyScreen({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  const [brandsData, setBrandsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    setIsLoading(true); // Start loading
    fetch("/api/brands")
      .then((response) => response.json())
      .then((data) => {
        setBrandsData(Array.isArray(data.brandsData) ? data.brandsData : []);
        setIsLoading(false); // Stop loading after data is received
      })
      .catch((error) => {
        console.error("Failed to fetch brands", error);
        setIsLoading(false); // Stop loading on error
      });
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex flex-col space-y-3">
          <h2>加載中...</h2>
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar className="ring-1 ring-offset-2 ring-amber-950 cursor-pointer">
            <AvatarImage src="/images/avatar-2.jpg" alt="助手" />
            <AvatarFallback>助手</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>綠濾助手</TooltipContent>
      </Tooltip>
      <div className="rounded-lg border bg-background p-4 mb-4">
        <Personal />
      </div>
      <div className="rounded-lg border bg-background mb-4">
        <TabBar submitMessage={submitMessage} />
      </div>
      <div className="rounded-lg border bg-background p-4 mb-4">
        <h2 className="font-bold px-4 pt-4 text-xl text-center">
          我持有的股票
        </h2>
        <Polygon submitMessage={submitMessage} ticker="KO" />
        <Polygon submitMessage={submitMessage} ticker="TSM" />
      </div>
      <div className="rounded-lg border bg-background p-4 mb-4">
        <Brands submitMessage={submitMessage} brandsData={brandsData} />
      </div>
    </div>
  );
}
