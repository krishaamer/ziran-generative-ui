import Analyst from "@/components/llm-analyst";
import Balance from "@/components/llm-balance";
import Factories from "@/components/llm-factories";
import { LoginScreen } from "@/components/llm-login";
import SimpleMap from "@/components/llm-map";
import Materials from "@/components/llm-materials";
import ProductOrigin from "@/components/llm-origin";
import Passport from "@/components/llm-passport";
import Personal from "@/components/llm-personal";
import Pigs from "@/components/llm-pigs";
import Origin from "@/components/origin";
import { BotMessage, UserMessage } from "@/components/shared/message";
import type { ChatMessage } from "@/lib/ai/tools";

type SubmitMessage = (message: string) => Promise<void>;

function ToolLoading({ label }: { label: string }) {
  return <BotMessage>{label}</BotMessage>;
}

export function ChatList({
  messages,
  submitMessage,
}: {
  messages: ChatMessage[];
  submitMessage: SubmitMessage;
}) {
  if (!messages.length) return null;

  return (
    <div className="relative mx-auto max-w-2xl">
      <Origin />
      {messages.map((message) => (
        <div key={message.id} className="space-y-4">
          {message.parts.map((part, index) => {
            const key = `${message.id}-${index}`;

            if (part.type === "text") {
              return message.role === "user" ? (
                <UserMessage key={key}>{part.text}</UserMessage>
              ) : (
                <BotMessage key={key}>{part.text}</BotMessage>
              );
            }

            switch (part.type) {
              case "tool-show_map":
                return part.state === "output-available" ? (
                  <SimpleMap key={part.toolCallId} />
                ) : (
                  <ToolLoading key={part.toolCallId} label="載入地圖中…" />
                );
              case "tool-show_product_origin":
                return part.state === "output-available" ? (
                  <ProductOrigin
                    key={part.toolCallId}
                    onSubmit={submitMessage}
                  />
                ) : (
                  <ToolLoading key={part.toolCallId} label="整理產品來源中…" />
                );
              case "tool-show_product_materials":
                return part.state === "output-available" ? (
                  <Materials key={part.toolCallId} onSubmit={submitMessage} />
                ) : (
                  <ToolLoading key={part.toolCallId} label="分析產品材質中…" />
                );
              case "tool-show_factories":
                return part.state === "output-available" ? (
                  <Factories key={part.toolCallId} />
                ) : (
                  <ToolLoading key={part.toolCallId} label="尋找工廠中…" />
                );
              case "tool-show_pigs":
                return part.state === "output-available" ? (
                  <Pigs key={part.toolCallId} />
                ) : (
                  <ToolLoading key={part.toolCallId} label="尋找產地中…" />
                );
              case "tool-stock_history":
                if (part.state === "output-error") {
                  return (
                    <BotMessage key={part.toolCallId} animated={false}>
                      {part.errorText}
                    </BotMessage>
                  );
                }
                return part.state === "output-available" ? (
                  <Analyst
                    key={part.toolCallId}
                    ticker={part.output.ticker}
                    stockData={part.output.stockData}
                    onSubmit={submitMessage}
                  />
                ) : (
                  <ToolLoading key={part.toolCallId} label="載入股票資料中…" />
                );
              case "tool-show_personal":
                return part.state === "output-available" ? (
                  <Personal key={part.toolCallId} />
                ) : (
                  <ToolLoading key={part.toolCallId} label="準備個人資料表單中…" />
                );
              case "tool-show_login":
                return part.state === "output-available" ? (
                  <LoginScreen key={part.toolCallId} />
                ) : (
                  <ToolLoading key={part.toolCallId} label="準備登入中…" />
                );
              case "tool-show_balance":
                return part.state === "output-available" ? (
                  <Balance key={part.toolCallId} />
                ) : (
                  <ToolLoading key={part.toolCallId} label="載入帳戶資料中…" />
                );
              case "tool-show_passport":
                return part.state === "output-available" ? (
                  <Passport key={part.toolCallId} />
                ) : (
                  <ToolLoading key={part.toolCallId} label="建立產品護照中…" />
                );
              default:
                return null;
            }
          })}
        </div>
      ))}
    </div>
  );
}
