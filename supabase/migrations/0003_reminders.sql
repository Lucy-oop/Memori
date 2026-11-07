-- Memori 0003: daily study reminders (Web Push).
-- Run once in the Supabase SQL editor after 0001 and 0002. Safe to re-run.

-- ───────────── profile settings ─────────────
-- reminder_time: local time (in profiles.timezone) to send the reminder; null = reminders off.
-- last_reminded_on: local date of the last reminder, so each user gets at most one per day.
alter table public.profiles add column if not exists reminder_time    time;
alter table public.profiles add column if not exists last_reminded_on date;

-- Users may change their reminder time, but never last_reminded_on.
grant update (reminder_time) on public.profiles to authenticated;

-- ───────────── push subscriptions (one per device/browser) ─────────────
create table if not exists public.push_subscriptions (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users on delete cascade,
  endpoint   text not null unique,
  p256dh     text not null,
  auth       text not null,
  created_at timestamptz not null default now()
);

create index if not exists push_subscriptions_user on public.push_subscriptions (user_id);

alter table public.push_subscriptions enable row level security;

drop policy if exists "own push subscriptions" on public.push_subscriptions;
create policy "own push subscriptions" on public.push_subscriptions for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ───────────── who to remind now ─────────────
-- Called every ~15 minutes by /api/reminders (service role only). Atomically marks every user whose
-- local reminder time has passed today, then returns the ones who haven't studied yet today and
-- have at least one device subscribed. Marking first means a slow or repeated run never double-sends.
create or replace function public.claim_reminders()
returns table (user_id uuid, meaning_lang text, due_count int, endpoint text, p256dh text, auth text)
language sql security definer set search_path = public as $$
  with claimed as (
    update profiles p
       set last_reminded_on = (now() at time zone p.timezone)::date
     where p.reminder_time is not null
       and (now() at time zone p.timezone)::time >= p.reminder_time
       and (p.last_reminded_on is null or p.last_reminded_on < (now() at time zone p.timezone)::date)
    returning p.id, p.meaning_lang, (now() at time zone p.timezone)::date as today
  )
  select c.id, c.meaning_lang,
         (select count(*)::int from user_card_state s where s.user_id = c.id and s.due_at <= now()),
         ps.endpoint, ps.p256dh, ps.auth
    from claimed c
    join push_subscriptions ps on ps.user_id = c.id
   where not exists (select 1 from daily_activity a where a.user_id = c.id and a.day = c.today and a.reviews > 0);
$$;

revoke execute on function public.claim_reminders() from public, anon, authenticated;
grant execute on function public.claim_reminders() to service_role;

-- ───────────── schedule (run separately, after deploying the app) ─────────────
-- Needs the pg_cron and pg_net extensions (Database → Extensions). Replace the URL and secret:
--
--   select cron.schedule('memori-reminders', '*/15 * * * *', $cron$
--     select net.http_post(
--       url     := 'https://YOUR-APP.vercel.app/api/reminders',
--       headers := jsonb_build_object('Authorization', 'Bearer YOUR-CRON-SECRET')
--     );
--   $cron$);
--
-- To stop: select cron.unschedule('memori-reminders');
