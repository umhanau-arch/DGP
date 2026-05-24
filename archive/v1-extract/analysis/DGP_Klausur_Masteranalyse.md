# Digitale Geschäftsprozesse - Klausur-Masteranalyse

Quellenbasis: Kapitel 1 Geschäftsprozesse und deren Management, Geschäftsprozessmodellierung, Wertschöpfung und Organisation, Prozesskostenrechnung, Process Mining, Lernzettel und die beiden Altklausuren Sommer 2025 / Winter 2025-2026.

Legende:
- `[EXTREM]` extrem klausurrelevant
- `[AUSWENDIG]` muss auswendig gelernt werden
- `[VERSTEHEN]` muss verstanden und angewendet werden
- `[FALLE]` typische Falle
- `[OFT VERGESSEN]` oft vergessen

## 0. Klausurmuster aus den Altklausuren

Die Altklausuren bestätigen sehr stark ein 8-Aufgaben-Muster mit 100 Punkten und 90 Minuten.

| Aufgabe | Typischer Inhalt | Punktebereich | Wahrscheinlichkeit |
|---|---:|---:|---|
| A1 | Definitionen: Geschäftsprozess, Geschäftsprozessmodell, GPM, Workflow, Prozesslandkarte | 9 | sehr hoch |
| A2 | GPM-Lebenszyklus, Phasen zuordnen, Fehler im Zyklus erkennen, Redesign-Heuristiken | 8-10 | sehr hoch |
| A3 | Kernprozess, Supportprozess, Managementprozess zuordnen und begründen | 9-10 | sehr hoch |
| A4 | Prozesskostenrechnung: lmi/lmn, Prozesskostensätze, Produktkosten, Kosten pro Auftrag | 16 | extrem hoch |
| A5 | Wertschöpfung/Integration: horizontal/vertikal, Rückwärts/Vorwärts, Integrationsgrad | 12-13 | extrem hoch |
| A6 | Petrinetze: aktivierte Transitionen, Erreichbarkeitsgraph, k-beschränkt, sicher, deadlockfrei, lebendig | 14 | extrem hoch |
| A7 | BPMN 2.0 End-to-End-Prozess mit Kunde/Unternehmen in separaten Pools | 12 | extrem hoch |
| A8 | Process Mining: Eventlog, Traces, Workflownetz, mögliche Traces, Footprint, Alpha-Algorithmus | 18 | extrem hoch |

## 1. Priorisierung nach Klausurwahrscheinlichkeit

### Priorität A - zuerst lernen

1. `[EXTREM] [VERSTEHEN]` Prozesskostenrechnung  
   Rechnen kommt fast sicher. Wichtig: variable Kosten, Fixkostenanteil, Prozesskostensatz, Produktkosten.

2. `[EXTREM] [VERSTEHEN]` Process Mining / Eventlogs / Alpha-Algorithmus  
   Aufgabe 8 hat viel Gewicht. Wichtig: Case ID, Activity, Timestamp, Trace, Varianten, Footprint.

3. `[EXTREM] [VERSTEHEN]` Petrinetze  
   Sehr hohe Punktzahl, aber nur sicher lösbar, wenn man Feuern und Markierungen wirklich versteht.

4. `[EXTREM] [VERSTEHEN]` BPMN-Modellierung  
   Praktische Modellierungsaufgabe: Kunde und Unternehmen getrennt, Nachrichtenflüsse korrekt.

5. `[EXTREM] [AUSWENDIG]` GPM-Lebenszyklus  
   Reihenfolge und Zweck jeder Phase auswendig.

6. `[EXTREM] [VERSTEHEN]` Prozessarten  
   Kernprozess, Supportprozess, Managementprozess nicht nur nennen, sondern begründen.

7. `[EXTREM] [VERSTEHEN]` Wertschöpfung und Integration  
   Integrationsgrad rechnen, Rückwärts-/Vorwärts-/Horizontalintegration unterscheiden.

### Priorität B - danach lernen

- `[AUSWENDIG]` Definitionen aus Kapitel 1
- `[AUSWENDIG]` ARIS und die 5 Sichten
- `[VERSTEHEN]` Funktionsbaum nach Scheer
- `[VERSTEHEN]` Prozessanalyse: Wertbeitragsanalyse, 6M, Satz von Little, kritischer Pfad
- `[AUSWENDIG]` KPI, SMART, Balanced Scorecard
- `[AUSWENDIG]` ISO 9001, PDCA, QMS
- `[VERSTEHEN]` GPMS, Workflow, Camunda, Workflow-Engine
- `[AUSWENDIG]` Digitization, Digitalization, digitale Transformation, Industrie 4.0

### Priorität C - wenn Zeit bleibt

- Swimlane-Diagramme
- EPK/eEPK
- ITIL, eTOM, APQC
- Sourcing, Mass Customization
- Python/Data Analysis im GPM
- Details zu Smart Product, Digital Twin, dezentraler Steuerung

## 2. Vollständige Liste klausurrelevanter Konzepte

### Kapitel 1: Geschäftsprozesse und deren Management

#### Definitionen und Grundlagen

