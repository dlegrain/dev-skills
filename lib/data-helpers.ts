import { CONCEPTS } from "@/data/concepts";
import { CATEGORIES } from "@/data/categories";
import { QUIZ_QUESTIONS } from "@/data/questions";
import { Concept, Category, QuizQuestion } from "@/types/learning";

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
