"use client";
import { useMemo, useState } from "react";

export function ApiRateLimitCalculator() {
  const [rps, setRps] = useState("100");
  const [concurrency, setConcurrency] = useState("20");
  const [latency, setLatency] = useState("150");

  const result = useMemo(() => {
    const limit = Math.max(0, Number(rps) || 0);
    const conc = Math.max(1, Number(concurrency) || 1);
    const lat = Math.max(1, Number(latency) || 1);
    const theoretical = (conc * 1000) / lat;
    const effective = Math.min(limit, theoretical);
    const saturation = limit > 0 ? Math.min(100, (effective / limit) * 100) : 0;
    const headroom = Math.max(0, limit - effective);
    const burstCapacity = conc;
    const secondsToExhaust = headroom > 0 ? (burstCapacity / headroom).toFixed(2) : "inf";
    return {
      theoretical: theoretical.toFixed(2),
      effective: effective.toFixed(2),
      saturation: saturation.toFixed(1),
      headroom: headroom.toFixed(2),
      burstCapacity,
      secondsToExhaust,
      bottleneck: theoretical < limit ? "concurrency / latency" : "rate limit",
    };
  }, [rps, concurrency, latency]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Rate limit (req/sec)" value={rps} onChange={setRps} />
        <Field label="Concurrency" value={concurrency} onChange={setConcurrency} />
        <Field label="Avg latency (ms)" value={latency} onChange={setLatency} />
      </div>

      <div className="rounded-xl bg-slate-50 p-4 space-y-2">
        <Row k="Theoretical throughput" v={`${result.theoretical} req/s`} />
        <Row k="Effective throughput" v={`${result.effective} req/s`} />
        <Row k="Saturation" v={`${result.saturation}%`} />
        <Row k="Headroom" v={`${result.headroom} req/s`} />
        <Row k="Bottleneck" v={result.bottleneck} />
        <Row k="Burst budget" v={`${result.burstCapacity} in-flight`} />
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 space-y-1">
        <div className="font-semibold">Break-glass actions</div>
        <ul className="list-disc pl-5 space-y-0.5">
          <li>Shed load: return 429 with Retry-After before hitting the limit.</li>
          <li>Add client-side jitter + exponential backoff.</li>
          <li>Cache hot reads &mdash; CDN, Redis, or HTTP Cache-Control.</li>
          <li>Raise concurrency only if p95 latency is stable.</li>
          <li>Split by tenant / API key to prevent noisy neighbors.</li>
        </ul>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (s: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">{label}</span>
      <input
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono tabular-nums"
      />
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">{k}</span>
      <span className="font-mono tabular-nums text-slate-800">{v}</span>
    </div>
  );
}
