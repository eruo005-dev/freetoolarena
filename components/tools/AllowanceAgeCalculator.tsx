"use client";

import { useMemo, useState } from "react";

type Region = "US" | "UK" | "CAD" | "AUD" | "EUR";
type SplitMode = "50-40-10" | "33-33-33" | "50-50";

const CURRENCY: Record<Region, { sym: string; mult: number; label: string }> = {
  US: { sym: "$", mult: 1, label: "USD" },
  UK: { sym: "£", mult: 0.8, label: "GBP" },
  CAD: { sym: "C$", mult: 1.35, label: "CAD" },
  AUD: { sym: "A$", mult: 1.5, label: "AUD" },
  EUR: { sym: "€", mult: 0.95, label: "EUR" },
};

const SPLIT_LABEL: Record<SplitMode, string> = {
  "50-40-10": "Save 50 / Spend 40 / Give 10",
  "33-33-33": "Save 33 / Spend 33 / Give 33",
  "50-50": "Save 50 / Spend 50",
};

function splitPct(mode: SplitMode): { save: number; spend: number; give: number } {
  if (mode === "50-40-10") return { save: 0.5, spend: 0.4, give: 0.1 };
  if (mode === "33-33-33") return { save: 0.3334, spend: 0.3333, give: 0.3333 };
  return { save: 0.5, spend: 0.5, give: 0 };
}

export function AllowanceAgeCalculator() {
  const [age, setAge] = useState<string>("10");
  const [region, setRegion] = useState<Region>("US");
  const [chores, setChores] = useState<boolean>(true);
  const [perYear, setPerYear] = useState<string>("1.5");
  const [split, setSplit] = useState<SplitMode>("50-40-10");

  const result = useMemo(() => {
    const a = Number(age);
    const py = Number(perYear);
    if (!Number.isFinite(a) || !Number.isFinite(py)) return null;
    if (a < 4 || a > 18 || py <= 0) return null;
    const cur = CURRENCY[region];
    const weekly = a * py * cur.mult;
    const monthly = weekly * 4.333;
    const annual = weekly * 52;
    const pct = splitPct(split);
    return {
      sym: cur.sym,
      label: cur.label,
      weekly,
      monthly,
      annual,
      save: weekly * pct.save,
      spend: weekly * pct.spend,
      give: weekly * pct.give,
    };
  }, [age, region, perYear, split]);

  const fmt = (n: number, sym: string) =>
    sym + n.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Child&rsquo;s age (4&mdash;18)</span>
          <input
            type="number"
            min={4}
            max={18}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Region</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as Region)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            <option value="US">United States (USD)</option>
            <option value="UK">United Kingdom (GBP)</option>
            <option value="CAD">Canada (CAD)</option>
            <option value="AUD">Australia (AUD)</option>
            <option value="EUR">Eurozone (EUR)</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Rate per year of age</span>
          <input
            type="number"
            step="0.25"
            min={0.5}
            max={5}
            value={perYear}
            onChange={(e) => setPerYear(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          <span className="mt-1 block text-xs text-slate-500">
            Rule of thumb: {CURRENCY[region].sym}1&mdash;{CURRENCY[region].sym}2 per week per year.
          </span>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Split mode</span>
          <select
            value={split}
            onChange={(e) => setSplit(e.target.value as SplitMode)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {(Object.keys(SPLIT_LABEL) as SplitMode[]).map((m) => (
              <option key={m} value={m}>
                {SPLIT_LABEL[m]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={chores}
          onChange={(e) => setChores(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand/30"
        />
        <span>Tie allowance to chores (vs unconditional)</span>
      </label>

      {result && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">Weekly</div>
              <div className="text-2xl font-bold text-brand">{fmt(result.weekly, result.sym)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">Monthly</div>
              <div className="text-2xl font-bold text-slate-800">
                {fmt(result.monthly, result.sym)}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">Annual</div>
              <div className="text-2xl font-bold text-slate-800">
                {fmt(result.annual, result.sym)}
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3 text-sm">
            <div className="rounded bg-white p-2">
              <div className="text-xs text-slate-500">Save</div>
              <div className="font-semibold">{fmt(result.save, result.sym)}</div>
            </div>
            <div className="rounded bg-white p-2">
              <div className="text-xs text-slate-500">Spend</div>
              <div className="font-semibold">{fmt(result.spend, result.sym)}</div>
            </div>
            <div className="rounded bg-white p-2">
              <div className="text-xs text-slate-500">Give</div>
              <div className="font-semibold">{fmt(result.give, result.sym)}</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="mb-2 font-semibold text-slate-800">Expected chores (unpaid)</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Make bed, tidy room</li>
            <li>Clear own dishes</li>
            <li>Put away laundry</li>
            <li>Feed family pets</li>
          </ul>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="mb-2 font-semibold text-slate-800">Earning categories (paid)</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Yard work, car wash</li>
            <li>Deep-clean a room</li>
            <li>Help with a sibling</li>
            <li>Tutoring / reading bonus</li>
          </ul>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        {chores
          ? "Chores-based allowance reinforces work-reward. Keep baseline chores separate so children still contribute unconditionally."
          : "Unconditional allowance treats money as a teaching tool. Pair with clear expectations and savings goals."}
      </p>
    </div>
  );
}
