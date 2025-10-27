"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/shared/language";

type ThemeProps = React.ComponentProps<typeof NextThemesProvider>;

export function Providers({ children, ...props }: ThemeProps) {
  return (
    <LanguageProvider>
      <NextThemesProvider {...props}>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </NextThemesProvider>
    </LanguageProvider>
  );
}
