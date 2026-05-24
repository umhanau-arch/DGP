import { useEffect, useMemo, useState } from "react";
import type React from "react";
import {
  BookOpen,
  Calculator,
  CheckSquare,
  CircleDot,
  ClipboardList,
  Gauge,
  GitBranch,
  GraduationCap,
  Layers,
  Moon,
  Network,
  PanelsTopLeft,
  SearchCode,
  Sparkles,
  Sun,
  Target,
  Timer,
  Workflow,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { topics, learningPath, checklistItems } from "./data/topics";
import { flashcards } from "./data/flashcards";
import { questions } from "./data/questions";
import { formulas } from "./data/formulas";
import { mistakes } from "./data/mistakes";
import { examTasks } from "./data/examTasks";
import { guidedDetails } from "./data/guidedContent";
import { arisSightRows, chapterOneGroups, chapterOneMindmap } from "./data/chapterOne";
import { visualizationPlans } from "./data/visualizations";
import type { ExamTask, ProgressState, Question, TopicId } from "./types";
import { clampMastery, loadProgress, saveProgress } from "./utils/storage";

type View =
  | "dashboard"
  | "guided"
  | "path"
  | "topics"
  | "visuals"
  | "practice"
  | "flashcards"
  | "quiz"
  | "exam"
  | "cost"
  | "bpmn"
  | "petri"
  | "mining"
  | "formulas"
  | "mistakes"
  | "checklist";

const iconMap = { Workflow, Network, Calculator, PanelsTopLeft, CircleDot, SearchCode, GitBranch, Gauge };

const nav: Array<{ id: View; label: string; Icon: React.ElementType; group: "Start" | "Theorie" | "Aufgaben" | "Werkzeuge" }> = [
  { id: "guided", label: "Gefuehrter Modus", Icon: Target, group: "Start" },
  { id: "exam", label: "Klausurmodus", Icon: Timer, group: "Aufgaben" },
];

const colorClasses: Record<string, string> = {
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100",
  rose: "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-100",
  orange: "border-orange-200 bg-orange-50 text-orange-900 dark:border-orange-900 dark:bg-orange-950/50 dark:text-orange-100",
  sky: "border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-900 dark:bg-sky-950/50 dark:text-sky-100",
  violet: "border-violet-200 bg-violet-50 text-violet-900 dark:border-violet-900 dark:bg-violet-950/50 dark:text-violet-100",
  cyan: "border-cyan-200 bg-cyan-50 text-cyan-900 dark:border-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-100",
  lime: "border-lime-200 bg-lime-50 text-lime-900 dark:border-lime-900 dark:bg-lime-950/50 dark:text-lime-100",
  slate: "border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-100",
};

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
      <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${clampMastery(value)}%` }} />
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-950 ${className}`}>{children}</section>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{children}</span>;
}

