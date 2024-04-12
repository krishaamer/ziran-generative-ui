"use client";

import ThemeSwitcher from "@/components/shared/theme";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between w-full px-4 border-b h-8 shrink-0 text-white bg-gradient-to-br from-pink-500 to-orange-400 font-medium text-sm text-center">
      <a href="/">綠濾助手</a>
      <a href="/">怎麼知道自己的錢花去支持了啥物呢？</a>
      <div>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
