// Memori service worker: makes the installed app open offline.
// - Static build assets & icons: cache-first (they're content-hashed).
// - Pages: network-first, falling back to the last cached copy.
// Card data itself is cached in IndexedDB by the app (lib/data.ts).
// Bump VERSION on deploys that change cached behaviour; old caches are deleted on activate.
const VERSION = "memori-v2";
const STATIC = `${VERSION}-static`;
const PAGES = `${VERSION}-pages`;
// Only public assets are precached. Signed-in pages are cached as the user visits them (see "navigate" below),
// so a signed-out install can never store the login redirect under an app URL.
const PRECACHE = ["/logo-mark.png", "/icons/icon-192.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC).then((c) => Promise.allSettled(PRECACHE.map((u) => c.add(u)))).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/auth/") || url.pathname === "/login") return;

  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/") || /\.(png|svg|woff2?)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) caches.open(STATIC).then((c) => c.put(req, res.clone()));
            return res;
          }),
      ),
    );
    return;
  }

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok && !res.redirected) caches.open(STATIC).then((c) => c.put(url.pathname, res.clone()));
          return res;
        })
        .catch(() => caches.match(url.pathname).then((hit) => hit || caches.match("/"))),
    );
  }
});

// ───────────── daily reminders (Web Push, sent by /api/reminders) ─────────────
self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { body: event.data && event.data.text() };
  }
  event.waitUntil(
    self.registration.showNotification(data.title || "Memori", {
      body: data.body || "Time to study!",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      tag: "memori-daily", // replaces yesterday's reminder instead of stacking
      data: { url: data.url || "/" },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = new URL((event.notification.data && event.notification.data.url) || "/", self.location.origin).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((wins) => {
      const open = wins.find((w) => w.url.startsWith(self.location.origin));
      if (open) return open.focus().then((w) => w && w.navigate(target));
      return self.clients.openWindow(target);
    }),
  );
});
