import { describe, expect, it } from "vitest";
import { buildQuestion } from "@/lib/distractors";
import { card, seeded } from "./helpers";

const matsu = card({ term: "待", meaning_en: ["wait"], kunyomi: ["ま.つ"], similar: ["持", "特"], radical: "彳" });
const motsu = card({ term: "持", meaning_en: ["hold"], kunyomi: ["も.つ"] });
const toku = card({ term: "特", meaning_en: ["special"], onyomi: ["トク"] });
const filler = ["山", "川", "日", "月", "火", "水"].map((t, i) => card({ term: t, meaning_en: [`m${i}`], onyomi: [`r${i}`] }));
const pool = [matsu, motsu, toku, ...filler];

describe("buildQuestion", () => {
  it("prefers similar kanji as traps", () => {
    for (let s = 1; s < 20; s++) {
      const q = buildQuestion(matsu, pool, "meaning-term", seeded(s));
      expect(q.options).toContain("持");
      expect(q.options).toContain("特");
      expect(q.trapOptions.sort()).toEqual(["持", "特"]);
    }
  });

  it("uses reverse similar links too", () => {
    const q = buildQuestion(motsu, pool, "meaning-term", seeded(3));
    expect(q.options).toContain("待");
  });

  it("always yields 4 unique options with the answer at answerIndex", () => {
    for (let s = 1; s < 50; s++) {
      for (const dir of ["term-meaning", "meaning-term", "term-reading"] as const) {
        const q = buildQuestion(filler[s % filler.length], pool, dir, seeded(s));
        expect(q.options).toHaveLength(4);
        expect(new Set(q.options).size).toBe(4);
        expect(q.options[q.answerIndex]).toBeDefined();
      }
    }
  });

  it("skips distractors whose text equals the answer", () => {
    const dupe = card({ term: "外", meaning_en: ["wait"] });
    const q = buildQuestion(matsu, [...pool, dupe], "term-meaning", seeded(2));
    expect(q.options.filter((o) => o === "wait")).toHaveLength(1);
  });
});
