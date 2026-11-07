"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { bind, unbind } from "wanakana";
import { checkAnswer, diffChars, normalizeMeaning, normalizeReading, type CheckResult, type TypingField } from "@/lib/answerCheck";
import type { StudyCard } from "@/lib/types";
import { FuriganaText } from "./FuriganaText";
import { useLibrary } from "./LibraryProvider";
import { SimilarKanjiPanel } from "./SimilarKanjiPanel";
import { Button, LevelBadge, Panel } from "./ui";

/**
 * Active recall: type the meaning (English or Burmese) or the reading.
 * Reading mode converts romaji → hiragana as you type (matsu → まつ).
 */
export function TypingQuiz({
  card,
  field,
  onAnswer,
  onNext,
}: {
  card: StudyCard;
  field: TypingField;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}) {
  const { furigana } = useLibrary();
  const [value, setValue] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    if (field === "reading") {
      bind(el, { IMEMode: "toHiragana" });
      return () => unbind(el);
    }
  }, [field, card.id]);

  useEffect(() => {
    if (!result) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onNext();
      }
    };
    // Defer so the Enter that submitted doesn't also advance.
    const t = setTimeout(() => window.addEventListener("keydown", onKey), 50);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [result, onNext]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (result) return;
    const typed = inputRef.current?.value ?? value;
    const r = checkAnswer(card, field, typed);
    setValue(typed);
    setResult(r);
    onAnswer(r.correct);
  };

  const norm = field === "meaning" ? normalizeMeaning : normalizeReading;

  return (
    <div className="space-y-4">
      <Panel className="flex min-h-56 flex-col items-center justify-center gap-2 p-6 text-center">
        <div className="flex items-center gap-2 text-sm text-muted">
          <LevelBadge level={card.jlpt_level} /> Type the {field === "meaning" ? "meaning (English or Burmese)" : "reading (romaji or kana)"}
        </div>
        {card.type === "vocab" ? (
          <FuriganaText term={card.term} reading={card.reading} furigana={card.furigana} show={furigana && field === "meaning"} className="text-5xl leading-[1.9]" />
        ) : (
          <span lang="ja" className="font-jp text-8xl leading-none">{card.term}</span>
        )}
      </Panel>

      <form onSubmit={submit} className="flex gap-2">
        <input
          ref={inputRef}
          value={field === "meaning" ? value : undefined}
          onChange={field === "meaning" ? (e) => setValue(e.target.value) : undefined}
          disabled={!!result}
          lang={field === "reading" ? "ja" : undefined}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={field === "reading" ? "e.g. matsu → まつ" : "e.g. wait"}
          aria-label="Your answer"
          className={clsx(
            "h-13 min-w-0 flex-1 rounded-xl border bg-surface px-4 text-lg outline-none focus:border-primary",
            field === "reading" && "font-jp",
            result ? (result.correct ? "border-good" : "border-bad") : "border-line",
          )}
        />
        {!result && <Button type="submit" size="lg">Check</Button>}
      </form>

      {result && (
        <div className="space-y-3">
          <Panel className={clsx("p-4", result.correct ? "border-good/50" : "border-bad/50")}>
            <p className={clsx("font-semibold", result.correct ? "text-good" : "text-bad")}>
              {result.correct ? (result.typo ? "Correct (small typo)" : "Correct!") : "Not quite"}
            </p>
            {!result.correct || result.typo ? (
              <p className="mt-1 text-lg" lang={field === "reading" ? "ja" : undefined}>
                {diffChars(norm(value), norm(result.closest)).map((p, i) => (
                  <span
                    key={i}
                    className={clsx(
                      p.kind === "extra" && "text-bad line-through",
                      p.kind === "missing" && "rounded bg-good/20 text-good",
                    )}
                  >
                    {p.text}
                  </span>
                ))}
              </p>
            ) : null}
            <p className="mt-2 text-sm text-muted">
              <span lang="ja" className="font-jp">
                {card.type === "vocab" ? card.reading : [...card.onyomi, ...card.kunyomi].join("、")}
              </span>{" "}
              — {card.meaning_en.join("; ")}
              {card.meaning_my && <span lang="my" className="font-my"> · {card.meaning_my}</span>}
            </p>
          </Panel>
          {!result.correct && card.similar.length > 0 && <SimilarKanjiPanel card={card} />}
          <Button className="w-full" onClick={onNext}>Next <kbd className="text-xs opacity-70">Enter</kbd></Button>
        </div>
      )}
    </div>
  );
}
