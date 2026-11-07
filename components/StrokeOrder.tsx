"use client";

import { useState } from "react";

/** KanjiVG stroke-order diagram (CC BY-SA 3.0), loaded on demand from the jsDelivr CDN. */
export function StrokeOrder({ kanji }: { kanji: string }) {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const code = kanji.codePointAt(0)!.toString(16).padStart(5, "0");
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button type="button" className="text-sm font-medium text-primary underline-offset-2 hover:underline" onClick={() => setOpen(!open)}>
        {open ? "Hide stroke order" : "Show stroke order"}
      </button>
      {open &&
        (failed ? (
          <p className="mt-1 text-sm text-muted">Stroke order unavailable offline.</p>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${code}.svg`}
            alt={`Stroke order for ${kanji}`}
            onError={() => setFailed(true)}
            className="mt-2 h-32 w-32 rounded-lg bg-white p-1 dark:invert"
          />
        ))}
    </div>
  );
}
