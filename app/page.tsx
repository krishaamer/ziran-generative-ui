"use client";

import React, { useEffect, useState } from "react";
import { useUIState, useActions, useAIState } from "ai/rsc";
import { UserMessage } from "@/components/shared/message";
import Header from "@/components/shared/header";
import { type AI } from "./action";
import { ChatScrollAnchor } from "@/lib/hooks/chat-scroll-anchor";
import { ChatList } from "@/components/chat-list";
import { EmptyScreen } from "@/components/empty-screen";
import { Sidebar } from "@/components/sidebar";
import { Search } from "@/components/search";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();

  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("ask");

    if (query) {
      const submit = async () => {
        // Add user message UI
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: Date.now(),
            display: <UserMessage>{query}</UserMessage>,
          },
        ]);

        // Submit and get response message
        const responseMessage = await submitUserMessage(query);
        setMessages((currentMessages) => [...currentMessages, responseMessage]);
      };
      submit();
    }
  }, [searchParams, setMessages, submitUserMessage]);

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <main className="flex flex-col flex-1 bg-muted/50">
          <div className="pb-[200px] mt-4">
            {messages.length ? (
              <>
                <ChatList messages={messages} />
                <Sidebar
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
              </>
            ) : (
              <>
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
              </>
            )}
            <ChatScrollAnchor trackVisibility={true} />
          </div>
        </main>
      </div>
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
    </>
  );
}
