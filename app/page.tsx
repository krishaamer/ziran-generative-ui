"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Suspense, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import Header from "@/components/shared/header";
import { BotMessage } from "@/components/shared/message";
import { ChatScrollAnchor } from "@/lib/hooks/chat-scroll-anchor";
import { ChatList } from "@/components/chat-list";
import { EmptyScreen } from "@/components/empty-screen";
import { Sidebar } from "@/components/sidebar";
import { Search } from "@/components/search";
import type { ChatMessage } from "@/lib/ai/tools";

const transport = new DefaultChatTransport<ChatMessage>({
  api: "/api/chat",
});

function ChatPage() {
  const searchParams = useSearchParams();
  const lastQuery = useRef<string | null>(null);
  const { messages, sendMessage, status, error } = useChat<ChatMessage>({
    transport,
  });

  const submitMessage = useCallback(
    async (message: string) => {
      const text = message.trim();
      if (!text) return;
      await sendMessage({ text });
    },
    [sendMessage],
  );

  const searchKey = searchParams.toString();

  useEffect(() => {
    const ask = searchParams.get("ask");
    const task = searchParams.get("task");
    if (!ask || lastQuery.current === searchKey) return;

    lastQuery.current = searchKey;
    const query =
      task === "compare"
        ? `${ask}。請仔細比較這項產品與其他選擇，並用表格列出更永續的替代品。`
        : task === "origin"
          ? `${ask}。請解釋產品來源及潛在環境與社會議題，然後詢問是否要查看地圖。`
          : task === "explain"
            ? `${ask}。請解釋這項產品，並用表格列出可追問的永續問題。`
            : ask;

    void submitMessage(query);
  }, [searchKey, searchParams, submitMessage]);

  const isResponding = status === "submitted" || status === "streaming";

  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 flex-col bg-muted/50">
          <div className="mt-4 pb-[200px]">
            {messages.length ? (
              <>
                <ChatList messages={messages} submitMessage={submitMessage} />
                <Sidebar submitMessage={submitMessage} />
              </>
            ) : (
              <EmptyScreen submitMessage={submitMessage} />
            )}
            {error ? (
              <div className="relative mx-auto mt-4 max-w-2xl">
                <BotMessage animated={false}>{error.message}</BotMessage>
              </div>
            ) : null}
            <ChatScrollAnchor trackVisibility />
          </div>
        </main>
      </div>
      <Search submitMessage={submitMessage} disabled={isResponding} />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ChatPage />
    </Suspense>
  );
}
