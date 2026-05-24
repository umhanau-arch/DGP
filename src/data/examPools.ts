// Pools of definitions, scenarios, branches and other randomizable
// content for the exam generator. Mirrors the original DGP exams
// (WS 25/26 + SS 25) with only values, names and wording changed.

export interface DefinitionEntry {
  term: string;
  answer: string;
}

export const DEFINITIONS: DefinitionEntry[] = [
  {
    term: "Geschäftsprozess",
    answer:
      "Wiederholbare Folge logisch zusammenhängender Aktivitäten, die einen Input in einen für interne oder externe Kunden wertvollen Output umwandelt. Beispiel: Order-to-Cash.",
  },
  {
    term: "Geschäftsprozessmodell",
    answer:
      "Vereinfachte Darstellung eines Geschäftsprozesses, die Aktivitäten, Reihenfolge, Rollen, Entscheidungen und Daten zeigt – als Grundlage für Verstehen, Verbessern und Automatisierung.",
  },
  {
    term: "Geschäftsprozessmanagement",
    answer:
      "Systematisches Identifizieren, Gestalten, Ausführen, Überwachen und kontinuierliches Verbessern von Geschäftsprozessen, um Effizienz, Effektivität und Qualität zu erhöhen.",
  },
  {
    term: "Workflow",
    answer:
      "Ein Geschäftsprozess, der ganz oder teilweise durch ein Informationssystem (Workflow-Engine) gesteuert wird – z. B. ein BPMN-Modell auf Camunda.",
  },
  {
    term: "Prozesslandkarte",
    answer:
      "Übersichtsdarstellung der wichtigsten Prozesse eines Unternehmens, klassisch geordnet in Management-, Kern- und Supportprozesse.",
  },
  {
    term: "ARIS",
    answer:
      "Architektur integrierter Informationssysteme nach Scheer mit fünf Sichten: Funktion, Organisation, Daten, Leistung und Steuerung (verbindende Sicht).",
  },
  {
    term: "Funktionsbaum",
    answer:
      "Hierarchische Zerlegung einer Hauptfunktion in Teilfunktionen bis hin zu Elementarfunktionen. Zeigt Struktur, KEINE zeitliche Reihenfolge.",
  },
  {
    term: "Prozessinstanz",
    answer:
      "Konkreter Durchlauf eines Geschäftsprozesstyps. Beispiel: Bestellung #4711 ist eine Instanz des Bestellprozesses.",
  },
  {
    term: "Effektivität",
    answer:
      "Die richtigen Ziele erreichen ('die richtigen Dinge tun').",
  },
  {
    term: "Effizienz",
    answer:
      "Mit minimalem Ressourceneinsatz arbeiten ('die Dinge richtig tun').",
  },
  {
    term: "Reengineering",
    answer:
      "Radikale Neugestaltung eines Geschäftsprozesses (im Gegensatz zur inkrementellen Verbesserung).",
  },
  {
    term: "Kernprozess",
    answer:
      "Prozess mit direktem Kundennutzen, der den Wertbeitrag des Unternehmens erzeugt (z. B. Produktion, Vertrieb).",
  },
  {
    term: "Supportprozess",
    answer:
      "Unterstützender Prozess, der Kernprozesse intern ermöglicht (z. B. HR, IT, Buchhaltung) – ohne direkten Kundennutzen.",
  },
  {
    term: "Managementprozess",
    answer:
      "Prozess, der das Unternehmen steuert und plant (z. B. Strategieentwicklung, Controlling, Qualitätsmanagement).",
  },
  {
    term: "Wertschöpfung",
    answer:
      "Wertschöpfung = Leistung − Vorleistung. Misst, wie viel Wert ein Unternehmen selbst erschafft.",
  },
  {
    term: "Eventlog",
    answer:
      "Sammlung von Events mit mindestens Case ID, Activity und Timestamp. Standardformat: XES.",
  },
  {
    term: "Trace",
    answer:
      "Aktivitätsfolge eines Cases, nach Timestamp sortiert. Beispiel: ⟨a, b, c, d⟩.",
  },
  {
    term: "Variante",
    answer:
      "Ein bestimmtes Trace-Muster mit Häufigkeit. Mehrere Cases mit identischem Trace bilden eine Variante.",
  },
  {
    term: "Petrinetz",
    answer:
      "Bipartiter Graph aus Stellen (Kreisen) und Transitionen (Rechtecken), verbunden durch gerichtete Kanten. Token in Stellen modellieren den Zustand.",
  },
  {
    term: "Workflownetz",
    answer:
      "Spezielles Petrinetz mit genau einer Quelle (Start), genau einer Senke (Ende) und einem Pfad zwischen beiden, der alle Knoten erfasst.",
  },
  {
    term: "Token",
    answer:
      "Marke in einer Stelle eines Petrinetzes. Die Verteilung aller Token ist die Markierung.",
  },
  {
    term: "Markierung",
    answer:
      "Verteilung aller Token auf die Stellen eines Petrinetzes; oft als Vektor M = (n₁, n₂, …) angegeben.",
  },
  {
    term: "Lebendigkeit",
    answer:
      "Eigenschaft eines Petrinetzes: jede Transition kann von jeder erreichbaren Markierung aus irgendwann wieder aktiviert werden.",
  },
  {
    term: "Sicherheit",
    answer:
      "Eigenschaft eines Petrinetzes: in keiner erreichbaren Markierung enthält eine Stelle mehr als 1 Token (= 1-beschränkt).",
  },
  {
    term: "k-Beschränktheit",
    answer:
      "Eigenschaft eines Petrinetzes: in keiner erreichbaren Markierung enthält eine Stelle mehr als k Token.",
  },
  {
    term: "Conformance Checking",
    answer:
      "Process-Mining-Verfahren, das Eventlog gegen ein Prozessmodell abgleicht und Abweichungen aufdeckt (Replay).",
  },
  {
    term: "Discovery",
    answer:
      "Process-Mining-Verfahren, das aus einem Eventlog ein Prozessmodell entdeckt (Play-In, z. B. Alpha-Algorithmus).",
  },
  {
    term: "Mass Customization",
    answer:
      "Massenproduktion mit kundenspezifischer Individualisierung zu Kosten nahe der Massenproduktion.",
  },
  {
    term: "Industrie 4.0",
    answer:
      "Vernetzte, datengetriebene Produktion mit cyber-physischen Systemen, Smart Factory und IoT.",
  },
  {
    term: "Digital Twin",
    answer:
      "Virtuelles Abbild eines realen Produkts oder Prozesses, kontinuierlich mit Echtzeitdaten verbunden.",
  },
  {
    term: "Digitization",
    answer:
      "Umwandlung analoger Daten in digitale Form (z. B. Papier → PDF). Reine Datentransformation.",
  },
  {
    term: "Digitalization",
    answer:
      "Verbesserung von Prozessen durch digitale Technik – z. B. Online-Workflows, automatisierte Freigaben.",
  },
  {
    term: "Digitale Transformation",
    answer:
      "Grundlegende Veränderung von Geschäftsmodell und Wertschöpfung durch digitale Technologien (z. B. Plattformökonomie).",
  },
  {
    term: "Balanced Scorecard",
    answer:
      "Kennzahlensystem mit 4 Perspektiven: Finanzen, Kunden, interne Prozesse, Lernen/Entwicklung.",
  },
  {
    term: "KPI",
    answer:
      "Key Performance Indicator – zentrale Kennzahl zur Steuerung der Prozessleistung (z. B. Durchlaufzeit, Termintreue).",
  },
  {
    term: "SMART",
    answer:
      "Kriterien für gute Ziele: Spezifisch, Messbar, Achievable/Akzeptiert, Realistisch, Terminiert.",
  },
  {
    term: "PDCA",
    answer:
      "Verbesserungszyklus: Plan – Do – Check – Act. Grundlage kontinuierlicher Verbesserung im QMS.",
  },
  {
    term: "ISO 9001",
    answer:
      "Internationale Norm für Qualitätsmanagementsysteme. Fordert dokumentierte Prozesse, Messung, kontinuierliche Verbesserung.",
  },
  {
    term: "lmi-Prozess",
    answer:
      "Leistungsmengeninduzierter Prozess: Prozesskosten hängen direkt von der Maßgröße ab.",
  },
  {
    term: "lmn-Prozess",
    answer:
      "Leistungsmengenneutraler Prozess: Prozesskosten fallen unabhängig von der Maßgröße an und werden umgelegt.",
  },
  {
    term: "Maßgröße",
    answer:
      "Bezugsgröße in der Prozesskostenrechnung, die die Kostenverursachung eines Teilprozesses misst (z. B. Anzahl Bestellungen).",
  },
  {
    term: "Cost Driver",
    answer:
      "Maßgröße auf Hauptprozessebene, die die Kostenverursachung beim Kostenträger erklärt.",
  },
  {
    term: "Prozessverantwortlicher",
    answer:
      "Rolle im GPM, die für Leistung, Messung und kontinuierliche Verbesserung eines Prozesses verantwortlich ist.",
  },
  {
    term: "Geschäftsprozesstyp",
    answer:
      "Allgemeine Beschreibung eines Geschäftsprozesses (Bauplan); im Gegensatz zur konkreten Prozessinstanz.",
  },
];

