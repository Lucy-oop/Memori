/**
 * Shared helper for the seed scripts that ask Claude to process the word list in bulk
 * (translate-my.ts, examples.ts). Uses the Message Batches API: asynchronous and 50% cheaper.
 *
 * Flow: submit chunks of N items → poll every minute → parse each chunk's JSON → hand every
 * item back to the caller. State is saved so an interrupted run can resume with --batch <id>.
 */
import Anthropic from "@anthropic-ai/sdk";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

try {
  process.loadEnvFile(".env.local");
} catch {
  // credentials may come from the shell or an `ant auth login` profile
}

export const MODEL = "claude-opus-5-5";

export const arg = (name: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
};

export function readJson<T>(file: string, fallback: T): T {
  return existsSync(file) ? (JSON.parse(readFileSync(file, "utf8")) as T) : fallback;
}

/** Writes with sorted keys so diffs of the data files stay readable. */
export function writeSortedJson(file: string, data: Record<string, unknown>) {
  const sorted = Object.fromEntries(Object.entries(data).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(file, JSON.stringify(sorted, null, 1) + "\n");
}

interface State {
  batchId: string;
  /** custom_id → item keys, in the order sent (ids in the response index into this). */
  chunks: Record<string, string[]>;
}

export interface BatchJob<Out> {
  /** Where to remember the batch id so the run can resume. */
  stateFile: string;
  /** Items still to process: a stable key plus the JSON-able payload Claude sees (an `id` is added). */
  items: { key: string; payload: Record<string, unknown> }[];
  perRequest: number;
  system: string;
  /** JSON schema for `{ items: [{ id, ...Out }] }`. */
  schema: Record<string, unknown>;
  /** e.g. "Translate these items:" */
  instruction: string;
  /** Called once per returned item; return false to reject it (counted as skipped). */
  accept: (key: string, out: Out) => boolean;
}

/** Submit (or resume with --batch <id>), wait, and feed results to `job.accept`. Returns counts. */
export async function runBatch<Out>(job: BatchJob<Out>): Promise<{ accepted: number; problems: string[] }> {
  const client = new Anthropic();
  const resumeId = arg("batch");
  let state: State;

  if (resumeId) {
    state = readJson<State | null>(job.stateFile, null) as State;
    if (!state) throw new Error(`No saved batch details in ${job.stateFile}`);
    if (state.batchId !== resumeId) throw new Error(`Saved batch is ${state.batchId}, not ${resumeId}`);
  } else {
    if (!job.items.length) return { accepted: 0, problems: [] };
    const chunks: Record<string, string[]> = {};
    const requests: Anthropic.Messages.BatchCreateParams.Request[] = [];
    for (let i = 0; i < job.items.length; i += job.perRequest) {
      const chunk = job.items.slice(i, i + job.perRequest);
      const id = `chunk-${i / job.perRequest}`;
      chunks[id] = chunk.map((it) => it.key);
      const lines = chunk.map((it, j) => JSON.stringify({ id: j, ...it.payload }));
      requests.push({
        custom_id: id,
        params: {
          model: MODEL,
          max_tokens: 16000,
          // Simple, well-specified tasks: low effort keeps cost down without hurting quality.
          output_config: { effort: "low", format: { type: "json_schema", schema: job.schema } },
          system: [{ type: "text", text: job.system, cache_control: { type: "ephemeral" } }],
          messages: [{ role: "user", content: `${job.instruction} (${chunk.length} items)\n${lines.join("\n")}` }],
        },
      });
    }
    const batch = await client.messages.batches.create({ requests });
    state = { batchId: batch.id, chunks };
    writeFileSync(job.stateFile, JSON.stringify(state));
    console.log(`Submitted batch ${batch.id}: ${job.items.length} items in ${requests.length} requests.`);
    console.log(`If interrupted, resume with: --batch ${batch.id}`);
  }

  for (;;) {
    const b = await client.messages.batches.retrieve(state.batchId);
    if (b.processing_status === "ended") break;
    const c = b.request_counts;
    console.log(`waiting… ${c.succeeded} done, ${c.processing} processing (checks every minute)`);
    await new Promise((r) => setTimeout(r, 60_000));
  }

  let accepted = 0;
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
    const text = msg.content.flatMap((blk) => (blk.type === "text" ? [blk.text] : [])).join("");
    let items: ({ id: number } & Out)[];
    try {
      items = (JSON.parse(text) as { items: ({ id: number } & Out)[] }).items;
    } catch {
      problems.push(`${res.custom_id}: unreadable JSON`);
      continue;
    }
    for (const it of items) {
      const key = keys[it.id];
      if (key && job.accept(key, it)) accepted++;
    }
  }
  return { accepted, problems };
}

/** Friendly messages for the common API failures. */
export function reportError(e: unknown) {
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
}
