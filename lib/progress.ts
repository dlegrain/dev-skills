import { UserProgress, ConceptProgress, MasteryLevel } from "@/types/learning";

const STORAGE_KEY = "dev-skills-progress";

export function getProgress(): UserProgress {
  if (typeof window === "undefined") {
    return { concepts: {}, lastUpdated: "" };
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return { concepts: {}, lastUpdated: new Date().toISOString() };
  try {
    return JSON.parse(stored) as UserProgress;
  } catch {
    return { concepts: {}, lastUpdated: new Date().toISOString() };
  }
}

export function setConceptMastery(conceptId: string, mastery: MasteryLevel): void {
  const progress = getProgress();
  const existing = progress.concepts[conceptId];
  progress.concepts[conceptId] = {
    conceptId,
    mastery,
    lastSeen: new Date().toISOString(),
    quizAttempts: existing?.quizAttempts ?? 0,
    quizCorrect: existing?.quizCorrect ?? 0,
  };
  progress.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function recordQuizAnswer(conceptId: string, isCorrect: boolean): void {
  const progress = getProgress();
  const existing: ConceptProgress = progress.concepts[conceptId] ?? {
    conceptId,
    mastery: "unknown" as MasteryLevel,
    lastSeen: new Date().toISOString(),
    quizAttempts: 0,
    quizCorrect: 0,
  };
  existing.quizAttempts += 1;
  existing.quizCorrect += isCorrect ? 1 : 0;

  // Mise à jour automatique du niveau selon le taux de réussite
  const rate = existing.quizCorrect / existing.quizAttempts;
  if (existing.quizAttempts >= 3 && rate >= 0.8) {
    existing.mastery = "mastered";
  } else if (existing.quizAttempts >= 1 && existing.mastery === "unknown") {
    existing.mastery = "learning";
  }
  existing.lastSeen = new Date().toISOString();
  progress.concepts[conceptId] = existing;
  progress.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getConceptMastery(conceptId: string): MasteryLevel {
  const progress = getProgress();
  return progress.concepts[conceptId]?.mastery ?? "unknown";
}

export function getCategoryStats(conceptIds: string[]): {
  total: number;
  mastered: number;
  learning: number;
  unknown: number;
} {
  const progress = getProgress();
  const total = conceptIds.length;
  const mastered = conceptIds.filter(
    (id) => progress.concepts[id]?.mastery === "mastered"
  ).length;
  const learning = conceptIds.filter(
    (id) => progress.concepts[id]?.mastery === "learning"
  ).length;
  return { total, mastered, learning, unknown: total - mastered - learning };
}

export function getGlobalStats(): {
  total: number;
  mastered: number;
  learning: number;
  percent: number;
} {
  const progress = getProgress();
  const all = Object.values(progress.concepts);
  const mastered = all.filter((c) => c.mastery === "mastered").length;
  const learning = all.filter((c) => c.mastery === "learning").length;
  return {
    total: all.length,
    mastered,
    learning,
    percent: all.length > 0 ? Math.round((mastered / all.length) * 100) : 0,
  };
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getRecentlySeen(limit = 5): ConceptProgress[] {
  const progress = getProgress();
  return Object.values(progress.concepts)
    .filter((c) => c.lastSeen)
    .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen))
    .slice(0, limit);
}
