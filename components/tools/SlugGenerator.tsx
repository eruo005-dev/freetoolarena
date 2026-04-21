"use client";

import { useMemo, useState } from "react";

const SAMPLE = "How to Make a Monthly Budget (That You'll Actually Use)";

export function SlugGenerator() {
  const [text, setText] = useState(SAMPLE);
  const [sep, setSep] = useState<"-" | "_">("-");
  const [lower, setLower] = useState(true);
  const [stripStop, setStripStop] = useState(false);

  const slug = useMemo(() => {
    const base = lower ? text.toLowerCase() : text;
    let words = base
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (stripStop) {
      words = words.filter((w) => !STOP.has(w.toLowerCase()));
    }
    return words.join(sep).replace(new RegExp(`\\${sep}+`, "g"), sep);
  }, [text, sep, lower, stripStop]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Title or phrase</span>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <div className="flex flex-wrap gap-3 items-center">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} className="accent-brand" />
          Lowercase
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={stripStop} onChange={(e) => setStripStop(e.target.checked)} className="accent-brand" />
          Remove stop words
        </label>
        <label className="flex items-center gap-2 text-sm">
          Separator
          <select
            value={sep}
            onChange={(e) => setSep(e.target.value as "-" | "_")}
            className="border border-slate-300 rounded px-2 py-1 text-sm"
          >
            <option value="-">dash -</option>
            <option value="_">underscore _</option>
          </select>
        </label>
      </div>
      <div className="rounded-lg border border-slate-300 bg-slate-50 p-4">
        <div className="flex items-baseline justify-between mb-1">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Slug</p>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(slug)}
            className="text-xs font-semibold text-brand hover:text-brand-dark"
          >
            Copy
          </button>
        </div>
        <p className="font-mono text-base text-slate-900 break-all">{slug || " "}</p>
      </div>
    </div>
  );
}

const STOP = new Set([
  "a", "an", "the", "and", "or", "but", "of", "to", "in", "on", "at", "for", "with",
  "is", "are", "was", "were", "be", "been", "being", "this", "that", "these", "those",
  "it", "its", "as", "by", "from",
]);
