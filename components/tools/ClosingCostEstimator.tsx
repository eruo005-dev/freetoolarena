"use client";

import { useMemo, useState } from "react";

type StateOpt = {
  code: string;
  name: string;
  transferPct: number;
  scale: number;
};

const STATES: StateOpt[] = [
  { code: "AL", name: "Alabama", transferPct: 0.1, scale: 0.85 },
  { code: "CA", name: "California", transferPct: 0.11, scale: 1.15 },
  { code: "CO", name: "Colorado", transferPct: 0.01, scale: 1.0 },
  { code: "CT", name: "Connecticut", transferPct: 1.25, scale: 1.1 },
  { code: "DC", name: "District of Columbia", transferPct: 1.45, scale: 1.25 },
  { code: "DE", name: "Delaware", transferPct: 2.0, scale: 1.1 },
  { code: "FL", name: "Florida", transferPct: 0.7, scale: 0.95 },
  { code: "GA", name: "Georgia", transferPct: 0.1, scale: 0.9 },
  { code: "IL", name: "Illinois", transferPct: 0.1, scale: 1.0 },
  { code: "MA", name: "Massachusetts", transferPct: 0.456, scale: 1.15 },
  { code: "MD", name: "Maryland", transferPct: 1.0, scale: 1.1 },
  { code: "MI", name: "Michigan", transferPct: 0.86, scale: 0.9 },
  { code: "NC", name: "North Carolina", transferPct: 0.2, scale: 0.9 },
  { code: "NH", name: "New Hampshire", transferPct: 1.5, scale: 1.05 },
  { code: "NJ", name: "New Jersey", transferPct: 1.0, scale: 1.1 },
  { code: "NY", name: "New York", transferPct: 1.4, scale: 1.2 },
  { code: "OH", name: "Ohio", transferPct: 0.4, scale: 0.85 },
  { code: "PA", name: "Pennsylvania", transferPct: 2.0, scale: 1.05 },
  { code: "TX", name: "Texas", transferPct: 0.0, scale: 0.9 },
  { code: "VA", name: "Virginia", transferPct: 0.33, scale: 0.95 },
  { code: "WA", name: "Washington", transferPct: 1.28, scale: 1.05 },
  { code: "OTHER", name: "Other / national average", transferPct: 0.5, scale: 1.0 },
];

const money = (n: number) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
    : "—";

export function ClosingCostEstimator() {
  const [price, setPrice] = useState(425000);
  const [downPct, setDownPct] = useState(10);
  const [stateCode, setStateCode] = useState("CA");
  const [propertyTaxPct, setPropertyTaxPct] = useState(1.1);

  const stateOpt = STATES.find((s) => s.code === stateCode) ?? STATES[STATES.length - 1];

  const breakdown = useMemo(() => {
    const p = Number.isFinite(price) ? price : 0;
    const dp = Number.isFinite(downPct) ? Math.min(Math.max(downPct, 0), 100) : 0;
    const loan = p * (1 - dp / 100);
    const scale = stateOpt.scale;

    const origination = loan * 0.0075; // 0.75%
    const appraisal = 500;
    const titleInsurance = p * 0.005;
    const attorneyEscrow = 1000 * scale;
    const transfer = p * (stateOpt.transferPct / 100);
    const recording = 150;
    const prepaidTax = (p * (propertyTaxPct / 100)) / 6; // ~2 months
    const prepaidInsurance = p * 0.0035; // 1 year at 0.35%
    const underwriting = 500;
    const creditReport = 55;

    const total =
      origination +
      appraisal +
      titleInsurance +
      attorneyEscrow +
      transfer +
      recording +
      prepaidTax +
      prepaidInsurance +
      underwriting +
      creditReport;

    return {
      loan,
      rows: [
        { label: "Loan origination fee (0.75% of loan)", amount: origination },
        { label: "Appraisal", amount: appraisal },
        { label: "Title insurance (0.5% of price)", amount: titleInsurance },
        { label: "Attorney / escrow fee", amount: attorneyEscrow },
        { label: `Transfer tax (${stateOpt.transferPct.toFixed(2)}%)`, amount: transfer },
        { label: "Recording fees", amount: recording },
        { label: "Prepaid property tax (~2 months)", amount: prepaidTax },
        { label: "Prepaid homeowners insurance (~1 yr)", amount: prepaidInsurance },
        { label: "Underwriting fee", amount: underwriting },
        { label: "Credit report", amount: creditReport },
      ],
      total,
      pctOfLoan: loan > 0 ? (total / loan) * 100 : 0,
    };
  }, [price, downPct, stateOpt, propertyTaxPct]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Home price</span>
          <input
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Down payment %</span>
          <input
            type="number"
            min={0}
            max={100}
            step={0.5}
            value={downPct}
            onChange={(e) => setDownPct(parseFloat(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">State</span>
          <select
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            {STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Property tax rate %</span>
          <input
            type="number"
            min={0}
            step={0.05}
            value={propertyTaxPct}
            onChange={(e) => setPropertyTaxPct(parseFloat(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-xs uppercase tracking-wide text-slate-500">Loan amount</div>
        <div className="text-2xl font-semibold tabular-nums text-brand">
          {money(breakdown.loan)}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-3 text-sm font-semibold text-slate-700">Itemized closing costs</div>
        <ul className="divide-y divide-slate-100 text-sm">
          {breakdown.rows.map((row) => (
            <li key={row.label} className="flex items-center justify-between py-2">
              <span className="text-slate-600">{row.label}</span>
              <span className="font-mono tabular-nums text-slate-900">{money(row.amount)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Estimated total</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">
            {money(breakdown.total)}
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">% of loan amount</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">
            {breakdown.pctOfLoan.toFixed(2)}%
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Typical closing costs run 2&ndash;5% of the loan amount. Actual costs vary by lender,
        property, and state &mdash; always review the lender&rsquo;s Loan Estimate for your
        binding numbers.
      </p>
    </div>
  );
}
