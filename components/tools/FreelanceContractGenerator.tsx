"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDaysISO(iso: string, days: number): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
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

type PaymentStructure = "flat" | "hourly" | "milestones";
type IpOption = "work-for-hire" | "retain-license" | "shared";

export function FreelanceContractGenerator() {
  const [clientCompany, setClientCompany] = useState("Northstar Labs, Inc.");
  const [clientAddress, setClientAddress] = useState("220 Market Street, Suite 800, San Francisco, CA 94105");
  const [clientContact, setClientContact] = useState("Priya Desai, COO");
  const [contractorName, setContractorName] = useState("Jordan Ellis");
  const [contractorAddress, setContractorAddress] = useState("512 Willow Ave, Denver, CO 80203");
  const [contractorEmail, setContractorEmail] = useState("jordan@ellis.design");
  const [projectDescription, setProjectDescription] = useState(
    "Design and deliver a full visual identity system for the launch of Northstar Beacon, including logo suite, color and type system, marketing landing page mockups, and a one-page brand guideline document."
  );
  const [deliverables, setDeliverables] = useState(
    "Primary and secondary logo lockups (SVG + PNG)\nColor palette and typography system\nMarketing landing page mockup (desktop and mobile)\nOne-page PDF brand guideline\nSource files (Figma)"
  );
  const [startDate, setStartDate] = useState(todayISO());
  const [endDate, setEndDate] = useState(addDaysISO(todayISO(), 45));
  const [paymentStructure, setPaymentStructure] = useState<PaymentStructure>("flat");
  const [amount, setAmount] = useState("8500");
  const [paymentTerms, setPaymentTerms] = useState("50% upfront, 50% on final delivery. Invoices due Net 14.");
  const [revisions, setRevisions] = useState("2");
  const [ipOption, setIpOption] = useState<IpOption>("work-for-hire");
  const [terminationDays, setTerminationDays] = useState("14");
  const [governingLaw, setGoverningLaw] = useState("California");
  const [copied, setCopied] = useState(false);

  const amountNum = useMemo(() => Math.max(0, parseFloat(amount) || 0), [amount]);
  const revisionsNum = useMemo(() => Math.max(0, parseInt(revisions, 10) || 0), [revisions]);
  const terminationNum = useMemo(() => Math.max(1, parseInt(terminationDays, 10) || 14), [terminationDays]);

  const compensationText = useMemo(() => {
    if (paymentStructure === "flat") {
      return `Client shall pay Contractor a flat fee of ${money(amountNum)} for the Services. ${paymentTerms}`;
    }
    if (paymentStructure === "hourly") {
      return `Client shall pay Contractor at an hourly rate of ${money(amountNum)} per hour for the Services. ${paymentTerms}`;
    }
    return `Client shall pay Contractor a total of ${money(amountNum)} for the Services, payable in milestones. ${paymentTerms}`;
  }, [paymentStructure, amountNum, paymentTerms]);

  const ipText = useMemo(() => {
    if (ipOption === "work-for-hire") {
      return "All deliverables produced under this Agreement shall be considered a \u201Cwork made for hire\u201D and shall be the sole and exclusive property of Client upon final payment. To the extent any deliverable does not qualify as a work made for hire, Contractor hereby irrevocably assigns to Client all right, title, and interest therein, including all intellectual property rights, effective upon Client\u2019s payment in full.";
    }
    if (ipOption === "retain-license") {
      return "Contractor retains ownership of all intellectual property rights in the deliverables. Upon final payment, Contractor grants Client a perpetual, worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute the deliverables for Client\u2019s business purposes. Contractor may continue to use the deliverables, or portions thereof, in Contractor\u2019s portfolio and for promotional purposes.";
    }
    return "The parties shall jointly own all intellectual property rights in the deliverables. Each party may use, reproduce, modify, and distribute the deliverables for any lawful purpose, without obligation to account to the other, subject to each party\u2019s confidentiality obligations under this Agreement.";
  }, [ipOption]);

  const copyPlainText = async () => {
    const lines: string[] = [];
    lines.push("INDEPENDENT CONTRACTOR AGREEMENT");
    lines.push("");
    lines.push("Not legal advice. This template is provided for reference only. Laws vary by jurisdiction. Have a licensed attorney review any contract before signing.");
    lines.push("");
    lines.push(`This Independent Contractor Agreement (this "Agreement") is entered into as of ${startDate} by and between ${clientCompany}, located at ${clientAddress}, contact: ${clientContact} ("Client"), and ${contractorName}, located at ${contractorAddress}, email: ${contractorEmail} ("Contractor").`);
    lines.push("");
    lines.push("1. Services.");
    lines.push(projectDescription);
    lines.push("Deliverables include:");
    lines.push(deliverables);
    lines.push(`Services begin on ${startDate} with a target completion date of ${endDate}. Contractor shall provide up to ${revisionsNum} round${revisionsNum === 1 ? "" : "s"} of revisions per deliverable at no additional cost; additional revisions will be billed at Contractor\u2019s standard rate.`);
    lines.push("");
    lines.push("2. Compensation.");
    lines.push(compensationText);
    lines.push("");
    lines.push("3. Expenses. Contractor is responsible for all ordinary business expenses. Client shall reimburse pre-approved, out-of-pocket expenses incurred by Contractor on Client\u2019s behalf, subject to receipts and reasonable documentation.");
    lines.push("");
    lines.push("4. Independent Contractor Status. Contractor is an independent contractor, not an employee of Client. Contractor is responsible for all applicable taxes, insurance, and benefits. Nothing herein creates a partnership, joint venture, or employment relationship.");
    lines.push("");
    lines.push("5. Intellectual Property.");
    lines.push(ipText);
    lines.push("");
    lines.push("6. Confidentiality. Each party agrees to keep confidential any non-public information disclosed by the other party and to use such information solely to perform this Agreement. These obligations survive termination for three (3) years.");
    lines.push("");
    lines.push(`7. Term and Termination. This Agreement begins on ${startDate} and continues until the Services are complete or terminated. Either party may terminate for convenience with ${terminationNum} days\u2019 written notice. Client shall pay Contractor for all Services performed through the effective date of termination, and for any non-refundable costs already incurred.`);
    lines.push("");
    lines.push("8. Limitation of Liability. To the maximum extent permitted by law, neither party shall be liable for any indirect, incidental, consequential, or punitive damages. Each party\u2019s total liability under this Agreement shall not exceed the total fees paid or payable to Contractor in the six (6) months preceding the claim.");
    lines.push("");
    lines.push(`9. Governing Law. This Agreement is governed by the laws of the State of ${governingLaw}, without regard to its conflict of laws principles.`);
    lines.push("");
    lines.push("10. Entire Agreement. This Agreement constitutes the entire understanding of the parties and supersedes all prior agreements on the subject matter. Amendments must be in writing and signed by both parties.");
    lines.push("");
    lines.push(`Client: ${clientCompany}`);
    lines.push(`By: ${clientContact}`);
    lines.push(`Date: ${startDate}`);
    lines.push("");
    lines.push(`Contractor: ${contractorName}`);
    lines.push(`Email: ${contractorEmail}`);
    lines.push(`Date: ${startDate}`);
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
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Client</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Company</span>
          <input value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Address</span>
          <input value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Primary contact (name, title)</span>
          <input value={clientContact} onChange={(e) => setClientContact(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Contractor</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Name or business</span>
          <input value={contractorName} onChange={(e) => setContractorName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Address</span>
          <input value={contractorAddress} onChange={(e) => setContractorAddress(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Email</span>
          <input type="email" value={contractorEmail} onChange={(e) => setContractorEmail(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Project</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Project description</span>
          <textarea rows={4} value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Deliverables (one per line)</span>
          <textarea rows={5} value={deliverables} onChange={(e) => setDeliverables(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Start date</span>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Target end date</span>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
        </div>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Payment</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Payment structure</span>
          <select value={paymentStructure} onChange={(e) => setPaymentStructure(e.target.value as PaymentStructure)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
            <option value="flat">Flat fee</option>
            <option value="hourly">Hourly rate</option>
            <option value="milestones">Milestones</option>
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">{paymentStructure === "hourly" ? "Hourly rate ($)" : "Amount ($)"}</span>
            <input type="number" min={0} step={0.01} value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Revisions included</span>
            <input type="number" min={0} value={revisions} onChange={(e) => setRevisions(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
        </div>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Payment terms</span>
          <textarea rows={2} value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Legal</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Intellectual property</span>
          <select value={ipOption} onChange={(e) => setIpOption(e.target.value as IpOption)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
            <option value="work-for-hire">Work-for-hire: Client owns on final payment</option>
            <option value="retain-license">Contractor retains, Client gets license</option>
            <option value="shared">Jointly owned (shared)</option>
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Termination notice (days)</span>
            <input type="number" min={1} value={terminationDays} onChange={(e) => setTerminationDays(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Governing law</span>
            <select value={governingLaw} onChange={(e) => setGoverningLaw(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
              {US_STATES.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </label>
        </div>

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
            <h2 className="text-2xl font-bold tracking-widest uppercase">Independent Contractor Agreement</h2>
            <p className="text-xs uppercase tracking-widest text-slate-600 mt-1">Freelance Services</p>
          </div>

          <p className="text-sm leading-relaxed mb-5 text-justify">
            This Independent Contractor Agreement (this &ldquo;Agreement&rdquo;) is entered into as of <span className="font-semibold">{startDate}</span> by and between <span className="font-semibold">{clientCompany || "[Client]"}</span>, located at <span className="italic">{clientAddress || "[address]"}</span>, primary contact <span className="italic">{clientContact || "[contact]"}</span> (&ldquo;Client&rdquo;), and <span className="font-semibold">{contractorName || "[Contractor]"}</span>, located at <span className="italic">{contractorAddress || "[address]"}</span>, email <span className="italic">{contractorEmail || "[email]"}</span> (&ldquo;Contractor&rdquo;). The parties agree as follows:
          </p>

          <ol className="space-y-4 text-sm leading-relaxed text-justify list-none pl-0">
            <li>
              <p><span className="font-bold">1. Services.</span> Contractor shall perform the following services for Client (the &ldquo;Services&rdquo;):</p>
              <p className="mt-2">{projectDescription}</p>
              <p className="mt-2 font-semibold">Deliverables:</p>
              <ul className="list-disc pl-6 mt-1">
                {deliverables.split("\n").filter(Boolean).map((d, i) => (<li key={i}>{d}</li>))}
              </ul>
              <p className="mt-2">Services begin on <span className="font-semibold">{startDate}</span> with a target completion date of <span className="font-semibold">{endDate}</span>. Contractor shall provide up to <span className="font-semibold">{revisionsNum}</span> round{revisionsNum === 1 ? "" : "s"} of revisions per deliverable at no additional cost; additional revisions will be billed at Contractor&rsquo;s standard rate.</p>
            </li>
            <li>
              <p><span className="font-bold">2. Compensation.</span> {compensationText}</p>
            </li>
            <li>
              <p><span className="font-bold">3. Expenses.</span> Contractor is responsible for all ordinary business expenses incurred in performing the Services. Client shall reimburse pre-approved, out-of-pocket expenses incurred by Contractor on Client&rsquo;s behalf, subject to receipts and reasonable documentation.</p>
            </li>
            <li>
              <p><span className="font-bold">4. Independent Contractor Status.</span> Contractor is an independent contractor and not an employee of Client. Contractor is solely responsible for all applicable taxes, insurance, and benefits. Nothing in this Agreement creates a partnership, joint venture, or employment relationship between the parties.</p>
            </li>
            <li>
              <p><span className="font-bold">5. Intellectual Property.</span> {ipText}</p>
            </li>
            <li>
              <p><span className="font-bold">6. Confidentiality.</span> Each party agrees to keep confidential any non-public information disclosed by the other party in connection with this Agreement and to use such information solely to perform its obligations hereunder. These obligations survive termination of this Agreement for a period of three (3) years.</p>
            </li>
            <li>
              <p><span className="font-bold">7. Term and Termination.</span> This Agreement begins on <span className="font-semibold">{startDate}</span> and continues until the Services are complete or the Agreement is terminated. Either party may terminate this Agreement for convenience upon <span className="font-semibold">{terminationNum}</span> days&rsquo; written notice to the other party. Upon termination, Client shall pay Contractor for all Services performed through the effective date of termination and for any non-refundable costs already incurred.</p>
            </li>
            <li>
              <p><span className="font-bold">8. Limitation of Liability.</span> To the maximum extent permitted by law, neither party shall be liable to the other for any indirect, incidental, consequential, or punitive damages arising out of or relating to this Agreement. Each party&rsquo;s total aggregate liability under this Agreement shall not exceed the total fees paid or payable to Contractor in the six (6) months preceding the claim.</p>
            </li>
            <li>
              <p><span className="font-bold">9. Governing Law.</span> This Agreement shall be governed by and construed in accordance with the laws of the State of <span className="font-semibold">{governingLaw}</span>, without regard to its conflict of laws principles.</p>
            </li>
            <li>
              <p><span className="font-bold">10. Entire Agreement.</span> This Agreement constitutes the entire understanding of the parties and supersedes all prior negotiations, agreements, and understandings on the subject matter hereof. Any amendment must be in writing and signed by both parties.</p>
            </li>
          </ol>

          <p className="text-sm leading-relaxed mt-6 mb-6 text-justify">
            IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.
          </p>

          <div className="grid grid-cols-2 gap-8 pt-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-600 mb-2">Client</p>
              <p className="font-semibold">{clientCompany}</p>
              <div className="border-b border-slate-800 h-12 mt-6"></div>
              <p className="text-xs text-slate-700 mt-1">Signature</p>
              <p className="text-xs text-slate-600 mt-2">By: {clientContact}</p>
              <p className="text-xs text-slate-600">Date: _______________</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-600 mb-2">Contractor</p>
              <p className="font-semibold">{contractorName}</p>
              <div className="border-b border-slate-800 h-12 mt-6"></div>
              <p className="text-xs text-slate-700 mt-1">Signature</p>
              <p className="text-xs text-slate-600 mt-2">Email: {contractorEmail}</p>
              <p className="text-xs text-slate-600">Date: _______________</p>
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
