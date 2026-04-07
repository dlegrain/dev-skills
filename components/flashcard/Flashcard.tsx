"use client";

import { useState } from "react";
import { Concept, MasteryLevel } from "@/types/learning";
import { MasteryBadge } from "@/components/learning/MasteryBadge";
import { useLang } from "@/lib/LangContext";
import { translateConcept } from "@/lib/data-helpers";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  concept: Concept;
  mastery: MasteryLevel;
  onMasteryChange: (mastery: MasteryLevel) => void;
}

export function Flashcard({ concept, mastery, onMasteryChange }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);
  const { t, lang } = useLang();
  const c = translateConcept(concept, lang);

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Flippable card */}
      <div
        className="flashcard-container w-full cursor-pointer"
        style={{ height: "320px" }}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className={cn("flashcard-inner w-full h-full relative", flipped && "flipped")}>
          {/* Front */}
          <div className="flashcard-front absolute inset-0 bg-white border-2 border-indigo-200 rounded-2xl p-8 flex flex-col items-center justify-center shadow-md">
            <p className="text-xs text-indigo-400 uppercase tracking-widest mb-4 font-medium">
              {t("fc.click-see")}
            </p>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
              {concept.name}
            </h2>
            <MasteryBadge mastery={mastery} size="sm" />
          </div>

          {/* Back */}
          <div className="flashcard-back absolute inset-0 bg-indigo-50 border-2 border-indigo-300 rounded-2xl p-6 flex flex-col justify-center shadow-md overflow-y-auto">
            <h3 className="text-lg font-bold text-indigo-900 mb-3 text-center">
              {concept.name}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-4 text-center">
              {c.shortDef}
            </p>
            <div className="bg-white/70 rounded-xl p-3 border border-indigo-200">
              <p className="text-xs text-indigo-600 font-semibold mb-1">{t("fc.analogy")}</p>
              <p className="text-sm text-gray-600 italic">{c.analogy}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-2 mb-4">
        {flipped ? t("fc.click-hide") : t("fc.click-see")}
      </p>

      {/* Mastery buttons */}
      <div className="flex gap-2 justify-center">
        {(["unknown", "learning", "mastered"] as MasteryLevel[]).map((level) => (
          <button
            key={level}
            onClick={() => onMasteryChange(level)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all",
              mastery === level
                ? level === "mastered"
                  ? "bg-green-100 border-green-400 text-green-700"
                  : level === "learning"
                  ? "bg-amber-100 border-amber-400 text-amber-700"
                  : "bg-gray-200 border-gray-400 text-gray-700"
                : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
            )}
          >
            {level === "unknown" ? `○ ${t("mastery.unknown")}` : level === "learning" ? `◑ ${t("mastery.learning")}` : `● ${t("mastery.mastered")}`}
          </button>
        ))}
      </div>
    </div>
  );
}