export default function App() {
  const [view, setView] = useState<View>("guided");
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  const [dark, setDark] = useState(() => localStorage.getItem("dgp-theme") === "dark");

  useEffect(() => saveProgress(progress), [progress]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("dgp-theme", dark ? "dark" : "light");
  }, [dark]);

  const update = (patch: Partial<ProgressState>) => setProgress((old) => ({ ...old, ...patch }));
  const markTopic = (topic: TopicId, delta: number) =>
    setProgress((old) => ({ ...old, mastery: { ...old.mastery, [topic]: clampMastery((old.mastery[topic] ?? 0) + delta) } }));
  const readiness = Math.round(Object.values(progress.mastery).reduce((a, b) => a + b, 0) / topics.length);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-slate-200 bg-white/95 p-4 dark:border-slate-800 dark:bg-slate-950/95 lg:block">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-lg bg-sky-600 p-2 text-white"><GraduationCap /></div>
          <div>
            <h1 className="text-lg font-black">DGP Trainer</h1>
            <p className="text-xs text-slate-500">100-Punkte-Klausurfokus</p>
          </div>
        </div>
        <nav className="space-y-4">
          {(["Start", "Theorie", "Aufgaben", "Werkzeuge"] as const).filter((group) => nav.some((item) => item.group === group)).map((group) => (
            <div key={group}>
              <p className="mb-1 px-3 text-[11px] font-black uppercase tracking-wide text-slate-400">{group}</p>
              <div className="space-y-1">
                {nav.filter((item) => item.group === group).map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setView(id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${view === id ? "bg-sky-600 text-white" : "hover:bg-slate-100 dark:hover:bg-slate-900"}`}
                  >
                    <Icon size={18} /> {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <main className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-sky-600">Digitale GeschÃ¤ftsprozesse</p>
              <h2 className="text-xl font-black">Ultimativer interaktiver Klausurtrainer</h2>
            </div>
            <div className="flex items-center gap-2">
              <Pill>{progress.xp} XP</Pill>
              <Pill>Readiness {readiness}%</Pill>
              <button aria-label="Theme wechseln" onClick={() => setDark(!dark)} className="rounded-lg border border-slate-200 p-2 dark:border-slate-700">
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
            <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4 lg:hidden">
              {nav.map(({ id, label, Icon }) => (
                <button key={id} onClick={() => setView(id)} className={`rounded-lg border px-2 py-2 text-xs font-semibold ${view === id ? "border-sky-500 bg-sky-50 text-sky-700" : "border-slate-200 dark:border-slate-800"}`}>
                  <Icon className="mx-auto mb-1" size={16} />{label}
                </button>
              ))}
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-7xl px-4 py-6">
          {view === "dashboard" && <Dashboard progress={progress} readiness={readiness} />}
          {view === "guided" && <FocusedGuidedLearning progress={progress} setProgress={setProgress} setView={setView} />}
          {view === "path" && <LearningPath markTopic={markTopic} />}
          {view === "topics" && <TopicModules markTopic={markTopic} setView={setView} />}
          {view === "visuals" && <VisualizationPlanner />}
          {view === "practice" && <PracticeHub setView={setView} />}
          {view === "flashcards" && <Flashcards progress={progress} setProgress={setProgress} />}
          {view === "quiz" && <Quiz progress={progress} setProgress={setProgress} />}
          {view === "exam" && <ExamMode progress={progress} setProgress={setProgress} />}
          {view === "cost" && <CostCalculator markTopic={markTopic} />}
          {view === "bpmn" && <BpmnTrainer markTopic={markTopic} />}
          {view === "petri" && <PetriTrainer markTopic={markTopic} />}
          {view === "mining" && <MiningTrainer markTopic={markTopic} />}
          {view === "formulas" && <FormulaCollection />}
          {view === "mistakes" && <ErrorTrainer progress={progress} update={update} />}
          {view === "checklist" && <Checklist progress={progress} setProgress={setProgress} readiness={readiness} />}
        </div>
      </main>
    </div>
  );
}

function Dashboard({ progress, readiness }: { progress: ProgressState; readiness: number }) {
  const weak = topics
    .map((t) => ({ ...t, score: progress.mastery[t.id] ?? 0 }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);
  const statCards: Array<{ label: string; value: string | number; Icon: React.ElementType }> = [
    { label: "Exam Readiness", value: `${readiness}%`, Icon: Target },
    { label: "GelÃ¶ste Fragen", value: progress.solved, Icon: Sparkles },
    { label: "Richtig/Falsch", value: `${progress.correct}/${progress.wrong}`, Icon: CheckSquare },
    { label: "Streak", value: `${progress.streak} Tag`, Icon: Timer },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {statCards.map(({ label, value, Icon }) => (
          <Card key={label}>
            <Icon className="mb-3 text-sky-600" />
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-3xl font-black">{value}</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
        <Card>
          <h3 className="mb-4 text-lg font-black">Mastery pro Klausurthema</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {topics.map((topic) => {
              const Icon = iconMap[topic.icon as keyof typeof iconMap] ?? BookOpen;
              return (
                <div key={topic.id} className={`rounded-lg border p-4 ${colorClasses[topic.color]}`}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2 font-bold"><Icon size={18} />{topic.title}</span>
                    <span>{progress.mastery[topic.id] ?? 0}%</span>
                  </div>
                  <ProgressBar value={progress.mastery[topic.id] ?? 0} />
                </div>
              );
            })}
          </div>
        </Card>
        <Card>
          <h3 className="mb-3 text-lg font-black">NÃ¤chste beste Aufgabe</h3>
          <p className="mb-4 text-slate-600 dark:text-slate-300">
            Starte mit <b>{weak[0]?.title}</b>. Dein schnellster Notenhebel liegt aktuell bei diesen Themen:
          </p>
          <div className="space-y-3">
            {weak.map((topic) => (
              <div key={topic.id}>
                <div className="mb-1 flex justify-between text-sm"><span>{topic.title}</span><span>{topic.score}%</span></div>
                <ProgressBar value={topic.score} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function FocusedGuidedLearning({
  progress,
  setProgress,
  setView,
}: {
  progress: ProgressState;
  setProgress: React.Dispatch<React.SetStateAction<ProgressState>>;
  setView: React.Dispatch<React.SetStateAction<View>>;
}) {
  const chapters = useMemo(() => {
    const chapterOneExtra = chapterOneGroups.flatMap((group) =>
      group.items.map((item) => ({
        term: item.question,
        simple: item.answer,
        detail: item.why,
        example: group.title,
        exam: "Kapitel 1: Definition, Zuordnung oder kurze Begruendung.",
      })),
    );
    return [
      {
        id: "kapitel-1",
        title: "Kapitel 1",
        subtitle: "Geschaeftsprozesse und deren Management",
        topics: ["gpm", "arten"] as TopicId[],
        goal: "Erst Grundidee verstehen: Prozess, Geschaeftsprozess, ARIS, Rollen, GPM-Zyklus, Prozesslandkarte und Prozessarten.",
        cards: [...(guidedDetails.gpm ?? []), ...(guidedDetails.arten ?? []), ...chapterOneExtra],
      },
      {
        id: "modellierung",
        title: "Kapitel Modellierung",
        subtitle: "BPMN, Petrinetze, Workflownetze und Notationen",
        topics: ["bpmn", "petri"] as TopicId[],
        goal: "Modelle lesen und bauen: BPMN fuer Geschaeftsprozesse, Petrinetze fuer formale Ablauflogik.",
        cards: [...(guidedDetails.bpmn ?? []), ...(guidedDetails.petri ?? [])],
      },
      {
        id: "wertschoepfung",
        title: "Kapitel Wertschoepfung und Organisation",
        subtitle: "Wertschoepfung, Porter, Integration, Make-or-Buy",
        topics: ["integration"] as TopicId[],
        goal: "Verstehen, wo Wert entsteht und wie Integration entlang oder neben der Lieferkette funktioniert.",
        cards: guidedDetails.integration ?? [],
      },
      {
        id: "kosten",
        title: "Kapitel Prozesskostenrechnung",
        subtitle: "Kostenbegriffe, lmi/lmn, Prozesskostensatz",
        topics: ["kosten"] as TopicId[],
        goal: "Eine Aufgabe 4 sicher rechnen: Kosten trennen, Satz bilden, Produkt/Auftrag belasten.",
        cards: guidedDetails.kosten ?? [],
      },
      {
        id: "mining",
        title: "Kapitel Process Mining",
        subtitle: "Eventlogs, Traces, Varianten, Footprint, Alpha",
        topics: ["mining"] as TopicId[],
        goal: "Aus Eventdaten Prozesswissen machen: gruppieren, sortieren, Beziehungen erkennen.",
        cards: guidedDetails.mining ?? [],
      },
      {
        id: "zusatz",
        title: "Zusatzkapitel",
        subtitle: "KPI, ISO, BSC und Digitalisierung",
        topics: ["kpi"] as TopicId[],
        goal: "Kurze Definitionen und Abgrenzungen fuer Zusatzpunkte sicher abrufen.",
        cards: guidedDetails.kpi ?? [],
      },
    ];
  }, []);

  const [chapterIndex, setChapterIndex] = useState(() => Number(localStorage.getItem("dgp-focused-chapter") ?? 0));
  const [stepIndex, setStepIndex] = useState(() => Number(localStorage.getItem("dgp-focused-step") ?? 0));
  const [quizIndex, setQuizIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const chapter = chapters[Math.min(chapterIndex, chapters.length - 1)];
  const primaryTopic = topics.find((topic) => topic.id === chapter.topics[0])!;
  const chapterPlans = visualizationPlans.filter((plan) => chapter.topics.includes(plan.topic));
  const cardPages = chunk(chapter.cards, 6);
  const steps = ["ueberblick", "darstellung", ...cardPages.map((_, index) => `lernen-${index}`), "quiz", "abschluss"];
  const currentStep = steps[Math.min(stepIndex, steps.length - 1)];
  const quizItems = useMemo(() => {
    if (chapter.id === "kapitel-1") {
      return chapterOneGroups.flatMap((group) => group.items.map((item) => ({
        question: item.question,
        answer: item.answer,
        why: item.why,
      })));
    }
    return questions
      .filter((question) => chapter.topics.includes(question.topic))
      .map((question) => ({
        question: question.question,
        answer: Array.isArray(question.correctAnswer) ? question.correctAnswer.join(", ") : question.correctAnswer,
        why: question.explanation,
      }));
  }, [chapter.id, chapter.topics]);
  const currentQuiz = quizItems[quizIndex % Math.max(quizItems.length, 1)];

  useEffect(() => {
    localStorage.setItem("dgp-focused-chapter", String(chapterIndex));
    localStorage.setItem("dgp-focused-step", String(stepIndex));
  }, [chapterIndex, stepIndex]);

  function resetChapterState(nextChapter: number) {
    setChapterIndex(nextChapter);
    setStepIndex(0);
    setQuizIndex(0);
    setRevealed(false);
    setScore(0);
  }

  function nextStep() {
    setRevealed(false);
    if (currentStep === "quiz" && quizIndex < quizItems.length - 1) {
      setQuizIndex((old) => old + 1);
      return;
    }
    if (stepIndex < steps.length - 1) {
      setStepIndex((old) => old + 1);
      return;
    }
    const patch = Object.fromEntries(chapter.topics.map((topic) => [topic, clampMastery((progress.mastery[topic] ?? 0) + 15)])) as Record<TopicId, number>;
    setProgress((old) => ({ ...old, xp: old.xp + 30, solved: old.solved + quizItems.length, mastery: { ...old.mastery, ...patch } }));
    resetChapterState(Math.min(chapterIndex + 1, chapters.length - 1));
  }

  function gradeQuiz(known: boolean) {
    if (known) setScore((old) => old + 1);
    setRevealed(false);
    if (quizIndex < quizItems.length - 1) {
      setQuizIndex((old) => old + 1);
      return;
    }
    setStepIndex((old) => old + 1);
  }

  const learnPageIndex = currentStep.startsWith("lernen-") ? Number(currentStep.replace("lernen-", "")) : -1;
  const activeCards = learnPageIndex >= 0 ? cardPages[learnPageIndex] : [];
  const planForPage = chapterPlans[Math.max(0, learnPageIndex) % Math.max(chapterPlans.length, 1)];

  return (
    <div className="space-y-5">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Pill>Ein Modus. Ein roter Faden.</Pill>
            <h2 className="mt-3 text-3xl font-black">Gefuehrter Lernmodus</h2>
            <p className="mt-2 max-w-3xl text-slate-700 dark:text-slate-300">
              Erst Zusammenhang, dann Erklaerungen mit passender Darstellung, dann Kapitelquiz ueber alle Fragen. Keine verstreuten Extra-Bereiche.
            </p>
          </div>
          <button onClick={() => setView("exam")} className="rounded-lg bg-slate-950 px-4 py-2 font-bold text-white dark:bg-white dark:text-slate-950">
            Zur Random-Klausur
          </button>
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
        <Card>
          <h3 className="font-black">Reihenfolge</h3>
          <div className="mt-4 space-y-2">
            {chapters.map((item, index) => (
              <button
                key={item.id}
                onClick={() => resetChapterState(index)}
                className={`w-full rounded-lg border p-3 text-left text-sm ${index === chapterIndex ? "border-sky-500 bg-sky-50 text-sky-950 dark:bg-sky-950/50 dark:text-sky-50" : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"}`}
              >
                <b>{index + 1}. {item.title}</b>
                <span className="mt-1 block">{item.subtitle}</span>
                <span className="mt-1 block text-xs">Erklaerungen zuerst, Quiz am Kapitelende</span>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div className={`mb-5 rounded-lg border p-4 ${colorClasses[primaryTopic.color]}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold">{chapter.title}</p>
                <h3 className="text-2xl font-black">{chapter.subtitle}</h3>
              </div>
              <Pill>Schritt {Math.min(stepIndex + 1, steps.length)}/{steps.length}</Pill>
            </div>
            <div className="mt-3"><ProgressBar value={((Math.min(stepIndex + 1, steps.length)) / steps.length) * 100} /></div>
          </div>

          {currentStep === "ueberblick" && (
            <div className="space-y-4">
              <h3 className="text-2xl font-black">Worum geht es in diesem Kapitel?</h3>
              <p className="rounded-lg bg-slate-50 p-4 text-lg dark:bg-slate-900">{chapter.goal}</p>
              <div className="grid gap-3 md:grid-cols-2">
                {chapter.topics.map((topicId) => {
                  const topic = topics.find((item) => item.id === topicId)!;
                  return <Info key={topic.id} title={topic.title} text={topic.simple} />;
                })}
              </div>
            </div>
          )}

          {currentStep === "darstellung" && (
            <div className="space-y-4">
              <h3 className="text-2xl font-black">So wird dieses Kapitel dargestellt</h3>
              <p className="text-slate-700 dark:text-slate-300">Die Darstellung ist direkt Teil des Lernwegs. Sie soll nicht extra irgendwo liegen, sondern beim Verstehen helfen.</p>
              <div className="grid gap-3 lg:grid-cols-2">
                {chapterPlans.slice(0, 6).map((plan) => (
                  <div key={plan.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                    <Pill>{plan.representation}</Pill>
                    <h4 className="mt-3 font-black">{plan.theme}</h4>
                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{plan.didacticWhy}</p>
                    <p className="mt-2 text-sm"><b>Interaktion:</b> {plan.interactions.join(" | ")}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep.startsWith("lernen-") && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-2xl font-black">Erklaerungen im Zusammenhang</h3>
                <Pill>Lernblock {learnPageIndex + 1}/{cardPages.length}</Pill>
              </div>
              {planForPage && (
                <div className="rounded-lg border border-sky-200 bg-sky-50 p-4 text-sky-950 dark:border-sky-900 dark:bg-sky-950/50 dark:text-sky-50">
                  <b>Passende Darstellung:</b> {planForPage.representation}
                  <p className="mt-1 text-sm">{planForPage.interactiveVisualization}</p>
                </div>
              )}
              <div className="grid gap-4 xl:grid-cols-2">
                {activeCards.map((card) => (
                  <div key={`${card.term}-${card.simple}`} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                    <h4 className="text-lg font-black">{card.term}</h4>
                    <p className="mt-2 rounded-lg bg-sky-50 p-3 text-sky-950 dark:bg-sky-950/50 dark:text-sky-50"><b>Einfach:</b> {card.simple}</p>
                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-300"><b>Zusammenhang:</b> {card.detail}</p>
                    <p className="mt-2 text-sm"><b>Beispiel:</b> {card.example}</p>
                    <p className="mt-2 text-sm text-amber-800 dark:text-amber-200"><b>Klausur:</b> {card.exam}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === "quiz" && currentQuiz && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-2xl font-black">Kapitelquiz ueber alle Fragen</h3>
                <Pill>{quizIndex + 1}/{quizItems.length}</Pill>
              </div>
              <div className="rounded-lg bg-slate-50 p-5 dark:bg-slate-900">
                <p className="text-lg font-black">{currentQuiz.question}</p>
                {!revealed ? (
                  <button onClick={() => setRevealed(true)} className="mt-4 rounded-lg bg-sky-600 px-4 py-2 font-bold text-white">Antwort anzeigen</button>
                ) : (
                  <div className="mt-4 space-y-3">
                    <p><b>Musterantwort:</b> {currentQuiz.answer}</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300"><b>Warum wichtig:</b> {currentQuiz.why}</p>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => gradeQuiz(true)} className="rounded-lg bg-emerald-600 px-4 py-2 font-bold text-white">Gewusst</button>
                      <button onClick={() => gradeQuiz(false)} className="rounded-lg bg-rose-600 px-4 py-2 font-bold text-white">Nicht gewusst</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === "abschluss" && (
            <div className="space-y-4">
              <h3 className="text-2xl font-black">Kapitel abgeschlossen</h3>
              <p className="rounded-lg bg-emerald-50 p-4 text-emerald-950 dark:bg-emerald-950/50 dark:text-emerald-50">
                Score: {score}/{quizItems.length}. Wenn du deutlich unter 70 Prozent bist, wiederhole dieses Kapitel direkt nochmal.
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            <button onClick={() => setStepIndex((old) => Math.max(0, old - 1))} className="rounded-lg border px-4 py-2 font-bold dark:border-slate-700">Zurueck</button>
            <button onClick={nextStep} className="rounded-lg bg-sky-600 px-5 py-2 font-bold text-white">
              {currentStep === "quiz" ? "Quiz weiter" : currentStep === "abschluss" ? "Naechstes Kapitel" : "Next"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function VisualizationPlanner() {
  const [topicId, setTopicId] = useState<TopicId | "all">("all");
  const filtered = topicId === "all" ? visualizationPlans : visualizationPlans.filter((plan) => plan.topic === topicId);
  const [selectedId, setSelectedId] = useState(visualizationPlans[0].id);
  const selected = visualizationPlans.find((plan) => plan.id === selectedId) ?? filtered[0] ?? visualizationPlans[0];
  const selectedTopic = topics.find((topic) => topic.id === selected.topic)!;
  const Icon = iconMap[selectedTopic.icon as keyof typeof iconMap] ?? BookOpen;

  useEffect(() => {
    if (!filtered.some((plan) => plan.id === selectedId)) {
      setSelectedId(filtered[0]?.id ?? visualizationPlans[0].id);
    }
  }, [filtered, selectedId]);

  return (
    <div className="space-y-5">
      <Card className="bg-slate-950 text-white dark:bg-slate-900">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Pill>Interaktive Lernvisualisierung</Pill>
            <h2 className="mt-3 text-3xl font-black">Beste Darstellungsform pro Thema</h2>
            <p className="mt-2 max-w-3xl text-slate-200">
              Hier steht fuer jedes klausurrelevante Thema, welche Darstellung am besten passt, warum sie beim Lernen hilft,
              welche Animationen sinnvoll sind und welche Interaktionen dich vom Lesen ins Verstehen bringen.
            </p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-sm">
            <b>{visualizationPlans.length} Visualisierungsplaene</b>
            <p className="mt-1 text-slate-300">GPM, ARIS, BPMN, Petrinetze, PKR, Mining, Integration und Klausurstrategie.</p>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setTopicId("all")} className={`rounded-lg border px-3 py-2 text-sm font-bold ${topicId === "all" ? "border-sky-500 bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-100" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"}`}>
          Alle Themen
        </button>
        {topics.map((topic) => (
          <button key={topic.id} onClick={() => setTopicId(topic.id)} className={`rounded-lg border px-3 py-2 text-sm font-bold ${topicId === topic.id ? colorClasses[topic.color] : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"}`}>
            {topic.title}
          </button>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.4fr]">
        <Card className="max-h-[760px] overflow-auto">
          <h3 className="mb-3 text-lg font-black">Themenauswahl</h3>
          <div className="space-y-2">
            {filtered.map((plan) => {
              const isActive = plan.id === selected.id;
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedId(plan.id)}
                  className={`w-full rounded-lg border p-3 text-left transition ${isActive ? "border-sky-500 bg-sky-50 text-sky-950 dark:bg-sky-950/50 dark:text-sky-50" : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"}`}
                >
                  <span className="text-xs font-black uppercase tracking-wide text-slate-500">{plan.chapter}</span>
                  <span className="mt-1 block font-black">{plan.theme}</span>
                  <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">{plan.representation}</span>
                </button>
              );
            })}
          </div>
        </Card>

        <Card>
          <div className={`rounded-lg border p-4 ${colorClasses[selectedTopic.color]}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="flex items-center gap-2 text-sm font-black"><Icon size={18} /> {selected.chapter}</span>
                <h3 className="mt-2 text-2xl font-black">{selected.theme}</h3>
              </div>
              <Pill>{selected.representation}</Pill>
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <Info title="1. Beste Darstellungsform" text={selected.representation} />
            <Info title="2. Didaktische Begruendung" text={selected.didacticWhy} />
            <Info title="3. Interaktive Visualisierung" text={selected.interactiveVisualization} />
            <Info title="6. Wie Verstaendnis entsteht" text={selected.understanding} />
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
              <h4 className="font-black">4. Animationen</h4>
              <div className="mt-3 space-y-2">
                {selected.animations.map((item, index) => (
                  <div key={item} className="flex gap-3 rounded-lg bg-white p-3 text-sm dark:bg-slate-950">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sky-100 font-black text-sky-800 dark:bg-sky-950 dark:text-sky-100">{index + 1}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
              <h4 className="font-black">5. Nutzerinteraktionen</h4>
              <div className="mt-3 space-y-2">
                {selected.interactions.map((item) => (
                  <div key={item} className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-semibold dark:border-slate-800 dark:bg-slate-950">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
            <h4 className="font-black">Mini-Prototyp im Kopf</h4>
            <div className="mt-4 grid gap-2 md:grid-cols-4">
              {["Erkennen", "Anwenden", "Feedback", "Klausursicher"].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0.6, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-lg bg-slate-100 p-3 text-center text-sm font-black dark:bg-slate-900"
                >
                  {step}
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {selected.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function GuidedLearning({
  progress,
  setProgress,
  setView,
}: {
  progress: ProgressState;
  setProgress: React.Dispatch<React.SetStateAction<ProgressState>>;
  setView: React.Dispatch<React.SetStateAction<View>>;
}) {
  const guidedOrder: Array<{
    topic: TopicId;
    chapter: string;
    title: string;
    context: string;
    belongsTo: string[];
    detailSteps: string[];
    example: string;
    exam: string;
  }> = [
    {
      topic: "gpm",
      chapter: "Kapitel 1",
      title: "Was ist ein GeschÃ¤ftsprozess und warum braucht man GPM?",
      context: "Bevor du BPMN, Kosten oder Process Mining verstehst, musst du wissen, was Ã¼berhaupt optimiert wird: ein GeschÃ¤ftsprozess. GPM ist der Rahmen, der alle spÃ¤teren Kapitel verbindet.",
      belongsTo: ["Prozess", "Algorithmus vs. Prozess", "GeschÃ¤ftsprozess", "Prozessmodell", "Workflow", "ARIS", "GPM-Lebenszyklus", "Prozesslandkarte"],
      detailSteps: ["Input und Output erkennen", "WertschÃ¶pfung erklÃ¤ren", "Prozess von Projekt abgrenzen", "GPM-Zyklus in Reihenfolge nennen", "Rollen und Verantwortlichkeiten einordnen"],
      example: "Order-to-Cash: Kunde bestellt, Unternehmen prÃ¼ft, liefert, stellt Rechnung und erhÃ¤lt Zahlung. Das ist ein wiederholbarer GeschÃ¤ftsprozess mit Kundennutzen.",
      exam: "Kommt fast immer in Aufgabe 1 als Definition und in Aufgabe 2 als GPM-Zyklus/Phasenfehler.",
    },
    {
      topic: "arten",
      chapter: "Kapitel 1",
      title: "Welche Prozessarten gibt es?",
      context: "Nach der Grunddefinition musst du Prozesse sortieren kÃ¶nnen. Das ist wichtig fÃ¼r Prozesslandkarten und typische Zuordnungsaufgaben.",
      belongsTo: ["Kernprozess", "Supportprozess", "Managementprozess", "GeschÃ¤ftsfall", "Prozessinstanz", "strategische Wichtigkeit"],
      detailSteps: ["Kundennutzen prÃ¼fen", "interne UnterstÃ¼tzung erkennen", "Steuerungsaufgaben erkennen", "Kontext beachten", "BegrÃ¼ndung formulieren"],
      example: "Im Online-Shop ist Bestellen ein Kernprozess. HR ist Support. Strategie und Controlling sind Managementprozesse.",
      exam: "Typische Aufgabe 3: Beispiele zuordnen und begrÃ¼nden.",
    },
    {
      topic: "bpmn",
      chapter: "Kapitel Modellierung",
      title: "Wie modelliert man Prozesse mit BPMN?",
      context: "BPMN macht GeschÃ¤ftsprozesse sichtbar. Du brauchst es, um End-to-End-AblÃ¤ufe mit Kunde und Unternehmen sauber darzustellen.",
      belongsTo: ["Start/Ende", "Task", "Zwischenereignis", "XOR", "AND", "Pool", "Lane", "Sequenzfluss", "Nachrichtenfluss", "Schleife"],
      detailSteps: ["Teilnehmer identifizieren", "Pools und Lanes setzen", "AktivitÃ¤ten als Tasks benennen", "Entscheidungen mit Gateways modellieren", "Nachrichten zwischen Pools zeichnen"],
      example: "Reklamation: Kunde sendet Nachricht, Unternehmen prÃ¼ft VollstÃ¤ndigkeit, fordert ggf. Angaben nach, entscheidet Ersatz oder Ablehnung.",
      exam: "Aufgabe 7: BPMN-Modell mit getrennten Pools und korrekten NachrichtenflÃ¼ssen.",
    },
    {
      topic: "petri",
      chapter: "Kapitel Modellierung",
      title: "Wie funktionieren Petrinetze?",
      context: "Petrinetze sind die formale Seite der Modellierung. Du prÃ¼fst nicht schÃ¶n zeichnen, sondern ZustÃ¤nde: Welche Transition ist aktiv, was ist erreichbar, gibt es Deadlocks?",
      belongsTo: ["Stellen", "Transitionen", "Token", "Markierung", "Aktivierung", "Feuern", "Erreichbarkeitsgraph", "k-BeschrÃ¤nktheit", "Sicherheit", "Deadlock", "Lebendigkeit"],
      detailSteps: ["Token-Verteilung lesen", "Input-Stellen einer Transition prÃ¼fen", "Feuerregel anwenden", "neue Markierung notieren", "Eigenschaften Ã¼ber alle erreichbaren Markierungen prÃ¼fen"],
      example: "Wenn t1 p1 verbraucht und p2/p3 erzeugt, sind danach t2 und t3 parallel aktivierbar.",
      exam: "Aufgabe 6: aktivierte Transitionen, Feuerfolgen, BeschrÃ¤nktheit, Sicherheit, Deadlockfreiheit, Lebendigkeit.",
    },
    {
      topic: "integration",
      chapter: "Kapitel WertschÃ¶pfung und Organisation",
      title: "Wie hÃ¤ngen WertschÃ¶pfung und Integration zusammen?",
      context: "Hier geht es darum, wie viel Wert ein Unternehmen selbst erzeugt und welche Stufen der Lieferkette es Ã¼bernimmt.",
      belongsTo: ["WertschÃ¶pfung", "Leistung", "Vorleistung", "Porter", "EBIT/EBITDA/ROI", "vertikale Integration", "RÃ¼ckwÃ¤rtsintegration", "VorwÃ¤rtsintegration", "horizontale Integration", "Make-or-Buy"],
      detailSteps: ["Leistung und Vorleistung unterscheiden", "WertschÃ¶pfung berechnen", "Integrationsgrad berechnen", "Richtung der Integration bestimmen", "Vor- und Nachteile argumentieren"],
      example: "Tesla baut Batterien selbst: RÃ¼ckwÃ¤rtsintegration. Tesla verkauft direkt an Kunden: VorwÃ¤rtsintegration.",
      exam: "Aufgabe 5: Rechnung plus Diskussion von Integrationsformen.",
    },
    {
      topic: "kosten",
      chapter: "Kapitel Prozesskostenrechnung",
      title: "Wie rechnet man Prozesskostenrechnung?",
      context: "Das ist einer der wichtigsten Punkte fÃ¼r Punkte in der Klausur. Hier geht es darum, Gemeinkosten verursachungsgerechter auf Prozesse und Produkte zu verteilen.",
      belongsTo: ["Kosten", "Leistungen", "Einzelkosten", "Gemeinkosten", "fixe/variable Kosten", "Kostenstellen", "KostentrÃ¤ger", "lmi/lmn", "Prozesskostensatz", "Umlageverfahren"],
      detailSteps: ["Gesamtkosten und Fixkosten trennen", "variable Prozesskosten berechnen", "richtige MaÃŸgrÃ¶ÃŸe erkennen", "Prozesskostensatz bilden", "auf Produkt/Auftrag anwenden"],
      example: "120.000 Gesamtkosten, 30.000 Fixkosten, 9.000 Bestellungen: variable Kosten 90.000, Satz 10 pro Bestellung.",
      exam: "Aufgabe 4: Rechenweg muss nachvollziehbar sein.",
    },
    {
      topic: "mining",
      chapter: "Kapitel Process Mining",
      title: "Wie liest man Eventlogs und Alpha-Beziehungen?",
      context: "Process Mining verbindet echte IT-Daten mit Prozessmodellen. Du gehst vom Log zum Trace und vom Trace zur Beziehungsmatrix.",
      belongsTo: ["Event", "Eventlog", "Case ID", "Activity", "Timestamp", "Trace", "Variante", "Play-In", "Play-Out", "Replay", "Footprint", "Alpha-Algorithmus"],
      detailSteps: ["Events nach Case ID gruppieren", "je Case nach Timestamp sortieren", "Trace bilden", "Varianten zÃ¤hlen", "direkte Folgen und Beziehungen ableiten"],
      example: "C1 A,B,C und C2 A,C,B bedeutet: B > C und C > B kommen vor, also B || C.",
      exam: "Aufgabe 8: Eventlog analysieren, Traces bilden, Footprint ergÃ¤nzen.",
    },
    {
      topic: "kpi",
      chapter: "Zusatzthemen",
      title: "Welche Zusatzbegriffe muss ich kurz kÃ¶nnen?",
      context: "Diese Themen bringen oft Definitionspunkte. Sie sind weniger rechenlastig, aber man kann sie schnell und sicher auswendig lernen.",
      belongsTo: ["KPI", "SMART", "Balanced Scorecard", "ISO 9001", "QMS", "PDCA", "Digitization", "Digitalization", "digitale Transformation", "Industrie 4.0", "IoT", "Digital Twin"],
      detailSteps: ["Begriff einfach erklÃ¤ren", "fachlich sauber abgrenzen", "ein Beispiel nennen", "Klausurbezug formulieren"],
      example: "PDF-Scan ist Digitization. Digitaler Freigabeprozess ist Digitalization. PlattformgeschÃ¤ft ist digitale Transformation.",
      exam: "Aufgabe 1 oder kurze Theorie-/Diskussionsfrage.",
    },
  ];

  const recommendedIndex = guidedOrder.reduce((best, lesson, index) => {
    const bestScore = progress.mastery[guidedOrder[best].topic] ?? 0;
    const score = progress.mastery[lesson.topic] ?? 0;
    return score < bestScore ? index : best;
  }, 0);
  const [lessonIndex, setLessonIndex] = useState(() => Number(localStorage.getItem("dgp-guided-lesson") ?? recommendedIndex));
  const [stageIndex, setStageIndex] = useState(() => Number(localStorage.getItem("dgp-guided-stage") ?? 0));
  const [answer, setAnswer] = useState<string | null>(null);
  const lesson = guidedOrder[Math.min(lessonIndex, guidedOrder.length - 1)];
  const topic = topics.find((candidate) => candidate.id === lesson.topic)!;
  const quizQuestion = questions.find((question) => question.topic === lesson.topic && question.options?.length) ?? questions.find((question) => question.options?.length)!;
  const chapterOneExtraCards = lesson.topic === "gpm"
    ? chapterOneGroups.flatMap((group) => group.items.map((item) => ({
        term: item.question,
        simple: item.answer,
        detail: item.why,
        example: group.title,
        exam: "Kapitel 1 Grundlagen: kann als Definition, Zuordnung oder kurze BegrÃ¼ndung drankommen.",
      })))
    : [];
  const detailCards = [...(guidedDetails[lesson.topic] ?? []), ...chapterOneExtraCards];
  const stages = ["Ãœberblick", ...detailCards.map((detail) => `Begriff: ${detail.term}`), "Schrittfolge", "Beispiel", "Mini-Quiz", "Weiter"];
  const currentStage = stages[Math.min(stageIndex, stages.length - 1)];
  const currentDetail = currentStage.startsWith("Begriff: ") ? detailCards.find((detail) => `Begriff: ${detail.term}` === currentStage) : undefined;
  const mustAnswerQuiz = currentStage === "Mini-Quiz" && answer === null;
  const nextLabel = currentStage === "Weiter" ? "Lektion abschlieÃŸen" : currentStage === "Mini-Quiz" && answer === null ? "Erst Quiz beantworten" : "NÃ¤chster Schritt";

  useEffect(() => {
    localStorage.setItem("dgp-guided-lesson", String(lessonIndex));
    localStorage.setItem("dgp-guided-stage", String(stageIndex));
  }, [lessonIndex, stageIndex]);

  function next() {
    if (mustAnswerQuiz) return;
    setAnswer(null);
    if (stageIndex < stages.length - 1) {
      setStageIndex(stageIndex + 1);
      return;
    }
    setProgress((old) => ({
      ...old,
      xp: old.xp + 12,
      mastery: { ...old.mastery, [lesson.topic]: clampMastery((old.mastery[lesson.topic] ?? 0) + 10) },
    }));
    setLessonIndex(Math.min(lessonIndex + 1, guidedOrder.length - 1));
    setStageIndex(0);
  }

  function chooseRecommended() {
    setLessonIndex(recommendedIndex);
    setStageIndex(0);
    setAnswer(null);
  }

  const stageText: React.ReactNode = currentStage === "Ãœberblick" ? (
      <div>
        <h3 className="text-2xl font-black">{lesson.title}</h3>
        <p className="mt-3 text-lg text-slate-700 dark:text-slate-300">{lesson.context}</p>
        <div className="mt-4 rounded-lg bg-sky-50 p-4 text-sky-950 dark:bg-sky-950/50 dark:text-sky-50">
          <b>Warum jetzt?</b> Der Lernalgorithmus startet mit hoher Klausurrelevanz und nimmt danach schwache Mastery-Werte zuerst.
        </div>
      </div>
    ) : currentDetail ? (
      <div>
        <Pill>Begriff {detailCards.findIndex((detail) => detail.term === currentDetail.term) + 1}/{detailCards.length}</Pill>
        <h3 className="mt-3 text-2xl font-black">{currentDetail.term}</h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg bg-sky-50 p-4 text-sky-950 dark:bg-sky-950/50 dark:text-sky-50">
            <h4 className="font-black">Erst einfach</h4>
            <p className="mt-2">{currentDetail.simple}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
            <h4 className="font-black">Dann Zusammenhang</h4>
            <p className="mt-2 text-slate-700 dark:text-slate-300">{currentDetail.detail}</p>
          </div>
          <div className="rounded-lg bg-emerald-50 p-4 text-emerald-950 dark:bg-emerald-950/50 dark:text-emerald-50">
            <h4 className="font-black">Beispiel</h4>
            <p className="mt-2">{currentDetail.example}</p>
          </div>
          <div className="rounded-lg bg-amber-50 p-4 text-amber-950 dark:bg-amber-950/50 dark:text-amber-50">
            <h4 className="font-black">Klausurbezug</h4>
            <p className="mt-2">{currentDetail.exam}</p>
          </div>
        </div>
      </div>
    ) : currentStage === "Schrittfolge" ? (
      <div>
        <h3 className="text-2xl font-black">So denkst du in der Klausur</h3>
        <ol className="mt-4 space-y-3">
          {lesson.detailSteps.map((step, index) => (
            <li key={step} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900"><b>{index + 1}. </b>{step}</li>
          ))}
        </ol>
      </div>
    ) : currentStage === "Beispiel" ? (
      <div>
        <h3 className="text-2xl font-black">Beispiel und Zusammenhang</h3>
        <p className="mt-3 rounded-lg bg-slate-50 p-4 text-slate-800 dark:bg-slate-900 dark:text-slate-200">{lesson.example}</p>
        <p className="mt-3 rounded-lg bg-amber-50 p-4 text-amber-950 dark:bg-amber-950/50 dark:text-amber-50"><b>Klausurbezug:</b> {lesson.exam}</p>
      </div>
    ) : currentStage === "Mini-Quiz" ? (
      <div>
        <h3 className="text-2xl font-black">Mini-Quiz vor dem Weitergehen</h3>
        <p className="mt-3 font-bold">{quizQuestion.question}</p>
        <div className="mt-4 grid gap-2">
          {(quizQuestion.options ?? []).slice(0, 4).map((option) => {
            const correct = answer !== null && normalize(quizQuestion.correctAnswer) === normalize(option);
            const chosenWrong = answer === option && !correct;
            return (
              <button key={option} disabled={Boolean(answer)} onClick={() => setAnswer(option)} className={`rounded-lg border p-3 text-left font-semibold ${correct ? "border-emerald-500 bg-emerald-50 text-emerald-800" : chosenWrong ? "border-rose-500 bg-rose-50 text-rose-800" : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"}`}>
                {option}
              </button>
            );
          })}
        </div>
        {answer && <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-900">{quizQuestion.explanation}</p>}
      </div>
    ) : (
      <div>
        <h3 className="text-2xl font-black">Kurz einordnen, dann weiter</h3>
        <p className="mt-3 text-slate-700 dark:text-slate-300">{topic.mnemonic}</p>
        <p className="mt-3 rounded-lg bg-emerald-50 p-4 text-emerald-950 dark:bg-emerald-950/50 dark:text-emerald-50">
          Wenn du das verstanden hast, klickst du auf Lektion abschlieÃŸen. Erst dann springt die App zum nÃ¤chsten Thema.
        </p>
      </div>
    );

  return (
    <div className="space-y-5">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Pill>GefÃ¼hrter Modus</Pill>
            <h2 className="mt-3 text-3xl font-black">Nicht suchen. Einfach Next klicken.</h2>
            <p className="mt-2 max-w-3xl text-slate-700 dark:text-slate-300">
              Dieser Modus erklÃ¤rt erst den Zusammenhang, dann die Einzelteile, dann die Klausur-Denkweise, dann ein Beispiel und erst danach ein Quiz.
            </p>
          </div>
          <button onClick={chooseRecommended} className="rounded-lg border border-sky-300 px-4 py-2 font-bold text-sky-700 dark:border-sky-700 dark:text-sky-200">Nach SchwÃ¤che wÃ¤hlen</button>
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
        <Card>
          <h3 className="font-black">Ablauf</h3>
          <div className="mt-4 space-y-2">
            {guidedOrder.map((item, index) => (
              <button key={item.title} onClick={() => { setLessonIndex(index); setStageIndex(0); setAnswer(null); }} className={`w-full rounded-lg border p-3 text-left text-sm ${index === lessonIndex ? "border-sky-500 bg-sky-50 text-sky-950 dark:border-sky-700 dark:bg-sky-950/50 dark:text-sky-50" : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"}`}>
                <b>{index + 1}. {item.chapter}</b>
                <span className="mt-1 block">{topics.find((candidate) => candidate.id === item.topic)?.title}</span>
                <span className="mt-1 block text-xs">Mastery {progress.mastery[item.topic] ?? 0}%</span>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div className={`mb-5 rounded-lg border p-4 ${colorClasses[topic.color]}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold">{lesson.chapter}</p>
                <h3 className="text-2xl font-black">{topic.title}</h3>
              </div>
              <Pill>{currentStage.replace("Begriff: ", "")} Â· {stageIndex + 1}/{stages.length}</Pill>
            </div>
            <div className="mt-3"><ProgressBar value={((stageIndex + 1) / stages.length) * 100} /></div>
          </div>

          <div className="min-h-[420px]">{stageText}</div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button onClick={() => setStageIndex((old) => Math.max(0, old - 1))} className="rounded-lg border px-4 py-2 font-bold dark:border-slate-700">ZurÃ¼ck</button>
            <button onClick={next} disabled={mustAnswerQuiz} className={`rounded-lg px-5 py-2 font-bold text-white ${mustAnswerQuiz ? "cursor-not-allowed bg-slate-400" : "bg-sky-600"}`}>{nextLabel}</button>
            <button onClick={() => setView("topics")} className="rounded-lg bg-slate-100 px-4 py-2 font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-100">Kapitelansicht Ã¶ffnen</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function LearningPath({ markTopic }: { markTopic: (topic: TopicId, delta: number) => void }) {
  return (
    <div className="space-y-5">
      <Card>
        <h3 className="text-xl font-black">Priorisierter Lernpfad</h3>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Jede Einheit: KurzverstÃ¤ndnis, Beispiel, Mini-Quiz, Anwendung, Klausuraufgabe.</p>
      </Card>
      <div className="grid gap-4">
        {learningPath.map((item, index) => {
          const topic = topics[Math.min(index, topics.length - 1)];
          return (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }} key={item}>
              <Card className={`${topic.priority === "A" ? "border-sky-300" : ""}`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <Pill>PrioritÃ¤t {topic.priority}</Pill>
                    <h4 className="mt-2 text-lg font-black">{index + 1}. {item}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{topic.mnemonic}</p>
                  </div>
                  <button onClick={() => markTopic(topic.id, 12)} className="rounded-lg bg-sky-600 px-4 py-2 font-bold text-white">Einheit bestanden</button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function TopicModules({ markTopic, setView }: { markTopic: (topic: TopicId, delta: number) => void; setView: React.Dispatch<React.SetStateAction<View>> }) {
  const chapterGroups: Array<{ id: string; title: string; source: string; goal: string; topics: TopicId[] }> = [
    {
      id: "kapitel-1",
      title: "Kapitel 1: GeschÃ¤ftsprozesse und GPM",
      source: "Grundlagen, ARIS, Rollen, GPM-Lebenszyklus, Prozesslandkarte, Prozessarten",
      goal: "Definitionen sicher kÃ¶nnen und den GPM-Zyklus in Klausuraufgabe 1 und 2 anwenden.",
      topics: ["gpm", "arten"],
    },
    {
      id: "kapitel-2",
      title: "Kapitel 2: GeschÃ¤ftsprozessmodellierung",
      source: "BPMN, Petrinetze, Workflownetze, Modellierungsregeln",
      goal: "Prozessmodelle lesen, modellieren und formale Eigenschaften prÃ¼fen.",
      topics: ["bpmn", "petri"],
    },
    {
      id: "kapitel-3",
      title: "Kapitel 3: WertschÃ¶pfung und Organisation",
      source: "WertschÃ¶pfung, Porter, Integration, Make-or-Buy, Sourcing",
      goal: "WertschÃ¶pfung rechnen und Integrationsformen sauber unterscheiden.",
      topics: ["integration"],
    },
    {
      id: "kapitel-4",
      title: "Kapitel 4: Prozesskostenrechnung",
      source: "Kostenarten, Kostenstellen, lmi/lmn, Prozesskostensatz, Umlage",
      goal: "Typische Aufgabe 4 rechnerisch ohne Chaos lÃ¶sen.",
      topics: ["kosten"],
    },
    {
      id: "kapitel-5",
      title: "Kapitel 5: Process Mining",
      source: "Eventlogs, Traces, Varianten, Footprint, Alpha-Algorithmus",
      goal: "Eventdaten gruppieren und Beziehungen im Alpha-Algorithmus erkennen.",
      topics: ["mining"],
    },
    {
      id: "kapitel-6",
      title: "Kapitel 6: KPI, ISO und Digitalisierung",
      source: "KPI, SMART, Balanced Scorecard, ISO 9001, Digitization, Digitalization, Transformation",
      goal: "Zusatzdefinitionen kurz und klausurtauglich abrufen.",
      topics: ["kpi"],
    },
  ];
  const [selectedChapter, setSelectedChapter] = useState(chapterGroups[0].id);
  const activeChapter = chapterGroups.find((chapter) => chapter.id === selectedChapter)!;
  const [selected, setSelected] = useState<TopicId>(activeChapter.topics[0]);
  const topic = topics.find((t) => t.id === selected)!;
  const Icon = iconMap[topic.icon as keyof typeof iconMap] ?? BookOpen;
  const chapterTopics = activeChapter.topics.map((id) => topics.find((candidate) => candidate.id === id)!);

  function chooseChapter(chapterId: string) {
    const nextChapter = chapterGroups.find((chapter) => chapter.id === chapterId)!;
    setSelectedChapter(chapterId);
    setSelected(nextChapter.topics[0]);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
      <div className="space-y-3">
        <Card>
          <h3 className="font-black">Theorie nach Kapiteln</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Nichts wurde gelÃ¶scht. Die Inhalte sind nur nach KapitelblÃ¶cken sortiert.</p>
        </Card>
        {chapterGroups.map((chapter, index) => {
          const isActive = selectedChapter === chapter.id;
          return (
            <button key={chapter.id} onClick={() => chooseChapter(chapter.id)} className={`w-full rounded-lg border p-3 text-left transition ${isActive ? "border-sky-400 bg-sky-50 text-sky-950 dark:border-sky-700 dark:bg-sky-950/50 dark:text-sky-50" : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"}`}>
              <span className="block text-sm font-black">{index + 1}. {chapter.title.replace(/^Kapitel \d+: /, "")}</span>
              <span className="mt-1 block text-xs text-slate-600 dark:text-slate-300">{chapter.source}</span>
            </button>
          );
        })}
      </div>
      <Card>
        <div className="mb-5 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Pill>{activeChapter.title}</Pill>
              <h3 className="mt-3 text-2xl font-black">{activeChapter.source}</h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300">{activeChapter.goal}</p>
            </div>
            <button onClick={() => setView("quiz")} className="rounded-lg bg-sky-600 px-4 py-2 font-bold text-white">Quiz Ã¼ber alles</button>
          </div>
        </div>

        <div className="mb-5 grid gap-3 md:grid-cols-2">
          {chapterTopics.map((chapterTopic) => {
            const TopicIcon = iconMap[chapterTopic.icon as keyof typeof iconMap] ?? BookOpen;
            return (
              <button key={chapterTopic.id} onClick={() => setSelected(chapterTopic.id)} className={`rounded-lg border p-4 text-left transition ${selected === chapterTopic.id ? colorClasses[chapterTopic.color] : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"}`}>
                <TopicIcon className="mb-2" size={18} />
                <span className="block font-black">{chapterTopic.title}</span>
                <span className="mt-1 block text-sm">{chapterTopic.short}</span>
              </button>
            );
          })}
        </div>

        <div className={`mb-5 rounded-lg border p-4 ${colorClasses[topic.color]}`}>
          <Icon className="mb-2" />
          <h3 className="text-2xl font-black">{topic.title}</h3>
          <p>{topic.short}</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Info title="1. Was ist das?" text={topic.simple} />
          <Info title="2. Warum wichtig?" text={topic.detailed} />
          <Info title="3. Merksatz" text={topic.mnemonic} />
          <Info title="4. Klausurform" text={topic.examQuestion} />
          <Info title="5. Typische Falle" text={topic.trap} />
          <Info title="6. Ãœbung" text={topic.application} />
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div>
            <h4 className="mb-2 font-black">Visueller Ablauf</h4>
            <div className="flex flex-wrap gap-2">{topic.visual.map((v) => <Pill key={v}>{v}</Pill>)}</div>
          </div>
          <div>
            <h4 className="mb-2 font-black">Tabelle</h4>
            <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
              {topic.table.map(([a, b]) => <div key={a} className="grid grid-cols-[150px_1fr] border-b border-slate-200 text-sm last:border-0 dark:border-slate-800"><b className="bg-slate-50 p-2 dark:bg-slate-900">{a}</b><span className="p-2">{b}</span></div>)}
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_0.9fr]">
          <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
            <h4 className="font-black">Kapitel-Zusammenfassung</h4>
            <div className="mt-3 space-y-3">
              {chapterTopics.map((chapterTopic) => (
                <div key={chapterTopic.id} className="rounded-lg bg-white p-3 text-sm dark:bg-slate-950">
                  <b>{chapterTopic.title}:</b> {chapterTopic.mnemonic}
                </div>
              ))}
            </div>
          </div>
          <ChapterQuiz topicIds={activeChapter.topics} />
        </div>
        {activeChapter.id === "kapitel-1" && <ChapterOneCompleteMap />}
        <button onClick={() => markTopic(topic.id, 15)} className="mt-5 rounded-lg bg-slate-950 px-4 py-2 font-bold text-white dark:bg-white dark:text-slate-950">Kapitel aktiv wiederholt</button>
      </Card>
    </div>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900"><h4 className="font-black">{title}</h4><p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{text}</p></div>;
}

function ChapterQuiz({ topicIds }: { topicIds: TopicId[] }) {
  const chapterQuestions = questions.filter((question) => topicIds.includes(question.topic));
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const q = chapterQuestions[index % Math.max(chapterQuestions.length, 1)];
  const correct = answer !== null && normalize(q.correctAnswer) === normalize(answer);

  if (!q) {
    return <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">FÃ¼r dieses Kapitel sind noch keine Fragen vorhanden.</div>;
  }

  return (
    <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-black">Kapitelquiz</h4>
        <Pill>{chapterQuestions.length} Fragen in diesem Kapitel</Pill>
      </div>
      <p className="mt-3 text-sm font-bold">{q.question}</p>
      <div className="mt-3 grid gap-2">
        {(q.options ?? []).slice(0, 4).map((option) => (
          <button key={option} disabled={Boolean(answer)} onClick={() => setAnswer(option)} className={`rounded-lg border p-2 text-left text-sm font-semibold ${answer === option ? (correct ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-rose-500 bg-rose-50 text-rose-800") : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800"}`}>
            {option}
          </button>
        ))}
      </div>
      {answer && (
        <div className="mt-3 rounded-lg bg-white p-3 text-sm dark:bg-slate-950">
          <b>{correct ? "Richtig." : "Noch nicht."}</b> {q.explanation}
          <button onClick={() => { setAnswer(null); setIndex((old) => old + 1); }} className="mt-3 block rounded-lg bg-sky-600 px-3 py-2 font-bold text-white">NÃ¤chste Kapitel-Frage</button>
        </div>
      )}
    </div>
  );
}

function ChapterOneCompleteMap() {
  const [openGroup, setOpenGroup] = useState(chapterOneGroups[0].title);
  const group = chapterOneGroups.find((candidate) => candidate.title === openGroup)!;
  return (
    <div className="mt-5 space-y-5">
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-50">
        <h4 className="text-xl font-black">Kapitel 1 Komplettabdeckung</h4>
        <p className="mt-2 text-sm">
          Diese Ansicht enthÃ¤lt deine komplette Kapitel-1-Fragenliste. Sie ist bewusst als Lernlandkarte gebaut: erst Ãœberblick, dann ARIS-Tabelle, dann jede Frage mit Antwort und Klausurgrund.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
          <h5 className="font-black">Mindmap</h5>
          <div className="mt-4 grid gap-2">
            {chapterOneMindmap.map(([center, branch, content]) => (
              <div key={branch} className="grid grid-cols-[90px_150px_1fr] gap-2 rounded-lg bg-white p-3 text-sm dark:bg-slate-950">
                <b>{center}</b>
                <span className="font-bold text-sky-700 dark:text-sky-300">{branch}</span>
                <span>{content}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
          <h5 className="font-black">ARIS-Tabelle</h5>
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-4 bg-lime-100 p-2 text-xs font-black text-lime-950 dark:bg-lime-950 dark:text-lime-50">
              <span>Sicht</span><span>Frage</span><span>Beschreibt</span><span>Beispiel</span>
            </div>
            {arisSightRows.map((row) => (
              <div key={row[0]} className="grid grid-cols-4 border-t border-slate-200 p-2 text-xs dark:border-slate-800">
                {row.map((cell) => <span key={cell}>{cell}</span>)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
        <div className="space-y-2">
          {chapterOneGroups.map((candidate) => (
            <button key={candidate.title} onClick={() => setOpenGroup(candidate.title)} className={`w-full rounded-lg border p-3 text-left text-sm font-bold ${openGroup === candidate.title ? "border-sky-500 bg-sky-50 text-sky-950 dark:bg-sky-950/50 dark:text-sky-50" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"}`}>
              {candidate.title}
              <span className="mt-1 block text-xs font-normal">{candidate.items.length} Fragen</span>
            </button>
          ))}
        </div>
        <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
          <h5 className="text-lg font-black">{group.title}</h5>
          <div className="mt-4 grid gap-3">
            {group.items.map((item) => (
              <details key={item.question} className="rounded-lg bg-white p-4 dark:bg-slate-950">
                <summary className="cursor-pointer font-black">{item.question}</summary>
                <p className="mt-3 text-slate-800 dark:text-slate-200"><b>Antwort:</b> {item.answer}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300"><b>Warum wichtig:</b> {item.why}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PracticeHub({ setView }: { setView: React.Dispatch<React.SetStateAction<View>> }) {
  const practiceBlocks: Array<{ title: string; topic: TopicId | "all"; view: View; description: string; steps: string[]; Icon: React.ElementType }> = [
    {
      title: "Definitionen drillen",
      topic: "all",
      view: "flashcards",
      description: "FÃ¼r Aufgabe 1: Begriffe schnell abrufen, falsch markierte Karten wiederholen.",
      steps: ["Begriff ansehen", "Antwort laut sagen", "Karte drehen", "leicht/mittel/schwer/falsch markieren"],
      Icon: Layers,
    },
    {
      title: "Prozesskostenrechnung rechnen",
      topic: "kosten",
      view: "cost",
      description: "FÃ¼r Aufgabe 4: variable Kosten, Prozesskostensatz und Produktkosten Schritt fÃ¼r Schritt.",
      steps: ["Gesamtkosten und Fixkosten trennen", "MaÃŸgrÃ¶ÃŸe prÃ¼fen", "Satz berechnen", "auf Produktmenge anwenden"],
      Icon: Calculator,
    },
    {
      title: "Petrinetze online Ã¼ben",
      topic: "petri",
      view: "petri",
      description: "FÃ¼r Aufgabe 6: Transitionen anklicken, aktivierte Transitionen erkennen, Sicherheit prÃ¼fen.",
      steps: ["Startmarkierung lesen", "aktivierte Transitionen bestimmen", "feuern", "Eigenschaften begrÃ¼nden"],
      Icon: CircleDot,
    },
    {
      title: "BPMN modellieren",
      topic: "bpmn",
      view: "bpmn",
      description: "FÃ¼r Aufgabe 7: Pool-Trennung, Nachrichtenfluss, XOR-Schleifen und saubere Benennung.",
      steps: ["Teilnehmer erkennen", "Pools trennen", "Gateways setzen", "NachrichtenflÃ¼sse prÃ¼fen"],
      Icon: PanelsTopLeft,
    },
    {
      title: "Process Mining anwenden",
      topic: "mining",
      view: "mining",
      description: "FÃ¼r Aufgabe 8: Eventlog lesen, Traces bilden, Footprint-Beziehungen erkennen.",
      steps: ["Case ID gruppieren", "nach Timestamp sortieren", "Varianten zÃ¤hlen", "Footprint ergÃ¤nzen"],
      Icon: SearchCode,
    },
    {
      title: "Komplette Klausur simulieren",
      topic: "all",
      view: "exam",
      description: "8 Aufgaben im echten Klausurmuster mit Timer, MusterlÃ¶sung und Fehlerhinweisen.",
      steps: ["Timer starten", "alle Aufgaben bearbeiten", "abgeben", "MusterlÃ¶sung vergleichen"],
      Icon: Timer,
    },
  ];
  const counts = (topic: TopicId | "all") => topic === "all" ? questions.length : questions.filter((q) => q.topic === topic).length;
  return (
    <div className="space-y-5">
      <Card>
        <h3 className="text-2xl font-black">Aufgabenbereich</h3>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Theorie und Aufgaben sind jetzt getrennt. Hier trainierst du aktiv: rechnen, entscheiden, modellieren, feuern, Eventlogs auswerten.
        </p>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {practiceBlocks.map(({ title, topic, view, description, steps, Icon }) => (
          <Card key={title}>
            <Icon className="mb-3 text-sky-600" />
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-lg font-black">{title}</h4>
              <Pill>{counts(topic)} Fragen</Pill>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
            <ol className="mt-3 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              {steps.map((step, index) => <li key={step}>{index + 1}. {step}</li>)}
            </ol>
            <button onClick={() => setView(view)} className="mt-4 rounded-lg bg-sky-600 px-4 py-2 font-bold text-white">Starten</button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Flashcards({ progress, setProgress }: { progress: ProgressState; setProgress: React.Dispatch<React.SetStateAction<ProgressState>> }) {
  const [topic, setTopic] = useState<TopicId | "all">("all");
  const [wrongOnly, setWrongOnly] = useState(false);
  const cards = flashcards.filter((c) => (topic === "all" || c.topic === topic) && (!wrongOnly || progress.cards[c.id] === "falsch"));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[index % Math.max(cards.length, 1)];
  function grade(value: "leicht" | "mittel" | "schwer" | "falsch") {
    setProgress((old) => ({
      ...old,
      xp: old.xp + (value === "falsch" ? 1 : 5),
      cards: { ...old.cards, [card.id]: value },
      mastery: { ...old.mastery, [card.topic]: clampMastery(old.mastery[card.topic] + (value === "falsch" ? 0 : 3)) },
    }));
    setFlipped(false);
    setIndex((i) => i + 1);
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <select value={topic} onChange={(e) => { setTopic(e.target.value as TopicId | "all"); setIndex(0); }} className="rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
          <option value="all">Alle Themen</option>{topics.map((t) => <option value={t.id} key={t.id}>{t.title}</option>)}
        </select>
        <button onClick={() => setWrongOnly(!wrongOnly)} className={`rounded-lg border px-3 py-2 font-bold ${wrongOnly ? "border-rose-500 bg-rose-50 text-rose-700" : "border-slate-300 dark:border-slate-700"}`}>Nur falsch beantwortete</button>
        <Pill>{cards.length} Karten</Pill>
      </div>
      {card ? (
        <motion.button onClick={() => setFlipped(!flipped)} className="min-h-[320px] w-full rounded-lg border border-slate-200 bg-white p-8 text-left shadow-soft dark:border-slate-800 dark:bg-slate-950" whileTap={{ scale: 0.99 }}>
          <Pill>{card.difficulty}</Pill>
          <h3 className="mt-6 text-3xl font-black">{flipped ? card.back : card.front}</h3>
          <p className="mt-6 text-slate-500">{flipped ? "Bewerte deinen Abruf." : "Klicke zum Umdrehen. Erst im Kopf beantworten."}</p>
        </motion.button>
      ) : <Card>Keine Karten in diesem Filter.</Card>}
      {card && <div className="grid gap-2 sm:grid-cols-4">{(["leicht", "mittel", "schwer", "falsch"] as const).map((g) => <button key={g} onClick={() => grade(g)} className="rounded-lg bg-sky-600 px-4 py-3 font-bold text-white">{g}</button>)}</div>}
    </div>
  );
}

function Quiz({ progress, setProgress }: { progress: ProgressState; setProgress: React.Dispatch<React.SetStateAction<ProgressState>> }) {
  const [topic, setTopic] = useState<TopicId | "all">("all");
  const pool = useMemo(() => questions.filter((q) => topic === "all" || q.topic === topic), [topic]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const q = pool[index % Math.max(pool.length, 1)];
  const isCorrect = answer && normalize(q.correctAnswer) === normalize(answer);
  function submit(nextAnswer: string) {
    const ok = normalize(q.correctAnswer) === normalize(nextAnswer);
    setAnswer(nextAnswer);
    setProgress((old) => ({
      ...old,
      solved: old.solved + 1,
      correct: old.correct + (ok ? 1 : 0),
      wrong: old.wrong + (ok ? 0 : 1),
      xp: old.xp + (ok ? 8 : 2),
      mistakes: ok ? old.mistakes : Array.from(new Set([...old.mistakes, q.id])),
      mastery: { ...old.mastery, [q.topic]: clampMastery(old.mastery[q.topic] + (ok ? 2 : -1)) },
    }));
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <select value={topic} onChange={(e) => { setTopic(e.target.value as TopicId | "all"); setIndex(0); setAnswer(null); }} className="rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
          <option value="all">Alle Quizfragen</option>{topics.map((t) => <option value={t.id} key={t.id}>{t.title}</option>)}
        </select>
        <Pill>{pool.length} Fragen</Pill>
      </div>
      {q && <QuestionCard q={q} answer={answer} isCorrect={Boolean(isCorrect)} submit={submit} next={() => { setAnswer(null); setIndex((i) => i + 1); }} />}
      <p className="text-sm text-slate-500">Aktueller Stand: {progress.correct} richtig, {progress.wrong} falsch.</p>
    </div>
  );
}

function QuestionCard({ q, answer, isCorrect, submit, next }: { q: Question; answer: string | null; isCorrect: boolean; submit: (a: string) => void; next: () => void }) {
  return (
    <Card>
      <div className="mb-3 flex flex-wrap gap-2"><Pill>{q.type}</Pill><Pill>{q.difficulty}</Pill><Pill>Aufgabe: {q.examRelevance}</Pill></div>
      <h3 className="mb-4 text-xl font-black">{q.question}</h3>
      <div className="grid gap-2">
        {(q.options ?? []).map((opt) => (
          <button disabled={Boolean(answer)} key={opt} onClick={() => submit(opt)} className={`rounded-lg border p-3 text-left font-semibold transition ${answer === opt ? (isCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-rose-500 bg-rose-50 text-rose-800") : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"}`}>
            {opt}
          </button>
        ))}
      </div>
      {answer && (
        <div className={`mt-4 rounded-lg p-4 ${isCorrect ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100" : "bg-rose-50 text-rose-900 dark:bg-rose-950 dark:text-rose-100"}`}>
          <b>{isCorrect ? "Richtig." : "Noch nicht."}</b> {q.explanation}
          <div className="mt-3"><button onClick={next} className="rounded-lg bg-slate-950 px-4 py-2 font-bold text-white dark:bg-white dark:text-slate-950">NÃ¤chste Frage</button></div>
        </div>
      )}
    </Card>
  );
}

function ExamMode({ setProgress }: { progress: ProgressState; setProgress: React.Dispatch<React.SetStateAction<ProgressState>> }) {
  const [minutes, setMinutes] = useState(30);
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(30 * 60);
  const [open, setOpen] = useState<string | null>(null);
  const [paper, setPaper] = useState<ExamTask[]>(() => generateRandomExam());
  const [exportVisible, setExportVisible] = useState(false);
  const exportText = buildExamExport(paper);
  useEffect(() => {
    if (!started || seconds <= 0) return;
    const id = window.setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearInterval(id);
  }, [started, seconds]);
  function start(value: number) {
    setMinutes(value); setSeconds(value * 60); setStarted(true);
  }
  function finish() {
    setStarted(false);
    setExportVisible(true);
    setProgress((old) => ({ ...old, xp: old.xp + 40, solved: old.solved + 8 }));
  }
  function resetExam() {
    setPaper(generateRandomExam());
    setOpen(null);
    setExportVisible(false);
    setStarted(false);
    setSeconds(minutes * 60);
  }
  return (
    <div className="space-y-4">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><h3 className="text-xl font-black">Random-Klausurmodus</h3><p className="text-slate-600 dark:text-slate-300">Reset erzeugt eine neue 8-Aufgaben-Klausur. Nach Abgabe kannst du alles als Text exportieren.</p></div>
          <div className="text-3xl font-black">{String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}</div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[30, 60, 90].map((m) => <button key={m} onClick={() => start(m)} className={`rounded-lg px-4 py-2 font-bold ${minutes === m && started ? "bg-sky-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}>{m} Minuten</button>)}
          <button onClick={resetExam} className="rounded-lg bg-slate-200 px-4 py-2 font-bold text-slate-900 dark:bg-slate-800 dark:text-slate-100">Reset: neue Klausur</button>
          <button onClick={finish} className="rounded-lg bg-emerald-600 px-4 py-2 font-bold text-white">Abgeben</button>
        </div>
      </Card>
      <div className="grid gap-4">
        {paper.map((task) => (
          <Card key={task.id}>
            <button onClick={() => setOpen(open === task.id ? null : task.id)} className="flex w-full items-center justify-between text-left">
              <span className="text-lg font-black">{task.title}</span><Pill>{task.points} Punkte</Pill>
            </button>
            <p className="mt-2 text-slate-700 dark:text-slate-300">{task.prompt}</p>
            {open === task.id && <div className="mt-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-900"><b>MusterlÃ¶sung:</b><p>{task.solution}</p><b className="mt-3 block">Bewertung:</b><p>{task.grading.join(" | ")}</p><b className="mt-3 block">Typische Fehler:</b><p>{task.commonErrors.join(" | ")}</p></div>}
          </Card>
        ))}
      </div>
      {exportVisible && (
        <Card>
          <h3 className="text-xl font-black">Export fuer ChatGPT-Korrektur</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Diesen Text kannst du in ChatGPT hochladen/einfuegen und deine Antworten darunter schreiben lassen.</p>
          <textarea readOnly value={exportText} className="mt-4 min-h-[320px] w-full rounded-lg border border-slate-300 bg-white p-3 font-mono text-sm dark:border-slate-700 dark:bg-slate-900" />
          <button onClick={() => navigator.clipboard?.writeText(exportText)} className="mt-3 rounded-lg bg-sky-600 px-4 py-2 font-bold text-white">Exporttext kopieren</button>
        </Card>
      )}
    </div>
  );
}

function generateRandomExam(): ExamTask[] {
  const definitionPool = ["Geschaeftsprozess", "Geschaeftsprozessmodell", "Geschaeftsprozessmanagement", "Workflow", "Prozesslandkarte", "Eventlog", "Trace", "Workflownetz", "Prozesskostensatz"];
  const pickedDefinitions = shuffle(definitionPool).slice(0, 4);
  const total = randomFrom([96000, 120000, 144000, 180000]);
  const fixed = randomFrom([18000, 24000, 30000, 42000]);
  const quantity = randomFrom([6000, 8000, 9000, 12000]);
  const productA = randomFrom([450, 600, 750, 900]);
  const productB = randomFrom([1100, 1400, 1800, 2200]);
  const value = randomFrom([650000, 800000, 950000, 1200000]);
  const pre = randomFrom([320000, 500000, 610000, 760000]);
  const bpmnCase = randomFrom([
    "Reklamation mit fehlenden Angaben, Nachforderung, Ersatz oder Ablehnung",
    "Stornierung einer Bestellung mit Pruefung, ob die Ware bereits versendet wurde",
    "Supportanfrage mit Rueckfrage, Loesungsvorschlag und Eskalation bei Ablehnung",
    "Ruecksendung mit Eingangspruefung, Erstattung oder Rueckfrage",
  ]);
  const miningLog = randomFrom([
    "C1 A,B,C; C2 A,C,B; C3 A,B,C",
    "C1 A,B,D; C2 A,C,D; C3 A,B,C,D",
    "C1 Start,Pruefen,Freigeben,Ende; C2 Start,Pruefen,Ablehnen,Ende",
  ]);

  return [
    {
      ...examTasks[0],
      id: `a1-${Date.now()}`,
      prompt: `Definieren Sie kurz und klausurtauglich: ${pickedDefinitions.join(", ")}.`,
      solution: "Nenne pro Begriff eine einfache Erklaerung, eine fachliche Abgrenzung und wenn moeglich ein Beispiel. Wichtig: Prozess ist wiederholbar, Projekt einmalig, Workflow IT-gestuetzt, Eventlog mindestens Case ID + Activity + Timestamp.",
    },
    {
      ...examTasks[1],
      id: `a2-${Date.now()}`,
      prompt: randomFrom([
        "Ein Unternehmen modelliert direkt einen Soll-Prozess, ohne den Ist-Prozess aufzunehmen. Welche GPM-Phasen fehlen oder sind fehlerhaft?",
        "Nach einer Beschwerde wird sofort automatisiert. Erst danach werden Kennzahlen erhoben. Analysieren Sie den Fehler im GPM-Lebenszyklus.",
        "Ein Prozess wird identifiziert und eingefuehrt, aber nie ueberwacht. Erklaeren Sie die fehlende Phase und die Folge.",
      ]),
    },
    {
      ...examTasks[2],
      id: `a3-${Date.now()}`,
      prompt: randomFrom([
        "Ordnen Sie fuer einen Online-Shop zu: Bestellabwicklung, Personalverwaltung, Strategieplanung.",
        "Ordnen Sie fuer eine Bank zu: Kreditvergabe, IT-Betrieb, Risikostrategie.",
        "Ordnen Sie fuer einen IT-Dienstleister zu: Softwareentwicklung fuer Kunden, Buchhaltung, Unternehmensplanung.",
      ]),
    },
    {
      ...examTasks[3],
      id: `a4-${Date.now()}`,
      prompt: `Gesamtkosten ${total.toLocaleString("de-DE")}, Fixkosten ${fixed.toLocaleString("de-DE")}, Massgroesse ${quantity.toLocaleString("de-DE")} Vorgaenge. Produkt A nutzt ${productA}, Produkt B nutzt ${productB} Vorgaenge. Berechnen Sie variable Prozesskosten, variablen Prozesskostensatz und variable Prozesskosten je Produkt.`,
      solution: `Variable Prozesskosten = ${total.toLocaleString("de-DE")} - ${fixed.toLocaleString("de-DE")} = ${(total - fixed).toLocaleString("de-DE")}. Prozesskostensatz = ${(total - fixed).toLocaleString("de-DE")} / ${quantity.toLocaleString("de-DE")} = ${((total - fixed) / quantity).toFixed(2)}. Produkt A: ${(productA * ((total - fixed) / quantity)).toFixed(2)}. Produkt B: ${(productB * ((total - fixed) / quantity)).toFixed(2)}.`,
    },
    {
      ...examTasks[4],
      id: `a5-${Date.now()}`,
      prompt: `Leistung ${value.toLocaleString("de-DE")}, Vorleistung ${pre.toLocaleString("de-DE")}. Berechnen Sie Wertschoepfung und Integrationsgrad. Erklaeren Sie ausserdem Rueckwaerts-, Vorwaerts- und horizontale Integration.`,
      solution: `Wertschoepfung = ${(value - pre).toLocaleString("de-DE")}. Integrationsgrad = Wertschoepfung / Leistung = ${(((value - pre) / value) * 100).toFixed(1)} Prozent. Rueckwaerts Richtung Lieferant, vorwaerts Richtung Kunde, horizontal gleiche Marktstufe/Wettbewerber.`,
    },
    {
      ...examTasks[5],
      id: `a6-${Date.now()}`,
      prompt: randomFrom([
        "Petrinetz: p1 hat ein Token. t1: p1 -> p2,p3. t2: p2 -> p4. t3: p3 -> p4. Bestimmen Sie aktivierte Transitionen, erreichbare Markierungen und Sicherheit.",
        "Petrinetz: p1 und p2 haben je ein Token. t1 braucht p1 und p2 und erzeugt p3. t2: p3 -> p1. Pruefen Sie Aktivierung, Feuerfolge und Deadlockfreiheit.",
        "Petrinetz mit Konflikt: p1 hat ein Token. t1: p1 -> p2, t2: p1 -> p3. Welche Transitionen sind aktiviert und was bedeutet der Konflikt?",
      ]),
    },
    {
      ...examTasks[6],
      id: `a7-${Date.now()}`,
      prompt: `Modellieren Sie in BPMN mit getrennten Pools fuer Kunde und Unternehmen: ${bpmnCase}. Achten Sie auf Nachrichtenfluesse, XOR-Gateways, Schleifen und klare Tasknamen.`,
      solution: "Muster: Kunde und Unternehmen als getrennte Pools. Sequenzfluss nur innerhalb eines Pools. Nachrichtenfluss zwischen Pools. Entscheidungen mit XOR, parallele Teile mit AND. Fehlende Angaben oder Ablehnung sauber als Schleife/Rueckmeldung modellieren.",
    },
    {
      ...examTasks[7],
      id: `a8-${Date.now()}`,
      prompt: `Eventlog: ${miningLog}. Bilden Sie Traces, zaehlen Sie Varianten und bestimmen Sie zentrale Footprint-Beziehungen.`,
      solution: "Gruppiere zuerst nach Case ID, sortiere nach Timestamp/Reihenfolge, schreibe je Case den Trace. Gleiche Traces sind Varianten. Fuer Footprint: a > b direkte Folge, a -> b wenn a > b und nicht b > a, a || b wenn beide Richtungen vorkommen, a # b wenn keine direkte Beziehung vorkommt.",
    },
  ];
}

function buildExamExport(tasks: ExamTask[]) {
  return [
    "Bitte korrigiere meine Klausurantworten streng, aber lernfreundlich.",
    "Bewerte jede Aufgabe mit Punkten, nenne fehlende Fachbegriffe, typische Fehler und eine bessere Musterantwort.",
    "",
    ...tasks.map((task, index) => [
      `AUFGABE ${index + 1}: ${task.title} (${task.points} Punkte)`,
      task.prompt,
      "",
      "MEINE ANTWORT:",
      "",
      "KORREKTUR:",
      "",
    ].join("\n")),
  ].join("\n");
}

function randomFrom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function CostCalculator({ markTopic }: { markTopic: (topic: TopicId, delta: number) => void }) {
  const [total, setTotal] = useState(120000);
  const [fixed, setFixed] = useState(30000);
  const [quantity, setQuantity] = useState(9000);
  const [product, setProduct] = useState(600);
  const variable = Math.max(0, total - fixed);
  const rate = quantity ? variable / quantity : 0;
  const productCost = product * rate;
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      <Card>
        <h3 className="mb-4 text-xl font-black">Interaktiver Prozesskostenrechner</h3>
        {[["Gesamtkosten", total, setTotal], ["Fixkosten", fixed, setFixed], ["Gesamtmenge MaÃŸgrÃ¶ÃŸe", quantity, setQuantity], ["Produktmenge", product, setProduct]].map(([label, value, setter]) => (
          <label key={label as string} className="mb-3 block text-sm font-bold">{label as string}<input type="number" value={value as number} onChange={(e) => (setter as React.Dispatch<React.SetStateAction<number>>)(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" /></label>
        ))}
        <button onClick={() => markTopic("kosten", 12)} className="rounded-lg bg-orange-600 px-4 py-2 font-bold text-white">Rechnung kontrolliert</button>
      </Card>
      <Card>
        <h3 className="mb-4 text-xl font-black">LÃ¶sungsweg</h3>
        <ol className="space-y-3">
          <li><b>1. Variable Kosten:</b> {total} - {fixed} = {variable.toLocaleString("de-DE")}</li>
          <li><b>2. Variabler Prozesskostensatz:</b> {variable.toLocaleString("de-DE")} / {quantity} = {rate.toFixed(2)}</li>
          <li><b>3. Produktkosten:</b> {product} Ã— {rate.toFixed(2)} = {productCost.toFixed(2)}</li>
        </ol>
        <p className="mt-4 rounded-lg bg-orange-50 p-3 text-orange-900 dark:bg-orange-950 dark:text-orange-100">Klausurformel: variable Prozesskosten / Gesamtmenge der MaÃŸgrÃ¶ÃŸe.</p>
      </Card>
    </div>
  );
}

function BpmnTrainer({ markTopic }: { markTopic: (topic: TopicId, delta: number) => void }) {
  const steps = ["Start: Reklamation erhalten", "Task: VollstÃ¤ndigkeit prÃ¼fen", "XOR: Angaben vollstÃ¤ndig?", "Task: Angaben nachfordern", "Task: Anspruch prÃ¼fen", "XOR: Ersatz oder Ablehnung", "Ende: RÃ¼ckmeldung gesendet"];
  const [selected, setSelected] = useState<string[]>([]);
  const correct = selected.join("|") === steps.join("|");
  return (
    <Card>
      <h3 className="text-xl font-black">BPMN-Trainer: Reklamation</h3>
      <div className="my-4 grid gap-3 md:grid-cols-3">
        {["Start Event", "Task", "XOR Gateway", "Nachrichtenfluss", "Pool Kunde", "Pool Unternehmen"].map((x) => <div key={x} className="rounded-lg border border-sky-200 bg-sky-50 p-3 text-center font-bold text-sky-900 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-100">{x}</div>)}
      </div>
      <p className="mb-3 text-slate-600 dark:text-slate-300">Klicke die Bausteine in sinnvoller Reihenfolge an. Doppelklick/erneuter Klick entfernt.</p>
      <div className="grid gap-2 md:grid-cols-2">
        {steps.map((s) => <button key={s} onClick={() => setSelected((old) => old.includes(s) ? old.filter((v) => v !== s) : [...old, s])} className={`rounded-lg border p-3 text-left ${selected.includes(s) ? "border-sky-500 bg-sky-50 text-sky-800" : "border-slate-200 dark:border-slate-800"}`}>{s}</button>)}
      </div>
      <div className="mt-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-900">Deine Reihenfolge: {selected.join(" â†’ ") || "noch leer"}</div>
      <button onClick={() => { if (correct) markTopic("bpmn", 15); }} className="mt-3 rounded-lg bg-sky-600 px-4 py-2 font-bold text-white">{correct ? "Richtig: Mastery erhÃ¶hen" : "PrÃ¼fen"}</button>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Merke: Kunde und Unternehmen in separaten Pools; Kommunikation per Nachrichtenfluss, Ablauf im Pool per Sequenzfluss.</p>
    </Card>
  );
}

function PetriTrainer({ markTopic }: { markTopic: (topic: TopicId, delta: number) => void }) {
  const [tokens, setTokens] = useState({ p1: 1, p2: 0, p3: 0, p4: 0 });
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceAnswer, setPracticeAnswer] = useState<string | null>(null);
  const enabled = { t1: tokens.p1 > 0, t2: tokens.p2 > 0, t3: tokens.p3 > 0 };
  const petriTasks = [
    {
      title: "Aktivierte Transitionen",
      prompt: "M0 = (p1=1, p2=0, p3=0, p4=0). Welche Transition ist aktiviert?",
      options: ["nur t1", "t1 und t2", "t2 und t3", "keine"],
      answer: "nur t1",
      explanation: "t1 braucht p1. t2 braucht p2, t3 braucht p3. Deshalb ist initial nur t1 aktiv.",
    },
    {
      title: "Nach t1 feuern",
      prompt: "t1 feuert von M0. Welche Markierung entsteht?",
      options: ["p1=0, p2=1, p3=1, p4=0", "p1=1, p2=1, p3=0, p4=0", "p1=0, p2=0, p3=0, p4=1", "p1=1, p2=0, p3=1, p4=1"],
      answer: "p1=0, p2=1, p3=1, p4=0",
      explanation: "t1 verbraucht ein Token aus p1 und erzeugt je ein Token in p2 und p3.",
    },
    {
      title: "ParallelitÃ¤t",
      prompt: "Nach t1 sind p2 und p3 markiert. Welche Aussage stimmt?",
      options: ["t2 und t3 sind beide aktiviert", "nur t2 ist aktiviert", "nur t3 ist aktiviert", "das Netz ist sofort im Deadlock"],
      answer: "t2 und t3 sind beide aktiviert",
      explanation: "t2 braucht p2, t3 braucht p3. Beide Bedingungen sind erfÃ¼llt.",
    },
    {
      title: "Sicherheit",
      prompt: "Wenn t2 und t3 beide nach t1 feuern und beide nach p4 fÃ¼hren: Ist das Netz sicher?",
      options: ["Nein, p4 kann 2 Token enthalten", "Ja, weil alle Transitionen nur einmal feuern", "Ja, weil p1 leer ist", "Nicht entscheidbar"],
      answer: "Nein, p4 kann 2 Token enthalten",
      explanation: "Sicher bedeutet 1-beschrÃ¤nkt. Zwei Token auf p4 verletzen Sicherheit.",
    },
    {
      title: "Deadlock",
      prompt: "Nach t1, t2 und t3 liegen nur noch 2 Token auf p4. Es gibt keine ausgehenden Transitionen. Was liegt vor?",
      options: ["Deadlock", "Lebendigkeit", "Konflikt", "XOR-Gateway"],
      answer: "Deadlock",
      explanation: "Wenn keine Transition mehr aktiviert ist, liegt ein Deadlock vor.",
    },
    {
      title: "k-BeschrÃ¤nktheit",
      prompt: "In allen erreichbaren Markierungen hat keine Stelle mehr als 2 Token. Wie lautet die kleinste passende Schranke?",
      options: ["2-beschrÃ¤nkt", "1-beschrÃ¤nkt", "unbeschrÃ¤nkt", "deadlockfrei"],
      answer: "2-beschrÃ¤nkt",
      explanation: "k ist die maximale Tokenzahl, die auf einer Stelle erreichbar ist.",
    },
    {
      title: "Konflikt",
      prompt: "p1 hat ein Token. t1 und t2 brauchen beide p1 als einzige Input-Stelle. Was ist das?",
      options: ["Konflikt", "ParallelitÃ¤t", "Sicherheit", "Workflownetz-Ende"],
      answer: "Konflikt",
      explanation: "Beide Transitionen konkurrieren um dasselbe Token.",
    },
    {
      title: "Lebendigkeit",
      prompt: "Welche Aussage beschreibt Lebendigkeit am besten?",
      options: ["Jede Transition kann irgendwann wieder aktiviert werden", "Es gibt genau einen Startplatz", "Nie mehr als ein Token pro Stelle", "Alle Transitionen feuern gleichzeitig"],
      answer: "Jede Transition kann irgendwann wieder aktiviert werden",
      explanation: "Lebendigkeit ist stÃ¤rker als Deadlockfreiheit.",
    },
    {
      title: "Workflownetz",
      prompt: "Was ist typisch fÃ¼r ein Workflownetz?",
      options: ["eindeutiger Start und eindeutiges Ende", "keine Token", "nur parallele Transitionen", "nur Tabellen statt Graphen"],
      answer: "eindeutiger Start und eindeutiges Ende",
      explanation: "Workflownetze modellieren Prozesse mit klarer Quelle und Senke.",
    },
    {
      title: "Erreichbarkeit",
      prompt: "Eine Markierung ist erreichbar, wenn ...",
      options: ["sie durch eine zulÃ¤ssige Feuerfolge aus M0 entsteht", "sie beliebig gezeichnet werden kann", "alle Stellen leer sind", "sie mehr Token als M0 hat"],
      answer: "sie durch eine zulÃ¤ssige Feuerfolge aus M0 entsteht",
      explanation: "Erreichbarkeit hÃ¤ngt immer von Startmarkierung und Feuerregeln ab.",
    },
  ];
  const currentTask = petriTasks[practiceIndex % petriTasks.length];
  function fire(t: "t1" | "t2" | "t3") {
    if (!enabled[t]) return;
    setTokens((m) => t === "t1" ? { ...m, p1: m.p1 - 1, p2: m.p2 + 1, p3: m.p3 + 1 } : t === "t2" ? { ...m, p2: m.p2 - 1, p4: m.p4 + 1 } : { ...m, p3: m.p3 - 1, p4: m.p4 + 1 });
  }
  const safe = Math.max(...Object.values(tokens)) <= 1;
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
      <Card>
        <h3 className="text-xl font-black">Petrinetze online: Simulator</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Erst selbst entscheiden, dann Transition klicken. Das ist genau die Klausurlogik.</p>
        <div className="my-5 grid grid-cols-4 gap-3 text-center">
          {Object.entries(tokens).map(([p, n]) => <div key={p} className="rounded-full border-4 border-violet-400 p-5"><b>{p}</b><p className="text-2xl font-black">{n}</p></div>)}
        </div>
        <div className="grid gap-2 sm:grid-cols-3">{(["t1", "t2", "t3"] as const).map((t) => <button key={t} disabled={!enabled[t]} onClick={() => fire(t)} className={`rounded-lg px-4 py-3 font-bold ${enabled[t] ? "bg-violet-600 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-800"}`}>{t} feuern {enabled[t] ? "" : "(nicht aktiv)"}</button>)}</div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Info title="Aktiviert" text={Object.entries(enabled).filter(([, v]) => v).map(([k]) => k).join(", ") || "keine Transition"} />
          <Info title="Sicher?" text={safe ? "Ja, aktuell hÃ¶chstens 1 Token pro Stelle." : "Nein, eine Stelle hat mehr als 1 Token."} />
          <Info title="Deadlock?" text={Object.values(enabled).some(Boolean) ? "Nein, mindestens eine Transition ist aktivierbar." : "Ja, aktuell feuert nichts mehr."} />
        </div>
        <div className="mt-3 flex flex-wrap gap-2"><button onClick={() => setTokens({ p1: 1, p2: 0, p3: 0, p4: 0 })} className="rounded-lg border px-4 py-2 font-bold dark:border-slate-700">Reset</button><button onClick={() => markTopic("petri", 15)} className="rounded-lg bg-violet-600 px-4 py-2 font-bold text-white">Analyse verstanden</button></div>
      </Card>
      <Card>
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-black">Petrinetz-Aufgaben</h3>
          <Pill>{practiceIndex + 1}/{petriTasks.length}</Pill>
        </div>
        <p className="mt-2 text-sm font-bold text-violet-700 dark:text-violet-300">{currentTask.title}</p>
        <p className="mt-3 text-lg font-black">{currentTask.prompt}</p>
        <div className="mt-4 grid gap-2">
          {currentTask.options.map((option) => (
            <button key={option} disabled={Boolean(practiceAnswer)} onClick={() => setPracticeAnswer(option)} className={`rounded-lg border p-3 text-left font-semibold ${practiceAnswer === option ? (option === currentTask.answer ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-rose-500 bg-rose-50 text-rose-800") : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"}`}>
              {option}
            </button>
          ))}
        </div>
        {practiceAnswer && (
          <div className="mt-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
            <b>{practiceAnswer === currentTask.answer ? "Richtig." : "Noch nicht."}</b> {currentTask.explanation}
            <button onClick={() => { setPracticeAnswer(null); setPracticeIndex((old) => old + 1); if (practiceAnswer === currentTask.answer) markTopic("petri", 4); }} className="mt-3 block rounded-lg bg-violet-600 px-4 py-2 font-bold text-white">NÃ¤chste Petrinetz-Aufgabe</button>
          </div>
        )}
      </Card>
    </div>
  );
}

function MiningTrainer({ markTopic }: { markTopic: (topic: TopicId, delta: number) => void }) {
  const log = [
    ["C1", "A", "10:00"], ["C1", "B", "10:05"], ["C1", "C", "10:10"],
    ["C2", "A", "11:00"], ["C2", "C", "11:04"], ["C2", "B", "11:08"],
    ["C3", "A", "12:00"], ["C3", "B", "12:03"], ["C3", "C", "12:09"],
  ];
  const [relation, setRelation] = useState("");
  const correct = relation === "B || C";
  return (
    <Card>
      <h3 className="text-xl font-black">Process-Mining-Trainer</h3>
      <div className="my-4 overflow-hidden rounded-lg border border-cyan-200 dark:border-cyan-900">
        <div className="grid grid-cols-3 bg-cyan-50 p-2 font-bold text-cyan-900 dark:bg-cyan-950 dark:text-cyan-100"><span>Case ID</span><span>Activity</span><span>Timestamp</span></div>
        {log.map((row, i) => <div key={i} className="grid grid-cols-3 border-t border-slate-200 p-2 text-sm dark:border-slate-800">{row.map((c) => <span key={c}>{c}</span>)}</div>)}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Info title="Traces" text="C1 <A,B,C>; C2 <A,C,B>; C3 <A,B,C>" />
        <Info title="Varianten" text="<A,B,C> kommt 2x vor; <A,C,B> kommt 1x vor." />
      </div>
      <p className="mt-4 font-bold">Welche Beziehung haben B und C?</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-4">{["B -> C", "C -> B", "B || C", "B # C"].map((r) => <button key={r} onClick={() => setRelation(r)} className={`rounded-lg border p-3 font-bold ${relation === r ? "border-cyan-500 bg-cyan-50 text-cyan-800" : "border-slate-200 dark:border-slate-800"}`}>{r}</button>)}</div>
      {relation && <p className="mt-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-900">{correct ? "Richtig: Beide direkten Folgen kommen vor, also ParallelitÃ¤t." : "PrÃ¼fe beide Richtungen: B > C und C > B kommen vor."}</p>}
      <button onClick={() => { if (correct) markTopic("mining", 15); }} className="mt-3 rounded-lg bg-cyan-600 px-4 py-2 font-bold text-white">Footprint speichern</button>
    </Card>
  );
}

function FormulaCollection() {
  return <div className="grid gap-4 md:grid-cols-2">{formulas.map((f) => <Card key={f.id}><Pill>{topics.find((t) => t.id === f.topic)?.title}</Pill><h3 className="mt-3 text-xl font-black">{f.name}</h3><p className="mt-2 rounded-lg bg-slate-100 p-3 font-mono text-sm dark:bg-slate-900">{f.formula}</p><p className="mt-3">{f.explanation}</p><p className="mt-2 text-sm text-slate-600 dark:text-slate-300"><b>Beispiel:</b> {f.example}</p><p className="mt-2 text-sm text-slate-600 dark:text-slate-300"><b>Klausur:</b> {f.examTask}</p></Card>)}</div>;
}

function ErrorTrainer({ progress, update }: { progress: ProgressState; update: (patch: Partial<ProgressState>) => void }) {
  return <div className="grid gap-4 md:grid-cols-2">{mistakes.map((m) => <Card key={m.id}><Pill>{topics.find((t) => t.id === m.topic)?.title}</Pill><h3 className="mt-3 text-lg font-black">{m.title}</h3><p className="mt-2 text-rose-700 dark:text-rose-300"><b>Falsch:</b> {m.wrong}</p><p className="mt-2 text-emerald-700 dark:text-emerald-300"><b>Richtig:</b> {m.correct}</p><p className="mt-2"><b>Korrekturanker:</b> {m.fix}</p><button onClick={() => update({ mistakes: Array.from(new Set([...progress.mistakes, m.id])) })} className="mt-3 rounded-lg bg-slate-950 px-4 py-2 font-bold text-white dark:bg-white dark:text-slate-950">In Fehlerliste merken</button></Card>)}</div>;
}

function Checklist({ progress, setProgress, readiness }: { progress: ProgressState; setProgress: React.Dispatch<React.SetStateAction<ProgressState>>; readiness: number }) {
  const done = checklistItems.filter((item) => progress.checklist[item]).length;
  return (
    <Card>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-xl font-black">PrÃ¼fungs-Checkliste</h3><p className="text-slate-600 dark:text-slate-300">{done}/{checklistItems.length} sicher. Readiness: {readiness}%.</p></div><ProgressBar value={(done / checklistItems.length) * 100} /></div>
      <div className="grid gap-2 md:grid-cols-2">
        {checklistItems.map((item) => <label key={item} className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 font-semibold dark:border-slate-800"><input type="checkbox" checked={Boolean(progress.checklist[item])} onChange={(e) => setProgress((old) => ({ ...old, checklist: { ...old.checklist, [item]: e.target.checked }, xp: old.xp + (e.target.checked ? 3 : 0) }))} />{item}</label>)}
      </div>
    </Card>
  );
}

function normalize(value: string | string[]) {
  return Array.isArray(value) ? value.join("|") : value.trim().toLowerCase();
}

function chunk<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

