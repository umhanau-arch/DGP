import type { ChapterDefinition } from "../types";

export const chapter7: ChapterDefinition = {
  id: "kapitel-7",
  number: 7,
  title: "Process Mining",
  subtitle: "Eventlogs, Traces, Footprint, Alpha-Algorithmus, Workflownetze",
  whyImportant:
    "Process Mining verbindet IT-Daten mit Prozessmanagement. Aufgabe 8 verlangt fast immer: Eventlog gruppieren, Traces bilden, Varianten zählen, Beziehungen bestimmen und Footprint-Matrix ausfüllen.",
  learningGoals: [
    "Process Mining definieren und in IT/Process Science einordnen.",
    "Eventlog, Event, Case, Trace, Variante korrekt verwenden.",
    "Play-In, Play-Out, Replay unterscheiden.",
    "Direkte Folge >, Kausalität →, Parallelität ||, keine Beziehung # bestimmen.",
    "Footprint-Matrix korrekt ausfüllen.",
    "Workflownetze als Modellbasis erkennen.",
  ],
  priority: "A",
  examReference: "Aufgabe 8",
  examTip:
    "Reihenfolge: 1) nach Case ID gruppieren, 2) nach Timestamp sortieren, 3) Trace bilden, 4) Varianten zählen, 5) direkte Folgen aus allen Traces sammeln, 6) Beziehungen ableiten (a > b und b > a -> ||).",
  commonMistakes: [
    "Case und Event verwechseln (Case = Durchlauf, Event = Zeile).",
    "Bei Parallelität nur eine Richtung prüfen.",
    "Footprint vorzeitig festlegen, ohne alle Traces zu betrachten.",
    "Modell und Log nicht abgleichen (Conformance vergessen).",
  ],
  trainers: ["mining"],
  groups: [
    {
      title: "1 · Einordnung",
      color: "cyan",
      blocks: [
        {
          id: "k7-was-ist",
          title: "Was ist Process Mining?",
          intro: "Brücke zwischen Data Science und Process Science.",
          simple:
            "Process Mining gewinnt aus Eventdaten Prozesswissen: Modelle entdecken, Konformität prüfen, Engpässe finden.",
          detail:
            "Internet of Events: heute fallen massenhaft digitale Spuren an. Process Mining macht daraus Prozessmodelle, Vergleiche und Performance-Analysen. Kommerziell relevant: Celonis, IBM, SAP.",
          mnemonic: "Daten + Prozesse = Process Mining.",
          exam: "Definition.",
          visual: "mining-pipeline",
        },
        {
          id: "k7-arten",
          title: "Discovery, Conformance, Performance",
          intro: "Drei Arten von Process Mining.",
          simple:
            "Discovery: Modell aus Log entdecken. Conformance: Modell vs. Log abgleichen. Performance: Engpässe und Wartezeiten finden.",
          detail:
            "Discovery nutzt z. B. Alpha-Algorithmus. Conformance findet Abweichungen ('Replay'). Performance zeigt Bottlenecks und Durchlaufzeiten.",
          table: [
            ["Art", "Eingang", "Ausgang"],
            ["Discovery", "Eventlog", "Prozessmodell"],
            ["Conformance", "Log + Modell", "Abweichungen"],
            ["Performance", "Log + Modell", "Wartezeiten, Engpässe"],
          ],
          mnemonic: "Discover, Compare, Optimize.",
          exam: "Theorie - drei Arten erklären.",
          visual: "mining-pipeline",
        },
      ],
    },
    {
      title: "2 · Eventlogs und Traces",
      color: "sky",
      blocks: [
        {
          id: "k7-eventlog",
          title: "Eventlog: Pflichtfelder",
          intro: "Mindestens drei Spalten.",
          simple:
            "Ein Eventlog enthält pro Event mindestens Case ID, Activity und Timestamp. Optional: Resource, Kosten, Produkt, Kunde.",
          detail:
            "Standardformat ist XES (eXtensible Event Stream). Im PDF werden gerne CSV-Tabellen gezeigt. Eine Zeile = ein Event. Mehrere Events bilden zusammen einen Case.",
          example:
            "Case 6350, place order, 2018-02-13 14:29 ; Case 6350, send invoice, 2018-02-21 ...",
          mnemonic: "Case + Activity + Timestamp = Pflicht.",
          exam: "Aufgabe 8 - Pflichtfelder nennen.",
        },
        {
          id: "k7-case-trace",
          title: "Case, Event, Trace, Variante",
          intro: "Saubere Begriffe sind die halbe Punktzahl.",
          simple:
            "Event = einzelne Zeile. Case = ein Durchlauf, gruppiert nach Case ID. Trace = Aktivitätsfolge eines Cases nach Timestamp sortiert. Variante = Trace-Muster mit Häufigkeit.",
          detail:
            "Aus 12.666 Cases kann es nur wenige Varianten geben, wenn die meisten Cases denselben Trace haben.",
          example:
            "C1: <a,b,c>, C2: <a,c,b>, C3: <a,b,c>. Varianten: <a,b,c> 2x, <a,c,b> 1x.",
          mnemonic: "Event = Zeile. Case = Akte. Trace = Reihenfolge. Variante = Muster.",
          exam: "Aufgabe 8 - oft als Verständnisfrage.",
        },
        {
          id: "k7-play",
          title: "Play-Out, Play-In, Replay",
          intro: "Drei Beziehungen Modell - Log.",
          simple:
            "Play-Out: aus Modell Logs erzeugen. Play-In: aus Log Modell finden (Discovery). Replay: Log auf Modell abspielen (Conformance).",
          detail:
            "Workflow-Engine ist im Prinzip eine Play-Out-Engine. Discovery-Algorithmen sind Play-In-Verfahren. Replay deckt Abweichungen auf.",
          mnemonic: "Out = simulieren. In = entdecken. Replay = vergleichen.",
          exam: "Definitionen.",
        },
      ],
    },
    {
      title: "3 · Footprint und Alpha-Algorithmus",
      color: "lime",
      blocks: [
        {
          id: "k7-footprint",
          title: "Beziehungen >, →, ||, #",
          intro: "Vier Beziehungstypen pro Aktivitätspaar.",
          simple:
            "x > y: y folgt direkt auf x mindestens einmal. x → y: x>y aber NICHT y>x. x || y: x>y UND y>x. x # y: weder x>y noch y>x.",
          detail:
            "Erst sammelst du alle direkten Folgen aus allen Traces. Dann leitest du daraus die Beziehung ab.",
          table: [
            ["Symbol", "Bedeutung"],
            [">", "direkte Folge"],
            ["→", "Kausalität (nur eine Richtung)"],
            ["||", "Parallelität (beide Richtungen)"],
            ["#", "keine Beziehung"],
          ],
          mnemonic: "Eine Richtung = →. Beide = ||. Keine = #.",
          exam: "Aufgabe 8 - Footprint-Matrix.",
          visual: "footprint-legend",
        },
        {
          id: "k7-alpha",
          title: "Alpha-Algorithmus (Idee)",
          intro: "Modell aus Log konstruieren.",
          simple:
            "Aus Footprint-Beziehungen werden Stellen und Transitionen abgeleitet. Kausalität → ergibt Pfeile, Parallelität || ergibt parallele Pfade.",
          detail:
            "Im Klausurkontext reicht oft, die Footprint-Matrix korrekt zu füllen und mögliche Traces zu prüfen.",
          mnemonic: "Footprint -> Petrinetz.",
          exam: "Aufgabe 8 - Alpha-Vorgehen erklären.",
          visual: "footprint-legend",
        },
      ],
    },
    {
      title: "4 · Process Mining in der Praxis",
      color: "violet",
      blocks: [
        {
          id: "k7-praxis",
          title: "Was bringt Process Mining im Unternehmen?",
          intro: "Bottlenecks, Compliance, Variantenvielfalt.",
          simple:
            "Process Mining zeigt die Realität der Prozesse - mit allen Abweichungen, Wartezeiten und Sonderfällen.",
          detail:
            "Praktische Erkenntnisse: tausende Varianten in 'einfachen' Kernprozessen, übersehene Engpässe, Compliance-Verstöße. Tools: Celonis, ProM, Disco.",
          example:
            "P2P-Prozess: 71.043 Events, 12.666 Cases, oft hunderte Varianten durch Nacharbeit, Übergaben, Stornierungen.",
          mnemonic: "Realität schlägt Modell.",
          exam: "Theoriefrage zur Relevanz.",
        },
      ],
    },
  ],
  quiz: [
    {
      id: "k7-q1",
      question: "Welche Pflichtfelder hat ein Eventlog?",
      answer: "Case ID, Activity, Timestamp.",
    },
    {
      id: "k7-q2",
      question: "Was ist ein Trace?",
      answer:
        "Die Aktivitätsfolge eines Cases, nach Timestamp sortiert.",
    },
    {
      id: "k7-q3",
      question: "Was ist eine Variante?",
      answer:
        "Ein bestimmtes Trace-Muster mit Häufigkeit.",
    },
    {
      id: "k7-q4",
      question: "Was bedeutet a > b?",
      answer: "Im Log folgt b mindestens einmal direkt auf a.",
    },
    {
      id: "k7-q5",
      question: "Wann gilt a → b?",
      answer:
        "Wenn a > b vorkommt, aber b > a NICHT.",
    },
    {
      id: "k7-q6",
      question: "Wann gilt a || b?",
      answer:
        "Wenn a > b UND b > a vorkommen (Parallelität).",
    },
    {
      id: "k7-q7",
      question: "Wann gilt a # b?",
      answer:
        "Wenn weder a > b noch b > a vorkommt (keine Beziehung).",
    },
    {
      id: "k7-q8",
      question: "Was ist Discovery?",
      answer:
        "Aus einem Eventlog wird ein Prozessmodell entdeckt (Play-In).",
    },
    {
      id: "k7-q9",
      question: "Was ist Conformance Checking?",
      answer:
        "Vergleich von Log und Modell zur Aufdeckung von Abweichungen (Replay).",
    },
    {
      id: "k7-q10",
      question: "Was ist Performance Diagnostics?",
      answer:
        "Identifikation von Engpässen, Wartezeiten und Ressourcenproblemen.",
    },
    {
      id: "k7-q11",
      question: "Was ist XES?",
      answer:
        "Standardformat (IEEE) für Eventlogs.",
    },
    {
      id: "k7-q12",
      question: "Warum sind Workflownetze die Basis für PM-Modelle?",
      answer:
        "Weil sie eindeutigen Start/Ende und Korrektheit garantieren - ein Case soll sauber starten und enden.",
    },
  ],
  tasks: [
    {
      id: "k7-task-1",
      kind: "mining",
      prompt:
        "Eventlog: C1 hat A 10:00, C 10:10, B 10:05. Bilde den Trace.",
      expected: "<A, B, C>",
      steps: [
        "Case ID = C1.",
        "Sortiere nach Timestamp: A (10:00), B (10:05), C (10:10).",
        "Trace = <A, B, C>.",
      ],
      trap: "Reihenfolge im Log != Reihenfolge im Trace.",
    },
    {
      id: "k7-task-2",
      kind: "mining",
      prompt:
        "Log L = [<A,B,C>×3, <A,C,B>×2, <A,E,D>]. Welche Beziehung haben B und C?",
      expected: "B || C (Parallelität).",
      steps: [
        "Direkte Folgen: B>C aus <A,B,C>. C>B aus <A,C,B>.",
        "Beide Richtungen kommen vor -> Parallelität.",
      ],
      hint: "Sammle alle direkten Folgen, bevor du die Beziehung bestimmst.",
    },
    {
      id: "k7-task-3",
      kind: "mining",
      prompt:
        "Im Log L = [<a,b,c,d>, <a,c,b,d>] - was sind a und b in der Footprint-Matrix?",
      expected: "a → b (Kausalität).",
      steps: [
        "Direkte Folgen: a>b und a>c. Auch b>c, c>b, b>d, c>d.",
        "Kommt b>a vor? Nein.",
        "Also a → b.",
      ],
    },
    {
      id: "k7-task-4",
      kind: "mining",
      prompt:
        "Erkläre, was du tust, um aus einem Eventlog Traces, Varianten und Footprint zu erhalten (Reihenfolge).",
      expected:
        "1) Nach Case ID gruppieren. 2) Pro Case nach Timestamp sortieren. 3) Trace = Aktivitätssequenz. 4) Gleiche Traces zu Varianten zählen. 5) Aus allen Traces direkte Folgen sammeln. 6) Daraus Footprint-Beziehungen ableiten.",
      steps: [
        "Gruppieren nach Case ID.",
        "Sortieren nach Timestamp.",
        "Traces erzeugen.",
        "Varianten zählen.",
        "Direkte Folgen sammeln.",
        "Beziehung pro Paar (>, →, ||, #) bestimmen.",
      ],
    },
  ],
};
