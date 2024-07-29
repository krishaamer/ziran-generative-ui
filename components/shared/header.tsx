"use client";

import ThemeSwitcher from "@/components/shared/theme";
import { useSession, SessionProvider } from "next-auth/react";

export default function Header() {
  const session = useSession();

  const username = session?.user?.name || "anon";

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between w-full px-4 border-b h-8 shrink-0 text-white bg-gradient-to-br from-pink-500 to-orange-400 font-medium text-sm text-center">
      <a href="/">綠濾助手</a>
      <a href="/">怎麼知道自己的錢花去支持了啥物呢？</a>
      <div>
        <div>
          <SessionProvider>
            <p>Welcome {username}</p>
          </SessionProvider>
        </div>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
