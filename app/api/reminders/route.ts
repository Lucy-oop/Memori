import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import webpush from "web-push";

/**
 * Sends the daily study reminders. Called every ~15 minutes by Supabase pg_cron
 * (see supabase/migrations/0003_reminders.sql) with `Authorization: Bearer $CRON_SECRET`.
 *
 * Server-only secrets: SUPABASE_SECRET_KEY, VAPID_PRIVATE_KEY, CRON_SECRET — never NEXT_PUBLIC_.
 */
export const dynamic = "force-dynamic";

interface Target {
  user_id: string;
  meaning_lang: string;
  due_count: number;
  endpoint: string;
  p256dh: string;
  auth: string;
}

function message(lang: string, due: number) {
  if (lang === "my") {
    return {
      title: "Memori — လေ့လာချိန် ရောက်ပါပြီ",
      body: due > 0 ? `ပြန်လေ့ကျင့်ရန် ကတ် ${due} ခု စောင့်နေပါတယ်။ ၅ မိနစ်လောက် လေ့လာကြရအောင်!` : "ဒီနေ့ စကားလုံးအသစ်တွေ စောင့်နေပါတယ်။ ၅ မိနစ်လောက် လေ့လာကြရအောင်!",
    };
  }
  return {
    title: "Memori — time to study",
    body: due > 0 ? `${due} cards are ready to review. Five minutes keeps your streak going!` : "Today's new words are waiting. Five minutes keeps your streak going!",
  };
}

export async function POST(req: Request) {
  const { CRON_SECRET, SUPABASE_SECRET_KEY, VAPID_PRIVATE_KEY } = process.env;
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!CRON_SECRET || !SUPABASE_SECRET_KEY || !VAPID_PRIVATE_KEY || !publicKey || !url) {
    return NextResponse.json({ error: "reminders not configured" }, { status: 503 });
  }
  if (req.headers.get("authorization") !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  webpush.setVapidDetails(process.env.VAPID_SUBJECT || "https://github.com/Lucy-oop/Memori", publicKey, VAPID_PRIVATE_KEY);
  const admin = createClient(url, SUPABASE_SECRET_KEY, { auth: { persistSession: false } });

  const { data, error } = await admin.rpc("claim_reminders");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const targets = (data ?? []) as Target[];
  let sent = 0;
  const gone: string[] = [];
  await Promise.all(
    targets.map(async (t) => {
      try {
        await webpush.sendNotification(
          { endpoint: t.endpoint, keys: { p256dh: t.p256dh, auth: t.auth } },
          JSON.stringify({ ...message(t.meaning_lang, t.due_count), url: "/" }),
          { TTL: 60 * 60 * 6 },
        );
        sent++;
      } catch (e) {
        const status = (e as { statusCode?: number }).statusCode;
        if (status === 404 || status === 410) gone.push(t.endpoint); // device unsubscribed or expired
      }
    }),
  );
  if (gone.length) await admin.from("push_subscriptions").delete().in("endpoint", gone);

  return NextResponse.json({ sent, removed: gone.length, users: new Set(targets.map((t) => t.user_id)).size });
}
