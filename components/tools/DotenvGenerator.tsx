"use client";
import { useMemo, useState } from "react";

const SAMPLE = `NODE_ENV=production
PORT=3000
DATABASE_URL=postgres://user:pass@localhost:5432/db
JWT_SECRET=
APP_NAME=My Awesome App
FEATURE_FLAG=true`;

type Issue = { line: number; level: "warn" | "error" | "info"; message: string };
type Row = { raw: string; key: string; value: string; needsQuote: boolean };

export function DotenvGenerator() {
  const [input, setInput] = useState(SAMPLE);
  const [nonce, setNonce] = useState(0);

  const { rows, issues, output } = useMemo(() => build(input, nonce), [input, nonce]);

  const regenerate = () => setNonce((n) => n + 1);

  const fillEmpty = () => {
    const lines = input.split(/\r?\n/);
    const next = lines
      .map((l) => {
        const m = /^\s*([A-Z0-9_]+)\s*=\s*$/.exec(l);
        if (m) return `${m[1]}=${randomHex(32)}`;
        return l;
      })
      .join("\n");
    setInput(next);
  };

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          VAR=value (one per line)
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          spellCheck={false}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={fillEmpty}
          className="rounded-lg bg-brand text-white text-sm font-semibold px-3 py-1.5 hover:opacity-90"
        >
          Fill empty values with 32-hex secrets
        </button>
        <button
          type="button"
          onClick={regenerate}
          className="rounded-lg bg-slate-200 text-slate-700 text-sm font-semibold px-3 py-1.5 hover:bg-slate-300"
        >
          Re-check
        </button>
      </div>

      {issues.length > 0 && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 space-y-1 text-sm">
          <div className="text-[10px] uppercase tracking-wide text-amber-700 font-semibold">Warnings</div>
          <ul className="space-y-0.5 font-mono">
            {issues.map((i, k) => (
              <li key={k} className="flex gap-2">
                <span className="tabular-nums text-slate-500 w-10">L{i.line}</span>
                <span
                  className={
                    i.level === "error"
                      ? "text-rose-600 w-14 font-semibold"
                      : i.level === "warn"
                        ? "text-amber-700 w-14 font-semibold"
                        : "text-sky-600 w-14 font-semibold"
                  }
                >
                  {i.level}
                </span>
                <span className="text-slate-700">{i.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold mb-1">
          Validated .env &mdash; <span className="tabular-nums">{rows.length}</span> entries
        </div>
        <pre className="text-sm font-mono whitespace-pre-wrap text-slate-800">{output}</pre>
      </div>
    </div>
  );
}

function build(src: string, _nonce: number): { rows: Row[]; issues: Issue[]; output: string } {
  const rows: Row[] = [];
  const issues: Issue[] = [];
  const seen = new Map<string, number>();
  const lines = src.split(/\r?\n/);

  lines.forEach((raw, idx) => {
    const line = idx + 1;
    const trimmed = raw.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const eq = trimmed.indexOf("=");
    if (eq < 0) {
      issues.push({ line, level: "error", message: "Missing `=` &mdash; not a valid KEY=value." });
      return;
    }
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();

    if (!/^[A-Z_][A-Z0-9_]*$/.test(key)) {
      issues.push({ line, level: "warn", message: `Key "${key}" is not UPPER_SNAKE_CASE.` });
    }
    if (seen.has(key)) {
      issues.push({ line, level: "warn", message: `Duplicate key "${key}" (first seen L${seen.get(key)}).` });
    } else {
      seen.set(key, line);
    }
    if (!val) {
      issues.push({ line, level: "info", message: `Empty value for "${key}" &mdash; consider generating a secret.` });
    }

    const needsQuote = /\s|#|"|'/.test(val);
    rows.push({ raw, key, value: val, needsQuote });
  });

  const output = rows
    .map((r) => {
      const v = r.needsQuote ? `"${r.value.replace(/"/g, '\\"')}"` : r.value;
      return `${r.key}=${v}`;
    })
    .join("\n");

  return { rows, issues, output };
}

function randomHex(bytes: number): string {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const arr = new Uint8Array(bytes);
    crypto.getRandomValues(arr);
    return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
  }
  let s = "";
  for (let i = 0; i < bytes * 2; i++) s += Math.floor(Math.random() * 16).toString(16);
  return s;
}
