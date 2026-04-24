"use client";

import { useMemo, useState } from "react";

function fmt0(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

/** Year-1 depreciation 20%, years 2-5 ~15%, year 6+ ~8%. */
function baseDepRate(y: number): number {
  if (y <= 1) return 0.2;
  if (y <= 5) return 0.15;
  return 0.08;
}

/** Maintenance factor by year of ownership &mdash; cheaper early, pricier later. */
function maintFactor(y: number): number {
  if (y <= 1) return 0.5;
  if (y <= 3) return 0.8;
  if (y <= 5) return 1.2;
  return 1.6;
}

export function TotalCostOfOwnershipCalculator() {
  const [price, setPrice] = useState(32000);
  const [down, setDown] = useState(4000);
  const [ratePct, setRatePct] = useState(7.5);
  const [termMonths, setTermMonths] = useState(60);
  const [insAnnual, setInsAnnual] = useState(1400);
  const [regAnnual, setRegAnnual] = useState(180);
  const [maintAnnual, setMaintAnnual] = useState(600);
  const [annualMiles, setAnnualMiles] = useState(12000);
  const [mpg, setMpg] = useState(28);
  const [gasPrice, setGasPrice] = useState(3.45);
  const [yearsOwn, setYearsOwn] = useState(5);

  const result = useMemo(() => {
    const p = Math.max(0, price);
    const d = Math.max(0, Math.min(down, p));
    const loan = Math.max(0, p - d);
    const n = Math.max(1, Math.round(termMonths));
    const r = Math.max(0, ratePct) / 100 / 12;
    const pmt =
      r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
    const years = Math.max(1, Math.round(yearsOwn));

    // Loan payments actually made during ownership period.
    const monthsOwned = Math.min(n, years * 12);
    const loanPaid = pmt * monthsOwned + d;

    // Remaining balance if we sell before loan is paid off.
    let bal = loan;
    for (let i = 1; i <= monthsOwned; i++) {
      const iPart = bal * r;
      const pPart = Math.max(0, pmt - iPart);
      bal = Math.max(0, bal - pPart);
    }
    const remainingBalance = bal;

    // Fuel cost.
    const costPerMile = mpg > 0 ? gasPrice / mpg : 0;
    const fuelTotal = costPerMile * Math.max(0, annualMiles) * years;

    // Insurance + registration.
    const insTotal = Math.max(0, insAnnual) * years;
    const regTotal = Math.max(0, regAnnual) * years;

    // Maintenance scales by year.
    let maintTotal = 0;
    for (let y = 1; y <= years; y++) {
      maintTotal += Math.max(0, maintAnnual) * maintFactor(y);
    }

    // Depreciation: compute value after `years` of ownership.
    let value = p;
    for (let y = 1; y <= years; y++) {
      const rate = baseDepRate(y);
      value = Math.max(0, value - value * rate);
    }
    const depLoss = p - value;

    // Grand total: cash out-of-pocket (down + payments made) + fuel + ins + reg + maint.
    // Plus remaining loan balance (still owed) minus residual value recovered if sold.
    // Typical TCO model: use depreciation loss (what the car "cost" in value) + operating costs.
    // We'll show both grand total views.
    const operatingTotal = fuelTotal + insTotal + regTotal + maintTotal;
    const financeInterest = pmt * n - loan; // full-term interest
    const financeInterestPaid = Math.max(0, loanPaid - d - (loan - remainingBalance));
    const grandTotal =
      depLoss + operatingTotal + Math.max(0, financeInterestPaid);

    const perYear = grandTotal / years;
    const totalMiles = Math.max(1, annualMiles * years);
    const perMile = grandTotal / totalMiles;

    const categories = [
      { label: "Depreciation loss", value: depLoss },
      { label: "Fuel", value: fuelTotal },
      { label: "Insurance", value: insTotal },
      { label: "Maintenance", value: maintTotal },
      {
        label: "Loan interest paid",
        value: Math.max(0, financeInterestPaid),
      },
      { label: "Registration", value: regTotal },
    ];

    return {
      loan,
      pmt,
      loanPaid,
      remainingBalance,
      financeInterest,
      financeInterestPaid,
      depLoss,
      fuelTotal,
      insTotal,
      regTotal,
      maintTotal,
      operatingTotal,
      grandTotal,
      perYear,
      perMile,
      categories,
      valueAtEnd: value,
    };
  }, [
    price,
    down,
    ratePct,
    termMonths,
    insAnnual,
    regAnnual,
    maintAnnual,
    annualMiles,
    mpg,
    gasPrice,
    yearsOwn,
  ]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Purchase price ($)
          </span>
          <input
            type="number"
            value={price}
            min={0}
            step={500}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Down payment ($)
          </span>
          <input
            type="number"
            value={down}
            min={0}
            step={100}
            onChange={(e) => setDown(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Loan rate (% APR)
          </span>
          <input
            type="number"
            value={ratePct}
            min={0}
            step={0.1}
            onChange={(e) => setRatePct(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Loan term (months)
          </span>
          <input
            type="number"
            value={termMonths}
            min={12}
            max={96}
            step={12}
            onChange={(e) => setTermMonths(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Insurance ($/yr)
          </span>
          <input
            type="number"
            value={insAnnual}
            min={0}
            step={50}
            onChange={(e) => setInsAnnual(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Registration ($/yr)
          </span>
          <input
            type="number"
            value={regAnnual}
            min={0}
            step={10}
            onChange={(e) => setRegAnnual(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Base maintenance ($/yr)
          </span>
          <input
            type="number"
            value={maintAnnual}
            min={0}
            step={50}
            onChange={(e) => setMaintAnnual(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Annual miles
          </span>
          <input
            type="number"
            value={annualMiles}
            min={0}
            step={500}
            onChange={(e) => setAnnualMiles(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            MPG
          </span>
          <input
            type="number"
            value={mpg}
            min={1}
            step={1}
            onChange={(e) => setMpg(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Gas price ($/gal)
          </span>
          <input
            type="number"
            value={gasPrice}
            min={0}
            step={0.01}
            onChange={(e) => setGasPrice(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Years to own
          </span>
          <input
            type="number"
            value={yearsOwn}
            min={1}
            max={15}
            step={1}
            onChange={(e) => setYearsOwn(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Total cost of ownership ({Math.max(1, Math.round(yearsOwn))} years)
        </p>
        <p className="text-2xl font-semibold tabular-nums text-brand">
          {fmt0(result.grandTotal)}
        </p>
        <p className="mt-1 text-xs text-slate-600">
          Car is worth about {fmt0(result.valueAtEnd)} at the end.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Cost per year
          </p>
          <p className="text-2xl font-semibold tabular-nums text-brand">
            {fmt0(result.perYear)}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Cost per mile
          </p>
          <p className="text-2xl font-semibold tabular-nums text-brand">
            {fmt(result.perMile)}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <div className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Cost breakdown by category
        </div>
        <table className="w-full min-w-[420px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2 text-right">Total</th>
              <th className="px-3 py-2 text-right">% of total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {result.categories
              .slice()
              .sort((a, b) => b.value - a.value)
              .map((c) => {
                const pct =
                  result.grandTotal > 0
                    ? (c.value / result.grandTotal) * 100
                    : 0;
                return (
                  <tr key={c.label} className="hover:bg-slate-50">
                    <td className="px-3 py-2 font-medium text-slate-700">
                      {c.label}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {fmt0(c.value)}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-slate-600">
                      {pct.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {result.remainingBalance > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">
            You&rsquo;d still owe {fmt0(result.remainingBalance)} on the loan
            after {Math.max(1, Math.round(yearsOwn))} years.
          </p>
          <p className="mt-1 text-xs text-amber-800">
            Your loan term ({Math.round(termMonths / 12)} yrs) is longer than
            how long you plan to own the car &mdash; selling early means paying
            off the remaining balance from resale proceeds.
          </p>
        </div>
      )}
    </div>
  );
}