// ---------------- A2 scenarios (Variante A) ----------------

export interface CycleScenario {
  text: string;
  /** Phasen, die im Text falsch / fehlend sind */
  fehlend: string[];
  /** Pro Phase: Wie wäre korrekt? */
  korrektur: string[];
}

export const CYCLE_SCENARIOS: CycleScenario[] = [
  {
    text:
      "Das Unternehmen identifizierte Schwächen im Bestellprozess und führte sofort neue Softwarelösungen ein. Nach drei Monaten wurde geprüft, ob sich die Lieferzeiten verbessert hatten. Da keine signifikante Verbesserung erkennbar war, übertrug man die Verantwortung für den Prozess auf einen anderen Mitarbeiter. Anschließend wurden die Ergebnisse dokumentiert.",
    fehlend: [
      "Prozesserhebung – der Ist-Prozess wurde nie aufgenommen.",
      "Prozessanalyse – Ursachen für die langen Lieferzeiten wurden nicht systematisch ermittelt.",
      "Prozessverbesserung – ein Soll-Modell wurde nicht entworfen, stattdessen direkt Software eingeführt.",
    ],
    korrektur: [
      "Erhebung: Ist-Prozess durch Interviews und Beobachtung dokumentieren (Ist-Modell).",
      "Analyse: Engpässe und Ursachen ermitteln (z. B. Wertbeitragsanalyse, 6M, kritischer Pfad).",
      "Verbesserung: Soll-Prozess auf Basis der Analyse entwerfen, bevor die Umsetzung beginnt.",
    ],
  },
  {
    text:
      "Eine Versicherung beobachtete lange Bearbeitungszeiten im Schadensprozess. Die Geschäftsleitung beauftragte sofort eine externe Beratung, die einen Soll-Prozess vorschlug. Die IT setzte den Vorschlag in einer neuen Anwendung um. Nach Einführung wurde dokumentiert, dass der Prozess jetzt schneller laufen sollte.",
    fehlend: [
      "Prozesserhebung – der bestehende Ist-Prozess wurde nicht aufgenommen.",
      "Prozessanalyse – ohne Ist-Modell konnten Ursachen nicht analysiert werden.",
      "Prozessüberwachung – nach der Einführung gab es keine Messung mit KPIs.",
    ],
    korrektur: [
      "Erhebung: Reale Bearbeitungsschritte mit den Sachbearbeiter:innen aufnehmen.",
      "Analyse: Engpässe (z. B. Übergaben, Wartezeiten) systematisch identifizieren.",
      "Überwachung: KPIs wie Durchlaufzeit oder Quote pünktlicher Bearbeitung definieren und messen.",
    ],
  },
  {
    text:
      "Eine Logistikfirma installierte neue ERP-Module für die Disposition. Die IT-Abteilung wählte die Module nach Funktionsumfang aus und schulte die Mitarbeitenden. Nach drei Wochen wurden die ersten Aufträge live gestellt. Erst Beschwerden der Kunden zeigten, welche Prozesse betroffen waren.",
    fehlend: [
      "Prozessidentifikation – die relevanten Prozesse wurden nicht vorher priorisiert.",
      "Prozessanalyse – Schwachstellen der bestehenden Disposition blieben unbekannt.",
      "Prozessverbesserung – ein expliziter Soll-Prozess fehlte.",
    ],
    korrektur: [
      "Identifikation: Prozesslandkarte erstellen, kritische Prozesse priorisieren.",
      "Analyse: Bestehende Disposition aufnehmen und Schwachstellen messen.",
      "Verbesserung: Soll-Prozess vor der Tool-Einführung definieren.",
    ],
  },
  {
    text:
      "Ein Krankenhaus stellte fest, dass die Notaufnahme zu lange Wartezeiten hat. Die Verwaltung kaufte eine Patienten-App und stellte sie sofort live. Nach der Einführung wurden weder Daten erhoben noch der neue Ablauf mit den ursprünglichen Zielen verglichen.",
    fehlend: [
      "Prozessanalyse – die tatsächlichen Engpässe der Notaufnahme blieben ungeklärt.",
      "Prozessverbesserung – ohne Soll-Modell wurde direkt Technik eingesetzt.",
      "Prozessüberwachung – es fehlen KPIs zum Vergleich vor/nach der Einführung.",
    ],
    korrektur: [
      "Analyse: Daten zu Patientenflüssen erfassen, Engpässe markieren.",
      "Verbesserung: Soll-Prozess gemeinsam mit medizinischem Personal entwerfen.",
      "Überwachung: KPIs (z. B. mittlere Wartezeit) regelmäßig auswerten.",
    ],
  },
  {
    text:
      "Eine Hotelkette erhielt zunehmend negative Bewertungen zur Reservierung. Die Leitung führte sofort einen neuen Online-Reservierungs-Workflow ein. Nach einem Monat wurde stichprobenhaft gefragt, ob die Mitarbeitenden den neuen Workflow gut finden.",
    fehlend: [
      "Prozesserhebung – der bisherige Reservierungsprozess wurde nicht erfasst.",
      "Prozessanalyse – die konkreten Beschwerden wurden nicht systematisch ausgewertet.",
      "Prozessüberwachung – Kundenmetriken (z. B. Buchungsabbruchrate) wurden nicht gemessen.",
    ],
    korrektur: [
      "Erhebung: Schritte des Ist-Prozesses dokumentieren.",
      "Analyse: Bewertungen kategorisieren, Hauptursachen ableiten.",
      "Überwachung: Bewertungs-Score und Buchungsraten als KPIs einführen.",
    ],
  },
  {
    text:
      "Eine Bank entdeckte eine hohe Fehlerquote im Kreditprozess. Sie beauftragte direkt einen externen Berater, der einen neuen Prozess entwarf. Die Mitarbeitenden setzten den neuen Prozess seit dem nächsten Quartal um, ohne dass jemand den alten Ablauf protokolliert hätte.",
    fehlend: [
      "Prozesserhebung – das bestehende Vorgehen wurde nicht aufgenommen.",
      "Prozessanalyse – Ursachen der hohen Fehlerquote blieben unbekannt.",
      "Prozessüberwachung – es ist nicht definiert, wie die Fehlerquote künftig gemessen wird.",
    ],
    korrektur: [
      "Erhebung: Aktuellen Kreditprozess Schritt für Schritt aufnehmen.",
      "Analyse: Fehlertypen klassifizieren (Ursache-Wirkungs-Diagramm / 6M).",
      "Überwachung: KPIs wie First-Time-Right und Bearbeitungszeit messen.",
    ],
  },
];

