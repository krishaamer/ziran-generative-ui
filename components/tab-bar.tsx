import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Lottie from "lottie-react";
import easy from "../public/easy.json";
import carrot from "../public/carrot.json";
import dragon from "../public/dragon.json";


const shopping = [
  {
    heading: "我怎麼減少亂買？",
    message: "我怎麼減少亂買？",
  },
  {
    heading: "我之前買過哪些品牌？",
    message: "我之前買過哪些品牌？它們在可持續性方面的比較如何？製作一個表格。",
  },
  {
    heading: "購物、儲蓄和投資與可持續性有什麼關聯？",
    message: "購物、儲蓄和投資與可持續性有什麼關聯？製作一個表格。",
  },
  {
    heading: "我在台南哪裡可以修理我的衣服？",
    message: "我在台南哪裡可以修理我的衣服？",
  },
  {
    heading: "我目前的生活方式可持續嗎？",
    message: "我目前的生活方式可持續嗎？",
  },
  {
    heading: "我在台灣吃的動物的生活條件如何？",
    message: "我在台灣吃的動物的生活條件如何？",
  },
  {
    heading: "我的Nike運動鞋來自哪裡？",
    message: "我的Nike運動鞋來自哪裡？",
  },
  {
    heading: "什麼是數位產品護照？",
    message: "什麼是數位產品護照？",
  },
  {
    heading: "如何檢查一個產品的可持續性？",
    message: "如何檢查一個產品的可持續性？",
  },
  {
    heading:
      "我應該買這個品牌的產品嗎？ 這個品牌的產品是在哪些工廠製造的？這個品牌的可持續性評分是多少？ 與其他品牌比較一下～～",
    message:
      "我應該買這個品牌的產品嗎？ 這個品牌的產品是在哪些工廠製造的？這個品牌的可持續性評分是多少？ 與其他品牌比較一下～～",
  },
];

const saving = [
  {
    heading: "我在台南哪裡可以批量購買產品？",
    message: "我在台南哪裡可以批量購買產品？",
  },
  {
    heading: "買東西先查看產品的運輸距離（是不是當地食品）",
    message: "買東西先查看產品的運輸距離（是不是當地食品）",
  },
  {
    heading: "我怎麼能增加我的儲蓄？",
    message: "我怎麼能增加我的儲蓄？",
  },
  {
    heading: "買東西先查看公司生產過程多環保",
    message: "買東西先查看公司工人的員工福利多好",
  },
  {
    heading: "買東西先了解哪些產品污染最嚴重，以便避免它們",
    message: "買東西先了解哪些產品污染最嚴重，以便避免它們",
  },
  {
    heading: "買東西先了解我吃的動物性食品，動物的生活環境",
    message: "買東西先了解我吃的動物性食品，動物的生活環境",
  },
  {
    heading: "買東西先尋找有機產品",
    message: "買東西先尋找有機產品",
  },
  {
    heading: "投資前查看AI摘要的消費者對公司環保的評論",
    message: "投資前查看AI摘要的消費者對公司環保的評論",
  },
  {
    heading: "投資前查看公司的環保認證和生態評分",
    message: "投資前查看公司的環保認證和生態評分",
  },
  {
    heading:
      "這個品牌為了環境做了什麼？ 這個品牌是在哪些工廠生產的？ 可持續性評分是多少？與其他品牌比較一下",
    message:
      "這個品牌為了環境做了什麼？ 這個品牌是在哪些工廠生產的？ 可持續性評分是多少？與其他品牌比較一下",
  },
];

const investing = [
  {
    heading: "我如何避免衝動買股票？",
    message: "我如何避免衝動買股票？",
  },
  {
    heading: "什麼是一些可持續發展的股票？",
    message: "什麼是一些可持續發展的股票？",
  },
  {
    heading: "股票或加密貨幣哪個更可持續？",
    message: "股票或加密貨幣哪個更可持續？",
  },
  {
    heading: "如何閱讀蠟燭圖？",
    message: "如何閱讀蠟燭圖？",
  },
  {
    heading: "如果我買環保的品牌成為永續投資者嗎？",
    message: "如果我買環保的品牌成為永續投資者嗎？",
  },
  {
    heading:
      "我應該投資這個品牌嗎？這家公司是B型企業嗎？它有什麼證書證明其可持續性？",
    message:
      "我應該投資這個品牌嗎？這家公司是B型企業嗎？它有什麼證書證明其可持續性？",
  },
];


export default function TabBar({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4 p-10">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[200px] w-full rounded-xl" />
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
      <Tabs defaultValue="shopping">
        <TabsList>
          <TabsTrigger value="shopping" className="hover:bg-white hover:shadow">
            <div className="p-1 font-bold text-2xl text-center">
              <Lottie
                animationData={easy}
                loop={true}
                className="tinySvg"
                role="img"
              />
              環保購物
            </div>
          </TabsTrigger>
          <TabsTrigger value="saving" className="hover:bg-white hover:shadow">
            <div className="p-1 font-bold text-2xl text-center">
              <Lottie
                animationData={carrot}
                loop={true}
                className="tinySvg"
                role="img"
              />
              環保省錢
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="investing"
            className="hover:bg-white hover:shadow"
          >
            <div className="p-1 font-bold text-2xl text-center">
              <Lottie
                animationData={dragon}
                loop={true}
                className="tinySvg"
                role="img"
              />
              環保投資
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="shopping">
          <div>
            <h2 className="font-bold px-4 pt-4 text-xl text-center">
              購物建議
            </h2>
            <div className="flex flex-wrap gap-2 p-4 mb-4">
              {shopping.map((msg, idx) => (
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
        </TabsContent>
        <TabsContent value="saving">
          <div>
            <h2 className="font-bold px-4 pt-4 text-xl text-center">
              儲蓄建議
            </h2>
            <div className="flex flex-wrap gap-2 p-4 mb-4">
              {saving.map((msg, idx) => (
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
        </TabsContent>
        <TabsContent value="investing">
          <div>
            <h2 className="font-bold px-4 pt-4 text-xl text-center">
              投資建議
            </h2>
            <div className="flex flex-wrap gap-2 p-4 mb-4">
              {investing.map((msg, idx) => (
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
