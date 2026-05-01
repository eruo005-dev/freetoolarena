"use client";

import { useMemo, useState } from "react";

type Format = "5160" | "5161" | "5163" | "5164" | "5167" | "L7160";

const FORMATS: Record<Format, { label: string; cols: number; rows: number; pageW: string; pageH: string; labelW: string; labelH: string; gapX: string; gapY: string; marginX: string; marginY: string }> = {
  "5160":  { label: "Avery 5160 (1\"×2 5/8\", 30/sheet, US Letter)", cols: 3, rows: 10, pageW: "8.5in", pageH: "11in", labelW: "2.625in", labelH: "1in",   gapX: "0.125in", gapY: "0in",   marginX: "0.1875in", marginY: "0.5in" },
  "5161":  { label: "Avery 5161 (1\"×4\", 20/sheet, US Letter)",      cols: 2, rows: 10, pageW: "8.5in", pageH: "11in", labelW: "4in",     labelH: "1in",   gapX: "0.125in", gapY: "0in",   marginX: "0.15625in", marginY: "0.5in" },
  "5163":  { label: "Avery 5163 (2\"×4\", 10/sheet, US Letter)",      cols: 2, rows: 5,  pageW: "8.5in", pageH: "11in", labelW: "4in",     labelH: "2in",   gapX: "0.125in", gapY: "0in",   marginX: "0.15625in", marginY: "0.5in" },
  "5164":  { label: "Avery 5164 (3 1/3\"×4\", 6/sheet, US Letter)",   cols: 2, rows: 3,  pageW: "8.5in", pageH: "11in", labelW: "4in",     labelH: "3.33in",gapX: "0.125in", gapY: "0in",   marginX: "0.15625in", marginY: "0.5in" },
  "5167":  { label: "Avery 5167 (1/2\"×1 3/4\" return, 80/sheet)",    cols: 4, rows: 20, pageW: "8.5in", pageH: "11in", labelW: "1.75in",  labelH: "0.5in", gapX: "0.3125in",gapY: "0in",   marginX: "0.28125in", marginY: "0.5in" },
  "L7160": { label: "Avery L7160 (38.1×63.5mm, 21/sheet, A4)",       cols: 3, rows: 7,  pageW: "210mm", pageH: "297mm", labelW: "63.5mm",  labelH: "38.1mm",gapX: "2.54mm",  gapY: "0mm",   marginX: "7.21mm",   marginY: "15.15mm" },
};

const SAMPLE = `John Smith
221 Baker Street
London, NW1 6XE
United Kingdom

Sarah Lee
1600 Amphitheatre Pkwy
Mountain View, CA 94043
USA

Acme & Sons LLC
500 Madison Ave
New York, NY 10022
USA`;

export function MailingLabelGenerator() {
  const [format, setFormat] = useState<Format>("5160");
  const [text, setText] = useState<string>(SAMPLE);

  const labels = useMemo(() => {
    return text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  }, [text]);

  const fmt = FORMATS[format];
  const perSheet = fmt.cols * fmt.rows;
  const sheets = Math.ceil(labels.length / perSheet);

  const handlePrint = () => window.print();

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 print:hidden">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Avery format</span>
          <select value={format} onChange={(e) => setFormat(e.target.value as Format)} className="w-full rounded border border-slate-300 px-3 py-2">
            {(Object.keys(FORMATS) as Format[]).map((f) => <option key={f} value={f}>{FORMATS[f].label}</option>)}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded border border-slate-200 bg-slate-50 p-2">
            <div className="text-xs text-slate-500">Per sheet</div>
            <div className="font-bold">{perSheet}</div>
          </div>
          <div className="rounded border border-slate-200 bg-slate-50 p-2">
            <div className="text-xs text-slate-500">Sheets needed</div>
            <div className="font-bold">{sheets}</div>
          </div>
        </div>
      </div>

      <label className="block text-sm print:hidden">
        <span className="mb-1 block font-medium text-slate-700">Addresses (separate each by blank line)</span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} className="w-full rounded border border-slate-300 px-3 py-2 font-mono text-xs" />
      </label>

      <button onClick={handlePrint} className="rounded bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark print:hidden">
        Print {sheets} sheet{sheets === 1 ? "" : "s"}
      </button>

      <style>{`
        @media print {
          @page { size: ${fmt.pageW} ${fmt.pageH}; margin: 0; }
          body * { visibility: hidden; }
          .label-sheet, .label-sheet * { visibility: visible; }
          .label-sheet { position: absolute; left: 0; top: 0; }
        }
      `}</style>

      <div className="rounded-lg border border-slate-200 bg-white p-4 print:border-0 print:p-0">
        <div
          className="label-sheet relative border border-slate-200 bg-white"
          style={{
            width: fmt.pageW,
            height: fmt.pageH,
            paddingLeft: fmt.marginX,
            paddingRight: fmt.marginX,
            paddingTop: fmt.marginY,
            display: "grid",
            gridTemplateColumns: `repeat(${fmt.cols}, ${fmt.labelW})`,
            gridAutoRows: fmt.labelH,
            columnGap: fmt.gapX,
            rowGap: fmt.gapY,
            transform: "scale(0.5)",
            transformOrigin: "top left",
            marginBottom: `calc(${fmt.pageH} * -0.5)`,
          }}
        >
          {Array.from({ length: perSheet }).map((_, i) => (
            <div key={i} style={{ width: fmt.labelW, height: fmt.labelH, padding: "0.1in", overflow: "hidden", fontSize: "10pt", lineHeight: 1.2, fontFamily: "Arial, sans-serif" }} className="border border-dashed border-slate-200 print:border-none">
              {labels[i] && <div className="whitespace-pre-line">{labels[i]}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 print:hidden">
        <strong>Print tip:</strong> set printer to &ldquo;Actual size&rdquo; (NOT Fit to Page). Test on plain paper first
        and hold up to a labeled sheet to verify alignment before committing label sheets.
      </div>
    </div>
  );
}
