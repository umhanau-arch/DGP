import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CircleDot,
  Database,
  PackageCheck,
  Inbox,
  Layers,
  Send,
  Settings2,
  ShieldCheck,
  Users,
  Workflow as WorkflowIcon,
} from "lucide-react";
import type { VisualKey } from "../../types";

interface VisualProps {
  visual: VisualKey;
}

export function VisualBlock({ visual }: VisualProps) {
  switch (visual) {
    case "process-flow":
      return <ProcessFlow />;
    case "aris-sights":
      return <ArisSights />;
    case "gpm-cycle":
      return <GpmCycle />;
    case "process-map":
      return <ProcessMap />;
    case "function-tree":
      return <FunctionTree />;
    case "porter-chain":
      return <PorterChain />;
    case "integration-directions":
      return <IntegrationDirections />;
    case "digitization-stairs":
      return <DigitizationStairs />;
    case "pkr-flow":
      return <PkrFlow />;
    case "petri-static":
      return <PetriStatic />;
    case "bpmn-symbols":
      return <BpmnSymbols />;
    case "bpmn-pools":
      return <BpmnPools />;
    case "mining-pipeline":
      return <MiningPipeline />;
    case "footprint-legend":
      return <FootprintLegend />;
    case "kpi-dashboard":
      return <KpiDashboard />;
    case "pdca-cycle":
      return <PdcaCycle />;
    case "smart-checklist":
      return <SmartChecklist />;
    case "make-or-buy":
      return <MakeOrBuy />;
    case "exam-blueprint":
      return <ExamBlueprint />;
    default:
      return null;
  }
}

function VisualFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-5 dark:border-brand-900 dark:from-brand-950/40 dark:to-slate-950">
      <p className="mb-3 text-xs font-black uppercase tracking-wide text-brand-700 dark:text-brand-300">
        Visualisierung · {label}
      </p>
      {children}
    </div>
  );
}

