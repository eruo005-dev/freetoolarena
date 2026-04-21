"use client";

import { useMemo, useState } from "react";

const WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(
    " ",
  );

type Unit = "paragraphs" | "sentences" | "words";

export function LoremIpsumGenerator() {
  const [unit, setUnit] = useState<Unit>("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);

  const output = useMemo(() => {
    if (unit === "words") return words(count, startWithLorem);
    if (unit === "sentences") return Array.from({ length: count }, (_, i) => sentence(i === 0 && startWithLorem)).join(" ");
    return Array.from({ length: count }, (_, i) => paragraph(i === 0 && startWithLorem)).join("\n\n");
  }, [unit, count, startWithLorem]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3 items-end">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Generate</span>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as Unit)}
            className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Count</span>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(50, parseInt(e.target.value, 10) || 1)))}
            className="w-24 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        <label className="flex items-center gap-2 text-sm pb-2">
          <input type="checkbox" checked={startWithLorem} onChange={(e) => setStartWithLorem(e.target.checked)} className="accent-brand" />
          Start with &ldquo;Lorem ipsum&rdquo;
        </label>
      </div>
      <div>
        <div className="flex items-baseline justify-between mb-1">
          <p className="text-sm font-medium text-slate-700">Output</p>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(output)}
            className="text-xs font-semibold text-brand hover:text-brand-dark"
          >
            Copy
          </button>
        </div>
        <textarea
          value={output}
          readOnly
          rows={12}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm resize-y"
        />
      </div>
    </div>
  );
}

function pick() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function words(n: number, lead: boolean) {
  const out: string[] = [];
  if (lead) out.push("Lorem", "ipsum");
  while (out.length < n) out.push(pick());
  return out.slice(0, n).join(" ");
}

function sentence(lead: boolean) {
  const len = 8 + Math.floor(Math.random() * 10);
  const parts: string[] = [];
  if (lead) parts.push("Lorem", "ipsum");
  while (parts.length < len) parts.push(pick());
  parts[0] = parts[0][0].toUpperCase() + parts[0].slice(1);
  return parts.slice(0, len).join(" ") + ".";
}

function paragraph(lead: boolean) {
  const n = 3 + Math.floor(Math.random() * 4);
  return Array.from({ length: n }, (_, i) => sentence(i === 0 && lead)).join(" ");
}
