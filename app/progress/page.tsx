"use client";

import { ProgressDashboard } from "@/components/progress/ProgressDashboard";
import { CATEGORIES, CONCEPTS } from "@/lib/data-helpers";
import { useLang } from "@/lib/LangContext";

export default function ProgressPage() {
  const { t } = useLang();
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("progress.title")}</h1>
      <p className="text-gray-500 mb-8">
        {CONCEPTS.length} {t("progress.subtitle")} {CATEGORIES.length} {t("progress.cats")}
      </p>
      <ProgressDashboard categories={CATEGORIES} concepts={CONCEPTS} />
    </div>
  );
}
