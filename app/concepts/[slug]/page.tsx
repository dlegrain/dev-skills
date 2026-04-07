import { notFound } from "next/navigation";
import {
  CONCEPTS,
  getConceptBySlug,
  getCategoryBySlug,
  getRelatedConcepts,
} from "@/lib/data-helpers";
import { ConceptDetail } from "@/components/concepts/ConceptDetail";
import { ConceptPageActions } from "@/components/concepts/ConceptPageActions";
import { ConceptBreadcrumb } from "@/components/concepts/ConceptBreadcrumb";

export function generateStaticParams() {
  return CONCEPTS.map((c) => ({ slug: c.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ConceptPage({ params }: Props) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) notFound();

  const category = getCategoryBySlug(concept.category);
  const related = getRelatedConcepts(concept);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <ConceptBreadcrumb concept={concept} category={category} />
      <ConceptDetail concept={concept} related={related} />
      <ConceptPageActions category={concept.category} categoryObj={category} />
    </div>
  );
}
