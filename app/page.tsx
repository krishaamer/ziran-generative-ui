"use client";

import React, { useEffect } from "react";
import { useUIState, useActions } from "ai/rsc";
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
  const { submitUserMessage } = useActions<typeof AI>();
  const searchParams = useSearchParams();

  useEffect(() => {
    const ask = searchParams.get("ask");
    const task = searchParams.get("task");

    const query =
      task == "compare"
        ? ask +
          " very important: think carefully and compare this product to other products and make a table with more sustainable product options"
        : task == "origin"
          ? ask +
            " very important: think carefully and explain where this product came from and what the potential environmental and social issues in that origin. Then ask if the user wants to see a map."
          : task == "explain"
            ? ask +
              ' very important: think carefully and explain this product and make a table with possible sustainability questions one could ask about this product. Format the questions as links in markdown referring locally to "?ask=" with the question URL-enconced'
            : ask;

    if (query) {
      const submit = async () => {
        // Add user message UI
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: Date.now(),
            display: <UserMessage>{ask}</UserMessage>,
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
