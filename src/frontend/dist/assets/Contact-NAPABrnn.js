import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as PublicLayout, aj as Mail, H as ue } from "./index-B3pXppQ4.js";
import { M as MessageSquare } from "./message-square-BWzHlrYm.js";
import { C as Clock } from "./clock-SOyJrFQl.js";
import { C as CircleHelp } from "./circle-help-CjWVfDK_.js";
import { E as ExternalLink } from "./external-link-NbFG_P2H.js";
import { L as LoaderCircle } from "./loader-circle-CA1kAUaG.js";
import { C as CircleAlert } from "./circle-alert-CYnRBC5t.js";
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function FieldError({ msg }) {
  if (!msg) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 12, className: "text-destructive shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: msg })
  ] });
}
const supportInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "support@coglearn.app",
    href: "mailto:support@coglearn.app"
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "24–48 hours",
    href: null
  },
  {
    icon: CircleHelp,
    title: "Help Center",
    value: "Browse FAQ & Guides",
    href: "#faq"
  }
];
const socials = [
  {
    Icon: ExternalLink,
    label: "LinkedIn",
    href: "https://linkedin.com",
    color: "text-primary"
  },
  {
    Icon: ExternalLink,
    label: "Twitter / X",
    href: "https://x.com",
    color: "text-foreground"
  },
  {
    Icon: MessageSquare,
    label: "Discord",
    href: "https://discord.com",
    color: "text-accent"
  }
];
const emptyForm = {
  name: "",
  email: "",
  subject: "",
  message: ""
};
function Contact() {
  const [form, setForm] = reactExports.useState(emptyForm);
  const [errors, setErrors] = reactExports.useState({});
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const set = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: void 0 }));
  };
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!validateEmail(form.email))
      e.email = "Enter a valid email address";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setForm(emptyForm);
    ue.success("Message sent! We'll get back to you soon.", {
      duration: 5e3
    });
  };
  const inputCls = (field) => `w-full px-4 py-2.5 rounded-lg bg-input border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth ${errors[field] ? "border-destructive" : "border-border"}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "contact.hero_section",
        className: "relative py-16 md:py-20 px-4 text-center overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/6 to-transparent pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-2xl mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/30 text-xs font-medium text-primary mb-5 animate-fade-in", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 12 }),
              "Support & Contact"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-4 animate-slide-up", children: "Get in Touch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg animate-fade-in", children: "Have a question, feedback, or just want to say hi? We'd love to hear from you." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-20 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5 animate-slide-in", children: [
        supportInfo.map(({ icon: Icon, title, value, href }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-card p-5 border border-border/60 flex items-start gap-4 hover:border-primary/30 transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: title }),
                href ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href,
                    className: "text-sm font-medium text-foreground hover:text-primary transition-smooth",
                    children: value
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: value })
              ] })
            ]
          },
          title
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-5 border border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4", children: "Follow Us" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: socials.map(({ Icon, label, href, color }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": label,
              "data-ocid": `contact.social_${label.toLowerCase().replace(/[^a-z0-9]/g, "_")}_link`,
              className: `w-10 h-10 rounded-xl glass border border-border flex items-center justify-center ${color} hover:border-primary/40 hover:-translate-y-0.5 transition-smooth`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16 })
            },
            label
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3 animate-slide-up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-7 md:p-9 border border-border/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-1", children: "Send a Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-7", children: "Fill in the form and we'll respond within 24–48 hours." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                htmlFor: "ct-name",
                className: "block text-xs font-medium text-foreground mb-1.5",
                children: [
                  "Full Name ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "ct-name",
                type: "text",
                value: form.name,
                onChange: set("name"),
                placeholder: "Priya Patel",
                "data-ocid": "contact.name_input",
                className: inputCls("name")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                htmlFor: "ct-email",
                className: "block text-xs font-medium text-foreground mb-1.5",
                children: [
                  "Email Address ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "ct-email",
                type: "email",
                value: form.email,
                onChange: set("email"),
                placeholder: "priya@college.edu",
                "data-ocid": "contact.email_input",
                className: inputCls("email")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                htmlFor: "ct-subject",
                className: "block text-xs font-medium text-foreground mb-1.5",
                children: [
                  "Subject ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "ct-subject",
                type: "text",
                value: form.subject,
                onChange: set("subject"),
                placeholder: "Question about adaptive quizzes",
                "data-ocid": "contact.subject_input",
                className: inputCls("subject")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.subject })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                htmlFor: "ct-message",
                className: "block text-xs font-medium text-foreground mb-1.5",
                children: [
                  "Message ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "ct-message",
                value: form.message,
                onChange: set("message"),
                rows: 5,
                placeholder: "Tell us how we can help you...",
                "data-ocid": "contact.message_textarea",
                className: `${inputCls("message")} resize-none`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.message }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `text-xs ml-auto ${form.message.length < 10 ? "text-muted-foreground" : "text-primary"}`,
                  children: [
                    form.message.length,
                    " chars"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: isSubmitting,
              "data-ocid": "contact.submit_button",
              className: "w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-smooth shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5",
              children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
                "Sending…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 16 }),
                "Send Message"
              ] })
            }
          )
        ] })
      ] }) })
    ] }) })
  ] });
}
export {
  Contact as default
};