- `[EXTREM] [AUSWENDIG]` Prozess
- `[EXTREM] [AUSWENDIG]` Algorithmus vs. Prozess
- `[EXTREM] [AUSWENDIG]` Geschäftsprozess
- `[EXTREM] [VERSTEHEN]` Prozess vs. Geschäftsprozess
- `[EXTREM] [VERSTEHEN]` Input und Output
- `[EXTREM] [VERSTEHEN]` Wertschöpfung
- `[EXTREM] [AUSWENDIG]` Geschäftsprozess vs. Projekt
- `[VERSTEHEN]` Ablauforganisation
- `[VERSTEHEN]` Wiederholbarkeit von Geschäftsprozessen
- `[VERSTEHEN]` Auslöser, Aktivitäten, Regeln, IT-Systeme
- `[OFT VERGESSEN]` Geschäftsprozesse können gekapselt sein, andere Prozesse enthalten oder anstoßen
- `[OFT VERGESSEN]` Geschäftsprozesse gehen oft über Abteilungs- und Betriebsgrenzen hinweg

#### Typische Geschäftsprozesse

- `[AUSWENDIG]` Order-to-Cash / OTC / O2C
- `[AUSWENDIG]` Procure-to-Pay / P2P
- `[VERSTEHEN]` O2C aus Kundensicht/Vertriebssicht
- `[VERSTEHEN]` P2P aus Einkauf-/Lieferantensicht
- `[VERSTEHEN]` O2C und P2P greifen ineinander

#### Modellierung und ARIS

- `[EXTREM] [AUSWENDIG]` Geschäftsprozessmodell
- `[EXTREM] [VERSTEHEN]` Prozessmodellierung
- `[EXTREM] [AUSWENDIG]` ARIS = Architektur integrierter Informationssysteme
- `[EXTREM] [AUSWENDIG]` Funktionssicht: Was wird getan?
- `[EXTREM] [AUSWENDIG]` Organisationssicht: Wer tut es?
- `[EXTREM] [AUSWENDIG]` Datensicht: Welche Daten?
- `[EXTREM] [AUSWENDIG]` Leistungssicht: Welche Leistung/Output?
- `[EXTREM] [AUSWENDIG]` Steuerungssicht: Wie läuft es ab?
- `[FALLE]` Steuerungssicht beschreibt Reihenfolge und Regeln; Organisationssicht beschreibt Rollen/Personen
- `[FALLE]` Datensicht beschreibt Daten, Leistungssicht beschreibt Leistung/Output

#### Funktionsbaum nach Scheer

- `[AUSWENDIG]` Funktionsbaum
- `[VERSTEHEN]` hierarchische Zerlegung
- `[AUSWENDIG]` Elementarfunktion
- `[AUSWENDIG]` objektorientierte Gruppierung
- `[AUSWENDIG]` prozessorientierte Gruppierung
- `[AUSWENDIG]` verrichtungsorientierte Gruppierung
- `[OFT VERGESSEN]` Funktionsbaum zeigt keine zeitliche Reihenfolge

#### Geschäftsprozessmanagement

- `[EXTREM] [AUSWENDIG]` Geschäftsprozessmanagement
- `[EXTREM] [AUSWENDIG]` Effizienz
- `[EXTREM] [AUSWENDIG]` Effektivität
- `[VERSTEHEN]` Koordination
- `[AUSWENDIG]` Geschäftsprozesstyp / Geschäftsprozessmodell
- `[AUSWENDIG]` Geschäftsfall / Prozessinstanz
- `[FALLE]` Prozessmodell ist Typ/Plan; Prozessinstanz ist konkreter Durchlauf
- `[VERSTEHEN]` inkrementelle Verbesserung
- `[VERSTEHEN]` Business Process Reengineering / Reengineering

#### Rollen im GPM

- `[AUSWENDIG]` Geschäftsführung: strategische Verantwortung
- `[AUSWENDIG]` Prozessverantwortlicher / Process Owner: Prozessleistung, Ziele, Verbesserung
- `[AUSWENDIG]` Prozessteilnehmer: Aktivitäten ausführen, Praxiswissen
- `[AUSWENDIG]` Systemanalytiker: Anforderungen und Prozesse analysieren
- `[AUSWENDIG]` Anwendungsentwickler: technische Umsetzung

#### GPM-Lebenszyklus

- `[EXTREM] [AUSWENDIG]` Prozessidentifikation
- `[EXTREM] [AUSWENDIG]` Prozesserhebung
- `[EXTREM] [AUSWENDIG]` Prozessanalyse
- `[EXTREM] [AUSWENDIG]` Prozessverbesserung
- `[EXTREM] [AUSWENDIG]` Prozesseinführung
- `[EXTREM] [AUSWENDIG]` Prozessüberwachung
- `[FALLE]` Erhebung = Ist-Prozess aufnehmen; Analyse = Schwachstellen suchen
- `[FALLE]` Verbesserung = Soll-Prozess entwickeln; Einführung = Soll-Prozess umsetzen
- `[OFT VERGESSEN]` Überwachung macht den Zyklus zum Kreislauf

