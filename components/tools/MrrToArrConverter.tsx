"use client";

import { useMemo, useState } from "react";

type Mode = "fromMrr" | "fromArr" | "fromQuarterly" | "fromCustomers";

export function MrrToArrConverter() {
  const [mode, setMode] = useState<Mode>("fromMrr");
  const [mrrInput, setMrrInput] = useState(50000);
  const [arrInput, setArrInput] = useState(600000);
  const [quarterlyInput, setQuarterlyInput] = useState(150000);
  const [annualPrice, setAnnualPrice] = useState(1200);
  const [customers, setCustomers] = useState(500);

  const result = useMemo(() => {
    let mrr: number | null = null;
    let customerCount: number | null = null;
    let arpc: number | null = null; // Average monthly revenue per customer

    if (mode === "fromMrr") {
      if (!Number.isFinite(mrrInput) || mrrInput < 0) return null;
      mrr = mrrInput;
      if (Number.isFinite(customers) && customers > 0) {
        customerCount = customers;
        arpc = mrr / customers;
      }
    } else if (mode === "fromArr") {
      if (!Number.isFinite(arrInput) || arrInput < 0) return null;
      mrr = arrInput / 12;
      if (Number.isFinite(customers) && customers > 0) {
        customerCount = customers;
        arpc = mrr / customers;
      }
    } else if (mode === "fromQuarterly") {
      if (!Number.isFinite(quarterlyInput) || quarterlyInput < 0) return null;
      mrr = quarterlyInput / 3;
      if (Number.isFinite(customers) && customers > 0) {
        customerCount = customers;
        arpc = mrr / customers;
      }
    } else if (mode === "fromCustomers") {
      if (
        !Number.isFinite(annualPrice) ||
        !Number.isFinite(customers) ||
        annualPrice < 0 ||
        customers <= 0
      ) {
        return null;
      }
      customerCount = customers;
      arpc = annualPrice / 12;
      mrr = customers * (annualPrice / 12);
    }

    if (mrr === null || !Number.isFinite(mrr)) return null;
    const arr = mrr * 12;
    const quarterly = mrr * 3;

    return { mrr, arr, quarterly, customerCount, arpc };
  }, [mode, mrrInput, arrInput, quarterlyInput, annualPrice, customers]);

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const fmt2 = (n: number) =>
    n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div>
        <span className="block text-sm font-medium text-slate-700 mb-2">Start from</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(
            [
              { id: "fromMrr", label: "MRR" },
              { id: "fromArr", label: "ARR" },
              { id: "fromQuarterly", label: "Quarterly" },
              { id: "fromCustomers", label: "Customers + plan" },
            ] as { id: Mode; label: string }[]
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setMode(opt.id)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                mode === opt.id
                  ? "border-brand bg-brand text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {mode === "fromMrr" && (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">MRR ($)</span>
            <input
              type="number"
              min={0}
              value={mrrInput}
              onChange={(e) => setMrrInput(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
        )}
        {mode === "fromArr" && (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">ARR ($)</span>
            <input
              type="number"
              min={0}
              value={arrInput}
              onChange={(e) => setArrInput(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
        )}
        {mode === "fromQuarterly" && (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">
              Quarterly revenue ($)
            </span>
            <input
              type="number"
              min={0}
              value={quarterlyInput}
              onChange={(e) => setQuarterlyInput(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
        )}
        {mode === "fromCustomers" && (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">
              Annual plan price / customer ($)
            </span>
            <input
              type="number"
              min={0}
              value={annualPrice}
              onChange={(e) => setAnnualPrice(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
        )}
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Customer count {mode === "fromCustomers" ? "" : "(optional)"}
          </span>
          <input
            type="number"
            min={0}
            value={customers}
            onChange={(e) => setCustomers(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      {result ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-center">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
                MRR
              </p>
              <p className="text-2xl font-bold text-slate-800 tabular-nums">{fmt(result.mrr)}</p>
              <p className="text-xs text-slate-500 mt-1">Monthly recurring revenue</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-center">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
                ARR
              </p>
              <p className="text-2xl font-bold text-brand tabular-nums">{fmt(result.arr)}</p>
              <p className="text-xs text-slate-500 mt-1">MRR &times; 12</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-center">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
                Quarterly
              </p>
              <p className="text-2xl font-bold text-slate-800 tabular-nums">
                {fmt(result.quarterly)}
              </p>
              <p className="text-xs text-slate-500 mt-1">MRR &times; 3</p>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-5">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-3">
              Per-customer economics
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-600">Customers</dt>
                <dd className="font-semibold text-slate-900 tabular-nums">
                  {result.customerCount !== null ? result.customerCount.toLocaleString() : "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Avg revenue per customer (monthly)</dt>
                <dd className="font-semibold text-slate-900 tabular-nums">
                  {result.arpc !== null ? fmt2(result.arpc) : "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Avg revenue per customer (annual)</dt>
                <dd className="font-semibold text-slate-900 tabular-nums">
                  {result.arpc !== null ? fmt(result.arpc * 12) : "—"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Why both metrics matter:</span> SaaS investors and
              boards think in ARR. Operators and cash flow think in MRR.
            </p>
          </div>
        </>
      ) : (
        <p className="text-sm text-rose-600">
          Enter non-negative values for the selected inputs.
        </p>
      )}
    </div>
  );
}
