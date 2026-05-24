import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Zap } from "lucide-react";
import { petriNets } from "../../data/petriNets";
import type { PetriNet } from "../../types";
import { Button, Callout, Card, Pill } from "../UI/Card";

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

function markingKey(marking: Marking, places: string[]): string {
  return places.map((p) => `${p}=${marking[p] ?? 0}`).join(",");
}

function buildReachabilityGraph(net: PetriNet) {
  const placeIds = net.places.map((p) => p.id);
  const initial: Marking = {};
  net.places.forEach((p) => {
    initial[p.id] = p.tokens;
  });

  const queue: Marking[] = [initial];
  const seen = new Map<string, Marking>();
  seen.set(markingKey(initial, placeIds), initial);
  const edges: Array<{ from: string; via: string; to: string }> = [];
  const limit = 200;
  let isBoundedKnown = true;
  let isLive = true;
  let isDeadlockFree = true;
  const transitionsFired = new Set<string>();

  while (queue.length && seen.size < limit) {
    const m = queue.shift()!;
    const key = markingKey(m, placeIds);
    let anyEnabled = false;
    for (const t of net.transitions) {
      if (isEnabled(net, m, t.id)) {
        anyEnabled = true;
        transitionsFired.add(t.id);
        const next = fire(net, m, t.id);
        const nextKey = markingKey(next, placeIds);
        edges.push({ from: key, via: t.id, to: nextKey });
        if (!seen.has(nextKey)) {
          // bounded-by-3 check (heuristic)
          for (const p of net.places) {
            if ((next[p.id] ?? 0) > 3) {
              isBoundedKnown = false;
            }
          }
          seen.set(nextKey, next);
          queue.push(next);
        }
      }
    }
    if (!anyEnabled) {
      isDeadlockFree = false;
    }
  }
  if (transitionsFired.size < net.transitions.length) {
    isLive = false;
  }

  const maxTokensPerPlace: Record<string, number> = {};
  for (const m of seen.values()) {
    for (const p of net.places) {
      maxTokensPerPlace[p.id] = Math.max(maxTokensPerPlace[p.id] ?? 0, m[p.id] ?? 0);
    }
  }
  const k = Math.max(...Object.values(maxTokensPerPlace));
  const isSafe = k === 1;

  return {
    states: Array.from(seen.values()),
    edges,
    isBoundedKnown,
    k,
    isSafe,
    isDeadlockFree,
    isLive,
    truncated: seen.size >= limit,
    deadTransitions: net.transitions
      .filter((t) => !transitionsFired.has(t.id))
      .map((t) => t.label),
  };
}

