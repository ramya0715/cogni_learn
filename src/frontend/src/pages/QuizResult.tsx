import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { QuizQuestion, QuizResultSummary } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  LayoutDashboard,
  Lightbulb,
  MinusCircle,
  RefreshCw,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface StoredResult {
  result: QuizResultSummary;
  questions: QuizQuestion[];
  answers: Record<string, string>;
  config: {
    subject: string;
    difficulty: string;
    stressLevel: number;
    confidenceLevel: number;
  };
  timeTaken: number;
}

function formatTime(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}m ${s}s`;
}

function cognitiveColor(cat: string) {
  if (cat === "High")
    return "bg-destructive/20 text-destructive border-destructive/30";
  if (cat === "Moderate")
    return "bg-amber-500/20 text-amber-400 border-amber-500/30";
  return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
}

function scoreColor(accuracy: number) {
  if (accuracy >= 70) return "text-emerald-400";
  if (accuracy >= 40) return "text-amber-400";
  return "text-destructive";
}

export default function QuizResult() {
  const { sessionId } = useParams({ from: "/quiz/result/$sessionId" });
  const navigate = useNavigate();
  const [stored, setStored] = useState<StoredResult | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem(`quiz_result_${sessionId}`);
    if (raw) setStored(JSON.parse(raw));
  }, [sessionId]);

  if (!stored) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="glass-card p-8 flex flex-col items-center gap-4 max-w-sm text-center">
          <XCircle size={32} className="text-muted-foreground" />
          <p className="text-foreground font-medium">Result not found</p>
          <p className="text-muted-foreground text-sm">
            This session result may have expired or was never stored.
          </p>
          <Button
            type="button"
            onClick={() => navigate({ to: "/quiz" })}
            data-ocid="quiz_result.back_to_quiz"
          >
            Start New Quiz
          </Button>
        </div>
      </div>
    );
  }

  const { result, questions, answers, config } = stored;
  const score = Number(result.score);
  const total = Number(result.totalQuestions);
  const accuracy = Math.round(result.accuracy);
  const cogCat = result.cognitiveLoadCategory;

  const correctCount = questions.filter((q) => {
    const userAnswer = answers[q.questionId];
    return (
      userAnswer && userAnswer.toLowerCase() === q.correctAnswer.toLowerCase()
    );
  }).length;
  const wrongCount = questions.filter((q) => {
    const ua = answers[q.questionId];
    return ua && ua.toLowerCase() !== q.correctAnswer.toLowerCase();
  }).length;
  const unanswered = total - correctCount - wrongCount;

  const recommendations: { text: string; icon: string }[] = [];
  if (cogCat === "High") {
    recommendations.push(
      {
        text: "Take a 30-minute break before your next study session.",
        icon: "🛌",
      },
      {
        text: "Review your weak topics using simplified explanations.",
        icon: "📖",
      },
      {
        text: "Switch to Beginner difficulty to rebuild confidence.",
        icon: "🎯",
      },
    );
  } else if (cogCat === "Moderate") {
    recommendations.push(
      {
        text: "Review weak topics before attempting another quiz.",
        icon: "📝",
      },
      {
        text: "Practice reinforcement exercises for your low-accuracy topics.",
        icon: "💪",
      },
      {
        text: "Maintain your current study schedule — it's working.",
        icon: "📅",
      },
    );
  } else {
    recommendations.push(
      {
        text: "Challenge yourself with Advanced difficulty questions.",
        icon: "🚀",
      },
      { text: "Try a timed speed challenge to push your limits.", icon: "⚡" },
      {
        text: "Explore System Design and cross-topic advanced problems.",
        icon: "🏗️",
      },
    );
  }
  for (const t of result.weakTopics.slice(0, 2)) {
    recommendations.push({
      text: `Focus on ${t} — your accuracy was below 70%.`,
      icon: "⚠️",
    });
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Hero score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 text-center space-y-4"
      >
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Trophy size={30} className="text-primary" />
          </div>
        </div>
        <div>
          <h1
            className="font-display text-4xl font-bold text-foreground"
            data-ocid="quiz_result.score_display"
          >
            <span className={scoreColor(accuracy)}>{score}</span>
            <span className="text-muted-foreground text-2xl"> / {total}</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Final Score — {config.subject} · {config.difficulty}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <span
              className={`font-display text-3xl font-bold ${scoreColor(accuracy)}`}
            >
              {accuracy}%
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Target size={11} /> Accuracy
            </span>
          </div>
          <Separator orientation="vertical" className="h-12" />
          <div className="flex flex-col items-center gap-1">
            <span className="font-display text-3xl font-bold text-foreground">
              {formatTime(stored.timeTaken)}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock size={11} /> Time Taken
            </span>
          </div>
          <Separator orientation="vertical" className="h-12" />
          <div className="flex flex-col items-center gap-1">
            <Badge
              className={`text-sm font-semibold border ${cognitiveColor(cogCat)}`}
            >
              {cogCat} Load
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Brain size={11} /> Cognitive Load
            </span>
          </div>
        </div>
      </motion.div>

      {/* Performance breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-3 gap-4"
      >
        {[
          {
            label: "Correct",
            value: correctCount,
            icon: CheckCircle2,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10 border-emerald-500/20",
          },
          {
            label: "Wrong",
            value: wrongCount,
            icon: XCircle,
            color: "text-destructive",
            bg: "bg-destructive/10 border-destructive/20",
          },
          {
            label: "Skipped",
            value: unanswered,
            icon: MinusCircle,
            color: "text-muted-foreground",
            bg: "bg-muted/50 border-border",
          },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className={`glass-card p-4 flex flex-col items-center gap-2 border ${item.bg}`}
          >
            <item.icon size={22} className={item.color} />
            <span className={`font-display text-2xl font-bold ${item.color}`}>
              {item.value}
            </span>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Weak areas */}
      {result.weakTopics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 space-y-4"
        >
          <div className="flex items-center gap-2">
            <TrendingDown size={16} className="text-destructive" />
            <h2 className="font-display font-semibold text-foreground">
              Weak Areas
            </h2>
            <span className="text-xs text-muted-foreground">
              (&lt;70% accuracy)
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {result.weakTopics.map((topic, i) => (
              <div
                key={topic}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/20"
              >
                <Badge
                  variant="outline"
                  className="text-xs border-destructive/40 text-destructive"
                >
                  {topic}
                </Badge>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  data-ocid={`quiz_result.study_weak.${i + 1}`}
                  onClick={() =>
                    navigate({
                      to: `/modules/${encodeURIComponent(config.subject)}`,
                    })
                  }
                  className="h-6 px-2 text-xs text-primary hover:text-primary/80"
                >
                  Study Now
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Strong areas */}
      {result.strongTopics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          className="glass-card p-6 space-y-4"
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-400" />
            <h2 className="font-display font-semibold text-foreground">
              Strengths
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.strongTopics.map((topic) => (
              <Badge
                key={topic}
                className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="glass-card p-6 space-y-4"
      >
        <div className="flex items-center gap-2">
          <Lightbulb size={16} className="text-amber-400" />
          <h2 className="font-display font-semibold text-foreground">
            Personalized Recommendations
          </h2>
        </div>
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <motion.div
              key={rec.text}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + recommendations.indexOf(rec) * 0.07 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border"
            >
              <span className="text-lg shrink-0">{rec.icon}</span>
              <p className="text-sm text-foreground">{rec.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Collapsible answer review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="glass-card overflow-hidden"
      >
        <button
          type="button"
          data-ocid="quiz_result.toggle_review"
          onClick={() => setReviewOpen((v) => !v)}
          className="w-full flex items-center justify-between p-6 hover:bg-muted/20 transition-smooth"
        >
          <span className="font-display font-semibold text-foreground">
            Answer Review ({total} questions)
          </span>
          {reviewOpen ? (
            <ChevronUp size={18} className="text-muted-foreground" />
          ) : (
            <ChevronDown size={18} className="text-muted-foreground" />
          )}
        </button>

        <AnimatePresence>
          {reviewOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 space-y-4">
                <Separator />
                {questions.map((q, i) => {
                  const userAns = answers[q.questionId];
                  const correct = q.correctAnswer.toUpperCase();
                  const isCorrect = userAns?.toUpperCase() === correct;
                  const isSkipped = !userAns;
                  const optMap: Record<string, string> = {
                    A: q.optionA,
                    B: q.optionB,
                    C: q.optionC,
                    D: q.optionD,
                  };

                  return (
                    <div
                      key={q.questionId}
                      data-ocid={`quiz_result.review_item.${i + 1}`}
                      className={`p-4 rounded-xl border space-y-3 ${
                        isSkipped
                          ? "border-border bg-muted/20"
                          : isCorrect
                            ? "border-emerald-500/30 bg-emerald-500/5"
                            : "border-destructive/30 bg-destructive/5"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {isSkipped ? (
                          <MinusCircle
                            size={16}
                            className="text-muted-foreground mt-0.5 shrink-0"
                          />
                        ) : isCorrect ? (
                          <CheckCircle2
                            size={16}
                            className="text-emerald-400 mt-0.5 shrink-0"
                          />
                        ) : (
                          <XCircle
                            size={16}
                            className="text-destructive mt-0.5 shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">
                            <span className="text-muted-foreground mr-1">
                              Q{i + 1}.
                            </span>
                            {q.questionText}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2 text-xs">
                            {!isSkipped && (
                              <span
                                className={`px-2 py-0.5 rounded ${
                                  isCorrect
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : "bg-destructive/20 text-destructive"
                                }`}
                              >
                                Your answer: {userAns} — {optMap[userAns ?? ""]}
                              </span>
                            )}
                            {!isCorrect && (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                                Correct: {correct} — {optMap[correct]}
                              </span>
                            )}
                          </div>
                          {!isCorrect && q.explanation && (
                            <p className="mt-2 text-xs text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-3">
                              {q.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        <Button
          type="button"
          data-ocid="quiz_result.retry_button"
          variant="outline"
          onClick={() => navigate({ to: "/quiz" })}
          className="flex flex-col h-auto py-3 gap-1 text-xs"
        >
          <RefreshCw size={18} />
          Retry Quiz
        </Button>
        <Button
          type="button"
          data-ocid="quiz_result.study_button"
          variant="outline"
          onClick={() => navigate({ to: "/modules" })}
          className="flex flex-col h-auto py-3 gap-1 text-xs"
        >
          <BookOpen size={18} />
          Study Topics
        </Button>
        <Button
          type="button"
          data-ocid="quiz_result.analytics_button"
          variant="outline"
          onClick={() => navigate({ to: "/analytics" })}
          className="flex flex-col h-auto py-3 gap-1 text-xs"
        >
          <BarChart3 size={18} />
          Analytics
        </Button>
        <Button
          type="button"
          data-ocid="quiz_result.dashboard_button"
          onClick={() => navigate({ to: "/dashboard" })}
          className="flex flex-col h-auto py-3 gap-1 text-xs bg-primary hover:bg-primary/90"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Button>
      </motion.div>
    </div>
  );
}
