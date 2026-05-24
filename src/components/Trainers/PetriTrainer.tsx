import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Flame,
  Lightbulb,
  RotateCcw,
  Shuffle,
  Trophy,
  Zap,
} from "lucide-react";
import { petriNets } from "../../data/petriNets";
import {
  DRILL_EXERCISES_BY_NET,
  analyzeNet,
} from "../../data/petriDrill";
import type { DrillExercise, PetriNet, ProgressState } from "../../types";
import { Button, Callout, Card, Pill, ProgressBar } from "../UI/Card";

interface Marking {
  [placeId: string]: number;
}

function isEnabled(net: PetriNet, marking: Marking, transitionId: string): boolean {
  const inputs = net.arcs.filter((a) => a.to === transitionId);
  return inputs.every((a) => (marking[a.from] ?? 0) >= 1);
}

function fire(net: PetriNet, marking: Marking, transitionId: string): Marking {
  const next = { ...marking };
  for (const a of net.arcs.filter((arc) => arc.to === transitionId)) {
    next[a.from] = (next[a.from] ?? 0) - 1;
  }
  for (const a of net.arcs.filter((arc) => arc.from === transitionId)) {
    next[a.to] = (next[a.to] ?? 0) + 1;
  }
  return next;
}

interface Props {
  progress?: ProgressState;
  onProgressChange?: (p: ProgressState) => void;
  onRunCounted?: () => void;
}

