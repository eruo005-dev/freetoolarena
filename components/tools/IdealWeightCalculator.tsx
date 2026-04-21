"use client";

import { useMemo, useState } from "react";

export function IdealWeightCalculator() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [heightCm, setHeightCm] = useState(175);

  const r = useMemo(() => {
    // convert to inches over 5ft
    const inches = heightCm / 2.54;
    const inchesOver5 = Math.max(0, inches - 60);
    const devine = sex === "male" ? 50 + 2.3 * inchesOver5 : 45.5 + 2.3 * inchesOver5;
    const robinson = sex === "male" ? 52 + 1.9 * inchesOver5 : 49 + 1.7 * inchesOver5;
    const miller = sex === "male" ? 56.2 + 1.41 * inchesOver5 : 53.1 + 1.36 * inchesOver5;
    const hamwi = sex === "male" ? 48 + 2.7 * inchesOver5 : 45.5 + 2.2 * inchesOver5;
    return { devine, robinson, miller, hamwi };
  }, [sex, heightCm]);

  const kg = (n: number) => `${n.toFixed(1)} kg (${(n * 2.20462).toFixed(1)} lb)`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Sex</span>
          <select value={sex} onChange={(e) => setSex(e.target.value as "male" | "female")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Height (cm)</span>
          <input type="number" value={heightCm} min={120} max={230}
            onChange={(e) => setHeightCm(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Devine</p>
          <p className="font-semibold">{kg(r.devine)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Robinson</p>
          <p className="font-semibold">{kg(r.robinson)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Miller</p>
          <p className="font-semibold">{kg(r.miller)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Hamwi</p>
          <p className="font-semibold">{kg(r.hamwi)}</p>
        </div>
      </div>
      <p className="text-xs text-slate-500">Ideal weight formulas are estimates and don&rsquo;t account for frame size or muscle mass. Use as a rough reference only.</p>
    </div>
  );
}
