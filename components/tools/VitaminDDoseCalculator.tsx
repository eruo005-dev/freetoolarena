"use client";
import { useMemo, useState } from "react";

export function VitaminDDoseCalculator() {
  const [age, setAge] = useState("35");
  const [level, setLevel] = useState("");
  const [sun, setSun] = useState<"low" | "moderate" | "high">("low");

  const a = useMemo(() => {
    const x = Number(age);
    return Number.isFinite(x) && x > 0 ? Math.round(x) : 0;
  }, [age]);
  const lvl = useMemo(() => {
    if (level.trim() === "") return null;
    const x = Number(level);
    return Number.isFinite(x) && x >= 0 ? x : null;
  }, [level]);

  const rec = useMemo(() => {
    let status = "";
    let dose = 0;
    let range = "";
    if (lvl !== null) {
      if (lvl < 20) {
        status = "Deficient (<20 ng/mL)";
        dose = 5000;
        range = "4,000&ndash;5,000 IU/day for 8&ndash;12 weeks, then recheck";
      } else if (lvl < 30) {
        status = "Insufficient (20&ndash;29 ng/mL)";
        dose = 2000;
        range = "2,000&ndash;4,000 IU/day, recheck in 3 months";
      } else if (lvl <= 50) {
        status = "Sufficient (30&ndash;50 ng/mL)";
        dose = 1000;
        range = "600&ndash;2,000 IU/day maintenance";
      } else {
        status = "High (>50 ng/mL)";
        dose = 0;
        range = "Hold supplementation &mdash; discuss with provider";
      }
    } else {
      status = "No blood level provided &mdash; maintenance estimate";
      if (sun === "high") {
        dose = 600;
        range = "600&ndash;1,000 IU/day (ample sun exposure)";
      } else if (sun === "moderate") {
        dose = 1000;
        range = "1,000&ndash;2,000 IU/day";
      } else {
        dose = 2000;
        range = "1,500&ndash;2,000 IU/day (low sun exposure)";
      }
      if (a >= 70) {
        dose = Math.max(dose, 1000);
      }
    }
    return { status, dose, range };
  }, [lvl, sun, a]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Age</span>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">25(OH)D level ng/mL (optional)</span>
          <input type="number" value={level} onChange={(e) => setLevel(e.target.value)} placeholder="e.g. 22"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
      </div>
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Sun exposure</span>
        <select value={sun} onChange={(e) => setSun(e.target.value as "low" | "moderate" | "high")}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option value="low">Low (indoor, northern latitude)</option>
          <option value="moderate">Moderate (some outdoor time)</option>
          <option value="high">High (regular sun, light skin)</option>
        </select>
      </label>

      <div className="rounded-xl bg-slate-50 p-4 space-y-2">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Suggested dose</div>
        <div className="text-2xl font-semibold tabular-nums text-brand">{rec.dose.toLocaleString()} IU/day</div>
        <div className="text-xs text-slate-600">{rec.status}</div>
        <div className="text-xs text-slate-600" dangerouslySetInnerHTML={{ __html: rec.range }} />
      </div>

      <p className="text-xs text-slate-500">
        Not medical advice &mdash; consult a provider before starting or adjusting supplements, especially at repletion doses.
      </p>
    </div>
  );
}
