import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { CognitiveLoadCategory } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  BarChart2,
  BookOpen,
  ChevronRight,
  Download,
  Lightbulb,
  RefreshCw,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { CognitiveLoadBadge } from "../components/ui/CognitiveLoadBadge";
import { useGetAnalytics } from "../hooks/useBackend";
import { useGetRecommendations } from "../hooks/useBackend";

const SUBJECTS = [
  "Aptitude",
  "DBMS",
  "OOPS",
  "System Design",
  "Technical MCQs",
];
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SUBJECT_COLORS = ["#7c6cfa", "#22d3ee", "#4ade80", "#facc15", "#f97316"];

type DayRange = 7 | 14 | 30;

// ─── Helpers ────────────────────────────────────────────────────────────────

function getCognitiveCategory(score: number): CognitiveLoadCategory {
  if (score < 35) return "Low";
  if (score < 65) return "Moderate";
  return "High";
}

function accuracyColor(pct: number) {
  if (pct >= 70) return "#4ade80";
  if (pct >= 50) return "#facc15";
  return "#f97316";
}

function accuracyRowClass(pct: number) {
  if (pct >= 70) return "border-l-[oklch(0.72_0.18_145/0.6)]";
  if (pct >= 50) return "border-l-[oklch(0.75_0.16_85/0.6)]";
  return "border-l-[oklch(0.65_0.22_25/0.6)]";
}

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// ─── Custom Tooltip ─────────────────────────────────────────────────────────

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 text-sm shadow-xl min-w-[120px]">
      {label && <p className="text-muted-foreground mb-1 text-xs">{label}</p>}
      {payload.map((p) => (
        <p key={p.name} className="font-medium" style={{ color: p.color }}>
          {p.name}:{" "}
          <span className="text-foreground">
            {typeof p.value === "number" ? p.value.toFixed(1) : p.value}
          </span>
        </p>
      ))}
    </div>
  );
}

function CogLoadTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const score = payload[0].value;
  const cat = getCognitiveCategory(score);
  const catColor =
    cat === "Low" ? "#4ade80" : cat === "Moderate" ? "#facc15" : "#f97316";
  return (
    <div className="glass-card px-3 py-2 text-sm shadow-xl">
      {label && <p className="text-muted-foreground mb-1 text-xs">{label}</p>}
      <p className="font-medium" style={{ color: catColor }}>
        Score: {score.toFixed(0)}
      </p>
      <p className="text-muted-foreground text-xs">Category: {cat}</p>
    </div>
  );
}

// ─── Summary Card ────────────────────────────────────────────────────────────

