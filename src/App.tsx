import { useEffect, useState } from "react";
import {
  GraduationCap,
  Moon,
  Sun,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import GuidedMode from "./components/GuidedMode/GuidedMode";
import ExamMode from "./components/ExamMode/ExamMode";
import { Card, Pill, ProgressBar, Stat } from "./components/UI/Card";
import { chapters } from "./data/chapters";
import {
  defaultProgress,
  loadProgress,
  markChapterDone,
  saveProgress,
} from "./utils/storage";
import type { ChapterId, ProgressState } from "./types";

type View = "guided" | "exam" | "progress";

const NAV: Array<{ id: View; label: string; Icon: typeof Sparkles; hint: string }> =
  [
    {
      id: "guided",
      label: "Geführter Modus",
      Icon: Sparkles,
      hint: "Kapitel 1-9 mit Theorie, Visualisierung, Trainer, Quiz, Übungen.",
    },
    {
      id: "exam",
      label: "Klausurmodus",
      Icon: Target,
      hint: "Randomisierte 8-Aufgaben-Klausur mit Timer und Export.",
    },
    {
      id: "progress",
      label: "Fortschritt",
      Icon: TrendingUp,
      hint: "Statistiken, Mastery, Reset.",
    },
  ];

export default function App() {
  const [view, setView] = useState<View>("guided");
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());

  useEffect(() => saveProgress(progress), [progress]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", progress.theme === "dark");
  }, [progress.theme]);

  function toggleTheme() {
    setProgress((p) => ({ ...p, theme: p.theme === "dark" ? "light" : "dark" }));
  }

  function completeChapter(id: ChapterId) {
    setProgress((p) => markChapterDone(p, id));
  }

  const overall =
    chapters.reduce(
      (sum, c) => sum + (progress.chapterProgress[c.id] ?? 0),
      0,
    ) / chapters.length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-brand-600 p-2 text-white">
              <GraduationCap size={22} />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-wide text-brand-600 dark:text-brand-300">
                Digitale Geschäftsprozesse
              </p>
              <h1 className="text-lg font-black">DGP Klausurtrainer</h1>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-1">
            {NAV.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition ${
                  view === id
                    ? "bg-brand-600 text-white"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Pill tone="brand">
              <Sparkles size={12} className="mr-1 inline" />
              {progress.xp} XP
            </Pill>
            <Pill tone="emerald">{Math.round(overall)}% Mastery</Pill>
            <button
              aria-label="Theme wechseln"
              onClick={toggleTheme}
              className="rounded-lg border border-slate-200 p-2 dark:border-slate-700"
            >
              {progress.theme === "dark" ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-5">
        {view === "guided" && (
          <GuidedMode
            progress={progress}
            onProgressChange={setProgress}
            onCompleteChapter={completeChapter}
            onJumpToExam={() => setView("exam")}
          />
        )}
        {view === "exam" && (
          <ExamMode progress={progress} onProgressChange={setProgress} />
        )}
        {view === "progress" && (
          <ProgressView progress={progress} setProgress={setProgress} overall={overall} />
        )}
      </main>

      <footer className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-slate-500">
        DGP Klausurtrainer v2 · Geführter Lernkurs + Klausurmodus
      </footer>
    </div>
  );
}

function ProgressView({
  progress,
  setProgress,
  overall,
}: {
  progress: ProgressState;
  setProgress: (p: ProgressState) => void;
  overall: number;
}) {
  return (
    <div className="space-y-5">
      <Card>
        <h2 className="text-2xl font-black">Dein Fortschritt</h2>
        <p className="mt-1 text-sm text-slate-500">
          Daten werden lokal im Browser gespeichert (kein Server).
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Gesamtfortschritt" value={`${Math.round(overall)} %`} />
          <Stat
            label="Mini-Checks"
            value={`${progress.miniCheckScore.right}✓ / ${progress.miniCheckScore.wrong}✗`}
          />
          <Stat
            label="Quiz"
            value={`${progress.quizScore.right}✓ / ${progress.quizScore.wrong}✗`}
          />
          <Stat label="Klausuren generiert" value={progress.examsTaken} />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Petri-Trainer Runs" value={progress.petriRuns} />
          <Stat label="PKR-Trainer Runs" value={progress.pkrRuns} />
          <Stat label="Mining-Trainer Runs" value={progress.miningRuns} />
          <Stat label="BPMN-Trainer Runs" value={progress.bpmnRuns} />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-black">Mastery pro Kapitel</h3>
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {chapters.map((c) => {
            const v = progress.chapterProgress[c.id] ?? 0;
            const done = progress.completedChapters.includes(c.id);
            return (
              <div
                key={c.id}
                className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">
                    {c.number}. {c.title}
                  </span>
                  <Pill tone={done ? "emerald" : "slate"}>
                    {done ? "abgeschlossen" : `${v}%`}
                  </Pill>
                </div>
                <div className="mt-2">
                  <ProgressBar value={v} tone={done ? "emerald" : "brand"} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-black">Reset</h3>
        <p className="mt-1 text-sm text-slate-500">
          Setzt nur den Lernfortschritt zurück, keine Inhalte.
        </p>
        <button
          onClick={() => {
            if (confirm("Wirklich alles zurücksetzen?")) {
              setProgress({ ...defaultProgress, theme: progress.theme });
            }
          }}
          className="mt-3 rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white hover:bg-rose-700"
        >
          Alles zurücksetzen
        </button>
      </Card>
    </div>
  );
}
