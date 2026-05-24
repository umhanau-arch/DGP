// Domain types for the DGP guided learning experience

export type ChapterId =
  | "kapitel-1"
  | "kapitel-2"
  | "kapitel-3"
  | "kapitel-4"
  | "kapitel-5"
  | "kapitel-6"
  | "kapitel-7"
  | "kapitel-8"
  | "kapitel-9";

export type Priority = "A" | "B" | "C";

/** A learning block inside a chapter (theory + visualization + checks). */
export interface LearningBlock {
  id: string;
  title: string;
  /** Very short summary used to set the scene. */
  intro: string;
  /** Plain language explanation. */
  simple: string;
  /** Deeper explanation, fachlich korrekt. */
  detail: string;
  /** Short list of bullet point insights. */
  bullets?: string[];
  /** Klausurbezug. */
  exam?: string;
  /** Typische Falle. */
  trap?: string;
  /** One-line memorable rule. */
  mnemonic?: string;
  /** Worked example. */
  example?: string;
  /** Optional table data: array of rows; first row is header. */
  table?: string[][];
  /** Optional inline visualization keyword (rendered by VisualBlocks). */
  visual?: VisualKey;
  /** Optional mini check at the end of the block. */
  miniCheck?: MiniCheck;
}

export type VisualKey =
  | "process-flow"
  | "aris-sights"
  | "gpm-cycle"
  | "process-map"
  | "function-tree"
  | "porter-chain"
  | "integration-directions"
  | "digitization-stairs"
  | "pkr-flow"
  | "petri-static"
  | "bpmn-symbols"
  | "bpmn-pools"
  | "mining-pipeline"
  | "footprint-legend"
  | "kpi-dashboard"
  | "pdca-cycle"
  | "smart-checklist"
  | "make-or-buy"
  | "exam-blueprint";

export interface MiniCheck {
  prompt: string;
  options: string[];
  correctIndex: number;
  explain: string;
}

export type TaskKind =
  | "definition"
  | "mc"
  | "calc"
  | "petri"
  | "mining"
  | "bpmn"
  | "case";

export interface PracticeTask {
  id: string;
  kind: TaskKind;
  prompt: string;
  given?: string[];
  expected: string;
  steps: string[];
  hint?: string;
  trap?: string;
  exam?: string;
}

export interface QuizItem {
  id: string;
  question: string;
  answer: string;
  why?: string;
}

export interface ChapterDefinition {
  id: ChapterId;
  number: number;
  title: string;
  subtitle: string;
  /** Why is this chapter needed - 1-2 sentences */
  whyImportant: string;
  /** What we will learn (Lernziele as bullets). */
  learningGoals: string[];
  /** Priority on the exam (A = sicher, B = wahrscheinlich, C = möglich). */
  priority: Priority;
  /** Short label like "Aufgabe 4" or "Aufgabe 6/7". */
  examReference: string;
  /** Theory groups -> learning blocks. */
  groups: Array<{ title: string; color: string; blocks: LearningBlock[] }>;
  /** Quiz at the end of chapter. */
  quiz: QuizItem[];
  /** Practice tasks after the quiz. */
  tasks: PracticeTask[];
  /** Optional embedded trainer keys to show in the practice section. */
  trainers?: TrainerKey[];
  /** A final tip / warning / strategy. */
  examTip: string;
  commonMistakes: string[];
}

export type TrainerKey = "petri" | "pkr" | "bpmn" | "mining" | "exam-blueprint";

// ---- Petri net types ----
export interface PetriPlace {
  id: string;
  label: string;
  /** initial token count */
  tokens: number;
  x: number;
  y: number;
}
export interface PetriTransition {
  id: string;
  label: string;
  x: number;
  y: number;
}
export interface PetriArc {
  from: string;
  to: string;
}
export interface PetriNet {
  id: string;
  name: string;
  description: string;
  difficulty: "leicht" | "mittel" | "schwer";
  places: PetriPlace[];
  transitions: PetriTransition[];
  arcs: PetriArc[];
  questions: Array<{
    question: string;
    answer: string;
    explain: string;
  }>;
  notes?: string[];
}

// ---- Process mining types ----
export interface MiningEvent {
  caseId: string;
  activity: string;
  timestamp: string; // hh:mm
}
export interface MiningCase {
  id: string;
  name: string;
  difficulty: "leicht" | "mittel" | "schwer";
  description: string;
  events: MiningEvent[];
  /** ordered traces per case in correct sequence */
  expectedTraces: Record<string, string[]>;
  /** activities that appear */
  activities: string[];
  /** ground truth footprint per (a,b) ; values "->", "<-", "||", "#" */
  footprint: Record<string, Record<string, ">" | "<" | "||" | "#">>;
}

// ---- BPMN training tasks ----
export interface BpmnSymbolTask {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explain: string;
}
export interface BpmnFlowTask {
  id: string;
  prompt: string;
  /** kind: "sequence" or "message" */
  expected: "sequence" | "message";
  explain: string;
}
export interface BpmnOrderTask {
  id: string;
  description: string;
  steps: string[]; // shuffled in UI; stored in correct order here
  explain: string;
}
export interface BpmnCaseTask {
  id: string;
  title: string;
  scenario: string;
  pools: string[];
  solution: string[];
  trap: string;
  exam: string;
}

// ---- Exam types ----
export interface ExamSubTask {
  block: string; // A1..A8
  title: string;
  prompt: string;
  points: number;
  expected: string;
  grading: string[];
  commonErrors: string[];
}

// ---- Progress ----
export interface ProgressState {
  completedChapters: ChapterId[];
  chapterProgress: Record<string, number>; // 0..100
  lastChapter: ChapterId;
  lastStep: number;
  xp: number;
  examsTaken: number;
  miniCheckScore: { right: number; wrong: number };
  quizScore: { right: number; wrong: number };
  petriRuns: number;
  pkrRuns: number;
  bpmnRuns: number;
  miningRuns: number;
  theme: "light" | "dark";
}
