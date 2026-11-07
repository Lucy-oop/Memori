import { describe, expect, it } from "vitest";
import { currentStreak, heatmapGrid, longestStreak, todayIn } from "@/lib/streak";

const act = (...days: string[]) => days.map((day) => ({ day, reviews: 5, correct: 4 }));

describe("streaks", () => {
  it("counts consecutive days ending today", () => {
    expect(currentStreak(act("2026-10-30", "2026-10-31", "2026-11-01"), "2026-11-01")).toBe(3);
  });
  it("keeps yesterday's streak alive until today ends", () => {
    expect(currentStreak(act("2026-10-30", "2026-10-31"), "2026-11-01")).toBe(2);
  });
  it("resets after a missed day", () => {
    expect(currentStreak(act("2026-10-29", "2026-10-30"), "2026-11-01")).toBe(0);
  });
  it("ignores days with zero reviews", () => {
    expect(currentStreak([...act("2026-10-31"), { day: "2026-11-01", reviews: 0, correct: 0 }], "2026-11-01")).toBe(1);
  });
  it("crosses month boundaries and finds the longest run", () => {
    expect(longestStreak(act("2026-09-29", "2026-09-30", "2026-10-01", "2026-10-05"))).toBe(3);
  });
  it("uses the user's timezone for 'today'", () => {
    const t = new Date("2026-11-01T20:00:00Z");
    expect(todayIn("UTC", t)).toBe("2026-11-01");
    expect(todayIn("Asia/Yangon", t)).toBe("2026-11-02"); // UTC+6:30
    expect(todayIn("Asia/Tokyo", t)).toBe("2026-11-02");
  });
  it("builds week columns ending today", () => {
    const g = heatmapGrid(act("2026-11-01"), "2026-11-01", 2);
    expect(g).toHaveLength(2);
    expect(g[1].at(-1)).toEqual({ day: "2026-11-01", reviews: 5 });
  });
});
