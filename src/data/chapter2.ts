import type { ChapterDefinition } from "../types";

export const chapter2: ChapterDefinition = {
  id: "kapitel-2",
  number: 2,
  title: "Geschäftsprozessmodellierung",
  subtitle: "Modellbegriff, Notationsarten, Swimlane, eEPK, Überblick",
  whyImportant:
    "Bevor du BPMN und Petrinetze sicher anwendest, musst du verstehen, warum man modelliert und welche Sprachen es gibt. Dieses Kapitel ist die Brücke zwischen GPM und konkreten Modellen.",
  learningGoals: [
    "Sinn und Mehrwert eines Modells erklären.",
    "Geschäftsprozess von Workflow abgrenzen.",
    "Modellierungsansätze einordnen (datenorientiert, kontrollflussorientiert, objektorientiert, hybrid).",
    "Swimlane-Diagramm und eEPK lesen und einfache Beispiele zeichnen.",
  ],
  priority: "B",
  examReference: "Aufgaben 1, 7",
  examTip:
    "Modell ist nicht Wirklichkeit. Sage zuerst, warum man modelliert: Verstehen, Kommunizieren, Verbessern, Automatisieren. Notationen kennen reicht für Theoriefragen.",
  commonMistakes: [
    "Workflow und Geschäftsprozess synonym verwenden.",
    "Modell und Wirklichkeit gleichsetzen.",
    "EPK ohne Ereignis-Funktion-Wechsel zeichnen.",
    "Konnektoren am falschen Ort einsetzen (Ereignisse können nicht entscheiden).",
  ],
  trainers: [],
  groups: [
    {
      title: "1 · Warum modellieren?",
      color: "sky",
      blocks: [
        {
          id: "k2-warum",
          title: "Modell und Wirklichkeit",
          intro: "Ein Modell ist eine Abstraktion - nie die Realität.",
          simple:
            "Wir modellieren, um Prozesse zu verstehen, zu kommunizieren, Probleme zu finden und zu automatisieren.",
          detail:
            "Einstein sinngemäß: Man muss die Welt nicht verstehen, man muss sich nur darin zurechtfinden. Genau das leistet ein Modell - es zeigt das Wesentliche und verschweigt Nebensächliches. Modelle sind die Voraussetzung für Analyse, Verbesserung, Implementierung und Automatisierung.",
          bullets: [
            "Verstehen: Komplexität reduzieren",
            "Kommunizieren: gemeinsame Sprache zwischen Fachbereich und IT",
            "Verbessern: Schwachstellen sichtbar machen",
            "Automatisieren: Workflow-Engines können BPMN ausführen",
          ],
          mnemonic: "Verstehen - Reden - Verbessern - Automatisieren.",
          exam: "Theoriefrage: Mehrwert von Modellen.",
        },
        {
          id: "k2-gp-vs-workflow",
          title: "Geschäftsprozess vs. Workflow",
          intro: "Eine wichtige Abgrenzung.",
          simple:
            "Geschäftsprozess beschreibt den Ablauf. Workflow ist der durch IT gesteuerte Geschäftsprozess.",
          detail:
            "Detaillierungsgrad GP: was tut ein Mitarbeiter in einem Schritt? Detaillierungsgrad Workflow: konkret genug, dass eine Software den Schritt ausführen kann. Kurz: Workflows sind digital ausgeführte und IT-gesteuerte Geschäftsprozesse.",
          table: [
            ["Begriff", "Detail", "Beispiel"],
            ["Geschäftsprozess", "fachlich, organisationsweit", "Reklamation bearbeiten"],
            ["Workflow", "IT-gesteuert, ausführbar", "Reisekostenfreigabe in SAP"],
            ["GPMS", "Software für Definition + Ausführung", "Camunda, IBM BPM"],
          ],
          mnemonic: "GP fachlich. Workflow technisch. GPMS = Maschinenraum.",
          exam: "Aufgabe 1 - Begriffsdefinitionen.",
        },
      ],
    },
    {
      title: "2 · Modellierungsansätze",
      color: "violet",
      blocks: [
        {
          id: "k2-ansaetze",
          title: "Vier Schulen der Modellierung",
          intro: "Skript, Diagramm, Daten, Objekt - alle haben ihren Platz.",
          simple:
            "Datenorientiert: Datenfluss. Kontrollflussorientiert: Reihenfolge der Aktivitäten. Objektorientiert: UML / Aktivitätsdiagramm. Hybrid: Wertstrom, Business Model Canvas.",
          detail:
            "In der Praxis haben sich kontrollflussorientierte Diagrammsprachen (Swimlane, eEPK, BPMN, Petrinetze) durchgesetzt, weil sie verständlich sind und sich für Analyse + Automatisierung eignen.",
          table: [
            ["Ansatz", "Fokus", "Beispiele"],
            ["Datenorientiert", "Datenfluss", "Datenmodell, Datenflussdiagramm"],
            ["Kontrollflussorientiert", "Aktivitäten + Reihenfolge", "Swimlane, eEPK, BPMN, Petri"],
            ["Objektorientiert", "Objekte + Methoden", "UML-Aktivitätsdiagramm"],
            ["Hybrid", "Strategie + Wertstrom", "BMC, Wertstromanalyse"],
          ],
          mnemonic: "Daten, Kontroll, Objekt, Hybrid - der Werkzeugkasten.",
          exam: "Theoriefrage: Ansätze nennen und Beispiele geben.",
        },
      ],
    },
    {
      title: "3 · Swimlane-Diagramm",
      color: "cyan",
      blocks: [
        {
          id: "k2-swimlane",
          title: "Swimlane: Wer macht was?",
          intro: "Verantwortungsbereiche als Bahnen.",
          simple:
            "Swimlane-Diagramme zeigen Aktivitäten in Bahnen pro Akteur. Ein Wechsel der Bahn bedeutet Übergabe.",
          detail:
            "Vorteile: gute Übersicht, klare Verantwortung. Nachteile: weniger geeignet für sehr komplexe Verzweigungen oder Datenflüsse.",
          table: [
            ["Symbol", "Bedeutung"],
            ["Bahn", "Akteur / Rolle / Abteilung"],
            ["Rechteck", "Aktivität"],
            ["Raute", "Entscheidung"],
            ["Pfeil", "Reihenfolge / Übergabe"],
          ],
          example:
            "Bestellung im Online-Shop: Kunde -> Vertrieb (Prüfung) -> Lager (Versand) -> Kunde (Empfang).",
          mnemonic: "Bahn pro Akteur, Pfeil pro Übergabe.",
          exam: "Theorie + leichte Modellierungsaufgaben.",
        },
      ],
    },
    {
      title: "4 · EPK und eEPK",
      color: "lime",
      blocks: [
        {
          id: "k2-epk",
          title: "Ereignisgesteuerte Prozesskette",
          intro: "Wechsel zwischen Ereignis und Funktion.",
          simple:
            "Eine EPK wechselt zwischen Ereignis (passiv, Zustand) und Funktion (aktiv, Tätigkeit). Verknüpft werden sie durch Konnektoren (XOR, AND, OR).",
          detail:
            "Regeln: Start- und Endereignis vorhanden. Ein Ereignis kann KEINE Entscheidung treffen - dafür gibt es Konnektoren nach Funktionen. eEPK ergänzt Organisationseinheit, Informationsobjekt, Anwendungssystem und Datenfluss.",
          bullets: [
            "Ereignis: Substantiv + Verb (Perfekt) - 'Bestellung eingegangen'",
            "Funktion: Substantiv + Verb - 'Bestellung prüfen'",
            "Konnektor XOR: genau ein Pfad",
            "Konnektor AND: alle Pfade parallel",
          ],
          trap: "Ein Ereignis vor einem XOR-Konnektor ist nicht erlaubt - Ereignisse entscheiden nicht.",
          mnemonic: "Ereignis - Funktion - Ereignis - Funktion ...",
          exam: "Theoriefrage: Modell lesen und Aussagen prüfen.",
        },
      ],
    },
    {
      title: "5 · Überblick Notationen",
      color: "slate",
      blocks: [
        {
          id: "k2-vergleich",
          title: "Wann welche Notation?",
          intro: "Jede Notation hat ihre Stärken.",
          simple:
            "Swimlane für Verantwortlichkeiten, eEPK für SAP-nahe Prozesse, BPMN für End-to-End und Automatisierung, Petrinetze für formale Analyse.",
          detail:
            "BPMN ist der internationale Standard (ISO/IEC 19510:2013) und auf Workflow-Engines direkt ausführbar. Petrinetze sind formal mathematisch und ideal für Eigenschaftsprüfung. eEPKs waren in SAP-Umgebungen lange Standard.",
          table: [
            ["Notation", "Stärke", "Schwäche"],
            ["Swimlane", "Rollen sichtbar", "wenig formal"],
            ["eEPK", "ARIS-kompatibel", "viele Symbole"],
            ["BPMN", "Standard, ausführbar", "Lernkurve"],
            ["Petrinetz", "formal analysierbar", "abstrakt"],
          ],
          mnemonic: "Swimlane = Rolle. eEPK = SAP. BPMN = Standard. Petri = Beweis.",
          exam: "Theoriefragen zur Auswahl der Notation.",
        },
      ],
    },
  ],
  quiz: [
    {
      id: "k2-q1",
      question: "Warum modelliert man Geschäftsprozesse?",
      answer:
        "Um Prozesse zu verstehen, mit anderen zu kommunizieren, Probleme zu erkennen, Prozesse zu verbessern und für Automatisierung vorzubereiten.",
    },
    {
      id: "k2-q2",
      question: "Geschäftsprozess vs. Workflow?",
      answer:
        "Geschäftsprozess ist der fachliche Ablauf. Workflow ist ein durch IT/Software gesteuerter Geschäftsprozess.",
    },
    {
      id: "k2-q3",
      question: "Nenne 4 Modellierungsansätze.",
      answer: "Datenorientiert, kontrollflussorientiert, objektorientiert, hybrid.",
    },
    {
      id: "k2-q4",
      question: "Welche Notation ist ISO-Standard und ausführbar?",
      answer: "BPMN 2.0 (ISO/IEC 19510:2013).",
    },
    {
      id: "k2-q5",
      question: "Welche Symbole hat ein Swimlane-Diagramm?",
      answer:
        "Bahnen für Akteure, Rechtecke für Aktivitäten, Rauten für Entscheidungen, Pfeile für Reihenfolge.",
    },
    {
      id: "k2-q6",
      question: "Wechsel in einer EPK?",
      answer:
        "Ereignis (passiv, Zustand) und Funktion (aktiv, Tätigkeit) wechseln sich ab.",
    },
    {
      id: "k2-q7",
      question: "Warum kann ein Ereignis keinen XOR-Konnektor splitten?",
      answer:
        "Weil Ereignisse keine Entscheidungen treffen können. Entscheidungen kommen nur nach Funktionen.",
    },
    {
      id: "k2-q8",
      question: "Was kommt in einer eEPK zusätzlich zur EPK dazu?",
      answer:
        "Organisationseinheit, Informationsobjekt, Anwendungssystem und Datenfluss.",
    },
    {
      id: "k2-q9",
      question: "Was ist der Vorteil eines Swimlane-Diagramms?",
      answer:
        "Klar erkennbare Verantwortung und Übergaben zwischen Akteuren.",
    },
    {
      id: "k2-q10",
      question: "Was ist eine Workflow-Engine?",
      answer:
        "Eine Software, die ausführbare Prozessmodelle (z. B. BPMN 2.0) interpretiert und Aufgaben verteilt.",
    },
  ],
  tasks: [
    {
      id: "k2-task-1",
      kind: "case",
      prompt:
        "Modelliere als Swimlane-Skizze: Kunde besucht Online-Shop, legt Produkte in den Warenkorb. Vertrieb prüft Bonität. Bei negativ -> Ablehnung. Sonst Lager prüft Bestand: vorhanden -> verpackt + verschickt; nicht vorhanden -> Fertigung produziert nach -> Versand verpackt + verschickt. Kunde empfängt.",
      expected:
        "4 Bahnen: Kunde, Vertrieb, Lager, Fertigung/Versand. Kunde startet (Bestellung). Vertrieb prüft Bonität (Raute -> ablehnen / weiter). Lager prüft Bestand (Raute -> verpacken/versenden / weiter zur Fertigung). Fertigung produziert nach. Versand verpackt + versendet. Kunde empfängt = Endpunkt.",
      steps: [
        "Akteure identifizieren: Kunde, Vertrieb, Lager, Fertigung, Versand.",
        "Bahnen anlegen.",
        "Aktivitäten als Rechtecke einfügen.",
        "Entscheidungen als Rauten.",
        "Pfeile + Endereignis prüfen.",
      ],
      exam: "Aufgabe 7 oder Theorie zu Notationen.",
    },
    {
      id: "k2-task-2",
      kind: "definition",
      prompt:
        "Erkläre den Unterschied zwischen Geschäftsprozess, Workflow und Workflow-Engine.",
      expected:
        "Geschäftsprozess: fachlicher Ablauf. Workflow: digitalisiertes Teilstück mit IT-Steuerung. Workflow-Engine: Software, die Workflowmodelle ausführt.",
      steps: [
        "Geschäftsprozess fachlich definieren.",
        "Workflow als IT-gesteuerten GP definieren.",
        "Workflow-Engine als ausführende Komponente nennen.",
      ],
    },
  ],
};
