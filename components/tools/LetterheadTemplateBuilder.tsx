"use client";

import { useState } from "react";

export function LetterheadTemplateBuilder() {
  const [name, setName] = useState<string>("Acme & Sons LLC");
  const [tagline, setTagline] = useState<string>("Custom millwork since 1972");
  const [address, setAddress] = useState<string>("221 Baker Street\nLondon, NW1 6XE\nUnited Kingdom");
  const [phone, setPhone] = useState<string>("+44 20 7224 3688");
  const [email, setEmail] = useState<string>("hello@acme.example");
  const [website, setWebsite] = useState<string>("acme.example");
  const [accent, setAccent] = useState<string>("#1e40af");

  const handlePrint = () => window.print();

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 print:hidden">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Business name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Tagline (optional)</span>
          <input value={tagline} onChange={(e) => setTagline(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Address</span>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Phone</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
          <span className="mb-1 mt-3 block font-medium text-slate-700">Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
          <span className="mb-1 mt-3 block font-medium text-slate-700">Website</span>
          <input value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Accent color</span>
          <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="h-10 w-20 rounded border border-slate-300" />
        </label>
      </div>

      <button type="button" onClick={handlePrint} className="rounded bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark print:hidden">
        Print / save as PDF
      </button>

      <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm print:border-0 print:shadow-none print:p-0">
        <style>{`@media print { @page { margin: 0.75in; } }`}</style>
        <div style={{ borderBottom: `3px solid ${accent}`, paddingBottom: "1rem" }}>
          <div className="flex items-end justify-between">
            <div>
              <h1 style={{ color: accent }} className="text-3xl font-bold tracking-tight">{name}</h1>
              {tagline && <p className="mt-1 text-sm italic text-slate-600">{tagline}</p>}
            </div>
            <div className="text-right text-xs text-slate-700">
              <div className="whitespace-pre-line">{address}</div>
              <div className="mt-1">{phone}</div>
              <div>{email}</div>
              <div>{website}</div>
            </div>
          </div>
        </div>

        <div className="mt-12 min-h-[8in] text-sm text-slate-800">
          <p className="mb-4">[Date]</p>
          <p className="mb-4">[Recipient name]<br />[Recipient address line 1]<br />[Recipient address line 2]</p>
          <p className="mb-4">Dear [Recipient name],</p>
          <p className="mb-4 italic text-slate-400">[Letter body — replace this when writing your letter.]</p>
          <p className="mb-1">Sincerely,</p>
          <p className="mt-12">[Your name]<br />[Your title]</p>
        </div>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 print:hidden">
        <strong>Print tip:</strong> use Cmd/Ctrl+P, set destination to &ldquo;Save as PDF,&rdquo; uncheck &ldquo;Headers + footers,&rdquo;
        and set margins to default (1 in). Result is a clean letterhead PDF you can use as a template.
      </div>
    </div>
  );
}
