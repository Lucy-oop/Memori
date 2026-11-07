import { describe, expect, it } from "vitest";
import { filterCards, mastery, srsQueue } from "@/lib/filters";
import type { CardState, StudyCard } from "@/lib/types";
import { card } from "./helpers";

const now = new Date("2026-11-01T12:00:00Z");
const st = (p: Partial<CardState>): CardState => ({
  card_id: "", fsrs: { stability: 1 }, due_at: null, state: 2, reps: 1, lapses: 0,
  right_count: 0, wrong_count: 0, starred: false, override: {}, ...p,
});
const sc = (p: Parameters<typeof card>[0], s: Partial<CardState> | null = null): StudyCard => ({ ...card(p), userState: s ? st(s) : null });

const a = sc({ term: "待", type: "kanji", jlpt_level: 4, tags: ["N4", "Soumatome"] }, { due_at: "2026-11-01T00:00:00Z", starred: true });
const b = sc({ term: "山", type: "kanji", jlpt_level: 5, tags: ["N5"] });
const c = sc({ term: "会う", type: "vocab", reading: "あう", meaning_en: ["to meet"], jlpt_level: 5, tags: ["N5"] }, { due_at: "2026-10-30T00:00:00Z", lapses: 5 });
const d = sc({ term: "見る", type: "vocab", jlpt_level: 5, tags: ["N5"] }, { due_at: "2026-12-01T00:00:00Z", fsrs: { stability: 40 } });
const all = [a, b, c, d];

describe("filterCards", () => {
  it("filters by type, level and tags (with or without #)", () => {
    expect(filterCards(all, { type: "kanji" })).toEqual([a, b]);
    expect(filterCards(all, { levels: [5], type: "vocab" })).toEqual([c, d]);
    expect(filterCards(all, { tags: ["#soumatome"] })).toEqual([a]);
  });
  it("filters by due/new/starred/leech", () => {
    expect(filterCards(all, { only: "due" }, now)).toEqual([a, c]);
    expect(filterCards(all, { only: "new" })).toEqual([b]);
    expect(filterCards(all, { only: "starred" })).toEqual([a]);
    expect(filterCards(all, { only: "leech" })).toEqual([c]);
  });
  it("mistakes = leeches plus cards missed at least as often as answered right", () => {
    const missedOnce = sc({ term: "x1" }, { wrong_count: 1, right_count: 1 });
    const recovered = sc({ term: "x2" }, { wrong_count: 1, right_count: 3 });
    expect(filterCards([...all, missedOnce, recovered], { only: "mistakes" })).toEqual([c, missedOnce]);
  });
  it("searches term, reading and meaning", () => {
    expect(filterCards(all, { search: "meet" })).toEqual([c]);
    expect(filterCards(all, { search: "あう" })).toEqual([c]);
  });
});

describe("srsQueue", () => {
  it("puts most overdue first, then new cards up to the limit", () => {
    expect(srsQueue(all, 10, now)).toEqual([c, a, b]);
    expect(srsQueue(all, 0, now)).toEqual([c, a]);
  });
});

describe("mastery", () => {
  it("buckets by FSRS state and stability", () => {
    expect(mastery(b)).toBe("new");
    expect(mastery(a)).toBe("review");
    expect(mastery(d)).toBe("mastered");
  });
});
