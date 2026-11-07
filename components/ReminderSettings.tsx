"use client";

import { Bell, BellOff } from "lucide-react";
import { useEffect, useState } from "react";
import { disableReminder, enableReminder, isSubscribed, pushSupport, setReminderTime, type PushSupport } from "@/lib/push";
import { useLibrary } from "./LibraryProvider";
import { Button, Panel } from "./ui";

/** Settings panel: one daily push reminder at a chosen local time. */
export function ReminderSettings() {
  const { profile, setProfile } = useLibrary();
  const [support, setSupport] = useState<PushSupport | null>(null);
  const [onDevice, setOnDevice] = useState(false);
  const [time, setTime] = useState("19:00");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const saved = profile?.reminder_time?.slice(0, 5) ?? null; // "HH:MM:SS" → "HH:MM"
  const on = !!saved && onDevice;

  useEffect(() => {
    const s = pushSupport();
    setSupport(s);
    if (s === "ok") isSubscribed().then(setOnDevice).catch(() => {});
  }, []);

  useEffect(() => {
    if (saved) setTime(saved);
  }, [saved]);

  if (!support || support === "not-configured") return null;

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setNote(null);
    try {
      await fn();
    } catch (e) {
      setNote(e instanceof Error && /reminder_time|push_subscriptions/.test(e.message)
        ? "Reminders need the 0003_reminders.sql migration — ask the admin to run it."
        : "Couldn't save the reminder. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  const turnOn = () =>
    run(async () => {
      if (!(await enableReminder(time))) {
        setNote("Notifications were blocked. Allow them for this site in your browser settings, then try again.");
        return;
      }
      setOnDevice(true);
      if (profile) setProfile({ ...profile, reminder_time: time });
    });

  const turnOff = () =>
    run(async () => {
      await disableReminder();
      setOnDevice(false);
      if (profile) setProfile({ ...profile, reminder_time: null });
    });

  const changeTime = (t: string) => {
    setTime(t);
    if (on && t) run(async () => {
      await setReminderTime(t);
      if (profile) setProfile({ ...profile, reminder_time: t });
    });
  };

  return (
    <Panel className="space-y-3 p-4">
      <div className="flex items-center justify-between gap-3">
        <span>
          <span className="flex items-center gap-2 font-medium"><Bell size={18} /> Daily reminder</span>
          <span className="block text-xs text-muted">One notification a day, only if you haven&apos;t studied yet.</span>
        </span>
        {support === "ok" && (
          on ? (
            <Button variant="secondary" size="sm" disabled={busy} onClick={turnOff}><BellOff size={16} /> Turn off</Button>
          ) : (
            <Button size="sm" disabled={busy} onClick={turnOn}>Turn on</Button>
          )
        )}
      </div>

      {support === "ok" && (
        <label className="flex items-center justify-between gap-3 text-sm">
          <span className="text-muted">Remind me at</span>
          <input type="time" value={time} onChange={(e) => changeTime(e.target.value)} className="input w-32" />
        </label>
      )}

      {support === "ios-install" && (
        <p className="text-sm text-muted">
          On iPhone/iPad, reminders work from the installed app: Safari → Share → <em>Add to Home Screen</em>, open Memori
          from the Home Screen, then turn the reminder on here (iOS 16.4 or later).
        </p>
      )}
      {support === "denied" && (
        <p className="text-sm text-muted">Notifications are blocked for this site. Allow them in your browser settings to use reminders.</p>
      )}
      {support === "unsupported" && <p className="text-sm text-muted">This browser doesn&apos;t support notifications.</p>}
      {support === "dev" && (
        <p className="text-sm text-muted">Reminders need the service worker, which only runs in a production build (<code>npm run build &amp;&amp; npm start</code>).</p>
      )}
      {saved && !onDevice && support === "ok" && (
        <p className="text-sm text-muted">Reminder set for {saved} on another device. Turn it on here to get it on this device too.</p>
      )}
      {note && <p className="text-sm text-bad">{note}</p>}
    </Panel>
  );
}
