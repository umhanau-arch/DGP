import { useEffect, useMemo, useState } from "react";
import {
  Clock,
  Download,
  Eye,
  EyeOff,
  Printer,
  RotateCcw,
  ShieldCheck,
  Timer,
} from "lucide-react";
import {
  exportExamAsText,
  generateExam,
  type GeneratedExam,
} from "../../data/examGenerator";
import type {
  EventLogPayload,
  ExamBlock,
  IntegrationPayload,
  PetriExamPayload,
  PkrPayload,
  ProcessModelTracePayload,
  ProgressState,
  ScenarioPayload,
} from "../../types";
import { Button, Callout, Card, Pill } from "../UI/Card";

const TIMER_OPTIONS = [
  { label: "30 min", minutes: 30 },
  { label: "60 min", minutes: 60 },
  { label: "90 min Vollklausur", minutes: 90 },
];

interface Props {
  progress: ProgressState;
  onProgressChange: (p: ProgressState) => void;
}

export default function ExamMode({ progress, onProgressChange }: Props) {
  const [seed, setSeed] = useState<number>(() => Date.now());
  const exam: GeneratedExam = useMemo(() => generateExam(seed), [seed]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSolutions, setShowSolutions] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    if (timer === null) return;
    const id = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [timer]);

  function startTimer(minutes: number) {
    setTimer(minutes);
    setRemaining(minutes * 60);
  }

  function newExam() {
    setSeed(Date.now());
    setAnswers({});
    setShowSolutions(false);
    setTimer(null);
    setRemaining(0);
    onProgressChange({ ...progress, examsTaken: progress.examsTaken + 1 });
  }

  function exportText(includeSolution: boolean) {
    const text = exportExamAsText(exam, includeSolution);
    const userAnswers = exam.blocks
      .flatMap((b) =>
        b.subTasks.map(
          (st, i) =>
            `=== ${b.block}.${i + 1} ${st.label} ===\n${st.prompt}\n\nDeine Antwort:\n${
              answers[`${b.block}-${i}`] ?? "(leer)"
            }\n`,
        ),
      )
      .join("\n");
    const combined =
      `DGP Klausur · Variante ${exam.variante}\nSeed: ${exam.seed}  Gesamt: ${exam.totalPoints} Punkte\n\n` +
      userAnswers +
      "\n\n--- Aufgaben & Musterlösung ---\n\n" +
      text;
    const blob = new Blob([combined], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dgp-klausur-${exam.seed}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const minutes = Math.floor(remaining / 60);
  const seconds = String(remaining % 60).padStart(2, "0");

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3 no-print">
          <div>
            <Pill tone="rose">Klausurmodus</Pill>
            <h2 className="mt-2 text-3xl font-black">
              Klausur Variante {exam.variante} – {exam.totalPoints} Punkte
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Aufgabentypen, Schwierigkeit und Aufbau wie WS 25/26 und SS 25 –
              nur Werte, Branchen und Begriffe sind randomisiert.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="slate">Seed: {exam.seed}</Pill>
            <Button onClick={newExam} variant="primary">
              <RotateCcw size={16} /> Neue Klausur
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 no-print">
          <div className="flex items-center gap-2">
            <Timer size={16} className="text-brand-500" />
            <span className="text-sm font-bold">Timer:</span>
            {TIMER_OPTIONS.map((o) => (
              <Button
                key={o.minutes}
                variant={timer === o.minutes ? "primary" : "secondary"}
                size="sm"
                onClick={() => startTimer(o.minutes)}
              >
                {o.label}
              </Button>
            ))}
            {timer !== null && (
              <Pill tone={remaining < 60 ? "rose" : "amber"}>
                <Clock size={12} className="mr-1 inline" />
                {minutes}:{seconds}
              </Pill>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 no-print">
          <Button variant="secondary" onClick={() => setShowSolutions(!showSolutions)}>
            {showSolutions ? <EyeOff size={16} /> : <Eye size={16} />}{" "}
            {showSolutions ? "Lösungen ausblenden" : "Lösungen einblenden"}
          </Button>
          <Button variant="secondary" onClick={() => exportText(false)}>
            <Download size={16} /> Export ohne Lösung
          </Button>
          <Button variant="secondary" onClick={() => exportText(true)}>
            <Download size={16} /> Export mit Lösung
          </Button>
          <Button variant="secondary" onClick={() => window.print()}>
            <Printer size={16} /> Drucken
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-9 no-print">
          {exam.blocks.map((b) => (
            <a
              key={b.block}
              href={`#${b.block}`}
              className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-center text-xs font-bold hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900"
            >
              {b.block}: {b.points} P
            </a>
          ))}
          <div className="rounded-lg bg-brand-100 p-2 text-center text-xs font-black text-brand-900 dark:bg-brand-900/40 dark:text-brand-100">
            Σ {exam.totalPoints} P
          </div>
        </div>
      </Card>

      {exam.blocks.map((block) => (
        <ExamBlockCard
          key={block.block}
          block={block}
          answers={answers}
          setAnswers={setAnswers}
          showSolutions={showSolutions}
        />
      ))}

      <Card>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Tipp: Exportiere deine Antworten als Text und lass sie von einer
          KI-Korrektur prüfen. Die Bewertungspunkte und Musterlösungen sind im
          Export enthalten.
        </p>
      </Card>
    </div>
  );
}

function ExamBlockCard({
  block,
  answers,
  setAnswers,
  showSolutions,
}: {
  block: ExamBlock;
  answers: Record<string, string>;
  setAnswers: (fn: (prev: Record<string, string>) => Record<string, string>) => void;
  showSolutions: boolean;
}) {
  return (
    <Card>
      <a id={block.block}></a>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <Pill tone="brand">{block.block}</Pill>
          <h3 className="mt-2 text-2xl font-black">{block.title}</h3>
        </div>
        <Pill tone="amber">{block.points} Punkte</Pill>
      </div>
      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">
        {block.intro}
      </p>

      <PayloadView block={block} />

      <div className="mt-4 space-y-4">
        {block.subTasks.map((sub, i) => {
          const key = `${block.block}-${i}`;
          return (
            <div
              key={key}
              className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950"
            >
              <p className="font-black">
                {sub.label}{" "}
                <span className="text-xs font-normal text-slate-500">
                  ({sub.points} P)
                </span>
              </p>
              <p className="mt-1 whitespace-pre-line text-sm">{sub.prompt}</p>
              <textarea
                value={answers[key] ?? ""}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, [key]: e.target.value }))
                }
                placeholder="Deine Antwort..."
                rows={4}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm font-mono dark:border-slate-700 dark:bg-slate-900"
              />
              {showSolutions && (
                <div className="mt-3 space-y-2">
                  <Callout tone="emerald" title="Musterlösung">
                    <pre className="whitespace-pre-wrap text-sm font-sans">
                      {sub.expected}
                    </pre>
                  </Callout>
                  <div className="rounded border border-slate-200 bg-slate-50 p-2 text-xs dark:border-slate-700 dark:bg-slate-900">
                    <ShieldCheck size={12} className="mr-1 inline" />
                    <b>Bewertungspunkte:</b> {sub.grading.join("; ")}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showSolutions && block.commonErrors.length > 0 && (
        <Callout tone="rose" title="Typische Fehler">
          <ul className="ml-5 list-disc">
            {block.commonErrors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </Callout>
      )}
    </Card>
  );
}

function PayloadView({ block }: { block: ExamBlock }) {
  const p = block.payload;
  if (p.kind === "pkr-table") return <PkrPayloadView p={p} />;
  if (p.kind === "integration-table") return <IntegrationPayloadView p={p} />;
  if (p.kind === "eventlog") return <EventLogPayloadView p={p} />;
  if (p.kind === "petri-net") return <PetriPayloadView p={p} />;
  if (p.kind === "process-model") return <ProcessModelPayloadView p={p} />;
  if (p.kind === "scenario") return <ScenarioPayloadView p={p} />;
  return null;
}

function PkrPayloadView({ p }: { p: PkrPayload }) {
  return (
    <div className="mt-3 space-y-3">
      <p className="text-sm">
        <b>Unternehmen:</b> {p.unternehmen} · <b>Produkte:</b> {p.produkte[0]}, {p.produkte[1]}
      </p>
      <div className="overflow-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-900">
            <tr>
              <th className="p-2 text-left">Prozess</th>
              <th className="p-2 text-right">Gesamtkosten (€)</th>
              <th className="p-2 text-right">Fixkosten (€)</th>
              <th className="p-2 text-left">Maßgröße</th>
              <th className="p-2 text-right">Gesamtmenge</th>
            </tr>
          </thead>
          <tbody>
            {p.teilprozesse.map((t) => (
              <tr key={t.name} className="border-t border-slate-100 dark:border-slate-900">
                <td className="p-2 font-bold">{t.name}</td>
                <td className="p-2 text-right">{t.gesamt.toLocaleString("de-DE")}</td>
                <td className="p-2 text-right">{t.fix.toLocaleString("de-DE")}</td>
                <td className="p-2">{t.measureLabel}</td>
                <td className="p-2 text-right">{t.gesamtmenge.toLocaleString("de-DE")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="overflow-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-900">
            <tr>
              <th className="p-2 text-left">Produkt</th>
              {p.teilprozesse.map((t) => (
                <th key={t.name} className="p-2 text-right">
                  {t.measureLabel.replace("Anzahl ", "")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {p.zuteilung.map((z) => (
              <tr key={z.name} className="border-t border-slate-100 dark:border-slate-900">
                <td className="p-2 font-bold">{z.name}</td>
                {z.values.map((v, i) => (
                  <td key={i} className="p-2 text-right">
                    {v.toLocaleString("de-DE")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function IntegrationPayloadView({ p }: { p: IntegrationPayload }) {
  return (
    <div className="mt-3 overflow-auto rounded-lg border border-slate-200 dark:border-slate-800">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 dark:bg-slate-900">
          <tr>
            <th className="p-2 text-left">Position</th>
            <th className="p-2 text-right">intern (€)</th>
            <th className="p-2 text-right">fremdbezogen (€)</th>
          </tr>
        </thead>
        <tbody>
          {p.rows.map((r) => (
            <tr key={r.position} className="border-t border-slate-100 dark:border-slate-900">
              <td className="p-2 font-bold">{r.position}</td>
              <td className="p-2 text-right">
                {r.intern !== null ? r.intern.toLocaleString("de-DE") : "—"}
              </td>
              <td className="p-2 text-right">
                {r.extern !== null ? r.extern.toLocaleString("de-DE") : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EventLogPayloadView({ p }: { p: EventLogPayload }) {
  return (
    <div className="mt-3 overflow-auto rounded-lg border border-slate-200 dark:border-slate-800 max-h-72">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-slate-100 dark:bg-slate-900">
          <tr>
            <th className="p-2 text-left">Case ID</th>
            <th className="p-2 text-left">Activity</th>
            <th className="p-2 text-left">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {p.rows.map((r, i) => (
            <tr key={i} className="border-t border-slate-100 dark:border-slate-900">
              <td className="p-2 font-mono">{r.caseId}</td>
              <td className="p-2">{r.activity}</td>
              <td className="p-2 font-mono">{r.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PetriPayloadView({ p }: { p: PetriExamPayload }) {
  return (
    <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs text-slate-600 dark:text-slate-300">
        Netz: <b>{p.net.name}</b> – {p.net.description}
      </p>
      <PetriSvg net={p.net} />
    </div>
  );
}

function PetriSvg({ net }: { net: PetriExamPayload["net"] }) {
  const w = 600;
  const h = 240;
  const sx = (x: number) => 30 + (w - 60) * (x / 100);
  const sy = (y: number) => 30 + (h - 60) * (y / 100);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full">
      <defs>
        <marker id="exam-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" className="fill-slate-700 dark:fill-slate-300" />
        </marker>
      </defs>
      {net.arcs.map((arc, i) => {
        const fromNode =
          net.places.find((p) => p.id === arc.from) ??
          net.transitions.find((t) => t.id === arc.from)!;
        const toNode =
          net.places.find((p) => p.id === arc.to) ??
          net.transitions.find((t) => t.id === arc.to)!;
        return (
          <line
            key={i}
            x1={sx(fromNode.x)}
            y1={sy(fromNode.y)}
            x2={sx(toNode.x)}
            y2={sy(toNode.y)}
            className="stroke-slate-500 dark:stroke-slate-400"
            strokeWidth={1.5}
            markerEnd="url(#exam-arrow)"
          />
        );
      })}
      {net.places.map((p) => (
        <g key={p.id}>
          <circle
            cx={sx(p.x)}
            cy={sy(p.y)}
            r={20}
            className="fill-white stroke-slate-700 dark:fill-slate-900 dark:stroke-slate-300"
            strokeWidth={2}
          />
          {p.tokens === 1 && (
            <circle cx={sx(p.x)} cy={sy(p.y)} r={6} className="fill-slate-800 dark:fill-slate-200" />
          )}
          {p.tokens > 1 && (
            <text x={sx(p.x)} y={sy(p.y) + 5} textAnchor="middle" className="fill-slate-800 text-sm font-bold dark:fill-slate-100">
              {p.tokens}
            </text>
          )}
          <text x={sx(p.x)} y={sy(p.y) + 38} textAnchor="middle" className="fill-slate-700 text-xs font-bold dark:fill-slate-300">
            {p.label}
          </text>
        </g>
      ))}
      {net.transitions.map((t) => (
        <g key={t.id}>
          <rect
            x={sx(t.x) - 14}
            y={sy(t.y) - 14}
            width={28}
            height={28}
            className="fill-slate-700 dark:fill-slate-300"
            strokeWidth={2}
          />
          <text x={sx(t.x)} y={sy(t.y) + 36} textAnchor="middle" className="fill-slate-700 text-xs font-bold dark:fill-slate-300">
            {t.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function ProcessModelPayloadView({ p }: { p: ProcessModelTracePayload }) {
  return (
    <div className="mt-3 space-y-3">
      <Callout tone="brand" title="Prozessmodell">
        {p.description}
      </Callout>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Trace-Prüfung
        </p>
        <table className="mt-2 w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-900">
            <tr>
              <th className="p-2 text-left">Trace</th>
              <th className="p-2 text-center">möglich</th>
              <th className="p-2 text-center">nicht möglich</th>
            </tr>
          </thead>
          <tbody>
            {p.traceCheck.map((t) => (
              <tr key={t.trace} className="border-t border-slate-100 dark:border-slate-900">
                <td className="p-2 font-mono">{t.trace}</td>
                <td className="p-2 text-center">○</td>
                <td className="p-2 text-center">○</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Footprint-Matrix für L
        </p>
        <p className="text-sm font-mono">{p.footprintLog}</p>
        <div className="mt-2 overflow-auto">
          <table className="text-sm">
            <thead>
              <tr>
                <th className="p-2"></th>
                {p.footprintActivities.map((a) => (
                  <th key={a} className="p-2 text-center font-bold">
                    {a}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.footprintActivities.map((a) => (
                <tr key={a}>
                  <th className="p-2 text-right font-bold">{a}</th>
                  {p.footprintActivities.map((b) => (
                    <td key={b} className="border border-slate-200 p-2 text-center font-mono dark:border-slate-700">
                      {a === b ? "—" : "?"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs italic text-slate-500">
            Trag die Beziehungen ein: → ← ∥ #
          </p>
        </div>
      </div>
    </div>
  );
}

function ScenarioPayloadView({ p }: { p: ScenarioPayload }) {
  return (
    <div className="mt-3">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        Geschäftsprozesse zur Einordnung
      </p>
      <ul className="mt-2 space-y-1 text-sm">
        {p.prozesse.map((proz, i) => (
          <li
            key={proz.name}
            className="rounded border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900"
          >
            {i + 1}. {proz.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
