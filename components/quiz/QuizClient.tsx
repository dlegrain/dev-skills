"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { QuizQuestion as QuizQuestionType, Category } from "@/types/learning";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResults } from "./QuizResults";
import { shuffleArray, translateCategory, translateQuestion } from "@/lib/data-helpers";
import { recordQuizAnswer } from "@/lib/progress";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/LangContext";

interface QuizClientProps {
  questions: QuizQuestionType[];
  categories: Category[];
  categorySlug?: string;
}

type Phase = "idle" | "playing" | "finished";
const COUNTS = [5, 10, 15];

export function QuizClient({ questions, categories, categorySlug }: QuizClientProps) {
  const router = useRouter();
  const { t, lang } = useLang();
  const [phase, setPhase] = useState<Phase>("idle");
  const [count, setCount] = useState(10);
  const [shuffled, setShuffled] = useState<QuizQuestionType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [waitingNext, setWaitingNext] = useState(false);

  function startQuiz() {
    const pool = shuffleArray(questions).slice(0, Math.min(count, questions.length));
    setShuffled(pool);
    setCurrentIndex(0);
    setCorrectCount(0);
    setWaitingNext(false);
    setPhase("playing");
  }

  const handleAnswer = useCallback(
    (selectedIndex: number, isCorrect: boolean) => {
      const q = shuffled[currentIndex];
      recordQuizAnswer(q.conceptId, isCorrect);
      if (isCorrect) setCorrectCount((n) => n + 1);
      setWaitingNext(true);

      setTimeout(() => {
        if (currentIndex + 1 >= shuffled.length) {
          setPhase("finished");
        } else {
          setCurrentIndex((i) => i + 1);
          setWaitingNext(false);
        }
      }, 1800);
    },
    [currentIndex, shuffled]
  );

  if (phase === "idle") {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        {/* Category filter */}
        {!categorySlug && (
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">{t("quiz.by-category")}</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const tc = translateCategory(cat, lang);
                return (
                  <Link
                    key={cat.slug}
                    href={`/quiz/${cat.slug}`}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-xl hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                  >
                    {tc.icon} {tc.name}
                  </Link>
                );
              })}
            </div>
            <hr className="my-6 border-gray-100" />
          </div>
        )}

        {/* Question count */}
        <p className="text-sm font-medium text-gray-700 mb-3">{t("quiz.nb-questions")}</p>
        <div className="flex gap-3 mb-6 flex-wrap">
          {COUNTS.filter((c) => c <= questions.length).map((c) => (
            <button
              key={c}
              onClick={() => setCount(c)}
              className={`px-5 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                count === c
                  ? "bg-indigo-500 border-indigo-500 text-white"
                  : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300"
              }`}
            >
              {c}
            </button>
          ))}
          <button
            onClick={() => setCount(questions.length)}
            className={`px-5 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
              count === questions.length
                ? "bg-indigo-500 border-indigo-500 text-white"
                : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300"
            }`}
          >
            {t("quiz.all")} ({questions.length})
          </button>
        </div>

        <button
          onClick={startQuiz}
          className="w-full py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors"
        >
          {t("quiz.start")}
        </button>
      </div>
    );
  }

  if (phase === "finished") {
    return (
      <QuizResults
        correctCount={correctCount}
        totalCount={shuffled.length}
        onRestart={startQuiz}
        onGoHome={() => router.push("/")}
      />
    );
  }

  return (
    <div className={waitingNext ? "pointer-events-none" : ""}>
      <QuizQuestion
        key={currentIndex}
        question={translateQuestion(shuffled[currentIndex], lang)}
        questionNumber={currentIndex + 1}
        totalQuestions={shuffled.length}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
