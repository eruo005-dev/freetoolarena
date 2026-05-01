"use client";

import { useMemo, useState } from "react";

type Type = "harassment" | "trademark" | "copyright" | "defamation" | "debt_collection" | "neighbor_dispute";

const TYPE_LABEL: Record<Type, string> = {
  harassment: "Harassment / unwanted contact",
  trademark: "Trademark infringement",
  copyright: "Copyright infringement",
  defamation: "Defamation / false statements",
  debt_collection: "Improper debt collection",
  neighbor_dispute: "Neighbor / property dispute",
};

export function CeaseAndDesistGenerator() {
  const [type, setType] = useState<Type>("harassment");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [senderName, setSenderName] = useState<string>("Sender Name");
  const [senderAddress, setSenderAddress] = useState<string>("123 Sender St\nCity, State 00000");
  const [recipientName, setRecipientName] = useState<string>("Recipient Name");
  const [recipientAddress, setRecipientAddress] = useState<string>("456 Recipient Ave\nCity, State 00000");
  const [conduct, setConduct] = useState<string>("repeated unwanted phone calls and text messages to my personal cell phone, occurring multiple times daily despite my prior request that you stop");
  const [evidence, setEvidence] = useState<string>("Phone records dated March 1-15, 2026 showing 47 incoming calls. Text message logs from the same period.");
  const [demand, setDemand] = useState<string>("immediately cease and desist all further contact with me, my family members, and my employer");

  const subject = useMemo(() => `CEASE AND DESIST — ${TYPE_LABEL[type]}`, [type]);

  const introByType: Record<Type, string> = {
    harassment: "Your continued conduct constitutes harassment under applicable state law and may also violate federal statutes including the Telephone Consumer Protection Act (TCPA) and applicable anti-stalking laws.",
    trademark: "You are using a mark that is confusingly similar to a registered trademark in which I/my company holds rights. Your use creates likelihood of consumer confusion in violation of the Lanham Act (15 U.S.C. § 1125).",
    copyright: "You have published or distributed material that infringes copyrights I own. Your unauthorized reproduction, distribution, or display violates 17 U.S.C. § 501.",
    defamation: "You have published statements about me that are false and defamatory, causing damage to my reputation. These statements appear to constitute defamation under applicable state law.",
    debt_collection: "Your debt collection conduct violates the Fair Debt Collection Practices Act (15 U.S.C. § 1692 et seq.) and applicable state consumer protection laws.",
    neighbor_dispute: "Your conduct on or affecting my property constitutes a continuing nuisance and/or trespass under applicable state law.",
  };

  const handlePrint = () => window.print();

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 print:hidden">
        <label className="block text-sm"><span className="mb-1 block font-medium">Type of dispute</span>
          <select value={type} onChange={(e) => setType(e.target.value as Type)} className="w-full rounded border border-slate-300 px-3 py-2">
            {(Object.keys(TYPE_LABEL) as Type[]).map((t) => <option key={t} value={t}>{TYPE_LABEL[t]}</option>)}
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">Letter date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">Your name</span>
          <input value={senderName} onChange={(e) => setSenderName(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">Recipient name</span>
          <input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">Your address</span>
          <textarea value={senderAddress} onChange={(e) => setSenderAddress(e.target.value)} rows={2} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">Recipient address</span>
          <textarea value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} rows={2} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm sm:col-span-2"><span className="mb-1 block font-medium">Specific conduct to cease</span>
          <textarea value={conduct} onChange={(e) => setConduct(e.target.value)} rows={2} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm sm:col-span-2"><span className="mb-1 block font-medium">Evidence (be specific — dates, records, screenshots)</span>
          <textarea value={evidence} onChange={(e) => setEvidence(e.target.value)} rows={3} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm sm:col-span-2"><span className="mb-1 block font-medium">Specific demand</span>
          <textarea value={demand} onChange={(e) => setDemand(e.target.value)} rows={2} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
        </label>
      </div>

      <button onClick={handlePrint} className="rounded bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark print:hidden">Print / save as PDF</button>

      <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm print:border-0 print:shadow-none">
        <style>{`@media print { @page { margin: 0.75in; } }`}</style>
        <div className="text-sm leading-relaxed text-slate-900">
          <p>{date}</p>
          <p className="mt-4 whitespace-pre-line">{senderName}<br />{senderAddress}</p>
          <p className="mt-6 whitespace-pre-line">{recipientName}<br />{recipientAddress}</p>
          <p className="mt-6 font-bold">VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED</p>
          <p className="mt-4 font-bold">RE: {subject}</p>
          <p className="mt-4">Dear {recipientName.split(" ")[0]}:</p>
          <p className="mt-4">This letter constitutes formal notice that you must cease and desist the following conduct: {conduct}.</p>
          <p className="mt-4 font-semibold">Specific evidence of this conduct includes:</p>
          <p className="whitespace-pre-line">{evidence}</p>
          <p className="mt-4">{introByType[type]}</p>
          <p className="mt-4 font-bold uppercase">Demand:</p>
          <p>I demand that you {demand}, effective immediately upon receipt of this letter.</p>
          <p className="mt-4">Should you fail to comply with this demand, I will pursue all available legal remedies, which may include injunctive relief, monetary damages, and recovery of attorney&rsquo;s fees and court costs as permitted by law.</p>
          <p className="mt-4">This letter is sent without prejudice to any rights or remedies available to me, all of which are expressly reserved.</p>
          <p className="mt-4">Govern yourself accordingly.</p>
          <p className="mt-6">Sincerely,</p>
          <p className="mt-12">{senderName}</p>
        </div>
      </div>

      <div className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 print:hidden">
        <strong>Not legal advice:</strong> a cease-and-desist letter is a formal warning, not a court order. Recipients are not legally required to comply, but the letter establishes a paper trail useful in subsequent litigation. For trademark/copyright disputes, defamation cases, or anything involving real damages, consult a lawyer. Send via certified mail, keep copies, document any continuation of the conduct.
      </div>
    </div>
  );
}
