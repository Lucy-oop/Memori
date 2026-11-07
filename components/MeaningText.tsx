"use client";

import clsx from "clsx";
import { meaningsOf, type Card } from "@/lib/types";
import { useLibrary } from "./LibraryProvider";

/** A card's meanings in the learner's chosen language (EN / မြန်မာ), falling back to English. */
export function MeaningText({
  card,
  max,
  className,
}: {
  card: Pick<Card, "meaning_en" | "meaning_my">;
  max?: number;
  className?: string;
}) {
  const { lang } = useLibrary();
  const burmese = lang === "my" && !!card.meaning_my?.trim();
  const list = meaningsOf(card, lang);
  return (
    <span lang={burmese ? "my" : "en"} className={clsx(burmese && "font-my", className)}>
      {(max ? list.slice(0, max) : list).join(burmese ? "၊ " : "; ")}
    </span>
  );
}
