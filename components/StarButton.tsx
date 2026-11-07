"use client";

import clsx from "clsx";
import { Star } from "lucide-react";
import { useState } from "react";
import { setStarred } from "@/lib/data";
import type { StudyCard } from "@/lib/types";
import { useLibrary } from "./LibraryProvider";

export function StarButton({ card, className }: { card: StudyCard; className?: string }) {
  const { patchState } = useLibrary();
  const [busy, setBusy] = useState(false);
  const starred = !!card.userState?.starred;
  return (
    <button
      type="button"
      aria-label={starred ? "Remove from review list" : "Mark for review"}
      aria-pressed={starred}
      disabled={busy}
      onClick={async (e) => {
        e.stopPropagation();
        setBusy(true);
        patchState(card.id, { starred: !starred });
        try {
          await setStarred(card.id, !starred);
        } catch {
          patchState(card.id, { starred });
        } finally {
          setBusy(false);
        }
      }}
      className={clsx("rounded-full p-2 transition hover:bg-surface-2", className)}
    >
      <Star size={20} className={starred ? "fill-star text-star" : "text-muted"} />
    </button>
  );
}
