import Link from "next/link";
import { Concept } from "@/types/learning";
import { MasteryLevel } from "@/types/learning";
import { MasteryBadge } from "./MasteryBadge";
import { cn } from "@/lib/utils";

interface ConceptCardProps {
  concept: Concept;
  mastery: MasteryLevel;
  compact?: boolean;
  className?: string;
}

export function ConceptCard({
  concept,
  mastery,
  compact = false,
  className,
}: ConceptCardProps) {
  return (
    <Link href={`/concepts/${concept.slug}`}>
      <div
        className={cn(
          "group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer",
          className
        )}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {concept.name}
          </h3>
          <MasteryBadge mastery={mastery} size="sm" />
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {concept.shortDef}
        </p>
        {!compact && concept.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {concept.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
