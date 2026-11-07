import { isRomaji, toHiragana } from "wanakana";
import type { Card } from "./types";

export type TypingField = "meaning" | "reading";

/** Lowercase, strip punctuation/brackets/"to " prefixes so "To meet (someone)" ≈ "meet". */
export function normalizeMeaning(s: string): string {
  return s
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/^\s*(to|a|an|the)\s+/, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Any kana/romaji → hiragana, dropping okurigana dots, dashes and spaces used in dictionary readings. */
export function normalizeReading(s: string): string {
  const cleaned = s.trim().replace(/[\s.\-・]/g, "");
  return toHiragana(isRomaji(cleaned) ? cleaned.toLowerCase() : cleaned);
}

export function acceptedAnswers(card: Card, field: TypingField): string[] {
  if (field === "meaning") {
    const all = card.meaning_en.flatMap((m) => m.split(/[;,/]/));
    if (card.meaning_my) all.push(...card.meaning_my.split(/[;,/၊]/));
    return all.map((m) => m.trim()).filter(Boolean);
  }
  if (card.type === "vocab") return card.reading ? [card.reading] : [];
  return [...card.kunyomi, ...card.onyomi];
}

export interface CheckResult {
  correct: boolean;
  /** The accepted answer closest to what was typed — shown in the result diff. */
  closest: string;
  /** Slightly-off answer (one typo in a longer meaning): counted correct but flagged. */
  typo: boolean;
}

function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return dp[b.length];
}

export function checkAnswer(card: Card, field: TypingField, input: string): CheckResult {
  const accepted = acceptedAnswers(card, field);
  if (!input.trim() || accepted.length === 0) return { correct: false, closest: accepted[0] ?? "", typo: false };

  const norm = field === "meaning" ? normalizeMeaning : normalizeReading;
  const given = norm(input);
  let best = { dist: Infinity, answer: accepted[0] };
  for (const a of accepted) {
    const d = levenshtein(given, norm(a));
    if (d < best.dist) best = { dist: d, answer: a };
  }
  if (best.dist === 0) return { correct: true, closest: best.answer, typo: false };
  // Readings must be exact; English meanings forgive one typo once they're 5+ letters.
  const typo = field === "meaning" && best.dist === 1 && norm(best.answer).length >= 5;
  return { correct: typo, closest: best.answer, typo };
}

export interface DiffPart {
  text: string;
  kind: "same" | "missing" | "extra";
}

/** Character diff between typed text and the expected answer, for the result screen. */
export function diffChars(given: string, expected: string): DiffPart[] {
  const a = [...given];
  const b = [...expected];
  const lcs = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--)
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);

  const out: DiffPart[] = [];
  const push = (text: string, kind: DiffPart["kind"]) => {
    const last = out[out.length - 1];
    if (last?.kind === kind) last.text += text;
    else out.push({ text, kind });
  };
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      push(a[i++], "same");
      j++;
    }
    else if (lcs[i + 1][j] >= lcs[i][j + 1]) push(a[i++], "extra");
    else push(b[j++], "missing");
  }
  while (i < a.length) push(a[i++], "extra");
  while (j < b.length) push(b[j++], "missing");
  return out;
}
