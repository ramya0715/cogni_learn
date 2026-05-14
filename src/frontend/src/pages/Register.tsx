import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Brain,
  CheckCircle2,
  Fingerprint,
  Loader2,
  Lock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { PublicLayout } from "../components/layout/Layout";
import { useAuth } from "../hooks/useAuth";
import { useRegisterUser } from "../hooks/useBackend";

interface FormErrors {
  name?: string;
  email?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Register() {
  const { login, isAuthenticated, isLoading, principal } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync: registerUser, isPending: isRegistering } =
    useRegisterUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isAuthPending, setIsAuthPending] = useState(false);
  const [registered, setRegistered] = useState(false);

  // After auth succeeds, register the user
  useEffect(() => {
    if (isAuthenticated && principal && isAuthPending && !registered) {
      const doRegister = async () => {
        try {
          await registerUser({ name: name.trim(), email: email.trim() });
          setRegistered(true);
          navigate({ to: "/dashboard" });
        } catch {
          setIsAuthPending(false);
        }
      };
      doRegister();
    }
  }, [
    isAuthenticated,
    principal,
    isAuthPending,
    registered,
    name,
    email,
    registerUser,
    navigate,
  ]);

  // Already logged in → redirect
  useEffect(() => {
    if (isAuthenticated && !isAuthPending) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, isAuthPending, navigate]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(email))
      newErrors.email = "Enter a valid email address";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsAuthPending(true);
    try {
      await login();
    } catch {
      setIsAuthPending(false);
    }
  };

  const busy = isLoading || isAuthPending || isRegistering;

  const perks = [
    "Adaptive quizzes that adjust to your cognitive load",
    "250+ real placement-oriented questions",
    "Detailed analytics and progress tracking",
  ];

  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
        {/* Glow */}
        <div className="absolute pointer-events-none inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/8 blur-3xl" />
        </div>

        <div className="w-full max-w-md animate-slide-up">
          {/* Card */}
          <div className="glass-card p-8 md:p-10 border border-border/60">
            {/* Logo */}
            <div className="flex flex-col items-center mb-7">
              <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4">
                <Brain size={28} className="text-primary" />
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Create Account
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Start your placement preparation today
              </p>
            </div>

            {/* Perks */}
            <div className="mb-7 space-y-2">
              {perks.map((perk) => (
                <div key={perk} className="flex items-start gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-primary mt-0.5 shrink-0"
                  />
                  <span className="text-xs text-muted-foreground">{perk}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="reg-name"
                  className="block text-xs font-medium text-foreground mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="reg-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name)
                      setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="Arjun Sharma"
                  data-ocid="register.name_input"
                  className={`w-full px-4 py-2.5 rounded-lg bg-input border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth ${
                    errors.name ? "border-destructive" : "border-border"
                  }`}
                />
                {errors.name && (
                  <div
                    data-ocid="register.name_field_error"
                    className="flex items-center gap-1.5 mt-1.5"
                  >
                    <AlertCircle size={12} className="text-destructive" />
                    <p className="text-xs text-destructive">{errors.name}</p>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="reg-email"
                  className="block text-xs font-medium text-foreground mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="arjun@college.edu"
                  data-ocid="register.email_input"
                  className={`w-full px-4 py-2.5 rounded-lg bg-input border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth ${
                    errors.email ? "border-destructive" : "border-border"
                  }`}
                />
                {errors.email && (
                  <div
                    data-ocid="register.email_field_error"
                    className="flex items-center gap-1.5 mt-1.5"
                  >
                    <AlertCircle size={12} className="text-destructive" />
                    <p className="text-xs text-destructive">{errors.email}</p>
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={busy}
                data-ocid="register.submit_button"
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 mt-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-smooth shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                {busy ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {isRegistering
                      ? "Creating your account…"
                      : "Authenticating…"}
                  </>
                ) : (
                  <>
                    <Fingerprint size={16} />
                    Register with Internet Identity
                    <ArrowRight size={14} className="ml-auto" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">
                Already have an account?
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <Link
              to="/login"
              data-ocid="register.login_link"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-card/80 transition-smooth"
            >
              Sign in instead
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
            <Lock size={12} />
            <span>Secured by Internet Identity — no passwords needed</span>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
