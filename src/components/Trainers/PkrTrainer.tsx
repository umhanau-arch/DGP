import { useMemo, useState } from "react";
import { Calculator, RefreshCw } from "lucide-react";
import { Button, Callout, Card, Pill, Stat } from "../UI/Card";

interface PkrProblem {
  total: number;
  fix: number;
  measure: number;
  productAUnits: number;
  productBUnits: number;
  lmnShare: number; // share of fix that is treated as lmn (umlage)
  lmiSum: number; // sum of lmi-tp-kosten
}

function buildProblem(seed: number): PkrProblem {
  const rng = () => {
    seed = (seed * 9301 + 49297) & 0xffffffff;
    return Math.abs(seed % 1000) / 1000;
  };
  const fix = Math.floor(20 + rng() * 40) * 1000;
  const variableShare = Math.floor(60 + rng() * 50) * 1000;
  const total = fix + variableShare;
  const measure = Math.floor(6 + rng() * 7) * 1000;
  const productAUnits = Math.floor(3 + rng() * 7) * 100;
  const productBUnits = Math.floor(8 + rng() * 12) * 100;
  const lmnShare = Math.floor(20 + rng() * 50) * 1000;
  const lmiSum = Math.floor(150 + rng() * 200) * 1000;
  return {
    total,
    fix,
    measure,
    productAUnits,
    productBUnits,
    lmnShare,
    lmiSum,
  };
}

function fmt(n: number) {
  return n.toLocaleString("de-DE", { maximumFractionDigits: 2 });
}

