import { CognitiveLoadBadge } from "@/components/ui/CognitiveLoadBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useCognitiveLoad } from "@/hooks/useCognitiveLoad";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/appStore";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  Brain,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";

interface Props {
  onMobileMenuToggle?: () => void;
}

export function Navbar({ onMobileMenuToggle }: Props) {
  const { isAuthenticated, logout, principal } = useAuth();
  const { loadCategory, isLoading: loadLoading } = useCognitiveLoad();
  const notifications = useAppStore((s) => s.notifications);
  const unread = notifications.filter((n) => !n.read).length;
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const initials = principal ? principal.slice(0, 2).toUpperCase() : "CL";

  return (
    <header className="h-16 flex-shrink-0 flex items-center justify-between px-4 md:px-6 border-b border-border bg-card glass z-10">
      {/* Left: Logo + mobile menu */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          data-ocid="navbar.mobile_menu_button"
          className="md:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-smooth"
          onClick={onMobileMenuToggle}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <Link
          to="/"
          className="flex items-center gap-2 select-none"
          data-ocid="navbar.logo_link"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Brain size={16} className="text-primary" />
          </div>
          <span className="font-display font-bold text-foreground hidden sm:inline">
            CogLearn
          </span>
        </Link>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* Cognitive load badge — only if authenticated */}
        {isAuthenticated && !loadLoading && (
          <div className="hidden sm:block">
            <CognitiveLoadBadge category={loadCategory} size="sm" />
          </div>
        )}

        {/* Theme toggle */}
        <button
          type="button"
          data-ocid="navbar.theme_toggle"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-smooth"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications bell */}
        {isAuthenticated && (
          <button
            type="button"
            data-ocid="navbar.notifications_button"
            className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[oklch(0.65_0.22_25)] animate-pulse" />
            )}
          </button>
        )}

        {/* User avatar dropdown / login button */}
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                data-ocid="navbar.user_menu_button"
                className={cn(
                  "w-9 h-9 rounded-full bg-primary/20 border border-primary/30",
                  "flex items-center justify-center font-display font-bold text-primary text-sm",
                  "hover:bg-primary/30 transition-smooth",
                )}
                aria-label="User menu"
              >
                {initials}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem asChild>
                <Link to="/profile" data-ocid="navbar.profile_link">
                  <User size={14} className="mr-2" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" data-ocid="navbar.settings_link">
                  <Settings size={14} className="mr-2" /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                data-ocid="navbar.logout_button"
                className="text-destructive focus:text-destructive"
              >
                <LogOut size={14} className="mr-2" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            to="/login"
            data-ocid="navbar.login_button"
            className="text-sm font-medium px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
