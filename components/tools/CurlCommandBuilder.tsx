"use client";

import { useState } from "react";

type KV = { key: string; value: string };
const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
type Method = (typeof METHODS)[number];

function esc(s: string): string {
  return s.replace(/'/g, "'\\''");
}

export function CurlCommandBuilder() {
  const [url, setUrl] = useState("https://api.example.com/users");
  const [method, setMethod] = useState<Method>("GET");
  const [headers, setHeaders] = useState<KV[]>([
    { key: "Content-Type", value: "application/json" },
  ]);
  const [queries, setQueries] = useState<KV[]>([]);
  const [body, setBody] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  function updateRow(
    rows: KV[],
    setRows: (x: KV[]) => void,
    i: number,
    field: "key" | "value",
    value: string
  ) {
    const next = rows.slice();
    next[i] = { ...next[i], [field]: value };
    setRows(next);
  }

  function addRow(rows: KV[], setRows: (x: KV[]) => void) {
    setRows([...rows, { key: "", value: "" }]);
  }

  function removeRow(rows: KV[], setRows: (x: KV[]) => void, i: number) {
    setRows(rows.filter((_, idx) => idx !== i));
  }

  function buildCurl(): string {
    let finalUrl = url;
    const qs = queries
      .filter((q) => q.key)
      .map(
        (q) =>
          `${encodeURIComponent(q.key)}=${encodeURIComponent(q.value)}`
      )
      .join("&");
    if (qs) finalUrl += (finalUrl.includes("?") ? "&" : "?") + qs;

    const parts: string[] = [`curl -X ${method}`];
    parts.push(`'${esc(finalUrl)}'`);
    for (const h of headers) {
      if (!h.key) continue;
      parts.push(`-H '${esc(`${h.key}: ${h.value}`)}'`);
    }
    if (user) {
      parts.push(`-u '${esc(`${user}:${pass}`)}'`);
    }
    if (method !== "GET" && body) {
      parts.push(`--data '${esc(body)}'`);
    }
    return parts.join(" \\\n  ");
  }

  const cmd = buildCurl();

  function copy() {
    navigator.clipboard?.writeText(cmd);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1 block">
            Method
          </span>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as Method)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1 block">URL</span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
          />
        </label>
      </div>

      <KVList
        label="Query params"
        rows={queries}
        onChange={(i, f, v) => updateRow(queries, setQueries, i, f, v)}
        onAdd={() => addRow(queries, setQueries)}
        onRemove={(i) => removeRow(queries, setQueries, i)}
      />

      <KVList
        label="Headers"
        rows={headers}
        onChange={(i, f, v) => updateRow(headers, setHeaders, i, f, v)}
        onAdd={() => addRow(headers, setHeaders)}
        onRemove={(i) => removeRow(headers, setHeaders, i)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1 block">
            Basic auth user
          </span>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1 block">
            Basic auth password
          </span>
          <input
            type="text"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
          />
        </label>
      </div>

      {method !== "GET" && (
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1 block">
            Body
          </span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            spellCheck={false}
            className="w-full rounded-lg border border-slate-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      )}

      <div>
        <div className="flex items-baseline justify-between mb-1">
          <p className="text-sm font-medium text-slate-700">curl command</p>
          <button
            type="button"
            onClick={copy}
            className="text-xs font-semibold text-brand hover:text-brand-dark"
          >
            Copy
          </button>
        </div>
        <textarea
          value={cmd}
          readOnly
          rows={8}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-sm"
        />
      </div>
    </div>
  );
}

function KVList({
  label,
  rows,
  onChange,
  onAdd,
  onRemove,
}: {
  label: string;
  rows: KV[];
  onChange: (i: number, field: "key" | "value", value: string) => void;
  onAdd: () => void;
  onRemove: (i: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <button
          type="button"
          onClick={onAdd}
          className="text-xs font-semibold text-brand hover:text-brand-dark"
        >
          + Add
        </button>
      </div>
      <div className="space-y-2">
        {rows.length === 0 && (
          <p className="text-xs text-slate-400 italic">None.</p>
        )}
        {rows.map((r, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              placeholder="key"
              value={r.key}
              onChange={(e) => onChange(i, "key", e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
            />
            <input
              type="text"
              placeholder="value"
              value={r.value}
              onChange={(e) => onChange(i, "value", e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
            />
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
