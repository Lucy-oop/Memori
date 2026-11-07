"use client";

import { ArrowLeft, ListChecks, Play } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useLibrary } from "@/components/LibraryProvider";
import { MeaningText } from "@/components/MeaningText";
import { SpeakButton } from "@/components/SpeakButton";
import { StarButton } from "@/components/StarButton";
import { Button, Empty, Panel, Segmented, Spinner } from "@/components/ui";
import { isMistake } from "@/lib/filters";
import { t, tf } from "@/lib/i18n";
import type { CardType } from "@/lib/types";

/** Mistakes notebook: every card you keep missing, worst first, with one-tap practice. */
export default function MistakesPage() {
  const { cards, loading, lang } = useLibrary();
  const [type, setType] = useState<"all" | CardType>("all");

  const list = useMemo(
    () =>
      cards
        .filter((c) => isMistake(c) && (type === "all" || c.type === type))
        .sort((a, b) => {
          const sa = a.userState!, sb = b.userState!;
          return sb.wrong_count - sb.right_count - (sa.wrong_count - sa.right_count) || sb.lapses - sa.lapses;
        }),
    [cards, type],
  );

  if (loading) return <Spinner />;

  const typeParam = type === "all" ? "" : `&type=${type}`;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/" aria-label="Back"><Button variant="ghost" size="sm"><ArrowLeft size={18} /></Button></Link>
        <h1 className="text-2xl font-bold">{t(lang, "mistakesTitle")}</h1>
      </div>
      <p className="text-sm text-muted">{t(lang, "mistakesSub")}</p>

      <Segmented
        value={type}
        onChange={setType}
        options={[
          { value: "all", label: `All` },
          { value: "vocab", label: t(lang, "vocab") },
          { value: "kanji", label: t(lang, "kanji") },
        ]}
      />

      {list.length === 0 ? (
        <Empty title={t(lang, "mistakesEmpty")}>{t(lang, "mistakesEmptySub")}</Empty>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Link href={`/study?mode=flip&only=mistakes${typeParam}`}>
              <Button className="w-full"><Play size={18} /> {t(lang, "practiceFlash")}</Button>
            </Link>
            <Link href={`/study?mode=mc&only=mistakes${typeParam}`}>
              <Button variant="secondary" className="w-full"><ListChecks size={18} /> {t(lang, "practiceQuiz")}</Button>
            </Link>
          </div>

          <Panel className="divide-y divide-line">
            {list.map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span lang="ja" className="font-jp text-xl">{c.term}</span>
                    {c.reading && c.reading !== c.term && <span lang="ja" className="font-jp text-sm text-muted">{c.reading}</span>}
                    <span className="text-xs text-muted">N{c.jlpt_level}</span>
                  </div>
                  <MeaningText card={c} max={2} className="block truncate text-sm" />
                </div>
                <span className="shrink-0 text-xs tabular-nums text-muted">
                  {tf(lang, "wrongRight", { w: c.userState!.wrong_count, r: c.userState!.right_count })}
                </span>
                <SpeakButton text={c.reading ?? c.term} />
                <StarButton card={c} />
              </div>
            ))}
          </Panel>
        </>
      )}
    </div>
  );
}
