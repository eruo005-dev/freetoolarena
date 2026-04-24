"use client";

import { useMemo, useState } from "react";

type Tier = "us" | "uk" | "tier2";

const TIERS: Record<Tier, { label: string; fundRate: number; programRate: number; eligible: boolean }> = {
  us: { label: "United States", fundRate: 0.03, programRate: 6, eligible: true },
  uk: { label: "United Kingdom", fundRate: 0.025, programRate: 0, eligible: false },
  tier2: { label: "Tier-2 market", fundRate: 0.02, programRate: 0, eligible: false },
};

const currency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export function TiktokCreatorFundCalculator() {
  const [viewsMillions, setViewsMillions] = useState(10);
  const [engagement, setEngagement] = useState(6);
  const [tier, setTier] = useState<Tier>("us");

  const result = useMemo(() => {
    const v = Number(viewsMillions);
    const e = Number(engagement);
    if (![v, e].every(Number.isFinite) || v <= 0) return null;

    const cfg = TIERS[tier];
    const views = v * 1_000_000;
    const engagementBoost = 1 + Math.min(0.4, (e - 3) * 0.05);

    const fund = (views / 1000) * cfg.fundRate * engagementBoost;
    const program = cfg.eligible ? (views / 1000) * cfg.programRate * engagementBoost : 0;
    const brandDeals = (views / 1_000_000) * 1500;
    const affiliate = (views / 1_000_000) * 400;

    return { fund, program, brandDeals, affiliate, eligible: cfg.eligible };
  }, [viewsMillions, engagement, tier]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Monthly views (millions)</span>
          <input
            type="number"
            min={0}
            step={0.1}
            value={viewsMillions}
            onChange={(e) => setViewsMillions(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Engagement rate (%)</span>
          <input
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={engagement}
            onChange={(e) => setEngagement(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Country tier</span>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value as Tier)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {Object.entries(TIERS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </label>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Creator Fund</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">{currency(result.fund)}</div>
              <p className="mt-1 text-xs text-slate-500">Legacy fund, ~$0.02&ndash;0.04 / 1k views. Being phased out.</p>
            </div>
            <div className="rounded-xl border border-brand/20 bg-brand/5 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Creativity Program Beta</div>
              <div className="mt-1 text-2xl font-semibold text-brand">
                {result.eligible ? currency(result.program) : "Not eligible"}
              </div>
              <p className="mt-1 text-xs text-slate-500">US only, 10k+ followers, 60s+ videos. ~$4&ndash;8 / 1k qualifying views.</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 text-sm font-semibold text-slate-900">Why direct payouts won&rsquo;t cut it</div>
            <p className="text-sm text-slate-700">
              Platform payouts on TikTok are low by design. Brand deals and affiliate pay an order of magnitude more at the same view count.
            </p>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label="Estimated brand deal value ($1.5k per 1M views)" value={currency(result.brandDeals)} />
              <Row label="Affiliate / TikTok Shop potential" value={currency(result.affiliate)} />
            </dl>
          </div>

          <ul className="list-disc space-y-1 pl-5 text-xs text-slate-500">
            <li>Treat platform revenue as a tip jar&mdash;not a salary.</li>
            <li>Pivot to email list, Shop commissions, or sponsored integrations ASAP.</li>
            <li>Engagement multiplier applied above baseline 3% ER.</li>
          </ul>
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
