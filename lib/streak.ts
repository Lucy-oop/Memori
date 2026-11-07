export interface DayActivity {
  day: string; // YYYY-MM-DD in the user's timezone
  reviews: number;
  correct: number;
}

/** Today's date (YYYY-MM-DD) in an IANA timezone. */
export function todayIn(timezone: string, now: Date = new Date()): string {
  // en-CA formats as YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

export function addDays(day: string, n: number): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/**
 * Consecutive days with at least one review, ending today — or ending yesterday
 * if nothing has been studied yet today (the streak isn't lost until the day ends).
 */
export function currentStreak(days: DayActivity[], today: string): number {
  const active = new Set(days.filter((d) => d.reviews > 0).map((d) => d.day));
  let cursor = active.has(today) ? today : addDays(today, -1);
  let streak = 0;
  while (active.has(cursor)) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export function longestStreak(days: DayActivity[]): number {
  const sorted = days.filter((d) => d.reviews > 0).map((d) => d.day).sort();
  let best = 0;
  let run = 0;
  let prev: string | null = null;
  for (const day of sorted) {
    run = prev && addDays(prev, 1) === day ? run + 1 : 1;
    best = Math.max(best, run);
    prev = day;
  }
  return best;
}

/** Last `weeks` weeks as columns of 7 days (Sun→Sat), for the heatmap. */
export function heatmapGrid(days: DayActivity[], today: string, weeks = 18): { day: string; reviews: number }[][] {
  const byDay = new Map(days.map((d) => [d.day, d.reviews]));
  const weekday = new Date(`${today}T00:00:00Z`).getUTCDay();
  const start = addDays(today, -(weeks - 1) * 7 - weekday);
  const grid: { day: string; reviews: number }[][] = [];
  for (let w = 0; w < weeks; w++) {
    const col = [];
    for (let d = 0; d < 7; d++) {
      const day = addDays(start, w * 7 + d);
      if (day > today) break;
      col.push({ day, reviews: byDay.get(day) ?? 0 });
    }
    grid.push(col);
  }
  return grid;
}
