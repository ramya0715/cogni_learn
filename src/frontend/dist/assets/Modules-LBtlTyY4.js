import { j as jsxRuntimeExports, L as Link, k as ChevronRight, B as BookOpen, l as useGetLearningProgress, i as ClipboardList } from "./index-B3pXppQ4.js";
import { B as Badge } from "./badge-C2xWMHlK.js";
import { B as Button } from "./button-DOd5Cxo7.js";
import { P as Progress } from "./progress-BCkbHhZL.js";
import { S as Skeleton } from "./skeleton-zswagPjP.js";
import { T as Target } from "./target-CPIi5IED.js";
import { T as Trophy } from "./trophy-DRmHv0p9.js";
import { C as Calculator } from "./calculator-B1vQotGu.js";
import { D as Database, C as CodeXml, a as Cpu } from "./database-Bq718Z_S.js";
import { L as Layers } from "./layers-FjN3uewx.js";
import { F as Flame } from "./flame-DSrAzbPw.js";
import "./index-NpozLJBk.js";
const SUBJECTS = [
  {
    id: "aptitude",
    name: "Aptitude",
    slug: "aptitude",
    description: "Master quantitative reasoning and logical thinking for placement tests",
    icon: Calculator,
    color: "text-[oklch(0.72_0.22_200)]",
    gradientFrom: "from-[oklch(0.72_0.22_200)]/20",
    topics: [
      "Percentages",
      "Ratios",
      "Averages",
      "Time & Work",
      "Profit & Loss",
      "Probability",
      "Number Series",
      "Time & Distance",
      "Data Interpretation",
      "Permutations"
    ],
    tags: ["Quantitative", "Logical", "Verbal"],
    topicCount: 10
  },
  {
    id: "dbms",
    name: "DBMS",
    slug: "dbms",
    description: "Database concepts essential for technical interviews and placements",
    icon: Database,
    color: "text-[oklch(0.68_0.20_262)]",
    gradientFrom: "from-[oklch(0.68_0.20_262)]/20",
    topics: [
      "SQL Queries",
      "Normalization",
      "ACID Properties",
      "Indexing",
      "Transactions",
      "Joins",
      "ER Diagrams",
      "Concurrency Control",
      "Stored Procedures",
      "Views"
    ],
    tags: ["SQL", "Database", "Backend"],
    topicCount: 10
  },
  {
    id: "oops",
    name: "OOPS",
    slug: "oops",
    description: "Object-oriented programming principles for technical rounds",
    icon: CodeXml,
    color: "text-[oklch(0.72_0.18_145)]",
    gradientFrom: "from-[oklch(0.72_0.18_145)]/20",
    topics: [
      "Encapsulation",
      "Inheritance",
      "Polymorphism",
      "Abstraction",
      "Design Patterns",
      "SOLID Principles",
      "Interfaces",
      "Generics"
    ],
    tags: ["OOP", "Design Patterns", "Java"],
    topicCount: 8
  },
  {
    id: "system-design",
    name: "System Design",
    slug: "system-design",
    description: "High-level system architecture for senior-level interviews",
    icon: Layers,
    color: "text-[oklch(0.75_0.16_85)]",
    gradientFrom: "from-[oklch(0.75_0.16_85)]/20",
    topics: [
      "Load Balancing",
      "Caching",
      "CAP Theorem",
      "Microservices",
      "Database Sharding",
      "Message Queues",
      "CDN",
      "API Design"
    ],
    tags: ["Architecture", "Scalability", "Backend"],
    topicCount: 8
  },
  {
    id: "technical-mcqs",
    name: "Technical MCQs",
    slug: "technical-mcqs",
    description: "Core CS fundamentals: algorithms, data structures, OS, networking",
    icon: Cpu,
    color: "text-[oklch(0.65_0.22_25)]",
    gradientFrom: "from-[oklch(0.65_0.22_25)]/20",
    topics: [
      "Arrays",
      "Trees",
      "Graphs",
      "Sorting",
      "Dynamic Programming",
      "OS Concepts",
      "Networking",
      "Big-O Notation"
    ],
    tags: ["DSA", "OS", "Networking"],
    topicCount: 8
  }
];
function SubjectCard({ subject }) {
  const { data: progress, isLoading } = useGetLearningProgress(subject.name);
  const progressPct = (progress == null ? void 0 : progress.progressPercentage) ?? 0;
  const Icon = subject.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `modules.card.${subject.id}`,
      className: "glass-card group relative overflow-hidden transition-smooth hover:scale-[1.015] hover:shadow-lg flex flex-col h-full",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${subject.gradientFrom} to-transparent`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-11 h-11 rounded-xl border border-current/20 flex items-center justify-center ${subject.gradientFrom} ${subject.color}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 22 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 justify-end", children: subject.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-[10px] px-1.5 py-0",
                children: tag
              },
              tag
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-foreground mb-1 group-hover:text-primary transition-smooth", children: subject.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: subject.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
          subject.topics.slice(0, 4).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground",
              children: t
            },
            t
          )),
          subject.topicCount > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-muted text-primary font-medium", children: [
            "+",
            subject.topicCount - 4,
            " more"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-medium", children: [
              subject.topicCount,
              " Topics"
            ] }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-10" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `font-semibold ${progressPct >= 70 ? "text-[oklch(0.72_0.18_145)]" : progressPct >= 40 ? "text-[oklch(0.75_0.16_85)]" : "text-primary"}`,
                children: [
                  Math.round(progressPct),
                  "%"
                ]
              }
            )
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-1.5 w-full rounded-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progressPct, className: "h-1.5" }),
          (progress == null ? void 0 : progress.studyStreak) && Number(progress.studyStreak) > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 10, className: "text-[oklch(0.65_0.22_25)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
              Number(progress.studyStreak),
              " day streak"
            ] })
          ] }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-5 mt-auto flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "flex-1 h-8 text-xs",
              "data-ocid": `modules.study_button.${subject.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/modules/$subject", params: { subject: subject.slug }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 12, className: "mr-1.5" }),
                "Study Now"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "secondary",
              className: "flex-1 h-8 text-xs",
              "data-ocid": `modules.quiz_button.${subject.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/quiz", search: { subject: subject.name }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 12, className: "mr-1.5" }),
                "Take Quiz"
              ] })
            }
          )
        ] })
      ]
    }
  );
}
function Modules() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "modules.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/dashboard",
            className: "hover:text-foreground transition-smooth",
            children: "Dashboard"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Learning Modules" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-bold text-foreground", children: "Learning Modules" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Structured placement preparation covering all core subjects" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", "data-ocid": "modules.stats_section", children: [
      {
        icon: BookOpen,
        label: "5 Subjects",
        sub: "Covered",
        color: "text-primary"
      },
      {
        icon: Target,
        label: "250+",
        sub: "MCQ Questions",
        color: "text-[oklch(0.72_0.18_145)]"
      },
      {
        icon: Trophy,
        label: "Adaptive",
        sub: "Difficulty",
        color: "text-[oklch(0.75_0.16_85)]"
      }
    ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-card p-3 flex items-center gap-2.5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { size: 18, className: stat.color }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm font-bold ${stat.color}`, children: stat.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: stat.sub })
          ] })
        ]
      },
      stat.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        "data-ocid": "modules.subjects_grid",
        children: SUBJECTS.map((subject) => /* @__PURE__ */ jsxRuntimeExports.jsx(SubjectCard, { subject }, subject.id))
      }
    )
  ] });
}
export {
  Modules as default
};
