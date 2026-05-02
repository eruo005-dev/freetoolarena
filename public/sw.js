/**
 * freetoolarena.com service worker — minimal, defensive offline cache.
 *
 * Strategy:
 *   - App shell (HTML, JS, CSS) → stale-while-revalidate.
 *   - Static assets in /_next/static/ → cache-first (immutable).
 *   - Recently-visited tool/guide HTML → network-first with cache fallback.
 *   - Everything else (ads, analytics, third-party) → network-only, never
 *     cached, never intercepted.
 *
 * Bumping CACHE_VERSION invalidates all caches on the next visit.
 */

const CACHE_VERSION = "v1.2026-04-30";
const SHELL_CACHE = `fta-shell-${CACHE_VERSION}`;
const STATIC_CACHE = `fta-static-${CACHE_VERSION}`;
const PAGES_CACHE = `fta-pages-${CACHE_VERSION}`;
const MAX_PAGE_ENTRIES = 30;

// Critical shell URLs to pre-cache on install. Everything else fills lazily.
const SHELL_URLS = ["/", "/tools", "/guides", "/best", "/compare", "/learn"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      cache.addAll(SHELL_URLS).catch(() => {
        // If the install precache fails (offline at install time), just keep going —
        // the rest of the runtime caching still works.
      }),
    ),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([SHELL_CACHE, STATIC_CACHE, PAGES_CACHE]);
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => !keep.has(k)).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Only handle same-origin GETs. Skip every POST, every cross-origin call,
  // every API call, every analytics ping. We don't intercept ads, fonts CDNs,
  // or anything else.
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Don't intercept Next.js streaming responses or RSC payloads — they get
  // buggy with custom caching strategies.
  if (url.pathname.startsWith("/_next/data/")) return;
  // Don't intercept the API endpoints — they are dynamic; let the platform
  // edge cache handle them via headers.
  if (url.pathname.startsWith("/api/")) return;
  // Don't try to cache the OG image generator (it's dynamic per query).
  if (url.pathname === "/og") return;

  // /_next/static/* — immutable, hash-named. Cache-first forever.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(STATIC_CACHE, req));
    return;
  }

  // Page navigations + their HTML — network first, fall back to cache, fall
  // back to a generic offline message.
  if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
    event.respondWith(networkFirstHtml(PAGES_CACHE, req));
    return;
  }

  // Anything else (images we host, manifest, etc.) — stale-while-revalidate.
  event.respondWith(staleWhileRevalidate(STATIC_CACHE, req));
});

async function cacheFirst(cacheName, request) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const fresh = await fetch(request);
    if (fresh.ok) cache.put(request, fresh.clone());
    return fresh;
  } catch (e) {
    // Offline + not in cache: 504-ish stub.
    return new Response("", { status: 504, statusText: "Offline" });
  }
}

async function staleWhileRevalidate(cacheName, request) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((res) => {
      if (res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => cached || new Response("", { status: 504 }));
  return cached || network;
}

async function networkFirstHtml(cacheName, request) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(request);
    if (fresh.ok) {
      cache.put(request, fresh.clone());
      void trimCache(cacheName, MAX_PAGE_ENTRIES);
    }
    return fresh;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    // Final fallback: a simple offline page.
    return new Response(
      `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Offline</title>` +
        `<meta name="viewport" content="width=device-width,initial-scale=1">` +
        `<style>body{font-family:system-ui,sans-serif;padding:3rem 1.5rem;max-width:32rem;margin:0 auto;color:#0f172a}h1{font-size:1.5rem;margin:0 0 .5rem}p{line-height:1.5;color:#475569}</style></head>` +
        `<body><h1>You're offline.</h1><p>Free Tool Arena tools work entirely in your browser, but the page you requested isn't cached on this device yet. Reconnect and try again — once a tool loads, it works offline next time.</p></body></html>`,
      { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }
}

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  // Delete oldest first (request order).
  const toDelete = keys.slice(0, keys.length - maxEntries);
  await Promise.all(toDelete.map((k) => cache.delete(k)));
}
