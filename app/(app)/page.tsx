"use client";

import { AlertTriangle, BookOpen, Volume2, ChevronsRight, Flame, GraduationCap, Keyboard, Languages, ListChecks, Play, Shuffle, Sparkles, Target, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLibrary } from "@/components/LibraryProvider";
import { Button, Panel, Spinner } from "@/components/ui";
import { currentUnit, dayStats, levelProgress, nextPosition, trackType, unitLabel, unlockedUnits, type Position, type Track } from "@/lib/curriculum";
import { loadActivity } from "@/lib/data";
import { isDue, isMistake, isNew, mastery } from "@/lib/filters";
import { t, tf } from "@/lib/i18n";
import { LEVELS } from "@/lib/levels";
import { addDays, currentStreak, todayIn, type DayActivity } from "@/lib/streak";
import type { CardType, StudyCard } from "@/lib/types";

const TIP_KEY = "memori-tip-dismissed";

/** Per-track numbers the dashboard needs (null while cards are still loading). */
function useTrackInfo(track: Track) {
  const { cards, units, progress, loading } = useLibrary();
  const pos: Position | undefined = progress[track];
  return useMemo(() => {
    if (!pos) return null;
    const unit = currentUnit(units, pos);
    if (!unit) return null;
    const base = { pos, unit, levels: levelProgress(units, pos), next: nextPosition(units, pos) };
    if (loading) return { ...base, ready: false as const };
    const unlocked = new Set(unlockedUnits(units, pos).flatMap((u) => u.card_ids));
    const due = cards.filter((c) => c.type === trackType(track) && unlocked.has(c.id) && isDue(c)).length;
    return { ...base, ready: true as const, unlocked: unlocked.size, due, day: dayStats(cards, unit) };
  }, [cards, units, pos, track, loading]);
}

const studyHref = (track: Track, mode: string, session: string) => `/study?course=${track}&session=${session}&mode=${mode}`;

export default function Dashboard() {
  const { cards, profile, loading, metaReady, error, lang } = useLibrary();
  const [activity, setActivity] = useState<DayActivity[]>([]);
  const tz = profile?.timezone ?? "UTC";
  const today = todayIn(tz);

  useEffect(() => {
    if (!profile) return;
    loadActivity(addDays(today, -370)).then(setActivity).catch(() => {});
  }, [profile, today]);

  if (!metaReady) return <Spinner />;
  if (error && !loading && !cards.length) return <p className="text-bad">Couldn&apos;t load your cards: {error}</p>;

  const streak = currentStreak(activity, today);
  const goal = profile?.daily_goal ?? 20;
  const done = activity.find((a) => a.day === today)?.reviews ?? 0;

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted">
        {t(lang, "greeting")}, {profile?.display_name ?? "friend"} · <span lang="ja" className="font-jp">おかえり</span>
      </p>

      <Hero />

      <div className="grid grid-cols-2 gap-3">
        <Panel className="flex items-center gap-3 p-3">
          <div className="bg-rainbow flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"><Flame size={22} /></div>
          <div>
            <p className="text-2xl font-bold leading-none">{streak}</p>
            <p className="text-xs text-muted">{t(lang, "dayStreak")}</p>
          </div>
        </Panel>
        <Panel className="flex items-center gap-3 p-3">
          <GoalRing done={done} goal={goal} />
          <div>
            <p className="text-2xl font-bold leading-none">{done}<span className="text-sm font-normal text-muted">/{goal}</span></p>
            <p className="flex items-center gap-1 text-xs text-muted"><Target size={12} /> {t(lang, "goalToday")}</p>
          </div>
        </Panel>
      </div>

      <MistakesChip />

      <FirstVisitTip />

      <div className="grid gap-4 md:grid-cols-2">
        <CourseTrack track="goi" />
        <CourseTrack track="kanji" />
      </div>

      <details className="group rounded-2xl border border-line bg-surface">
        <summary className="cursor-pointer list-none p-4 font-semibold">
          {t(lang, "morePractice")} <span className="text-muted transition group-open:rotate-90">›</span>
        </summary>
        <div className="grid gap-4 p-4 pt-0 md:grid-cols-2">
          {loading ? <Skeleton className="h-40 md:col-span-2" /> : (
            <>
              <DeckTile type="vocab" cards={cards} />
              <DeckTile type="kanji" cards={cards} />
            </>
          )}
        </div>
      </details>
    </div>
  );
}

