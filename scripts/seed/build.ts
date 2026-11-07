/**
 * Builds supabase/seed.sql with the built-in N5–N2 kanji and vocabulary cards.
 *
 * Sources (downloaded into scripts/seed/.cache on first run):
 *   - kanji:  github.com/davidluzgouveia/kanji-data (MIT; derived from KANJIDIC2, EDRDG CC BY-SA)
 *   - vocab:  github.com/jamsinclair/open-anki-jlpt-decks (MIT; JLPT lists by Jonathan Waller)
 *   - similar kanji: scripts/seed/data/similar-kanji.json (hand-curated)
 *
 * Run: npm run seed:build
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Papa from "papaparse";
import { toKatakana } from "wanakana";

const here = dirname(fileURLToPath(import.meta.url));
const cacheDir = join(here, ".cache");
/**
 * Output: numbered files in supabase/seed/, each small enough for the Supabase SQL Editor
 * (which rejects very large queries). Run them in filename order.
 */
const seedDir = join(here, "../../supabase/seed");
const MAX_FILE_BYTES = 150_000;
/** Burmese meanings (machine-translated draft, see translate-my.ts), keyed by `type|term|reading`. */
const translationsFile = join(here, "data/meaning-my.json");
/** Example sentences (Claude draft, see examples.ts), keyed by `type|term|reading`. */
const examplesFile = join(here, "data/examples.json");
/** Word list handed to translate-my.ts and examples.ts. */
const rowsFile = join(cacheDir, "rows.json");

/** Auto-split study days: cards per day, 7 days per week (Soumatome-style). */
const PER_DAY = { goi: 20, kanji: 10 } as const;

const SOURCES = {
  "kanji.json": "https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json",
  "n5.csv": "https://raw.githubusercontent.com/jamsinclair/open-anki-jlpt-decks/main/src/n5.csv",
  "n4.csv": "https://raw.githubusercontent.com/jamsinclair/open-anki-jlpt-decks/main/src/n4.csv",
  "n3.csv": "https://raw.githubusercontent.com/jamsinclair/open-anki-jlpt-decks/main/src/n3.csv",
  "n2.csv": "https://raw.githubusercontent.com/jamsinclair/open-anki-jlpt-decks/main/src/n2.csv",
};

/** Easiest first, so a word listed at several levels keeps the easiest one. */
const LEVELS = [5, 4, 3, 2] as const;

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
  freq: number | null;
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
  meaning_my: string | null;
  /** Ordering key within a level for the auto-split units (not stored). */
  order: number;
}

