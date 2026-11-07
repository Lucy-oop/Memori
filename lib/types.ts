export type CardType = "vocab" | "kanji";
export type StudyMode = "flip" | "srs" | "mc" | "type";

export interface Card {
  id: string;
  owner_id: string | null;
  type: CardType;
  term: string;
  reading: string | null;
  furigana: string | null;
  meaning_en: string[];
  meaning_my: string | null;
  pos: string | null;
  onyomi: string[];
  kunyomi: string[];
  stroke_count: number | null;
  radical: string | null;
  similar: string[];
  similar_note: string | null;
  example_jp: string | null;
  example_en: string | null;
  example_my: string | null;
  notes: string | null;
  jlpt_level: number | null;
  tags: string[];
}

/** Personal edits a user keeps on top of a built-in card. */
export type CardOverride = Partial<
  Pick<Card, "meaning_my" | "notes" | "similar" | "similar_note" | "example_my" | "tags">
>;

export interface CardState {
  card_id: string;
  fsrs: Record<string, unknown> | null;
  due_at: string | null;
  state: number;
  reps: number;
  lapses: number;
  right_count: number;
  wrong_count: number;
  starred: boolean;
  override: CardOverride;
}

/** A card merged with the current user's state and overrides — what study screens use. */
export interface StudyCard extends Card {
  userState: CardState | null;
}

export interface Profile {
  id: string;
  display_name: string | null;
  timezone: string;
  daily_goal: number;
  furigana_default: boolean;
}

export const CARD_COLUMNS =
  "id, owner_id, type, term, reading, furigana, meaning_en, meaning_my, pos, onyomi, kunyomi, stroke_count, radical, similar, similar_note, example_jp, example_en, example_my, notes, jlpt_level, tags";

export function applyOverride(card: Card, state: CardState | null): StudyCard {
  const o = state?.override ?? {};
  return {
    ...card,
    meaning_my: o.meaning_my ?? card.meaning_my,
    notes: o.notes ?? card.notes,
    similar: o.similar ?? card.similar,
    similar_note: o.similar_note ?? card.similar_note,
    example_my: o.example_my ?? card.example_my,
    tags: o.tags ? Array.from(new Set([...card.tags, ...o.tags])) : card.tags,
    userState: state,
  };
}
