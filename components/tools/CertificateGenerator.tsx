"use client";

import { useEffect, useRef, useState } from "react";

export function CertificateGenerator() {
  const [recipient, setRecipient] = useState("Ada Lovelace");
  const [title, setTitle] = useState("Certificate of Completion");
  const [body, setBody] = useState("has successfully completed");
  const [course, setCourse] = useState("Introduction to Analytical Engines");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [issuer, setIssuer] = useState("Your Academy");
  const [accent, setAccent] = useState("#b45309");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = 1600;
    c.height = 1100;
    const ctx = c.getContext("2d")!;

    ctx.fillStyle = "#fdf6e3";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.strokeStyle = accent;
    ctx.lineWidth = 14;
    ctx.strokeRect(40, 40, c.width - 80, c.height - 80);
    ctx.lineWidth = 2;
    ctx.strokeRect(70, 70, c.width - 140, c.height - 140);

    ctx.textAlign = "center";
    ctx.fillStyle = "#111827";
    ctx.font = "italic 46px Georgia, serif";
    ctx.fillText(title, c.width / 2, 220);

    ctx.strokeStyle = accent;
    ctx.beginPath();
    ctx.moveTo(c.width / 2 - 120, 250);
    ctx.lineTo(c.width / 2 + 120, 250);
    ctx.stroke();

    ctx.font = "28px Georgia, serif";
    ctx.fillStyle = "#374151";
    ctx.fillText("This certificate is proudly presented to", c.width / 2, 340);

    ctx.font = "bold 84px Georgia, serif";
    ctx.fillStyle = accent;
    ctx.fillText(recipient, c.width / 2, 470);

    ctx.font = "28px Georgia, serif";
    ctx.fillStyle = "#374151";
    ctx.fillText(body, c.width / 2, 560);

    ctx.font = "italic bold 44px Georgia, serif";
    ctx.fillStyle = "#111827";
    ctx.fillText(`"${course}"`, c.width / 2, 640);

    ctx.strokeStyle = "#9ca3af";
    ctx.beginPath();
    ctx.moveTo(220, 880);
    ctx.lineTo(620, 880);
    ctx.moveTo(c.width - 620, 880);
    ctx.lineTo(c.width - 220, 880);
    ctx.stroke();

    ctx.font = "22px Georgia, serif";
    ctx.fillStyle = "#374151";
    ctx.fillText("Date", 420, 920);
    ctx.fillText(new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }), 420, 960);

    ctx.fillText("Issued by", c.width - 420, 920);
    ctx.font = "bold 24px Georgia, serif";
    ctx.fillText(issuer, c.width - 420, 960);
  }, [recipient, title, body, course, date, issuer, accent]);

  function download() {
    canvasRef.current?.toBlob((b) => {
      if (!b) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = `${recipient.replace(/\s+/g, "-").toLowerCase()}-certificate.png`;
      a.click();
    }, "image/png");
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Certificate title</span><input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Recipient</span><input value={recipient} onChange={(e) => setRecipient(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Body line</span><input value={body} onChange={(e) => setBody(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Course / achievement</span><input value={course} onChange={(e) => setCourse(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Date</span><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Issuer</span><input value={issuer} onChange={(e) => setIssuer(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block sm:col-span-2"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Accent color</span><input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="h-10 rounded-lg border border-slate-300" /></label>
      </div>

      <div className="rounded-xl bg-slate-50 p-2 overflow-auto">
        <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-sm" />
      </div>
      <button onClick={download} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">Download PNG</button>
    </div>
  );
}
