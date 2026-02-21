import { QuizClient } from "@/components/quiz/QuizClient";
import { QUIZ_QUESTIONS, CATEGORIES } from "@/lib/data-helpers";

export default function QuizPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Quiz global</h1>
      <p className="text-gray-500 text-center mb-8">
        Teste tes connaissances sur l&apos;ensemble des concepts
      </p>
      <QuizClient questions={QUIZ_QUESTIONS} categories={CATEGORIES} />
    </div>
  );
}
