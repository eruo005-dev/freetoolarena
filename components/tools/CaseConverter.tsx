"use client";

import { useState } from "react";

const SAMPLE = "The quick brown fox jumps over the lazy dog.";

type Case = {
  label: string;
  fn: (s: string) => string;
};

const CASES: Case[] = [
  { label: "UPPERCASE", fn: (s) => s.toUpperCase() },
  { label: "lowercase", fn: (s) => s.toLowerCase() },
  { label: "Title Case", fn: (s) => s.replace(/\w\S*/g, (t) => t[0].toUpperCase() + t.slice(1).toLowerCase()) },
  { label: "Sentence case", fn: (s) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (m) => m.toUpperCase()) },
  { label: "camelCase", fn: (s) => toCamel(s) },
  { label: "PascalCase", fn: (s) => toPascal(s) },
  { label: "snake_case", fn: (s) => toSnake(s) },
  { label: "kebab-case", fn: (s) => toKebab(s) },
  { label: "CONSTANT_CASE", fn: (s) => toSnake(s).toUpperCase() },
  { label: "iNVERT cASE", fn: (s) => s.split("").map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join("") },
];

export function CaseConverter() {
  const [text, setText] = useState(SAMPLE);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="sr-only">Text to convert</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand resize-y"
        />
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CASES.map((c) => (
          <Row key={c.label} label={c.label} value={c.fn(text)} />
        ))}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-slate-200 rounded-lg p-3 bg-white">
      <div className="flex items-baseline justify-between mb-1">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">{label}</p>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(value)}
          className="text-xs font-semibold text-brand hover:text-brand-dark"
        >
          Copy
        </button>
      </div>
      <p className="font-mono text-sm text-slate-900 break-words">{value || " "}</p>
    </div>
  );
}

function toWords(s: string): string[] {
  return s
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_\-]+/g, " ")
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}
function toCamel(s: string) {
  const w = toWords(s).map((x) => x.toLowerCase());
  return w.map((x, i) => (i === 0 ? x : x[0].toUpperCase() + x.slice(1))).join("");
}
function toPascal(s: string) {
  return toWords(s)
    .map((x) => x[0].toUpperCase() + x.slice(1).toLowerCase())
    .join("");
}
function toSnake(s: string) {
  return toWords(s).map((x) => x.toLowerCase()).join("_");
}
function toKebab(s: string) {
  return toWords(s).map((x) => x.toLowerCase()).join("-");
}
