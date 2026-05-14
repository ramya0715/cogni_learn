import { Brain } from "lucide-react";

interface Props {
  message?: string;
}

export function LoadingScreen({ message = "Loading..." }: Props) {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center gap-4 z-50">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center animate-pulse-glow">
          <Brain size={32} className="text-primary" />
        </div>
        <div className="absolute -inset-2 rounded-3xl border-2 border-primary/20 animate-ping" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="font-display text-xl font-bold text-foreground tracking-tight">
          CogLearn
        </span>
        <span className="text-sm text-muted-foreground animate-pulse">
          {message}
        </span>
      </div>
    </div>
  );
}
