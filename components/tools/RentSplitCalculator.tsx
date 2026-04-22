"use client";

import { useMemo, useState } from "react";

type Mode = "weighted" | "income";

interface Housemate {
  id: string;
  name: string;
  roomWeight: string;
  privateBath: boolean;
  extraWeight: string;
  income: string;
}

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function newId() {
  return Math.random().toString(36).slice(2, 9);
}

function blank(name: string): Housemate {
  return {
    id: newId(),
    name,
    roomWeight: "1",
    privateBath: false,
    extraWeight: "0",
    income: "3000",
  };
}

export function RentSplitCalculator() {
  const [rent, setRent] = useState("2400");
  const [mode, setMode] = useState<Mode>("weighted");
  const [bathPremium, setBathPremium] = useState("0.15");
  const [housemates, setHousemates] = useState<Housemate[]>([
    blank("Alex"),
    blank("Sam"),
    blank("Jordan"),
  ]);

  function update(id: string, patch: Partial<Housemate>) {
    setHousemates((list) => list.map((h) => (h.id === id ? { ...h, ...patch } : h)));
  }

  function addRow() {
    setHousemates((list) => [...list, blank(`Person ${list.length + 1}`)]);
  }

  function removeRow(id: string) {
    setHousemates((list) => (list.length > 1 ? list.filter((h) => h.id !== id) : list));
  }

  const results = useMemo(() => {
    const total = Math.max(0, parseFloat(rent) || 0);
    if (mode === "weighted") {
      const premium = Math.max(0, parseFloat(bathPremium) || 0);
      const weights = housemates.map((h) => {
        const base = Math.max(0, parseFloat(h.roomWeight) || 0);
        const extra = parseFloat(h.extraWeight) || 0;
        const bath = h.privateBath ? premium : 0;
        return base + extra + bath;
      });
      const sum = weights.reduce((a, b) => a + b, 0) || 1;
      return housemates.map((h, i) => ({
        id: h.id,
        name: h.name,
        share: (weights[i] / sum) * total,
      }));
    }
    const incomes = housemates.map((h) => Math.max(0, parseFloat(h.income) || 0));
    const sum = incomes.reduce((a, b) => a + b, 0) || 1;
    return housemates.map((h, i) => ({
      id: h.id,
      name: h.name,
      share: (incomes[i] / sum) * total,
    }));
  }, [rent, mode, bathPremium, housemates]);

  const totalShare = results.reduce((a, r) => a + r.share, 0);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Total monthly rent ($)</span>
        <input
          type="number"
          inputMode="decimal"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        {(["weighted", "income"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
              mode === m
                ? "bg-brand text-white border-brand"
                : "bg-white text-slate-700 border-slate-300 hover:border-brand"
            }`}
          >
            {m === "weighted" ? "Room / weighted" : "Income-proportional"}
          </button>
        ))}
      </div>

      {mode === "weighted" && (
        <label className="block max-w-xs">
          <span className="block text-sm font-medium text-slate-700 mb-1">Private bath premium (+weight)</span>
          <input
            type="number"
            inputMode="decimal"
            step={0.05}
            value={bathPremium}
            onChange={(e) => setBathPremium(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      )}

      <div className="space-y-3">
        {housemates.map((h) => (
          <div key={h.id} className="rounded-lg border border-slate-200 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <input
                type="text"
                value={h.name}
                onChange={(e) => update(h.id, { name: e.target.value })}
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
              <button
                type="button"
                onClick={() => removeRow(h.id)}
                className="text-rose-600 hover:text-rose-700 text-sm"
              >
                Remove
              </button>
            </div>
            {mode === "weighted" ? (
              <div className="grid sm:grid-cols-3 gap-3">
                <label className="block">
                  <span className="block text-sm font-medium text-slate-700 mb-1">Room weight</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    step={0.05}
                    value={h.roomWeight}
                    onChange={(e) => update(h.id, { roomWeight: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  />
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-slate-700 mb-1">Extra weight</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    step={0.05}
                    value={h.extraWeight}
                    onChange={(e) => update(h.id, { extraWeight: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  />
                </label>
                <label className="flex items-end gap-2 pb-2">
                  <input
                    type="checkbox"
                    checked={h.privateBath}
                    onChange={(e) => update(h.id, { privateBath: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
                  />
                  <span className="text-sm font-medium text-slate-700">Private bath</span>
                </label>
              </div>
            ) : (
              <label className="block">
                <span className="block text-sm font-medium text-slate-700 mb-1">Take-home income ($/mo)</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={h.income}
                  onChange={(e) => update(h.id, { income: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                />
              </label>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
      >
        + Add housemate
      </button>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        {results.map((r) => (
          <div key={r.id}>
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">{r.name || "—"}</p>
            <p className="text-xl font-bold text-slate-900">{fmt.format(r.share)}</p>
          </div>
        ))}
        <div className="sm:col-span-2 border-t border-slate-200 pt-3">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Total allocated</p>
          <p className="text-3xl font-bold text-brand">{fmt.format(totalShare)}</p>
        </div>
      </div>
    </div>
  );
}
