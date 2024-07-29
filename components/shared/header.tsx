"use client";

import ThemeSwitcher from "@/components/shared/theme";
import { useSession, signOut } from "next-auth/react";
import SignIn from "../llm-login";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export default function Header() {
  const session = useSession();

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between w-full px-4 border-b h-8 shrink-0 text-white bg-gradient-to-br from-pink-500 to-orange-400 font-medium text-sm text-center">
      <a href="/">綠濾助手</a>
      <a href="/">怎麼知道自己的錢花去支持了啥物呢？</a>
      <div className="flex space-x-4">
        <div>
          {session?.data?.user?.name ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                {session?.data?.user?.name}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>我的帳戶</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button onClick={() => signOut()}>登出</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <SignIn />
          )}
        </div>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
