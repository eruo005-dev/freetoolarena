"use client";
import { useMemo, useState } from "react";

export function RothVsTraditionalBreakeven() {
  const [contribution, setContribution] = useState("7000");
  const [nowRate, setNowRate] = useState("24");
  const [laterRate, setLaterRate] = useState("22");

  const cNum = useMemo(() => { const n = Number(contribution); return Number.isFinite(n) && n >= 0 ? n : 0; }, [contribution]);
  const nowNum = useMemo(() => { const n = Number(nowRate); return Number.isFinite(n) && n >= 0 ? n : 0; }, [nowRate]);
  const laterNum = useMemo(() => { const n = Number(laterRate); return Number.isFinite(n) && n >= 0 ? n : 0; }, [laterRate]);

  const result = useMemo(() => {
    const rothNetNow = cNum * (1 - nowNum / 100);
    const rothNetLater = cNum;
    const tradNetNow = cNum;
    const tradNetLater = cNum * (1 - laterNum / 100);
    const winner = tradNetLater > rothNetLater ? "Traditional" : rothNetLater > tradNetLater ? "Roth" : "Tie";
    return { rothNetNow, rothNetLater, tradNetNow, tradNetLater, winner };
  }, [cNum, nowNum, laterNum]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Contribution</span>
          <input type="number" value={contribution} onChange={(e) => setContribution(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Now Rate %</span>
          <input type="number" value={nowRate} onChange={(e) => setNowRate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Retire Rate %</span>
          <input type="number" value={laterRate} onChange={(e) => setLaterRate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4 space-y-1">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Roth</div>
          <div className="text-xs text-slate-600">Net now: <span className="font-mono">{fmt(result.rothNetNow)}</span></div>
          <div className="text-xs text-slate-600">Net later: <span className="font-mono">{fmt(result.rothNetLater)}</span></div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 space-y-1">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Traditional</div>
          <div className="text-xs text-slate-600">Net now: <span className="font-mono">{fmt(result.tradNetNow)}</span></div>
          <div className="text-xs text-slate-600">Net later: <span className="font-mono">{fmt(result.tradNetLater)}</span></div>
        </div>
      </div>
      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Recommended</div>
        <div className="text-2xl font-semibold tabular-nums text-brand">{result.winner}</div>
        <div className="text-xs text-slate-500 mt-1">
          {result.winner === "Roth" && "Your retirement tax rate looks similar or higher &mdash; lock in today&rsquo;s rate."}
          {result.winner === "Traditional" && "You&rsquo;ll likely be in a lower bracket at retirement &mdash; defer the tax."}
          {result.winner === "Tie" && "Both are equivalent at these rates."}
        </div>
      </div>
      <p className="text-xs text-slate-500">For guidance only &mdash; not financial advice. Assumes equal growth, ignores state taxes.</p>
    </div>
  );
}
