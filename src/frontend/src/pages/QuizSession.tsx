import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useGetQuizQuestions, useSubmitQuizSession } from "@/hooks/useBackend";
import type { QuizQuestion } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const TOTAL_SECS = 90 * 60; // 90 minutes

interface QuizConfig {
  subject: string;
  difficulty: string;
  stressLevel: number;
  confidenceLevel: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizSession() {
  const { sessionId } = useParams({ from: "/quiz/$sessionId" });
  const navigate = useNavigate();

  const configRaw = sessionStorage.getItem(`quiz_config_${sessionId}`);
  const config: QuizConfig = configRaw
    ? JSON.parse(configRaw)
    : {
        subject: "Aptitude",
        difficulty: "Intermediate",
        stressLevel: 5,
        confidenceLevel: 6,
      };

  const {
    data: rawQuestions,
    isLoading,
    isError,
    refetch,
  } = useGetQuizQuestions(config.subject, config.difficulty);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionStartTimes, setQuestionStartTimes] = useState<
    Record<number, number>
  >({});
  const [timePerQuestion, setTimePerQuestion] = useState<number[]>([]);
  const [secsLeft, setSecsLeft] = useState(TOTAL_SECS);
  const [submitted, setSubmitted] = useState(false);
  const [startTime] = useState(Date.now());

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const submitMutation = useSubmitQuizSession();

  // Shuffle & initialize on load
  useEffect(() => {
    if (rawQuestions && rawQuestions.length > 0 && questions.length === 0) {
      const shuffled = shuffle(rawQuestions).slice(0, 50);
      setQuestions(shuffled);
      setQuestionStartTimes({ 0: Date.now() });
    }
  }, [rawQuestions, questions.length]);

  // Track time per question on navigation
  const recordTimeForCurrent = useCallback(
    (idx: number) => {
      const startedAt = questionStartTimes[idx];
      if (startedAt) {
        const elapsed = Math.round((Date.now() - startedAt) / 1000);
        setTimePerQuestion((prev) => {
          const updated = [...prev];
          updated[idx] = (updated[idx] ?? 0) + elapsed;
          return updated;
        });
      }
    },
    [questionStartTimes],
  );

  function goToQuestion(idx: number) {
    recordTimeForCurrent(currentIdx);
    setCurrentIdx(idx);
    setQuestionStartTimes((prev) => ({ ...prev, [idx]: Date.now() }));
  }

  // Timer
  useEffect(() => {
    if (questions.length === 0 || submitted) return;
    timerRef.current = setInterval(() => {
      setSecsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current!);
          handleAutoSubmit();
          return 0;
        }
        if (s === 300)
          toast.warning("⏰ 5 minutes remaining!", { id: "timer-warn-5" });
        if (s === 60)
          toast.error("⚠️ 1 minute remaining — wrap up!", {
            id: "timer-warn-1",
          });
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions.length, submitted]);

  async function handleAutoSubmit() {
    if (submitted) return;
    toast.info("Time's up! Submitting your answers...", { id: "auto-submit" });
    await doSubmit();
  }

  async function doSubmit() {
    if (submitted || submitMutation.isPending) return;
    setSubmitted(true);
    clearInterval(timerRef.current!);
    recordTimeForCurrent(currentIdx);

    const answersArr: Array<[string, string]> = questions.map((q) => [
      q.questionId,
      answers[q.questionId] ?? "",
    ]);
    const tpqArr: number[] = questions.map((_, i) => timePerQuestion[i] ?? 0);
    const sessionDuration = Math.round((Date.now() - startTime) / 1000);

    try {
      const result = await submitMutation.mutateAsync({
        subject: config.subject,
        difficulty: config.difficulty,
        answers: answersArr,
        timePerQuestion: tpqArr,
        stressLevel: BigInt(config.stressLevel),
        confidenceLevel: BigInt(config.confidenceLevel),
        sessionDurationSecs: BigInt(sessionDuration),
      });

      // Store result + full Q&A for review
      sessionStorage.setItem(
        `quiz_result_${sessionId}`,
        JSON.stringify({
          result,
          questions,
          answers,
          config,
          timeTaken: sessionDuration,
        }),
      );

      navigate({ to: `/quiz/result/${sessionId}` });
    } catch {
      toast.error("Failed to submit. Please try again.");
      setSubmitted(false);
    }
  }

