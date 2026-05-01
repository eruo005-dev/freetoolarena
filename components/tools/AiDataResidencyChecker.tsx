"use client";

import { useState } from "react";

type Region = "us" | "eu" | "uk" | "apac" | "ca";

const PROVIDERS = [
  { name: "OpenAI", us: true, eu: true, uk: true, apac: false, ca: false, dpAddendum: "Yes (DPA available)", soc2: true, hipaa: true, note: "EU data residency requires Enterprise" },
  { name: "Anthropic", us: true, eu: true, uk: true, apac: false, ca: false, dpAddendum: "Yes", soc2: true, hipaa: true, note: "EU data residency available; Bedrock for AWS regions" },
  { name: "Google (Gemini API)", us: true, eu: true, uk: true, apac: true, ca: true, dpAddendum: "Yes", soc2: true, hipaa: true, note: "Vertex AI offers most regions; Gemini API less granular" },
  { name: "Mistral", us: true, eu: true, uk: true, apac: false, ca: false, dpAddendum: "Yes", soc2: true, hipaa: false, note: "EU-first; the default for European compliance" },
  { name: "DeepSeek", us: false, eu: false, uk: false, apac: true, ca: false, dpAddendum: "Limited", soc2: false, hipaa: false, note: "Chinese infrastructure; self-host for data residency control" },
  { name: "Cohere", us: true, eu: true, uk: true, apac: false, ca: true, dpAddendum: "Yes", soc2: true, hipaa: true, note: "Bedrock + Azure deployments cover more regions" },
  { name: "AWS Bedrock", us: true, eu: true, uk: true, apac: true, ca: true, dpAddendum: "Yes", soc2: true, hipaa: true, note: "Most flexible regional control via AWS infrastructure" },
  { name: "Azure OpenAI", us: true, eu: true, uk: true, apac: true, ca: true, dpAddendum: "Yes", soc2: true, hipaa: true, note: "GPT models with Azure regional control + EU Data Boundary" },
  { name: "Self-hosted (Llama / Qwen / DeepSeek)", us: true, eu: true, uk: true, apac: true, ca: true, dpAddendum: "N/A — your infra", soc2: false, hipaa: false, note: "Run on your own GPUs anywhere; full control" },
];

export function AiDataResidencyChecker() {
  const [region, setRegion] = useState<Region>("eu");
  const [needHipaa, setNeedHipaa] = useState<boolean>(false);
  const [needSoc2, setNeedSoc2] = useState<boolean>(true);

  const filtered = PROVIDERS.filter((p) => {
    if (!p[region]) return false;
    if (needHipaa && !p.hipaa) return false;
    if (needSoc2 && !p.soc2) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Data residency region</span>
          <select value={region} onChange={(e) => setRegion(e.target.value as Region)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="us">United States</option>
            <option value="eu">European Union</option>
            <option value="uk">United Kingdom</option>
            <option value="apac">Asia-Pacific</option>
            <option value="ca">Canada</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700 sm:mt-6">
          <input type="checkbox" checked={needSoc2} onChange={(e) => setNeedSoc2(e.target.checked)} />
          Need SOC 2 Type II
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700 sm:mt-6">
          <input type="checkbox" checked={needHipaa} onChange={(e) => setNeedHipaa(e.target.checked)} />
          Need HIPAA BAA
        </label>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-3 text-sm font-semibold text-slate-700">Compliant providers ({filtered.length})</h4>
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Provider</th><th>SOC 2</th><th>HIPAA</th><th>DPA</th><th>Notes</th></tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.name} className="border-t border-slate-100">
                <td className="py-1 font-medium">{p.name}</td>
                <td className="py-1">{p.soc2 ? <span className="text-emerald-700">&check;</span> : <span className="text-rose-700">&minus;</span>}</td>
                <td className="py-1">{p.hipaa ? <span className="text-emerald-700">&check;</span> : <span className="text-rose-700">&minus;</span>}</td>
                <td className="py-1 text-xs text-slate-600">{p.dpAddendum}</td>
                <td className="py-1 text-xs text-slate-600">{p.note}</td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={5} className="py-3 text-center text-slate-500">No providers match these constraints. Consider self-hosting.</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
        <strong>Always verify:</strong> compliance posture changes. Get the latest DPA + SOC 2 report directly from each
        vendor before signing. EU-region deployment doesn&rsquo;t guarantee EU-only data flow &mdash; check the model&rsquo;s
        own routing.
      </div>
    </div>
  );
}
