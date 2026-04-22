"use client";

import { useMemo, useState } from "react";

function bionic(text: string, ratio: number): { html: string; plain: string } {
  const html: string[] = [];
  const plain: string[] = [];
  const parts = text.split(/(\s+)/);
  for (const p of parts) {
    if (/^\s+$/.test(p) || p.length === 0) {
      html.push(p); plain.push(p);
      continue;
    }
    const n = Math.max(1, Math.round(p.length * ratio));
    html.push(`<b>${escape(p.slice(0, n))}</b>${escape(p.slice(n))}`);
    plain.push(`**${p.slice(0, n)}**${p.slice(n)}`);
  }
  return { html: html.join(""), plain: plain.join("") };
}

function escape(s: string) {
  return s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function BionicReadingFormatter() {
  const [text, setText] = useState(
    "Bionic reading bolds the first half of each word so your brain fills in the rest. It makes skimming long articles faster and less tiring.",
  );
  const [ratio, setRatio] = useState(0.5);
  const [copied, setCopied] = useState(false);

  const out = useMemo(() => bionic(text, ratio), [text, ratio]);

  function copyMd() {
    navigator.clipboard?.writeText(out.plain);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Paste text</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <label className="block">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-sm font-medium text-slate-700">Bold ratio</span>
          <span className="text-sm font-semibold text-slate-900 tabular-nums">{Math.round(ratio * 100)}%</span>
        </div>
        <input type="range" min={20} max={80} value={ratio * 100} onChange={(e) => setRatio(parseInt(e.target.value) / 100)} className="w-full accent-brand" />
      </label>

      <div className="rounded-xl bg-slate-50 p-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: out.html }} />

      <button onClick={copyMd} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">
        {copied ? "Copied Markdown" : "Copy as Markdown"}
      </button>
    </div>
  );
}
