import type { ChapterDefinition } from "../types";

export const chapter3: ChapterDefinition = {
  id: "kapitel-3",
  number: 3,
  title: "BPMN",
  subtitle: "Business Process Model and Notation - End-to-End modellieren",
  whyImportant:
    "BPMN ist der Standard für Prozessmodellierung. In der Klausur kommt fast immer eine Modellierungsaufgabe (Aufgabe 7). Symbole erkennen reicht nicht - du musst saubere Pools, Gateways und Nachrichtenflüsse setzen.",
  learningGoals: [
    "BPMN-Symbole erkennen und richtig benennen.",
    "Pools und Lanes korrekt verwenden.",
    "Sequenzfluss und Nachrichtenfluss unterscheiden.",
    "XOR und AND-Gateways richtig modellieren.",
    "End-to-End-Prozesse mit Schleifen und Eskalation modellieren.",
  ],
  priority: "A",
  examReference: "Aufgabe 7",
  examTip:
    "Kunde und Unternehmen IMMER in getrennte Pools. Zwischen Pools nur Nachrichtenfluss (gestrichelt). XOR oder AND wählen, niemals Pfade ohne Zusammenführung enden lassen.",
  commonMistakes: [
    "Sequenzfluss zwischen Pools statt Nachrichtenfluss.",
    "Gateway-Typ falsch wählen (XOR vs. AND).",
    "Schleife bei 'unvollständige Angaben' vergessen.",
    "Tasks wie Ereignisse benennen (oder umgekehrt).",
  ],
  trainers: ["bpmn"],
  groups: [
    {
      title: "1 · BPMN-Grundlagen",
      color: "sky",
      blocks: [
        {
          id: "k3-was-ist",
          title: "Was ist BPMN?",
          intro: "Standardnotation für Geschäftsprozesse.",
          simple:
            "BPMN (Business Process Model and Notation) ist eine grafische Sprache für Geschäftsprozesse - international standardisiert und auf Workflow-Engines ausführbar.",
          detail:
            "BPMN 2.0 ist seit 2011 OMG-Standard und seit 2013 ISO/IEC 19510. Vorteile: Standard, ausführbar, weit verbreitet. Modelle können von Camunda und anderen Engines direkt interpretiert werden.",
          mnemonic: "BPMN: bauplan, prozess, modell, notation.",
          exam: "Definition + Vorteile.",
        },
      ],
    },
    {
      title: "2 · Symbole",
      color: "violet",
      blocks: [
        {
          id: "k3-events",
          title: "Events: Start, Zwischen, Ende",
          intro: "Ereignisse markieren Zustände.",
          simple:
            "Start: dünner Kreis. Zwischenereignis: doppelter Kreis. Ende: dicker Kreis. Mit Symbol innen für Nachricht, Zeit, Fehler etc.",
          detail:
            "Events sind passiv: 'Bestellung eingegangen', 'Antwort empfangen', 'Frist abgelaufen'. Verwechslungsgefahr: 'Bestellung prüfen' ist ein Task, kein Ereignis.",
          table: [
            ["Symbol", "Bedeutung", "Beispiel"],
            ["dünner Kreis", "Start", "Reklamation eingegangen"],
            ["doppelter Kreis", "Zwischen", "Antwort empfangen"],
            ["dicker Kreis", "Ende", "Fall geschlossen"],
            ["Brief im Kreis", "Nachrichtenereignis", "Mail-Eingang"],
            ["Uhr im Kreis", "Zeitereignis", "nach 7 Tagen"],
          ],
          mnemonic: "Dünn = Start. Doppel = Zwischen. Dick = Ende.",
          visual: "bpmn-symbols",
          exam: "Symbol erkennen oder zeichnen.",
        },
        {
          id: "k3-tasks",
          title: "Tasks und Subprozesse",
          intro: "Aktivitäten sind aktiv.",
          simple:
            "Task: abgerundetes Rechteck mit Verb + Objekt. Subprozess: Rechteck mit Plus-Symbol.",
          detail:
            "Verschiedene Task-Typen: User Task, Service Task, Send Task, Receive Task, Manual Task. Für Klausur reicht: 'Task' = Tätigkeit, sauber benennen mit Verb + Substantiv.",
          example: "'Reklamation prüfen', 'Ware versenden', 'Kunden informieren'.",
          mnemonic: "Task = Verb + Substantiv. Subprozess = Plus-Box.",
          exam: "Saubere Beschriftung gibt Punkte.",
          visual: "bpmn-symbols",
        },
        {
          id: "k3-gateways",
          title: "Gateways: XOR, AND, OR",
          intro: "Steuerung der Verzweigung.",
          simple:
            "XOR (Raute mit X): genau ein Pfad. AND (Raute mit +): alle Pfade parallel. OR (Raute mit O): einer oder mehrere.",
          detail:
            "Nach jedem Split ist eine Zusammenführung mit gleichem Gateway-Typ erwartet. XOR-Split + XOR-Join, AND-Split + AND-Join. Sonst entstehen Modellfehler.",
          table: [
            ["Gateway", "Symbol", "Bedeutung"],
            ["XOR", "Raute mit X", "genau einer"],
            ["AND", "Raute mit +", "alle parallel"],
            ["OR", "Raute mit O", "mindestens einer"],
          ],
          trap: "Pfad ohne Zusammenführung erzeugt Token-Probleme in der Engine.",
          mnemonic: "X = entweder/oder. + = und parallel. O = inklusive.",
          exam: "Aufgabe 7: Gateway-Typ wählen und Pfade führen.",
          visual: "bpmn-symbols",
        },
        {
          id: "k3-pools-lanes",
          title: "Pools und Lanes",
          intro: "Pool = Beteiligter, Lane = Rolle im Pool.",
          simple:
            "Jeder unabhängige Beteiligte (Kunde, Lieferant, Unternehmen) bekommt einen eigenen Pool. Innerhalb können Lanes Abteilungen oder Rollen sein.",
          detail:
            "Sehr wichtig: zwischen Pools darf KEIN Sequenzfluss laufen. Stattdessen Nachrichtenfluss (gestrichelte Linie). Sequenzfluss bleibt INNERHALB eines Pools.",
          example: "Pool Kunde + Pool Unternehmen mit Lanes Vertrieb, Lager, Buchhaltung.",
          mnemonic: "Pool = Spieler. Lane = Position.",
          exam: "Aufgabe 7: Pool-Trennung ist Pflicht für volle Punkte.",
          visual: "bpmn-pools",
        },
        {
          id: "k3-flows",
          title: "Sequenzfluss vs. Nachrichtenfluss",
          intro: "Eine der wichtigsten BPMN-Regeln.",
          simple:
            "Sequenzfluss: durchgezogen, INNERHALB eines Pools. Nachrichtenfluss: gestrichelt, ZWISCHEN Pools.",
          detail:
            "Diese Trennung sorgt dafür, dass Pools eigenständige Prozesse abbilden, die nur über klar erkennbare Nachrichten kommunizieren.",
          table: [
            ["Fluss", "Linie", "Wo?"],
            ["Sequenzfluss", "durchgezogen mit Pfeil", "innerhalb eines Pools"],
            ["Nachrichtenfluss", "gestrichelt mit Pfeil", "zwischen Pools"],
            ["Datenfluss", "gestrichelt mit kleiner Pfeilspitze", "Datenobjekt"],
          ],
          trap: "Sequenzfluss zwischen Pools ist falsch und verliert direkt Punkte.",
          mnemonic: "Im Pool = durchgezogen. Über Pool = gestrichelt.",
          exam: "Häufigster Fehler in Aufgabe 7.",
          visual: "bpmn-pools",
          miniCheck: {
            prompt: "Wie verbindest du in BPMN 'Kunde sendet Reklamation' und 'Unternehmen empfängt Reklamation' (verschiedene Pools)?",
            options: ["Sequenzfluss", "Nachrichtenfluss", "Datenobjekt", "Conditional Flow"],
            correctIndex: 1,
            explain:
              "Zwischen verschiedenen Pools ist immer Nachrichtenfluss (gestrichelte Linie).",
          },
        },
      ],
    },
    {
      title: "3 · Modellierungsstrategie",
      color: "lime",
      blocks: [
        {
          id: "k3-strategie",
          title: "Schritt-für-Schritt: Aus Text wird Modell",
          intro: "Eine bewährte Reihenfolge für die Klausur.",
          simple:
            "1. Akteure -> Pools/Lanes. 2. Auslöser -> Start-Event. 3. Aktivitäten -> Tasks. 4. Entscheidungen -> Gateways. 5. Kommunikation -> Nachrichtenflüsse. 6. Ende -> End-Events.",
          detail:
            "Lies den Text zweimal. Markiere Akteure, Verben, Entscheidungen und Nachrichten farbig. Beginne immer beim Auslöser. Endpunkte nicht vergessen.",
          bullets: [
            "Akteure markieren (= Pools/Lanes)",
            "Verben markieren (= Tasks)",
            "Entscheidungen markieren (= Gateways)",
            "Wenn 'sendet/empfängt' -> Nachrichtenfluss",
            "Schleifen bei 'unvollständig/erneut'",
          ],
          mnemonic: "Akteure -> Start -> Tasks -> Gateways -> Nachrichten -> Ende.",
          exam: "Aufgabe 7 - Reihenfolge bringt Struktur und Punkte.",
        },
        {
          id: "k3-typische-cases",
          title: "Typische Klausur-Cases",
          intro: "Reklamation, Bestellung, Stornierung, Garantie, Support.",
          simple:
            "Diese Prozesse haben fast immer: Eingang per Nachricht, Prüfung der Vollständigkeit, Entscheidungen, Schleife für Nachforderung, Ergebnis-Nachricht.",
          detail:
            "Reklamation: Nachricht eingegangen -> prüfen -> XOR vollständig? -> ggf. Nachforderung (Schleife) -> Anspruch prüfen -> XOR Ersatz/Ablehnung -> Antwort senden -> Ende. Diesen Aufbau kannst du auf alle ähnlichen Cases anpassen.",
          example:
            "Reklamation: Pool Kunde, Pool Unternehmen mit Lanes Service + Buchhaltung. Nachforderung als Schleife.",
          trap: "Schleife bei Nachforderung wird oft vergessen.",
          mnemonic: "Eingang -> Prüfung -> Schleife -> Entscheidung -> Antwort.",
          exam: "Klassisches Aufgabe-7-Schema.",
        },
      ],
    },
  ],
  quiz: [
    {
      id: "k3-q1",
      question: "Wofür steht BPMN?",
      answer: "Business Process Model and Notation, ISO-Standard.",
    },
    {
      id: "k3-q2",
      question: "Welche drei Event-Typen gibt es?",
      answer: "Start (dünner Kreis), Zwischenereignis (doppelter Kreis), Ende (dicker Kreis).",
    },
    {
      id: "k3-q3",
      question: "Wie unterscheiden sich Sequenzfluss und Nachrichtenfluss?",
      answer:
        "Sequenzfluss: durchgezogen, innerhalb eines Pools. Nachrichtenfluss: gestrichelt, zwischen Pools.",
    },
    {
      id: "k3-q4",
      question: "Was ist der Unterschied zwischen XOR- und AND-Gateway?",
      answer: "XOR: genau ein Pfad. AND: alle Pfade parallel.",
    },
    {
      id: "k3-q5",
      question: "Was ist ein Pool, was eine Lane?",
      answer:
        "Pool = unabhängiger Prozessbeteiligter (z. B. Kunde). Lane = Rolle/Abteilung innerhalb eines Pools.",
    },
    {
      id: "k3-q6",
      question: "Warum sollten Kunde und Unternehmen in getrennte Pools?",
      answer:
        "Sie sind eigenständige Beteiligte. Kommunikation zwischen ihnen läuft über Nachrichtenflüsse.",
    },
    {
      id: "k3-q7",
      question: "Wie modelliere ich 'Bei fehlenden Angaben fordert das Unternehmen nach'?",
      answer:
        "XOR-Gateway nach Prüfung. Pfad 'unvollständig' geht über Nachrichtenfluss zum Kunden, Antwort des Kunden zurück, dann Schleife zur Prüfung.",
    },
    {
      id: "k3-q8",
      question: "Wie heißt der ISO-Standard zu BPMN 2.0?",
      answer: "ISO/IEC 19510:2013.",
    },
    {
      id: "k3-q9",
      question: "Was ist eine Workflow-Engine im BPMN-Kontext?",
      answer:
        "Software, die ausführbare BPMN-Modelle interpretiert und Aufgaben an Personen oder Services verteilt (z. B. Camunda).",
    },
    {
      id: "k3-q10",
      question: "Welche Symbole haben Tasks?",
      answer:
        "Abgerundetes Rechteck mit Verb + Substantiv (z. B. 'Bestellung prüfen').",
    },
  ],
  tasks: [
    {
      id: "k3-task-1",
      kind: "bpmn",
      prompt:
        "Modelliere als BPMN: Kunde sendet Reklamation. Unternehmen prüft Vollständigkeit. Bei fehlenden Angaben fordert es nach. Bei vollständig prüft es Anspruch. Bei berechtigt sendet es Ersatz, sonst Ablehnung. Kunde erhält Antwort.",
      expected:
        "Pool Kunde sendet Nachricht 'Reklamation' an Pool Unternehmen. Im Unternehmenspool: Start mit Nachrichtenereignis, Task 'Vollständigkeit prüfen', XOR (vollständig?). Bei Nein: Nachricht 'Nachforderung' an Kunden, Antwort empfangen, Schleife zur Prüfung. Bei Ja: Task 'Anspruch prüfen', XOR (berechtigt?). Bei Ja: 'Ersatz senden' (Nachricht). Bei Nein: 'Ablehnung senden' (Nachricht). Beide Pfade enden mit End-Event.",
      steps: [
        "Akteure -> Pool Kunde, Pool Unternehmen.",
        "Auslöser -> Start-Nachrichtenereignis im Unternehmen.",
        "Tasks: prüfen, ggf. Anspruch prüfen.",
        "XOR Vollständigkeit + Schleife für Nachforderung.",
        "XOR Anspruch + Ersatz/Ablehnung.",
        "Nachrichtenflüsse zwischen Pools.",
      ],
      trap: "Sequenzfluss zwischen Kunden-Pool und Unternehmens-Pool ist falsch.",
      exam: "Klassische Aufgabe-7-Modellierung.",
    },
    {
      id: "k3-task-2",
      kind: "bpmn",
      prompt:
        "Erkläre, was an folgendem Modell falsch ist: 'Kunde sendet Bestellung' wird als Sequenzfluss zum Unternehmens-Task 'Bestellung prüfen' verbunden.",
      expected:
        "Sequenzfluss zwischen Pools ist nicht erlaubt. Korrekt: Nachrichtenfluss (gestrichelt) vom Send-Task im Kundenpool zum Receive-Event im Unternehmenspool.",
      steps: [
        "Erkennen: Kunde und Unternehmen sind verschiedene Pools.",
        "Regel anwenden: zwischen Pools nur Nachrichtenfluss.",
        "Lösung skizzieren.",
      ],
    },
  ],
};