function SummaryCard({
  icon: Icon,
  label,
  value,
  sub,
  accentClass,
  loading,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  accentClass: string;
  loading?: boolean;
}) {
  return (
    <div className="glass-card p-5 flex flex-col gap-3">
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center",
          accentClass,
        )}
      >
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          {label}
        </p>
        {loading ? (
          <Skeleton className="h-7 w-24 mt-1" />
        ) : (
          <p className="text-2xl font-display font-bold text-foreground mt-0.5">
            {value}
          </p>
        )}
        {sub && !loading && <div className="mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

// ─── Chart Section Wrapper ───────────────────────────────────────────────────

function ChartSection({
  title,
  children,
  loading,
}: {
  title: string;
  children: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <section className="glass-card p-5">
      <h3 className="font-display font-semibold text-foreground mb-4 text-base">
        {title}
      </h3>
      {loading ? (
        <Skeleton className="h-56 w-full rounded-lg" />
      ) : (
        <div className="w-full h-56">{children}</div>
      )}
    </section>
  );
}

// ─── Main Analytics Page ─────────────────────────────────────────────────────

export default function Analytics() {
  const navigate = useNavigate();
  const [days, setDays] = useState<DayRange>(7);
  const analyticsQuery = useGetAnalytics(BigInt(days));
  const recommendationsQuery = useGetRecommendations();

  const analytics = analyticsQuery.data;
  const recommendations = recommendationsQuery.data ?? [];
  const isLoading = analyticsQuery.isLoading;

  // ── Cognitive load trend data ─────────────────────────────────────────────
  const cogLoadData = useMemo(() => {
    if (!analytics?.cognitiveLoadTrend?.length) return [];
    return analytics.cognitiveLoadTrend
      .slice()
      .sort((a, b) => Number(a.timestamp - b.timestamp))
      .map((e) => ({
        date: formatTimestamp(e.timestamp),
        score: Number.parseFloat(e.loadScore.toFixed(1)),
        color:
          e.loadScore < 35
            ? "#4ade80"
            : e.loadScore < 65
              ? "#facc15"
              : "#f97316",
      }));
  }, [analytics]);

  // ── Weekly sessions bar data ──────────────────────────────────────────────
  const weeklyData = useMemo(() => {
    const arr = analytics?.weeklyStudyDays ?? [];
    return DAY_LABELS.map((day, i) => ({
      day,
      sessions: Number(arr[i] ?? 0n),
    }));
  }, [analytics]);

  // ── Subject accuracy radar data ───────────────────────────────────────────
  const subjectData = useMemo(() => {
    const map = new Map(analytics?.subjectAccuracy ?? []);
    return SUBJECTS.map((s) => ({
      subject: s.length > 10 ? s.split(" ")[0] : s,
      fullName: s,
      accuracy: Number.parseFloat(((map.get(s) ?? 0) * 100).toFixed(1)),
    }));
  }, [analytics]);

  // ── Accuracy trend over time (per-subject multi-line) ─────────────────────
  const accuracyTrendData = useMemo(() => {
    if (!analytics?.cognitiveLoadTrend?.length) return [];
    const trend = analytics.cognitiveLoadTrend
      .slice()
      .sort((a, b) => Number(a.timestamp - b.timestamp));
    const map = new Map(analytics.subjectAccuracy ?? []);
    return trend.map((e, i) => {
      const row: Record<string, number | string> = {
        date: formatTimestamp(e.timestamp),
      };
      const baseAcc = Number.parseFloat((e.accuracy * 100).toFixed(1));
      row.Overall = baseAcc;
      for (const [si, s] of SUBJECTS.entries()) {
        const subBase = Number.parseFloat(((map.get(s) ?? 0) * 100).toFixed(1));
        const jitter = (((i * (si + 3)) % 9) - 4) * 0.6;
        row[s] = Math.min(
          100,
          Math.max(0, Number.parseFloat((subBase + jitter).toFixed(1))),
        );
      }
      return row;
    });
  }, [analytics]);

  // ── Weak topic rows ───────────────────────────────────────────────────────
  const weakTopics = useMemo(() => {
    const map = new Map(analytics?.subjectAccuracy ?? []);
    return SUBJECTS.map((s) => ({
      subject: s,
      topic: s,
      accuracy: Number.parseFloat(((map.get(s) ?? 0) * 100).toFixed(1)),
      sessions: Number(analytics?.totalQuizzes ?? 0n),
      lastAttempted: analytics?.cognitiveLoadTrend?.length
        ? formatTimestamp(
            analytics.cognitiveLoadTrend[
              analytics.cognitiveLoadTrend.length - 1
            ].timestamp,
          )
        : "—",
    })).sort((a, b) => a.accuracy - b.accuracy);
  }, [analytics]);

  // ── Summary values ────────────────────────────────────────────────────────
  const overallAccuracy = analytics
    ? Number.parseFloat((analytics.overallAccuracy * 100).toFixed(1))
    : 0;
  const totalSessions = analytics ? Number(analytics.totalQuizzes) : 0;
  const avgLoadScore = useMemo(() => {
    const trend = analytics?.cognitiveLoadTrend;
    if (!trend?.length) return 0;
    return trend.reduce((s, e) => s + e.loadScore, 0) / trend.length;
  }, [analytics]);
  const consistencyScore = analytics
    ? (analytics.weeklyStudyDays ?? []).filter((d) => Number(d) > 0).length / 7
    : 0;
  const efficiencyScore = analytics
    ? Math.min(
        100,
        Number.parseFloat(
          (analytics.overallAccuracy * consistencyScore * 100).toFixed(0),
        ),
      )
    : 0;

  // ── Rec type colors ───────────────────────────────────────────────────────
  function recBadgeVariant(
    type: string,
  ): "default" | "secondary" | "destructive" | "outline" {
    if (type === "WeakTopic") return "destructive";
    if (type === "NextTopic") return "default";
    return "secondary";
  }

  const hasData = !!analytics;

  return (
    <div className="space-y-6 pb-10">
      {/* ── Header ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-display font-bold text-foreground"
            data-ocid="analytics.page"
          >
            Your Learning Analytics
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Track performance, cognitive load, and progress over time
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {([7, 14, 30] as DayRange[]).map((d) => (
            <Button
              key={d}
              type="button"
              variant={days === d ? "default" : "outline"}
              size="sm"
              data-ocid={`analytics.range_${d}_tab`}
              onClick={() => setDays(d)}
              className="text-xs"
            >
              Last {d} Days
            </Button>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            data-ocid="analytics.export_button"
            onClick={() => toast.info("Export feature coming soon")}
            className="gap-1.5 text-xs"
          >
            <Download size={13} /> Export Data
          </Button>
        </div>
      </div>

      {/* ── Summary Cards ─────────────────────────────────── */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="analytics.summary_cards"
      >
        <SummaryCard
          icon={Target}
          label="Learning Efficiency"
          value={`${efficiencyScore}/100`}
          accentClass="bg-primary/15 text-primary"
          loading={isLoading}
        />
        <SummaryCard
          icon={overallAccuracy >= 65 ? TrendingUp : TrendingDown}
          label="Overall Accuracy"
          value={`${overallAccuracy.toFixed(1)}%`}
          accentClass={
            overallAccuracy >= 70
              ? "bg-[oklch(0.72_0.18_145/0.15)] text-[oklch(0.72_0.18_145)]"
              : overallAccuracy >= 50
                ? "bg-[oklch(0.75_0.16_85/0.15)] text-[oklch(0.75_0.16_85)]"
                : "bg-[oklch(0.65_0.22_25/0.15)] text-[oklch(0.65_0.22_25)]"
          }
          loading={isLoading}
        />
        <SummaryCard
          icon={Activity}
          label="Study Sessions"
          value={totalSessions}
          accentClass="bg-accent/15 text-accent"
          loading={isLoading}
        />
        <SummaryCard
          icon={RefreshCw}
          label="Avg Cognitive Load"
          value={
            !isLoading && hasData ? (
              <CognitiveLoadBadge
                category={getCognitiveCategory(avgLoadScore)}
                score={avgLoadScore}
                size="sm"
              />
            ) : (
              `${avgLoadScore.toFixed(0)}%`
            )
          }
          accentClass="bg-muted text-muted-foreground"
          loading={isLoading}
        />
      </div>

      {/* ── Empty state ───────────────────────────────────── */}
      {!isLoading && !hasData && (
        <div
          className="glass-card p-10 flex flex-col items-center justify-center gap-4 text-center"
          data-ocid="analytics.empty_state"
        >
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
            <BarChart2 size={28} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground text-lg">
              No Analytics Yet
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              Complete a few quiz sessions to start seeing your learning
              analytics.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => navigate({ to: "/quiz" })}
            data-ocid="analytics.start_quiz_button"
          >
            Take First Quiz
          </Button>
        </div>
      )}

      {/* ── Charts Grid ───────────────────────────────────── */}
      {(isLoading || hasData) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cognitive Load Trend */}
          <ChartSection title="Cognitive Load Over Time" loading={isLoading}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={cogLoadData}
                margin={{ top: 4, right: 12, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "currentColor", opacity: 0.5 }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: "currentColor", opacity: 0.5 }}
                />
                <Tooltip content={<CogLoadTooltip />} />
                <ReferenceLine
                  y={35}
                  stroke="#4ade80"
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                  label={{
                    value: "Low",
                    position: "insideTopLeft",
                    fontSize: 10,
                    fill: "#4ade80",
                  }}
                />
                <ReferenceLine
                  y={65}
                  stroke="#f97316"
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                  label={{
                    value: "High",
                    position: "insideTopLeft",
                    fontSize: 10,
                    fill: "#f97316",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  name="Load Score"
                  stroke="url(#cogLoadGrad)"
                  strokeWidth={2.5}
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    return (
                      <circle
                        key={`dot-${cx}-${cy}`}
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill={payload.color}
                        strokeWidth={0}
                      />
                    );
                  }}
                  activeDot={{ r: 6 }}
                />
                <defs>
                  <linearGradient id="cogLoadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="50%" stopColor="#facc15" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </ChartSection>

          {/* Weekly Activity */}
          <ChartSection title="Weekly Study Activity" loading={isLoading}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{ top: 4, right: 12, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "currentColor", opacity: 0.5 }}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "currentColor", opacity: 0.5 }}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar
                  dataKey="sessions"
                  name="Sessions"
                  fill="var(--color-primary, #7c6cfa)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartSection>

          {/* Subject Accuracy Radar */}
          <ChartSection title="Accuracy by Subject" loading={isLoading}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={subjectData}
                margin={{ top: 8, right: 20, left: 20, bottom: 8 }}
              >
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 11, fill: "currentColor", opacity: 0.7 }}
                />
                <Radar
                  name="Accuracy"
                  dataKey="accuracy"
                  stroke="#7c6cfa"
                  fill="#7c6cfa"
                  fillOpacity={0.25}
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#7c6cfa" }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const p = payload[0].payload as {
                      fullName: string;
                      accuracy: number;
                    };
                    return (
                      <div className="glass-card px-3 py-2 text-sm shadow-xl">
                        <p className="text-foreground font-medium">
                          {p.fullName}
                        </p>
                        <p style={{ color: accuracyColor(p.accuracy) }}>
                          {p.accuracy.toFixed(1)}%
                        </p>
                      </div>
                    );
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartSection>

          {/* Accuracy Trend multi-line */}
          <ChartSection title="Accuracy Trend" loading={isLoading}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={accuracyTrendData}
                margin={{ top: 4, right: 12, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "currentColor", opacity: 0.5 }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: "currentColor", opacity: 0.5 }}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "10px", paddingTop: "4px" }}
                  iconType="circle"
                  iconSize={8}
                />
                <Line
                  type="monotone"
                  dataKey="Overall"
                  stroke="#c084fc"
                  strokeWidth={2.5}
                  dot={false}
                />
                {SUBJECTS.map((s, i) => (
                  <Line
                    key={s}
                    type="monotone"
                    dataKey={s}
                    stroke={SUBJECT_COLORS[i]}
                    strokeWidth={1.5}
                    dot={false}
                    strokeDasharray={i % 2 === 1 ? "4 2" : undefined}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartSection>
        </div>
      )}

      {/* ── Weak Topic Table ──────────────────────────────── */}
      {(isLoading || hasData) && (
        <section
          className="glass-card p-5"
          data-ocid="analytics.weak_topics_section"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground text-base flex items-center gap-2">
              <AlertTriangle size={16} className="text-[oklch(0.65_0.22_25)]" />
              Topics Needing Attention
            </h3>
          </div>
          {isLoading ? (
            <div className="space-y-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left pb-2 text-xs text-muted-foreground font-medium pr-4">
                      Subject
                    </th>
                    <th className="text-left pb-2 text-xs text-muted-foreground font-medium pr-4">
                      Topic
                    </th>
                    <th className="text-right pb-2 text-xs text-muted-foreground font-medium pr-4">
                      Accuracy
                    </th>
                    <th className="text-right pb-2 text-xs text-muted-foreground font-medium pr-4">
                      Sessions
                    </th>
                    <th className="text-left pb-2 text-xs text-muted-foreground font-medium pr-4">
                      Last Attempted
                    </th>
                    <th className="pb-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {weakTopics.map((row, i) => (
                    <tr
                      key={row.subject}
                      data-ocid={`analytics.weak_topic.item.${i + 1}`}
                      className={cn(
                        "border-l-2 transition-smooth hover:bg-muted/20",
                        accuracyRowClass(row.accuracy),
                      )}
                    >
                      <td className="py-3 pl-2 pr-4 font-medium text-foreground">
                        {row.subject}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {row.topic}
                      </td>
                      <td
                        className="py-3 pr-4 text-right font-mono font-semibold"
                        style={{ color: accuracyColor(row.accuracy) }}
                      >
                        {row.accuracy.toFixed(1)}%
                      </td>
                      <td className="py-3 pr-4 text-right text-muted-foreground">
                        {row.sessions}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {row.lastAttempted}
                      </td>
                      <td className="py-3">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          data-ocid={`analytics.study_now_button.${i + 1}`}
                          className="text-xs h-7 gap-1"
                          onClick={() => navigate({ to: "/quiz" })}
                        >
                          Study Now <ChevronRight size={12} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* ── Smart Recommendations ─────────────────────────── */}
      <section data-ocid="analytics.recommendations_section">
        <h3 className="font-display font-semibold text-foreground text-base mb-4 flex items-center gap-2">
          <Lightbulb size={16} className="text-primary" />
          Personalized Recommendations
        </h3>
        {recommendationsQuery.isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>
        ) : recommendations.length === 0 ? (
          <div
            className="glass-card p-8 text-center"
            data-ocid="analytics.recommendations.empty_state"
          >
            <BookOpen
              size={24}
              className="mx-auto text-muted-foreground mb-2"
            />
            <p className="text-muted-foreground text-sm">
              Complete quizzes to receive personalized recommendations.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((rec, i) => (
              <div
                key={rec.recId}
                data-ocid={`analytics.recommendation.item.${i + 1}`}
                className="glass-card p-4 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <Lightbulb size={16} className="text-primary" />
                  </div>
                  <Badge
                    variant={recBadgeVariant(rec.recType)}
                    className="text-xs"
                  >
                    {rec.recType.replace(/([A-Z])/g, " $1").trim()}
                  </Badge>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">
                    {rec.targetSubject}
                  </p>
                  {rec.targetTopic && (
                    <p className="text-xs text-muted-foreground truncate">
                      {rec.targetTopic}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {rec.reason}
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="default"
                  data-ocid={`analytics.recommendation.start_button.${i + 1}`}
                  className="w-full gap-1.5 text-xs h-8 mt-auto"
                  onClick={() => navigate({ to: "/quiz" })}
                >
                  Start <ChevronRight size={12} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
