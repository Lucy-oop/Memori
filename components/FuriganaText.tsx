import clsx from "clsx";
import { furiganaSegments } from "@/lib/furigana";

/** Renders a word with <ruby> readings; `show=false` hides them but keeps the layout stable. */
export function FuriganaText({
  term,
  reading,
  furigana,
  show,
  className,
}: {
  term: string;
  reading: string | null;
  furigana?: string | null;
  show: boolean;
  className?: string;
}) {
  const segments = furiganaSegments(term, reading, furigana);
  return (
    <span lang="ja" className={clsx("font-jp", !show && "furigana-hidden", className)}>
      {segments.map((s, i) =>
        s.ruby ? (
          <ruby key={i}>
            {s.text}
            <rt>{s.ruby}</rt>
          </ruby>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </span>
  );
}
