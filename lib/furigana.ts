import { toHiragana } from "wanakana";

export interface RubySegment {
  text: string;
  /** Reading shown above `text`; absent for kana that needs no furigana. */
  ruby?: string;
}

// CJK ideographs (incl. Ext A and compatibility) plus the repeat/abbreviation marks.
const KANJI = "\\u3400-\\u9fff\\uf900-\\ufaff々〆ヶ";
const KANJI_SPLIT = new RegExp(`([${KANJI}]+)`, "u");
const IS_KANJI_RUN = new RegExp(`^[${KANJI}]+$`, "u");
const BRACKET = new RegExp(`([${KANJI}]+)\\[([^\\]]+)\\]|([^\\[]+?)(?=[${KANJI}]+\\[|$)`, "gu");

const isKanjiRun = (s: string) => IS_KANJI_RUN.test(s);
const hira = (s: string) => toHiragana(s, { convertLongVowelMark: false });
const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Parse explicit bracket notation: "待[ま]つ" or "日本[にほん]語[ご]".
 * The ruby attaches to the kanji run directly before the brackets.
 */
export function parseBracketFurigana(src: string): RubySegment[] {
  const out: RubySegment[] = [];
  for (const m of src.matchAll(BRACKET)) {
    if (m[1]) out.push({ text: m[1], ruby: m[2] });
    else if (m[3]) out.push({ text: m[3] });
  }
  return out;
}

/**
 * Split a word into ruby segments by aligning it with its kana reading:
 * kana in the term must appear in the reading, kanji runs absorb the rest.
 * 待つ/まつ → [待|ま][つ]; 食べ物/たべもの → [食|た][べ][物|もの].
 * Falls back to one ruby over the whole word when alignment fails.
 */
export function alignFurigana(term: string, reading: string | null | undefined): RubySegment[] {
  if (!reading) return [{ text: term }];
  const parts = term.split(KANJI_SPLIT).filter(Boolean);
  if (!parts.some(isKanjiRun)) return [{ text: term }];

  const pattern = parts.map((p) => (isKanjiRun(p) ? "(.+?)" : `(${escapeRegex(hira(p))})`)).join("");
  const match = new RegExp(`^${pattern}$`, "u").exec(hira(reading));
  if (!match) return [{ text: term, ruby: reading }];

  return parts.map((p, i) => (isKanjiRun(p) ? { text: p, ruby: match[i + 1] } : { text: p }));
}

export function furiganaSegments(term: string, reading: string | null, explicit?: string | null): RubySegment[] {
  return explicit ? parseBracketFurigana(explicit) : alignFurigana(term, reading);
}
