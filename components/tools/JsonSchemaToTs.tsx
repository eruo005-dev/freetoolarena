"use client";
import { useMemo, useState } from "react";

const SAMPLE = `{
  "id": 42,
  "name": "Ada",
  "active": true,
  "tags": ["dev", "founder"],
  "profile": {
    "url": "https://ex.com",
    "followers": 120
  }
}`;

export function JsonSchemaToTs() {
  const [input, setInput] = useState(SAMPLE);
  const out = useMemo(() => convert(input), [input]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">JSON sample</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
        />
      </label>
      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold mb-1">TypeScript</div>
        <pre className="text-sm font-mono whitespace-pre-wrap text-slate-800">{out}</pre>
      </div>
    </div>
  );
}

function convert(src: string): string {
  let data: unknown;
  try {
    data = JSON.parse(src);
  } catch (e) {
    return "// Invalid JSON: " + (e as Error).message;
  }
  const lines: string[] = [];
  const emitted = new Set<string>();
  const rootName = "Root";
  build(rootName, data, lines, emitted);
  return lines.join("\n\n");
}

function pascal(s: string): string {
  return s.replace(/(^|[_\-\s])([a-z])/g, (_m, _p, c) => c.toUpperCase()).replace(/[^A-Za-z0-9]/g, "");
}

function tsType(v: unknown, parentName: string, key: string, lines: string[], emitted: Set<string>): string {
  if (v === null) return "null";
  if (Array.isArray(v)) {
    if (v.length === 0) return "unknown[]";
    const inner = tsType(v[0], parentName, singular(key), lines, emitted);
    return inner.includes(" ") ? `(${inner})[]` : `${inner}[]`;
  }
  const t = typeof v;
  if (t === "string") return "string";
  if (t === "number") return "number";
  if (t === "boolean") return "boolean";
  if (t === "object") {
    const name = uniqueName(parentName + pascal(key || "Item"), emitted);
    build(name, v, lines, emitted);
    return name;
  }
  return "unknown";
}

function singular(s: string): string {
  if (s.endsWith("ies")) return s.slice(0, -3) + "y";
  if (s.endsWith("s") && !s.endsWith("ss")) return s.slice(0, -1);
  return s;
}

function uniqueName(base: string, emitted: Set<string>): string {
  let n = base;
  let i = 2;
  while (emitted.has(n)) n = base + i++;
  return n;
}

function build(name: string, v: unknown, lines: string[], emitted: Set<string>) {
  if (typeof v !== "object" || v === null || Array.isArray(v)) {
    lines.push(`export type ${name} = ${tsType(v, name, "", lines, emitted)};`);
    emitted.add(name);
    return;
  }
  emitted.add(name);
  const body: string[] = [];
  for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
    const safe = /^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k);
    body.push(`  ${safe}: ${tsType(val, name, k, lines, emitted)};`);
  }
  lines.push(`export interface ${name} {\n${body.join("\n")}\n}`);
}
