import type {
  AppNotification,
  AppState,
  CognitiveLoadEntry,
  UserProfile,
} from "@/types";
import { create } from "zustand";

export const useAppStore = create<AppState>((set) => ({
  themeMode: "dark",
  setTheme: (mode) => set({ themeMode: mode }),

  userProfile: null,
  setUserProfile: (profile: UserProfile | null) =>
    set({ userProfile: profile }),

  cognitiveLoad: null,
  setCognitiveLoad: (entry: CognitiveLoadEntry | null) =>
    set({ cognitiveLoad: entry }),

  notifications: [],
  addNotification: (n) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...n,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          read: false,
        },
      ].slice(-20),
    })),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notif: AppNotification) =>
        notif.id === id ? { ...notif, read: true } : notif,
      ),
    })),
  clearNotifications: () => set({ notifications: [] }),

  sidebarCollapsed: false,
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
}));
