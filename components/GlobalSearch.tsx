"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getGlobalSearchIndex,
  searchGlobalEntries,
  type GlobalSearchEntry,
} from "@/lib/search-index";

const RECENT_KEY = "fta.recent.v1";
const MAX_RESULTS = 12;

/**
 * Suggested landings shown when the palette is open with no query yet.
 * Mix of highest-intent tools + key destinations — helps first-time
 * users see what's in here at a glance.
 */
const SUGGESTED_SLUGS = [
  "/tools/loan-calculator",
  "/tools/mortgage-calculator",
  "/tools/compound-interest-calculator",
  "/tools/pomodoro-timer",
  "/tools/json-formatter",
  "/tools/qr-code-generator",
  "/tools/password-generator",
  "/best",
];

function readRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? (arr as string[]) : [];
  } catch {
    return [];
  }
}

/**
 * Cmd+K / Ctrl+K universal search palette. Renders a modal over the
 * whole site with fuzzy search across every tool, guide, hub, and
 * key landing page. Keyboard-driven: ↑/↓ to move, Enter to go, Esc
 * to close. Also exposes `window.fta.openSearch()` so other UI (the
 * header search icon) can open the same modal.
 */
export function GlobalSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const index = useMemo(() => getGlobalSearchIndex(), []);
  const bySlug = useMemo(() => {
    const m = new Map<string, GlobalSearchEntry>();
    for (const e of index) m.set(e.href.replace(/^\/tools\//, ""), e);
    return m;
  }, [index]);
  const byHref = useMemo(() => {
    const m = new Map<string, GlobalSearchEntry>();
    for (const e of index) m.set(e.href, e);
    return m;
  }, [index]);

  const results: GlobalSearchEntry[] = useMemo(() => {
    if (query.trim()) return searchGlobalEntries(index, query, MAX_RESULTS);

    // No query: show recents (mapped through the tool slug list) first,
    // then suggested, dedup'd.
    const seen = new Set<string>();
    const out: GlobalSearchEntry[] = [];
    for (const slug of recent) {
      const e = bySlug.get(slug);
      if (e && !seen.has(e.id)) {
        seen.add(e.id);
        out.push(e);
      }
      if (out.length >= 4) break;
    }
    for (const href of SUGGESTED_SLUGS) {
      const e = byHref.get(href);
      if (e && !seen.has(e.id)) {
        seen.add(e.id);
        out.push(e);
      }
      if (out.length >= MAX_RESULTS) break;
    }
    return out;
  }, [index, bySlug, byHref, query, recent]);

  // Reset highlight when results change.
  useEffect(() => {
    setHighlight(0);
  }, [query, open]);

  // Keep the highlighted row scrolled into view.
  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    if (!list) return;
    const el = list.children[highlight] as HTMLElement | undefined;
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [highlight, open]);

  // Global keybinding: Cmd+K (mac) / Ctrl+K (win+linux) toggles the palette.
  // Also listen for the "/" key to open, but only when no input is focused.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open && e.key === "/") {
        const t = e.target as HTMLElement | null;
        const tag = t?.tagName;
        const editable =
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          (t && t.isContentEditable);
        if (!editable) {
          e.preventDefault();
          setOpen(true);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Expose an imperative opener so SiteHeader's search button can call it.
  useEffect(() => {
    const w = window as typeof window & {
      fta?: { openSearch?: () => void };
    };
    w.fta = w.fta ?? {};
    w.fta.openSearch = () => setOpen(true);
    const onOpen = () => setOpen(true);
    window.addEventListener("fta:open-search", onOpen as EventListener);
    return () => {
      window.removeEventListener("fta:open-search", onOpen as EventListener);
    };
  }, []);

  // Refresh recents + reset query each time the palette opens, and
  // focus the input on the next tick so the keyboard keeps up.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setRecent(readRecent());
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const go = useCallback(
    (entry: GlobalSearchEntry) => {
      setOpen(false);
      router.push(entry.href);
    },
    [router],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlight((h) => (results.length ? (h + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlight((h) =>
          results.length ? (h - 1 + results.length) % results.length : 0,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const pick = results[highlight];
        if (pick) go(pick);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    },
    [results, highlight, go],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[10vh] sm:pt-[14vh]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-search-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close search"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
      />

      {/* Palette */}
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10">
        <h2 id="global-search-title" className="sr-only">
          Search the site
        </h2>
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
          <span aria-hidden className="text-lg text-slate-400">
            ⌕
          </span>
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            aria-expanded="true"
            aria-controls="global-search-listbox"
            aria-activedescendant={
              results[highlight] ? `gs-opt-${highlight}` : undefined
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search tools, guides, curated lists…"
            className="flex-1 bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="hidden rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold text-slate-500 sm:inline-block">
            esc
          </kbd>
        </div>

        {!query.trim() && results.length > 0 && (
          <p className="px-4 pt-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            {recent.length > 0 ? "Recent + suggested" : "Suggested"}
          </p>
        )}

        {query.trim() && results.length === 0 && (
          <div className="px-4 py-10 text-center text-sm text-slate-500">
            No matches for <span className="font-medium text-slate-700">&ldquo;{query}&rdquo;</span>.
            <br />
            Try a simpler keyword, or{" "}
            <a
              href="/tools"
              className="font-medium text-brand hover:underline"
              onClick={() => setOpen(false)}
            >
              browse all tools
            </a>
            .
          </div>
        )}

        {results.length > 0 && (
          <ul
            ref={listRef}
            id="global-search-listbox"
            role="listbox"
            className="max-h-[60vh] overflow-y-auto py-2"
          >
            {results.map((r, i) => {
              const active = i === highlight;
              return (
                <li
                  key={r.id}
                  id={`gs-opt-${i}`}
                  role="option"
                  aria-selected={active}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setHighlight(i)}
                    onClick={() => go(r)}
                    className={`flex w-full items-start gap-3 px-4 py-2.5 text-left transition ${
                      active ? "bg-slate-100" : "hover:bg-slate-50"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-md bg-brand/10 text-xs font-bold text-brand"
                    >
                      {r.kind === "tool"
                        ? "T"
                        : r.kind === "guide"
                          ? "G"
                          : r.kind === "hub"
                            ? "★"
                            : "›"}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate font-medium text-slate-900">
                          {r.title}
                        </span>
                        <span className="flex-none truncate rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                          {r.badge}
                        </span>
                      </span>
                      <span className="mt-0.5 line-clamp-1 block text-xs text-slate-500">
                        {r.subtitle}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`mt-1 text-xs text-slate-400 transition ${active ? "opacity-100" : "opacity-0"}`}
                    >
                      ↵
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-2 text-[11px] text-slate-500">
          <span className="flex items-center gap-3">
            <span>
              <kbd className="mr-1 rounded border border-slate-300 bg-white px-1 font-mono">↑</kbd>
              <kbd className="mr-1 rounded border border-slate-300 bg-white px-1 font-mono">↓</kbd>
              navigate
            </span>
            <span>
              <kbd className="mr-1 rounded border border-slate-300 bg-white px-1 font-mono">↵</kbd>
              open
            </span>
            <span>
              <kbd className="mr-1 rounded border border-slate-300 bg-white px-1 font-mono">esc</kbd>
              close
            </span>
          </span>
          <span className="hidden sm:inline">
            {index.length} destinations
          </span>
        </div>
      </div>
    </div>
  );
}
