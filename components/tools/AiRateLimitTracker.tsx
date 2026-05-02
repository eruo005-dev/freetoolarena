"use client";

import { useMemo, useState } from "react";

type Plan = { provider: string; tier: string; price: string; rpm: number | string; tpm: number | string; rpd: number | string; notes: string };

const PLANS: Plan[] = [
  { provider: "Anthropic", tier: "Tier 1 ($5 funded)",    price: "$5+",  rpm: 50,  tpm: "20k",   rpd: "—",      notes: "Day-1 cap; raises with usage" },
  { provider: "Anthropic", tier: "Tier 4 (sustained)",    price: "$200+", rpm: 4000, tpm: "1M",   rpd: "—",      notes: "Granted ~30 days of usage" },
  { provider: "Anthropic", tier: "Claude Pro",            price: "$20/mo", rpm: "—", tpm: "—",   rpd: "5x usage", notes: "Hourly + weekly caps" },
  { provider: "Anthropic", tier: "Claude Max 5x",         price: "$100/mo",rpm: "—", tpm: "—",   rpd: "20x usage", notes: "Higher weekly cap" },
  { provider: "OpenAI",    tier: "Tier 1 (after $5)",     price: "$5+",  rpm: 500, tpm: "200k", rpd: "10k",    notes: "GPT-5 = 30k TPM here" },
  { provider: "OpenAI",    tier: "Tier 5 (sustained)",    price: "$1000+",rpm:10000,tpm: "30M",  rpd: "—",      notes: "Prod-tier" },
  { provider: "OpenAI",    tier: "ChatGPT Plus",          price: "$20/mo",rpm: "—", tpm: "—",   rpd: "GPT-5: 200/3h", notes: "Plus throttles when busy" },
  { provider: "OpenAI",    tier: "ChatGPT Pro",           price: "$200/mo",rpm:"—", tpm: "—",   rpd: "Higher",  notes: "Pro uses o-pro reasoning" },
  { provider: "Google",    tier: "Gemini API Free",       price: "$0",   rpm: 5,   tpm: "1M",   rpd: "25",     notes: "Hard rate-limit" },
  { provider: "Google",    tier: "Gemini API Tier 1",     price: "Pay",  rpm: 1000,tpm: "4M",   rpd: "—",      notes: "Most apps land here" },
  { provider: "Google",    tier: "Gemini Advanced",       price: "$20/mo",rpm:"—",  tpm: "—",   rpd: "Generous", notes: "1-day cooldown if hammered" },
  { provider: "DeepSeek",  tier: "API",                   price: "Pay",  rpm: "—",  tpm: "—",   rpd: "—",      notes: "No published rate limit" },
  { provider: "Perplexity",tier: "Pro",                   price: "$20/mo",rpm: "—", tpm: "—",   rpd: "300/day Pro Search", notes: "+ unlimited quick search" },
  { provider: "xAI",       tier: "Grok API",              price: "Pay",  rpm: 60,  tpm: "10k",  rpd: "—",      notes: "Day-1 default" },
];

type Sortable = "rpm" | "tpm" | "rpd";

export function AiRateLimitTracker() {
  const [provider, setProvider] = useState<string>("all");

  const rows = useMemo(() => {
    return PLANS.filter((p) => provider === "all" || p.provider === provider);
  }, [provider]);

  const providers = ["all", ...Array.from(new Set(PLANS.map((p) => p.provider)))];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {providers.map((p) => (
          <button key={p} onClick={() => setProvider(p)} className={`rounded-full border px-3 py-1 text-xs ${provider === p ? "border-brand bg-brand text-white" : "border-slate-300 bg-white text-slate-700"}`}>
            {p}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Provider</th><th className="py-1">Plan</th><th className="py-1">Price</th><th className="py-1">RPM</th><th className="py-1">TPM</th><th className="py-1">Daily</th><th className="py-1">Notes</th></tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={`${r.provider}-${r.tier}-${i}`} className="border-t border-slate-100">
                <td className="py-1 font-medium">{r.provider}</td>
                <td className="py-1 text-slate-600">{r.tier}</td>
                <td className="py-1 text-slate-600">{r.price}</td>
                <td className="py-1 text-slate-600">{r.rpm}</td>
                <td className="py-1 text-slate-600">{r.tpm}</td>
                <td className="py-1 text-slate-600">{r.rpd}</td>
                <td className="py-1 text-xs text-slate-600">{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
        <strong>Hitting limits early?</strong> All providers raise tiers based on cumulative spend +
        days-since-first-payment. Anthropic auto-promotes; OpenAI auto-promotes after 7 days at each
        tier. To avoid 429s in production, build retry-with-exponential-backoff into your client and
        use the streaming response API (it bills only what you actually generate).
      </div>

      <div className="rounded border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
        <strong>Data transparency:</strong> rate limits verified against provider documentation on{" "}
        <strong>2026-04-30</strong>. Tier thresholds change without notice — confirm directly in your
        provider console before architecting around specific numbers. See{" "}
        <a href="/source" className="underline">source &amp; transparency</a> for full sourcing.
      </div>
    </div>
  );
}
