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
    <div className="mx-auto max-w-2xl px-4">
      <BotMessage>Have you been good today?</BotMessage>
      <UserMessage>我的個人資料和財務目標</UserMessage>
      <div className="rounded-lg border bg-background p-4 mb-4">
        <Personal />
      </div>
      <BotMessage>You can ask more questions here</BotMessage>
      <div className="rounded-lg border bg-background mb-4">
        <TabBar submitMessage={submitMessage} />
      </div>
      <BotMessage>Here are your investments</BotMessage>
      <div className="rounded-lg border bg-background p-4 mb-4">
        <h2 className="font-bold px-4 pt-4 text-xl text-center">
          我持有的股票
        </h2>
        <Polygon submitMessage={submitMessage} ticker="KO" />
        <Polygon submitMessage={submitMessage} ticker="TSM" />
      </div>
      <BotMessage>These are the brands you bought</BotMessage>
      <div className="rounded-lg border bg-background p-4 mb-4">
        <Brands submitMessage={submitMessage} />
      </div>
    </div>
  );
}
