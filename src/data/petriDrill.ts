// Drill exercises per Petri net for the interactive trainer.
// Each net gets a sequence of small exercises. The user practices
// until the streak reaches 6 (mastered).

import type { DrillExercise, PetriNet } from "../types";
import { petriNets } from "./petriNets";

type Marking = Record<string, number>;

function placeIds(net: PetriNet) {
  return net.places.map((p) => p.id);
}

function initialMarking(net: PetriNet): Marking {
  const m: Marking = {};
  net.places.forEach((p) => (m[p.id] = p.tokens));
  return m;
}

function isEnabled(net: PetriNet, m: Marking, tid: string) {
  return net.arcs
    .filter((a) => a.to === tid)
    .every((a) => (m[a.from] ?? 0) >= 1);
}

function fire(net: PetriNet, m: Marking, tid: string): Marking {
  const next = { ...m };
  for (const a of net.arcs.filter((arc) => arc.to === tid)) next[a.from] -= 1;
  for (const a of net.arcs.filter((arc) => arc.from === tid)) {
    next[a.to] = (next[a.to] ?? 0) + 1;
  }
  return next;
}

function key(m: Marking, ids: string[]) {
  return ids.map((p) => `${p}=${m[p] ?? 0}`).join(",");
}

interface Analysis {
  initial: Marking;
  enabledInitial: string[];
  reachable: Marking[];
  k: number;
  isSafe: boolean;
  isDeadlockFree: boolean;
  isLive: boolean;
  fireCounts: Record<string, number>;
  /** Konfliktstellen: Stellen, von denen aus mehrere Transitionen in
   *  einer Markierung gleichzeitig aktiviert sind und um Token konkurrieren. */
  conflictPlaces: string[];
}

export function analyzeNet(net: PetriNet): Analysis {
  const ids = placeIds(net);
  const initial = initialMarking(net);
  const seen = new Map<string, Marking>();
  seen.set(key(initial, ids), initial);
  const queue = [initial];
  const fired = new Set<string>();
  let dead = false;
  let cap = 200;
  while (queue.length && cap-- > 0) {
    const m = queue.shift()!;
    let any = false;
    for (const t of net.transitions) {
      if (isEnabled(net, m, t.id)) {
        any = true;
        fired.add(t.id);
        const n = fire(net, m, t.id);
        const k = key(n, ids);
        if (!seen.has(k)) {
          seen.set(k, n);
          queue.push(n);
        }
      }
    }
    if (!any) dead = true;
  }

  let kVal = 0;
  for (const m of seen.values()) {
    for (const p of ids) kVal = Math.max(kVal, m[p] ?? 0);
  }

  const fireCounts: Record<string, number> = {};
  net.transitions.forEach((t) => {
    let count = 0;
    for (const m of seen.values()) if (isEnabled(net, m, t.id)) count++;
    fireCounts[t.id] = count;
  });

  // Konfliktstellen: Stelle p ist Input von ≥2 Transitionen, und in
  // mind. einer Markierung sind ≥2 dieser Transitionen aktiv.
  const conflictSet = new Set<string>();
  for (const place of net.places) {
    const transitions = net.arcs
      .filter((a) => a.from === place.id)
      .map((a) => a.to);
    if (transitions.length < 2) continue;
    for (const m of seen.values()) {
      const enabled = transitions.filter((t) => isEnabled(net, m, t));
      if (enabled.length >= 2) {
        conflictSet.add(place.id);
        break;
      }
    }
  }

  return {
    initial,
    enabledInitial: net.transitions
      .filter((t) => isEnabled(net, initial, t.id))
      .map((t) => t.id),
    reachable: Array.from(seen.values()),
    k: kVal,
    isSafe: kVal === 1,
    isDeadlockFree: !dead,
    isLive: fired.size === net.transitions.length,
    fireCounts,
    conflictPlaces: Array.from(conflictSet),
  };
}

// ---------------- Drill exercise builder ----------------

