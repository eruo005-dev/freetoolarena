"use client";

import { useMemo, useState } from "react";

function toSnake(input: string): string {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "")
    .toLowerCase()
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function fromSnake(input: string): string {
  return input
    .split(/_+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function SnakeCaseConverter() {
  const [input, setInput] = useState("Hello World Example");

  const snake = useMemo(() => toSnake(input), [input]);
  const fromS = useMemo(() => fromSnake(input), [input]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-sm font-semibold text-slate-700 mb-1 block">Input</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          placeholder="Enter text…"
          className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </label>

      <OutputBox label="To snake_case" value={snake} />
      <OutputBox label="From snake_case" value={fromS} />
    </div>
  );
}

function OutputBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(value)}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark text-sm"
        >
          Copy
        </button>
      </div>
      <textarea
        readOnly
        value={value}
        rows={3}
        className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm bg-white"
      />
    </div>
  );
}
