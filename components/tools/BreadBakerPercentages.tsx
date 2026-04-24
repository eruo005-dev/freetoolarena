"use client";

import { useMemo, useState } from "react";

type Extra = {
  id: number;
  name: string;
  grams: number;
};

export function BreadBakerPercentages() {
  const [flourType, setFlourType] = useState("Bread flour");
  const [flour, setFlour] = useState(500);
  const [water, setWater] = useState(350);
  const [salt, setSalt] = useState(10);
  const [yeast, setYeast] = useState(3);
  const [extras, setExtras] = useState<Extra[]>([
    { id: 1, name: "Olive oil", grams: 15 },
  ]);
  const [nextId, setNextId] = useState(2);
  const [newFlour, setNewFlour] = useState(1000);

  const safeFlour = Number.isFinite(flour) && flour > 0 ? flour : 0;

  const pct = (g: number) => (safeFlour > 0 && Number.isFinite(g) ? (g / safeFlour) * 100 : 0);

  const addExtra = () => {
    setExtras([...extras, { id: nextId, name: "", grams: 0 }]);
    setNextId(nextId + 1);
  };
  const removeExtra = (id: number) => setExtras(extras.filter((e) => e.id !== id));
  const updateExtra = (id: number, patch: Partial<Extra>) => {
    setExtras(extras.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  };

  const totals = useMemo(() => {
    const extrasSum = extras.reduce((s, e) => s + (Number.isFinite(e.grams) ? e.grams : 0), 0);
    const waterG = Number.isFinite(water) ? water : 0;
    const saltG = Number.isFinite(salt) ? salt : 0;
    const yeastG = Number.isFinite(yeast) ? yeast : 0;
    const total = safeFlour + waterG + saltG + yeastG + extrasSum;
    return { total };
  }, [extras, water, salt, yeast, safeFlour]);

  const scaled = useMemo(() => {
    const nf = Number.isFinite(newFlour) && newFlour > 0 ? newFlour : 0;
    const factor = safeFlour > 0 ? nf / safeFlour : 0;
    return {
      flour: nf,
      water: water * factor,
      salt: salt * factor,
      yeast: yeast * factor,
      extras: extras.map((e) => ({ ...e, grams: e.grams * factor })),
      total: totals.total * factor,
    };
  }, [newFlour, safeFlour, water, salt, yeast, extras, totals.total]);

  const fmt = (n: number) => (Number.isFinite(n) ? (n < 10 ? n.toFixed(2) : n.toFixed(1)) : "0");

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <label className="block text-sm col-span-2 md:col-span-1">
          <span className="text-slate-700">Flour type</span>
          <input
            value={flourType}
            onChange={(e) => setFlourType(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Flour (g) &mdash; 100%</span>
          <input
            type="number"
            value={flour}
            onChange={(e) => setFlour(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Water (g)</span>
          <input
            type="number"
            value={water}
            onChange={(e) => setWater(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Salt (g)</span>
          <input
            type="number"
            step="0.5"
            value={salt}
            onChange={(e) => setSalt(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Yeast (g)</span>
          <input
            type="number"
            step="0.1"
            value={yeast}
            onChange={(e) => setYeast(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="rounded-xl border border-slate-200">
        <div className="flex items-center justify-between p-3 border-b border-slate-200">
          <div className="font-medium text-slate-800">Optional ingredients</div>
          <button onClick={addExtra} className="text-xs px-2 py-1 rounded-md bg-slate-900 text-white">+ Add</button>
        </div>
        <div className="divide-y divide-slate-100">
          {extras.map((e) => (
            <div key={e.id} className="p-3 flex flex-wrap gap-2">
              <input
                placeholder="Oil / milk / sugar ..."
                value={e.name}
                onChange={(ev) => updateExtra(e.id, { name: ev.target.value })}
                className="flex-1 min-w-[10rem] rounded-md border border-slate-300 px-2 py-1 text-sm"
              />
              <input
                type="number"
                step="0.5"
                value={e.grams}
                onChange={(ev) => updateExtra(e.id, { grams: Number(ev.target.value) })}
                className="w-24 rounded-md border border-slate-300 px-2 py-1 text-sm"
              />
              <button onClick={() => removeExtra(e.id)} className="text-xs text-rose-600 px-2">remove</button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left">Ingredient</th>
              <th className="px-3 py-2 text-right">Grams</th>
              <th className="px-3 py-2 text-right">Baker&rsquo;s %</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2 font-medium">{flourType}</td>
              <td className="px-3 py-2 text-right font-mono">{fmt(safeFlour)} g</td>
              <td className="px-3 py-2 text-right">100.0%</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2 font-medium">Water</td>
              <td className="px-3 py-2 text-right font-mono">{fmt(water)} g</td>
              <td className="px-3 py-2 text-right">{pct(water).toFixed(1)}%</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2 font-medium">Salt</td>
              <td className="px-3 py-2 text-right font-mono">{fmt(salt)} g</td>
              <td className="px-3 py-2 text-right">{pct(salt).toFixed(2)}%</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2 font-medium">Yeast</td>
              <td className="px-3 py-2 text-right font-mono">{fmt(yeast)} g</td>
              <td className="px-3 py-2 text-right">{pct(yeast).toFixed(2)}%</td>
            </tr>
            {extras.map((e) => (
              <tr key={e.id} className="border-t border-slate-100">
                <td className="px-3 py-2 font-medium">{e.name || "(unnamed)"}</td>
                <td className="px-3 py-2 text-right font-mono">{fmt(e.grams)} g</td>
                <td className="px-3 py-2 text-right">{pct(e.grams).toFixed(2)}%</td>
              </tr>
            ))}
            <tr className="border-t border-slate-200 bg-slate-50 font-semibold">
              <td className="px-3 py-2">Total dough</td>
              <td className="px-3 py-2 text-right font-mono">{fmt(totals.total)} g</td>
              <td className="px-3 py-2 text-right">&mdash;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium text-emerald-900">Scale to new flour weight</div>
          <label className="text-sm text-emerald-900 flex items-center gap-2">
            New flour (g)
            <input
              type="number"
              value={newFlour}
              onChange={(e) => setNewFlour(Number(e.target.value))}
              className="w-28 rounded-md border border-emerald-300 px-2 py-1"
            />
          </label>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          <div className="rounded-md bg-white border border-emerald-200 p-2"><div className="text-xs text-emerald-700">{flourType}</div><div className="font-mono">{fmt(scaled.flour)} g</div></div>
          <div className="rounded-md bg-white border border-emerald-200 p-2"><div className="text-xs text-emerald-700">Water</div><div className="font-mono">{fmt(scaled.water)} g</div></div>
          <div className="rounded-md bg-white border border-emerald-200 p-2"><div className="text-xs text-emerald-700">Salt</div><div className="font-mono">{fmt(scaled.salt)} g</div></div>
          <div className="rounded-md bg-white border border-emerald-200 p-2"><div className="text-xs text-emerald-700">Yeast</div><div className="font-mono">{fmt(scaled.yeast)} g</div></div>
          {scaled.extras.map((e) => (
            <div key={e.id} className="rounded-md bg-white border border-emerald-200 p-2">
              <div className="text-xs text-emerald-700">{e.name || "(unnamed)"}</div>
              <div className="font-mono">{fmt(e.grams)} g</div>
            </div>
          ))}
          <div className="rounded-md bg-emerald-900 text-white p-2"><div className="text-xs opacity-80">Total dough</div><div className="font-mono">{fmt(scaled.total)} g</div></div>
        </div>
      </div>
    </div>
  );
}
