"use client";

import { LEVELS } from "@/lib/levels";
import { BookOpen, ChevronsRight, Flame, GraduationCap, Keyboard, Languages, ListChecks, Play, Shuffle, Target } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLibrary } from "@/components/LibraryProvider";
import { StreakHeatmap } from "@/components/StreakHeatmap";
import { Button, Panel, Spinner } from "@/components/ui";
import { loadActivity } from "@/lib/data";
import { isDue, isNew, mastery } from "@/lib/filters";
import { addDays, currentStreak, longestStreak, todayIn, type DayActivity } from "@/lib/streak";
import type { CardType, StudyCard } from "@/lib/types";
import { currentUnit, dayStats, levelProgress, nextPosition, trackType, unitLabel, unlockedUnits, type Position, type Track } from "@/lib/curriculum";
import { t } from "@/lib/i18n";

export default function Dashboard() {
  const { cards, profile, loading, error } = useLibrary();
  const [activity, setActivity] = useState<DayActivity[]>([]);
  const tz = profile?.timezone ?? "UTC";
  const today = todayIn(tz);

  useEffect(() => {
    if (!profile) return;
    loadActivity(addDays(today, -370)).then(setActivity).catch(() => {});
  }, [profile, today]);

  const streak = currentStreak(activity, today);
  const best = longestStreak(activity);
  const todayRow = activity.find((a) => a.day === today);
  const goal = profile?.daily_goal ?? 20;
  const done = todayRow?.reviews ?? 0;
  const dueCount = useMemo(() => cards.filter((c) => isDue(c)).length, [cards]);

  if (loading) return <Spinner />;
  if (error && !cards.length) return <p className="text-bad">Couldn&apos;t load your cards: {error}</p>;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted">おかえり, {profile?.display_name ?? "friend"}</p>
        <h1 className="text-2xl font-bold sm:text-3xl">Let&apos;s remember something today</h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Panel className="flex items-center gap-4 p-4">
          <div className="bg-rainbow flex h-12 w-12 items-center justify-center rounded-2xl text-white">
            <Flame size={26} />
          </div>
          <div>
            <p className="text-3xl font-bold leading-none">{streak}</p>
            <p className="text-sm text-muted">day streak · best {best}</p>
          </div>
        </Panel>

        <Panel className="p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 font-medium"><Target size={16} /> Today</span>
            <span className="text-muted">{done}/{goal}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-surface-2">
            <div className="bg-rainbow h-full rounded-full transition-all" style={{ width: `${Math.min(100, (done / goal) * 100)}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted">{done >= goal ? "Daily goal reached 🎉" : `${goal - done} more to hit your goal`}</p>
        </Panel>

        <Panel className="flex items-center justify-between gap-3 p-4">
          <div>
            <p className="text-3xl font-bold leading-none">{dueCount}</p>
            <p className="text-sm text-muted">cards due for review</p>
          </div>
          <Link href="/study?mode=srs">
            <Button><Play size={18} /> Review</Button>
          </Link>
        </Panel>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <CourseTrack track="goi" />
        <CourseTrack track="kanji" />
      </div>

      <h2 className="pt-2 text-lg font-semibold">Free practice</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <DeckTile type="vocab" cards={cards} />
        <DeckTile type="kanji" cards={cards} />
      </div>

      <Panel className="p-4">
        <h2 className="mb-3 font-semibold">Daily stack</h2>
        <StreakHeatmap days={activity} today={today} goal={goal} />
      </Panel>
    </div>
  );
}

function DeckTile({ type, cards }: { type: CardType; cards: StudyCard[] }) {
  const mine = cards.filter((c) => c.type === type);
  const levels = [...LEVELS].filter((l) => mine.some((c) => c.jlpt_level === l));
  const due = mine.filter((c) => isDue(c)).length;
  const fresh = mine.filter(isNew).length;
  const Icon = type === "kanji" ? BookOpen : Languages;
  const title = type === "kanji" ? "Kanji Flashcards" : "Vocabulary Flashcards";
  const sample = type === "kanji" ? "漢字" : "言葉";

  return (
    <Panel className="overflow-hidden">
      <div className="bg-rainbow h-1.5" />
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold"><Icon size={20} className="text-primary" /> {title}</h2>
            <p className="text-sm text-muted">{mine.length} cards · {due} due · {fresh} new</p>
          </div>
          <span lang="ja" className="font-jp text-4xl text-primary/80">{sample}</span>
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
          <Link href={`/study?type=${type}&mode=type`}><Button variant="secondary" size="sm">Typing</Button></Link>
          <Link href={`/decks/${type}`} className="ml-auto"><Button variant="ghost" size="sm">Browse →</Button></Link>
        </div>
      </div>
    </Panel>
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


/** "Today" card for one course track: current day, Learn / Review / Quiz, level progress. */
function CourseTrack({ track }: { track: Track }) {
  const { cards, units, progress, setPosition, lang } = useLibrary();
  const pos: Position | undefined = progress[track];
  const [advancing, setAdvancing] = useState(false);

  const info = useMemo(() => {
    if (!pos) return null;
    const unit = currentUnit(units, pos);
    const unlocked = new Set(unlockedUnits(units, pos).flatMap((u) => u.card_ids));
    const due = cards.filter((c) => c.type === trackType(track) && unlocked.has(c.id) && isDue(c)).length;
    return { unit, unlocked: unlocked.size, due, day: dayStats(cards, unit), levels: levelProgress(units, pos), next: nextPosition(units, pos) };
  }, [cards, units, pos, track]);

  const title = track === "goi" ? t(lang, "goi") : t(lang, "kanji");
  const Icon = track === "goi" ? Languages : BookOpen;

  if (!pos || !info?.unit) {
    return (
      <Panel className="space-y-3 p-5">
        <h2 className="flex items-center gap-2 font-semibold"><Icon size={20} /> {title}</h2>
        <p className="text-sm text-muted">Choose your JLPT level and day to start the course.</p>
        <Link href="/onboarding"><Button className="w-full"><GraduationCap size={18} /> {t(lang, "setLevel")}</Button></Link>
      </Panel>
    );
  }

  const q = (mode: string, session: string) => `/study?course=${track}&session=${session}&mode=${mode}`;
  const pct = info.day.total ? Math.round((info.day.seen / info.day.total) * 100) : 0;

  return (
    <Panel className="overflow-hidden">
      <div className="bg-rainbow h-1.5" />
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 font-semibold"><Icon size={20} /> {title}</h2>
            <p className="mt-1 text-sm text-muted">{t(lang, "today")}: <b className="text-ink">{unitLabel(info.unit)}</b></p>
          </div>
          <Link href="/onboarding" className="text-xs text-primary underline">{t(lang, "changeLevel")}</Link>
        </div>

        <div>
          <div className="mb-1 flex justify-between text-xs text-muted">
            <span>{info.day.seen}/{info.day.total} {t(lang, "dayOf")}</span>
            <span>{info.due} {t(lang, "dueNow")}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="grid gap-2">
          <Link href={q("flip", "learn")}>
            <Button className="w-full"><Play size={18} /> {track === "goi" ? t(lang, "learn") : t(lang, "learnKanji")}</Button>
          </Link>
          <Link href={q("srs", "review")}>
            <Button variant="secondary" className="w-full"><Shuffle size={18} /> {t(lang, "review")} · {info.unlocked}</Button>
          </Link>
          <p className="-mt-1 text-center text-xs text-muted">{t(lang, "reviewHint")}</p>
          <div className="grid grid-cols-2 gap-2">
            <Link href={q("mc", "review")}><Button variant="secondary" size="sm" className="w-full"><ListChecks size={16} /> {t(lang, "quiz")}</Button></Link>
            <Link href={q("type", "review")}><Button variant="secondary" size="sm" className="w-full"><Keyboard size={16} /> {t(lang, "typing")}</Button></Link>
          </div>
          {info.next ? (
            <Button
              variant="ghost"
              size="sm"
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
        </div>

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
    </Panel>
  );
}
