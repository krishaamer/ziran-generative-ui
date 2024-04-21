import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import easy from "../public/easy.json";
import carrot from "../public/carrot.json";
import dragon from "../public/dragon.json";


const shopping = [
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
];

const saving = [
  {
    heading: "買東西先查看產品的運輸距離（是不是當地食品）",
    message: "買東西先查看產品的運輸距離（是不是當地食品）",
  },
  {
    heading: "How can I increase my savings?",
    message: "How can I increase my savings?",
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
];

const investing = [
  {
    heading: "What are some sustainable stocks?",
    message: "What are some sustainable stocks?",
  },
  {
    heading: "Are stocks or cryptocurrencies more sustainable?",
    message: "Are stocks or cryptocurrencies more sustainable?",
  },
  {
    heading: "How sustainable is Coca Cola?",
    message: "How sustainable is Coca Cola?",
  },
  {
    heading: "How to read a candle chart?",
    message: "How to read a candle chart?",
  },
  {
    heading: "如果我買環保的品牌成為永續投資者嗎？",
    message: "如果我買環保的品牌成為永續投資者嗎？",
  },
];

export default function TabBar({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
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
              買東西
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
              學省錢
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
              學投資
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="shopping">
          <div>
            <h2 className="font-bold px-4 pt-4 text-xl text-center">
              購物建議
            </h2>
            <div className="flex flex-wrap gap-2 p-4 mb-4">
              {shopping.map((msg, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-auto p-1 text-base shadow-sm border border-slate-100 grow md:grow-0 text-center"
                  onClick={async () => {
                    submitMessage(msg.message);
                  }}
                >
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
              {saving.map((msg, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-auto p-1 text-base shadow-sm border border-slate-100 grow md:grow-0 text-center"
                  onClick={async () => {
                    submitMessage(msg.message);
                  }}
                >
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
              {investing.map((msg, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-auto p-1 text-base shadow-sm border border-slate-100 grow md:grow-0 text-center"
                  onClick={async () => {
                    submitMessage(msg.message);
                  }}
                >
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
