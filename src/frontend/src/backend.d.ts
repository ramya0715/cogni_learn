import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface QuizResultSummary {
    cognitiveLoadCategory: string;
    strongTopics: Array<string>;
    recommendations: Array<string>;
    weakTopics: Array<string>;
    score: bigint;
    totalQuestions: bigint;
    timeTaken: number;
    accuracy: number;
}
export interface MockInterviewQuestion {
    question: string;
    difficulty: string;
    mode: string;
    keyPoints: Array<string>;
    questionId: string;
    category: string;
}
export type Result_2 = {
    __kind__: "ok";
    ok: QuizResultSummary;
} | {
    __kind__: "err";
    err: string;
};
export interface CognitiveLoadEntry {
    stressLevel: bigint;
    userId: UserId;
    confidenceLevel: bigint;
    entryId: string;
    loadScore: number;
    timestamp: bigint;
    category: string;
    errorCount: bigint;
    avgTimePerQuestion: number;
    accuracy: number;
}
export interface MockInterviewResult {
    strengths: Array<string>;
    categoryBreakdown: Array<[string, number]>;
    performanceFeedback: string;
    improvements: Array<string>;
    score: bigint;
    totalQuestions: bigint;
}
export type Result_6 = {
    __kind__: "ok";
    ok: Array<QuizQuestion>;
} | {
    __kind__: "err";
    err: string;
};
export interface QuizQuestion {
    subject: string;
    difficulty: string;
    explanation: string;
    correctAnswer: string;
    topicTag: string;
    questionText: string;
    questionId: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
}
export interface DashboardData {
    recommendations: Array<Recommendation>;
    streakDays: bigint;
    recentQuizSessions: Array<{
        startTime: bigint;
        timePerQuestion: Array<number>;
        subject: string;
        endTime: bigint;
        userId: UserId;
        answers: Array<[string, string]>;
        difficulty: string;
        score: bigint;
        sessionId: string;
        accuracy: number;
    }>;
    currentCognitiveLoad: CognitiveLoadEntry;
    learningProgressAll: Array<{
        subject: string;
        progressPercentage: number;
        userId: UserId;
        studyStreak: bigint;
        lastAccessDate: bigint;
        lastStreakDate: bigint;
        completedTopics: Array<string>;
    }>;
    weeklyStudySessions: Array<bigint>;
    profile: {
        id: UserId;
        notificationsEnabled: boolean;
        joinDate: bigint;
        name: string;
        studyGoalHours: bigint;
        themePreference: string;
        email: string;
        cognitiveLoadBaseline: number;
        preferredDifficulty: string;
    };
}
export interface AnalyticsSummary {
    totalCorrect: bigint;
    userId: UserId;
    weeklyStudyDays: Array<bigint>;
    subjectAccuracy: Array<[string, number]>;
    totalQuestions: bigint;
    cognitiveLoadTrend: Array<CognitiveLoadEntry>;
    totalQuizzes: bigint;
    overallAccuracy: number;
}
export type Result_5 = {
    __kind__: "ok";
    ok: Array<Recommendation>;
} | {
    __kind__: "err";
    err: string;
};
export type Result_9 = {
    __kind__: "ok";
    ok: DashboardData;
} | {
    __kind__: "err";
    err: string;
};
export type Result_1 = {
    __kind__: "ok";
    ok: LearningProgress;
} | {
    __kind__: "err";
    err: string;
};
export type Result_4 = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export type UserId = Principal;
export type Result_11 = {
    __kind__: "ok";
    ok: CognitiveLoadEntry;
} | {
    __kind__: "err";
    err: string;
};
export type Result = {
    __kind__: "ok";
    ok: UserProfile;
} | {
    __kind__: "err";
    err: string;
};
export type Result_3 = {
    __kind__: "ok";
    ok: MockInterviewResult;
} | {
    __kind__: "err";
    err: string;
};
export type Result_10 = {
    __kind__: "ok";
    ok: AnalyticsSummary;
} | {
    __kind__: "err";
    err: string;
};
export type Result_8 = {
    __kind__: "ok";
    ok: Array<MockInterviewQuestion>;
} | {
    __kind__: "err";
    err: string;
};
export type Result_7 = {
    __kind__: "ok";
    ok: Array<QuizSession>;
} | {
    __kind__: "err";
    err: string;
};
export interface Recommendation {
    recType: string;
    userId: UserId;
    createdAt: bigint;
    targetSubject: string;
    targetTopic: string;
    recId: string;
    reason: string;
}
export interface QuizSession {
    startTime: bigint;
    timePerQuestion: Array<number>;
    subject: string;
    endTime: bigint;
    userId: UserId;
    answers: Array<[string, string]>;
    difficulty: string;
    score: bigint;
    sessionId: string;
    accuracy: number;
}
export interface UserProfile {
    id: UserId;
    notificationsEnabled: boolean;
    joinDate: bigint;
    name: string;
    studyGoalHours: bigint;
    themePreference: string;
    email: string;
    cognitiveLoadBaseline: number;
    preferredDifficulty: string;
}
export interface LearningProgress {
    subject: string;
    progressPercentage: number;
    userId: UserId;
    studyStreak: bigint;
    lastAccessDate: bigint;
    lastStreakDate: bigint;
    completedTopics: Array<string>;
}
export interface backendInterface {
    calculateCognitiveLoad(accuracy: number, avgTimeSecs: number, errorCount: bigint, stressLevel: bigint, confidenceLevel: bigint, retryCount: bigint, sessionDurationMins: number, topicDifficulty: string): Promise<Result_11>;
    getAnalytics(daysBack: bigint): Promise<Result_10>;
    getDashboardData(): Promise<Result_9>;
    getLearningProgress(subject: string): Promise<Result_1>;
    getMockInterviewQuestions(mode: string): Promise<Result_8>;
    getQuizHistory(): Promise<Result_7>;
    getQuizQuestions(subject: string, difficulty: string): Promise<Result_6>;
    getRecommendations(): Promise<Result_5>;
    getUserProfile(): Promise<Result>;
    registerUser(name: string, email: string): Promise<Result>;
    seedQuizData(): Promise<Result_4>;
    submitMockInterview(mode: string, answers: Array<[string, string]>): Promise<Result_3>;
    submitQuizSession(subject: string, difficulty: string, answers: Array<[string, string]>, timePerQuestion: Array<number>, stressLevel: bigint, confidenceLevel: bigint, sessionDurationSecs: bigint): Promise<Result_2>;
    updateLearningProgress(subject: string, completedTopic: string): Promise<Result_1>;
    updateUserProfile(name: string, email: string, studyGoal: bigint, difficulty: string, theme: string, notifications: boolean): Promise<Result>;
}
