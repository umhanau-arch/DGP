import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CircleHelp,
  Lightbulb,
  ListChecks,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { chapters, chapterById } from "../../data/chapters";
import type {
  ChapterDefinition,
  ChapterId,
  LearningBlock,
  ProgressState,
} from "../../types";
import { Button, Callout, Card, Pill, ProgressBar } from "../UI/Card";
import { VisualBlock } from "../Visuals/VisualBlock";
import PetriTrainer from "../Trainers/PetriTrainer";
import PkrTrainer from "../Trainers/PkrTrainer";
import MiningTrainer from "../Trainers/MiningTrainer";
import BpmnTrainer from "../Trainers/BpmnTrainer";

type StepKey =
  | { kind: "overview" }
  | { kind: "group"; groupIndex: number; blockIndex: number }
  | { kind: "trainer"; trainer: string }
  | { kind: "quiz"; quizIndex: number }
  | { kind: "tasks" }
  | { kind: "summary" };

function buildSteps(chapter: ChapterDefinition): StepKey[] {
  const steps: StepKey[] = [];
  steps.push({ kind: "overview" });
  chapter.groups.forEach((g, gi) => {
    g.blocks.forEach((_, bi) => {
      steps.push({ kind: "group", groupIndex: gi, blockIndex: bi });
    });
  });
  if (chapter.trainers && chapter.trainers.length) {
    chapter.trainers.forEach((tk) =>
      steps.push({ kind: "trainer", trainer: tk }),
    );
  }
  chapter.quiz.forEach((_, qi) => steps.push({ kind: "quiz", quizIndex: qi }));
  steps.push({ kind: "tasks" });
  steps.push({ kind: "summary" });
  return steps;
}

interface Props {
  progress: ProgressState;
  onProgressChange: (p: ProgressState) => void;
  onCompleteChapter: (id: ChapterId) => void;
  onJumpToExam: () => void;
}

