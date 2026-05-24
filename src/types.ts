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

export interface LearningBlock {
  id: string;
  title: string;
  intro: string;
  simple: string;
  detail: string;
  bullets?: string[];
  exam?: string;
  trap?: string;
  mnemonic?: string;
  example?: string;
  table?: string[][];
  visual?: VisualKey;
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
  whyImportant: string;
  learningGoals: string[];
  priority: Priority;
  examReference: string;
  groups: Array<{ title: string; color: string; blocks: LearningBlock[] }>;
  quiz: QuizItem[];
  tasks: PracticeTask[];
  trainers?: TrainerKey[];
  examTip: string;
  commonMistakes: string[];
}

export type TrainerKey = "petri" | "pkr" | "bpmn" | "mining" | "exam-blueprint";

// ---------------- Petri net types ----------------
export interface PetriPlace {
  id: string;
  label: string;
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
  weight?: number;
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

// ---------------- Petri drill ----------------
export type DrillExerciseKind =
  | "select-enabled-transitions"
  | "marking-after-fire"
  | "is-bounded"
  | "is-safe"
  | "is-deadlockfree"
  | "is-live"
  | "fire-count"
  | "reachable-marking-count";

export interface DrillExercise {
  id: string;
  netId: string;
  kind: DrillExerciseKind;
  prompt: string;
  options?: string[]; // for MC
  expected: string | string[];
  explain: string;
}

// ---------------- Process mining ----------------
export interface MiningEvent {
  caseId: string;
  activity: string;
  timestamp: string;
}
export interface MiningCase {
  id: string;
  name: string;
  difficulty: "leicht" | "mittel" | "schwer";
  description: string;
  events: MiningEvent[];
  expectedTraces: Record<string, string[]>;
  activities: string[];
  footprint: Record<string, Record<string, ">" | "<" | "||" | "#">>;
}

// ---------------- BPMN training ----------------
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
  expected: "sequence" | "message";
  explain: string;
}
export interface BpmnOrderTask {
  id: string;
  description: string;
  steps: string[];
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

// ---------------- Exam types (exam paper structure) ----------------

export type ExamPayloadKind =
  | "none"
  | "pkr-table"
  | "integration-table"
  | "eventlog"
  | "petri-net"
  | "process-model"
  | "scenario"
  | "branche-list";

export interface PkrTeilprozess {
  name: string;
  gesamt: number;
  fix: number;
  measureLabel: string;
  gesamtmenge: number;
}
export interface PkrProductRow {
  name: string;
  values: number[]; // per Teilprozess
}
export interface PkrPayload {
  kind: "pkr-table";
  unternehmen: string;
  produkte: [string, string];
  teilprozesse: PkrTeilprozess[];
  zuteilung: PkrProductRow[];
}

export interface IntegrationCostRow {
  position: string;
  intern: number | null;
  extern: number | null;
}
export interface IntegrationPayload {
  kind: "integration-table";
  unternehmen: string;
  branche: string;
  scenario: string;
  zukauf: string;
  measure: string; // pro Stück / Modul / Maschine
  rows: IntegrationCostRow[];
  /** which row to "verkabeln intern komplett selbst" change scenario */
  changeRowIndex: number;
  /** integer EUR change to add/remove from intern in changed row */
  changeIntern: number;
  /** the matched extern in the change row (becomes 0) */
  changeExternBefore: number;
}

export interface EventLogRow {
  caseId: string;
  activity: string;
  timestamp: string;
  resource?: string;
}
export interface EventLogPayload {
  kind: "eventlog";
  rows: EventLogRow[];
  activities: string[];
  expectedTraces: Record<string, string[]>;
}

export interface PetriExamPayload {
  kind: "petri-net";
  net: PetriNet;
  /** computed properties for solution */
  enabledInitial: string[];
  fireCounts: Record<string, number>;
  reachableCount: number;
  k: number;
  isSafe: boolean;
  isDeadlockFree: boolean;
  isLive: boolean;
}

export interface ProcessModelTracePayload {
  kind: "process-model";
  description: string;
  /** activities used for traces */
  activities: string[];
  /** complete traces possible in the model */
  completeTraces: string[];
  /** trace examples to evaluate (true = possible) */
  traceCheck: Array<{ trace: string; possible: boolean }>;
  /** count of complete traces (might be ∞ for loops) */
  completeTracesCount: number | "unendlich";
  /** footprint of an L log */
  footprintLog: string;
  footprintActivities: string[];
  footprintMatrix: Record<string, Record<string, "→" | "←" | "∥" | "#">>;
}

export interface ScenarioPayload {
  kind: "scenario";
  unternehmen: string;
  branche: string;
  text: string;
  prozesse: Array<{
    name: string;
    expected: "kern" | "support" | "management";
    begruendung: string;
  }>;
}

export interface BrancheListPayload {
  kind: "branche-list";
  unternehmen: string;
  branche: string;
  text: string;
  prozesse: string[];
  expected: Array<"kern" | "support" | "management">;
}

export type ExamPayload =
  | PkrPayload
  | IntegrationPayload
  | EventLogPayload
  | PetriExamPayload
  | ProcessModelTracePayload
  | ScenarioPayload
  | BrancheListPayload
  | { kind: "none" };

export interface ExamSubTask {
  label: string; // "1.", "2.", "(a)", "(b)" etc.
  points: number;
  prompt: string;
  expected: string;
  grading: string[];
}

export interface ExamBlock {
  block: string; // "A1".."A8"
  title: string;
  points: number;
  /** intro text shown above the sub-tasks */
  intro: string;
  payload: ExamPayload;
  subTasks: ExamSubTask[];
  commonErrors: string[];
}

// ---------------- Question bank ----------------

export type QuestionTopic =
  | "Grundbegriffe"
  | "GPM-Zyklus"
  | "Prozessarten"
  | "Modellierung"
  | "ARIS"
  | "BPMN"
  | "Petrinetze"
  | "Process-Mining"
  | "Wertschöpfung"
  | "Integration"
  | "PKR"
  | "Qualität"
  | "KPI/SMART"
  | "Digitalisierung"
  | "Workflow/GPMS";

export type QuestionDifficulty = "leicht" | "mittel" | "schwer";

export interface QuestionItem {
  id: string;
  topic: QuestionTopic;
  chapter: ChapterId;
  difficulty: QuestionDifficulty;
  question: string;
  answer: string;
  /** optional explanation / context */
  why?: string;
  /** optional choices for multiple-choice questions */
  choices?: string[];
  /** index in choices that is correct (only for MC) */
  correctChoice?: number;
  /** source (e.g. "Klausur WS 25/26", "Lernzettel") */
  source?: string;
}

export interface QuestionStatus {
  right: number;
  wrong: number;
  lastSeen?: number;
  /** if user marked the question as still struggling */
  starred?: boolean;
}

// ---------------- Progress ----------------
export interface ProgressState {
  completedChapters: ChapterId[];
  chapterProgress: Record<string, number>;
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
  /** Petri drill state per net id */
  petriDrill: Record<
    string,
    { right: number; wrong: number; streak: number; mastered: boolean }
  >;
  /** Question bank tracking per question id */
  questionStatus: Record<string, QuestionStatus>;
}
