"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Tiny "share this calculation" button. Copies the current URL (with query
 * params) to clipboard. Renders inside a tool's interactive surface so the
 * URL captured reflects the user's current state.
 *
 * Pairs with tools that read state from URL (?principal=400000&rate=6.5
 * etc.) — the rendered URL becomes a permalink to the user's scenario.
 *
 * Tools that don't sync state to URL still benefit — at minimum sharing
 * the slug spreads the tool itself.
 *
 * Usage in a tool component:
 *   <ShareCalculation values={{ principal, rate, years }} />
 *
 * The component pushes those values into the URL via history.replaceState
 * (no navigation, no scroll), so even if the tool's render() doesn't read
 * params on hydration, the URL stays accurate for sharing.
 */
export function ShareCalculation({
  values,
  paramKey,
  className = "",
}: {
  /** Object of param keys → values to encode in the URL. */
  values?: Record<string, string | number | boolean | undefined>;
  /** Optional override prefix for param keys. */
  paramKey?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  // Sync values into the URL whenever they change — uses replaceState so
  // it doesn't add browser-history entries or trigger Next.js navigation.
  useEffect(() => {
    if (!values || typeof window === "undefined") return;
    const u = new URL(window.location.href);
    for (const [k, v] of Object.entries(values)) {
      const key = paramKey ? `${paramKey}.${k}` : k;
      if (v === undefined || v === null || v === "" || (typeof v === "number" && !Number.isFinite(v))) {
        u.searchParams.delete(key);
      } else {
        u.searchParams.set(key, String(v));
      }
    }
    // Avoid spamming the URL bar with identical updates.
    if (u.toString() !== window.location.href) {
      window.history.replaceState(null, "", u.toString());
    }
  }, [values, paramKey]);

  const handleCopy = useCallback(async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    try {
      // Prefer the modern Clipboard API; fall back to a hidden textarea.
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  }, []);

  const handleNativeShare = useCallback(async () => {
    if (typeof window === "undefined" || !("share" in navigator)) {
      handleCopy();
      return;
    }
    try {
      await (navigator as Navigator & { share?: (data: ShareData) => Promise<void> }).share?.({
        url: window.location.href,
        title: document.title,
      });
    } catch {
      // User cancelled or share unavailable — fall back to copy.
      handleCopy();
    }
  }, [handleCopy]);

  // Cmd/Ctrl + Shift + S as a power-user shortcut to copy the current
  // tool URL. Skipped while a form input has focus so we don't fight the
  // browser's own save-page shortcut.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (!(mod && e.shiftKey && (e.key === "s" || e.key === "S"))) return;
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName;
      const editable =
        tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (t && t.isContentEditable);
      if (editable) return;
      e.preventDefault();
      handleCopy();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleCopy]);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleNativeShare}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-brand hover:text-brand"
        aria-live="polite"
        aria-keyshortcuts="Control+Shift+S Meta+Shift+S"
        title="Share this calculation (Ctrl/⌘ + Shift + S)"
      >
        <ShareIcon />
        {status === "copied" ? "Link copied!" : status === "error" ? "Copy failed" : "Share this calculation"}
      </button>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="h-3.5 w-3.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm-9 5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm9 5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm-1.4-1.5L8.4 11.5M11.6 6.5 8.4 8.5"
      />
    </svg>
  );
}
