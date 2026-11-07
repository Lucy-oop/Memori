import type { Card } from "@/lib/types";

let n = 0;
export function card(partial: Partial<Card>): Card {
  return {
    id: `c${n++}`, owner_id: null, type: "kanji", term: "?", reading: null, furigana: null,
    meaning_en: [], meaning_my: null, pos: null, onyomi: [], kunyomi: [], stroke_count: null,
    radical: null, similar: [], similar_note: null, example_jp: null, example_en: null,
    example_my: null, notes: null, jlpt_level: 5, tags: [], image_url: null, image_credit: null, ...partial,
  };
}

/** Deterministic PRNG so shuffles are reproducible. */
export function seeded(seed = 1) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}
