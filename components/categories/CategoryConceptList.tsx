"use client";

import { useEffect, useState } from "react";
import { Concept, MasteryLevel } from "@/types/learning";
import { ConceptCard } from "@/components/learning/ConceptCard";
import { getProgress } from "@/lib/progress";

interface CategoryConceptListProps {
  concepts: Concept[];
}

export function CategoryConceptList({ concepts }: CategoryConceptListProps) {
  const [masteryMap, setMasteryMap] = useState<Record<string, MasteryLevel>>({});

  useEffect(() => {
    const progress = getProgress();
    const map: Record<string, MasteryLevel> = {};
    for (const c of concepts) {
      map[c.id] = progress.concepts[c.id]?.mastery ?? "unknown";
    }
    setMasteryMap(map);
  }, [concepts]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {concepts.map((concept) => (
        <ConceptCard
          key={concept.id}
          concept={concept}
          mastery={masteryMap[concept.id] ?? "unknown"}
        />
      ))}
    </div>
  );
}
