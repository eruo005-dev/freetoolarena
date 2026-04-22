"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";

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

function dueISO(days = 14): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function defaultInvoiceNumber(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const rand = Math.floor(Math.random() * 900 + 100);
  return `INV-${y}${m}-${rand}`;
}

interface LineItem {
  id: string;
  description: string;
  qty: string;
  rate: string;
}

const DEFAULT_ITEMS: LineItem[] = [
  { id: uid(), description: "Website design", qty: "1", rate: "1500" },
  { id: uid(), description: "Development hours", qty: "20", rate: "85" },
];

export function InvoiceGenerator() {
  const [sellerName, setSellerName] = useState("Acme Studio");
  const [sellerEmail, setSellerEmail] = useState("hello@acme.studio");
  const [sellerAddress, setSellerAddress] = useState("123 Market St\nSan Francisco, CA 94103");
  const [clientName, setClientName] = useState("Client Co.");
  const [clientAddress, setClientAddress] = useState("456 Client Ave\nNew York, NY 10001");
  const [invoiceNumber, setInvoiceNumber] = useState(defaultInvoiceNumber());
  const [date, setDate] = useState(todayISO());
  const [dueDate, setDueDate] = useState(dueISO());
  const [taxRate, setTaxRate] = useState("0");
  const [notes, setNotes] = useState("Thanks for your business.");
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

  function copyAsText() {
    const lines: string[] = [];
    lines.push(`INVOICE ${invoiceNumber}`);
    lines.push(`Date: ${date}    Due: ${dueDate}`);
    lines.push("");
    lines.push(`From: ${sellerName}`);
    if (sellerEmail) lines.push(sellerEmail);
    if (sellerAddress) lines.push(sellerAddress);
    lines.push("");
    lines.push(`Bill to: ${clientName}`);
    if (clientAddress) lines.push(clientAddress);
    lines.push("");
    lines.push("Items:");
    items.forEach((it) => {
      const q = parseFloat(it.qty) || 0;
      const r = parseFloat(it.rate) || 0;
      lines.push(`  ${it.description || "(no description)"} — ${q} x ${money(r)} = ${money(q * r)}`);
    });
    lines.push("");
    lines.push(`Subtotal: ${money(subtotal)}`);
    lines.push(`Tax (${taxRate}%): ${money(tax)}`);
    lines.push(`TOTAL: ${money(total)}`);
    if (notes) {
      lines.push("");
      lines.push(`Notes: ${notes}`);
    }
    const text = lines.join("\n");
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  function printInvoice() {
    if (typeof window !== "undefined") window.print();
  }

  return (
    <div className="space-y-6">
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #invoice-preview,
          #invoice-preview * {
            visibility: visible !important;
          }
          #invoice-preview {
            position: absolute !important;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>

      <section className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">Your details</h3>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Your name / company</span>
            <input
              type="text"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Your email</span>
            <input
              type="text"
              value={sellerEmail}
              onChange={(e) => setSellerEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Your address</span>
            <textarea
              value={sellerAddress}
              rows={3}
              onChange={(e) => setSellerAddress(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">Client details</h3>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Client name</span>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Client address</span>
            <textarea
              value={clientAddress}
              rows={3}
              onChange={(e) => setClientAddress(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Invoice number</span>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Due date</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </section>

      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-slate-700">Line items</h3>
          <button
            type="button"
            onClick={addItem}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            + Add row
          </button>
        </div>
        <div className="space-y-2">
          {items.map((it) => (
            <div key={it.id} className="grid grid-cols-[1fr_80px_110px_auto] gap-2">
              <input
                type="text"
                placeholder="Description"
                value={it.description}
                onChange={(e) => updateItem(it.id, { description: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step={1}
                placeholder="Qty"
                value={it.qty}
                onChange={(e) => updateItem(it.id, { qty: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step={0.01}
                placeholder="Rate"
                value={it.rate}
                onChange={(e) => updateItem(it.id, { rate: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
              <button
                type="button"
                onClick={() => removeItem(it.id)}
                aria-label="Remove row"
                className="text-rose-600 hover:text-rose-700 text-sm px-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="grid sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Tax rate (%)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.1}
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Notes</span>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </section>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={printInvoice}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50"
        >
          Print invoice
        </button>
        <button
          type="button"
          onClick={copyAsText}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          {copied ? "Copied!" : "Copy as text"}
        </button>
      </div>

      <div
        id="invoice-preview"
        className="rounded-xl border border-slate-200 bg-white p-8 text-slate-900 shadow-sm"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">INVOICE</h2>
            <p className="text-sm text-slate-500">{invoiceNumber}</p>
          </div>
          <div className="text-right text-sm">
            <p><span className="text-slate-500">Date:</span> {date}</p>
            <p><span className="text-slate-500">Due:</span> {dueDate}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">From</p>
            <p className="font-semibold">{sellerName}</p>
            {sellerEmail && <p>{sellerEmail}</p>}
            {sellerAddress && <p className="whitespace-pre-line text-slate-600">{sellerAddress}</p>}
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Bill to</p>
            <p className="font-semibold">{clientName}</p>
            {clientAddress && <p className="whitespace-pre-line text-slate-600">{clientAddress}</p>}
          </div>
        </div>

        <table className="w-full text-sm mb-6">
          <thead>
            <tr className="border-b-2 border-slate-300 text-left">
              <th className="py-2 font-semibold">Description</th>
              <th className="py-2 font-semibold text-right">Qty</th>
              <th className="py-2 font-semibold text-right">Rate</th>
              <th className="py-2 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => {
              const q = parseFloat(it.qty) || 0;
              const r = parseFloat(it.rate) || 0;
              return (
                <tr key={it.id} className="border-b border-slate-100">
                  <td className="py-2">{it.description || <span className="text-slate-400">—</span>}</td>
                  <td className="py-2 text-right">{q}</td>
                  <td className="py-2 text-right">{money(r)}</td>
                  <td className="py-2 text-right">{money(q * r)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-64 text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Tax ({taxRate || 0}%)</span>
              <span>{money(tax)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-300 pt-2 mt-2 font-bold text-lg">
              <span>Total</span>
              <span>{money(total)}</span>
            </div>
          </div>
        </div>

        {notes && (
          <div className="mt-8 pt-4 border-t border-slate-200 text-sm">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Notes</p>
            <p className="text-slate-700">{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
