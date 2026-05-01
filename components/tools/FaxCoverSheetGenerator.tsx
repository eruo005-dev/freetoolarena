"use client";

import { useState } from "react";

type Urgency = "routine" | "urgent" | "for-review" | "please-reply" | "please-recycle";

const URGENCY_LABEL: Record<Urgency, string> = {
  routine: "ROUTINE",
  urgent: "URGENT",
  "for-review": "FOR REVIEW",
  "please-reply": "PLEASE REPLY",
  "please-recycle": "PLEASE RECYCLE",
};

export function FaxCoverSheetGenerator() {
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [toName, setToName] = useState<string>("Dr. Pat Recipient");
  const [toCompany, setToCompany] = useState<string>("Recipient Practice");
  const [toFax, setToFax] = useState<string>("(555) 123-0001");
  const [toPhone, setToPhone] = useState<string>("(555) 123-0000");
  const [fromName, setFromName] = useState<string>("Sender Name");
  const [fromCompany, setFromCompany] = useState<string>("Sending Practice");
  const [fromFax, setFromFax] = useState<string>("(555) 999-0001");
  const [fromPhone, setFromPhone] = useState<string>("(555) 999-0000");
  const [pages, setPages] = useState<number>(3);
  const [subject, setSubject] = useState<string>("Patient records — referral");
  const [urgency, setUrgency] = useState<Urgency>("routine");
  const [notes, setNotes] = useState<string>("Records attached as discussed by phone today. Please confirm receipt.");
  const [confidential, setConfidential] = useState<boolean>(true);

  const handlePrint = () => window.print();

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 print:hidden">
        <label className="block text-sm"><span className="mb-1 block font-medium">Date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">Pages (incl. cover)</span>
          <input type="number" min={1} value={pages} onChange={(e) => setPages(parseInt(e.target.value) || 1)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">To name</span>
          <input value={toName} onChange={(e) => setToName(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">To company</span>
          <input value={toCompany} onChange={(e) => setToCompany(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">To fax</span>
          <input value={toFax} onChange={(e) => setToFax(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">To phone</span>
          <input value={toPhone} onChange={(e) => setToPhone(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">From name</span>
          <input value={fromName} onChange={(e) => setFromName(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">From company</span>
          <input value={fromCompany} onChange={(e) => setFromCompany(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">From fax</span>
          <input value={fromFax} onChange={(e) => setFromFax(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">From phone</span>
          <input value={fromPhone} onChange={(e) => setFromPhone(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm sm:col-span-2"><span className="mb-1 block font-medium">Subject</span>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium">Urgency mark</span>
          <select value={urgency} onChange={(e) => setUrgency(e.target.value as Urgency)} className="w-full rounded border border-slate-300 px-3 py-2">
            {(Object.keys(URGENCY_LABEL) as Urgency[]).map((u) => <option key={u} value={u}>{URGENCY_LABEL[u]}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm sm:mt-6">
          <input type="checkbox" checked={confidential} onChange={(e) => setConfidential(e.target.checked)} />
          Include HIPAA-style confidentiality notice
        </label>
        <label className="block text-sm sm:col-span-2"><span className="mb-1 block font-medium">Notes / message</span>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
        </label>
      </div>

      <button onClick={handlePrint} className="rounded bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark print:hidden">Print / save as PDF</button>

      <div className="rounded-lg border-2 border-slate-300 bg-white p-8 shadow-sm print:border-0 print:shadow-none">
        <style>{`@media print { @page { margin: 0.75in; } }`}</style>
        <div className="border-b-4 border-slate-800 pb-3">
          <div className="flex items-baseline justify-between">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">FAX</h1>
            <div className="rounded border-2 border-slate-800 px-3 py-1 text-sm font-bold text-slate-900">
              {URGENCY_LABEL[urgency]}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-x-4 text-sm">
            <div><strong>Date:</strong> {date}</div>
            <div><strong>Pages (incl. cover):</strong> {pages}</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
          <div>
            <div className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">To</div>
            <div className="font-semibold">{toName}</div>
            <div>{toCompany}</div>
            <div className="mt-1">Fax: {toFax}</div>
            <div>Phone: {toPhone}</div>
          </div>
          <div>
            <div className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">From</div>
            <div className="font-semibold">{fromName}</div>
            <div>{fromCompany}</div>
            <div className="mt-1">Fax: {fromFax}</div>
            <div>Phone: {fromPhone}</div>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-300 pt-4 text-sm">
          <div className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">Re:</div>
          <div className="font-semibold">{subject}</div>
        </div>

        <div className="mt-4 text-sm">
          <div className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">Notes</div>
          <p className="whitespace-pre-line">{notes}</p>
        </div>

        {confidential && (
          <div className="mt-10 border-t-2 border-slate-300 pt-3 text-xs text-slate-700">
            <strong>CONFIDENTIALITY NOTICE:</strong> The information contained in this facsimile transmission is privileged and confidential, intended only for the use of the addressee named above. If you are not the intended recipient, you are hereby notified that any disclosure, copying, or distribution of this information is strictly prohibited. If you have received this transmission in error, please notify the sender immediately by telephone and destroy the original.
          </div>
        )}
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 print:hidden">
        <strong>When fax still wins:</strong> medical (HIPAA), legal filings, escrow, certain government agencies. Most US healthcare still requires
        fax for inter-practice records. Online fax services (eFax, HelloFax, FaxZero free tier) bridge to internet.
      </div>
    </div>
  );
}
