"use client";

import Link from "next/link";
import { useLang } from "@/lib/LangContext";

export function CategoryActions({ slug }: { slug: string }) {
  const { t } = useLang();
  return (
    <div className="flex gap-3 mb-8">
      <Link
        href={`/quiz/${slug}`}
        className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors"
      >
        {t("cat.quiz-cat")}
      </Link>
      <Link
        href={`/flashcards/${slug}`}
        className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        {t("cat.flashcards")}
      </Link>
    </div>
  );
}
