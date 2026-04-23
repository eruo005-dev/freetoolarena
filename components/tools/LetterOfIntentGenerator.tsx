"use client";

import { useMemo, useState } from "react";

const LOI_TYPES = {
  job: {
    label: "Job application",
    opening:
      "I am writing to formally express my intent to apply for the open position at your organization. I am enthusiastic about the opportunity to contribute my skills and experience to your team.",
  },
  grad: {
    label: "Graduate school",
    opening:
      "I am writing to express my intent to apply to your graduate program. My academic background and research interests align closely with the program&rsquo;s focus, and I am eager to contribute to your academic community.",
  },
  business: {
    label: "Business purchase",
    opening:
      "This letter serves as a non-binding expression of intent to acquire the business operations described below, subject to due diligence, negotiation of definitive agreements, and customary closing conditions.",
  },
  real_estate: {
    label: "Real estate offer",
    opening:
      "This letter of intent outlines the general terms under which the undersigned proposes to purchase the property described below. This document is non-binding and subject to execution of a formal purchase agreement.",
  },
} as const;

type LoiKey = keyof typeof LOI_TYPES;

function todayLong(): string {
  const d = new Date();
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function decode(html: string): string {
  return html.replace(/&rsquo;/g, "'").replace(/&ldquo;/g, "\u201C").replace(/&rdquo;/g, "\u201D").replace(/&mdash;/g, "—");
}

export function LetterOfIntentGenerator() {
  const [loiType, setLoiType] = useState<LoiKey>("job");

  const [senderName, setSenderName] = useState("Priya Narang");
  const [senderAddress, setSenderAddress] = useState("221 Cedar Court\nDenver, CO 80203");
  const [senderEmail, setSenderEmail] = useState("priya.narang@example.com");
  const [senderPhone, setSenderPhone] = useState("(303) 555-0142");

  const [recipientName, setRecipientName] = useState("Ms. Katherine Holloway");
  const [recipientTitle, setRecipientTitle] = useState("Head of Talent");
  const [recipientOrg, setRecipientOrg] = useState("Summit Technology Group");
  const [recipientAddress, setRecipientAddress] = useState("400 Market Street, Suite 900\nDenver, CO 80202");

  const [date, setDate] = useState(todayLong());

  const [opening, setOpening] = useState<string>(decode(LOI_TYPES.job.opening));
  const [middle, setMiddle] = useState(
    `Over the past five years I have led cross-functional product initiatives at mid-stage SaaS companies, shipping features used by millions of monthly active users. I have a track record of partnering closely with engineering and design to move quickly without sacrificing quality.

I am drawn to Summit Technology Group because of your focus on developer tooling and your commitment to a distributed-first culture. I would welcome the chance to discuss how my experience could support the goals laid out in your latest product roadmap.`
  );
  const [closing, setClosing] = useState(
    "I look forward to the opportunity to discuss this further. Please feel free to contact me at the email or phone number listed above."
  );
  const [signatureName, setSignatureName] = useState("Priya Narang");

  function handleTypeChange(k: LoiKey) {
    setLoiType(k);
    setOpening(decode(LOI_TYPES[k].opening));
  }

  const middleParagraphs = useMemo(() => middle.split(/\n\s*\n/).filter((p) => p.trim().length > 0), [middle]);

  const copyPlainText = async () => {
    const lines: string[] = [];
    lines.push(senderName);
    if (senderAddress) lines.push(senderAddress);
    if (senderEmail) lines.push(senderEmail);
    if (senderPhone) lines.push(senderPhone);
    lines.push("");
    lines.push(date);
    lines.push("");
    lines.push(recipientName);
    if (recipientTitle) lines.push(recipientTitle);
    if (recipientOrg) lines.push(recipientOrg);
    if (recipientAddress) lines.push(recipientAddress);
    lines.push("");
    lines.push(`Re: Letter of Intent — ${LOI_TYPES[loiType].label}`);
    lines.push("");
    lines.push(`Dear ${recipientName.replace(/^(Mr|Ms|Mrs|Dr|Mr\.|Ms\.|Mrs\.|Dr\.)\s*/, "")},`);
    lines.push("");
    lines.push(opening);
    lines.push("");
    lines.push(middle);
    lines.push("");
    lines.push(closing);
    lines.push("");
    lines.push("Sincerely,");
    lines.push("");
    lines.push("");
    lines.push(signatureName);
    await navigator.clipboard.writeText(lines.join("\n"));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:block">
      <div className="space-y-3 print:hidden">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Type of LOI</span>
          <select
            value={loiType}
            onChange={(e) => handleTypeChange(e.target.value as LoiKey)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          >
            {(Object.keys(LOI_TYPES) as LoiKey[]).map((k) => (
              <option key={k} value={k}>{LOI_TYPES[k].label}</option>
            ))}
          </select>
        </label>

        <h3 className="text-sm font-semibold text-slate-700 pt-1">Sender</h3>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Name</span>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Address</span>
          <textarea
            rows={2}
            value={senderAddress}
            onChange={(e) => setSenderAddress(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Email</span>
            <input
              type="text"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Phone</span>
            <input
              type="text"
              value={senderPhone}
              onChange={(e) => setSenderPhone(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        </div>

        <h3 className="text-sm font-semibold text-slate-700 pt-1">Recipient</h3>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Name</span>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Title</span>
            <input
              type="text"
              value={recipientTitle}
              onChange={(e) => setRecipientTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Organization</span>
          <input
            type="text"
            value={recipientOrg}
            onChange={(e) => setRecipientOrg(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Address</span>
          <textarea
            rows={2}
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Date</span>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Opening paragraph</span>
          <textarea
            rows={3}
            value={opening}
            onChange={(e) => setOpening(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Body (blank line separates paragraphs)</span>
          <textarea
            rows={6}
            value={middle}
            onChange={(e) => setMiddle(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Closing paragraph</span>
          <textarea
            rows={2}
            value={closing}
            onChange={(e) => setClosing(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Signature name</span>
          <input
            type="text"
            value={signatureName}
            onChange={(e) => setSignatureName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>

        <p className="text-xs text-slate-500 italic pt-1">
          This is a non-binding template. For binding LOIs, consult an attorney.
        </p>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => window.print()}
            className="bg-brand text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-dark"
          >
            Print / Save as PDF
          </button>
          <button
            onClick={copyPlainText}
            className="bg-slate-100 text-slate-700 rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-200"
          >
            Copy as text
          </button>
        </div>
      </div>

      <div className="print:col-span-2 print:p-0 print:max-w-none">
        <div className="bg-white border border-slate-200 rounded-xl p-8 font-serif text-slate-900 print:border-0 print:rounded-none print:p-0 leading-relaxed">
          <div className="text-sm mb-6">
            <div>{senderName}</div>
            {senderAddress && <div className="whitespace-pre-line">{senderAddress}</div>}
            {senderEmail && <div>{senderEmail}</div>}
            {senderPhone && <div>{senderPhone}</div>}
          </div>

          <div className="text-sm mb-6">{date}</div>

          <div className="text-sm mb-6">
            <div>{recipientName}</div>
            {recipientTitle && <div>{recipientTitle}</div>}
            {recipientOrg && <div>{recipientOrg}</div>}
            {recipientAddress && <div className="whitespace-pre-line">{recipientAddress}</div>}
          </div>

          <div className="text-base font-semibold mb-4">
            Re: Letter of Intent &mdash; {LOI_TYPES[loiType].label}
          </div>

          <div className="text-base mb-4">
            Dear {recipientName.replace(/^(Mr|Ms|Mrs|Dr)\.?\s*/, "") || "Sir or Madam"},
          </div>

          <div className="space-y-4 text-base mb-4">
            <p className="whitespace-pre-line">{opening}</p>
            {middleParagraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-line">{p}</p>
            ))}
            <p className="whitespace-pre-line">{closing}</p>
          </div>

          <div className="text-base">Sincerely,</div>
          <div className="h-20"></div>
          <div className="text-base font-semibold">{signatureName}</div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page { size: letter; margin: 0.75in; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
}
