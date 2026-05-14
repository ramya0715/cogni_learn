import { c as createLucideIcon, x as useParams, b as useNavigate, F as useGetQuizQuestions, r as reactExports, G as useSubmitQuizSession, H as ue, j as jsxRuntimeExports, J as ChevronLeft, k as ChevronRight } from "./index-B3pXppQ4.js";
import { B as Badge } from "./badge-C2xWMHlK.js";
import { B as Button } from "./button-DOd5Cxo7.js";
import { P as Progress } from "./progress-BCkbHhZL.js";
import { L as LoaderCircle } from "./loader-circle-CA1kAUaG.js";
import { T as TriangleAlert } from "./triangle-alert-B3pg5YSG.js";
import { R as RefreshCw } from "./refresh-cw-BxEehOnR.js";
import { m as motion } from "./proxy-BhoJ3VbB.js";
import { C as Clock } from "./clock-SOyJrFQl.js";
import { A as AnimatePresence } from "./index-B_Rp5UnH.js";
import "./index-NpozLJBk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", key: "i9b6wo" }],
  ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }]
];
const Flag = createLucideIcon("flag", __iconNode);
const TOTAL_SECS = 90 * 60;
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function QuizSession() {
  const { sessionId } = useParams({ from: "/quiz/$sessionId" });
  const navigate = useNavigate();
  const configRaw = sessionStorage.getItem(`quiz_config_${sessionId}`);
  const config = configRaw ? JSON.parse(configRaw) : {
    subject: "Aptitude",
    difficulty: "Intermediate",
    stressLevel: 5,
    confidenceLevel: 6
  };
  const {
    data: rawQuestions,
    isLoading,
    isError,
    refetch
  } = useGetQuizQuestions(config.subject, config.difficulty);
  const [questions, setQuestions] = reactExports.useState([]);
  const [currentIdx, setCurrentIdx] = reactExports.useState(0);
  const [answers, setAnswers] = reactExports.useState({});
  const [questionStartTimes, setQuestionStartTimes] = reactExports.useState({});
  const [timePerQuestion, setTimePerQuestion] = reactExports.useState([]);
  const [secsLeft, setSecsLeft] = reactExports.useState(TOTAL_SECS);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [startTime] = reactExports.useState(Date.now());
  const timerRef = reactExports.useRef(null);
  const submitMutation = useSubmitQuizSession();
  reactExports.useEffect(() => {
    if (rawQuestions && rawQuestions.length > 0 && questions.length === 0) {
      const shuffled = shuffle(rawQuestions).slice(0, 50);
      setQuestions(shuffled);
      setQuestionStartTimes({ 0: Date.now() });
    }
  }, [rawQuestions, questions.length]);
  const recordTimeForCurrent = reactExports.useCallback(
    (idx) => {
      const startedAt = questionStartTimes[idx];
      if (startedAt) {
        const elapsed = Math.round((Date.now() - startedAt) / 1e3);
        setTimePerQuestion((prev) => {
          const updated = [...prev];
          updated[idx] = (updated[idx] ?? 0) + elapsed;
          return updated;
        });
      }
    },
    [questionStartTimes]
  );
  function goToQuestion(idx) {
    recordTimeForCurrent(currentIdx);
    setCurrentIdx(idx);
    setQuestionStartTimes((prev) => ({ ...prev, [idx]: Date.now() }));
  }
  reactExports.useEffect(() => {
    if (questions.length === 0 || submitted) return;
    timerRef.current = setInterval(() => {
      setSecsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        if (s === 300)
          ue.warning("⏰ 5 minutes remaining!", { id: "timer-warn-5" });
        if (s === 60)
          ue.error("⚠️ 1 minute remaining — wrap up!", {
            id: "timer-warn-1"
          });
        return s - 1;
      });
    }, 1e3);
    return () => clearInterval(timerRef.current);
  }, [questions.length, submitted]);
  async function handleAutoSubmit() {
    if (submitted) return;
    ue.info("Time's up! Submitting your answers...", { id: "auto-submit" });
    await doSubmit();
  }
  async function doSubmit() {
    if (submitted || submitMutation.isPending) return;
    setSubmitted(true);
    clearInterval(timerRef.current);
    recordTimeForCurrent(currentIdx);
    const answersArr = questions.map((q2) => [
      q2.questionId,
      answers[q2.questionId] ?? ""
    ]);
    const tpqArr = questions.map((_, i) => timePerQuestion[i] ?? 0);
    const sessionDuration = Math.round((Date.now() - startTime) / 1e3);
    try {
      const result = await submitMutation.mutateAsync({
        subject: config.subject,
        difficulty: config.difficulty,
        answers: answersArr,
        timePerQuestion: tpqArr,
        stressLevel: BigInt(config.stressLevel),
        confidenceLevel: BigInt(config.confidenceLevel),
        sessionDurationSecs: BigInt(sessionDuration)
      });
      sessionStorage.setItem(
        `quiz_result_${sessionId}`,
        JSON.stringify({
          result,
          questions,
          answers,
          config,
          timeTaken: sessionDuration
        })
      );
      navigate({ to: `/quiz/result/${sessionId}` });
    } catch {
      ue.error("Failed to submit. Please try again.");
      setSubmitted(false);
    }
  }
  if (isLoading || questions.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-8 flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 32, className: "text-primary animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "Loading ",
        config.subject,
        " questions..."
      ] })
    ] }) });
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-8 flex flex-col items-center gap-4 max-w-sm text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 32, className: "text-destructive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "Failed to load questions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Check your connection and try again." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: () => refetch(),
          className: "gap-2",
          "data-ocid": "quiz_session.retry_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 15 }),
            " Retry"
          ]
        }
      )
    ] }) });
  }
  const q = questions[currentIdx];
  const totalQ = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPct = (currentIdx + 1) / totalQ * 100;
  const mins = Math.floor(secsLeft / 60);
  const secs = secsLeft % 60;
  const isLastQ = currentIdx === totalQ - 1;
  const isLowTime = secsLeft <= 300;
  const isCriticalTime = secsLeft <= 60;
  const optionLabels = ["A", "B", "C", "D"];
  const options = [q.optionA, q.optionB, q.optionC, q.optionD];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto space-y-4 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        className: "glass-card p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: config.subject }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: config.difficulty }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
              "Question",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: currentIdx + 1 }),
              " ",
              "of ",
              totalQ
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center gap-1.5 px-3 py-1 rounded-full border font-mono font-bold text-sm ${isCriticalTime ? "bg-destructive/20 border-destructive/40 text-destructive animate-pulse" : isLowTime ? "bg-amber-500/20 border-amber-500/40 text-amber-400" : "bg-card border-border text-foreground"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
                  String(mins).padStart(2, "0"),
                  ":",
                  String(secs).padStart(2, "0")
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Progress,
            {
              value: progressPct,
              className: "h-2",
              "data-ocid": "quiz_session.progress_bar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] text-muted-foreground mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              answeredCount,
              " answered"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              totalQ - answeredCount,
              " remaining"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
        transition: { duration: 0.22 },
        className: "glass-card p-6 space-y-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground bg-muted rounded px-2 py-0.5 mt-0.5 shrink-0", children: [
              "Q",
              currentIdx + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs shrink-0", children: q.topicTag })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-foreground text-lg leading-relaxed font-medium",
              "data-ocid": "quiz_session.question_text",
              children: q.questionText
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid gap-3",
              role: "radiogroup",
              "aria-label": "Answer options",
              children: options.map((opt, i) => {
                const label = optionLabels[i];
                const isSelected = answers[q.questionId] === label;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    "data-ocid": `quiz_session.option.${i + 1}`,
                    whileTap: { scale: 0.99 },
                    onClick: () => setAnswers((prev) => ({ ...prev, [q.questionId]: label })),
                    className: `flex items-center gap-4 p-4 rounded-xl border text-left transition-smooth ${isSelected ? "bg-primary/15 border-primary/50 ring-2 ring-primary/30 shadow-sm" : "border-border hover:border-primary/30 hover:bg-muted/40"}`,
                    "aria-pressed": isSelected,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 transition-smooth ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
                          children: label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: opt })
                    ]
                  },
                  label
                );
              })
            }
          )
        ]
      },
      currentIdx
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          "data-ocid": "quiz_session.prev_button",
          disabled: currentIdx === 0,
          onClick: () => goToQuestion(currentIdx - 1),
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
            " Previous"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 min-w-max mx-auto justify-center", children: questions.map((question, i) => {
        const isAnswered = !!answers[question.questionId];
        const isCurrent = i === currentIdx;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `quiz_session.q_nav.${i + 1}`,
            onClick: () => goToQuestion(i),
            className: `w-7 h-7 rounded-md text-xs font-medium transition-smooth shrink-0 ${isCurrent ? "bg-primary text-primary-foreground" : isAnswered ? "bg-emerald-500/30 text-emerald-400 border border-emerald-500/40" : "bg-muted text-muted-foreground hover:bg-muted/70"}`,
            children: i + 1
          },
          question.questionId
        );
      }) }) }),
      isLastQ ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          "data-ocid": "quiz_session.submit_button",
          onClick: doSubmit,
          disabled: submitted || submitMutation.isPending,
          className: "gap-2 bg-emerald-600 hover:bg-emerald-500 text-white",
          children: [
            submitMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 15, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { size: 15 }),
            "Submit Quiz"
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          "data-ocid": "quiz_session.next_button",
          onClick: () => goToQuestion(currentIdx + 1),
          className: "gap-2",
          children: [
            "Next ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
          ]
        }
      )
    ] })
  ] });
}
export {
  QuizSession as default
};
