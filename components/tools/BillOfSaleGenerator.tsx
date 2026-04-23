"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

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

function amountInWords(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return "zero dollars";
  const rounded = Math.round(n * 100) / 100;
  const dollars = Math.floor(rounded);
  const cents = Math.round((rounded - dollars) * 100);
  return `${dollars.toLocaleString("en-US")} dollars and ${cents.toString().padStart(2, "0")}/100`;
}

export function BillOfSaleGenerator() {
  const [sellerName, setSellerName] = useState("Jordan Ellis");
  const [sellerAddress, setSellerAddress] = useState("512 Willow Ave, Denver, CO 80203");
  const [buyerName, setBuyerName] = useState("Morgan Reyes");
  const [buyerAddress, setBuyerAddress] = useState("1044 Pine Street, Boulder, CO 80302");
  const [itemDescription, setItemDescription] = useState("2018 Toyota Camry LE, sedan, silver\nVIN: 4T1B11HK5JU123456\nOdometer: 68,420 miles\nColorado license plate: ABC-1234");
  const [salePrice, setSalePrice] = useState("9500");
  const [paymentReceived, setPaymentReceived] = useState(true);
  const [asIs, setAsIs] = useState(true);
  const [transactionDate, setTransactionDate] = useState(todayISO());
  const [state, setState] = useState("Colorado");
  const [includeWitness, setIncludeWitness] = useState(false);
  const [copied, setCopied] = useState(false);

  const priceNumber = useMemo(() => Math.max(0, parseFloat(salePrice) || 0), [salePrice]);
  const priceWords = useMemo(() => amountInWords(priceNumber), [priceNumber]);

  const copyPlainText = async () => {
    const lines: string[] = [];
    lines.push("BILL OF SALE");
    lines.push("");
    lines.push("This template is for reference only and is not legal advice. Consult an attorney for state-specific requirements.");
    lines.push("");
    lines.push(`For and in consideration of the sum of ${money(priceNumber)} (${priceWords}), the receipt of which is ${paymentReceived ? "hereby acknowledged" : "to be tendered at closing"}, the undersigned Seller does hereby sell, transfer, and convey to the Buyer the property described below.`);
    lines.push("");
    lines.push(`Seller: ${sellerName}`);
    lines.push(`Address: ${sellerAddress}`);
    lines.push("");
    lines.push(`Buyer: ${buyerName}`);
    lines.push(`Address: ${buyerAddress}`);
    lines.push("");
    lines.push("Property description:");
    lines.push(itemDescription);
    lines.push("");
    lines.push(`Sale price: ${money(priceNumber)}`);
    lines.push(`Transaction date: ${transactionDate}`);
    lines.push(`Governing state: ${state}`);
    if (asIs) {
      lines.push("");
      lines.push('The property is sold "AS-IS, WHERE-IS" with no warranties, express or implied.');
    }
    lines.push("");
    lines.push("Seller signature: _______________________   Date: __________");
    lines.push("Buyer signature:  _______________________   Date: __________");
    if (includeWitness) {
      lines.push("Witness signature: _______________________   Date: __________");
    }
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
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Seller</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Seller name</span>
          <input
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Seller address</span>
          <input
            value={sellerAddress}
            onChange={(e) => setSellerAddress(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Buyer</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Buyer name</span>
          <input
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Buyer address</span>
          <input
            value={buyerAddress}
            onChange={(e) => setBuyerAddress(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Property</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Item description</span>
          <textarea
            rows={4}
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            placeholder="2018 Toyota Camry, VIN..."
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Sale price ($)</span>
            <input
              type="number"
              min={0}
              step={0.01}
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Transaction date</span>
            <input
              type="date"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">State</span>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
          >
            {US_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>

        <div className="space-y-2 pt-2">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={paymentReceived}
              onChange={(e) => setPaymentReceived(e.target.checked)}
            />
            Payment received in full
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={asIs}
              onChange={(e) => setAsIs(e.target.checked)}
            />
            Sold &ldquo;as-is, where-is&rdquo; (no warranties)
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={includeWitness}
              onChange={(e) => setIncludeWitness(e.target.checked)}
            />
            Include witness signature line
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
        <div className="bg-white border border-slate-200 rounded-xl p-10 font-serif text-slate-900 print:border-0 print:rounded-none print:p-0">
          <div className="border-2 border-amber-500 bg-amber-50 px-4 py-3 mb-8 text-sm text-amber-900 print:bg-white">
            <p className="font-bold">Disclaimer</p>
            <p>This template is for reference only and is not legal advice. Consult an attorney for state-specific requirements.</p>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-widest uppercase">Bill of Sale</h2>
            <p className="text-xs uppercase tracking-widest text-slate-600 mt-1">State of {state}</p>
          </div>

          <p className="text-sm leading-relaxed mb-6 text-justify">
            The undersigned, <span className="font-semibold">{sellerName || "[Seller]"}</span>, of <span className="italic">{sellerAddress || "[seller address]"}</span> (hereinafter &ldquo;Seller&rdquo;), for and in consideration of the sum of <span className="font-semibold">{money(priceNumber)}</span> ({priceWords}), the receipt of which is {paymentReceived ? "hereby acknowledged" : "to be tendered at closing"}, does hereby sell, transfer, and convey to <span className="font-semibold">{buyerName || "[Buyer]"}</span>, of <span className="italic">{buyerAddress || "[buyer address]"}</span> (hereinafter &ldquo;Buyer&rdquo;), the following described property:
          </p>

          <div className="border-l-4 border-slate-400 bg-slate-50 pl-4 py-3 mb-6 print:bg-white">
            <p className="whitespace-pre-line text-sm">{itemDescription || "[Property description]"}</p>
          </div>

          {asIs && (
            <p className="text-sm leading-relaxed mb-6 text-justify">
              The property is sold <span className="font-bold uppercase">As-Is, Where-Is</span>, with all faults and defects, and without any warranty of merchantability, fitness for a particular purpose, or any other warranty, express or implied. Buyer has had the opportunity to inspect the property and accepts it in its present condition.
            </p>
          )}

          <p className="text-sm leading-relaxed mb-8 text-justify">
            Seller warrants that Seller is the lawful owner of the property described above, that the property is free from all liens and encumbrances, and that Seller has full right and authority to sell and transfer the property to Buyer. This Bill of Sale is executed on the <span className="font-semibold">{transactionDate}</span> and shall be governed by the laws of the State of <span className="font-semibold">{state}</span>.
          </p>

          <div className={`grid ${includeWitness ? "grid-cols-3" : "grid-cols-2"} gap-8 pt-8 text-sm`}>
            <div>
              <div className="border-b border-slate-800 h-12"></div>
              <p className="text-xs text-slate-700 mt-1">Seller signature</p>
              <p className="text-xs text-slate-500">{sellerName}</p>
              <p className="text-xs text-slate-600 mt-1">Date: _______________</p>
            </div>
            <div>
              <div className="border-b border-slate-800 h-12"></div>
              <p className="text-xs text-slate-700 mt-1">Buyer signature</p>
              <p className="text-xs text-slate-500">{buyerName}</p>
              <p className="text-xs text-slate-600 mt-1">Date: _______________</p>
            </div>
            {includeWitness && (
              <div>
                <div className="border-b border-slate-800 h-12"></div>
                <p className="text-xs text-slate-700 mt-1">Witness signature</p>
                <p className="text-xs text-slate-500">&nbsp;</p>
                <p className="text-xs text-slate-600 mt-1">Date: _______________</p>
              </div>
            )}
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
