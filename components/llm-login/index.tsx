"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { BotMessage } from "@/components/shared/message";
import Image from "next/image";
import { useLanguage } from "@/components/shared/language";

export function SignIn() {
  const { t } = useLanguage();
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
          {t("Sign in with Google", "用 Google 登入")}
        </Button>
      </form>
    </>
  );
}

export function LoginScreen() {
  const { t } = useLanguage();
  return (
    <>
      <BotMessage>{t("Please sign in to save results:", "請登入以儲存結果：")}</BotMessage>
      <div className="rounded-lg shadow-lg ring overflow-hidden">
        <SignIn />
      </div>
    </>
  );
}
