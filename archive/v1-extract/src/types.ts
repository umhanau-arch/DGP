export type TopicId =
  | "gpm"
  | "arten"
  | "kosten"
  | "bpmn"
  | "petri"
  | "mining"
  | "integration"
  | "kpi";

export type Difficulty = "leicht" | "mittel" | "schwer";
export type QuestionType =
  | "mc"
  | "tf"
  | "fill"
  | "match"
  | "order"
  | "calc"
  | "case"
  | "trace"
  | "eventlog";

export interface Topic {
  id: TopicId;
  title: string;
  color: string;
  priority: "A" | "B" | "C";
  icon: string;
  short: string;
  simple: string;
  detailed: string;
  visual: string[];
  table: Array<[string, string]>;
  mnemonic: string;
  examQuestion: string;
  trap: string;
  application: string;
  solution: string;
}

export interface Flashcard {
  id: string;
  topic: TopicId;
  front: string;
  back: string;
  difficulty: Difficulty;
}

export interface Question {
  id: string;
  topic: TopicId;
  difficulty: Difficulty;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  examRelevance: string;
}

export interface Formula {
  id: string;
  topic: TopicId;
  name: string;
  formula: string;
  explanation: string;
  example: string;
  examTask: string;
}

export interface ExamTask {
  id: string;
  title: string;
  points: number;
  prompt: string;
  solution: string;
  grading: string[];
  commonErrors: string[];
}

export interface Mistake {
  id: string;
  topic: TopicId;
  title: string;
  wrong: string;
  correct: string;
  fix: string;
}

export interface ProgressState {
  xp: number;
  streak: number;
  solved: number;
  correct: number;
  wrong: number;
  cards: Record<string, "leicht" | "mittel" | "schwer" | "falsch">;
  mastery: Record<TopicId, number>;
  checklist: Record<string, boolean>;
  mistakes: string[];
}
