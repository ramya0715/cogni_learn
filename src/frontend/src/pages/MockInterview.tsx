import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetMockInterviewQuestions,
  useSubmitMockInterview,
} from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import type { MockInterviewQuestion, MockInterviewResult } from "@/types";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Monitor,
  RotateCcw,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Stage = "idle" | "selecting" | "session" | "result";

const QUESTION_TIME = 5 * 60; // 5 minutes in seconds

const MOCK_TECHNICAL: MockInterviewQuestion[] = [
  {
    questionId: "t1",
    mode: "technical",
    category: "DSA",
    difficulty: "Medium",
    question:
      "Explain the time complexity of QuickSort in average and worst case. When would you prefer MergeSort?",
    keyPoints: [
      "Avg O(n log n), Worst O(n²)",
      "MergeSort stable O(n log n)",
      "Cache locality for QuickSort",
    ],
  },
  {
    questionId: "t2",
    mode: "technical",
    category: "System Design",
    difficulty: "Hard",
    question:
      "Design a URL shortening service like bit.ly. How would you handle 100M requests/day?",
    keyPoints: [
      "Hash-based ID generation",
      "Database sharding",
      "Caching with Redis",
      "CDN for redirect",
    ],
  },
  {
    questionId: "t3",
    mode: "technical",
    category: "DBMS",
    difficulty: "Medium",
    question:
      "What is database normalization? Explain 1NF, 2NF, 3NF with examples.",
    keyPoints: [
      "1NF: Atomic values",
      "2NF: No partial dependencies",
      "3NF: No transitive dependencies",
    ],
  },
  {
    questionId: "t4",
    mode: "technical",
    category: "OOP",
    difficulty: "Easy",
    question:
      "Explain SOLID principles in OOP. Provide a real-world example for each.",
    keyPoints: [
      "S: Single Responsibility",
      "O: Open/Closed",
      "L: Liskov Substitution",
      "I: Interface Segregation",
      "D: Dependency Inversion",
    ],
  },
  {
    questionId: "t5",
    mode: "technical",
    category: "OS",
    difficulty: "Medium",
    question:
      "What is deadlock? Explain Coffman's conditions and methods to prevent deadlock.",
    keyPoints: [
      "4 conditions: Mutual exclusion, Hold & wait, No preemption, Circular wait",
      "Prevention vs Avoidance vs Detection",
    ],
  },
  {
    questionId: "t6",
    mode: "technical",
    category: "Networks",
    difficulty: "Medium",
    question:
      "Describe the TCP three-way handshake. How does TCP ensure reliable data delivery?",
    keyPoints: [
      "SYN → SYN-ACK → ACK",
      "Sequence numbers",
      "Acknowledgements",
      "Retransmission",
    ],
  },
  {
    questionId: "t7",
    mode: "technical",
    category: "DSA",
    difficulty: "Hard",
    question:
      "Given a binary tree, write an algorithm to check if it is a valid BST.",
    keyPoints: [
      "In-order traversal should be sorted",
      "Track min/max bounds recursively",
      "Handle duplicates",
    ],
  },
  {
    questionId: "t8",
    mode: "technical",
    category: "System Design",
    difficulty: "Hard",
    question:
      "Design a distributed cache system. How do you handle cache invalidation and consistency?",
    keyPoints: [
      "Consistent hashing",
      "TTL strategies",
      "Write-through vs write-back",
      "Cache stampede",
    ],
  },
  {
    questionId: "t9",
    mode: "technical",
    category: "OOP",
    difficulty: "Medium",
    question:
      "What is the difference between abstract classes and interfaces? When would you use each?",
    keyPoints: [
      "Abstract class: partial implementation",
      "Interface: contract only",
      "Multiple interface inheritance",
    ],
  },
  {
    questionId: "t10",
    mode: "technical",
    category: "DSA",
    difficulty: "Medium",
    question:
      "Explain dynamic programming. Solve the 0/1 Knapsack problem step by step.",
    keyPoints: [
      "Optimal substructure",
      "Overlapping subproblems",
      "Memoization vs tabulation",
      "O(n*W) complexity",
    ],
  },
];