// ---------------- A2 redesign branches (Variante B) ----------------

export interface RedesignCategory {
  name: string;
  beispiel: string;
}
export interface RedesignBranche {
  branche: string;
  kategorien: RedesignCategory[];
}

export const REDESIGN_BRANCHEN: RedesignBranche[] = [
  {
    branche: "Supermarkt",
    kategorien: [
      {
        name: "Eliminate / Aktivität streichen",
        beispiel:
          "Manuelle Preiskontrolle an der Kasse entfällt durch automatische Preisaktualisierung im Warenwirtschaftssystem.",
      },
      {
        name: "Parallelize / Aktivitäten parallelisieren",
        beispiel:
          "Wareneingang und Etikettierung neuer Produkte gleichzeitig statt nacheinander durchführen.",
      },
      {
        name: "Automate / Automatisieren",
        beispiel:
          "Bestellungen für Standardware automatisch durch das System auslösen, sobald Mindestbestand erreicht ist.",
      },
      {
        name: "Integrate / Schritte zusammenführen",
        beispiel:
          "Wareneingang und Buchung im Warenwirtschaftssystem in einem Schritt erfassen.",
      },
    ],
  },
  {
    branche: "Online-Shop",
    kategorien: [
      {
        name: "Automate",
        beispiel:
          "Versandlabel und Trackingnummern automatisch erzeugen, sobald die Bezahlung abgeschlossen ist.",
      },
      {
        name: "Reassign / Verantwortung verlagern",
        beispiel:
          "Self-Service-Retoure: Kund:innen erfassen Rücksendungen selbst über das Kundenportal.",
      },
      {
        name: "Parallelize",
        beispiel:
          "Bonitätsprüfung und Lagerprüfung gleichzeitig statt nacheinander.",
      },
      {
        name: "Eliminate",
        beispiel:
          "Doppelte Bestätigungsmail entfällt – nur eine Versand-E-Mail mit Tracking.",
      },
    ],
  },
  {
    branche: "Bäckereikette",
    kategorien: [
      {
        name: "Automate",
        beispiel:
          "Tagesumsätze werden automatisch aus den Kassensystemen ins Buchhaltungssystem übertragen.",
      },
      {
        name: "Specialize / Spezialisieren",
        beispiel:
          "Eigene Schnellkassenspur für Kund:innen, die nur ein Backwarenstück kaufen.",
      },
      {
        name: "Eliminate",
        beispiel:
          "Manuelle Inventur entfällt – das Warenwirtschaftssystem führt eine permanente Inventur.",
      },
    ],
  },
  {
    branche: "Versicherung",
    kategorien: [
      {
        name: "Automate",
        beispiel:
          "Einfache Schadensmeldungen werden automatisch geprüft (Dunkelverarbeitung) und ausgezahlt.",
      },
      {
        name: "Reassign",
        beispiel:
          "Standardanfragen vom Vertrieb statt von Sachbearbeiter:innen beantworten.",
      },
      {
        name: "Parallelize",
        beispiel:
          "Vertragsprüfung und medizinische Prüfung parallel statt sequenziell durchführen.",
      },
    ],
  },
  {
    branche: "Krankenhaus",
    kategorien: [
      {
        name: "Parallelize",
        beispiel:
          "Aufnahme und erste medizinische Anamnese laufen parallel ab.",
      },
      {
        name: "Reassign",
        beispiel:
          "Routinetätigkeiten (z. B. Blutdruckmessung) an Pflegepersonal statt an Ärzt:innen verlagern.",
      },
      {
        name: "Automate",
        beispiel:
          "Patientendaten werden automatisch aus dem Hausarzt-System übernommen.",
      },
    ],
  },
  {
    branche: "Logistikdienstleister",
    kategorien: [
      {
        name: "Automate",
        beispiel:
          "Tourenplanung wird durch ein System auf Basis von Echtzeit-Verkehrsdaten erstellt.",
      },
      {
        name: "Eliminate",
        beispiel:
          "Doppelte Erfassung im Transportauftragsformular wird durch eine zentrale Datenquelle ersetzt.",
      },
      {
        name: "Specialize",
        beispiel:
          "Eigene Express-Spur für Kund:innen mit zeitkritischen Lieferungen.",
      },
    ],
  },
];

// ---------------- A3 branches with processes ----------------

export type ProzessKategorie = "kern" | "support" | "management";

export interface BrancheProzess {
  name: string;
  expected: ProzessKategorie;
  begruendung: string;
}

export interface BrancheEntry {
  unternehmen: string;
  branche: string;
  text: string;
  prozesse: BrancheProzess[];
}

