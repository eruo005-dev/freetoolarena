"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getPublishedTools,
  pageHref,
  CATEGORIES,
  type Page,
} from "@/lib/pages";

const STORAGE_KEY = "fta.recent.v1";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? (arr as string[]) : [];
  } catch {
    return [];
  }
}

/**
 * A lightweight "recently used" strip. Renders nothing on SSR and on
 * first paint; only shows up once the client hydrates *and* the user has
 * actually used a tool. Keeps the homepage uncluttered for new visitors.
 */
export function RecentlyUsed({ limit = 5 }: { limit?: number }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSlugs(read());
    setHydrated(true);
    const onChange = () => setSlugs(read());
    window.addEventListener("fta:recent-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("fta:recent-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  if (!hydrated || slugs.length === 0) return null;

  const bySlug = new Map<string, Page>(
    getPublishedTools().map((p) => [p.slug, p]),
  );
  const pages = slugs
    .map((s) => bySlug.get(s))
    .filter((p): p is Page => !!p)
    .slice(0, limit);
  if (pages.length === 0) return null;

  return (
    <section aria-label="Recently used tools">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Picking up where you left off
        </h2>
        <Link
          href="/favorites"
          className="text-sm font-medium text-brand hover:text-brand-dark"
        >
          Favorites →
        </Link>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {pages.map((p) => (
          <li key={p.slug}>
            <Link
              href={pageHref(p)}
              className="block rounded-xl border border-slate-200 bg-white p-3 transition hover:border-brand hover:shadow-sm"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-brand">
                {CATEGORIES[p.category].label}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {p.h1}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
