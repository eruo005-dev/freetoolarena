"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function plusDaysISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function defaultQuoteNumber(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const rand = Math.floor(Math.random() * 900 + 100);
  return `QT-${y}${m}-${rand}`;
}

interface LineItem {
  id: string;
  description: string;
  qty: string;
  rate: string;
}

const DEFAULT_ITEMS: LineItem[] = [
  { id: uid(), description: "Brand identity package", qty: "1", rate: "2500" },
  { id: uid(), description: "Logo revisions", qty: "2", rate: "250" },
  { id: uid(), description: "Style guide (PDF)", qty: "1", rate: "600" },
];

export function QuoteGenerator() {
  const [companyName, setCompanyName] = useState("Northwind Creative");
  const [companyAddress, setCompanyAddress] = useState("410 Cedar Lane\nSeattle, WA 98101");
  const [logoText, setLogoText] = useState("NW");
  const [clientName, setClientName] = useState("Harbor Coffee Co.");
  const [clientAddress, setClientAddress] = useState("88 Pier Street\nTacoma, WA 98402");
  const [quoteNumber, setQuoteNumber] = useState(defaultQuoteNumber());
  const [issueDate, setIssueDate] = useState(todayISO());
  const [validUntil, setValidUntil] = useState(plusDaysISO(30));
  const [taxRate, setTaxRate] = useState("8.8");
  const [terms, setTerms] = useState("50% deposit required to begin work. Balance due on completion. Prices valid for 30 days from issue date.");
  const [notes, setNotes] = useState("Please reach out with questions or to approve this quote.");
  const [items, setItems] = useState<LineItem[]>(DEFAULT_ITEMS);
  const [copied, setCopied] = useState(false);

  const { subtotal, tax, total } = useMemo(() => {
    const sub = items.reduce((s, it) => {
      const q = parseFloat(it.qty) || 0;
      const r = parseFloat(it.rate) || 0;
      return s + q * r;
    }, 0);
    const rate = Math.max(0, parseFloat(taxRate) || 0);
    const t = sub * (rate / 100);
    return { subtotal: sub, tax: t, total: sub + t };
  }, [items, taxRate]);

  function addItem() {
    setItems((rows) => [...rows, { id: uid(), description: "", qty: "1", rate: "0" }]);
  }
  function updateItem(id: string, patch: Partial<LineItem>) {
    setItems((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }
  function removeItem(id: string) {
    setItems((rows) => rows.filter((r) => r.id !== id));
  }

  const copyPlainText = async () => {
    const lines: string[] = [];
    lines.push(`QUOTE ${quoteNumber}`);
    lines.push(`Issued: ${issueDate}    Valid until: ${validUntil}`);
    lines.push("");
    lines.push(`From: ${companyName}`);
    if (companyAddress) lines.push(companyAddress);
    lines.push("");
    lines.push(`Prepared for: ${clientName}`);
    if (clientAddress) lines.push(clientAddress);
    lines.push("");
    lines.push("Items:");
    items.forEach((it) => {
      const q = parseFloat(it.qty) || 0;
      const r = parseFloat(it.rate) || 0;
      lines.push(`  ${it.description || "(item)"} - ${q} x ${money(r)} = ${money(q * r)}`);
    });
    lines.push("");
    lines.push(`Subtotal: ${money(subtotal)}`);
    lines.push(`Tax (${taxRate}%): ${money(tax)}`);
    lines.push(`TOTAL: ${money(total)}`);
    if (terms) {
      lines.push("");
      lines.push(`Terms: ${terms}`);
    }
    if (notes) {
      lines.push("");
      lines.push(`Notes: ${notes}`);
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
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Your company</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Company name</span>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <div className="grid grid-cols-[1fr_80px] gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Company address</span>
            <textarea
              rows={2}
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Logo text</span>
            <input
              maxLength={4}
              value={logoText}
              onChange={(e) => setLogoText(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-center font-bold"
            />
          </label>
        </div>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Client</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Client name</span>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Client address</span>
          <textarea
            rows={2}
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <div className="grid grid-cols-3 gap-3 pt-2">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Quote #</span>
            <input
              value={quoteNumber}
              onChange={(e) => setQuoteNumber(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Issue date</span>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Valid until</span>
            <input
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        </div>

        <div className="flex items-center justify-between pt-2">
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Line items</h3>
          <button
            type="button"
            onClick={addItem}
            className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
          >
            + Add row
          </button>
        </div>
        <div className="space-y-2">
          {items.map((it) => (
            <div key={it.id} className="grid grid-cols-[1fr_60px_90px_auto] gap-2">
              <input
                placeholder="Description"
                value={it.description}
                onChange={(e) => updateItem(it.id, { description: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
              />
              <input
                type="number"
                min={0}
                step={1}
                value={it.qty}
                onChange={(e) => updateItem(it.id, { qty: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
              />
              <input
                type="number"
                min={0}
                step={0.01}
                value={it.rate}
                onChange={(e) => updateItem(it.id, { rate: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
              />
              <button
                type="button"
                onClick={() => removeItem(it.id)}
                className="text-rose-600 hover:text-rose-700 text-xs px-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <label className="block pt-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Tax rate (%)</span>
          <input
            type="number"
            min={0}
            step={0.1}
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Terms</span>
          <textarea
            rows={3}
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Notes</span>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
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
          <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-lg tracking-tight">
                {logoText || "LOGO"}
              </div>
              <div>
                <p className="font-bold text-lg leading-tight">{companyName}</p>
                {companyAddress && (
                  <p className="text-xs text-slate-600 whitespace-pre-line leading-tight mt-0.5">{companyAddress}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-4xl font-bold tracking-tight">QUOTE</h2>
              <p className="text-sm text-slate-600 mt-1">{quoteNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Prepared for</p>
              <p className="font-semibold">{clientName}</p>
              {clientAddress && (
                <p className="whitespace-pre-line text-slate-700">{clientAddress}</p>
              )}
            </div>
            <div className="text-right">
              <div className="inline-block text-left">
                <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Details</p>
                <p><span className="text-slate-600">Issued:</span> {issueDate}</p>
                <p><span className="text-slate-600">Valid until:</span> {validUntil}</p>
              </div>
            </div>
          </div>

          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="py-2.5 px-3 text-left font-semibold">Description</th>
                <th className="py-2.5 px-3 text-right font-semibold w-16">Qty</th>
                <th className="py-2.5 px-3 text-right font-semibold w-24">Rate</th>
                <th className="py-2.5 px-3 text-right font-semibold w-28">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => {
                const q = parseFloat(it.qty) || 0;
                const r = parseFloat(it.rate) || 0;
                return (
                  <tr key={it.id} className={i % 2 === 0 ? "bg-slate-50" : ""}>
                    <td className="py-2 px-3">{it.description || <span className="text-slate-400">&mdash;</span>}</td>
                    <td className="py-2 px-3 text-right">{q}</td>
                    <td className="py-2 px-3 text-right">{money(r)}</td>
                    <td className="py-2 px-3 text-right">{money(q * r)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-end mb-8">
            <div className="w-72 text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tax ({taxRate || 0}%)</span>
                <span>{money(tax)}</span>
              </div>
              <div className="flex justify-between border-t-2 border-slate-800 pt-2 mt-2 font-bold text-lg">
                <span>Total</span>
                <span>{money(total)}</span>
              </div>
            </div>
          </div>

          {terms && (
            <div className="mb-4 pt-4 border-t border-slate-200 text-sm">
              <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Terms</p>
              <p className="text-slate-700 whitespace-pre-line">{terms}</p>
            </div>
          )}
          {notes && (
            <div className="text-sm">
              <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Notes</p>
              <p className="text-slate-700 whitespace-pre-line">{notes}</p>
            </div>
          )}
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
