import { notFound } from "next/navigation";
import {
  CATEGORIES,
  getCategoryBySlug,
  getConceptsByCategory,
} from "@/lib/data-helpers";
import { FlashcardsClient } from "@/components/flashcard/FlashcardsClient";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryFlashcardsPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const concepts = getConceptsByCategory(category);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        {cat.icon} Flashcards — {cat.name}
      </h1>
      <p className="text-gray-500 text-center mb-8">
        {concepts.length} carte{concepts.length > 1 ? "s" : ""} dans cette catégorie
      </p>
      <FlashcardsClient concepts={concepts} categories={CATEGORIES} categorySlug={category} />
    </div>
  );
}
