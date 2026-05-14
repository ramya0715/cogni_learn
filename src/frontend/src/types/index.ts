import type { Principal } from "@icp-sdk/core/principal";

export type UserId = Principal;

export interface UserProfile {
  id: UserId;
  name: string;
  email: string;
  joinDate: bigint;
  studyGoalHours: bigint;
  preferredDifficulty: string;
  themePreference: string;
  cognitiveLoadBaseline: number;
  notificationsEnabled: boolean;
}

export interface QuizQuestion {
  questionId: string;
  subject: string;
  difficulty: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation: string;
  topicTag: string;
}

export interface QuizSession {
  sessionId: string;
  userId: UserId;
  subject: string;
  difficulty: string;
  score: bigint;
  accuracy: number;
  startTime: bigint;
  endTime: bigint;
  answers: Array<[string, string]>;
  timePerQuestion: Array<number>;
}

export interface QuizResultSummary {
  score: bigint;
  totalQuestions: bigint;
  accuracy: number;
  timeTaken: number;
  cognitiveLoadCategory: string;
  weakTopics: Array<string>;
  strongTopics: Array<string>;
  recommendations: Array<string>;
}

export interface CognitiveLoadEntry {
  entryId: string;
  userId: UserId;
  timestamp: bigint;
  accuracy: number;
  avgTimePerQuestion: number;
  errorCount: bigint;
  stressLevel: bigint;
  confidenceLevel: bigint;
  loadScore: number;
  category: string;
}

export interface LearningProgress {
  userId: UserId;
  subject: string;
  completedTopics: Array<string>;
  progressPercentage: number;
  studyStreak: bigint;
  lastAccessDate: bigint;
  lastStreakDate: bigint;
}

export interface MockInterviewQuestion {
  questionId: string;
  mode: string;
  category: string;
  difficulty: string;
  question: string;
  keyPoints: Array<string>;
}

export interface MockInterviewResult {
  score: bigint;
  totalQuestions: bigint;
  strengths: Array<string>;
  improvements: Array<string>;
  categoryBreakdown: Array<[string, number]>;
  performanceFeedback: string;
}

export interface Recommendation {
  recId: string;
  userId: UserId;
  recType: string;
  targetSubject: string;
  targetTopic: string;
  reason: string;
  createdAt: bigint;
}

export interface AnalyticsSummary {
  userId: UserId;
  totalQuizzes: bigint;
  totalQuestions: bigint;
  totalCorrect: bigint;
  overallAccuracy: number;
  subjectAccuracy: Array<[string, number]>;
  cognitiveLoadTrend: Array<CognitiveLoadEntry>;
  weeklyStudyDays: Array<bigint>;
}

export interface DashboardData {
  profile: UserProfile;
  currentCognitiveLoad: CognitiveLoadEntry;
  learningProgressAll: Array<LearningProgress>;
  recentQuizSessions: Array<QuizSession>;
  streakDays: bigint;
  weeklyStudySessions: Array<bigint>;
  recommendations: Array<Recommendation>;
}

export type CognitiveLoadCategory = "Low" | "Moderate" | "High";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  timestamp: number;
}

export interface AppState {
  themeMode: "dark" | "light";
  setTheme: (mode: "dark" | "light") => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  cognitiveLoad: CognitiveLoadEntry | null;
  setCognitiveLoad: (entry: CognitiveLoadEntry | null) => void;
  notifications: AppNotification[];
  addNotification: (
    n: Omit<AppNotification, "id" | "timestamp" | "read">,
  ) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
}
