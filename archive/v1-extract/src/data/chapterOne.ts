export interface ChapterOneItem {
  question: string;
  answer: string;
  why: string;
}

export interface ChapterOneGroup {
  title: string;
  color: string;
  items: ChapterOneItem[];
}

export const chapterOneGroups: ChapterOneGroup[] = [
  {
    title: "Definitionen",
    color: "emerald",
    items: [
      { question: "Was ist ein Prozess?", answer: "Ein Prozess ist ein wiederholbarer Ablauf aus logisch zusammenhängenden Aktivitäten.", why: "Grundbegriff für das ganze Modul." },
      { question: "Was ist ein Geschäftsprozess?", answer: "Ein Geschäftsprozess ist ein Prozess, der Input in einen wertvollen Output für interne oder externe Kunden umwandelt.", why: "Klassische Aufgabe-1-Definition." },
      { question: "Was unterscheidet einen Algorithmus von einem Prozess?", answer: "Ein Algorithmus ist exakt formal festgelegt; ein Prozess ist ein realer organisatorischer Ablauf mit Rollen, Varianten und Ausnahmen.", why: "Hilft bei Abgrenzungsfragen." },
      { question: "Was unterscheidet einen Prozess von einem Geschäftsprozess?", answer: "Ein Geschäftsprozess hat Unternehmensbezug und erzeugt Wertschöpfung oder Kundennutzen.", why: "Nicht jeder Ablauf ist direkt geschäftsrelevant." },
      { question: "Warum besitzen Geschäftsprozesse Input und Output?", answer: "Weil sie etwas aufnehmen, bearbeiten und ein Ergebnis erzeugen.", why: "Input/Output ist die Grundlogik jeder Prozessbeschreibung." },
      { question: "Was bedeutet Wertschöpfung bei Geschäftsprozessen?", answer: "Der Prozess schafft einen zusätzlichen Nutzen oder Wert gegenüber dem Ausgangszustand.", why: "Verbindet Kapitel 1 mit Wertschöpfung/Organisation." },
      { question: "Warum sind Geschäftsprozesse wiederholbar?", answer: "Weil ähnliche Fälle regelmäßig nach ähnlichen Regeln bearbeitet werden.", why: "Abgrenzung zum Projekt." },
      { question: "Warum gehören Geschäftsprozesse zur Ablauforganisation?", answer: "Weil sie die zeitlich-logische Reihenfolge von Aufgaben beschreiben.", why: "Aufbauorganisation = wer; Ablauforganisation = wie und wann." },
      { question: "Was kann ein Input eines Geschäftsprozesses sein?", answer: "Auftrag, Anfrage, Material, Information, Dokument, Zahlung, Störung oder Bedarf.", why: "Hilft beim Modellieren aus Text." },
      { question: "Was kann ein Output eines Geschäftsprozesses sein?", answer: "Produkt, Dienstleistung, Entscheidung, Rechnung, Lieferung, Information oder erledigter Fall.", why: "Output zeigt, woran man den Prozessabschluss erkennt." },
    ],
  },
  {
    title: "Struktur von Geschäftsprozessen",
    color: "sky",
    items: [
      { question: "Welche Bestandteile besitzt ein Geschäftsprozess?", answer: "Auslöser, Input, Aktivitäten, Rollen, Regeln, IT-Systeme, Entscheidungen, Output und Kennzahlen.", why: "Das ist deine Checkliste für Prozessbeschreibungen." },
      { question: "Was ist ein Auslöser eines Prozesses?", answer: "Ein Ereignis, das den Prozess startet.", why: "In BPMN wird daraus oft ein Startereignis." },
      { question: "Was sind Aktivitäten in einem Prozess?", answer: "Aktivitäten sind Arbeitsschritte, die Input bearbeiten und den Prozess voranbringen.", why: "In BPMN werden sie meist als Tasks modelliert." },
      { question: "Welche Rolle spielen Regeln in Prozessen?", answer: "Regeln bestimmen Entscheidungen, Reihenfolgen, Zuständigkeiten und erlaubte Varianten.", why: "Ohne Regeln wäre der Prozess nicht steuerbar." },
      { question: "Warum gehen Geschäftsprozesse oft über Abteilungsgrenzen hinweg?", answer: "Weil Kundennutzen meist mehrere Bereiche verbindet, z. B. Vertrieb, Lager und Buchhaltung.", why: "Prozesse sind end-to-end, nicht nur Abteilungssicht." },
      { question: "Können Geschäftsprozesse andere Prozesse enthalten?", answer: "Ja, Prozesse können Teilprozesse enthalten.", why: "Das erklärt Prozesshierarchien." },
      { question: "Was bedeutet gekapselter Geschäftsprozess?", answer: "Ein gekapselter Prozess hat eine klare Schnittstelle: Man kennt Input und Output, ohne alle inneren Details sehen zu müssen.", why: "Hilft beim Denken in Teilprozessen und Prozessarchitektur." },
      { question: "Welche Rolle spielen IT-Systeme in Geschäftsprozessen?", answer: "Sie speichern Daten, automatisieren Schritte, leiten Aufgaben weiter und erzeugen Eventlogs.", why: "Verbindung zu Workflow, GPMS und Process Mining." },
    ],
  },
  {
    title: "Geschäftsprozess vs. Projekt",
    color: "rose",
    items: [
      { question: "Unterschied zwischen Geschäftsprozess und Projekt?", answer: "Geschäftsprozess ist wiederholbar und dauerhaft; Projekt ist einmalig, temporär und zielbezogen.", why: "Sehr beliebte Definitionsfalle." },
      { question: "Warum ist ein Projekt temporär?", answer: "Weil es einen definierten Start, ein definiertes Ende und ein einmaliges Ergebnis hat.", why: "Projektlogik ist nicht Prozessroutine." },
      { question: "Warum ist ein Geschäftsprozess dauerhaft?", answer: "Weil er regelmäßig für viele Fälle ausgeführt wird.", why: "Er ist Teil der laufenden Organisation." },
      { question: "Nenne 3 typische Geschäftsprozesse.", answer: "Order-to-Cash, Procure-to-Pay, Reklamationsbearbeitung.", why: "Beispiele machen Definitionen klausurtauglich." },
      { question: "Nenne 3 typische Projekte.", answer: "ERP-Einführung, Bau einer neuen Filiale, Entwicklung einer neuen App.", why: "Abgrenzung durch Einmaligkeit." },
    ],
  },
  {
    title: "Typische Geschäftsprozesse O2C/P2P",
    color: "orange",
    items: [
      { question: "Was bedeutet Order-to-Cash?", answer: "Order-to-Cash ist der Prozess von Kundenauftrag bis Zahlungseingang.", why: "Typischer Kernprozess." },
      { question: "Was bedeutet Procure-to-Pay?", answer: "Procure-to-Pay ist der Prozess von Beschaffungsbedarf bis Zahlung an den Lieferanten.", why: "Typischer Beschaffungsprozess." },
      { question: "Welche Schritte gehören typischerweise zum O2C-Prozess?", answer: "Angebot/Bestellung, Auftragsprüfung, Lieferung, Rechnung, Zahlungseingang, ggf. Mahnung.", why: "Hilft beim End-to-End-Verständnis." },
      { question: "Welche Schritte gehören typischerweise zum P2P-Prozess?", answer: "Bedarf, Bestellung, Wareneingang, Rechnungsprüfung, Zahlung.", why: "Wichtig für Beschaffungsbeispiele." },
      { question: "Warum greifen O2C und P2P ineinander?", answer: "Kundenaufträge können Beschaffung auslösen; Beschaffung sichert Lieferfähigkeit.", why: "Prozesse sind im Unternehmen vernetzt." },
      { question: "Aus welcher Sicht betrachtet man O2C?", answer: "Aus Sicht des Verkaufs an Kunden.", why: "Startpunkt ist die Kundenbestellung." },
      { question: "Aus welcher Sicht betrachtet man P2P?", answer: "Aus Sicht des Einkaufs beim Lieferanten.", why: "Startpunkt ist der Beschaffungsbedarf." },
    ],
  },
  {
    title: "Geschäftsprozessmodellierung",
    color: "cyan",
    items: [
      { question: "Warum modelliert man Geschäftsprozesse grafisch?", answer: "Damit Abläufe, Rollen, Entscheidungen und Schwachstellen sichtbar werden.", why: "Modelle reduzieren Komplexität." },
      { question: "Was ist BPMN?", answer: "BPMN ist eine standardisierte grafische Notation zur Modellierung von Geschäftsprozessen.", why: "Grundlage für spätere Modellierungsaufgaben." },
      { question: "Welche Vorteile hat Prozessmodellierung?", answer: "Transparenz, Kommunikation, Analyse, Standardisierung, Automatisierung und Dokumentation.", why: "Begründet, warum Modellierung überhaupt wichtig ist." },
      { question: "Was ist ein Geschäftsprozessmodell?", answer: "Eine vereinfachte Darstellung eines Geschäftsprozesses.", why: "Modell ist nicht Wirklichkeit, sondern Abbild." },
      { question: "Was beschreibt ein Prozessmodell?", answer: "Es beschreibt Aktivitäten, Reihenfolge, Rollen, Entscheidungen, Daten und Schnittstellen.", why: "Hilft bei BPMN und ARIS." },
    ],
  },
  {
    title: "ARIS",
    color: "lime",
    items: [
      { question: "Wofür steht ARIS?", answer: "Architektur integrierter Informationssysteme.", why: "Name kennen und einordnen." },
      { question: "Welche 5 Sichten besitzt ARIS?", answer: "Funktionssicht, Organisationssicht, Datensicht, Leistungssicht und Steuerungssicht.", why: "Extrem klausurrelevant." },
      { question: "Welche Frage beantwortet die Funktionssicht?", answer: "Was wird getan?", why: "Funktionen/Aktivitäten." },
      { question: "Welche Frage beantwortet die Organisationssicht?", answer: "Wer führt es aus?", why: "Rollen, Stellen, Abteilungen." },
      { question: "Welche Frage beantwortet die Datensicht?", answer: "Welche Daten werden genutzt oder erzeugt?", why: "Informationen und Datenobjekte." },
      { question: "Welche Frage beantwortet die Leistungssicht?", answer: "Welche Leistung oder welches Ergebnis entsteht?", why: "Output/Produkt/Dienstleistung." },
      { question: "Welche Frage beantwortet die Steuerungssicht?", answer: "Wie hängen Funktionen, Ereignisse, Rollen, Daten und Leistungen im Ablauf zusammen?", why: "Sie verbindet die anderen Sichten." },
      { question: "Beispiel für die Funktionssicht?", answer: "Bestellung prüfen.", why: "Tätigkeit." },
      { question: "Beispiel für die Organisationssicht?", answer: "Vertrieb oder Sachbearbeiterin.", why: "Ausführende Einheit." },
      { question: "Beispiel für die Datensicht?", answer: "Bestelldaten oder Kundendaten.", why: "Verwendete Information." },
      { question: "Beispiel für die Leistungssicht?", answer: "Gelieferte Ware oder erstellte Rechnung.", why: "Ergebnis." },
      { question: "Beispiel für die Steuerungssicht?", answer: "BPMN-/EPK-Ablauf mit Reihenfolge und Regeln.", why: "Gesamtablauf." },
      { question: "Welche Sicht beschreibt Reihenfolgen und Regeln?", answer: "Steuerungssicht.", why: "Sie modelliert den Ablauf." },
      { question: "Welche Sicht beschreibt Rollen und Personen?", answer: "Organisationssicht.", why: "Wer-Frage." },
      { question: "Welche Sicht beschreibt Input und Output?", answer: "Datensicht beschreibt Inputdaten; Leistungssicht beschreibt Output/Leistung.", why: "Beide sauber unterscheiden." },
    ],
  },
  {
    title: "Funktionsbaum nach Scheer",
    color: "violet",
    items: [
      { question: "Was ist ein Funktionsbaum?", answer: "Eine hierarchische Zerlegung von Funktionen in Teilfunktionen.", why: "Zeigt Struktur, nicht zeitliche Reihenfolge." },
      { question: "Warum zerlegt man Funktionen hierarchisch?", answer: "Damit komplexe Aufgaben übersichtlich und analysierbar werden.", why: "Vom Groben zum Detail." },
      { question: "Was sind Elementarfunktionen?", answer: "Nicht weiter sinnvoll zerlegte Grundfunktionen.", why: "Sie sind Bausteine für genauere Modelle." },
      { question: "Warum sind Elementarfunktionen wichtig?", answer: "Sie können konkreten Rollen, Daten oder Systemen zugeordnet werden.", why: "Übergang zur Umsetzung." },
      { question: "Welche Gruppierungsmöglichkeiten gibt es im Funktionsbaum?", answer: "Objektorientiert, prozessorientiert und verrichtungsorientiert.", why: "Typische Theoriefrage." },
      { question: "Was bedeutet objektorientierte Gruppierung?", answer: "Funktionen werden nach bearbeiteten Objekten gruppiert.", why: "Beispiel: Kundendaten bearbeiten." },
      { question: "Was bedeutet prozessorientierte Gruppierung?", answer: "Funktionen werden nach Prozessabläufen gruppiert.", why: "Beispiel: Bestellung abwickeln." },
      { question: "Was bedeutet verrichtungsorientierte Gruppierung?", answer: "Funktionen werden nach Tätigkeitsart gruppiert.", why: "Beispiel: prüfen, buchen, freigeben." },
      { question: "Welche Attribute können Funktionen besitzen?", answer: "Name, Beschreibung, Input, Output, Rolle, System, Dauer, Kosten oder Häufigkeit.", why: "Verbindung zu Analyse und Automatisierung." },
    ],
  },
  {
    title: "Geschäftsprozessmanagement",
    color: "emerald",
    items: [
      { question: "Was ist Geschäftsprozessmanagement?", answer: "Die systematische Gestaltung, Steuerung, Ausführung, Überwachung und Verbesserung von Geschäftsprozessen.", why: "Kernbegriff in Aufgabe 1." },
      { question: "Was ist das Ziel von GPM?", answer: "Prozesse effektiver, effizienter, transparenter und kundenorientierter zu machen.", why: "Zielperspektive merken." },
      { question: "Was bedeutet Effizienz?", answer: "Etwas mit möglichst geringem Ressourceneinsatz tun.", why: "Die Dinge richtig tun." },
      { question: "Was bedeutet Effektivität?", answer: "Die richtigen Ziele erreichen.", why: "Die richtigen Dinge tun." },
      { question: "Was versteht man unter Koordination?", answer: "Abstimmung von Aktivitäten, Rollen, Informationen und Zeitpunkten.", why: "Prozesse verbinden viele Beteiligte." },
      { question: "Was ist ein Geschäftsprozesstyp?", answer: "Die allgemeine Prozessbeschreibung, z. B. Bestellprozess.", why: "Typ vs. Instanz." },
      { question: "Was ist eine Prozessinstanz?", answer: "Ein konkreter Durchlauf eines Prozesstyps.", why: "Bestellung #4711." },
      { question: "Unterschied zwischen Prozessmodell und Prozessinstanz?", answer: "Modell beschreibt den Ablauf; Instanz ist ein realer Durchlauf.", why: "Wichtig für Eventlogs." },
      { question: "Was bedeutet inkrementelle Verbesserung?", answer: "Schrittweise Optimierung bestehender Prozesse.", why: "Gegensatz zum radikalen Reengineering." },
      { question: "Unterschied zwischen inkrementeller Verbesserung und Reengineering?", answer: "Inkrementell verbessert schrittweise; Reengineering gestaltet radikal neu.", why: "Typische Abgrenzung." },
      { question: "Was ist Geschäftsprozess-Reengineering?", answer: "Grundlegende Neugestaltung eines Geschäftsprozesses.", why: "Nicht nur kleine Optimierung." },
    ],
  },
  {
    title: "Rollen im GPM",
    color: "slate",
    items: [
      { question: "Welche Aufgaben hat die Geschäftsführung im GPM?", answer: "Strategische Ziele setzen, Prioritäten bestimmen und Ressourcen bereitstellen.", why: "Strategische Verantwortung." },
      { question: "Welche Aufgaben hat der Prozessverantwortliche?", answer: "Prozessleistung, Ziele, Verbesserungen und Einhaltung verantworten.", why: "Operative Prozessverantwortung." },
      { question: "Welche Aufgaben haben Prozessteilnehmer?", answer: "Sie führen Prozessaktivitäten aus und liefern Praxiswissen.", why: "Sie kennen den Ist-Prozess." },
      { question: "Welche Aufgaben hat der Systemanalytiker?", answer: "Anforderungen analysieren und Prozess-/IT-Lösungen fachlich strukturieren.", why: "Brücke zwischen Fachbereich und IT." },
      { question: "Welche Aufgaben hat der Anwendungsentwickler?", answer: "Technische Umsetzung von Systemen, Workflows und Anwendungen.", why: "Setzt Vorgaben technisch um." },
      { question: "Wer setzt Prozessvorgaben technisch um?", answer: "Anwendungsentwickler bzw. IT-Team.", why: "Rollenfrage." },
      { question: "Wer analysiert Prozesse?", answer: "Systemanalytiker, Prozessverantwortliche und Fachbereiche gemeinsam.", why: "Analyse ist fachlich und technisch." },
      { question: "Wer trägt strategische Verantwortung?", answer: "Geschäftsführung bzw. Top-Management.", why: "Prioritäten und Ziele kommen von oben." },
    ],
  },
  {
    title: "GPM-Lebenszyklus",
    color: "sky",
    items: [
      { question: "Nenne die 6 Phasen des GPM-Lebenszyklus in richtiger Reihenfolge.", answer: "Prozessidentifikation, Prozesserhebung, Prozessanalyse, Prozessverbesserung, Prozesseinführung, Prozessüberwachung.", why: "Sehr wichtig für Aufgabe 2." },
      { question: "Was passiert bei der Prozessidentifikation?", answer: "Relevante Prozesse werden erkannt, abgegrenzt und priorisiert.", why: "Start des Zyklus." },
      { question: "Was passiert bei der Prozesserhebung?", answer: "Der Ist-Prozess wird aufgenommen und dokumentiert.", why: "Erzeugt Ist-Modell." },
      { question: "Was passiert bei der Prozessanalyse?", answer: "Schwachstellen, Ursachen und Potenziale werden untersucht.", why: "Vor Verbesserung verstehen." },
      { question: "Was passiert bei der Prozessverbesserung?", answer: "Ein Soll-Prozess und Maßnahmen werden entwickelt.", why: "Erzeugt Soll-Modell." },
      { question: "Was passiert bei der Prozesseinführung?", answer: "Der Soll-Prozess wird organisatorisch und technisch umgesetzt.", why: "Umsetzung im Alltag." },
      { question: "Was passiert bei der Prozessüberwachung?", answer: "Prozessleistung wird über Kennzahlen gemessen.", why: "Kreislauf startet erneut." },
      { question: "Was ist das Ergebnis der Prozessidentifikation?", answer: "Prozesslandkarte, priorisierte Prozesse oder abgegrenzter Untersuchungsbereich.", why: "Greifbares Ergebnis kennen." },
      { question: "Was ist das Ergebnis der Prozesserhebung?", answer: "Istprozessmodell.", why: "Aktueller Ablauf." },
      { question: "Was ist das Ergebnis der Prozessverbesserung?", answer: "Sollprozessmodell und Maßnahmenplan.", why: "Zielbild." },
      { question: "Warum ist der GPM-Zyklus ein Kreislauf?", answer: "Weil Überwachung neue Schwachstellen zeigt und Verbesserungen erneut anstößt.", why: "Kontinuierliche Verbesserung." },
      { question: "Welche Phase erzeugt ein Sollprozessmodell?", answer: "Prozessverbesserung.", why: "Soll = Zielzustand." },
      { question: "Welche Phase erzeugt ein Istprozessmodell?", answer: "Prozesserhebung.", why: "Ist = aktueller Zustand." },
      { question: "Welche Phase misst Prozessleistung?", answer: "Prozessüberwachung.", why: "Kennzahlenphase." },
      { question: "Welche Phase sucht Schwachstellen?", answer: "Prozessanalyse.", why: "Analyse vor Lösung." },
      { question: "Welche Phase setzt Prozesse organisatorisch/technisch um?", answer: "Prozesseinführung.", why: "Einführung bringt Soll-Prozess in die Praxis." },
      { question: "Welche Phase priorisiert Prozesse?", answer: "Prozessidentifikation.", why: "Auswahl vor Detailarbeit." },
    ],
  },
  {
    title: "Prozessidentifikation",
    color: "orange",
    items: [
      { question: "Was ist das Ziel der Prozessidentifikation?", answer: "Die relevanten Prozesse des Unternehmens erkennen und priorisieren.", why: "Man kann nicht alles gleichzeitig verbessern." },
      { question: "Warum ist Prozessidentifikation wichtig?", answer: "Sie verhindert, dass Ressourcen auf unwichtige Prozesse verschwendet werden.", why: "Priorisierung ist Klausurlogik." },
      { question: "Warum müssen Prozesse regelmäßig überprüft werden?", answer: "Weil Ziele, Kunden, Technik und Probleme sich verändern.", why: "GPM ist dynamisch." },
      { question: "Was ist eine Prozesslandkarte?", answer: "Eine Übersicht der wichtigsten Prozesse eines Unternehmens.", why: "Ergebnis der Identifikation." },
      { question: "Was zeigt eine Prozesslandkarte?", answer: "Management-, Kern- und Supportprozesse sowie deren Zusammenhang.", why: "Überblick statt Detailmodell." },
      { question: "Wie viele Prozesse zeigt eine Prozesslandkarte typischerweise?", answer: "Nur eine überschaubare Auswahl zentraler Prozesse, nicht jede Detailaktivität.", why: "Landkarte bleibt abstrakt." },
      { question: "Was ist ein Referenzmodell?", answer: "Ein allgemeines Mustermodell für typische Prozesse einer Branche oder Domäne.", why: "Startpunkt für eigene Prozessgestaltung." },
      { question: "Warum sind Referenzmodelle wichtig?", answer: "Sie liefern Best Practices und sparen Modellierungsaufwand.", why: "Nicht alles neu erfinden." },
      { question: "Nenne Beispiele für Referenzmodelle.", answer: "ITIL, eTOM, APQC.", why: "Beispiele merken." },
      { question: "Was ist ITIL?", answer: "Ein Referenzrahmen für IT-Service-Management.", why: "Wichtiges Beispiel im Kapitel." },
      { question: "Wofür wird ITIL verwendet?", answer: "Zur Gestaltung und Verbesserung von IT-Services und IT-Prozessen.", why: "Verbindung zu IT-Service." },
      { question: "Warum ist ITIL wichtig?", answer: "Es liefert bewährte Prozesse für stabilen IT-Betrieb und Servicequalität.", why: "Referenzmodell-Frage." },
      { question: "Was ist ein IT-Service?", answer: "Eine IT-basierte Leistung, die einen Nutzen für Kunden oder Nutzer stiftet.", why: "Service statt nur Technik." },
      { question: "Was bedeutet ITIL v4?", answer: "Aktuelle ITIL-Version mit Fokus auf Service Value System, Wertströme und agile/digitale Arbeitsweisen.", why: "Aktuelle Einordnung." },
    ],
  },
  {
    title: "Prozesshierarchie und Prozessarchitektur",
    color: "cyan",
    items: [
      { question: "Was ist eine Prozesshierarchie?", answer: "Eine Abstufung von groben Prozessen zu Teilprozessen und Aktivitäten.", why: "Vom Überblick zum Detail." },
      { question: "Was ist eine Prozessarchitektur?", answer: "Die strukturierte Gesamtsicht auf Prozesse und ihre Beziehungen.", why: "Ordnet die Prozesslandschaft." },
      { question: "Welche Abstraktionsebenen gibt es?", answer: "Prozesslandkarte, Wertschöpfungskette, Prozessmodell, Teilprozess, Aktivität.", why: "Ebenen nicht vermischen." },
      { question: "Was zeigt die Prozesslandkarte?", answer: "Die wichtigsten Prozesse im Überblick.", why: "Höchste Ebene." },
      { question: "Was zeigt eine Wertschöpfungskette?", answer: "Wie Aktivitäten gemeinsam Wert erzeugen.", why: "Verbindung zu Porter." },
      { question: "Was zeigt ein Prozessmodell?", answer: "Den konkreten Ablauf eines Prozesses mit Aktivitäten, Rollen und Entscheidungen.", why: "Detailniveau für Analyse/Modellierung." },
    ],
  },
  {
    title: "Prozesse bewerten",
    color: "rose",
    items: [
      { question: "Nach welchen Kriterien bewertet man Prozesse?", answer: "Strategische Wichtigkeit, Verbesserungswürdigkeit und Verbesserungsfähigkeit.", why: "Priorisierung in der Identifikation." },
      { question: "Was bedeutet strategische Wichtigkeit?", answer: "Wie stark der Prozess für Ziele, Kunden und Wettbewerb relevant ist.", why: "Nicht jeder Prozess ist gleich wichtig." },
      { question: "Was bedeutet Verbesserungswürdigkeit?", answer: "Wie groß Problem, Kosten, Fehler oder Potenzial des Prozesses sind.", why: "Wo lohnt sich Verbesserung?" },
      { question: "Was bedeutet Verbesserungsfähigkeit?", answer: "Wie realistisch der Prozess veränderbar ist.", why: "Nicht alles ist kurzfristig machbar." },
      { question: "Nenne Beispiele mangelnder Prozessqualität.", answer: "Lange Durchlaufzeiten, hohe Fehlerquote, Medienbrüche, Doppelarbeit, geringe Transparenz, hohe Kosten.", why: "Gut für Fallbeispiele." },
    ],
  },
];