export const BRANCHEN: BrancheEntry[] = [
  {
    unternehmen: "EcoMode GmbH",
    branche: "Online-Shop für nachhaltige Mode",
    text:
      "Ein mittelständisches Unternehmen betreibt einen Online-Shop für nachhaltige Mode. Es nutzt eine digitale Plattform, auf der Kundinnen und Kunden Produkte auswählen, bestellen und bezahlen können. Im Hintergrund laufen zahlreiche Geschäftsprozesse digital ab.",
    prozesse: [
      {
        name: "Entwicklung der Unternehmensstrategie",
        expected: "management",
        begruendung:
          "Strategieentwicklung steuert das gesamte Unternehmen und gibt den Rahmen vor.",
      },
      {
        name: "Abwicklung des Online-Bestellvorgangs",
        expected: "kern",
        begruendung:
          "Erzeugt direkten Kundennutzen und ist das Geschäftsmodell des Online-Shops.",
      },
      {
        name: "Wartung der IT-Infrastruktur",
        expected: "support",
        begruendung:
          "Unterstützt Kernprozesse intern, ohne direkten Kundennutzen zu erzeugen.",
      },
      {
        name: "Durchführung von Marketingkampagnen",
        expected: "kern",
        begruendung:
          "Im Online-Handel ist Marketing zentral für die Umsatzgenerierung – wird häufig als Kernprozess gewertet.",
      },
      {
        name: "Erstellung der monatlichen Gehaltsabrechnung",
        expected: "support",
        begruendung:
          "Interne Abrechnung – kein direkter Kundennutzen, klassischer Supportprozess.",
      },
      {
        name: "Einstellung und Schulung neuer Mitarbeitender",
        expected: "support",
        begruendung:
          "HR ermöglicht andere Prozesse, erzeugt aber keinen unmittelbaren Kundennutzen.",
      },
      {
        name: "Pflege und Weiterentwicklung der Online-Shop-Plattform",
        expected: "kern",
        begruendung:
          "Die Plattform IST das Geschäftsmodell – Pflege ist Kernprozess.",
      },
    ],
  },
  {
    unternehmen: "ConsultIT AG",
    branche: "IT-Beratungsunternehmen",
    text:
      "Eine IT-Beratung berät große Industriekunden bei der Einführung neuer Softwarelösungen. Sie führt Projekte gemeinsam mit den Kunden durch und stellt eigene Berater:innen vor Ort.",
    prozesse: [
      {
        name: "Durchführung von Beratungsprojekten",
        expected: "kern",
        begruendung:
          "Direkte Wertschöpfung beim Kunden – Kerngeschäft.",
      },
      {
        name: "Buchhaltung und Rechnungsstellung",
        expected: "support",
        begruendung:
          "Interne Verwaltung, keine direkte Wertschöpfung beim Kunden.",
      },
      {
        name: "Strategische Geschäftsfeldplanung",
        expected: "management",
        begruendung:
          "Strategische Planung ist klassischer Managementprozess.",
      },
      {
        name: "Recruiting neuer Berater:innen",
        expected: "support",
        begruendung:
          "HR-Prozess unterstützt das Kerngeschäft.",
      },
      {
        name: "Akquise neuer Kund:innen",
        expected: "kern",
        begruendung:
          "Direkter Kontakt zu potenziellen Kund:innen, treibt Umsatz – Kernprozess.",
      },
      {
        name: "IT-Betrieb und Lizenzmanagement intern",
        expected: "support",
        begruendung:
          "Interne IT-Versorgung, Supportprozess.",
      },
    ],
  },
  {
    unternehmen: "Klinikum Lindau",
    branche: "Krankenhaus",
    text:
      "Ein Krankenhaus versorgt Patient:innen ambulant und stationär. Es betreibt eine Notaufnahme, mehrere Stationen und eine eigene Verwaltung.",
    prozesse: [
      {
        name: "Behandlung von Patient:innen",
        expected: "kern",
        begruendung:
          "Direkter Patientennutzen – das Kerngeschäft des Krankenhauses.",
      },
      {
        name: "Reinigung der Stationen",
        expected: "support",
        begruendung:
          "Hauswirtschaftliche Tätigkeit, ermöglicht den Klinikbetrieb.",
      },
      {
        name: "Krankenhausstrategie und Zielplanung",
        expected: "management",
        begruendung:
          "Steuert das Klinikum auf strategischer Ebene.",
      },
      {
        name: "Beschaffung von Verbrauchsmaterial",
        expected: "support",
        begruendung:
          "Versorgt die Behandlung mit Material, ohne unmittelbaren Patientenkontakt.",
      },
      {
        name: "Aufnahme von Notfallpatient:innen",
        expected: "kern",
        begruendung:
          "Direkter Kontakt mit Patient:innen, Teil der medizinischen Versorgung.",
      },
      {
        name: "Personalentwicklung und Fortbildung",
        expected: "support",
        begruendung:
          "Unterstützt die Behandlungsqualität, ist aber kein direkter Patientennutzen.",
      },
    ],
  },
  {
    unternehmen: "Stadtbank Süd",
    branche: "Universalbank",
    text:
      "Eine Bank betreibt Filialen und Online-Banking, vergibt Kredite und bietet Anlageprodukte an.",
    prozesse: [
      {
        name: "Bearbeitung von Kreditanträgen",
        expected: "kern",
        begruendung:
          "Direkter Kundenservice mit Wertschöpfung.",
      },
      {
        name: "Risiko- und Compliance-Steuerung",
        expected: "management",
        begruendung:
          "Überwacht das Geschäft auf Risiken, gehört zu den Managementprozessen.",
      },
      {
        name: "IT-Infrastruktur und Online-Banking-Plattform",
        expected: "kern",
        begruendung:
          "Die Online-Banking-Plattform ist Teil des Geschäftsmodells – Kernprozess.",
      },
      {
        name: "Personalverwaltung",
        expected: "support",
        begruendung:
          "Klassischer interner Supportprozess.",
      },
      {
        name: "Monatlicher Lohn- und Gehaltslauf",
        expected: "support",
        begruendung:
          "Interne Verwaltung der Mitarbeitenden.",
      },
      {
        name: "Strategische Marktpositionierung",
        expected: "management",
        begruendung:
          "Strategieebene, betrifft das gesamte Unternehmen.",
      },
    ],
  },
  {
    unternehmen: "TransGo Logistik",
    branche: "Logistikdienstleister",
    text:
      "Ein Logistikdienstleister betreibt einen Fuhrpark und Lager und übernimmt Transporte für Industrie- und Handelskunden.",
    prozesse: [
      {
        name: "Transportabwicklung von A nach B",
        expected: "kern",
        begruendung:
          "Erzeugt direkt Kundennutzen – Kerngeschäft.",
      },
      {
        name: "Wartung des Fuhrparks",
        expected: "support",
        begruendung:
          "Hält den Fuhrpark einsatzfähig, ohne unmittelbar Kundennutzen zu liefern.",
      },
      {
        name: "Strategische Netzplanung der Standorte",
        expected: "management",
        begruendung:
          "Strategische Entscheidung über Standorte – Managementprozess.",
      },
      {
        name: "Disposition und Tourenplanung",
        expected: "kern",
        begruendung:
          "Direkter Bestandteil der Leistungserbringung.",
      },
      {
        name: "IT-Helpdesk für Mitarbeitende",
        expected: "support",
        begruendung:
          "Interner IT-Support.",
      },
      {
        name: "Buchhaltung der Frachtrechnungen",
        expected: "support",
        begruendung:
          "Kaufmännischer Supportprozess.",
      },
    ],
  },
  {
    unternehmen: "BackHaus Frische GmbH",
    branche: "Bäckereikette",
    text:
      "Eine Bäckereikette betreibt 25 Filialen und produziert Backwaren in einer zentralen Backstube.",
    prozesse: [
      {
        name: "Backen und Produktion in der zentralen Backstube",
        expected: "kern",
        begruendung:
          "Erzeugt das Produkt – Kerngeschäft.",
      },
      {
        name: "Verkauf in den Filialen",
        expected: "kern",
        begruendung:
          "Direkter Kundenkontakt mit Wertschöpfung.",
      },
      {
        name: "Reinigung der Backstube",
        expected: "support",
        begruendung:
          "Hauswirtschaftlich, ermöglicht den Betrieb.",
      },
      {
        name: "Strategische Sortimentsplanung",
        expected: "management",
        begruendung:
          "Steuert auf strategischer Ebene das Angebot.",
      },
      {
        name: "Buchhaltung",
        expected: "support",
        begruendung:
          "Kaufmännischer Supportprozess.",
      },
      {
        name: "Personalplanung in den Filialen",
        expected: "support",
        begruendung:
          "Personaleinsatzplanung, ermöglicht den Verkauf.",
      },
    ],
  },
  {
    unternehmen: "GuardLife Versicherung",
    branche: "Versicherung",
    text:
      "Eine Versicherung bietet Lebens-, Sach- und Haftpflichtversicherungen für Privatkund:innen an. Sie betreibt einen klassischen Außendienst plus Online-Vertrieb.",
    prozesse: [
      {
        name: "Vertragsabschluss mit Neukund:innen",
        expected: "kern",
        begruendung:
          "Direkter Kundenkontakt – Kerngeschäft.",
      },
      {
        name: "Schadensbearbeitung",
        expected: "kern",
        begruendung:
          "Liefert direkten Nutzen für Kund:innen im Schadenfall.",
      },
      {
        name: "Strategische Produktentwicklung",
        expected: "management",
        begruendung:
          "Steuert auf strategischer Ebene das Versicherungsportfolio.",
      },
      {
        name: "Buchhaltung",
        expected: "support",
        begruendung:
          "Kaufmännischer Supportprozess.",
      },
      {
        name: "IT-Betrieb des Vertrags-Backends",
        expected: "support",
        begruendung:
          "Versorgt Kernprozesse mit IT, kein direkter Kundennutzen.",
      },
      {
        name: "Personalrekrutierung im Außendienst",
        expected: "support",
        begruendung:
          "HR ermöglicht das Geschäft, ohne direkten Kundennutzen.",
      },
    ],
  },
];

