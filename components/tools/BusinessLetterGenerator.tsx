"use client";

import { useMemo, useState } from "react";

function todayLong(): string {
  const d = new Date();
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const CLOSINGS = ["Sincerely", "Best regards", "Respectfully", "Yours truly"] as const;

export function BusinessLetterGenerator() {
  const [senderName, setSenderName] = useState("Margaret Ellis");
  const [senderTitle, setSenderTitle] = useState("Director of Operations");
  const [senderCompany, setSenderCompany] = useState("Harbor Logistics, Inc.");
  const [senderAddress, setSenderAddress] = useState("1200 Seaport Blvd\nBoston, MA 02210");

  const [date, setDate] = useState(todayLong());

  const [recipientName, setRecipientName] = useState("Mr. Jonathan Pierce");
  const [recipientTitle, setRecipientTitle] = useState("Vice President, Procurement");
  const [recipientCompany, setRecipientCompany] = useState("Northstar Manufacturing");
  const [recipientAddress, setRecipientAddress] = useState("450 Industrial Parkway\nCleveland, OH 44114");

  const [salutation, setSalutation] = useState("Dear Mr. Pierce,");
  const [body, setBody] = useState(
    `Thank you for meeting with our team last week to review the proposed logistics partnership between Harbor Logistics and Northstar Manufacturing.

We are pleased to confirm that we can meet the service levels outlined in your RFP, including next-day ground coverage across the Midwest and dedicated capacity during peak season. Attached you will find our revised pricing schedule and a draft master services agreement for your review.

Please let me know if you would like to schedule a follow-up call to walk through the contract terms or visit our Boston operations center. We are eager to move this forward and appreciate your continued consideration.`
  );
  const [closing, setClosing] = useState<typeof CLOSINGS[number]>("Sincerely");
  const [signatureName, setSignatureName] = useState("Margaret Ellis");
  const [enclosures, setEnclosures] = useState("Pricing schedule, Draft MSA");

  const bodyParagraphs = useMemo(() => body.split(/\n\s*\n/).filter((p) => p.trim().length > 0), [body]);

  const copyPlainText = async () => {
    const lines: string[] = [];
    lines.push(senderName);
    if (senderTitle) lines.push(senderTitle);
    if (senderCompany) lines.push(senderCompany);
    if (senderAddress) lines.push(senderAddress);
    lines.push("");
    lines.push(date);
    lines.push("");
    lines.push(recipientName);
    if (recipientTitle) lines.push(recipientTitle);
    if (recipientCompany) lines.push(recipientCompany);
    if (recipientAddress) lines.push(recipientAddress);
    lines.push("");
    lines.push(salutation);
    lines.push("");
    lines.push(body);
    lines.push("");
    lines.push(`${closing},`);
    lines.push("");
    lines.push("");
    lines.push("");
    lines.push(signatureName);
    if (enclosures.trim()) {
      lines.push("");
      lines.push(`Enclosures: ${enclosures}`);
    }
    await navigator.clipboard.writeText(lines.join("\n"));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:block">
      <div className="space-y-3 print:hidden">
        <h3 className="text-sm font-semibold text-slate-700">Sender</h3>
        <div className="grid grid-cols-2 gap-2">
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
            <span className="block text-sm font-medium text-slate-700 mb-1">Title</span>
            <input
              type="text"
              value={senderTitle}
              onChange={(e) => setSenderTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Company</span>
          <input
            type="text"
            value={senderCompany}
            onChange={(e) => setSenderCompany(e.target.value)}
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

        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Date</span>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>

        <h3 className="text-sm font-semibold text-slate-700 pt-2">Recipient</h3>
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
          <span className="block text-sm font-medium text-slate-700 mb-1">Company</span>
          <input
            type="text"
            value={recipientCompany}
            onChange={(e) => setRecipientCompany(e.target.value)}
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
          <span className="block text-sm font-medium text-slate-700 mb-1">Salutation</span>
          <input
            type="text"
            value={salutation}
            onChange={(e) => setSalutation(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Body (blank line separates paragraphs)</span>
          <textarea
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>

        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Closing</span>
            <select
              value={closing}
              onChange={(e) => setClosing(e.target.value as typeof CLOSINGS[number])}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            >
              {CLOSINGS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
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
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Enclosures (optional)</span>
          <input
            type="text"
            value={enclosures}
            onChange={(e) => setEnclosures(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>

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
            {senderTitle && <div>{senderTitle}</div>}
            {senderCompany && <div>{senderCompany}</div>}
            {senderAddress && <div className="whitespace-pre-line">{senderAddress}</div>}
          </div>

          <div className="text-sm mb-6">{date}</div>

          <div className="text-sm mb-6">
            <div>{recipientName}</div>
            {recipientTitle && <div>{recipientTitle}</div>}
            {recipientCompany && <div>{recipientCompany}</div>}
            {recipientAddress && <div className="whitespace-pre-line">{recipientAddress}</div>}
          </div>

          <div className="text-base mb-4">{salutation}</div>

          <div className="space-y-4 text-base mb-6">
            {bodyParagraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-line">{p}</p>
            ))}
          </div>

          <div className="text-base">{closing},</div>
          <div className="h-20"></div>
          <div className="text-base font-semibold">{signatureName}</div>

          {enclosures.trim() && (
            <div className="text-sm mt-6">
              <span className="font-semibold">Enclosures:</span> {enclosures}
            </div>
          )}
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
