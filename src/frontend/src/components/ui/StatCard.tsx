import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: { value: number; label: string };
  iconColor?: string;
  className?: string;
  animate?: boolean;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  iconColor = "text-primary",
  className,
  animate = true,
}: Props) {
  const trendPositive = trend && trend.value >= 0;
  return (
    <div
      className={cn(
        "glass-card p-4 flex flex-col gap-2",
        animate && "animate-fade-in",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          {label}
        </span>
        <span className={cn("p-2 rounded-lg bg-primary/10", iconColor)}>
          <Icon size={16} />
        </span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="text-2xl font-display font-bold text-foreground">
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium flex items-center gap-0.5 mb-0.5",
              trendPositive
                ? "text-[oklch(0.72_0.18_145)]"
                : "text-[oklch(0.65_0.22_25)]",
            )}
          >
            {trendPositive ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
          </span>
        )}
      </div>
    </div>
  );
}
