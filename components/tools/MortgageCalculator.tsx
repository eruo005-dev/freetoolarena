"use client";

import { useMemo, useState } from "react";

function formatMoney(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export interface MortgageCalculatorProps {
  initialPrice?: number;
  initialDown?: number;
  initialRate?: number;
  initialYears?: number;
}

/**
 * PMI: private mortgage insurance — required on conventional loans with
 * less than 20% down. Typical range is 0.3%–1.5% of the loan balance per
 * year. We model it as a constant annual rate applied until the LTV hits
 * 80% (then it drops off automatically, per CFPB rules).
 */
const DEFAULT_PMI_RATE = 0.6; // %/yr of loan balance

export function MortgageCalculator({
  initialPrice = 400000,
  initialDown = 20,
  initialRate = 6.75,
  initialYears = 30,
}: MortgageCalculatorProps = {}) {
  const [price, setPrice] = useState(initialPrice);
  const [down, setDown] = useState(initialDown);
  const [rate, setRate] = useState(initialRate);
  const [years, setYears] = useState(initialYears);
  const [tax, setTax] = useState(1.2);
  const [insurance, setInsurance] = useState(1200);
  const [hoa, setHoa] = useState(0);
  const [pmiRate, setPmiRate] = useState(DEFAULT_PMI_RATE);

  const calc = useMemo(() => {
    const loanAmount = Math.max(0, price * (1 - down / 100));
    const downPaymentDollars = price - loanAmount;
    const n = Math.max(1, Math.round(years * 12));
    const r = rate / 100 / 12;
    const pi =
      r === 0 ? loanAmount / n : (loanAmount * r) / (1 - Math.pow(1 + r, -n));
    const monthlyTax = (price * (tax / 100)) / 12;
    const monthlyIns = insurance / 12;

    // PMI: active until balance drops below 80% of original price.
    // Walk the amortization schedule to figure out both the months-active
    // count and the total PMI dollars paid.
    const pmiMonthlyRateOfBalance = pmiRate / 100 / 12;
    const pmiDropBalance = price * 0.8;
    const hasPmi = down < 20 && pmiRate > 0;
    let balance = loanAmount;
    let pmiMonths = 0;
    let totalInterest = 0;
    let totalPmi = 0;
    for (let i = 1; i <= n && balance > 0.005; i++) {
      const interestPart = balance * r;
      const principalPart = pi - interestPart;
      balance = Math.max(0, balance - principalPart);
      totalInterest += interestPart;
      if (hasPmi && balance > pmiDropBalance) {
        const pmiThisMonth = balance * pmiMonthlyRateOfBalance;
        totalPmi += pmiThisMonth;
        pmiMonths++;
      }
    }
    const avgMonthlyPmi = hasPmi && pmiMonths > 0 ? totalPmi / pmiMonths : 0;

    const totalMonthly =
      pi + monthlyTax + monthlyIns + hoa + avgMonthlyPmi;
    const totalCostOfHome =
      downPaymentDollars +
      pi * n +
      monthlyTax * n +
      monthlyIns * n +
      hoa * n +
      totalPmi;

    return {
      loanAmount,
      downPaymentDollars,
      pi,
      monthlyTax,
      monthlyIns,
      hoa,
      avgMonthlyPmi,
      pmiMonths,
      totalMonthly,
      totalInterest,
      totalPmi,
      totalCostOfHome,
      hasPmi,
    };
  }, [price, down, rate, years, tax, insurance, hoa, pmiRate]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Home price ($)
          </span>
          <input
            type="number"
            value={price}
            min={0}
            step={1000}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Down payment (%)
          </span>
          <input
            type="number"
            value={down}
            min={0}
            max={100}
            step={1}
            onChange={(e) => setDown(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Rate (%)
          </span>
          <input
            type="number"
            value={rate}
            min={0}
            step={0.05}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Term (years)
          </span>
          <input
            type="number"
            value={years}
            min={1}
            max={40}
            step={1}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Property tax (% / yr)
          </span>
          <input
            type="number"
            value={tax}
            min={0}
            step={0.05}
            onChange={(e) => setTax(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Insurance ($ / yr)
          </span>
          <input
            type="number"
            value={insurance}
            min={0}
            step={50}
            onChange={(e) => setInsurance(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            HOA ($ / mo)
          </span>
          <input
            type="number"
            value={hoa}
            min={0}
            step={10}
            onChange={(e) => setHoa(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            PMI (% / yr){" "}
            <span className="text-xs font-normal text-slate-500">
              {down >= 20 ? "(waived at 20%+ down)" : ""}
            </span>
          </span>
          <input
            type="number"
            value={pmiRate}
            min={0}
            max={3}
            step={0.05}
            disabled={down >= 20}
            onChange={(e) => setPmiRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand disabled:bg-slate-100 disabled:text-slate-400"
          />
        </label>
      </div>

      <div className="rounded-lg bg-brand-dark text-white p-5">
        <p className="text-xs uppercase tracking-wide text-white/70">
          Monthly payment (all in)
        </p>
        <p className="text-3xl font-bold">{formatMoney(calc.totalMonthly)}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            P&amp;I
          </p>
          <p className="font-semibold">{formatMoney(calc.pi)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Property tax
          </p>
          <p className="font-semibold">{formatMoney(calc.monthlyTax)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Insurance
          </p>
          <p className="font-semibold">{formatMoney(calc.monthlyIns)}</p>
        </div>
        {calc.hoa > 0 && (
          <div className="rounded-lg border border-slate-200 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              HOA
            </p>
            <p className="font-semibold">{formatMoney(calc.hoa)}</p>
          </div>
        )}
        {calc.hasPmi && calc.pmiMonths > 0 && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <p className="text-xs uppercase tracking-wide text-amber-800">
              PMI (avg)
            </p>
            <p className="font-semibold text-amber-900">
              {formatMoney(calc.avgMonthlyPmi)}
            </p>
            <p className="mt-0.5 text-[11px] text-amber-800">
              drops off in ~{Math.round(calc.pmiMonths / 12)} yr
            </p>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Total cost over {years} years
        </p>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-1">
          <dt className="text-slate-500">Down payment</dt>
          <dd className="text-right font-medium">
            {formatMoney(calc.downPaymentDollars)}
          </dd>
          <dt className="text-slate-500">Loan amount</dt>
          <dd className="text-right font-medium">
            {formatMoney(calc.loanAmount)}
          </dd>
          <dt className="text-slate-500">Total interest</dt>
          <dd className="text-right font-medium text-rose-700">
            {formatMoney(calc.totalInterest)}
          </dd>
          {calc.totalPmi > 0 && (
            <>
              <dt className="text-slate-500">Total PMI</dt>
              <dd className="text-right font-medium text-amber-800">
                {formatMoney(calc.totalPmi)}
              </dd>
            </>
          )}
          <dt className="border-t border-slate-200 pt-1 font-semibold text-slate-800">
            Total cost of home
          </dt>
          <dd className="border-t border-slate-200 pt-1 text-right font-bold text-slate-900">
            {formatMoney(calc.totalCostOfHome)}
          </dd>
        </dl>
      </div>

      <p className="text-xs text-slate-500">
        P&amp;I uses the standard fixed-rate amortization formula. PMI
        assumes conventional rules (drops off when balance ≤ 80% of
        original price). Taxes, insurance, and HOA are held flat — in
        reality they drift up over time.
      </p>
    </div>
  );
}