#### Prozessidentifikation, Architektur und Bewertung

- `[EXTREM] [AUSWENDIG]` Prozesslandkarte
- `[AUSWENDIG]` Referenzmodell
- `[AUSWENDIG]` ITIL
- `[AUSWENDIG]` IT-Service
- `[VERSTEHEN]` Prozesshierarchie
- `[VERSTEHEN]` Prozessarchitektur
- `[EXTREM] [AUSWENDIG]` Kernprozess
- `[EXTREM] [AUSWENDIG]` Supportprozess / unterstützender Prozess
- `[EXTREM] [AUSWENDIG]` Managementprozess
- `[AUSWENDIG]` strategische Wichtigkeit
- `[AUSWENDIG]` Verbesserungswürdigkeit
- `[AUSWENDIG]` Verbesserungsfähigkeit
- `[FALLE]` Marketing oder IT nicht automatisch immer Support; Kontext zählt

#### Prozessgestaltung und Analyse

- `[VERSTEHEN]` Prozesserhebung über Interviews, Beobachtung, Dokumente, Workshops, Logs
- `[VERSTEHEN]` Wertbeitragsanalyse
- `[AUSWENDIG]` 6M / Ursache-Wirkungs-Diagramm: Mensch, Maschine, Material, Methode, Mitwelt/Milieu, Messung
- `[VERSTEHEN]` Satz von Little
- `[VERSTEHEN]` kritischer Pfad
- `[VERSTEHEN]` Redesign-Heuristiken: eliminieren, parallelisieren, automatisieren, Reihenfolge ändern, Ressourcen ändern

#### Prozessausführung, KPIs, Qualität, Digitalisierung

- `[AUSWENDIG]` GPMS
- `[AUSWENDIG]` Workflow
- `[VERSTEHEN]` Workflow-Engine
- `[AUSWENDIG]` Camunda
- `[EXTREM] [AUSWENDIG]` KPI
- `[EXTREM] [AUSWENDIG]` SMART
- `[AUSWENDIG]` Balanced Scorecard
- `[AUSWENDIG]` ISO 9001
- `[AUSWENDIG]` QMS
- `[AUSWENDIG]` PDCA
- `[AUSWENDIG]` Digitization
- `[AUSWENDIG]` Digitalization
- `[AUSWENDIG]` digitale Transformation
- `[AUSWENDIG]` Industrie 4.0
- `[AUSWENDIG]` Smart Factory
- `[AUSWENDIG]` IoT
- `[AUSWENDIG]` Digital Twin
- `[VERSTEHEN]` dezentrale Steuerung
- `[VERSTEHEN]` Smart Product
- `[OFT VERGESSEN]` Digitalisierung optimiert Prozesse, digitale Transformation verändert Geschäftsmodell/Wertschöpfung

### Kapitel Geschäftsprozessmodellierung

- `[AUSWENDIG]` Modell und Wirklichkeit
- `[VERSTEHEN]` Modellattribute
- `[VERSTEHEN]` Modellierungsansätze: Skriptsprachen, Diagrammsprachen, datenorientiert, kontrollflussorientiert, objektorientiert, hybrid
- `[VERSTEHEN]` Swimlane-Diagramm
- `[FALLE]` Swimlane zeigt Verantwortlichkeiten, aber ist nicht so formal wie Petrinetz
- `[EXTREM] [AUSWENDIG]` Petrinetz
- `[EXTREM] [AUSWENDIG]` Stelle / Place
- `[EXTREM] [AUSWENDIG]` Transition
- `[EXTREM] [AUSWENDIG]` Token
- `[EXTREM] [AUSWENDIG]` Markierung
- `[EXTREM] [VERSTEHEN]` Aktivierung
- `[EXTREM] [VERSTEHEN]` Feuern
- `[VERSTEHEN]` atomar feuern
- `[VERSTEHEN]` parallele Transitionen
- `[VERSTEHEN]` Konflikte
- `[VERSTEHEN]` Zustandsexplosion
- `[EXTREM] [VERSTEHEN]` Erreichbarkeitsgraph
- `[EXTREM] [VERSTEHEN]` k-Beschränktheit
- `[EXTREM] [VERSTEHEN]` Sicherheit = 1-Beschränktheit
- `[EXTREM] [VERSTEHEN]` Deadlock
- `[EXTREM] [VERSTEHEN]` Deadlockfreiheit
- `[EXTREM] [VERSTEHEN]` Lebendigkeit
- `[EXTREM] [AUSWENDIG]` Workflownetz
- `[AUSWENDIG]` EPK und eEPK
- `[AUSWENDIG]` Ereignis, Funktion, Konnektor
- `[AUSWENDIG]` EPK beginnt und endet mit Ereignis
- `[EXTREM] [AUSWENDIG]` BPMN 2.0
- `[EXTREM] [AUSWENDIG]` Events, Tasks, Gateways, Pools, Lanes
- `[EXTREM] [AUSWENDIG]` Sequenzfluss vs. Nachrichtenfluss
- `[EXTREM] [VERSTEHEN]` XOR, AND, OR
- `[VERSTEHEN]` Tokenkonzept in BPMN
- `[VERSTEHEN]` Workflow-Engine macht BPMN-Modelle ausführbar
- `[FALLE]` Sequenzfluss nie zwischen zwei Pools
- `[FALLE]` Gateway-Split braucht saubere Zusammenführung oder sauberes Ende

