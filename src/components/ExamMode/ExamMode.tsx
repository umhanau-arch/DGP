import { useEffect, useMemo, useState } from "react";
import {
  Clock,
  Download,
  Eye,
  EyeOff,
  RotateCcw,
  ShieldCheck,
  Timer,
} from "lucide-react";
import {
  exportExamAsText,
  generateExam,
  type GeneratedExam,
} from "../../data/examGenerator";
import type { ProgressState } from "../../types";
import { Button, Callout, Card, Pill } from "../UI/Card";

interface Props {
  progress: ProgressState;
  onProgressChange: (p: ProgressState) => void;
}

const TIMER_OPTIONS = [
  { label: "30 min Sprint", minutes: 30 },
  { label: "60 min Halbklausur", minutes: 60 },
  { label: "90 min Vollklausur", minutes: 90 },
];

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
    const userText = exam.blocks
      .map(
        (b) =>
          `=== ${b.block} ===\nFrage: ${b.prompt}\n\nDeine Antwort:\n${
            answers[b.block] ?? "(leer)"
          }\n`,
      )
      .join("\n");
    const combined =
      "DGP Klausur · Antworten + Aufgaben\n" +
      `Seed: ${exam.seed}\nGesamtpunkte: ${exam.totalPoints}\n\n` +
      userText +
      "\n\n--- Aufgaben & ggf. Musterlösung ---\n\n" +
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
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Pill tone="rose">Klausurmodus</Pill>
            <h2 className="mt-2 text-3xl font-black">Random-Klausur (8 Aufgaben)</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Reset erzeugt eine neue Klausur. Antworten als Text exportieren -
              auch für KI-Korrektur.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="brand">{exam.totalPoints} Punkte</Pill>
            <Pill tone="slate">Seed: {exam.seed}</Pill>
            <Button onClick={newExam} variant="primary">
              <RotateCcw size={16} /> Neue Klausur
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
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
                {minutes}:{seconds} verbleibend
              </Pill>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => setShowSolutions(!showSolutions)}
          >
            {showSolutions ? <EyeOff size={16} /> : <Eye size={16} />}{" "}
            {showSolutions ? "Lösungen ausblenden" : "Lösungen einblenden"}
          </Button>
          <Button variant="secondary" onClick={() => exportText(false)}>
            <Download size={16} /> Export ohne Lösung
          </Button>
          <Button variant="secondary" onClick={() => exportText(true)}>
            <Download size={16} /> Export mit Lösung
          </Button>
        </div>
      </Card>

      <div className="grid gap-3">
        {exam.blocks.map((block) => {
          const answer = answers[block.block] ?? "";
          return (
            <Card key={block.block}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <Pill tone="brand">{block.block}</Pill>
                  <h3 className="mt-2 text-xl font-black">{block.title}</h3>
                </div>
                <Pill tone="amber">{block.points} Punkte</Pill>
              </div>
              <p className="mt-2 text-sm leading-relaxed">{block.prompt}</p>
              <textarea
                value={answer}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, [block.block]: e.target.value }))
                }
                placeholder="Deine Antwort..."
                rows={5}
                className="mt-3 w-full rounded-lg border border-slate-300 bg-white p-2 text-sm font-mono dark:border-slate-700 dark:bg-slate-900"
              />
              {showSolutions && (
                <div className="mt-3 space-y-2">
                  <Callout tone="emerald" title="Musterlösung">
                    {block.expected}
                  </Callout>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                      <ShieldCheck size={12} className="mr-1 inline" /> Bewertungspunkte
                    </p>
                    <ul className="ml-5 list-disc text-sm">
                      {block.grading.map((g) => (
                        <li key={g}>{g}</li>
                      ))}
                    </ul>
                  </div>
                  {block.commonErrors.length > 0 && (
                    <Callout tone="rose" title="Typische Fehler">
                      <ul className="ml-5 list-disc">
                        {block.commonErrors.map((e) => (
                          <li key={e}>{e}</li>
                        ))}
                      </ul>
                    </Callout>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <Card>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Tipp: Exportiere deine Antworten als Text und lass sie von einer
          KI-Korrektur prüfen. Mit Bewertungspunkten kannst du gezielt nacharbeiten.
        </p>
      </Card>
    </div>
  );
}
