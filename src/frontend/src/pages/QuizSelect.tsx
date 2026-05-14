import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useGetQuizHistory } from "@/hooks/useBackend";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Brain,
  ChevronRight,
  Clock,
  Code2,
  Cpu,
  Database,
  HelpCircle,
  Server,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const SUBJECTS = [
  {
    key: "Aptitude",
    label: "Aptitude",
    icon: Brain,
    color: "from-violet-500/20 to-purple-500/10 border-violet-500/30",
    iconColor: "text-violet-400",
  },
  {
    key: "DBMS",
    label: "DBMS",
    icon: Database,
    color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30",
    iconColor: "text-cyan-400",
  },
  {
    key: "OOPS",
    label: "OOP",
    icon: Code2,
    color: "from-emerald-500/20 to-green-500/10 border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    key: "System Design",
    label: "System Design",
    icon: Server,
    color: "from-orange-500/20 to-amber-500/10 border-orange-500/30",
    iconColor: "text-orange-400",
  },
  {
    key: "Technical MCQs",
    label: "Technical MCQs",
    icon: Cpu,
    color: "from-pink-500/20 to-rose-500/10 border-pink-500/30",
    iconColor: "text-pink-400",
  },
];

const DIFFICULTIES = [
  { key: "Beginner", label: "Beginner", desc: "Foundation concepts" },
  { key: "Intermediate", label: "Intermediate", desc: "Applied knowledge" },
  { key: "Advanced", label: "Advanced", desc: "Expert challenges" },
];

