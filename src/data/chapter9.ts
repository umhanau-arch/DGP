import type { ChapterDefinition } from "../types";

export const chapter9: ChapterDefinition = {
  id: "kapitel-9",
  number: 9,
  title: "Klausurtraining und Gesamtwiederholung",
  subtitle: "8-Aufgaben-Schema, Zeitstrategie, typische Fallen",
  whyImportant:
    "Die Klausur hat ein wiederkehrendes Muster aus 8 Aufgabenblöcken. Wer das Schema kennt, gewinnt Zeit und Nerven.",
  learningGoals: [
    "Klausurmuster A1-A8 sicher kennen.",
    "Punktewertung pro Block einschätzen.",
    "Reihenfolge wählen: zuerst sichere Punkte.",
    "Typische Fallen pro Aufgabe aktiv vermeiden.",
  ],
  priority: "A",
  examReference: "alle Aufgaben",
  examTip:
    "Bearbeite zuerst die Aufgaben, in denen du sicher bist (Definitionen, PKR, Wertschöpfung). BPMN/Petri/Mining brauchen Zeit - reserviere genug Minuten.",
  commonMistakes: [
    "Zu lange an einer Aufgabe hängen, die schwerfällt.",
    "Bei Modellierungsaufgaben Pools/Sequenz/Nachrichtenfluss verwechseln.",
    "Bei Rechenaufgaben Zwischenwerte nicht hinschreiben.",
    "Definitionen ohne Beispiel beantworten.",
  ],
  trainers: ["exam-blueprint"],
  groups: [
    {
      title: "1 · Klausurschema",
      color: "rose",
      blocks: [
        {
          id: "k9-blueprint",
          title: "Die 8 Aufgabenblöcke",
          intro: "So ist die Klausur fast immer aufgebaut.",
          simple:
            "A1 Definitionen, A2 GPM-Lebenszyklus, A3 Prozessarten, A4 PKR, A5 Wertschöpfung/Integration, A6 Petrinetze, A7 BPMN, A8 Process Mining.",
          detail:
            "Du hast typischerweise 100 Punkte zu verdienen. PKR und BPMN sind die punktreichsten Blöcke. Process Mining ist meistens umfangreich, aber strukturiert.",
          table: [
            ["Block", "Thema", "Tipp"],
            ["A1", "Definitionen", "Definition + Beispiel"],
            ["A2", "GPM-Zyklus", "6 Phasen + Reihenfolge"],
            ["A3", "Prozessarten", "Kategorie + Begründung"],
            ["A4", "PKR", "Reihenfolge der Schritte"],
            ["A5", "Wertschöpfung", "Formel + Richtung"],
            ["A6", "Petrinetze", "Aktivierung + Erreichbarkeit"],
            ["A7", "BPMN", "Pools + Nachrichtenflüsse"],
            ["A8", "Mining", "Trace + Footprint"],
          ],
          mnemonic: "Definition - Zyklus - Arten - PKR - Wert - Petri - BPMN - Mining.",
          exam: "Strategischer Überblick.",
          visual: "exam-blueprint",
        },
      ],
    },
    {
      title: "2 · Zeitstrategie",
      color: "lime",
      blocks: [
        {
          id: "k9-zeit",
          title: "Welche Reihenfolge in der Klausur?",
          intro: "Erst sichere Punkte, dann komplexe Modellierungen.",
          simple:
            "Beginne mit Definitionen (A1) und PKR (A4). Dann BPMN/Petrinetze, am Ende Mining mit Footprint.",
          detail:
            "Definitionen sind schnell. PKR ist mechanisch - wenn der Rechenweg sitzt. BPMN/Petri brauchen mehr Sorgfalt. Mining belohnt klare Tabellen.",
          mnemonic: "Schnelle Punkte zuerst.",
          exam: "Strategie.",
        },
      ],
    },
    {
      title: "3 · Häufigste Fallen",
      color: "amber",
      blocks: [
        {
          id: "k9-fallen",
          title: "Top 10 Fallen",
          intro: "Lerne sie, vermeide sie.",
          simple:
            "Phasen vertauschen, Pools mit Sequenz verbinden, Fixkosten nicht trennen, falsche Maßgröße, Lebendigkeit/Deadlock verwechseln, Case = Event setzen ...",
          detail:
            "Eine kurze Self-Check-Liste vor der Abgabe rettet dir oft 5-10 Punkte. Lies deine Definitionen ein zweites Mal: Beispiel dabei? Phasen geordnet? Pools getrennt?",
          bullets: [
            "1. Definitionen ohne Beispiel",
            "2. GPM-Zyklus falsch sortiert",
            "3. Prozessart ohne Begründung",
            "4. Fixkosten in der Maßgröße belassen",
            "5. Maßgröße falsch gewählt",
            "6. Petri-Aktivierung mit nur einem Input",
            "7. Sicherheit nur auf Startmarkierung",
            "8. Sequenzfluss zwischen Pools",
            "9. Schleife für Nachforderung vergessen",
            "10. Footprint ohne beide Richtungen geprüft",
          ],
          mnemonic: "Self-Check vor Abgabe.",
          exam: "Strategiefrage.",
        },
      ],
    },
  ],
  quiz: [
    {
      id: "k9-q1",
      question: "Was ist die übliche Aufgabenreihenfolge der DGP-Klausur?",
      answer:
        "A1 Def, A2 GPM-Zyklus, A3 Prozessarten, A4 PKR, A5 Wertschöpfung/Integration, A6 Petrinetze, A7 BPMN, A8 Process Mining.",
    },
    {
      id: "k9-q2",
      question: "Welche Aufgabenblöcke geben besonders viele Punkte?",
      answer: "PKR (A4), BPMN (A7), Process Mining (A8).",
    },
    {
      id: "k9-q3",
      question: "Welcher Pflichtinhalt fehlt oft in Definitionsantworten?",
      answer: "Ein konkretes Beispiel.",
    },
    {
      id: "k9-q4",
      question: "Wie reduziert man Modellierungsfehler in BPMN?",
      answer:
        "Pools getrennt für Kunde/Unternehmen. Sequenzfluss nur intern, Nachrichtenfluss zwischen Pools. XOR/AND zusammenführen.",
    },
    {
      id: "k9-q5",
      question: "Wie strukturiert man eine PKR-Aufgabe sauber?",
      answer:
        "1) Kosten trennen, 2) Maßgröße bestimmen, 3) lmi/lmn unterscheiden, 4) Satz bilden, 5) Umlage, 6) Produktkosten.",
    },
  ],
  tasks: [
    {
      id: "k9-task-1",
      kind: "case",
      prompt:
        "Schreibe deine persönliche Klausur-Reihenfolge auf, mit geschätzter Zeit pro Aufgabe.",
      expected:
        "Vorschlag: A1 (10 min), A4 (20 min), A5 (10 min), A2/A3 (10 min), A6 (15 min), A7 (15 min), A8 (20 min). Anpassen nach Stärke.",
      steps: [
        "Stärken/Schwächen ehrlich auflisten.",
        "Punktwertige Aufgaben zuerst planen.",
        "Pufferzeit am Ende einkalkulieren.",
      ],
    },
  ],
};
