"use client";

import { useState } from "react";
import { QuizQuestion as QuizQuestionType } from "@/types/learning";
import { useLang } from "@/lib/LangContext";
import { cn } from "@/lib/utils";

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedIndex: number, isCorrect: boolean) => void;
}

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const { t } = useLang();
  const answered = selected !== null;

  function handleSelect(index: number) {
    if (answered) return;
    setSelected(index);
    const isCorrect = index === question.correctIndex;
    onAnswer(index, isCorrect);
  }

  function getButtonStyle(index: number) {
    if (!answered) {
      return "border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer";
    }
    if (index === question.correctIndex) {
      return "border-green-400 bg-green-50 text-green-800";
    }
    if (index === selected) {
      return "border-red-400 bg-red-50 text-red-800";
    }
    return "border-gray-200 bg-gray-50 text-gray-400";
  }

  const letters = ["A", "B", "C", "D"];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-500">
          {t("quiz.question-of")} {questionNumber} / {totalQuestions}
        </span>
        <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <p className="text-lg font-medium text-gray-900 leading-relaxed">
          {question.question}
        </p>
      </div>

      {/* Answers */}
      <div className="grid gap-3">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={cn(
              "w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 flex items-start gap-3",
              getButtonStyle(index)
            )}
          >
            <span className="font-bold text-sm shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
              {letters[index]}
            </span>
            <span className="text-sm leading-relaxed">{answer}</span>
          </button>
        ))}
      </div>

      {/* Explanation */}
      {answered && (
        <div
          className={cn(
            "mt-4 p-4 rounded-xl border text-sm leading-relaxed",
            selected === question.correctIndex
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-amber-50 border-amber-200 text-amber-800"
          )}
        >
          <span className="font-semibold">
            {selected === question.correctIndex ? t("quiz.correct") : t("quiz.incorrect")}
          </span>
          {question.explanation}
        </div>
      )}
    </div>
  );
}
