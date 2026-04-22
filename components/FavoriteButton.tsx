"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "fta.favorites.v1";

/** Reads the favorites set from localStorage. Safe on SSR. */
function readFavorites(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? (arr as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeFavorites(next: Set<string>) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(Array.from(next)),
    );
    // Notify other components (FavoritesList) in the same tab.
    window.dispatchEvent(new Event("fta:favorites-changed"));
  } catch {
    // Quota exceeded / disabled storage — silently ignore.
  }
}

/**
 * A small star toggle. Client-only; uses localStorage so there's no auth,
 * no backend, and no cross-device sync. Works offline. Zero tracking.
 */
export function FavoriteButton({ slug }: { slug: string }) {
  const [favorited, setFavorited] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFavorited(readFavorites().has(slug));
    setHydrated(true);
    const onChange = () => setFavorited(readFavorites().has(slug));
    window.addEventListener("fta:favorites-changed", onChange);
    return () => window.removeEventListener("fta:favorites-changed", onChange);
  }, [slug]);

  const toggle = useCallback(() => {
    const next = readFavorites();
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    writeFavorites(next);
    setFavorited(next.has(slug));
  }, [slug]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={favorited}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      suppressHydrationWarning
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
        hydrated && favorited
          ? "border-amber-300 bg-amber-50 text-amber-800 hover:border-amber-400"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
      }`}
    >
      <span aria-hidden className="text-sm leading-none">
        {hydrated && favorited ? "★" : "☆"}
      </span>
      {hydrated && favorited ? "Favorited" : "Favorite"}
    </button>
  );
}
