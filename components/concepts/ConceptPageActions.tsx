"use client";

import Link from "next/link";
import { Category } from "@/types/learning";
import { useLang } from "@/lib/LangContext";
import { translateCategory } from "@/lib/data-helpers";

interface Props {
  category: string;
  categoryObj?: Category;
}

export function ConceptPageActions({ category, categoryObj }: Props) {
  const { t, lang } = useLang();
  const cat = categoryObj ? translateCategory(categoryObj, lang) : null;
  return (
    <div className="mt-8 pt-6 border-t border-gray-100 flex gap-3 flex-wrap">
      <Link
        href={`/quiz/${category}`}
        className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors"
      >
        {t("concept.quiz-cat")}
      </Link>
      <Link
        href={`/flashcards/${category}`}
        className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        {t("cat.flashcards")}
      </Link>
      {cat && (
        <Link
          href={`/categories/${category}`}
          className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          {t("concept.back-to")} {cat.name}
        </Link>
      )}
    </div>
  );
}
