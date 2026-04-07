"use client";

import { QuizClient } from "@/components/quiz/QuizClient";
import { QUIZ_QUESTIONS, CATEGORIES } from "@/lib/data-helpers";
import { useLang } from "@/lib/LangContext";

export default function QuizPage() {
  const { t } = useLang();
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">{t("quiz.global-title")}</h1>
      <p className="text-gray-500 text-center mb-8">{t("quiz.global-sub")}</p>
      <QuizClient questions={QUIZ_QUESTIONS} categories={CATEGORIES} />
    </div>
  );
}
