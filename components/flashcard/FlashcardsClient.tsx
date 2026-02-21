"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Concept, Category, MasteryLevel } from "@/types/learning";
import { Flashcard } from "./Flashcard";
import { shuffleArray } from "@/lib/data-helpers";
import { getProgress, setConceptMastery } from "@/lib/progress";

interface FlashcardsClientProps {
  concepts: Concept[];
  categories: Category[];
  categorySlug?: string;
}

export function FlashcardsClient({
  concepts,
  categories,
  categorySlug,
}: FlashcardsClientProps) {
  const [deck, setDeck] = useState<Concept[]>(concepts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [masteryMap, setMasteryMap] = useState<Record<string, MasteryLevel>>({});

  useEffect(() => {
    const progress = getProgress();
    const map: Record<string, MasteryLevel> = {};
    for (const c of concepts) {
      map[c.id] = progress.concepts[c.id]?.mastery ?? "unknown";
    }
    setMasteryMap(map);
    setDeck(concepts);
    setCurrentIndex(0);
  }, [concepts]);

  function handleMasteryChange(mastery: MasteryLevel) {
    const concept = deck[currentIndex];
    setConceptMastery(concept.id, mastery);
    setMasteryMap((prev) => ({ ...prev, [concept.id]: mastery }));
  }

  function handleShuffle() {
    setDeck(shuffleArray(concepts));
    setCurrentIndex(0);
  }

  if (deck.length === 0) {
    return <p className="text-center text-gray-500">Aucune carte dans cette catégorie.</p>;
  }

  const current = deck[currentIndex];

  return (
    <div>
      {/* Filtre catégorie (sur page globale) */}
      {!categorySlug && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/flashcards/${cat.slug}`}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-xl hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>
          <hr className="my-6 border-gray-100" />
        </div>
      )}

      {/* Compteur + shuffle */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          Carte {currentIndex + 1} / {deck.length}
        </span>
        <button
          onClick={handleShuffle}
          className="text-sm text-indigo-500 hover:text-indigo-700 font-medium transition-colors"
        >
          🔀 Mélanger
        </button>
      </div>

      {/* Flashcard */}
      <Flashcard
        concept={current}
        mastery={masteryMap[current.id] ?? "unknown"}
        onMasteryChange={handleMasteryChange}
      />

      {/* Navigation */}
      <div className="flex gap-3 justify-center mt-6">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="px-5 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Précédente
        </button>
        <button
          onClick={() => setCurrentIndex((i) => Math.min(deck.length - 1, i + 1))}
          disabled={currentIndex === deck.length - 1}
          className="px-5 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Suivante →
        </button>
      </div>
    </div>
  );
}
