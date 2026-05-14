import { cn } from "@/lib/utils";
import type { CognitiveLoadCategory } from "@/types";

interface Props {
  category: CognitiveLoadCategory;
  score?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const config: Record<
  CognitiveLoadCategory,
  { label: string; dot: string; text: string; bg: string; border: string }
> = {
  Low: {
    label: "Low",
    dot: "bg-[oklch(0.72_0.18_145)]",
    text: "text-[oklch(0.72_0.18_145)]",
    bg: "bg-[oklch(0.72_0.18_145/0.12)]",
    border: "border-[oklch(0.72_0.18_145/0.4)]",
  },
  Moderate: {
    label: "Moderate",
    dot: "bg-[oklch(0.75_0.16_85)]",
    text: "text-[oklch(0.75_0.16_85)]",
    bg: "bg-[oklch(0.75_0.16_85/0.12)]",
    border: "border-[oklch(0.75_0.16_85/0.4)]",
  },
  High: {
    label: "High",
    dot: "bg-[oklch(0.65_0.22_25)] animate-pulse-glow",
    text: "text-[oklch(0.65_0.22_25)]",
    bg: "bg-[oklch(0.65_0.22_25/0.12)]",
    border: "border-[oklch(0.65_0.22_25/0.4)]",
  },
};

const sizeClasses = {
  sm: "text-xs px-2 py-0.5 gap-1",
  md: "text-sm px-2.5 py-1 gap-1.5",
  lg: "text-base px-3 py-1.5 gap-2",
};

export function CognitiveLoadBadge({
  category,
  score,
  className,
  size = "md",
}: Props) {
  const c = config[category];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium font-display",
        c.bg,
        c.border,
        c.text,
        sizeClasses[size],
        className,
      )}
    >
      <span className={cn("rounded-full w-2 h-2 flex-shrink-0", c.dot)} />
      <span>Load: {c.label}</span>
      {score !== undefined && (
        <span className="opacity-70">({score.toFixed(0)}%)</span>
      )}
    </span>
  );
}