// ---------------- A4 PKR pools ----------------

export interface PkrTeilprozessTemplate {
  name: string;
  measureLabel: string;
  measureSingular: string; // "Bestellung", "Auftrag" – für "pro X"
}

export const PKR_TEILPROZESSE: PkrTeilprozessTemplate[] = [
  { name: "Bestellabwicklung", measureLabel: "Anzahl Bestellungen", measureSingular: "Bestellung" },
  { name: "Auftragsbearbeitung", measureLabel: "Anzahl Aufträge", measureSingular: "Auftrag" },
  { name: "Wareneingangskontrolle", measureLabel: "Anzahl Materialpositionen", measureSingular: "Materialposition" },
  { name: "Warenausgangskontrolle", measureLabel: "Anzahl Lieferpositionen", measureSingular: "Lieferposition" },
  { name: "Maschinenrüsten", measureLabel: "Anzahl Rüstvorgänge", measureSingular: "Rüstvorgang" },
  { name: "Maschinenumrüstung", measureLabel: "Anzahl Umrüstungen", measureSingular: "Umrüstung" },
  { name: "Endprüfung & Dokumentation", measureLabel: "Anzahl geprüfter Chargen", measureSingular: "Charge" },
  { name: "Endkontrolle & Dokumentation", measureLabel: "Anzahl geprüfter Lose", measureSingular: "Los" },
  { name: "Verpackung", measureLabel: "Anzahl Pakete", measureSingular: "Paket" },
  { name: "Versandabwicklung", measureLabel: "Anzahl Sendungen", measureSingular: "Sendung" },
  { name: "Qualitätskontrolle", measureLabel: "Anzahl Qualitätsprüfungen", measureSingular: "Prüfung" },
  { name: "Lieferantenbewertung", measureLabel: "Anzahl Lieferantenbewertungen", measureSingular: "Bewertung" },
];

export const PKR_FIRMEN = [
  "EcoTools AG",
  "LogiTech GmbH",
  "MechaForm AG",
  "SoliPanel AG",
  "NordHaus AG",
  "FineWire GmbH",
  "AlphaPlast AG",
  "OptiSteel GmbH",
  "VerdantBox AG",
  "Brückner Maschinenbau",
];

export const PKR_PRODUKTE: Array<[string, string]> = [
  ["Alpha", "Beta"],
  ["Gamma", "Delta"],
  ["Iota", "Kappa"],
  ["Sigma", "Tau"],
  ["Lambda", "Mu"],
  ["Omega", "Phi"],
];

// ---------------- A5 Integration scenarios ----------------

export interface IntegrationScenario {
  unternehmen: string;
  branche: string;
  produkt: string;
  measure: string; // pro Stück / Modul / Maschine ...
  zukauf: string; // beschreibt was das übernommene Unternehmen macht
  rueckwaerts: string; // konkrete Maßnahme: Übernahme Zulieferer für X
  rueckwaertsKomponente: string;
  horizontal: string; // Fusion mit Konkurrent
  intro: string;
  /** Kostenpositionen: name, intern, extern (null wenn nicht vorhanden) */
  positionen: Array<{ name: string; intern: number | null; extern: number | null }>;
  changeRowName: string; // welche Position kann komplett intern gemacht werden
  changeIntern: number; // Erhöhung der internen Kosten
}

