import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Textarea from "react-textarea-autosize";

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
  const [brandsData, setBrandsData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [brandsInput, setBrandsInput] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/brands")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.brandsData)) {
          setBrandsData(data.brandsData);
          // Join brands with commas for the input
          setBrandsInput(data.brandsData.join(", "));
        } else {
          console.log("Unexpected data format:", data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Failed to fetch brands", error);
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const updatedBrands = brandsInput
      .split(",") // Split by commas
      .map((brand) => brand.trim().toLowerCase()) // Trim and convert to lowercase
      .filter((brand) => brand !== "");

    try {
      const response = await fetch("/api/brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ brandsData: updatedBrands }),
      });

      if (response.ok) {
        setBrandsData(updatedBrands);
      } else {
        console.log("Failed to update brands");
      }
    } catch (error) {
      console.log("Failed to update brands", error);
    }
  };

  // Function to convert brand name to Sentence case for display
  const toSentenceCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-lg" />
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
                `${toSentenceCase(brand)}品牌的可持續性如何？有什麼更可持續的替代選擇？`
              );
            }}
          >
            <img
              src={`/brands/${brand}.jpg`}
              alt={`${toSentenceCase(brand)} brand`}
            />
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

      <form
        onSubmit={handleSubmit}
        className="mt-4 rounded-lg border bg-background p-4"
      >
        <Textarea
          className="w-full resize-none bg-transparent focus-within:outline-none"
          value={brandsInput}
          onChange={(e) => setBrandsInput(e.target.value)}
          placeholder="Enter brands separated by commas"
          required
        />
        <Button
          type="submit"
          size="sm"
          className={`mt-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg shadow-md transition ease-in-out duration-150 ${
            brandsInput.trim()
              ? "hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200"
              : "cursor-not-allowed opacity-50"
          }`}
          disabled={!brandsInput.trim()}
        >
          更新品牌列表
        </Button>
      </form>
    </div>
  );
}
