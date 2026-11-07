"use client";

import { supabaseBrowser } from "./supabase/client";
import { currentUserId, updateProfile } from "./data";

/** Daily reminder push subscriptions (browser side). The sender is app/api/reminders. */

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "";

export type PushSupport =
  | "ok"
  | "not-configured" // no VAPID key in the environment
  | "dev" // service worker only runs in production builds
  | "ios-install" // iPhone/iPad: only works from the Home Screen app (iOS 16.4+)
  | "unsupported"
  | "denied"; // the user blocked notifications in browser settings

export function pushSupport(): PushSupport {
  if (!VAPID_PUBLIC_KEY) return "not-configured";
  if (typeof window === "undefined") return "unsupported";
  const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const standalone = matchMedia("(display-mode: standalone)").matches || (navigator as { standalone?: boolean }).standalone === true;
  if (ios && !standalone) return "ios-install";
  if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) return "unsupported";
  if (process.env.NODE_ENV !== "production") return "dev";
  if (Notification.permission === "denied") return "denied";
  return "ok";
}

function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padded = (base64 + "=".repeat((4 - (base64.length % 4)) % 4)).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(padded);
  const out = new Uint8Array(new ArrayBuffer(raw.length));
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

/** Is this device currently subscribed? */
export async function isSubscribed(): Promise<boolean> {
  if (pushSupport() !== "ok") return false;
  const reg = await navigator.serviceWorker.getRegistration();
  return !!(await reg?.pushManager.getSubscription());
}

/**
 * Ask for permission, subscribe this device and save the reminder time (local "HH:MM").
 * Returns false if the user declined the permission prompt.
 */
export async function enableReminder(time: string): Promise<boolean> {
  if ((await Notification.requestPermission()) !== "granted") return false;
  const reg = await navigator.serviceWorker.register("/sw.js");
  await navigator.serviceWorker.ready;
  const sub =
    (await reg.pushManager.getSubscription()) ??
    (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) }));
  const json = sub.toJSON();
  const userId = await currentUserId();
  const db = supabaseBrowser();
  const { error } = await db
    .from("push_subscriptions")
    .upsert(
      { user_id: userId, endpoint: sub.endpoint, p256dh: json.keys?.p256dh ?? "", auth: json.keys?.auth ?? "" },
      { onConflict: "endpoint" },
    );
  if (error) throw error;
  await setReminderTime(time);
  return true;
}

/** Change the time (and refresh the timezone, in case the user moved). */
export async function setReminderTime(time: string | null): Promise<void> {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  await updateProfile(time ? { reminder_time: time, timezone } : { reminder_time: null });
}

/** Turn reminders off for this account and unsubscribe this device. */
export async function disableReminder(): Promise<void> {
  const reg = await navigator.serviceWorker.getRegistration();
  const sub = await reg?.pushManager.getSubscription();
  if (sub) {
    await supabaseBrowser().from("push_subscriptions").delete().eq("endpoint", sub.endpoint);
    await sub.unsubscribe().catch(() => {});
  }
  await setReminderTime(null);
}
