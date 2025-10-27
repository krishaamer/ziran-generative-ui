import { BotMessage } from "@/components/shared/message";
import TabBar from "./tab-bar";
import { useLanguage } from "@/components/shared/language";

export function Sidebar({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  const { t } = useLanguage();
  return (
    <div className="relative mx-auto max-w-2xl mt-10">
      <BotMessage>{t("Here are some related questions", "這邊有一些相關問題")}</BotMessage>
      <div className="rounded-lg border bg-background mb-4">
        <TabBar submitMessage={submitMessage} />
      </div>
    </div>
  );
}
