"use client";

import { MeaningText } from "@/components/MeaningText";
import clsx from "clsx";
import { motion, useAnimationControls } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ChevronsRight, RotateCcw, Shuffle, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ConfidenceButtons } from "@/components/ConfidenceButtons";
import { Flashcard } from "@/components/Flashcard";
import { useLibrary } from "@/components/LibraryProvider";
import { MultipleChoice } from "@/components/MultipleChoice";
import { TypingQuiz } from "@/components/TypingQuiz";
import { Button, Empty, Panel, Segmented, Spinner } from "@/components/ui";
import type { TypingField } from "@/lib/answerCheck";
import { recordReview } from "@/lib/data";
import { buildQuestion, type McDirection } from "@/lib/distractors";
import { buildSession, currentUnit, nextPosition, unitLabel, type SessionKind, type Track } from "@/lib/curriculum";
import { filterCards, isDue, srsQueue, type Only } from "@/lib/filters";
import { shuffle } from "@/lib/random";
import { gradeForQuiz, type Grade } from "@/lib/srs";
import type { CardType, StudyCard, StudyMode } from "@/lib/types";

export default function StudyPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Study />
    </Suspense>
  );
}

const MODE_LABEL: Record<StudyMode, string> = {
  flip: "Flashcards",
  srs: "SRS Review",
  mc: "Kanji Trap Quiz",
  type: "Typing",
};

interface Result {
  card: StudyCard;
  correct: boolean;
}

/** Quiz order: due first, then starred, then tricky, then the rest (shuffled within groups). */
function quizOrder(cards: StudyCard[]): StudyCard[] {
  const rank = (c: StudyCard) =>
    isDue(c) ? 0 : c.userState?.starred ? 1 : (c.userState?.wrong_count ?? 0) > 0 ? 2 : 3;
  return shuffle(cards).sort((a, b) => rank(a) - rank(b));
}