// ---------------- Process flow ----------------
function ProcessFlow() {
  return (
    <VisualFrame label="Input → Aktivität → Output">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 sm:items-center">
        {[
          { Icon: Inbox, label: "Input", note: "Bestellung, Material, Anfrage" },
          { Icon: WorkflowIcon, label: "Aktivität 1", note: "prüfen" },
          { Icon: WorkflowIcon, label: "Aktivität 2", note: "kommissionieren" },
          { Icon: WorkflowIcon, label: "Aktivität 3", note: "abrechnen" },
          { Icon: PackageCheck, label: "Output", note: "geliefertes Produkt" },
        ].map(({ Icon, label, note }, i) => (
          <div key={label} className="flex items-center sm:flex-col sm:text-center">
            <div className="flex flex-col items-center rounded-lg border border-slate-200 bg-white p-3 shadow-card dark:border-slate-800 dark:bg-slate-900">
              <Icon className="text-brand-600" size={24} />
              <p className="mt-2 text-sm font-bold">{label}</p>
              <p className="mt-1 text-[11px] text-slate-500">{note}</p>
            </div>
            {i < 4 && (
              <ArrowRight
                className="mx-2 hidden text-slate-400 sm:block"
                size={18}
              />
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">
        Wertschöpfung entsteht zwischen Input und Output. Wiederholbarkeit macht
        den Prozess zum Geschäftsprozess.
      </p>
    </VisualFrame>
  );
}

// ---------------- ARIS sights ----------------
function ArisSights() {
  const sights = [
    { label: "Funktion", q: "WAS wird getan?", ex: "Bestellung prüfen", Icon: WorkflowIcon, color: "emerald" },
    { label: "Organisation", q: "WER macht es?", ex: "Vertrieb / Sachbearbeiter", Icon: Users, color: "rose" },
    { label: "Daten", q: "Welche Daten?", ex: "Bestelldaten, Kunde", Icon: Database, color: "sky" },
    { label: "Leistung", q: "Welcher Output?", ex: "gelieferte Ware", Icon: PackageCheck, color: "lime" },
  ];
  const [active, setActive] = useState<string>("Funktion");
  return (
    <VisualFrame label="ARIS – 5 Sichten">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {sights.map((s) => {
          const isActive = active === s.label;
          return (
            <button
              key={s.label}
              onClick={() => setActive(s.label)}
              className={`flex flex-col items-start rounded-lg border p-3 text-left transition ${
                isActive
                  ? "border-brand-400 bg-brand-50 shadow-card dark:border-brand-700 dark:bg-brand-950/40"
                  : "border-slate-200 bg-white hover:border-brand-300 dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              <s.Icon className="text-brand-600" size={20} />
              <p className="mt-2 font-black">{s.label}</p>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {s.q}
              </p>
              <p className="mt-2 text-xs italic text-slate-500">→ {s.ex}</p>
            </button>
          );
        })}
      </div>
      <div className="mt-3 rounded-lg border border-violet-200 bg-violet-50 p-3 text-sm text-violet-900 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-100">
        <p className="font-black">Steuerungssicht (verbindet alle):</p>
        <p>
          Wie laufen Funktion, Organisation, Daten und Leistung im Ablauf
          zusammen? Beispiel: BPMN- oder EPK-Modell des Bestellprozesses.
        </p>
      </div>
    </VisualFrame>
  );
}

// ---------------- GPM Cycle ----------------
function GpmCycle() {
  const phases = [
    { label: "Identifikation", note: "Prozesse erkennen + priorisieren" },
    { label: "Erhebung", note: "Ist-Prozess aufnehmen" },
    { label: "Analyse", note: "Schwachstellen + Ursachen" },
    { label: "Verbesserung", note: "Soll-Prozess + Maßnahmen" },
    { label: "Einführung", note: "Umsetzen + Schulen" },
    { label: "Überwachung", note: "Kennzahlen messen" },
  ];
  const [active, setActive] = useState(0);
  const radius = 110;
  return (
    <VisualFrame label="GPM-Lebenszyklus">
      <div className="flex flex-col items-center gap-4 lg:flex-row">
        <div className="relative h-[280px] w-[280px]">
          <div className="absolute inset-3 rounded-full border-4 border-dashed border-brand-300/60 dark:border-brand-800" />
          {phases.map((phase, i) => {
            const angle = (i / phases.length) * Math.PI * 2 - Math.PI / 2;
            const x = 140 + radius * Math.cos(angle) - 36;
            const y = 140 + radius * Math.sin(angle) - 18;
            return (
              <button
                key={phase.label}
                onClick={() => setActive(i)}
                style={{ left: x, top: y }}
                className={`absolute flex h-9 w-[72px] items-center justify-center rounded-full text-[10px] font-bold transition ${
                  i === active
                    ? "bg-brand-600 text-white shadow-card"
                    : "bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
                }`}
              >
                {i + 1}. {phase.label.slice(0, 7)}
              </button>
            );
          })}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-brand-100 p-3 dark:bg-brand-900/40">
              <CircleDot className="text-brand-700 dark:text-brand-200" size={24} />
            </div>
          </div>
        </div>
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 rounded-lg border border-brand-200 bg-white p-4 dark:border-brand-900 dark:bg-slate-900"
        >
          <p className="text-xs font-black uppercase tracking-wide text-brand-700 dark:text-brand-300">
            Phase {active + 1} von 6
          </p>
          <h4 className="mt-1 text-2xl font-black">{phases[active].label}</h4>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            {phases[active].note}
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            {active === 0 && <li>Ergebnis: Prozesslandkarte, Priorisierung.</li>}
            {active === 1 && <li>Ergebnis: Ist-Prozessmodell.</li>}
            {active === 2 && <li>Ergebnis: Ursachen, kritischer Pfad, Engpässe.</li>}
            {active === 3 && <li>Ergebnis: Soll-Prozessmodell + Maßnahmenplan.</li>}
            {active === 4 && <li>Ergebnis: laufender neuer Prozess.</li>}
            {active === 5 && <li>Ergebnis: Kennzahlen → neue Identifikationsrunde.</li>}
          </ul>
        </motion.div>
      </div>
    </VisualFrame>
  );
}

// ---------------- Process map ----------------
function ProcessMap() {
  return (
    <VisualFrame label="Prozesslandkarte">
      <div className="space-y-3">
        <Lane
          tone="violet"
          title="Managementprozesse"
          examples={["Strategie", "Controlling", "QMS"]}
        />
        <Lane
          tone="emerald"
          title="Kernprozesse"
          examples={["Order-to-Cash", "Procure-to-Pay", "Service / Support"]}
        />
        <Lane
          tone="sky"
          title="Supportprozesse"
          examples={["HR", "IT", "Buchhaltung"]}
        />
      </div>
      <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">
        Tipp: Die Einordnung hängt vom Geschäftsmodell ab. Eine Online-Plattform
        kann Kern- oder Supportprozess sein.
      </p>
    </VisualFrame>
  );
}

function Lane({
  tone,
  title,
  examples,
}: {
  tone: "violet" | "emerald" | "sky";
  title: string;
  examples: string[];
}) {
  const palette: Record<string, string> = {
    violet:
      "border-violet-300 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/40",
    emerald:
      "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40",
    sky: "border-sky-300 bg-sky-50 dark:border-sky-800 dark:bg-sky-950/40",
  };
  return (
    <div className={`flex flex-wrap items-center gap-3 rounded-lg border p-3 ${palette[tone]}`}>
      <span className="font-black">{title}</span>
      <div className="flex flex-wrap gap-2">
        {examples.map((e) => (
          <span
            key={e}
            className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold dark:bg-slate-900/60"
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------- Function tree ----------------
function FunctionTree() {
  return (
    <VisualFrame label="Funktionsbaum nach Scheer">
      <div className="space-y-3 text-sm">
        <Tree level={0} label="Hauptfunktion: Auftrag bearbeiten" />
        <Tree level={1} label="Auftrag prüfen" />
        <Tree level={2} label="Stammdaten validieren (Elementarfunktion)" />
        <Tree level={2} label="Bonität prüfen (Elementarfunktion)" />
        <Tree level={1} label="Lieferung anstoßen" />
        <Tree level={2} label="Kommissionieren" />
        <Tree level={2} label="Versenden" />
        <Tree level={1} label="Rechnung erstellen" />
      </div>
      <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">
        Wichtig: Der Funktionsbaum zeigt Struktur, KEINE Reihenfolge. Reihenfolge
        gehört in die Steuerungssicht.
      </p>
    </VisualFrame>
  );
}
function Tree({ level, label }: { level: number; label: string }) {
  return (
    <div
      style={{ paddingLeft: level * 20 }}
      className="flex items-center gap-2"
    >
      {level === 0 ? (
        <Layers className="text-brand-600" size={16} />
      ) : (
        <span className="text-slate-400">└</span>
      )}
      <span className={level === 0 ? "font-black" : "text-slate-700 dark:text-slate-300"}>{label}</span>
    </div>
  );
}

// ---------------- Porter chain ----------------
function PorterChain() {
  return (
    <VisualFrame label="Porter-Wertschöpfungskette">
      <div className="grid gap-2">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">
            Unterstützende Aktivitäten
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {["Infrastruktur", "Personal", "Technologie", "Beschaffung"].map((s) => (
              <span
                key={s}
                className="rounded-lg bg-violet-100 px-3 py-2 text-center text-xs font-bold text-violet-900 dark:bg-violet-900/40 dark:text-violet-100"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">
            Primäraktivitäten
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {[
              "Eingangslogistik",
              "Operationen",
              "Ausgangslogistik",
              "Marketing/Vertrieb",
              "Service",
            ].map((p, i) => (
              <div key={p} className="flex items-center">
                <span className="rounded-lg bg-emerald-100 px-3 py-2 text-xs font-bold text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100">
                  {p}
                </span>
                {i < 4 && <ArrowRight className="mx-1 text-slate-400" size={14} />}
              </div>
            ))}
            <span className="ml-auto rounded-lg bg-amber-200 px-3 py-2 text-xs font-bold text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">
              Gewinnspanne
            </span>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

// ---------------- Integration directions ----------------
function IntegrationDirections() {
  return (
    <VisualFrame label="Integrationsrichtungen">
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 dark:border-rose-800 dark:bg-rose-950/30">
          <p className="font-black text-rose-900 dark:text-rose-200">
            ← Rückwärts
          </p>
          <p className="mt-1 text-sm text-rose-900/90 dark:text-rose-100">
            Richtung Lieferant. Eigene Vorleistung erstellen.
          </p>
          <p className="mt-2 text-xs italic text-rose-700 dark:text-rose-200/70">
            Beispiel: Tesla baut Batterien selbst.
          </p>
        </div>
        <div className="rounded-lg border border-brand-200 bg-brand-50 p-3 dark:border-brand-800 dark:bg-brand-950/30">
          <p className="font-black text-brand-900 dark:text-brand-200">
            ↕ Horizontal
          </p>
          <p className="mt-1 text-sm text-brand-900/90 dark:text-brand-100">
            Auf gleicher Wertschöpfungsstufe (Konkurrentenkauf).
          </p>
          <p className="mt-2 text-xs italic text-brand-700 dark:text-brand-200/70">
            Beispiel: VW übernimmt Marken (Audi, Skoda).
          </p>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950/30">
          <p className="font-black text-emerald-900 dark:text-emerald-200">
            → Vorwärts
          </p>
          <p className="mt-1 text-sm text-emerald-900/90 dark:text-emerald-100">
            Richtung Kunde. Vertrieb übernehmen.
          </p>
          <p className="mt-2 text-xs italic text-emerald-700 dark:text-emerald-200/70">
            Beispiel: Hersteller startet Direktvertrieb.
          </p>
        </div>
      </div>
    </VisualFrame>
  );
}

// ---------------- Digitization stairs ----------------
function DigitizationStairs() {
  const steps = [
    { label: "Digitization", desc: "Daten digital", ex: "Papier → PDF" },
    { label: "Digitalization", desc: "Prozess digital besser", ex: "Online-Workflow" },
    { label: "Transformation", desc: "Geschäftsmodell neu", ex: "Plattform / Subscription" },
  ];
  return (
    <VisualFrame label="Digitalisierungsstufen">
      <div className="flex flex-col gap-2 sm:flex-row">
        {steps.map((s, i) => (
          <div
            key={s.label}
            className={`relative flex-1 rounded-lg p-3 ${
              i === 0
                ? "bg-sky-100 dark:bg-sky-900/40"
                : i === 1
                  ? "bg-brand-100 dark:bg-brand-900/40"
                  : "bg-emerald-100 dark:bg-emerald-900/40"
            }`}
            style={{ marginTop: i * 8 }}
          >
            <p className="font-black">{s.label}</p>
            <p className="mt-1 text-sm">{s.desc}</p>
            <p className="mt-2 text-xs italic">→ {s.ex}</p>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}

// ---------------- PKR flow ----------------
function PkrFlow() {
  const steps = [
    "Kosten trennen (fix / variabel)",
    "Maßgrößen bestimmen",
    "lmi und lmn unterscheiden",
    "Variabler Prozesskostensatz",
    "Umlage für lmn",
    "Produktkosten = Menge × Satz",
  ];
  return (
    <VisualFrame label="PKR Schritt für Schritt">
      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li
            key={s}
            className="flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm dark:border-orange-800 dark:bg-orange-950/40"
          >
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
              {i + 1}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </VisualFrame>
  );
}

// ---------------- Petri static ----------------
function PetriStatic() {
  return (
    <VisualFrame label="Petrinetz – Bausteine">
      <svg viewBox="0 0 600 220" className="h-auto w-full">
        <Place cx={70} cy={110} tokens={1} label="p1" />
        <Transition x={150} y={95} label="t1" />
        <Place cx={250} cy={110} tokens={0} label="p2" />
        <Transition x={330} y={95} label="t2" />
        <Place cx={430} cy={110} tokens={0} label="p3" />
        <Arrow from={[90, 110]} to={[150, 110]} />
        <Arrow from={[180, 110]} to={[230, 110]} />
        <Arrow from={[270, 110]} to={[330, 110]} />
        <Arrow from={[360, 110]} to={[410, 110]} />
      </svg>
      <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
        Stelle: Kreis, hält Token. Transition: Balken/Rechteck. Pfeile verbinden
        nur Stelle ↔ Transition.
      </p>
    </VisualFrame>
  );
}
function Place({ cx, cy, tokens, label }: { cx: number; cy: number; tokens: number; label: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={20} className="fill-white stroke-slate-700 dark:fill-slate-900 dark:stroke-slate-300" strokeWidth={2} />
      {tokens > 0 && <circle cx={cx} cy={cy} r={6} className="fill-slate-800 dark:fill-slate-200" />}
      <text x={cx} y={cy + 38} textAnchor="middle" className="fill-slate-700 text-xs font-bold dark:fill-slate-300">
        {label}
      </text>
    </g>
  );
}
function Transition({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={30} height={30} className="fill-slate-700 dark:fill-slate-300" />
      <text x={x + 15} y={y + 50} textAnchor="middle" className="fill-slate-700 text-xs font-bold dark:fill-slate-300">
        {label}
      </text>
    </g>
  );
}
function Arrow({ from, to }: { from: [number, number]; to: [number, number] }) {
  return (
    <g>
      <defs>
        <marker id="arrow-mark" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" className="fill-slate-700 dark:fill-slate-300" />
        </marker>
      </defs>
      <line
        x1={from[0]}
        y1={from[1]}
        x2={to[0]}
        y2={to[1]}
        className="stroke-slate-700 dark:stroke-slate-300"
        strokeWidth={2}
        markerEnd="url(#arrow-mark)"
      />
    </g>
  );
}

// ---------------- BPMN symbols ----------------
function BpmnSymbols() {
  return (
    <VisualFrame label="BPMN Symbol-Kompendium">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <Symbol shape="circle-thin" name="Start" desc="dünner Kreis" />
        <Symbol shape="circle-double" name="Zwischen" desc="doppelter Kreis" />
        <Symbol shape="circle-thick" name="Ende" desc="dicker Kreis" />
        <Symbol shape="rect" name="Task" desc="abgerundetes Rechteck" />
        <Symbol shape="diamond-x" name="XOR" desc="genau ein Pfad" />
        <Symbol shape="diamond-plus" name="AND" desc="alle Pfade" />
        <Symbol shape="diamond-o" name="OR" desc="≥ ein Pfad" />
        <Symbol shape="envelope" name="Nachricht" desc="Briefumschlag im Kreis" />
      </div>
    </VisualFrame>
  );
}
function Symbol({ shape, name, desc }: { shape: string; name: string; desc: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-12 w-12 items-center justify-center">
        <SymbolGlyph shape={shape} />
      </div>
      <div>
        <p className="text-sm font-black">{name}</p>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
    </div>
  );
}
function SymbolGlyph({ shape }: { shape: string }) {
  const stroke = "stroke-slate-700 dark:stroke-slate-200";
  if (shape === "circle-thin")
    return (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <circle cx={20} cy={20} r={14} className={`fill-none ${stroke}`} strokeWidth={2} />
      </svg>
    );
  if (shape === "circle-double")
    return (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <circle cx={20} cy={20} r={15} className={`fill-none ${stroke}`} strokeWidth={2} />
        <circle cx={20} cy={20} r={11} className={`fill-none ${stroke}`} strokeWidth={2} />
      </svg>
    );
  if (shape === "circle-thick")
    return (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <circle cx={20} cy={20} r={14} className={`fill-none ${stroke}`} strokeWidth={4} />
      </svg>
    );
  if (shape === "rect")
    return (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <rect x={4} y={10} width={32} height={20} rx={4} className={`fill-none ${stroke}`} strokeWidth={2} />
      </svg>
    );
  if (shape === "diamond-x")
    return (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <polygon points="20,4 36,20 20,36 4,20" className={`fill-none ${stroke}`} strokeWidth={2} />
        <text x={20} y={26} textAnchor="middle" className="fill-slate-700 text-xs font-bold dark:fill-slate-200">
          X
        </text>
      </svg>
    );
  if (shape === "diamond-plus")
    return (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <polygon points="20,4 36,20 20,36 4,20" className={`fill-none ${stroke}`} strokeWidth={2} />
        <text x={20} y={26} textAnchor="middle" className="fill-slate-700 text-xs font-bold dark:fill-slate-200">
          +
        </text>
      </svg>
    );
  if (shape === "diamond-o")
    return (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <polygon points="20,4 36,20 20,36 4,20" className={`fill-none ${stroke}`} strokeWidth={2} />
        <text x={20} y={26} textAnchor="middle" className="fill-slate-700 text-xs font-bold dark:fill-slate-200">
          O
        </text>
      </svg>
    );
  if (shape === "envelope")
    return (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <circle cx={20} cy={20} r={14} className={`fill-none ${stroke}`} strokeWidth={2} />
        <rect x={11} y={15} width={18} height={11} className={`fill-none ${stroke}`} strokeWidth={1.5} />
        <polyline
          points="11,15 20,22 29,15"
          className={`fill-none ${stroke}`}
          strokeWidth={1.5}
        />
      </svg>
    );
  return null;
}

// ---------------- BPMN pools ----------------
function BpmnPools() {
  return (
    <VisualFrame label="Pools, Lanes und Flüsse">
      <div className="space-y-2">
        <div className="rounded-lg border border-slate-300 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900">
          <p className="ml-2 text-xs font-black uppercase tracking-wide text-slate-500">
            Pool: Kunde
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-md bg-white px-3 py-2 text-xs font-bold ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
              Bestellung senden
            </span>
            <Send className="text-brand-500" size={16} />
          </div>
        </div>
        <p className="text-center text-xs text-slate-500">
          --- Nachrichtenfluss (gestrichelt) ---
        </p>
        <div className="rounded-lg border border-slate-300 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900">
          <p className="ml-2 text-xs font-black uppercase tracking-wide text-slate-500">
            Pool: Unternehmen
          </p>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="rounded-md bg-emerald-50 p-2 text-center text-xs font-bold ring-1 ring-emerald-200 dark:bg-emerald-900/30 dark:ring-emerald-800">
              Lane Vertrieb
              <p className="mt-1 font-normal">Bestellung prüfen</p>
            </div>
            <div className="rounded-md bg-sky-50 p-2 text-center text-xs font-bold ring-1 ring-sky-200 dark:bg-sky-900/30 dark:ring-sky-800">
              Lane Lager
              <p className="mt-1 font-normal">Versenden</p>
            </div>
            <div className="rounded-md bg-amber-50 p-2 text-center text-xs font-bold ring-1 ring-amber-200 dark:bg-amber-900/30 dark:ring-amber-800">
              Lane Buchhaltung
              <p className="mt-1 font-normal">Rechnung erstellen</p>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-slate-500">
            → durchgezogene Sequenzflüsse innerhalb des Pools
          </p>
        </div>
      </div>
    </VisualFrame>
  );
}

// ---------------- Mining pipeline ----------------
function MiningPipeline() {
  return (
    <VisualFrame label="Process-Mining-Pipeline">
      <div className="grid gap-2 sm:grid-cols-4">
        {[
          { label: "Eventlog", Icon: Database, note: "Case + Activity + Timestamp" },
          { label: "Discovery", Icon: WorkflowIcon, note: "Modell aus Log" },
          { label: "Conformance", Icon: ShieldCheck, note: "Modell vs. Log" },
          { label: "Performance", Icon: Settings2, note: "Engpässe finden" },
        ].map(({ label, Icon, note }) => (
          <div
            key={label}
            className="rounded-lg border border-cyan-200 bg-cyan-50 p-3 text-cyan-900 dark:border-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-100"
          >
            <Icon size={20} />
            <p className="mt-1 font-black">{label}</p>
            <p className="text-xs opacity-80">{note}</p>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}

// ---------------- Footprint legend ----------------
function FootprintLegend() {
  return (
    <VisualFrame label="Footprint-Beziehungen">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Legend symbol=">" label="direkte Folge" desc="b folgt mind. 1× direkt auf a" />
        <Legend symbol="→" label="Kausalität" desc="a > b ja, b > a nein" />
        <Legend symbol="||" label="Parallelität" desc="a > b und b > a" />
        <Legend symbol="#" label="keine Beziehung" desc="weder noch" />
      </div>
    </VisualFrame>
  );
}
function Legend({
  symbol,
  label,
  desc,
}: {
  symbol: string;
  label: string;
  desc: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-2xl font-black text-brand-700 dark:text-brand-300">
        {symbol}
      </p>
      <p className="mt-1 text-sm font-black">{label}</p>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  );
}

// ---------------- KPI dashboard ----------------
function KpiDashboard() {
  return (
    <VisualFrame label="KPI-Dashboard (Beispiel)">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { l: "Durchlaufzeit", v: "3,1 Tage", d: "Ziel ≤ 3" },
          { l: "Fehlerquote", v: "1,8 %", d: "Ziel ≤ 2" },
          { l: "Termintreue", v: "94 %", d: "Ziel ≥ 95" },
        ].map((kpi) => (
          <div
            key={kpi.l}
            className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950/30"
          >
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-200">
              {kpi.l}
            </p>
            <p className="mt-1 text-2xl font-black text-emerald-900 dark:text-emerald-100">
              {kpi.v}
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">{kpi.d}</p>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}

// ---------------- PDCA cycle ----------------
function PdcaCycle() {
  const phases = ["Plan", "Do", "Check", "Act"];
  return (
    <VisualFrame label="PDCA-Zyklus">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {phases.map((p, i) => (
          <div
            key={p}
            className="rounded-lg border border-sky-200 bg-sky-50 p-4 text-center dark:border-sky-800 dark:bg-sky-950/30"
          >
            <p className="text-xs font-black text-sky-700 dark:text-sky-200">
              Phase {i + 1}
            </p>
            <p className="text-lg font-black">{p}</p>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}

// ---------------- SMART checklist ----------------
function SmartChecklist() {
  const items = [
    { l: "S", w: "Specific", note: "Klar formuliert" },
    { l: "M", w: "Measurable", note: "Messbar" },
    { l: "A", w: "Achievable", note: "Erreichbar" },
    { l: "R", w: "Reasonable", note: "Realistisch" },
    { l: "T", w: "Time-bound", note: "Terminiert" },
  ];
  return (
    <VisualFrame label="SMART-Kriterien">
      <div className="grid gap-2 sm:grid-cols-5">
        {items.map((it) => (
          <div
            key={it.l}
            className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center dark:border-emerald-800 dark:bg-emerald-950/30"
          >
            <p className="text-2xl font-black text-emerald-700 dark:text-emerald-200">
              {it.l}
            </p>
            <p className="text-sm font-bold">{it.w}</p>
            <p className="text-xs text-slate-500">{it.note}</p>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}

// ---------------- Make or Buy ----------------
function MakeOrBuy() {
  return (
    <VisualFrame label="Make-or-Buy / Sourcing">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950/30">
          <p className="font-black text-emerald-900 dark:text-emerald-100">
            Make
          </p>
          <p className="mt-1 text-sm">
            strategisch wichtig, hohes Know-how, vertrauliche Daten
          </p>
        </div>
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 dark:border-rose-800 dark:bg-rose-950/30">
          <p className="font-black text-rose-900 dark:text-rose-100">Buy</p>
          <p className="mt-1 text-sm">
            standardisiert, austauschbar, geringes Differenzierungspotenzial
          </p>
        </div>
      </div>
    </VisualFrame>
  );
}

// ---------------- Exam blueprint ----------------
function ExamBlueprint() {
  const blocks = [
    { code: "A1", t: "Definitionen", p: 9, color: "slate" },
    { code: "A2", t: "GPM-Zyklus", p: 10, color: "emerald" },
    { code: "A3", t: "Prozessarten", p: 9, color: "rose" },
    { code: "A4", t: "PKR", p: 16, color: "orange" },
    { code: "A5", t: "Wertschöpfung", p: 13, color: "lime" },
    { code: "A6", t: "Petrinetze", p: 14, color: "violet" },
    { code: "A7", t: "BPMN", p: 12, color: "sky" },
    { code: "A8", t: "Process Mining", p: 18, color: "cyan" },
  ];
  const palette: Record<string, string> = {
    slate: "border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900",
    emerald: "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30",
    rose: "border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30",
    orange: "border-orange-300 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/30",
    lime: "border-lime-300 bg-lime-50 dark:border-lime-800 dark:bg-lime-950/30",
    violet: "border-violet-300 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/30",
    sky: "border-sky-300 bg-sky-50 dark:border-sky-800 dark:bg-sky-950/30",
    cyan: "border-cyan-300 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/30",
  };
  return (
    <VisualFrame label="Klausur-Blueprint">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {blocks.map((b) => (
          <div
            key={b.code}
            className={`rounded-lg border p-3 text-sm ${palette[b.color]}`}
          >
            <p className="font-black">
              {b.code} · {b.t}
            </p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              {b.p} Punkte
            </p>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}
