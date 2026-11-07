-- Memori 0002: guided course (levels → Soumatome-style week/day units), user progress,
-- meaning language, onboarding, admin flag and card images. Safe to re-run.

-- ───────────── profiles: onboarding, language, admin ─────────────
alter table public.profiles add column if not exists onboarded    boolean not null default false;
alter table public.profiles add column if not exists meaning_lang text    not null default 'en';
alter table public.profiles add column if not exists is_admin     boolean not null default false;

alter table public.profiles drop constraint if exists profiles_meaning_lang_check;
alter table public.profiles add constraint profiles_meaning_lang_check check (meaning_lang in ('en', 'my'));

-- Users may edit their own profile, but never their admin flag.
revoke update on public.profiles from authenticated, anon;
grant update (display_name, timezone, daily_goal, furigana_default, onboarded, meaning_lang)
  on public.profiles to authenticated;

-- ───────────── cards: images ─────────────
alter table public.cards add column if not exists image_url    text;
alter table public.cards add column if not exists image_credit text;

-- ───────────── units (one study day) ─────────────
create table if not exists public.units (
  id      uuid primary key default gen_random_uuid(),
  level   int  not null check (level between 1 and 5),
  track   text not null check (track in ('goi', 'kanji')),
  week    int  not null check (week between 1 and 99),
  day     int  not null check (day between 1 and 7),
  title   text,
  source  text not null default 'auto' check (source in ('soumatome', 'auto')),
  unique (level, track, week, day)
);

create table if not exists public.unit_cards (
  unit_id  uuid not null references public.units(id) on delete cascade,
  card_id  uuid not null references public.cards(id) on delete cascade,
  position int  not null default 0,
  primary key (unit_id, card_id)
);
create index if not exists unit_cards_card_idx on public.unit_cards (card_id);

-- ───────────── where each user is in the course ─────────────
create table if not exists public.user_progress (
  user_id    uuid not null references auth.users(id) on delete cascade,
  track      text not null check (track in ('goi', 'kanji')),
  level      int  not null check (level between 1 and 5),
  week       int  not null default 1 check (week between 1 and 99),
  day        int  not null default 1 check (day between 1 and 7),
  updated_at timestamptz not null default now(),
  primary key (user_id, track)
);

-- ───────────── RLS ─────────────
alter table public.units         enable row level security;
alter table public.unit_cards    enable row level security;
alter table public.user_progress enable row level security;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

drop policy if exists "read units" on public.units;
create policy "read units" on public.units for select to authenticated using (true);
drop policy if exists "admin writes units" on public.units;
create policy "admin writes units" on public.units for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "read unit cards" on public.unit_cards;
create policy "read unit cards" on public.unit_cards for select to authenticated using (true);
drop policy if exists "admin writes unit cards" on public.unit_cards;
create policy "admin writes unit cards" on public.unit_cards for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "own progress" on public.user_progress;
create policy "own progress" on public.user_progress for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Admins maintain the built-in library (e.g. importing Soumatome word lists).
drop policy if exists "admin writes built-in cards" on public.cards;
create policy "admin writes built-in cards" on public.cards for all to authenticated
  using (owner_id is null and public.is_admin()) with check (owner_id is null and public.is_admin());

-- ───────────── Soumatome import (admin) ─────────────
-- p_rows: [{level, track, week, day, term, reading, meaning_en, meaning_my}, ...]
-- For every level+track in the upload, the existing days (auto or soumatome) are replaced.
-- Words not yet in the library are added as built-in cards. Burmese meanings, when given,
-- are written onto the built-in card. Returns the number of unit rows linked.
create or replace function public.import_soumatome(p_rows jsonb)
returns int
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_linked int;
begin
  if not public.is_admin() then
    raise exception 'Only admins can import course units';
  end if;

  drop table if exists _imp;
  create temp table _imp on commit drop as
  select (r->>'level')::int                                   as level,
         r->>'track'                                          as track,
         case r->>'track' when 'goi' then 'vocab' else 'kanji' end as type,
         (r->>'week')::int                                    as week,
         (r->>'day')::int                                     as day,
         btrim(r->>'term')                                    as term,
         coalesce(btrim(r->>'reading'), '')                   as reading,
         nullif(btrim(r->>'meaning_en'), '')                  as meaning_en,
         nullif(btrim(r->>'meaning_my'), '')                  as meaning_my,
         n::int                                               as pos
  from jsonb_array_elements(p_rows) with ordinality as t(r, n);

  if exists (
    select 1 from _imp
    where track not in ('goi', 'kanji') or level not between 1 and 5
       or week not between 1 and 99 or day not between 1 and 7 or coalesce(term, '') = ''
  ) then
    raise exception 'Invalid row: check level (1-5), track (goi/kanji), week (1-99), day (1-7) and term';
  end if;

  -- 1. Add words that aren't in the built-in library yet.
  insert into cards (type, term, reading, meaning_en, meaning_my, jlpt_level, tags)
  select distinct on (type, term, reading)
         type, term, nullif(reading, ''),
         coalesce(string_to_array(meaning_en, ';'), '{}'), meaning_my, level, array['N' || level, 'Soumatome']
  from _imp
  order by type, term, reading, pos
  on conflict (type, term, coalesce(reading, '')) where owner_id is null do nothing;

  -- 2. Burmese meanings supplied in the upload win.
  update cards c set meaning_my = i.meaning_my
  from (select distinct on (type, term, reading) * from _imp where meaning_my is not null order by type, term, reading, pos) i
  where c.owner_id is null and c.type = i.type and c.term = i.term and coalesce(c.reading, '') = i.reading;

  -- 3. Replace the days of each uploaded level+track.
  delete from units u using (select distinct level, track from _imp) s
  where u.level = s.level and u.track = s.track;

  insert into units (level, track, week, day, title, source)
  select distinct level, track, week, day, 'Soumatome Week ' || week || ' · Day ' || day, 'soumatome'
  from _imp;

  insert into unit_cards (unit_id, card_id, position)
  select u.id, c.id, i.pos
  from _imp i
  join units u on u.level = i.level and u.track = i.track and u.week = i.week and u.day = i.day
  join cards c on c.owner_id is null and c.type = i.type and c.term = i.term and coalesce(c.reading, '') = i.reading
  on conflict do nothing;
  get diagnostics v_linked = row_count;

  return v_linked;
end;
$$;

grant execute on function public.import_soumatome(jsonb) to authenticated;
