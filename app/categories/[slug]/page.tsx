import { notFound } from "next/navigation";
import { CATEGORIES, getCategoryBySlug, getConceptsByCategory } from "@/lib/data-helpers";
import { CategoryConceptList } from "@/components/categories/CategoryConceptList";
import { CategoryHeader } from "@/components/categories/CategoryHeader";
import { CategoryActions } from "@/components/categories/CategoryActions";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const concepts = getConceptsByCategory(slug);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <CategoryHeader category={category} conceptCount={concepts.length} />
      <CategoryActions slug={slug} />
      <CategoryConceptList concepts={concepts} />
    </div>
  );
}