function Study() {
  const params = useSearchParams();
  const router = useRouter();
  const { cards, loading, patchState, furigana, setFurigana, units, progress, setPosition } = useLibrary();

  const mode = (params.get("mode") as StudyMode) ?? "flip";
  // Course sessions: ?course=goi|kanji&session=learn|review — cards come from the learner's unlocked days.
  const course = params.get("course") as Track | null;
  const sessionKind = (params.get("session") as SessionKind) ?? "review";
  const pos = course ? progress[course] : undefined;
  const unit = pos ? currentUnit(units, pos) : null;
  const type = (course ? (course === "goi" ? "vocab" : "kanji") : params.get("type")) as CardType | null;
  const [size, setSize] = useState(mode === "flip" && !course ? "all" : "20");
  const [direction, setDirection] = useState<McDirection | "mix">("mix");
  const [field, setField] = useState<TypingField>("meaning");
  const [sessionKey, setSessionKey] = useState(0);
  const [retry, setRetry] = useState<StudyCard[] | null>(null);

  const pool = useMemo(
    () =>
      filterCards(cards, {
        type: type ?? undefined,
        levels: params.get("level")?.split(",").map(Number).filter(Boolean),
        tags: params.get("tag")?.split(",").filter(Boolean),
        only: (params.get("only") as Only) ?? "all",
        search: params.get("q") ?? undefined,
        deckCardIds: null,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, params.toString()],
  );
  const { decks } = useLibrary();
  const deckId = params.get("deck");
  const deckPool = useMemo(() => {
    const deck = decks.find((d) => d.id === deckId);
    return deck ? pool.filter((c) => deck.card_ids.includes(c.id)) : pool;
  }, [pool, decks, deckId]);

  // Build the queue once per session (not on every progress update).
  const queue = useMemo(() => {
    if (retry) return retry;
    const n = size === "all" ? Infinity : Number(size);
    if (course) {
      if (!pos) return [];
      return buildSession(cards, units, pos, sessionKind, { size: n === Infinity ? 1000 : n });
    }
    if (mode === "srs") return srsQueue(deckPool, 10).slice(0, n === Infinity ? 200 : n);
    if (mode === "flip") return shuffle(deckPool).slice(0, n);
    return quizOrder(deckPool).slice(0, n);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckPool.length, mode, size, sessionKey, retry, course, sessionKind, pos?.level, pos?.week, pos?.day, units.length]);

  const finishDay = pos && course && sessionKind === "learn"
    ? async () => {
        const nxt = nextPosition(units, pos);
        if (nxt) await setPosition(nxt);
        router.push("/");
      }
    : undefined;

  if (loading) return <Spinner />;

  const back = () => (window.history.length > 1 ? router.back() : router.push("/"));

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={back} aria-label="Close session"><X size={20} /></Button>
        <h1 className="font-semibold">{MODE_LABEL[mode]}</h1>
        <span className="text-sm text-muted">
          {type === "kanji" ? "· Kanji" : type === "vocab" ? "· Vocabulary" : ""}
          {unit && ` · ${sessionKind === "learn" ? unitLabel(unit) : `Review up to ${unitLabel(unit)}`}`}
        </span>
        <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" checked={furigana} onChange={(e) => setFurigana(e.target.checked)} className="accent-[var(--primary)]" />
          <span lang="ja" className="font-jp">ふりがな</span>
        </label>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {mode !== "srs" && !(course && sessionKind === "learn") && (
          <Segmented
            value={size}
            onChange={(v) => { setSize(v); setRetry(null); setSessionKey((k) => k + 1); }}
            options={[{ value: "10", label: "10" }, { value: "20", label: "20" }, { value: "50", label: "50" }, { value: "all", label: "All" }]}
          />
        )}
        {mode === "mc" && (
          <select value={direction} onChange={(e) => setDirection(e.target.value as McDirection | "mix")} className="h-11 rounded-xl border border-line bg-surface px-3 text-sm" aria-label="Question type">
            <option value="mix">Mixed questions</option>
            <option value="term-meaning">Japanese → meaning</option>
            <option value="meaning-term">Meaning → Japanese</option>
            <option value="term-reading">Japanese → reading</option>
          </select>
        )}
        {mode === "type" && (
          <Segmented value={field} onChange={setField} options={[{ value: "meaning", label: "Type meaning" }, { value: "reading", label: "Type reading" }]} />
        )}
      </div>

      {course && !pos ? (
        <Empty title="Choose your level first">
          Tell us where you are in the course and we&apos;ll build your sessions from there.
          <div className="mt-4"><Link href="/onboarding"><Button>Set my level</Button></Link></div>
        </Empty>
      ) : queue.length === 0 ? (
        <Empty title={mode === "srs" ? "All caught up! 🎉" : "No cards to study"}>
          {mode === "srs" ? "Nothing is due right now. Come back later or learn with flashcards." : "Change the filters on the deck page."}
          <div className="mt-4"><Link href="/"><Button variant="secondary">Back home</Button></Link></div>
        </Empty>
      ) : (
        <Session
          key={`${sessionKey}-${mode}-${field}-${direction}`}
          mode={mode}
          queue={queue}
          distractorPool={cards}
          direction={direction}
          field={field}
          onPatch={patchState}
          onRestart={(missed) => { setRetry(missed); setSessionKey((k) => k + 1); }}
          onNew={() => { setRetry(null); setSessionKey((k) => k + 1); }}
          onFinishDay={finishDay}
        />
      )}
    </div>
  );
}

