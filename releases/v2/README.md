# DGP Klausurtrainer v2 · Downloads

Hier liegen zwei Downloads für die App.

## 1. Standalone (sofort lauffähig)

**Datei:** `dgp-klausurtrainer-standalone.zip` (~62 KB)

Enthält ein gebündeltes `index.html` + `main.js`. **Kein Build, kein
`npm install` nötig.**

Die App lädt React, Framer Motion, lucide-react und Tailwind direkt aus
einem CDN (esm.sh + Tailwind Play CDN). Daher ist beim ersten Öffnen
einmalig Internet nötig; danach funktioniert vieles aus dem Browser-Cache.

### So benutzt du es

1. ZIP entpacken.
2. Den entpackten Ordner z. B. mit einem kleinen lokalen Webserver
   öffnen (Datei direkt per Doppelklick funktioniert wegen ES-Modulen
   leider nicht):

   - **Python:** `python3 -m http.server 8080` im Ordner ausführen,
     dann http://localhost:8080 öffnen.
   - **Node:** `npx serve .` im Ordner ausführen.
   - **Hosten:** Inhalt einfach auf GitHub Pages, Netlify, Vercel
     ablegen.

3. Fertig. Fortschritt wird im LocalStorage des Browsers gespeichert.

## 2. Source (für eigene Anpassungen)

**Datei:** `dgp-klausurtrainer-source.zip` (~95 KB)

Enthält den gesamten Quellcode. Damit kannst du Inhalte ändern und
selbst neu bauen.

```bash
unzip dgp-klausurtrainer-source.zip
cd dgp-klausurtrainer-source        # oder dort, wo du entpackt hast
npm install
npm run dev          # Entwicklungsmodus auf http://127.0.0.1:5173
npm run build        # Produktiv-Build nach dist/
```

Inhalte sind in `src/data/chapter1.ts` … `chapter9.ts` strukturiert.
Trainerdaten in `petriNets.ts`, `miningCases.ts`, `bpmnTasks.ts`,
`examGenerator.ts`.

## Was ist drin?

- **Geführter Modus** mit 9 Kapiteln, didaktisch geordnet.
  Theorie + Visualisierung + Mini-Check + Trainer + Kapitelquiz +
  Übungsaufgaben.
- **Klausurmodus** mit randomisierter 8-Aufgaben-Klausur (A1–A8),
  Timer 30/60/90 min, Lösungs-Toggle, Bewertungspunkten und
  Text-Export für KI-Korrektur.
- **Trainer**: Petri-Token-Simulator, PKR-Schritt-Rechner,
  BPMN-Aufgaben, Process-Mining-Footprint-Matrix.
