"use client";

import clsx from "clsx";
import { AlertTriangle } from "lucide-react";
import { useLibrary } from "./LibraryProvider";
import type { StudyCard } from "@/lib/types";

/** Side-by-side comparison of a kanji and the ones it's easily confused with. */
export function SimilarKanjiPanel({ card, compact }: { card: StudyCard; compact?: boolean }) {
  const { byTerm } = useLibrary();
  const chars = card.type === "kanji" ? card.similar : [...new Set(card.similar)];
  if (chars.length === 0) return null;

  const all = [card.term, ...chars.filter((c) => c !== card.term)];
  return (
    <section
      aria-label="Similar kanji warning"
      className="rounded-xl border border-warn/40 bg-warn/10 p-3 text-left"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-warn">
        <AlertTriangle size={14} /> Don&apos;t confuse
      </div>
      <div className="flex flex-wrap gap-2">
        {all.map((ch) => {
          const k = byTerm.get(ch);
          const self = ch === card.term;
          return (
            <div
              key={ch}
              className={clsx(
                "flex min-w-16 flex-col items-center rounded-lg border px-2 py-1.5",
                self ? "border-primary bg-primary-soft" : "border-line bg-surface",
              )}
            >
              <span lang="ja" className={clsx("font-jp leading-none", compact ? "text-3xl" : "text-4xl")}>
                {ch}
              </span>
              <span className="mt-1 max-w-20 truncate text-[11px] text-muted">{k?.meaning_en[0] ?? ""}</span>
            </div>
          );
        })}
      </div>
      {card.similar_note && (
        <ul className="mt-2 space-y-1 text-sm text-ink/90">
          {card.similar_note.split("\n").map((line, i) => (
            <li key={i} lang="ja">{line}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
