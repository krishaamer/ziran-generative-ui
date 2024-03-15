"use client";

import { useUIState, useActions, useAIState } from "ai/rsc";
import { UserMessage } from "@/components/llm-stocks/message";
import { type AI } from "./action";
import { ChatScrollAnchor } from "@/lib/hooks/chat-scroll-anchor";
import { ChatList } from "@/components/chat-list";
import { EmptyScreen } from "@/components/empty-screen";
import { Search } from "@/components/search";

export default function Page() {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();

  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between w-full px-4 border-b h-20 shrink-0 bg-background backdrop-blur-xl docu-shadow">
        <Search
          submitMessage={async (message) => {
            // Add user message UI
            setMessages((currentMessages) => [
              ...currentMessages,
              {
                id: Date.now(),
                display: <UserMessage>{message}</UserMessage>,
              },
            ]);

            // Submit and get response message
            const responseMessage = await submitUserMessage(message);
            setMessages((currentMessages) => [
              ...currentMessages,
              responseMessage,
            ]);
          }}
        />
      </div>
      <div className="flex flex-col min-h-screen">
        <main className="flex flex-col flex-1 bg-muted/50">
          <div className="pb-[200px] pt-4 md:pt-10">
            {messages.length ? (
              <>
                <ChatList messages={messages} />
              </>
            ) : (
              <EmptyScreen
                submitMessage={async (message) => {
                  // Add user message UI
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: Date.now(),
                      display: <UserMessage>{message}</UserMessage>,
                    },
                  ]);

                  // Submit and get response message
                  const responseMessage = await submitUserMessage(message);
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ]);
                }}
              />
            )}
            <ChatScrollAnchor trackVisibility={true} />
          </div>
        </main>
      </div>
    </>
  );
}
