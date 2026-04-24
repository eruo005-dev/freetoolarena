"use client";

import { useMemo, useState } from "react";

type Niche = "finance" | "tech" | "gaming" | "vlog" | "music" | "kids";

const NICHES: Record<Niche, { label: string; cpm: number; modifier: number }> = {
  finance: { label: "Finance / Business ($15 CPM)", cpm: 15, modifier: 1.1 },
  tech: { label: "Tech / Reviews ($8 CPM)", cpm: 8, modifier: 1.05 },
  gaming: { label: "Gaming ($5 CPM)", cpm: 5, modifier: 1.0 },
  vlog: { label: "Vlog / Lifestyle ($4 CPM)", cpm: 4, modifier: 0.95 },
  music: { label: "Music ($2 CPM)", cpm: 2, modifier: 0.9 },
  kids: { label: "Kids ($0.50 CPM)", cpm: 0.5, modifier: 0.85 },
};

const currency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export function YoutubeRevenueEstimator() {
  const [views, setViews] = useState(500000);
  const [watchPct, setWatchPct] = useState(50);
  const [niche, setNiche] = useState<Niche>("tech");
  const [subscribers, setSubscribers] = useState(25000);

  const result = useMemo(() => {
    const v = Number(views);
    const w = Number(watchPct);
    const s = Number(subscribers);
    if (![v, w, s].every(Number.isFinite) || v <= 0) return null;

    const cfg = NICHES[niche];
    const subBoost = 1 + Math.min(0.15, s / 1_000_000 * 0.05);
    const rpm = cfg.cpm * 0.55 * (w / 100) * cfg.modifier * subBoost;
    const monthly = (v / 1000) * rpm;
    const yearly = monthly * 12;
    const per100k = rpm * 100;

    const memberships = s * 0.05 * 5 * 0.7;
    const superChats = 50 * 4;
    const sponsorships = (s / 1000) * 20;
    const adRev = monthly;
    const total = adRev + memberships + superChats + sponsorships;

    return { rpm, monthly, yearly, per100k, memberships, superChats, sponsorships, adRev, total };
  }, [views, watchPct, niche, subscribers]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Monthly views</span>
          <input
            type="number"
            min={0}
            value={views}
            onChange={(e) => setViews(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Avg watch time (%)</span>
          <input
            type="number"
            min={0}
            max={100}
            value={watchPct}
            onChange={(e) => setWatchPct(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Niche</span>
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value as Niche)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {Object.entries(NICHES).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Subscribers</span>
          <input
            type="number"
            min={0}
            value={subscribers}
            onChange={(e) => setSubscribers(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-brand/20 bg-brand/5 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Effective RPM</div>
              <div className="mt-1 text-2xl font-semibold text-brand">{currency(result.rpm)}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Ad rev / month</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">{currency(result.monthly)}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Ad rev / year</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">{currency(result.yearly)}</div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 text-sm font-semibold text-slate-900">Revenue stack (monthly)</div>
            <dl className="space-y-2 text-sm">
              <Row label="YouTube ads (after 45% cut)" value={currency(result.adRev)} />
              <Row label="Channel memberships (5% join @ $5)" value={currency(result.memberships)} />
              <Row label="Super Chats (~4 streams/mo)" value={currency(result.superChats)} />
              <Row label="Sponsorships ($20 per 1k subs)" value={currency(result.sponsorships)} />
              <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-base font-semibold">
                <span>Total monthly</span>
                <span className="text-brand">{currency(result.total)}</span>
              </div>
            </dl>
          </div>

          <p className="text-xs text-slate-500">
            Per 100k views benchmark: <strong>{currency(result.per100k)}</strong>. Watch-time &amp; niche drive RPM more than raw view count&mdash;optimize retention first.
          </p>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-slate-700">
      <span>{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  );
}
