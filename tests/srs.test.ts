import { describe, expect, it } from "vitest";
import { formatInterval, previewIntervals, review } from "@/lib/srs";

describe("srs", () => {
  const now = new Date("2026-11-01T00:00:00Z");
  it("schedules a new card and round-trips through JSON", async () => {
    const first = await review(null, 3, now);
    expect(new Date(first.dueAt).getTime()).toBeGreaterThan(now.getTime());
    expect(first.reps).toBe(1);
    const stored = JSON.parse(JSON.stringify(first.fsrs));
    const later = new Date(first.dueAt);
    const second = await review(stored, 3, later);
    expect(second.reps).toBe(2);
    expect(new Date(second.dueAt).getTime()).toBeGreaterThan(new Date(first.dueAt).getTime());
  });
  it("counts a lapse when a review card is failed", async () => {
    let s = await review(null, 4, now);
    s = await review(s.fsrs, 1, new Date(s.dueAt));
    expect(s.lapses).toBe(1);
  });
  it("previews increasing intervals across grades", async () => {
    const p = await previewIntervals(null, now);
    expect(Object.keys(p).sort()).toEqual(["1", "2", "3", "4"]);
  });
  it("formats intervals", () => {
    expect(formatInterval(10 * 60_000)).toBe("10m");
    expect(formatInterval(4 * 86_400_000)).toBe("4d");
  });
});