function Session({
  mode,
  queue: initialQueue,
  distractorPool,
  direction,
  field,
  onPatch,
  onRestart,
  onNew,
  onFinishDay,
}: {
  mode: StudyMode;
  queue: StudyCard[];
  distractorPool: StudyCard[];
  direction: McDirection | "mix";
  field: TypingField;
  onPatch: (id: string, patch: Partial<NonNullable<StudyCard["userState"]>>) => void;
  onRestart: (missed: StudyCard[]) => void;
  onNew: () => void;
  onFinishDay?: () => Promise<void>;
}) {
  const [queue, setQueue] = useState(initialQueue);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [busy, setBusy] = useState(false);
  const total = initialQueue.length;
  const card = queue[index];
  const finished = index >= queue.length;

  const record = useCallback(
    async (c: StudyCard, correct: boolean, grade?: Grade) => {
      setResults((r) => [...r, { card: c, correct }]);
      const patch = await recordReview(c, mode, correct, grade);
      onPatch(c.id, {
        ...patch,
        right_count: (c.userState?.right_count ?? 0) + (correct ? 1 : 0),
        wrong_count: (c.userState?.wrong_count ?? 0) + (correct ? 0 : 1),
      });
      // Keep the in-session copy current so a requeued card reschedules from its new state.
      setQueue((q) => q.map((x) => (x.id === c.id ? { ...x, userState: { ...(x.userState ?? emptyState(x.id)), ...patch } } : x)));
    },
    [mode, onPatch],
  );

  const next = useCallback(() => {
    setFlipped(false);
    setIndex((i) => i + 1);
  }, []);

  // SRS: "Again" brings the card back a few cards later in this session.
  const grade = useCallback(
    async (g: Grade) => {
      if (busy || !card) return;
      setBusy(true);
      await record(card, g > 1, g);
      if (g === 1) setQueue((q) => [...q.slice(0, index + 4), card, ...q.slice(index + 4)]);
      next();
      setBusy(false);
    },
    [busy, card, index, next, record],
  );

  const { lang } = useLibrary();
  const question = useMemo(() => {
    if (mode !== "mc" || !card) return null;
    const dirs: McDirection[] = ["term-meaning", "meaning-term", "term-reading"];
    const dir = direction === "mix" ? dirs[Math.floor(Math.random() * dirs.length)] : direction;
    return buildQuestion(card, distractorPool, dir, Math.random, 4, lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card?.id, index, mode, direction, lang]);

  // Keyboard: Space flips; arrows answer in flip mode.
  useEffect(() => {
    if (mode !== "flip" && mode !== "srs") return;
    const onKey = (e: KeyboardEvent) => {
      if (finished || e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
      if (e.key === " ") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (mode === "flip" && e.key === "ArrowRight") flipAnswer(true);
      else if (mode === "flip" && e.key === "ArrowLeft") flipAnswer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const controls = useAnimationControls();
  const dragged = useRef(false);
  const flipAnswer = async (known: boolean) => {
    if (!card || busy) return;
    setBusy(true);
    record(card, known);
    await controls.start({ x: known ? 400 : -400, opacity: 0, rotate: known ? 12 : -12, transition: { duration: 0.22 } });
    next();
    controls.set({ x: 0, opacity: 1, rotate: 0 });
    setBusy(false);
  };

  if (finished) {
    return <Summary results={results} onRestart={onRestart} onNew={onNew} mode={mode} onFinishDay={onFinishDay} />;
  }

  const right = results.filter((r) => r.correct).length;

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted">
          <span>{Math.min(index + 1, queue.length)} / {queue.length}{queue.length > total ? ` (+${queue.length - total} again)` : ""}</span>
          <span className="flex gap-3"><span className="text-good">✓ {right}</span><span className="text-bad">✗ {results.length - right}</span></span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-surface-2">
          <div className="bg-rainbow h-full rounded-full transition-all duration-300" style={{ width: `${(index / queue.length) * 100}%` }} />
        </div>
      </div>

      {mode === "flip" && (
        <>
          <motion.div
            animate={controls}
            drag="x"
            dragSnapToOrigin
            dragElastic={0.6}
            onDragStart={() => (dragged.current = true)}
            onDragEnd={(_, info) => {
              if (info.offset.x > 110) flipAnswer(true);
              else if (info.offset.x < -110) flipAnswer(false);
              setTimeout(() => (dragged.current = false), 0);
            }}
            className="touch-pan-y"
          >
            <Flashcard key={card.id} card={card} flipped={flipped} onFlip={() => !dragged.current && setFlipped((f) => !f)} />
          </motion.div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" size="lg" onClick={() => flipAnswer(false)} disabled={busy} className="border-bad/40 text-bad">
              <ArrowLeft size={18} /> Still learning
            </Button>
            <Button variant="secondary" size="lg" onClick={() => flipAnswer(true)} disabled={busy} className="border-good/40 text-good">
              Know it <ArrowRight size={18} />
            </Button>
          </div>
          <p className="text-center text-xs text-muted">Tap or Space to flip · swipe or ← → to answer</p>
        </>
      )}

      {mode === "srs" && (
        <>
          <Flashcard key={`${card.id}-${index}`} card={card} flipped={flipped} onFlip={() => setFlipped((f) => !f)} />
          {flipped ? (
            <ConfidenceButtons fsrs={card.userState?.fsrs ?? null} onGrade={grade} disabled={busy} />
          ) : (
            <Button size="lg" className="w-full" onClick={() => setFlipped(true)}>Show answer <kbd className="text-xs opacity-70">Space</kbd></Button>
          )}
        </>
      )}

      {mode === "mc" && question && (
        <MultipleChoice
          key={`${card.id}-${index}`}
          question={question}
          onAnswer={(ok) => record(card, ok, gradeForQuiz(ok))}
          onNext={next}
        />
      )}

      {mode === "type" && (
        <TypingQuiz
          key={`${card.id}-${index}-${field}`}
          card={card}
          field={field}
          onAnswer={(ok) => record(card, ok, gradeForQuiz(ok))}
          onNext={next}
        />
      )}
    </div>
  );
}

const emptyState = (card_id: string) => ({
  card_id, fsrs: null, due_at: null, state: 0, reps: 0, lapses: 0,
  right_count: 0, wrong_count: 0, starred: false, override: {},
});

function Summary({
  results,
  mode,
  onRestart,
  onNew,
  onFinishDay,
}: {
  results: Result[];
  mode: StudyMode;
  onRestart: (missed: StudyCard[]) => void;
  onNew: () => void;
  onFinishDay?: () => Promise<void>;
}) {
  const [advancing, setAdvancing] = useState(false);
  const right = results.filter((r) => r.correct).length;
  const pct = results.length ? Math.round((right / results.length) * 100) : 0;
  const missed = [...new Map(results.filter((r) => !r.correct).map((r) => [r.card.id, r.card])).values()];

  return (
    <div className="space-y-4">
      <Panel className="overflow-hidden text-center">
        <div className="bg-rainbow h-2" />
        <div className="space-y-2 p-8">
          <p className="text-5xl">{pct >= 90 ? "🏆" : pct >= 70 ? "🎉" : "💪"}</p>
          <h2 className="text-2xl font-bold">Session complete</h2>
          <p className="text-muted">{right} of {results.length} correct · {pct}%</p>
        </div>
      </Panel>

      {missed.length > 0 && (
        <Panel className="p-4">
          <h3 className="mb-2 font-semibold">Review these ({missed.length})</h3>
          <ul className="divide-y divide-line">
            {missed.map((c) => (
              <li key={c.id} className="flex items-baseline gap-3 py-2">
                <span lang="ja" className="font-jp text-xl">{c.term}</span>
                {c.reading && <span lang="ja" className="font-jp text-sm text-muted">{c.reading}</span>}
                <MeaningText card={c} max={2} className="truncate text-sm" />
              </li>
            ))}
          </ul>
        </Panel>
      )}

      {onFinishDay && (
        <Button
          className="w-full"
          disabled={advancing}
          onClick={async () => { setAdvancing(true); await onFinishDay().catch(() => setAdvancing(false)); }}
        >
          <ChevronsRight size={18} /> Finish this day &amp; unlock the next
        </Button>
      )}

      <div className="grid gap-2 sm:grid-cols-3">
        {missed.length > 0 && (
          <Button onClick={() => onRestart(missed)}><RotateCcw size={18} /> Retry missed</Button>
        )}
        {mode !== "srs" && <Button variant="secondary" onClick={onNew}><Shuffle size={18} /> New round</Button>}
        <Link href="/" className={clsx(missed.length === 0 && mode === "srs" && "sm:col-span-3")}>
          <Button variant="secondary" className="w-full"><Check size={18} /> Done</Button>
        </Link>
      </div>
    </div>
  );
}