### Kapitel Wertschöpfung und Organisation

- `[EXTREM] [AUSWENDIG]` Wertschöpfung
- `[AUSWENDIG]` Leistung
- `[AUSWENDIG]` Vorleistung
- `[VERSTEHEN]` Wertschöpfungsprozess
- `[AUSWENDIG]` Wertschöpfungskette nach Porter
- `[AUSWENDIG]` Primäraktivitäten
- `[AUSWENDIG]` unterstützende Aktivitäten
- `[AUSWENDIG]` Gewinnspanne / Marge
- `[AUSWENDIG]` EBIT, EBITDA, Nettogewinn, ROI, Bruttomarge
- `[VERSTEHEN]` Kernprozess vs. Wertschöpfungsprozess
- `[VERSTEHEN]` Wertschöpfungsketten von Branchen/Produkten
- `[VERSTEHEN]` IT in der Wertschöpfungskette
- `[VERSTEHEN]` digitale Wertschöpfung
- `[VERSTEHEN]` Tesla-Beispiel: Software, Batterie, Daten, Direktvertrieb, After-Sales
- `[EXTREM] [AUSWENDIG]` vertikale Integration
- `[EXTREM] [AUSWENDIG]` Integrationsgrad
- `[AUSWENDIG]` Fertigungstiefe
- `[EXTREM] [AUSWENDIG]` Rückwärtsintegration / Backward Integration
- `[EXTREM] [AUSWENDIG]` Vorwärtsintegration / Forward Integration
- `[EXTREM] [AUSWENDIG]` horizontale Integration
- `[VERSTEHEN]` Make-or-Buy
- `[VERSTEHEN]` Sourcing
- `[VERSTEHEN]` Mass Customization
- `[VERSTEHEN]` Vor- und Nachteile vertikaler Integration

### Kapitel Prozesskostenrechnung

- `[EXTREM] [VERSTEHEN]` Warum Prozesskostenrechnung?
- `[AUSWENDIG]` Kosten
- `[AUSWENDIG]` Leistungen
- `[AUSWENDIG]` Betriebsgewinn / Betriebsverlust
- `[AUSWENDIG]` Kostenarten, Kostenstellen, Kostenträger
- `[AUSWENDIG]` Einzelkosten
- `[AUSWENDIG]` Gemeinkosten
- `[AUSWENDIG]` fixe Kosten
- `[AUSWENDIG]` variable Kosten
- `[AUSWENDIG]` Gesamtkosten
- `[AUSWENDIG]` Stückkosten
- `[AUSWENDIG]` Beschäftigungsgrad
- `[VERSTEHEN]` technische und wirtschaftliche Kapazität
- `[AUSWENDIG]` Vollkostenrechnung
- `[AUSWENDIG]` Teilkostenrechnung / Deckungsbeitragsrechnung
- `[VERSTEHEN]` Betriebsabrechnungsbogen
- `[VERSTEHEN]` Zuschlagskalkulation
- `[EXTREM] [AUSWENDIG]` leistungsmengeninduzierte Prozesse
- `[EXTREM] [AUSWENDIG]` leistungsmengenneutrale Prozesse
- `[EXTREM] [VERSTEHEN]` Prozesskostensatz
- `[VERSTEHEN]` Umlageverfahren
- `[VERSTEHEN]` durchschnittliche Prozesskosten
- `[VERSTEHEN]` Komplexitätseffekt und Degressionseffekt
- `[FALLE]` Gemeinkosten können fix oder variabel sein
- `[FALLE]` variable Kosten sind nicht automatisch Einzelkosten

### Kapitel Process Mining

- `[EXTREM] [AUSWENDIG]` Process Mining
- `[AUSWENDIG]` Internet of Events
- `[VERSTEHEN]` Data Science + Process Science
- `[EXTREM] [AUSWENDIG]` Event
- `[EXTREM] [AUSWENDIG]` Eventlog
- `[EXTREM] [AUSWENDIG]` Case
- `[EXTREM] [AUSWENDIG]` Case ID
- `[EXTREM] [AUSWENDIG]` Activity
- `[EXTREM] [AUSWENDIG]` Timestamp
- `[AUSWENDIG]` Resource
- `[EXTREM] [AUSWENDIG]` Trace
- `[EXTREM] [AUSWENDIG]` Variante
- `[AUSWENDIG]` XES
- `[AUSWENDIG]` Play-Out
- `[AUSWENDIG]` Play-In
- `[AUSWENDIG]` Replay
- `[AUSWENDIG]` Process Discovery
- `[AUSWENDIG]` Conformance Checking
- `[AUSWENDIG]` Performance Diagnostics
- `[VERSTEHEN]` Bottlenecks
- `[VERSTEHEN]` Compliance
- `[EXTREM] [AUSWENDIG]` Petrinetz vs. Workflownetz
- `[EXTREM] [VERSTEHEN]` Alpha-Algorithmus
- `[EXTREM] [AUSWENDIG]` direkte Folge `a > b`
- `[EXTREM] [AUSWENDIG]` Kausalität `a -> b`
- `[EXTREM] [AUSWENDIG]` Parallelität `a || b`
- `[EXTREM] [AUSWENDIG]` keine Beziehung `a # b`
- `[EXTREM] [VERSTEHEN]` Footprint-Matrix
- `[VERSTEHEN]` mögliche und komplette Traces