  if (isLoading || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="glass-card p-8 flex flex-col items-center gap-4">
          <Loader2 size={32} className="text-primary animate-spin" />
          <p className="text-muted-foreground">
            Loading {config.subject} questions...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="glass-card p-8 flex flex-col items-center gap-4 max-w-sm text-center">
          <AlertTriangle size={32} className="text-destructive" />
          <p className="text-foreground font-medium">
            Failed to load questions
          </p>
          <p className="text-muted-foreground text-sm">
            Check your connection and try again.
          </p>
          <Button
            type="button"
            onClick={() => refetch()}
            className="gap-2"
            data-ocid="quiz_session.retry_button"
          >
            <RefreshCw size={15} /> Retry
          </Button>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];
  const totalQ = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPct = ((currentIdx + 1) / totalQ) * 100;
  const mins = Math.floor(secsLeft / 60);
  const secs = secsLeft % 60;
  const isLastQ = currentIdx === totalQ - 1;
  const isLowTime = secsLeft <= 300;
  const isCriticalTime = secsLeft <= 60;

  const optionLabels = ["A", "B", "C", "D"] as const;
  const options = [q.optionA, q.optionB, q.optionC, q.optionD];

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-8">
      {/* Header strip */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="secondary" className="text-xs">
            {config.subject}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {config.difficulty}
          </Badge>
          <span className="text-xs text-muted-foreground ml-auto">
            Question{" "}
            <span className="font-semibold text-foreground">
              {currentIdx + 1}
            </span>{" "}
            of {totalQ}
          </span>
          {/* Timer */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border font-mono font-bold text-sm ${
              isCriticalTime
                ? "bg-destructive/20 border-destructive/40 text-destructive animate-pulse"
                : isLowTime
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                  : "bg-card border-border text-foreground"
            }`}
          >
            <Clock size={14} />
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </div>
        </div>
        <Progress
          value={progressPct}
          className="h-2"
          data-ocid="quiz_session.progress_bar"
        />
        <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
          <span>{answeredCount} answered</span>
          <span>{totalQ - answeredCount} remaining</span>
        </div>
      </motion.div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.22 }}
          className="glass-card p-6 space-y-6"
        >
          <div className="flex items-start gap-3">
            <span className="font-mono text-xs text-muted-foreground bg-muted rounded px-2 py-0.5 mt-0.5 shrink-0">
              Q{currentIdx + 1}
            </span>
            <Badge variant="outline" className="text-xs shrink-0">
              {q.topicTag}
            </Badge>
          </div>

          <p
            className="text-foreground text-lg leading-relaxed font-medium"
            data-ocid="quiz_session.question_text"
          >
            {q.questionText}
          </p>

          <div
            className="grid gap-3"
            role="radiogroup"
            aria-label="Answer options"
          >
            {options.map((opt, i) => {
              const label = optionLabels[i];
              const isSelected = answers[q.questionId] === label;
              return (
                <motion.button
                  key={label}
                  type="button"
                  data-ocid={`quiz_session.option.${i + 1}`}
                  whileTap={{ scale: 0.99 }}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [q.questionId]: label }))
                  }
                  className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-smooth ${
                    isSelected
                      ? "bg-primary/15 border-primary/50 ring-2 ring-primary/30 shadow-sm"
                      : "border-border hover:border-primary/30 hover:bg-muted/40"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 transition-smooth ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                  <span className="text-sm text-foreground">{opt}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation row */}
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          data-ocid="quiz_session.prev_button"
          disabled={currentIdx === 0}
          onClick={() => goToQuestion(currentIdx - 1)}
          className="gap-2"
        >
          <ChevronLeft size={16} /> Previous
        </Button>

        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-1.5 min-w-max mx-auto justify-center">
            {questions.map((question, i) => {
              const isAnswered = !!answers[question.questionId];
              const isCurrent = i === currentIdx;
              return (
                <button
                  key={question.questionId}
                  type="button"
                  data-ocid={`quiz_session.q_nav.${i + 1}`}
                  onClick={() => goToQuestion(i)}
                  className={`w-7 h-7 rounded-md text-xs font-medium transition-smooth shrink-0 ${
                    isCurrent
                      ? "bg-primary text-primary-foreground"
                      : isAnswered
                        ? "bg-emerald-500/30 text-emerald-400 border border-emerald-500/40"
                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        {isLastQ ? (
          <Button
            type="button"
            data-ocid="quiz_session.submit_button"
            onClick={doSubmit}
            disabled={submitted || submitMutation.isPending}
            className="gap-2 bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            {submitMutation.isPending ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Flag size={15} />
            )}
            Submit Quiz
          </Button>
        ) : (
          <Button
            type="button"
            data-ocid="quiz_session.next_button"
            onClick={() => goToQuestion(currentIdx + 1)}
            className="gap-2"
          >
            Next <ChevronRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
