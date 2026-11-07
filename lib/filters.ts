import { shuffle } from "./random";
import type { CardType, StudyCard } from "./types";

export type Only = "all" | "due" | "new" | "starred" | "leech";

export interface CardFilter {
  type?: CardType;
  levels?: number[];
  tags?: string[];
  only?: Only;
  deckCardIds?: Set<string> | null;
  search?: string;
}

export const isNew = (c: StudyCard) => !c.userState?.fsrs;
export const isDue = (c: StudyCard, now = new Date()) =>
  !!c.userState?.due_at && new Date(c.userState.due_at) <= now;
export const isLeech = (c: StudyCard) => {
  const s = c.userState;
  return !!s && (s.lapses >= 4 || (s.wrong_count >= 4 && s.wrong_count > s.right_count));
};

const normTag = (t: string) => t.replace(/^#/, "").toLowerCase();

export function filterCards(cards: StudyCard[], f: CardFilter, now = new Date()): StudyCard[] {
  const wantTags = (f.tags ?? []).map(normTag);
  const q = f.search?.trim().toLowerCase();
  return cards.filter((c) => {
    if (f.type && c.type !== f.type) return false;
    if (f.levels?.length && !f.levels.includes(c.jlpt_level ?? 0)) return false;
    if (wantTags.length && !wantTags.every((t) => c.tags.some((ct) => normTag(ct) === t))) return false;
    if (f.deckCardIds && !f.deckCardIds.has(c.id)) return false;
    switch (f.only) {
      case "due": if (!isDue(c, now)) return false; break;
      case "new": if (!isNew(c)) return false; break;
      case "starred": if (!c.userState?.starred) return false; break;
      case "leech": if (!isLeech(c)) return false; break;
    }
    if (q) {
      const hay = [c.term, c.reading, ...c.meaning_en, c.meaning_my, ...c.onyomi, ...c.kunyomi]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

/** SRS session queue: due cards (most overdue first) then up to `newLimit` new cards, picked at random. */
export function srsQueue(cards: StudyCard[], newLimit = 10, now = new Date(), rand: () => number = Math.random): StudyCard[] {
  const due = cards
    .filter((c) => isDue(c, now))
    .sort((a, b) => new Date(a.userState!.due_at!).getTime() - new Date(b.userState!.due_at!).getTime());
  const fresh = shuffle(cards.filter(isNew), rand).slice(0, newLimit);
  return [...due, ...fresh];
}

export function allTags(cards: StudyCard[]): string[] {
  const set = new Set<string>();
  cards.forEach((c) => c.tags.forEach((t) => set.add(t.replace(/^#/, ""))));
  const order = ["N5", "N4", "N3", "N2", "N1"];
  return [...set].sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    return a.localeCompare(b);
  });
}

export type MasteryBucket = "new" | "learning" | "review" | "mastered";

/** New → Learning (state 1/3) → Review → Mastered (review state with ≥21 days stability). */
export function mastery(c: StudyCard): MasteryBucket {
  const s = c.userState;
  if (!s?.fsrs) return "new";
  if (s.state === 1 || s.state === 3) return "learning";
  const stability = Number((s.fsrs as { stability?: number }).stability ?? 0);
  return stability >= 21 ? "mastered" : "review";
}
