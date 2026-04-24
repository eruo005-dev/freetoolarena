"use client";

import { useMemo, useState } from "react";

const currency = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function compoundQuarterly(
  initial: number,
  quarterlyAdd: number,
  annualRateNet: number,
  years: number,
) {
  const quarters = Math.round(years * 4);
  const r = annualRateNet / 4;
  let balance = initial;
  for (let q = 0; q < quarters; q++) {
    balance = balance * (1 + r) + quarterlyAdd;
  }
  return balance;
}

export function RealEstateCrowdfundingYield() {
  const [initial, setInitial] = useState("10000");
  const [quarterly, setQuarterly] = useState("500");
  const [annualReturn, setAnnualReturn] = useState("7");
  const [fee, setFee] = useState("1");
  const [years, setYears] = useState("10");

  const result = useMemo(() => {
    const init = Number(initial);
    const qAdd = Number(quarterly);
    const ret = Number(annualReturn) / 100;
    const f = Number(fee) / 100;
    const y = Number(years);

    if (
      !Number.isFinite(init) ||
      !Number.isFinite(qAdd) ||
      !Number.isFinite(ret) ||
      !Number.isFinite(f) ||
      !Number.isFinite(y) ||
      init < 0 ||
      qAdd < 0 ||
      y <= 0
    ) {
      return null;
    }

    const netReturn = ret - f;
    const ending = compoundQuarterly(init, qAdd, netReturn, y);
    const contributed = init + qAdd * Math.round(y * 4);
    const gain = ending - contributed;
    const gainPct = contributed > 0 ? (gain / contributed) * 100 : 0;

    const sp500 = compoundQuarterly(init, qAdd, 0.10, y);
    const indexFund = compoundQuarterly(init, qAdd, 0.10 - 0.0003, y);

    return { ending, contributed, gain, gainPct, netReturn, sp500, indexFund };
  }, [initial, quarterly, annualReturn, fee, years]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Initial investment ($)</span>
          <input
            type="number"
            value={initial}
            min={0}
            step={100}
            onChange={(e) => setInitial(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Quarterly contribution ($)</span>
          <input
            type="number"
            value={quarterly}
            min={0}
            step={50}
            onChange={(e) => setQuarterly(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Projected annual return % (REITs 5&ndash;9)
          </span>
          <input
            type="number"
            value={annualReturn}
            step="any"
            onChange={(e) => setAnnualReturn(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Platform fee % (Fundrise ~1)</span>
          <input
            type="number"
            value={fee}
            step="any"
            onChange={(e) => setFee(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-slate-700">Years to hold</span>
          <input
            type="number"
            value={years}
            min={1}
            step={1}
            onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      {result ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Ending value</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {currency(result.ending)}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Total contributed</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {currency(result.contributed)}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Net gain</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {currency(result.gain)}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Gain %</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.gainPct.toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-sm">
            <div className="font-medium text-slate-800">Comparison over the same period</div>
            <ul className="mt-2 space-y-1 text-slate-700">
              <li>
                S&amp;P 500 at 10% historical:{" "}
                <span className="font-semibold tabular-nums text-brand">
                  {currency(result.sp500)}
                </span>
              </li>
              <li>
                Index fund (0.03% expense, ~10% gross):{" "}
                <span className="font-semibold tabular-nums text-brand">
                  {currency(result.indexFund)}
                </span>
              </li>
              <li>
                Net return after fee used: {(result.netReturn * 100).toFixed(2)}%
              </li>
            </ul>
            <p className="mt-2 text-xs text-slate-500">
              Crowdfunded real estate is illiquid &mdash; withdrawals can be gated or penalized. Fees
              compound silently; a 1% fee can cost tens of thousands over decades.
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-500">Enter valid numeric values to project growth.</p>
      )}
    </div>
  );
}
