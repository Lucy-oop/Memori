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
  /** Owner of the review. Never sent to the server; used so one account's queue can't post to another. */
  user_id?: string;
}

const KEY = "memori:review-queue";

export async function enqueue(review: QueuedReview): Promise<void> {
  const q = ((await get(KEY)) as QueuedReview[] | undefined) ?? [];
  q.push(review);
  await set(KEY, q);
}

let flushing: Promise<number> | null = null;

/** Reviews queued by `userId` (legacy entries without an owner count as theirs). */
export async function pendingCount(userId?: string): Promise<number> {
  const q = ((await get(KEY)) as QueuedReview[] | undefined) ?? [];
  return userId ? q.filter((r) => !r.user_id || r.user_id === userId).length : q.length;
}

/**
 * Send the signed-in user's queued reviews one by one; stops at the first failure.
 * Reviews queued by other accounts on this device stay queued for when they sign back in.
 * Returns how many were sent.
 */
export function flush(userId: string, send: (r: QueuedReview) => Promise<void>): Promise<number> {
  flushing ??= (async () => {
    let sent = 0;
    try {
      const q = ((await get(KEY)) as QueuedReview[] | undefined) ?? [];
      const mine = (r: QueuedReview) => !r.user_id || r.user_id === userId;
      for (let i = 0; i < q.length; ) {
        if (!mine(q[i])) { i++; continue; }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { user_id, ...payload } = q[i];
        await send(payload);
        q.splice(i, 1);
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
