/**
 * Drafts one short example sentence per built-in vocabulary card with Claude, with English and
 * Burmese translations (Message Batches API — asynchronous, 50% cheaper). Review before relying
 * on them; they show on the back of each vocabulary flashcard.
 *
 * Flow:
 *   1. npm run seed:build      → writes scripts/seed/.cache/rows.json (the word list)
 *   2. npm run seed:examples   → submits a batch, waits (usually < 1 h), saves
 *                                scripts/seed/data/examples.json (commit this file)
 *   3. npm run seed:build      → writes supabase/seed/NN_examples.sql files
 *   4. Run those files in the Supabase SQL editor (they fill only cards without an example).
 *
 * Options: --limit N (try a few first), --level N (only that JLPT level), --batch <id> (resume).
 * Credentials: ANTHROPIC_API_KEY (or an `ant auth login` profile). Never in a NEXT_PUBLIC_ variable.
 */
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { arg, readJson, reportError, runBatch, writeSortedJson } from "./claude-batch";

const here = dirname(fileURLToPath(import.meta.url));
const rowsFile = join(here, ".cache/rows.json");
const stateFile = join(here, ".cache/examples-batch.json");
const outFile = join(here, "data/examples.json");

interface WordRow {
  key: string;
  type: "vocab" | "kanji";
  term: string;
  reading: string | null;
  meaning_en: string[];
  jlpt_level: number;
}

export interface Example {
  jp: string;
  en: string;
  my: string;
}

const SYSTEM = `You write example sentences for a JLPT flashcard app used by Burmese learners of Japanese.

For each item (a Japanese word, its reading, English meaning and JLPT level) write ONE example sentence:
- Natural, everyday Japanese that clearly shows the given meaning. Use the word itself (conjugated if natural).
- Keep it short: about 8–20 Japanese characters, one clause or two, polite (です/ます) style.
- Match the level: for N5/N4 use only very common grammar and vocabulary; for N3/N2 you may be a little richer.
- Write kanji only if a learner at that level would know it; otherwise use kana. Never add furigana or brackets.
- "en": a natural English translation. "my": a natural Burmese translation in Myanmar Unicode (never Zawgyi).
- For prefixes/suffixes/counters (items starting or ending with ～), use them attached to a typical word.
Return every id you were given exactly once.`;

const SCHEMA = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        properties: { id: { type: "integer" }, jp: { type: "string" }, en: { type: "string" }, my: { type: "string" } },
        required: ["id", "jp", "en", "my"],
        additionalProperties: false,
      },
    },
  },
  required: ["items"],
  additionalProperties: false,
};

const JAPANESE = /[぀-ヿ一-鿿]/;
const MYANMAR = /[က-႟]/;

async function main() {
  if (!existsSync(rowsFile)) throw new Error("Run `npm run seed:build` first (it writes the word list).");
  const rows = readJson<WordRow[]>(rowsFile, []);
  const examples = readJson<Record<string, Example>>(outFile, {});
  const limit = arg("limit") ? Number(arg("limit")) : Infinity;
  const level = arg("level") ? Number(arg("level")) : undefined;
  const todo = rows
    .filter((r) => r.type === "vocab" && !examples[r.key] && (!level || r.jlpt_level === level))
    .slice(0, limit);
  if (!todo.length && !arg("batch")) return console.log("Every vocabulary card already has an example sentence.");

  const { accepted, problems } = await runBatch<Example>({
    stateFile,
    perRequest: 50,
    system: SYSTEM,
    schema: SCHEMA,
    instruction: "Write example sentences for these items:",
    items: todo.map((r) => ({
      key: r.key,
      payload: { word: r.term, reading: r.reading ?? undefined, en: r.meaning_en.slice(0, 3).join("; "), level: `N${r.jlpt_level}` },
    })),
    accept: (key, { jp, en, my }) => {
      const ex = { jp: jp.trim(), en: en.trim(), my: my.trim() };
      if (!JAPANESE.test(ex.jp) || !ex.en || !MYANMAR.test(ex.my) || ex.jp.length > 60) return false;
      examples[key] = ex;
      return true;
    },
  });

  writeSortedJson(outFile, examples as unknown as Record<string, unknown>);
  console.log(`Saved ${accepted} example sentences to ${outFile} (${Object.keys(examples).length} total).`);
  if (problems.length) console.log(`Not generated (re-run to retry):\n  ${problems.join("\n  ")}`);
  console.log("Next: npm run seed:build, then run the supabase/seed/*_examples.sql files in Supabase.");
}

main().catch(reportError);
