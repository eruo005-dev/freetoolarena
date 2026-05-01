"use client";

import { useMemo, useState } from "react";

type Verdict = "keep" | "review" | "cancel";

interface Sub {
  id: string;
  name: string;
  monthly: number;
  usesPerMonth: number;
  verdict: Verdict;
}

const STARTER: Sub[] = [
  { id: "1", name: "Netflix", monthly: 15.49, usesPerMonth: 12, verdict: "keep" },
  { id: "2", name: "Spotify", monthly: 11.99, usesPerMonth: 30, verdict: "keep" },
  { id: "3", name: "Amazon Prime", monthly: 14.99, usesPerMonth: 8, verdict: "review" },
  { id: "4", name: "Disney+", monthly: 9.99, usesPerMonth: 2, verdict: "cancel" },
  { id: "5", name: "Adobe Creative Cloud", monthly: 22.99, usesPerMonth: 1, verdict: "cancel" },
  { id: "6", name: "Gym membership", monthly: 39, usesPerMonth: 4, verdict: "review" },
  { id: "7", name: "iCloud 2TB", monthly: 9.99, usesPerMonth: 30, verdict: "keep" },
];

function autoVerdict(s: Sub): Verdict {
  const cph = s.monthly / Math.max(1, s.usesPerMonth);
  if (s.usesPerMonth === 0) return "cancel";
  if (cph > 5 && s.usesPerMonth < 4) return "cancel";
  if (cph > 2 && s.usesPerMonth < 8) return "review";
  return "keep";
}

const VERDICT_LABEL: Record<Verdict, string> = {
  keep: "Keep",
  review: "Review",
  cancel: "Cancel",
};

const VERDICT_STYLE: Record<Verdict, string> = {
  keep: "bg-emerald-100 text-emerald-900 border-emerald-300",
  review: "bg-amber-100 text-amber-900 border-amber-300",
  cancel: "bg-rose-100 text-rose-900 border-rose-300",
};

export function SubscriptionFatigueAuditor() {
  const [subs, setSubs] = useState<Sub[]>(STARTER);
  const [name, setName] = useState<string>("");
  const [monthly, setMonthly] = useState<number>(0);
  const [uses, setUses] = useState<number>(0);

  const totals = useMemo(() => {
    const monthlyTotal = subs.reduce((s, x) => s + x.monthly, 0);
    const cancelMonthly = subs.filter((x) => x.verdict === "cancel").reduce((s, x) => s + x.monthly, 0);
    const reviewMonthly = subs.filter((x) => x.verdict === "review").reduce((s, x) => s + x.monthly, 0);
    return {
      monthlyTotal,
      yearlyTotal: monthlyTotal * 12,
      cancelMonthly,
      cancelYearly: cancelMonthly * 12,
      reviewMonthly,
      reviewYearly: reviewMonthly * 12,
    };
  }, [subs]);

  const setVerdict = (id: string, v: Verdict) => {
    setSubs((s) => s.map((x) => (x.id === id ? { ...x, verdict: v } : x)));
  };

  const remove = (id: string) => setSubs((s) => s.filter((x) => x.id !== id));

  const add = () => {
    if (!name.trim() || monthly <= 0) return;
    const next: Sub = {
      id: String(Date.now()),
      name: name.trim(),
      monthly,
      usesPerMonth: Math.max(0, uses),
      verdict: autoVerdict({ id: "_", name: "_", monthly, usesPerMonth: Math.max(0, uses), verdict: "keep" }),
    };
    setSubs((s) => [...s, next]);
    setName("");
    setMonthly(0);
    setUses(0);
  };

  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-3 text-sm font-semibold text-slate-700">Add a subscription</h4>
        <div className="grid gap-3 sm:grid-cols-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name (e.g. Hulu)"
            className="rounded border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            type="number"
            min={0}
            step={0.01}
            value={monthly || ""}
            onChange={(e) => setMonthly(parseFloat(e.target.value) || 0)}
            placeholder="$ / month"
            className="rounded border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            type="number"
            min={0}
            value={uses || ""}
            onChange={(e) => setUses(parseFloat(e.target.value) || 0)}
            placeholder="Uses / month"
            className="rounded border border-slate-300 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={add}
            className="rounded bg-brand px-3 py-2 text-sm font-medium text-white hover:bg-brand-dark"
          >
            Add
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="py-1">Service</th>
              <th className="py-1 text-right">$/mo</th>
              <th className="py-1 text-right">Uses/mo</th>
              <th className="py-1 text-right">$/use</th>
              <th className="py-1">Verdict</th>
              <th className="py-1"></th>
            </tr>
          </thead>
          <tbody>
            {subs.map((s) => {
              const cph = s.monthly / Math.max(1, s.usesPerMonth);
              return (
                <tr key={s.id} className="border-t border-slate-100">
                  <td className="py-2 font-medium text-slate-800">{s.name}</td>
                  <td className="py-2 text-right">{fmt(s.monthly)}</td>
                  <td className="py-2 text-right">{s.usesPerMonth}</td>
                  <td className="py-2 text-right">
                    {s.usesPerMonth > 0 ? fmt(cph) : <span className="text-rose-600">never</span>}
                  </td>
                  <td className="py-2">
                    <select
                      value={s.verdict}
                      onChange={(e) => setVerdict(s.id, e.target.value as Verdict)}
                      className={`rounded border px-2 py-0.5 text-xs font-semibold ${VERDICT_STYLE[s.verdict]}`}
                    >
                      <option value="keep">{VERDICT_LABEL.keep}</option>
                      <option value="review">{VERDICT_LABEL.review}</option>
                      <option value="cancel">{VERDICT_LABEL.cancel}</option>
                    </select>
                  </td>
                  <td className="py-2 text-right">
                    <button
                      type="button"
                      onClick={() => remove(s.id)}
                      aria-label={`Remove ${s.name}`}
                      className="text-xs text-slate-400 hover:text-rose-600"
                    >
                      remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Total spend</div>
          <div className="text-2xl font-bold text-slate-800">{fmt(totals.monthlyTotal)}/mo</div>
          <div className="mt-1 text-xs text-slate-500">{fmt(totals.yearlyTotal)}/yr</div>
        </div>
        <div className="rounded-lg border border-rose-300 bg-rose-50 p-4">
          <div className="text-xs uppercase tracking-wide text-rose-700">Cancel-list savings</div>
          <div className="text-2xl font-bold text-rose-900">{fmt(totals.cancelYearly)}/yr</div>
          <div className="mt-1 text-xs text-rose-800">{fmt(totals.cancelMonthly)}/mo if you act today</div>
        </div>
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
          <div className="text-xs uppercase tracking-wide text-amber-700">Review-list potential</div>
          <div className="text-2xl font-bold text-amber-900">{fmt(totals.reviewYearly)}/yr</div>
          <div className="mt-1 text-xs text-amber-800">If you cut these too</div>
        </div>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong className="text-slate-800">Auto-verdict rule:</strong> $/use over $5 with under 4
        uses/month &rarr; cancel. Over $2 and under 8 uses &rarr; review. Anything you haven&rsquo;t
        opened in 30 days is cancellable on principle &mdash; you can always re-subscribe later if
        you miss it.
      </div>
    </div>
  );
}
