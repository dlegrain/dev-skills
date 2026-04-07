import { notFound } from "next/navigation";
import { CATEGORIES, getCategoryBySlug, getConceptsByCategory } from "@/lib/data-helpers";
import { FlashcardsClient } from "@/components/flashcard/FlashcardsClient";
import { CategoryPageHeader } from "@/components/categories/CategoryPageHeader";

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
      <CategoryPageHeader category={cat} mode="flashcards" count={concepts.length} />
      <FlashcardsClient concepts={concepts} categories={CATEGORIES} categorySlug={category} />
    </div>
  );
}
