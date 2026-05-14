import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/appStore";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  Brain,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
  Mail,
  Mic,
  Settings,
  User,
} from "lucide-react";

const navItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    ocid: "sidebar.dashboard_link",
  },
  {
    to: "/modules",
    label: "Learning Modules",
    icon: BookOpen,
    ocid: "sidebar.modules_link",
  },
  {
    to: "/quiz",
    label: "Quiz",
    icon: ClipboardList,
    ocid: "sidebar.quiz_link",
  },
  {
    to: "/analytics",
    label: "Analytics",
    icon: BarChart3,
    ocid: "sidebar.analytics_link",
  },
  {
    to: "/profile",
    label: "Profile",
    icon: User,
    ocid: "sidebar.profile_link",
  },
  {
    to: "/mock-interview",
    label: "Mock Interview",
    icon: Mic,
    ocid: "sidebar.mock_interview_link",
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
    ocid: "sidebar.settings_link",
  },
  {
    to: "/contact",
    label: "Contact",
    icon: Mail,
    ocid: "sidebar.contact_link",
  },
];

export function Sidebar() {
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
  const setSidebarCollapsed = useAppStore((s) => s.setSidebarCollapsed);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-full border-r border-border transition-all duration-300 bg-sidebar",
        collapsed ? "w-16" : "w-60",
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-2.5 p-4 border-b border-border h-16 flex-shrink-0",
          collapsed && "justify-center px-2",
        )}
      >
        <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
          <Brain size={18} className="text-primary" />
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-lg text-foreground tracking-tight">
            CogLearn
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            currentPath === item.to ||
            (item.to !== "/dashboard" && currentPath.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              data-ocid={item.ocid}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth",
                collapsed && "justify-center px-2",
                isActive
                  ? "bg-primary/15 text-primary border border-primary/25"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground",
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-border flex-shrink-0">
        <button
          type="button"
          data-ocid="sidebar.collapse_button"
          onClick={() => setSidebarCollapsed(!collapsed)}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-smooth text-sm",
            collapsed && "justify-center",
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