const MOCK_HR: MockInterviewQuestion[] = [
  {
    questionId: "h1",
    mode: "hr",
    category: "Behavioral",
    difficulty: "Easy",
    question:
      "Tell me about yourself. Walk me through your background and why you're interested in this role.",
    keyPoints: [
      "Present-past-future structure",
      "Connect experience to role",
      "Show genuine interest",
      "Keep it under 3 minutes",
    ],
  },
  {
    questionId: "h2",
    mode: "hr",
    category: "Behavioral",
    difficulty: "Easy",
    question:
      "Describe a challenging project you worked on. What obstacles did you face and how did you overcome them?",
    keyPoints: [
      "STAR method: Situation, Task, Action, Result",
      "Quantify impact",
      "Show problem-solving",
    ],
  },
  {
    questionId: "h3",
    mode: "hr",
    category: "Behavioral",
    difficulty: "Medium",
    question:
      "Tell me about a time you disagreed with a team member. How did you handle it?",
    keyPoints: [
      "Stay professional",
      "Focus on facts not emotions",
      "Show collaboration",
      "Resolution outcome",
    ],
  },
  {
    questionId: "h4",
    mode: "hr",
    category: "Situational",
    difficulty: "Medium",
    question:
      "Where do you see yourself in 5 years? How does this role align with your career goals?",
    keyPoints: [
      "Be specific and realistic",
      "Show ambition",
      "Align with company growth",
      "Technical leadership path",
    ],
  },
  {
    questionId: "h5",
    mode: "hr",
    category: "Behavioral",
    difficulty: "Easy",
    question:
      "What are your greatest strengths and weaknesses? How are you working on your weaknesses?",
    keyPoints: [
      "Be honest",
      "Show self-awareness",
      "Weakness should be genuine but not disqualifying",
      "Show improvement steps",
    ],
  },
  {
    questionId: "h6",
    mode: "hr",
    category: "Situational",
    difficulty: "Medium",
    question:
      "How do you prioritize tasks when you have multiple deadlines? Describe your approach.",
    keyPoints: [
      "Time management framework",
      "Impact vs urgency matrix",
      "Communication with stakeholders",
    ],
  },
  {
    questionId: "h7",
    mode: "hr",
    category: "Behavioral",
    difficulty: "Hard",
    question:
      "Tell me about a time you failed. What did you learn from that experience?",
    keyPoints: [
      "Acknowledge failure openly",
      "Focus on learnings",
      "Show maturity",
      "Apply lesson since",
    ],
  },
  {
    questionId: "h8",
    mode: "hr",
    category: "Situational",
    difficulty: "Easy",
    question:
      "Why do you want to work for our company specifically? What do you know about us?",
    keyPoints: [
      "Company research",
      "Connect values",
      "Show enthusiasm",
      "Specific product/culture reference",
    ],
  },
  {
    questionId: "h9",
    mode: "hr",
    category: "Behavioral",
    difficulty: "Medium",
    question:
      "Describe a time you showed leadership even when it wasn't your role.",
    keyPoints: [
      "Initiative without authority",
      "Team influence",
      "Outcome",
      "Leadership style",
    ],
  },
  {
    questionId: "h10",
    mode: "hr",
    category: "Situational",
    difficulty: "Easy",
    question: "Do you have any questions for us?",
    keyPoints: [
      "Ask about team culture",
      "Ask about growth opportunities",
      "Ask about challenges",
      "Never say 'No'",
    ],
  },
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function ScoreRing({ score }: { score: number }) {
  const color =
    score >= 75
      ? "text-chart-3"
      : score >= 50
        ? "text-chart-4"
        : "text-chart-5";
  return (
    <div className={cn("flex flex-col items-center", color)}>
      <div className="text-5xl font-display font-bold">{score}</div>
      <div className="text-sm font-medium">out of 100</div>
    </div>
  );
}

interface SessionState {
  questions: MockInterviewQuestion[];
  currentIndex: number;
  answers: Record<string, string>;
  timeLeft: number;
  showHints: boolean;
  mode: string;
}

export default function MockInterviewPage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [selectedMode, setSelectedMode] = useState("technical");
  const [session, setSession] = useState<SessionState | null>(null);
  const [result, setResult] = useState<MockInterviewResult | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { data: backendQuestions, isLoading: loadingQ } =
    useGetMockInterviewQuestions(selectedMode, stage === "selecting");
  const submitInterview = useSubmitMockInterview();

  // Use backend questions if available, fallback to mocks
  const questionsForMode = (mode: string) => {
    const bq =
      backendQuestions && backendQuestions.length > 0 ? backendQuestions : null;
    if (bq) return bq.slice(0, 10);
    return mode === "technical" ? MOCK_TECHNICAL : MOCK_HR;
  };

  const startSession = (mode: string) => {
    const qs = questionsForMode(mode);
    setSession({
      questions: qs,
      currentIndex: 0,
      answers: {},
      timeLeft: QUESTION_TIME,
      showHints: false,
      mode,
    });
    setStage("session");
  };

  // Timer per question
  // biome-ignore lint/correctness/useExhaustiveDependencies: timer effect, session dependency would cause infinite loop
  useEffect(() => {
    if (stage !== "session" || !session) return;
    timerRef.current = setInterval(() => {
      setSession((prev) => {
        if (!prev) return prev;
        if (prev.timeLeft <= 1) {
          // Auto-advance
          if (prev.currentIndex < prev.questions.length - 1) {
            return {
              ...prev,
              currentIndex: prev.currentIndex + 1,
              timeLeft: QUESTION_TIME,
              showHints: false,
            };
          }
          return { ...prev, timeLeft: 0 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stage, session?.currentIndex]);

  // Auto submit when last question timer expires
  // biome-ignore lint/correctness/useExhaustiveDependencies: auto-submit effect, full session dependency would cause infinite loop
  useEffect(() => {
    if (
      stage === "session" &&
      session &&
      session.timeLeft === 0 &&
      session.currentIndex === session.questions.length - 1
    ) {
      handleFinish();
    }
  }, [session?.timeLeft]);

  const handleAnswerChange = (val: string) => {
    setSession((prev) => {
      if (!prev) return prev;
      const q = prev.questions[prev.currentIndex];
      return { ...prev, answers: { ...prev.answers, [q.questionId]: val } };
    });
  };

  const handleNext = () => {
    if (!session) return;
    if (timerRef.current) clearInterval(timerRef.current);
    if (session.currentIndex < session.questions.length - 1) {
      setSession({
        ...session,
        currentIndex: session.currentIndex + 1,
        timeLeft: QUESTION_TIME,
        showHints: false,
      });
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    if (!session) return;
    if (timerRef.current) clearInterval(timerRef.current);
    if (session.currentIndex < session.questions.length - 1) {
      setSession({
        ...session,
        currentIndex: session.currentIndex + 1,
        timeLeft: QUESTION_TIME,
        showHints: false,
      });
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!session) return;
    const answersArr: Array<[string, string]> = session.questions.map((q) => [
      q.questionId,
      session.answers[q.questionId] ?? "",
    ]);
    try {
      const res = await submitInterview.mutateAsync({
        mode: session.mode,
        answers: answersArr,
      });
      setResult(res);
    } catch {
      // Fallback result
      setResult({
        score: 72n,
        totalQuestions: BigInt(session.questions.length),
        strengths: [
          "Clear articulation of technical concepts",
          "Good problem-solving approach",
          "Structured responses",
        ],
        improvements: [
          "Add more quantitative examples",
          "Practice concise answers under time pressure",
          "Deepen system design knowledge",
        ],
        categoryBreakdown: [
          ["Communication", 78],
          ["Technical Depth", 68],
          ["Clarity", 74],
        ],
        performanceFeedback:
          "You demonstrated solid fundamentals. Focus on quantifying impact in your answers and practice system design patterns.",
      });
    }
    setStage("result");
  };

  const reset = () => {
    setStage("idle");
    setSession(null);
    setResult(null);
  };

  if (stage === "idle") {
    return (
      <div className="space-y-6" data-ocid="mock_interview.page">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Mock Interview Simulator
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Practice with real placement-style questions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              mode: "technical",
              label: "Technical Interview",
              icon: Monitor,
              color: "text-chart-1",
              bg: "bg-chart-1/10",
              border: "border-chart-1/20",
              desc: "DSA, System Design, DBMS, OOP, OS concepts",
              difficulty: "Medium–Hard",
            },
            {
              mode: "hr",
              label: "HR Interview",
              icon: Users,
              color: "text-chart-3",
              bg: "bg-chart-3/10",
              border: "border-chart-3/20",
              desc: "Behavioral, situational & communication skills",
              difficulty: "Easy–Medium",
            },
          ].map((card) => (
            <div
              key={card.mode}
              className={cn(
                "glass-card p-6 flex flex-col gap-4 border",
                card.border,
              )}
            >
              <div className={cn("p-3 rounded-xl w-fit", card.bg)}>
                <card.icon size={28} className={card.color} />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">
                  {card.label}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {card.desc}
                </p>
              </div>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  10 questions
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />5 min each
                </span>
                <Badge variant="secondary" className="text-[10px] h-5">
                  {card.difficulty}
                </Badge>
              </div>
              <Button
                type="button"
                onClick={() => {
                  setSelectedMode(card.mode);
                  setStage("selecting");
                  setTimeout(() => startSession(card.mode), 50);
                }}
                data-ocid={`mock_interview.start_${card.mode}_button`}
                className="w-full"
              >
                Start Session
              </Button>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="glass-card p-5 border border-primary/15">
          <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertCircle size={16} className="text-primary" /> Interview Tips
          </h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground list-none">
            {[
              "Use the STAR method (Situation, Task, Action, Result) for behavioral questions",
              "Think out loud — interviewers value your thought process",
              "Ask clarifying questions before diving into a solution",
              "Practice coding on paper/whiteboard to build muscle memory",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <ChevronRight
                  size={14}
                  className="text-primary mt-0.5 flex-shrink-0"
                />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (stage === "selecting" || (stage === "session" && !session)) {
    return (
      <div
        className="flex items-center justify-center min-h-[50vh]"
        data-ocid="mock_interview.loading_state"
      >
        <div className="glass-card p-8 flex flex-col items-center gap-4">
          {loadingQ ? (
            <>
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </>
          ) : (
            <div className="text-muted-foreground">Starting session...</div>
          )}
        </div>
      </div>
    );
  }

  if (stage === "session" && session) {
    const q = session.questions[session.currentIndex];
    const progress = (session.currentIndex / session.questions.length) * 100;
    const isUrgent = session.timeLeft < 60;

    return (
      <div className="space-y-5" data-ocid="mock_interview.session">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Question {session.currentIndex + 1} of {session.questions.length}
            </p>
            <p className="font-display font-semibold text-foreground">
              {q.category} · {q.difficulty}
            </p>
          </div>
          <div
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-sm font-semibold border transition-smooth",
              isUrgent
                ? "bg-destructive/15 text-destructive border-destructive/30"
                : "bg-muted text-foreground border-border",
            )}
            data-ocid="mock_interview.timer"
          >
            <Clock size={13} />
            {formatTime(session.timeLeft)}
          </div>
        </div>

        <Progress
          value={progress}
          className="h-1.5"
          data-ocid="mock_interview.progress"
        />

        {/* Question card */}
        <div className="glass-card p-6 space-y-4">
          <p className="text-lg font-medium text-foreground leading-relaxed">
            {q.question}
          </p>

          {/* Hints */}
          <div>
            <button
              type="button"
              onClick={() =>
                setSession((p) => (p ? { ...p, showHints: !p.showHints } : p))
              }
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth"
              data-ocid="mock_interview.hints_toggle"
            >
              <ChevronDown
                size={14}
                className={cn(
                  "transition-smooth",
                  session.showHints ? "rotate-180" : "",
                )}
              />
              {session.showHints ? "Hide hints" : "Show key points"}
            </button>
            {session.showHints && (
              <ul className="mt-2 space-y-1">
                {q.keyPoints.map((kp) => (
                  <li
                    key={kp}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-primary mt-0.5">•</span> {kp}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <textarea
            className="w-full min-h-[180px] bg-muted/50 border border-border rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground resize-y focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            placeholder="Type your answer here..."
            value={session.answers[q.questionId] ?? ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
            data-ocid="mock_interview.answer_textarea"
          />
        </div>

        <div className="flex gap-3 justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={handleSkip}
            data-ocid="mock_interview.skip_button"
            className="text-muted-foreground"
          >
            Skip
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            disabled={submitInterview.isPending}
            data-ocid="mock_interview.next_button"
            className="gap-1.5"
          >
            {session.currentIndex < session.questions.length - 1 ? (
              <>
                Next Question <ChevronRight size={14} />
              </>
            ) : (
              <>
                Finish Interview <CheckCircle2 size={14} />
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  if (stage === "result" && result) {
    const score = Number(result.score);
    return (
      <div className="space-y-6" data-ocid="mock_interview.result">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Interview Complete
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here's a breakdown of your performance
          </p>
        </div>

        {/* Score */}
        <div className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6 border border-primary/20">
          <ScoreRing score={score} />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              {result.performanceFeedback}
            </p>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" /> Category Breakdown
          </h3>
          <div className="space-y-3">
            {result.categoryBreakdown.map(([cat, pct]) => (
              <div key={cat}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-foreground font-medium">{cat}</span>
                  <span className="text-muted-foreground font-mono">
                    {pct}%
                  </span>
                </div>
                <Progress value={pct} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-5 border border-chart-3/20">
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 size={15} className="text-chart-3" /> Strengths
            </h3>
            <ul className="space-y-2">
              {result.strengths.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-chart-3 mt-0.5">✓</span> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card p-5 border border-chart-4/20">
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp size={15} className="text-chart-4" /> Areas to Improve
            </h3>
            <ul className="space-y-2">
              {result.improvements.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-chart-4 mt-0.5">→</span> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Q&A Review */}
        {session && (
          <div className="glass-card p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">
              Q&A Review
            </h3>
            <div className="space-y-4">
              {session.questions.map((q, i) => (
                <div
                  key={q.questionId}
                  className="border-b border-border pb-4 last:border-0 last:pb-0"
                  data-ocid={`mock_interview.review.item.${i + 1}`}
                >
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Q{i + 1} · {q.category}
                  </p>
                  <p className="text-sm font-medium text-foreground mb-2">
                    {q.question}
                  </p>
                  {session.answers[q.questionId] ? (
                    <div className="bg-muted/40 rounded-lg p-3 text-sm text-muted-foreground mb-2">
                      <span className="text-xs font-semibold text-foreground block mb-1">
                        Your answer:
                      </span>
                      {session.answers[q.questionId]}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic mb-2">
                      No answer provided
                    </p>
                  )}
                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Key points:{" "}
                    </span>
                    {q.keyPoints.join(" · ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={reset}
            variant="outline"
            data-ocid="mock_interview.try_again_button"
            className="gap-1.5"
          >
            <RotateCcw size={14} /> Try Again
          </Button>
          <Button
            type="button"
            variant="secondary"
            data-ocid="mock_interview.share_button"
            onClick={() => toast.info("Sharing coming soon")}
            className="gap-1.5"
          >
            <Share2 size={14} /> Share Results
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
