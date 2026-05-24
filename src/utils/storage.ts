import type { ChapterId, ProgressState } from "../types";

const KEY = "dgp-progress-v2";

export const defaultProgress: ProgressState = {
  completedChapters: [],
  chapterProgress: {},
  lastChapter: "kapitel-1",
  lastStep: 0,
  xp: 0,
  examsTaken: 0,
  miniCheckScore: { right: 0, wrong: 0 },
  quizScore: { right: 0, wrong: 0 },
  petriRuns: 0,
  pkrRuns: 0,
  bpmnRuns: 0,
  miningRuns: 0,
  theme: "light",
};

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return { ...defaultProgress, ...parsed };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(p: ProgressState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // ignore
  }
}

export function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

export function markChapterDone(p: ProgressState, id: ChapterId): ProgressState {
  const completed = p.completedChapters.includes(id)
    ? p.completedChapters
    : [...p.completedChapters, id];
  return {
    ...p,
    completedChapters: completed,
    chapterProgress: { ...p.chapterProgress, [id]: 100 },
    xp: p.xp + 30,
  };
}

export function setChapterProgress(p: ProgressState, id: ChapterId, value: number): ProgressState {
  return {
    ...p,
    chapterProgress: { ...p.chapterProgress, [id]: clamp(value) },
  };
}
