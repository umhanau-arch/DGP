import type { ChapterId, ProgressState, QuestionStatus } from "../types";

const KEY = "dgp-progress-v3";

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
  petriDrill: {},
  questionStatus: {},
};

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      // try migrating from v2
      const old = localStorage.getItem("dgp-progress-v2");
      if (old) {
        const parsed = JSON.parse(old);
        return {
          ...defaultProgress,
          ...parsed,
          petriDrill: parsed.petriDrill ?? {},
          questionStatus: parsed.questionStatus ?? {},
        };
      }
      return defaultProgress;
    }
    const parsed = JSON.parse(raw);
    return {
      ...defaultProgress,
      ...parsed,
      petriDrill: parsed.petriDrill ?? {},
      questionStatus: parsed.questionStatus ?? {},
    };
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

export function recordPetriDrill(
  p: ProgressState,
  netId: string,
  correct: boolean,
): ProgressState {
  const prev = p.petriDrill[netId] ?? {
    right: 0,
    wrong: 0,
    streak: 0,
    mastered: false,
  };
  const streak = correct ? prev.streak + 1 : 0;
  const mastered = streak >= 6 ? true : prev.mastered;
  return {
    ...p,
    petriDrill: {
      ...p.petriDrill,
      [netId]: {
        right: prev.right + (correct ? 1 : 0),
        wrong: prev.wrong + (correct ? 0 : 1),
        streak,
        mastered,
      },
    },
    xp: p.xp + (correct ? 3 : 0),
  };
}

export function recordQuestionAnswer(
  p: ProgressState,
  id: string,
  correct: boolean,
): ProgressState {
  const prev: QuestionStatus = p.questionStatus[id] ?? {
    right: 0,
    wrong: 0,
  };
  return {
    ...p,
    questionStatus: {
      ...p.questionStatus,
      [id]: {
        ...prev,
        right: prev.right + (correct ? 1 : 0),
        wrong: prev.wrong + (correct ? 0 : 1),
        lastSeen: Date.now(),
      },
    },
    xp: p.xp + (correct ? 2 : 0),
  };
}

export function toggleQuestionStar(p: ProgressState, id: string): ProgressState {
  const prev: QuestionStatus = p.questionStatus[id] ?? { right: 0, wrong: 0 };
  return {
    ...p,
    questionStatus: {
      ...p.questionStatus,
      [id]: { ...prev, starred: !prev.starred },
    },
  };
}

export function resetQuestionStatus(p: ProgressState, id: string): ProgressState {
  const next = { ...p.questionStatus };
  delete next[id];
  return { ...p, questionStatus: next };
}
