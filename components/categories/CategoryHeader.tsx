"use client";

import Link from "next/link";
import { Category } from "@/types/learning";
import { useLang } from "@/lib/LangContext";
import { translateCategory } from "@/lib/data-helpers";

interface Props {
  category: Category;
  conceptCount: number;
}

export function CategoryHeader({ category, conceptCount }: Props) {
  const { lang, t } = useLang();
  const cat = translateCategory(category, lang);

  return (
    <>
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-gray-600 transition-colors">{t("cat.home")}</Link>
        <span>/</span>
        <span className="text-gray-700">{cat.name}</span>
      </nav>

      <div className="flex items-center gap-4 mb-8">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border ${cat.color}`}>
          {cat.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{cat.name}</h1>
          <p className="text-gray-500 mt-0.5">{conceptCount} {t("nav.concepts")}</p>
        </div>
      </div>
    </>
  );
}
