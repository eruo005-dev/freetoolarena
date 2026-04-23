"use client";

import { useMemo, useState } from "react";

function todayLong(): string {
  const d = new Date();
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function MemoGenerator() {
  const [to, setTo] = useState("All Marketing Staff");
  const [from, setFrom] = useState("Jamie Chen, Director of Marketing");
  const [cc, setCc] = useState("Operations Team");
  const [date, setDate] = useState(todayLong());
  const [subject, setSubject] = useState("Q3 Campaign Launch &mdash; Updated Timeline");
  const [body, setBody] = useState(
    `Following our leadership review on Monday, we are adjusting the Q3 campaign launch by two weeks to accommodate the new creative assets from the agency.

The new launch date is August 18. All pre-launch deliverables (landing page, email sequence, paid media briefs) should be completed and routed to review by August 8.

Please block time on your calendars for the kickoff sync next Tuesday at 10:00 AM. If you have conflicts, notify your team lead by end of day Friday.

Thank you for the flexibility. This extra runway will make for a sharper launch.`
  );

  const bodyParagraphs = useMemo(() => body.split(/\n\s*\n/).filter((p) => p.trim().length > 0), [body]);

  const copyPlainText = async () => {
    const lines: string[] = [];
    lines.push("MEMORANDUM");
    lines.push("");
    lines.push(`TO:      ${to}`);
    lines.push(`FROM:    ${from}`);
    if (cc.trim()) lines.push(`CC:      ${cc}`);
    lines.push(`DATE:    ${date}`);
    lines.push(`SUBJECT: ${subject.replace(/&mdash;/g, "—")}`);
    lines.push("");
    lines.push("-".repeat(60));
    lines.push("");
    lines.push(body);
    await navigator.clipboard.writeText(lines.join("\n"));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:block">
      <div className="space-y-3 print:hidden">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">TO</span>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">FROM</span>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">CC (optional)</span>
          <input
            type="text"
            value={cc}
            onChange={(e) => setCc(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">DATE</span>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">SUBJECT</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Body (blank line separates paragraphs)</span>
          <textarea
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
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
        <div className="bg-white border border-slate-200 rounded-xl p-8 font-serif text-slate-900 print:border-0 print:rounded-none print:p-0">
          <h1 className="text-3xl font-bold tracking-[0.2em] uppercase text-center mb-8">Memorandum</h1>

          <div className="space-y-1 text-sm mb-4">
            <div className="flex">
              <span className="w-24 font-bold uppercase tracking-wide">To:</span>
              <span className="flex-1">{to}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-bold uppercase tracking-wide">From:</span>
              <span className="flex-1">{from}</span>
            </div>
            {cc.trim() && (
              <div className="flex">
                <span className="w-24 font-bold uppercase tracking-wide">CC:</span>
                <span className="flex-1">{cc}</span>
              </div>
            )}
            <div className="flex">
              <span className="w-24 font-bold uppercase tracking-wide">Date:</span>
              <span className="flex-1">{date}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-bold uppercase tracking-wide">Subject:</span>
              <span className="flex-1 font-semibold" dangerouslySetInnerHTML={{ __html: subject }} />
            </div>
          </div>

          <hr className="border-t-2 border-slate-800 mb-6" />

          <div className="space-y-4 text-base leading-relaxed">
            {bodyParagraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-line">{p}</p>
            ))}
          </div>
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
