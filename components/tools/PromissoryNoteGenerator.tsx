"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function addMonthsISO(iso: string, months: number): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  d.setMonth(d.getMonth() + months);
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

// Integer amount to words (supports up to billions, typical for promissory notes).
function integerToWords(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "zero";
  n = Math.floor(n);
  if (n === 0) return "zero";

  const ones = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen",
  ];
  const tens = [
    "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety",
  ];

  function underThousand(num: number): string {
    let out = "";
    if (num >= 100) {
      out += ones[Math.floor(num / 100)] + " hundred";
      num = num % 100;
      if (num > 0) out += " ";
    }
    if (num >= 20) {
      out += tens[Math.floor(num / 10)];
      if (num % 10 > 0) out += "-" + ones[num % 10];
    } else if (num > 0) {
      out += ones[num];
    }
    return out;
  }

  const units = ["", "thousand", "million", "billion", "trillion"];
  let result = "";
  let unitIndex = 0;
  while (n > 0) {
    const chunk = n % 1000;
    if (chunk > 0) {
      const chunkText = underThousand(chunk) + (units[unitIndex] ? " " + units[unitIndex] : "");
      result = chunkText + (result ? " " + result : "");
    }
    n = Math.floor(n / 1000);
    unitIndex++;
  }
  return result.trim();
}

function amountInWordsForNote(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return "zero dollars";
  const rounded = Math.round(n * 100) / 100;
  const dollars = Math.floor(rounded);
  const cents = Math.round((rounded - dollars) * 100);
  const dollarText = integerToWords(dollars);
  const capitalized = dollarText.replace(/(^|\s|-)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase());
  const dollarPart = `${capitalized} Dollar${dollars === 1 ? "" : "s"}`;
  if (cents === 0) return dollarPart;
  const centText = integerToWords(cents);
  const centCapitalized = centText.replace(/(^|\s|-)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase());
  return `${dollarPart} and ${centCapitalized} Cent${cents === 1 ? "" : "s"}`;
}

type NoteType = "demand" | "installment" | "lump-sum";
type LateFeeType = "none" | "percent" | "flat";

