"use client";

import Link from "next/link";
import { CONCEPTS } from "@/lib/data-helpers";
import { CATEGORIES } from "@/lib/data-helpers";
import { HomeCategoryGrid } from "@/components/home/HomeCategoryGrid";
import { useLang } from "@/lib/LangContext";

export default function Home() {
  const { t } = useLang();
  const totalConcepts = CONCEPTS.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          {t("home.title")}
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          {totalConcepts} {t("home.subtitle")}
        </p>
        <div className="flex gap-3 justify-center mt-6">
          <Link
            href="/quiz"
            className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors"
          >
            {t("home.start-quiz")}
          </Link>
          <Link
            href="/flashcards"
            className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            {t("home.flashcards")}
          </Link>
        </div>
      </div>

      <HomeCategoryGrid categories={CATEGORIES} />
    </div>
  );
}
