"use client";

import { useMemo, useState } from "react";

type Tier = {
  key: string;
  label: string;
  esimPerGb: number;
  localSimWeek: number;
  roamingPerDay: number;
};

const TIERS: Tier[] = [
  { key: "us_ca_mx", label: "USA / Canada / Mexico", esimPerGb: 4.5, localSimWeek: 20, roamingPerDay: 10 },
  { key: "weu", label: "Western Europe", esimPerGb: 4.0, localSimWeek: 18, roamingPerDay: 10 },
  { key: "eeu", label: "Eastern Europe", esimPerGb: 3.5, localSimWeek: 12, roamingPerDay: 10 },
  { key: "sea", label: "Southeast Asia", esimPerGb: 3.0, localSimWeek: 10, roamingPerDay: 10 },
  { key: "jpkr", label: "Japan / Korea", esimPerGb: 6.5, localSimWeek: 35, roamingPerDay: 10 },
  { key: "cn", label: "China", esimPerGb: 8.0, localSimWeek: 25, roamingPerDay: 10 },
  { key: "me", label: "Middle East", esimPerGb: 5.5, localSimWeek: 22, roamingPerDay: 10 },
  { key: "latam", label: "Latin America", esimPerGb: 5.0, localSimWeek: 18, roamingPerDay: 10 },
  { key: "ssa", label: "Sub-Saharan Africa", esimPerGb: 7.0, localSimWeek: 25, roamingPerDay: 10 },
  { key: "oce", label: "Oceania", esimPerGb: 6.0, localSimWeek: 28, roamingPerDay: 10 },
];

export function InternationalDataCostEstimator() {
  const [tierKey, setTierKey] = useState("weu");
  const [days, setDays] = useState(10);
  const [dailyGb, setDailyGb] = useState(1);
  const [esimCapable, setEsimCapable] = useState(true);

  const tier = TIERS.find((t) => t.key === tierKey) ?? TIERS[0];

  const result = useMemo(() => {
    if (![days, dailyGb].every(Number.isFinite) || days <= 0 || dailyGb < 0) return null;

    const totalGb = days * dailyGb;
    const roaming = days * tier.roamingPerDay;
    const esim = totalGb * tier.esimPerGb;
    const weeks = Math.max(1, Math.ceil(days / 7));
    const localSim = tier.localSimWeek * weeks;

    const options = [
      { name: "Carrier roaming day-pass", cost: roaming, note: `${days} days &times; $${tier.roamingPerDay}/day`, available: true },
      { name: "Global eSIM (Airalo/Nomad)", cost: esim, note: `${totalGb.toFixed(1)} GB &times; $${tier.esimPerGb.toFixed(2)}/GB`, available: esimCapable },
      { name: "Local SIM card", cost: localSim, note: `${weeks} week${weeks > 1 ? "s" : ""} of coverage`, available: true },
    ];

    const viable = options.filter((o) => o.available);
    const cheapest = viable.reduce((min, o) => (o.cost < min.cost ? o : min), viable[0]);

    return { options, cheapest, totalGb };
  }, [days, dailyGb, tier, esimCapable]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Destination region</span>
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={tierKey}
            onChange={(e) => setTierKey(e.target.value)}
          >
            {TIERS.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Trip length (days)</span>
          <input
            type="number"
            min={1}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Daily data (GB)</span>
          <input
            type="number"
            min={0}
            step={0.1}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={dailyGb}
            onChange={(e) => setDailyGb(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Phone eSIM capable?</span>
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={esimCapable ? "y" : "n"}
            onChange={(e) => setEsimCapable(e.target.value === "y")}
          >
            <option value="y">Yes (iPhone 13+, recent Samsung, Pixel)</option>
            <option value="n">No (older phone)</option>
          </select>
        </label>
      </div>

      {result && (
        <>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-sm text-slate-600">Cheapest option &mdash; {result.cheapest.name}</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">{fmt(result.cheapest.cost)}</div>
            <div className="text-xs text-slate-500">Total data needed: {result.totalGb.toFixed(1)} GB</div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {result.options.map((o) => (
              <div
                key={o.name}
                className={`rounded-xl bg-slate-50 p-4 ${!o.available ? "opacity-50" : ""}`}
              >
                <div className="text-sm text-slate-600">{o.name}</div>
                <div className="text-2xl font-semibold tabular-nums text-brand">{fmt(o.cost)}</div>
                <div
                  className="text-xs text-slate-500"
                  dangerouslySetInnerHTML={{ __html: o.note + (!o.available ? " &mdash; needs eSIM phone" : "") }}
                />
              </div>
            ))}
          </div>

          <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-900">
            Your current carrier may include free roaming (T-Mobile Magenta, Google Fi, Verizon TravelPass in
            some regions). Check before paying &mdash; you may not need any of these.
          </p>
        </>
      )}
    </div>
  );
}
