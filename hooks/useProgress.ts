"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getProgress,
  setConceptMastery,
  recordQuizAnswer,
  getCategoryStats,
  getGlobalStats,
} from "@/lib/progress";
import { UserProgress, MasteryLevel } from "@/types/learning";

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>({
    concepts: {},
    lastUpdated: "",
  });

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const updateMastery = useCallback(
    (conceptId: string, mastery: MasteryLevel) => {
      setConceptMastery(conceptId, mastery);
      setProgress(getProgress());
    },
    []
  );

  const recordAnswer = useCallback(
    (conceptId: string, isCorrect: boolean) => {
      recordQuizAnswer(conceptId, isCorrect);
      setProgress(getProgress());
    },
    []
  );

  const getConceptMasteryLevel = useCallback(
    (conceptId: string): MasteryLevel => {
      return progress.concepts[conceptId]?.mastery ?? "unknown";
    },
    [progress]
  );

  const getCatStats = useCallback(
    (conceptIds: string[]) => {
      return getCategoryStats(conceptIds);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [progress]
  );

  const globalStats = getGlobalStats();

  return {
    progress,
    updateMastery,
    recordAnswer,
    getConceptMasteryLevel,
    getCatStats,
    globalStats,
  };
}
