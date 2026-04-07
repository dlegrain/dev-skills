"use client";

import Link from "next/link";
import { useLang } from "@/lib/LangContext";

export function AppHeader() {
  const { lang, setLang, t } = useLang();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-base font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          🧠 Dev Skills
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link href="/" className="px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
            {t("nav.home")}
          </Link>
          <Link href="/quiz" className="px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
            {t("nav.quiz")}
          </Link>
          <Link href="/flashcards" className="px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
            {t("nav.flashcards")}
          </Link>
          <Link href="/progress" className="px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
            {t("nav.progress")}
          </Link>

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="ml-3 px-4 py-1.5 rounded-lg text-sm font-bold bg-indigo-500 text-white hover:bg-indigo-600 transition-colors shadow-sm"
            title={lang === "fr" ? "Switch to English" : "Switch to French"}
          >
            {lang === "fr" ? "🇬🇧 EN" : "🇫🇷 FR"}
          </button>
        </nav>
      </div>
    </header>
  );
}