export default function PetriTrainer({
  progress,
  onProgressChange,
  onRunCounted,
}: Props) {
  const [tab, setTab] = useState<"drill" | "sandbox">("drill");
  const [netId, setNetId] = useState(petriNets[0].id);
  const net = petriNets.find((n) => n.id === netId)!;

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Pill tone="violet">Petri-Trainer</Pill>
          <h3 className="mt-2 text-2xl font-black">Petrinetze interaktiv üben</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            <b>Drill:</b> geführte Mikro-Aufgaben mit Streak und „Mastery" – übe
            bis du es checkst. <b>Sandbox:</b> freier Token-Simulator.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={netId}
            onChange={(e) => setNetId(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold dark:border-slate-700 dark:bg-slate-900"
          >
            {petriNets.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name} ({n.difficulty})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800">
        <TabBtn current={tab} value="drill" onClick={setTab}>
          <Flame size={14} /> Drill
        </TabBtn>
        <TabBtn current={tab} value="sandbox" onClick={setTab}>
          <Shuffle size={14} /> Sandbox
        </TabBtn>
      </div>

      <div className="mt-4">
        {tab === "drill" ? (
          <DrillMode
            net={net}
            progress={progress}
            onProgressChange={onProgressChange}
            onRunCounted={onRunCounted}
          />
        ) : (
          <SandboxMode net={net} onRunCounted={onRunCounted} />
        )}
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
  current: string;
  value: "drill" | "sandbox";
  onClick: (v: "drill" | "sandbox") => void;
  children: React.ReactNode;
}) {
  const active = current === value;
  return (
    <button
      onClick={() => onClick(value)}
      className={`-mb-px inline-flex items-center gap-2 rounded-t-lg border-b-2 px-4 py-2 text-sm font-bold transition ${
        active
          ? "border-brand-500 text-brand-700 dark:text-brand-300"
          : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
      }`}
    >
      {children}
    </button>
  );
}

// ---------------- Drill mode ----------------

interface DrillState {
  queue: DrillExercise[];
  current: DrillExercise | null;
  feedback: { ok: boolean; explain: string } | null;
  selectedTransitions: string[];
  inputValue: string;
}

function DrillMode({
  net,
  progress,
  onProgressChange,
  onRunCounted,
}: {
  net: PetriNet;
  progress?: ProgressState;
  onProgressChange?: (p: ProgressState) => void;
  onRunCounted?: () => void;
}) {
  const exercises = DRILL_EXERCISES_BY_NET[net.id] ?? [];
  const [state, setState] = useState<DrillState>(() => ({
    queue: [...exercises],
    current: exercises[0] ?? null,
    feedback: null,
    selectedTransitions: [],
    inputValue: "",
  }));

  // Reset when net changes
  useEffect(() => {
    setState({
      queue: [...exercises],
      current: exercises[0] ?? null,
      feedback: null,
      selectedTransitions: [],
      inputValue: "",
    });
  }, [net.id, exercises]);

  const drill = progress?.petriDrill?.[net.id] ?? {
    right: 0,
    wrong: 0,
    streak: 0,
    mastered: false,
  };

  function recordResult(correct: boolean) {
    if (progress && onProgressChange) {
      const prev = progress.petriDrill?.[net.id] ?? {
        right: 0,
        wrong: 0,
        streak: 0,
        mastered: false,
      };
      const streak = correct ? prev.streak + 1 : 0;
      const mastered = streak >= 6 ? true : prev.mastered;
      onProgressChange({
        ...progress,
        petriDrill: {
          ...progress.petriDrill,
          [net.id]: {
            right: prev.right + (correct ? 1 : 0),
            wrong: prev.wrong + (correct ? 0 : 1),
            streak,
            mastered,
          },
        },
        xp: progress.xp + (correct ? 3 : 0),
      });
    }
    onRunCounted?.();
  }

  function next(correct: boolean) {
    setState((s) => {
      const queue = [...s.queue];
      const current = queue.shift();
      // Falsche zurück ans Ende
      if (current && !correct) queue.push(current);
      const nextEx = queue[0] ?? exercises[0];
      return {
        queue,
        current: nextEx,
        feedback: null,
        selectedTransitions: [],
        inputValue: "",
      };
    });
  }

  function submitSelectTransitions() {
    if (!state.current) return;
    const expected = (state.current.expected as string[]) ?? [];
    const selected = state.selectedTransitions;
    const correct =
      expected.length === selected.length &&
      expected.every((e) => selected.includes(e));
    setState((s) => ({
      ...s,
      feedback: { ok: correct, explain: state.current!.explain },
    }));
    recordResult(correct);
  }

  function submitText() {
    if (!state.current) return;
    const expected = String(state.current.expected).trim();
    const got = state.inputValue.trim();
    const correct = expected.replace(/\s+/g, "") === got.replace(/\s+/g, "");
    setState((s) => ({
      ...s,
      feedback: { ok: correct, explain: state.current!.explain },
    }));
    recordResult(correct);
  }

  function submitChoice(choice: string) {
    if (!state.current) return;
    const correct = choice === state.current.expected;
    setState((s) => ({
      ...s,
      feedback: { ok: correct, explain: state.current!.explain },
    }));
    recordResult(correct);
  }

  const total = exercises.length;
  const remaining = state.queue.length;
  const progressPct = total > 0 ? Math.round(((total - remaining) / total) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Streak"
          value={`${drill.streak} / 6`}
          tone={drill.streak >= 6 ? "emerald" : drill.streak >= 3 ? "amber" : "slate"}
          icon={<Flame size={18} />}
        />
        <StatCard
          label="Richtig / Falsch"
          value={`${drill.right} ✓ / ${drill.wrong} ✗`}
          tone={drill.right > drill.wrong ? "emerald" : "rose"}
        />
        <StatCard
          label={drill.mastered ? "Mastered" : "Fortschritt"}
          value={drill.mastered ? "✓ Netz beherrscht" : `${progressPct}%`}
          tone={drill.mastered ? "emerald" : "brand"}
          icon={drill.mastered ? <Trophy size={18} /> : undefined}
        />
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
        <p className="px-1 pb-2 text-xs text-slate-600 dark:text-slate-300">
          {net.description}
        </p>
        <PetriCanvas
          net={net}
          marking={initialMarkingFromNet(net)}
          enabled={[]}
          highlight={state.selectedTransitions}
          onTransitionClick={(tid) => {
            if (state.current?.kind === "select-enabled-transitions") {
              setState((s) => ({
                ...s,
                selectedTransitions: s.selectedTransitions.includes(tid)
                  ? s.selectedTransitions.filter((x) => x !== tid)
                  : [...s.selectedTransitions, tid],
              }));
            }
          }}
        />
      </div>

      {state.current ? (
        <Card padding="p-4" className="!border-brand-200 dark:!border-brand-900">
          <div className="flex items-center justify-between">
            <Pill tone="brand">Aufgabe {total - remaining + 1} / {total}</Pill>
            <Button variant="ghost" size="sm" onClick={() => next(false)}>
              <RotateCcw size={14} /> überspringen
            </Button>
          </div>
          <p className="mt-3 text-base font-bold">{state.current.prompt}</p>

          <div className="mt-3">
            {state.current.kind === "select-enabled-transitions" && (
              <div className="space-y-2">
                <p className="text-xs text-slate-500">
                  Klicke die Transitionen direkt im Netz oben, oder nutze die Liste:
                </p>
                <div className="flex flex-wrap gap-2">
                  {net.transitions.map((t) => {
                    const sel = state.selectedTransitions.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        onClick={() =>
                          setState((s) => ({
                            ...s,
                            selectedTransitions: sel
                              ? s.selectedTransitions.filter((x) => x !== t.id)
                              : [...s.selectedTransitions, t.id],
                          }))
                        }
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          sel
                            ? "bg-brand-600 text-white"
                            : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
                {!state.feedback && (
                  <Button onClick={submitSelectTransitions}>
                    <CheckCircle2 size={16} /> Antwort prüfen
                  </Button>
                )}
              </div>
            )}

            {(state.current.kind === "is-safe" ||
              state.current.kind === "is-deadlockfree" ||
              state.current.kind === "is-live") && (
              <div className="flex gap-2">
                {(state.current.options ?? ["Ja", "Nein"]).map((opt) => (
                  <Button
                    key={opt}
                    variant="secondary"
                    onClick={() => submitChoice(opt)}
                    disabled={!!state.feedback}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            )}

            {(state.current.kind === "marking-after-fire" ||
              state.current.kind === "is-bounded" ||
              state.current.kind === "fire-count" ||
              state.current.kind === "reachable-marking-count") && (
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  value={state.inputValue}
                  onChange={(e) =>
                    setState((s) => ({ ...s, inputValue: e.target.value }))
                  }
                  placeholder={
                    state.current.kind === "marking-after-fire"
                      ? "z.B. 0,1,1,0"
                      : "Zahl"
                  }
                  className="rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
                />
                {!state.feedback && (
                  <Button onClick={submitText}>
                    <CheckCircle2 size={16} /> Prüfen
                  </Button>
                )}
              </div>
            )}
          </div>

          {state.feedback && (
            <div className="mt-3">
              <Callout
                tone={state.feedback.ok ? "emerald" : "rose"}
                title={state.feedback.ok ? "Richtig!" : "Nicht ganz."}
              >
                <p>{state.feedback.explain}</p>
                <p className="mt-2 text-xs italic">
                  <Lightbulb size={12} className="inline mr-1" />
                  Falsche Aufgaben kommen zurück in die Queue.
                </p>
              </Callout>
              <div className="mt-2">
                <Button onClick={() => next(state.feedback!.ok)} variant="primary">
                  Nächste Aufgabe →
                </Button>
              </div>
            </div>
          )}
        </Card>
      ) : (
        <Callout tone="emerald" title="Drill abgeschlossen">
          Alle Aufgaben für dieses Netz sind durch. Wähle ein anderes Netz oben.
        </Callout>
      )}

      <div className="text-xs text-slate-500">
        Streak-Regel: bei einer falschen Antwort wird der Streak zurückgesetzt.
        Bei 6 Richtigen in Folge → Netz gilt als „mastered".
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
  icon,
}: {
  label: string;
  value: string;
  tone: "slate" | "brand" | "emerald" | "amber" | "rose";
  icon?: React.ReactNode;
}) {
  const palette: Record<string, string> = {
    slate: "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900",
    brand: "border-brand-200 bg-brand-50 dark:border-brand-900 dark:bg-brand-950/40",
    emerald: "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30",
    amber: "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30",
    rose: "border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30",
  };
  return (
    <div className={`flex items-center justify-between rounded-lg border p-3 ${palette[tone]}`}>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300">
          {label}
        </p>
        <p className="mt-1 text-lg font-black">{value}</p>
      </div>
      {icon ? <div className="text-slate-500">{icon}</div> : null}
    </div>
  );
}

function initialMarkingFromNet(net: PetriNet): Marking {
  const m: Marking = {};
  net.places.forEach((p) => (m[p.id] = p.tokens));
  return m;
}

// ---------------- Sandbox mode ----------------

function SandboxMode({
  net,
  onRunCounted,
}: {
  net: PetriNet;
  onRunCounted?: () => void;
}) {
  const [marking, setMarking] = useState<Marking>(() => initialMarkingFromNet(net));
  const [history, setHistory] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    setMarking(initialMarkingFromNet(net));
    setHistory([]);
    setFeedback(null);
  }, [net.id]);

  const analysis = useMemo(() => analyzeNet(net), [net]);

  function attemptFire(tid: string) {
    if (isEnabled(net, marking, tid)) {
      const next = fire(net, marking, tid);
      setMarking(next);
      setHistory((h) => [...h, tid]);
      setFeedback(`Transition ${tid} hat gefeuert.`);
      onRunCounted?.();
    } else {
      const reasons = net.arcs
        .filter((a) => a.to === tid)
        .filter((a) => (marking[a.from] ?? 0) < 1)
        .map((a) => a.from);
      setFeedback(
        `Nicht aktiviert: Eingangsstelle(n) ${reasons.join(", ")} hat/haben kein Token.`,
      );
    }
  }

  function reset() {
    setMarking(initialMarkingFromNet(net));
    setHistory([]);
    setFeedback(null);
  }

  const enabled = net.transitions.filter((t) => isEnabled(net, marking, t.id));

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900">
        <p className="px-2 pt-1 text-xs text-slate-600 dark:text-slate-300">
          {net.description}
        </p>
        <PetriCanvas
          net={net}
          marking={marking}
          enabled={enabled.map((t) => t.id)}
          onTransitionClick={attemptFire}
        />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">
            Markierung
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {net.places.map((p) => (
              <span
                key={p.id}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-100"
              >
                {p.label}: {marking[p.id] ?? 0}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs font-black uppercase tracking-wide text-slate-500">
            Aktivierte Transitionen
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {enabled.length === 0 ? (
              <Pill tone="rose">Deadlock</Pill>
            ) : (
              enabled.map((t) => (
                <button
                  key={t.id}
                  onClick={() => attemptFire(t.id)}
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  <Zap size={12} /> {t.label}
                </button>
              ))
            )}
          </div>
          <p className="mt-3 text-xs font-black uppercase tracking-wide text-slate-500">
            Feuerfolge
          </p>
          <p className="mt-1 rounded bg-slate-100 px-3 py-2 font-mono text-xs dark:bg-slate-900">
            {history.length === 0 ? "(noch nichts)" : history.join(" → ")}
          </p>
          <Button variant="secondary" className="mt-3" onClick={reset}>
            <RotateCcw size={14} /> Reset
          </Button>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">
            Eigenschaften
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Erreichbare Markierungen: <b>{analysis.reachable.length}</b></li>
            <li>k = <b>{analysis.k}</b> {analysis.isSafe ? "(sicher)" : ""}</li>
            <li>Deadlockfrei: <b>{analysis.isDeadlockFree ? "Ja" : "Nein"}</b></li>
            <li>Lebendig: <b>{analysis.isLive ? "Ja" : "Nein"}</b></li>
            {analysis.conflictPlaces.length > 0 && (
              <li>Konflikt-Stellen: <b>{analysis.conflictPlaces.join(", ")}</b></li>
            )}
          </ul>
          {feedback && (
            <Callout
              tone={feedback.includes("Nicht") ? "rose" : "emerald"}
              title="Status"
            >
              {feedback}
            </Callout>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------- SVG canvas ----------------

function PetriCanvas({
  net,
  marking,
  enabled,
  highlight,
  onTransitionClick,
}: {
  net: PetriNet;
  marking: Marking;
  enabled: string[];
  highlight?: string[];
  onTransitionClick?: (tid: string) => void;
}) {
  const w = 600;
  const h = 240;
  const sx = (x: number) => 30 + (w - 60) * (x / 100);
  const sy = (y: number) => 30 + (h - 60) * (y / 100);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full">
      <defs>
        <marker
          id="petri-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 Z" className="fill-slate-700 dark:fill-slate-300" />
        </marker>
      </defs>
      {net.arcs.map((arc, i) => {
        const fromNode =
          net.places.find((p) => p.id === arc.from) ??
          net.transitions.find((t) => t.id === arc.from)!;
        const toNode =
          net.places.find((p) => p.id === arc.to) ??
          net.transitions.find((t) => t.id === arc.to)!;
        return (
          <line
            key={i}
            x1={sx(fromNode.x)}
            y1={sy(fromNode.y)}
            x2={sx(toNode.x)}
            y2={sy(toNode.y)}
            className="stroke-slate-500 dark:stroke-slate-400"
            strokeWidth={1.5}
            markerEnd="url(#petri-arrow)"
          />
        );
      })}
      {net.places.map((p) => {
        const tokens = marking[p.id] ?? 0;
        return (
          <g key={p.id}>
            <circle
              cx={sx(p.x)}
              cy={sy(p.y)}
              r={20}
              className="fill-white stroke-slate-700 dark:fill-slate-900 dark:stroke-slate-300"
              strokeWidth={2}
            />
            {tokens === 1 && (
              <motion.circle
                key={`${p.id}-1`}
                cx={sx(p.x)}
                cy={sy(p.y)}
                r={6}
                className="fill-slate-800 dark:fill-slate-200"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}
            {tokens > 1 && (
              <text
                x={sx(p.x)}
                y={sy(p.y) + 5}
                textAnchor="middle"
                className="fill-slate-800 text-sm font-bold dark:fill-slate-100"
              >
                {tokens}
              </text>
            )}
            <text
              x={sx(p.x)}
              y={sy(p.y) + 38}
              textAnchor="middle"
              className="fill-slate-700 text-xs font-bold dark:fill-slate-300"
            >
              {p.label}
            </text>
          </g>
        );
      })}
      {net.transitions.map((t) => {
        const isOn = enabled.includes(t.id);
        const isHighlighted = highlight?.includes(t.id);
        return (
          <g
            key={t.id}
            onClick={() => onTransitionClick?.(t.id)}
            className="cursor-pointer"
          >
            <rect
              x={sx(t.x) - 14}
              y={sy(t.y) - 14}
              width={28}
              height={28}
              className={
                isHighlighted
                  ? "fill-brand-500 stroke-brand-700"
                  : isOn
                    ? "fill-emerald-500 stroke-emerald-700"
                    : "fill-slate-400 stroke-slate-700 dark:fill-slate-600"
              }
              strokeWidth={2}
            />
            <text
              x={sx(t.x)}
              y={sy(t.y) + 36}
              textAnchor="middle"
              className="fill-slate-700 text-xs font-bold dark:fill-slate-300"
            >
              {t.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
