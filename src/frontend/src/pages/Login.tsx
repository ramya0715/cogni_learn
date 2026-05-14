import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Fingerprint,
  Loader2,
  Lock,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import { PublicLayout } from "../components/layout/Layout";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    setIsSigningIn(true);
    try {
      await login();
    } catch {
      setIsSigningIn(false);
    }
  };

  const busy = isLoading || isSigningIn;

  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
        {/* Glow */}
        <div className="absolute pointer-events-none inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
        </div>

        <div className="w-full max-w-md animate-slide-up">
          {/* Card */}
          <div className="glass-card p-8 md:p-10 border border-border/60 relative">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4 animate-pulse-glow">
                <Brain size={28} className="text-primary" />
              </div>
              <span className="font-display text-xl font-bold text-foreground tracking-tight">
                CogLearn
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                Cognitive Load Aware Learning System
              </span>
            </div>

            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                Welcome Back
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to continue your learning journey
              </p>
            </div>

            {/* Internet Identity button */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={busy}
              data-ocid="login.ii_button"
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-smooth shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              {busy ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Authenticating…
                </>
              ) : (
                <>
                  <Fingerprint size={18} />
                  Continue with Internet Identity
                  <ArrowRight size={14} className="ml-auto" />
                </>
              )}
            </button>

            {/* II info */}
            <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border flex gap-3">
              <Shield size={16} className="text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">
                  Internet Identity
                </span>{" "}
                is a secure, privacy-preserving authentication system built on
                the Internet Computer. No email, no password — just
                cryptographic keys.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">
                New to CogLearn?
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Register link */}
            <Link
              to="/register"
              data-ocid="login.register_link"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-card/80 transition-smooth"
            >
              Create a free account
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Privacy note */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
            <Lock size={12} />
            <span>
              Your data is encrypted and stored on the Internet Computer
            </span>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
