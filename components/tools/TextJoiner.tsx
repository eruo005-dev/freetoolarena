"use client";

import { useMemo, useState } from "react";

const SAMPLE = `apple
banana
cherry
date
elderberry`;

type Wrap = "none" | "quotes" | "single" | "brackets" | "parens" | "curly";

export function TextJoiner({ initial = SAMPLE }: { initial?: string } = {}) {
  const [input, setInput] = useState(initial);
  const [separator, setSeparator] = useState(", ");
  const [trim, setTrim] = useState(true);
  const [skipEmpty, setSkipEmpty] = useState(true);
  const [wrap, setWrap] = useState<Wrap>("none");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    let lines = input.split(/\r?\n/);
    if (trim) lines = lines.map((l) => l.trim());
    if (skipEmpty) lines = lines.filter((l) => l !== "");
    const wrapped = lines.map((l) => {
      let v = l;
      if (wrap === "quotes") v = `"${v}"`;
      else if (wrap === "single") v = `'${v}'`;
      else if (wrap === "brackets") v = `[${v}]`;
      else if (wrap === "parens") v = `(${v})`;
      else if (wrap === "curly") v = `{${v}}`;
      return v;
    });
    return prefix + wrapped.join(separator) + suffix;
  }, [input, separator, trim, skipEmpty, wrap, prefix, suffix]);

  function copy() {
    if (!output) return;
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const wrapBtn = (w: Wrap, label: string) => (
    <button
      type="button"
      onClick={() => setWrap(w)}
      className={`rounded-md border px-3 py-2 text-sm font-semibold ${
        wrap === w
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Separator
          </span>
          <input
            type="text"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Prefix
          </span>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Suffix
          </span>
          <input
            type="text"
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
      </div>

      <div>
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Wrap each line
        </span>
        <div className="flex flex-wrap gap-2">
          {wrapBtn("none", "None")}
          {wrapBtn("quotes", `"..."`)}
          {wrapBtn("single", `'...'`)}
          {wrapBtn("brackets", "[...]")}
          {wrapBtn("parens", "(...)")}
          {wrapBtn("curly", "{...}")}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={trim}
            onChange={(e) => setTrim(e.target.checked)}
            className="h-4 w-4 accent-brand"
          />
          <span className="text-sm text-slate-700">Trim each line</span>
        </label>
        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={skipEmpty}
            onChange={(e) => setSkipEmpty(e.target.checked)}
            className="h-4 w-4 accent-brand"
          />
          <span className="text-sm text-slate-700">Skip empty lines</span>
        </label>
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
