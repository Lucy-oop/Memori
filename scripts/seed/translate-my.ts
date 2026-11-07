/**
 * Machine-translates the English glosses of the built-in cards into Burmese with Claude,
 * using the Message Batches API (asynchronous, 50% cheaper). The result is a DRAFT —
 * review it in the app (card editor) or via a Soumatome CSV with a meaning_my column.
 *
 * Flow:
 *   1. npm run seed:build                 → writes scripts/seed/.cache/rows.json (the word list)
 *   2. npm run seed:translate             → submits a batch, waits (usually < 1 h), saves results to
 *                                           scripts/seed/data/meaning-my.json (commit this file)
 *   3. npm run seed:build                 → writes supabase/seed/NN_meaning_my.sql files
 *   4. Run those files in the Supabase SQL editor (they fill only empty Burmese meanings).
 *
 * Interrupted while waiting? Re-run with:  npm run seed:translate -- --batch msgbatch_...
 * Words that failed or were refused are simply left out; re-running translates only what's missing.
 * Options: --limit N (translate at most N words, for a cheap trial run).
 *
 * Credentials: ANTHROPIC_API_KEY (or an `ant auth login` profile). Never put it in a NEXT_PUBLIC_ variable.
 */
import Anthropic from "@anthropic-ai/sdk";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

try {
  process.loadEnvFile(".env.local");
} catch {
  // credentials may come from the shell or an `ant auth login` profile
}

const here = dirname(fileURLToPath(import.meta.url));
const rowsFile = join(here, ".cache/rows.json");
const stateFile = join(here, ".cache/translate-batch.json");
const outFile = join(here, "data/meaning-my.json");

const MODEL = "claude-opus-5-5";
const PER_REQUEST = 100;

interface WordRow {
  key: string;
  type: "vocab" | "kanji";
  term: string;
  reading: string | null;
  meaning_en: string[];
  jlpt_level: number;
}

interface State {
  batchId: string;
  /** custom_id → row keys, in the order sent (ids in the response are indexes into this). */
  chunks: Record<string, string[]>;
}

const arg = (name: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
};

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
} as const;

const MYANMAR = /[က-႟]/;

function loadTranslations(): Record<string, string> {
  return existsSync(outFile) ? JSON.parse(readFileSync(outFile, "utf8")) : {};
}

function saveTranslations(t: Record<string, string>) {
  const sorted = Object.fromEntries(Object.entries(t).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(outFile, JSON.stringify(sorted, null, 1) + "\n");
}

async function submit(client: Anthropic): Promise<State> {
  if (!existsSync(rowsFile)) throw new Error("Run `npm run seed:build` first (it writes the word list).");
  const rows: WordRow[] = JSON.parse(readFileSync(rowsFile, "utf8"));
  const done = loadTranslations();
  const limit = arg("limit") ? Number(arg("limit")) : Infinity;
  const todo = rows.filter((r) => !done[r.key]).slice(0, limit);
  if (!todo.length) {
    console.log("Every card already has a Burmese meaning.");
    process.exit(0);
  }

  const chunks: Record<string, string[]> = {};
  const requests: Anthropic.Messages.BatchCreateParams.Request[] = [];
  for (let i = 0; i < todo.length; i += PER_REQUEST) {
    const chunk = todo.slice(i, i + PER_REQUEST);
    const id = `chunk-${i / PER_REQUEST}`;
    chunks[id] = chunk.map((r) => r.key);
    const lines = chunk.map((r, j) =>
      JSON.stringify({ id: j, [r.type === "kanji" ? "kanji" : "word"]: r.term, reading: r.reading ?? undefined, en: r.meaning_en.join("; "), level: `N${r.jlpt_level}` }),
    );
    requests.push({
      custom_id: id,
      params: {
        model: MODEL,
        max_tokens: 16000,
        // Simple, well-specified task: low effort keeps cost down without hurting quality.
        output_config: { effort: "low", format: { type: "json_schema", schema: SCHEMA } },
        system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
        messages: [{ role: "user", content: `Translate these ${chunk.length} items:\n${lines.join("\n")}` }],
      },
    });
  }

  const batch = await client.messages.batches.create({ requests });
  const state: State = { batchId: batch.id, chunks };
  writeFileSync(stateFile, JSON.stringify(state));
  console.log(`Submitted batch ${batch.id}: ${todo.length} words in ${requests.length} requests.`);
  return state;
}

async function collect(client: Anthropic, state: State) {
  for (;;) {
    const b = await client.messages.batches.retrieve(state.batchId);
    if (b.processing_status === "ended") break;
    const c = b.request_counts;
    console.log(`waiting… ${c.succeeded} done, ${c.processing} processing (checks every minute)`);
    await new Promise((r) => setTimeout(r, 60_000));
  }

  const translations = loadTranslations();
  let added = 0;
  const problems: string[] = [];
  for await (const res of await client.messages.batches.results(state.batchId)) {
    const keys = state.chunks[res.custom_id];
    if (!keys) continue;
    if (res.result.type !== "succeeded") {
      problems.push(`${res.custom_id}: ${res.result.type}`);
      continue;
    }
    const msg = res.result.message;
    if (msg.stop_reason === "refusal" || msg.stop_reason === "max_tokens") {
      problems.push(`${res.custom_id}: stopped (${msg.stop_reason})`);
      continue;
    }
    const text = msg.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("");
    let items: { id: number; my: string }[];
    try {
      items = (JSON.parse(text) as { items: { id: number; my: string }[] }).items;
    } catch {
      problems.push(`${res.custom_id}: unreadable JSON`);
      continue;
    }
    for (const { id, my } of items) {
      const key = keys[id];
      const clean = my.trim();
      if (!key || !clean || !MYANMAR.test(clean)) continue; // skip bad ids / non-Burmese output
      translations[key] = clean;
      added++;
    }
  }
  saveTranslations(translations);
  console.log(`Saved ${added} Burmese meanings to ${outFile} (${Object.keys(translations).length} total).`);
  if (problems.length) console.log(`Not translated (re-run to retry):\n  ${problems.join("\n  ")}`);
  console.log("Next: npm run seed:build, then run the supabase/seed/*_meaning_my.sql files in Supabase.");
}

async function main() {
  const client = new Anthropic();
  const resumeId = arg("batch");
  let state: State;
  if (resumeId) {
    if (!existsSync(stateFile)) throw new Error(`No saved batch details in ${stateFile}`);
    state = JSON.parse(readFileSync(stateFile, "utf8"));
    if (state.batchId !== resumeId) throw new Error(`Saved batch is ${state.batchId}, not ${resumeId}`);
  } else {
    state = await submit(client);
  }
  await collect(client, state);
}

main().catch((e) => {
  if (e instanceof Anthropic.AuthenticationError) {
    console.error("Anthropic API key missing or invalid: set ANTHROPIC_API_KEY in .env.local or run `ant auth login`.");
  } else if (e instanceof Anthropic.RateLimitError) {
    console.error("Rate limited by the Anthropic API — wait a minute and re-run.");
  } else if (e instanceof Anthropic.APIError) {
    console.error(`Anthropic API error ${e.status}: ${e.message}`);
  } else {
    console.error(e);
  }
  process.exit(1);
});
