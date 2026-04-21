"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SearchEntry } from "@/lib/search-index";

interface SiteSearchProps {
  index: SearchEntry[];
  /** Placeholder for the input, e.g. "Search 50 free tools…" */
  placeholder: string;
  /** Section label rendered when results are showing, e.g. "Matching tools" */
  resultsLabel: string;
  /** Max number of live results shown. */
  limit?: number;
}

/**
 * Lightweight client-side search: case-insensitive substring match against
 * a pre-built haystack. Shows nothing until the user types; hides behind
 * 280ms idle so it doesn't flash on short queries.
 */
export function SiteSearch({
  index,
  placeholder,
  resultsLabel,
  limit = 10,
}: SiteSearchProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const tokens = q.split(/\s+/).filter(Boolean);
    return index
      .filter((entry) => tokens.every((t) => entry.haystack.includes(t)))
      .slice(0, limit);
  }, [query, index, limit]);

  const showResults = query.trim().length >= 2;

  return (
    <div className="mb-10">
      <label className="sr-only" htmlFor="site-search">
        {placeholder}
      </label>
      <div className="relative">
        <svg
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-base text-slate-900 shadow-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      </div>

      {showResults && (
        <div
          role="region"
          aria-live="polite"
          aria-label={resultsLabel}
          className="mt-4 rounded-xl border border-slate-200 bg-white p-2 shadow-sm"
        >
          {results.length === 0 ? (
            <p className="px-3 py-4 text-sm text-slate-500">
              No matches for <span className="font-medium text-slate-700">&ldquo;{query}&rdquo;</span>.
              Try a shorter or more general word.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {results.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={r.href}
                    className="flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-slate-50"
                  >
                    <span className="mt-0.5 shrink-0 rounded-full bg-brand/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand-dark">
                      {r.type === "tool" ? "Tool" : "Guide"}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-slate-900">
                        {r.title}
                      </span>
                      <span className="block truncate text-sm text-slate-500">
                        {r.categoryLabel} · {r.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
