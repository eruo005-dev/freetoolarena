"use client";

import { useMemo, useState } from "react";

type Platform = "google" | "facebook" | "twitter" | "linkedin";

type Limits = {
  headline: number;
  description: number;
  primary?: number;
};

const LIMITS: Record<Platform, Limits> = {
  google:   { headline: 30, description: 90 },
  facebook: { headline: 40, description: 30, primary: 125 },
  twitter:  { headline: 70, description: 0,  primary: 280 },
  linkedin: { headline: 70, description: 70, primary: 150 },
};

const PLATFORM_LABELS: Record<Platform, string> = {
  google: "Google Ads",
  facebook: "Facebook Ads",
  twitter: "Twitter / X Ads",
  linkedin: "LinkedIn Ads",
};

export function AdCopyLengthChecker() {
  const [platform, setPlatform] = useState<Platform>("google");
  const [primary, setPrimary] = useState(
    "Discover 150+ free online tools for developers, marketers, and creators. Fast, private, no signup.",
  );
  const [headline, setHeadline] = useState("Free Online Tools — No Signup");
  const [description, setDescription] = useState("Fast, private, and ad-free. Try them now.");

  const limits = LIMITS[platform];

  const checks = useMemo(() => {
    const list: { field: string; value: string; max: number; show: boolean }[] = [];
    list.push({
      field: "Headline",
      value: headline,
      max: limits.headline,
      show: limits.headline > 0,
    });
    list.push({
      field: "Description",
      value: description,
      max: limits.description,
      show: limits.description > 0,
    });
    list.push({
      field: "Primary text",
      value: primary,
      max: limits.primary ?? 0,
      show: (limits.primary ?? 0) > 0,
    });
    return list.filter((c) => c.show);
  }, [headline, description, primary, limits]);

  const allPass = checks.every((c) => c.value.length <= c.max);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(LIMITS) as Platform[]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPlatform(p)}
            className={
              p === platform
                ? "rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
                : "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            }
          >
            {PLATFORM_LABELS[p]}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {limits.primary != null && (
          <label className="block sm:col-span-2">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Primary text (max {limits.primary})
            </span>
            <textarea
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
        )}
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Headline (max {limits.headline})
          </span>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        {limits.description > 0 && (
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Description (max {limits.description})
            </span>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            {PLATFORM_LABELS[platform]} limits
          </p>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              allPass
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            {allPass ? "All pass" : "Over limit"}
          </span>
        </div>
        <div className="space-y-3">
          {checks.map((c) => {
            const ratio = c.max > 0 ? c.value.length / c.max : 0;
            const over = c.value.length > c.max;
            const near = ratio > 0.9 && !over;
            const bar = over ? "bg-rose-500" : near ? "bg-amber-500" : "bg-emerald-500";
            return (
              <div key={c.field} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700">
                    {c.field}
                    <span
                      className={`ml-2 text-xs font-semibold ${
                        over ? "text-rose-600" : "text-slate-500"
                      }`}
                    >
                      {over ? "FAIL" : "PASS"}
                    </span>
                  </span>
                  <span className="tabular-nums text-slate-500">
                    {c.value.length}/{c.max}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full ${bar}`}
                    style={{ width: `${Math.min(100, ratio * 100)}%` }}
                  />
                </div>
                {over && (
                  <p className="text-sm text-rose-600">
                    {c.value.length - c.max} character
                    {c.value.length - c.max === 1 ? "" : "s"} over the limit.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          Platform reference
        </p>
        <ul className="text-sm text-slate-700 space-y-1">
          <li>Google Ads — headline 30, description 90.</li>
          <li>Facebook Ads — headline 40, primary 125 recommended, description 30.</li>
          <li>Twitter / X Ads — 280 chars total.</li>
          <li>LinkedIn Ads — headline 70, description 70, intro 150.</li>
        </ul>
      </div>
    </div>
  );
}