export default function GuidedMode({
  progress,
  onProgressChange,
  onCompleteChapter,
  onJumpToExam,
}: Props) {
  const [chapterId, setChapterId] = useState<ChapterId>(progress.lastChapter);
  const chapter = chapterById(chapterId);
  const steps = useMemo(() => buildSteps(chapter), [chapter]);
  const [stepIndex, setStepIndex] = useState<number>(() =>
    Math.min(progress.lastStep ?? 0, steps.length - 1),
  );

  useEffect(() => {
    setStepIndex((idx) => Math.min(idx, steps.length - 1));
  }, [steps.length]);

  useEffect(() => {
    onProgressChange({
      ...progress,
      lastChapter: chapterId,
      lastStep: stepIndex,
      chapterProgress: {
        ...progress.chapterProgress,
        [chapterId]: Math.round(((stepIndex + 1) / steps.length) * 100),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId, stepIndex, steps.length]);

  function gotoChapter(id: ChapterId) {
    setChapterId(id);
    setStepIndex(0);
  }

  function nextStep() {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      onCompleteChapter(chapterId);
      const idx = chapters.findIndex((c) => c.id === chapterId);
      if (idx < chapters.length - 1) {
        gotoChapter(chapters[idx + 1].id);
      }
    }
  }
  function prevStep() {
    setStepIndex((s) => Math.max(0, s - 1));
  }

  const currentStep = steps[stepIndex] ?? { kind: "overview" };

  return (
    <div className="grid gap-5 xl:grid-cols-[300px_1fr]">
      <ChapterNavigation
        chapters={chapters}
        currentId={chapterId}
        progress={progress}
        onSelect={gotoChapter}
      />

      <div className="space-y-4">
        <ChapterHeader
          chapter={chapter}
          stepIndex={stepIndex}
          stepsTotal={steps.length}
          onJumpToExam={onJumpToExam}
        />

        <motion.div
          key={`${chapterId}-${stepIndex}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <StepRenderer
            chapter={chapter}
            step={currentStep}
            progress={progress}
            onProgressChange={onProgressChange}
          />
        </motion.div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <Button variant="secondary" onClick={prevStep} disabled={stepIndex === 0}>
            <ArrowLeft size={16} /> Zurück
          </Button>
          <div className="text-xs text-slate-500">
            Schritt {stepIndex + 1} von {steps.length}
          </div>
          <Button onClick={nextStep} variant="primary" size="lg">
            {stepIndex === steps.length - 1 ? "Kapitel abschließen" : "Weiter"}{" "}
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ChapterNavigation({
  chapters,
  currentId,
  progress,
  onSelect,
}: {
  chapters: ChapterDefinition[];
  currentId: ChapterId;
  progress: ProgressState;
  onSelect: (id: ChapterId) => void;
}) {
  return (
    <Card padding="p-3" className="self-start">
      <p className="px-2 text-xs font-black uppercase tracking-wide text-slate-500">
        Kapitel
      </p>
      <div className="mt-2 space-y-1">
        {chapters.map((c) => {
          const isActive = c.id === currentId;
          const value = progress.chapterProgress[c.id] ?? 0;
          const done = progress.completedChapters.includes(c.id);
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                isActive
                  ? "border-brand-500 bg-brand-50 text-brand-900 dark:bg-brand-950/40 dark:text-brand-100"
                  : "border-slate-200 bg-white hover:border-brand-300 dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-black">
                  {c.number}. {c.title}
                </span>
                {done ? (
                  <CheckCircle2 size={14} className="text-emerald-500" />
                ) : (
                  <span className="text-xs">{value}%</span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {c.subtitle}
              </p>
              <div className="mt-2">
                <ProgressBar value={value} tone={done ? "emerald" : "brand"} />
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function ChapterHeader({
  chapter,
  stepIndex,
  stepsTotal,
  onJumpToExam,
}: {
  chapter: ChapterDefinition;
  stepIndex: number;
  stepsTotal: number;
  onJumpToExam: () => void;
}) {
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="brand">Kapitel {chapter.number}</Pill>
            <Pill tone={chapter.priority === "A" ? "rose" : chapter.priority === "B" ? "amber" : "slate"}>
              Priorität {chapter.priority}
            </Pill>
            <Pill tone="violet">{chapter.examReference}</Pill>
          </div>
          <h2 className="mt-2 text-3xl font-black text-balance">{chapter.title}</h2>
          <p className="mt-1 text-slate-600 dark:text-slate-300">
            {chapter.subtitle}
          </p>
        </div>
        <Button variant="secondary" onClick={onJumpToExam}>
          <Target size={16} /> Klausurmodus
        </Button>
      </div>
      <div className="mt-3">
        <ProgressBar value={((stepIndex + 1) / stepsTotal) * 100} />
      </div>
    </Card>
  );
}

function StepRenderer({
  chapter,
  step,
  progress,
  onProgressChange,
}: {
  chapter: ChapterDefinition;
  step: StepKey;
  progress: ProgressState;
  onProgressChange: (p: ProgressState) => void;
}) {
  if (step.kind === "overview") return <OverviewStep chapter={chapter} />;
  if (step.kind === "group") {
    const block = chapter.groups[step.groupIndex].blocks[step.blockIndex];
    const groupTitle = chapter.groups[step.groupIndex].title;
    return (
      <BlockStep
        block={block}
        groupTitle={groupTitle}
        progress={progress}
        onProgressChange={onProgressChange}
      />
    );
  }
  if (step.kind === "trainer") {
    return <TrainerStep trainer={step.trainer} onCount={(k) => {
      const patch: Partial<ProgressState> = {};
      if (k === "petri") patch.petriRuns = (progress.petriRuns ?? 0) + 1;
      if (k === "pkr") patch.pkrRuns = (progress.pkrRuns ?? 0) + 1;
      if (k === "bpmn") patch.bpmnRuns = (progress.bpmnRuns ?? 0) + 1;
      if (k === "mining") patch.miningRuns = (progress.miningRuns ?? 0) + 1;
      if (Object.keys(patch).length) onProgressChange({ ...progress, ...patch });
    }} />;
  }
  if (step.kind === "quiz") {
    const item = chapter.quiz[step.quizIndex];
    return (
      <QuizStep
        index={step.quizIndex}
        total={chapter.quiz.length}
        item={item}
        progress={progress}
        onProgressChange={onProgressChange}
      />
    );
  }
  if (step.kind === "tasks") return <TasksStep chapter={chapter} />;
  if (step.kind === "summary") return <SummaryStep chapter={chapter} />;
  return null;
}

function OverviewStep({ chapter }: { chapter: ChapterDefinition }) {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <BookOpen className="mt-1 text-brand-600" size={24} />
        <div>
          <h3 className="text-2xl font-black">Worum geht es?</h3>
          <p className="mt-2 text-slate-700 dark:text-slate-300">
            {chapter.whyImportant}
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <Callout title="Lernziele" tone="brand">
          <ul className="ml-5 list-disc space-y-1">
            {chapter.learningGoals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </Callout>
        <Callout title="Klausurtipp" tone="emerald">
          {chapter.examTip}
        </Callout>
      </div>
      <Callout title="Häufige Fehler" tone="rose">
        <ul className="ml-5 list-disc space-y-1">
          {chapter.commonMistakes.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </Callout>
    </Card>
  );
}

function BlockStep({
  block,
  groupTitle,
  progress,
  onProgressChange,
}: {
  block: LearningBlock;
  groupTitle: string;
  progress: ProgressState;
  onProgressChange: (p: ProgressState) => void;
}) {
  const [revealed, setRevealed] = useState<number | null>(null);

  function answer(index: number) {
    if (!block.miniCheck) return;
    setRevealed(index);
    const correct = block.miniCheck.correctIndex === index;
    onProgressChange({
      ...progress,
      miniCheckScore: {
        right: progress.miniCheckScore.right + (correct ? 1 : 0),
        wrong: progress.miniCheckScore.wrong + (correct ? 0 : 1),
      },
      xp: progress.xp + (correct ? 5 : 0),
    });
  }

  return (
    <Card>
      <div className="flex flex-wrap items-center gap-2">
        <Pill tone="slate">{groupTitle}</Pill>
        {block.exam && <Pill tone="amber">Klausur</Pill>}
      </div>
      <h3 className="mt-2 text-3xl font-black text-balance">{block.title}</h3>
      <p className="mt-1 text-base text-slate-600 dark:text-slate-300">
        {block.intro}
      </p>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <Callout tone="brand" title="Einfach erklärt">
          {block.simple}
        </Callout>
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">
            Tiefer
          </p>
          <p className="mt-1 text-sm leading-relaxed">{block.detail}</p>
        </div>
      </div>

      {block.bullets && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {block.bullets.map((b) => (
            <div
              key={b}
              className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <Sparkles size={16} className="mt-0.5 text-brand-500" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      )}

      {block.table && (
        <div className="mt-4 overflow-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-900">
              <tr>
                {block.table[0].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.slice(1).map((row, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-100 dark:border-slate-900"
                >
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 align-top">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {block.example && (
        <Callout tone="violet" title="Beispiel">
          {block.example}
        </Callout>
      )}

      {block.visual && (
        <div className="mt-4">
          <VisualBlock visual={block.visual} />
        </div>
      )}

      <div className="mt-3 grid gap-2 lg:grid-cols-2">
        {block.mnemonic && (
          <Callout tone="emerald" title="Merksatz">
            <span className="font-black">{block.mnemonic}</span>
          </Callout>
        )}
        {block.trap && (
          <Callout tone="rose" title="Falle">
            <span>{block.trap}</span>
          </Callout>
        )}
      </div>
      {block.exam && (
        <Callout tone="amber" title="Klausurbezug">
          {block.exam}
        </Callout>
      )}

      {block.miniCheck && (
        <div className="mt-4 rounded-lg border border-brand-200 bg-brand-50 p-4 dark:border-brand-900 dark:bg-brand-950/40">
          <p className="flex items-center gap-2 text-sm font-black text-brand-800 dark:text-brand-100">
            <CircleHelp size={16} /> Mini-Check
          </p>
          <p className="mt-1 text-sm">{block.miniCheck.prompt}</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {block.miniCheck.options.map((opt, i) => {
              const isCorrect = i === block.miniCheck!.correctIndex;
              const isSelected = revealed === i;
              let cls =
                "border-slate-200 bg-white hover:border-brand-400 dark:border-slate-700 dark:bg-slate-900";
              if (revealed !== null) {
                if (isCorrect)
                  cls =
                    "border-emerald-400 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100";
                else if (isSelected)
                  cls =
                    "border-rose-400 bg-rose-50 text-rose-900 dark:bg-rose-900/30 dark:text-rose-100";
              }
              return (
                <button
                  key={opt}
                  onClick={() => answer(i)}
                  disabled={revealed !== null}
                  className={`rounded-lg border p-2 text-left text-sm font-semibold transition ${cls}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {revealed !== null && (
            <p className="mt-2 text-sm">
              <Lightbulb className="mr-1 inline" size={14} />
              {block.miniCheck.explain}
            </p>
          )}
        </div>
      )}
    </Card>
  );
}

function TrainerStep({
  trainer,
  onCount,
}: {
  trainer: string;
  onCount: (kind: string) => void;
}) {
  if (trainer === "petri")
    return <PetriTrainer onRunCounted={() => onCount("petri")} />;
  if (trainer === "pkr") return <PkrTrainer onRunCounted={() => onCount("pkr")} />;
  if (trainer === "mining")
    return <MiningTrainer onRunCounted={() => onCount("mining")} />;
  if (trainer === "bpmn")
    return <BpmnTrainer onRunCounted={() => onCount("bpmn")} />;
  if (trainer === "exam-blueprint")
    return (
      <Card>
        <Pill tone="rose">Klausur-Blueprint</Pill>
        <h3 className="mt-2 text-2xl font-black">Trainings-Strategie</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Schau dir den Klausuraufbau an und plane deine Reihenfolge.
        </p>
        <div className="mt-3">
          <VisualBlock visual="exam-blueprint" />
        </div>
      </Card>
    );
  return null;
}

function QuizStep({
  index,
  total,
  item,
  progress,
  onProgressChange,
}: {
  index: number;
  total: number;
  item: { question: string; answer: string; why?: string };
  progress: ProgressState;
  onProgressChange: (p: ProgressState) => void;
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Pill tone="amber">Kapitelquiz · {index + 1} / {total}</Pill>
        <div className="text-xs text-slate-500">
          Score: {progress.quizScore.right}✓ / {progress.quizScore.wrong}✗
        </div>
      </div>
      <h3 className="mt-2 text-2xl font-black">{item.question}</h3>
      {!revealed ? (
        <div className="mt-3">
          <Button variant="primary" onClick={() => setRevealed(true)}>
            Antwort anzeigen
          </Button>
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          <Callout tone="brand" title="Musterantwort">
            {item.answer}
          </Callout>
          {item.why && (
            <p className="text-sm text-slate-500">
              <Lightbulb size={14} className="mr-1 inline" />
              {item.why}
            </p>
          )}
          <div className="flex gap-2">
            <Button
              variant="success"
              onClick={() => {
                onProgressChange({
                  ...progress,
                  quizScore: {
                    right: progress.quizScore.right + 1,
                    wrong: progress.quizScore.wrong,
                  },
                  xp: progress.xp + 4,
                });
                setRevealed(false);
              }}
            >
              <CheckCircle2 size={16} /> Gewusst
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                onProgressChange({
                  ...progress,
                  quizScore: {
                    right: progress.quizScore.right,
                    wrong: progress.quizScore.wrong + 1,
                  },
                });
                setRevealed(false);
              }}
            >
              Nicht gewusst
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

function TasksStep({ chapter }: { chapter: ChapterDefinition }) {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <ListChecks className="mt-1 text-brand-600" size={24} />
        <div>
          <h3 className="text-2xl font-black">Übungsaufgaben</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Klausurnahe Aufgaben mit Lösungsweg.
          </p>
        </div>
      </div>
      <div className="mt-3 space-y-3">
        {chapter.tasks.map((task) => (
          <details
            key={task.id}
            className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <summary className="cursor-pointer text-base font-black">
              {task.prompt}
            </summary>
            <div className="mt-3 space-y-2">
              <Callout tone="emerald" title="Erwartete Antwort">
                {task.expected}
              </Callout>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                  Lösungsschritte
                </p>
                <ol className="mt-2 ml-5 list-decimal text-sm">
                  {task.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              </div>
              {task.trap && (
                <Callout tone="rose" title="Falle">
                  {task.trap}
                </Callout>
              )}
              {task.exam && <p className="text-xs italic text-slate-500">Bezug: {task.exam}</p>}
            </div>
          </details>
        ))}
      </div>
    </Card>
  );
}

function SummaryStep({ chapter }: { chapter: ChapterDefinition }) {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <Trophy className="mt-1 text-amber-500" size={28} />
        <div>
          <h3 className="text-2xl font-black">Kapitel abgeschlossen</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Du hast Kapitel {chapter.number} - {chapter.title} durchgearbeitet.
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <Callout tone="brand" title="Was du jetzt kannst">
          <ul className="ml-5 list-disc space-y-1">
            {chapter.learningGoals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </Callout>
        <Callout tone="rose" title="Achte besonders auf">
          <ul className="ml-5 list-disc space-y-1">
            {chapter.commonMistakes.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </Callout>
      </div>
      <Callout tone="emerald" title="Nächster Schritt">
        Klick auf <b>Weiter</b>, um automatisch in das nächste Kapitel zu
        wechseln. Oder gehe in den Klausurmodus, wenn du Theorie und Trainer
        durchhast.
      </Callout>
    </Card>
  );
}