/**
 * The one obvious next step: learn today's day, else review what's due, else "all done".
 * Vocabulary comes first, then kanji.
 */
function Hero() {
  const { lang } = useLibrary();
  const goi = useTrackInfo("goi");
  const kanji = useTrackInfo("kanji");
  const tracks = ([["goi", goi], ["kanji", kanji]] as const).filter(([, i]) => i);

  if (!tracks.length) {
    return (
      <Panel className="space-y-3 p-5 text-center">
        <p className="font-semibold">{t(lang, "onbTitle")}</p>
        <Link href="/onboarding"><Button size="lg" className="w-full"><GraduationCap size={18} /> {t(lang, "setLevel")}</Button></Link>
      </Panel>
    );
  }
  if (tracks.some(([, i]) => !i!.ready)) return <Skeleton className="h-40" />;

  type Ready = Extract<NonNullable<ReturnType<typeof useTrackInfo>>, { ready: true }>;
  const ready = tracks as unknown as [Track, Ready][];
  const learn = ready.find(([, i]) => i.day.seen < i.day.total);
  const review = ready.filter(([, i]) => i.due > 0).sort((a, b) => b[1].due - a[1].due)[0];
  const totalDue = ready.reduce((n, [, i]) => n + i.due, 0);

  let title: string, sub: string, href: string, icon = <Play size={20} />;
  if (learn) {
    const [track, i] = learn;
    const label = `${unitLabel(i.unit)}`;
    title = tf(lang, i.day.seen > 0 ? "heroContinue" : "heroLearn", { unit: label });
    sub = tf(lang, "heroLearnSub", { n: i.day.total - i.day.seen, what: track === "goi" ? t(lang, "words") : t(lang, "kanjiUnit") });
    href = studyHref(track, "flip", "learn");
  } else if (review) {
    title = tf(lang, "heroReview", { n: totalDue });
    sub = t(lang, "heroReviewSub");
    href = studyHref(review[0], "srs", "review");
    icon = <Shuffle size={20} />;
  } else {
    title = t(lang, "heroDone");
    sub = t(lang, "heroDoneSub");
    href = studyHref(ready[0][0], "srs", "review");
    icon = <Sparkles size={20} />;
  }

  return (
    <Panel className="overflow-hidden">
      <div className="bg-rainbow h-2" />
      <div className="space-y-3 p-5">
        <p className="text-sm font-medium text-muted">{t(lang, "today")}</p>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted">{sub}</p>
        <Link href={href} className="block">
          <Button size="lg" className="w-full">{icon} {learn || review ? title : t(lang, "practiceAnyway")}</Button>
        </Link>
      </div>
    </Panel>
  );
}

/** Shortcut to the mistakes notebook, shown only when there's something to fix. */
function MistakesChip() {
  const { cards, loading, lang } = useLibrary();
  const n = useMemo(() => (loading ? 0 : cards.filter(isMistake).length), [cards, loading]);
  if (!n) return null;
  return (
    <Link href="/mistakes" className="flex items-center gap-3 rounded-2xl border border-bad/30 bg-bad/10 p-3 text-sm font-medium">
      <AlertTriangle size={18} className="text-bad" />
      <span className="flex-1">{tf(lang, "mistakesChip", { n })}</span>
      <span className="text-muted">›</span>
    </Link>
  );
}

