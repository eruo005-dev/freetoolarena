"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getPublishedTools,
  pageHref,
  CATEGORIES,
  type Page,
} from "@/lib/pages";

const STORAGE_KEY = "fta.favorites.v1";

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

export function FavoritesList() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSlugs(read());
    setHydrated(true);
    const onChange = () => setSlugs(read());
    window.addEventListener("fta:favorites-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("fta:favorites-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  if (!hydrated) {
    return (
      <p className="text-sm text-slate-500">Loading your favorites…</p>
    );
  }

  if (slugs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="text-lg font-semibold text-slate-900">No favorites yet</p>
        <p className="mt-2 text-sm text-slate-600">
          Tap the star on any tool to save it here — stored in your browser only.
        </p>
        <Link
          href="/tools"
          className="mt-4 inline-block rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:border-slate-400"
        >
          Browse all tools →
        </Link>
      </div>
    );
  }

  const bySlug = new Map<string, Page>(
    getPublishedTools().map((p) => [p.slug, p]),
  );
  const pages = slugs.map((s) => bySlug.get(s)).filter((p): p is Page => !!p);

  if (pages.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Your favorites reference tools that aren&rsquo;t published yet.
      </p>
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {pages.map((p) => (
        <li key={p.slug}>
          <Link
            href={pageHref(p)}
            className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand hover:shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">
              {CATEGORIES[p.category].label}
            </p>
            <p className="mt-1 font-medium text-slate-900">{p.h1}</p>
            <p className="mt-1 line-clamp-2 text-sm text-slate-600">
              {p.description}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
