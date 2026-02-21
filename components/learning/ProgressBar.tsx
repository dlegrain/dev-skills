import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  color?: "indigo" | "green" | "amber";
  showPercent?: boolean;
  className?: string;
}

const COLOR_CLASSES = {
  indigo: "bg-indigo-500",
  green: "bg-green-500",
  amber: "bg-amber-500",
};

export function ProgressBar({
  value,
  label,
  color = "indigo",
  showPercent = false,
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-xs text-gray-500 font-medium">{label}</span>
          )}
          {showPercent && (
            <span className="text-xs text-gray-500 font-medium">{pct}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            "h-2 rounded-full transition-all duration-500 ease-out",
            COLOR_CLASSES[color]
          )}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
