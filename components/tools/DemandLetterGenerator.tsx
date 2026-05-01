"use client";

import { useMemo, useState } from "react";

type Type = "unpaid_invoice" | "breach_of_contract" | "personal_loan" | "deposit_return" | "property_damage";

const TYPE_LABEL: Record<Type, string> = {
  unpaid_invoice: "Unpaid invoice / services rendered",
  breach_of_contract: "Breach of contract",
  personal_loan: "Personal loan repayment",
  deposit_return: "Security deposit return",
  property_damage: "Property damage",
};

export function DemandLetterGenerator() {
  const [type, setType] = useState<Type>("unpaid_invoice");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [senderName, setSenderName] = useState<string>("Sender Name");
  const [senderAddress, setSenderAddress] = useState<string>("123 Sender St\nCity, State 00000");
  const [recipientName, setRecipientName] = useState<string>("Recipient Name");
  const [recipientAddress, setRecipientAddress] = useState<string>("456 Recipient Ave\nCity, State 00000");
  const [amount, setAmount] = useState<string>("$3,500");
  const [origDate, setOrigDate] = useState<string>("2026-03-15");
  const [details, setDetails] = useState<string>("Invoice #2026-0042 issued on March 15, 2026 for graphic design services rendered between January and March 2026.");
  const [deadline, setDeadline] = useState<number>(14);

  const deadlineDate = useMemo(() => {
    const d = new Date(date);
    d.setDate(d.getDate() + deadline);
    return d.toISOString().slice(0, 10);
  }, [date, deadline]);

  const subject = `Final Demand for Payment — ${TYPE_LABEL[type]}`;

  const body = useMemo(() => {
    const intros: Record<Type, string> = {
      unpaid_invoice: `This letter serves as a formal demand for payment of an outstanding invoice in the amount of ${amount}, originally due on ${origDate}.`,
      breach_of_contract: `This letter serves as a formal demand for payment of ${amount} relating to a breach of contract dated ${origDate}.`,
      personal_loan: `This letter serves as a formal demand for repayment of a personal loan in the amount of ${amount} extended to you on ${origDate}.`,
      deposit_return: `This letter serves as a formal demand for the return of a security deposit in the amount of ${amount}, originally provided on ${origDate}.`,
      property_damage: `This letter serves as a formal demand for compensation in the amount of ${amount} for property damage occurring on ${origDate}.`,
    };
    return `${intros[type]}\n\nDetails:\n${details}\n\nDespite previous communications, this amount remains unpaid. I am hereby providing you with a final opportunity to resolve this matter without further legal action.\n\nDEMAND: I demand payment of ${amount} in full no later than ${deadlineDate} (${deadline} days from the date of this letter).\n\nIf payment is not received by that date, I will have no choice but to pursue all available legal remedies, which may include filing a civil claim in the appropriate court, reporting the debt to credit bureaus where applicable, and seeking recovery of additional costs including court fees and attorney's fees as permitted by law.\n\nThis matter is serious. I hope it can be resolved without litigation.`;
  }, [type, amount, origDate, details, deadline, deadlineDate]);

  const handlePrint = () => window.print();

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 print:hidden">
        <label className="block text-sm"><span className="mb-1 block font-medium">Type of demand</span>
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
        <label className="block text-sm"><span className="mb-1 block font-medium">Amount owed</span>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">Original date</span>
          <input type="date" value={origDate} onChange={(e) => setOrigDate(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm sm:col-span-2"><span className="mb-1 block font-medium">Details (invoice #, services, contract clause, etc.)</span>
          <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={3} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">Deadline (days from letter date)</span>
          <input type="number" min={3} max={60} value={deadline} onChange={(e) => setDeadline(parseInt(e.target.value) || 14)} className="w-full rounded border border-slate-300 px-3 py-2" />
          <span className="mt-1 block text-xs text-slate-500">10-30 days standard. Some jurisdictions require specific minimums.</span>
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
          <p className="mt-4 whitespace-pre-line">{body}</p>
          <p className="mt-6">Sincerely,</p>
          <p className="mt-12">{senderName}</p>
        </div>
      </div>

      <div className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 print:hidden">
        <strong>Important — not legal advice:</strong> demand letters are generally a precursor to legal action. They must comply with state law (FDCPA if a debt collector, varied state requirements). For amounts over a few thousand dollars, complex disputes, or anything involving a dispute over goods/services delivered: consult a lawyer. Send via certified mail, return receipt requested. Keep copies. Document all responses.
      </div>
    </div>
  );
}
