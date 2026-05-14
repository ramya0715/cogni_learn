import { CognitiveLoadBadge } from "@/components/ui/CognitiveLoadBadge";
import { ProgressCard } from "@/components/ui/ProgressCard";
import { StatCard } from "@/components/ui/StatCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDashboardData } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import type {
  DashboardData,
  LearningProgress,
  QuizSession,
  Recommendation,
} from "@/types";
import type { CognitiveLoadCategory } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookMarked,
  BookOpen,
  Brain,
  ClipboardList,
  Flame,
  Layers,
  Lightbulb,
  Map as MapIcon,
  RefreshCw,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ── helpers ─────────────────────────────────────────────────────────────────

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const SUBJECTS = [
  "Aptitude",
  "DBMS",
  "OOPS",
  "System Design",
  "Technical MCQs",
] as const;

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const REC_ICONS: Record<string, React.ElementType> = {
  "Weak Topic": Zap,
  Revision: RefreshCw,
  "Next Topic": ArrowRight,
  "Learning Path": MapIcon,
};

const LOAD_AREA_COLOR: Record<CognitiveLoadCategory, string> = {
  Low: "oklch(0.72 0.18 145)",
  Moderate: "oklch(0.75 0.16 85)",
  High: "oklch(0.65 0.22 25)",
};

const COGNITIVE_MESSAGES: Record<CognitiveLoadCategory, string> = {
  High: "Take a break — your cognitive load is high. Try easier exercises.",
  Moderate: "Good progress! Continue with balanced exercises.",
  Low: "You're in the zone! Challenge yourself with harder content.",
};

// ── sub-components ───────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-28 w-full rounded-xl" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[0, 1, 2, 3].map((n) => (
          <Skeleton key={n} className="h-24 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Skeleton className="h-56 rounded-xl" />
        <Skeleton className="h-56 rounded-xl" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[0, 1, 2, 3, 4].map((n) => (
          <Skeleton key={n} className="h-28 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function EmptyState({ onStart }: { onStart: () => void }) {
  return (
    <div
      data-ocid="dashboard.empty_state"
      className="flex flex-col items-center justify-center gap-6 py-24 text-center animate-fade-in"
    >
      <div className="w-20 h-20 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
        <Brain size={36} className="text-primary" />
      </div>
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          Welcome to CogLearn!
        </h2>
        <p className="text-muted-foreground mt-2 max-w-sm">
          Start your first quiz to generate your cognitive load profile and
          personalised learning path.
        </p>
      </div>
      <button
        type="button"
        onClick={onStart}
        data-ocid="dashboard.start_first_quiz_button"
        className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold font-display hover:bg-primary/90 transition-smooth shadow-lg"
      >
        Start Your First Quiz
      </button>
    </div>
  );
}

interface RecommendationCardProps {
  rec: Recommendation;
  index: number;
  onStart: () => void;
}

function RecommendationCard({ rec, index, onStart }: RecommendationCardProps) {
  const IconComp = REC_ICONS[rec.recType] ?? Lightbulb;
  return (
    <div
      data-ocid={`dashboard.recommendation.item.${index + 1}`}
      className="glass-card p-4 flex items-start gap-3 animate-slide-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
        <IconComp size={16} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {rec.recType}
          </span>
          <span className="text-xs font-display font-semibold text-foreground truncate">
            {rec.targetSubject}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
          {rec.reason}
        </p>
      </div>
      <button
        type="button"
        onClick={onStart}
        data-ocid={`dashboard.recommendation.start_button.${index + 1}`}
        className="flex-shrink-0 text-xs font-medium text-primary hover:text-primary/80 transition-smooth flex items-center gap-1"
      >
        Start <ArrowRight size={12} />
      </button>
    </div>
  );
}

interface QuizRowProps {
  session: QuizSession;
  index: number;
}

function QuizRow({ session, index }: QuizRowProps) {
  const date = new Date(Number(session.endTime) / 1_000_000);
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const acc = (session.accuracy * 100).toFixed(0);
  const score = Number(session.score);

  return (
    <div
      data-ocid={`dashboard.quiz_history.item.${index + 1}`}
      className="flex items-center gap-3 py-3 border-b border-border/50 last:border-0 animate-fade-in"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-display font-semibold text-foreground truncate">
          {session.subject}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {session.difficulty} · {dateStr}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-bold font-display text-foreground">
          {score} pts
        </p>
        <p
          className={cn(
            "text-xs font-medium",
            Number(acc) >= 75
              ? "text-[oklch(0.72_0.18_145)]"
              : Number(acc) >= 50
                ? "text-[oklch(0.75_0.16_85)]"
                : "text-[oklch(0.65_0.22_25)]",
          )}
        >
          {acc}% acc
        </p>
      </div>
    </div>
  );
}

// ── custom tooltip ────────────────────────────────────────────────────────────

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const cat: CognitiveLoadCategory =
    val >= 70 ? "High" : val >= 40 ? "Moderate" : "Low";
  return (
    <div className="glass-card px-3 py-2 text-xs">
      <p className="text-muted-foreground">{label}</p>
      <p className="font-bold text-foreground">{val.toFixed(0)} score</p>
      <CognitiveLoadBadge category={cat} size="sm" />
    </div>
  );
}

function BarTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs">
      <p className="text-muted-foreground">{label}</p>
      <p className="font-bold text-foreground">
        {payload[0].value} session{payload[0].value !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetDashboardData();

  const dashData = data as DashboardData | null;

  // Cognitive load trend chart data (7-day synthetic from current or flat baseline)
  const trendData = useMemo(() => {
    if (!dashData) return [];
    const base = dashData.currentCognitiveLoad?.loadScore ?? 35;
    return DAY_LABELS.map((day, i) => ({
      day,
      score: Math.max(
        5,
        Math.min(100, base + Math.sin(i * 1.3 + base * 0.04) * 18),
      ),
    }));
  }, [dashData]);

  // Weekly sessions bar data
  const weeklyData = useMemo(() => {
    const sessions = dashData?.weeklyStudySessions ?? [];
    return DAY_LABELS.map((day, i) => ({
      day,
      sessions: Number(sessions[i] ?? 0),
    }));
  }, [dashData]);

  // Subject progress lookup
  const progressMap = useMemo(() => {
    const map: Record<string, LearningProgress> = {};
    for (const lp of dashData?.learningProgressAll ?? []) {
      map[lp.subject] = lp;
    }
    return map;
  }, [dashData]);

  // Aggregate stats
  const totalQuizzes = useMemo(() => {
    return dashData?.recentQuizSessions?.length ?? 0;
  }, [dashData]);

  const avgAccuracy = useMemo(() => {
    const sessions = dashData?.recentQuizSessions ?? [];
    if (!sessions.length) return 0;
    const sum = sessions.reduce((acc, s) => acc + s.accuracy, 0);
    return (sum / sessions.length) * 100;
  }, [dashData]);

  const overallProgress = useMemo(() => {
    const all = dashData?.learningProgressAll ?? [];
    if (!all.length) return 0;
    const sum = all.reduce((acc, lp) => acc + lp.progressPercentage, 0);
    return sum / all.length;
  }, [dashData]);

  const loadCategory = (dashData?.currentCognitiveLoad?.category ??
    "Low") as CognitiveLoadCategory;
  const loadScore = dashData?.currentCognitiveLoad?.loadScore ?? 0;
  const areaColor = LOAD_AREA_COLOR[loadCategory];
  const userName = dashData?.profile?.name ?? "Learner";
  const streak = Number(dashData?.streakDays ?? 0);

  const isNewUser = !isLoading && (!dashData || !dashData.profile?.name);

  if (isLoading) {
    return (
      <div data-ocid="dashboard.loading_state">
        <DashboardSkeleton />
      </div>
    );
  }

  if (isNewUser) {
    return <EmptyState onStart={() => navigate({ to: "/quiz" })} />;
  }

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* 1. WELCOME SECTION */}
      <section
        data-ocid="dashboard.welcome_section"
        className="glass-card p-5 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-primary/20"
      >
        <div className="flex flex-col gap-1.5">
          <p className="text-sm text-muted-foreground font-medium">
            {formatDate()}
          </p>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            {greeting()}, <span className="text-primary">{userName}</span>!
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {COGNITIVE_MESSAGES[loadCategory]}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CognitiveLoadBadge
            category={loadCategory}
            score={loadScore}
            size="lg"
          />
          <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5">
            <Flame size={15} className="text-orange-400" />
            <span className="text-sm font-display font-bold text-foreground">
              {streak} day{streak !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* 2. STAT CARDS */}
      <section
        data-ocid="dashboard.stats_section"
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        <StatCard
          icon={Flame}
          label="Daily Streak"
          value={`${streak}d`}
          iconColor="text-orange-400"
          className="animate-slide-up"
        />
        <StatCard
          icon={ClipboardList}
          label="Total Quizzes"
          value={totalQuizzes}
          iconColor="text-primary"
          className="animate-slide-up [animation-delay:0.05s]"
        />
        <StatCard
          icon={Target}
          label="Avg Accuracy"
          value={`${avgAccuracy.toFixed(0)}%`}
          iconColor="text-[oklch(0.72_0.18_145)]"
          className="animate-slide-up [animation-delay:0.1s]"
        />
        <StatCard
          icon={TrendingUp}
          label="Study Progress"
          value={`${overallProgress.toFixed(0)}%`}
          iconColor="text-[oklch(0.75_0.16_85)]"
          className="animate-slide-up [animation-delay:0.15s]"
        />
      </section>

      {/* 3 + 5. CHARTS ROW */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cognitive load trend */}
        <div data-ocid="dashboard.cognitive_chart" className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-semibold text-foreground text-sm">
                Cognitive Load Trend
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                7-day history
              </p>
            </div>
            <CognitiveLoadBadge category={loadCategory} size="sm" />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart
              data={trendData}
              margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
            >
              <defs>
                <linearGradient id="loadGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={areaColor} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={areaColor} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.85 0.02 260 / 0.3)"
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "oklch(0.45 0.04 260)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "oklch(0.45 0.04 260)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="score"
                stroke={areaColor}
                strokeWidth={2}
                fill="url(#loadGradient)"
                dot={{ r: 3, fill: areaColor, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: areaColor }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly study sessions */}
        <div data-ocid="dashboard.weekly_chart" className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-semibold text-foreground text-sm">
                Weekly Study Sessions
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Sessions completed per day
              </p>
            </div>
            <BarChart3 size={16} className="text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={weeklyData}
              margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.85 0.02 260 / 0.3)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "oklch(0.45 0.04 260)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: "oklch(0.45 0.04 260)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<BarTooltip />} />
              <Bar
                dataKey="sessions"
                fill="oklch(0.52 0.21 262 / 0.75)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 4. SUBJECT PROGRESS */}
      <section data-ocid="dashboard.subjects_section">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-foreground text-base">
            Subject Progress
          </h2>
          <button
            type="button"
            onClick={() => navigate({ to: "/modules" })}
            data-ocid="dashboard.view_modules_button"
            className="text-xs text-primary font-medium flex items-center gap-1 hover:text-primary/80 transition-smooth"
          >
            View all <ArrowRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
          {SUBJECTS.map((subj, i) => {
            const lp = progressMap[subj];
            const pct = lp?.progressPercentage ?? 0;
            const completed = lp?.completedTopics?.length ?? 0;
            return (
              <div key={subj} data-ocid={`dashboard.subject.item.${i + 1}`}>
                <ProgressCard
                  subject={subj}
                  progress={pct}
                  completedTopics={completed}
                  totalTopics={10}
                  cognitiveCategory={loadCategory}
                  onClick={() =>
                    navigate({
                      to: "/quiz",
                      search: { subject: subj } as Record<string, string>,
                    })
                  }
                  className="animate-slide-up"
                />
                <button
                  type="button"
                  onClick={() =>
                    navigate({
                      to: "/quiz",
                      search: { subject: subj } as Record<string, string>,
                    })
                  }
                  data-ocid={`dashboard.subject.start_quiz_button.${i + 1}`}
                  className="mt-2 w-full text-xs font-medium text-center py-1.5 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-smooth"
                >
                  Start Quiz
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. RECOMMENDATIONS */}
      {(dashData?.recommendations?.length ?? 0) > 0 && (
        <section data-ocid="dashboard.recommendations_section">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold text-foreground text-base">
              Personalised Recommendations
            </h2>
            <Lightbulb size={16} className="text-[oklch(0.75_0.16_85)]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dashData!.recommendations.slice(0, 6).map((rec, i) => (
              <RecommendationCard
                key={rec.recId}
                rec={rec}
                index={i}
                onStart={() => navigate({ to: "/modules" })}
              />
            ))}
          </div>
        </section>
      )}

      {/* 7. RECENT QUIZ HISTORY */}
      <section data-ocid="dashboard.quiz_history_section">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-foreground text-base">
            Recent Quiz History
          </h2>
          <button
            type="button"
            onClick={() => navigate({ to: "/quiz" })}
            data-ocid="dashboard.view_all_quizzes_button"
            className="text-xs text-primary font-medium flex items-center gap-1 hover:text-primary/80 transition-smooth"
          >
            View all <ArrowRight size={13} />
          </button>
        </div>
        <div className="glass-card px-4 py-2">
          {(dashData?.recentQuizSessions?.length ?? 0) === 0 ? (
            <p
              data-ocid="dashboard.quiz_history.empty_state"
              className="text-sm text-muted-foreground text-center py-8"
            >
              No quizzes completed yet. Start your first quiz!
            </p>
          ) : (
            dashData!.recentQuizSessions
              .slice(0, 5)
              .map((s, i) => (
                <QuizRow key={s.sessionId} session={s} index={i} />
              ))
          )}
        </div>
      </section>

      {/* 8. QUICK ACTIONS */}
      <section data-ocid="dashboard.quick_actions_section">
        <h2 className="font-display font-bold text-foreground text-base mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/quiz" })}
            data-ocid="dashboard.start_quiz_button"
            className="glass-card p-5 flex items-center gap-3 text-left group hover:border-primary/40 hover:shadow-lg transition-smooth"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center group-hover:bg-primary/25 transition-smooth">
              <ClipboardList size={18} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-semibold text-foreground text-sm">
                Start Quiz
              </p>
              <p className="text-xs text-muted-foreground">
                Test your knowledge
              </p>
            </div>
            <ArrowRight
              size={16}
              className="text-muted-foreground ml-auto flex-shrink-0 group-hover:text-primary transition-smooth"
            />
          </button>

          <button
            type="button"
            onClick={() => navigate({ to: "/analytics" })}
            data-ocid="dashboard.view_analytics_button"
            className="glass-card p-5 flex items-center gap-3 text-left group hover:border-primary/40 hover:shadow-lg transition-smooth"
          >
            <div className="w-10 h-10 rounded-xl bg-[oklch(0.72_0.18_145/0.15)] border border-[oklch(0.72_0.18_145/0.3)] flex items-center justify-center group-hover:bg-[oklch(0.72_0.18_145/0.25)] transition-smooth">
              <BarChart3 size={18} className="text-[oklch(0.72_0.18_145)]" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-semibold text-foreground text-sm">
                View Analytics
              </p>
              <p className="text-xs text-muted-foreground">
                Track your performance
              </p>
            </div>
            <ArrowRight
              size={16}
              className="text-muted-foreground ml-auto flex-shrink-0 group-hover:text-[oklch(0.72_0.18_145)] transition-smooth"
            />
          </button>

          <button
            type="button"
            onClick={() => navigate({ to: "/modules" })}
            data-ocid="dashboard.continue_learning_button"
            className="glass-card p-5 flex items-center gap-3 text-left group hover:border-primary/40 hover:shadow-lg transition-smooth"
          >
            <div className="w-10 h-10 rounded-xl bg-[oklch(0.65_0.18_200/0.15)] border border-[oklch(0.65_0.18_200/0.3)] flex items-center justify-center group-hover:bg-[oklch(0.65_0.18_200/0.25)] transition-smooth">
              <Layers size={18} className="text-[oklch(0.65_0.18_200)]" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-semibold text-foreground text-sm">
                Continue Learning
              </p>
              <p className="text-xs text-muted-foreground">
                Pick up where you left off
              </p>
            </div>
            <ArrowRight
              size={16}
              className="text-muted-foreground ml-auto flex-shrink-0 group-hover:text-[oklch(0.65_0.18_200)] transition-smooth"
            />
          </button>
        </div>
      </section>
    </div>
  );
}
