"use client";

import { useState } from "react";

type Country = "us" | "uk" | "eu" | "ca" | "au";

const COUNTRY_LABEL: Record<Country, string> = {
  us: "United States (USPS)",
  uk: "United Kingdom (Royal Mail)",
  eu: "European Union (national posts)",
  ca: "Canada (Canada Post)",
  au: "Australia (Australia Post)",
};

const RULES_BY_COUNTRY: Record<Country, { recipient: string; sender: string; tips: string[] }> = {
  us: {
    recipient: "JOHN SMITH\n221 BAKER ST APT 4B\nNEW YORK NY 10001-1234",
    sender: "Sender Name\n100 Sender St\nCity, ST 00000",
    tips: [
      "USPS prefers ALL CAPS, no punctuation in the address block.",
      "Include the ZIP+4 (5+4 digits) when known.",
      "Use standard 2-letter state abbreviations.",
      "Apartment / unit number on its own line as 'APT 4B' or 'STE 200', not '#4B'.",
      "Place stamp top-right; sender top-left; recipient centered.",
    ],
  },
  uk: {
    recipient: "Mr A Smith\n42 Acacia Avenue\nMANCHESTER\nM1 1AA\nUNITED KINGDOM",
    sender: "Sender Name\n100 Sender Road\nCITY\nPOSTCODE",
    tips: [
      "Royal Mail expects POSTCODE on its own line, all caps.",
      "TOWN/CITY in caps on the line above the postcode.",
      "Country in caps on the bottom line if posting internationally.",
      "Recipient block on the lower-half-right of the envelope.",
      "Stamp top-right corner.",
    ],
  },
  eu: {
    recipient: "Hr. Jan Smid\nBlumenstraße 12\n10115 BERLIN\nGERMANY",
    sender: "Sender Name\nSender Straße 1\n00000 City",
    tips: [
      "Postcode BEFORE city (postcode-city order).",
      "Country in English on the last line for international mail.",
      "Country line in CAPS.",
      "Format varies by country — research specific national post requirements for in-country mail.",
    ],
  },
  ca: {
    recipient: "JOHN SMITH\n100 MAIN ST\nTORONTO ON M5H 2N2",
    sender: "Sender Name\n100 Sender St\nCity, ON A1A 1A1",
    tips: [
      "Canada Post prefers ALL CAPS, no punctuation.",
      "Province as 2-letter code (ON, BC, QC, etc.).",
      "Postal code in 'A1A 1A1' format with single space.",
      "City and postal code on the SAME line.",
    ],
  },
  au: {
    recipient: "MR JOHN SMITH\n100 GEORGE ST\nSYDNEY NSW 2000\nAUSTRALIA",
    sender: "Sender Name\n100 Sender Rd\nSuburb STATE 0000",
    tips: [
      "Australia Post prefers ALL CAPS.",
      "State as 2-3 letter code (NSW, VIC, QLD, WA, SA, TAS, ACT, NT).",
      "4-digit postcode AFTER the state.",
      "City/suburb, state, postcode all on the same line.",
    ],
  },
};

export function EnvelopeFormatter() {
  const [country, setCountry] = useState<Country>("us");
  const [recipient, setRecipient] = useState<string>(RULES_BY_COUNTRY.us.recipient);
  const [sender, setSender] = useState<string>(RULES_BY_COUNTRY.us.sender);

  const rules = RULES_BY_COUNTRY[country];
  const handlePrint = () => window.print();
  const reset = () => {
    setRecipient(rules.recipient);
    setSender(rules.sender);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3 print:hidden">
        <label className="block text-sm sm:col-span-3"><span className="mb-1 block font-medium">Country / postal authority</span>
          <select value={country} onChange={(e) => { setCountry(e.target.value as Country); }} className="w-full rounded border border-slate-300 px-3 py-2">
            {(Object.keys(COUNTRY_LABEL) as Country[]).map((c) => <option key={c} value={c}>{COUNTRY_LABEL[c]}</option>)}
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">Sender (return) address</span>
          <textarea value={sender} onChange={(e) => setSender(e.target.value)} rows={4} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm sm:col-span-2"><span className="mb-1 block font-medium">Recipient address</span>
          <textarea value={recipient} onChange={(e) => setRecipient(e.target.value)} rows={4} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <button onClick={reset} className="self-end rounded border border-slate-300 px-3 py-2 text-sm">Reset to country sample</button>
      </div>

      <button onClick={handlePrint} className="rounded bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark print:hidden">Print envelope (#10 / DL)</button>

      <style>{`@media print { @page { size: 9.5in 4.125in landscape; margin: 0; } body * { visibility: hidden; } .envelope, .envelope * { visibility: visible; } .envelope { position: absolute; left: 0; top: 0; } }`}</style>

      <div className="rounded-lg border-2 border-slate-300 bg-white p-6 shadow-sm print:border-0 print:shadow-none">
        <div className="envelope relative" style={{ width: "9.5in", height: "4.125in", border: "1px dashed #cbd5e1" }}>
          <div style={{ position: "absolute", top: "0.4in", left: "0.4in", fontSize: "10pt", fontFamily: "Arial, sans-serif", lineHeight: 1.3 }}>
            <div className="whitespace-pre-line text-slate-700">{sender}</div>
          </div>
          <div style={{ position: "absolute", top: "1.6in", left: "3.5in", fontSize: "12pt", fontFamily: "Arial, sans-serif", lineHeight: 1.4 }}>
            <div className="whitespace-pre-line font-semibold text-slate-900">{recipient}</div>
          </div>
          <div style={{ position: "absolute", top: "0.3in", right: "0.4in", border: "1px dashed #cbd5e1", padding: "0.3in 0.5in", fontSize: "8pt", color: "#94a3b8", fontFamily: "Arial, sans-serif" }}>STAMP</div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-2 text-sm font-semibold">{COUNTRY_LABEL[country]} formatting tips</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {rules.tips.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 print:hidden">
        <strong>Print tip:</strong> set printer to envelope feed (most printers have a #10 envelope option). Use the
        landscape page size 9.5×4.125 inches (US #10) or 220×110 mm (DL international). Test on plain paper first.
      </div>
    </div>
  );
}