/** Small seeded PRNG so the auto-split is the same on every build. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
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
  for (const level of LEVELS) {
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
        meaning_my: null,
        order: 0,
      });
    }
  }

  // The source lists are alphabetical; mix them (deterministically) so a study day isn't all あ-words.
  const rand = mulberry32(20261107);
  for (const v of vocab.values()) v.order = rand();

  // ── kanji ──
  const kanji: Row[] = [];
  for (const [ch, k] of Object.entries(kanjiData)) {
    if (!k.jlpt_new || !(LEVELS as readonly number[]).includes(k.jlpt_new)) continue;

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
      meaning_my: null,
      // Most frequent kanji first.
      order: k.freq ?? 99999,
    });
  }

  const rows = [...kanji, ...vocab.values()];
  const my: Record<string, string> = existsSync(translationsFile) ? JSON.parse(readFileSync(translationsFile, "utf8")) : {};
  for (const r of rows) r.meaning_my = my[rowKey(r)] ?? null;
  writeFileSync(
    rowsFile,
    JSON.stringify(rows.map((r) => ({ key: rowKey(r), type: r.type, term: r.term, reading: r.reading, meaning_en: r.meaning_en, jlpt_level: r.jlpt_level }))),
  );
  const cols = ["type", "term", "reading", "meaning_en", "meaning_my", "onyomi", "kunyomi", "stroke_count", "similar", "similar_note", "example_jp", "jlpt_level", "tags"] as const;

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
      // keep vocab example sentences (filled by NN_examples.sql) when the build has none
      "  example_jp = coalesce(excluded.example_jp, public.cards.example_jp), jlpt_level = excluded.jlpt_level, tags = excluded.tags,",
      "  meaning_my = coalesce(public.cards.meaning_my, excluded.meaning_my);", // never overwrite reviewed Burmese
      "",
    );
  }
  // Fresh output directory each build so stale parts never linger.
  if (existsSync(seedDir)) for (const f of readdirSync(seedDir)) if (f.endsWith(".sql")) rmSync(join(seedDir, f));
  mkdirSync(seedDir, { recursive: true });
  let n = 0;
  const files: string[] = [];
  for (const [kind, text] of [
    ["cards", lines.join("\n")],
    ["units", buildUnits(rows)],
    ["meaning_my", buildMeaningMy(rows)],
    ["examples", buildExamples(rows)],
  ] as const) {
    for (const part of splitStatements(text)) {
      const name = `${String(++n).padStart(2, "0")}_${kind}.sql`;
      writeFileSync(join(seedDir, name), `-- ${name}: run the files in supabase/seed/ in filename order.\n${part}`);
      files.push(name);
    }
  }
  const outFile = `${seedDir}/ (${files.length} files)`;

  const count = (t: string, l: number) => rows.filter((r) => r.type === t && r.jlpt_level === l).length;
  console.log(`wrote ${outFile}`);
  console.log(`  Burmese meanings: ${rows.filter((r) => r.meaning_my).length}/${rows.length}`);
  console.log(`  Example sentences: ${Object.keys(readExamples()).length}/${rows.filter((r) => r.type === "vocab").length} vocab`);
  for (const t of ["kanji", "vocab"]) console.log(`  ${t}: ${LEVELS.map((l) => `N${l} ${count(t, l)}`).join(", ")}`);
}

/**
 * Split generated SQL into chunks under MAX_FILE_BYTES, only at statement boundaries
 * (every generated statement ends with ";" followed by a blank line).
 */
function splitStatements(text: string): string[] {
  const statements = text.split(/;\n\n/).map((st) => st.trim().replace(/;+$/, "")).filter((st) => st && !/^(--[^\n]*\n?)+$/.test(st));
  const parts: string[] = [];
  let cur = "";
  for (const st of statements) {
    const piece = `${st};\n\n`;
    if (cur && Buffer.byteLength(cur + piece) > MAX_FILE_BYTES) {
      parts.push(cur);
      cur = "";
    }
    cur += piece;
  }
  if (cur) parts.push(cur);
  return parts;
}

/** Key shared with translate-my.ts and data/meaning-my.json. */
const rowKey = (r: { type: string; term: string; reading: string | null }) => `${r.type}|${r.term}|${r.reading ?? ""}`;

/**
 * Burmese meanings as a standalone update, for databases that already ran seed.sql.
 * Fills only cards whose Burmese is still empty, so edits made in the app are kept.
 */
function buildMeaningMy(rows: Row[]): string {
  const withMy = rows.filter((r) => r.meaning_my);
  const out = [
    "-- Generated by scripts/seed/build.ts — do not edit by hand. Run after seed.sql.",
    "-- Burmese meanings (machine-translated draft — review in the app or via CSV).",
    `-- ${withMy.length} cards. Only fills cards whose meaning_my is empty.`,
    "",
  ];
  for (let i = 0; i < withMy.length; i += 500) {
    const chunk = withMy.slice(i, i + 500);
    out.push("update public.cards c set meaning_my = v.my from (values");
    out.push(chunk.map((r) => `  (${sql(r.type)}, ${sql(r.term)}, ${sql(r.reading ?? "")}, ${sql(r.meaning_my)})`).join(",\n"));
    out.push(") v(type, term, reading, my)");
    out.push("where c.owner_id is null and c.type = v.type and c.term = v.term and coalesce(c.reading, '') = v.reading and c.meaning_my is null;", "");
  }
  return out.join("\n");
}

