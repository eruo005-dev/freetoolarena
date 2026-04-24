"use client";

import { useMemo, useState } from "react";

const BENCHMARKS = [
  { bucket: "Under 1k", median: 6.0 },
  { bucket: "1k &ndash; 10k", median: 4.5 },
  { bucket: "10k &ndash; 100k", median: 3.0 },
  { bucket: "100k &ndash; 1M", median: 2.0 },
  { bucket: "Over 1M", median: 1.1 },
];

function tierOf(er: number): { label: string; color: string; note: string } {
  if (er < 1) return { label: "Dying", color: "text-red-600", note: "Below 1% signals algorithmic decay or a bought audience." };
  if (er < 3) return { label: "Average", color: "text-slate-700", note: "Typical for established accounts. Room to grow." };
  if (er < 6) return { label: "Good", color: "text-emerald-600", note: "Solid. Brands will start to notice at this rate." };
  if (er < 10) return { label: "Great", color: "text-brand", note: "Top decile. Premium rates on brand deals." };
  return { label: "Elite", color: "text-brand", note: "Rare territory&mdash;niche experts, UGC creators, cult followings." };
}

export function InstagramEngagementRate() {
  const [followers, setFollowers] = useState(15000);
  const [likes, setLikes] = useState(650);
  const [comments, setComments] = useState(35);
  const [saves, setSaves] = useState(80);

  const result = useMemo(() => {
    const f = Number(followers);
    const l = Number(likes);
    const c = Number(comments);
    const s = Number(saves);
    if (![f, l, c, s].every(Number.isFinite) || f <= 0) return null;

    const er = ((l + c + s) / f) * 100;
    const erNoSaves = ((l + c) / f) * 100;
    const t = tierOf(er);
    return { er, erNoSaves, tier: t };
  }, [followers, likes, comments, saves]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Follower count</span>
          <input
            type="number"
            min={0}
            value={followers}
            onChange={(e) => setFollowers(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Average likes per post</span>
          <input
            type="number"
            min={0}
            value={likes}
            onChange={(e) => setLikes(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Average comments per post</span>
          <input
            type="number"
            min={0}
            value={comments}
            onChange={(e) => setComments(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Average saves + shares (optional)</span>
          <input
            type="number"
            min={0}
            value={saves}
            onChange={(e) => setSaves(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-brand/20 bg-brand/5 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Engagement rate</div>
              <div className="mt-1 text-3xl font-semibold text-brand">{result.er.toFixed(2)}%</div>
              <div className={`mt-1 text-sm font-medium ${result.tier.color}`}>{result.tier.label}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">ER without saves</div>
              <div className="mt-1 text-3xl font-semibold text-slate-900">{result.erNoSaves.toFixed(2)}%</div>
              <p className="mt-1 text-xs text-slate-500">Older convention brands sometimes use.</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <span className="font-semibold">Verdict:</span>{" "}
            <span dangerouslySetInnerHTML={{ __html: result.tier.note }} />
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 text-sm font-semibold text-slate-900">Median ER by audience size</div>
            <p className="mb-2 text-xs text-slate-500">Smaller accounts run higher naturally&mdash;don&rsquo;t panic when ER drops as you scale.</p>
            <div className="divide-y divide-slate-200">
              {BENCHMARKS.map((b) => (
                <div key={b.bucket} className="flex items-center justify-between py-1.5 text-sm">
                  <span className="text-slate-700" dangerouslySetInnerHTML={{ __html: b.bucket }} />
                  <span className="font-medium text-slate-900">~{b.median.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
