import type { Card } from "./types";

export type McDirection = "term-meaning" | "meaning-term" | "term-reading";

export interface McQuestion<C extends Card = Card> {
  card: C;
  direction: McDirection;
  prompt: string;
  options: string[];
  answerIndex: number;
  /** Options that came from the card's Similar Kanji field — highlighted after answering. */
  trapOptions: string[];
}

export function primaryReading(c: Card): string {
  if (c.type === "vocab") return c.reading ?? c.term;
  return (c.kunyomi[0] ?? c.onyomi[0] ?? "").replace(/[.\-]/g, "");
}

export function primaryMeaning(c: Card): string {
  return c.meaning_en.slice(0, 2).join(", ");
}

function answerFor(c: Card, dir: McDirection): string {
  if (dir === "term-meaning") return primaryMeaning(c);
  if (dir === "meaning-term") return c.term;
  return primaryReading(c);
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const sharesKanji = (a: string, b: string) => [...a].some((ch) => /\p{Script=Han}/u.test(ch) && b.includes(ch));

/**
 * Build a 4-option "Kanji Trap" question. Distractors are chosen in priority order:
 *   1. cards listed in the target's Similar field (and cards listing the target as similar)
 *   2. same type + same JLPT level that share a radical, a kanji, or a reading
 *   3. any other card of the same type
 * Options are unique by displayed text, so there are always exactly `count` choices
 * when the pool is large enough.
 */
export function buildQuestion<C extends Card>(
  card: C,
  pool: Card[],
  direction: McDirection,
  rand: () => number = Math.random,
  count = 4,
): McQuestion<C> {
  const answer = answerFor(card, direction);
  const seen = new Set([answer]);
  const picked: string[] = [];
  const trapOptions: string[] = [];

  const others = pool.filter((c) => c.id !== card.id && c.type === card.type);
  const take = (cands: Card[], trap = false) => {
    for (const c of shuffle(cands, rand)) {
      if (picked.length >= count - 1) return;
      const text = answerFor(c, direction);
      if (!text || seen.has(text)) continue;
      seen.add(text);
      picked.push(text);
      if (trap) trapOptions.push(text);
    }
  };

  const similarSet = new Set(card.similar);
  take(others.filter((c) => similarSet.has(c.term) || c.similar.includes(card.term)), true);

  const reading = primaryReading(card);
  take(
    others.filter(
      (c) =>
        c.jlpt_level === card.jlpt_level &&
        ((card.radical && c.radical === card.radical) ||
          sharesKanji(card.term, c.term) ||
          (reading && primaryReading(c) === reading)),
    ),
  );
  take(others.filter((c) => c.jlpt_level === card.jlpt_level));
  take(others);

  const options = shuffle([answer, ...picked], rand);
  const prompt = direction === "meaning-term" ? primaryMeaning(card) : card.term;
  return { card, direction, prompt, options, answerIndex: options.indexOf(answer), trapOptions };
}
