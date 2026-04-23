"use client";

import { useMemo, useState } from "react";

type Resolution = "refund" | "replacement" | "repair" | "apology" | "other";
type Tone = "firm" | "cordial";

const RESOLUTION_TEXT: Record<Resolution, string> = {
  refund: "a full refund of the purchase price",
  replacement: "a replacement of the product at no additional cost",
  repair: "a prompt repair of the product at no cost to me",
  apology: "a formal written apology and assurance this will not recur",
  other: "",
};

export function ComplaintLetterGenerator() {
  const [yourName, setYourName] = useState("Samantha Brooks");
  const [yourAddress, setYourAddress] = useState("77 Chestnut Lane\nPortland, OR 97205");
  const [yourEmail, setYourEmail] = useState("samantha.brooks@example.com");
  const [yourPhone, setYourPhone] = useState("(503) 555-0179");
  const [date, setDate] = useState("April 23, 2026");
  const [companyName, setCompanyName] = useState("Meridian Appliances, Inc.");
  const [companyAddress, setCompanyAddress] = useState("Customer Service Department\n1500 Riverside Drive\nChicago, IL 60601");
  const [orderNumber, setOrderNumber] = useState("Order #MA-2026-48213");
  const [product, setProduct] = useState("Meridian Pro 18-cup Stand Mixer");
  const [transactionDate, setTransactionDate] = useState("March 12, 2026");
  const [whatHappened, setWhatHappened] = useState(
    "The mixer arrived with a visibly cracked bowl and a motor that overheats within five minutes of use. I contacted your customer service line twice (on March 14 and March 21), was placed on hold for more than 40 minutes each time, and on both occasions the representative promised a callback that never came."
  );
  const [resolution, setResolution] = useState<Resolution>("replacement");
  const [customResolution, setCustomResolution] = useState("");
  const [resolutionDate, setResolutionDate] = useState("within 14 days");
  const [attachments, setAttachments] = useState("Copy of the original receipt\nPhotographs of the cracked bowl\nScreenshots of my prior support tickets");
  const [tone, setTone] = useState<Tone>("firm");

  const resolutionPhrase = useMemo(() => {
    if (resolution === "other") return customResolution.trim() || "an appropriate remedy";
    return customResolution.trim() || RESOLUTION_TEXT[resolution];
  }, [resolution, customResolution]);

  const opening = useMemo(() => {
    if (tone === "cordial") {
      return `I am writing to bring a recent experience to your attention and to respectfully request your help in resolving it. On ${transactionDate}, I purchased a ${product} (${orderNumber}), and unfortunately the outcome has not matched the standard I have come to expect from ${companyName}.`;
    }
    return `I am writing to formally complain about a ${product} I purchased from ${companyName} on ${transactionDate} (${orderNumber}). The product has failed to meet the most basic standards of quality, and my attempts to resolve the issue through your customer service team have so far gone unanswered.`;
  }, [tone, transactionDate, product, companyName, orderNumber]);

  const resolutionAsk = useMemo(() => {
    if (tone === "cordial") {
      return `I would greatly appreciate ${resolutionPhrase}, if possible ${resolutionDate} of receiving this letter. I remain confident we can reach a fair outcome.`;
    }
    return `To resolve this matter, I am requesting ${resolutionPhrase}, ${resolutionDate} of receiving this letter. Should I not hear back within that window, I will have no choice but to escalate this complaint to my state&rsquo;s consumer protection office and the Better Business Bureau.`;
  }, [tone, resolutionPhrase, resolutionDate]);

  const closing = useMemo(() => {
    if (tone === "cordial") {
      return `Thank you for taking the time to look into this. I have enclosed supporting documentation and look forward to your reply.`;
    }
    return `I have enclosed supporting documentation and expect a prompt, written response. Thank you for your immediate attention to this matter.`;
  }, [tone]);

  const attachmentList = attachments.split("\n").map((s) => s.trim()).filter(Boolean);

  const copyPlainText = async () => {
    const lines: string[] = [];
    lines.push(yourName);
    lines.push(...yourAddress.split("\n"));
    if (yourEmail) lines.push(yourEmail);
    if (yourPhone) lines.push(yourPhone);
    lines.push("");
    lines.push(date);
    lines.push("");
    lines.push(companyName);
    lines.push(...companyAddress.split("\n"));
    lines.push("");
    lines.push("To Whom It May Concern:");
    lines.push("");
    lines.push(opening.replace(/&rsquo;/g, "'"));
    lines.push("");
    lines.push(whatHappened);
    lines.push("");
    lines.push(resolutionAsk.replace(/&rsquo;/g, "'"));
    lines.push("");
    lines.push(closing);
    if (attachmentList.length) {
      lines.push("");
      lines.push("Enclosed:");
      attachmentList.forEach((a) => lines.push(`  - ${a}`));
    }
    lines.push("");
    lines.push("Sincerely,");
    lines.push("");
    lines.push("");
    lines.push("");
    lines.push(yourName);
    const text = lines.join("\n");
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:block">
      <div className="space-y-4 print:hidden">
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-900">
          Send via certified mail or email with a read receipt so you have a record the letter was received.
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Your name</span>
          <input type="text" value={yourName} onChange={(e) => setYourName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Your address</span>
          <textarea rows={2} value={yourAddress} onChange={(e) => setYourAddress(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Your email</span>
            <input type="text" value={yourEmail} onChange={(e) => setYourEmail(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Your phone</span>
            <input type="text" value={yourPhone} onChange={(e) => setYourPhone(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Date</span>
          <input type="text" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Company name</span>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Customer service address</span>
          <textarea rows={3} value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Account / order number</span>
            <input type="text" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Date of transaction</span>
            <input type="text" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Product / service involved</span>
          <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">What happened</span>
          <textarea rows={5} value={whatHappened} onChange={(e) => setWhatHappened(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Resolution requested</span>
            <select value={resolution} onChange={(e) => setResolution(e.target.value as Resolution)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
              <option value="refund">Refund</option>
              <option value="replacement">Replacement</option>
              <option value="repair">Repair</option>
              <option value="apology">Apology</option>
              <option value="other">Other / custom</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Desired resolution timeframe</span>
            <input type="text" value={resolutionDate} onChange={(e) => setResolutionDate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Custom resolution text (overrides default)</span>
          <input type="text" value={customResolution} onChange={(e) => setCustomResolution(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Attachments enclosed (one per line)</span>
          <textarea rows={3} value={attachments} onChange={(e) => setAttachments(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Tone</span>
          <select value={tone} onChange={(e) => setTone(e.target.value as Tone)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
            <option value="firm">Firm</option>
            <option value="cordial">Cordial</option>
          </select>
        </label>
        <div className="flex gap-2 pt-2">
          <button onClick={() => window.print()} className="bg-brand text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-dark">Print / Save as PDF</button>
          <button onClick={copyPlainText} className="bg-slate-100 text-slate-700 rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-200">Copy as text</button>
        </div>
      </div>

      <div className="print:col-span-2 print:p-0 print:max-w-none">
        <div className="bg-white border border-slate-200 rounded-xl p-8 font-serif text-slate-900 print:border-0 print:rounded-none print:p-0 leading-relaxed">
          <div className="text-sm">
            <div>{yourName}</div>
            <div className="whitespace-pre-line">{yourAddress}</div>
            {yourEmail && <div>{yourEmail}</div>}
            {yourPhone && <div>{yourPhone}</div>}
          </div>
          <div className="h-4" />
          <div className="text-sm">{date}</div>
          <div className="h-4" />
          <div className="text-sm">
            <div>{companyName}</div>
            <div className="whitespace-pre-line">{companyAddress}</div>
          </div>
          <div className="h-4" />
          <p className="text-sm font-semibold">Re: {orderNumber} &mdash; {product}</p>
          <div className="h-3" />
          <p className="text-sm">To Whom It May Concern:</p>
          <div className="h-3" />
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: opening }} />
          <div className="h-3" />
          <p className="text-sm">{whatHappened}</p>
          <div className="h-3" />
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: resolutionAsk }} />
          <div className="h-3" />
          <p className="text-sm">{closing}</p>
          {attachmentList.length > 0 && (
            <>
              <div className="h-3" />
              <p className="text-sm font-semibold">Enclosed:</p>
              <ul className="text-sm list-disc pl-6">
                {attachmentList.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </>
          )}
          <div className="h-4" />
          <p className="text-sm">Sincerely,</p>
          <div className="h-12" />
          <p className="text-sm">{yourName}</p>
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
