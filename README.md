# DGP Klausurtrainer · v3

Geführter Lernkurs + **Klausurmodus 1:1 nach den Original-Klausuren
(WS 25/26 + SS 25)** + interaktiver **Petri-Drill** + **Fragenkatalog**
für das Modul **Digitale Geschäftsprozesse**.

## Was ist neu in v3

### 1. Klausurmodus 1:1 nach Original
Der Generator produziert Klausuren mit der exakt gleichen Struktur wie
WS 25/26 und SS 25 – nur **Werte, Branchen, Firmennamen und Begriffe**
sind randomisiert. Die acht Aufgabenblöcke A1–A8 mit identischer
Punkteverteilung (Variante A: 9-8-10-16-13-14-12-18 / Variante B:
9-10-9-16-12-14-12-18 = 100 Punkte).

| Block | Aufgabentyp | Pool |
|-------|-------------|------|
| A1 | 3 Begriffe erklären | 40+ Definitionen |
| A2 | GPM-Zyklus (Szenario ODER Phasen+Redesign) | 6 Szenarien + 6 Branchen |
| A3 | Prozessarten zuordnen | 7 Branchen mit je 6+ Prozessen |
| A4 | PKR mit 4 Teilprozessen + 2 Produkten | randomisierte Zahlen |
| A5 | Wertschöpfung & Integration | 6 Industrie-Szenarien |
| A6 | Petrinetz (Aktivierung, Erreichbarkeit, Eigenschaften) | 6+ Netze, automatisch analysiert |
| A7 | BPMN End-to-End | 4+ Szenarien (Stornierung, Reklamation, …) |
| A8 | Process Mining (Eventlog, Trace, Footprint) | 2+ Eventlogs, 2+ Modelle, 3+ Footprint-Logs |

Reset = neue Klausur. Timer 30/60/90 min. Lösungen ein-/ausblendbar.
Text-Export für KI-Korrektur.

### 2. Petri-Drill: üben bis du es checkst
Im Petri-Trainer gibt es jetzt zwei Modi:
- **Drill** – geführte Mikro-Aufgaben pro Netz (Klick aktivierte
  Transitionen, gib Markierung nach Feuern an, k-Beschränktheit,
  Sicherheit, Deadlock, Lebendigkeit, Anzahl erreichbarer Markierungen).
  Streak-Tracking: 6 in Folge richtig → Netz ist „mastered".
  Falsche Aufgaben kommen ans Ende der Queue – du übst sie wieder.
- **Sandbox** – freier Token-Simulator wie bisher.

Status persistiert in localStorage.

### 3. Fragenkatalog
Neuer Hauptbereich „Fragenkatalog" mit **300+ Fragen** aus:
- Quiz aller Kapitel
- Mini-Checks aller Kapitel
- BPMN-Symbol/Flow/Reihenfolge-Trainer
- ~140 zusätzlich aus den Lernzettel-PDFs und Vorlesungs-PDFs
  (`thema_2.pdf`, `3.pdf`, `5.pdf`, `6.pdf`,
  `DGP_Kapitel_1_Vollstaendiger_Lernzettel.pdf`,
  `Digitale_Geschaeftsprozesse_Lernzettel.pdf`).

UI:
- Filter: Themen, Schwierigkeit, Status (alle / unbeantwortet /
  richtig / falsch / markiert), Volltextsuche.
- Drei Modi:
  - **Browse** – durchscrollen und antworten.
  - **Lernsession** – gemischtes Set, eine nach der anderen, am Ende
    Bilanz.
  - **Falsche wiederholen** – nur Fragen, bei denen wrong > right
    oder die markiert sind.
- Per Frage: „Gewusst" / „Nicht gewusst" / „Stern" zum Markieren.
- Fortschritt persistent in localStorage.

## Setup

```bash
git clone https://github.com/umhanau-arch/DGP.git
cd DGP
git checkout feat/v3-original-exam-and-question-bank
npm install
npm run dev          # http://127.0.0.1:5173
npm run build        # nach dist/
npm run preview
```

### Standalone (kein npm install)
Im Repo unter `releases/v3/dgp-klausurtrainer-standalone.zip` liegt eine
fertig gebündelte Version. Entpacken, in einem lokalen HTTP-Server
servieren (`python3 -m http.server`) und im Browser öffnen. React,
Tailwind, framer-motion und lucide-react werden vom CDN
(esm.sh + Tailwind Play CDN) nachgeladen.

## Struktur

```
src/
  App.tsx                Hauptlayout + Nav (4 Bereiche)
  main.tsx               Einstieg
  styles.css             Tailwind + Basis
  types.ts               Domain-Typen (inkl. Exam-Block-Schema, Drill, QuestionBank)
  utils/storage.ts       LocalStorage + Tracker
  data/
    chapter1.ts ... chapter9.ts   Lerninhalte (unverändert)
    chapters.ts          Index
    examPools.ts         Pools (Definitionen, Szenarien, Branchen, …)
    examGenerator.ts     Klausur 1:1 nach Original
    petriNets.ts         Petrinetz-Beispiele
    petriDrill.ts        Drill-Aufgaben + Solver
    bpmnTasks.ts         BPMN-Trainer-Daten
    miningCases.ts       Mining-Logs
    questionBank.ts      Aggregierte Fragen + PDF-Bonusfragen
  components/
    GuidedMode/          Lernpfad pro Kapitel
    ExamMode/            Klausur-Anzeige (PKR-Tabelle, Petri-SVG, Footprint, …)
    Trainers/            Petri (Drill+Sandbox), PKR, BPMN, Mining
    Visuals/             Inline-Visualisierungen
    Questions/           Fragenkatalog UI
    UI/                  Card, Pill, Button, ProgressBar, Stat, Callout
```

## Original-Quellen

Die Klausurschemata stammen aus:
- `archive/v1-extract/analysis/pdf-text/1.pdf.txt` (Klausur WS 25/26)
- `archive/v1-extract/analysis/pdf-text/2.pdf.txt` (Klausur SS 25)

Inhalte stammen aus den Vorlesungs-PDFs und Lernzetteln im selben
Ordner. Sie sind als reine Text-Extraktionen archiviert – das Repo selbst
enthält keine PDFs, nur Text und das daraus abgeleitete Trainer-Material.
