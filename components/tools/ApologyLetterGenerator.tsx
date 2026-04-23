"use client";

import { useMemo, useState } from "react";

type Tone = "formal-business" | "personal-warm";

export function ApologyLetterGenerator() {
  const [yourName, setYourName] = useState("Daniel Ortiz");
  const [recipientName, setRecipientName] = useState("Rebecca");
  const [date, setDate] = useState("April 23, 2026");
  const [whatHappened, setWhatHappened] = useState(
    "I missed our meeting on Tuesday afternoon and did not call to let you know I would not be there."
  );
  const [acknowledgment, setAcknowledgment] = useState(
    "I understand that this left you waiting for almost an hour, that you had to rearrange the rest of your afternoon because of it, and &mdash; more than anything &mdash; that it communicated something I never want to communicate: that your time is not as important as mine."
  );
  const [responsibility, setResponsibility] = useState(
    "I am sorry that I let this happen. The reason does not matter; what matters is that I did not show up when I said I would, and that is entirely on me."
  );
  const [commitment, setCommitment] = useState(
    "Going forward, I have blocked our recurring time on my calendar with a reminder the morning of, and I will confirm with you the day before every meeting we have on the books. If something comes up, you will hear from me well before the meeting starts, not after."
  );
  const [amends, setAmends] = useState(
    "I would like to take you to lunch this week &mdash; my treat &mdash; so we can pick up where we would have left off on Tuesday. I have also already completed the two items I had agreed to bring to that meeting and have attached them below so you do not lose any more time waiting on me."
  );
  const [includeForgiveness, setIncludeForgiveness] = useState(true);
  const [forgivenessLine, setForgivenessLine] = useState(
    "I do not expect you to forgive this immediately, and I am not writing to ask you to. I am writing because you deserve a real apology and a real plan, and because our working relationship matters to me."
  );
  const [tone, setTone] = useState<Tone>("personal-warm");

  const salutation = useMemo(() => {
    if (tone === "formal-business") return `Dear ${recipientName},`;
    return `Dear ${recipientName},`;
  }, [tone, recipientName]);

  const signOff = useMemo(() => {
    if (tone === "formal-business") return "Sincerely,";
    return "With sincere regret,";
  }, [tone]);

  const copyPlainText = async () => {
    const clean = (s: string) => s.replace(/&mdash;/g, "—").replace(/&rsquo;/g, "'").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"');
    const lines: string[] = [];
    lines.push(date);
    lines.push("");
    lines.push(salutation);
    lines.push("");
    lines.push(clean(whatHappened));
    lines.push("");
    lines.push(clean(acknowledgment));
    lines.push("");
    lines.push(clean(responsibility));
    lines.push("");
    lines.push(clean(commitment));
    lines.push("");
    lines.push(clean(amends));
    if (includeForgiveness && forgivenessLine.trim()) {
      lines.push("");
      lines.push(clean(forgivenessLine));
    }
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
            <span className="block text-sm font-medium text-slate-700 mb-1">Recipient name</span>
            <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Date</span>
            <input type="text" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Tone</span>
            <select value={tone} onChange={(e) => setTone(e.target.value as Tone)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
              <option value="formal-business">Formal business</option>
              <option value="personal-warm">Personal / warm</option>
            </select>
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">What happened</span>
          <textarea rows={3} value={whatHappened} onChange={(e) => setWhatHappened(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Acknowledgment of impact</span>
          <textarea rows={4} value={acknowledgment} onChange={(e) => setAcknowledgment(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Responsibility taken</span>
          <textarea rows={3} value={responsibility} onChange={(e) => setResponsibility(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          <span className="block text-xs text-slate-500 mt-1">Avoid &ldquo;sorry if&rdquo; &mdash; the default uses &ldquo;I am sorry that&hellip;&rdquo; which takes real ownership.</span>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Commitment to not repeat</span>
          <textarea rows={3} value={commitment} onChange={(e) => setCommitment(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Amends offered</span>
          <textarea rows={3} value={amends} onChange={(e) => setAmends(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={includeForgiveness} onChange={(e) => setIncludeForgiveness(e.target.checked)} className="rounded border-slate-300" />
          Include closing line about forgiveness / relationship
        </label>
        {includeForgiveness && (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Forgiveness / relationship line</span>
            <textarea rows={3} value={forgivenessLine} onChange={(e) => setForgivenessLine(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
        )}
        <div className="flex gap-2 pt-2">
          <button onClick={() => window.print()} className="bg-brand text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-dark">Print / Save as PDF</button>
          <button onClick={copyPlainText} className="bg-slate-100 text-slate-700 rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-200">Copy as text</button>
        </div>
      </div>

      <div className="print:col-span-2 print:p-0 print:max-w-none">
        <div className="bg-white border border-slate-200 rounded-xl p-8 font-serif text-slate-900 print:border-0 print:rounded-none print:p-0 leading-relaxed">
          <div className="text-sm">{date}</div>
          <div className="h-4" />
          <p className="text-sm">{salutation}</p>
          <div className="h-3" />
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: whatHappened }} />
          <div className="h-3" />
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: acknowledgment }} />
          <div className="h-3" />
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: responsibility }} />
          <div className="h-3" />
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: commitment }} />
          <div className="h-3" />
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: amends }} />
          {includeForgiveness && forgivenessLine.trim() && (
            <>
              <div className="h-3" />
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: forgivenessLine }} />
            </>
          )}
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
