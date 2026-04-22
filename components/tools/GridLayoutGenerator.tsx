"use client";

import { useMemo, useState } from "react";

export function GridLayoutGenerator() {
  const [columns, setColumns] = useState("1fr 1fr 1fr");
  const [rows, setRows] = useState("auto auto");
  const [gap, setGap] = useState(12);
  const [itemCount, setItemCount] = useState(6);
  const [copied, setCopied] = useState(false);

  const css = useMemo(
    () => `.container {
  display: grid;
  grid-template-columns: ${columns};
  grid-template-rows: ${rows};
  gap: ${gap}px;
}`,
    [columns, rows, gap],
  );

  function addItem() {
    if (itemCount >= 12) return;
    setItemCount(itemCount + 1);
  }

  function removeItem() {
    if (itemCount <= 1) return;
    setItemCount(itemCount - 1);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  const presets = [
    { label: "3 equal", cols: "1fr 1fr 1fr" },
    { label: "Sidebar", cols: "240px 1fr" },
    { label: "Holy grail", cols: "200px 1fr 200px" },
    { label: "Auto-fit", cols: "repeat(auto-fit, minmax(200px, 1fr))" },
    { label: "12 cols", cols: "repeat(12, 1fr)" },
    { label: "2:1:1", cols: "2fr 1fr 1fr" },
  ];

  return (
    <div className="space-y-5">
      <div
        className="rounded-xl border border-slate-200 bg-slate-50 p-8 min-h-[200px]"
        style={{
          display: "grid",
          gridTemplateColumns: columns,
          gridTemplateRows: rows,
          gap: `${gap}px`,
        }}
      >
        {Array.from({ length: itemCount }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg bg-brand/10 border border-brand text-brand-dark text-sm font-semibold flex items-center justify-center h-16"
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Presets</p>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setColumns(p.cols)}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            grid-template-columns
          </span>
          <input
            type="text"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            grid-template-rows
          </span>
          <input
            type="text"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          gap · {gap}px
        </span>
        <input
          type="range"
          min={0}
          max={64}
          value={gap}
          onChange={(e) => setGap(Number(e.target.value))}
          className="w-full accent-brand"
        />
      </label>

      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          Items ({itemCount}/12)
        </span>
        <button
          type="button"
          onClick={addItem}
          disabled={itemCount >= 12}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          + Add
        </button>
        <button
          type="button"
          onClick={removeItem}
          disabled={itemCount <= 1}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          − Remove
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">CSS</p>
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono">{css}</pre>
      </div>
    </div>
  );
}