export default function PetriTrainer({
  onRunCounted,
}: {
  onRunCounted?: () => void;
}) {
  const [netId, setNetId] = useState(petriNets[0].id);
  const net = petriNets.find((n) => n.id === netId)!;
  const [marking, setMarking] = useState<Marking>(() => {
    const m: Marking = {};
    net.places.forEach((p) => (m[p.id] = p.tokens));
    return m;
  });
  const [history, setHistory] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const m: Marking = {};
    net.places.forEach((p) => (m[p.id] = p.tokens));
    setMarking(m);
    setHistory([]);
    setFeedback(null);
  }, [netId, net.places]);

  const reachability = useMemo(() => buildReachabilityGraph(net), [net]);

  function attemptFire(tid: string) {
    if (isEnabled(net, marking, tid)) {
      const next = fire(net, marking, tid);
      setMarking(next);
      setHistory((h) => [...h, tid]);
      setFeedback(`Transition ${net.transitions.find((t) => t.id === tid)?.label ?? tid} hat gefeuert.`);
      onRunCounted?.();
    } else {
      const reasons = net.arcs
        .filter((a) => a.to === tid)
        .filter((a) => (marking[a.from] ?? 0) < 1)
        .map((a) => a.from);
      setFeedback(
        `Nicht aktiviert: Eingangsstelle(n) ${reasons.join(", ")} hat/haben kein Token. Eine Transition feuert nur, wenn ALLE Eingangsstellen Token haben.`,
      );
    }
  }

  function reset() {
    const m: Marking = {};
    net.places.forEach((p) => (m[p.id] = p.tokens));
    setMarking(m);
    setHistory([]);
    setFeedback(null);
  }

  const enabled = net.transitions.filter((t) => isEnabled(net, marking, t.id));

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Pill tone="violet">Petri-Trainer · Token-Simulator</Pill>
          <h3 className="mt-2 text-2xl font-black">Petrinetz interaktiv</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Wähle ein Beispielnetz, klicke Transitionen an, beobachte Token und
            prüfe Eigenschaften.
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
          <Button variant="secondary" onClick={reset}>
            <RotateCcw size={16} /> Reset
          </Button>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900">
        <p className="px-2 pt-1 text-xs text-slate-600 dark:text-slate-300">
          {net.description}
        </p>
        <PetriCanvas
          net={net}
          marking={marking}
          enabled={enabled.map((t) => t.id)}
          onFire={attemptFire}
        />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">
            Aktuelle Markierung
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
              <Pill tone="rose">Deadlock - keine Transition aktivierbar</Pill>
            ) : (
              enabled.map((t) => (
                <button
                  key={t.id}
                  onClick={() => attemptFire(t.id)}
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  <Zap size={12} /> {t.label} feuern
                </button>
              ))
            )}
          </div>
          <p className="mt-3 text-xs font-black uppercase tracking-wide text-slate-500">
            Feuerfolge
          </p>
          <div className="mt-1 rounded bg-slate-100 px-3 py-2 font-mono text-xs dark:bg-slate-900">
            {history.length === 0 ? "(noch nichts gefeuert)" : history.join(" → ")}
          </div>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">
            Eigenschaftsanalyse (automatisch)
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              Erreichbare Markierungen: <b>{reachability.states.length}</b>
              {reachability.truncated ? " (gekappt bei 200)" : ""}
            </li>
            <li>
              Maximale Token pro Stelle (k):{" "}
              <b>{reachability.k}</b>
              {!reachability.isBoundedKnown && " (vermutlich unbeschränkt)"}
            </li>
            <li>
              Sicher (1-beschränkt): <b>{reachability.isSafe ? "Ja" : "Nein"}</b>
            </li>
            <li>
              Deadlockfrei: <b>{reachability.isDeadlockFree ? "Ja" : "Nein"}</b>
            </li>
            <li>
              Lebendig: <b>{reachability.isLive ? "Ja" : "Nein"}</b>
              {reachability.deadTransitions.length > 0 && (
                <span className="text-rose-600 dark:text-rose-400">
                  {" "}
                  (tot: {reachability.deadTransitions.join(", ")})
                </span>
              )}
            </li>
          </ul>
          {feedback && (
            <div className="mt-3">
              <Callout
                tone={
                  feedback.includes("Nicht aktiviert") ? "rose" : "emerald"
                }
                title={
                  feedback.includes("Nicht aktiviert") ? "Stop" : "Fortschritt"
                }
              >
                {feedback}
              </Callout>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">
          Klausurfragen zu diesem Netz
        </p>
        <div className="mt-2 grid gap-2 lg:grid-cols-2">
          {net.questions.map((q, i) => (
            <details
              key={i}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900"
            >
              <summary className="cursor-pointer text-sm font-bold">
                {q.question}
              </summary>
              <p className="mt-2 text-sm">
                <b>Antwort:</b> {q.answer}
              </p>
              <p className="mt-1 text-xs text-slate-500">{q.explain}</p>
            </details>
          ))}
        </div>
      </div>
    </Card>
  );
}

function PetriCanvas({
  net,
  marking,
  enabled,
  onFire,
}: {
  net: PetriNet;
  marking: Marking;
  enabled: string[];
  onFire: (tid: string) => void;
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
        return (
          <g
            key={t.id}
            onClick={() => onFire(t.id)}
            className="cursor-pointer"
          >
            <rect
              x={sx(t.x) - 14}
              y={sy(t.y) - 14}
              width={28}
              height={28}
              className={
                isOn
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
