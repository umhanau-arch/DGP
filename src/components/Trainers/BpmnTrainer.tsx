import { useEffect, useState } from "react";
import { ArrowDownUp, RefreshCw } from "lucide-react";
import {
  bpmnSymbolTasks,
  bpmnFlowTasks,
  bpmnOrderTasks,
  bpmnCaseTasks,
} from "../../data/bpmnTasks";
import { Button, Callout, Card, Pill } from "../UI/Card";

type Tab = "symbols" | "flow" | "order" | "case";

export default function BpmnTrainer({
  onRunCounted,
}: {
  onRunCounted?: () => void;
}) {
  const [tab, setTab] = useState<Tab>("symbols");
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Pill tone="sky">BPMN-Trainer</Pill>
          <h3 className="mt-2 text-2xl font-black flex items-center gap-2">
            <ArrowDownUp size={22} /> BPMN üben
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Symbole erkennen, Sequenz vs. Nachrichtenfluss, Reihenfolge sortieren,
            Modellierungs-Cases.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <TabBtn current={tab} value="symbols" onClick={setTab}>
            Symbole
          </TabBtn>
          <TabBtn current={tab} value="flow" onClick={setTab}>
            Sequenz/Nachricht
          </TabBtn>
          <TabBtn current={tab} value="order" onClick={setTab}>
            Reihenfolge
          </TabBtn>
          <TabBtn current={tab} value="case" onClick={setTab}>
            Modellierungs-Cases
          </TabBtn>
        </div>
      </div>

      <div className="mt-4">
        {tab === "symbols" && <SymbolQuiz onRunCounted={onRunCounted} />}
        {tab === "flow" && <FlowQuiz onRunCounted={onRunCounted} />}
        {tab === "order" && <OrderTraining onRunCounted={onRunCounted} />}
        {tab === "case" && <CaseStudies />}
      </div>
    </Card>
  );
}

function TabBtn({
  current,
  value,
  onClick,
  children,
}: {
  current: Tab;
  value: Tab;
  onClick: (t: Tab) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`rounded-lg border px-3 py-2 text-xs font-bold transition ${
        current === value
          ? "border-brand-500 bg-brand-50 text-brand-800 dark:bg-brand-900/40 dark:text-brand-100"
          : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
      }`}
    >
      {children}
    </button>
  );
}

