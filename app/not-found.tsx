"use client";

import Link from "next/link";
import { useLang } from "@/lib/LangContext";

export default function NotFound() {
  const { t } = useLang();
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("404.title")}</h1>
      <p className="text-gray-500 mb-6">{t("404.message")}</p>
      <Link
        href="/"
        className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors"
      >
        {t("404.home")}
      </Link>
    </div>
  );
}