export const INTEGRATION_SCENARIOS: IntegrationScenario[] = [
  {
    unternehmen: "SoliPanel AG",
    branche: "Solarindustrie",
    produkt: "Solar-Modul",
    measure: "pro Modul",
    intro:
      "Die SoliPanel AG ist ein mittelständisches Unternehmen aus der Solarindustrie. Sie produziert Solar-Module und übernimmt dabei viele Fertigungsschritte selbst, etwa das Zuschneiden der Glasplatten, das Verschalten der Solarzellen und die Endmontage. Andere Bauteile, wie spezielle Wechselrichter und Anschlusskabel, werden jedoch von externen Zulieferern eingekauft.",
    zukauf:
      "Vor Kurzem hat die SoliPanel AG außerdem einen kleineren Modulhersteller übernommen, der ebenfalls Solar-Module herstellt, jedoch in einer anderen Region produziert.",
    rueckwaerts:
      "Die SoliPanel AG übernimmt ihren bisherigen Zulieferer für Wechselrichter.",
    rueckwaertsKomponente: "Wechselrichter",
    horizontal:
      "Die SoliPanel AG fusioniert mit einem direkten Modulhersteller-Konkurrenten in einer anderen Region.",
    positionen: [
      { name: "Glaszuschnitt", intern: 850, extern: null },
      { name: "Wechselrichter", intern: null, extern: 1200 },
      { name: "Verkabelung", intern: 250, extern: 800 },
      { name: "Anschlusskabel", intern: null, extern: 400 },
      { name: "Endmontage", intern: 650, extern: null },
      { name: "Qualitätskontrolle", intern: 600, extern: null },
    ],
    changeRowName: "Verkabelung",
    changeIntern: 800,
  },
  {
    unternehmen: "MECHATRON GmbH",
    branche: "Maschinenbau",
    produkt: "CNC-Fräsgerät",
    measure: "pro Fräsgerät",
    intro:
      "Die MECHATRON GmbH ist ein mittelständisches Maschinenbauunternehmen. Es stellt CNC-Fräsen her und führt viele Produktionsschritte im eigenen Werk durch, z.B. das Fräsen von Metallteilen, die Endmontage und die Qualitätssicherung. Allerdings werden einige Komponenten, wie Elektromotoren und Steuerungselektronik, von externen Lieferanten bezogen.",
    zukauf:
      "Außerdem hat MECHATRON vor Kurzem ein kleineres Unternehmen übernommen, das ebenfalls CNC-Fräsen produziert – jedoch in einer anderen Region.",
    rueckwaerts: "MECHATRON übernimmt den bisherigen Zulieferer für Elektromotoren.",
    rueckwaertsKomponente: "Elektromotoren",
    horizontal:
      "MECHATRON fusioniert mit einem direkten Wettbewerber in einer anderen Region.",
    positionen: [
      { name: "Mechanische Bearbeitung", intern: 3000, extern: null },
      { name: "Elektromotoren", intern: null, extern: 1500 },
      { name: "Steuerungselektronik", intern: 500, extern: 1500 },
      { name: "Lackierung", intern: null, extern: 1000 },
      { name: "Endmontage", intern: 2000, extern: null },
      { name: "Qualitätssicherung", intern: 1500, extern: null },
    ],
    changeRowName: "Steuerungselektronik",
    changeIntern: 1500,
  },
  {
    unternehmen: "BioBrew AG",
    branche: "Brauereibranche",
    produkt: "Hektoliter Bier",
    measure: "pro Hektoliter",
    intro:
      "Die BioBrew AG ist eine mittelständische Brauerei. Sie übernimmt viele Schritte selbst – Maischen, Kochen, Gären und Lagern – und füllt das Bier intern in Flaschen ab. Hopfen und spezielle Hefen werden jedoch von externen Lieferanten bezogen.",
    zukauf:
      "Vor Kurzem hat die BioBrew AG eine regionale Brauerei übernommen, die ebenfalls Bier herstellt – aber an einem anderen Standort und mit anderen Lieferanten.",
    rueckwaerts: "BioBrew übernimmt den bisherigen Hopfen-Zulieferer.",
    rueckwaertsKomponente: "Hopfen",
    horizontal: "BioBrew fusioniert mit einem direkten Brauerei-Konkurrenten aus einer anderen Region.",
    positionen: [
      { name: "Maischen", intern: 25, extern: null },
      { name: "Hopfen", intern: null, extern: 18 },
      { name: "Hefe", intern: 5, extern: 15 },
      { name: "Etiketten", intern: null, extern: 10 },
      { name: "Abfüllung", intern: 22, extern: null },
      { name: "Qualitätskontrolle", intern: 14, extern: null },
    ],
    changeRowName: "Hefe",
    changeIntern: 15,
  },
  {
    unternehmen: "TextilWerk Süd",
    branche: "Modeindustrie",
    produkt: "Kollektion-Stück",
    measure: "pro Stück",
    intro:
      "TextilWerk Süd ist ein mittelständischer Hersteller nachhaltiger Mode. Schnitt und Konfektion werden selbst übernommen, einige Stoffe und Knöpfe werden eingekauft.",
    zukauf:
      "Kürzlich hat TextilWerk Süd einen kleineren Hersteller im Norden übernommen, der ähnliche Mode mit anderen Zulieferern produziert.",
    rueckwaerts: "TextilWerk Süd übernimmt seinen bisherigen Stoff-Zulieferer.",
    rueckwaertsKomponente: "Bio-Baumwollstoff",
    horizontal: "TextilWerk Süd fusioniert mit einem direkten Modehersteller aus einer anderen Region.",
    positionen: [
      { name: "Zuschnitt", intern: 12, extern: null },
      { name: "Bio-Baumwollstoff", intern: null, extern: 28 },
      { name: "Knöpfe und Reißverschlüsse", intern: 3, extern: 6 },
      { name: "Etiketten", intern: null, extern: 2 },
      { name: "Konfektion", intern: 18, extern: null },
      { name: "Qualitätskontrolle", intern: 5, extern: null },
    ],
    changeRowName: "Knöpfe und Reißverschlüsse",
    changeIntern: 6,
  },
  {
    unternehmen: "AutoTeile Nord GmbH",
    branche: "Automobilzulieferer",
    produkt: "Bremssystem",
    measure: "pro Bremssystem",
    intro:
      "AutoTeile Nord ist ein Tier-1-Automobilzulieferer. Mechanische Bearbeitung und Montage erfolgen intern, Elektronik wird zugekauft.",
    zukauf:
      "Kürzlich hat AutoTeile Nord einen kleineren Zulieferer übernommen, der ein ähnliches Sortiment in einem anderen Land produziert.",
    rueckwaerts: "AutoTeile Nord übernimmt seinen bisherigen Zulieferer für Sensorik.",
    rueckwaertsKomponente: "Sensorik",
    horizontal: "AutoTeile Nord fusioniert mit einem direkten Wettbewerber in einer anderen Region.",
    positionen: [
      { name: "Mechanische Bearbeitung", intern: 220, extern: null },
      { name: "Sensorik", intern: 60, extern: 180 },
      { name: "Steuerelektronik", intern: null, extern: 300 },
      { name: "Bremsbelagmaterial", intern: null, extern: 90 },
      { name: "Endmontage", intern: 140, extern: null },
      { name: "Qualitätssicherung", intern: 100, extern: null },
    ],
    changeRowName: "Sensorik",
    changeIntern: 180,
  },
  {
    unternehmen: "HausTech AG",
    branche: "Smart-Home-Branche",
    produkt: "Smart-Home-Set",
    measure: "pro Set",
    intro:
      "HausTech entwickelt Smart-Home-Lösungen. Software, Endmontage und Qualitätskontrolle werden intern gemacht, Hardware-Komponenten werden zugekauft.",
    zukauf:
      "HausTech hat zuletzt einen kleineren Konkurrenten in der Schweiz übernommen, der ähnliche Smart-Home-Sets produziert.",
    rueckwaerts: "HausTech übernimmt den bisherigen Zulieferer für Sensoren.",
    rueckwaertsKomponente: "Sensoren",
    horizontal: "HausTech fusioniert mit einem direkten Smart-Home-Konkurrenten in der Schweiz.",
    positionen: [
      { name: "Software-Entwicklung", intern: 90, extern: null },
      { name: "Sensoren", intern: null, extern: 120 },
      { name: "Funkmodul", intern: 25, extern: 60 },
      { name: "Gehäuse", intern: null, extern: 35 },
      { name: "Endmontage", intern: 70, extern: null },
      { name: "Qualitätskontrolle", intern: 40, extern: null },
    ],
    changeRowName: "Funkmodul",
    changeIntern: 60,
  },
];

// ---------------- A7 BPMN scenario pool ----------------

export interface BpmnScenario {
  title: string; // "Stornierungsprozess", "Reklamationsprozess" ...
  intro: string; // "In einem Online-Shop werden gelegentlich..."
  steps: string[]; // Aufzählung wie im Original (1...n)
  hinweise: string[];
  loesungSchritte: string[];
}

