"use client";

import { useState } from "react";

type Cat = "all" | "text2video" | "image2video" | "lipsync" | "open";

const TOOLS = [
  { name: "Sora 2", vendor: "OpenAI", cat: ["text2video"], price: "ChatGPT Plus / Pro", maxSec: "20s", quality: 95, control: "Medium", note: "Best cinematography; physics-aware" },
  { name: "Veo 3", vendor: "Google", cat: ["text2video", "image2video"], price: "Gemini Advanced / Ultra", maxSec: "8-15s", quality: 92, control: "High", note: "Best controllability; native audio" },
  { name: "Runway Gen-4", vendor: "Runway", cat: ["text2video", "image2video"], price: "$15-95/mo", maxSec: "10s", quality: 88, control: "Highest", note: "Director Mode + camera controls" },
  { name: "Kling 2.5", vendor: "Kuaishou", cat: ["text2video", "image2video", "lipsync"], price: "$10-50/mo", maxSec: "10s", quality: 86, control: "Medium", note: "Strong on motion; pro tier unlocks 4K" },
  { name: "Pika 2.5", vendor: "Pika", cat: ["text2video", "image2video"], price: "$10-58/mo", maxSec: "10s", quality: 80, control: "Medium", note: "Fast iteration, social-ready outputs" },
  { name: "Hedra Character-2", vendor: "Hedra", cat: ["lipsync"], price: "$10-30/mo", maxSec: "60s", quality: 88, control: "High", note: "Best face/lipsync from photo + audio" },
  { name: "Higgsfield", vendor: "Higgsfield", cat: ["lipsync", "image2video"], price: "$15-49/mo", maxSec: "8s", quality: 82, control: "Medium", note: "Director Camera + Soul ID for character consistency" },
  { name: "Luma Dream Machine 2", vendor: "Luma", cat: ["text2video", "image2video"], price: "$10-95/mo", maxSec: "5s", quality: 80, control: "Medium", note: "Fast, cheap, decent quality" },
  { name: "HunyuanVideo", vendor: "Tencent", cat: ["text2video", "open"], price: "Free (self-host)", maxSec: "8s", quality: 78, control: "Low", note: "Open weights; needs serious GPU" },
  { name: "CogVideoX-5B", vendor: "Zhipu AI", cat: ["text2video", "open"], price: "Free (self-host)", maxSec: "6s", quality: 72, control: "Low", note: "Smaller open-weight model; runs on RTX 4090" },
];

export function AiVideoToolTracker() {
  const [filter, setFilter] = useState<Cat>("all");
  const list = TOOLS.filter((t) => filter === "all" || t.cat.includes(filter)).sort((a, b) => b.quality - a.quality);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(["all", "text2video", "image2video", "lipsync", "open"] as Cat[]).map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`rounded-full border px-3 py-1 text-xs ${filter === c ? "border-brand bg-brand text-white" : "border-slate-300 bg-white text-slate-700"}`}>{c}</button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Tool</th><th>Vendor</th><th>Pricing</th><th>Max length</th><th>Quality</th><th>Control</th><th>Notes</th></tr>
          </thead>
          <tbody>
            {list.map((t) => (
              <tr key={t.name} className="border-t border-slate-100">
                <td className="py-1 font-medium text-slate-800">{t.name}</td>
                <td className="py-1 text-slate-600">{t.vendor}</td>
                <td className="py-1 text-xs text-slate-600">{t.price}</td>
                <td className="py-1 text-slate-600">{t.maxSec}</td>
                <td className="py-1 text-slate-600">{t.quality}</td>
                <td className="py-1 text-slate-600">{t.control}</td>
                <td className="py-1 text-xs text-slate-600">{t.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        Quality is a composite of motion coherence + photo realism + prompt adherence (1-100, higher better). Real workflow:
        Midjourney for keyframe &rarr; Runway Gen-4 for image-to-video &rarr; Sora / Veo for the long shots &rarr; Topaz upscale.
      </div>

      <div className="rounded border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
        <strong>Data transparency:</strong> tracker verified <strong>2026-04-30</strong> against vendor
        product pages. Quality scores are an editorial composite, not a benchmark; treat them as a
        starting point and run your own A/B tests on real prompts before committing to a workflow. See{" "}
        <a href="/source" className="underline">source &amp; transparency</a>.
      </div>
    </div>
  );
}
