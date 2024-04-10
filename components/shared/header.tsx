"use client";

import ThemeSwitcher from "@/components/shared/theme";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between w-full px-4 border-b h-8 shrink-0 bg-background uppercase">
      <div />
      <a href="/">綠濾</a>
      <div>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
