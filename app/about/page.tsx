import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-5 p-6">
      <Image src="/logo-full.png" alt="Memori (メモリ)" width={360} height={201} className="rounded-2xl" />
      <p>Memori is a flashcard app for JLPT N5–N4 kanji and vocabulary, with spaced repetition, Kanji Trap quizzes and typing practice.</p>
      <h2 className="text-lg font-semibold">Data credits</h2>
      <ul className="list-disc space-y-2 pl-5 text-sm">
        <li>Kanji readings and meanings: <a className="underline" href="https://www.edrdg.org/wiki/index.php/KANJIDIC_Project">KANJIDIC2</a> © EDRDG, CC BY-SA 4.0, via <a className="underline" href="https://github.com/davidluzgouveia/kanji-data">kanji-data</a> (MIT).</li>
        <li>N5/N4 vocabulary lists: <a className="underline" href="https://github.com/jamsinclair/open-anki-jlpt-decks">open-anki-jlpt-decks</a> (MIT), based on Jonathan Waller&apos;s JLPT lists.</li>
        <li>Stroke order diagrams: <a className="underline" href="https://kanjivg.tagaini.net/">KanjiVG</a> © Ulrich Apel, CC BY-SA 3.0.</li>
        <li>Scheduling: <a className="underline" href="https://github.com/open-spaced-repetition/ts-fsrs">ts-fsrs</a> (FSRS algorithm).</li>
      </ul>
      <p className="text-sm text-muted">Cards tagged #Soumatome are created by you; Memori does not include content from the So-matome books.</p>
      <Link href="/" className="text-primary underline">← Back</Link>
    </main>
  );
}
