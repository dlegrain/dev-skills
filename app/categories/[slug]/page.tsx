import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CATEGORIES,
  getCategoryBySlug,
  getConceptsByCategory,
} from "@/lib/data-helpers";
import { CategoryConceptList } from "@/components/categories/CategoryConceptList";

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
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-gray-600 transition-colors">
          Accueil
        </Link>
        <span>/</span>
        <span className="text-gray-700">{category.name}</span>
      </nav>

      {/* Header catégorie */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border ${category.color}`}
        >
          {category.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
          <p className="text-gray-500 mt-0.5">
            {concepts.length} concept{concepts.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-8">
        <Link
          href={`/quiz/${slug}`}
          className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors"
        >
          Quiz sur cette catégorie
        </Link>
        <Link
          href={`/flashcards/${slug}`}
          className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Flashcards
        </Link>
      </div>

      {/* Liste des concepts avec progression */}
      <CategoryConceptList concepts={concepts} />
    </div>
  );
}
