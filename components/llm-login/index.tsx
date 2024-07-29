"use client";

import { signInWithGoogle } from "./authActions";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SignIn() {
  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await signInWithGoogle();
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