type Example = { jp: string; en: string; my: string };
const readExamples = (): Record<string, Example> =>
  existsSync(examplesFile) ? JSON.parse(readFileSync(examplesFile, "utf8")) : {};

/**
 * Example sentences as a standalone update. Fills only vocab cards that have no example yet,
 * so sentences edited in the app are kept.
 */
function buildExamples(rows: Row[]): string {
  const ex = readExamples();
  const withEx = rows.filter((r) => r.type === "vocab" && ex[rowKey(r)]);
  const out = [
    "-- Generated by scripts/seed/build.ts — do not edit by hand. Run after the cards files.",
    "-- Example sentences (Claude draft — review in the app). Only fills cards without an example.",
    `-- ${withEx.length} cards.`,
    "",
  ];
  for (let i = 0; i < withEx.length; i += 300) {
    const chunk = withEx.slice(i, i + 300);
    out.push("update public.cards c set example_jp = v.jp, example_en = v.en, example_my = v.my from (values");
    out.push(
      chunk
        .map((r) => {
          const e = ex[rowKey(r)];
          return `  (${sql(r.term)}, ${sql(r.reading ?? "")}, ${sql(e.jp)}, ${sql(e.en)}, ${sql(e.my)})`;
        })
        .join(",\n"),
    );
    out.push(") v(term, reading, jp, en, my)");
    out.push("where c.owner_id is null and c.type = 'vocab' and c.term = v.term and coalesce(c.reading, '') = v.reading and c.example_jp is null;", "");
  }
  return out.join("\n");
}

/**
 * Auto-split every level into week/day units. Levels that already have imported Soumatome
 * units are left alone, so re-running this never overwrites a real textbook schedule.
 */
function buildUnits(rows: Row[]): string {
  const out = [
    "-- Generated by scripts/seed/build.ts — do not edit by hand. Run after seed.sql.",
    "-- Auto-split study days (week/day). Skips any level+track that has Soumatome units.",
    "",
  ];
  for (const track of ["goi", "kanji"] as const) {
    const type = track === "goi" ? "vocab" : "kanji";
    for (const level of LEVELS) {
      const list = rows.filter((r) => r.type === type && r.jlpt_level === level).sort((a, b) => a.order - b.order);
      const per = PER_DAY[track];
      const items = list.map((r, i) => {
        const d = Math.floor(i / per);
        return { week: Math.floor(d / 7) + 1, day: (d % 7) + 1, term: r.term, reading: r.reading ?? "", pos: i % per };
      });
      const guard = `not exists (select 1 from public.units x where x.level = ${level} and x.track = '${track}' and x.source = 'soumatome')`;
      const days = [...new Map(items.map((it) => [`${it.week}-${it.day}`, it])).values()];
      out.push(`-- N${level} ${track}: ${list.length} cards, ${days.length} days`);
      out.push("insert into public.units (level, track, week, day, title, source)");
      out.push(`select v.* from (values\n${days.map((d) => `  (${level}, '${track}', ${d.week}, ${d.day}, 'Week ${d.week} · Day ${d.day}', 'auto')`).join(",\n")}\n) v(level, track, week, day, title, source)`);
      out.push(`where ${guard}`, "on conflict (level, track, week, day) do nothing;", "");
      for (let i = 0; i < items.length; i += 500) {
        const chunk = items.slice(i, i + 500);
        out.push("insert into public.unit_cards (unit_id, card_id, position)");
        out.push("select u.id, c.id, v.pos from (values");
        out.push(chunk.map((it) => `  (${it.week}, ${it.day}, ${sql(it.term)}, ${sql(it.reading)}, ${it.pos})`).join(",\n"));
        out.push(") v(week, day, term, reading, pos)");
        out.push(`join public.units u on u.level = ${level} and u.track = '${track}' and u.week = v.week and u.day = v.day and u.source = 'auto'`);
        out.push(`join public.cards c on c.owner_id is null and c.type = '${type}' and c.term = v.term and coalesce(c.reading, '') = v.reading`);
        out.push("on conflict do nothing;", "");
      }
    }
  }
  return out.join("\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