export const arisSightRows = [
  ["Funktionssicht", "Was wird getan?", "Funktionen/Aktivitäten", "Bestellung prüfen"],
  ["Organisationssicht", "Wer tut es?", "Rollen, Stellen, Abteilungen", "Vertrieb, Lager"],
  ["Datensicht", "Welche Daten?", "Inputdaten/Outputdaten", "Bestelldaten"],
  ["Leistungssicht", "Welche Leistung entsteht?", "Produkte/Dienstleistungen/Ergebnisse", "Gelieferte Ware"],
  ["Steuerungssicht", "Wie läuft es ab?", "Reihenfolge, Regeln, Verknüpfung", "BPMN-/EPK-Ablauf"],
];

export const chapterOneMindmap = [
  ["Kapitel 1", "Definitionen", "Prozess, Geschäftsprozess, Algorithmus, Input/Output"],
  ["Kapitel 1", "Struktur", "Auslöser, Aktivitäten, Regeln, IT-Systeme, Rollen"],
  ["Kapitel 1", "Beispiele", "Order-to-Cash, Procure-to-Pay"],
  ["Kapitel 1", "Modellierung", "BPMN, Geschäftsprozessmodell, ARIS"],
  ["Kapitel 1", "ARIS", "Funktion, Organisation, Daten, Leistung, Steuerung"],
  ["Kapitel 1", "GPM", "Ziele, Effizienz, Effektivität, Koordination"],
  ["Kapitel 1", "Lebenszyklus", "Identifikation, Erhebung, Analyse, Verbesserung, Einführung, Überwachung"],
  ["Kapitel 1", "Architektur", "Prozesslandkarte, Hierarchie, Referenzmodelle, ITIL"],
];
