"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Concept, MasteryLevel } from "@/types/learning";
import { MasteryBadge } from "@/components/learning/MasteryBadge";
import { getProgress, setConceptMastery } from "@/lib/progress";
import { useLang } from "@/lib/LangContext";
import { translateConcept } from "@/lib/data-helpers";
import { cn } from "@/lib/utils";

interface ConceptDetailProps {
  concept: Concept;
  related: Concept[];
}

export function ConceptDetail({ concept, related }: ConceptDetailProps) {
  const [mastery, setMastery] = useState<MasteryLevel>("unknown");
  const { t, lang } = useLang();
  const c = translateConcept(concept, lang);

  useEffect(() => {
    const progress = getProgress();
    setMastery(progress.concepts[concept.id]?.mastery ?? "unknown");
  }, [concept.id]);

  function handleMastery(level: MasteryLevel) {
    setConceptMastery(concept.id, level);
    setMastery(level);
  }

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{c.name}</h1>
        <MasteryBadge mastery={mastery} />
      </div>

      {/* Mastery buttons */}
      <div className="flex gap-2 mb-8 flex-wrap">
        <span className="text-sm text-gray-500 self-center">{t("mastery.my-level")}</span>
        {(["unknown", "learning", "mastered"] as MasteryLevel[]).map((level) => (
          <button
            key={level}
            onClick={() => handleMastery(level)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all",
              mastery === level
                ? level === "mastered"
                  ? "bg-green-100 border-green-400 text-green-700"
                  : level === "learning"
                  ? "bg-amber-100 border-amber-400 text-amber-700"
                  : "bg-gray-100 border-gray-400 text-gray-700"
                : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
            )}
          >
            {level === "unknown" ? `○ ${t("mastery.unknown")}` : level === "learning" ? `◑ ${t("mastery.learning")}` : `● ${t("mastery.mastered")}`}
          </button>
        ))}
      </div>

      {/* Short def */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
        <p className="text-indigo-900 font-medium">{c.shortDef}</p>
      </div>

      {/* Long def */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{t("concept.full-explanation")}</h2>
        <p className="text-gray-700 leading-relaxed">{c.longDef}</p>
      </section>

      {/* Analogy */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{t("concept.analogy")}</h2>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <p className="text-amber-900 italic">&ldquo;{c.analogy}&rdquo;</p>
        </div>
      </section>

      {/* Examples */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{t("concept.examples")}</h2>
        <ul className="space-y-2">
          {c.examples.map((ex, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-indigo-400 font-bold shrink-0 mt-0.5">→</span>
              <code className="text-sm bg-gray-100 rounded-lg px-3 py-1.5 text-gray-800 flex-1 leading-relaxed font-mono">
                {ex}
              </code>
            </li>
          ))}
        </ul>
      </section>

      {/* Tags */}
      {c.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {c.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Related concepts */}
      {related.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">{t("concept.related")}</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => {
              const rc = translateConcept(r, lang);
              return (
                <Link
                  key={r.slug}
                  href={`/concepts/${r.slug}`}
                  className="px-3 py-1.5 bg-white border border-gray-200 text-sm text-gray-700 rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                >
                  {rc.name}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
