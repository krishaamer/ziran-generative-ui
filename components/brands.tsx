import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const brandQuestions = [
  {
    heading: "我買的產品說明了什麼關於我？",
    message:
      "我買的產品說明了什麼關於我？製作一張表格列出與我選擇的品牌相關的個性特質",
  },
  {
    heading: "我買的品牌有多環保？",
    message: "我買的品牌有多環保？製作一張表格",
  },
  {
    heading: "顯示我的數位產品護照",
    message: "列出我購買的所有產品。製作一個表格並顯示我的數位產品護照",
  },
  {
    heading: "我買的產品從哪裡來？",
    message: "我買的產品從哪裡來？",
  },
];

export default function Brands({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  const [brandsData, setBrandsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <div>
      <div className="flex flex-wrap gap-2">
        {brandsData.map((brand, idx) => (
          <Button
            key={idx}
            variant="ghost"
            className="h-auto p-1 text-base shadow-sm border border-slate-100 grow md:grow-0 text-center"
            onClick={async () => {
              submitMessage(
                `${brand}品牌的可持續性如何？有什麼更可持續的替代選擇？`
              );
            }}
          >
            <img src={`/brands/${brand}.jpg`} alt={`${brand} brand`} />
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {brandQuestions.map((msg, idx) => (
          <Button
            key={idx}
            variant="ghost"
            className="h-auto p-1 pr-2 text-base shadow-sm border border-slate-100 grow md:grow-0 text-left justify-start"
            onClick={async () => {
              submitMessage(msg.message);
            }}
          >
            <Badge variant="outline" className="m-1 mr-2 bg-amber-200">
              {idx + 1}
            </Badge>
            {msg.heading}
          </Button>
        ))}
      </div>
    </div>
  );
}
