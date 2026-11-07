/**
 * Builds supabase/seed.sql with the built-in N5/N4 kanji and vocabulary cards.
 *
 * Sources (downloaded into scripts/seed/.cache on first run):
 *   - kanji:  github.com/davidluzgouveia/kanji-data (MIT; derived from KANJIDIC2, EDRDG CC BY-SA)
 *   - vocab:  github.com/jamsinclair/open-anki-jlpt-decks (MIT; JLPT lists by Jonathan Waller)
 *   - similar kanji: scripts/seed/data/similar-kanji.json (hand-curated)
 *
 * Run: npm run seed:build
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Papa from "papaparse";
import { toKatakana } from "wanakana";

const here = dirname(fileURLToPath(import.meta.url));
const cacheDir = join(here, ".cache");
const outFile = join(here, "../../supabase/seed.sql");

const SOURCES = {
  "kanji.json": "https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json",
  "n5.csv": "https://raw.githubusercontent.com/jamsinclair/open-anki-jlpt-decks/main/src/n5.csv",
  "n4.csv": "https://raw.githubusercontent.com/jamsinclair/open-anki-jlpt-decks/main/src/n4.csv",
};

async function load(name: keyof typeof SOURCES): Promise<string> {
  const path = join(cacheDir, name);
  if (!existsSync(path)) {
    mkdirSync(cacheDir, { recursive: true });
    console.log(`downloading ${name}…`);
    const res = await fetch(SOURCES[name]);
    if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
    writeFileSync(path, await res.text());
  }
  return readFileSync(path, "utf8");
}

interface KanjiEntry {
  strokes: number;
  jlpt_new: number | null;
  meanings: string[];
  readings_on: string[];
  readings_kun: string[];
}

interface Row {
  type: "kanji" | "vocab";
  term: string;
  reading: string | null;
  meaning_en: string[];
  onyomi: string[];
  kunyomi: string[];
  stroke_count: number | null;
  similar: string[];
  similar_note: string | null;
  example_jp: string | null;
  jlpt_level: number;
  tags: string[];
}

/** Split "to meet, to see (someone)" on commas/semicolons that aren't inside parentheses. */
function splitMeanings(s: string): string[] {
  return s
    .split(/[;,](?![^(]*\))/)
    .map((m) => m.trim())
    .filter(Boolean)
    .slice(0, 5);
}

const sql = (v: unknown): string => {
  if (v === null || v === undefined) return "null";
  if (typeof v === "number") return String(v);
  if (Array.isArray(v)) return v.length ? `array[${v.map(sql).join(",")}]::text[]` : "'{}'::text[]";
  return `'${String(v).replace(/'/g, "''")}'`;
};

async function main() {
  const kanjiData: Record<string, KanjiEntry> = JSON.parse(await load("kanji.json"));
  const groups: { chars: string[]; note: string }[] = JSON.parse(
    readFileSync(join(here, "data/similar-kanji.json"), "utf8"),
  );

  // ── vocab ──
  const vocab = new Map<string, Row>();
  for (const level of [5, 4] as const) {
    const csv = await load(`n${level}.csv`);
    const { data } = Papa.parse<{ expression: string; reading: string; meaning: string }>(csv, {
      header: true,
      skipEmptyLines: true,
    });
    for (const r of data) {
      const term = r.expression.trim();
      const reading = r.reading.trim();
      const key = `${term}|${reading}`;
      if (vocab.has(key)) continue; // keep the easier level
      vocab.set(key, {
        type: "vocab",
        term,
        reading,
        meaning_en: splitMeanings(r.meaning),
        onyomi: [],
        kunyomi: [],
        stroke_count: null,
        similar: [],
        similar_note: null,
        example_jp: null,
        jlpt_level: level,
        tags: [`N${level}`],
      });
    }
  }

  // ── kanji ──
  const kanji: Row[] = [];
  for (const [ch, k] of Object.entries(kanjiData)) {
    if (k.jlpt_new !== 5 && k.jlpt_new !== 4) continue;

    const inGroups = groups.filter((g) => g.chars.includes(ch));
    const similar = [...new Set(inGroups.flatMap((g) => g.chars))].filter((c) => c !== ch);

    // Up to 4 example words from the vocab lists that use this kanji, easiest first.
    const words = [...vocab.values()]
      .filter((v) => v.term.includes(ch) && v.term !== ch)
      .sort((a, b) => b.jlpt_level - a.jlpt_level || a.term.length - b.term.length)
      .slice(0, 4)
      .map((v) => `${v.term}（${v.reading}）${v.meaning_en[0] ?? ""}`);

    kanji.push({
      type: "kanji",
      term: ch,
      reading: null,
      meaning_en: k.meanings.filter((m) => !/radical/i.test(m)).map((m) => m.toLowerCase()),
      onyomi: k.readings_on.map((r) => toKatakana(r)),
      kunyomi: k.readings_kun,
      stroke_count: k.strokes,
      similar,
      similar_note: inGroups.map((g) => g.note).join("\n") || null,
      example_jp: words.join("\n") || null,
      jlpt_level: k.jlpt_new,
      tags: [`N${k.jlpt_new}`],
    });
  }

  const rows = [...kanji, ...vocab.values()];
  const cols = ["type", "term", "reading", "meaning_en", "onyomi", "kunyomi", "stroke_count", "similar", "similar_note", "example_jp", "jlpt_level", "tags"] as const;

  const lines = [
    "-- Generated by scripts/seed/build.ts — do not edit by hand.",
    "-- Kanji data © EDRDG (KANJIDIC2, CC BY-SA 4.0) via davidluzgouveia/kanji-data (MIT).",
    "-- Vocabulary lists via jamsinclair/open-anki-jlpt-decks (MIT).",
    "",
  ];
  for (let i = 0; i < rows.length; i += 200) {
    const chunk = rows.slice(i, i + 200);
    // "similar" is a reserved word in Postgres, so quote every column name.
    lines.push(`insert into public.cards (${cols.map((c) => `"${c}"`).join(", ")}) values`);
    lines.push(chunk.map((r) => `  (${cols.map((c) => sql(r[c])).join(", ")})`).join(",\n"));
    lines.push(
      "on conflict (type, term, coalesce(reading, '')) where owner_id is null do update set",
      "  meaning_en = excluded.meaning_en, onyomi = excluded.onyomi, kunyomi = excluded.kunyomi,",
      '  stroke_count = excluded.stroke_count, "similar" = excluded."similar", similar_note = excluded.similar_note,',
      "  example_jp = excluded.example_jp, jlpt_level = excluded.jlpt_level, tags = excluded.tags;",
      "",
    );
  }
  writeFileSync(outFile, lines.join("\n"));

  const count = (t: string, l: number) => rows.filter((r) => r.type === t && r.jlpt_level === l).length;
  console.log(
    `wrote ${outFile}\n  kanji N5 ${count("kanji", 5)}, N4 ${count("kanji", 4)}\n  vocab N5 ${count("vocab", 5)}, N4 ${count("vocab", 4)}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
