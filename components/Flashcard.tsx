"use client";

import { MeaningText } from "./MeaningText";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { speak } from "@/lib/speech";
import type { StudyCard } from "@/lib/types";
import { FuriganaText } from "./FuriganaText";
import { useLibrary } from "./LibraryProvider";
import { SimilarKanjiPanel } from "./SimilarKanjiPanel";
import { SpeakButton } from "./SpeakButton";
import { StarButton } from "./StarButton";
import { StrokeOrder } from "./StrokeOrder";
import { LevelBadge } from "./ui";

/**
 * Quizlet-style card: click/tap or Space to flip (3D). The front hides the
 * reading when furigana is off; a per-card eye button peeks at it.
 */
export function Flashcard({
  card,
  flipped,
  onFlip,
  className,
}: {
  card: StudyCard;
  flipped: boolean;
  onFlip: () => void;
  className?: string;
}) {
  const { autoplay } = useLibrary();
  // Auto-play pronunciation when the answer side is revealed (Settings → Auto-play).
  useEffect(() => {
    if (flipped && autoplay) speak(card.type === "vocab" ? (card.reading ?? card.term) : card.term);
  }, [flipped, autoplay, card.id, card.type, card.reading, card.term]);

  return (
    <div className={clsx("flip-scene h-[min(62vh,480px)] w-full", className)}>
      <div
        role="button"
        tabIndex={0}
        aria-label={flipped ? "Show front" : "Show answer"}
        onClick={onFlip}
        onKeyDown={(e) => {
          if (e.key === "Enter") onFlip();
        }}
        className={clsx("flip-card h-full w-full cursor-pointer select-none", flipped && "is-flipped")}
      >
        <Face card={card} aria-hidden={flipped}>
          <Front card={card} />
        </Face>
        <Face card={card} back aria-hidden={!flipped}>
          {card.type === "kanji" ? <KanjiBack card={card} /> : <VocabBack card={card} />}
        </Face>
      </div>
    </div>
  );
}

function Face({ card, back, children, ...rest }: { card: StudyCard; back?: boolean; children: ReactNode; "aria-hidden": boolean }) {
  return (
    <div
      className={clsx(
        "flip-face flex flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-card",
        back && "flip-back",
      )}
      {...rest}
    >
      <div className="bg-rainbow h-1.5 w-full opacity-90" />
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex items-center gap-2">
          <LevelBadge level={card.jlpt_level} />
          <span className="text-xs uppercase tracking-wide text-muted">{card.type === "kanji" ? "Kanji" : "Vocabulary"}</span>
        </div>
        <div className="flex items-center">
          <SpeakButton text={card.type === "vocab" ? card.reading ?? card.term : card.term} />
          <StarButton card={card} />
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5">{children}</div>
    </div>
  );
}

function Front({ card }: { card: StudyCard }) {
  const { furigana } = useLibrary();
  const [peek, setPeek] = useState(false);
  const show = furigana || peek;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      {card.type === "vocab" ? (
        <FuriganaText
          term={card.term}
          reading={card.reading}
          furigana={card.furigana}
          show={show}
          className="text-5xl leading-[1.9] font-medium sm:text-6xl"
        />
      ) : (
        <span lang="ja" className="font-jp text-[8rem] leading-none sm:text-[10rem]">
          {card.term}
        </span>
      )}
      {!furigana && card.type === "vocab" && card.reading !== card.term && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setPeek(!peek);
          }}
          className="flex items-center gap-1 rounded-full px-3 py-1 text-sm text-muted hover:bg-surface-2"
        >
          {peek ? <EyeOff size={16} /> : <Eye size={16} />} {peek ? "Hide reading" : "Peek reading"}
        </button>
      )}
      <p className="text-xs text-muted">Tap to flip</p>
    </div>
  );
}

function Meanings({ card }: { card: StudyCard }) {
  return (
    <div className="space-y-2">
      {card.image_url && (
        // Remote images from Supabase Storage; plain <img> keeps them cacheable offline by the service worker.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={card.image_url}
          alt=""
          loading="lazy"
          className="mx-auto max-h-40 w-auto rounded-xl object-contain"
          title={card.image_credit ?? undefined}
        />
      )}
      <p className="text-xl font-semibold leading-relaxed"><MeaningText card={card} /></p>
    </div>
  );
}

function VocabBack({ card }: { card: StudyCard }) {
  const { lang } = useLibrary();
  // Translation in the chosen language; English when the Burmese draft is missing.
  const exampleTr = lang === "my" && card.example_my ? card.example_my : card.example_en;
  return (
    <div className="flex flex-1 flex-col gap-4 pt-2">
      <div className="text-center">
        <FuriganaText term={card.term} reading={card.reading} furigana={card.furigana} show className="text-4xl leading-[1.9]" />
        {card.reading && card.reading !== card.term && (
          <p lang="ja" className="font-jp text-lg text-muted">{card.reading}</p>
        )}
        {card.pos && <p className="text-xs italic text-muted">{card.pos}</p>}
      </div>
      <div className="text-center"><Meanings card={card} /></div>
      {card.example_jp && (
        <div className="flex items-start gap-2 rounded-xl bg-surface-2 p-3 text-sm">
          <div className="min-w-0 flex-1">
            <p lang="ja" className="font-jp text-base">{card.example_jp}</p>
            {exampleTr && (
              <p lang={exampleTr === card.example_my ? "my" : "en"} className={clsx("text-muted", exampleTr === card.example_my && "font-my")}>
                {exampleTr}
              </p>
            )}
          </div>
          <SpeakButton text={card.example_jp} />
        </div>
      )}
      {card.similar.length > 0 && <SimilarKanjiPanel card={card} compact />}
      <Extras card={card} />
    </div>
  );
}

function KanjiBack({ card }: { card: StudyCard }) {
  return (
    <div className="flex flex-1 flex-col gap-4 pt-2">
      <div className="flex items-start gap-4">
        <span lang="ja" className="font-jp text-7xl leading-none">{card.term}</span>
        <div className="min-w-0 flex-1 space-y-1">
          <Meanings card={card} />
          {card.stroke_count && <p className="text-xs text-muted">{card.stroke_count} strokes{card.radical ? ` · radical ${card.radical}` : ""}</p>}
        </div>
      </div>
      <dl lang="ja" className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-jp text-base">
        {card.onyomi.length > 0 && (<><dt className="text-xs font-sans text-muted self-center">音 On</dt><dd>{card.onyomi.join("、")}</dd></>)}
        {card.kunyomi.length > 0 && (<><dt className="text-xs font-sans text-muted self-center">訓 Kun</dt><dd>{card.kunyomi.join("、")}</dd></>)}
      </dl>
      {card.example_jp && (
        <div className="rounded-xl bg-surface-2 p-3">
          <p className="mb-1 text-xs uppercase tracking-wide text-muted">Words</p>
          <ul lang="ja" className="space-y-0.5 font-jp text-sm">
            {card.example_jp.split("\n").map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}
      <SimilarKanjiPanel card={card} compact />
      <StrokeOrder kanji={card.term} />
      <Extras card={card} />
    </div>
  );
}

function Extras({ card }: { card: StudyCard }) {
  return (
    <>
      {card.notes && <p className="whitespace-pre-line text-sm text-muted">{card.notes}</p>}
      {card.tags.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1">
          {card.tags.map((t) => (
            <span key={t} className="rounded-md bg-surface-2 px-1.5 py-0.5 text-xs text-muted">#{t}</span>
          ))}
        </div>
      )}
    </>
  );
}
