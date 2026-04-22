"use client";

import { useMemo, useState } from "react";

const SAMPLE = `banana
Apple
cherry
10
2
apple
date
`;

type Direction = "asc" | "desc";
type Mode = "alpha" | "numeric" | "length";

export function TextSorter({ initial = SAMPLE }: { initial?: string } = {}) {
  const [input, setInput] = useState(initial);
  const [direction, setDirection] = useState<Direction>("asc");
  const [mode, setMode] = useState<Mode>("alpha");
  const [caseInsensitive, setCaseInsensitive] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [copied, setCopied] = useState(false);

  const { output, originalCount, resultCount } = useMemo(() => {
    let lines = input.split(/\r?\n/);
    const original = lines.length;
    if (removeEmpty) lines = lines.filter((l) => l.trim() !== "");
    const sorted = [...lines].sort((a, b) => {
      if (mode === "numeric") {
        const an = parseFloat(a);
        const bn = parseFloat(b);
        const aNaN = Number.isNaN(an);
        const bNaN = Number.isNaN(bn);
        if (aNaN && bNaN) return a.localeCompare(b);
        if (aNaN) return 1;
        if (bNaN) return -1;
        return an - bn;
      }
      if (mode === "length") {
        return a.length - b.length;
      }
      const aa = caseInsensitive ? a.toLowerCase() : a;
      const bb = caseInsensitive ? b.toLowerCase() : b;
      return aa.localeCompare(bb);
    });
    if (direction === "desc") sorted.reverse();
    if (reverse) sorted.reverse();
    return {
      output: sorted.join("\n"),
      originalCount: original,
      resultCount: sorted.length,
    };
  }, [input, direction, mode, caseInsensitive, reverse, removeEmpty]);

  function copy() {
    if (!output) return;
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const modeBtn = (m: Mode) =>
    `rounded-md border px-3 py-2 text-sm font-semibold ${
      mode === m
        ? "bg-brand text-white border-brand"
        : "bg-white text-slate-700 border-slate-300 hover:border-brand"
    }`;

  const dirBtn = (d: Direction) =>
    `rounded-md border px-3 py-2 text-sm font-semibold ${
      direction === d
        ? "bg-brand text-white border-brand"
        : "bg-white text-slate-700 border-slate-300 hover:border-brand"
    }`;

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

      <div>
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Sort Mode
        </span>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setMode("alpha")} className={modeBtn("alpha")}>
            Alphabetical
          </button>
          <button type="button" onClick={() => setMode("numeric")} className={modeBtn("numeric")}>
            Numeric
          </button>
          <button type="button" onClick={() => setMode("length")} className={modeBtn("length")}>
            Length
          </button>
        </div>
      </div>

      <div>
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Direction
        </span>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setDirection("asc")} className={dirBtn("asc")}>
            Ascending
          </button>
          <button type="button" onClick={() => setDirection("desc")} className={dirBtn("desc")}>
            Descending
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={caseInsensitive}
            onChange={(e) => setCaseInsensitive(e.target.checked)}
            className="h-4 w-4 accent-brand"
          />
          <span className="text-sm text-slate-700">Case-insensitive</span>
        </label>
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={reverse}
            onChange={(e) => setReverse(e.target.checked)}
            className="h-4 w-4 accent-brand"
          />
          <span className="text-sm text-slate-700">Reverse result</span>
        </label>
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={removeEmpty}
            onChange={(e) => setRemoveEmpty(e.target.checked)}
            className="h-4 w-4 accent-brand"
          />
          <span className="text-sm text-slate-700">Remove empty lines</span>
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Input</p>
          <p className="text-2xl font-bold text-slate-900">{originalCount}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Output</p>
          <p className="text-2xl font-bold text-slate-900">{resultCount}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Dropped</p>
          <p className="text-2xl font-bold text-slate-900">{originalCount - resultCount}</p>
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
