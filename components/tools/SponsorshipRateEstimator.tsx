"use client";

import { useMemo, useState } from "react";

type Platform = "youtube" | "instagram" | "tiktok" | "twitch" | "podcast" | "newsletter";
type Niche = "tech" | "lifestyle" | "finance" | "fitness" | "beauty" | "gaming";

const PLATFORMS: { value: Platform; label: string; audienceLabel: string }[] = [
  { value: "youtube", label: "YouTube", audienceLabel: "Subscribers" },
  { value: "instagram", label: "Instagram", audienceLabel: "Followers" },
  { value: "tiktok", label: "TikTok", audienceLabel: "Followers" },
  { value: "twitch", label: "Twitch", audienceLabel: "Avg concurrent viewers" },
  { value: "podcast", label: "Podcast", audienceLabel: "Downloads per episode" },
  { value: "newsletter", label: "Newsletter", audienceLabel: "Subscribers" },
];

const NICHES: { value: Niche; label: string; modifier: number }[] = [
  { value: "finance", label: "Finance / Business", modifier: 2.0 },
  { value: "tech", label: "Tech / SaaS", modifier: 1.4 },
  { value: "beauty", label: "Beauty / Fashion", modifier: 1.5 },
  { value: "fitness", label: "Fitness / Health", modifier: 1.2 },
  { value: "lifestyle", label: "Lifestyle / Vlog", modifier: 1.0 },
  { value: "gaming", label: "Gaming", modifier: 0.8 },
];

function erModifier(er: number): number {
  if (!Number.isFinite(er) || er <= 0) return 1;
  if (er >= 10) return 1.7;
  if (er >= 5) return 1.3;
  if (er >= 3) return 1.15;
  if (er >= 2) return 1.0;
  return 0.85;
}

function baseRate(platform: Platform, audience: number): { low: number; high: number; note: string } {
  if (!Number.isFinite(audience) || audience <= 0) return { low: 0, high: 0, note: "" };
  switch (platform) {
    case "youtube": {
      const low = (audience / 1000) * 20;
      const high = (audience / 1000) * 50;
      return { low, high, note: "Mid-roll to dedicated video range." };
    }
    case "instagram": {
      const low = (audience / 10000) * 100;
      const high = (audience / 10000) * 300;
      return { low, high, note: "Post (low) to Reel (high)." };
    }
    case "tiktok": {
      const low = (audience / 10000) * 25;
      const high = (audience / 10000) * 50;
      return { low, high, note: "Per branded video." };
    }
    case "twitch": {
      const low = audience * 1;
      const high = audience * 5;
      return { low, high, note: "Per sponsored stream by CCV." };
    }
    case "podcast": {
      const low = (audience / 1000) * 15;
      const high = (audience / 1000) * 25;
      return { low, high, note: "Host-read CPM per episode." };
    }
    case "newsletter": {
      const low = (audience / 1000) * 30;
      const high = (audience / 1000) * 50;
      return { low, high, note: "Primary sponsor CPM." };
    }
  }
}

export function SponsorshipRateEstimator() {
  const [platform, setPlatform] = useState<Platform>("youtube");
  const [audience, setAudience] = useState<number>(50000);
  const [er, setEr] = useState<number>(4);
  const [niche, setNiche] = useState<Niche>("tech");

  const result = useMemo(() => {
    const base = baseRate(platform, audience);
    const nicheMod = NICHES.find((n) => n.value === niche)?.modifier ?? 1;
    const erMod = erModifier(er);
    const multiplier = nicheMod * erMod;
    const low = base.low * multiplier;
    const high = base.high * multiplier;
    const mid = (low + high) / 2;
    return { low, mid, high, note: base.note, nicheMod, erMod };
  }, [platform, audience, er, niche]);

  const fmt = (n: number) =>
    Number.isFinite(n)
      ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
      : "$0";

  const platformMeta = PLATFORMS.find((p) => p.value === platform)!;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Platform</span>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          >
            {PLATFORMS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Niche</span>
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value as Niche)}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          >
            {NICHES.map((n) => (
              <option key={n.value} value={n.value}>
                {n.label} ({n.modifier.toFixed(2)}x)
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">{platformMeta.audienceLabel}</span>
          <input
            type="number"
            min={0}
            value={audience}
            onChange={(e) => setAudience(Number(e.target.value))}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Engagement rate (%)</span>
          <input
            type="number"
            min={0}
            step={0.1}
            value={er}
            onChange={(e) => setEr(Number(e.target.value))}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-base font-semibold text-brand">Estimated sponsorship rate</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-md bg-white p-3 shadow-sm">
            <div className="text-xs uppercase text-slate-500">Low</div>
            <div className="text-xl font-bold text-slate-900">{fmt(result.low)}</div>
          </div>
          <div className="rounded-md bg-white p-3 shadow-sm ring-2 ring-brand/40">
            <div className="text-xs uppercase text-slate-500">Mid</div>
            <div className="text-xl font-bold text-brand">{fmt(result.mid)}</div>
          </div>
          <div className="rounded-md bg-white p-3 shadow-sm">
            <div className="text-xs uppercase text-slate-500">High</div>
            <div className="text-xl font-bold text-slate-900">{fmt(result.high)}</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-600">
          {result.note} Niche {result.nicheMod.toFixed(2)}x &mdash; engagement {result.erMod.toFixed(2)}x.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
        <h4 className="font-semibold text-slate-900">Negotiation tips</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Open at the high number &mdash; brands expect you&rsquo;ll negotiate down, not up.</li>
          <li>Bundle deliverables (post + story + usage rights) rather than discounting the flat rate.</li>
          <li>Charge extra for exclusivity windows, whitelisting, and paid-ad usage.</li>
          <li>If engagement is above 5%, lean into that &mdash; it&rsquo;s worth more than raw follower count.</li>
        </ul>
      </div>
    </div>
  );
}