export function PromissoryNoteGenerator() {
  const [noteType, setNoteType] = useState<NoteType>("installment");
  const [lenderName, setLenderName] = useState("Morgan Reyes");
  const [lenderAddress, setLenderAddress] = useState("1044 Pine Street, Boulder, CO 80302");
  const [borrowerName, setBorrowerName] = useState("Jordan Ellis");
  const [borrowerAddress, setBorrowerAddress] = useState("512 Willow Ave, Denver, CO 80203");
  const [principal, setPrincipal] = useState("10000");
  const [interestRate, setInterestRate] = useState("5");
  const [executionDate, setExecutionDate] = useState(todayISO());
  const [monthlyPayment, setMonthlyPayment] = useState("188.71");
  const [installmentStart, setInstallmentStart] = useState(addMonthsISO(todayISO(), 1));
  const [finalPaymentDate, setFinalPaymentDate] = useState(addMonthsISO(todayISO(), 60));
  const [lumpSumDueDate, setLumpSumDueDate] = useState(addMonthsISO(todayISO(), 12));
  const [lateFeeType, setLateFeeType] = useState<LateFeeType>("percent");
  const [collateral, setCollateral] = useState("Unsecured");
  const [governingLaw, setGoverningLaw] = useState("Colorado");
  const [prepaymentAllowed, setPrepaymentAllowed] = useState(true);
  const [copied, setCopied] = useState(false);

  const principalNum = useMemo(() => Math.max(0, parseFloat(principal) || 0), [principal]);
  const principalWords = useMemo(() => amountInWordsForNote(principalNum), [principalNum]);
  const rateNum = useMemo(() => Math.max(0, parseFloat(interestRate) || 0), [interestRate]);
  const monthlyNum = useMemo(() => Math.max(0, parseFloat(monthlyPayment) || 0), [monthlyPayment]);

  const lateFeeText = useMemo(() => {
    if (lateFeeType === "none") return null;
    if (lateFeeType === "percent") return "a late fee equal to five percent (5%) of the missed payment amount";
    return "a flat late fee of $25.00";
  }, [lateFeeType]);

  const termsParagraph = useMemo(() => {
    if (noteType === "demand") {
      return `The entire unpaid principal balance, together with all accrued and unpaid interest, shall be due and payable in full upon written demand by Lender. Until demand is made, interest shall accrue on the unpaid principal balance at the rate set forth below.`;
    }
    if (noteType === "installment") {
      return `Borrower shall pay the principal and interest in equal monthly installments of ${money(monthlyNum)}, beginning on ${installmentStart} and continuing on the same day of each month thereafter, until the entire balance of principal and accrued interest has been paid in full. All remaining principal and accrued interest, if any, shall be due and payable in full on or before ${finalPaymentDate}.`;
    }
    return `The entire principal balance, together with all accrued interest, shall be due and payable in a single lump sum on or before ${lumpSumDueDate}.`;
  }, [noteType, monthlyNum, installmentStart, finalPaymentDate, lumpSumDueDate]);

  const copyPlainText = async () => {
    const lines: string[] = [];
    lines.push("PROMISSORY NOTE");
    lines.push("");
    lines.push("Not legal advice. This template is provided for reference only. Laws vary by jurisdiction. Have a licensed attorney review any contract before signing.");
    lines.push("");
    lines.push(`Principal Amount: ${money(principalNum)}`);
    lines.push(`Execution Date: ${executionDate}`);
    lines.push(`Note Type: ${noteType === "demand" ? "Demand" : noteType === "installment" ? "Installment" : "Lump-Sum"}`);
    lines.push("");
    lines.push(`FOR VALUE RECEIVED, the undersigned, ${borrowerName}, of ${borrowerAddress} ("Borrower"), promises to pay to the order of ${lenderName}, of ${lenderAddress} ("Lender"), the principal sum of ${principalWords} (${money(principalNum)}), together with interest thereon as set forth below.`);
    lines.push("");
    lines.push("1. Payment Terms.");
    lines.push(termsParagraph);
    lines.push("");
    lines.push(`2. Interest. Interest shall accrue on the unpaid principal balance at an annual rate of ${rateNum.toFixed(2)}%, computed on the basis of a 365-day year for the actual number of days elapsed.`);
    if (lateFeeText) {
      lines.push("");
      lines.push(`3. Late Fee. If any payment is not received within ten (10) days after its due date, Borrower shall pay ${lateFeeText}.`);
    }
    lines.push("");
    lines.push(`${lateFeeText ? "4" : "3"}. Prepayment. ${prepaymentAllowed ? "Borrower may prepay all or any portion of the principal at any time without penalty. Each prepayment shall be applied first to accrued interest and then to principal." : "Prepayment of principal is not permitted without the prior written consent of Lender."}`);
    lines.push("");
    lines.push(`${lateFeeText ? "5" : "4"}. Collateral. ${collateral && collateral.trim() !== "" && collateral.trim().toLowerCase() !== "unsecured" ? `This Note is secured by the following collateral: ${collateral}.` : "This Note is unsecured."}`);
    lines.push("");
    lines.push(`${lateFeeText ? "6" : "5"}. Default. If Borrower fails to make any payment when due, or otherwise breaches this Note, Lender may, at its option, declare the entire unpaid principal and accrued interest immediately due and payable, without further notice or demand.`);
    lines.push("");
    lines.push(`${lateFeeText ? "7" : "6"}. Governing Law. This Note shall be governed by and construed in accordance with the laws of the State of ${governingLaw}, without regard to its conflict of laws principles.`);
    lines.push("");
    lines.push("IN WITNESS WHEREOF, Borrower has executed this Promissory Note as of the Execution Date.");
    lines.push("");
    lines.push(`Borrower: ${borrowerName}`);
    lines.push(`Address: ${borrowerAddress}`);
    lines.push(`Signature: _______________________`);
    lines.push(`Date: ${executionDate}`);
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
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Note type</span>
          <select value={noteType} onChange={(e) => setNoteType(e.target.value as NoteType)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
            <option value="demand">Demand (due on request)</option>
            <option value="installment">Installment (monthly payments)</option>
            <option value="lump-sum">Lump-sum (one payment on due date)</option>
          </select>
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Lender</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Name</span>
          <input value={lenderName} onChange={(e) => setLenderName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Address</span>
          <input value={lenderAddress} onChange={(e) => setLenderAddress(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Borrower</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Name</span>
          <input value={borrowerName} onChange={(e) => setBorrowerName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Address</span>
          <input value={borrowerAddress} onChange={(e) => setBorrowerAddress(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Loan terms</h3>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Principal ($)</span>
            <input type="number" min={0} step={0.01} value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Annual interest (%)</span>
            <input type="number" min={0} step={0.01} value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
        </div>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Execution date</span>
          <input type="date" value={executionDate} onChange={(e) => setExecutionDate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>

        {noteType === "installment" && (
          <div className="space-y-3 rounded-lg bg-slate-50 p-3 border border-slate-200">
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Monthly payment ($)</span>
                <input type="number" min={0} step={0.01} value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">First payment date</span>
                <input type="date" value={installmentStart} onChange={(e) => setInstallmentStart(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              </label>
            </div>
            <label className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Final payment date</span>
              <input type="date" value={finalPaymentDate} onChange={(e) => setFinalPaymentDate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </label>
          </div>
        )}

        {noteType === "lump-sum" && (
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Due date (lump-sum)</span>
            <input type="date" value={lumpSumDueDate} onChange={(e) => setLumpSumDueDate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
        )}

        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Late fee</span>
          <select value={lateFeeType} onChange={(e) => setLateFeeType(e.target.value as LateFeeType)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
            <option value="none">None</option>
            <option value="percent">5% of missed payment</option>
            <option value="flat">$25 flat</option>
          </select>
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Collateral</span>
          <textarea rows={2} value={collateral} onChange={(e) => setCollateral(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Unsecured, or description of collateral" />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Governing law</span>
          <select value={governingLaw} onChange={(e) => setGoverningLaw(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
            {US_STATES.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-700 pt-1">
          <input
            type="checkbox"
            checked={prepaymentAllowed}
            onChange={(e) => setPrepaymentAllowed(e.target.checked)}
          />
          Prepayment allowed without penalty
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
            <h2 className="text-2xl font-bold tracking-widest uppercase">Promissory Note</h2>
            <p className="text-xs uppercase tracking-widest text-slate-600 mt-1">
              {noteType === "demand" ? "Demand Note" : noteType === "installment" ? "Installment Note" : "Lump-Sum Note"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm border border-slate-300 rounded-lg p-4 print:border-slate-400">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-600">Principal Amount</p>
              <p className="font-semibold text-lg">{money(principalNum)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-600">Execution Date</p>
              <p className="font-semibold text-lg">{executionDate}</p>
            </div>
          </div>

          <p className="text-sm leading-relaxed mb-5 text-justify">
            FOR VALUE RECEIVED, the undersigned, <span className="font-semibold">{borrowerName || "[Borrower]"}</span>, of <span className="italic">{borrowerAddress || "[borrower address]"}</span> (&ldquo;Borrower&rdquo;), promises to pay to the order of <span className="font-semibold">{lenderName || "[Lender]"}</span>, of <span className="italic">{lenderAddress || "[lender address]"}</span> (&ldquo;Lender&rdquo;), the principal sum of <span className="font-semibold">{principalWords} ({money(principalNum)})</span>, together with interest thereon as set forth below.
          </p>

          <ol className="space-y-4 text-sm leading-relaxed text-justify list-none pl-0">
            <li>
              <p><span className="font-bold">1. Payment Terms.</span> {termsParagraph}</p>
            </li>
            <li>
              <p><span className="font-bold">2. Interest.</span> Interest shall accrue on the unpaid principal balance at an annual rate of <span className="font-semibold">{rateNum.toFixed(2)}%</span>, computed on the basis of a 365-day year for the actual number of days elapsed. All payments shall be applied first to accrued interest and then to principal.</p>
            </li>
            {lateFeeText && (
              <li>
                <p><span className="font-bold">3. Late Fee.</span> If any payment required under this Note is not received by Lender within ten (10) days after its due date, Borrower shall pay {lateFeeText}, in addition to any other remedies available to Lender.</p>
              </li>
            )}
            <li>
              <p><span className="font-bold">{lateFeeText ? "4" : "3"}. Prepayment.</span> {prepaymentAllowed ? "Borrower may prepay all or any portion of the outstanding principal at any time without penalty. Each prepayment shall be applied first to accrued interest and then to principal." : "Prepayment of principal, in whole or in part, is not permitted without the prior written consent of Lender."}</p>
            </li>
            <li>
              <p><span className="font-bold">{lateFeeText ? "5" : "4"}. Collateral.</span> {collateral && collateral.trim() !== "" && collateral.trim().toLowerCase() !== "unsecured" ? <>This Note is secured by the following collateral: <span className="italic">{collateral}</span>.</> : "This Note is unsecured and is not backed by any collateral."}</p>
            </li>
            <li>
              <p><span className="font-bold">{lateFeeText ? "6" : "5"}. Default.</span> If Borrower fails to make any payment when due, or otherwise breaches any term of this Note, Lender may, at its option and without further notice or demand, declare the entire unpaid principal balance and all accrued interest immediately due and payable. Borrower shall pay all reasonable costs of collection, including attorneys&rsquo; fees, incurred by Lender in enforcing this Note.</p>
            </li>
            <li>
              <p><span className="font-bold">{lateFeeText ? "7" : "6"}. Governing Law.</span> This Note shall be governed by and construed in accordance with the laws of the State of <span className="font-semibold">{governingLaw}</span>, without regard to its conflict of laws principles. Borrower waives presentment, demand, protest, and notice of dishonor.</p>
            </li>
          </ol>

          <p className="text-sm leading-relaxed mt-6 mb-6 text-justify">
            IN WITNESS WHEREOF, Borrower has executed this Promissory Note as of the Execution Date first written above.
          </p>

          <div className="grid grid-cols-1 gap-8 pt-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-600 mb-2">Borrower</p>
              <p className="font-semibold">{borrowerName}</p>
              <p className="text-xs text-slate-600">{borrowerAddress}</p>
              <div className="border-b border-slate-800 h-12 mt-6 max-w-md"></div>
              <p className="text-xs text-slate-700 mt-1">Signature</p>
              <p className="text-xs text-slate-600 mt-2">Date: {executionDate}</p>
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
