import type { CognitiveLoadCategory } from "@/types";
import { useGetCognitiveLoad } from "./useBackend";

export interface CognitiveLoadState {
  currentLoad: import("@/types").CognitiveLoadEntry | null;
  loadCategory: CognitiveLoadCategory;
  loadColor: "green" | "yellow" | "red";
  loadScore: number;
  isHigh: boolean;
  isModerate: boolean;
  isLow: boolean;
  cssClass: string;
  isLoading: boolean;
}

export function useCognitiveLoad(): CognitiveLoadState {
  const { data, isLoading } = useGetCognitiveLoad();

  const currentLoad = data ?? null;
  const category = (currentLoad?.category ?? "Low") as CognitiveLoadCategory;
  const score = currentLoad?.loadScore ?? 0;

  const isHigh = category === "High";
  const isModerate = category === "Moderate";
  const isLow = category === "Low";

  const loadColor: "green" | "yellow" | "red" = isHigh
    ? "red"
    : isModerate
      ? "yellow"
      : "green";

  const cssClass = isHigh
    ? "cognitive-high"
    : isModerate
      ? "cognitive-moderate"
      : "cognitive-low";

  return {
    currentLoad,
    loadCategory: category,
    loadColor,
    loadScore: score,
    isHigh,
    isModerate,
    isLow,
    cssClass,
    isLoading,
  };
}
