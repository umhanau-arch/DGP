import type { ChapterDefinition } from "../types";

export const chapter6: ChapterDefinition = {
  id: "kapitel-6",
  number: 6,
  title: "Prozesskostenrechnung (PKR)",
  subtitle: "Kostenbegriffe, lmi/lmn, Prozesskostensatz, Umlage, Produktkosten",
  whyImportant:
    "Aufgabe 4 ist eine sichere Punktequelle - wenn du die Reihenfolge der Rechenschritte beherrschst. PKR verteilt Gemeinkosten verursachungsgerecht auf Prozesse und Produkte.",
  learningGoals: [
    "Kostenbegriffe (Kostenarten, -stellen, -träger, fix/variabel, Einzel-/Gemeinkosten) sicher anwenden.",
    "Vollkostenrechnung vs. Teilkostenrechnung unterscheiden.",
    "Drei Phasen der PKR (Tätigkeit, Teilprozess, Hauptprozess) durchführen.",
    "lmi-/lmn-Prozesse erkennen und Umlage anwenden.",
    "Prozesskostensatz berechnen und auf Produkte/Aufträge anwenden.",
    "Allokations-, Komplexitäts- und Degressionseffekt benennen.",
  ],
  priority: "A",
  examReference: "Aufgabe 4",
  examTip:
    "Reihenfolge: 1) Kosten trennen (fix/variabel, Einzel-/Gemein), 2) Maßgrößen bestimmen, 3) lmi/lmn unterscheiden, 4) Prozesskostensatz bilden, 5) Umlage für lmn, 6) Produktkosten = Menge × Satz. Zwischenrechnungen IMMER hinschreiben.",
  commonMistakes: [
    "Gesamtkosten direkt durch Maßgröße teilen, ohne Fixkosten abzuziehen.",
    "Produktmenge mit Gesamtmenge der Maßgröße verwechseln.",
    "lmn-Umlage vergessen oder doppelt anwenden.",
    "Beschäftigungsgrad mit ROI verwechseln.",
  ],
  trainers: ["pkr"],
  groups: [
    {
      title: "1 · Kostenbegriffe",
      color: "orange",
      blocks: [
        {
          id: "k6-grundbegriffe",
          title: "Kosten, Leistungen und Beschäftigung",
          intro: "Recap der Kosten- und Leistungsrechnung.",
          simple:
            "Kosten = betriebliche Aufwendungen. Leistungen = betriebliche Erträge. Leistungen > Kosten = Betriebsgewinn.",
          detail:
            "Beschäftigung beschreibt das Leistungsvermögen pro Zeiteinheit. Beschäftigungsgrad = tatsächliche Produktion / technische Maximalproduktion.",
          example:
            "200.000 Stück bei 80 % Auslastung -> max. 250.000 Stück. Geplant 225.000 -> 90 % Auslastung.",
          mnemonic: "Kosten - Leistungen = Verlust oder Gewinn.",
          exam: "Theoriefragen + Recap.",
        },
        {
          id: "k6-kategorisierung",
          title: "Kostenarten, -stellen, -träger",
          intro: "Welche, wo, wofür?",
          simple:
            "Kostenarten = welche? Kostenstellen = wo? Kostenträger = wofür?",
          detail:
            "Kostenarten: Material, Personal, Energie, Abschreibung, Miete. Kostenstellen: Material, Fertigung, Verwaltung, Vertrieb. Kostenträger: Produkte, Aufträge, Dienstleistungen.",
          mnemonic: "Welche - Wo - Wofür.",
          exam: "Definitionsfragen.",
        },
        {
          id: "k6-fix-var",
          title: "Fixkosten vs. variable Kosten",
          intro: "Verhalten in Abhängigkeit der Beschäftigung.",
          simple:
            "Fixkosten bleiben kurzfristig konstant. Variable Kosten ändern sich mit der Menge.",
          detail:
            "K = Kf + Kv. Stückkosten k = K / x = Kf/x + Kv/x. Bei höherer Menge sinkt der fixe Anteil pro Stück (Fixkostendegression).",
          example:
            "Kf 150.000 EUR/Monat, kv 120 EUR/Stück. Bei 1.000 Stück: K = 150.000 + 120.000 = 270.000.",
          mnemonic: "Fix bleibt. Variabel folgt der Menge.",
          exam: "Aufgabe 4 - Kostenfunktion.",
        },
        {
          id: "k6-einzel-gemein",
          title: "Einzelkosten vs. Gemeinkosten",
          intro: "Zurechenbarkeit auf den Kostenträger.",
          simple:
            "Einzelkosten: direkt zurechenbar. Gemeinkosten: nur über Schlüssel oder Prozesskostensätze.",
          detail:
            "Einzelkosten z. B. spezifisches Holz für Kommode. Gemeinkosten z. B. Lagerkosten oder Marketing. Einzelkosten meist variabel; Gemeinkosten können fix oder variabel sein.",
          table: [
            ["Kombination", "möglich?"],
            ["Einzelkosten + variabel", "ja, häufig"],
            ["Gemeinkosten + fix", "ja, häufig"],
            ["Gemeinkosten + variabel", "ja"],
            ["Einzelkosten + fix", "selten"],
          ],
          trap: "'Gemeinkosten sind immer Fixkosten' ist falsch.",
          mnemonic: "Direkt = Einzel. Indirekt = Gemein.",
          exam: "Theoriefrage in Aufgabe 4.",
        },
      ],
    },
    {
      title: "2 · Voll- vs. Teilkostenrechnung",
      color: "violet",
      blocks: [
        {
          id: "k6-voll-teil",
          title: "Welche Kosten werden zugerechnet?",
          intro: "Zwei Sichtweisen der Kostenrechnung.",
          simple:
            "Vollkostenrechnung verteilt alle Kosten. Teilkostenrechnung (Deckungsbeitrag) nur die variablen.",
          detail:
            "Vollkostenrechnung: ermittelt langfristige Preisuntergrenze. Teilkostenrechnung (Deckungsbeitrag): nützlich für kurzfristige Entscheidungen wie Auftragsannahme.",
          mnemonic: "Voll = langfristig. Teil = kurzfristig.",
          exam: "Theoriefrage zur Definition.",
        },
        {
          id: "k6-zuschlag",
          title: "Zuschlagskalkulation",
          intro: "Der traditionelle Weg zur Verteilung von Gemeinkosten.",
          simple:
            "Zuschlagssatz = Summe Gemeinkosten / Summe Einzelkosten. Auf Einzelkosten wird der Zuschlag multipliziert.",
          detail:
            "Problem: nimmt an, dass Gemeinkosten proportional zu Einzelkosten verteilt sind. In der Realität verbrauchen komplexe Produkte oft viel mehr Gemeinkosten -> nicht verursachungsgerecht. Deshalb gibt es PKR.",
          example: "Gemeinkosten 300.000, Einzelkosten 750.000 -> 40 % Zuschlag.",
          trap: "Zuschlagsmethode verzerrt komplexe Produkte.",
          exam: "Hintergrund + Kritik.",
        },
      ],
    },
    {
      title: "3 · Prozesskostenrechnung",
      color: "rose",
      blocks: [
        {
          id: "k6-pkr-warum",
          title: "Warum Prozesskostenrechnung?",
          intro: "Verursachungsgerechte Verteilung der Gemeinkosten.",
          simple:
            "PKR fragt: welche Prozesse verursachen welche Kosten und welcher Kostentreiber erklärt sie? Auf dieser Basis verteilt sie Gemeinkosten.",
          detail:
            "Vor allem in indirekten Bereichen (Beschaffung, Forschung, Vertrieb) liegen oft 70-80 % Gemeinkosten. Klassische Zuschlagskalkulation versagt hier.",
          example:
            "Bestellprozess wird durch Anzahl Bestellungen verursacht. Produkt mit vielen Kleinbestellungen verursacht überproportional Kosten.",
          mnemonic: "Wo entsteht wirklich Aufwand?",
          exam: "Aufgabe 4 - Verständnis statt nur Rechnen.",
          visual: "pkr-flow",
        },
        {
          id: "k6-pkr-stufen",
          title: "Drei Phasen der PKR",
          intro: "Tätigkeitsanalyse → Teilprozesse → Hauptprozesse.",
          simple:
            "1. Tätigkeiten identifizieren. 2. Zu Teilprozessen mit Maßgrößen zusammenfassen. 3. Teilprozesse zu Hauptprozessen aggregieren (Cost Driver).",
          detail:
            "Nicht jeder Tätigkeit kann eine Maßgröße zugeordnet werden. Lmi-Prozesse haben eine Maßgröße. Lmn-Prozesse fallen mengenunabhängig an und werden umgelegt.",
          mnemonic: "Tätigkeit -> Teilprozess -> Hauptprozess.",
          exam: "Theoriefrage + Strukturierung.",
          visual: "pkr-flow",
        },
        {
          id: "k6-lmi-lmn",
          title: "lmi und lmn",
          intro: "Wesentliche Unterscheidung.",
          simple:
            "lmi (leistungsmengeninduziert): hängt von der Maßgröße ab. lmn (leistungsmengenneutral): fällt unabhängig an.",
          detail:
            "lmn-Kosten werden durch Umlage auf lmi-Prozesse verteilt. Umlagesatz = lmn-Kosten / Summe TPKosten mit Maßgröße × Teilprozesskostensatz.",
          example:
            "lmi: 'Werkstoffe annehmen' (Maßgröße: Anlieferungen). lmn: 'Abteilungsleitung' (keine Maßgröße).",
          mnemonic: "lmi folgt der Menge. lmn ist mengenneutral.",
          exam: "Wichtig für Aufgabe 4.",
        },
        {
          id: "k6-prozesssatz",
          title: "Prozesskostensatz und Produktkosten",
          intro: "Die Schlüsselformeln.",
          simple:
            "Variable Prozesskosten = Gesamtkosten - Fixkosten. Variabler Prozesskostensatz = variable Prozesskosten / Maßgröße. Produktkosten = Menge des Produkts × Satz.",
          detail:
            "Bei lmn-Anteilen: Prozesskostensatz = lmi-Satz + Umlagesatz. Achte darauf, dass die Maßgröße den Prozess wirklich verursacht.",
          example:
            "Gesamtkosten 120.000, Fix 30.000, Maßgröße 9.000 Bestellungen. Variable PK 90.000, Satz 10/Bestellung. Produkt mit 600 Bestellungen: 6.000 EUR.",
          mnemonic: "Erst variabel, dann pro Stück, dann pro Produkt.",
          exam: "Aufgabe 4 - Kernrechnung.",
          visual: "pkr-flow",
          miniCheck: {
            prompt: "Gesamtkosten 120.000, Fix 30.000, 9.000 Bestellungen. Variabler Satz?",
            options: ["10", "13,33", "20", "30"],
            correctIndex: 0,
            explain:
              "(120.000 − 30.000) / 9.000 = 90.000 / 9.000 = 10 EUR/Bestellung.",
          },
        },
      ],
    },
    {
      title: "4 · Effekte und Mehrwert",
      color: "lime",
      blocks: [
        {
          id: "k6-effekte",
          title: "Allokations-, Komplexitäts-, Degressionseffekt",
          intro: "Was ändert sich durch PKR?",
          simple:
            "Allokationseffekt: Gemeinkosten verursachungsgerechter zugeordnet. Komplexitätseffekt: komplexe Produkte tragen ihre Kosten. Degressionseffekt: bei steigender Menge sinken Kosten pro Stück.",
          detail:
            "Diese drei Effekte erklären, warum Produkte unter PKR oft anders bewertet werden als unter Zuschlagskalkulation.",
          mnemonic: "Allokation - Komplexität - Degression.",
          exam: "Theoriefrage.",
        },
      ],
    },
  ],
  quiz: [
    {
      id: "k6-q1",
      question: "Wie berechnet man den variablen Prozesskostensatz?",
      answer:
        "(Gesamtkosten − Fixkosten) / Gesamtmenge der Maßgröße.",
    },
    {
      id: "k6-q2",
      question: "Was bedeutet lmi?",
      answer:
        "Leistungsmengeninduziert: Prozesskosten hängen von der Maßgröße ab.",
    },
    {
      id: "k6-q3",
      question: "Was bedeutet lmn?",
      answer:
        "Leistungsmengenneutral: Prozesskosten fallen unabhängig von der Mengenausprägung an.",
    },
    {
      id: "k6-q4",
      question: "Wie verteilt man lmn-Kosten?",
      answer:
        "Über Umlage proportional zu den lmi-Teilprozesskosten.",
    },
    {
      id: "k6-q5",
      question: "Was sind die drei Phasen der PKR?",
      answer:
        "Tätigkeitsanalyse, Bildung von Teilprozessen mit Maßgrößen, Aggregation zu Hauptprozessen mit Cost Drivern.",
    },
    {
      id: "k6-q6",
      question: "Unterschied Vollkosten- und Teilkostenrechnung?",
      answer:
        "Vollkosten: alle Kosten werden Kostenträgern zugerechnet. Teilkosten: nur variable Kosten.",
    },
    {
      id: "k6-q7",
      question: "Was ist ein Cost Driver?",
      answer:
        "Maßgröße auf Hauptprozessebene, die die Kostenverursachung beim Kostenträger erklärt.",
    },
    {
      id: "k6-q8",
      question: "Beschäftigungsgrad?",
      answer:
        "Tatsächliche Produktion / technische Maximalproduktion.",
    },
    {
      id: "k6-q9",
      question: "Welche Effekte hat die PKR?",
      answer:
        "Allokationseffekt, Komplexitätseffekt, Degressionseffekt.",
    },
    {
      id: "k6-q10",
      question: "Warum ist Zuschlagskalkulation problematisch?",
      answer:
        "Sie nimmt an, Gemeinkosten verteilen sich proportional zu Einzelkosten - das stimmt selten.",
    },
    {
      id: "k6-q11",
      question: "Was sind Stückkosten?",
      answer: "k = K / x = Kf/x + Kv/x.",
    },
    {
      id: "k6-q12",
      question: "Was sind typische lmn-Kosten?",
      answer:
        "Abteilungsleitung, allgemeine Verwaltung - sie fallen unabhängig von der Maßgröße an.",
    },
  ],
  tasks: [
    {
      id: "k6-task-1",
      kind: "calc",
      prompt:
        "Gesamtkosten 120.000, Fixkosten 30.000, Maßgröße 9.000 Bestellungen. Produkt A nutzt 600 Bestellungen, Produkt B nutzt 1.400. Berechne variable Prozesskosten, Prozesskostensatz und variable Produktkosten von A und B.",
      expected:
        "Variable Prozesskosten = 90.000. Satz = 10 EUR/Bestellung. A: 6.000 EUR. B: 14.000 EUR.",
      steps: [
        "Variable PK = 120.000 - 30.000 = 90.000.",
        "Satz = 90.000 / 9.000 = 10.",
        "A = 600 × 10 = 6.000.",
        "B = 1.400 × 10 = 14.000.",
      ],
      trap: "120.000 / 9.000 statt 90.000 / 9.000 ist falsch.",
      exam: "Klassische Aufgabe 4.",
    },
    {
      id: "k6-task-2",
      kind: "calc",
      prompt:
        "Teilprozesskosten 'Werkstoffe annehmen' = 80.000 EUR bei 500 Anlieferungen. lmn-Kosten 70.000 EUR. Summe lmi-Teilprozesskosten 240.000. Prozesskostensatz pro Anlieferung?",
      expected: "lmi-Satz 160 EUR. Umlage 46,67 EUR. Gesamt 206,67 EUR pro Anlieferung.",
      steps: [
        "lmi-Satz = 80.000 / 500 = 160.",
        "Umlage = (70.000 / 240.000) × 160 = 0,2917 × 160 = 46,67.",
        "Prozesskostensatz = 160 + 46,67 = 206,67 EUR.",
      ],
      hint: "Erst lmi rechnen, dann Umlage drauf.",
      exam: "Aufgabe 4 - Mit Umlage.",
    },
    {
      id: "k6-task-3",
      kind: "calc",
      prompt:
        "Beschäftigungsgrad = ?, wenn 200.000 Stück bei 80 % Auslastung produziert werden und neu 225.000 geplant sind.",
      expected: "Maximalkapazität 250.000. Neuer Beschäftigungsgrad 90 %.",
      steps: [
        "Max = 200.000 / 0,8 = 250.000.",
        "Neu = 225.000 / 250.000 = 0,9 = 90 %.",
      ],
    },
  ],
};
