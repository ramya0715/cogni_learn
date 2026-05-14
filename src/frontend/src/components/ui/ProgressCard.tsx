import { cn } from "@/lib/utils";
import type { CognitiveLoadCategory } from "@/types";

interface Props {
  subject: string;
  progress: number;
  completedTopics?: number;
  totalTopics?: number;
  cognitiveCategory?: CognitiveLoadCategory;
  className?: string;
  onClick?: () => void;
}

const loadColors: Record<CognitiveLoadCategory, string> = {
  Low: "bg-[oklch(0.72_0.18_145)]",
  Moderate: "bg-[oklch(0.75_0.16_85)]",
  High: "bg-[oklch(0.65_0.22_25)]",
};

export function ProgressCard({
  subject,
  progress,
  completedTopics,
  totalTopics,
  cognitiveCategory,
  className,
  onClick,
}: Props) {
  const pct = Math.min(100, Math.max(0, progress));
  const barColor = cognitiveCategory
    ? loadColors[cognitiveCategory]
    : "bg-primary";

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      onClick={onClick}
      className={cn(
        "glass-card p-4 flex flex-col gap-3 transition-smooth",
        onClick && "cursor-pointer hover:border-primary/40 hover:shadow-lg",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-foreground text-sm truncate">
          {subject}
        </h4>
        <span className="text-xs font-mono text-muted-foreground">
          {pct.toFixed(0)}%
        </span>
      </div>

      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            barColor,
          )}
          style={{ width: `${pct}%` }}
        />
      </div>

      {(completedTopics !== undefined || cognitiveCategory) && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {completedTopics !== undefined && totalTopics !== undefined && (
            <span>
              {completedTopics}/{totalTopics} topics
            </span>
          )}
          {cognitiveCategory && (
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-medium",
                cognitiveCategory === "Low" && "cognitive-low cognitive-low-bg",
                cognitiveCategory === "Moderate" &&
                  "cognitive-moderate cognitive-moderate-bg",
                cognitiveCategory === "High" &&
                  "cognitive-high cognitive-high-bg",
              )}
            >
              {cognitiveCategory}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
