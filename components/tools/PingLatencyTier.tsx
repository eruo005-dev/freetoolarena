"use client";

import { useMemo, useState } from "react";

type Tier = { label: string; color: string; explain: string };

function tierFor(ping: number): Tier {
  if (ping < 20) return { label: "Excellent", color: "text-emerald-700 bg-emerald-50", explain: "Imperceptible \u2014 you\u2019re effectively on a LAN." };
  if (ping < 40) return { label: "Great", color: "text-emerald-700 bg-emerald-50", explain: "Competitive-ready for twitch shooters." };
  if (ping < 60) return { label: "Good", color: "text-sky-700 bg-sky-50", explain: "Fine for any game, pro trades still feel clean." };
  if (ping < 80) return { label: "OK", color: "text-sky-700 bg-sky-50", explain: "Fine for MOBAs and BRs, peekers start winning trades in FPS." };
  if (ping < 100) return { label: "Noticeable", color: "text-amber-700 bg-amber-50", explain: "Rubber-banding rare, aim-punch and trades feel slightly off." };
  if (ping < 150) return { label: "Bad", color: "text-rose-700 bg-rose-50", explain: "Hit-reg suffers, you\u2019ll lose most peek duels." };
  return { label: "Painful", color: "text-rose-700 bg-rose-50", explain: "Play casually \u2014 competitive matchmaking will be frustrating." };
}

export function PingLatencyTier() {
  const [pingStr, setPingStr] = useState("35");

  const ping = Number(pingStr);
  const valid = Number.isFinite(ping) && ping >= 0;

  const tier = useMemo(() => tierFor(valid ? ping : 0), [ping, valid]);
  // one-way latency = ping/2. light travels ~300 km/ms in fiber ~200 km/ms effective.
  // round-trip distance estimate: ping * 100 km (rough rule).
  const distKm = useMemo(() => (valid ? ping * 100 : 0), [ping, valid]);
  const jitter = useMemo(() => (valid ? ping * 0.1 : 0), [ping, valid]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Ping (ms)</span>
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          inputMode="decimal"
          value={pingStr}
          onChange={(e) => setPingStr(e.target.value)}
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Tier</div>
          <div className={`mt-1 inline-block rounded-full px-2 py-0.5 text-sm font-semibold ${tier.color}`}>{tier.label}</div>
          <div className="text-xs text-slate-600 mt-2">{tier.explain}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Rough server distance</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">{valid ? distKm.toFixed(0) + " km" : "\u2014"}</div>
          <div className="text-[10px] text-slate-500 mt-1">round-trip, fiber-speed estimate</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Est. jitter budget</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">{valid ? "\u00b1" + jitter.toFixed(1) + " ms" : "\u2014"}</div>
          <div className="text-[10px] text-slate-500 mt-1">heuristic: ~10% of ping</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Competitive thresholds</div>
          <div className="text-sm text-slate-700 mt-1">FPS: &le; 40 ms ideal<br />MOBAs: &le; 80 ms fine<br />Turn-based: &le; 200 ms fine</div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-100 px-4 py-2 text-xs uppercase tracking-wide font-semibold text-slate-600">
          Tier reference
        </div>
        <table className="w-full text-sm">
          <tbody>
            {[
              ["< 20 ms", "Excellent"],
              ["20\u201340 ms", "Great"],
              ["40\u201360 ms", "Good"],
              ["60\u201380 ms", "OK"],
              ["80\u2013100 ms", "Noticeable"],
              ["100\u2013150 ms", "Bad"],
              ["150+ ms", "Painful"],
            ].map(([range, label]) => (
              <tr key={range} className="border-t border-slate-200">
                <td className="px-4 py-2 font-mono tabular-nums text-slate-700">{range}</td>
                <td className="px-4 py-2 text-right text-slate-900">{label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">
        Pure client-side heuristic &mdash; this doesn&rsquo;t run an actual ping test. Use it to interpret numbers from your in-game netgraph or a CLI ping.
      </p>
    </div>
  );
}
