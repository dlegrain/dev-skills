"use client";

import { Category } from "@/types/learning";
import { useLang } from "@/lib/LangContext";
import { translateCategory } from "@/lib/data-helpers";

interface Props {
  category: Category;
  mode: "quiz" | "flashcards";
  count: number;
}

export function CategoryPageHeader({ category, mode, count }: Props) {
  const { lang, t } = useLang();
  const cat = translateCategory(category, lang);

  const subtitle =
    mode === "quiz"
      ? `${count} ${t("quiz.available")}`
      : `${count} ${t("fc.cards-in-cat")}`;

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        {cat.icon} {mode === "quiz" ? "Quiz" : "Flashcards"} — {cat.name}
      </h1>
      <p className="text-gray-500 text-center mb-8">{subtitle}</p>
    </>
  );
}
