import { BotMessage, UserMessage } from "@/components/shared/message";
import Polygon from "@/components/llm-polygon";
import Personal from "@/components/llm-personal";
import Investing from "@/components/llm-investing";
import TabBar from "./tab-bar";
import Brands from "./brands";
import Financial from "@/components/llm-financial";
import { useLanguage } from "@/components/shared/language";

export function EmptyScreen({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  const { t } = useLanguage();
  return (
    <div className="mx-auto max-w-2xl">
      <BotMessage className="mb-2">{t("Welcome, I am Green Filter 👋", "歡迎 我是綠濾 👋")}</BotMessage>
      <BotMessage className="mb-2">
        {t(
          "Can you help me understand more about your financial goals?",
          "你可以幫我理解更多關於你的財務目標嗎？"
        )}
      </BotMessage>
      <UserMessage>{t("Sure! Here are my personal financial goals.", "好啊～我的個人財務目標是大概這樣！")}</UserMessage>
      <Personal className="mt-4" />
      <BotMessage className="mb-2">{t("Have you invested before?", "你之前有投資嗎？")}</BotMessage>
      <Investing />
      <BotMessage>{t("Here are your current investments", "這邊是你買的投資")}</BotMessage>
      <div className="rounded-lg border bg-background p-4 mb-4">
        <Polygon
          submitMessage={submitMessage}
          tickers={["KO", "TSM", "NVDA"]}
        />
      </div>
      <div className="rounded-lg border bg-background p-4 mb-4">
        <Financial
          submitMessage={submitMessage}
          tickers={["KO", "TSM", "NVDA"]}
        />
      </div>
      <UserMessage>{t("Do you have content about saving, investing, and sustainability?", "你有關於儲蓄、投資和永續發展的課程嗎？")}</UserMessage>
      <BotMessage>{t("You can also find FAQs here", "這邊你也可以在這裡找到常見問題")}</BotMessage>
      <div className="rounded-lg border bg-background mb-4">
        <TabBar submitMessage={submitMessage} />
      </div>
      <UserMessage>{t("Can you track my purchases and spending?", "你能追蹤我所有的購物支出嗎？")}</UserMessage>
      <BotMessage>{t("No problem! Here are the brands you bought in the past year", "沒問題！這些是你過去一年購買的品牌")}</BotMessage>
      <div className="rounded-lg border bg-background p-4 mb-4">
        <Brands submitMessage={submitMessage} />
      </div>
      <BotMessage>
        {t(
          "Use the search bar below to ask anything about sustainable shopping, saving, and investing! I’m here to help you start an eco-friendly financial lifestyle 😊",
          "請使用下方的搜索欄來提問任何關於永續購物、儲蓄和投資的問題！我在這裡幫助你開始環保的財務生活方式 😊～～"
        )}
      </BotMessage>
    </div>
  );
}
