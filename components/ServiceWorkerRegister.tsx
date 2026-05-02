"use client";

import { useEffect } from "react";

/**
 * Registers the service worker on first paint. Defensive:
 *  - Skipped in dev (next dev) to avoid stale-cache surprises.
 *  - Skipped if the browser doesn't support service workers.
 *  - Skipped if the user has set Do-Not-Track (some users prefer no SW).
 *  - Failures are silent — the site works without a service worker.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const reg = navigator.serviceWorker.register("/sw.js", { scope: "/" });
    reg.catch(() => {
      // Silent failure. The app works fine without an SW.
    });
  }, []);

  return null;
}
