import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { PublicLayout } from "../components/layout/Layout";

const features = [
  {
    icon: Brain,
    title: "Cognitive Load Aware",
    desc: "Your brain adapts content difficulty based on your real-time mental state and performance.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: BookOpen,
    title: "250+ Quiz Questions",
    desc: "Real placement-oriented MCQs across 5 subjects, curated by industry experts.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
  {
    icon: MessageSquare,
    title: "AI-Style Mock Interviews",
    desc: "Practice with realistic technical and HR interview questions before the big day.",
    color: "text-chart-3",
    bg: "bg-chart-3/10",
    border: "border-chart-3/20",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    desc: "Visual dashboards track your progress, weak areas, and cognitive load over time.",
    color: "text-chart-4",
    bg: "bg-chart-4/10",
    border: "border-chart-4/20",
  },
  {
    icon: Zap,
    title: "Adaptive Learning",
    desc: "Content difficulty adjusts automatically — easier when stressed, harder when sharp.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: TrendingUp,
    title: "5 Learning Modules",
    desc: "Aptitude, DBMS, OOPS, System Design & Technical MCQs — everything you need.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
];

const stats = [
  { value: "250+", label: "Quiz Questions", icon: BookOpen },
  { value: "5", label: "Learning Subjects", icon: Award },
  { value: "3", label: "Difficulty Levels", icon: Star },
  { value: "Live", label: "Analytics Tracking", icon: BarChart3 },
];

const steps = [
  {
    step: "01",
    title: "Sign Up",
    desc: "Create your account in seconds with Internet Identity — no passwords, completely secure.",
  },
  {
    step: "02",
    title: "Take Quizzes",
    desc: "Attempt adaptive quizzes across all subjects. The system learns your cognitive patterns.",
  },
  {
    step: "03",
    title: "Track Progress",
    desc: "View detailed analytics, identify weak areas, and follow personalised learning paths.",
  },
];

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section
        data-ocid="home.hero_section"
        className="relative overflow-hidden min-h-[92vh] flex items-center justify-center px-4"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/8 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.68_0.2_262/0.15),transparent)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.68 0.2 262) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/30 text-xs font-medium text-primary mb-6 animate-fade-in">
            <Zap size={12} className="fill-current" />
            Powered by Cognitive Load Science
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight mb-6 animate-slide-up">
            Master Your
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Placement Journey
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
            The only placement prep platform that adapts to your cognitive state
            in real-time. Smarter learning, better performance, and placement
            success — all in one place.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up">
            <Link
              to="/register"
              data-ocid="home.hero_cta_register"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-smooth shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
            >
              Start Learning Free
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/login"
              data-ocid="home.hero_cta_login"
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border text-foreground font-semibold text-sm hover:bg-card/80 transition-smooth"
            >
              Login
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 mt-12 animate-fade-in">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-[10px] font-bold text-primary"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="w-7 h-7 rounded-full bg-accent/20 border-2 border-background flex items-center justify-center">
                <Users size={10} className="text-accent" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">2,000+</span>{" "}
              students preparing
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        data-ocid="home.stats_section"
        className="py-16 px-4 bg-muted/30 border-y border-border"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="glass-card p-6 text-center hover:border-primary/30 transition-smooth group"
            >
              <Icon
                size={24}
                className="text-primary mx-auto mb-3 group-hover:scale-110 transition-smooth"
              />
              <div className="font-display text-3xl font-bold text-foreground mb-1">
                {value}
              </div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        data-ocid="home.features_section"
        className="py-20 px-4 bg-background"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
              Everything you need
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Built for Placement Success
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Every feature is designed around the science of how you learn best
              under pressure.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(
              ({ icon: Icon, title, desc, color, bg, border }, i) => (
                <div
                  key={title}
                  data-ocid={`home.feature_card.${i + 1}`}
                  className={`glass-card p-6 border ${border} hover:scale-[1.02] hover:-translate-y-1 transition-smooth animate-fade-in`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center mb-4`}
                  >
                    <Icon size={20} className={color} />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        data-ocid="home.how_it_works_section"
        className="py-20 px-4 bg-muted/20 border-y border-border"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-3">
              Simple process
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ step, title, desc }, i) => (
              <div
                key={step}
                data-ocid={`home.step_card.${i + 1}`}
                className="relative flex flex-col items-center text-center animate-slide-up"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-gradient-to-r from-primary/40 to-transparent" />
                )}
                <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-5 relative z-10">
                  <span className="font-display font-bold text-sm text-primary">
                    {step}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        data-ocid="home.cta_section"
        className="py-24 px-4 bg-background relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,oklch(0.68_0.2_262/0.08),transparent)] pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="glass-card p-10 md:p-14 border border-primary/20">
            <div className="flex items-center justify-center gap-2 mb-5">
              {[1, 2, 3].map((i) => (
                <CheckCircle2 key={i} size={16} className="text-primary" />
              ))}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to ace your placement?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of students who are preparing smarter with
              CogLearn's adaptive engine.
            </p>
            <Link
              to="/register"
              data-ocid="home.cta_register_button"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-smooth shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Get Started — It's Free
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
