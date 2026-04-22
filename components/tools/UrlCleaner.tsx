"use client";

import { useMemo, useState } from "react";

const DEFAULT_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
  "gclid",
  "gclsrc",
  "dclid",
  "mc_cid",
  "mc_eid",
  "_ga",
  "_gl",
  "ref",
  "ref_src",
  "igshid",
  "yclid",
  "msclkid",
  "wbraid",
  "gbraid",
];

const SAMPLE = `https://example.com/article?utm_source=newsletter&utm_medium=email&id=42
https://shop.example.com/item/99?ref=homepage&gclid=abc123&color=red
https://blog.example.com/post?fbclid=XYZ&utm_campaign=spring`;

function cleanUrl(raw: string, removeList: Set<string>): { cleaned: string; removed: string[] } {
  const trimmed = raw.trim();
  if (!trimmed) return { cleaned: "", removed: [] };
  try {
    const url = new URL(trimmed);
    const removed: string[] = [];
    const keys = Array.from(url.searchParams.keys());
    for (const k of keys) {
      if (removeList.has(k.toLowerCase())) {
        removed.push(k);
        url.searchParams.delete(k);
      }
    }
    let out = url.toString();
    if (out.endsWith("?")) out = out.slice(0, -1);
    return { cleaned: out, removed };
  } catch {
    return { cleaned: trimmed, removed: [] };
  }
}

export function UrlCleaner({ initial = SAMPLE }: { initial?: string } = {}) {
  const [input, setInput] = useState(initial);
  const [extra, setExtra] = useState("");
  const [copied, setCopied] = useState(false);

  const { output, removedSummary, totalUrls, totalRemoved } = useMemo(() => {
    const extraList = extra
      .split(/[\s,]+/)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    const removeList = new Set([...DEFAULT_PARAMS.map((p) => p.toLowerCase()), ...extraList]);
    const lines = input.split(/\r?\n/);
    const cleanedLines: string[] = [];
    const removedCounts = new Map<string, number>();
    let urls = 0;
    let removals = 0;
    for (const line of lines) {
      if (!line.trim()) {
        cleanedLines.push("");
        continue;
      }
      urls += 1;
      const { cleaned, removed } = cleanUrl(line, removeList);
      cleanedLines.push(cleaned);
      for (const r of removed) {
        removedCounts.set(r, (removedCounts.get(r) ?? 0) + 1);
        removals += 1;
      }
    }
    const summary = Array.from(removedCounts.entries()).sort((a, b) => b[1] - a[1]);
    return {
      output: cleanedLines.join("\n"),
      removedSummary: summary,
      totalUrls: urls,
      totalRemoved: removals,
    };
  }, [input, extra]);

  function copy() {
    if (!output) return;
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          URLs (one per line)
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Extra Params to Strip (comma or newline separated)
        </span>
        <textarea
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          rows={6}
          spellCheck={false}
          placeholder="hsCtaTracking, vero_id, ..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
        <p className="text-xs text-slate-500 mt-1">
          Always-stripped defaults: {DEFAULT_PARAMS.join(", ")}.
        </p>
      </label>

      <div className="rounded-xl bg-slate-50 p-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">URLs</p>
          <p className="text-2xl font-bold text-slate-900">{totalUrls}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Params Removed</p>
          <p className="text-2xl font-bold text-slate-900">{totalRemoved}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Unique Keys</p>
          <p className="text-2xl font-bold text-slate-900">{removedSummary.length}</p>
        </div>
      </div>

      {removedSummary.length > 0 && (
        <div>
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Removed Parameters
          </span>
          <div className="flex flex-wrap gap-2">
            {removedSummary.map(([key, count]) => (
              <span
                key={key}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-mono text-slate-700"
              >
                {key} <span className="text-slate-400">x{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 block">
            Cleaned URLs
          </span>
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <textarea
          readOnly
          value={output}
          rows={8}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </div>
    </div>
  );
}
