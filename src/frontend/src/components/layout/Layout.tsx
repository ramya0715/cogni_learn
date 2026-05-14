import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  Brain,
  ClipboardList,
  LayoutDashboard,
  User,
} from "lucide-react";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

const mobileNavItems = [
  {
    to: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    ocid: "mobile_nav.dashboard",
  },
  {
    to: "/modules",
    icon: BookOpen,
    label: "Modules",
    ocid: "mobile_nav.modules",
  },
  { to: "/quiz", icon: ClipboardList, label: "Quiz", ocid: "mobile_nav.quiz" },
  {
    to: "/analytics",
    icon: BarChart3,
    label: "Analytics",
    ocid: "mobile_nav.analytics",
  },
  { to: "/profile", icon: User, label: "Profile", ocid: "mobile_nav.profile" },
];

interface Props {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function Layout({ children, fullWidth }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          onKeyDown={() => setMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-border z-50 flex flex-col animate-slide-in">
            <div className="flex items-center gap-2.5 p-4 border-b border-border h-16">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Brain size={18} className="text-primary" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                CogLearn
              </span>
            </div>
            <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-1">
              {[
                { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
                { to: "/modules", label: "Learning Modules", icon: BookOpen },
                { to: "/quiz", label: "Quiz", icon: ClipboardList },
                { to: "/analytics", label: "Analytics", icon: BarChart3 },
                { to: "/profile", label: "Profile", icon: User },
              ].map((item) => {
                const isActive =
                  currentPath === item.to ||
                  currentPath.startsWith(`${item.to}/`);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth",
                      isActive
                        ? "bg-primary/15 text-primary border border-primary/25"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground",
                    )}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content column */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onMobileMenuToggle={() => setMobileMenuOpen((v) => !v)} />

        <main className="flex-1 overflow-y-auto">
          <div
            className={cn(
              "min-h-full",
              !fullWidth && "container max-w-7xl mx-auto px-4 md:px-6 py-6",
            )}
          >
            {children}
          </div>
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden flex items-center border-t border-border bg-card h-16 flex-shrink-0">
          {mobileNavItems.map((item) => {
            const isActive =
              currentPath === item.to || currentPath.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                data-ocid={item.ocid}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium transition-smooth",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

// Public (unauthenticated) layout wrapper
export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-border bg-card glass">
        <Link
          to="/"
          className="flex items-center gap-2"
          data-ocid="public_nav.logo_link"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Brain size={16} className="text-primary" />
          </div>
          <span className="font-display font-bold text-foreground">
            CogLearn
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            data-ocid="public_nav.login_link"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            data-ocid="public_nav.register_link"
            className="text-sm font-medium px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
          >
            Get Started
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border bg-card/50 py-6 px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
