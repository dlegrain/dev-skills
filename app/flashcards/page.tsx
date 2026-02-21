import { CONCEPTS, CATEGORIES } from "@/lib/data-helpers";
import { FlashcardsClient } from "@/components/flashcard/FlashcardsClient";

export default function FlashcardsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Flashcards</h1>
      <p className="text-gray-500 text-center mb-8">
        Clique sur la carte pour voir la définition
      </p>
      <FlashcardsClient concepts={CONCEPTS} categories={CATEGORIES} />
    </div>
  );
}
