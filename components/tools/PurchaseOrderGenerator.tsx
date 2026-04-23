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

function defaultPONumber(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `PO-${y}${m}-${rand}`;
}

interface LineItem {
  id: string;
  description: string;
  qty: string;
  rate: string;
}

const DEFAULT_ITEMS: LineItem[] = [
  { id: uid(), description: "Laptop, 14in, 16GB RAM", qty: "3", rate: "1299" },
  { id: uid(), description: "USB-C dock, dual monitor", qty: "3", rate: "159" },
  { id: uid(), description: "Wireless keyboard/mouse kit", qty: "3", rate: "79" },
];

export function PurchaseOrderGenerator() {
  const [buyerCompany, setBuyerCompany] = useState("Harbor Logistics, Inc.");
  const [buyerContact, setBuyerContact] = useState("Alex Morgan");
  const [buyerAddress, setBuyerAddress] = useState("900 Dockside Blvd\nLong Beach, CA 90802");
  const [vendorCompany, setVendorCompany] = useState("TechSource Wholesale");
  const [vendorContact, setVendorContact] = useState("Priya Shah");
  const [vendorAddress, setVendorAddress] = useState("4210 Industry Way\nAustin, TX 78744");
  const [poNumber, setPONumber] = useState(defaultPONumber());
  const [orderDate, setOrderDate] = useState(todayISO());
  const [requiredBy, setRequiredBy] = useState(plusDaysISO(14));
  const [sameAsBuyer, setSameAsBuyer] = useState(true);
  const [shipToAddress, setShipToAddress] = useState("900 Dockside Blvd\nLong Beach, CA 90802");
  const [shipping, setShipping] = useState("75");
  const [taxRate, setTaxRate] = useState("8.25");
  const [terms, setTerms] = useState("Net 30. Please confirm receipt and expected ship date. Reference PO number on all invoices and packing slips.");
  const [items, setItems] = useState<LineItem[]>(DEFAULT_ITEMS);
  const [copied, setCopied] = useState(false);

  const effectiveShipTo = sameAsBuyer ? buyerAddress : shipToAddress;

  const { subtotal, tax, shippingNum, total } = useMemo(() => {
    const sub = items.reduce((s, it) => {
      const q = parseFloat(it.qty) || 0;
      const r = parseFloat(it.rate) || 0;
      return s + q * r;
    }, 0);
    const rate = Math.max(0, parseFloat(taxRate) || 0);
    const t = sub * (rate / 100);
    const sh = Math.max(0, parseFloat(shipping) || 0);
    return { subtotal: sub, tax: t, shippingNum: sh, total: sub + t + sh };
  }, [items, taxRate, shipping]);

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
    lines.push(`PURCHASE ORDER ${poNumber}`);
    lines.push(`Order date: ${orderDate}    Required by: ${requiredBy}`);
    lines.push("");
    lines.push(`Buyer: ${buyerCompany} (${buyerContact})`);
    if (buyerAddress) lines.push(buyerAddress);
    lines.push("");
    lines.push(`Vendor: ${vendorCompany} (${vendorContact})`);
    if (vendorAddress) lines.push(vendorAddress);
    lines.push("");
    lines.push("Ship to:");
    lines.push(effectiveShipTo);
    lines.push("");
    lines.push("Items:");
    items.forEach((it) => {
      const q = parseFloat(it.qty) || 0;
      const r = parseFloat(it.rate) || 0;
      lines.push(`  ${it.description || "(item)"} - ${q} x ${money(r)} = ${money(q * r)}`);
    });
    lines.push("");
    lines.push(`Subtotal: ${money(subtotal)}`);
    lines.push(`Shipping: ${money(shippingNum)}`);
    lines.push(`Tax (${taxRate}%): ${money(tax)}`);
    lines.push(`TOTAL: ${money(total)}`);
    if (terms) {
      lines.push("");
      lines.push(`Terms: ${terms}`);
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
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Buyer</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Company</span>
          <input
            value={buyerCompany}
            onChange={(e) => setBuyerCompany(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Contact</span>
          <input
            value={buyerContact}
            onChange={(e) => setBuyerContact(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Address</span>
          <textarea
            rows={2}
            value={buyerAddress}
            onChange={(e) => setBuyerAddress(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Vendor</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Company</span>
          <input
            value={vendorCompany}
            onChange={(e) => setVendorCompany(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Contact</span>
          <input
            value={vendorContact}
            onChange={(e) => setVendorContact(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Address</span>
          <textarea
            rows={2}
            value={vendorAddress}
            onChange={(e) => setVendorAddress(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <div className="grid grid-cols-3 gap-3 pt-2">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">PO #</span>
            <input
              value={poNumber}
              onChange={(e) => setPONumber(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Order date</span>
            <input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Required by</span>
            <input
              type="date"
              value={requiredBy}
              onChange={(e) => setRequiredBy(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        </div>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Ship to</h3>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={sameAsBuyer}
            onChange={(e) => setSameAsBuyer(e.target.checked)}
          />
          Same as buyer address
        </label>
        {!sameAsBuyer && (
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Ship-to address</span>
            <textarea
              rows={2}
              value={shipToAddress}
              onChange={(e) => setShipToAddress(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        )}

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

        <div className="grid grid-cols-2 gap-3 pt-2">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Shipping</span>
            <input
              type="number"
              min={0}
              step={0.01}
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
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
        </div>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Terms</span>
          <textarea
            rows={3}
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
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
          <div className="flex justify-between items-start mb-6 pb-4 border-b-4 border-double border-slate-800">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-600">{buyerCompany}</p>
              <h2 className="text-3xl font-bold tracking-tight mt-1">PURCHASE ORDER</h2>
            </div>
            <div className="text-right text-sm">
              <p className="text-xs uppercase tracking-wide font-bold text-slate-500">PO Number</p>
              <p className="font-bold text-lg">{poNumber}</p>
              <p className="mt-2"><span className="text-slate-600">Order date:</span> {orderDate}</p>
              <p><span className="text-slate-600">Required by:</span> {requiredBy}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6 text-sm">
            <div className="border border-slate-400 p-3">
              <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Buyer</p>
              <p className="font-semibold">{buyerCompany}</p>
              {buyerContact && <p className="text-slate-700">{buyerContact}</p>}
              {buyerAddress && (
                <p className="whitespace-pre-line text-slate-700 text-xs mt-1">{buyerAddress}</p>
              )}
            </div>
            <div className="border border-slate-400 p-3">
              <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Vendor</p>
              <p className="font-semibold">{vendorCompany}</p>
              {vendorContact && <p className="text-slate-700">{vendorContact}</p>}
              {vendorAddress && (
                <p className="whitespace-pre-line text-slate-700 text-xs mt-1">{vendorAddress}</p>
              )}
            </div>
            <div className="border border-slate-400 p-3">
              <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Ship to</p>
              <p className="whitespace-pre-line text-slate-700 text-xs">{effectiveShipTo}</p>
            </div>
          </div>

          <table className="w-full text-sm mb-6 border border-slate-400">
            <thead>
              <tr className="bg-slate-200">
                <th className="py-2 px-3 text-left font-bold border-b border-slate-400">Description</th>
                <th className="py-2 px-3 text-right font-bold border-b border-slate-400 w-16">Qty</th>
                <th className="py-2 px-3 text-right font-bold border-b border-slate-400 w-24">Unit Price</th>
                <th className="py-2 px-3 text-right font-bold border-b border-slate-400 w-28">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => {
                const q = parseFloat(it.qty) || 0;
                const r = parseFloat(it.rate) || 0;
                return (
                  <tr key={it.id} className="border-b border-slate-200">
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
                <span className="text-slate-600">Shipping</span>
                <span>{money(shippingNum)}</span>
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
            <div className="mb-8 pt-4 border-t border-slate-200 text-sm">
              <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Terms &amp; instructions</p>
              <p className="text-slate-700 whitespace-pre-line">{terms}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-8 pt-6 mt-8 text-sm">
            <div>
              <div className="border-b border-slate-500 h-10"></div>
              <p className="text-xs text-slate-600 mt-1">Authorized signature</p>
            </div>
            <div>
              <div className="border-b border-slate-500 h-10"></div>
              <p className="text-xs text-slate-600 mt-1">Date</p>
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
