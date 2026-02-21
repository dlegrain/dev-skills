import Link from "next/link";
import { CATEGORIES, CONCEPTS } from "@/lib/data-helpers";
import { HomeCategoryGrid } from "@/components/home/HomeCategoryGrid";

export default function Home() {
  const totalConcepts = CONCEPTS.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Maîtrise les concepts tech
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          {totalConcepts} concepts à apprendre, en quiz ou en flashcards. Suis
          ta progression et deviens capable de les réexpliquer à d&apos;autres.
        </p>
        <div className="flex gap-3 justify-center mt-6">
          <Link
            href="/quiz"
            className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors"
          >
            Commencer un quiz
          </Link>
          <Link
            href="/flashcards"
            className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Mode flashcards
          </Link>
        </div>
      </div>

      {/* Grille des catégories avec progression */}
      <HomeCategoryGrid categories={CATEGORIES} />
    </div>
  );
}
