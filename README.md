# DGP Klausurtrainer · v2

Geführter Lernkurs und randomisierter Klausurmodus für das Modul
**Digitale Geschäftsprozesse**.

Die App ist als interaktiver Lernpfad gebaut:

- **Geführter Modus** – Kapitel 1-9 mit Theorie, integrierter
  Visualisierung, Mini-Checks während der Theorie, Kapitelquiz und
  klausurnahen Übungsaufgaben.
- **Klausurmodus** – Generiert nach jedem Reset eine neue 8-Aufgaben-Klausur
  (A1-A8) mit Timer (30/60/90 min), Lösungs-Toggle und Text-Export für
  KI-Korrektur.
- **Trainer in den passenden Kapiteln**:
  - Petri-Trainer (Token-Simulator + Eigenschaftsanalyse)
  - PKR-Trainer (schrittweiser Rechner mit randomisierten Aufgaben)
  - BPMN-Trainer (Symbol-Quiz, Sequenz/Nachrichtenfluss, Reihenfolge,
    Modellierungs-Cases)
  - Process-Mining-Trainer (Eventlog → Trace → Footprint-Matrix mit
    Auto-Auswertung)

## Tech Stack

- React 18 + TypeScript + Vite 6
- Tailwind CSS 3
- Framer Motion für Animationen
- lucide-react für Icons
- LocalStorage für Fortschritt

## Setup

```bash
npm install
npm run dev      # Dev-Server auf 127.0.0.1:5173
npm run build    # Produktions-Build nach dist/
npm run preview  # Lokale Vorschau des Build
```

## Verzeichnisstruktur

```
src/
  data/                Inhalte und Generatoren
    chapter1.ts ... chapter9.ts
    chapters.ts        Index aller Kapitel
    petriNets.ts       Beispielnetze für den Petri-Trainer
    miningCases.ts     Eventlogs für den Mining-Trainer
    bpmnTasks.ts       Symbol-/Flow-/Reihenfolge-/Case-Aufgaben
    examGenerator.ts   Randomisierte 8-Aufgaben-Klausur
  components/
    GuidedMode/        Hauptlernpfad mit Schritten
    ExamMode/          Klausurmodus
    Visuals/           Inline-Visualisierungen je Thema
    Trainers/          Petri, PKR, BPMN, Mining
    UI/                Reusable Card, Pill, Button, Callout
  utils/storage.ts     LocalStorage-Wrapper
  types.ts             Domain-Typen
  App.tsx              Hauptlayout
  main.tsx             Einstiegspunkt
  styles.css           Tailwind + Basisstyles
```

## Didaktisches Prinzip

Jedes Kapitel folgt dieser Reihenfolge:

1. **Übersicht** – Worum geht es, warum wichtig, Lernziele, häufige
   Fehler.
2. **Theorieblöcke** in didaktischer Reihenfolge mit:
   - einfacher Erklärung
   - tiefer Erklärung
   - Bullet-Points
   - Tabellen
   - Beispiel
   - **Visualisierung direkt im Theorieblock** (kein separater
     Bereich mehr)
   - Merksatz, Klausurfalle, Klausurbezug
   - Mini-Check-Frage (Verständnis prüfen)
3. **Trainer** im jeweiligen Kapitel (z. B. Petri-Trainer in Kapitel 4).
4. **Kapitelquiz** über alle Fragen.
5. **Übungsaufgaben** mit Lösungsweg.
6. **Abschluss** mit Lernziel-Recap und Fehler-Hinweisen.

## Klausurmodus

Der Klausurmodus generiert randomisiert eine vollständige Klausur:

- **A1 Definitionen** – 3 zufällige Begriffe.
- **A2 GPM-Lebenszyklus** – Phasenfehler in einem Szenario erkennen.
- **A3 Prozessarten** – Begründete Zuordnung.
- **A4 PKR** – Frische Zahlen je Reset.
- **A5 Wertschöpfung/Integration** – Frische Zahlen je Reset.
- **A6 Petrinetze** – Aktivierung, Erreichbarkeit, Eigenschaften.
- **A7 BPMN** – End-to-End-Modellierung mit Pools.
- **A8 Process Mining** – Trace, Variante, Footprint.

Antworten lassen sich als Text-Datei exportieren – mit oder ohne
Musterlösung. Ideal für die Korrektur durch eine KI.

## Lokal starten – schnell

```bash
npm install
npm run dev
# http://127.0.0.1:5173 öffnen
```

Build für Veröffentlichung:

```bash
npm run build
# liefert dist/ – kann statisch gehostet werden
```

## Anpassen

- Inhalte je Kapitel: `src/data/chapter1.ts` bis `chapter9.ts`
- Petri-Beispielnetze: `src/data/petriNets.ts`
- Mining-Eventlogs: `src/data/miningCases.ts`
- BPMN-Aufgaben: `src/data/bpmnTasks.ts`
- Klausurgenerator + Pools: `src/data/examGenerator.ts`

Inhalte sind streng typisiert (`src/types.ts`). Neue Aufgaben einfach in
den Pools ergänzen – sie tauchen automatisch in der Random-Klausur auf.
