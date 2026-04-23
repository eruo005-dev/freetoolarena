"use client";
import { useMemo, useState } from "react";

const SAMPLE = `{
  "openapi": "3.0.0",
  "info": { "title": "Demo", "version": "1.0.0" },
  "paths": {
    "/users": {
      "get": { "operationId": "listUsers" },
      "post": { "operationId": "createUser" }
    },
    "/users/{id}": {
      "get": { "operationId": "getUser" },
      "patch": { "operationId": "updateUser" },
      "delete": { "operationId": "deleteUser" }
    },
    "/orders": {
      "get": { "operationId": "listOrders" }
    }
  }
}`;

const METHODS = ["get", "post", "put", "patch", "delete"] as const;
type Method = (typeof METHODS)[number];

type Row = { path: string; method: Method; opId: string };

export function OpenapiEndpointCounter() {
  const [input, setInput] = useState(SAMPLE);
  const parsed = useMemo(() => parse(input), [input]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">OpenAPI 3 JSON</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
        />
      </label>

      {parsed.error ? (
        <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700 font-mono">{parsed.error}</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {METHODS.map((m) => (
              <div key={m} className="rounded-lg bg-slate-50 p-3 text-center">
                <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">{m}</div>
                <div className="text-xl font-mono tabular-nums text-slate-800">{parsed.counts[m]}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold mb-2">
              Endpoints &mdash; <span className="tabular-nums">{parsed.rows.length}</span>
            </div>
            <ul className="space-y-1 text-sm font-mono">
              {parsed.rows.map((r, i) => (
                <li key={i} className="flex gap-3">
                  <span className={badge(r.method)}>{r.method.toUpperCase()}</span>
                  <span className="text-slate-800 flex-1">{r.path}</span>
                  <span className="text-slate-500">{r.opId}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

function badge(m: Method): string {
  const base = "w-16 text-xs font-semibold px-2 py-0.5 rounded text-center ";
  const map: Record<Method, string> = {
    get: "bg-sky-100 text-sky-700",
    post: "bg-emerald-100 text-emerald-700",
    put: "bg-amber-100 text-amber-700",
    patch: "bg-violet-100 text-violet-700",
    delete: "bg-rose-100 text-rose-700",
  };
  return base + map[m];
}

function parse(src: string): { error?: string; counts: Record<Method, number>; rows: Row[] } {
  const counts: Record<Method, number> = { get: 0, post: 0, put: 0, patch: 0, delete: 0 };
  const rows: Row[] = [];
  let doc: { paths?: Record<string, Record<string, { operationId?: string }>> };
  try {
    doc = JSON.parse(src);
  } catch (e) {
    return { error: "Invalid JSON: " + (e as Error).message, counts, rows };
  }
  const paths = doc.paths || {};
  for (const [p, def] of Object.entries(paths)) {
    if (!def || typeof def !== "object") continue;
    for (const m of METHODS) {
      if (def[m]) {
        counts[m]++;
        rows.push({ path: p, method: m, opId: def[m].operationId || "\u2014" });
      }
    }
  }
  rows.sort((a, b) => a.path.localeCompare(b.path));
  return { counts, rows };
}
