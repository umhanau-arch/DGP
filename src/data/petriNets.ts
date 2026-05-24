import type { PetriNet } from "../types";

/**
 * Coordinates use a logical grid (x in [0, 100], y in [0, 100]).
 */
export const petriNets: PetriNet[] = [
  {
    id: "linear",
    name: "Linearer Prozess",
    description:
      "Drei Schritte hintereinander. Geeignet zum Üben von Aktivierung, Feuern und einfacher Erreichbarkeit.",
    difficulty: "leicht",
    places: [
      { id: "p1", label: "p1", tokens: 1, x: 8, y: 50 },
      { id: "p2", label: "p2", tokens: 0, x: 38, y: 50 },
      { id: "p3", label: "p3", tokens: 0, x: 68, y: 50 },
      { id: "p4", label: "p4", tokens: 0, x: 95, y: 50 },
    ],
    transitions: [
      { id: "t1", label: "t1", x: 23, y: 50 },
      { id: "t2", label: "t2", x: 53, y: 50 },
      { id: "t3", label: "t3", x: 83, y: 50 },
    ],
    arcs: [
      { from: "p1", to: "t1" },
      { from: "t1", to: "p2" },
      { from: "p2", to: "t2" },
      { from: "t2", to: "p3" },
      { from: "p3", to: "t3" },
      { from: "t3", to: "p4" },
    ],
    questions: [
      {
        question: "Welche Transition ist initial aktiviert?",
        answer: "Nur t1.",
        explain: "p1 hat Token, p2 und p3 sind leer.",
      },
      {
        question: "Wie viele Markierungen hat der Erreichbarkeitsgraph?",
        answer: "4: M0=(1,0,0,0), M1=(0,1,0,0), M2=(0,0,1,0), M3=(0,0,0,1).",
        explain: "Token wandert linear durch das Netz.",
      },
      {
        question: "Ist das Netz 1-beschränkt (sicher)?",
        answer: "Ja.",
        explain: "Pro Markierung liegt nie mehr als ein Token auf einer Stelle.",
      },
    ],
    notes: ["Workflownetz: eindeutige Quelle p1, eindeutige Senke p4."],
  },
  {
    id: "and-split-join",
    name: "AND-Split und AND-Join",
    description:
      "Parallelausführung mit Synchronisation. Klassisches Klausurnetz, das oft die Sicherheit verletzt.",
    difficulty: "mittel",
    places: [
      { id: "p1", label: "p1", tokens: 1, x: 5, y: 50 },
      { id: "p2", label: "p2", tokens: 0, x: 40, y: 25 },
      { id: "p3", label: "p3", tokens: 0, x: 40, y: 75 },
      { id: "p4", label: "p4", tokens: 0, x: 75, y: 50 },
      { id: "p5", label: "p5", tokens: 0, x: 95, y: 50 },
    ],
    transitions: [
      { id: "t1", label: "t1 (Split)", x: 22, y: 50 },
      { id: "t2", label: "t2", x: 55, y: 25 },
      { id: "t3", label: "t3", x: 55, y: 75 },
      { id: "t4", label: "t4 (Join)", x: 85, y: 50 },
    ],
    arcs: [
      { from: "p1", to: "t1" },
      { from: "t1", to: "p2" },
      { from: "t1", to: "p3" },
      { from: "p2", to: "t2" },
      { from: "p3", to: "t3" },
      { from: "t2", to: "p4" },
      { from: "t3", to: "p4" },
      { from: "p4", to: "t4" },
      { from: "t4", to: "p5" },
    ],
    questions: [
      {
        question: "Ist das Netz sicher?",
        answer: "Nein. Nach t2 oder t3 kann p4 zwei Token sammeln.",
        explain: "Für Sicherheit dürfte p4 in keiner erreichbaren Markierung mehr als 1 Token haben.",
      },
      {
        question: "Wann ist t4 aktiviert?",
        answer: "Nur wenn p4 ausreichend Token hat (im Beispiel mind. 1, je nach Modell).",
        explain: "AND-Join wartet auf Synchronisation aller Eingangsstellen.",
      },
    ],
    notes: [
      "Achtung: in der Standard-AND-Variante hat t4 zwei Eingangsstellen (p2 und p3) und nicht eine kombinierte p4. Dieses Beispiel zeigt eine vereinfachte Form.",
    ],
  },
  {
    id: "xor-conflict",
    name: "XOR-Konflikt",
    description:
      "Zwei Transitionen konkurrieren um dasselbe Token - klassischer XOR-Split.",
    difficulty: "leicht",
    places: [
      { id: "p1", label: "p1", tokens: 1, x: 8, y: 50 },
      { id: "p2", label: "p2", tokens: 0, x: 65, y: 25 },
      { id: "p3", label: "p3", tokens: 0, x: 65, y: 75 },
    ],
    transitions: [
      { id: "t1", label: "t1", x: 35, y: 25 },
      { id: "t2", label: "t2", x: 35, y: 75 },
    ],
    arcs: [
      { from: "p1", to: "t1" },
      { from: "p1", to: "t2" },
      { from: "t1", to: "p2" },
      { from: "t2", to: "p3" },
    ],
    questions: [
      {
        question: "Welche Transitionen sind aktiviert?",
        answer: "t1 und t2 - aber nur eine kann feuern (Konflikt).",
        explain: "Beide haben p1 als Input. Sobald eine feuert, wird das Token verbraucht.",
      },
      {
        question: "Wie viele Endmarkierungen sind möglich?",
        answer: "Zwei: (0,1,0) oder (0,0,1).",
        explain: "Je nach gewählter Transition.",
      },
    ],
  },
  {
    id: "loop",
    name: "Schleife",
    description:
      "Beispiel mit Rückführung. Hier wird Lebendigkeit interessant.",
    difficulty: "mittel",
    places: [
      { id: "p1", label: "p1", tokens: 1, x: 10, y: 50 },
      { id: "p2", label: "p2", tokens: 0, x: 50, y: 50 },
      { id: "p3", label: "p3", tokens: 0, x: 90, y: 50 },
    ],
    transitions: [
      { id: "t1", label: "t1", x: 30, y: 50 },
      { id: "t2", label: "t2", x: 70, y: 25 },
      { id: "t3", label: "t3", x: 70, y: 75 },
    ],
    arcs: [
      { from: "p1", to: "t1" },
      { from: "t1", to: "p2" },
      { from: "p2", to: "t2" },
      { from: "p2", to: "t3" },
      { from: "t2", to: "p3" },
      { from: "t3", to: "p1" },
    ],
    questions: [
      {
        question: "Ist das Netz lebendig?",
        answer:
          "Nicht ohne weiteres - sobald t2 feuert und p3 markiert, ist t1, t2, t3 nicht mehr aktivierbar.",
        explain: "p3 hat keinen Ausgang. Damit ist das Netz nicht lebendig.",
      },
      {
        question: "Wo liegt das potenzielle Deadlock?",
        answer: "Markierung mit Token in p3 und leeren p1, p2.",
        explain: "Keine Transition aktivierbar.",
      },
    ],
  },
  {
    id: "deadlock",
    name: "Deadlock-Netz",
    description: "Beispiel mit erreichbarem Stillstand.",
    difficulty: "schwer",
    places: [
      { id: "p1", label: "p1", tokens: 1, x: 10, y: 50 },
      { id: "p2", label: "p2", tokens: 1, x: 30, y: 50 },
      { id: "p3", label: "p3", tokens: 0, x: 60, y: 25 },
      { id: "p4", label: "p4", tokens: 0, x: 60, y: 75 },
    ],
    transitions: [
      { id: "t1", label: "t1", x: 45, y: 25 },
      { id: "t2", label: "t2", x: 45, y: 75 },
    ],
    arcs: [
      { from: "p1", to: "t1" },
      { from: "p2", to: "t1" },
      { from: "p2", to: "t2" },
      { from: "t1", to: "p3" },
      { from: "t2", to: "p4" },
    ],
    questions: [
      {
        question: "Welche Transitionen sind initial aktiviert?",
        answer: "t1 (braucht p1, p2 - beide markiert) und t2 (braucht nur p2).",
        explain: "t2 verbraucht nur p2. Wenn t2 zuerst feuert, fehlt t1 ein Input.",
      },
      {
        question: "Gibt es einen Deadlock?",
        answer:
          "Ja: Wenn t2 zuerst feuert, bleibt p1=1, p2=0, p4=1. Keine Transition mehr aktivierbar.",
        explain: "Klassisches Beispiel für nicht-deadlockfreies Netz.",
      },
    ],
  },
  {
    id: "workflow-good",
    name: "Korrektes Workflownetz",
    description: "Eindeutige Quelle, eindeutige Senke, sound.",
    difficulty: "leicht",
    places: [
      { id: "i", label: "i (Quelle)", tokens: 1, x: 5, y: 50 },
      { id: "p1", label: "p1", tokens: 0, x: 30, y: 25 },
      { id: "p2", label: "p2", tokens: 0, x: 30, y: 75 },
      { id: "p3", label: "p3", tokens: 0, x: 65, y: 50 },
      { id: "o", label: "o (Senke)", tokens: 0, x: 95, y: 50 },
    ],
    transitions: [
      { id: "t1", label: "t1", x: 18, y: 25 },
      { id: "t2", label: "t2", x: 18, y: 75 },
      { id: "t3", label: "t3", x: 50, y: 25 },
      { id: "t4", label: "t4", x: 50, y: 75 },
      { id: "t5", label: "t5", x: 82, y: 50 },
    ],
    arcs: [
      { from: "i", to: "t1" },
      { from: "i", to: "t2" },
      { from: "t1", to: "p1" },
      { from: "t2", to: "p2" },
      { from: "p1", to: "t3" },
      { from: "p2", to: "t4" },
      { from: "t3", to: "p3" },
      { from: "t4", to: "p3" },
      { from: "p3", to: "t5" },
      { from: "t5", to: "o" },
    ],
    questions: [
      {
        question: "Ist das ein Workflownetz?",
        answer: "Ja: eine Quelle (i), eine Senke (o), Pfad existiert.",
        explain: "Alle Knoten erreichen die Senke und werden von der Quelle erreicht.",
      },
      {
        question: "Ist es korrekt (sound)?",
        answer:
          "Sicher (1-beschränkt), Option zur Komplettierung gegeben, keine toten Teile.",
        explain: "Erfüllt die vier Soundness-Bedingungen.",
      },
    ],
  },
];
