"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { BotMessage } from "@/components/shared/message";
import Image from "next/image";

export function SignIn() {
  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await signIn("google");
        }}
      >
        <Button type="submit" variant="ghost">
          <Image
            src="/google-logo.svg"
            width={16}
            height={16}
            alt="Login with Google"
            className="mr-2 h-4 w-4"
          />
          用 Google 登入
        </Button>
      </form>
    </>
  );
}

export function LoginScreen() {
  return (
    <>
      <BotMessage>請登入以儲存結果：</BotMessage>
      <div className="rounded-lg shadow-lg ring overflow-hidden">
        <SignIn />
      </div>
    </>
  );
}
