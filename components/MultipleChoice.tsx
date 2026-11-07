"use client";

import { MeaningText } from "./MeaningText";
import clsx from "clsx";
import { AlertTriangle, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { McQuestion } from "@/lib/distractors";
import type { StudyCard } from "@/lib/types";
import { FuriganaText } from "./FuriganaText";
import { useLibrary } from "./LibraryProvider";
import { SimilarKanjiPanel } from "./SimilarKanjiPanel";
import { Button, LevelBadge, Panel } from "./ui";

const PROMPT_LABEL = {
  "term-meaning": "What does this mean?",
  "meaning-term": "Which one means…",
  "term-reading": "How do you read this?",
} as const;

/** "Kanji Trap" multiple choice: similar-looking kanji are pulled in as distractors. */
export function MultipleChoice({
  question,
  onAnswer,
  onNext,
}: {
  question: McQuestion<StudyCard>;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}) {
  const { furigana } = useLibrary();
  const [chosen, setChosen] = useState<number | null>(null);
  const answered = chosen !== null;
  const { card } = question;
  const jpOptions = question.direction !== "term-meaning";

  const choose = (i: number) => {
    if (answered) return;
    setChosen(i);
    onAnswer(i === question.answerIndex);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (!answered && n >= 1 && n <= question.options.length) choose(n - 1);
      else if (answered && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const fellForTrap = answered && chosen !== question.answerIndex && question.trapOptions.includes(question.options[chosen]);

  return (
    <div className="space-y-4">
      <Panel className="flex min-h-56 flex-col items-center justify-center gap-2 p-6 text-center">
        <div className="flex items-center gap-2 text-sm text-muted">
          <LevelBadge level={card.jlpt_level} /> {PROMPT_LABEL[question.direction]}
        </div>
        {question.direction === "meaning-term" ? (
          <p className="text-3xl font-semibold">{question.prompt}</p>
        ) : card.type === "vocab" ? (
          <FuriganaText
            term={card.term}
            reading={card.reading}
            furigana={card.furigana}
            show={furigana && question.direction !== "term-reading"}
            className="text-5xl leading-[1.9]"
          />
        ) : (
          <span lang="ja" className="font-jp text-8xl leading-none">{card.term}</span>
        )}
      </Panel>

      <div className="grid gap-2 sm:grid-cols-2">
        {question.options.map((opt, i) => {
          const isAnswer = i === question.answerIndex;
          const isChosen = i === chosen;
          const isTrap = question.trapOptions.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => choose(i)}
              disabled={answered}
              className={clsx(
                "relative flex min-h-16 items-center gap-3 rounded-xl border px-4 py-3 text-left transition",
                !answered && "border-line bg-surface hover:border-primary hover:bg-primary-soft",
                answered && isAnswer && "border-good bg-good/15",
                answered && isChosen && !isAnswer && "border-bad bg-bad/15",
                answered && !isAnswer && !isChosen && "border-line bg-surface opacity-60",
              )}
            >
              <kbd className="hidden h-6 w-6 shrink-0 items-center justify-center rounded-md bg-surface-2 text-xs text-muted sm:flex">{i + 1}</kbd>
              <span lang={jpOptions ? "ja" : undefined} className={clsx("flex-1", jpOptions ? "font-jp text-2xl" : "text-base")}>
                {opt}
              </span>
              {answered && isAnswer && <Check className="text-good" size={20} />}
              {answered && isChosen && !isAnswer && <X className="text-bad" size={20} />}
              {answered && isTrap && !isAnswer && (
                <span className="absolute right-2 top-1 text-[10px] font-semibold uppercase text-warn">trap</span>
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="space-y-3">
          {fellForTrap && (
            <p className="flex items-center gap-2 rounded-xl bg-warn/15 px-3 py-2 text-sm text-warn">
              <AlertTriangle size={16} /> You picked a look-alike kanji — check the difference below.
            </p>
          )}
          {card.type === "kanji" && card.similar.length > 0 && <SimilarKanjiPanel card={card} />}
          <Panel className="p-4 text-sm">
            <span lang="ja" className="font-jp text-lg">{card.term}</span>{" "}
            {card.reading && <span lang="ja" className="font-jp text-muted">（{card.reading}）</span>}
            {card.type === "kanji" && <span lang="ja" className="font-jp text-muted"> {[...card.onyomi, ...card.kunyomi].join("、")}</span>}
            <span> — </span><MeaningText card={card} />
          </Panel>
          <Button className="w-full" onClick={onNext}>Next <kbd className="text-xs opacity-70">Enter</kbd></Button>
        </div>
      )}
    </div>
  );
}
