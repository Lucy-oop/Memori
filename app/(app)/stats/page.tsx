"use client";

import { MeaningText } from "@/components/MeaningText";
import { LEVELS } from "@/lib/levels";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLibrary } from "@/components/LibraryProvider";
import { StreakHeatmap } from "@/components/StreakHeatmap";
import { Panel, Spinner } from "@/components/ui";
import { loadActivity } from "@/lib/data";
import { mastery, type MasteryBucket } from "@/lib/filters";
import { addDays, currentStreak, longestStreak, todayIn, type DayActivity } from "@/lib/streak";
import type { CardType } from "@/lib/types";

const BUCKETS: { key: MasteryBucket; label: string; color: string }[] = [
  { key: "new", label: "New", color: "var(--line)" },
  { key: "learning", label: "Learning", color: "var(--warn)" },
  { key: "review", label: "Review", color: "var(--good)" },
  { key: "mastered", label: "Mastered", color: "var(--primary)" },
];

export default function StatsPage() {
  const { cards, profile, loading } = useLibrary();
  const [activity, setActivity] = useState<DayActivity[]>([]);
  const today = todayIn(profile?.timezone ?? "UTC");

  useEffect(() => {
    if (profile) loadActivity(addDays(today, -370)).then(setActivity).catch(() => {});
  }, [profile, today]);

  const last30 = useMemo(() => {
    const out: DayActivity[] = [];
    const byDay = new Map(activity.map((a) => [a.day, a]));
    for (let i = 29; i >= 0; i--) {
      const day = addDays(today, -i);
      out.push(byDay.get(day) ?? { day, reviews: 0, correct: 0 });
    }
    return out;
  }, [activity, today]);

  const totals = activity.reduce((s, a) => ({ reviews: s.reviews + a.reviews, correct: s.correct + a.correct }), { reviews: 0, correct: 0 });
  const missed = useMemo(
    () =>
      cards
        .filter((c) => (c.userState?.wrong_count ?? 0) > 0)
        .sort((a, b) => b.userState!.wrong_count - a.userState!.wrong_count)
        .slice(0, 12),
    [cards],
  );

  if (loading) return <Spinner />;
  const maxReviews = Math.max(1, ...last30.map((d) => d.reviews));

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Progress</h1>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Current streak" value={`${currentStreak(activity, today)}🔥`} />
        <Stat label="Longest streak" value={longestStreak(activity)} />
        <Stat label="Total reviews" value={totals.reviews} />
        <Stat label="Accuracy" value={totals.reviews ? `${Math.round((totals.correct / totals.reviews) * 100)}%` : "—"} />
      </div>

      <Panel className="p-4">
        <h2 className="mb-3 font-semibold">Daily stack</h2>
        <StreakHeatmap days={activity} today={today} goal={profile?.daily_goal ?? 20} weeks={26} />
      </Panel>

      <Panel className="p-4">
        <h2 className="mb-3 font-semibold">Last 30 days</h2>
        <div className="flex h-36 items-end gap-[3px]" role="img" aria-label="Reviews per day for the last 30 days">
          {last30.map((d) => {
            const acc = d.reviews ? d.correct / d.reviews : 0;
            return (
              <div key={d.day} className="group relative flex flex-1 flex-col justify-end" title={`${d.day}: ${d.reviews} reviews, ${Math.round(acc * 100)}% correct`}>
                <div className="rounded-t-[3px] bg-good/80" style={{ height: `${(d.correct / maxReviews) * 100}%` }} />
                <div className="bg-bad/60" style={{ height: `${((d.reviews - d.correct) / maxReviews) * 100}%` }} />
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex gap-4 text-xs text-muted">
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-good/80" /> correct</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-bad/60" /> missed</span>
        </div>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2">
        {(["vocab", "kanji"] as CardType[]).map((type) => (
          <Panel key={type} className="p-4">
            <h2 className="mb-3 font-semibold">{type === "kanji" ? "Kanji" : "Vocabulary"} by level</h2>
            <div className="space-y-3">
              {LEVELS.map((level) => {
                const set = cards.filter((c) => c.type === type && c.jlpt_level === level);
                if (!set.length) return null;
                const counts = Object.fromEntries(BUCKETS.map((b) => [b.key, 0])) as Record<MasteryBucket, number>;
                set.forEach((c) => counts[mastery(c)]++);
                return (
                  <div key={level}>
                    <div className="mb-1 flex justify-between text-sm"><span className="font-medium">N{level}</span><span className="text-muted">{set.length} cards</span></div>
                    <div className="flex h-3 overflow-hidden rounded-full">
                      {BUCKETS.map((b) => (
                        <div key={b.key} style={{ width: `${(counts[b.key] / set.length) * 100}%`, background: b.color }} title={`${b.label}: ${counts[b.key]}`} />
                      ))}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted">
                      {BUCKETS.map((b) => <span key={b.key}>{b.label} {counts[b.key]}</span>)}
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        ))}
      </div>

      <Panel className="p-4">
        <h2 className="mb-3 font-semibold">Most missed</h2>
        {missed.length === 0 ? (
          <p className="text-sm text-muted">Nothing yet — keep studying!</p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {missed.map((c) => (
              <Link key={c.id} href={`/cards/edit?id=${c.id}`} className="flex items-center gap-3 rounded-xl border border-line p-2 hover:bg-surface-2">
                <span lang="ja" className="font-jp text-2xl">{c.term}</span>
                <MeaningText card={c} max={1} className="min-w-0 flex-1 truncate text-sm" />
                <span className="text-xs text-bad">✗{c.userState!.wrong_count}</span>
              </Link>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <Panel className="p-4">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted">{label}</p>
    </Panel>
  );
}
