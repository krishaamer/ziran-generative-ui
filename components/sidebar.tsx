import { BotMessage } from "@/components/shared/message";
import TabBar from "./tab-bar";

export function Sidebar({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  return (
    <div className="relative mx-auto max-w-2xl px-2 mt-10">
      <BotMessage>這邊有一些相關問題</BotMessage>
      <div className="rounded-lg border bg-background mb-4">
        <TabBar submitMessage={submitMessage} />
      </div>
    </div>
  );
}
