"use client";

import { useMemo, useState } from "react";

export function TextReverser() {
  const [text, setText] = useState("Hello, world!");
  const [mode, setMode] = useState<"chars" | "words" | "lines">("chars");

  const output = useMemo(() => {
    if (mode === "chars") return [...text].reverse().join("");
    if (mode === "words") return text.split(/(\s+)/).reverse().join("");
    return text.split("\n").reverse().join("\n");
  }, [text, mode]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["chars", "words", "lines"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
              mode === m ? "bg-brand-dark text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            {m[0].toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Input</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Reversed</span>
        <textarea
          readOnly
          value={output}
          rows={4}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm"
        />
      </label>
      <button
        type="button"
        onClick={() => navigator.clipboard.writeText(output)}
        className="rounded-lg bg-brand-dark text-white px-4 py-2 text-sm font-semibold hover:bg-brand"
      >
        Copy
      </button>
    </div>
  );
}
