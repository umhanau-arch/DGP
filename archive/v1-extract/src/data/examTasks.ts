import type { ExamTask } from "../types";

export const examTasks: ExamTask[] = [
  {
    id: "a1",
    title: "A1 Definitionen",
    points: 9,
    prompt: "Erkläre drei Begriffe: Geschäftsprozess, Workflow, Eventlog.",
    solution:
      "Geschäftsprozess: zusammenhängende, wiederholbare Aktivitäten, die Input in wertvollen Output umwandeln. Workflow: ganz oder teilweise durch ein Informationssystem gesteuerter Geschäftsprozess. Eventlog: strukturierte Ereignisdaten mit mindestens Case ID, Activity und Timestamp.",
    grading: ["je Begriff 1 Punkt Einfachheit", "1 Punkt fachliche Korrektheit", "1 Punkt Beispiel/Kontext"],
    commonErrors: ["Projekt statt Prozess erklären", "Workflow nur als Ablaufplan definieren", "Eventlog ohne Case ID nennen"],
  },
  {
    id: "a2",
    title: "A2 GPM-Zyklus",
    points: 10,
    prompt:
      "Ein Unternehmen findet lange Lieferzeiten und führt sofort neue Software ein. Nach drei Monaten wird gemessen. Welche Phasen fehlen oder sind fehlerhaft?",
    solution:
      "Fehlerhaft ist der Sprung von Problem zu Software. Es fehlen Prozesserhebung, Prozessanalyse und Prozessverbesserung. Korrekt wäre: Prozess identifizieren, Ist-Prozess erheben, Ursachen analysieren, Soll-Prozess verbessern, Lösung einführen, Kennzahlen überwachen.",
    grading: ["fehlende Phasen nennen", "Phasen erklären", "konkreten Bezug zum Fall herstellen"],
    commonErrors: ["Überwachung als fehlend nennen, obwohl sie teilweise stattfand", "Analyse und Verbesserung vermischen"],
  },
  {
    id: "a3",
    title: "A3 Prozessarten",
    points: 9,
    prompt: "Ordne im Online-Shop nachhaltiger Mode zu: Produktauswahl/Bestellung, HR, strategische Sortimentsplanung.",
    solution:
      "Produktauswahl/Bestellung ist Kernprozess, weil direkter Kundennutzen entsteht. HR ist Supportprozess, weil es interne Ressourcen bereitstellt. Strategische Sortimentsplanung ist Managementprozess, weil sie Richtung und Ziele steuert.",
    grading: ["Kategorie", "Begründung mit Kundennutzen/Steuerung/Unterstützung", "Kontext beachten"],
    commonErrors: ["Plattform immer als Support ansehen", "ohne Begründung nur aufzählen"],
  },
  {
    id: "a4",
    title: "A4 Prozesskostenrechnung",
    points: 16,
    prompt:
      "Gesamtkosten 120.000, Fixkosten 30.000, Maßgröße Bestellungen 9.000. Produkt A 600 Bestellungen, Produkt B 1.400. Berechne variablen Satz und variable Prozesskosten.",
    solution:
      "Variable Prozesskosten: 120.000 - 30.000 = 90.000. Variabler Prozesskostensatz: 90.000 / 9.000 = 10 pro Bestellung. Produkt A: 600 × 10 = 6.000. Produkt B: 1.400 × 10 = 14.000.",
    grading: ["variable Kosten korrekt", "Maßgröße korrekt", "Satz korrekt", "Produktkosten korrekt", "Rechenweg nachvollziehbar"],
    commonErrors: ["120.000 / 9.000 rechnen", "Produktmenge mit Gesamtmenge verwechseln"],
  },
  {
    id: "a5",
    title: "A5 Wertschöpfung/Integration",
    points: 13,
    prompt: "Leistung 800.000, Vorleistung 500.000. Berechne Wertschöpfung und Integrationsgrad. Erkläre Rückwärtsintegration.",
    solution:
      "Wertschöpfung = 800.000 - 500.000 = 300.000. Integrationsgrad = 300.000 / 800.000 = 37,5 %. Rückwärtsintegration bedeutet, dass das Unternehmen Tätigkeiten von Lieferanten selbst übernimmt, z. B. eigene Batteriefertigung.",
    grading: ["Formel", "Rechnung", "Prozentinterpretation", "Integrationsrichtung mit Beispiel"],
    commonErrors: ["Vorleistung durch Leistung teilen", "Rückwärts aus Kundensicht deuten"],
  },
  {
    id: "a6",
    title: "A6 Petrinetze",
    points: 14,
    prompt:
      "Netz: p1 hat Token. t1: p1 -> p2 und p3. t2: p2 -> p4. t3: p3 -> p4. Bestimme aktivierte Transitionen nach jedem Schritt und prüfe Sicherheit.",
    solution:
      "Initial ist nur t1 aktiviert. Nach t1 liegen Token auf p2 und p3; t2 und t3 sind aktiviert. Nach t2 liegt zusätzlich p4 vor, t3 bleibt aktiviert. Nach t3 liegen zwei Token auf p4, falls p4 beide Ausgänge sammelt. Das Netz ist dann nicht sicher, weil p4 in einer erreichbaren Markierung zwei Token haben kann.",
    grading: ["Aktivierung initial", "Feuerregel", "erreichbare Markierungen", "Sicherheit begründen"],
    commonErrors: ["t2/t3 vor t1 aktivieren", "Sicherheit nur anhand Startmarkierung beurteilen"],
  },
  {
    id: "a7",
    title: "A7 BPMN",
    points: 12,
    prompt:
      "Modelliere eine Reklamation: Kunde sendet Reklamation. Unternehmen prüft Vollständigkeit. Bei fehlenden Angaben wird nachgefordert. Danach Entscheidung Ersatz oder Ablehnung.",
    solution:
      "Pool Kunde und Pool Unternehmen. Kunde sendet Reklamation per Nachrichtenfluss. Unternehmen startet mit Nachrichtenzwischenereignis, prüft Vollständigkeit, XOR: unvollständig -> Nachricht Nachforderung -> Kunde sendet Angaben -> zurück zur Prüfung; vollständig -> Prüfung Anspruch, XOR Ersatz/Ablehnung, Ergebnis per Nachricht an Kunden, Ende.",
    grading: ["getrennte Pools", "Nachrichtenflüsse korrekt", "XOR und Schleife", "klare Task- und Ereignisnamen"],
    commonErrors: ["Sequenzfluss zwischen Pools", "Schleife bei Nachforderung vergessen"],
  },
  {
    id: "a8",
    title: "A8 Process Mining",
    points: 18,
    prompt:
      "Eventlog: C1 A,B,C; C2 A,C,B; C3 A,B,C. Bilde Traces, Varianten und Beziehung B/C.",
    solution:
      "Traces: C1 <A,B,C>, C2 <A,C,B>, C3 <A,B,C>. Varianten: <A,B,C> zweimal, <A,C,B> einmal. Direkte Folgen B>C und C>B kommen vor, daher B || C im Alpha-Algorithmus. A steht kausal vor B und C, sofern keine Rückrichtung vorkommt.",
    grading: ["Case ID gruppieren", "nach Timestamp/Reihenfolge sortieren", "Varianten zählen", "Footprint-Beziehungen korrekt"],
    commonErrors: ["Events statt Cases zählen", "Parallelität als Zufall ignorieren"],
  },
];
