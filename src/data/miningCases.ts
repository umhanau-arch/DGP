import type { MiningCase } from "../types";

/**
 * Helper to compute footprint from traces (called at runtime).
 * Stored ground truth helps with grading.
 */
function buildFootprint(traces: string[][], activities: string[]) {
  const direct = new Set<string>();
  for (const trace of traces) {
    for (let i = 0; i < trace.length - 1; i += 1) {
      direct.add(`${trace[i]}>${trace[i + 1]}`);
    }
  }
  const footprint: Record<string, Record<string, ">" | "<" | "||" | "#">> = {};
  for (const a of activities) {
    footprint[a] = {};
    for (const b of activities) {
      const ab = direct.has(`${a}>${b}`);
      const ba = direct.has(`${b}>${a}`);
      if (ab && ba) footprint[a][b] = "||";
      else if (ab) footprint[a][b] = ">";
      else if (ba) footprint[a][b] = "<";
      else footprint[a][b] = "#";
    }
  }
  return footprint;
}

const case1Traces: Record<string, string[]> = {
  C1: ["A", "B", "C", "D"],
  C2: ["A", "C", "B", "D"],
  C3: ["A", "B", "C", "D"],
};
const case1Activities = ["A", "B", "C", "D"];

const case2Traces: Record<string, string[]> = {
  C1: ["a", "b", "c", "d"],
  C2: ["a", "c", "b", "d"],
  C3: ["a", "b", "c", "e", "f", "b", "c", "d"],
  C4: ["a", "c", "b", "e", "f", "b", "c", "d"],
};
const case2Activities = ["a", "b", "c", "d", "e", "f"];

const case3Traces: Record<string, string[]> = {
  Order6350: [
    "place order",
    "send invoice",
    "pay",
    "prepare delivery",
    "make delivery",
    "confirm payment",
  ],
  Order6351: ["place order", "send invoice", "cancel order"],
  Order6352: [
    "place order",
    "send invoice",
    "pay",
    "prepare delivery",
    "confirm payment",
    "make delivery",
  ],
};
const case3Activities = [
  "place order",
  "send invoice",
  "pay",
  "prepare delivery",
  "make delivery",
  "confirm payment",
  "cancel order",
];

export const miningCases: MiningCase[] = [
  {
    id: "mining-1",
    name: "Einfacher Log mit Parallelität",
    difficulty: "leicht",
    description:
      "3 Cases. B und C tauchen mal in dieser, mal in jener Reihenfolge auf. Klassischer Parallel-Fall.",
    activities: case1Activities,
    expectedTraces: case1Traces,
    footprint: buildFootprint(Object.values(case1Traces), case1Activities),
    events: [
      { caseId: "C1", activity: "A", timestamp: "10:00" },
      { caseId: "C1", activity: "B", timestamp: "10:05" },
      { caseId: "C1", activity: "C", timestamp: "10:10" },
      { caseId: "C1", activity: "D", timestamp: "10:15" },
      { caseId: "C2", activity: "A", timestamp: "10:01" },
      { caseId: "C2", activity: "C", timestamp: "10:04" },
      { caseId: "C2", activity: "B", timestamp: "10:09" },
      { caseId: "C2", activity: "D", timestamp: "10:14" },
      { caseId: "C3", activity: "A", timestamp: "10:02" },
      { caseId: "C3", activity: "B", timestamp: "10:06" },
      { caseId: "C3", activity: "C", timestamp: "10:11" },
      { caseId: "C3", activity: "D", timestamp: "10:16" },
    ],
  },
  {
    id: "mining-2",
    name: "Schleifen und Parallelität",
    difficulty: "mittel",
    description:
      "Komplexerer Log mit Wiederholung (e, f) und Parallelität zwischen b und c.",
    activities: case2Activities,
    expectedTraces: case2Traces,
    footprint: buildFootprint(Object.values(case2Traces), case2Activities),
    events: [
      { caseId: "C1", activity: "a", timestamp: "09:00" },
      { caseId: "C1", activity: "b", timestamp: "09:05" },
      { caseId: "C1", activity: "c", timestamp: "09:10" },
      { caseId: "C1", activity: "d", timestamp: "09:15" },
      { caseId: "C2", activity: "a", timestamp: "09:01" },
      { caseId: "C2", activity: "c", timestamp: "09:04" },
      { caseId: "C2", activity: "b", timestamp: "09:09" },
      { caseId: "C2", activity: "d", timestamp: "09:14" },
      { caseId: "C3", activity: "a", timestamp: "09:02" },
      { caseId: "C3", activity: "b", timestamp: "09:06" },
      { caseId: "C3", activity: "c", timestamp: "09:11" },
      { caseId: "C3", activity: "e", timestamp: "09:13" },
      { caseId: "C3", activity: "f", timestamp: "09:14" },
      { caseId: "C3", activity: "b", timestamp: "09:18" },
      { caseId: "C3", activity: "c", timestamp: "09:22" },
      { caseId: "C3", activity: "d", timestamp: "09:25" },
      { caseId: "C4", activity: "a", timestamp: "09:03" },
      { caseId: "C4", activity: "c", timestamp: "09:07" },
      { caseId: "C4", activity: "b", timestamp: "09:12" },
      { caseId: "C4", activity: "e", timestamp: "09:15" },
      { caseId: "C4", activity: "f", timestamp: "09:17" },
      { caseId: "C4", activity: "b", timestamp: "09:20" },
      { caseId: "C4", activity: "c", timestamp: "09:24" },
      { caseId: "C4", activity: "d", timestamp: "09:28" },
    ],
  },
  {
    id: "mining-3",
    name: "Order-to-Cash-Auszug",
    difficulty: "schwer",
    description:
      "Realnaher Log: 3 Bestellungen, eine wird storniert. Zeigt Variantenvielfalt im O2C.",
    activities: case3Activities,
    expectedTraces: case3Traces,
    footprint: buildFootprint(Object.values(case3Traces), case3Activities),
    events: [
      { caseId: "Order6350", activity: "place order", timestamp: "13.02 14:29" },
      { caseId: "Order6351", activity: "place order", timestamp: "13.02 16:17" },
      { caseId: "Order6352", activity: "place order", timestamp: "13.02 17:53" },
      { caseId: "Order6352", activity: "send invoice", timestamp: "19.02 09:20" },
      { caseId: "Order6351", activity: "send invoice", timestamp: "19.02 16:08" },
      { caseId: "Order6350", activity: "send invoice", timestamp: "21.02 09:38" },
      { caseId: "Order6350", activity: "pay", timestamp: "02.03 12:39" },
      { caseId: "Order6352", activity: "pay", timestamp: "05.03 15:46" },
      { caseId: "Order6351", activity: "cancel order", timestamp: "06.03 10:17" },
      { caseId: "Order6350", activity: "prepare delivery", timestamp: "07.03 13:50" },
      { caseId: "Order6350", activity: "make delivery", timestamp: "07.03 16:41" },
      { caseId: "Order6350", activity: "confirm payment", timestamp: "07.03 16:53" },
      { caseId: "Order6352", activity: "prepare delivery", timestamp: "07.03 17:05" },
      { caseId: "Order6352", activity: "confirm payment", timestamp: "07.03 17:59" },
      { caseId: "Order6352", activity: "make delivery", timestamp: "08.03 09:54" },
    ],
  },
];
