import { useEffect, useMemo, useState } from "react";
import { Activity, RefreshCw, ShieldCheck } from "lucide-react";
import { miningCases } from "../../data/miningCases";
import { Button, Callout, Card, Pill } from "../UI/Card";

type FpVal = ">" | "<" | "||" | "#";

export default function MiningTrainer({
  onRunCounted,
}: {
  onRunCounted?: () => void;
}) {
  const [caseId, setCaseId] = useState(miningCases[0].id);
  const log = miningCases.find((c) => c.id === caseId)!;
  const [fp, setFp] = useState<Record<string, Record<string, FpVal | "">>>({});
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    const init: Record<string, Record<string, FpVal | "">> = {};
    log.activities.forEach((a) => {
      init[a] = {};
      log.activities.forEach((b) => {
        init[a][b] = "";
      });
    });
    setFp(init);
    setShowSolution(false);
  }, [caseId, log.activities]);

  const tracesByCase = useMemo(() => {
    const grouped: Record<string, typeof log.events> = {};
    for (const ev of log.events) {
      if (!grouped[ev.caseId]) grouped[ev.caseId] = [];
      grouped[ev.caseId].push(ev);
    }
    const traces: Record<string, string[]> = {};
    for (const [cid, evs] of Object.entries(grouped)) {
      const sorted = [...evs].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
      traces[cid] = sorted.map((e) => e.activity);
    }
    return traces;
  }, [log]);

  const variants = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const trace of Object.values(tracesByCase)) {
      const key = trace.join(",");
      counts[key] = (counts[key] ?? 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [tracesByCase]);

  function setCell(a: string, b: string, value: FpVal | "") {
    setFp((prev) => ({
      ...prev,
      [a]: { ...prev[a], [b]: value },
    }));
  }

  function check() {
    let correct = 0;
    let total = 0;
    log.activities.forEach((a) => {
      log.activities.forEach((b) => {
        if (a === b) return;
        total += 1;
        if (fp[a]?.[b] === log.footprint[a]?.[b]) correct += 1;
      });
    });
    return { correct, total };
  }

  const score = check();

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Pill tone="cyan">Mining-Trainer · Eventlog → Footprint</Pill>
          <h3 className="mt-2 text-2xl font-black flex items-center gap-2">
            <Activity size={22} /> Process Mining
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Wähle einen Log, sortiere Cases nach Timestamp, bilde Traces und
            fülle die Footprint-Matrix.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold dark:border-slate-700 dark:bg-slate-900"
          >
            {miningCases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.difficulty})
              </option>
            ))}
          </select>
          <Button
            variant="primary"
            onClick={() => {
              setShowSolution(true);
              onRunCounted?.();
            }}
          >
            Lösung
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              const init: Record<string, Record<string, FpVal | "">> = {};
              log.activities.forEach((a) => {
                init[a] = {};
                log.activities.forEach((b) => (init[a][b] = ""));
              });
              setFp(init);
              setShowSolution(false);
            }}
          >
            <RefreshCw size={16} /> Reset
          </Button>
        </div>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">
            Eventlog
          </p>
          <div className="mt-2 max-h-72 overflow-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900">
                <tr>
                  <th className="p-2 text-left">Case</th>
                  <th className="p-2 text-left">Activity</th>
                  <th className="p-2 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {log.events.map((e, i) => (
                  <tr
                    key={i}
                    className="border-t border-slate-100 dark:border-slate-900"
                  >
                    <td className="p-2 font-mono">{e.caseId}</td>
                    <td className="p-2">{e.activity}</td>
                    <td className="p-2 font-mono">{e.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">
            Traces (gruppiert + sortiert)
          </p>
          <div className="mt-2 space-y-2">
            {Object.entries(tracesByCase).map(([cid, trace]) => (
              <div
                key={cid}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="text-xs font-bold text-slate-500">{cid}</p>
                <p className="font-mono text-sm">{`<${trace.join(", ")}>`}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs font-black uppercase tracking-wide text-slate-500">
            Varianten
          </p>
          <ul className="mt-1 space-y-1 text-xs">
            {variants.map(([trace, count]) => (
              <li
                key={trace}
                className="rounded bg-cyan-50 px-2 py-1 font-mono text-cyan-900 dark:bg-cyan-900/30 dark:text-cyan-100"
              >
                {`<${trace}>`} × {count}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">
          Footprint-Matrix · klicke auf Felder, um Beziehung zu setzen
        </p>
        <div className="mt-2 overflow-auto">
          <table className="text-sm">
            <thead>
              <tr>
                <th className="bg-slate-100 px-2 py-1 dark:bg-slate-900">a \ b</th>
                {log.activities.map((b) => (
                  <th
                    key={b}
                    className="bg-slate-100 px-2 py-1 text-xs font-bold dark:bg-slate-900"
                  >
                    {b}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {log.activities.map((a) => (
                <tr key={a}>
                  <th className="bg-slate-100 px-2 py-1 text-xs font-bold dark:bg-slate-900">
                    {a}
                  </th>
                  {log.activities.map((b) => {
                    if (a === b)
                      return (
                        <td
                          key={b}
                          className="bg-slate-50 px-2 py-1 text-center text-xs text-slate-400 dark:bg-slate-800"
                        >
                          —
                        </td>
                      );
                    const value = fp[a]?.[b] ?? "";
                    const correct = log.footprint[a]?.[b];
                    const isOk = showSolution && value === correct;
                    const isWrong =
                      showSolution && value !== "" && value !== correct;
                    return (
                      <td
                        key={b}
                        className={`px-1 py-1 text-center ${
                          isOk
                            ? "bg-emerald-100 dark:bg-emerald-900/30"
                            : isWrong
                              ? "bg-rose-100 dark:bg-rose-900/30"
                              : ""
                        }`}
                      >
                        <select
                          value={value}
                          onChange={(e) =>
                            setCell(a, b, e.target.value as FpVal | "")
                          }
                          className="w-14 rounded border border-slate-300 bg-white px-1 py-1 text-xs dark:border-slate-700 dark:bg-slate-900"
                        >
                          <option value="">?</option>
                          <option value=">">{">"}</option>
                          <option value="<">{"<"}</option>
                          <option value="||">{"||"}</option>
                          <option value="#">{"#"}</option>
                        </select>
                        {showSolution && value !== correct && (
                          <p className="mt-1 text-[10px] text-rose-700 dark:text-rose-300">
                            sollte: {correct}
                          </p>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <Pill tone="emerald">
            <ShieldCheck size={12} className="mr-1 inline" />
            {score.correct} / {score.total} richtig
          </Pill>
          {score.correct === score.total && score.total > 0 && (
            <span className="text-sm font-bold text-emerald-600">
              Alles korrekt!
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <Callout tone="brand" title="Symbol-Hilfe">
          <ul className="ml-4 list-disc">
            <li>
              <code>{">"}</code> direkte Folge (b kommt direkt nach a)
            </li>
            <li>
              <code>{"<"}</code> direkte Folge in Gegenrichtung
            </li>
            <li>
              <code>{"||"}</code> Parallelität (beide Richtungen)
            </li>
            <li>
              <code>{"#"}</code> keine Beziehung
            </li>
          </ul>
        </Callout>
        <Callout tone="rose" title="Klausurfalle">
          Erst alle Traces durchsehen, dann Beziehungen festlegen. Nur eine
          Richtung zu prüfen führt zu falschen Ergebnissen.
        </Callout>
      </div>
    </Card>
  );
}
