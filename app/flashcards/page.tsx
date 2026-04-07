"use client";

import { CONCEPTS, CATEGORIES } from "@/lib/data-helpers";
import { FlashcardsClient } from "@/components/flashcard/FlashcardsClient";
import { useLang } from "@/lib/LangContext";

export default function FlashcardsPage() {
  const { t } = useLang();
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">{t("fc.title")}</h1>
      <p className="text-gray-500 text-center mb-8">{t("fc.subtitle")}</p>
      <FlashcardsClient concepts={CONCEPTS} categories={CATEGORIES} />
    </div>
  );
}
