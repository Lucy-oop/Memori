import { describe, expect, it } from "vitest";
import { checkAnswer, diffChars } from "@/lib/answerCheck";
import { card } from "./helpers";

const au = card({ type: "vocab", term: "会う", reading: "あう", meaning_en: ["to meet", "to see"], meaning_my: "တွေ့သည်" });
const machi = card({ term: "待", kunyomi: ["ま.つ"], onyomi: ["タイ"], meaning_en: ["wait", "depend on"] });

describe("checkAnswer", () => {
  it("accepts romaji, hiragana and katakana readings", () => {
    expect(checkAnswer(au, "reading", "au").correct).toBe(true);
    expect(checkAnswer(au, "reading", "あう").correct).toBe(true);
    expect(checkAnswer(au, "reading", "アウ").correct).toBe(true);
    expect(checkAnswer(au, "reading", "ai").correct).toBe(false);
  });
  it("accepts any kanji reading, ignoring okurigana dots", () => {
    expect(checkAnswer(machi, "reading", "matsu").correct).toBe(true);
    expect(checkAnswer(machi, "reading", "tai").correct).toBe(true);
  });
  it("accepts any listed meaning, case- and 'to'-insensitive, plus Burmese", () => {
    expect(checkAnswer(au, "meaning", "Meet").correct).toBe(true);
    expect(checkAnswer(au, "meaning", "to see").correct).toBe(true);
    expect(checkAnswer(au, "meaning", "တွေ့သည်").correct).toBe(true);
    expect(checkAnswer(au, "meaning", "eat").correct).toBe(false);
  });
  it("forgives one typo in longer meanings but flags it", () => {
    const r = checkAnswer(machi, "meaning", "depend onn");
    expect(r).toMatchObject({ correct: true, typo: true });
    expect(checkAnswer(machi, "meaning", "wiat").correct).toBe(false);
  });
  it("rejects empty input", () => {
    expect(checkAnswer(au, "meaning", "  ").correct).toBe(false);
  });
});

describe("diffChars", () => {
  it("marks missing and extra characters", () => {
    expect(diffChars("まち", "まつ")).toEqual([
      { text: "ま", kind: "same" }, { text: "ち", kind: "extra" }, { text: "つ", kind: "missing" },
    ]);
  });
});
