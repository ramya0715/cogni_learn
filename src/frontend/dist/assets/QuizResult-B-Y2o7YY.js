import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, e as cn, x as useParams, b as useNavigate, a as Brain, B as BookOpen, C as ChartColumn, K as LayoutDashboard } from "./index-B3pXppQ4.js";
import { B as Badge } from "./badge-C2xWMHlK.js";
import { B as Button } from "./button-DOd5Cxo7.js";
import { P as Primitive } from "./index-NpozLJBk.js";
import { m as motion } from "./proxy-BhoJ3VbB.js";
import { T as Trophy } from "./trophy-DRmHv0p9.js";
import { T as Target } from "./target-CPIi5IED.js";
import { C as Clock } from "./clock-SOyJrFQl.js";
import { C as CircleCheck } from "./circle-check-CW34sw1m.js";
import { T as TrendingDown } from "./trending-down-BG4ss5bA.js";
import { T as TrendingUp } from "./trending-up-b_M_tq5k.js";
import { L as Lightbulb } from "./lightbulb-DFb5Ms0T.js";
import { C as ChevronUp } from "./chevron-up-Ccf6rcZI.js";
import { C as ChevronDown } from "./chevron-down-CiFcaF9j.js";
import { A as AnimatePresence } from "./index-B_Rp5UnH.js";
import { R as RefreshCw } from "./refresh-cw-BxEehOnR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }]
];
const CircleMinus = createLucideIcon("circle-minus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}m ${s}s`;
}
function cognitiveColor(cat) {
  if (cat === "High")
    return "bg-destructive/20 text-destructive border-destructive/30";
  if (cat === "Moderate")
    return "bg-amber-500/20 text-amber-400 border-amber-500/30";
  return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
}
function scoreColor(accuracy) {
  if (accuracy >= 70) return "text-emerald-400";
  if (accuracy >= 40) return "text-amber-400";
  return "text-destructive";
}
function QuizResult() {
  const { sessionId } = useParams({ from: "/quiz/result/$sessionId" });
  const navigate = useNavigate();
  const [stored, setStored] = reactExports.useState(null);
  const [reviewOpen, setReviewOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const raw = sessionStorage.getItem(`quiz_result_${sessionId}`);
    if (raw) setStored(JSON.parse(raw));
  }, [sessionId]);
  if (!stored) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-8 flex flex-col items-center gap-4 max-w-sm text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 32, className: "text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "Result not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "This session result may have expired or was never stored." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          onClick: () => navigate({ to: "/quiz" }),
          "data-ocid": "quiz_result.back_to_quiz",
          children: "Start New Quiz"
        }
      )
    ] }) });
  }
  const { result, questions, answers, config } = stored;
  const score = Number(result.score);
  const total = Number(result.totalQuestions);
  const accuracy = Math.round(result.accuracy);
  const cogCat = result.cognitiveLoadCategory;
  const correctCount = questions.filter((q) => {
    const userAnswer = answers[q.questionId];
    return userAnswer && userAnswer.toLowerCase() === q.correctAnswer.toLowerCase();
  }).length;
  const wrongCount = questions.filter((q) => {
    const ua = answers[q.questionId];
    return ua && ua.toLowerCase() !== q.correctAnswer.toLowerCase();
  }).length;
  const unanswered = total - correctCount - wrongCount;
  const recommendations = [];
  if (cogCat === "High") {
    recommendations.push(
      {
        text: "Take a 30-minute break before your next study session.",
        icon: "🛌"
      },
      {
        text: "Review your weak topics using simplified explanations.",
        icon: "📖"
      },
      {
        text: "Switch to Beginner difficulty to rebuild confidence.",
        icon: "🎯"
      }
    );
  } else if (cogCat === "Moderate") {
    recommendations.push(
      {
        text: "Review weak topics before attempting another quiz.",
        icon: "📝"
      },
      {
        text: "Practice reinforcement exercises for your low-accuracy topics.",
        icon: "💪"
      },
      {
        text: "Maintain your current study schedule — it's working.",
        icon: "📅"
      }
    );
  } else {
    recommendations.push(
      {
        text: "Challenge yourself with Advanced difficulty questions.",
        icon: "🚀"
      },
      { text: "Try a timed speed challenge to push your limits.", icon: "⚡" },
      {
        text: "Explore System Design and cross-topic advanced problems.",
        icon: "🏗️"
      }
    );
  }
  for (const t of result.weakTopics.slice(0, 2)) {
    recommendations.push({
      text: `Focus on ${t} — your accuracy was below 70%.`,
      icon: "⚠️"
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto space-y-6 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 },
        className: "glass-card p-8 text-center space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 30, className: "text-primary" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "h1",
              {
                className: "font-display text-4xl font-bold text-foreground",
                "data-ocid": "quiz_result.score_display",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: scoreColor(accuracy), children: score }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-2xl", children: [
                    " / ",
                    total
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
              "Final Score — ",
              config.subject,
              " · ",
              config.difficulty
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `font-display text-3xl font-bold ${scoreColor(accuracy)}`,
                  children: [
                    accuracy,
                    "%"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { size: 11 }),
                " Accuracy"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-12" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl font-bold text-foreground", children: formatTime(stored.timeTaken) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
                " Time Taken"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-12" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  className: `text-sm font-semibold border ${cognitiveColor(cogCat)}`,
                  children: [
                    cogCat,
                    " Load"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { size: 11 }),
                " Cognitive Load"
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.15 },
        className: "grid grid-cols-3 gap-4",
        children: [
          {
            label: "Correct",
            value: correctCount,
            icon: CircleCheck,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10 border-emerald-500/20"
          },
          {
            label: "Wrong",
            value: wrongCount,
            icon: CircleX,
            color: "text-destructive",
            bg: "bg-destructive/10 border-destructive/20"
          },
          {
            label: "Skipped",
            value: unanswered,
            icon: CircleMinus,
            color: "text-muted-foreground",
            bg: "bg-muted/50 border-border"
          }
        ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2 + i * 0.08 },
            className: `glass-card p-4 flex flex-col items-center gap-2 border ${item.bg}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { size: 22, className: item.color }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-display text-2xl font-bold ${item.color}`, children: item.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: item.label })
            ]
          },
          item.label
        ))
      }
    ),
    result.weakTopics.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.3 },
        className: "glass-card p-6 space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 16, className: "text-destructive" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Weak Areas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "(<70% accuracy)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: result.weakTopics.map((topic, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/20",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs border-destructive/40 text-destructive",
                    children: topic
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "ghost",
                    "data-ocid": `quiz_result.study_weak.${i + 1}`,
                    onClick: () => navigate({
                      to: `/modules/${encodeURIComponent(config.subject)}`
                    }),
                    className: "h-6 px-2 text-xs text-primary hover:text-primary/80",
                    children: "Study Now"
                  }
                )
              ]
            },
            topic
          )) })
        ]
      }
    ),
    result.strongTopics.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.38 },
        className: "glass-card p-6 space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16, className: "text-emerald-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Strengths" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: result.strongTopics.map((topic) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
              children: topic
            },
            topic
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.45 },
        className: "glass-card p-6 space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { size: 16, className: "text-amber-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Personalized Recommendations" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: recommendations.map((rec) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -12 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.5 + recommendations.indexOf(rec) * 0.07 },
              className: "flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg shrink-0", children: rec.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: rec.text })
              ]
            },
            rec.text
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.55 },
        className: "glass-card overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "quiz_result.toggle_review",
              onClick: () => setReviewOpen((v) => !v),
              className: "w-full flex items-center justify-between p-6 hover:bg-muted/20 transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-semibold text-foreground", children: [
                  "Answer Review (",
                  total,
                  " questions)"
                ] }),
                reviewOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 18, className: "text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 18, className: "text-muted-foreground" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: reviewOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { height: 0, opacity: 0 },
              animate: { height: "auto", opacity: 1 },
              exit: { height: 0, opacity: 0 },
              transition: { duration: 0.3 },
              className: "overflow-hidden",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                questions.map((q, i) => {
                  const userAns = answers[q.questionId];
                  const correct = q.correctAnswer.toUpperCase();
                  const isCorrect = (userAns == null ? void 0 : userAns.toUpperCase()) === correct;
                  const isSkipped = !userAns;
                  const optMap = {
                    A: q.optionA,
                    B: q.optionB,
                    C: q.optionC,
                    D: q.optionD
                  };
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      "data-ocid": `quiz_result.review_item.${i + 1}`,
                      className: `p-4 rounded-xl border space-y-3 ${isSkipped ? "border-border bg-muted/20" : isCorrect ? "border-emerald-500/30 bg-emerald-500/5" : "border-destructive/30 bg-destructive/5"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                        isSkipped ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CircleMinus,
                          {
                            size: 16,
                            className: "text-muted-foreground mt-0.5 shrink-0"
                          }
                        ) : isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CircleCheck,
                          {
                            size: 16,
                            className: "text-emerald-400 mt-0.5 shrink-0"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CircleX,
                          {
                            size: 16,
                            className: "text-destructive mt-0.5 shrink-0"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground mr-1", children: [
                              "Q",
                              i + 1,
                              "."
                            ] }),
                            q.questionText
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-2 text-xs", children: [
                            !isSkipped && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: `px-2 py-0.5 rounded ${isCorrect ? "bg-emerald-500/20 text-emerald-400" : "bg-destructive/20 text-destructive"}`,
                                children: [
                                  "Your answer: ",
                                  userAns,
                                  " — ",
                                  optMap[userAns ?? ""]
                                ]
                              }
                            ),
                            !isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400", children: [
                              "Correct: ",
                              correct,
                              " — ",
                              optMap[correct]
                            ] })
                          ] }),
                          !isCorrect && q.explanation && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-3", children: q.explanation })
                        ] })
                      ] })
                    },
                    q.questionId
                  );
                })
              ] })
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.6 },
        className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "quiz_result.retry_button",
              variant: "outline",
              onClick: () => navigate({ to: "/quiz" }),
              className: "flex flex-col h-auto py-3 gap-1 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 18 }),
                "Retry Quiz"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "quiz_result.study_button",
              variant: "outline",
              onClick: () => navigate({ to: "/modules" }),
              className: "flex flex-col h-auto py-3 gap-1 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 18 }),
                "Study Topics"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "quiz_result.analytics_button",
              variant: "outline",
              onClick: () => navigate({ to: "/analytics" }),
              className: "flex flex-col h-auto py-3 gap-1 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 18 }),
                "Analytics"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "quiz_result.dashboard_button",
              onClick: () => navigate({ to: "/dashboard" }),
              className: "flex flex-col h-auto py-3 gap-1 text-xs bg-primary hover:bg-primary/90",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { size: 18 }),
                "Dashboard"
              ]
            }
          )
        ]
      }
    )
  ] });
}
export {
  QuizResult as default
};
