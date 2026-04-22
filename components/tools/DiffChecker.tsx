"use client";

import { useState } from "react";

type DiffOp =
  | { type: "equal"; left: string; right: string }
  | { type: "del"; left: string }
  | { type: "add"; right: string };

function lcsDiff(a: string[], b: string[]): DiffOp[] {
  const n = a.length;
  const m = b.length;
  // Build LCS length table
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (a[i] === b[j]) dp[i][j] = dp[i + 1][j + 1] + 1;
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  // Walk back
  const ops: DiffOp[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      ops.push({ type: "equal", left: a[i], right: b[j] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ type: "del", left: a[i] });
      i++;
    } else {
      ops.push({ type: "add", right: b[j] });
      j++;
    }
  }
  while (i < n) {
    ops.push({ type: "del", left: a[i++] });
  }
  while (j < m) {
    ops.push({ type: "add", right: b[j++] });
  }
  return ops;
}

interface Row {
  left: { text: string; kind: "equal" | "del" | "blank" };
  right: { text: string; kind: "equal" | "add" | "blank" };
}

function opsToRows(ops: DiffOp[]): Row[] {
  const rows: Row[] = [];
  // Group adjacent del/add pairs onto same row for side-by-side alignment
  let i = 0;
  while (i < ops.length) {
    const op = ops[i];
    if (op.type === "equal") {
      rows.push({
        left: { text: op.left, kind: "equal" },
        right: { text: op.right, kind: "equal" },
      });
      i++;
    } else {
      // collect run of dels and adds
      const dels: string[] = [];
      const adds: string[] = [];
      while (i < ops.length && ops[i].type !== "equal") {
        const o = ops[i];
        if (o.type === "del") dels.push(o.left);
        else if (o.type === "add") adds.push(o.right);
        i++;
      }
      const pairs = Math.max(dels.length, adds.length);
      for (let k = 0; k < pairs; k++) {
        rows.push({
          left:
            k < dels.length
              ? { text: dels[k], kind: "del" }
              : { text: "", kind: "blank" },
          right:
            k < adds.length
              ? { text: adds[k], kind: "add" }
              : { text: "", kind: "blank" },
        });
      }
    }
  }
  return rows;
}

export function DiffChecker() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);

  function compare() {
    const a = left.split("\n");
    const b = right.split("\n");
    setRows(opsToRows(lcsDiff(a, b)));
  }

  function clear() {
    setLeft("");
    setRight("");
    setRows(null);
  }

  const sideClass = (kind: "equal" | "del" | "add" | "blank") => {
    if (kind === "del") return "bg-rose-50 text-rose-800";
    if (kind === "add") return "bg-emerald-50 text-emerald-800";
    if (kind === "blank") return "bg-slate-100/60 text-slate-400";
    return "text-slate-600";
  };

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Original</span>
          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            rows={10}
            spellCheck={false}
            placeholder="Paste original text…"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 font-mono text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 resize-y"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Changed</span>
          <textarea
            value={right}
            onChange={(e) => setRight(e.target.value)}
            rows={10}
            spellCheck={false}
            placeholder="Paste changed text…"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 font-mono text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 resize-y"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={compare}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          Compare
        </button>
        <button
          type="button"
          onClick={clear}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Clear
        </button>
      </div>

      {rows && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 overflow-x-auto">
          {rows.length === 0 ? (
            <p className="text-sm text-slate-500">No differences found — inputs match.</p>
          ) : (
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Original</p>
                {rows.map((r, idx) => (
                  <div
                    key={`l-${idx}`}
                    className={`px-2 py-0.5 rounded whitespace-pre-wrap break-all ${sideClass(r.left.kind)}`}
                  >
                    <span className="inline-block w-4 text-slate-400">
                      {r.left.kind === "del" ? "-" : r.left.kind === "blank" ? "" : " "}
                    </span>
                    {r.left.text || "\u00A0"}
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Changed</p>
                {rows.map((r, idx) => (
                  <div
                    key={`r-${idx}`}
                    className={`px-2 py-0.5 rounded whitespace-pre-wrap break-all ${sideClass(r.right.kind)}`}
                  >
                    <span className="inline-block w-4 text-slate-400">
                      {r.right.kind === "add" ? "+" : r.right.kind === "blank" ? "" : " "}
                    </span>
                    {r.right.text || "\u00A0"}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