export default function QuizSelect() {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("Aptitude");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Intermediate");
  const [stressLevel, setStressLevel] = useState([5]);
  const [confidenceLevel, setConfidenceLevel] = useState([6]);

  const { data: history } = useGetQuizHistory();

  const subjectHistory =
    history?.filter(
      (s) =>
        s.subject === selectedSubject && s.difficulty === selectedDifficulty,
    ) ?? [];
  const pastAccuracy =
    subjectHistory.length > 0
      ? Math.round(
          subjectHistory.reduce((sum, s) => sum + s.accuracy, 0) /
            subjectHistory.length,
        )
      : null;

  function handleStart() {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const config = {
      subject: selectedSubject,
      difficulty: selectedDifficulty,
      stressLevel: stressLevel[0],
      confidenceLevel: confidenceLevel[0],
    };
    sessionStorage.setItem(`quiz_config_${sessionId}`, JSON.stringify(config));
    navigate({ to: `/quiz/${sessionId}` });
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
          <HelpCircle size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Start a Quiz Session
          </h1>
          <p className="text-muted-foreground text-sm">
            Configure your placement practice quiz
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: config */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subject selector */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-card p-6 space-y-4"
          >
            <h2 className="font-display font-semibold text-foreground">
              Choose Subject
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SUBJECTS.map((s, i) => (
                <motion.button
                  key={s.key}
                  type="button"
                  data-ocid={`quiz_select.subject.${i + 1}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setSelectedSubject(s.key)}
                  className={`relative p-4 rounded-xl border bg-gradient-to-br transition-smooth text-left flex flex-col gap-2 ${s.color} ${
                    selectedSubject === s.key
                      ? "ring-2 ring-primary shadow-lg shadow-primary/20"
                      : "hover:shadow-md hover:scale-[1.02]"
                  }`}
                >
                  <s.icon size={22} className={s.iconColor} />
                  <span className="text-sm font-medium text-foreground">
                    {s.label}
                  </span>
                  {selectedSubject === s.key && (
                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-[10px] text-primary-foreground">
                        ✓
                      </span>
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Difficulty */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass-card p-6 space-y-4"
          >
            <h2 className="font-display font-semibold text-foreground">
              Difficulty Level
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {DIFFICULTIES.map((d, i) => (
                <button
                  key={d.key}
                  type="button"
                  data-ocid={`quiz_select.difficulty.${i + 1}`}
                  onClick={() => setSelectedDifficulty(d.key)}
                  className={`p-4 rounded-xl border text-center transition-smooth ${
                    selectedDifficulty === d.key
                      ? "bg-primary/15 border-primary/40 text-primary ring-2 ring-primary"
                      : "border-border hover:border-primary/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="font-medium text-sm">{d.label}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {d.desc}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Cognitive state inputs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="glass-card p-6 space-y-6"
          >
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-accent" />
              <h2 className="font-display font-semibold text-foreground">
                Cognitive State
              </h2>
              <span className="text-xs text-muted-foreground ml-auto">
                Helps calibrate difficulty
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="stress-slider"
                  className="text-sm text-foreground font-medium"
                >
                  Stress Level
                </label>
                <span
                  className={`text-sm font-semibold px-2 py-0.5 rounded-md ${
                    stressLevel[0] >= 7
                      ? "bg-destructive/20 text-destructive"
                      : stressLevel[0] >= 4
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-emerald-500/20 text-emerald-400"
                  }`}
                >
                  {stressLevel[0]} / 10
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                How stressed are you right now?
              </p>
              <Slider
                id="stress-slider"
                data-ocid="quiz_select.stress_slider"
                min={1}
                max={10}
                step={1}
                value={stressLevel}
                onValueChange={setStressLevel}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>😌 Calm</span>
                <span>😤 Very Stressed</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confidence-slider"
                  className="text-sm text-foreground font-medium"
                >
                  Confidence Level
                </label>
                <span
                  className={`text-sm font-semibold px-2 py-0.5 rounded-md ${
                    confidenceLevel[0] >= 7
                      ? "bg-emerald-500/20 text-emerald-400"
                      : confidenceLevel[0] >= 4
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {confidenceLevel[0]} / 10
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                How confident are you feeling?
              </p>
              <Slider
                id="confidence-slider"
                data-ocid="quiz_select.confidence_slider"
                min={1}
                max={10}
                step={1}
                value={confidenceLevel}
                onValueChange={setConfidenceLevel}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>😟 Not Confident</span>
                <span>😎 Very Confident</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: summary + start */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="space-y-4"
        >
          <div className="glass-card p-6 space-y-4">
            <h2 className="font-display font-semibold text-foreground">
              Session Overview
            </h2>
            <div className="space-y-3">
              {[
                { icon: BookOpen, label: "Subject", value: selectedSubject },
                { icon: Zap, label: "Difficulty", value: selectedDifficulty },
                { icon: HelpCircle, label: "Questions", value: "50 MCQs" },
                { icon: Clock, label: "Time Limit", value: "90 minutes" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                >
                  <item.icon size={15} className="text-primary shrink-0" />
                  <span className="text-xs text-muted-foreground flex-1">
                    {item.label}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <Badge variant="outline" className="text-xs">
                Randomized Order
              </Badge>
              <Badge variant="outline" className="text-xs">
                Auto-Submit
              </Badge>
              <Badge variant="outline" className="text-xs">
                Explanations
              </Badge>
            </div>
          </div>

          {pastAccuracy !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-5 space-y-3"
            >
              <div className="flex items-center gap-2">
                <TrendingUp size={15} className="text-emerald-400" />
                <span className="text-sm font-medium text-foreground">
                  Your Past Performance
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className="font-display text-3xl font-bold text-foreground">
                  {pastAccuracy}%
                </span>
                <span className="text-muted-foreground text-sm pb-1">
                  avg accuracy
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {subjectHistory.length} previous{" "}
                {subjectHistory.length === 1 ? "session" : "sessions"} in{" "}
                {selectedSubject} ({selectedDifficulty})
              </p>
            </motion.div>
          )}

          <Button
            type="button"
            data-ocid="quiz_select.start_button"
            onClick={handleStart}
            className="w-full h-12 font-semibold text-base gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-smooth"
          >
            Start Quiz
            <ChevronRight size={18} />
          </Button>

          <p className="text-center text-xs text-muted-foreground px-2">
            Questions are randomized from our placement question bank. Timer
            auto-submits at 0:00.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
