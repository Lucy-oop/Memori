"use client";

import { BookOpen, Flame, Languages, Play, Target } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLibrary } from "@/components/LibraryProvider";
import { StreakHeatmap } from "@/components/StreakHeatmap";
import { Button, Panel, Spinner } from "@/components/ui";
import { loadActivity } from "@/lib/data";
import { isDue, isNew, mastery } from "@/lib/filters";
import { addDays, currentStreak, longestStreak, todayIn, type DayActivity } from "@/lib/streak";
import type { CardType, StudyCard } from "@/lib/types";

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
  const levels = [5, 4, 3].filter((l) => mine.some((c) => c.jlpt_level === l));
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
