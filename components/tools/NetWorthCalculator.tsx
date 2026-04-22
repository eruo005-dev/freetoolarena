"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

interface Row {
  id: string;
  label: string;
  value: string;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

const DEFAULT_ASSETS: Row[] = [
  { id: uid(), label: "Cash", value: "5000" },
  { id: uid(), label: "Investments", value: "25000" },
  { id: uid(), label: "Home", value: "350000" },
];

const DEFAULT_LIABILITIES: Row[] = [
  { id: uid(), label: "Mortgage", value: "280000" },
  { id: uid(), label: "Credit cards", value: "2500" },
];

export interface NetWorthCalculatorProps {
  initialAssets?: Array<{ label: string; value: number }>;
  initialLiabilities?: Array<{ label: string; value: number }>;
}

export function NetWorthCalculator({
  initialAssets,
  initialLiabilities,
}: NetWorthCalculatorProps = {}) {
  const [assets, setAssets] = useState<Row[]>(
    initialAssets
      ? initialAssets.map((a) => ({ id: uid(), label: a.label, value: String(a.value) }))
      : DEFAULT_ASSETS,
  );
  const [liabilities, setLiabilities] = useState<Row[]>(
    initialLiabilities
      ? initialLiabilities.map((l) => ({ id: uid(), label: l.label, value: String(l.value) }))
      : DEFAULT_LIABILITIES,
  );

  const { totalAssets, totalLiabilities, netWorth } = useMemo(() => {
    const a = assets.reduce((s, r) => s + Math.max(0, parseFloat(r.value) || 0), 0);
    const l = liabilities.reduce((s, r) => s + Math.max(0, parseFloat(r.value) || 0), 0);
    return { totalAssets: a, totalLiabilities: l, netWorth: a - l };
  }, [assets, liabilities]);

  function addAsset() {
    setAssets((rows) => [...rows, { id: uid(), label: "", value: "" }]);
  }
  function addLiability() {
    setLiabilities((rows) => [...rows, { id: uid(), label: "", value: "" }]);
  }
  function updateRow(
    setter: Dispatch<SetStateAction<Row[]>>,
    id: string,
    patch: Partial<Row>,
  ) {
    setter((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }
  function removeRow(
    setter: Dispatch<SetStateAction<Row[]>>,
    id: string,
  ) {
    setter((rows) => rows.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-slate-700">Assets</h3>
          <button
            type="button"
            onClick={addAsset}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            + Add asset
          </button>
        </div>
        <div className="space-y-2">
          {assets.map((row) => (
            <RowInput
              key={row.id}
              row={row}
              onChange={(patch) => updateRow(setAssets, row.id, patch)}
              onRemove={() => removeRow(setAssets, row.id)}
            />
          ))}
          {assets.length === 0 && (
            <p className="text-sm text-slate-500">No assets. Click "Add asset" to start.</p>
          )}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-slate-700">Liabilities</h3>
          <button
            type="button"
            onClick={addLiability}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            + Add liability
          </button>
        </div>
        <div className="space-y-2">
          {liabilities.map((row) => (
            <RowInput
              key={row.id}
              row={row}
              onChange={(patch) => updateRow(setLiabilities, row.id, patch)}
              onRemove={() => removeRow(setLiabilities, row.id)}
            />
          ))}
          {liabilities.length === 0 && (
            <p className="text-sm text-slate-500">No liabilities. Click "Add liability" to start.</p>
          )}
        </div>
      </section>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Total assets</p>
          <p className="text-xl font-bold text-slate-900">{money(totalAssets)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Total liabilities</p>
          <p className="text-xl font-bold text-slate-900">{money(totalLiabilities)}</p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Net worth</p>
          <p className={`text-3xl font-bold ${netWorth >= 0 ? "text-brand" : "text-red-600"}`}>
            {money(netWorth)}
          </p>
        </div>
      </div>
    </div>
  );
}

function RowInput({
  row,
  onChange,
  onRemove,
}: {
  row: Row;
  onChange: (patch: Partial<Row>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="grid grid-cols-[1fr_140px_auto] gap-2">
      <input
        type="text"
        value={row.label}
        placeholder="Label"
        onChange={(e) => onChange({ label: e.target.value })}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
      />
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={1}
        value={row.value}
        placeholder="0"
        onChange={(e) => onChange({ value: e.target.value })}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
      />
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove row"
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
      >
        Remove
      </button>
    </div>
  );
}
