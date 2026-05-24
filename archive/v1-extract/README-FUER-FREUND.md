# DGP Klausurtrainer starten

Das ist eine lokale React/Vite-Lernapp fÃ¼r das Modul Digitale GeschÃ¤ftsprozesse.

## Voraussetzung

Node.js muss installiert sein.

## Start

Im Projektordner ausfÃ¼hren:

```powershell
npm install
npm run dev -- --port 5173
```

Dann im Browser Ã¶ffnen:

```text
http://127.0.0.1:5173
```

## Falls Port 5173 belegt ist

```powershell
npm run dev -- --port 5174
```

Dann entsprechend Ã¶ffnen:

```text
http://127.0.0.1:5174
```

## Inhalte bearbeiten

Die Lerninhalte liegen in:

```text
src/data/
```

Wichtig: `node_modules` ist absichtlich nicht im ZIP enthalten. Das wird durch `npm install` neu erzeugt.


