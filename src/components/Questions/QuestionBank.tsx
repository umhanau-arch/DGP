import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  Filter,
  Library,
  RotateCcw,
  Search,
  Star,
  Trash2,
  XCircle,
} from "lucide-react";
import {
  QUESTION_BANK,
  QUESTION_DIFFICULTIES,
  QUESTION_TOPICS,
} from "../../data/questionBank";
import type {
  ProgressState,
  QuestionDifficulty,
  QuestionItem,
  QuestionStatus,
  QuestionTopic,
} from "../../types";
import { Button, Callout, Card, Pill, ProgressBar, Stat } from "../UI/Card";
import {
  recordQuestionAnswer,
  resetQuestionStatus,
  toggleQuestionStar,
} from "../../utils/storage";

type StatusFilter = "alle" | "unbeantwortet" | "richtig" | "falsch" | "markiert";
type Mode = "browse" | "session" | "review";

interface Props {
  progress: ProgressState;
  onProgressChange: (p: ProgressState) => void;
}

export default function QuestionBank({ progress, onProgressChange }: Props) {
  const [topicFilter, setTopicFilter] = useState<Set<QuestionTopic>>(new Set());
  const [diffFilter, setDiffFilter] = useState<Set<QuestionDifficulty>>(
    new Set(),
  );
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("alle");
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<Mode>("browse");

  const filtered = useMemo(() => {
    return QUESTION_BANK.filter((q) => {
      if (topicFilter.size > 0 && !topicFilter.has(q.topic)) return false;
      if (diffFilter.size > 0 && !diffFilter.has(q.difficulty)) return false;
      const status = progress.questionStatus[q.id];
      const answered = !!status && (status.right > 0 || status.wrong > 0);
      const morewrong = !!status && status.wrong > status.right;
      const moreright = !!status && status.right > status.wrong;
      const starred = !!status?.starred;
      if (statusFilter === "unbeantwortet" && answered) return false;
      if (statusFilter === "richtig" && !moreright) return false;
      if (statusFilter === "falsch" && !(morewrong || starred)) return false;
      if (statusFilter === "markiert" && !starred) return false;
      if (search.trim()) {
        const s = search.toLowerCase();
        if (
          !q.question.toLowerCase().includes(s) &&
          !q.answer.toLowerCase().includes(s) &&
          !q.topic.toLowerCase().includes(s)
        )
          return false;
      }
      return true;
    });
  }, [topicFilter, diffFilter, statusFilter, search, progress.questionStatus]);

  const stats = useMemo(() => {
    let answered = 0;
    let right = 0;
    let wrong = 0;
    let starred = 0;
    for (const q of QUESTION_BANK) {
      const s = progress.questionStatus[q.id];
      if (!s) continue;
      if (s.right > 0 || s.wrong > 0) answered++;
      right += s.right;
      wrong += s.wrong;
      if (s.starred) starred++;
    }
    return { answered, right, wrong, starred };
  }, [progress.questionStatus]);

  const total = QUESTION_BANK.length;
  const successRate =
    stats.right + stats.wrong > 0
      ? Math.round((stats.right / (stats.right + stats.wrong)) * 100)
      : 0;

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Pill tone="brand">Fragenkatalog</Pill>
            <h2 className="mt-2 flex items-center gap-2 text-3xl font-black">
              <Library size={26} /> Alle Fragen an einem Ort
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {total} Fragen aus Kapiteln, Trainern, Lernzetteln und PDFs.
              Filter, lerne Sessions, wiederhole falsche.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={mode === "browse" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setMode("browse")}
            >
              Browse
            </Button>
            <Button
              variant={mode === "session" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setMode("session")}
            >
              Lernsession
            </Button>
            <Button
              variant={mode === "review" ? "primary" : "secondary"}
              size="sm"
              onClick={() => {
                setMode("review");
                setStatusFilter("falsch");
              }}
            >
              Falsche wiederholen
            </Button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Gesamt" value={total.toString()} />
          <Stat
            label="Beantwortet"
            value={`${stats.answered} (${total > 0 ? Math.round((stats.answered / total) * 100) : 0}%)`}
          />
          <Stat
            label="Erfolgsquote"
            value={`${successRate}%`}
            hint={`${stats.right}✓ / ${stats.wrong}✗`}
          />
          <Stat label="Markiert ⭐" value={stats.starred.toString()} />
        </div>

        <div className="mt-3">
          <ProgressBar value={total > 0 ? (stats.answered / total) * 100 : 0} />
        </div>
      </Card>

      <Card padding="p-4">
        <div className="flex items-start gap-3">
          <Filter size={18} className="mt-1 text-slate-500" />
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Themen
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {QUESTION_TOPICS.map((t) => {
                  const sel = topicFilter.has(t);
                  return (
                    <button
                      key={t}
                      onClick={() => {
                        const next = new Set(topicFilter);
                        if (sel) next.delete(t);
                        else next.add(t);
                        setTopicFilter(next);
                      }}
                      className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                        sel
                          ? "bg-brand-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
                {topicFilter.size > 0 && (
                  <button
                    onClick={() => setTopicFilter(new Set())}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    × leeren
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Schwierigkeit
                </p>
                <div className="mt-1 flex gap-1">
                  {QUESTION_DIFFICULTIES.map((d) => {
                    const sel = diffFilter.has(d);
                    return (
                      <button
                        key={d}
                        onClick={() => {
                          const next = new Set(diffFilter);
                          if (sel) next.delete(d);
                          else next.add(d);
                          setDiffFilter(next);
                        }}
                        className={`rounded-md px-3 py-1 text-xs font-bold ${
                          sel
                            ? "bg-amber-500 text-white"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Status
                </p>
                <div className="mt-1 flex gap-1">
                  {(["alle", "unbeantwortet", "richtig", "falsch", "markiert"] as StatusFilter[]).map(
                    (s) => (
                      <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`rounded-md px-3 py-1 text-xs font-bold ${
                          statusFilter === s
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        }`}
                      >
                        {s}
                      </button>
                    ),
                  )}
                </div>
              </div>
              <div className="ml-auto flex items-end gap-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Suche
                  </p>
                  <div className="mt-1 flex items-center gap-2 rounded-md border border-slate-300 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-900">
                    <Search size={14} className="text-slate-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Begriff..."
                      className="w-32 bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          {filtered.length} von {total} Fragen entsprechen den Filtern.
        </p>
      </Card>

      {mode === "browse" || mode === "review" ? (
        <BrowseList
          items={filtered}
          progress={progress}
          onProgressChange={onProgressChange}
        />
      ) : (
        <Session
          items={filtered}
          progress={progress}
          onProgressChange={onProgressChange}
        />
      )}
    </div>
  );
}

function BrowseList({
  items,
  progress,
  onProgressChange,
}: {
  items: QuestionItem[];
  progress: ProgressState;
  onProgressChange: (p: ProgressState) => void;
}) {
  if (items.length === 0) {
    return (
      <Callout tone="brand" title="Keine Fragen passen">
        Passe die Filter oben an, um Fragen anzuzeigen.
      </Callout>
    );
  }
  return (
    <div className="space-y-2">
      {items.map((q) => (
        <QuestionRow
          key={q.id}
          q={q}
          status={progress.questionStatus[q.id]}
          onAnswer={(correct) =>
            onProgressChange(recordQuestionAnswer(progress, q.id, correct))
          }
          onStar={() => onProgressChange(toggleQuestionStar(progress, q.id))}
          onReset={() => onProgressChange(resetQuestionStatus(progress, q.id))}
        />
      ))}
    </div>
  );
}

function QuestionRow({
  q,
  status,
  onAnswer,
  onStar,
  onReset,
}: {
  q: QuestionItem;
  status: QuestionStatus | undefined;
  onAnswer: (correct: boolean) => void;
  onStar: () => void;
  onReset: () => void;
}) {
  const [open, setOpen] = useState(false);
  const correct = (status?.right ?? 0) > (status?.wrong ?? 0);
  const wrong = (status?.wrong ?? 0) > (status?.right ?? 0);
  const tone = correct
    ? "border-emerald-200 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/20"
    : wrong
      ? "border-rose-200 bg-rose-50/40 dark:border-rose-900 dark:bg-rose-950/20"
      : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950";

  return (
    <div className={`rounded-xl border p-3 ${tone}`}>
      <div className="flex flex-wrap items-center gap-2">
        <Pill tone="slate">{q.topic}</Pill>
        <Pill tone={q.difficulty === "schwer" ? "rose" : q.difficulty === "leicht" ? "emerald" : "amber"}>
          {q.difficulty}
        </Pill>
        {q.source && <span className="text-[11px] italic text-slate-500">{q.source}</span>}
        <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
          {status && (status.right > 0 || status.wrong > 0) && (
            <span>
              {status.right}✓ / {status.wrong}✗
            </span>
          )}
          <button
            onClick={onStar}
            className={`rounded p-1 ${status?.starred ? "text-amber-500" : "text-slate-400 hover:text-amber-500"}`}
            title="markieren"
          >
            <Star size={16} fill={status?.starred ? "currentColor" : "none"} />
          </button>
          {status && (status.right > 0 || status.wrong > 0 || status.starred) && (
            <button
              onClick={onReset}
              className="rounded p-1 text-slate-400 hover:text-rose-500"
              title="Status zurücksetzen"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="mt-2 flex w-full items-start gap-2 text-left text-base font-bold"
      >
        <ChevronRight
          size={16}
          className={`mt-1 transition ${open ? "rotate-90" : ""}`}
        />
        <span>{q.question}</span>
      </button>
      {open && (
        <div className="ml-6 mt-2 space-y-2">
          {q.choices && (
            <ul className="space-y-1 text-sm">
              {q.choices.map((c, i) => (
                <li
                  key={c}
                  className={
                    i === q.correctChoice
                      ? "rounded bg-emerald-100 px-2 py-1 font-semibold text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100"
                      : "rounded px-2 py-1 text-slate-700 dark:text-slate-200"
                  }
                >
                  {String.fromCharCode(65 + i)}. {c}
                </li>
              ))}
            </ul>
          )}
          <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Antwort
            </p>
            <p className="mt-1 leading-relaxed">{q.answer}</p>
            {q.why && <p className="mt-2 text-xs italic text-slate-500">{q.why}</p>}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="success" size="sm" onClick={() => onAnswer(true)}>
              <CheckCircle2 size={14} /> Gewusst
            </Button>
            <Button variant="danger" size="sm" onClick={() => onAnswer(false)}>
              <XCircle size={14} /> Nicht gewusst
            </Button>
            <Button variant="secondary" size="sm" onClick={onStar}>
              <Star size={14} /> {status?.starred ? "Stern entfernen" : "Markieren"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Session({
  items,
  progress,
  onProgressChange,
}: {
  items: QuestionItem[];
  progress: ProgressState;
  onProgressChange: (p: ProgressState) => void;
}) {
  const [shuffled] = useState(() => shuffle([...items]));
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);

  if (items.length === 0) {
    return (
      <Callout tone="brand" title="Keine Fragen für die Session">
        Passe die Filter oben an, um eine Lernsession zu starten.
      </Callout>
    );
  }

  if (idx >= shuffled.length) {
    const score = right + wrong > 0 ? Math.round((right / (right + wrong)) * 100) : 0;
    return (
      <Card>
        <h3 className="text-2xl font-black">Session abgeschlossen</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Du hast {right} richtig und {wrong} falsch beantwortet ({score}%).
        </p>
        <div className="mt-3">
          <Button onClick={() => location.reload()} variant="primary">
            <RotateCcw size={14} /> Neue Session starten
          </Button>
        </div>
      </Card>
    );
  }

  const q = shuffled[idx];

  function answer(correct: boolean) {
    onProgressChange(recordQuestionAnswer(progress, q.id, correct));
    if (correct) setRight((r) => r + 1);
    else setWrong((w) => w + 1);
    setRevealed(false);
    setIdx((i) => i + 1);
  }

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Pill tone="brand">
          Frage {idx + 1} / {shuffled.length}
        </Pill>
        <div className="text-xs text-slate-500">
          {right}✓ / {wrong}✗
        </div>
      </div>
      <div className="mt-2">
        <ProgressBar value={(idx / shuffled.length) * 100} />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Pill tone="slate">{q.topic}</Pill>
        <Pill tone={q.difficulty === "schwer" ? "rose" : q.difficulty === "leicht" ? "emerald" : "amber"}>
          {q.difficulty}
        </Pill>
        {q.source && <span className="text-[11px] italic text-slate-500">{q.source}</span>}
      </div>
      <h3 className="mt-3 text-xl font-black">{q.question}</h3>
      {q.choices && (
        <ul className="mt-3 space-y-1 text-sm">
          {q.choices.map((c, i) => (
            <li
              key={c}
              className={
                revealed && i === q.correctChoice
                  ? "rounded bg-emerald-100 px-2 py-1 font-semibold text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100"
                  : "rounded px-2 py-1 text-slate-700 dark:text-slate-200"
              }
            >
              {String.fromCharCode(65 + i)}. {c}
            </li>
          ))}
        </ul>
      )}
      {!revealed ? (
        <div className="mt-3">
          <Button onClick={() => setRevealed(true)} variant="primary">
            Antwort anzeigen
          </Button>
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          <Callout tone="brand" title="Antwort">
            {q.answer}
          </Callout>
          {q.why && <p className="text-xs italic text-slate-500">{q.why}</p>}
          <div className="flex gap-2">
            <Button variant="success" onClick={() => answer(true)}>
              <CheckCircle2 size={16} /> Gewusst
            </Button>
            <Button variant="danger" onClick={() => answer(false)}>
              <XCircle size={16} /> Nicht gewusst
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
