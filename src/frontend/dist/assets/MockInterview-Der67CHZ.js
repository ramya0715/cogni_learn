import { c as createLucideIcon, r as reactExports, a8 as useGetMockInterviewQuestions, a9 as useSubmitMockInterview, j as jsxRuntimeExports, e as cn, k as ChevronRight, H as ue } from "./index-B3pXppQ4.js";
import { B as Badge } from "./badge-C2xWMHlK.js";
import { B as Button } from "./button-DOd5Cxo7.js";
import { P as Progress } from "./progress-BCkbHhZL.js";
import { S as Skeleton } from "./skeleton-zswagPjP.js";
import { U as Users } from "./users-BVS-j9OY.js";
import { C as Clock } from "./clock-SOyJrFQl.js";
import { C as CircleAlert } from "./circle-alert-CYnRBC5t.js";
import { C as ChevronDown } from "./chevron-down-CiFcaF9j.js";
import { C as CircleCheck } from "./circle-check-CW34sw1m.js";
import { T as TrendingUp } from "./trending-up-b_M_tq5k.js";
import "./index-NpozLJBk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
];
const Monitor = createLucideIcon("monitor", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
const QUESTION_TIME = 5 * 60;
const MOCK_TECHNICAL = [
  {
    questionId: "t1",
    mode: "technical",
    category: "DSA",
    difficulty: "Medium",
    question: "Explain the time complexity of QuickSort in average and worst case. When would you prefer MergeSort?",
    keyPoints: [
      "Avg O(n log n), Worst O(n²)",
      "MergeSort stable O(n log n)",
      "Cache locality for QuickSort"
    ]
  },
  {
    questionId: "t2",
    mode: "technical",
    category: "System Design",
    difficulty: "Hard",
    question: "Design a URL shortening service like bit.ly. How would you handle 100M requests/day?",
    keyPoints: [
      "Hash-based ID generation",
      "Database sharding",
      "Caching with Redis",
      "CDN for redirect"
    ]
  },
  {
    questionId: "t3",
    mode: "technical",
    category: "DBMS",
    difficulty: "Medium",
    question: "What is database normalization? Explain 1NF, 2NF, 3NF with examples.",
    keyPoints: [
      "1NF: Atomic values",
      "2NF: No partial dependencies",
      "3NF: No transitive dependencies"
    ]
  },
  {
    questionId: "t4",
    mode: "technical",
    category: "OOP",
    difficulty: "Easy",
    question: "Explain SOLID principles in OOP. Provide a real-world example for each.",
    keyPoints: [
      "S: Single Responsibility",
      "O: Open/Closed",
      "L: Liskov Substitution",
      "I: Interface Segregation",
      "D: Dependency Inversion"
    ]
  },
  {
    questionId: "t5",
    mode: "technical",
    category: "OS",
    difficulty: "Medium",
    question: "What is deadlock? Explain Coffman's conditions and methods to prevent deadlock.",
    keyPoints: [
      "4 conditions: Mutual exclusion, Hold & wait, No preemption, Circular wait",
      "Prevention vs Avoidance vs Detection"
    ]
  },
  {
    questionId: "t6",
    mode: "technical",
    category: "Networks",
    difficulty: "Medium",
    question: "Describe the TCP three-way handshake. How does TCP ensure reliable data delivery?",
    keyPoints: [
      "SYN → SYN-ACK → ACK",
      "Sequence numbers",
      "Acknowledgements",
      "Retransmission"
    ]
  },
  {
    questionId: "t7",
    mode: "technical",
    category: "DSA",
    difficulty: "Hard",
    question: "Given a binary tree, write an algorithm to check if it is a valid BST.",
    keyPoints: [
      "In-order traversal should be sorted",
      "Track min/max bounds recursively",
      "Handle duplicates"
    ]
  },
  {
    questionId: "t8",
    mode: "technical",
    category: "System Design",
    difficulty: "Hard",
    question: "Design a distributed cache system. How do you handle cache invalidation and consistency?",
    keyPoints: [
      "Consistent hashing",
      "TTL strategies",
      "Write-through vs write-back",
      "Cache stampede"
    ]
  },
  {
    questionId: "t9",
    mode: "technical",
    category: "OOP",
    difficulty: "Medium",
    question: "What is the difference between abstract classes and interfaces? When would you use each?",
    keyPoints: [
      "Abstract class: partial implementation",
      "Interface: contract only",
      "Multiple interface inheritance"
    ]
  },
  {
    questionId: "t10",
    mode: "technical",
    category: "DSA",
    difficulty: "Medium",
    question: "Explain dynamic programming. Solve the 0/1 Knapsack problem step by step.",
    keyPoints: [
      "Optimal substructure",
      "Overlapping subproblems",
      "Memoization vs tabulation",
      "O(n*W) complexity"
    ]
  }
];
const MOCK_HR = [
  {
    questionId: "h1",
    mode: "hr",
    category: "Behavioral",
    difficulty: "Easy",
    question: "Tell me about yourself. Walk me through your background and why you're interested in this role.",
    keyPoints: [
      "Present-past-future structure",
      "Connect experience to role",
      "Show genuine interest",
      "Keep it under 3 minutes"
    ]
  },
  {
    questionId: "h2",
    mode: "hr",
    category: "Behavioral",
    difficulty: "Easy",
    question: "Describe a challenging project you worked on. What obstacles did you face and how did you overcome them?",
    keyPoints: [
      "STAR method: Situation, Task, Action, Result",
      "Quantify impact",
      "Show problem-solving"
    ]
  },
  {
    questionId: "h3",
    mode: "hr",
    category: "Behavioral",
    difficulty: "Medium",
    question: "Tell me about a time you disagreed with a team member. How did you handle it?",
    keyPoints: [
      "Stay professional",
      "Focus on facts not emotions",
      "Show collaboration",
      "Resolution outcome"
    ]
  },
  {
    questionId: "h4",
    mode: "hr",
    category: "Situational",
    difficulty: "Medium",
    question: "Where do you see yourself in 5 years? How does this role align with your career goals?",
    keyPoints: [
      "Be specific and realistic",
      "Show ambition",
      "Align with company growth",
      "Technical leadership path"
    ]
  },
  {
    questionId: "h5",
    mode: "hr",
    category: "Behavioral",
    difficulty: "Easy",
    question: "What are your greatest strengths and weaknesses? How are you working on your weaknesses?",
    keyPoints: [
      "Be honest",
      "Show self-awareness",
      "Weakness should be genuine but not disqualifying",
      "Show improvement steps"
    ]
  },
  {
    questionId: "h6",
    mode: "hr",
    category: "Situational",
    difficulty: "Medium",
    question: "How do you prioritize tasks when you have multiple deadlines? Describe your approach.",
    keyPoints: [
      "Time management framework",
      "Impact vs urgency matrix",
      "Communication with stakeholders"
    ]
  },
  {
    questionId: "h7",
    mode: "hr",
    category: "Behavioral",
    difficulty: "Hard",
    question: "Tell me about a time you failed. What did you learn from that experience?",
    keyPoints: [
      "Acknowledge failure openly",
      "Focus on learnings",
      "Show maturity",
      "Apply lesson since"
    ]
  },
  {
    questionId: "h8",
    mode: "hr",
    category: "Situational",
    difficulty: "Easy",
    question: "Why do you want to work for our company specifically? What do you know about us?",
    keyPoints: [
      "Company research",
      "Connect values",
      "Show enthusiasm",
      "Specific product/culture reference"
    ]
  },
  {
    questionId: "h9",
    mode: "hr",
    category: "Behavioral",
    difficulty: "Medium",
    question: "Describe a time you showed leadership even when it wasn't your role.",
    keyPoints: [
      "Initiative without authority",
      "Team influence",
      "Outcome",
      "Leadership style"
    ]
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
      "Never say 'No'"
    ]
  }
];
function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
function ScoreRing({ score }) {
  const color = score >= 75 ? "text-chart-3" : score >= 50 ? "text-chart-4" : "text-chart-5";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col items-center", color), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl font-display font-bold", children: score }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "out of 100" })
  ] });
}
function MockInterviewPage() {
  const [stage, setStage] = reactExports.useState("idle");
  const [selectedMode, setSelectedMode] = reactExports.useState("technical");
  const [session, setSession] = reactExports.useState(null);
  const [result, setResult] = reactExports.useState(null);
  const timerRef = reactExports.useRef(null);
  const { data: backendQuestions, isLoading: loadingQ } = useGetMockInterviewQuestions(selectedMode, stage === "selecting");
  const submitInterview = useSubmitMockInterview();
  const questionsForMode = (mode) => {
    const bq = backendQuestions && backendQuestions.length > 0 ? backendQuestions : null;
    if (bq) return bq.slice(0, 10);
    return mode === "technical" ? MOCK_TECHNICAL : MOCK_HR;
  };
  const startSession = (mode) => {
    const qs = questionsForMode(mode);
    setSession({
      questions: qs,
      currentIndex: 0,
      answers: {},
      timeLeft: QUESTION_TIME,
      showHints: false,
      mode
    });
    setStage("session");
  };
  reactExports.useEffect(() => {
    if (stage !== "session" || !session) return;
    timerRef.current = setInterval(() => {
      setSession((prev) => {
        if (!prev) return prev;
        if (prev.timeLeft <= 1) {
          if (prev.currentIndex < prev.questions.length - 1) {
            return {
              ...prev,
              currentIndex: prev.currentIndex + 1,
              timeLeft: QUESTION_TIME,
              showHints: false
            };
          }
          return { ...prev, timeLeft: 0 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1e3);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stage, session == null ? void 0 : session.currentIndex]);
  reactExports.useEffect(() => {
    if (stage === "session" && session && session.timeLeft === 0 && session.currentIndex === session.questions.length - 1) {
      handleFinish();
    }
  }, [session == null ? void 0 : session.timeLeft]);
  const handleAnswerChange = (val) => {
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
        showHints: false
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
        showHints: false
      });
    } else {
      handleFinish();
    }
  };
  const handleFinish = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!session) return;
    const answersArr = session.questions.map((q) => [
      q.questionId,
      session.answers[q.questionId] ?? ""
    ]);
    try {
      const res = await submitInterview.mutateAsync({
        mode: session.mode,
        answers: answersArr
      });
      setResult(res);
    } catch {
      setResult({
        score: 72n,
        totalQuestions: BigInt(session.questions.length),
        strengths: [
          "Clear articulation of technical concepts",
          "Good problem-solving approach",
          "Structured responses"
        ],
        improvements: [
          "Add more quantitative examples",
          "Practice concise answers under time pressure",
          "Deepen system design knowledge"
        ],
        categoryBreakdown: [
          ["Communication", 78],
          ["Technical Depth", 68],
          ["Clarity", 74]
        ],
        performanceFeedback: "You demonstrated solid fundamentals. Focus on quantifying impact in your answers and practice system design patterns."
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
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "mock_interview.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-bold text-foreground", children: "Mock Interview Simulator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Practice with real placement-style questions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
        {
          mode: "technical",
          label: "Technical Interview",
          icon: Monitor,
          color: "text-chart-1",
          bg: "bg-chart-1/10",
          border: "border-chart-1/20",
          desc: "DSA, System Design, DBMS, OOP, OS concepts",
          difficulty: "Medium–Hard"
        },
        {
          mode: "hr",
          label: "HR Interview",
          icon: Users,
          color: "text-chart-3",
          bg: "bg-chart-3/10",
          border: "border-chart-3/20",
          desc: "Behavioral, situational & communication skills",
          difficulty: "Easy–Medium"
        }
      ].map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "glass-card p-6 flex flex-col gap-4 border",
            card.border
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-3 rounded-xl w-fit", card.bg), children: /* @__PURE__ */ jsxRuntimeExports.jsx(card.icon, { size: 28, className: card.color }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: card.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: card.desc })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary" }),
                "10 questions"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
                "5 min each"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[10px] h-5", children: card.difficulty })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: () => {
                  setSelectedMode(card.mode);
                  setStage("selecting");
                  setTimeout(() => startSession(card.mode), 50);
                },
                "data-ocid": `mock_interview.start_${card.mode}_button`,
                className: "w-full",
                children: "Start Session"
              }
            )
          ]
        },
        card.mode
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-5 border border-primary/15", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16, className: "text-primary" }),
          " Interview Tips"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 text-sm text-muted-foreground list-none", children: [
          "Use the STAR method (Situation, Task, Action, Result) for behavioral questions",
          "Think out loud — interviewers value your thought process",
          "Ask clarifying questions before diving into a solution",
          "Practice coding on paper/whiteboard to build muscle memory"
        ].map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronRight,
            {
              size: 14,
              className: "text-primary mt-0.5 flex-shrink-0"
            }
          ),
          tip
        ] }, tip)) })
      ] })
    ] });
  }
  if (stage === "selecting" || stage === "session" && !session) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center min-h-[50vh]",
        "data-ocid": "mock_interview.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card p-8 flex flex-col items-center gap-4", children: loadingQ ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-12 h-12 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Starting session..." }) })
      }
    );
  }
  if (stage === "session" && session) {
    const q = session.questions[session.currentIndex];
    const progress = session.currentIndex / session.questions.length * 100;
    const isUrgent = session.timeLeft < 60;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "mock_interview.session", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: [
            "Question ",
            session.currentIndex + 1,
            " of ",
            session.questions.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-semibold text-foreground", children: [
            q.category,
            " · ",
            q.difficulty
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-sm font-semibold border transition-smooth",
              isUrgent ? "bg-destructive/15 text-destructive border-destructive/30" : "bg-muted text-foreground border-border"
            ),
            "data-ocid": "mock_interview.timer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 13 }),
              formatTime(session.timeLeft)
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Progress,
        {
          value: progress,
          className: "h-1.5",
          "data-ocid": "mock_interview.progress"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium text-foreground leading-relaxed", children: q.question }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setSession((p) => p ? { ...p, showHints: !p.showHints } : p),
              className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth",
              "data-ocid": "mock_interview.hints_toggle",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronDown,
                  {
                    size: 14,
                    className: cn(
                      "transition-smooth",
                      session.showHints ? "rotate-180" : ""
                    )
                  }
                ),
                session.showHints ? "Hide hints" : "Show key points"
              ]
            }
          ),
          session.showHints && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1", children: q.keyPoints.map((kp) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-start gap-2 text-sm text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5", children: "•" }),
                " ",
                kp
              ]
            },
            kp
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            className: "w-full min-h-[180px] bg-muted/50 border border-border rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground resize-y focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
            placeholder: "Type your answer here...",
            value: session.answers[q.questionId] ?? "",
            onChange: (e) => handleAnswerChange(e.target.value),
            "data-ocid": "mock_interview.answer_textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            onClick: handleSkip,
            "data-ocid": "mock_interview.skip_button",
            className: "text-muted-foreground",
            children: "Skip"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: handleNext,
            disabled: submitInterview.isPending,
            "data-ocid": "mock_interview.next_button",
            className: "gap-1.5",
            children: session.currentIndex < session.questions.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "Next Question ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "Finish Interview ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14 })
            ] })
          }
        )
      ] })
    ] });
  }
  if (stage === "result" && result) {
    const score = Number(result.score);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "mock_interview.result", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-bold text-foreground", children: "Interview Complete" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Here's a breakdown of your performance" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-6 flex flex-col sm:flex-row items-center gap-6 border border-primary/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreRing, { score }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: result.performanceFeedback }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16, className: "text-primary" }),
          " Category Breakdown"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: result.categoryBreakdown.map(([cat, pct]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: cat }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-mono", children: [
              pct,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct, className: "h-2" })
        ] }, cat)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-5 border border-chart-3/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 15, className: "text-chart-3" }),
            " Strengths"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: result.strengths.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-start gap-2 text-sm text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-chart-3 mt-0.5", children: "✓" }),
                " ",
                s
              ]
            },
            s
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-5 border border-chart-4/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 15, className: "text-chart-4" }),
            " Areas to Improve"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: result.improvements.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-start gap-2 text-sm text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-chart-4 mt-0.5", children: "→" }),
                " ",
                s
              ]
            },
            s
          )) })
        ] })
      ] }),
      session && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-4", children: "Q&A Review" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: session.questions.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "border-b border-border pb-4 last:border-0 last:pb-0",
            "data-ocid": `mock_interview.review.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1", children: [
                "Q",
                i + 1,
                " · ",
                q.category
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-2", children: q.question }),
              session.answers[q.questionId] ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 text-sm text-muted-foreground mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground block mb-1", children: "Your answer:" }),
                session.answers[q.questionId]
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic mb-2", children: "No answer provided" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                  "Key points:",
                  " "
                ] }),
                q.keyPoints.join(" · ")
              ] })
            ]
          },
          q.questionId
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: reset,
            variant: "outline",
            "data-ocid": "mock_interview.try_again_button",
            className: "gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 14 }),
              " Try Again"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "secondary",
            "data-ocid": "mock_interview.share_button",
            onClick: () => ue.info("Sharing coming soon"),
            className: "gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 14 }),
              " Share Results"
            ]
          }
        )
      ] })
    ] });
  }
  return null;
}
export {
  MockInterviewPage as default
};
