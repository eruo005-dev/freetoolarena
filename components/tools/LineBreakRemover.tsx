"use client";

import { useMemo, useState } from "react";

const SAMPLE = `This is the first paragraph
broken across multiple
lines for no good reason.

This is a second paragraph
that should probably be joined
into a single sentence.`;

type Mode = "space" | "custom" | "paragraph" | "all";

export function LineBreakRemover({ initial = SAMPLE }: { initial?: string } = {}) {
  const [input, setInput] = useState(initial);
  const [mode, setMode] = useState<Mode>("space");
  const [custom, setCustom] = useState(" | ");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    const src = input.replace(/\r\n?/g, "\n");
    if (mode === "all") return src.replace(/\n+/g, "");
    if (mode === "space") return src.replace(/\n+/g, " ");
    if (mode === "custom") return src.replace(/\n+/g, custom);
    // paragraph: keep double newlines, collapse single newlines to spaces
    return src
      .split(/\n{2,}/)
      .map((p) => p.replace(/\n+/g, " "))
      .join("\n\n");
  }, [input, mode, custom]);

  function copy() {
    if (!output) return;
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const modeBtn = (m: Mode, label: string) => (
    <button
      type="button"
      onClick={() => setMode(m)}
      className={`rounded-md border px-3 py-2 text-sm font-semibold ${
        mode === m
          ? "bg-brand text-white border-brand"
          : "bg-white text-slate-700 border-slate-300 hover:border-brand"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Input Text
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
          Replace line breaks with
        </span>
        <div className="flex flex-wrap gap-2">
          {modeBtn("space", "Space")}
          {modeBtn("custom", "Custom string")}
          {modeBtn("paragraph", "Keep paragraph breaks")}
          {modeBtn("all", "Remove entirely")}
        </div>
      </div>

      {mode === "custom" && (
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Custom replacement
          </span>
          <input
            type="text"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
      )}

      <div className="rounded-xl bg-slate-50 p-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Before</p>
          <p className="text-2xl font-bold text-slate-900">{input.length}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">After</p>
          <p className="text-2xl font-bold text-slate-900">{output.length}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Diff</p>
          <p className="text-2xl font-bold text-slate-900">{input.length - output.length}</p>
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
