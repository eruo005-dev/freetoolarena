"use client";

import { useMemo, useState } from "react";

const SAMPLE = `apple
Banana
apple
  apple
cherry
banana
cherry
`;

export function RemoveDuplicateLines({ initial = SAMPLE }: { initial?: string } = {}) {
  const [input, setInput] = useState(initial);
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trim, setTrim] = useState(true);
  const [keep, setKeep] = useState<"first" | "last">("first");
  const [preserveOrder, setPreserveOrder] = useState(true);
  const [copied, setCopied] = useState(false);

  const { output, originalCount, dedupedCount } = useMemo(() => {
    const lines = input.split(/\r?\n/);
    const keyFor = (s: string) => {
      let k = trim ? s.trim() : s;
      if (!caseSensitive) k = k.toLowerCase();
      return k;
    };
    const seen = new Map<string, { index: number; value: string }>();
    lines.forEach((line, idx) => {
      const key = keyFor(line);
      if (keep === "first") {
        if (!seen.has(key)) seen.set(key, { index: idx, value: line });
      } else {
        seen.set(key, { index: idx, value: line });
      }
    });
    let entries = Array.from(seen.values());
    if (preserveOrder) entries.sort((a, b) => a.index - b.index);
    return {
      output: entries.map((e) => e.value).join("\n"),
      originalCount: lines.length,
      dedupedCount: entries.length,
    };
  }, [input, caseSensitive, trim, keep, preserveOrder]);

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
          Input Lines
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="h-4 w-4 accent-brand"
          />
          <span className="text-sm text-slate-700">Case-sensitive</span>
        </label>
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={trim}
            onChange={(e) => setTrim(e.target.checked)}
            className="h-4 w-4 accent-brand"
          />
          <span className="text-sm text-slate-700">Trim whitespace</span>
        </label>
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={preserveOrder}
            onChange={(e) => setPreserveOrder(e.target.checked)}
            className="h-4 w-4 accent-brand"
          />
          <span className="text-sm text-slate-700">Preserve original order</span>
        </label>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white">
          <span className="text-sm text-slate-700">Keep:</span>
          <button
            type="button"
            onClick={() => setKeep("first")}
            className={`rounded-md border px-2 py-1 text-xs font-semibold ${
              keep === "first"
                ? "bg-brand text-white border-brand"
                : "bg-white text-slate-700 border-slate-300 hover:border-brand"
            }`}
          >
            First
          </button>
          <button
            type="button"
            onClick={() => setKeep("last")}
            className={`rounded-md border px-2 py-1 text-xs font-semibold ${
              keep === "last"
                ? "bg-brand text-white border-brand"
                : "bg-white text-slate-700 border-slate-300 hover:border-brand"
            }`}
          >
            Last
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Original</p>
          <p className="text-2xl font-bold text-slate-900">{originalCount}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Deduped</p>
          <p className="text-2xl font-bold text-slate-900">{dedupedCount}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Removed</p>
          <p className="text-2xl font-bold text-slate-900">{originalCount - dedupedCount}</p>
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 block">
            Output
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
