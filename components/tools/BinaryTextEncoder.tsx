"use client";

import { useMemo, useState } from "react";

function textToBinary(t: string): string {
  return Array.from(t)
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

function binaryToText(b: string): string {
  return b
    .split(/\s+/)
    .filter(Boolean)
    .map((bits) => String.fromCharCode(parseInt(bits, 2)))
    .join("");
}

export function BinaryTextEncoder() {
  const [text, setText] = useState("Hello");
  const [bin, setBin] = useState("");
  const encoded = useMemo(() => textToBinary(text), [text]);
  const decoded = useMemo(() => {
    try { return binaryToText(bin); } catch { return ""; }
  }, [bin]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Text → Binary</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <div className="rounded-xl bg-slate-50 p-4">
        <span className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Binary output</span>
        <p className="font-mono text-sm break-all mt-1">{encoded}</p>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Binary → Text</span>
        <textarea
          value={bin}
          onChange={(e) => setBin(e.target.value)}
          placeholder="01001000 01101001"
          rows={2}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <div className="rounded-xl bg-slate-50 p-4">
        <span className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Decoded text</span>
        <p className="font-mono text-sm break-all mt-1">{decoded || <span className="text-slate-400">—</span>}</p>
      </div>
    </div>
  );
}
