/**
 * Machine-translates the English glosses of the built-in cards into Burmese with Claude
 * (Message Batches API — asynchronous, 50% cheaper). The result is a DRAFT: review it in the
 * app (card editor) or via a Soumatome CSV with a meaning_my column.
 *
 * Flow:
 *   1. npm run seed:build       → writes scripts/seed/.cache/rows.json (the word list)
 *   2. npm run seed:translate   → submits a batch, waits (usually < 1 h), saves results to
 *                                 scripts/seed/data/meaning-my.json (commit this file)
 *   3. npm run seed:build       → writes supabase/seed/NN_meaning_my.sql files
 *   4. Run those files in the Supabase SQL editor (they fill only empty Burmese meanings).
 *
 * Options: --limit N (translate at most N words, for a cheap trial), --batch <id> (resume).
 * Words that failed or were refused are left out; re-running translates only what's missing.
 * Credentials: ANTHROPIC_API_KEY (or an `ant auth login` profile). Never in a NEXT_PUBLIC_ variable.
 */
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { arg, readJson, reportError, runBatch, writeSortedJson } from "./claude-batch";

const here = dirname(fileURLToPath(import.meta.url));
const rowsFile = join(here, ".cache/rows.json");
const stateFile = join(here, ".cache/translate-batch.json");
const outFile = join(here, "data/meaning-my.json");

interface WordRow {
  key: string;
  type: "vocab" | "kanji";
  term: string;
  reading: string | null;
  meaning_en: string[];
  jlpt_level: number;
}

const SYSTEM = `You translate Japanese-English dictionary glosses into Burmese for a JLPT flashcard app used by Burmese learners.

For each item you get the Japanese word or kanji, its reading, and its English gloss. Write the Burmese meaning a learner should see on the back of the card:
- Myanmar Unicode script only (never Zawgyi), no romanisation, no English unless a loanword is the normal Burmese term.
- Short dictionary-style glosses, not sentences. Separate distinct senses with "; " (at most 3 senses).
- Use the Japanese word and reading to choose the right sense when the English is ambiguous.
- Verbs: use the plain dictionary form ending in "သည်" (e.g. 食べる → စားသည်). Adjectives: "…သော" or "…သည်" as natural.
- Kanji items (no reading given): translate the character's core meanings.
- Interjections, counters and grammar words: give the closest natural Burmese equivalent or a brief explanation in Burmese.
Return every id you were given exactly once.`;

const SCHEMA = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        properties: { id: { type: "integer" }, my: { type: "string" } },
        required: ["id", "my"],
        additionalProperties: false,
      },
    },
  },
  required: ["items"],
  additionalProperties: false,
};

const MYANMAR = /[က-႟]/;

async function main() {
  if (!existsSync(rowsFile)) throw new Error("Run `npm run seed:build` first (it writes the word list).");
  const rows = readJson<WordRow[]>(rowsFile, []);
  const translations = readJson<Record<string, string>>(outFile, {});
  const limit = arg("limit") ? Number(arg("limit")) : Infinity;
  const todo = rows.filter((r) => !translations[r.key]).slice(0, limit);
  if (!todo.length && !arg("batch")) return console.log("Every card already has a Burmese meaning.");

  const { accepted, problems } = await runBatch<{ my: string }>({
    stateFile,
    perRequest: 100,
    system: SYSTEM,
    schema: SCHEMA,
    instruction: "Translate these items:",
    items: todo.map((r) => ({
      key: r.key,
      payload: { [r.type === "kanji" ? "kanji" : "word"]: r.term, reading: r.reading ?? undefined, en: r.meaning_en.join("; "), level: `N${r.jlpt_level}` },
    })),
    accept: (key, { my }) => {
      const clean = my.trim();
      if (!clean || !MYANMAR.test(clean)) return false; // non-Burmese output
      translations[key] = clean;
      return true;
    },
  });

  writeSortedJson(outFile, translations);
  console.log(`Saved ${accepted} Burmese meanings to ${outFile} (${Object.keys(translations).length} total).`);
  if (problems.length) console.log(`Not translated (re-run to retry):\n  ${problems.join("\n  ")}`);
  console.log("Next: npm run seed:build, then run the supabase/seed/*_meaning_my.sql files in Supabase.");
}

main().catch(reportError);
