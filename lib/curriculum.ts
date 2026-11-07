import { isDue, isNew } from "./filters";
import { LEVELS } from "./levels";
import { shuffle } from "./random";
import type { CardType, StudyCard } from "./types";

/** A course track: vocabulary (語彙 goi) or kanji. */
export type Track = "goi" | "kanji";
export const TRACKS: Track[] = ["goi", "kanji"];
export const trackType = (t: Track): CardType => (t === "goi" ? "vocab" : "kanji");

/** One study day, e.g. N3 · Goi · Week 1 · Day 3. */
export interface Unit {
  id: string;
  level: number;
  track: Track;
  week: number;
  day: number;
  title: string | null;
  source: "soumatome" | "auto";
  card_ids: string[];
}

/** Where the learner is: the last day they have reached (inclusive). */
export interface Position {
  track: Track;
  level: number;
  week: number;
  day: number;
}

/**
 * Sort key across the whole course. Easier levels come first (JLPT 5 → 2),
 * then week, then day. Lower key = earlier in the course.
 */
const key = (u: { level: number; week: number; day: number }) => (10 - u.level) * 10_000 + u.week * 10 + u.day;

export const unitLabel = (u: { level: number; week: number; day: number }) => `N${u.level} · Week ${u.week} · Day ${u.day}`;

/** The track's units in course order. */
export function courseUnits(units: Unit[], track: Track): Unit[] {
  return units.filter((u) => u.track === track).sort((a, b) => key(a) - key(b));
}

/**
 * Units unlocked at a position: every unit of easier levels, plus this level's units up to
 * and including the current day. E.g. N3 W1 D3 → all N5 + all N4 + N3 W1 D1–D3.
 */
export function unlockedUnits(units: Unit[], pos: Position): Unit[] {
  const limit = key(pos);
  return courseUnits(units, pos.track).filter((u) => key(u) <= limit);
}

/** The unit at the position, or the last unlocked one when that exact day doesn't exist. */
export function currentUnit(units: Unit[], pos: Position): Unit | null {
  const unlocked = unlockedUnits(units, pos);
  return unlocked.at(-1) ?? null;
}

/** The first day of a level, used when someone starts a level fresh. */
export function startOfLevel(units: Unit[], track: Track, level: number): Position {
  const first = courseUnits(units, track).find((u) => u.level === level);
  return { track, level, week: first?.week ?? 1, day: first?.day ?? 1 };
}

/** Position after finishing the current day; null when the whole course is done. */
export function nextPosition(units: Unit[], pos: Position): Position | null {
  const limit = key(pos);
  const next = courseUnits(units, pos.track).find((u) => key(u) > limit);
  return next ? { track: pos.track, level: next.level, week: next.week, day: next.day } : null;
}

/** Days finished / total for each level of a track, for the progress map. */
export function levelProgress(units: Unit[], pos: Position) {
  const limit = key(pos);
  return LEVELS.map((level) => {
    const days = courseUnits(units, pos.track).filter((u) => u.level === level);
    return { level, total: days.length, reached: days.filter((u) => key(u) <= limit).length };
  }).filter((l) => l.total > 0);
}

export type SessionKind = "learn" | "review";

export interface SessionOptions {
  size?: number;
  now?: Date;
  rand?: () => number;
}

/**
 * Build a study session for a track.
 * - learn:  the current day's cards (shuffled).
 * - review: a random mix from everything unlocked — ~40% today's day, ~30% cards due
 *           for SRS review (most overdue first), the rest random from earlier days.
 *           Any shortfall is filled from the remaining pool, so a session is always full
 *           when enough cards are unlocked.
 */
export function buildSession(
  cards: StudyCard[],
  units: Unit[],
  pos: Position,
  kind: SessionKind,
  { size = 20, now = new Date(), rand = Math.random }: SessionOptions = {},
): StudyCard[] {
  const byId = new Map(cards.filter((c) => c.type === trackType(pos.track)).map((c) => [c.id, c]));
  const pick = (ids: string[]) => ids.map((id) => byId.get(id)).filter((c): c is StudyCard => !!c);

  const current = currentUnit(units, pos);
  const today = pick(current?.card_ids ?? []);
  if (kind === "learn") return shuffle(today, rand);

  const pool = [...new Map(pick(unlockedUnits(units, pos).flatMap((u) => u.card_ids)).map((c) => [c.id, c])).values()];
  const todayIds = new Set(today.map((c) => c.id));
  const due = pool
    .filter((c) => !todayIds.has(c.id) && isDue(c, now))
    .sort((a, b) => +new Date(a.userState!.due_at!) - +new Date(b.userState!.due_at!));
  const dueIds = new Set(due.map((c) => c.id));
  // Earlier days: prefer cards already seen (reinforcement) but include unseen ones too.
  const rest = shuffle(pool.filter((c) => !todayIds.has(c.id) && !dueIds.has(c.id)), rand);

  const out: StudyCard[] = [];
  const seen = new Set<string>();
  const take = (list: StudyCard[], n: number) => {
    for (const c of list) {
      if (out.length >= size || n <= 0) return;
      if (seen.has(c.id)) continue;
      seen.add(c.id);
      out.push(c);
      n--;
    }
  };
  const nToday = Math.round(size * 0.4);
  const nDue = Math.round(size * 0.3);
  take(shuffle(today, rand), nToday);
  take(due, nDue);
  take(rest, size - out.length);
  // Fill any shortfall (e.g. few earlier days) from whatever is left.
  take(shuffle(today, rand), size - out.length);
  take(due, size - out.length);
  return shuffle(out, rand);
}

/** How many of the current day's cards have been studied at least once. */
export function dayStats(cards: StudyCard[], unit: Unit | null) {
  if (!unit) return { total: 0, seen: 0 };
  const ids = new Set(unit.card_ids);
  const list = cards.filter((c) => ids.has(c.id));
  return { total: list.length, seen: list.filter((c) => !isNew(c) || (c.userState?.right_count ?? 0) + (c.userState?.wrong_count ?? 0) > 0).length };
}
