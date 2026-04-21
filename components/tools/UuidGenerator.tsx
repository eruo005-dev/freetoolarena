"use client";

import { useState } from "react";

function randomUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>(() => Array.from({ length: 5 }, randomUuid));

  const gen = () => setUuids(Array.from({ length: count }, randomUuid));

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Count</span>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
            className="w-24 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <button
          type="button"
          onClick={gen}
          className="rounded-lg bg-brand-dark text-white px-4 py-2 text-sm font-semibold hover:bg-brand"
        >
          Generate
        </button>
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(uuids.join("\n"))}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Copy all
        </button>
      </div>
      <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-slate-50 font-mono text-sm">
        {uuids.map((u, i) => (
          <li key={i} className="px-3 py-2 flex items-center justify-between">
            <span>{u}</span>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(u)}
              className="text-xs text-brand hover:text-brand-dark font-semibold"
            >
              copy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
