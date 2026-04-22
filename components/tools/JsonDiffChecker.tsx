"use client";

import { useState, useMemo } from "react";

type Props = {
  initialOld?: string;
  initialNew?: string;
};

const SAMPLE_OLD = `{
  "name": "freetoolarea",
  "version": "1.0.0",
  "tools": ["json", "xml", "yaml"],
  "author": { "name": "Jay", "role": "founder" }
}`;

const SAMPLE_NEW = `{
  "name": "freetoolarea",
  "version": "1.1.0",
  "tools": ["json", "xml", "yaml", "csv"],
  "author": { "name": "Jay", "role": "founder+engineer" },
  "published": true
}`;

type DiffEntry =
  | { kind: "added"; path: string; value: any }
  | { kind: "removed"; path: string; value: any }
  | { kind: "changed"; path: string; before: any; after: any }
  | { kind: "same"; path: string; value: any };

function isObject(v: any): v is Record<string, any> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function diff(a: any, b: any, path = ""): DiffEntry[] {
  const entries: DiffEntry[] = [];

  if (isObject(a) && isObject(b)) {
    const keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]));
    for (const k of keys) {
      const p = path ? `${path}.${k}` : k;
      if (!(k in a)) {
        entries.push({ kind: "added", path: p, value: b[k] });
      } else if (!(k in b)) {
        entries.push({ kind: "removed", path: p, value: a[k] });
      } else {
        entries.push(...diff(a[k], b[k], p));
      }
    }
    return entries;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    const max = Math.max(a.length, b.length);
    for (let i = 0; i < max; i++) {
      const p = `${path}[${i}]`;
      if (i >= a.length) entries.push({ kind: "added", path: p, value: b[i] });
      else if (i >= b.length) entries.push({ kind: "removed", path: p, value: a[i] });
      else entries.push(...diff(a[i], b[i], p));
    }
    return entries;
  }

  if (JSON.stringify(a) !== JSON.stringify(b)) {
    entries.push({ kind: "changed", path, before: a, after: b });
  } else {
    entries.push({ kind: "same", path, value: a });
  }
  return entries;
}

function fmt(v: any): string {
  if (v === undefined) return "undefined";
  return JSON.stringify(v);
}

export function JsonDiffChecker({
  initialOld = SAMPLE_OLD,
  initialNew = SAMPLE_NEW,
}: Props = {}) {
  const [leftInput, setLeftInput] = useState(initialOld);
  const [rightInput, setRightInput] = useState(initialNew);

  const result = useMemo(() => {
    try {
      const left = JSON.parse(leftInput);
      const right = JSON.parse(rightInput);
      const entries = diff(left, right).filter((e) => e.kind !== "same");
      return { entries, error: null as string | null };
    } catch (e: any) {
      return { entries: [], error: e.message || "Invalid JSON" };
    }
  }, [leftInput, rightInput]);

  const counts = useMemo(() => {
    const c = { added: 0, removed: 0, changed: 0 };
    for (const e of result.entries) {
      if (e.kind === "added") c.added++;
      else if (e.kind === "removed") c.removed++;
      else if (e.kind === "changed") c.changed++;
    }
    return c;
  }, [result.entries]);

  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Old JSON (left)
          </span>
          <textarea
            value={leftInput}
            onChange={(e) => setLeftInput(e.target.value)}
            rows={8}
            spellCheck={false}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            New JSON (right)
          </span>
          <textarea
            value={rightInput}
            onChange={(e) => setRightInput(e.target.value)}
            rows={8}
            spellCheck={false}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      {result.error && <p className="text-sm text-rose-600">{result.error}</p>}

      {!result.error && (
        <>
          <div className="rounded-xl bg-slate-50 p-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                Added
              </div>
              <div className="text-2xl font-bold text-emerald-700">{counts.added}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                Removed
              </div>
              <div className="text-2xl font-bold text-rose-700">{counts.removed}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                Changed
              </div>
              <div className="text-2xl font-bold text-amber-700">{counts.changed}</div>
            </div>
          </div>

          {result.entries.length === 0 ? (
            <p className="text-sm text-slate-600">The two JSON documents are identical.</p>
          ) : (
            <div className="space-y-1">
              {result.entries.map((e, i) => {
                if (e.kind === "added") {
                  return (
                    <div
                      key={i}
                      className="rounded-md bg-emerald-50 text-emerald-800 px-3 py-2 font-mono text-sm"
                    >
                      <span className="font-semibold">+ {e.path}</span>: {fmt(e.value)}
                    </div>
                  );
                }
                if (e.kind === "removed") {
                  return (
                    <div
                      key={i}
                      className="rounded-md bg-rose-50 text-rose-800 px-3 py-2 font-mono text-sm"
                    >
                      <span className="font-semibold">- {e.path}</span>: {fmt(e.value)}
                    </div>
                  );
                }
                if (e.kind === "changed") {
                  return (
                    <div
                      key={i}
                      className="rounded-md bg-amber-50 text-amber-800 px-3 py-2 font-mono text-sm"
                    >
                      <span className="font-semibold">~ {e.path}</span>: {fmt(e.before)}{" "}
                      <span className="mx-1">→</span> {fmt(e.after)}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
