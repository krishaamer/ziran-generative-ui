"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FooterText } from "@/components/footer";
import Textarea from "react-textarea-autosize";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";

export function Search({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [inputValue, setInputValue] = useState("");
  const { formRef, onKeyDown } = useEnterSubmit();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        if (
          e.target &&
          ["INPUT", "TEXTAREA"].includes((e.target as any).nodeName)
        ) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (inputRef?.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef]);

  return (
    <div className="relative inset-x-0 bottom-0 w-full">
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div>
          <form
            ref={formRef}
            onSubmit={async (e: any) => {
              e.preventDefault();

              // Blur focus on mobile
              if (window.innerWidth < 600) {
                e.target["message"]?.blur();
              }

              const value = inputValue.trim();
              setInputValue("");
              if (!value) return;

              // Add user message UI
              submitMessage(value);
            }}
          >
            <div className="relative flex flex-col w-full px-4 overflow-hidden max-h-60 grow shadow-sm bg-background rounded-xl border">
              <Textarea
                ref={inputRef}
                tabIndex={0}
                onKeyDown={onKeyDown}
                placeholder="我的問題～～"
                className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                name="message"
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="absolute right-2 top-2 sm:right-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      size="lg"
                      disabled={inputValue === ""}
                    >
                      <span>問綠濾</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>問綠濾</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </form>
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  );
}
