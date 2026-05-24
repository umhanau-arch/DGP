import type { ProgressState, TopicId } from "../types";

const topicIds: TopicId[] = ["gpm", "arten", "kosten", "bpmn", "petri", "mining", "integration", "kpi"];

export const defaultProgress: ProgressState = {
  xp: 0,
  streak: 1,
  solved: 0,
  correct: 0,
  wrong: 0,
  cards: {},
  mastery: Object.fromEntries(topicIds.map((id) => [id, 0])) as Record<TopicId, number>,
  checklist: {},
  mistakes: [],
};

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem("dgp-progress");
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: ProgressState) {
  localStorage.setItem("dgp-progress", JSON.stringify(progress));
}

export function clampMastery(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}
