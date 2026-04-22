"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function addMonths(base: Date, months: number): Date {
  const d = new Date(base);
  const whole = Math.floor(months);
  d.setMonth(d.getMonth() + whole);
  const frac = months - whole;
  if (frac > 0) d.setDate(d.getDate() + Math.round(frac * 30));
  return d;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function StartupRunwayCalculator() {
  const [cash, setCash] = useState("250000");
  const [burn, setBurn] = useState("35000");
  const [revenue, setRevenue] = useState("5000");
  const [burnGrowth, setBurnGrowth] = useState("0");
  const [targetMonths, setTargetMonths] = useState("18");

  const { runwayMonths, runwayWeeks, zeroDate, raiseNeeded, netBurn } = useMemo(() => {
    const c = Math.max(0, parseFloat(cash) || 0);
    const b = Math.max(0, parseFloat(burn) || 0);
    const r = Math.max(0, parseFloat(revenue) || 0);
    const g = Math.max(-50, parseFloat(burnGrowth) || 0) / 100;
    const tgt = Math.max(0, parseFloat(targetMonths) || 0);
    const nb0 = b - r; // initial net burn

    let months = 0;
    if (nb0 <= 0 && g <= 0) {
      months = Infinity;
    } else if (g === 0) {
      months = nb0 > 0 ? c / nb0 : Infinity;
    } else {
      // simulate up to 600 months
      let remaining = c;
      let nb = nb0;
      let m = 0;
      while (remaining > 0 && m < 600) {
        if (nb <= 0) {
          months = Infinity;
          break;
        }
        if (remaining >= nb) {
          remaining -= nb;
          m += 1;
          nb = nb * (1 + g);
        } else {
          m += remaining / nb;
          remaining = 0;
        }
      }
      if (months !== Infinity) months = m;
    }

    const weeks = Number.isFinite(months) ? months * 4.345 : Infinity;
    const zd = Number.isFinite(months) ? addMonths(new Date(), months) : null;

    // Raise needed to hit target months (simple: additional cash to cover shortfall at current net burn, growth-adjusted)
    let raise = 0;
    if (tgt > months) {
      if (g === 0) {
        raise = nb0 * (tgt - months);
      } else {
        // simulate cost of extending by (tgt - months)
        // continue from zero with burn value at m=months
        let nb = nb0 * Math.pow(1 + g, months);
        let need = 0;
        const extra = tgt - months;
        const wholeExtra = Math.floor(extra);
        for (let i = 0; i < wholeExtra; i++) {
          need += nb;
          nb = nb * (1 + g);
        }
        const frac = extra - wholeExtra;
        if (frac > 0) need += nb * frac;
        raise = Math.max(0, need);
      }
    }

    return {
      runwayMonths: months,
      runwayWeeks: weeks,
      zeroDate: zd,
      raiseNeeded: raise,
      netBurn: nb0,
    };
  }, [cash, burn, revenue, burnGrowth, targetMonths]);

  const runwayLabel = Number.isFinite(runwayMonths)
    ? `${runwayMonths.toFixed(1)} months`
    : "Infinite";
  const weeksLabel = Number.isFinite(runwayWeeks)
    ? `${runwayWeeks.toFixed(0)} weeks`
    : "—";

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Current cash ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={1000}
            value={cash}
            onChange={(e) => setCash(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Monthly burn ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={500}
            value={burn}
            onChange={(e) => setBurn(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Monthly revenue ($, optional)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={100}
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Burn growth rate / month (%)</span>
          <input
            type="number"
            inputMode="decimal"
            step={0.5}
            value={burnGrowth}
            onChange={(e) => setBurnGrowth(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Net burn / month</p>
          <p className="text-2xl font-bold text-slate-900">{money(netBurn)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Runway</p>
          <p className="text-3xl font-bold text-brand">{runwayLabel}</p>
          <p className="text-sm text-slate-500 mt-1">≈ {weeksLabel}</p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Estimated zero-cash date</p>
          <p className="text-2xl font-bold text-slate-900">{zeroDate ? formatDate(zeroDate) : "Never (profitable)"}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
        <h3 className="text-sm font-semibold text-slate-700">How much to raise?</h3>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Target runway (months)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={1}
            value={targetMonths}
            onChange={(e) => setTargetMonths(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Amount to raise</p>
          <p className="text-2xl font-bold text-brand">{money(raiseNeeded)}</p>
          {raiseNeeded === 0 && (
            <p className="text-sm text-slate-500 mt-1">You're already past the target. No raise needed.</p>
          )}
        </div>
      </div>
    </div>
  );
}
