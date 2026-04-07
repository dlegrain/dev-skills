"use client";

import { MasteryLevel } from "@/types/learning";
import { useLang } from "@/lib/LangContext";
import { cn } from "@/lib/utils";

interface MasteryBadgeProps {
  mastery: MasteryLevel;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const MASTERY_STYLES: Record<MasteryLevel, { classes: string; icon: string; key: string }> = {
  unknown:  { key: "mastery.unknown",  classes: "bg-gray-100 text-gray-500 border-gray-200",   icon: "○" },
  learning: { key: "mastery.learning", classes: "bg-amber-100 text-amber-700 border-amber-200", icon: "◑" },
  mastered: { key: "mastery.mastered", classes: "bg-green-100 text-green-700 border-green-200", icon: "●" },
};

const SIZE_CLASSES = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
  lg: "text-base px-4 py-1.5",
};

export function MasteryBadge({ mastery, size = "md", className }: MasteryBadgeProps) {
  const { t } = useLang();
  const cfg = MASTERY_STYLES[mastery];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium",
        cfg.classes,
        SIZE_CLASSES[size],
        className
      )}
    >
      <span aria-hidden="true">{cfg.icon}</span>
      {t(cfg.key)}
    </span>
  );
}
