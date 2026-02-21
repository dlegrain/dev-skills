import { notFound } from "next/navigation";
import {
  CATEGORIES,
  getCategoryBySlug,
  getQuestionsByCategory,
} from "@/lib/data-helpers";
import { QuizClient } from "@/components/quiz/QuizClient";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryQuizPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const questions = getQuestionsByCategory(category);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        {cat.icon} Quiz — {cat.name}
      </h1>
      <p className="text-gray-500 text-center mb-8">
        {questions.length} questions disponibles
      </p>
      <QuizClient questions={questions} categories={CATEGORIES} categorySlug={category} />
    </div>
  );
}
