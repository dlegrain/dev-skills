export type MasteryLevel = "unknown" | "learning" | "mastered";

export interface Concept {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDef: string;
  longDef: string;
  analogy: string;
  examples: string[];
  relatedConcepts: string[];
  tags: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface QuizQuestion {
  id: string;
  conceptId: string;
  question: string;
  answers: string[];
  correctIndex: number;
  explanation: string;
}

export interface ConceptProgress {
  conceptId: string;
  mastery: MasteryLevel;
  lastSeen: string;
  quizAttempts: number;
  quizCorrect: number;
}

export interface UserProgress {
  concepts: Record<string, ConceptProgress>;
  lastUpdated: string;
}
