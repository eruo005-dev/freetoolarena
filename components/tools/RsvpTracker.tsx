"use client";

import { useMemo, useState } from "react";

const SAMPLE = `Alex Morgan - yes - chicken
Jordan Lee - yes - fish
Sam Rivera - yes - vegetarian
Priya Patel - yes - chicken
Marcus Chen - no
Dana Kim - maybe
Elena Rossi - yes - fish
Ben Tanaka - pending
Rachel Woods - yes - chicken
Tom Clark - no
Nina Shah - pending
Luis Ortega - yes - vegetarian
Harper Quinn - yes - chicken
Isla Brown - maybe
Owen Reed - pending`;

type Status = "yes" | "no" | "maybe" | "pending";

export function RsvpTracker() {
  const [raw, setRaw] = useState(SAMPLE);
  const [invited, setInvited] = useState(150);

  const result = useMemo(() => {
    const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
    let yes = 0;
    let no = 0;
    let maybe = 0;
    let pending = 0;
    const meals: Record<string, number> = {};
    const pendingNames: string[] = [];

    for (const line of lines) {
      const parts = line.split("-").map((p) => p.trim().toLowerCase());
      const name = line.split("-")[0]?.trim() || "";
      let status: Status = "pending";
      let meal: string | null = null;

      for (let i = 1; i < parts.length; i++) {
        const p = parts[i];
        if (p === "yes" || p === "y" || p === "accepted") status = "yes";
        else if (p === "no" || p === "n" || p === "declined") status = "no";
        else if (p === "maybe" || p === "tentative") status = "maybe";
        else if (p === "pending" || p === "?" || p === "") status = "pending";
        else if (p && status !== "pending") meal = p;
      }

      if (status === "yes") {
        yes++;
        if (meal) meals[meal] = (meals[meal] || 0) + 1;
      } else if (status === "no") no++;
      else if (status === "maybe") maybe++;
      else {
        pending++;
        if (name) pendingNames.push(name);
      }
    }

    const total = lines.length;
    const responded = yes + no + maybe;
    const responseRate = total > 0 ? (responded / total) * 100 : 0;

    const invitedSafe = Number.isFinite(invited) && invited > 0 ? invited : total;
    const projectedLow = Math.round(invitedSafe * 0.75);
    const projectedHigh = Math.round(invitedSafe * 0.85);
    const projectedFinal = yes + Math.round(maybe * 0.5) + Math.round(pending * 0.5);

    return {
      total,
      yes,
      no,
      maybe,
      pending,
      responseRate,
      meals,
      pendingNames,
      projectedLow,
      projectedHigh,
      projectedFinal,
    };
  }, [raw, invited]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Guest list (one per line &mdash; &ldquo;Name &ndash; yes/no/maybe/pending &ndash; meal&rdquo;)
          </label>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            rows={10}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-xs focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Total invited</label>
          <input
            type="number"
            min="1"
            value={invited}
            onChange={(e) => setInvited(parseInt(e.target.value, 10) || 0)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
          <p className="mt-2 text-xs text-slate-500">
            Typical RSVP yes-rate: 75&ndash;85% of invites.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="text-xs uppercase tracking-wide text-emerald-700">Accepted</div>
          <div className="mt-1 text-2xl font-semibold text-emerald-900">{result.yes}</div>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
          <div className="text-xs uppercase tracking-wide text-rose-700">Declined</div>
          <div className="mt-1 text-2xl font-semibold text-rose-900">{result.no}</div>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="text-xs uppercase tracking-wide text-amber-700">Maybe</div>
          <div className="mt-1 text-2xl font-semibold text-amber-900">{result.maybe}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-600">Pending</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">{result.pending}</div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">Response rate</div>
            <div className="mt-1 text-3xl font-semibold text-brand">
              {result.responseRate.toFixed(0)}%
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-wide text-slate-500">Projected final</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">
              {result.projectedFinal}
            </div>
            <div className="text-xs text-slate-500">
              Industry band: {result.projectedLow}&ndash;{result.projectedHigh}
            </div>
          </div>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-brand"
            style={{ width: `${Math.min(100, result.responseRate)}%` }}
          />
        </div>
      </div>

      {Object.keys(result.meals).length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-sm font-semibold text-slate-800">Meal choice tallies</div>
          <div className="mt-3 space-y-2 text-sm">
            {Object.entries(result.meals)
              .sort((a, b) => b[1] - a[1])
              .map(([meal, count]) => (
                <div
                  key={meal}
                  className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-b-0"
                >
                  <span className="capitalize text-slate-700">{meal}</span>
                  <span className="font-medium text-slate-900">{count}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {result.pendingNames.length > 0 && (
        <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
          <div className="font-semibold">
            {result.pendingNames.length} follow-up{result.pendingNames.length === 1 ? "" : "s"} needed
          </div>
          <div className="mt-1 text-amber-800">{result.pendingNames.join(", ")}</div>
        </div>
      )}
    </div>
  );
}
