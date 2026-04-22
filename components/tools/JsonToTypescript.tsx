"use client";

import { useMemo, useState } from "react";

function cap(s: string) { return s ? s[0].toUpperCase() + s.slice(1) : s; }
function clean(s: string) { return s.replace(/[^A-Za-z0-9_]/g, "_").replace(/^_+|_+$/g, "") || "Field"; }

function infer(value: any, name: string, out: Map<string, string>): string {
  if (value === null) return "null";
  if (Array.isArray(value)) {
    if (value.length === 0) return "any[]";
    const types = Array.from(new Set(value.map((v) => infer(v, name, out))));
    return types.length === 1 ? `${types[0]}[]` : `Array<${types.join(" | ")}>`;
  }
  const t = typeof value;
  if (t === "string") return "string";
  if (t === "number") return "number";
  if (t === "boolean") return "boolean";
  if (t === "object") {
    const typeName = cap(clean(name));
    const lines: string[] = [];
    for (const [k, v] of Object.entries(value)) {
      lines.push(`  ${/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k) ? k : `"${k}"`}: ${infer(v, k, out)};`);
    }
    out.set(typeName, `interface ${typeName} {\n${lines.join("\n")}\n}`);
    return typeName;
  }
  return "any";
}

export function JsonToTypescript() {
  const [input, setInput] = useState(`{\n  "id": 42,\n  "name": "Ada",\n  "active": true,\n  "tags": ["admin", "beta"],\n  "profile": {\n    "age": 30,\n    "city": "Lisbon"\n  }\n}`);
  const [rootName, setRootName] = useState("Root");
  const [copied, setCopied] = useState(false);

  const { ts, err } = useMemo(() => {
    try {
      const parsed = JSON.parse(input);
      const map = new Map<string, string>();
      const root = infer(parsed, rootName, map);
      if (!map.size) return { ts: `type ${rootName} = ${root};`, err: "" };
      return { ts: Array.from(map.values()).reverse().join("\n\n"), err: "" };
    } catch (e: any) {
      return { ts: "", err: e.message };
    }
  }, [input, rootName]);

  function copy() {
    navigator.clipboard?.writeText(ts);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Root type name</span>
        <input value={rootName} onChange={(e) => setRootName(cap(clean(e.target.value)) || "Root")} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Paste JSON</span>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={10} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs" />
      </label>
      {err ? (
        <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm p-3">{err}</div>
      ) : (
        <textarea readOnly value={ts} rows={14} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs bg-slate-50" />
      )}
      <button onClick={copy} disabled={!!err} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark disabled:opacity-50">
        {copied ? "Copied" : "Copy TypeScript"}
      </button>
    </div>
  );
}
