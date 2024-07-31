import { BotMessage, UserMessage } from "@/components/shared/message";
import Polygon from "@/components/llm-polygon";
import Personal from "@/components/llm-personal";
import TabBar from "./tab-bar";
import Brands from "./brands";

export function EmptyScreen({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <BotMessage className="mb-2">歡迎 我是綠濾 👋</BotMessage>
      <BotMessage className="mb-2">
        你可以幫我理解更多關於你的財務目標嗎？
      </BotMessage>
      <div className="mt-4 p-4">
        <Personal />
      </div>
      <UserMessage className="mb-4">
        好啊～我的個人財務目標是大概這樣！
      </UserMessage>
      <BotMessage>這邊是你的投資</BotMessage>
      <div className="rounded-lg border bg-background p-4 mb-4">
        <Polygon
          submitMessage={submitMessage}
          tickers={["KO", "TSM", "NVDA"]}
        />
      </div>
      <BotMessage>這邊你也可以在這裡找到常見問題</BotMessage>
      <div className="rounded-lg border bg-background mb-4">
        <TabBar submitMessage={submitMessage} />
      </div>
      <BotMessage>這些是你過去一年購買的品牌</BotMessage>
      <div className="rounded-lg border bg-background p-4 mb-4">
        <Brands submitMessage={submitMessage} />
      </div>
    </div>
  );
}