function SymbolQuiz({ onRunCounted }: { onRunCounted?: () => void }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const task = bpmnSymbolTasks[index];

  function next() {
    setAnswer(null);
    setIndex((i) => (i + 1) % bpmnSymbolTasks.length);
    onRunCounted?.();
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">
        Frage {index + 1} von {bpmnSymbolTasks.length}
      </p>
      <p className="text-lg font-black">{task.prompt}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {task.options.map((opt, i) => {
          const isSelected = answer === i;
          const isCorrect = task.correctIndex === i;
          let cls =
            "border-slate-200 bg-white hover:border-brand-400 dark:border-slate-700 dark:bg-slate-900";
          if (answer !== null) {
            if (isCorrect)
              cls =
                "border-emerald-400 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100";
            else if (isSelected)
              cls =
                "border-rose-400 bg-rose-50 text-rose-900 dark:bg-rose-900/30 dark:text-rose-100";
          }
          return (
            <button
              key={opt}
              onClick={() => setAnswer(i)}
              disabled={answer !== null}
              className={`rounded-lg border p-3 text-left text-sm font-semibold transition ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {answer !== null && (
        <Callout
          tone={answer === task.correctIndex ? "emerald" : "rose"}
          title={answer === task.correctIndex ? "Richtig!" : "Nicht ganz"}
        >
          {task.explain}
        </Callout>
      )}
      <Button onClick={next}>Nächste Frage</Button>
    </div>
  );
}

function FlowQuiz({ onRunCounted }: { onRunCounted?: () => void }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<"sequence" | "message" | null>(null);
  const task = bpmnFlowTasks[index];

  function next() {
    setAnswer(null);
    setIndex((i) => (i + 1) % bpmnFlowTasks.length);
    onRunCounted?.();
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">
        Frage {index + 1} von {bpmnFlowTasks.length}
      </p>
      <p className="text-lg font-black">{task.prompt}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {(["sequence", "message"] as const).map((opt) => {
          const isSelected = answer === opt;
          const isCorrect = task.expected === opt;
          let cls =
            "border-slate-200 bg-white hover:border-brand-400 dark:border-slate-700 dark:bg-slate-900";
          if (answer !== null) {
            if (isCorrect)
              cls =
                "border-emerald-400 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100";
            else if (isSelected)
              cls =
                "border-rose-400 bg-rose-50 text-rose-900 dark:bg-rose-900/30 dark:text-rose-100";
          }
          return (
            <button
              key={opt}
              onClick={() => setAnswer(opt)}
              disabled={answer !== null}
              className={`rounded-lg border p-4 text-center text-sm font-bold transition ${cls}`}
            >
              {opt === "sequence"
                ? "Sequenzfluss (durchgezogen, im Pool)"
                : "Nachrichtenfluss (gestrichelt, zwischen Pools)"}
            </button>
          );
        })}
      </div>
      {answer !== null && (
        <Callout
          tone={answer === task.expected ? "emerald" : "rose"}
          title={answer === task.expected ? "Richtig!" : "Falsch"}
        >
          {task.explain}
        </Callout>
      )}
      <Button onClick={next}>Nächste Frage</Button>
    </div>
  );
}

function OrderTraining({ onRunCounted }: { onRunCounted?: () => void }) {
  const [index, setIndex] = useState(0);
  const task = bpmnOrderTasks[index];
  const [shuffled, setShuffled] = useState<string[]>(() =>
    shuffle(task.steps),
  );
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setShuffled(shuffle(task.steps));
    setRevealed(false);
  }, [index, task.steps]);

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= shuffled.length) return;
    const next = [...shuffled];
    [next[i], next[j]] = [next[j], next[i]];
    setShuffled(next);
  }

  function check() {
    setRevealed(true);
    onRunCounted?.();
  }

  function nextTask() {
    setIndex((i) => (i + 1) % bpmnOrderTasks.length);
  }

  const correctOrder = task.steps;
  return (
    <div className="space-y-3">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">
        Aufgabe {index + 1} von {bpmnOrderTasks.length}
      </p>
      <p className="text-base font-bold">{task.description}</p>
      <ol className="space-y-2">
        {shuffled.map((step, i) => {
          const expected = correctOrder[i];
          const ok = revealed && step === expected;
          const wrong = revealed && step !== expected;
          return (
            <li
              key={`${step}-${i}`}
              className={`flex items-center justify-between gap-2 rounded-lg border p-2 ${
                ok
                  ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30"
                  : wrong
                    ? "border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30"
                    : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-bold dark:bg-slate-700">
                  {i + 1}
                </span>
                <span className="text-sm">{step}</span>
              </span>
              <span className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => move(i, -1)}>
                  ↑
                </Button>
                <Button size="sm" variant="ghost" onClick={() => move(i, 1)}>
                  ↓
                </Button>
              </span>
            </li>
          );
        })}
      </ol>
      <div className="flex gap-2">
        <Button onClick={check}>Prüfen</Button>
        <Button variant="secondary" onClick={() => setShuffled(shuffle(task.steps))}>
          <RefreshCw size={14} /> Neu mischen
        </Button>
        <Button variant="secondary" onClick={nextTask}>
          Nächste Aufgabe
        </Button>
      </div>
      {revealed && (
        <Callout tone="brand" title="Lösung">
          <ol className="ml-5 list-decimal text-sm">
            {correctOrder.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <p className="mt-2 text-xs italic">{task.explain}</p>
        </Callout>
      )}
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function CaseStudies() {
  return (
    <div className="space-y-3">
      {bpmnCaseTasks.map((c) => (
        <details
          key={c.id}
          className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900"
        >
          <summary className="cursor-pointer text-base font-black">
            {c.title}
          </summary>
          <p className="mt-2 text-sm">{c.scenario}</p>
          <p className="mt-2 text-xs font-bold text-slate-500 uppercase tracking-wide">
            Pools
          </p>
          <ul className="ml-5 list-disc text-sm">
            {c.pools.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs font-bold text-slate-500 uppercase tracking-wide">
            Lösungsschritte
          </p>
          <ol className="ml-5 list-decimal text-sm">
            {c.solution.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
          <Callout tone="rose" title="Falle" >
            {c.trap}
          </Callout>
        </details>
      ))}
    </div>
  );
}
