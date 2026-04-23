"use client";

import { useState } from "react";

function defaultCertNumber(): string {
  const d = new Date();
  const y = d.getFullYear();
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `GC-${y}-${rand}`;
}

function oneYearOut(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

export function GiftCertificateMaker() {
  const [business, setBusiness] = useState("The Blue Willow Cafe");
  const [recipient, setRecipient] = useState("Emma Whitaker");
  const [sender, setSender] = useState("Daniel Whitaker");
  const [amount, setAmount] = useState("100");
  const [message, setMessage] = useState(
    "Happy birthday, Emma! Enjoy a treat on us. Lunch, coffee, a slice of pie — whatever makes your day brighter."
  );
  const [certNumber, setCertNumber] = useState(defaultCertNumber());
  const [expires, setExpires] = useState(oneYearOut());
  const [terms, setTerms] = useState(
    "Not redeemable for cash. Cannot be combined with other offers. One-time use. Lost certificates cannot be replaced."
  );

  const amountNum = parseFloat(amount) || 0;
  const formattedAmount = amountNum.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  const copyPlainText = async () => {
    const text = [
      `${business} Gift Certificate`,
      "",
      `This certifies that ${recipient}`,
      `is entitled to ${formattedAmount}`,
      "",
      message,
      "",
      `From: ${sender}`,
      `Certificate #: ${certNumber}`,
      `Expires: ${expires}`,
      "",
      `Terms: ${terms}`,
    ].join("\n");
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:block">
      <div className="space-y-3 print:hidden">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Issuing business</span>
          <input
            type="text"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Recipient</span>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">From (sender)</span>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Amount (USD)</span>
          <input
            type="number"
            min={0}
            step={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Personal message</span>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Certificate #</span>
            <input
              type="text"
              value={certNumber}
              onChange={(e) => setCertNumber(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Expires</span>
            <input
              type="date"
              value={expires}
              onChange={(e) => setExpires(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Redemption terms</span>
          <textarea
            rows={3}
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
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
            Copy as text
          </button>
        </div>
      </div>

      <div className="print:col-span-2 print:p-0 print:max-w-none">
        <div className="bg-white border border-slate-200 rounded-xl p-8 font-serif text-slate-900 print:border-0 print:rounded-none print:p-0">
          <div className="border-4 border-double border-amber-600 p-8 bg-gradient-to-br from-amber-50 to-white">
            <div className="text-center">
              <div className="text-xs tracking-[0.3em] uppercase text-amber-700 mb-2">Gift Certificate</div>
              <h1 className="text-4xl font-bold tracking-wide mb-1">{business}</h1>
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="h-px w-16 bg-amber-600"></div>
                <div className="text-amber-600 text-lg">&#10086;</div>
                <div className="h-px w-16 bg-amber-600"></div>
              </div>

              <p className="italic text-slate-700 text-lg mb-2">This certifies that</p>
              <p className="text-3xl font-semibold mb-6" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}>
                {recipient}
              </p>

              <p className="italic text-slate-700 mb-1">is entitled to the sum of</p>
              <p className="text-6xl font-bold text-amber-700 tracking-tight mb-6">{formattedAmount}</p>

              {message && (
                <p className="text-slate-800 italic max-w-lg mx-auto mb-8 leading-relaxed">
                  &ldquo;{message}&rdquo;
                </p>
              )}

              <div className="grid grid-cols-2 gap-8 max-w-md mx-auto mt-10 text-sm">
                <div>
                  <div className="border-b border-slate-800 h-8 mb-1"></div>
                  <div className="text-xs uppercase tracking-wide text-slate-500">From: {sender}</div>
                </div>
                <div>
                  <div className="border-b border-slate-800 h-8 mb-1"></div>
                  <div className="text-xs uppercase tracking-wide text-slate-500">Authorized signature</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-8">
                <div className="h-px w-12 bg-amber-600"></div>
                <div className="text-amber-600 text-sm">&#10086;</div>
                <div className="h-px w-12 bg-amber-600"></div>
              </div>

              <div className="flex justify-between mt-4 text-xs text-slate-600">
                <span>Certificate #: {certNumber}</span>
                <span>Expires: {expires}</span>
              </div>

              {terms && (
                <p className="mt-4 text-[10px] text-slate-500 leading-snug">{terms}</p>
              )}
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
