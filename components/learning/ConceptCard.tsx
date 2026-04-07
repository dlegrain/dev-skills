"use client";

import Link from "next/link";
import { Concept, MasteryLevel } from "@/types/learning";
import { MasteryBadge } from "./MasteryBadge";
import { useLang } from "@/lib/LangContext";
import { translateConcept } from "@/lib/data-helpers";
import { cn } from "@/lib/utils";

interface ConceptCardProps {
  concept: Concept;
  mastery: MasteryLevel;
  compact?: boolean;
  className?: string;
}

export function ConceptCard({ concept, mastery, compact = false, className }: ConceptCardProps) {
  const { lang } = useLang();
  const c = translateConcept(concept, lang);

  return (
    <Link href={`/concepts/${c.slug}`}>
      <div
        className={cn(
          "group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer",
          className
        )}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {c.name}
          </h3>
          <MasteryBadge mastery={mastery} size="sm" />
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{c.shortDef}</p>
        {!compact && c.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {c.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
