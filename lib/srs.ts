import { DefaultScheduler, Rating } from "ts-fsrs";

export { Rating };
export type Grade = 1 | 2 | 3 | 4; // Again, Hard, Good, Easy

/** Shape of a ts-fsrs card as we store it (dates as ISO strings in jsonb). */
export interface FsrsCard {
  dueAt: Date;
  lastReviewAt: Date | null;
  state: number;
  reps: number;
  lapses: number;
  stability: number;
  difficulty: number;
  scheduledDays: number;
  [key: string]: unknown;
}

export interface ReviewOutcome {
  fsrs: Record<string, unknown>; // JSON-safe card
  dueAt: string;
  state: number;
  reps: number;
  lapses: number;
}

type Scheduler = Awaited<ReturnType<typeof DefaultScheduler>>;
let schedulerPromise: Promise<Scheduler> | null = null;

export function getScheduler(): Promise<Scheduler> {
  schedulerPromise ??= DefaultScheduler({
    desiredRetention: 0.9,
    enableFuzz: true,
    learningSteps: ["1m", "10m"],
    relearningSteps: ["10m"],
    maximumInterval: 3650,
  });
  return schedulerPromise;
}

export function deserialize(stored: Record<string, unknown>): FsrsCard {
  return {
    ...stored,
    dueAt: new Date(stored.dueAt as string),
    lastReviewAt: stored.lastReviewAt ? new Date(stored.lastReviewAt as string) : null,
  } as FsrsCard;
}

export function serialize(card: FsrsCard): Record<string, unknown> {
  return JSON.parse(JSON.stringify(card));
}

/** Apply a grade to a card's stored FSRS state (or a fresh card) and return what to persist. */
export async function review(
  stored: Record<string, unknown> | null,
  grade: Grade,
  now: Date = new Date(),
): Promise<ReviewOutcome> {
  const scheduler = await getScheduler();
  const card = stored ? deserialize(stored) : scheduler.newCard({ now });
  const { card: next } = scheduler.review({ card: card as never, grade, now }) as unknown as { card: FsrsCard };
  return {
    fsrs: serialize(next),
    dueAt: next.dueAt.toISOString(),
    state: next.state,
    reps: next.reps,
    lapses: next.lapses,
  };
}

/** Human-readable interval preview for each grade button, e.g. "10m", "4d". */
export async function previewIntervals(
  stored: Record<string, unknown> | null,
  now: Date = new Date(),
): Promise<Record<Grade, string>> {
  const scheduler = await getScheduler();
  const card = stored ? deserialize(stored) : scheduler.newCard({ now });
  const out = {} as Record<Grade, string>;
  for (const item of scheduler.preview({ card: card as never, now }) as Iterable<{ grade: Grade; card: FsrsCard }>) {
    out[item.grade] = formatInterval(item.card.dueAt.getTime() - now.getTime());
  }
  return out;
}

export function formatInterval(ms: number): string {
  const min = Math.max(1, Math.round(ms / 60_000));
  if (min < 60) return `${min}m`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h}h`;
  const d = Math.round(h / 24);
  if (d < 30) return `${d}d`;
  const mo = Math.round(d / 30);
  return mo < 12 ? `${mo}mo` : `${(d / 365).toFixed(1)}y`;
}

/** Quiz modes map right/wrong onto FSRS grades. */
export const gradeForQuiz = (correct: boolean): Grade => (correct ? 3 : 1);