## 3. Definitionen - einfach und klausurtauglich

### Top-Definitionen, die auswendig sitzen müssen

| Begriff | Klausurtaugliche Definition |
|---|---|
| Prozess | Wiederholbarer Ablauf aus logisch zusammenhängenden Aktivitäten mit Input und Output. |
| Algorithmus | Exakte, eindeutig definierte Schritt-für-Schritt-Anleitung zur Lösung eines Problems. |
| Geschäftsprozess | Prozess, der in einem Unternehmen Wert für interne oder externe Kunden erzeugt. |
| Geschäftsprozessmodell | Vereinfachte Darstellung eines Geschäftsprozesses, z. B. als BPMN-Modell. |
| Workflow | Geschäftsprozess, der ganz oder teilweise durch ein Informationssystem/GPMS gesteuert wird. |
| GPM | Gesamtheit aller Aufgaben und Maßnahmen, um Geschäftsprozesse effizienter und effektiver zu machen. |
| Prozesslandkarte | Grafische Übersicht der wesentlichen Prozesse eines Unternehmens, meist ca. 15-20 Prozesse. |
| Prozessinstanz | Konkreter Durchlauf eines Prozesstyps, z. B. Bestellung #4711. |
| Kernprozess | Prozess mit direktem Beitrag zum Kundennutzen oder zur Marktleistung. |
| Supportprozess | Interner Unterstützungsprozess, der Kernprozesse ermöglicht. |
| Managementprozess | Steuernder Prozess für Strategie, Planung, Kontrolle und Führung. |
| ARIS | Architektur integrierter Informationssysteme mit fünf Sichten auf Geschäftsprozesse. |
| Funktionssicht | Was wird getan? Funktionen/Aktivitäten. |
| Organisationssicht | Wer tut es? Rollen, Stellen, Abteilungen. |
| Datensicht | Welche Daten werden genutzt oder erzeugt? |
| Leistungssicht | Welche Leistung, welches Produkt oder welcher Output entsteht? |
| Steuerungssicht | Wie läuft es ab? Reihenfolge, Regeln und Verknüpfung der Sichten. |
| Petrinetz | Formales Modell aus Stellen, Transitionen, Kanten und Token. |
| Stelle | Kreis im Petrinetz, speichert Token. |
| Transition | Schaltelement im Petrinetz, verbraucht und erzeugt Token. |
| Markierung | Verteilung aller Token auf die Stellen. |
| Aktivierung | Transition ist aktiviert, wenn alle Input-Stellen genug Token haben. |
| sicher | 1-beschränkt; keine erreichbare Stelle hat mehr als einen Token. |
| deadlockfrei | In jeder erreichbaren Markierung ist mindestens eine Transition aktiviert. |
| lebendig | Jede Transition kann von jeder erreichbaren Markierung aus irgendwann wieder aktiviert werden. |
| BPMN | Standardnotation zur Modellierung von Geschäftsprozessen. |
| Pool | Eigenständiger Prozessbeteiligter, z. B. Kunde oder Unternehmen. |
| Lane | Rolle oder Abteilung innerhalb eines Pools. |
| Sequenzfluss | Ablaufkante innerhalb eines Pools. |
| Nachrichtenfluss | Kommunikation zwischen verschiedenen Pools. |
| Eventlog | Sammlung von Events mit mindestens Case ID, Activity und Timestamp. |
| Event | Einzelnes Ereignis im Log. |
| Case | Konkreter Prozessdurchlauf im Eventlog. |
| Trace | Aktivitätsfolge eines Cases. |
| Variante | Trace-Muster mit Häufigkeit. |
| Play-Out | Aus einem Prozessmodell werden mögliche Abläufe erzeugt. |
| Play-In | Aus einem Eventlog wird ein Prozessmodell entdeckt. |
| Replay | Eventlog wird auf einem Prozessmodell abgespielt. |

## 4. Formeln

