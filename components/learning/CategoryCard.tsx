"use client";

import Link from "next/link";
import { Category } from "@/types/learning";
import { ProgressBar } from "./ProgressBar";
import { useLang } from "@/lib/LangContext";
import { translateCategory } from "@/lib/data-helpers";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  stats: { total: number; mastered: number; learning: number; unknown: number };
  className?: string;
}

export function CategoryCard({ category, stats, className }: CategoryCardProps) {
  const { lang, t } = useLang();
  const cat = translateCategory(category, lang);
  const percent = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;

  return (
    <Link href={`/categories/${cat.slug}`}>
      <div
        className={cn(
          "group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer h-full flex flex-col",
          className
        )}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-xl border", cat.color)}>
            {cat.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
              {cat.name}
            </h3>
            <p className="text-xs text-gray-500">{stats.total} {t("nav.concepts")}</p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{cat.description}</p>

        <div>
          <ProgressBar value={percent} showPercent color="indigo" />
          <div className="flex gap-3 mt-2 text-xs text-gray-500">
            <span className="text-green-600 font-medium">
              ✓ {stats.mastered} {t("mastery.mastered").toLowerCase()}
            </span>
            {stats.learning > 0 && (
              <span className="text-amber-600">◑ {stats.learning} {t("mastery.learning").toLowerCase()}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
