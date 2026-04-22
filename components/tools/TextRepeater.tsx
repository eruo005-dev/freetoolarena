"use client";

import { useMemo, useState } from "react";

const MAX_CHARS = 100000;

export function TextRepeater() {
  const [text, setText] = useState("Hello world");
  const [times, setTimes] = useState(5);
  const [separator, setSeparator] = useState("\\n");

  const output = useMemo(() => {
    const sep = separator.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
    const n = Math.max(0, Math.floor(times));
    if (n === 0 || !text) return "";
    const pieces: string[] = [];
    let total = 0;
    let capped = false;
    for (let i = 0; i < n; i++) {
      const chunk = i === 0 ? text : sep + text;
      if (total + chunk.length > MAX_CHARS) {
        pieces.push(chunk.slice(0, MAX_CHARS - total));
        capped = true;
        break;
      }
      pieces.push(chunk);
      total += chunk.length;
    }
    return { value: pieces.join(""), capped };
  }, [text, times, separator]);

  const value = typeof output === "string" ? output : output.value;
  const capped = typeof output === "string" ? false : output.capped;

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-sm font-semibold text-slate-700 mb-1 block">Text</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Text to repeat…"
          className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 mb-1 block">Times</span>
          <input
            type="number"
            min={0}
            max={1000000}
            value={times}
            onChange={(e) => setTimes(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 mb-1 block">
            Separator (use \n for newline, \t for tab)
          </span>
          <input
            type="text"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700 mb-1 block">Output</span>
        <textarea
          readOnly
          value={value}
          rows={8}
          className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm bg-slate-50"
        />
      </label>

      {capped && (
        <p className="text-sm text-amber-600">Output capped at {MAX_CHARS.toLocaleString()} characters.</p>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(value)}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
        >
          Copy output
        </button>
        <span className="text-sm text-slate-500">{value.length.toLocaleString()} chars</span>
      </div>
    </div>
  );
}
