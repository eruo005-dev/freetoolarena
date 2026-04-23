"use client";

import { useState } from "react";

type Relationship = "former-employee" | "student" | "colleague" | "mentee";

interface Strength {
  id: string;
  skill: string;
  example: string;
}

const RELATIONSHIP_LABEL: Record<Relationship, string> = {
  "former-employee": "former employee",
  student: "student",
  colleague: "colleague",
  mentee: "mentee",
};

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function RecommendationLetterGenerator() {
  const [yourName, setYourName] = useState("Dr. Priya Shah");
  const [yourTitle, setYourTitle] = useState("Vice President of Product");
  const [yourCompany, setYourCompany] = useState("Northwind Labs");
  const [yourAddress, setYourAddress] = useState("88 Harbor Street, Suite 400\nSeattle, WA 98101");
  const [yourContact, setYourContact] = useState("priya.shah@northwindlabs.com  |  (206) 555-0142");
  const [date, setDate] = useState("April 23, 2026");
  const [candidateName, setCandidateName] = useState("Marcus Chen");
  const [relationship, setRelationship] = useState<Relationship>("former-employee");
  const [capacity, setCapacity] = useState(
    "directly supervised Marcus for three years while he served as a Senior Product Manager on the platform team, where he led a cross-functional group of eight engineers and designers."
  );
  const [strengths, setStrengths] = useState<Strength[]>([
    {
      id: uid(),
      skill: "Strategic thinking",
      example: "He rebuilt our onboarding funnel from first principles, which lifted activation by 34% in a single quarter.",
    },
    {
      id: uid(),
      skill: "Calm, decisive leadership",
      example: "When our largest customer escalated a critical bug the night before launch, he coordinated the fix with three time zones and shipped the patch before the SLA window closed.",
    },
    {
      id: uid(),
      skill: "Genuine care for his team",
      example: "Two of his direct reports were promoted under his mentorship, and every single person on his team cited him as their reason for staying through a difficult reorg.",
    },
  ]);
  const [qualifications, setQualifications] = useState(
    "Marcus combines sharp analytical judgment with unusual emotional intelligence. He is the kind of leader who can walk into an ambiguous problem, find the signal inside the noise within days, and then bring an entire organization along with him. In a field that often rewards volume over clarity, he is consistently the most thoughtful voice in the room."
  );
  const [endorsement, setEndorsement] = useState(
    "I recommend Marcus Chen without reservation. He would be an exceptional addition to any team lucky enough to have him, and I fully expect him to be running his own organization within a few short years."
  );
  const [contactLine, setContactLine] = useState(
    "Please do not hesitate to contact me directly if I can answer any further questions about Marcus or his work."
  );
  const [recipient, setRecipient] = useState("Hiring Committee");

  function updateStrength(id: string, patch: Partial<Strength>) {
    setStrengths((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  const copyPlainText = async () => {
    const lines: string[] = [];
    lines.push(yourName);
    lines.push(yourTitle);
    lines.push(yourCompany);
    lines.push(...yourAddress.split("\n"));
    lines.push(yourContact);
    lines.push("");
    lines.push(date);
    lines.push("");
    lines.push(`To ${recipient}:`);
    lines.push("");
    lines.push(
      `It is my distinct pleasure to recommend ${candidateName} for any position or program he pursues. I have known ${candidateName} as a ${RELATIONSHIP_LABEL[relationship]} and ${capacity}`
    );
    lines.push("");
    lines.push(`Among his many strengths, three stand out most clearly:`);
    strengths.forEach((s, i) => {
      lines.push(`${i + 1}. ${s.skill} — ${s.example}`);
    });
    lines.push("");
    lines.push(qualifications);
    lines.push("");
    lines.push(endorsement);
    lines.push("");
    lines.push(contactLine);
    lines.push("");
    lines.push("Sincerely,");
    lines.push("");
    lines.push("");
    lines.push("");
    lines.push(yourName);
    lines.push(yourTitle);
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
            <span className="block text-sm font-medium text-slate-700 mb-1">Your title</span>
            <input type="text" value={yourTitle} onChange={(e) => setYourTitle(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Your company</span>
          <input type="text" value={yourCompany} onChange={(e) => setYourCompany(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Your address</span>
          <textarea rows={2} value={yourAddress} onChange={(e) => setYourAddress(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Your email / phone</span>
          <input type="text" value={yourContact} onChange={(e) => setYourContact(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Date</span>
            <input type="text" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Addressed to</span>
            <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Candidate name</span>
            <input type="text" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Relationship</span>
            <select value={relationship} onChange={(e) => setRelationship(e.target.value as Relationship)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
              <option value="former-employee">Former employee</option>
              <option value="student">Student</option>
              <option value="colleague">Colleague</option>
              <option value="mentee">Mentee</option>
            </select>
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Capacity (how you know them)</span>
          <textarea rows={3} value={capacity} onChange={(e) => setCapacity(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <div className="space-y-2">
          <span className="block text-sm font-medium text-slate-700">Three strengths (with specific examples)</span>
          {strengths.map((s, i) => (
            <div key={s.id} className="space-y-1 border border-slate-200 rounded-lg p-3">
              <input type="text" value={s.skill} onChange={(e) => updateStrength(s.id, { skill: e.target.value })} placeholder={`Strength ${i + 1}`} className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
              <textarea rows={2} value={s.example} onChange={(e) => updateStrength(s.id, { example: e.target.value })} placeholder="Specific example" className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
            </div>
          ))}
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Qualifications paragraph</span>
          <textarea rows={4} value={qualifications} onChange={(e) => setQualifications(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Closing endorsement</span>
          <textarea rows={3} value={endorsement} onChange={(e) => setEndorsement(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Contact-me line</span>
          <textarea rows={2} value={contactLine} onChange={(e) => setContactLine(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
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
            <div>{yourTitle}</div>
            <div>{yourCompany}</div>
            <div className="whitespace-pre-line">{yourAddress}</div>
            <div>{yourContact}</div>
          </div>
          <div className="h-4" />
          <div className="text-sm">{date}</div>
          <div className="h-4" />
          <p className="text-sm">To {recipient}:</p>
          <div className="h-3" />
          <p className="text-sm">
            It is my distinct pleasure to recommend {candidateName} for any position or program he pursues. I have known {candidateName} as a {RELATIONSHIP_LABEL[relationship]} and {capacity}
          </p>
          <div className="h-3" />
          <p className="text-sm">Among his many strengths, three stand out most clearly:</p>
          <div className="h-2" />
          <ol className="text-sm list-decimal pl-6 space-y-2">
            {strengths.map((s) => (
              <li key={s.id}>
                <span className="font-semibold">{s.skill}.</span> {s.example}
              </li>
            ))}
          </ol>
          <div className="h-3" />
          <p className="text-sm">{qualifications}</p>
          <div className="h-3" />
          <p className="text-sm">{endorsement}</p>
          <div className="h-3" />
          <p className="text-sm">{contactLine}</p>
          <div className="h-4" />
          <p className="text-sm">Sincerely,</p>
          <div className="h-12" />
          <p className="text-sm">{yourName}</p>
          <p className="text-sm">{yourTitle}</p>
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