| Formel | Bedeutung | Klausurhinweis |
|---|---|---|
| `Wertschöpfung = Leistung - Vorleistung` | Selbst geschaffener Wert | A5 |
| `Integrationsgrad = Wertschöpfung / Gesamtleistung` | Anteil eigener Wertschöpfung an Gesamtleistung | A5 |
| `Fertigungstiefe = Wertschöpfung / Leistung` | Eigenleistungsanteil in der Produktion | Theorie/Transfer |
| `Bruttomarge = Umsatz - Herstellungskosten` | Betrag nach Herstellungskosten | Wertschöpfung |
| `EBITDA = Umsatz - Herstellungskosten - operative Kosten ohne Abschreibungen` | operatives Ergebnis vor Abschreibungen | Wertschöpfung |
| `EBIT = EBITDA - Abschreibungen` | Ergebnis vor Zinsen und Steuern | Wertschöpfung |
| `Nettogewinn = EBIT - Zinsen - Steuern` | Ergebnis nach Zinsen/Steuern | Wertschöpfung |
| `ROI = Nettogewinn / investiertes Kapital` | Kapitalrendite | Wertschöpfung |
| `K = Kf + Kv` | Gesamtkosten = fixe + variable Kosten | PKR |
| `k = K / x` | Stückkosten | PKR |
| `Beschäftigungsgrad = tatsächliche Produktion / technische Maximalproduktion` | Auslastung | PKR |
| `variable Prozesskosten = Gesamtkosten - Fixkosten` | variabler Kostenanteil eines Teilprozesses | A4 |
| `variabler Prozesskostensatz = variable Prozesskosten / Gesamtmenge der Maßgröße` | Kosten pro Kostentreibereinheit | A4 |
| `Produktprozesskosten = genutzte Menge × Prozesskostensatz` | Produktbezogene Prozesskosten | A4 |
| `Fixkostenanteil Produkt = Fixkosten × Produktmenge / Gesamtmenge` | anteilige Fixkosten | A4 |
| `Prozesskosten pro Auftrag = gesamte Prozesskosten Produkt / Anzahl Aufträge` | Durchschnitt pro Auftrag | A4 |
| `Zuschlagssatz = Summe Gemeinkosten / Summe Einzelkosten` | klassische Zuschlagskalkulation | Theorie/Transfer |
| `Deckungsbeitrag = Erlös - variable Kosten` | Beitrag zur Deckung fixer Kosten | KLR |
| `L = λ × W` | Satz von Little: Bestand = Ankunftsrate × Verweildauer | Prozessanalyse |
| `a > b` | b folgt direkt auf a | Alpha |
| `a -> b` | a > b und nicht b > a | Alpha |
| `a || b` | a > b und b > a | Alpha |
| `a # b` | keine direkte Folge zwischen a und b | Alpha |

## 5. Typische Klausurfragen

### A1 Definitionen

- Erklären Sie Geschäftsprozess.
- Erklären Sie Geschäftsprozessmodell.
- Erklären Sie Geschäftsprozessmanagement.
- Erklären Sie Workflow.
- Erklären Sie Prozesslandkarte.
- Erklären Sie Eventlog, Trace, Workflownetz.
- Erklären Sie lmi/lmn, Prozesskostensatz, Gemeinkosten.

### A2 GPM-Zyklus

- Ordnen Sie die Phasen des GPM-Lebenszyklus.
- Welche Phasen fehlen in einem fehlerhaften Fallbeispiel?
- Was passiert in Prozessidentifikation, Erhebung, Analyse, Verbesserung, Einführung, Überwachung?
- Nennen Sie Redesign-Heuristiken und geben Sie Beispiele.

### A3 Prozessarten

- Kernprozess, Supportprozess, Managementprozess definieren.
- Beispiele aus Online-Shop oder Unternehmen zuordnen.
- Zuordnung begründen.

### A4 Prozesskostenrechnung

- lmi/lmn ankreuzen.
- variable Prozesskostensätze berechnen.
- Produktkosten berechnen.
- Prozesskosten pro Auftrag/Bestellung berechnen.

### A5 Integration

- horizontale vs. vertikale Integration erklären.
- Rückwärts- oder Vorwärtsintegration erkennen.
- Integrationsgrad berechnen.
- Vorteil/Nachteil einer Integrationsentscheidung nennen.

### A6 Petrinetze

- aktivierte Transitionen bestimmen.
- Feuerhäufigkeit bestimmen.
- Erreichbarkeitsgraph erstellen.
- k-Beschränktheit, Sicherheit, Deadlockfreiheit, Lebendigkeit begründen.

### A7 BPMN

- Reklamation, Stornierung, Rücksendung oder Bestellung modellieren.
- Kunde und Unternehmen in separaten Pools.
- Nachrichtenzwischenereignisse und Nachrichtenflüsse verwenden.
- XOR bei Entscheidungen, Schleifen bei unvollständigen Angaben.

### A8 Process Mining

- Petrinetz vs. Workflownetz erklären.
- Mindestbestandteile eines Eventlogs nennen.
- Case ID, Activity, Timestamp zuordnen.
- Traces aus Eventlog bilden.
- mögliche Traces im Modell prüfen.
- komplette Traces zählen.
- Footprint-Matrix ergänzen.

## 6. Typische Transferfragen

