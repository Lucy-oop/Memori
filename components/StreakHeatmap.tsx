import { heatmapGrid, type DayActivity } from "@/lib/streak";

function level(reviews: number, goal: number): number {
  if (reviews === 0) return 0;
  if (reviews < goal / 2) return 1;
  if (reviews < goal) return 2;
  if (reviews < goal * 2) return 3;
  return 4;
}

const SHADES = ["var(--surface-2)", "#b9dcc4", "#7cc29a", "#3b9a64", "#1e5b36"];

/** GitHub-style calendar of reviews per day; darker = more reviews relative to the daily goal. */
export function StreakHeatmap({ days, today, goal, weeks = 18 }: { days: DayActivity[]; today: string; goal: number; weeks?: number }) {
  const grid = heatmapGrid(days, today, weeks);
  return (
    <div className="overflow-x-auto">
      <div className="inline-flex gap-[3px]" role="img" aria-label={`Study activity for the last ${weeks} weeks`}>
        {grid.map((col, i) => (
          <div key={i} className="flex flex-col gap-[3px]">
            {col.map((d) => (
              <div
                key={d.day}
                title={`${d.day}: ${d.reviews} review${d.reviews === 1 ? "" : "s"}`}
                className="h-3 w-3 rounded-[3px] sm:h-3.5 sm:w-3.5"
                style={{ background: SHADES[level(d.reviews, goal)] }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-end gap-1 text-[11px] text-muted">
        Less {SHADES.map((s) => <span key={s} className="h-2.5 w-2.5 rounded-[2px]" style={{ background: s }} />)} More
      </div>
    </div>
  );
}
