/**
 * Adds a picture to built-in vocabulary cards using the Pixabay API.
 * Images are downloaded once and re-hosted in Supabase Storage (bucket "card-images"),
 * as Pixabay's terms require — the app never hotlinks Pixabay.
 *
 * Needs in .env.local (NEVER commit, NEVER prefix with NEXT_PUBLIC_):
 *   NEXT_PUBLIC_SUPABASE_URL=...           (already there)
 *   SUPABASE_SECRET_KEY=sb_secret_...      (Supabase → Project Settings → API Keys)
 *   PIXABAY_API_KEY=...                    (free: https://pixabay.com/api/docs/)
 *
 * Run:  npm run images:fetch -- --level 5 --limit 100
 * Flags: --level N (only that JLPT level), --limit N (max cards this run), --redo (retry cards marked "no image").
 * Resumable: cards that already have image_url are skipped. Cards with no good match get
 * image_credit = 'none' so they aren't searched again (unless --redo).
 */
import { createClient } from "@supabase/supabase-js";

try {
  process.loadEnvFile(".env.local");
} catch {
  // env may come from the shell instead
}

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SECRET = process.env.SUPABASE_SECRET_KEY;
const PIXABAY = process.env.PIXABAY_API_KEY;
if (!URL_ || !SECRET || !PIXABAY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY or PIXABAY_API_KEY in .env.local");
  process.exit(1);
}

const arg = (name: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
};
const LEVEL = arg("level") ? Number(arg("level")) : undefined;
const LIMIT = arg("limit") ? Number(arg("limit")) : Infinity;
const REDO = process.argv.includes("--redo");
const BUCKET = "card-images";

const db = createClient(URL_, SECRET, { auth: { persistSession: false } });
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** "to eat (a meal)" → "eat"; returns null for words a picture can't show well. */
function searchTerm(meanings: string[]): string | null {
  const first = (meanings[0] ?? "")
    .replace(/\(.*?\)/g, "")
    .replace(/^(to|a|an|the)\s+/i, "")
    .replace(/[^a-zA-Z\s-]/g, "")
    .trim();
  if (!first || first.length < 3) return null;
  // Grammar-ish / abstract words where stock photos are misleading.
  if (/^(however|but|and|or|so|because|already|still|yet|very|quite|maybe|perhaps|ah|oh|well|um|please|thanks?)\b/i.test(first)) return null;
  return first.split(/\s+/).slice(0, 3).join(" ");
}

interface Hit {
  id: number;
  webformatURL: string;
  pageURL: string;
  user: string;
  tags: string;
}

async function pixabay(q: string): Promise<Hit | null> {
  for (const image_type of ["illustration", "photo"]) {
    const url = `https://pixabay.com/api/?key=${PIXABAY}&q=${encodeURIComponent(q)}&image_type=${image_type}&safesearch=true&per_page=5&lang=en`;
    const res = await fetch(url);
    if (res.status === 429) {
      await sleep(60_000);
      return pixabay(q);
    }
    if (!res.ok) throw new Error(`Pixabay HTTP ${res.status}`);
    const data = (await res.json()) as { hits: Hit[] };
    if (data.hits[0]) return data.hits[0];
  }
  return null;
}

async function main() {
  // Bucket for re-hosted images (public read).
  const { data: buckets } = await db.storage.listBuckets();
  if (!buckets?.some((b) => b.name === BUCKET)) {
    const { error } = await db.storage.createBucket(BUCKET, { public: true, fileSizeLimit: 2_000_000 });
    if (error) throw error;
    console.log(`created bucket ${BUCKET}`);
  }

  let q = db
    .from("cards")
    .select("id, term, reading, meaning_en, jlpt_level, image_credit")
    .is("owner_id", null)
    .eq("type", "vocab")
    .is("image_url", null)
    .order("jlpt_level", { ascending: false })
    .limit(Number.isFinite(LIMIT) ? LIMIT * 2 : 10_000);
  if (LEVEL) q = q.eq("jlpt_level", LEVEL);
  const { data: cards, error } = await q;
  if (error) throw error;

  const todo = cards.filter((c) => REDO || c.image_credit !== "none").slice(0, LIMIT);
  console.log(`${todo.length} cards to process`);

  let ok = 0;
  let none = 0;
  for (const [i, c] of todo.entries()) {
    const term = searchTerm(c.meaning_en as string[]);
    const hit = term ? await pixabay(term) : null;
    if (!hit) {
      await db.from("cards").update({ image_credit: "none" }).eq("id", c.id);
      none++;
      console.log(`[${i + 1}/${todo.length}] ${c.term}: no image (${term ?? "skipped"})`);
    } else {
      const img = await fetch(hit.webformatURL);
      const bytes = new Uint8Array(await img.arrayBuffer());
      const ext = hit.webformatURL.split(".").pop()?.split("?")[0] ?? "jpg";
      const path = `vocab/${c.id}.${ext}`;
      const up = await db.storage.from(BUCKET).upload(path, bytes, {
        contentType: img.headers.get("content-type") ?? "image/jpeg",
        upsert: true,
      });
      if (up.error) throw up.error;
      const publicUrl = db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
      await db.from("cards").update({ image_url: publicUrl, image_credit: `${hit.user} · Pixabay ${hit.pageURL}` }).eq("id", c.id);
      ok++;
      console.log(`[${i + 1}/${todo.length}] ${c.term} (${term}) → ${hit.tags}`);
    }
    await sleep(700); // Pixabay allows 100 requests/minute
  }
  console.log(`done: ${ok} images, ${none} without`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
