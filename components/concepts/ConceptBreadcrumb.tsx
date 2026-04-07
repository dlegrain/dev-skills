"use client";

import Link from "next/link";
import { Concept, Category } from "@/types/learning";
import { useLang } from "@/lib/LangContext";
import { translateConcept, translateCategory } from "@/lib/data-helpers";

interface Props {
  concept: Concept;
  category?: Category;
}

export function ConceptBreadcrumb({ concept, category }: Props) {
  const { lang } = useLang();
  const c = translateConcept(concept, lang);
  const cat = category ? translateCategory(category, lang) : null;

  return (
    <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2 flex-wrap">
      <Link href="/" className="hover:text-gray-600 transition-colors">🏠</Link>
      <span>/</span>
      {cat && (
        <>
          <Link href={`/categories/${cat.slug}`} className="hover:text-gray-600 transition-colors">
            {cat.name}
          </Link>
          <span>/</span>
        </>
      )}
      <span className="text-gray-700">{c.name}</span>
    </nav>
  );
}
