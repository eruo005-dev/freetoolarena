"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function plusDaysISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const FICA_RATE = 0.0765;

export function PayStubGenerator() {
  const [employerName, setEmployerName] = useState("Summit Ridge Industries, LLC");
  const [employerAddress, setEmployerAddress] = useState("2100 Commerce Drive\nDenver, CO 80202");
  const [employerEIN, setEmployerEIN] = useState("87-1234567");
  const [employeeName, setEmployeeName] = useState("Taylor Brooks");
  const [employeeAddress, setEmployeeAddress] = useState("914 Oak Avenue\nAurora, CO 80012");
  const [ssnLast4, setSsnLast4] = useState("4821");
  const [periodStart, setPeriodStart] = useState(plusDaysISO(-14));
  const [periodEnd, setPeriodEnd] = useState(plusDaysISO(-1));
  const [payDate, setPayDate] = useState(todayISO());
  const [hourlyRate, setHourlyRate] = useState("28.50");
  const [regularHours, setRegularHours] = useState("80");
  const [overtimeHours, setOvertimeHours] = useState("6");
  const [ytdGross, setYtdGross] = useState("18400");
  const [federalWH, setFederalWH] = useState("312.40");
  const [stateWH, setStateWH] = useState("102.80");
  const [otherDeductions, setOtherDeductions] = useState("Health insurance: 85.00\n401(k) 5%: 131.32");
  const [copied, setCopied] = useState(false);

  const { rateNum, regNum, otNum, regularPay, overtimePay, gross, fica, federalNum, stateNum, otherTotal, netPay, otherItems, ytdGrossNum, ytdFica, ytdFederal, ytdState, ytdOther, ytdNet } = useMemo(() => {
    const r = Math.max(0, parseFloat(hourlyRate) || 0);
    const rh = Math.max(0, parseFloat(regularHours) || 0);
    const oh = Math.max(0, parseFloat(overtimeHours) || 0);
    const reg = r * rh;
    const ot = r * 1.5 * oh;
    const g = reg + ot;
    const f = g * FICA_RATE;
    const fed = Math.max(0, parseFloat(federalWH) || 0);
    const st = Math.max(0, parseFloat(stateWH) || 0);

    const items: { label: string; amount: number }[] = [];
    otherDeductions.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      const m = trimmed.match(/^(.*?):\s*([\d.]+)\s*$/);
      if (m) {
        items.push({ label: m[1].trim(), amount: parseFloat(m[2]) || 0 });
      } else {
        const m2 = trimmed.match(/^(.*?)\s+([\d.]+)\s*$/);
        if (m2) {
          items.push({ label: m2[1].trim(), amount: parseFloat(m2[2]) || 0 });
        }
      }
    });
    const otherSum = items.reduce((s, it) => s + it.amount, 0);
    const net = g - f - fed - st - otherSum;

    const ytdG = Math.max(0, parseFloat(ytdGross) || 0);
    const ratio = ytdG > 0 && g > 0 ? ytdG / g : 1;
    const ytdF = f * ratio;
    const ytdFed = fed * ratio;
    const ytdSt = st * ratio;
    const ytdOth = otherSum * ratio;
    const ytdN = ytdG - ytdF - ytdFed - ytdSt - ytdOth;

    return {
      rateNum: r,
      regNum: rh,
      otNum: oh,
      regularPay: reg,
      overtimePay: ot,
      gross: g,
      fica: f,
      federalNum: fed,
      stateNum: st,
      otherTotal: otherSum,
      netPay: net,
      otherItems: items,
      ytdGrossNum: ytdG,
      ytdFica: ytdF,
      ytdFederal: ytdFed,
      ytdState: ytdSt,
      ytdOther: ytdOth,
      ytdNet: ytdN,
    };
  }, [hourlyRate, regularHours, overtimeHours, federalWH, stateWH, otherDeductions, ytdGross]);

  const copyPlainText = async () => {
    const lines: string[] = [];
    lines.push("PAY STATEMENT");
    lines.push("");
    lines.push(employerName);
    if (employerAddress) lines.push(employerAddress);
    if (employerEIN) lines.push(`EIN: ${employerEIN}`);
    lines.push("");
    lines.push(`Employee: ${employeeName}`);
    if (employeeAddress) lines.push(employeeAddress);
    if (ssnLast4) lines.push(`SSN: XXX-XX-${ssnLast4}`);
    lines.push("");
    lines.push(`Pay period: ${periodStart} to ${periodEnd}`);
    lines.push(`Pay date: ${payDate}`);
    lines.push("");
    lines.push("EARNINGS                  Hours    Rate      Current       YTD");
    lines.push(`Regular                   ${regNum.toFixed(2).padStart(6)}   ${money(rateNum).padStart(8)}   ${money(regularPay).padStart(10)}`);
    if (otNum > 0) {
      lines.push(`Overtime (1.5x)           ${otNum.toFixed(2).padStart(6)}   ${money(rateNum * 1.5).padStart(8)}   ${money(overtimePay).padStart(10)}`);
    }
    lines.push(`Gross pay                                         ${money(gross).padStart(10)}   ${money(ytdGrossNum).padStart(10)}`);
    lines.push("");
    lines.push("DEDUCTIONS                               Current       YTD");
    lines.push(`FICA (7.65%)                           ${money(fica).padStart(10)}   ${money(ytdFica).padStart(10)}`);
    lines.push(`Federal withholding                    ${money(federalNum).padStart(10)}   ${money(ytdFederal).padStart(10)}`);
    lines.push(`State withholding                      ${money(stateNum).padStart(10)}   ${money(ytdState).padStart(10)}`);
    otherItems.forEach((it) => {
      lines.push(`${it.label.padEnd(38)} ${money(it.amount).padStart(10)}`);
    });
    lines.push("");
    lines.push(`NET PAY: ${money(netPay)}   YTD: ${money(ytdNet)}`);
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
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Employer</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Employer name</span>
          <input
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Employer address</span>
          <textarea
            rows={2}
            value={employerAddress}
            onChange={(e) => setEmployerAddress(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">EIN</span>
          <input
            value={employerEIN}
            onChange={(e) => setEmployerEIN(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Employee</h3>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Employee name</span>
          <input
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Employee address</span>
          <textarea
            rows={2}
            value={employeeAddress}
            onChange={(e) => setEmployeeAddress(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">SSN last 4 (optional)</span>
          <input
            maxLength={4}
            value={ssnLast4}
            onChange={(e) => setSsnLast4(e.target.value.replace(/\D/g, ""))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Pay period</h3>
        <div className="grid grid-cols-3 gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Start</span>
            <input
              type="date"
              value={periodStart}
              onChange={(e) => setPeriodStart(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">End</span>
            <input
              type="date"
              value={periodEnd}
              onChange={(e) => setPeriodEnd(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Pay date</span>
            <input
              type="date"
              value={payDate}
              onChange={(e) => setPayDate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        </div>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Earnings</h3>
        <div className="grid grid-cols-3 gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Hourly rate ($)</span>
            <input
              type="number"
              min={0}
              step={0.01}
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Regular hours</span>
            <input
              type="number"
              min={0}
              step={0.25}
              value={regularHours}
              onChange={(e) => setRegularHours(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Overtime hours</span>
            <input
              type="number"
              min={0}
              step={0.25}
              value={overtimeHours}
              onChange={(e) => setOvertimeHours(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">YTD gross ($)</span>
          <input
            type="number"
            min={0}
            step={0.01}
            value={ytdGross}
            onChange={(e) => setYtdGross(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide pt-2">Deductions</h3>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Federal WH ($)</span>
            <input
              type="number"
              min={0}
              step={0.01}
              value={federalWH}
              onChange={(e) => setFederalWH(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">State WH ($)</span>
            <input
              type="number"
              min={0}
              step={0.01}
              value={stateWH}
              onChange={(e) => setStateWH(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Other deductions (one per line, &ldquo;Label: amount&rdquo;)</span>
          <textarea
            rows={3}
            value={otherDeductions}
            onChange={(e) => setOtherDeductions(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <p className="text-xs text-slate-500">FICA (7.65%) is auto-calculated from gross pay.</p>

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
          <div className="border-b-2 border-slate-800 pb-4 mb-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-lg leading-tight">{employerName}</p>
                {employerAddress && (
                  <p className="text-xs text-slate-600 whitespace-pre-line leading-tight mt-0.5">{employerAddress}</p>
                )}
                {employerEIN && <p className="text-xs text-slate-600 mt-1">EIN: {employerEIN}</p>}
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold tracking-wider uppercase">Pay Statement</h2>
                <p className="text-xs text-slate-600 mt-1">Pay date: <span className="font-semibold">{payDate}</span></p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5 text-xs">
            <div className="border border-slate-400 p-3">
              <p className="uppercase tracking-wider font-bold text-slate-500 mb-1">Employee</p>
              <p className="font-semibold text-sm">{employeeName}</p>
              {employeeAddress && (
                <p className="whitespace-pre-line text-slate-700 mt-0.5">{employeeAddress}</p>
              )}
              {ssnLast4 && <p className="text-slate-700 mt-1">SSN: XXX-XX-{ssnLast4}</p>}
            </div>
            <div className="border border-slate-400 p-3">
              <p className="uppercase tracking-wider font-bold text-slate-500 mb-1">Pay period</p>
              <p className="text-sm"><span className="text-slate-600">Start:</span> {periodStart}</p>
              <p className="text-sm"><span className="text-slate-600">End:</span> {periodEnd}</p>
              <p className="text-sm mt-1"><span className="text-slate-600">Pay date:</span> {payDate}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Earnings</p>
            <table className="w-full text-sm border border-slate-400">
              <thead>
                <tr className="bg-slate-100">
                  <th className="py-1.5 px-2 text-left font-semibold border-b border-slate-400">Type</th>
                  <th className="py-1.5 px-2 text-right font-semibold border-b border-slate-400">Hours</th>
                  <th className="py-1.5 px-2 text-right font-semibold border-b border-slate-400">Rate</th>
                  <th className="py-1.5 px-2 text-right font-semibold border-b border-slate-400">Current</th>
                  <th className="py-1.5 px-2 text-right font-semibold border-b border-slate-400">YTD</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-1.5 px-2">Regular</td>
                  <td className="py-1.5 px-2 text-right">{regNum.toFixed(2)}</td>
                  <td className="py-1.5 px-2 text-right">{money(rateNum)}</td>
                  <td className="py-1.5 px-2 text-right">{money(regularPay)}</td>
                  <td className="py-1.5 px-2 text-right text-slate-500">&mdash;</td>
                </tr>
                {otNum > 0 && (
                  <tr className="border-b border-slate-200">
                    <td className="py-1.5 px-2">Overtime (1.5x)</td>
                    <td className="py-1.5 px-2 text-right">{otNum.toFixed(2)}</td>
                    <td className="py-1.5 px-2 text-right">{money(rateNum * 1.5)}</td>
                    <td className="py-1.5 px-2 text-right">{money(overtimePay)}</td>
                    <td className="py-1.5 px-2 text-right text-slate-500">&mdash;</td>
                  </tr>
                )}
                <tr className="bg-slate-50 font-bold">
                  <td className="py-1.5 px-2" colSpan={3}>Gross pay</td>
                  <td className="py-1.5 px-2 text-right">{money(gross)}</td>
                  <td className="py-1.5 px-2 text-right">{money(ytdGrossNum)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-4">
            <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Deductions</p>
            <table className="w-full text-sm border border-slate-400">
              <thead>
                <tr className="bg-slate-100">
                  <th className="py-1.5 px-2 text-left font-semibold border-b border-slate-400">Description</th>
                  <th className="py-1.5 px-2 text-right font-semibold border-b border-slate-400">Current</th>
                  <th className="py-1.5 px-2 text-right font-semibold border-b border-slate-400">YTD</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-1.5 px-2">FICA (7.65%)</td>
                  <td className="py-1.5 px-2 text-right">{money(fica)}</td>
                  <td className="py-1.5 px-2 text-right">{money(ytdFica)}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-1.5 px-2">Federal withholding</td>
                  <td className="py-1.5 px-2 text-right">{money(federalNum)}</td>
                  <td className="py-1.5 px-2 text-right">{money(ytdFederal)}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-1.5 px-2">State withholding</td>
                  <td className="py-1.5 px-2 text-right">{money(stateNum)}</td>
                  <td className="py-1.5 px-2 text-right">{money(ytdState)}</td>
                </tr>
                {otherItems.map((it, i) => (
                  <tr key={i} className="border-b border-slate-200">
                    <td className="py-1.5 px-2">{it.label}</td>
                    <td className="py-1.5 px-2 text-right">{money(it.amount)}</td>
                    <td className="py-1.5 px-2 text-right text-slate-500">&mdash;</td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-bold">
                  <td className="py-1.5 px-2">Total deductions</td>
                  <td className="py-1.5 px-2 text-right">{money(fica + federalNum + stateNum + otherTotal)}</td>
                  <td className="py-1.5 px-2 text-right">{money(ytdFica + ytdFederal + ytdState + ytdOther)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-2 border-slate-800 bg-slate-100 p-4 flex justify-between items-center print:bg-white">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-slate-600">Net Pay</p>
              <p className="text-xs text-slate-600 mt-1">YTD net: {money(ytdNet)}</p>
            </div>
            <p className="text-3xl font-bold tracking-tight">{money(netPay)}</p>
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
