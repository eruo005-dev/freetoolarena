"use client";

import { useState } from "react";

type Type = "credit_report" | "billing" | "credit_card_charge" | "bank_error" | "medical_bill" | "subscription_charge";

const TYPE_LABEL: Record<Type, string> = {
  credit_report: "Credit report error (FCRA dispute)",
  billing: "Billing dispute (FTC Fair Credit Billing Act)",
  credit_card_charge: "Credit card chargeback",
  bank_error: "Bank error / unauthorized transaction",
  medical_bill: "Medical bill dispute",
  subscription_charge: "Unwanted subscription charge",
};

export function DisputeLetterGenerator() {
  const [type, setType] = useState<Type>("credit_report");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [senderName, setSenderName] = useState<string>("Your Name");
  const [senderAddress, setSenderAddress] = useState<string>("123 Sender St\nCity, State 00000");
  const [accountNumber, setAccountNumber] = useState<string>("XXXX-XXXX-XXXX-1234");
  const [creditorName, setCreditorName] = useState<string>("Creditor / Bureau Name");
  const [creditorAddress, setCreditorAddress] = useState<string>("PO Box 0000\nDispute City, State 00000");
  const [errorDescription, setErrorDescription] = useState<string>("A late payment marked on March 15, 2026, for $250. I made the payment on March 1, 2026 (confirmation #ABC123) — see attached bank statement showing the cleared payment.");
  const [resolution, setResolution] = useState<string>("Remove the late payment notation from my credit file");
  const [amount, setAmount] = useState<string>("$250");

  const lawByType: Record<Type, string> = {
    credit_report: "Pursuant to the Fair Credit Reporting Act (FCRA), 15 U.S.C. § 1681i, you must investigate this dispute within 30 days and remove or correct any inaccurate information.",
    billing: "Pursuant to the Fair Credit Billing Act (FCBA), 15 U.S.C. § 1666, this letter constitutes my formal billing dispute. You must acknowledge receipt within 30 days and resolve the dispute within 90 days.",
    credit_card_charge: "I am formally disputing this charge under the Fair Credit Billing Act (FCBA) and requesting a chargeback.",
    bank_error: "Pursuant to the Electronic Fund Transfer Act (15 U.S.C. § 1693f), you must investigate and resolve this dispute within 10 business days (or 45 days with provisional credit).",
    medical_bill: "I am formally disputing this medical bill and requesting itemized records pursuant to the No Surprises Act and applicable state law.",
    subscription_charge: "I did not authorize this charge. I am disputing it under the Fair Credit Billing Act and requesting a refund or chargeback.",
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
        <label className="block text-sm"><span className="mb-1 block font-medium">Account / reference number</span>
          <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">Your address</span>
          <textarea value={senderAddress} onChange={(e) => setSenderAddress(e.target.value)} rows={2} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">Creditor / bureau address</span>
          <textarea value={creditorAddress} onChange={(e) => setCreditorAddress(e.target.value)} rows={2} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">Creditor / bureau name</span>
          <input value={creditorName} onChange={(e) => setCreditorName(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">Disputed amount (if any)</span>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm sm:col-span-2"><span className="mb-1 block font-medium">Error description (be specific — dates, amounts, evidence)</span>
          <textarea value={errorDescription} onChange={(e) => setErrorDescription(e.target.value)} rows={4} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm sm:col-span-2"><span className="mb-1 block font-medium">Resolution requested</span>
          <input value={resolution} onChange={(e) => setResolution(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <button onClick={handlePrint} className="rounded bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark print:hidden">Print / save as PDF</button>

      <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm print:border-0 print:shadow-none">
        <style>{`@media print { @page { margin: 0.75in; } }`}</style>
        <div className="text-sm leading-relaxed text-slate-900">
          <p>{date}</p>
          <p className="mt-4 whitespace-pre-line">{senderName}<br />{senderAddress}</p>
          <p className="mt-6 whitespace-pre-line">{creditorName}<br />{creditorAddress}</p>
          <p className="mt-6 font-bold">VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED</p>
          <p className="mt-4 font-bold">RE: Dispute — Account / Reference {accountNumber} ({TYPE_LABEL[type]})</p>
          <p className="mt-4">To Whom It May Concern:</p>
          <p className="mt-4">I am writing to formally dispute the following error related to my account:</p>
          <p className="mt-3 whitespace-pre-line border-l-4 border-slate-300 pl-4">{errorDescription}</p>
          {amount && <p className="mt-3"><strong>Disputed amount:</strong> {amount}</p>}
          <p className="mt-4">{lawByType[type]}</p>
          <p className="mt-4"><strong>Resolution requested:</strong> {resolution}.</p>
          <p className="mt-4">Please send me written confirmation of your investigation results, the actions taken, and any updated account/credit-file information. Until this dispute is resolved, please mark the account as &ldquo;disputed&rdquo; in your records as required by applicable law.</p>
          <p className="mt-4">If I do not receive a satisfactory response within the timeframes required by law, I will pursue all available remedies, including filing complaints with the Consumer Financial Protection Bureau (CFPB), my state Attorney General, and (where applicable) civil action.</p>
          <p className="mt-4">Thank you for your prompt attention to this matter.</p>
          <p className="mt-6">Sincerely,</p>
          <p className="mt-12">{senderName}</p>
          <p className="mt-4 text-xs italic text-slate-600">Enclosures: [List supporting documents — bank statements, screenshots, prior correspondence]</p>
        </div>
      </div>

      <div className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 print:hidden">
        <strong>Not legal advice.</strong> Send via certified mail with return receipt. Keep copies. For credit-bureau disputes, you can also file at <code>annualcreditreport.com</code> or directly with Equifax/Experian/TransUnion online — but a written letter creates the strongest paper trail. CFPB complaint portal at <code>consumerfinance.gov/complaint</code> is the next step if creditor refuses to respond.
      </div>
    </div>
  );
}
