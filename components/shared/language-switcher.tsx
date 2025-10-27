"use client";

import React from "react";
import { useLanguage } from "@/components/shared/language";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="px-2 py-1 rounded-md border bg-white text-slate-900 text-sm shadow hover:bg-white/90"
        aria-label="Language switcher"
      >
        {lang === "en" ? "English" : "中文"}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setLang("en")}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("zh")}>中文</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
