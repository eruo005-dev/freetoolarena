"use client";

import { useMemo, useState } from "react";

const PROVIDERS = [
  { name: "OpenAI text-embedding-3-large", price: 0.13, dims: 3072, mteb: 64.6 },
  { name: "OpenAI text-embedding-3-small", price: 0.02, dims: 1536, mteb: 62.3 },
  { name: "Voyage 3 large",                price: 0.18, dims: 1024, mteb: 65.1 },
  { name: "Voyage 3 lite",                 price: 0.02, dims: 512,  mteb: 60.8 },
  { name: "Cohere embed-v4",               price: 0.12, dims: 1536, mteb: 63.9 },
  { name: "Gemini text-embedding-005",     price: 0.025, dims: 768, mteb: 61.5 },
  { name: "Mistral embed",                 price: 0.10, dims: 1024, mteb: 60.0 },
  { name: "BGE-M3 (self-hosted)",          price: 0.00, dims: 1024, mteb: 59.0 },
];

export function EmbeddingsCostComparison() {
  const [docs, setDocs] = useState<number>(100000);
  const [tokensPerDoc, setTokensPerDoc] = useState<number>(800);
  const [refreshes, setRefreshes] = useState<number>(1);

  const rows = useMemo(() => {
    return PROVIDERS.map((p) => {
      const totalK = docs * tokensPerDoc / 1000;
      const cost = totalK * p.price / 1000 * refreshes;
      return { ...p, cost };
    }).sort((a, b) => a.cost - b.cost);
  }, [docs, tokensPerDoc, refreshes]);

  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Documents</span>
          <input type="number" min={1} value={docs} onChange={(e) => setDocs(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Tokens / doc</span>
          <input type="number" min={1} value={tokensPerDoc} onChange={(e) => setTokensPerDoc(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Re-embeds / month</span>
          <input type="number" min={0} step={0.1} value={refreshes} onChange={(e) => setRefreshes(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Provider</th><th className="py-1">Dims</th><th className="py-1">MTEB</th><th className="py-1">$/1M tokens</th><th className="py-1 text-right">Monthly</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-slate-100">
                <td className="py-1 font-medium">{r.name}</td>
                <td className="py-1 text-slate-600">{r.dims}</td>
                <td className="py-1 text-slate-600">{r.mteb}</td>
                <td className="py-1 text-slate-600">${r.price.toFixed(2)}</td>
                <td className="py-1 text-right font-semibold">{fmt(r.cost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>MTEB</strong> is the standard public retrieval benchmark (avg of 56 tasks). 1-2 points
        of MTEB rarely matters for typical RAG; 5+ points does. Cheap models like text-embedding-3-small
        and BGE-M3 usually win the cost/quality tradeoff &mdash; reserve text-embedding-3-large or Voyage
        3 large for niche domains where retrieval recall is mission-critical.
      </div>
    </div>
  );
}