export const BPMN_SZENARIEN: BpmnScenario[] = [
  {
    title: "Stornierungsprozess",
    intro:
      "In einem Online-Shop werden gelegentlich Bestellungen von Kundinnen und Kunden storniert. Der folgende Prozess beschreibt den Ablauf von der Stornierungsanfrage bis zur abschließenden Rückmeldung an den Kunden.",
    steps: [
      "Der Kunde füllt ein Webformular für die Stornierungsanfrage aus und sendet dieses an das Unternehmen.",
      "Die Abteilung Kundenservice prüft beim Eingang, ob die Stornierungsanfrage alle benötigten Daten enthält. Falls Daten fehlen, wird der Kunde informiert und zur Ergänzung aufgefordert. Nach Einreichen der fehlenden Angaben beginnt die Prüfung erneut.",
      "Ist die Anfrage vollständig, wird sie an die Versandabteilung weitergeleitet.",
      "Die Versandabteilung prüft, ob die Bestellung bereits versandt wurde. Falls ja, wird eine Rücksendung organisiert und der Kunde erhält einen Rücksendeschein. Falls nein, wird die Bestellung im System storniert.",
      "Danach informiert der Kundenservice den Kunden entweder über die erfolgreiche Stornierung und Rückerstattung oder darüber, dass eine Rücksendung erforderlich ist (inklusive Versand des Rücksendescheins).",
    ],
    hinweise: [
      "Modellieren Sie den Prozess End-to-End: Kunde und Unternehmen in separaten Pools.",
      "Verwenden Sie Nachrichtenzwischenereignisse für den Informationsaustausch.",
      "Verwenden Sie für Aktivitäten und Ereignisse klare textuelle Beschreibungen.",
    ],
    loesungSchritte: [
      "Pool Kunde mit Start-Event 'Stornoanfrage erstellen' → Send-Task → Nachrichtenfluss zum Unternehmen.",
      "Pool Unternehmen, Lane Kundenservice: Start-Nachrichtenereignis 'Stornoanfrage empfangen' → Task 'Vollständigkeit prüfen' → XOR-Gateway 'vollständig?'.",
      "Bei unvollständig: Send-Task 'Nachforderung senden' → Nachrichtenfluss zum Kunden, Receive 'Antwort empfangen' → Schleife zur Vollständigkeitsprüfung.",
      "Bei vollständig: Sequenzfluss zur Lane Versand → Task 'Versandstatus prüfen' → XOR-Gateway 'bereits versendet?'.",
      "Bereits versendet: Task 'Rücksendung organisieren' → Send-Task 'Rücksendeschein an Kunden senden'.",
      "Noch nicht versendet: Task 'Bestellung im System stornieren'.",
      "Beide Pfade: zurück zum Kundenservice → Send-Task 'Erfolgsmeldung an Kunden' → Nachrichtenfluss → End-Event.",
      "Pool Kunde empfängt jeweilige Nachricht (kann am Pool enden).",
    ],
  },
  {
    title: "Reklamationsprozess",
    intro:
      "Ein Unternehmen erhält gelegentlich Produktreklamationen von Kundinnen und Kunden. Der folgende Prozess beschreibt den Ablauf von der Annahme bis zur abschließenden Rückmeldung an den Kunden.",
    steps: [
      "Der Kunde schreibt eine Reklamation und reicht diese per E-Mail beim Unternehmen ein.",
      "Der Kundenservice prüft bei Eingang, ob die Reklamation formell vollständig ist. Wenn unvollständig, wird der Kunde zur Nachbesserung aufgefordert. Dieser reicht die Unterlagen nach und die Prüfung beginnt erneut.",
      "Ist die Reklamation vollständig, wird sie an die Fachabteilung (Qualitätsmanagement) weitergeleitet.",
      "Das Qualitätsmanagement prüft die technische Ursache.",
      "Danach entscheidet sie, ob die Reklamation berechtigt ist. Wenn ja, wird ein Ersatzprodukt freigegeben. Wenn nein, wird eine schriftliche Ablehnung vorbereitet.",
      "Anschließend schickt der Kundenservice entweder das Ersatzprodukt zurück und informiert den Kunden oder er finalisiert und schickt die schriftliche Ablehnung zum Kunden.",
    ],
    hinweise: [
      "End-to-End mit separaten Pools für Kunde und Unternehmen.",
      "Nachrichtenzwischenereignisse zwischen Pools verwenden.",
      "Aktivitäten und Ereignisse klar textuell beschreiben.",
    ],
    loesungSchritte: [
      "Pool Kunde: Reklamation per E-Mail senden → Send-Task → Nachrichtenfluss.",
      "Pool Unternehmen, Lane Kundenservice: Empfang → Task 'Vollständigkeit prüfen' → XOR.",
      "Unvollständig: Send-Task 'Nachforderung' → Receive 'Antwort empfangen' → Schleife zur Prüfung.",
      "Vollständig: Sequenzfluss zur Lane Qualitätsmanagement → Task 'Technische Ursache prüfen' → XOR 'berechtigt?'.",
      "Berechtigt: Task 'Ersatzprodukt freigeben' → Lane Kundenservice → Send-Task 'Ersatzprodukt verschicken'.",
      "Nicht berechtigt: Task 'Ablehnung vorbereiten' → Lane Kundenservice → Send-Task 'Ablehnung senden'.",
      "Beide Pfade enden mit End-Event.",
    ],
  },
  {
    title: "Bestellprozess",
    intro:
      "In einem Online-Shop wird der Bestellprozess von der Kundenanfrage bis zur Auslieferung modelliert.",
    steps: [
      "Der Kunde legt Produkte in den Warenkorb und sendet die Bestellung an das Unternehmen.",
      "Der Vertrieb prüft Bonität und Verfügbarkeit. Bei negativer Bonität wird der Kunde abgelehnt.",
      "Bei positiver Bonität prüft das Lager den Bestand. Falls nicht vorhanden, fertigt die Produktion nach.",
      "Der Versand verpackt und versendet die Ware. Der Kunde erhält eine Versandbestätigung.",
      "Die Buchhaltung erstellt die Rechnung und sendet sie an den Kunden.",
    ],
    hinweise: [
      "Pool Kunde + Pool Unternehmen mit Lanes Vertrieb, Lager, Produktion, Versand, Buchhaltung.",
      "Nachrichtenflüsse zwischen Pools.",
      "Schleife oder XOR bei nicht vorhandenem Bestand.",
    ],
    loesungSchritte: [
      "Pool Kunde: 'Bestellung absenden' → Nachrichtenfluss.",
      "Vertrieb: Empfang → Bonität prüfen → XOR 'bonität ok?'. Negativ: Send-Task 'Ablehnung' → Ende.",
      "Positiv: Lager prüft Bestand → XOR 'verfügbar?'. Nicht verfügbar: Produktion 'Nachfertigen' → zurück zur Verfügbarkeitsprüfung.",
      "Verfügbar: Versand 'Verpacken & Versenden' → Send-Task 'Versandbestätigung'.",
      "Buchhaltung 'Rechnung erstellen' → Send-Task 'Rechnung an Kunden'.",
      "Pool Kunde empfängt Versandbestätigung und Rechnung.",
    ],
  },
  {
    title: "Garantieprüfung",
    intro:
      "Ein Hersteller bearbeitet Garantieanträge: Kunden reichen einen Antrag ein, das Unternehmen prüft Garantieanspruch und entscheidet über Reparatur oder Ablehnung.",
    steps: [
      "Der Kunde sendet einen Garantieantrag online ein.",
      "Der Kundenservice prüft die Vollständigkeit. Bei fehlenden Unterlagen wird der Kunde zur Nachreichung aufgefordert. Nach Einreichung beginnt die Prüfung erneut.",
      "Ist der Antrag vollständig, prüft die Technikabteilung den Garantieanspruch.",
      "Wenn berechtigt: Reparatur oder Ersatzlieferung wird vorbereitet und versendet.",
      "Wenn nicht berechtigt: Ablehnung wird formuliert und versendet.",
    ],
    hinweise: [
      "End-to-End mit Pools Kunde und Unternehmen (Lanes Kundenservice und Technik).",
      "Schleife für Nachreichung.",
      "Nachrichtenflüsse zwischen Pools.",
    ],
    loesungSchritte: [
      "Pool Kunde: 'Garantieantrag absenden' → Nachrichtenfluss.",
      "Lane Kundenservice: Empfang → 'Vollständigkeit prüfen' → XOR.",
      "Unvollständig: Nachforderung → Receive → Schleife.",
      "Vollständig: Lane Technik 'Garantieanspruch prüfen' → XOR.",
      "Berechtigt: 'Reparatur/Ersatz vorbereiten' → 'Versand' → Nachricht an Kunden.",
      "Nicht berechtigt: 'Ablehnung formulieren' → Nachricht an Kunden.",
      "Pool Kunde empfängt Antwort, End-Event.",
    ],
  },
];

