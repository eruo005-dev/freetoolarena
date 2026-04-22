"use client";

import { useEffect, useRef, useState } from "react";

export function BusinessCardDesigner() {
  const [name, setName] = useState("Alex Morgan");
  const [title, setTitle] = useState("Founder & CEO");
  const [company, setCompany] = useState("Bright Labs");
  const [email, setEmail] = useState("alex@brightlabs.co");
  const [phone, setPhone] = useState("+1 555 019 2844");
  const [website, setWebsite] = useState("brightlabs.co");
  const [bg, setBg] = useState("#0f172a");
  const [fg, setFg] = useState("#ffffff");
  const [accent, setAccent] = useState("#fbbf24");
  const frontRef = useRef<HTMLCanvasElement>(null);
  const backRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 3.5x2 inches at 300 DPI = 1050x600
    const W = 1050, H = 600;
    const f = frontRef.current;
    const b = backRef.current;
    if (!f || !b) return;
    f.width = W; f.height = H; b.width = W; b.height = H;

    const fctx = f.getContext("2d")!;
    fctx.fillStyle = bg;
    fctx.fillRect(0, 0, W, H);

    fctx.fillStyle = accent;
    fctx.fillRect(0, H - 20, W, 20);

    fctx.fillStyle = fg;
    fctx.textAlign = "left";
    fctx.font = "bold 54px -apple-system, 'Helvetica Neue', Arial, sans-serif";
    fctx.fillText(name, 60, 180);

    fctx.font = "28px -apple-system, 'Helvetica Neue', Arial, sans-serif";
    fctx.fillStyle = accent;
    fctx.fillText(title, 60, 225);

    fctx.fillStyle = fg;
    fctx.font = "22px -apple-system, 'Helvetica Neue', Arial, sans-serif";
    fctx.fillText(email, 60, 380);
    fctx.fillText(phone, 60, 420);
    fctx.fillText(website, 60, 460);

    fctx.textAlign = "right";
    fctx.font = "bold 30px -apple-system, 'Helvetica Neue', Arial, sans-serif";
    fctx.fillText(company, W - 60, 100);

    const bctx = b.getContext("2d")!;
    bctx.fillStyle = accent;
    bctx.fillRect(0, 0, W, H);
    bctx.fillStyle = bg;
    bctx.textAlign = "center";
    bctx.font = "bold 86px -apple-system, 'Helvetica Neue', Arial, sans-serif";
    bctx.fillText(company, W / 2, H / 2 + 30);
  }, [name, title, company, email, phone, website, bg, fg, accent]);

  function download(ref: React.RefObject<HTMLCanvasElement>, side: string) {
    ref.current?.toBlob((b) => {
      if (!b) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = `business-card-${side}.png`;
      a.click();
    }, "image/png");
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Name</span><input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Title</span><input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Company</span><input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Email</span><input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Phone</span><input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Website</span><input value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
        <div className="grid grid-cols-3 gap-2 sm:col-span-2">
          <label className="block"><span className="text-xs text-slate-500">Background</span><input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full h-10 rounded-lg border border-slate-300" /></label>
          <label className="block"><span className="text-xs text-slate-500">Text</span><input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-full h-10 rounded-lg border border-slate-300" /></label>
          <label className="block"><span className="text-xs text-slate-500">Accent</span><input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="w-full h-10 rounded-lg border border-slate-300" /></label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Front</div>
          <canvas ref={frontRef} className="w-full h-auto rounded-lg shadow border border-slate-200" />
          <button onClick={() => download(frontRef, "front")} className="mt-2 bg-brand text-white font-semibold rounded-lg px-3 py-2 text-sm hover:bg-brand-dark">Download front</button>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Back</div>
          <canvas ref={backRef} className="w-full h-auto rounded-lg shadow border border-slate-200" />
          <button onClick={() => download(backRef, "back")} className="mt-2 bg-brand text-white font-semibold rounded-lg px-3 py-2 text-sm hover:bg-brand-dark">Download back</button>
        </div>
      </div>
      <p className="text-xs text-slate-500">Output is 1050×600 px, equivalent to 3.5×2 in at 300 DPI — standard business card size, print-ready.</p>
    </div>
  );
}
