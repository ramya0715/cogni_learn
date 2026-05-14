import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useGetUserProfile, useUpdateUserProfile } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Check,
  Copy,
  Flame,
  Pencil,
  Target,
  Trophy,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SUBJECTS = [
  { key: "Aptitude", label: "Aptitude", color: "text-chart-4" },
  { key: "DBMS", label: "DBMS", color: "text-chart-2" },
  { key: "OOPS", label: "OOP Concepts", color: "text-chart-1" },
  { key: "SystemDesign", label: "System Design", color: "text-chart-3" },
  { key: "TechnicalMCQs", label: "Technical MCQs", color: "text-chart-5" },
];

const DEMO_PROGRESS: Record<string, number> = {
  Aptitude: 72,
  DBMS: 58,
  OOPS: 84,
  SystemDesign: 41,
  TechnicalMCQs: 63,
};

function InitialAvatar({
  name,
  size = "lg",
}: { name: string; size?: "lg" | "sm" }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div
      className={cn(
        "rounded-2xl bg-primary/20 border-2 border-primary/40 flex items-center justify-center font-display font-bold text-primary flex-shrink-0",
        size === "lg" ? "w-20 h-20 text-2xl" : "w-10 h-10 text-sm",
      )}
    >
      {initials || "?"}
    </div>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    toast.success(`${label} copied`);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      data-ocid="profile.copy_button"
      className="p-1 rounded hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
      aria-label={`Copy ${label}`}
    >
      {copied ? (
        <Check size={13} className="text-chart-3" />
      ) : (
        <Copy size={13} />
      )}
    </button>
  );
}

export default function ProfilePage() {
  const { data: profile, isLoading } = useGetUserProfile();
  const { principal } = useAuth();
  const updateProfile = useUpdateUserProfile();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goalHours, setGoalHours] = useState("4");
  const [difficulty, setDifficulty] = useState("Intermediate");

  const openEdit = () => {
    setName(profile?.name ?? "");
    setEmail(profile?.email ?? "");
    setGoalHours(String(Number(profile?.studyGoalHours ?? 4n)));
    setDifficulty(profile?.preferredDifficulty ?? "Intermediate");
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync({
        name,
        email,
        studyGoal: BigInt(Math.max(1, Math.min(8, Number(goalHours) || 4))),
        difficulty,
        theme: profile?.themePreference ?? "dark",
        notifications: profile?.notificationsEnabled ?? true,
      });
      toast.success("Profile updated successfully");
      setEditing(false);
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const joinDate = profile?.joinDate
    ? new Date(Number(profile.joinDate) / 1_000_000).toLocaleDateString(
        "en-US",
        { month: "long", year: "numeric" },
      )
    : "—";

  const truncatedPrincipal = principal
    ? `${principal.slice(0, 10)}...${principal.slice(-6)}`
    : "—";

  // Demo stats based on progress
  const avgAccuracy = Math.round(
    Object.values(DEMO_PROGRESS).reduce((a, b) => a + b, 0) /
      Object.values(DEMO_PROGRESS).length,
  );
  const bestSubject = Object.entries(DEMO_PROGRESS).sort(
    ([, a], [, b]) => b - a,
  )[0][0];

  const stats = [
    {
      label: "Quizzes Taken",
      value: "24",
      icon: BookOpen,
      color: "text-chart-1",
    },
    {
      label: "Avg Accuracy",
      value: `${avgAccuracy}%`,
      icon: Target,
      color: "text-chart-3",
    },
    {
      label: "Study Streak",
      value: "7 days",
      icon: Flame,
      color: "text-chart-4",
    },
    {
      label: "Best Subject",
      value: bestSubject,
      icon: Trophy,
      color: "text-chart-2",
    },
  ];

  return (
    <div className="space-y-6" data-ocid="profile.page">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          My Profile
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account and track your progress
        </p>
      </div>

      {/* Profile card */}
      <div className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {isLoading ? (
          <Skeleton className="w-20 h-20 rounded-2xl" />
        ) : (
          <InitialAvatar name={profile?.name ?? "User"} />
        )}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-4 w-32" />
            </div>
          ) : (
            <>
              <h2 className="font-display text-xl font-bold text-foreground truncate">
                {profile?.name ?? "Anonymous"}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5 truncate">
                {profile?.email ?? "—"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Member since {joinDate}
              </p>
              {principal && (
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {truncatedPrincipal}
                  </span>
                  <CopyButton value={principal} label="Principal ID" />
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex-shrink-0">
          <Badge
            variant="secondary"
            className="text-xs bg-primary/15 text-primary border-primary/25"
          >
            {profile?.preferredDifficulty ?? "Intermediate"}
          </Badge>
        </div>
      </div>

      {/* Stats grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
        data-ocid="profile.stats.section"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-4 flex flex-col gap-2">
            <div className={cn("p-2 rounded-lg w-fit bg-muted", stat.color)}>
              <stat.icon size={16} />
            </div>
            <div className="text-lg font-display font-bold text-foreground">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Subject progress */}
      <div className="glass-card p-5" data-ocid="profile.progress.section">
        <h3 className="font-display font-semibold text-foreground mb-4">
          Subject Progress
        </h3>
        <div className="space-y-4">
          {SUBJECTS.map((subj) => {
            const pct = DEMO_PROGRESS[subj.key] ?? 0;
            return (
              <div
                key={subj.key}
                data-ocid={`profile.progress.${subj.key.toLowerCase()}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground">
                    {subj.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-xs font-mono font-semibold",
                        subj.color,
                      )}
                    >
                      {pct}%
                    </span>
                    <Link
                      to="/modules/$subject"
                      params={{ subject: subj.key }}
                      data-ocid={`profile.continue.${subj.key.toLowerCase()}`}
                      className="text-xs text-primary hover:underline transition-smooth"
                    >
                      Continue →
                    </Link>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary/70 transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit profile */}
      <div className="glass-card p-5" data-ocid="profile.edit.section">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-foreground">
            Edit Profile
          </h3>
          {!editing ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openEdit}
              data-ocid="profile.edit_button"
              className="gap-1.5"
            >
              <Pencil size={13} /> Edit
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setEditing(false)}
              data-ocid="profile.cancel_button"
              className="gap-1.5"
            >
              <X size={13} /> Cancel
            </Button>
          )}
        </div>

        {!editing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Name</span>
              <p className="font-medium text-foreground mt-0.5">
                {profile?.name ?? "—"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Email</span>
              <p className="font-medium text-foreground mt-0.5 truncate">
                {profile?.email ?? "—"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Daily Goal</span>
              <p className="font-medium text-foreground mt-0.5">
                {Number(profile?.studyGoalHours ?? 4n)} hrs/day
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Difficulty</span>
              <p className="font-medium text-foreground mt-0.5">
                {profile?.preferredDifficulty ?? "Intermediate"}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="profile-name">Full Name</Label>
                <Input
                  id="profile-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-ocid="profile.name_input"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-ocid="profile.email_input"
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="profile-goal">Daily Study Goal (hours)</Label>
                <Input
                  id="profile-goal"
                  type="number"
                  min="1"
                  max="8"
                  value={goalHours}
                  onChange={(e) => setGoalHours(e.target.value)}
                  data-ocid="profile.goal_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Preferred Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger data-ocid="profile.difficulty_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              type="button"
              onClick={handleSave}
              disabled={updateProfile.isPending}
              data-ocid="profile.save_button"
              className="w-full sm:w-auto"
            >
              {updateProfile.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
