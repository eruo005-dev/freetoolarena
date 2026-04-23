"use client";

import { useMemo, useState } from "react";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

export function NdaGenerator() {
  const [ndaType, setNdaType] = useState<"one-way" | "mutual">("one-way");
  const [disclosingName, setDisclosingName] = useState("Northstar Labs, Inc.");
  const [disclosingAddress, setDisclosingAddress] = useState("220 Market Street, Suite 800, San Francisco, CA 94105");
  const [disclosingState, setDisclosingState] = useState("California");
  const [receivingName, setReceivingName] = useState("Jordan Ellis");
  const [receivingAddress, setReceivingAddress] = useState("512 Willow Ave, Denver, CO 80203");
  const [receivingState, setReceivingState] = useState("Colorado");
  const [effectiveDate, setEffectiveDate] = useState(todayISO());
  const [termYears, setTermYears] = useState("3");
  const [purpose, setPurpose] = useState(
    "The parties wish to explore a potential business relationship relating to a confidential software product roadmap, including architecture, customer data, and pricing strategy (the \"Purpose\"). In connection with the Purpose, Confidential Information may be disclosed, including but not limited to business plans, financial information, product designs, source code, customer lists, marketing strategies, and trade secrets."
  );
  const [governingLaw, setGoverningLaw] = useState("California");
  const [sig1Name, setSig1Name] = useState("Priya Desai");
  const [sig1Title, setSig1Title] = useState("Chief Executive Officer");
  const [sig1Date, setSig1Date] = useState(todayISO());
  const [sig2Name, setSig2Name] = useState("Jordan Ellis");
  const [sig2Title, setSig2Title] = useState("Independent Consultant");
  const [sig2Date, setSig2Date] = useState(todayISO());
  const [copied, setCopied] = useState(false);

  const termNum = useMemo(() => Math.max(1, parseInt(termYears, 10) || 3), [termYears]);
  const isMutual = ndaType === "mutual";

  const partyLabel = isMutual ? "each party (as a \"Receiving Party\")" : "the Receiving Party";
  const discloserLabel = isMutual ? "the other party (as the \"Disclosing Party\")" : "the Disclosing Party";

  const copyPlainText = async () => {
    const lines: string[] = [];
    lines.push("NON-DISCLOSURE AGREEMENT");
    lines.push("");
    lines.push("Not legal advice. This template is provided for reference only. Laws vary by jurisdiction. Have a licensed attorney review any contract before signing.");
    lines.push("");
    lines.push(`This Non-Disclosure Agreement (this "Agreement") is entered into as of ${effectiveDate} (the "Effective Date") by and between ${disclosingName}, with an address at ${disclosingAddress} ("Disclosing Party"), and ${receivingName}, with an address at ${receivingAddress} ("Receiving Party"). ${isMutual ? "This is a mutual agreement; each party may act as a Disclosing Party or a Receiving Party." : "This is a one-way agreement; only the Disclosing Party will disclose Confidential Information."}`);
    lines.push("");
    lines.push("1. Confidential Information.");
    lines.push(purpose);
    lines.push("");
    lines.push(`2. Non-Use and Non-Disclosure. ${isMutual ? "Each party" : "The Receiving Party"} agrees to use the Confidential Information solely for the Purpose and not to disclose such Confidential Information to any third party without the prior written consent of ${isMutual ? "the disclosing party" : "the Disclosing Party"}. ${isMutual ? "Each party" : "The Receiving Party"} shall protect the Confidential Information using at least the same degree of care it uses to protect its own confidential information, but in no event less than a reasonable standard of care.`);
    lines.push("");
    lines.push(`3. Term. The obligations of ${partyLabel} under this Agreement shall remain in effect for a period of ${termNum} year${termNum === 1 ? "" : "s"} from the Effective Date, except that obligations with respect to trade secrets shall continue for as long as such information qualifies as a trade secret under applicable law.`);
    lines.push("");
    lines.push(`4. Return of Materials. Upon written request of ${discloserLabel}, or upon termination of this Agreement, ${partyLabel} shall promptly return or destroy all Confidential Information in its possession, including copies, and certify such return or destruction in writing.`);
    lines.push("");
    lines.push(`5. No License. Nothing in this Agreement grants ${partyLabel} any license, title, or interest in or to the Confidential Information or any intellectual property rights of ${discloserLabel}. All Confidential Information remains the property of ${discloserLabel}.`);
    lines.push("");
    lines.push(`6. Remedies. ${partyLabel} acknowledges that any breach of this Agreement may cause irreparable harm for which monetary damages would be inadequate, and that ${discloserLabel} shall be entitled to seek injunctive relief, in addition to any other remedies available at law or in equity.`);
    lines.push("");
    lines.push(`7. Governing Law. This Agreement shall be governed by and construed in accordance with the laws of the State of ${governingLaw}, without regard to its conflict of laws principles. The parties consent to the exclusive jurisdiction of the state and federal courts located in ${governingLaw}.`);
    lines.push("");
    lines.push("IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.");
    lines.push("");
    lines.push(`Disclosing Party: ${disclosingName}`);
    lines.push(`By: ${sig1Name}`);
    lines.push(`Title: ${sig1Title}`);
    lines.push(`Date: ${sig1Date}`);
    lines.push("");
    lines.push(`Receiving Party: ${receivingName}`);
    lines.push(`By: ${sig2Name}`);
    lines.push(`Title: ${sig2Title}`);
    lines.push(`Date: ${sig2Date}`);
    const text = lines.join("\n");
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:block">
      {/* Form column */}
      <div className="space-y-4 print:hidden">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">NDA type</span>
          <select
            value={ndaType}
            onChange={(e) => setNdaType(e.target.value as "one-way" | "mutual")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
          >
            <option value="one-way">One-way (unilateral)</option>
            <option value="mutual">Mutual (bilateral)</option>
          </select>
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Disclosing Party</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Name</span>
          <input
            value={disclosingName}
            onChange={(e) => setDisclosingName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Address</span>
          <input
            value={disclosingAddress}
            onChange={(e) => setDisclosingAddress(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">State</span>
          <select
            value={disclosingState}
            onChange={(e) => setDisclosingState(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
          >
            {US_STATES.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Receiving Party</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Name</span>
          <input
            value={receivingName}
            onChange={(e) => setReceivingName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Address</span>
          <input
            value={receivingAddress}
            onChange={(e) => setReceivingAddress(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">State</span>
          <select
            value={receivingState}
            onChange={(e) => setReceivingState(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
          >
            {US_STATES.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Agreement details</h3>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Effective date</span>
            <input
              type="date"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Term (years)</span>
            <input
              type="number"
              min={1}
              max={20}
              value={termYears}
              onChange={(e) => setTermYears(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Purpose / definition of Confidential Information</span>
          <textarea
            rows={5}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Governing law (state)</span>
          <select
            value={governingLaw}
            onChange={(e) => setGoverningLaw(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
          >
            {US_STATES.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Disclosing Party signature</h3>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Signer name</span>
            <input value={sig1Name} onChange={(e) => setSig1Name(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Title</span>
            <input value={sig1Title} onChange={(e) => setSig1Title(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
        </div>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Signature date</span>
          <input type="date" value={sig1Date} onChange={(e) => setSig1Date(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Receiving Party signature</h3>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Signer name</span>
            <input value={sig2Name} onChange={(e) => setSig2Name(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Title</span>
            <input value={sig2Title} onChange={(e) => setSig2Title(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
        </div>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Signature date</span>
          <input type="date" value={sig2Date} onChange={(e) => setSig2Date(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
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
            {copied ? "Copied!" : "Copy as text"}
          </button>
        </div>
      </div>

      {/* Preview column */}
      <div className="print:col-span-2 print:p-0 print:max-w-none">
        <div className="bg-white border border-slate-200 rounded-xl p-8 font-serif text-slate-900 print:border-0 print:rounded-none print:p-0">
          <div className="mb-6 rounded-lg border-2 border-amber-400 bg-amber-50 p-4 text-sm text-amber-900 print:border-amber-700">
            <strong>Not legal advice.</strong> This template is provided for reference only. Laws vary by jurisdiction. Have a licensed attorney review any contract before signing.
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold tracking-widest uppercase">Non-Disclosure Agreement</h2>
            <p className="text-xs uppercase tracking-widest text-slate-600 mt-1">{isMutual ? "Mutual" : "One-Way"}</p>
          </div>

          <p className="text-sm leading-relaxed mb-5 text-justify">
            This Non-Disclosure Agreement (this &ldquo;Agreement&rdquo;) is entered into as of <span className="font-semibold">{effectiveDate}</span> (the &ldquo;Effective Date&rdquo;) by and between <span className="font-semibold">{disclosingName || "[Disclosing Party]"}</span>, with an address at <span className="italic">{disclosingAddress || "[address]"}</span> (&ldquo;Disclosing Party&rdquo;), and <span className="font-semibold">{receivingName || "[Receiving Party]"}</span>, with an address at <span className="italic">{receivingAddress || "[address]"}</span> (&ldquo;Receiving Party&rdquo;). {isMutual ? "This is a mutual agreement; each party may act as a Disclosing Party or a Receiving Party with respect to its own Confidential Information." : "This is a one-way agreement; only the Disclosing Party will disclose Confidential Information hereunder."} The parties agree as follows:
          </p>

          <ol className="space-y-4 text-sm leading-relaxed text-justify list-none pl-0">
            <li>
              <p><span className="font-bold">1. Confidential Information.</span> {purpose}</p>
            </li>
            <li>
              <p><span className="font-bold">2. Non-Use and Non-Disclosure.</span> {isMutual ? "Each party" : "The Receiving Party"} agrees to use the Confidential Information solely for the Purpose and not to disclose such Confidential Information to any third party without the prior written consent of {isMutual ? "the disclosing party" : "the Disclosing Party"}. {isMutual ? "Each party" : "The Receiving Party"} shall protect the Confidential Information using at least the same degree of care it uses to protect its own confidential information of a similar nature, but in no event less than a reasonable standard of care. Access shall be limited to {isMutual ? "each party&rsquo;s" : "the Receiving Party&rsquo;s"} employees, agents, and advisors who have a need to know and are bound by obligations of confidentiality no less restrictive than those set forth herein.</p>
            </li>
            <li>
              <p><span className="font-bold">3. Term.</span> The obligations of {partyLabel} under this Agreement shall remain in effect for a period of <span className="font-semibold">{termNum} year{termNum === 1 ? "" : "s"}</span> from the Effective Date, except that obligations with respect to trade secrets shall continue for as long as such information qualifies as a trade secret under applicable law.</p>
            </li>
            <li>
              <p><span className="font-bold">4. Return of Materials.</span> Upon written request of {discloserLabel}, or upon termination of this Agreement, {partyLabel} shall promptly return or destroy all Confidential Information in its possession, including all copies, notes, and derivatives thereof, and, if requested, certify such return or destruction in writing.</p>
            </li>
            <li>
              <p><span className="font-bold">5. No License.</span> Nothing in this Agreement grants {partyLabel} any license, title, or interest in or to the Confidential Information or any intellectual property rights of {discloserLabel}. All Confidential Information remains the sole and exclusive property of {discloserLabel}.</p>
            </li>
            <li>
              <p><span className="font-bold">6. Remedies.</span> {partyLabel} acknowledges that any breach of this Agreement may cause irreparable harm for which monetary damages would be an inadequate remedy, and that {discloserLabel} shall be entitled to seek injunctive or equitable relief, in addition to any other remedies available at law or in equity, without the requirement of posting a bond.</p>
            </li>
            <li>
              <p><span className="font-bold">7. Governing Law.</span> This Agreement shall be governed by and construed in accordance with the laws of the State of <span className="font-semibold">{governingLaw}</span>, without regard to its conflict of laws principles. The parties consent to the exclusive jurisdiction of the state and federal courts located in <span className="font-semibold">{governingLaw}</span> for any dispute arising out of or relating to this Agreement.</p>
            </li>
          </ol>

          <p className="text-sm leading-relaxed mt-6 mb-6 text-justify">
            IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.
          </p>

          <div className="grid grid-cols-2 gap-8 pt-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-600 mb-2">Disclosing Party</p>
              <p className="font-semibold">{disclosingName}</p>
              <div className="border-b border-slate-800 h-12 mt-6"></div>
              <p className="text-xs text-slate-700 mt-1">Signature</p>
              <p className="text-xs text-slate-600 mt-2">Name: {sig1Name}</p>
              <p className="text-xs text-slate-600">Title: {sig1Title}</p>
              <p className="text-xs text-slate-600">Date: {sig1Date}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-600 mb-2">Receiving Party</p>
              <p className="font-semibold">{receivingName}</p>
              <div className="border-b border-slate-800 h-12 mt-6"></div>
              <p className="text-xs text-slate-700 mt-1">Signature</p>
              <p className="text-xs text-slate-600 mt-2">Name: {sig2Name}</p>
              <p className="text-xs text-slate-600">Title: {sig2Title}</p>
              <p className="text-xs text-slate-600">Date: {sig2Date}</p>
            </div>
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
