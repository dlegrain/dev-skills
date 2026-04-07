import { CONCEPTS } from "@/data/concepts";
import { CATEGORIES } from "@/data/categories";
import { QUIZ_QUESTIONS } from "@/data/questions";
import { CONCEPTS_EN } from "@/data/concepts.en";
import { CATEGORIES_EN } from "@/data/categories.en";
import { QUESTIONS_EN } from "@/data/questions.en";
import { Concept, Category, QuizQuestion } from "@/types/learning";
import type { Lang } from "@/lib/i18n";

export function translateConcept(concept: Concept, lang: Lang): Concept {
  if (lang === "fr") return concept;
  const en = CONCEPTS_EN[concept.id];
  if (!en) return concept;
  return { ...concept, shortDef: en.shortDef, longDef: en.longDef, analogy: en.analogy };
}

export function translateCategory(category: Category, lang: Lang): Category {
  if (lang === "fr") return category;
  const en = CATEGORIES_EN[category.id];
  if (!en) return category;
  return { ...category, name: en.name, description: en.description };
}

export function translateQuestion(question: QuizQuestion, lang: Lang): QuizQuestion {
  if (lang === "fr") return question;
  const en = QUESTIONS_EN[question.id];
  if (!en) return question;
  return { ...question, question: en.question, answers: en.answers, explanation: en.explanation };
}

export function getConceptBySlug(slug: string): Concept | undefined {
  return CONCEPTS.find((c) => c.slug === slug);
}

export function getConceptsByCategory(categorySlug: string): Concept[] {
  return CONCEPTS.filter((c) => c.category === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getQuestionsByCategory(categorySlug: string): QuizQuestion[] {
  const conceptIds = getConceptsByCategory(categorySlug).map((c) => c.id);
  return QUIZ_QUESTIONS.filter((q) => conceptIds.includes(q.conceptId));
}

export function getQuestionsByConcept(conceptId: string): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter((q) => q.conceptId === conceptId);
}

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getRelatedConcepts(concept: Concept): Concept[] {
  return concept.relatedConcepts
    .map((slug) => getConceptBySlug(slug))
    .filter((c): c is Concept => c !== undefined)
    .slice(0, 4);
}

export function searchConcepts(query: string): Concept[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return CONCEPTS.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.shortDef.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q))
  ).slice(0, 8);
}

export function getAllConceptIds(): string[] {
  return CONCEPTS.map((c) => c.id);
}

export function getCategoryConceptIds(categorySlug: string): string[] {
  return getConceptsByCategory(categorySlug).map((c) => c.id);
}

export { CATEGORIES, CONCEPTS, QUIZ_QUESTIONS };
