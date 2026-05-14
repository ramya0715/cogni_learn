import { createActor } from "@/backend";
import type {
  AnalyticsSummary,
  CognitiveLoadEntry,
  DashboardData,
  LearningProgress,
  MockInterviewQuestion,
  MockInterviewResult,
  QuizResultSummary,
  QuizSession,
  Recommendation,
  UserProfile,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";

function unwrapOk<T>(
  result: { __kind__: "ok"; ok: T } | { __kind__: "err"; err: string },
): T {
  if (result.__kind__ === "ok") return result.ok;
  throw new Error(result.err);
}

export function useGetUserProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getUserProfile();
      return unwrapOk(result);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.registerUser(name, email);
      return unwrapOk(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["userProfile"] }),
  });
}

export function useUpdateUserProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      email: string;
      studyGoal: bigint;
      difficulty: string;
      theme: string;
      notifications: boolean;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateUserProfile(
        params.name,
        params.email,
        params.studyGoal,
        params.difficulty,
        params.theme,
        params.notifications,
      );
      return unwrapOk(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["userProfile"] }),
  });
}

export function useGetDashboardData() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DashboardData | null>({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getDashboardData();
      return unwrapOk(result);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetQuizQuestions(
  subject: string,
  difficulty: string,
  enabled = true,
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["quizQuestions", subject, difficulty],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getQuizQuestions(subject, difficulty);
      return unwrapOk(result);
    },
    enabled: !!actor && !isFetching && enabled,
  });
}

export function useSubmitQuizSession() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      subject: string;
      difficulty: string;
      answers: Array<[string, string]>;
      timePerQuestion: Array<number>;
      stressLevel: bigint;
      confidenceLevel: bigint;
      sessionDurationSecs: bigint;
    }): Promise<QuizResultSummary> => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.submitQuizSession(
        params.subject,
        params.difficulty,
        params.answers,
        params.timePerQuestion,
        params.stressLevel,
        params.confidenceLevel,
        params.sessionDurationSecs,
      );
      return unwrapOk(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dashboardData"] });
      qc.invalidateQueries({ queryKey: ["analytics"] });
      qc.invalidateQueries({ queryKey: ["cognitiveLoad"] });
    },
  });
}

export function useGetQuizHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<QuizSession[]>({
    queryKey: ["quizHistory"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getQuizHistory();
      return unwrapOk(result);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAnalytics(daysBack = 30n) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<AnalyticsSummary | null>({
    queryKey: ["analytics", daysBack.toString()],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getAnalytics(daysBack);
      return unwrapOk(result);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCognitiveLoad() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<CognitiveLoadEntry | null>({
    queryKey: ["cognitiveLoad"],
    queryFn: async () => {
      if (!actor) return null;
      const dashboard = await actor.getDashboardData();
      const data = unwrapOk(dashboard);
      return data.currentCognitiveLoad;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCalculateCognitiveLoad() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      accuracy: number;
      avgTimeSecs: number;
      errorCount: bigint;
      stressLevel: bigint;
      confidenceLevel: bigint;
      retryCount: bigint;
      sessionDurationMins: number;
      topicDifficulty: string;
    }): Promise<CognitiveLoadEntry> => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.calculateCognitiveLoad(
        params.accuracy,
        params.avgTimeSecs,
        params.errorCount,
        params.stressLevel,
        params.confidenceLevel,
        params.retryCount,
        params.sessionDurationMins,
        params.topicDifficulty,
      );
      return unwrapOk(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cognitiveLoad"] }),
  });
}

export function useGetLearningProgress(subject: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LearningProgress | null>({
    queryKey: ["learningProgress", subject],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getLearningProgress(subject);
      return unwrapOk(result);
    },
    enabled: !!actor && !isFetching && !!subject,
  });
}

export function useUpdateLearningProgress() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      subject,
      topic,
    }: { subject: string; topic: string }): Promise<LearningProgress> => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateLearningProgress(subject, topic);
      return unwrapOk(result);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["learningProgress", vars.subject] });
      qc.invalidateQueries({ queryKey: ["dashboardData"] });
    },
  });
}

export function useGetMockInterviewQuestions(mode: string, enabled = true) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MockInterviewQuestion[]>({
    queryKey: ["mockInterview", mode],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getMockInterviewQuestions(mode);
      return unwrapOk(result);
    },
    enabled: !!actor && !isFetching && enabled,
  });
}

export function useSubmitMockInterview() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (params: {
      mode: string;
      answers: Array<[string, string]>;
    }): Promise<MockInterviewResult> => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.submitMockInterview(
        params.mode,
        params.answers,
      );
      return unwrapOk(result);
    },
  });
}

export function useGetRecommendations() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Recommendation[]>({
    queryKey: ["recommendations"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getRecommendations();
      return unwrapOk(result);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSeedQuizData() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.seedQuizData();
      return unwrapOk(result);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quizQuestions"] }),
  });
}
