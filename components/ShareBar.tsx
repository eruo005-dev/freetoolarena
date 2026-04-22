"use client";

import { useCallback, useEffect, useState } from "react";

interface ShareBarProps {
  /** Canonical path of this page, e.g. "/tools/mortgage-calculator". */
  path: string;
  /** Title used as share sheet suggestion. */
  title: string;
  /** Site origin — falls back to window.location.origin on the client. */
  origin?: string;
}

/**
 * Small "Copy link / Share" row. Sits under the tool or at the bottom of
 * a guide so a useful result can be shared without leaving the page.
 *
 * - "Copy link" uses navigator.clipboard and flips to "Copied ✓" for 2s.
 * - "Share" only renders when navigator.share is available (mobile + some
 *   desktop browsers). Falls back silently elsewhere — no clutter.
 * - Client-only. No tracking, no localStorage. Share counts stay private.
 */
export function ShareBar({ path, title, origin }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function",
    );
  }, []);

  const url =
    (origin ??
      (typeof window !== "undefined" ? window.location.origin : "")) + path;

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context or permission denied) — no-op.
    }
  }, [url]);

  const share = useCallback(async () => {
    if (typeof navigator.share !== "function") return;
    try {
      await navigator.share({ title, url });
    } catch {
      // User cancelled share sheet — expected, ignore.
    }
  }, [title, url]);

  return (
    <div
      aria-label="Share this page"
      className="my-8 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
    >
      <span className="mr-1 font-medium text-slate-700">Found this useful?</span>
      <button
        type="button"
        onClick={copy}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-medium transition ${
          copied
            ? "border-emerald-300 bg-emerald-50 text-emerald-700"
            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-brand"
        }`}
        aria-live="polite"
      >
        <span aria-hidden>{copied ? "✓" : "🔗"}</span>
        {copied ? "Copied" : "Copy link"}
      </button>
      {canNativeShare && (
        <button
          type="button"
          onClick={share}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 transition hover:border-slate-300 hover:text-brand"
        >
          <span aria-hidden>↗</span>
          Share
        </button>
      )}
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 transition hover:border-slate-300 hover:text-brand"
      >
        <span aria-hidden>✉</span>
        Email
      </a>
    </div>
  );
}
