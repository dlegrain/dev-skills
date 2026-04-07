import { notFound } from "next/navigation";
import { CATEGORIES, getCategoryBySlug, getQuestionsByCategory } from "@/lib/data-helpers";
import { QuizClient } from "@/components/quiz/QuizClient";
import { CategoryPageHeader } from "@/components/categories/CategoryPageHeader";

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
      <CategoryPageHeader category={cat} mode="quiz" count={questions.length} />
      <QuizClient questions={questions} categories={CATEGORIES} categorySlug={category} />
    </div>
  );
}
