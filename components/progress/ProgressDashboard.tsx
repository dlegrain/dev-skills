"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Category, Concept, MasteryLevel } from "@/types/learning";
import { getProgress, resetProgress, getCategoryStats, getRecentlySeen } from "@/lib/progress";
import { ProgressBar } from "@/components/learning/ProgressBar";
import { MasteryBadge } from "@/components/learning/MasteryBadge";
import { getCategoryConceptIds, getConceptBySlug } from "@/lib/data-helpers";
import { useLang } from "@/lib/LangContext";

interface ProgressDashboardProps {
  categories: Category[];
  concepts: Concept[];
}

export function ProgressDashboard({ categories, concepts }: ProgressDashboardProps) {
  const [mounted, setMounted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [, setRefresh] = useState(0);
  const { t } = useLang();

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleReset() {
    resetProgress();
    setShowConfirm(false);
    setRefresh((n) => n + 1);
  }

  if (!mounted) {
    return <div className="text-gray-400 text-center py-10">{t("progress.loading")}</div>;
  }

  const progress = getProgress();
  const totalConcepts = concepts.length;
  const mastered = Object.values(progress.concepts).filter((c) => c.mastery === "mastered").length;
  const learning = Object.values(progress.concepts).filter((c) => c.mastery === "learning").length;
  const globalPercent = Math.round((mastered / totalConcepts) * 100);
  const recentlySeen = getRecentlySeen(6);

  return (
    <div className="space-y-8">
      {/* Global stats */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-4">{t("progress.overview")}</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{mastered}</div>
            <div className="text-xs text-gray-500 mt-1">{t("progress.mastered")}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600">{learning}</div>
            <div className="text-xs text-gray-500 mt-1">{t("progress.learning")}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-400">
              {totalConcepts - mastered - learning}
            </div>
            <div className="text-xs text-gray-500 mt-1">{t("progress.not-seen")}</div>
          </div>
        </div>
        <ProgressBar
          value={globalPercent}
          label={`${mastered} / ${totalConcepts} ${t("progress.mastered-of")}`}
          showPercent
          color="green"
        />
      </div>

      {/* By category */}
      <div>
        <h2 className="font-semibold text-gray-900 mb-4">{t("progress.by-cat")}</h2>
        <div className="space-y-3">
          {categories.map((cat) => {
            const conceptIds = getCategoryConceptIds(cat.slug);
            const stats = getCategoryStats(conceptIds);
            const pct = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;
            return (
              <div
                key={cat.slug}
                className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4"
              >
                <span className="text-2xl shrink-0">{cat.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors"
                    >
                      {cat.name}
                    </Link>
                    <span className="text-xs text-gray-500 shrink-0 ml-2">
                      {stats.mastered}/{stats.total}
                    </span>
                  </div>
                  <ProgressBar value={pct} color={pct === 100 ? "green" : "indigo"} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recently seen */}
      {recentlySeen.length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-900 mb-4">{t("progress.recent")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recentlySeen.map((p) => {
              const concept = concepts.find((c) => c.id === p.conceptId);
              if (!concept) return null;
              return (
                <Link
                  key={p.conceptId}
                  href={`/concepts/${concept.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between hover:border-indigo-200 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">{concept.name}</span>
                  <MasteryBadge mastery={p.mastery as MasteryLevel} size="sm" />
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Reset */}
      <div className="pt-4 border-t border-gray-100">
        {showConfirm ? (
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-600">{t("progress.reset-confirm")}</p>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500 text-white text-sm rounded-xl hover:bg-red-600 transition-colors"
            >
              {t("progress.confirm")}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-xl hover:bg-gray-200 transition-colors"
            >
              {t("progress.cancel")}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirm(true)}
            className="text-sm text-red-400 hover:text-red-600 transition-colors"
          >
            {t("progress.reset")}
          </button>
        )}
      </div>
    </div>
  );
}
