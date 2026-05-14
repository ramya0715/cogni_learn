import { u as useAuth, b as useNavigate, d as useRegisterUser, r as reactExports, j as jsxRuntimeExports, P as PublicLayout, a as Brain, L as Link } from "./index-B3pXppQ4.js";
import { C as CircleCheck } from "./circle-check-CW34sw1m.js";
import { C as CircleAlert } from "./circle-alert-CYnRBC5t.js";
import { L as LoaderCircle } from "./loader-circle-CA1kAUaG.js";
import { F as Fingerprint, L as Lock } from "./lock-DxUXQlEs.js";
import { A as ArrowRight } from "./arrow-right-Cy8E_keR.js";
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function Register() {
  const { login, isAuthenticated, isLoading, principal } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync: registerUser, isPending: isRegistering } = useRegisterUser();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  const [isAuthPending, setIsAuthPending] = reactExports.useState(false);
  const [registered, setRegistered] = reactExports.useState(false);
  reactExports.useEffect(() => {
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
    navigate
  ]);
  reactExports.useEffect(() => {
    if (isAuthenticated && !isAuthPending) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, isAuthPending, navigate]);
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(email))
      newErrors.email = "Enter a valid email address";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
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
    "Detailed analytics and progress tracking"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PublicLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute pointer-events-none inset-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/8 blur-3xl" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md animate-slide-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-8 md:p-10 border border-border/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { size: 28, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Create Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Start your placement preparation today" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-7 space-y-2", children: perks.map((perk) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleCheck,
            {
              size: 14,
              className: "text-primary mt-0.5 shrink-0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: perk })
        ] }, perk)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "reg-name",
                className: "block text-xs font-medium text-foreground mb-1.5",
                children: "Full Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "reg-name",
                type: "text",
                value: name,
                onChange: (e) => {
                  setName(e.target.value);
                  if (errors.name)
                    setErrors((prev) => ({ ...prev, name: void 0 }));
                },
                placeholder: "Arjun Sharma",
                "data-ocid": "register.name_input",
                className: `w-full px-4 py-2.5 rounded-lg bg-input border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth ${errors.name ? "border-destructive" : "border-border"}`
              }
            ),
            errors.name && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "register.name_field_error",
                className: "flex items-center gap-1.5 mt-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 12, className: "text-destructive" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.name })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "reg-email",
                className: "block text-xs font-medium text-foreground mb-1.5",
                children: "Email Address"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "reg-email",
                type: "email",
                value: email,
                onChange: (e) => {
                  setEmail(e.target.value);
                  if (errors.email)
                    setErrors((prev) => ({ ...prev, email: void 0 }));
                },
                placeholder: "arjun@college.edu",
                "data-ocid": "register.email_input",
                className: `w-full px-4 py-2.5 rounded-lg bg-input border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth ${errors.email ? "border-destructive" : "border-border"}`
              }
            ),
            errors.email && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "register.email_field_error",
                className: "flex items-center gap-1.5 mt-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 12, className: "text-destructive" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.email })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: busy,
              "data-ocid": "register.submit_button",
              className: "w-full flex items-center justify-center gap-2 px-5 py-3.5 mt-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-smooth shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5",
              children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
                isRegistering ? "Creating your account…" : "Authenticating…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { size: 16 }),
                "Register with Internet Identity",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14, className: "ml-auto" })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 my-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Already have an account?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/login",
            "data-ocid": "register.login_link",
            className: "flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-card/80 transition-smooth",
            children: [
              "Sign in instead",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Secured by Internet Identity — no passwords needed" })
      ] })
    ] })
  ] }) });
}
export {
  Register as default
};
