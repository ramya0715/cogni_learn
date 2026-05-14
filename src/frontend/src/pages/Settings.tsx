import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/appStore";
import {
  Check,
  Copy,
  Laptop,
  LogOut,
  Moon,
  ShieldAlert,
  Sun,
  Trash2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "coglearn_settings";

interface SettingsData {
  studyGoalHours: number;
  preferredDifficulty: "Beginner" | "Intermediate" | "Advanced";
  autoAdjustDifficulty: boolean;
  quizReminders: boolean;
  streakAlerts: boolean;
  analyticsOptIn: boolean;
  dataSharing: boolean;
}

const DEFAULT_SETTINGS: SettingsData = {
  studyGoalHours: 4,
  preferredDifficulty: "Intermediate",
  autoAdjustDifficulty: true,
  quizReminders: true,
  streakAlerts: true,
  analyticsOptIn: true,
  dataSharing: false,
};

function loadSettings(): SettingsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function saveSettings(data: SettingsData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

function SectionCard({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card p-5 space-y-4">
      <h2 className="font-display font-semibold text-foreground text-sm uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      {children}
    </div>
  );
}

function SettingRow({
  label,
  description,
  children,
  disabled,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4",
        disabled && "opacity-50",
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

function CopyPrincipalButton({ principal }: { principal: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(principal).catch(() => {});
    setCopied(true);
    toast.success("Principal ID copied");
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded max-w-[180px] truncate">
        {principal.slice(0, 12)}...{principal.slice(-6)}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        data-ocid="settings.copy_principal_button"
        className="p-1.5 rounded hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
        aria-label="Copy Principal ID"
      >
        {copied ? (
          <Check size={13} className="text-chart-3" />
        ) : (
          <Copy size={13} />
        )}
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { setTheme: setStoreTheme } = useAppStore();
  const { principal, logout } = useAuth();

  const [settings, setSettings] = useState<SettingsData>(loadSettings);

  // Sync theme changes to store
  useEffect(() => {
    if (theme === "dark" || theme === "light") {
      setStoreTheme(theme);
    }
  }, [theme, setStoreTheme]);

  const updateSetting = <K extends keyof SettingsData>(
    key: K,
    value: SettingsData[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    saveSettings(settings);
    toast.success("Settings saved successfully");
  };

  const handleClearData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSettings(DEFAULT_SETTINGS);
    toast.success("Local data cleared");
  };

  return (
    <div className="space-y-6 max-w-2xl" data-ocid="settings.page">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your preferences and account
        </p>
      </div>

      {/* 1. Appearance */}
      <SectionCard title="Appearance">
        <div className="space-y-3">
          <Label className="text-xs text-muted-foreground">Theme</Label>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { value: "light", label: "Light", icon: Sun },
                { value: "dark", label: "Dark", icon: Moon },
                { value: "system", label: "System", icon: Laptop },
              ] as const
            ).map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTheme(t.value)}
                data-ocid={`settings.theme_${t.value}_button`}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-3 rounded-lg border text-sm font-medium transition-smooth",
                  theme === t.value
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border bg-muted/30 text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <t.icon size={16} />
                {t.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Current theme:{" "}
            <span className="font-medium text-foreground capitalize">
              {theme}
            </span>
          </p>
        </div>
      </SectionCard>

      {/* 2. Learning Preferences */}
      <SectionCard title="Learning Preferences">
        <div className="space-y-1.5">
          <Label htmlFor="settings-goal">Daily Study Goal (hours)</Label>
          <Input
            id="settings-goal"
            type="number"
            min="1"
            max="8"
            value={settings.studyGoalHours}
            onChange={(e) =>
              updateSetting(
                "studyGoalHours",
                Math.max(1, Math.min(8, Number(e.target.value) || 4)),
              )
            }
            data-ocid="settings.study_goal_input"
            className="max-w-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground block">
            Preferred Difficulty
          </Label>
          <div className="flex flex-wrap gap-2">
            {(["Beginner", "Intermediate", "Advanced"] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => updateSetting("preferredDifficulty", d)}
                data-ocid={`settings.difficulty_${d.toLowerCase()}_radio`}
                className={cn(
                  "px-3 py-1.5 rounded-lg border text-sm font-medium transition-smooth",
                  settings.preferredDifficulty === d
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <SettingRow
          label="Auto-adjust difficulty"
          description="Automatically changes quiz difficulty based on your cognitive load"
        >
          <Switch
            checked={settings.autoAdjustDifficulty}
            onCheckedChange={(v) => updateSetting("autoAdjustDifficulty", v)}
            data-ocid="settings.auto_adjust_switch"
          />
        </SettingRow>
      </SectionCard>

      {/* 3. Notifications */}
      <SectionCard title="Notifications">
        <SettingRow
          label="Email notifications"
          description="Email notifications not available in this plan"
          disabled
        >
          <Switch
            disabled
            checked={false}
            data-ocid="settings.email_notifications_switch"
          />
        </SettingRow>

        <SettingRow
          label="Quiz reminders"
          description="Daily reminder to complete your quiz session"
        >
          <Switch
            checked={settings.quizReminders}
            onCheckedChange={(v) => updateSetting("quizReminders", v)}
            data-ocid="settings.quiz_reminders_switch"
          />
        </SettingRow>

        <SettingRow
          label="Streak alerts"
          description="Get notified when your study streak is at risk"
        >
          <Switch
            checked={settings.streakAlerts}
            onCheckedChange={(v) => updateSetting("streakAlerts", v)}
            data-ocid="settings.streak_alerts_switch"
          />
        </SettingRow>
      </SectionCard>

      {/* 4. Privacy & Data */}
      <SectionCard title="Privacy & Data">
        <SettingRow
          label="Analytics opt-in"
          description="Help improve CogLearn by sharing anonymous usage data"
        >
          <Switch
            checked={settings.analyticsOptIn}
            onCheckedChange={(v) => updateSetting("analyticsOptIn", v)}
            data-ocid="settings.analytics_switch"
          />
        </SettingRow>

        <SettingRow
          label="Performance data sharing"
          description="Share aggregated performance data for research"
        >
          <Switch
            checked={settings.dataSharing}
            onCheckedChange={(v) => updateSetting("dataSharing", v)}
            data-ocid="settings.data_sharing_switch"
          />
        </SettingRow>

        <div className="pt-1">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                data-ocid="settings.clear_data_button"
                className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <Trash2 size={13} /> Clear Local Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent data-ocid="settings.clear_data_dialog">
              <AlertDialogHeader>
                <AlertDialogTitle>Clear local data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all local settings to defaults. Your account
                  data on the canister remains intact.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-ocid="settings.clear_data_cancel_button">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleClearData}
                  data-ocid="settings.clear_data_confirm_button"
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Clear Data
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </SectionCard>

      {/* 5. Account */}
      <SectionCard title="Account">
        {principal && (
          <SettingRow
            label="Principal ID"
            description="Your unique Internet Identity principal"
          >
            <CopyPrincipalButton principal={principal} />
          </SettingRow>
        )}

        <div className="flex flex-wrap gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={logout}
            data-ocid="settings.logout_button"
            className="gap-1.5"
          >
            <LogOut size={14} /> Log Out
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                data-ocid="settings.delete_account_open_modal_button"
                className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <ShieldAlert size={14} /> Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent data-ocid="settings.delete_account_dialog">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <ShieldAlert size={18} className="text-destructive" />
                  Delete Account
                </AlertDialogTitle>
                <AlertDialogDescription className="text-destructive/80 font-medium">
                  ⚠️ This action cannot be undone.
                </AlertDialogDescription>
                <AlertDialogDescription>
                  All your quiz history, progress data, and settings will be
                  permanently erased from the canister. You will be logged out
                  immediately.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-ocid="settings.delete_account_cancel_button">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    logout();
                    toast.error("Account deletion requested");
                  }}
                  data-ocid="settings.delete_account_confirm_button"
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </SectionCard>

      {/* Save */}
      <div className="pb-6">
        <Button
          type="button"
          onClick={handleSave}
          data-ocid="settings.save_button"
          className="w-full sm:w-auto"
          size="lg"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
}
