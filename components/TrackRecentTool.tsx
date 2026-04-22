"use client";

import { useEffect } from "react";

const STORAGE_KEY = "fta.recent.v1";
const MAX = 8;

/**
 * Pushes the current tool's slug onto the "recently used" list in
 * localStorage. Renders nothing. Dropped into ToolShell once.
 */
export function TrackRecentTool({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const prev: string[] = raw ? JSON.parse(raw) : [];
      const next = [slug, ...prev.filter((s) => s !== slug)].slice(0, MAX);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("fta:recent-changed"));
    } catch {
      // Ignore quota / disabled storage.
    }
  }, [slug]);
  return null;
}
