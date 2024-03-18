import { Button } from "@/components/ui/button";

const shopping = [
  {
    heading:
      "How are shopping, saving, and investing related to sustainability?",
    message:
      "How are shopping, saving, and investing related to sustainability?",
  },
  {
    heading: "Where can I repair my clothes in Tainan?",
    message: "Where can I repair my clothes in Tainan?",
  },
  {
    heading: "How sustainable is Coca Cola?",
    message: "How sustainable is Coca Cola?",
  },
  {
    heading: "What are the living conditions of the animals I eat in Taiwan?",
    message: "What are the living conditions of the animals I eat in Taiwan?",
  },
  {
    heading: "Where did my Nike sneakers come from?",
    message: "Where did my Nike sneakers come from?",
  },
  {
    heading: "What are Nike sneakers made of?",
    message: "What are Nike sneakers made of?",
  },
  {
    heading: "Check product sustainability",
    message: "What are some sustainable stocks?",
  },
];

const saving = [
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
];

const investing = [
  {
    heading: "What are some sustainable stocks?",
    message: "What are some sustainable stocks?",
  },
];

export function EmptyScreen({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-4 mb-4">
        <div className="flex flex-col items-start space-y-2 mb-4">
          <span className="p-1 font-bold text-xl">Shopping:</span>
          {shopping.map((msg, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto p-1 text-base shadow-sm border border-slate-100"
              onClick={async () => {
                submitMessage(msg.message);
              }}
            >
              {msg.heading}
            </Button>
          ))}
          <span className="p-1 font-bold text-xl">Saving:</span>
          {saving.map((msg, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto p-1 text-base shadow-sm border border-slate-100"
              onClick={async () => {
                submitMessage(msg.message);
              }}
            >
              {msg.heading}
            </Button>
          ))}
          <span className="p-1 font-bold text-xl">Investing:</span>
          {investing.map((msg, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto p-1 text-base shadow-sm border border-slate-100"
              onClick={async () => {
                submitMessage(msg.message);
              }}
            >
              {msg.heading}
            </Button>
          ))}
          <span className="p-1 italic">
            You can come up with any question yourself and
            Ziran will guide you step-by-step in becoming an investor in
            sustainability.
          </span>
        </div>
      </div>
    </div>
  );
}
