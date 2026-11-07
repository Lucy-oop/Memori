import { describe, expect, it } from "vitest";
import {
  buildSession,
  currentUnit,
  levelProgress,
  nextPosition,
  startOfLevel,
  unlockedUnits,
  type Position,
  type Unit,
} from "@/lib/curriculum";
import type { StudyCard } from "@/lib/types";
import { card, seeded } from "./helpers";

/** Build a fake course: each (level, week, day) gets `per` vocab cards. */
function course(spec: { level: number; weeks: number; days: number }[], per = 5) {
  const units: Unit[] = [];
  const cards: StudyCard[] = [];
  for (const { level, weeks, days } of spec) {
    for (let w = 1; w <= weeks; w++) {
      for (let d = 1; d <= days; d++) {
        const ids: string[] = [];
        for (let i = 0; i < per; i++) {
          const c = { ...card({ type: "vocab", jlpt_level: level, term: `N${level}w${w}d${d}-${i}` }), userState: null };
          cards.push(c);
          ids.push(c.id);
        }
        units.push({ id: `u${level}-${w}-${d}`, level, track: "goi", week: w, day: d, title: null, source: "auto", card_ids: ids });
      }
    }
  }
  return { units, cards };
}

const spec = [
  { level: 5, weeks: 1, days: 3 },
  { level: 4, weeks: 1, days: 3 },
  { level: 3, weeks: 2, days: 7 },
];
const at = (level: number, week: number, day: number): Position => ({ track: "goi", level, week, day });

describe("unlockedUnits", () => {
  it("unlocks all easier levels plus the current level up to the current day", () => {
    const { units } = course(spec);
    const got = unlockedUnits(units, at(3, 1, 3)).map((u) => u.id);
    expect(got).toEqual(["u5-1-1", "u5-1-2", "u5-1-3", "u4-1-1", "u4-1-2", "u4-1-3", "u3-1-1", "u3-1-2", "u3-1-3"]);
  });

  it("includes earlier weeks of the current level", () => {
    const { units } = course(spec);
    const got = unlockedUnits(units, at(3, 2, 1)).filter((u) => u.level === 3);
    expect(got).toHaveLength(8); // week 1 (7 days) + week 2 day 1
  });

  it("ignores the other track", () => {
    const { units } = course(spec);
    expect(unlockedUnits(units, { ...at(3, 1, 3), track: "kanji" })).toEqual([]);
  });
});

describe("position helpers", () => {
  it("currentUnit and nextPosition walk the course, crossing levels", () => {
    const { units } = course(spec);
    expect(currentUnit(units, at(3, 1, 3))?.id).toBe("u3-1-3");
    expect(nextPosition(units, at(3, 1, 7))).toEqual(at(3, 2, 1));
    expect(nextPosition(units, at(4, 1, 3))).toEqual(at(3, 1, 1));
    expect(nextPosition(units, at(3, 2, 7))).toBeNull();
  });

  it("startOfLevel picks the level's first day", () => {
    const { units } = course(spec);
    expect(startOfLevel(units, "goi", 4)).toEqual(at(4, 1, 1));
  });

  it("levelProgress counts reached days per level", () => {
    const { units } = course(spec);
    expect(levelProgress(units, at(3, 1, 3))).toEqual([
      { level: 5, total: 3, reached: 3 },
      { level: 4, total: 3, reached: 3 },
      { level: 3, total: 14, reached: 3 },
    ]);
  });
});

describe("buildSession", () => {
  it("learn = exactly the current day's cards", () => {
    const { units, cards } = course(spec);
    const s = buildSession(cards, units, at(3, 1, 3), "learn", { rand: seeded(1) });
    expect(s.map((c) => c.term).sort()).toEqual([0, 1, 2, 3, 4].map((i) => `N3w1d3-${i}`));
  });

  it("review only draws from unlocked cards, with no duplicates", () => {
    const { units, cards } = course(spec, 10);
    for (let seed = 1; seed < 20; seed++) {
      const s = buildSession(cards, units, at(3, 1, 3), "review", { size: 20, rand: seeded(seed) });
      expect(s).toHaveLength(20);
      expect(new Set(s.map((c) => c.id)).size).toBe(20);
      for (const c of s) {
        const [, lvl, w, d] = c.term.match(/^N(\d)w(\d)d(\d)/)!.map(Number);
        const ok = lvl > 3 || (lvl === 3 && w === 1 && d <= 3);
        expect(ok, c.term).toBe(true);
      }
    }
  });

  it("review weights today's day (~40%) and includes due cards", () => {
    const { units, cards } = course(spec, 10);
    const now = new Date("2026-11-07T12:00:00Z");
    const dueCard = cards.find((c) => c.term === "N5w1d1-0")!;
    dueCard.userState = {
      card_id: dueCard.id, fsrs: { stability: 1 }, due_at: "2026-11-01T00:00:00Z", state: 2, reps: 2, lapses: 0,
      right_count: 2, wrong_count: 0, starred: false, override: {},
    };
    const s = buildSession(cards, units, at(3, 1, 3), "review", { size: 20, now, rand: seeded(3) });
    expect(s.filter((c) => c.term.startsWith("N3w1d3")).length).toBe(8);
    expect(s.some((c) => c.id === dueCard.id)).toBe(true);
  });

  it("returns fewer cards when the pool is small", () => {
    const { units, cards } = course([{ level: 5, weeks: 1, days: 1 }], 3);
    expect(buildSession(cards, units, at(5, 1, 1), "review", { size: 20, rand: seeded(1) })).toHaveLength(3);
  });
});
