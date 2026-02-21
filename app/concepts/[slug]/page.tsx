import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CONCEPTS,
  getConceptBySlug,
  getCategoryBySlug,
  getRelatedConcepts,
} from "@/lib/data-helpers";
import { ConceptDetail } from "@/components/concepts/ConceptDetail";

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
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-gray-600 transition-colors">
          Accueil
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link
              href={`/categories/${category.slug}`}
              className="hover:text-gray-600 transition-colors"
            >
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-700">{concept.name}</span>
      </nav>

      {/* Contenu de la fiche avec boutons de niveau (client) */}
      <ConceptDetail concept={concept} related={related} />

      {/* Actions */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex gap-3 flex-wrap">
        <Link
          href={`/quiz/${concept.category}`}
          className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors"
        >
          Quiz sur cette catégorie
        </Link>
        <Link
          href={`/flashcards/${concept.category}`}
          className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Flashcards
        </Link>
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            ← Retour à {category.name}
          </Link>
        )}
      </div>
    </div>
  );
}
