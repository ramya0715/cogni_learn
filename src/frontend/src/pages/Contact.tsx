import {
  AlertCircle,
  Clock,
  ExternalLink,
  HelpCircle,
  Loader2,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PublicLayout } from "../components/layout/Layout";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <div className="flex items-center gap-1.5 mt-1.5">
      <AlertCircle size={12} className="text-destructive shrink-0" />
      <p className="text-xs text-destructive">{msg}</p>
    </div>
  );
}

const supportInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "support@coglearn.app",
    href: "mailto:support@coglearn.app",
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "24–48 hours",
    href: null,
  },
  {
    icon: HelpCircle,
    title: "Help Center",
    value: "Browse FAQ & Guides",
    href: "#faq",
  },
];

const socials = [
  {
    Icon: ExternalLink,
    label: "LinkedIn",
    href: "https://linkedin.com",
    color: "text-primary",
  },
  {
    Icon: ExternalLink,
    label: "Twitter / X",
    href: "https://x.com",
    color: "text-foreground",
  },
  {
    Icon: MessageSquare,
    label: "Discord",
    href: "https://discord.com",
    color: "text-accent",
  },
];

const emptyForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set =
    (field: keyof ContactForm) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = (): boolean => {
    const e: FormErrors = {};
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setForm(emptyForm);
    toast.success("Message sent! We'll get back to you soon.", {
      duration: 5000,
    });
  };

  const inputCls = (field: keyof ContactForm) =>
    `w-full px-4 py-2.5 rounded-lg bg-input border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth ${
      errors[field] ? "border-destructive" : "border-border"
    }`;

  return (
    <PublicLayout>
      {/* Hero */}
      <section
        data-ocid="contact.hero_section"
        className="relative py-16 md:py-20 px-4 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/6 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/30 text-xs font-medium text-primary mb-5 animate-fade-in">
            <MessageSquare size={12} />
            Support & Contact
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 animate-slide-up">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg animate-fade-in">
            Have a question, feedback, or just want to say hi? We'd love to hear
            from you.
          </p>
        </div>
      </section>

      {/* Main grid */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: info */}
          <div className="lg:col-span-2 space-y-5 animate-slide-in">
            {/* Support cards */}
            {supportInfo.map(({ icon: Icon, title, value, href }) => (
              <div
                key={title}
                className="glass-card p-5 border border-border/60 flex items-start gap-4 hover:border-primary/30 transition-smooth"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {title}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-medium text-foreground hover:text-primary transition-smooth"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground">
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Socials */}
            <div className="glass-card p-5 border border-border/60">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {socials.map(({ Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    data-ocid={`contact.social_${label.toLowerCase().replace(/[^a-z0-9]/g, "_")}_link`}
                    className={`w-10 h-10 rounded-xl glass border border-border flex items-center justify-center ${color} hover:border-primary/40 hover:-translate-y-0.5 transition-smooth`}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3 animate-slide-up">
            <div className="glass-card p-7 md:p-9 border border-border/60">
              <h2 className="font-display text-xl font-bold text-foreground mb-1">
                Send a Message
              </h2>
              <p className="text-sm text-muted-foreground mb-7">
                Fill in the form and we'll respond within 24–48 hours.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="ct-name"
                    className="block text-xs font-medium text-foreground mb-1.5"
                  >
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="ct-name"
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Priya Patel"
                    data-ocid="contact.name_input"
                    className={inputCls("name")}
                  />
                  <FieldError msg={errors.name} />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="ct-email"
                    className="block text-xs font-medium text-foreground mb-1.5"
                  >
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="ct-email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="priya@college.edu"
                    data-ocid="contact.email_input"
                    className={inputCls("email")}
                  />
                  <FieldError msg={errors.email} />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="ct-subject"
                    className="block text-xs font-medium text-foreground mb-1.5"
                  >
                    Subject <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="ct-subject"
                    type="text"
                    value={form.subject}
                    onChange={set("subject")}
                    placeholder="Question about adaptive quizzes"
                    data-ocid="contact.subject_input"
                    className={inputCls("subject")}
                  />
                  <FieldError msg={errors.subject} />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="ct-message"
                    className="block text-xs font-medium text-foreground mb-1.5"
                  >
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="ct-message"
                    value={form.message}
                    onChange={set("message")}
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    data-ocid="contact.message_textarea"
                    className={`${inputCls("message")} resize-none`}
                  />
                  <div className="flex items-start justify-between mt-1">
                    <FieldError msg={errors.message} />
                    <span
                      className={`text-xs ml-auto ${
                        form.message.length < 10
                          ? "text-muted-foreground"
                          : "text-primary"
                      }`}
                    >
                      {form.message.length} chars
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-ocid="contact.submit_button"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-smooth shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
