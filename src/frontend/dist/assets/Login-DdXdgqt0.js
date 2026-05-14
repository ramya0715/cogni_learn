import { c as createLucideIcon, u as useAuth, b as useNavigate, r as reactExports, j as jsxRuntimeExports, P as PublicLayout, a as Brain, L as Link } from "./index-B3pXppQ4.js";
import { L as LoaderCircle } from "./loader-circle-CA1kAUaG.js";
import { F as Fingerprint, L as Lock } from "./lock-DxUXQlEs.js";
import { A as ArrowRight } from "./arrow-right-Cy8E_keR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
function Login() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = reactExports.useState(false);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PublicLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute pointer-events-none inset-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/8 blur-3xl" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md animate-slide-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-8 md:p-10 border border-border/60 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4 animate-pulse-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { size: 28, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-bold text-foreground tracking-tight", children: "CogLearn" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mt-1", children: "Cognitive Load Aware Learning System" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Welcome Back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sign in to continue your learning journey" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleLogin,
            disabled: busy,
            "data-ocid": "login.ii_button",
            className: "w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-smooth shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0",
            children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 18, className: "animate-spin" }),
              "Authenticating…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { size: 18 }),
              "Continue with Internet Identity",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14, className: "ml-auto" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-4 rounded-xl bg-muted/50 border border-border flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 16, className: "text-primary shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Internet Identity" }),
            " ",
            "is a secure, privacy-preserving authentication system built on the Internet Computer. No email, no password — just cryptographic keys."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 my-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "New to CogLearn?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/register",
            "data-ocid": "login.register_link",
            className: "flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-card/80 transition-smooth",
            children: [
              "Create a free account",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Your data is encrypted and stored on the Internet Computer" })
      ] })
    ] })
  ] }) });
}
export {
  Login as default
};
