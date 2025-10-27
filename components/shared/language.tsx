"use client";

import React from "react";

type Lang = "en" | "zh";

type Ctx = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (en: string, zh?: string) => string;
};

const LanguageContext = React.createContext<Ctx>({
  lang: "zh",
  setLang: () => {},
  t: (en: string, zh?: string) => zh ?? en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState<Lang>("zh");

  React.useEffect(() => {
    try {
      const saved = (localStorage.getItem("lang") as Lang | null) ?? null;
      if (saved === "en" || saved === "zh") {
        setLang(saved);
      } // else keep default Chinese
    } catch {}
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
      }
    } catch {}
  }, [lang]);

  const t = React.useCallback(
    (en: string, zh?: string) => (lang === "en" ? en : zh ?? en),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return React.useContext(LanguageContext);
}
