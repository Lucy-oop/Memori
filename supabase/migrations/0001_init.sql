-- Memori schema: cards, per-user SRS state, review logs, daily activity (streaks)

-- ───────────── profiles ─────────────
create table public.profiles (
  id               uuid primary key references auth.users on delete cascade,
  display_name     text,
  timezone         text not null default 'UTC',
  daily_goal       int  not null default 20 check (daily_goal between 1 and 1000),
  furigana_default boolean not null default true,
  created_at       timestamptz not null default now()
);

create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)));
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users for each row execute function public.handle_new_user();

-- ───────────── cards ─────────────
-- owner_id null = built-in card (seeded N5/N4), readable by everyone.
create table public.cards (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid references auth.users on delete cascade,
  type          text not null check (type in ('vocab', 'kanji')),
  term          text not null,
  reading       text,                       -- vocab: kana reading
  furigana      text,                       -- optional explicit ruby, e.g. "待[ま]つ"
  meaning_en    text[] not null default '{}',
  meaning_my    text,                       -- Burmese
  pos           text,                       -- part of speech
  onyomi        text[] not null default '{}',
  kunyomi       text[] not null default '{}',
  stroke_count  int,
  radical       text,
  "similar"     text[] not null default '{}', -- confusable kanji, e.g. {持,特} on 待
  similar_note  text,                       -- how to tell them apart
  example_jp    text,
  example_en    text,
  example_my    text,
  notes         text,
  jlpt_level    int check (jlpt_level between 1 and 5),
  tags          text[] not null default '{}',
  created_at    timestamptz not null default now()
);

create index cards_type_level on public.cards (type, jlpt_level);
create index cards_owner on public.cards (owner_id);
create index cards_tags on public.cards using gin (tags);
create unique index cards_builtin_uniq on public.cards (type, term, coalesce(reading, ''))
  where owner_id is null;

-- ───────────── user decks ─────────────
create table public.decks (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null references auth.users on delete cascade,
  name        text not null,
  description text,
  created_at  timestamptz not null default now()
);

create table public.deck_cards (
  deck_id uuid references public.decks on delete cascade,
  card_id uuid references public.cards on delete cascade,
  primary key (deck_id, card_id)
);

-- ───────────── per-user progress ─────────────
create table public.user_card_state (
  user_id     uuid not null references auth.users on delete cascade,
  card_id     uuid not null references public.cards on delete cascade,
  fsrs        jsonb,                        -- serialized ts-fsrs card
  due_at      timestamptz,
  state       smallint not null default 0,  -- 0 new, 1 learning, 2 review, 3 relearning
  reps        int not null default 0,
  lapses      int not null default 0,
  right_count int not null default 0,
  wrong_count int not null default 0,
  starred     boolean not null default false,
  override    jsonb not null default '{}',  -- personal edits on built-in cards (meaning_my, notes, similar…)
  updated_at  timestamptz not null default now(),
  primary key (user_id, card_id)
);

create index user_card_state_due on public.user_card_state (user_id, due_at);

create table public.review_logs (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users on delete cascade,
  card_id     uuid not null references public.cards on delete cascade,
  mode        text not null check (mode in ('flip', 'srs', 'mc', 'type')),
  rating      smallint,
  correct     boolean not null,
  reviewed_at timestamptz not null default now()
);

create index review_logs_user_time on public.review_logs (user_id, reviewed_at desc);

create table public.daily_activity (
  user_id uuid not null references auth.users on delete cascade,
  day     date not null,
  reviews int  not null default 0,
  correct int  not null default 0,
  primary key (user_id, day)
);

-- ───────────── row level security ─────────────
alter table public.profiles        enable row level security;
alter table public.cards           enable row level security;
alter table public.decks           enable row level security;
alter table public.deck_cards      enable row level security;
alter table public.user_card_state enable row level security;
alter table public.review_logs     enable row level security;
alter table public.daily_activity  enable row level security;

create policy "own profile" on public.profiles
  for all using (id = auth.uid()) with check (id = auth.uid());

create policy "read built-in or own cards" on public.cards
  for select using (owner_id is null or owner_id = auth.uid());
create policy "insert own cards" on public.cards
  for insert with check (owner_id = auth.uid());
create policy "update own cards" on public.cards
  for update using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "delete own cards" on public.cards
  for delete using (owner_id = auth.uid());

create policy "own decks" on public.decks
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "own deck cards" on public.deck_cards
  for all using (exists (select 1 from public.decks d where d.id = deck_id and d.owner_id = auth.uid()))
  with check (exists (select 1 from public.decks d where d.id = deck_id and d.owner_id = auth.uid()));

create policy "own card state" on public.user_card_state
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own review logs" on public.review_logs
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own activity" on public.daily_activity
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ───────────── record_review ─────────────
-- One call per answered card: updates SRS state, logs the review and bumps the
-- daily counter (day computed in the user's timezone). Scheduling is computed
-- client-side with ts-fsrs so reviews made offline can be replayed later.
create function public.record_review(
  p_card_id     uuid,
  p_mode        text,
  p_correct     boolean,
  p_rating      smallint default null,
  p_fsrs        jsonb default null,
  p_due_at      timestamptz default null,
  p_state       smallint default null,
  p_reps        int default null,
  p_lapses      int default null,
  p_reviewed_at timestamptz default now()
) returns void
language plpgsql security invoker set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_tz  text;
begin
  if v_uid is null then raise exception 'not signed in'; end if;

  select timezone into v_tz from profiles where id = v_uid;

  insert into user_card_state as s
    (user_id, card_id, fsrs, due_at, state, reps, lapses, right_count, wrong_count, updated_at)
  values
    (v_uid, p_card_id, p_fsrs, p_due_at, coalesce(p_state, 0), coalesce(p_reps, 0), coalesce(p_lapses, 0),
     case when p_correct then 1 else 0 end, case when p_correct then 0 else 1 end, now())
  on conflict (user_id, card_id) do update set
    fsrs        = coalesce(excluded.fsrs, s.fsrs),
    due_at      = coalesce(p_due_at, s.due_at),
    state       = coalesce(p_state, s.state),
    reps        = coalesce(p_reps, s.reps),
    lapses      = coalesce(p_lapses, s.lapses),
    right_count = s.right_count + case when p_correct then 1 else 0 end,
    wrong_count = s.wrong_count + case when p_correct then 0 else 1 end,
    updated_at  = now();

  insert into review_logs (user_id, card_id, mode, rating, correct, reviewed_at)
  values (v_uid, p_card_id, p_mode, p_rating, p_correct, p_reviewed_at);

  insert into daily_activity as a (user_id, day, reviews, correct)
  values (v_uid, (p_reviewed_at at time zone coalesce(v_tz, 'UTC'))::date, 1, case when p_correct then 1 else 0 end)
  on conflict (user_id, day) do update set
    reviews = a.reviews + 1,
    correct = a.correct + excluded.correct;
end $$;

grant execute on function public.record_review to authenticated;
