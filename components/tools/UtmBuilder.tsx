"use client";

import { useMemo, useState } from "react";

type Preset = {
  label: string;
  source: string;
  medium: string;
  campaign: string;
};

const PRESETS: Preset[] = [
  { label: "Newsletter", source: "newsletter", medium: "email", campaign: "weekly_update" },
  { label: "Social", source: "twitter", medium: "social", campaign: "launch" },
  { label: "Paid search", source: "google", medium: "cpc", campaign: "brand" },
  { label: "Paid social", source: "facebook", medium: "paid-social", campaign: "spring_sale" },
  { label: "Affiliate", source: "partner", medium: "affiliate", campaign: "q2_referral" },
  { label: "Display", source: "display", medium: "banner", campaign: "retargeting" },
];

export function UtmBuilder() {
  const [baseUrl, setBaseUrl] = useState("https://freetoolarea.com/");
  const [source, setSource] = useState("newsletter");
  const [medium, setMedium] = useState("email");
  const [campaign, setCampaign] = useState("weekly_update");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  const urlError = useMemo(() => {
    if (!baseUrl.trim()) return "Base URL is required.";
    try {
      new URL(baseUrl);
      return null;
    } catch {
      return "Base URL is not a valid URL (must include https:// or http://).";
    }
  }, [baseUrl]);

  const missing: string[] = [];
  if (!source.trim()) missing.push("utm_source");
  if (!medium.trim()) missing.push("utm_medium");
  if (!campaign.trim()) missing.push("utm_campaign");

  const fullUrl = useMemo(() => {
    if (urlError) return "";
    try {
      const u = new URL(baseUrl);
      if (source.trim()) u.searchParams.set("utm_source", source.trim());
      if (medium.trim()) u.searchParams.set("utm_medium", medium.trim());
      if (campaign.trim()) u.searchParams.set("utm_campaign", campaign.trim());
      if (term.trim()) u.searchParams.set("utm_term", term.trim());
      if (content.trim()) u.searchParams.set("utm_content", content.trim());
      return u.toString();
    } catch {
      return "";
    }
  }, [baseUrl, source, medium, campaign, term, content, urlError]);

  async function copy() {
    if (!fullUrl) return;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  function applyPreset(p: Preset) {
    setSource(p.source);
    setMedium(p.medium);
    setCampaign(p.campaign);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Base URL
        </span>
        <input
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="https://example.com/landing"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
        {urlError && <p className="text-sm text-rose-600 mt-1">{urlError}</p>}
      </label>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          Presets
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => applyPreset(p)}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            utm_source <span className="text-rose-600">*</span>
          </span>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="google"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            utm_medium <span className="text-rose-600">*</span>
          </span>
          <input
            type="text"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            placeholder="cpc"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            utm_campaign <span className="text-rose-600">*</span>
          </span>
          <input
            type="text"
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
            placeholder="spring_sale"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            utm_term (optional)
          </span>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="running+shoes"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            utm_content (optional)
          </span>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="logolink"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
      </div>

      {missing.length > 0 && !urlError && (
        <p className="text-sm text-amber-700">
          Missing required parameter{missing.length > 1 ? "s" : ""}: {missing.join(", ")}
        </p>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Tagged URL
          </p>
          <button
            type="button"
            onClick={copy}
            disabled={!fullUrl}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono whitespace-pre-wrap break-all">
          {fullUrl || "— fill in the required fields above —"}
        </pre>
      </div>
    </div>
  );
}
