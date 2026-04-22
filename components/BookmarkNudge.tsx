"use client";

import { useEffect, useState } from "react";

/**
 * A small, dismissable "Bookmark this" nudge. Shown only to hydrated
 * visitors who haven't already favorited the page AND haven't dismissed
 * the nudge before (dismissal persists in localStorage).
 *
 * Shows up after a short delay (4s) so it doesn't fire before the user
 * has engaged with the tool. Completely non-blocking — sits at the bottom
 * of the viewport and can be closed without an account, tracking, or ad.
 */
const DISMISS_KEY = "fta.nudge.bookmark.dismissed.v1";
const FAV_KEY = "fta.favorites.v1";

export function BookmarkNudge({ slug }: { slug: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If the user has already favorited this slug OR dismissed the nudge
    // in the past, don't pester them.
    try {
      const dismissed = window.localStorage.getItem(DISMISS_KEY) === "1";
      if (dismissed) return;
      const rawFav = window.localStorage.getItem(FAV_KEY);
      if (rawFav) {
        const arr = JSON.parse(rawFav);
        if (Array.isArray(arr) && arr.includes(slug)) return;
      }
    } catch {
      // Storage blocked — just render nothing.
      return;
    }

    const t = window.setTimeout(() => setVisible(true), 4000);
    return () => window.clearTimeout(t);
  }, [slug]);

  if (!visible) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Ignore.
    }
    setVisible(false);
  };

  return (
    <div
      role="status"
      className="fixed bottom-4 left-1/2 z-40 w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg ring-1 ring-black/5"
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-700"
        >
          ★
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">
            Coming back? Bookmark it.
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-600">
            Press <kbd className="rounded border border-slate-300 bg-slate-50 px-1 font-mono text-[10px]">Ctrl</kbd>{" "}
            +{" "}
            <kbd className="rounded border border-slate-300 bg-slate-50 px-1 font-mono text-[10px]">D</kbd>{" "}
            (⌘D on Mac) — or tap the ★ up top to save it to your Favorites on
            this device. No account needed.
          </p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="-m-1.5 shrink-0 rounded p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <span aria-hidden className="text-lg leading-none">×</span>
        </button>
      </div>
    </div>
  );
}
