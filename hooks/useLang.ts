"use client";

import { useEffect, useState } from "react";
import { type Lang, t as translate } from "@/lib/i18n";

export function useLang() {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = localStorage.getItem("dev-skills-lang") as Lang | null;
    if (stored === "fr" || stored === "en") setLangState(stored);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("dev-skills-lang", l);
  }

  function t(key: string) {
    return translate(key, lang);
  }

  return { lang, setLang, t };
}