// ---------------- A8 Process model trace patterns ----------------

export interface ProcessModelTemplate {
  description: string;
  activities: string[];
  /** Schleife in Modell vorhanden? */
  withLoop: boolean;
  completeTraces: string[];
  traceCheck: Array<{ trace: string; possible: boolean }>;
  /** Anzahl kompletter Traces (oder "unendlich") */
  completeTracesCount: number | "unendlich";
}

export const PROCESS_MODELS: ProcessModelTemplate[] = [
  {
    description:
      "Prozessmodell mit XOR-Verzweigung am Anfang (a → entweder b parallel zu c → d → e oder direkt e), und Endsymbol g. Schleife: nach e kann optional f → b/c wiederholt werden, bevor h ausgeführt wird.",
    activities: ["a", "b", "c", "d", "e", "f", "g", "h"],
    withLoop: true,
    completeTraces: ["adbeh", "acdeg", "acbdefg", "adcefbdeh", "acbdefdbch"],
    traceCheck: [
      { trace: "adbeh", possible: true },
      { trace: "acdeg", possible: true },
      { trace: "acbdefg", possible: true },
      { trace: "adcefbdeh", possible: true },
      { trace: "bcdeg", possible: false },
      { trace: "acbdefdbch", possible: true },
    ],
    completeTracesCount: "unendlich",
  },
  {
    description:
      "Prozessmodell mit a als Start und e als Ende. Zwischendrin XOR zwischen b||c und d, mit optionaler Schleife.",
    activities: ["a", "b", "c", "d", "e", "f", "g", "h"],
    withLoop: true,
    completeTraces: ["abcdeg", "adbceh", "acbdefg", "acbdefdbch"],
    traceCheck: [
      { trace: "abcdeg", possible: true },
      { trace: "adcbfbcdeh", possible: false },
      { trace: "adbceh", possible: true },
      { trace: "bcdeg", possible: false },
      { trace: "acbdefg", possible: true },
      { trace: "acbdefdbch", possible: true },
    ],
    completeTracesCount: "unendlich",
  },
];

// ---------------- A8 Footprint pool ----------------

export interface FootprintLog {
  /** the L expression rendered as string */
  display: string;
  activities: string[];
  /** computed footprint */
  matrix: Record<string, Record<string, "→" | "←" | "∥" | "#">>;
}

/** Build footprint from a list of traces using α-algorithm rules. */
export function buildFootprint(
  traces: string[][],
  activities: string[],
): Record<string, Record<string, "→" | "←" | "∥" | "#">> {
  const direct = new Set<string>();
  for (const t of traces) {
    for (let i = 0; i < t.length - 1; i++) {
      direct.add(`${t[i]}>${t[i + 1]}`);
    }
  }
  const matrix: Record<string, Record<string, "→" | "←" | "∥" | "#">> = {};
  for (const a of activities) {
    matrix[a] = {};
    for (const b of activities) {
      const ab = direct.has(`${a}>${b}`);
      const ba = direct.has(`${b}>${a}`);
      if (ab && ba) matrix[a][b] = "∥";
      else if (ab) matrix[a][b] = "→";
      else if (ba) matrix[a][b] = "←";
      else matrix[a][b] = "#";
    }
  }
  return matrix;
}

export const FOOTPRINT_LOGS: FootprintLog[] = [
  {
    display: "L = [⟨a, b, c, e⟩, ⟨a, c, b, e⟩², ⟨a, b, d, e⟩, ⟨a, e⟩²]",
    activities: ["a", "b", "c", "d", "e"],
    matrix: buildFootprint(
      [
        ["a", "b", "c", "e"],
        ["a", "c", "b", "e"],
        ["a", "c", "b", "e"],
        ["a", "b", "d", "e"],
        ["a", "e"],
        ["a", "e"],
      ],
      ["a", "b", "c", "d", "e"],
    ),
  },
  {
    display: "L = [⟨a, b, d⟩², ⟨a, c, d⟩, ⟨a, b, c, d⟩, ⟨a, c, b, d⟩²]",
    activities: ["a", "b", "c", "d"],
    matrix: buildFootprint(
      [
        ["a", "b", "d"],
        ["a", "b", "d"],
        ["a", "c", "d"],
        ["a", "b", "c", "d"],
        ["a", "c", "b", "d"],
        ["a", "c", "b", "d"],
      ],
      ["a", "b", "c", "d"],
    ),
  },
  {
    display: "L = [⟨a, b, c, e⟩², ⟨a, c, b, e⟩, ⟨a, b, d, e⟩²]",
    activities: ["a", "b", "c", "d", "e"],
    matrix: buildFootprint(
      [
        ["a", "b", "c", "e"],
        ["a", "b", "c", "e"],
        ["a", "c", "b", "e"],
        ["a", "b", "d", "e"],
        ["a", "b", "d", "e"],
      ],
      ["a", "b", "c", "d", "e"],
    ),
  },
];

// ---------------- A8 Eventlog generators ----------------

export interface EventlogTemplate {
  cases: string[];
  events: Array<{ caseId: string; activity: string; timestamp: string }>;
  expectedTraces: Record<string, string[]>;
  pflichtfelder: string[];
}

export const EVENTLOGS: EventlogTemplate[] = [
  {
    cases: ["Order6350", "Order6351", "Order6352"],
    pflichtfelder: ["Case ID", "Activity", "Timestamp"],
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
    expectedTraces: {
      Order6350: ["place order", "send invoice", "pay", "prepare delivery", "make delivery", "confirm payment"],
      Order6351: ["place order", "send invoice", "cancel order"],
      Order6352: ["place order", "send invoice", "pay", "prepare delivery", "confirm payment", "make delivery"],
    },
  },
  {
    cases: ["C-001", "C-002", "C-003"],
    pflichtfelder: ["Case ID", "Activity", "Timestamp"],
    events: [
      { caseId: "C-001", activity: "a", timestamp: "10:00" },
      { caseId: "C-001", activity: "b", timestamp: "10:05" },
      { caseId: "C-001", activity: "c", timestamp: "10:10" },
      { caseId: "C-001", activity: "e", timestamp: "10:15" },
      { caseId: "C-002", activity: "a", timestamp: "10:01" },
      { caseId: "C-002", activity: "c", timestamp: "10:04" },
      { caseId: "C-002", activity: "b", timestamp: "10:09" },
      { caseId: "C-002", activity: "e", timestamp: "10:14" },
      { caseId: "C-003", activity: "a", timestamp: "10:02" },
      { caseId: "C-003", activity: "b", timestamp: "10:06" },
      { caseId: "C-003", activity: "d", timestamp: "10:11" },
      { caseId: "C-003", activity: "e", timestamp: "10:16" },
    ],
    expectedTraces: {
      "C-001": ["a", "b", "c", "e"],
      "C-002": ["a", "c", "b", "e"],
      "C-003": ["a", "b", "d", "e"],
    },
  },
];
