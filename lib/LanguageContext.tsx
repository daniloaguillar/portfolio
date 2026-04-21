"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale, translations } from "./translations";

type AnyTranslation = typeof translations[Locale];

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: AnyTranslation;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "pt",
  setLocale: () => {},
  t: translations.pt,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    // 1. Preferência salva manualmente pelo usuário
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "pt" || saved === "en" || saved === "es") {
      setLocaleState(saved);
      return;
    }

    // 2. Idioma do browser (navigator.language)
    const browserLang = navigator.language?.toLowerCase() ?? "";
    if (browserLang.startsWith("pt")) {
      setLocaleState("pt");
    } else if (browserLang.startsWith("es")) {
      setLocaleState("es");
    } else {
      // qualquer outro idioma → inglês
      setLocaleState("en");
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
