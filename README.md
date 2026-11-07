# Memori (メモリ)

JLPT N5/N4 kanji & vocabulary flashcards, inspired by Quizlet. Works on phone, tablet and desktop, and installs as an app (PWA).

## Features

- **Vocabulary & Kanji decks:** 245 N5/N4 kanji and about 1,380 N5/N4 words preloaded, plus your own cards
- **3D flip flashcards:** tap or press Space to flip; swipe or use ← → for "Know it" / "Still learning"
- **Furigana toggle:** a global switch plus a per-card "peek reading" button
- **English + Burmese meanings:** add your own Burmese to any built-in card; it's saved just for you
- **Similar Kanji warning:** look-alikes such as 待 / 持 / 特 side by side, with a note on how to tell them apart (about 50 groups hand-curated)
- **SRS review:** Again / Hard / Good / Easy (keys 1–4), scheduled with FSRS
- **Kanji Trap quiz:** four-option multiple choice whose wrong answers come from the Similar Kanji field first
- **Typing mode:** type the meaning (English or Burmese) or the reading; romaji converts to kana as you type (`matsu` → まつ)
- **Mark for review (★)**, plus filters by `#N5` / `#N4` / `#Soumatome` / custom tags, Due / New / Starred / Tricky, and your own decks
- **Daily streak**, daily goal, activity heatmap and stats
- **CSV import/export:** for example, type up your So-matome N3 words and import them tagged `#Soumatome`
- **Works offline:** reviews made offline sync automatically when you're back online

## Setup

1. **Supabase:** create a free project at [supabase.com](https://supabase.com/dashboard), then in the **SQL Editor** run, in order:
   - `supabase/migrations/0001_init.sql`
   - `supabase/migrations/0002_curriculum.sql` (course days, progress, language, images, admin import)
   - `supabase/seed.sql` (N5–N2 kanji & vocabulary — large; if the editor times out, run it with `psql`)
   - `supabase/seed_units.sql` (auto-split Week/Day study days for every level)
   - Make yourself admin (to import Soumatome lists at `/admin/units`):
     `update public.profiles set is_admin = true where id = (select id from auth.users where email = 'you@example.com');`
2. **Auth:** in Authentication → URL Configuration, set the Site URL and add `http://localhost:3000/auth/callback` (plus your production URL) to the Redirect URLs. Email + password and magic links work out of the box (Authentication → Providers → Email). Password-reset links also go through `/auth/callback`. To enable Google sign-in, turn on the Google provider.
3. **Env:** `cp .env.example .env.local` and fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API).
4. Run:
   ```bash
   npm install
   npm run dev     # http://localhost:3000
   ```
   To try it on your phone, open `http://<your-computer-ip>:3000` on the same Wi-Fi, and add that URL to the Supabase redirect URLs too.

### Deploy (Vercel)
Import the repo into Vercel, add the two env vars, and add `https://<your-app>.vercel.app/auth/callback` to the Supabase redirect URLs.

## CSV format

The header row is required, and only `term` is mandatory. Separate list fields with `;`.

```csv
type,term,reading,meaning_en,meaning_my,jlpt_level,tags,similar,similar_note
vocab,締め切り,しめきり,deadline,နောက်ဆုံးရက်,N3,Soumatome Week1,,
kanji,待,,wait,စောင့်,N4,Soumatome,持;特,待 has 彳; 持 has 扌
```

Other columns: `pos, onyomi, kunyomi, stroke_count, radical, example_jp, example_en, example_my, notes`.

## Scripts

| command | what it does |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | production build |
| `npm test` | unit tests (SRS, distractors, answer checking, streaks, filters, CSV, furigana) |
| `npm run images:fetch -- --level 5 --limit 100` | add Pixabay pictures to vocab cards (needs `SUPABASE_SECRET_KEY` + `PIXABAY_API_KEY` in `.env.local`; local only) |
| `npm run seed:build` | regenerate `supabase/seed.sql` from the open datasets and `scripts/seed/data/similar-kanji.json` |

To add more similar-kanji groups, edit `scripts/seed/data/similar-kanji.json`, run `npm run seed:build`, and re-run `seed.sql`. It upserts, so your progress is kept.

## Project layout

```
app/(app)/            signed-in pages: dashboard, decks/[type], study, cards/edit, stats, settings
app/login, auth/      magic link + Google sign-in
components/           Flashcard, SimilarKanjiPanel, MultipleChoice, TypingQuiz, StreakHeatmap…
lib/                  srs (ts-fsrs), distractors, answerCheck, streak, filters, furigana, csv, data, offlineQueue
supabase/             schema + RLS + record_review(), generated seed
scripts/seed/         seed builder
```

## Credits
Kanji data © EDRDG (KANJIDIC2, CC BY-SA 4.0) via davidluzgouveia/kanji-data. Vocabulary lists via jamsinclair/open-anki-jlpt-decks (MIT). Stroke order © KanjiVG (CC BY-SA 3.0). Memori includes no content from the So-matome books.
