"use client";

import { useMemo, useState } from "react";

const SAMPLE = `   Hello    world
	This line has	tabs	and spaces.

    Extra   spaces      everywhere.

Last    line.   `;

export function WhitespaceRemover({ initial = SAMPLE }: { initial?: string } = {}) {
  const [input, setInput] = useState(initial);
  const [trimLines, setTrimLines] = useState(true);
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [removeTabs, setRemoveTabs] = useState(false);
  const [removeAll, setRemoveAll] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (removeAll) return input.replace(/\s+/g, "");
    let lines = input.split(/\r?\n/);
    if (removeTabs) lines = lines.map((l) => l.replace(/\t/g, " "));
    if (collapseSpaces) lines = lines.map((l) => l.replace(/[^\S\n]+/g, " "));
    if (trimLines) lines = lines.map((l) => l.trim());
    if (removeEmpty) lines = lines.filter((l) => l.trim() !== "");
    return lines.join("\n");
  }, [input, trimLines, collapseSpaces, removeTabs, removeAll, removeEmpty]);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          { v: trimLines, s: setTrimLines, l: "Trim leading/trailing whitespace" },
          { v: collapseSpaces, s: setCollapseSpaces, l: "Collapse multiple spaces to one" },
          { v: removeTabs, s: setRemoveTabs, l: "Convert tabs to spaces" },
          { v: removeEmpty, s: setRemoveEmpty, l: "Remove empty lines" },
          { v: removeAll, s: setRemoveAll, l: "Remove ALL whitespace (overrides)" },
        ].map((opt, i) => (
          <label
            key={i}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={opt.v}
              onChange={(e) => opt.s(e.target.checked)}
              className="h-4 w-4 accent-brand"
            />
            <span className="text-sm text-slate-700">{opt.l}</span>
          </label>
        ))}
      </div>

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
          <p className="text-xs uppercase tracking-wide text-slate-500">Removed</p>
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
