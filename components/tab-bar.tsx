import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Lottie from "lottie-react";
import easy from "../public/easy.json";
import carrot from "../public/carrot.json";
import dragon from "../public/dragon.json";
import { useLanguage } from "@/components/shared/language";


const shopping_zh = [
  {
    heading: "我怎麼可以更環保？",
    message: "我怎麼可以更環保？",
  },
  {
    heading: "我怎麼減少亂買？",
    message: "我怎麼減少亂買？",
  },
  {
    heading: "我如何影響公司變得更環保？",
    message: "我如何影響公司變得更環保？",
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
    heading: "我買的產品裡有沒有對我身體有害的化學物質？",
    message: "我買的產品裡有沒有對我身體有害的化學物質？",
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
    heading: "我之前買的東西來自哪裡？",
    message: "我之前買的東西來自哪裡？",
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

const shopping_en = [
  { heading: "How can I be more eco-friendly?", message: "How can I be more eco-friendly?" },
  { heading: "How can I reduce impulse buying?", message: "How can I reduce impulse buying?" },
  {
    heading: "How can I influence companies to be more sustainable?",
    message: "How can I influence companies to be more sustainable?",
  },
  {
    heading: "Which brands have I bought before?",
    message:
      "Which brands have I bought before? How do they compare on sustainability? Create a table.",
  },
  {
    heading: "How are shopping, saving and investing related to sustainability?",
    message: "How are shopping, saving and investing related to sustainability? Create a table.",
  },
  {
    heading: "Do the products I buy contain harmful chemicals?",
    message: "Do the products I buy contain harmful chemicals?",
  },
  {
    heading: "Where can I repair my clothes in Tainan?",
    message: "Where can I repair my clothes in Tainan?",
  },
  { heading: "Is my current lifestyle sustainable?", message: "Is my current lifestyle sustainable?" },
  {
    heading: "What are the living conditions of animals I eat in Taiwan?",
    message: "What are the living conditions of animals I eat in Taiwan?",
  },
  { heading: "Where did the things I bought come from?", message: "Where did the things I bought come from?" },
  { heading: "What is a digital product passport?", message: "What is a digital product passport?" },
  { heading: "How to check a product's sustainability?", message: "How to check a product's sustainability?" },
  {
    heading:
      "Should I buy this brand? Which factories make this brand’s products? What is its sustainability score? Compare with other brands.",
    message:
      "Should I buy this brand? Which factories make this brand’s products? What is its sustainability score? Compare with other brands.",
  },
];

const saving_zh = [
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

const saving_en = [
  {
    heading: "Where can I buy in bulk in Tainan?",
    message: "Where can I buy in bulk in Tainan?",
  },
  {
    heading: "When buying, check product transport distance (is it local food)",
    message: "When buying, check product transport distance (is it local food)",
  },
  { heading: "How can I increase my savings?", message: "How can I increase my savings?" },
  {
    heading: "When buying, review how sustainable the company's production is",
    message: "When buying, review how good employee welfare is",
  },
  {
    heading: "Learn which products pollute the most to avoid them",
    message: "Learn which products pollute the most to avoid them",
  },
  {
    heading: "Learn the living conditions of animals for the animal products I eat",
    message: "Learn the living conditions of animals for the animal products I eat",
  },
  { heading: "Look for organic products first", message: "Look for organic products first" },
  {
    heading: "Before investing, check AI-summarized consumer reviews about company sustainability",
    message: "Before investing, check AI-summarized consumer reviews about company sustainability",
  },
  {
    heading: "Before investing, review the company's certifications and eco ratings",
    message: "Before investing, review the company's certifications and eco ratings",
  },
  {
    heading:
      "What has this brand done for the environment? Which factories make its products? What is its sustainability score? Compare with other brands.",
    message:
      "What has this brand done for the environment? Which factories make its products? What is its sustainability score? Compare with other brands.",
  },
];

const investing_zh = [
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

const investing_en = [
  {
    heading: "How can I avoid impulsive stock purchases?",
    message: "How can I avoid impulsive stock purchases?",
  },
  { heading: "What are some sustainable stocks?", message: "What are some sustainable stocks?" },
  {
    heading: "Which is more sustainable, stocks or crypto?",
    message: "Which is more sustainable, stocks or crypto?",
  },
  { heading: "How to read candlestick charts?", message: "How to read candlestick charts?" },
  {
    heading: "If I buy eco-friendly brands, am I a sustainable investor?",
    message: "If I buy eco-friendly brands, am I a sustainable investor?",
  },
  {
    heading: "Should I invest in this brand? Is it a B Corp? What certificates does it have for sustainability?",
    message: "Should I invest in this brand? Is it a B Corp? What certificates does it have for sustainability?",
  },
];


export default function TabBar({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {

  const [isLoading, setIsLoading] = useState(true);
  const { lang, t } = useLanguage();
  const shopping = lang === "en" ? shopping_en : shopping_zh;
  const saving = lang === "en" ? saving_en : saving_zh;
  const investing = lang === "en" ? investing_en : investing_zh;
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
          <Skeleton className="h-[200px] w-full rounded-lg" />
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
              {t("Sustainable Shopping", "環保購物")}
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
              {t("Sustainable Saving", "環保省錢")}
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
              {t("Sustainable Investing", "環保投資")}
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="shopping">
          <div>
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
