"use client";

import { get, set } from "idb-keyval";
import { enqueue, flush, type QueuedReview } from "./offlineQueue";
import { review as fsrsReview, type Grade } from "./srs";
import { supabaseBrowser } from "./supabase/client";
import {
  applyOverride,
  CARD_COLUMNS,
  type Card,
  type CardOverride,
  type CardState,
  type CardType,
  type Profile,
  type StudyCard,
  type StudyMode,
} from "./types";
import type { DayActivity } from "./streak";

const db = () => supabaseBrowser();
const PAGE = 1000;

async function currentUserId(): Promise<string> {
  const { data } = await db().auth.getSession();
  const id = data.session?.user.id;
  if (!id) throw new Error("Not signed in");
  return id;
}

/** Fetch with IndexedDB fallback so decks stay studyable offline. */
async function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  try {
    const value = await load();
    set(key, value).catch(() => {});
    return value;
  } catch (e) {
    const hit = (await get(key)) as T | undefined;
    if (hit !== undefined) return hit;
    throw e;
  }
}

// ───────────── cards ─────────────

async function fetchAllCards(): Promise<Card[]> {
  const out: Card[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db()
      .from("cards")
      .select(CARD_COLUMNS)
      .order("jlpt_level", { ascending: false })
      .order("created_at")
      .range(from, from + PAGE - 1);
    if (error) throw error;
    out.push(...(data as Card[]));
    if (!data || data.length < PAGE) return out;
  }
}

async function fetchAllStates(): Promise<CardState[]> {
  const out: CardState[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db()
      .from("user_card_state")
      .select("card_id, fsrs, due_at, state, reps, lapses, right_count, wrong_count, starred, override")
      .range(from, from + PAGE - 1);
    if (error) throw error;
    out.push(...(data as CardState[]));
    if (!data || data.length < PAGE) return out;
  }
}

/** Every card the user can see, merged with their progress and personal edits. */
export async function loadLibrary(): Promise<StudyCard[]> {
  return cached("memori:library", async () => {
    const [cards, states] = await Promise.all([fetchAllCards(), fetchAllStates()]);
    const byId = new Map(states.map((s) => [s.card_id, s]));
    return cards.map((c) => applyOverride(c, byId.get(c.id) ?? null));
  });
}

export async function loadCard(id: string): Promise<StudyCard | null> {
  const { data, error } = await db().from("cards").select(CARD_COLUMNS).eq("id", id).maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const { data: state } = await db()
    .from("user_card_state")
    .select("card_id, fsrs, due_at, state, reps, lapses, right_count, wrong_count, starred, override")
    .eq("card_id", id)
    .maybeSingle();
  return applyOverride(data as Card, (state as CardState) ?? null);
}

export type CardInput = Omit<Card, "id" | "owner_id">;

export async function saveCard(input: CardInput, id?: string): Promise<string> {
  const owner_id = await currentUserId();
  const q = id
    ? db().from("cards").update(input).eq("id", id).select("id").single()
    : db().from("cards").insert({ ...input, owner_id }).select("id").single();
  const { data, error } = await q;
  if (error) throw error;
  return data.id as string;
}

export async function insertCards(inputs: CardInput[]): Promise<number> {
  const owner_id = await currentUserId();
  let n = 0;
  for (let i = 0; i < inputs.length; i += 500) {
    const chunk = inputs.slice(i, i + 500).map((c) => ({ ...c, owner_id }));
    const { error } = await db().from("cards").insert(chunk);
    if (error) throw error;
    n += chunk.length;
  }
  return n;
}

export async function deleteCard(id: string): Promise<void> {
  const { error } = await db().from("cards").delete().eq("id", id);
  if (error) throw error;
}

/** Personal edits on a built-in card live in user_card_state.override. */
export async function saveOverride(cardId: string, override: CardOverride): Promise<void> {
  const user_id = await currentUserId();
  const { error } = await db()
    .from("user_card_state")
    .upsert({ user_id, card_id: cardId, override }, { onConflict: "user_id,card_id" });
  if (error) throw error;
}

export async function setStarred(cardId: string, starred: boolean): Promise<void> {
  const user_id = await currentUserId();
  const { error } = await db()
    .from("user_card_state")
    .upsert({ user_id, card_id: cardId, starred }, { onConflict: "user_id,card_id" });
  if (error) throw error;
}

// ───────────── reviews ─────────────

async function sendReview(r: QueuedReview): Promise<void> {
  const { error } = await db().rpc("record_review", r);
  if (error) throw error;
}