export function buildDrillExercises(net: PetriNet): DrillExercise[] {
  const a = analyzeNet(net);
  const ids = placeIds(net);
  const exercises: DrillExercise[] = [];

  // 1. Welche Transitionen sind initial aktiviert?
  exercises.push({
    id: `${net.id}-enabled-initial`,
    netId: net.id,
    kind: "select-enabled-transitions",
    prompt:
      "Klicke ALLE Transitionen, die in der Startmarkierung aktiviert sind.",
    expected: a.enabledInitial,
    explain:
      "Eine Transition ist aktiviert, wenn ALLE ihre Eingangsstellen mindestens ein Token enthalten. Hier sind das: " +
      (a.enabledInitial.join(", ") || "keine Transition"),
  });

  // 2. Markierung nach Feuern jeder initial aktivierten Transition
  for (const tid of a.enabledInitial) {
    const after = fire(net, a.initial, tid);
    exercises.push({
      id: `${net.id}-mark-after-${tid}`,
      netId: net.id,
      kind: "marking-after-fire",
      prompt: `Wie sieht die Markierung nach dem Feuern von ${tid} aus? Gib den Vektor (${ids.join(", ")}) an.`,
      expected: ids.map((p) => `${after[p] ?? 0}`).join(","),
      explain: `Beim Feuern von ${tid} werden 1 Token aus jeder Eingangsstelle entfernt und 1 Token in jede Ausgangsstelle gelegt. Markierung: (${ids.map((p) => `${p}=${after[p] ?? 0}`).join(", ")}).`,
    });
  }

  // 3. Wie viele Markierungen sind erreichbar?
  exercises.push({
    id: `${net.id}-reach-count`,
    netId: net.id,
    kind: "reachable-marking-count",
    prompt: "Wie viele unterschiedliche Markierungen sind insgesamt erreichbar?",
    expected: String(a.reachable.length),
    explain: `Der Erreichbarkeitsgraph hat ${a.reachable.length} Knoten. Jeder Knoten ist eine erreichbare Markierung.`,
  });

  // 4. Sicherheit
  exercises.push({
    id: `${net.id}-safe`,
    netId: net.id,
    kind: "is-safe",
    prompt: "Ist das Netz sicher (1-beschränkt)?",
    options: ["Ja", "Nein"],
    expected: a.isSafe ? "Ja" : "Nein",
    explain: a.isSafe
      ? "Ja, in keiner erreichbaren Markierung enthält eine Stelle mehr als 1 Token."
      : `Nein, es gibt eine erreichbare Markierung mit ${a.k} Token in einer Stelle.`,
  });

  // 5. k-Beschränktheit
  exercises.push({
    id: `${net.id}-k`,
    netId: net.id,
    kind: "is-bounded",
    prompt: "Wie hoch ist k (max. Token in einer Stelle über alle erreichbaren Markierungen)?",
    expected: String(a.k),
    explain: `Maximales Token-Vorkommen über alle erreichbaren Markierungen: k = ${a.k}.`,
  });

  // 6. Deadlockfreiheit
  exercises.push({
    id: `${net.id}-deadlock`,
    netId: net.id,
    kind: "is-deadlockfree",
    prompt: "Ist das Netz deadlockfrei?",
    options: ["Ja", "Nein"],
    expected: a.isDeadlockFree ? "Ja" : "Nein",
    explain: a.isDeadlockFree
      ? "Ja, in jeder erreichbaren Markierung ist mindestens eine Transition aktivierbar."
      : "Nein, es gibt eine erreichbare Markierung ohne aktivierbare Transitionen (Deadlock).",
  });

  // 7. Lebendigkeit
  exercises.push({
    id: `${net.id}-live`,
    netId: net.id,
    kind: "is-live",
    prompt: "Ist das Netz lebendig?",
    options: ["Ja", "Nein"],
    expected: a.isLive ? "Ja" : "Nein",
    explain: a.isLive
      ? "Ja, jede Transition kann ab jeder erreichbaren Markierung erneut aktiviert werden."
      : "Nein, mindestens eine Transition wird nie aktiviert (tot) – Netz ist nicht lebendig.",
  });

  // 8. Wie oft kann eine zufällige Transition feuern?
  for (const t of net.transitions) {
    exercises.push({
      id: `${net.id}-fires-${t.id}`,
      netId: net.id,
      kind: "fire-count",
      prompt: `In wie vielen erreichbaren Markierungen ist ${t.label} aktiviert?`,
      expected: String(a.fireCounts[t.id]),
      explain: `Transition ${t.label} ist in ${a.fireCounts[t.id]} erreichbaren Markierung(en) aktiviert.`,
    });
  }

  return exercises;
}

/** Pre-build all drill exercises once (memoized at module load). */
export const DRILL_EXERCISES_BY_NET: Record<string, DrillExercise[]> =
  Object.fromEntries(petriNets.map((n) => [n.id, buildDrillExercises(n)]));
