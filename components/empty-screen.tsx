import { BotMessage, UserMessage } from "@/components/shared/message";
import Polygon from "@/components/llm-polygon";
import Personal from "@/components/llm-personal";
import Investing from "@/components/llm-investing";
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
      <UserMessage>好啊～我的個人財務目標是大概這樣！</UserMessage>
      <Personal className="mt-4" />
      <BotMessage className="mb-2">你之前有投資嗎？</BotMessage>
      <Investing />
      <BotMessage>這邊是你買的投資</BotMessage>
      <div className="rounded-lg border bg-background p-4 mb-4">
        <Polygon
          submitMessage={submitMessage}
          tickers={["KO", "TSM", "NVDA"]}
        />
      </div>
      <UserMessage>你有關於儲蓄、投資和永續發展的課程嗎？</UserMessage>
      <BotMessage>這邊你也可以在這裡找到常見問題</BotMessage>
      <div className="rounded-lg border bg-background mb-4">
        <TabBar submitMessage={submitMessage} />
      </div>
      <UserMessage>你能追蹤我所有的購物支出嗎？</UserMessage>
      <BotMessage>沒問題！這些是你過去一年購買的品牌</BotMessage>
      <div className="rounded-lg border bg-background p-4 mb-4">
        <Brands submitMessage={submitMessage} />
      </div>
      <BotMessage>
        請使用下方的搜索欄來提問任何關於永續購物、儲蓄和投資的問題！我在這裡幫助你開始環保的財務生活方式 😊～～
      </BotMessage>
    </div>
  );
}
