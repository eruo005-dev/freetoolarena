"use client";

import { useMemo, useState } from "react";

type Provider = "claude" | "openai" | "gemini";

const RATES: Record<Provider, { in: number; cacheWrite: number; cacheRead: number; out: number; ttlMin: number }> = {
  claude:  { in: 3.00,  cacheWrite: 3.75,  cacheRead: 0.30,  out: 15.00, ttlMin: 5 },
  openai:  { in: 2.50,  cacheWrite: 2.50,  cacheRead: 1.25,  out: 10.00, ttlMin: 60 },
  gemini:  { in: 1.25,  cacheWrite: 1.25,  cacheRead: 0.31,  out: 5.00,  ttlMin: 60 },
};

const LABEL: Record<Provider, string> = {
  claude: "Claude Sonnet 4.6 (5-min cache)",
  openai: "GPT-5 (auto cache)",
  gemini: "Gemini 2.5 Pro (context cache)",
};

export function PromptCacheSavingsCalculator() {
  const [provider, setProvider] = useState<Provider>("claude");
  const [systemTokens, setSystemTokens] = useState<number>(20);
  const [userTokens, setUserTokens] = useState<number>(2);
  const [outputTokens, setOutputTokens] = useState<number>(5);
  const [callsPerHour, setCallsPerHour] = useState<number>(60);

  const result = useMemo(() => {
    const r = RATES[provider];
    const calls = callsPerHour * 24 * 30;

    const noCache = ((systemTokens + userTokens) * r.in + outputTokens * r.out) / 1000 * calls;

    const reuses = Math.max(0, callsPerHour * (r.ttlMin / 60) - 1);
    const writesPerHour = callsPerHour - reuses;
    const writes = writesPerHour * 24 * 30;
    const reads = calls - writes;

    const cached =
      (systemTokens * r.cacheWrite * writes
        + systemTokens * r.cacheRead * reads
        + userTokens * r.in * calls
        + outputTokens * r.out * calls) / 1000;

    const savings = noCache - cached;
    const pctSaved = noCache > 0 ? savings / noCache : 0;

    return { noCache, cached, savings, pctSaved };
  }, [provider, systemTokens, userTokens, outputTokens, callsPerHour]);

  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Provider</span>
          <select value={provider} onChange={(e) => setProvider(e.target.value as Provider)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="claude">{LABEL.claude}</option>
            <option value="openai">{LABEL.openai}</option>
            <option value="gemini">{LABEL.gemini}</option>
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Calls / hour</span>
          <input type="number" min={1} value={callsPerHour} onChange={(e) => setCallsPerHour(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">System / cacheable prefix (k tokens)</span>
          <input type="number" min={0} value={systemTokens} onChange={(e) => setSystemTokens(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Per-call user tokens (k)</span>
          <input type="number" min={0} value={userTokens} onChange={(e) => setUserTokens(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Output tokens (k)</span>
          <input type="number" min={0} value={outputTokens} onChange={(e) => setOutputTokens(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-rose-300 bg-rose-50 p-4">
          <div className="text-xs uppercase tracking-wide text-rose-700">Without cache</div>
          <div className="text-2xl font-bold text-rose-900">{fmt(result.noCache)}/mo</div>
        </div>
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4">
          <div className="text-xs uppercase tracking-wide text-emerald-700">With cache</div>
          <div className="text-2xl font-bold text-emerald-900">{fmt(result.cached)}/mo</div>
        </div>
        <div className="rounded-lg border border-brand bg-blue-50 p-4">
          <div className="text-xs uppercase tracking-wide text-brand">Savings</div>
          <div className="text-2xl font-bold text-brand">{fmt(result.savings)}</div>
          <div className="text-xs text-brand">{(result.pctSaved * 100).toFixed(0)}% off</div>
        </div>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong className="text-slate-800">How it works:</strong> Anthropic, OpenAI, and Google all
        let you cache stable prompt prefixes (system messages, RAG context, few-shot examples).
        Cached reads cost ~10% of normal input tokens. Cache TTL: Claude 5 min default (configurable),
        OpenAI/Gemini 1 hour. The fix: keep your stable prefix at the START of every call.
      </div>
    </div>
  );
}