/**
 * Record an answer. SRS/quiz modes reschedule the card with FSRS; flip mode only
 * counts towards right/wrong and the daily streak. Works offline via the queue.
 * Returns the card's new state so the session can update without refetching.
 */
export async function recordReview(
  card: StudyCard,
  mode: StudyMode,
  correct: boolean,
  grade?: Grade,
): Promise<Partial<CardState>> {
  const now = new Date();
  const schedule = mode !== "flip" && grade ? await fsrsReview(card.userState?.fsrs ?? null, grade, now) : null;
  const payload: QueuedReview = {
    p_card_id: card.id,
    p_mode: mode,
    p_correct: correct,
    p_rating: grade ?? null,
    p_fsrs: schedule?.fsrs ?? null,
    p_due_at: schedule?.dueAt ?? null,
    p_state: schedule?.state ?? null,
    p_reps: schedule?.reps ?? null,
    p_lapses: schedule?.lapses ?? null,
    p_reviewed_at: now.toISOString(),
  };
  try {
    if (!navigator.onLine) throw new Error("offline");
    await sendReview(payload);
  } catch {
    await enqueue(payload);
  }
  return schedule
    ? { fsrs: schedule.fsrs, due_at: schedule.dueAt, state: schedule.state, reps: schedule.reps, lapses: schedule.lapses }
    : {};
}

export const flushOfflineReviews = () => flush(sendReview);

// ───────────── decks ─────────────

export interface Deck {
  id: string;
  name: string;
  description: string | null;
  card_ids: string[];
}

export async function loadDecks(): Promise<Deck[]> {
  return cached("memori:decks", async () => {
    const { data, error } = await db()
      .from("decks")
      .select("id, name, description, deck_cards(card_id)")
      .order("created_at");
    if (error) throw error;
    return (data ?? []).map((d) => ({
      id: d.id,
      name: d.name,
      description: d.description,
      card_ids: (d.deck_cards as { card_id: string }[]).map((x) => x.card_id),
    }));
  });
}

export async function createDeck(name: string, description?: string): Promise<string> {
  const owner_id = await currentUserId();
  const { data, error } = await db().from("decks").insert({ owner_id, name, description }).select("id").single();
  if (error) throw error;
  return data.id as string;
}

export async function deleteDeck(id: string): Promise<void> {
  const { error } = await db().from("decks").delete().eq("id", id);
  if (error) throw error;
}

export async function setDeckMembership(cardId: string, deckIds: string[], allDeckIds: string[]): Promise<void> {
  const remove = allDeckIds.filter((d) => !deckIds.includes(d));
  if (remove.length) {
    const { error } = await db().from("deck_cards").delete().eq("card_id", cardId).in("deck_id", remove);
    if (error) throw error;
  }
  if (deckIds.length) {
    const { error } = await db()
      .from("deck_cards")
      .upsert(deckIds.map((deck_id) => ({ deck_id, card_id: cardId })), { onConflict: "deck_id,card_id" });
    if (error) throw error;
  }
}

export async function addCardsToDeck(deckId: string, cardIds: string[]): Promise<void> {
  const { error } = await db()
    .from("deck_cards")
    .upsert(cardIds.map((card_id) => ({ deck_id: deckId, card_id })), { onConflict: "deck_id,card_id" });
  if (error) throw error;
}

// ───────────── profile & activity ─────────────

export async function loadProfile(): Promise<Profile> {
  return cached("memori:profile", async () => {
    const id = await currentUserId();
    const { data, error } = await db()
      .from("profiles")
      .select("id, display_name, timezone, daily_goal, furigana_default")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data as Profile;
  });
}

export async function updateProfile(patch: Partial<Omit<Profile, "id">>): Promise<void> {
  const id = await currentUserId();
  const { error } = await db().from("profiles").update(patch).eq("id", id);
  if (error) throw error;
  set("memori:profile", undefined).catch(() => {});
}

export async function loadActivity(sinceDay: string): Promise<DayActivity[]> {
  return cached("memori:activity", async () => {
    const { data, error } = await db()
      .from("daily_activity")
      .select("day, reviews, correct")
      .gte("day", sinceDay)
      .order("day");
    if (error) throw error;
    return data as DayActivity[];
  });
}

export async function signOut(): Promise<void> {
  await db().auth.signOut();
  await Promise.all(["memori:library", "memori:decks", "memori:profile", "memori:activity"].map((k) => set(k, undefined)));
}

export type { CardType };
