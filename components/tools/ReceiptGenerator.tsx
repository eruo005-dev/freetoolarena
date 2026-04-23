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

function defaultReceiptNumber(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `RCPT-${y}${m}-${rand}`;
}

interface LineItem {
  id: string;
  description: string;
  qty: string;
  rate: string;
}

const DEFAULT_ITEMS: LineItem[] = [
  { id: uid(), description: "Coffee, large", qty: "2", rate: "4.50" },
  { id: uid(), description: "Blueberry muffin", qty: "1", rate: "3.25" },
  { id: uid(), description: "Bottled water", qty: "1", rate: "2.00" },
];

export function ReceiptGenerator() {
  const [businessName, setBusinessName] = useState("Maple Street Cafe");
  const [businessAddress, setBusinessAddress] = useState("248 Maple Street\nPortland, OR 97201");
  const [businessContact, setBusinessContact] = useState("(503) 555-0142 | hello@maplecafe.com");
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState(todayISO());
  const [receiptNumber, setReceiptNumber] = useState(defaultReceiptNumber());
  const [taxRate, setTaxRate] = useState("8.5");
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [notes, setNotes] = useState("Thank you for your purchase!");
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
    lines.push(businessName.toUpperCase());
    if (businessAddress) lines.push(businessAddress);
    if (businessContact) lines.push(businessContact);
    lines.push("");
    lines.push(`Receipt #: ${receiptNumber}`);
    lines.push(`Date: ${date}`);
    if (customerName) lines.push(`Customer: ${customerName}`);
    lines.push("");
    lines.push("Items:");
    items.forEach((it) => {
      const q = parseFloat(it.qty) || 0;
      const r = parseFloat(it.rate) || 0;
      lines.push(`  ${it.description || "(item)"}  ${q} x ${money(r)} = ${money(q * r)}`);
    });
    lines.push("");
    lines.push(`Subtotal: ${money(subtotal)}`);
    lines.push(`Tax (${taxRate}%): ${money(tax)}`);
    lines.push(`TOTAL: ${money(total)}`);
    lines.push(`Paid by: ${paymentMethod}`);
    if (notes) {
      lines.push("");
      lines.push(notes);
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
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Business</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Business name</span>
          <input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Business address</span>
          <textarea
            value={businessAddress}
            rows={2}
            onChange={(e) => setBusinessAddress(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Phone / email</span>
          <input
            value={businessContact}
            onChange={(e) => setBusinessContact(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Receipt</h3>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Receipt #</span>
            <input
              value={receiptNumber}
              onChange={(e) => setReceiptNumber(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Customer name (optional)</span>
          <input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <div className="flex items-center justify-between pt-2">
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Items</h3>
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
            <div key={it.id} className="grid grid-cols-[1fr_60px_80px_auto] gap-2">
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
                placeholder="Qty"
                value={it.qty}
                onChange={(e) => updateItem(it.id, { qty: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
              />
              <input
                type="number"
                min={0}
                step={0.01}
                placeholder="Price"
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

        <div className="grid grid-cols-2 gap-3 pt-2">
          <label className="block">
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
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Payment method</span>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white"
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Check">Check</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Notes</span>
          <input
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
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold tracking-wide">{businessName}</h2>
              {businessAddress && (
                <p className="text-sm whitespace-pre-line text-slate-700 mt-1">{businessAddress}</p>
              )}
              {businessContact && (
                <p className="text-sm text-slate-700 mt-1">{businessContact}</p>
              )}
            </div>

            <div className="border-t-2 border-b-2 border-dashed border-slate-400 py-3 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Receipt</span>
                <span className="font-semibold">{receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Date</span>
                <span>{date}</span>
              </div>
              {customerName && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Customer</span>
                  <span>{customerName}</span>
                </div>
              )}
            </div>

            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="border-b border-slate-400">
                  <th className="py-2 text-left font-semibold">Item</th>
                  <th className="py-2 text-right font-semibold w-10">Qty</th>
                  <th className="py-2 text-right font-semibold w-16">Price</th>
                  <th className="py-2 text-right font-semibold w-20">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => {
                  const q = parseFloat(it.qty) || 0;
                  const r = parseFloat(it.rate) || 0;
                  return (
                    <tr key={it.id} className="border-b border-dotted border-slate-300">
                      <td className="py-1.5">{it.description || <span className="text-slate-400">&mdash;</span>}</td>
                      <td className="py-1.5 text-right">{q}</td>
                      <td className="py-1.5 text-right">{money(r)}</td>
                      <td className="py-1.5 text-right">{money(q * r)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="border-t-2 border-dashed border-slate-400 pt-3 text-sm space-y-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax ({taxRate || 0}%)</span>
                <span>{money(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-slate-400 pt-2 mt-1">
                <span>TOTAL</span>
                <span>{money(total)}</span>
              </div>
              <div className="flex justify-between pt-2 text-slate-700">
                <span>Paid by</span>
                <span>{paymentMethod}</span>
              </div>
            </div>

            {notes && (
              <p className="text-center text-sm italic text-slate-700 mt-6 pt-4 border-t border-dotted border-slate-300">
                {notes}
              </p>
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
