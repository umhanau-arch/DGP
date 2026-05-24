import type { ChapterDefinition } from "../types";

export const chapter8: ChapterDefinition = {
  id: "kapitel-8",
  number: 8,
  title: "KPI, ISO, BSC, Digitalisierung",
  subtitle: "Steuerung, Qualität, Industrie 4.0, IoT, Digital Twin",
  whyImportant:
    "Diese Themen kommen oft als kurze Definitionsfragen oder als Theorie-Aufgabe 1. Sie geben sichere Punkte, wenn du die Begriffe trennscharf erklären kannst.",
  learningGoals: [
    "KPI und SMART definieren und anwenden.",
    "PDCA-Zyklus erklären.",
    "Balanced Scorecard und ihre Perspektiven nennen.",
    "ISO 9001 und QMS einordnen.",
    "Digitalisierung in 3 Stufen + Industrie 4.0 / IoT / Digital Twin erklären.",
  ],
  priority: "B",
  examReference: "Aufgabe 1, Theorieblöcke",
  examTip:
    "Eine Definition + ein Beispiel = volle Punkte. Bei Digitalisierung IMMER die Stufen (Datenform → Prozessverbesserung → Geschäftsmodell) trennen.",
  commonMistakes: [
    "PDCA und SMART verwechseln.",
    "BSC-Perspektiven nicht vollständig nennen.",
    "Digitization mit Digitalization gleichsetzen.",
    "Industrie 4.0 als reines Buzzword behandeln.",
  ],
  trainers: [],
  groups: [
    {
      title: "1 · KPI und SMART",
      color: "emerald",
      blocks: [
        {
          id: "k8-kpi",
          title: "KPI - Key Performance Indicator",
          intro: "Was machst du messbar?",
          simple:
            "KPI sind die zentralen Kennzahlen, mit denen du Prozessleistung steuerst.",
          detail:
            "Beispiele: Durchlaufzeit, Fehlerquote, Termintreue, Kosten pro Auftrag, Net Promoter Score, First-Time-Right.",
          mnemonic: "KPI = was wirklich zählt.",
          exam: "Definition + Beispiel.",
          visual: "kpi-dashboard",
        },
        {
          id: "k8-smart",
          title: "SMART-Kriterien",
          intro: "Wie formulierst du gute Ziele?",
          simple:
            "Spezifisch, Messbar, Akzeptiert/Achievable, Realistisch, Terminiert.",
          detail:
            "Ein Ziel ist nur dann steuerungswirksam, wenn es alle 5 Kriterien erfüllt. 'Schneller werden' ist nicht SMART. 'Lieferzeit bis 30.06. von 5 auf 3 Tage senken' schon.",
          mnemonic: "S-M-A-R-T.",
          exam: "Aufgabe 1 - SMART anwenden.",
          visual: "smart-checklist",
        },
      ],
    },
    {
      title: "2 · Qualität: PDCA, ISO 9001, BSC",
      color: "sky",
      blocks: [
        {
          id: "k8-pdca",
          title: "PDCA-Zyklus",
          intro: "Plan - Do - Check - Act.",
          simple:
            "PDCA ist der Verbesserungszyklus: planen, umsetzen, prüfen, anpassen.",
          detail:
            "Im QMS dreht sich der PDCA-Zyklus kontinuierlich. Maßnahmen aus Check fließen in Act und neue Plans.",
          mnemonic: "Plan, Do, Check, Act.",
          exam: "Begriffsfrage.",
          visual: "pdca-cycle",
        },
        {
          id: "k8-iso",
          title: "ISO 9001 und QMS",
          intro: "Norm für Qualitätsmanagement.",
          simple:
            "ISO 9001 beschreibt Anforderungen an ein QMS: dokumentierte Prozesse, Messung, kontinuierliche Verbesserung.",
          detail:
            "Vorteile: bessere Qualität, weniger Fehler, Standardisierung, Kundenvertrauen.",
          mnemonic: "ISO 9001 = QMS-Standard.",
          exam: "Definition.",
        },
        {
          id: "k8-bsc",
          title: "Balanced Scorecard",
          intro: "Vier Perspektiven.",
          simple:
            "BSC verbindet Strategie und Kennzahlen aus 4 Sichten: Finanzen, Kunden, Prozesse, Lernen/Entwicklung.",
          detail:
            "Jede Perspektive hat Ziele, Kennzahlen, Vorgaben und Maßnahmen. Sie ergänzt finanzielle KPIs um Kunden- und Lerngrößen.",
          table: [
            ["Perspektive", "Frage"],
            ["Finanzen", "Wie profitabel?"],
            ["Kunden", "Wie zufrieden?"],
            ["Prozesse", "Wo verbessern?"],
            ["Lernen", "Wie zukunftsfähig?"],
          ],
          mnemonic: "Finanzen - Kunden - Prozesse - Lernen.",
          exam: "Aufgabe 1 - 4 Perspektiven.",
        },
      ],
    },
    {
      title: "3 · Digitalisierung",
      color: "violet",
      blocks: [
        {
          id: "k8-stufen",
          title: "Digitization → Digitalization → Transformation",
          intro: "Drei Stufen, oft verwechselt.",
          simple:
            "Digitization: analog wird digital. Digitalization: Prozess wird mit IT besser. Transformation: Geschäftsmodell wird neu.",
          detail:
            "Ohne klare Stufen versteht man Industrie 4.0 nicht. Beispiel: Papier->PDF (Digitization), Online-Workflow (Digitalization), Plattformökonomie (Transformation).",
          table: [
            ["Stufe", "Bedeutung", "Beispiel"],
            ["Digitization", "Daten digital", "Scan eines Formulars"],
            ["Digitalization", "Prozess digital", "Online-Antrag mit Workflow"],
            ["Transformation", "Geschäftsmodell digital", "Plattform / Subscription"],
          ],
          mnemonic: "Daten - Prozess - Modell.",
          exam: "Aufgabe 1 - Begriffsabgrenzung.",
          visual: "digitization-stairs",
        },
        {
          id: "k8-industrie4",
          title: "Industrie 4.0, IoT, Digital Twin, Smart Product",
          intro: "Konkrete Erscheinungen digitaler Transformation.",
          simple:
            "Industrie 4.0: vernetzte Produktion mit cyber-physischen Systemen. IoT: vernetzte Geräte, die Daten senden. Digital Twin: virtuelles Abbild eines realen Objekts. Smart Product: Produkt mit Sensorik und Datenanbindung.",
          detail:
            "Industrie 4.0 verbindet Produktion mit IT. Smart Factory ist die Umsetzung dieser Idee in der Fabrikhalle. IoT liefert die Daten. Digital Twin erlaubt Simulation und Optimierung.",
          mnemonic: "Vernetzt + Daten + Twin + Smart.",
          exam: "Theoriefrage zur Digitalisierung.",
        },
      ],
    },
  ],
  quiz: [
    {
      id: "k8-q1",
      question: "Wofür stehen die Buchstaben in SMART?",
      answer:
        "Specific, Measurable, Achievable, Reasonable, Time-bound.",
    },
    {
      id: "k8-q2",
      question: "Was bedeutet PDCA?",
      answer: "Plan - Do - Check - Act.",
    },
    {
      id: "k8-q3",
      question: "Welche 4 Perspektiven hat die Balanced Scorecard?",
      answer:
        "Finanzen, Kunden, interne Prozesse, Lernen/Entwicklung.",
    },
    {
      id: "k8-q4",
      question: "Was ist ISO 9001?",
      answer: "Norm für Anforderungen an Qualitätsmanagementsysteme (QMS).",
    },
    {
      id: "k8-q5",
      question: "Was ist Digitization?",
      answer: "Analog wird digital (z. B. Papier wird PDF).",
    },
    {
      id: "k8-q6",
      question: "Was ist Digitalization?",
      answer: "Prozesse werden mit digitaler Technik verbessert.",
    },
    {
      id: "k8-q7",
      question: "Was ist digitale Transformation?",
      answer: "Geschäftsmodell und Wertschöpfung verändern sich grundlegend.",
    },
    {
      id: "k8-q8",
      question: "Was ist ein Digital Twin?",
      answer:
        "Virtuelles Abbild eines realen Produkts oder Prozesses, ständig mit Echtzeitdaten verbunden.",
    },
    {
      id: "k8-q9",
      question: "Was ist IoT?",
      answer:
        "Internet of Things - vernetzte physische Geräte, die Daten austauschen.",
    },
    {
      id: "k8-q10",
      question: "Was ist Industrie 4.0?",
      answer:
        "Vernetzte, datengetriebene Produktion mit cyber-physischen Systemen.",
    },
  ],
  tasks: [
    {
      id: "k8-task-1",
      kind: "case",
      prompt:
        "Ordne die folgenden Beispiele zu Digitization, Digitalization oder Transformation: (a) PDF-Archiv von Papierakten, (b) Online-Genehmigungs-Workflow, (c) Plattform Airbnb statt klassischer Hotels.",
      expected:
        "(a) Digitization, (b) Digitalization, (c) digitale Transformation.",
      steps: [
        "Frage: Daten/Prozess/Geschäftsmodell?",
        "(a) reine Datenform -> Digitization.",
        "(b) Prozess wird besser -> Digitalization.",
        "(c) ganzes Geschäftsmodell neu -> Transformation.",
      ],
    },
    {
      id: "k8-task-2",
      kind: "case",
      prompt:
        "Ein Unternehmen möchte den Bestellprozess verbessern. Formuliere ein SMARTes Ziel.",
      expected:
        "Beispiel: 'Reduziere die durchschnittliche Lieferzeit von Bestellungen bis 31.12. von 5 auf 3 Werktage, gemessen am ERP-Reporting.'",
      steps: [
        "S: spezifisch -> Lieferzeit.",
        "M: messbar -> 5 -> 3 Tage.",
        "A: akzeptiert -> mit Vertrieb abgestimmt.",
        "R: realistisch -> Mit zusätzlicher Schicht machbar.",
        "T: terminiert -> bis 31.12.",
      ],
    },
  ],
};
