"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { previewIntervals, type Grade } from "@/lib/srs";

const GRADES: { grade: Grade; label: string; cls: string }[] = [
  { grade: 1, label: "Again", cls: "bg-bad/15 text-bad border-bad/40" },
  { grade: 2, label: "Hard", cls: "bg-warn/15 text-warn border-warn/40" },
  { grade: 3, label: "Good", cls: "bg-good/15 text-good border-good/40" },
  { grade: 4, label: "Easy", cls: "bg-primary-soft text-primary border-primary/40" },
];

/** Again / Hard / Good / Easy with the next interval for each; keys 1–4. */
export function ConfidenceButtons({
  fsrs,
  onGrade,
  disabled,
}: {
  fsrs: Record<string, unknown> | null;
  onGrade: (g: Grade) => void;
  disabled?: boolean;
}) {
  const [intervals, setIntervals] = useState<Partial<Record<Grade, string>>>({});

  useEffect(() => {
    let live = true;
    previewIntervals(fsrs).then((p) => live && setIntervals(p));
    return () => {
      live = false;
    };
  }, [fsrs]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (disabled || e.target instanceof HTMLInputElement) return;
      const g = Number(e.key);
      if (g >= 1 && g <= 4) onGrade(g as Grade);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onGrade, disabled]);

  return (
    <div className="grid grid-cols-4 gap-2">
      {GRADES.map(({ grade, label, cls }) => (
        <button
          key={grade}
          disabled={disabled}
          onClick={() => onGrade(grade)}
          className={clsx(
            "flex h-16 flex-col items-center justify-center rounded-xl border font-semibold transition active:scale-95 disabled:opacity-50",
            cls,
          )}
        >
          <span>{label}</span>
          <span className="text-xs font-normal opacity-80">
            {intervals[grade] ?? "…"} <kbd className="ml-1 hidden opacity-60 sm:inline">{grade}</kbd>
          </span>
        </button>
      ))}
    </div>
  );
}
