"use client";

import { Category } from "@/types/learning";
import { CategoryCard } from "@/components/learning/CategoryCard";
import { getCategoryStats, getGlobalStats } from "@/lib/progress";
import { getCategoryConceptIds } from "@/lib/data-helpers";
import { ProgressBar } from "@/components/learning/ProgressBar";
import { useEffect, useState } from "react";

interface HomeCategoryGridProps {
  categories: Category[];
}

export function HomeCategoryGrid({ categories }: HomeCategoryGridProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const globalStats = mounted ? getGlobalStats() : { mastered: 0, learning: 0, total: 0, percent: 0 };
  const TOTAL_CONCEPTS = 48;
  const globalPercent = mounted
    ? Math.round((globalStats.mastered / TOTAL_CONCEPTS) * 100)
    : 0;

  return (
    <div>
      {/* Progression globale */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Progression globale</h2>
          <span className="text-sm text-gray-500">
            {mounted ? globalStats.mastered : 0} / {TOTAL_CONCEPTS} concepts maîtrisés
          </span>
        </div>
        <ProgressBar value={globalPercent} showPercent color="indigo" />
        {mounted && globalStats.learning > 0 && (
          <p className="text-xs text-amber-600 mt-2">
            ◑ {globalStats.learning} concept{globalStats.learning > 1 ? "s" : ""} en apprentissage
          </p>
        )}
      </div>

      {/* Grille des catégories */}
      <h2 className="font-semibold text-gray-900 mb-4 text-lg">13 catégories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const conceptIds = getCategoryConceptIds(category.slug);
          const stats = mounted
            ? getCategoryStats(conceptIds)
            : { total: conceptIds.length, mastered: 0, learning: 0, unknown: conceptIds.length };
          return (
            <CategoryCard key={category.id} category={category} stats={stats} />
          );
        })}
      </div>
    </div>
  );
}