- Warum ist eine sofortige Softwareeinführung ohne Prozesserhebung und -analyse problematisch?
- Warum kann Marketing je nach Kontext Kernprozess oder Supportprozess sein?
- Warum ist die Online-Shop-Plattform in einem Online-Shop möglicherweise ein Kernprozess?
- Warum kann ein Prozess wertschöpfend sein, obwohl nicht direkt ein Produkt entsteht?
- Warum ist ein Geschäftsprozess nicht dasselbe wie ein Projekt?
- Warum ist BPMN für Automatisierung geeigneter als eine reine Zeichnung?
- Warum kann ein Petrinetz deadlockfrei, aber nicht lebendig sein?
- Warum ist digitale Transformation mehr als Digitalisierung?
- Warum kann vertikale Integration Kosten senken, aber Flexibilität reduzieren?
- Warum verzerrt Zuschlagskalkulation Gemeinkosten bei komplexen Produkten?
- Warum braucht Process Mining Case ID, Activity und Timestamp gleichzeitig?
- Warum erkennt der Alpha-Algorithmus Parallelität, wenn beide direkten Folgen vorkommen?

## 7. Typische Rechenaufgaben

### Prozesskostenrechnung

Schema:

1. Prüfen: Teilprozess lmi oder lmn?
2. `variable Prozesskosten = Gesamtkosten - Fixkosten`
3. `variabler Prozesskostensatz = variable Prozesskosten / Gesamtmenge`
4. Produkt: `Produktmenge × Prozesskostensatz`
5. Fixkosten anteilig verteilen, falls Aufgabe es verlangt
6. Prozesskosten pro Auftrag/Bestellung berechnen

Typische Zahlenform:

- 4 Teilprozesse
- Gesamtkosten, Fixkosten, Maßgröße, Gesamtmenge
- Produkt Alpha/Beta oder Gamma/Delta mit genutzten Maßgrößen

### Integrationsgrad

Schema:

1. interne Werte addieren = Wertschöpfung
2. interne + fremdbezogene Werte addieren = Gesamtleistung
3. `Integrationsgrad = Wertschöpfung / Gesamtleistung`
4. neue Situation berechnen
5. Vorteil/Nachteil begründen

### Wertschöpfung

- `Wertschöpfung = Leistung - Vorleistung`
- Beispiele: Brauerei, Großhändler, Produktwertschöpfung

### Satz von Little

- Gegeben zwei Werte aus `L = λ × W`, dritten berechnen
- Interpretation: Wenn Ankunftsrate oder Durchlaufzeit steigt, steigt Bestand

### Petrinetze

- keine klassische Zahlenrechnung, aber Zustandsrechnung:
  1. Startmarkierung lesen
  2. aktivierte Transitionen prüfen
  3. feuern
  4. neue Markierung notieren
  5. Graph aller erreichbaren Markierungen bauen

### Process Mining

- Traces zählen
- Variantenhäufigkeit zählen
- komplette Traces im Modell zählen
- Footprint aus direkten Folgen ableiten

## 8. Häufige Denkfehler

### GPM

- `[FALLE]` Prozessidentifikation und Prozessanalyse verwechseln
- `[FALLE]` Erhebung und Analyse vermischen
- `[FALLE]` sofort Software einführen, ohne Ist-Prozess zu verstehen
- `[OFT VERGESSEN]` Prozessüberwachung als Phase nennen
- `[FALLE]` Geschäftsprozessmodell mit Prozessinstanz verwechseln

### Prozessarten

- `[FALLE]` IT immer Support nennen
- `[FALLE]` Marketing immer Support nennen
- `[FALLE]` Managementprozess mit Supportprozess verwechseln
- `[FALLE]` ohne Kontext begründen

### Prozesskostenrechnung

- `[FALLE]` Gesamtkosten statt variable Kosten durch Maßgröße teilen
- `[FALLE]` Fixkosten nicht anteilig verteilen
- `[FALLE]` falsche Maßgröße verwenden
- `[FALLE]` Produktmenge und Gesamtmenge verwechseln
- `[FALLE]` Gemeinkosten immer als fix ansehen

### Integration

- `[FALLE]` Rückwärts- und Vorwärtsintegration verwechseln
- `[FALLE]` horizontale Integration mit vertikaler Integration verwechseln
- `[FALLE]` Integrationsgrad falsch herum rechnen
- `[OFT VERGESSEN]` Vorteil und Nachteil in ganzen Sätzen erklären

### Petrinetze

- `[FALLE]` Transition feuern lassen, obwohl nicht alle Input-Stellen Token haben
- `[FALLE]` nur Startmarkierung prüfen statt alle erreichbaren Markierungen
- `[FALLE]` sicher und beschränkt verwechseln
- `[FALLE]` Deadlockfreiheit und Lebendigkeit gleichsetzen

### BPMN

- `[FALLE]` Sequenzfluss zwischen Kunde und Unternehmen
- `[FALLE]` Pools und Lanes verwechseln
- `[FALLE]` Gateway ohne saubere Zusammenführung
- `[FALLE]` Ereignisse wie Tätigkeiten benennen
- `[OFT VERGESSEN]` Schleife bei fehlenden Angaben

### Process Mining

- `[FALLE]` Case und Event verwechseln
- `[FALLE]` Trace nicht nach Timestamp sortieren
- `[FALLE]` Variante und Trace verwechseln
- `[FALLE]` Parallelität als Kausalität lesen
- `[FALLE]` Footprint nur aus einer Richtung ableiten

