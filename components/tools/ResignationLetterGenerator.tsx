"use client";

import { useMemo, useState } from "react";

type ReasonKey = "new-opportunity" | "personal" | "relocation" | "career-change" | "other";
type Tone = "formal" | "warm" | "brief";

const REASON_TEXT: Record<ReasonKey, string> = {
  "new-opportunity": "I have accepted a new opportunity that aligns with my long-term career goals.",
  personal: "This decision follows a period of careful personal reflection.",
  relocation: "My family and I are relocating, which makes continuing in this role impractical.",
  "career-change": "I have decided to pursue a change in my career direction.",
  other: "",
};

export function ResignationLetterGenerator() {
  const [yourName, setYourName] = useState("Alex Morgan");
  const [yourAddress, setYourAddress] = useState("412 Linden Avenue\nApt. 3B\nAustin, TX 78704");
  const [date, setDate] = useState("April 23, 2026");
  const [managerName, setManagerName] = useState("Jordan Reyes");
  const [managerTitle, setManagerTitle] = useState("Director of Engineering");
  const [company, setCompany] = useState("Nimbus Software, Inc.");
  const [companyAddress, setCompanyAddress] = useState("2200 Congress Avenue\nAustin, TX 78701");
  const [yourTitle, setYourTitle] = useState("Senior Software Engineer");
  const [lastDay, setLastDay] = useState("May 7, 2026");
  const [reasonKey, setReasonKey] = useState<ReasonKey>("new-opportunity");
  const [customReason, setCustomReason] = useState("");
  const [includeTransition, setIncludeTransition] = useState(true);
  const [tone, setTone] = useState<Tone>("formal");

  const reasonSentence = useMemo(() => {
    if (reasonKey === "other") return customReason.trim();
    return customReason.trim() || REASON_TEXT[reasonKey];
  }, [reasonKey, customReason]);

  const opening = `Please accept this letter as formal notice of my resignation from my position as ${yourTitle} at ${company}, effective ${lastDay}.`;

  const gratitude = useMemo(() => {
    if (tone === "brief") {
      return `I am grateful for the time I have spent at ${company} and for the support I have received from you and the team.`;
    }
    if (tone === "warm") {
      return `Working at ${company} has been one of the most meaningful chapters of my career. I am deeply grateful for your mentorship, for the trust you placed in me, and for the colleagues who have made every project more rewarding than the last.`;
    }
    return `I would like to express my sincere appreciation for the opportunities I have been given during my time at ${company}. I have valued the professional growth, the collaborative culture, and the guidance you have provided throughout my tenure.`;
  }, [tone, company]);

  const transition = useMemo(() => {
    if (!includeTransition) return "";
    if (tone === "brief") {
      return `I am committed to a smooth handover and will do everything I can to wrap up outstanding work before my last day.`;
    }
    if (tone === "warm") {
      return `Please know that I am fully committed to making this transition as seamless as possible. I would be glad to help document current projects, train a successor, and wrap up any outstanding deliverables before ${lastDay}.`;
    }
    return `During my remaining time, I am committed to ensuring a smooth transition. I am happy to help train my replacement, document ongoing responsibilities, and complete any priority deliverables before ${lastDay}.`;
  }, [includeTransition, tone, lastDay]);

  const closing = useMemo(() => {
    if (tone === "brief") return "Thank you again.";
    if (tone === "warm") {
      return `Thank you again for everything. I sincerely hope our paths cross again, and I wish you and the team continued success.`;
    }
    return `Thank you once more for the opportunity to be part of ${company}. I wish you and the team continued success in the years ahead.`;
  }, [tone, company]);

  const signOff = tone === "warm" ? "With gratitude," : "Sincerely,";

  const copyPlainText = async () => {
    const lines: string[] = [];
    lines.push(...yourAddress.split("\n"));
    lines.push("");
    lines.push(date);
    lines.push("");
    lines.push(managerName);
    lines.push(managerTitle);
    lines.push(company);
    lines.push(...companyAddress.split("\n"));
    lines.push("");
    lines.push(`Dear ${managerName},`);
    lines.push("");
    lines.push(opening);
    if (reasonSentence) {
      lines.push("");
      lines.push(reasonSentence);
    }
    lines.push("");
    lines.push(gratitude);
    if (transition) {
      lines.push("");
      lines.push(transition);
    }
    lines.push("");
    lines.push(closing);
    lines.push("");
    lines.push(signOff);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Your name</span>
            <input type="text" value={yourName} onChange={(e) => setYourName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Your current title</span>
            <input type="text" value={yourTitle} onChange={(e) => setYourTitle(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Your address</span>
          <textarea rows={3} value={yourAddress} onChange={(e) => setYourAddress(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Date</span>
            <input type="text" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Last working day</span>
            <input type="text" value={lastDay} onChange={(e) => setLastDay(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Manager name</span>
            <input type="text" value={managerName} onChange={(e) => setManagerName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Manager title</span>
            <input type="text" value={managerTitle} onChange={(e) => setManagerTitle(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Company</span>
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Company address</span>
          <textarea rows={2} value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Reason</span>
            <select value={reasonKey} onChange={(e) => setReasonKey(e.target.value as ReasonKey)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
              <option value="new-opportunity">New opportunity</option>
              <option value="personal">Personal</option>
              <option value="relocation">Relocation</option>
              <option value="career-change">Career change</option>
              <option value="other">Other / custom</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Tone</span>
            <select value={tone} onChange={(e) => setTone(e.target.value as Tone)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
              <option value="formal">Formal</option>
              <option value="warm">Warm</option>
              <option value="brief">Brief</option>
            </select>
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Custom reason (overrides default)</span>
          <textarea rows={2} value={customReason} onChange={(e) => setCustomReason(e.target.value)} placeholder="Optional: write your own reason sentence" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={includeTransition} onChange={(e) => setIncludeTransition(e.target.checked)} className="rounded border-slate-300" />
          Include transition / handover offer
        </label>
        <div className="flex gap-2 pt-2">
          <button onClick={() => window.print()} className="bg-brand text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-dark">Print / Save as PDF</button>
          <button onClick={copyPlainText} className="bg-slate-100 text-slate-700 rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-200">Copy as text</button>
        </div>
      </div>

      <div className="print:col-span-2 print:p-0 print:max-w-none">
        <div className="bg-white border border-slate-200 rounded-xl p-8 font-serif text-slate-900 print:border-0 print:rounded-none print:p-0 leading-relaxed">
          <div className="whitespace-pre-line text-sm">{yourAddress}</div>
          <div className="h-4" />
          <div className="text-sm">{date}</div>
          <div className="h-4" />
          <div className="text-sm">
            <div>{managerName}</div>
            <div>{managerTitle}</div>
            <div>{company}</div>
            <div className="whitespace-pre-line">{companyAddress}</div>
          </div>
          <div className="h-4" />
          <p className="text-sm">Dear {managerName},</p>
          <div className="h-3" />
          <p className="text-sm">{opening}</p>
          {reasonSentence && (
            <>
              <div className="h-3" />
              <p className="text-sm">{reasonSentence}</p>
            </>
          )}
          <div className="h-3" />
          <p className="text-sm">{gratitude}</p>
          {transition && (
            <>
              <div className="h-3" />
              <p className="text-sm">{transition}</p>
            </>
          )}
          <div className="h-3" />
          <p className="text-sm">{closing}</p>
          <div className="h-4" />
          <p className="text-sm">{signOff}</p>
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
