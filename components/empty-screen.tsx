import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@/components/ui/icons";

const exampleMessages = [
  {
    heading: "Check product sustainability",
    message: "What are some sustainable stocks?",
  },
  {
    heading: "買東西先查看產品的運輸距離（是不是當地食品）",
    message: "買東西先查看產品的運輸距離（是不是當地食品）",
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
    heading: "投資前比較公司的環保表現",
    message: "投資前比較公司的環保表現",
  },
  {
    heading: "用社交網絡認識其他環保的同學",
    message: "用社交網絡認識其他環保的同學",
  },
  {
    heading: "每個月查看我自己的環保分數報告（了解我用錢的方式多環保）",
    message: "每個月查看我自己的環保分數報告（了解我用錢的方式多環保）",
  },
  {
    heading: "如何讓我支持的公司更環保",
    message: "如何讓我支持的公司更環保",
  },
  {
    heading: "跟我的AI幫手討論環保問題",
    message: "跟我的AI幫手討論環保問題",
  },
  {
    heading: "老實說我對任何環保資訊都沒有太多興趣",
    message: "老實說我對任何環保資訊都沒有太多興趣",
  },
];

export function EmptyScreen({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8 mb-4">
        <h1 className="mb-2 text-lg font-semibold">
          Ziran AI
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          Shop, save and invest with your mind at ease from climate anxiety 😊
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={async () => {
                submitMessage(message.message);
              }}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
