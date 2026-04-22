"use client";

import { useMemo, useState } from "react";

function shift(text: string, n: number): string {
  const k = ((n % 26) + 26) % 26;
  return text.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + k) % 26) + base);
  });
}

export function CaesarCipher() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog");
  const [k, setK] = useState(13);
  const [copied, setCopied] = useState(false);

  const encoded = useMemo(() => shift(text, k), [text, k]);
  const decoded = useMemo(() => shift(text, -k), [text, k]);

  function copy(v: string) {
    navigator.clipboard?.writeText(v);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Input text
        </span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <label className="block">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-sm font-medium text-slate-700">Shift (0 = none, 13 = ROT13)</span>
          <span className="text-sm font-semibold text-slate-900 tabular-nums">{k}</span>
        </div>
        <input
          type="range"
          min={0}
          max={25}
          value={k}
          onChange={(e) => setK(parseInt(e.target.value, 10))}
          className="w-full accent-brand"
        />
      </label>

      <div className="rounded-xl bg-slate-50 p-4 space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Encoded (shift +{k})</span>
            <button onClick={() => copy(encoded)} className="text-xs bg-slate-900 text-white rounded px-2 py-1 hover:bg-slate-800">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="font-mono text-sm break-all">{encoded}</p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Decoded (shift −{k})</span>
            <button onClick={() => copy(decoded)} className="text-xs bg-slate-900 text-white rounded px-2 py-1 hover:bg-slate-800">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="font-mono text-sm break-all">{decoded}</p>
        </div>
      </div>
    </div>
  );
}
