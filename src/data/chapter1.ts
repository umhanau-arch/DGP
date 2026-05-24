import type { ChapterDefinition } from "../types";

export const chapter1: ChapterDefinition = {
  id: "kapitel-1",
  number: 1,
  title: "Geschäftsprozesse und Geschäftsprozessmanagement",
  subtitle: "Grundbegriffe, ARIS, GPM-Lebenszyklus, Prozessarten",
  whyImportant:
    "Kapitel 1 ist die Basis für alles weitere. In jeder Klausur kommen Definitionen, der GPM-Lebenszyklus und die Einordnung von Prozessen vor. Ohne diese Sprache verstehst du Aufgaben 4-8 nicht.",
  learningGoals: [
    "Prozess, Geschäftsprozess, Algorithmus und Projekt sicher unterscheiden.",
    "Aufbau eines Geschäftsprozesses (Auslöser, Aktivitäten, Rollen, Regeln, Output) erklären.",
    "ARIS-Sichten und ihre Leitfragen anwenden.",
    "GPM-Lebenszyklus in richtiger Reihenfolge nennen und Phasenfehler erkennen.",
    "Kern-, Support- und Managementprozesse begründet zuordnen.",
    "Digitalisierung, Digitization und digitale Transformation abgrenzen.",
  ],
  priority: "A",
  examReference: "Aufgaben 1-3",
  examTip:
    "In der Klausur kommen Definitionen fast immer in Aufgabe 1. Lerne sie so, dass du sie in einem Satz und mit einem Beispiel erklären kannst. Den GPM-Zyklus immer in Reihenfolge plus Ergebnis pro Phase nennen.",
  commonMistakes: [
    "Prozess und Projekt verwechseln (wiederholbar vs. einmalig).",
    "GPM-Phasen vertauschen oder Analyse/Verbesserung mischen.",
    "Marketing immer als Support einordnen, ohne Geschäftsmodell zu prüfen.",
    "Digitization mit digitaler Transformation gleichsetzen.",
  ],
  trainers: [],
  groups: [
    {
      title: "1 · Grundbegriffe",
      color: "emerald",
      blocks: [
        {
          id: "k1-grundbegriffe-prozess",
          title: "Was ist ein Prozess?",
          intro: "Erst der Prozess, dann der Geschäftsprozess.",
          simple:
            "Ein Prozess ist ein wiederholbarer Ablauf aus mehreren logisch zusammenhängenden Schritten.",
          detail:
            "Ein Prozess hat einen Anfang, eine Folge von Aktivitäten und ein Ergebnis. Wichtig: Er kann immer wieder gleichartig ausgeführt werden. Im Unternehmen interessiert nicht nur, was passiert, sondern auch wie schnell, wie teuer und wie zuverlässig.",
          bullets: [
            "Anfang -> Aktivitäten -> Ergebnis",
            "Wiederholbar, nicht einmalig",
            "Hat Regeln, Rollen und Ressourcen",
          ],
          example:
            "Bestellung annehmen -> prüfen -> kommissionieren -> verschicken -> abrechnen.",
          mnemonic: "Prozess = wiederholbarer Weg vom Auslöser zum Ergebnis.",
          exam: "Definitionen kommen fast immer in Aufgabe 1.",
          visual: "process-flow",
          miniCheck: {
            prompt: "Welche Eigenschaft ist KEIN typisches Merkmal eines Prozesses?",
            options: ["wiederholbar", "logisch geordnet", "einmalig", "hat Anfang und Ende"],
            correctIndex: 2,
            explain:
              "Einmalig ist ein Projekt. Ein Prozess wird regelmäßig durchlaufen.",
          },
        },
        {
          id: "k1-algorithmus-prozess",
          title: "Algorithmus vs. Prozess vs. Projekt",
          intro: "Diese drei Begriffe werden oft verwechselt.",
          simple:
            "Algorithmus: exakt formal. Prozess: realer wiederholbarer Ablauf. Projekt: einmaliges Vorhaben mit Start und Ende.",
          detail:
            "Ein Algorithmus ist mathematisch eindeutig (z. B. ein Sortierverfahren). Ein Geschäftsprozess umfasst Menschen, Entscheidungen, Dokumente und Ausnahmen. Ein Projekt erzeugt etwas Neues und hört auf, wenn das Ziel erreicht ist.",
          table: [
            ["Merkmal", "Algorithmus", "Prozess", "Projekt"],
            ["Festgelegtheit", "exakt formal", "viele Varianten", "ungewiss"],
            ["Wiederholung", "ja", "ja", "nein"],
            ["Dauer", "endlich", "dauerhaft", "temporär"],
            ["Beispiel", "Quicksort", "Bestellprozess", "ERP-Einführung"],
          ],
          trap: "ERP-Einführung ist ein Projekt, kein Geschäftsprozess.",
          mnemonic: "Algorithmus = Formel. Prozess = Routine. Projekt = Mission.",
          exam: "Klassische Abgrenzungsfrage in Aufgabe 1.",
          miniCheck: {
            prompt: "Was ist ein Projekt?",
            options: [
              "Ein wiederholbarer Routineablauf",
              "Ein einmaliges, zeitlich begrenztes Vorhaben",
              "Ein mathematisch exakt definiertes Verfahren",
              "Eine grafische Darstellung",
            ],
            correctIndex: 1,
            explain: "Projekte sind einmalig, temporär und neuartig.",
          },
        },
        {
          id: "k1-geschaeftsprozess",
          title: "Geschäftsprozess",
          intro: "Der Hauptbegriff des Moduls.",
          simple:
            "Ein Geschäftsprozess ist ein Prozess, der Input in einen für interne oder externe Kunden wertvollen Output umwandelt.",
          detail:
            "Geschäftsprozesse gehen oft über Abteilungs- und Betriebsgrenzen hinweg, gehören zur Ablauforganisation und können Teilprozesse enthalten oder selbst Teil eines übergeordneten Prozesses sein.",
          bullets: [
            "Erzeugt Wertschöpfung oder Kundennutzen",
            "Hat Auslöser, Input, Aktivitäten, Output",
            "Ist Teil der Ablauforganisation",
            "Kann andere Geschäftsprozesse anstoßen",
          ],
          example:
            "Order-to-Cash: Kundenbestellung -> Prüfung -> Lieferung -> Rechnung -> Zahlungseingang.",
          mnemonic: "Geschäftsprozess = wiederholbarer Wertweg.",
          exam:
            "Aufgabe 1 verlangt häufig: Definition + Beispiel + Abgrenzung zu Projekt.",
          visual: "process-flow",
          miniCheck: {
            prompt: "Welcher Aspekt ist für einen Geschäftsprozess zentral?",
            options: [
              "Mathematische Korrektheit",
              "Wertschöpfung oder Kundennutzen",
              "Genau ein Mitarbeiter ist beteiligt",
              "Er ist Teil eines Projekts",
            ],
            correctIndex: 1,
            explain:
              "Geschäftsprozesse erzeugen Wertschöpfung für interne oder externe Kunden.",
          },
        },
        {
          id: "k1-input-output",
          title: "Input, Output, Wertschöpfung",
          intro: "Was kommt rein, was geht raus, und wo entsteht Wert?",
          simple:
            "Input ist alles, was in den Prozess hineingeht. Output ist das Ergebnis. Wertschöpfung ist der zusätzliche Wert, der dabei entsteht.",
          detail:
            "Input kann Material, Information, Auftrag oder Anfrage sein. Output kann Produkt, Dienstleistung, Entscheidung oder Dokument sein. Wertschöpfung = Leistung minus Vorleistung.",
          table: [
            ["Begriff", "Bedeutung", "Beispiel"],
            ["Input", "geht hinein", "Bestellung, Material"],
            ["Aktivitäten", "verarbeiten", "Prüfen, Liefern"],
            ["Output", "kommt heraus", "Ware, Rechnung, Service"],
            ["Wertschöpfung", "Leistung - Vorleistung", "verbesserter Zustand"],
          ],
          example:
            "Brauerei: Hopfen, Malz, Wasser, Energie -> Bier brauen, abfüllen -> verkauftes Fass Bier (Wert > Vorleistung).",
          exam: "Hilft bei Aufgabe 1 und Aufgabe 5 (Wertschöpfung).",
          visual: "process-flow",
        },
      ],
    },

    {
      title: "2 · Struktur eines Geschäftsprozesses",
      color: "sky",
      blocks: [
        {
          id: "k1-struktur",
          title: "Bausteine: Auslöser, Aktivitäten, Rollen, Regeln, IT",
          intro: "Aus diesen Teilen besteht jeder Geschäftsprozess.",
          simple:
            "Auslöser startet den Prozess. Aktivitäten verarbeiten Input. Rollen führen aus. Regeln bestimmen Entscheidungen. IT-Systeme unterstützen.",
          detail:
            "Diese Bausteine sind eine Checkliste, mit der du jede Prozessbeschreibung in ein Modell übersetzen kannst: Wer startet? Was wird getan? Wo wird entschieden? Welche Daten? Wann endet der Prozess?",
          table: [
            ["Baustein", "Frage", "Beispiel"],
            ["Auslöser", "Was startet?", "Bestellung eingegangen"],
            ["Aktivitäten", "Was wird getan?", "prüfen, liefern, abrechnen"],
            ["Rollen", "Wer macht es?", "Vertrieb, Lager, Buchhaltung"],
            ["Regeln", "Wie entscheiden?", "Limit < 500 EUR -> auto"],
            ["IT-Systeme", "Was unterstützt?", "ERP, CRM, Workflow"],
            ["Output", "Was entsteht?", "geliefertes Produkt"],
          ],
          mnemonic: "Auslöser, Aktivität, Akteur, Aktion-Regel, Abschluss.",
          exam: "Hilft beim Modellieren in Aufgabe 7 (BPMN).",
          miniCheck: {
            prompt: "Was ist ein typischer Auslöser eines Prozesses?",
            options: [
              "Eine bestandene Klausur",
              "Eine eingegangene Bestellung",
              "Ein interner Kalendereintrag",
              "Eine fertige Lieferung",
            ],
            correctIndex: 1,
            explain:
              "Eine Bestellung startet den Geschäftsprozess. Lieferung wäre Output.",
          },
        },
        {
          id: "k1-gekapselt",
          title: "Gekapselter Geschäftsprozess",
          intro: "Geschäftsprozesse können hierarchisch sein.",
          simple:
            "Ein gekapselter Prozess ist wie eine Black Box: Du siehst Input und Output, ohne alle Details kennen zu müssen.",
          detail:
            "Ein Geschäftsprozess kann andere Prozesse enthalten oder Teil eines übergeordneten Prozesses sein. Diese Hierarchie reduziert Komplexität.",
          example:
            "Procure-to-Pay enthält 'Bestellung freigeben'. Innen läuft ein eigener Genehmigungsprozess.",
          mnemonic: "Gekapselt = Schnittstelle reicht, Innenleben optional.",
          exam: "Vorbereitung für Prozesshierarchie und Funktionsbaum.",
        },
      ],
    },

    {
      title: "3 · Geschäftsprozess vs. Projekt",
      color: "rose",
      blocks: [
        {
          id: "k1-prozess-projekt",
          title: "Wiederholbar vs. einmalig",
          intro: "Eine der häufigsten Klausurfallen.",
          simple:
            "Geschäftsprozess wird regelmäßig wieder ausgeführt. Projekt passiert genau einmal.",
          detail:
            "Projekt: Start, Ende, Ziel, Einmaligkeit. Geschäftsprozess: Routine, Wiederholung, Standard. Beide nutzen Ressourcen, aber mit anderem Charakter.",
          table: [
            ["Merkmal", "Geschäftsprozess", "Projekt"],
            ["Häufigkeit", "wiederholend", "einmalig"],
            ["Dauer", "dauerhaft", "temporär"],
            ["Charakter", "Routine", "Innovation"],
            ["Beispiel", "Bestellung bearbeiten", "Bau einer Filiale"],
          ],
          trap: "ERP-Einführung ist ein Projekt, der danach laufende Bestellprozess ist ein Geschäftsprozess.",
          mnemonic: "Wiederholt = Prozess. Einmal = Projekt.",
          exam: "Aufgabe 1: Begriffe abgrenzen.",
          miniCheck: {
            prompt: "Welche der folgenden Aktivitäten ist ein Projekt?",
            options: [
              "Tägliche Rechnungserstellung",
              "Monatlicher Lohnlauf",
              "Bau einer neuen Produktionshalle",
              "Wöchentliche Bestandskontrolle",
            ],
            correctIndex: 2,
            explain: "Bau einer Halle ist einmalig und temporär = Projekt.",
          },
        },
      ],
    },

    {
      title: "4 · Typische Geschäftsprozesse",
      color: "orange",
      blocks: [
        {
          id: "k1-o2c-p2p",
          title: "Order-to-Cash und Procure-to-Pay",
          intro: "Die zwei wichtigsten Standard-Geschäftsprozesse.",
          simple:
            "O2C: Kundenbestellung bis Zahlungseingang. P2P: Beschaffungsbedarf bis Zahlung an Lieferanten.",
          detail:
            "O2C ist die Verkaufssicht (Kunde nach außen). P2P ist die Einkaufssicht (Lieferant nach außen). Beide greifen ineinander, weil Kundenaufträge Beschaffung auslösen können.",
          table: [
            ["Schritt", "Order-to-Cash (O2C)", "Procure-to-Pay (P2P)"],
            ["1", "Kundenbestellung", "Bedarfsmeldung"],
            ["2", "Auftragsprüfung", "Lieferant wählen"],
            ["3", "Lieferung", "Bestellung"],
            ["4", "Rechnung", "Wareneingang"],
            ["5", "Zahlungseingang", "Rechnung prüfen"],
            ["6", "ggf. Mahnung", "Zahlung an Lieferant"],
          ],
          example: "Online-Shop: O2C läuft, sobald der Kunde klickt. Werden Lager leer, startet P2P.",
          mnemonic: "O2C = Kunde -> Geld. P2P = Bedarf -> Lieferant -> Geld raus.",
          exam: "Klassische Beispiele für Kernprozesse in Aufgabe 3.",
          miniCheck: {
            prompt: "Wer steht im Mittelpunkt bei Order-to-Cash?",
            options: ["Lieferant", "Kunde", "Produktion", "Personalabteilung"],
            correctIndex: 1,
            explain:
              "O2C startet beim Kunden mit der Bestellung und endet beim Geldeingang vom Kunden.",
          },
        },
      ],
    },

    {
      title: "5 · Geschäftsprozessmodellierung",
      color: "cyan",
      blocks: [
        {
          id: "k1-modellierung",
          title: "Warum modelliert man Geschäftsprozesse?",
          intro: "Ein Modell ist nicht der Prozess, sondern eine Vereinfachung.",
          simple:
            "Modelle machen Abläufe sichtbar, diskutierbar, analysierbar und automatisierbar.",
          detail:
            "Ein Geschäftsprozessmodell ist eine vereinfachte Darstellung. Es zeigt Aktivitäten, Reihenfolge, Rollen, Entscheidungen und Daten. Vorteile: Transparenz, Kommunikation, Analyse, Standardisierung, Dokumentation und Grundlage für Workflows/Automatisierung.",
          bullets: [
            "Modell != Wirklichkeit, aber nützliche Abstraktion",
            "Kann formal (BPMN, Petrinetz) oder informell sein",
            "Basis für Verbesserung und Automatisierung",
          ],
          mnemonic: "Modell zeigt das Wesentliche. Wirklichkeit ist immer komplexer.",
          exam: "Vorbereitung für Kapitel 2 und 3.",
        },
        {
          id: "k1-aris",
          title: "ARIS - die 5 Sichten",
          intro: "Architektur integrierter Informationssysteme nach Scheer.",
          simple:
            "ARIS ordnet Prozesse aus 5 Perspektiven: Funktion, Organisation, Daten, Leistung, Steuerung.",
          detail:
            "Die Steuerungssicht verbindet die anderen vier Sichten zum Ablauf. Jede Sicht beantwortet eine Leitfrage und zeigt einen anderen Aspekt des Prozesses.",
          table: [
            ["Sicht", "Frage", "Beispiel"],
            ["Funktionssicht", "WAS wird getan?", "Bestellung prüfen"],
            ["Organisationssicht", "WER macht es?", "Vertrieb, Buchhaltung"],
            ["Datensicht", "Welche Daten?", "Bestelldaten, Kundendaten"],
            ["Leistungssicht", "Welcher Output?", "gelieferte Ware"],
            ["Steuerungssicht", "WIE läuft es ab?", "BPMN/EPK-Ablauf"],
          ],
          mnemonic: "FOD-LS: Funktion, Organisation, Daten, Leistung, Steuerung.",
          exam: "Sehr typische Theorie- oder Zuordnungsfrage.",
          visual: "aris-sights",
          miniCheck: {
            prompt: "Welche Sicht beantwortet die Frage 'Wie läuft der Prozess ab?'",
            options: ["Funktionssicht", "Datensicht", "Organisationssicht", "Steuerungssicht"],
            correctIndex: 3,
            explain:
              "Steuerungssicht verbindet die anderen Sichten zum tatsächlichen Ablauf.",
          },
        },
        {
          id: "k1-funktionsbaum",
          title: "Funktionsbaum nach Scheer",
          intro: "Hierarchische Zerlegung von Aufgaben.",
          simple:
            "Ein Funktionsbaum zerlegt eine Hauptfunktion in Teilfunktionen, bis Elementarfunktionen übrig bleiben.",
          detail:
            "Wichtig: Der Funktionsbaum zeigt Struktur, KEINE zeitliche Reihenfolge. Gruppierungsarten: objektorientiert (nach bearbeitetem Objekt), prozessorientiert (nach Ablauf), verrichtungsorientiert (nach Tätigkeit).",
          table: [
            ["Gruppierung", "Idee", "Beispiel"],
            ["objektorientiert", "nach Objekt", "Kundendaten bearbeiten"],
            ["prozessorientiert", "nach Ablauf", "Bestellung abwickeln"],
            ["verrichtungsorientiert", "nach Tätigkeitsart", "prüfen, buchen, freigeben"],
          ],
          trap: "Funktionsbaum ist KEINE zeitliche Reihenfolge. Das macht erst die Steuerungssicht.",
          exam: "Theoriefrage: Gruppierung erkennen, Definition geben.",
          visual: "function-tree",
        },
      ],
    },

    {
      title: "6 · Geschäftsprozessmanagement (GPM)",
      color: "emerald",
      blocks: [
        {
          id: "k1-gpm",
          title: "Definition und Ziele",
          intro: "GPM ist der Sammelbegriff für alle Aktivitäten rund um Prozesse.",
          simple:
            "GPM heißt: Prozesse systematisch identifizieren, gestalten, ausführen, überwachen und verbessern.",
          detail:
            "Ziel: Prozesse effizienter (mit weniger Ressourcen) und effektiver (richtige Ziele) zu machen. GPM stellt sicher, dass Prozesse zur Strategie und zu Kunden passen.",
          bullets: [
            "Effizienz = Dinge richtig tun (geringe Ressourcen)",
            "Effektivität = die richtigen Dinge tun (Ziel erreichen)",
            "Koordination = Aktivitäten und Rollen abstimmen",
            "Verbesserung = inkrementell oder durch Reengineering",
          ],
          example:
            "Online-Shop: Lieferzeit von 5 auf 3 Tage reduzieren = Effizienz. Produkt im richtigen Zustand zustellen = Effektivität.",
          mnemonic: "Effizient = sparsam. Effektiv = wirksam.",
          exam: "Klassische Definition in Aufgabe 1.",
          miniCheck: {
            prompt: "Was bedeutet Effektivität?",
            options: [
              "Mit wenig Ressourcen viel erreichen",
              "Die richtigen Ziele erreichen",
              "Den Prozess automatisieren",
              "Den Prozess dokumentieren",
            ],
            correctIndex: 1,
            explain:
              "Effektiv = die richtigen Dinge tun. Effizient = die Dinge richtig tun.",
          },
        },
        {
          id: "k1-typ-instanz",
          title: "Geschäftsprozesstyp vs. Prozessinstanz",
          intro: "Ein wichtiger Unterschied für Process Mining.",
          simple:
            "Typ ist die allgemeine Beschreibung. Instanz ist ein konkreter Durchlauf.",
          detail:
            "Bestellprozess (Typ) wird tausendmal pro Tag durchlaufen. Bestellung #4711 (Instanz) ist genau ein Durchlauf. Im Eventlog ist jeder Case eine Instanz.",
          example:
            "Typ: Reklamationsprozess. Instanz: Reklamation #2024-0815 vom Kunden Müller.",
          mnemonic: "Typ = Bauplan. Instanz = einzelnes Haus.",
          exam: "Wichtig für Process Mining (Kapitel 7).",
        },
        {
          id: "k1-rollen",
          title: "Rollen im GPM",
          intro: "Wer ist beteiligt?",
          simple:
            "Geschäftsführung, Prozessverantwortliche, Prozessteilnehmer, Systemanalytiker, Anwendungsentwickler.",
          detail:
            "Die Geschäftsführung gibt Strategie und Prioritäten vor. Prozessverantwortliche steuern und verbessern den Prozess. Prozessteilnehmer führen aus. Systemanalytiker übersetzen Anforderungen technisch. Entwickler bauen die IT-Lösung.",
          table: [
            ["Rolle", "Aufgabe"],
            ["Geschäftsführung", "Strategie und Prioritäten"],
            ["Prozessverantwortlicher", "Leistung und Verbesserung des Prozesses"],
            ["Prozessteilnehmer", "Aktivitäten ausführen, Praxiswissen liefern"],
            ["Systemanalytiker", "Anforderungen analysieren, Lösungen entwerfen"],
            ["Anwendungsentwickler", "technische Umsetzung"],
          ],
          mnemonic: "Strategie - Verantwortung - Ausführung - Analyse - Umsetzung.",
          exam: "Rollen mit Beispielen verbinden.",
        },
      ],
    },

    {
      title: "7 · GPM-Lebenszyklus",
      color: "sky",
      blocks: [
        {
          id: "k1-zyklus",
          title: "Die 6 Phasen in richtiger Reihenfolge",
          intro: "Der wichtigste Kreislauf der Klausur.",
          simple:
            "Identifikation -> Erhebung -> Analyse -> Verbesserung -> Einführung -> Überwachung -> wieder von vorn.",
          detail:
            "Erst entscheiden, welche Prozesse betrachtet werden, dann den Ist-Zustand aufnehmen, Schwachstellen analysieren, Soll-Prozess gestalten, einführen und mit Kennzahlen überwachen. Aus der Überwachung entstehen Impulse für die nächste Identifikation.",
          table: [
            ["Phase", "Ziel", "Ergebnis"],
            ["Identifikation", "wichtige Prozesse erkennen", "Prozesslandkarte"],
            ["Erhebung", "Ist-Prozess aufnehmen", "Ist-Modell"],
            ["Analyse", "Schwachstellen finden", "Ursachenliste"],
            ["Verbesserung", "Soll-Prozess entwerfen", "Soll-Modell"],
            ["Einführung", "umsetzen", "laufender neuer Prozess"],
            ["Überwachung", "messen", "Kennzahlen, KPIs"],
          ],
          mnemonic: "I-E-A-V-E-Ü: Ich Erhebe Analysiere Verbessere Einführe Überwache.",
          trap: "Direkt von Identifikation zur Einführung springen ist ein klassischer Fehler!",
          exam: "Aufgabe 2: fehlende oder falsche Phase erkennen.",
          visual: "gpm-cycle",
          miniCheck: {
            prompt: "Was ist das Ergebnis der Prozessanalyse?",
            options: [
              "Prozesslandkarte",
              "Ist-Prozessmodell",
              "Ursachenliste / Schwachstellen",
              "KPI-Bericht",
            ],
            correctIndex: 2,
            explain:
              "In der Analyse finden wir Ursachen und Schwachstellen. Ist-Modell entsteht in der Erhebung.",
          },
        },
      ],
    },

    {
      title: "8 · Prozessidentifikation",
      color: "orange",
      blocks: [
        {
          id: "k1-landkarte",
          title: "Prozesslandkarte und Referenzmodelle",
          intro: "Überblick statt Detail.",
          simple:
            "Eine Prozesslandkarte zeigt die wichtigsten Prozesse eines Unternehmens auf einen Blick.",
          detail:
            "Typischer Aufbau: oben Managementprozesse, in der Mitte Kernprozesse, unten Supportprozesse. Referenzmodelle wie ITIL (IT-Service), eTOM (Telekom), APQC (branchenübergreifend) liefern Best Practices und sparen Modellierungsaufwand.",
          bullets: [
            "ITIL = Referenz für IT-Service-Management",
            "eTOM = Referenz für Telekommunikation",
            "APQC = branchenübergreifender Process Classification Framework",
          ],
          mnemonic: "Management oben, Kern in der Mitte, Support unten.",
          exam: "Prozesslandkarte definieren und Referenzmodelle nennen.",
          visual: "process-map",
        },
        {
          id: "k1-bewertung",
          title: "Prozesse bewerten und priorisieren",
          intro: "Welche Prozesse zuerst verbessern?",
          simple:
            "Drei Kriterien: strategische Wichtigkeit, Verbesserungswürdigkeit, Verbesserungsfähigkeit.",
          detail:
            "Strategische Wichtigkeit: Beitrag zu Zielen und Wettbewerbsvorteil. Verbesserungswürdigkeit: Größe des Problems und Potenzials. Verbesserungsfähigkeit: ist Veränderung realistisch machbar?",
          example:
            "Bestellprozess: hohe strategische Wichtigkeit, hohe Verbesserungswürdigkeit (lange Wartezeiten), gute Verbesserungsfähigkeit (Workflow-System verfügbar) -> hohe Priorität.",
          mnemonic: "Wichtig + Würdig + Fähig = Priorität.",
          exam: "Argumentationskette für Auswahl von Prozessen.",
        },
      ],
    },

    {
      title: "9 · Prozessarten",
      color: "rose",
      blocks: [
        {
          id: "k1-arten",
          title: "Kern, Support, Management",
          intro: "Die typische Klassifikation.",
          simple:
            "Kern = direkter Kundennutzen. Support = unterstützt intern. Management = steuert das Unternehmen.",
          detail:
            "Die Einordnung hängt vom Geschäftsmodell ab. Für eine Beratung kann Marketing Kern sein, für eine Fabrik eher Support. In der Klausur immer mit Begründung antworten.",
          table: [
            ["Art", "Bedeutung", "Beispiel"],
            ["Kernprozess", "direkter Kundennutzen", "Produktion, Vertrieb, Lieferung"],
            ["Supportprozess", "unterstützt intern", "HR, IT, Buchhaltung"],
            ["Managementprozess", "steuert / plant", "Strategie, Controlling, QMS"],
          ],
          trap: "Nicht jedes IT-Thema ist Support! Eine Online-Plattform kann Kernprozess sein.",
          mnemonic: "Kern = Kunde merkt es. Support = intern hilft. Management = führt.",
          exam: "Aufgabe 3: Kategorie + Begründung.",
          visual: "process-map",
          miniCheck: {
            prompt: "Bei einem Online-Shop ist die Bestellplattform typischerweise...",
            options: ["Kernprozess", "Supportprozess", "Managementprozess", "Projekt"],
            correctIndex: 0,
            explain:
              "Die Bestellplattform ist das Geschäftsmodell selbst -> Kernprozess.",
          },
        },
      ],
    },

    {
      title: "10 · Prozessanalyse und Verbesserung",
      color: "violet",
      blocks: [
        {
          id: "k1-analyse",
          title: "Werkzeuge der Analyse",
          intro: "Erst Ursachen, dann Lösungen.",
          simple:
            "Wertbeitragsanalyse, Ursache-Wirkungs-Diagramm (6M), kritischer Pfad, Satz von Little.",
          detail:
            "Wertbeitragsanalyse: ist Schritt wertschöpfend, geschäftserforderlich oder Verschwendung? 6M: Mensch, Maschine, Material, Methode, Mitwelt, Messung. Kritischer Pfad: längste Folge abhängiger Aktivitäten. Satz von Little: L = λ × W (Bestand = Rate × Durchlaufzeit).",
          bullets: [
            "Wertbeitrag: wertschöpfend / nötig / Verschwendung",
            "6M-Modell für Ursachen",
            "Satz von Little: L = λ · W",
            "Kritischer Pfad bestimmt Mindestdauer",
          ],
          example:
            "10 Aufträge/Tag bei 3 Tagen Durchlaufzeit -> 30 Aufträge gleichzeitig im System.",
          mnemonic: "Analyse findet Ursachen. Verbesserung entwirft Lösungen.",
          exam: "Phasen sauber trennen.",
          trap: "Verbesserung schon in der Analyse vorschlagen ist ein typischer Fehler.",
        },
        {
          id: "k1-redesign",
          title: "Redesign-Heuristiken",
          intro: "Wie verbessert man konkret?",
          simple:
            "Schritte eliminieren, parallelisieren, automatisieren, Verantwortlichkeiten verlagern.",
          detail:
            "Typische Heuristiken: unnötige Schritte streichen, Sequenz parallelisieren, manuelles automatisieren, Schnittstellen reduzieren, Entscheidungen näher an die Ausführung legen.",
          example:
            "Statt: Lager prüft -> Buchhaltung prüft -> Vertrieb informiert. Neu: parallele Prüfung + automatischer Vertriebsmail.",
          exam: "Aufgabe 2 fragt oft Heuristiken zum konkreten Fall.",
          mnemonic: "Eliminate, Parallelize, Automate, Reassign.",
        },
      ],
    },

    {
      title: "11 · Ausführung, Workflows und Überwachung",
      color: "lime",
      blocks: [
        {
          id: "k1-gpms",
          title: "GPMS, Workflow, Camunda",
          intro: "Wie werden Prozesse ausgeführt?",
          simple:
            "Ein GPMS (Geschäftsprozessmanagementsystem) modelliert, führt aus und überwacht. Ein Workflow ist ein digital gesteuerter Geschäftsprozess.",
          detail:
            "Beispiel-Tools: Camunda, IBM BPM, SAP Workflow. Vorteile: Auditfähigkeit, Standardisierung, Compliance, Messbarkeit, Reduktion operativer Kosten.",
          bullets: [
            "GPMS = Software für GP-Management",
            "Workflow = automatisierter Geschäftsprozess",
            "Workflow-Engine führt BPMN aus",
            "Camunda als bekanntes Beispiel",
          ],
          mnemonic: "GP wird zum Workflow, sobald IT ihn steuert.",
          exam: "Workflow-Definition kommt häufig.",
        },
        {
          id: "k1-kpi-smart",
          title: "KPI, SMART, ISO, PDCA, BSC",
          intro: "Steuerungs- und Qualitätsbegriffe.",
          simple:
            "KPI = zentrale Kennzahl. SMART = Kriterium für gute Ziele. PDCA = Verbesserungszyklus. BSC = Kennzahlensystem mit 4 Perspektiven. ISO 9001 = QMS-Norm.",
          detail:
            "SMART: Specific, Measurable, Achievable, Reasonable, Time-bound. PDCA: Plan, Do, Check, Act. BSC: Finanzen, Kunden, Prozesse, Lernen/Entwicklung. ISO 9001 fordert dokumentierte Prozesse, Messung, kontinuierliche Verbesserung.",
          table: [
            ["Begriff", "Bedeutung"],
            ["KPI", "Key Performance Indicator"],
            ["SMART", "spezifisch, messbar, akzeptiert, realistisch, terminiert"],
            ["PDCA", "Plan - Do - Check - Act"],
            ["BSC", "Finanzen / Kunden / Prozesse / Lernen"],
            ["ISO 9001", "Anforderungen an QMS"],
          ],
          mnemonic: "S-M-A-R-T spannt Ziele auf. PDCA dreht Verbesserungen.",
          exam: "Kommt fast immer als kurze Definitionsfrage.",
          visual: "smart-checklist",
        },
      ],
    },

    {
      title: "12 · Digitalisierung",
      color: "slate",
      blocks: [
        {
          id: "k1-digital",
          title: "Digitization, Digitalization, Transformation",
          intro: "Drei Stufen, oft verwechselt.",
          simple:
            "Digitization: analog wird digital. Digitalization: Prozesse werden mit IT besser. Transformation: Geschäftsmodell verändert sich grundlegend.",
          detail:
            "Industrie 4.0, Smart Factory, IoT, Digital Twin und Smart Products sind Erscheinungsformen der digitalen Transformation in Produktion und Produkt.",
          table: [
            ["Stufe", "Bedeutung", "Beispiel"],
            ["Digitization", "Daten digital", "Papier -> PDF"],
            ["Digitalization", "Prozess digital verbessert", "Online-Workflow"],
            ["Transformation", "Geschäftsmodell neu", "Plattformökonomie"],
            ["Industrie 4.0", "vernetzte Produktion", "Smart Factory"],
            ["IoT", "Geräte senden Daten", "Sensorik"],
            ["Digital Twin", "virtuelles Abbild", "Maschinen-Zwilling"],
          ],
          trap: "Nicht jede Softwareeinführung = digitale Transformation!",
          mnemonic: "Daten -> Prozess -> Modell.",
          exam: "Häufig als Zuordnungsfrage.",
          visual: "digitization-stairs",
          miniCheck: {
            prompt: "Tesla verkauft Autos direkt online und liefert OTA-Updates. Welche Stufe ist das primär?",
            options: ["Digitization", "Digitalization", "Digitale Transformation", "ITIL"],
            correctIndex: 2,
            explain:
              "Tesla verändert das Geschäftsmodell der Autoindustrie -> Transformation.",
          },
        },
      ],
    },
  ],

  quiz: [
    {
      id: "k1-q1",
      question: "Definiere Geschäftsprozess.",
      answer:
        "Wiederholbare Folge logisch zusammenhängender Aktivitäten, die Input in einen für interne oder externe Kunden wertvollen Output umwandelt.",
      why: "Aufgabe-1-Klassiker. Immer Definition + Beispiel.",
    },
    {
      id: "k1-q2",
      question: "Unterschied zwischen Geschäftsprozess und Projekt?",
      answer:
        "Geschäftsprozess wiederholt sich und ist dauerhaft. Projekt ist einmalig und temporär.",
    },
    {
      id: "k1-q3",
      question: "Nenne die 5 ARIS-Sichten und ihre Leitfragen.",
      answer:
        "Funktionssicht (Was?), Organisationssicht (Wer?), Datensicht (Welche Daten?), Leistungssicht (Welcher Output?), Steuerungssicht (Wie?).",
    },
    {
      id: "k1-q4",
      question: "Nenne die 6 Phasen des GPM-Lebenszyklus in richtiger Reihenfolge.",
      answer:
        "Identifikation, Erhebung, Analyse, Verbesserung, Einführung, Überwachung.",
    },
    {
      id: "k1-q5",
      question: "Welche Phase erzeugt das Sollprozessmodell?",
      answer: "Prozessverbesserung.",
    },
    {
      id: "k1-q6",
      question: "Welche Phase erzeugt das Istprozessmodell?",
      answer: "Prozesserhebung.",
    },
    {
      id: "k1-q7",
      question: "Was ist Effektivität - mit Abgrenzung zur Effizienz?",
      answer:
        "Effektivität = die richtigen Ziele erreichen (richtige Dinge tun). Effizienz = mit minimalen Ressourcen arbeiten (Dinge richtig tun).",
    },
    {
      id: "k1-q8",
      question: "Nenne 3 Prozessarten und je ein Beispiel.",
      answer:
        "Kernprozess (Produktion), Supportprozess (Personalverwaltung), Managementprozess (Strategieplanung).",
    },
    {
      id: "k1-q9",
      question: "Was ist eine Prozesslandkarte?",
      answer:
        "Übersichtliche Darstellung der wichtigsten Prozesse eines Unternehmens, oft gegliedert in Management-, Kern- und Supportprozesse.",
    },
    {
      id: "k1-q10",
      question: "Was bedeutet ITIL?",
      answer:
        "Referenzrahmen für IT-Service-Management; bewährte Prozesse für stabilen IT-Betrieb.",
    },
    {
      id: "k1-q11",
      question: "Unterschied Geschäftsprozesstyp vs. Prozessinstanz?",
      answer:
        "Typ ist die allgemeine Beschreibung. Instanz ist ein konkreter Durchlauf (z. B. Bestellung #4711).",
    },
    {
      id: "k1-q12",
      question: "Was bedeutet inkrementelle Verbesserung im Gegensatz zu Reengineering?",
      answer:
        "Inkrementell verbessert schrittweise. Reengineering gestaltet den Prozess radikal neu.",
    },
    {
      id: "k1-q13",
      question: "Nenne 3 typische Klausurfehler bei Aufgabe 2 (GPM-Zyklus).",
      answer:
        "Phasen vertauschen, Analyse und Verbesserung mischen, Überwachung vergessen.",
    },
    {
      id: "k1-q14",
      question: "Was ist der Satz von Little?",
      answer:
        "L = λ × W (Bestand = Ankunftsrate × Durchlaufzeit).",
    },
    {
      id: "k1-q15",
      question: "Wofür stehen die Buchstaben in SMART?",
      answer:
        "Specific, Measurable, Achievable, Reasonable, Time-bound.",
    },
    {
      id: "k1-q16",
      question: "Welche 4 Perspektiven hat die Balanced Scorecard?",
      answer: "Finanzen, Kunden, interne Prozesse, Lernen und Entwicklung.",
    },
    {
      id: "k1-q17",
      question: "Erkläre Digitization, Digitalization und digitale Transformation.",
      answer:
        "Digitization wandelt analog in digital um. Digitalization verbessert Prozesse mit digitaler Technik. Transformation verändert Geschäftsmodell und Wertschöpfung.",
    },
    {
      id: "k1-q18",
      question: "Was ist ein Workflow?",
      answer:
        "Ein Geschäftsprozess, der ganz oder teilweise durch ein Informationssystem (z. B. Workflow-Engine) gesteuert wird.",
    },
    {
      id: "k1-q19",
      question: "Welche Sicht beschreibt Reihenfolge und Regeln im Prozess?",
      answer: "Steuerungssicht.",
    },
    {
      id: "k1-q20",
      question: "Welche Phase priorisiert Prozesse?",
      answer: "Prozessidentifikation.",
    },
  ],

  tasks: [
    {
      id: "k1-task-1",
      kind: "definition",
      prompt:
        "Definiere die Begriffe Geschäftsprozess, Workflow und Eventlog (je 1 Satz + Beispiel).",
      expected:
        "Geschäftsprozess: wiederholbare Aktivitätenfolge, die Input in wertvollen Output umwandelt (z. B. Bestellprozess). Workflow: Geschäftsprozess, der durch ein IT-System gesteuert wird (z. B. automatische Reisekostenfreigabe). Eventlog: Sammlung von Events mit Case ID, Activity und Timestamp (z. B. ERP-Logfile).",
      steps: [
        "Geschäftsprozess: Definition + Beispiel.",
        "Workflow: Definition mit IT-Bezug + Beispiel.",
        "Eventlog: drei Pflichtfelder + Beispiel.",
      ],
      exam: "Aufgabe 1 - Definitionen.",
    },
    {
      id: "k1-task-2",
      kind: "case",
      prompt:
        "Ein Online-Shop hat lange Lieferzeiten. Die Geschäftsführung führt sofort eine neue Software ein. Nach 3 Monaten messen sie den Erfolg. Welche Phasen wurden übersprungen, was ist der Fehler?",
      expected:
        "Übersprungen: Erhebung (Ist-Prozess), Analyse (Ursachen), Verbesserung (Soll-Prozess). Fehler: Software lösen Symptome nicht, wenn Ursachen unbekannt sind. Korrekte Reihenfolge: Identifikation -> Erhebung -> Analyse -> Verbesserung -> Einführung -> Überwachung.",
      steps: [
        "GPM-Zyklus aufschreiben.",
        "Im Fall vorhandene Phasen markieren.",
        "Fehlende Phasen + Begründung.",
        "Korrekte Reihenfolge zeigen.",
      ],
      trap: "Nur Phasen aufzählen ohne Begründung gibt wenig Punkte.",
      exam: "Aufgabe 2 - Klassiker mit Phasenfehler.",
    },
    {
      id: "k1-task-3",
      kind: "case",
      prompt:
        "Online-Shop für Mode. Ordne mit Begründung zu: (a) Produktauswahl/Bestellung im Shop, (b) Personalverwaltung, (c) strategische Sortimentsplanung.",
      expected:
        "(a) Kernprozess - direkter Kundennutzen durch Bestellabwicklung. (b) Supportprozess - intern unterstützend, kein direkter Kundennutzen. (c) Managementprozess - steuert das Sortiment strategisch.",
      steps: [
        "Frage: Wer profitiert direkt?",
        "Kategorie wählen.",
        "Kurze Begründung anhand Geschäftsmodell.",
      ],
      trap: "Plattform immer als Support einordnen ist falsch, wenn sie Kerngeschäft ist.",
      exam: "Aufgabe 3 - Begründete Zuordnung.",
    },
    {
      id: "k1-task-4",
      kind: "definition",
      prompt:
        "Welche Sicht aus ARIS beschreibt: 'Vertrieb prüft Bestelldaten und stößt Lieferung an'?",
      expected:
        "Mehrere Sichten zugleich: Funktion (prüfen, anstoßen), Organisation (Vertrieb), Daten (Bestelldaten), Leistung (Lieferung), Steuerung (Reihenfolge).",
      steps: [
        "Aktivitäten markieren -> Funktion.",
        "Akteure -> Organisation.",
        "Daten -> Datensicht.",
        "Output -> Leistung.",
        "Reihenfolge -> Steuerung.",
      ],
    },
  ],
};
