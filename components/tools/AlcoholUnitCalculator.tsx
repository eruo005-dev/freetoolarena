"use client";

import { useMemo, useState } from "react";

type DrinkType = "beer" | "wine" | "spirits" | "custom";

interface Drink {
  id: string;
  type: DrinkType;
  volumeMl: string;
  abv: string;
}

const PRESETS: Record<Exclude<DrinkType, "custom">, { volumeMl: string; abv: string; label: string }> = {
  beer: { volumeMl: "330", abv: "5", label: "Beer (330 ml, 5%)" },
  wine: { volumeMl: "150", abv: "12", label: "Wine (150 ml, 12%)" },
  spirits: { volumeMl: "44", abv: "40", label: "Spirits shot (44 ml, 40%)" },
};

const ML_PER_OZ = 29.5735;
const ETHANOL_DENSITY = 0.789; // g/ml

function newId() {
  return Math.random().toString(36).slice(2, 9);
}

function newDrink(type: DrinkType = "beer"): Drink {
  if (type === "custom") return { id: newId(), type, volumeMl: "200", abv: "6" };
  const p = PRESETS[type];
  return { id: newId(), type, volumeMl: p.volumeMl, abv: p.abv };
}

export function AlcoholUnitCalculator() {
  const [drinks, setDrinks] = useState<Drink[]>([newDrink("beer")]);

  function update(id: string, patch: Partial<Drink>) {
    setDrinks((list) =>
      list.map((d) => {
        if (d.id !== id) return d;
        const next = { ...d, ...patch };
        if (patch.type && patch.type !== "custom" && patch.type !== d.type) {
          const p = PRESETS[patch.type];
          next.volumeMl = p.volumeMl;
          next.abv = p.abv;
        }
        return next;
      }),
    );
  }

  function addRow() {
    setDrinks((list) => [...list, newDrink("beer")]);
  }

  function removeRow(id: string) {
    setDrinks((list) => (list.length > 1 ? list.filter((d) => d.id !== id) : list));
  }

  const totals = useMemo(() => {
    let ukUnits = 0;
    let usStandard = 0;
    let calories = 0;
    const rows = drinks.map((d) => {
      const ml = Math.max(0, parseFloat(d.volumeMl) || 0);
      const abv = Math.max(0, parseFloat(d.abv) || 0) / 100;
      const uk = (ml * abv) / 10;
      const oz = ml / ML_PER_OZ;
      const us = (oz * abv * 100) / 0.6;
      const ethanolG = ml * abv * ETHANOL_DENSITY;
      const cal = ethanolG * 7;
      ukUnits += uk;
      usStandard += us;
      calories += cal;
      return { id: d.id, uk, us, cal };
    });
    return { ukUnits, usStandard, calories, rows };
  }, [drinks]);

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        {drinks.map((d, i) => {
          const r = totals.rows[i];
          return (
            <div key={d.id} className="rounded-lg border border-slate-200 bg-white p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">Drink {i + 1}</p>
                <button
                  type="button"
                  onClick={() => removeRow(d.id)}
                  className="text-rose-600 hover:text-rose-700 text-sm"
                >
                  Remove
                </button>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <label className="block">
                  <span className="block text-sm font-medium text-slate-700 mb-1">Type</span>
                  <select
                    value={d.type}
                    onChange={(e) => update(d.id, { type: e.target.value as DrinkType })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  >
                    <option value="beer">Beer</option>
                    <option value="wine">Wine</option>
                    <option value="spirits">Spirits</option>
                    <option value="custom">Custom</option>
                  </select>
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-slate-700 mb-1">Volume (ml)</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step={1}
                    value={d.volumeMl}
                    onChange={(e) => update(d.id, { volumeMl: e.target.value, type: "custom" })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  />
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-slate-700 mb-1">ABV (%)</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step={0.1}
                    value={d.abv}
                    onChange={(e) => update(d.id, { abv: e.target.value, type: "custom" })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  />
                </label>
              </div>
              <p className="text-xs text-slate-500">
                {r.uk.toFixed(2)} UK units · {r.us.toFixed(2)} US standard drinks · {Math.round(r.cal)} cal
              </p>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
      >
        + Add drink
      </button>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">UK alcohol units</p>
          <p className="text-3xl font-bold text-brand">{totals.ukUnits.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">US standard drinks</p>
          <p className="text-3xl font-bold text-brand">{totals.usStandard.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Alcohol calories</p>
          <p className="text-xl font-bold text-slate-900">{Math.round(totals.calories)} kcal</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Drinks counted</p>
          <p className="text-xl font-bold text-slate-900">{drinks.length}</p>
        </div>
      </div>
    </div>
  );
}