## 9. Verwechslungsbegriffe

| Begriff A | Begriff B | Unterschied |
|---|---|---|
| Prozess | Algorithmus | Prozess real/organisatorisch, Algorithmus exakt/formal |
| Prozess | Geschäftsprozess | Geschäftsprozess erzeugt Unternehmenswert/Kundennutzen |
| Prozess | Projekt | Prozess wiederholbar, Projekt einmalig/temporär |
| Prozessmodell | Prozessinstanz | Modell ist Plan/Typ, Instanz ist konkreter Durchlauf |
| Erhebung | Analyse | Erhebung nimmt Ist auf, Analyse sucht Probleme/Ursachen |
| Verbesserung | Einführung | Verbesserung entwirft Soll, Einführung setzt um |
| Kernprozess | Supportprozess | Kern direkt Kundennutzen, Support intern unterstützend |
| Managementprozess | Supportprozess | Management steuert, Support ermöglicht |
| Funktionssicht | Steuerungssicht | Funktion = was, Steuerung = wie/Reihenfolge |
| Organisationssicht | Lane | Organisationssicht ist ARIS-Perspektive, Lane ist BPMN-Notation |
| Stelle | Transition | Stelle speichert Token, Transition feuert |
| beschränkt | sicher | sicher = 1-beschränkt |
| deadlockfrei | lebendig | lebendig ist stärker |
| Pool | Lane | Pool = Teilnehmer, Lane = Rolle im Pool |
| Sequenzfluss | Nachrichtenfluss | Sequenz innerhalb Pool, Nachricht zwischen Pools |
| Event | Case | Event = Zeile/Ereignis, Case = Prozessdurchlauf |
| Trace | Variante | Trace = Folge eines Cases, Variante = gleiches Trace-Muster mit Häufigkeit |
| Play-In | Play-Out | Play-In Log -> Modell, Play-Out Modell -> Verhalten |
| Replay | Conformance | Replay ist Technik zum Vergleich Log/Modell |
| vertikal | horizontal | vertikal entlang Lieferkette, horizontal gleiche Marktstufe |
| rückwärts | vorwärts | rückwärts zum Lieferanten, vorwärts zum Kunden |
| Wertschöpfung | Leistung | Wertschöpfung = Leistung minus Vorleistung |
| Digitization | Digitalization | analog zu digital vs. Prozess digital verbessern |
| Digitalization | digitale Transformation | Prozessverbesserung vs. Geschäftsmodellwandel |

## 10. Zusammenhänge zwischen Themen

- Geschäftsprozess ist die Basis. BPMN, Petrinetze, Process Mining und PKR betrachten denselben Gegenstand aus verschiedenen Perspektiven.
- GPM-Lebenszyklus ist die Klammer: identifizieren, erheben, analysieren, verbessern, einführen, überwachen.
- ARIS hilft, Prozesse aus verschiedenen Sichten zu verstehen: Was, wer, Daten, Leistung, wie.
- BPMN ist die praxisnahe Modellierungssprache für End-to-End-Prozesse.
- Petrinetze sind die formale Grundlage für Zustände, Token und Korrektheit.
- Workflownetze verbinden Petrinetze mit ausführbaren Prozessen.
- Process Mining nutzt Eventlogs aus IT-Systemen, um reale Prozessausführung sichtbar zu machen.
- GPMS/Workflow-Engines führen modellierte Prozesse aus; Process Mining überwacht/analysiert die Ausführung.
- Prozesskostenrechnung bewertet Prozesse monetär und macht Gemeinkosten verursachungsgerechter.
- Wertschöpfung/Integration erklärt, welche Prozess- und Wertstufen ein Unternehmen selbst übernimmt.
- KPIs, SMART, BSC, ISO und PDCA machen Prozessqualität messbar und steuerbar.
- Digitalisierung verbessert Prozesse; digitale Transformation verändert Wertschöpfung und Geschäftsmodell.

## 11. Lernstrategie unter Zeitdruck

### Wenn nur sehr wenig Zeit bleibt

1. Prozesskostenrechnung rechnen
2. Petrinetze feuern und Eigenschaften prüfen
3. Process Mining Eventlogs/Footprint üben
4. BPMN-End-to-End-Prozess modellieren
5. GPM-Zyklus auswendig
6. Prozessarten zuordnen
7. Integration rechnen und unterscheiden
8. Definitionen flashcarden

### Auswendig-Liste

- GPM-Zyklus
- ARIS 5 Sichten
- Prozessarten
- Eventlog-Mindestbestandteile
- Alpha-Beziehungen
- BPMN-Flussarten
- Petrinetz-Begriffe
- Integrationsarten
- PKR-Grundbegriffe
- SMART, BSC, PDCA, ISO

### Verständnis-Liste

- Warum Prozesse Wert erzeugen
- Warum GPM ein Kreislauf ist
- Wie man aus Text BPMN baut
- Wie Token wandern
- Wie Eventlogs zu Traces werden
- Warum PKR Gemeinkosten besser verteilt
- Warum Integration strategische Vor- und Nachteile hat

