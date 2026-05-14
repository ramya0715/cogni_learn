import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetLearningProgress } from "@/hooks/useBackend";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Calculator,
  ChevronRight,
  ClipboardList,
  Code2,
  Cpu,
  Database,
  Flame,
  Layers,
  Target,
  Trophy,
} from "lucide-react";

interface Subject {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradientFrom: string;
  topics: string[];
  tags: string[];
  topicCount: number;
}

const SUBJECTS: Subject[] = [
  {
    id: "aptitude",
    name: "Aptitude",
    slug: "aptitude",
    description:
      "Master quantitative reasoning and logical thinking for placement tests",
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
      "Permutations",
    ],
    tags: ["Quantitative", "Logical", "Verbal"],
    topicCount: 10,
  },
  {
    id: "dbms",
    name: "DBMS",
    slug: "dbms",
    description:
      "Database concepts essential for technical interviews and placements",
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
      "Views",
    ],
    tags: ["SQL", "Database", "Backend"],
    topicCount: 10,
  },
  {
    id: "oops",
    name: "OOPS",
    slug: "oops",
    description: "Object-oriented programming principles for technical rounds",
    icon: Code2,
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
      "Generics",
    ],
    tags: ["OOP", "Design Patterns", "Java"],
    topicCount: 8,
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
      "API Design",
    ],
    tags: ["Architecture", "Scalability", "Backend"],
    topicCount: 8,
  },
  {
    id: "technical-mcqs",
    name: "Technical MCQs",
    slug: "technical-mcqs",
    description:
      "Core CS fundamentals: algorithms, data structures, OS, networking",
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
      "Big-O Notation",
    ],
    tags: ["DSA", "OS", "Networking"],
    topicCount: 8,
  },
];

function SubjectCard({ subject }: { subject: Subject }) {
  const { data: progress, isLoading } = useGetLearningProgress(subject.name);
  const progressPct = progress?.progressPercentage ?? 0;
  const Icon = subject.icon;

  return (
    <div
      data-ocid={`modules.card.${subject.id}`}
      className="glass-card group relative overflow-hidden transition-smooth hover:scale-[1.015] hover:shadow-lg flex flex-col h-full"
    >
      {/* Subtle gradient top strip */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${subject.gradientFrom} to-transparent`}
      />

      {/* Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div
            className={`w-11 h-11 rounded-xl border border-current/20 flex items-center justify-center ${subject.gradientFrom} ${subject.color}`}
          >
            <Icon size={22} />
          </div>
          <div className="flex flex-wrap gap-1 justify-end">
            {subject.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[10px] px-1.5 py-0"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <h3 className="font-display text-base font-bold text-foreground mb-1 group-hover:text-primary transition-smooth">
          {subject.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {subject.description}
        </p>
      </div>

      {/* Topics */}
      <div className="px-5 pb-4">
        <div className="flex flex-wrap gap-1">
          {subject.topics.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
            >
              {t}
            </span>
          ))}
          {subject.topicCount > 4 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-primary font-medium">
              +{subject.topicCount - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="px-5 pb-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-muted-foreground font-medium">
            {subject.topicCount} Topics
          </span>
          {isLoading ? (
            <Skeleton className="h-3 w-10" />
          ) : (
            <span
              className={`font-semibold ${progressPct >= 70 ? "text-[oklch(0.72_0.18_145)]" : progressPct >= 40 ? "text-[oklch(0.75_0.16_85)]" : "text-primary"}`}
            >
              {Math.round(progressPct)}%
            </span>
          )}
        </div>
        {isLoading ? (
          <Skeleton className="h-1.5 w-full rounded-full" />
        ) : (
          <Progress value={progressPct} className="h-1.5" />
        )}
        {progress?.studyStreak && Number(progress.studyStreak) > 0 ? (
          <div className="flex items-center gap-1 mt-1.5">
            <Flame size={10} className="text-[oklch(0.65_0.22_25)]" />
            <span className="text-[10px] text-muted-foreground">
              {Number(progress.studyStreak)} day streak
            </span>
          </div>
        ) : null}
      </div>

      {/* Actions */}
      <div className="px-5 pb-5 mt-auto flex gap-2">
        <Button
          asChild
          className="flex-1 h-8 text-xs"
          data-ocid={`modules.study_button.${subject.id}`}
        >
          <Link to="/modules/$subject" params={{ subject: subject.slug }}>
            <BookOpen size={12} className="mr-1.5" />
            Study Now
          </Link>
        </Button>
        <Button
          asChild
          variant="secondary"
          className="flex-1 h-8 text-xs"
          data-ocid={`modules.quiz_button.${subject.id}`}
        >
          <Link to="/quiz" search={{ subject: subject.name }}>
            <ClipboardList size={12} className="mr-1.5" />
            Take Quiz
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function Modules() {
  return (
    <div className="space-y-6" data-ocid="modules.page">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link
            to="/dashboard"
            className="hover:text-foreground transition-smooth"
          >
            Dashboard
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground">Learning Modules</span>
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Learning Modules
        </h1>
        <p className="text-muted-foreground text-sm">
          Structured placement preparation covering all core subjects
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3" data-ocid="modules.stats_section">
        {[
          {
            icon: BookOpen,
            label: "5 Subjects",
            sub: "Covered",
            color: "text-primary",
          },
          {
            icon: Target,
            label: "250+",
            sub: "MCQ Questions",
            color: "text-[oklch(0.72_0.18_145)]",
          },
          {
            icon: Trophy,
            label: "Adaptive",
            sub: "Difficulty",
            color: "text-[oklch(0.75_0.16_85)]",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass-card p-3 flex items-center gap-2.5"
          >
            <stat.icon size={18} className={stat.color} />
            <div>
              <p className={`text-sm font-bold ${stat.color}`}>{stat.label}</p>
              <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Subject Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        data-ocid="modules.subjects_grid"
      >
        {SUBJECTS.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
}
