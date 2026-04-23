"use client";

import { useState } from "react";

interface PackingItem {
  id: string;
  sku: string;
  description: string;
  qtyOrdered: string;
  qtyShipped: string;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

const DEFAULT_ITEMS: PackingItem[] = [
  { id: uid(), sku: "SKU-1001", description: "Cotton T-Shirt, Navy, Size M", qtyOrdered: "2", qtyShipped: "2" },
  { id: uid(), sku: "SKU-2045", description: "Canvas Tote Bag, Natural", qtyOrdered: "1", qtyShipped: "1" },
  { id: uid(), sku: "SKU-3300", description: "Ceramic Mug, 12oz, Matte Black", qtyOrdered: "4", qtyShipped: "3" },
];

export function PackingSlipGenerator() {
  const [shipperCompany, setShipperCompany] = useState("Northwind Supply Co.");
  const [shipperAddress, setShipperAddress] = useState("500 Warehouse Way\nPortland, OR 97210");
  const [shipToName, setShipToName] = useState("Alex Morgan");
  const [shipToAddress, setShipToAddress] = useState("88 Oak Lane\nAustin, TX 78704");
  const [orderNumber, setOrderNumber] = useState("ORD-58421");
  const [orderDate, setOrderDate] = useState(todayISO());
  const [shipDate, setShipDate] = useState(todayISO());
  const [tracking, setTracking] = useState("1Z999AA10123456784");
  const [items, setItems] = useState<PackingItem[]>(DEFAULT_ITEMS);

  function addItem() {
    setItems((rows) => [...rows, { id: uid(), sku: "", description: "", qtyOrdered: "1", qtyShipped: "1" }]);
  }
  function updateItem(id: string, patch: Partial<PackingItem>) {
    setItems((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }
  function removeItem(id: string) {
    setItems((rows) => rows.filter((r) => r.id !== id));
  }

  const copyPlainText = async () => {
    const lines: string[] = [];
    lines.push("PACKING SLIP");
    lines.push("");
    lines.push(`From: ${shipperCompany}`);
    lines.push(shipperAddress);
    lines.push("");
    lines.push(`Ship to: ${shipToName}`);
    lines.push(shipToAddress);
    lines.push("");
    lines.push(`Order #: ${orderNumber}   Order date: ${orderDate}   Ship date: ${shipDate}`);
    if (tracking) lines.push(`Tracking: ${tracking}`);
    lines.push("");
    lines.push("SKU\tDescription\tQty Ordered\tQty Shipped");
    items.forEach((it) => {
      lines.push(`${it.sku}\t${it.description}\t${it.qtyOrdered}\t${it.qtyShipped}`);
    });
    lines.push("");
    lines.push("Items checked by ________");
    await navigator.clipboard.writeText(lines.join("\n"));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:block">
      <div className="space-y-4 print:hidden">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-700">Shipper</h3>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Company</span>
            <input
              type="text"
              value={shipperCompany}
              onChange={(e) => setShipperCompany(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Address</span>
            <textarea
              rows={2}
              value={shipperAddress}
              onChange={(e) => setShipperAddress(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-700">Ship to</h3>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Recipient name</span>
            <input
              type="text"
              value={shipToName}
              onChange={(e) => setShipToName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Address</span>
            <textarea
              rows={2}
              value={shipToAddress}
              onChange={(e) => setShipToAddress(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Order #</span>
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Tracking (optional)</span>
            <input
              type="text"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Order date</span>
            <input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Ship date</span>
            <input
              type="date"
              value={shipDate}
              onChange={(e) => setShipDate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-700">Items</h3>
            <button
              type="button"
              onClick={addItem}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
            >
              + Add row
            </button>
          </div>
          <div className="space-y-2">
            {items.map((it) => (
              <div key={it.id} className="grid grid-cols-[110px_1fr_70px_70px_auto] gap-2">
                <input
                  type="text"
                  placeholder="SKU"
                  value={it.sku}
                  onChange={(e) => updateItem(it.id, { sku: e.target.value })}
                  className="rounded-lg border border-slate-300 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={it.description}
                  onChange={(e) => updateItem(it.id, { description: e.target.value })}
                  className="rounded-lg border border-slate-300 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                />
                <input
                  type="number"
                  min={0}
                  placeholder="Ord"
                  value={it.qtyOrdered}
                  onChange={(e) => updateItem(it.id, { qtyOrdered: e.target.value })}
                  className="rounded-lg border border-slate-300 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                />
                <input
                  type="number"
                  min={0}
                  placeholder="Shp"
                  value={it.qtyShipped}
                  onChange={(e) => updateItem(it.id, { qtyShipped: e.target.value })}
                  className="rounded-lg border border-slate-300 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                />
                <button
                  type="button"
                  onClick={() => removeItem(it.id)}
                  className="text-rose-600 hover:text-rose-700 text-sm px-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
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
            Copy as text
          </button>
        </div>
      </div>

      <div className="print:col-span-2 print:p-0 print:max-w-none">
        <div className="bg-white border border-slate-200 rounded-xl p-8 font-serif text-slate-900 print:border-0 print:rounded-none print:p-0">
          <div className="flex justify-between items-start mb-6 border-b-2 border-slate-800 pb-3">
            <h1 className="text-3xl font-bold tracking-widest">PACKING SLIP</h1>
            <div className="text-right text-sm">
              <div><span className="font-semibold">Order #:</span> {orderNumber}</div>
              {tracking && <div><span className="font-semibold">Tracking:</span> {tracking}</div>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">From</div>
              <div className="font-bold">{shipperCompany}</div>
              <div className="whitespace-pre-line">{shipperAddress}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Ship to</div>
              <div className="font-bold">{shipToName}</div>
              <div className="whitespace-pre-line">{shipToAddress}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 text-sm border-y border-slate-300 py-2">
            <div><span className="font-semibold">Order date:</span> {orderDate}</div>
            <div><span className="font-semibold">Ship date:</span> {shipDate}</div>
            <div><span className="font-semibold">Order #:</span> {orderNumber}</div>
          </div>

          <table className="w-full text-sm mb-8">
            <thead>
              <tr className="border-b-2 border-slate-800">
                <th className="py-2 text-left font-bold">SKU</th>
                <th className="py-2 text-left font-bold">Description</th>
                <th className="py-2 text-right font-bold">Qty Ordered</th>
                <th className="py-2 text-right font-bold">Qty Shipped</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-b border-slate-200">
                  <td className="py-2">{it.sku || <span className="text-slate-400">&mdash;</span>}</td>
                  <td className="py-2">{it.description || <span className="text-slate-400">&mdash;</span>}</td>
                  <td className="py-2 text-right">{it.qtyOrdered}</td>
                  <td className="py-2 text-right">{it.qtyShipped}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-12 pt-4 border-t border-slate-300 text-sm">
            <p>Items checked by ________________________</p>
            <p className="mt-6 text-xs text-slate-500 italic">
              Thank you for your order. No prices appear on packing slips.
            </p>
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