function GoalRing({ done, goal }: { done: number; goal: number }) {
  const r = 17;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, done / Math.max(1, goal));
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="shrink-0 -rotate-90" aria-hidden>
      <circle cx="20" cy="20" r={r} fill="none" strokeWidth="5" className="stroke-surface-2" />
      <circle cx="20" cy="20" r={r} fill="none" strokeWidth="5" strokeLinecap="round" className="stroke-primary transition-all" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} />
    </svg>
  );
}

function FirstVisitTip() {
  const { lang } = useLibrary();
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { setShow(!localStorage.getItem(TIP_KEY)); } catch { setShow(false); }
  }, []);
  if (!show) return null;
  const dismiss = () => {
    setShow(false);
    try { localStorage.setItem(TIP_KEY, "1"); } catch {}
  };
  return (
    <Panel className="flex items-start gap-3 border-primary/40 bg-primary-soft p-4">
      <Sparkles className="mt-0.5 shrink-0 text-primary" size={20} />
      <div className="flex-1 space-y-2">
        <p className="font-semibold">{t(lang, "tipTitle")}</p>
        <p className="text-sm">{t(lang, "tipBody")}</p>
        <Button size="sm" variant="secondary" onClick={dismiss}>{t(lang, "gotIt")}</Button>
      </div>
      <button type="button" onClick={dismiss} aria-label="Dismiss" className="text-muted"><X size={18} /></button>
    </Panel>
  );
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-surface-2 ${className ?? ""}`} aria-hidden />;
}

/** One course track: today's day, progress, Learn / Review; extra modes under "More". */
function CourseTrack({ track }: { track: Track }) {
  const { setPosition, lang } = useLibrary();
  const info = useTrackInfo(track);
  const [advancing, setAdvancing] = useState(false);
  const title = track === "goi" ? t(lang, "goi") : t(lang, "kanji");
  const Icon = track === "goi" ? Languages : BookOpen;

  if (!info) {
    return (
      <Panel className="space-y-3 p-5">
        <h2 className="flex items-center gap-2 font-semibold"><Icon size={20} /> {title}</h2>
        <Link href="/onboarding"><Button className="w-full"><GraduationCap size={18} /> {t(lang, "setLevel")}</Button></Link>
      </Panel>
    );
  }

  const pct = info.ready && info.day.total ? Math.round((info.day.seen / info.day.total) * 100) : 0;

  return (
    <Panel className="space-y-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 font-semibold"><Icon size={20} /> {title}</h2>
          <p className="mt-1 text-sm text-muted">{t(lang, "today")}: <b className="text-ink">{unitLabel(info.unit)}</b></p>
        </div>
        <Link href="/onboarding" className="text-xs text-primary underline">{t(lang, "changeLevel")}</Link>
      </div>

      {info.ready ? (
        <div>
          <div className="mb-1 flex justify-between text-xs text-muted">
            <span>{info.day.seen}/{info.day.total} {t(lang, "dayOf")}</span>
            <span>{info.due} {t(lang, "dueNow")}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      ) : (
        <Skeleton className="h-6" />
      )}

      <div className="grid grid-cols-2 gap-2">
        <Link href={studyHref(track, "flip", "learn")}>
          <Button className="w-full"><Play size={18} /> {track === "goi" ? t(lang, "learn") : t(lang, "learnKanji")}</Button>
        </Link>
        <Link href={studyHref(track, "srs", "review")}>
          <Button variant="secondary" className="w-full"><Shuffle size={18} /> {t(lang, "review")}</Button>
        </Link>
      </div>

      <details className="group">
        <summary className="cursor-pointer list-none text-sm text-primary">
          {t(lang, "more")} <span className="inline-block transition group-open:rotate-90">›</span>
        </summary>
        <div className="mt-3 space-y-3">
          <p className="text-xs text-muted">{t(lang, "reviewHint")}{info.ready ? ` · ${info.unlocked}` : ""}</p>
          <div className="grid grid-cols-2 gap-2">
            <Link href={studyHref(track, "mc", "review")}><Button variant="secondary" size="sm" className="w-full"><ListChecks size={16} /> {t(lang, "quiz")}</Button></Link>
            <Link href={studyHref(track, "type", "review")}><Button variant="secondary" size="sm" className="w-full"><Keyboard size={16} /> {t(lang, "typing")}</Button></Link>
            {track === "goi" && (
              <Link href={`${studyHref(track, "mc", "review")}&dir=audio-meaning`} className="col-span-2">
                <Button variant="secondary" size="sm" className="w-full"><Volume2 size={16} /> {t(lang, "listening")}</Button>
              </Link>
            )}
          </div>
          {info.next ? (
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              disabled={advancing}
              onClick={async () => {
                setAdvancing(true);
                await setPosition(info.next!).finally(() => setAdvancing(false));
              }}
            >
              <ChevronsRight size={16} /> {t(lang, "finishDay")} → {unitLabel(info.next)}
            </Button>
          ) : (
            <p className="text-center text-sm font-medium">{t(lang, "courseDone")}</p>
          )}
          <div className="space-y-1.5">
            {info.levels.map((l) => (
              <div key={l.level} className="flex items-center gap-2 text-xs">
                <span className="w-7 font-semibold">N{l.level}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                  <div className="bg-rainbow h-full rounded-full" style={{ width: `${(l.reached / l.total) * 100}%` }} />
                </div>
                <span className="w-14 text-right text-muted">{l.reached}/{l.total}</span>
              </div>
            ))}
          </div>
        </div>
      </details>
    </Panel>
  );
}

function DeckTile({ type, cards }: { type: CardType; cards: StudyCard[] }) {
  const mine = cards.filter((c) => c.type === type);
  const levels = [...LEVELS].filter((l) => mine.some((c) => c.jlpt_level === l));
  const due = mine.filter((c) => isDue(c)).length;
  const fresh = mine.filter(isNew).length;
  const Icon = type === "kanji" ? BookOpen : Languages;
  const title = type === "kanji" ? "Kanji flashcards" : "Vocabulary flashcards";

  return (
    <div className="space-y-3 rounded-xl border border-line p-4">
      <div>
        <h3 className="flex items-center gap-2 font-semibold"><Icon size={18} className="text-primary" /> {title}</h3>
        <p className="text-xs text-muted">{mine.length} cards · {due} due · {fresh} new</p>
      </div>
      <div className="space-y-2">
        {levels.map((l) => (
          <LevelRow key={l} level={l} cards={mine.filter((c) => c.jlpt_level === l)} type={type} />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href={`/study?type=${type}&mode=flip`}><Button variant="secondary" size="sm">Flashcards</Button></Link>
        <Link href={`/study?type=${type}&mode=srs`}><Button size="sm">Review</Button></Link>
        <Link href={`/study?type=${type}&mode=mc`}><Button variant="secondary" size="sm">Quiz</Button></Link>
        <Link href={`/decks/${type}`} className="ml-auto"><Button variant="ghost" size="sm">Browse →</Button></Link>
      </div>
    </div>
  );
}

function LevelRow({ level, cards, type }: { level: number; cards: StudyCard[]; type: CardType }) {
  const counts = { new: 0, learning: 0, review: 0, mastered: 0 };
  cards.forEach((c) => counts[mastery(c)]++);
  const pct = (n: number) => `${(n / Math.max(1, cards.length)) * 100}%`;
  return (
    <Link href={`/decks/${type}?level=${level}`} className="block rounded-lg p-1 hover:bg-surface-2">
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium">N{level}</span>
        <span className="text-muted">{counts.mastered + counts.review}/{cards.length} learned</span>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-surface-2">
        <div style={{ width: pct(counts.mastered) }} className="bg-primary" />
        <div style={{ width: pct(counts.review) }} className="bg-good/70" />
        <div style={{ width: pct(counts.learning) }} className="bg-warn/70" />
      </div>
    </Link>
  );
}
