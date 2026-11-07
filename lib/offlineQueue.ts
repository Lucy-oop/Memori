import { get, set } from "idb-keyval";

/**
 * Reviews answered while offline (or when a request fails) are queued in IndexedDB
 * and replayed in order once the connection is back.
 */
export interface QueuedReview {
  p_card_id: string;
  p_mode: string;
  p_correct: boolean;
  p_rating: number | null;
  p_fsrs: Record<string, unknown> | null;
  p_due_at: string | null;
  p_state: number | null;
  p_reps: number | null;
  p_lapses: number | null;
  p_reviewed_at: string;
}

const KEY = "memori:review-queue";

export async function enqueue(review: QueuedReview): Promise<void> {
  const q = ((await get(KEY)) as QueuedReview[] | undefined) ?? [];
  q.push(review);
  await set(KEY, q);
}

export async function pendingCount(): Promise<number> {
  return (((await get(KEY)) as QueuedReview[] | undefined) ?? []).length;
}

let flushing: Promise<number> | null = null;

/** Send queued reviews one by one; stops at the first failure. Returns how many were sent. */
export function flush(send: (r: QueuedReview) => Promise<void>): Promise<number> {
  flushing ??= (async () => {
    let sent = 0;
    try {
      const q = ((await get(KEY)) as QueuedReview[] | undefined) ?? [];
      while (q.length) {
        await send(q[0]);
        q.shift();
        sent++;
        await set(KEY, q);
      }
    } catch {
      // still offline — keep the rest for next time
    } finally {
      flushing = null;
    }
    return sent;
  })();
  return flushing;
}