export default function PkrTrainer({
  onRunCounted,
}: {
  onRunCounted?: () => void;
}) {
  const [seed, setSeed] = useState(() => Date.now());
  const problem = useMemo(() => buildProblem(seed), [seed]);
  const [vp, setVp] = useState("");
  const [satz, setSatz] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [showSolution, setShowSolution] = useState(false);

  const variable = problem.total - problem.fix;
  const rate = +(variable / problem.measure).toFixed(2);
  const aCost = +(rate * problem.productAUnits).toFixed(2);
  const bCost = +(rate * problem.productBUnits).toFixed(2);

  function check<T extends string>(
    user: T,
    expected: number,
  ): "ok" | "fail" | "empty" {
    if (!user.trim()) return "empty";
    const num = parseFloat(user.replace(",", "."));
    if (Number.isNaN(num)) return "fail";
    return Math.abs(num - expected) < 1 ? "ok" : "fail";
  }

  function feedbackTone(state: "ok" | "fail" | "empty") {
    if (state === "ok") return "emerald";
    if (state === "fail") return "rose";
    return "slate";
  }

  function feedbackText(state: "ok" | "fail" | "empty", expected: number) {
    if (state === "ok") return "Richtig!";
    if (state === "fail") return `Nicht ganz. Lösung: ${fmt(expected)}.`;
    return "Bitte ausfüllen.";
  }

  const vpState = check(vp, variable);
  const satzState = check(satz, rate);
  const aState = check(a, aCost);
  const bState = check(b, bCost);

  function newProblem() {
    setSeed(Date.now());
    setVp("");
    setSatz("");
    setA("");
    setB("");
    setShowSolution(false);
    onRunCounted?.();
  }

  function showAll() {
    setShowSolution(true);
    onRunCounted?.();
  }

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Pill tone="orange">PKR-Trainer · Schritt-für-Schritt</Pill>
          <h3 className="mt-2 text-2xl font-black flex items-center gap-2">
            <Calculator size={22} /> Prozesskostenrechnung
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Randomisierte Aufgabe. Trage Zwischenwerte ein, prüfe deine Antwort.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={newProblem}>
            <RefreshCw size={16} /> Neue Aufgabe
          </Button>
          <Button variant="primary" onClick={showAll}>
            Lösung zeigen
          </Button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Gesamtkosten" value={`${fmt(problem.total)} EUR`} />
        <Stat label="Fixkosten" value={`${fmt(problem.fix)} EUR`} />
        <Stat label="Maßgröße" value={`${fmt(problem.measure)} Bestellungen`} />
        <Stat
          label="Produkt A / B"
          value={`${problem.productAUnits} / ${problem.productBUnits}`}
          hint="Bestellungen"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <Step
            n={1}
            title="Variable Prozesskosten"
            formula="Variable Kosten = Gesamtkosten − Fixkosten"
            input={vp}
            setInput={setVp}
            placeholder="z. B. 90000"
            unit="EUR"
            state={vpState}
            feedbackTone={feedbackTone(vpState)}
            feedbackText={feedbackText(vpState, variable)}
            showSolution={showSolution}
            solution={`${fmt(problem.total)} − ${fmt(problem.fix)} = ${fmt(variable)}`}
          />
          <Step
            n={2}
            title="Variabler Prozesskostensatz"
            formula="Satz = variable Prozesskosten / Maßgröße"
            input={satz}
            setInput={setSatz}
            placeholder="z. B. 10"
            unit="EUR / Bestellung"
            state={satzState}
            feedbackTone={feedbackTone(satzState)}
            feedbackText={feedbackText(satzState, rate)}
            showSolution={showSolution}
            solution={`${fmt(variable)} / ${fmt(problem.measure)} = ${fmt(rate)}`}
          />
        </div>
        <div className="space-y-3">
          <Step
            n={3}
            title={`Prozesskosten Produkt A (${problem.productAUnits} Bestellungen)`}
            formula="Produktkosten = Menge × Prozesskostensatz"
            input={a}
            setInput={setA}
            placeholder="z. B. 6000"
            unit="EUR"
            state={aState}
            feedbackTone={feedbackTone(aState)}
            feedbackText={feedbackText(aState, aCost)}
            showSolution={showSolution}
            solution={`${problem.productAUnits} × ${fmt(rate)} = ${fmt(aCost)}`}
          />
          <Step
            n={4}
            title={`Prozesskosten Produkt B (${problem.productBUnits} Bestellungen)`}
            formula="Produktkosten = Menge × Prozesskostensatz"
            input={b}
            setInput={setB}
            placeholder="z. B. 14000"
            unit="EUR"
            state={bState}
            feedbackTone={feedbackTone(bState)}
            feedbackText={feedbackText(bState, bCost)}
            showSolution={showSolution}
            solution={`${problem.productBUnits} × ${fmt(rate)} = ${fmt(bCost)}`}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <Callout title="Bonus · Umlage für lmn" tone="amber">
          Für eine vollständige PKR addierst du noch einen Umlagesatz:
          <br />
          <code className="font-mono">
            Umlage = lmn-Kosten / Σ lmi-Teilprozesskosten × lmi-Satz
          </code>
          <br />
          Beispiel: lmn = {fmt(problem.lmnShare)} EUR, Σ lmi-TP-Kosten ={" "}
          {fmt(problem.lmiSum)} EUR, lmi-Satz = {fmt(rate)} EUR/Bestellung →
          Umlagesatz = {fmt((problem.lmnShare / problem.lmiSum) * rate)} EUR/Bestellung.
          Gesamter Prozesskostensatz ={" "}
          {fmt(rate + (problem.lmnShare / problem.lmiSum) * rate)} EUR/Bestellung.
        </Callout>
        <Callout title="Klausur-Fallen vermeiden" tone="rose">
          <ul className="ml-5 list-disc">
            <li>Gesamtkosten direkt durch Maßgröße teilen → falsch.</li>
            <li>Produktmenge mit Maßgröße verwechseln.</li>
            <li>lmn-Umlage nicht vergessen.</li>
            <li>Zwischenwerte IMMER hinschreiben.</li>
          </ul>
        </Callout>
      </div>
    </Card>
  );
}

function Step({
  n,
  title,
  formula,
  input,
  setInput,
  placeholder,
  unit,
  state,
  feedbackTone,
  feedbackText,
  showSolution,
  solution,
}: {
  n: number;
  title: string;
  formula: string;
  input: string;
  setInput: (v: string) => void;
  placeholder: string;
  unit: string;
  state: "ok" | "fail" | "empty";
  feedbackTone: string;
  feedbackText: string;
  showSolution: boolean;
  solution: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
          {n}
        </span>
        <p className="font-black">{title}</p>
      </div>
      <p className="mt-1 ml-9 text-xs text-slate-600 dark:text-slate-300">
        {formula}
      </p>
      <div className="mt-2 ml-9 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="w-40 rounded-md border border-slate-300 bg-white px-2 py-1 text-sm font-mono dark:border-slate-700 dark:bg-slate-900"
        />
        <span className="text-xs text-slate-500">{unit}</span>
      </div>
      {state !== "empty" && (
        <p
          className={`ml-9 mt-2 text-xs font-bold ${
            feedbackTone === "emerald"
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-rose-600 dark:text-rose-400"
          }`}
        >
          {feedbackText}
        </p>
      )}
      {showSolution && (
        <p className="ml-9 mt-1 text-xs italic text-slate-500">
          Lösungsweg: {solution}
        </p>
      )}
    </div>
  );
}
