"use client";

import { useMemo, useState } from "react";

export function PhotoReleaseGenerator() {
  const [releaseType, setReleaseType] = useState<"photo" | "video" | "combined">("combined");

  const [modelName, setModelName] = useState("Avery Sinclair");
  const [modelAddress, setModelAddress] = useState("721 Cedar Lane, Austin, TX 78704");

  const [isMinor, setIsMinor] = useState(false);
  const [guardianName, setGuardianName] = useState("Rachel Sinclair");
  const [guardianAddress, setGuardianAddress] = useState("721 Cedar Lane, Austin, TX 78704");
  const [guardianRelationship, setGuardianRelationship] = useState("Mother");

  const [photographerName, setPhotographerName] = useState("Lumen Studio, LLC");
  const [photographerAddress, setPhotographerAddress] = useState("1140 W 6th Street, Suite 204, Austin, TX 78703");

  const [shootDescription, setShootDescription] = useState(
    "Lifestyle portrait session for Lumen Studio&rsquo;s 2026 branding campaign. Includes outdoor portraits at Zilker Park and indoor studio shots at the Lumen Studio loft."
  );
  const [shootDate, setShootDate] = useState("2026-05-10");

  const [useCommercial, setUseCommercial] = useState(true);
  const [useEditorial, setUseEditorial] = useState(true);
  const [usePromotional, setUsePromotional] = useState(true);
  const [useEducational, setUseEducational] = useState(false);
  const [useWeb, setUseWeb] = useState(true);
  const [usePrint, setUsePrint] = useState(true);
  const [useSocial, setUseSocial] = useState(true);

  const [territory, setTerritory] = useState<"worldwide" | "us" | "specified">("worldwide");
  const [territorySpec, setTerritorySpec] = useState("United States and Canada");

  const [duration, setDuration] = useState<"perpetuity" | "years">("perpetuity");
  const [durationYears, setDurationYears] = useState("10");

  const [noCompensation, setNoCompensation] = useState(false);
  const [compensation, setCompensation] = useState("500");

  const [creditRequired, setCreditRequired] = useState(true);
  const [creditLine, setCreditLine] = useState("Photo by Lumen Studio / Model: Avery Sinclair");

  const [signatureDate, setSignatureDate] = useState("2026-04-23");

  const usageList = useMemo(() => {
    const items = [
      useCommercial && "commercial",
      useEditorial && "editorial",
      usePromotional && "promotional",
      useEducational && "educational",
      useWeb && "web",
      usePrint && "print",
      useSocial && "social media",
    ].filter(Boolean) as string[];
    return items;
  }, [useCommercial, useEditorial, usePromotional, useEducational, useWeb, usePrint, useSocial]);

  const releaseLabel = releaseType === "photo" ? "PHOTO RELEASE" : releaseType === "video" ? "VIDEO RELEASE" : "MODEL &amp; MEDIA RELEASE";
  const mediaNoun = releaseType === "photo" ? "photographs" : releaseType === "video" ? "video recordings" : "photographs, video recordings, and audio recordings";

  const territoryText = territory === "worldwide" ? "throughout the world" : territory === "us" ? "throughout the United States" : `within ${territorySpec}`;
  const durationText = duration === "perpetuity" ? "in perpetuity" : `for a period of ${durationYears} year(s) from the date below`;

  const plainText = useMemo(() => {
    const lines: string[] = [];
    lines.push(releaseLabel.replace("&amp;", "&"));
    lines.push("");
    lines.push(`Subject: ${modelName}`);
    lines.push(`Address: ${modelAddress}`);
    if (isMinor) {
      lines.push(`Minor: yes`);
      lines.push(`Parent/Guardian: ${guardianName} (${guardianRelationship})`);
      lines.push(`Guardian address: ${guardianAddress}`);
    }
    lines.push(`Photographer / Company: ${photographerName}`);
    lines.push(`Photographer address: ${photographerAddress}`);
    lines.push(`Shoot date: ${shootDate}`);
    lines.push(`Description: ${shootDescription.replace(/&rsquo;/g, "'")}`);
    lines.push("");
    lines.push(`Usage: ${usageList.join(", ") || "(none selected)"}`);
    lines.push(`Territory: ${territoryText}`);
    lines.push(`Duration: ${durationText}`);
    lines.push(`Compensation: ${noCompensation ? "No monetary compensation" : `$${compensation}`}`);
    if (creditRequired) lines.push(`Credit line: ${creditLine}`);
    lines.push("");
    lines.push(
      `I hereby grant ${photographerName} and its licensees, assigns, and successors the irrevocable, royalty-free right to use my name, likeness, and ${mediaNoun} taken on ${shootDate} for the purposes listed above, ${territoryText}, ${durationText}.`
    );
    lines.push("");
    lines.push(
      "I release and discharge the photographer and all persons acting under their authority from any and all claims arising out of such use, including but not limited to claims for defamation, invasion of privacy, or right of publicity."
    );
    lines.push("");
    lines.push(`Subject signature: ${modelName}`);
    lines.push(`Date: ${signatureDate}`);
    if (isMinor) {
      lines.push(`Parent/Guardian signature: ${guardianName}`);
      lines.push(`Date: ${signatureDate}`);
    }
    return lines.join("\n");
  }, [
    releaseLabel,
    modelName,
    modelAddress,
    isMinor,
    guardianName,
    guardianRelationship,
    guardianAddress,
    photographerName,
    photographerAddress,
    shootDate,
    shootDescription,
    usageList,
    territoryText,
    durationText,
    noCompensation,
    compensation,
    creditRequired,
    creditLine,
    mediaNoun,
    signatureDate,
  ]);

  const copyPlainText = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
      alert("Copied to clipboard");
    } catch {
      alert("Copy failed &mdash; please copy manually.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:block">
      <style jsx global>{`
        @media print {
          @page {
            size: letter;
            margin: 0.75in;
          }
          body {
            background: white;
          }
        }
      `}</style>

      {/* FORM */}
      <div className="print:hidden space-y-6">
        <div className="rounded-lg border bg-white p-4 space-y-3">
          <h3 className="font-semibold text-slate-900">Release type</h3>
          <select
            className="w-full rounded border px-2 py-1 text-sm"
            value={releaseType}
            onChange={(e) => setReleaseType(e.target.value as typeof releaseType)}
          >
            <option value="photo">Photo only</option>
            <option value="video">Video only</option>
            <option value="combined">Combined (photo + video + audio)</option>
          </select>
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <h3 className="font-semibold text-slate-900">Subject / Model</h3>
          <input className="w-full rounded border px-2 py-1 text-sm" placeholder="Full name" value={modelName} onChange={(e) => setModelName(e.target.value)} />
          <input className="w-full rounded border px-2 py-1 text-sm" placeholder="Address" value={modelAddress} onChange={(e) => setModelAddress(e.target.value)} />
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isMinor} onChange={(e) => setIsMinor(e.target.checked)} />
            <span>Subject is under 18 (minor)</span>
          </label>
          {isMinor && (
            <div className="space-y-2 rounded border border-dashed border-slate-300 p-2">
              <input className="w-full rounded border px-2 py-1 text-sm" placeholder="Parent / Guardian name" value={guardianName} onChange={(e) => setGuardianName(e.target.value)} />
              <input className="w-full rounded border px-2 py-1 text-sm" placeholder="Relationship" value={guardianRelationship} onChange={(e) => setGuardianRelationship(e.target.value)} />
              <input className="w-full rounded border px-2 py-1 text-sm" placeholder="Guardian address" value={guardianAddress} onChange={(e) => setGuardianAddress(e.target.value)} />
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <h3 className="font-semibold text-slate-900">Photographer / Company</h3>
          <input className="w-full rounded border px-2 py-1 text-sm" placeholder="Name / business" value={photographerName} onChange={(e) => setPhotographerName(e.target.value)} />
          <input className="w-full rounded border px-2 py-1 text-sm" placeholder="Address" value={photographerAddress} onChange={(e) => setPhotographerAddress(e.target.value)} />
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <h3 className="font-semibold text-slate-900">Shoot details</h3>
          <textarea rows={3} className="w-full rounded border px-2 py-1 text-sm" placeholder="Description" value={shootDescription} onChange={(e) => setShootDescription(e.target.value)} />
          <input type="date" className="w-full rounded border px-2 py-1 text-sm" value={shootDate} onChange={(e) => setShootDate(e.target.value)} />
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <h3 className="font-semibold text-slate-900">Usage scope</h3>
          <div className="grid grid-cols-2 gap-1 text-sm">
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={useCommercial} onChange={(e) => setUseCommercial(e.target.checked)} /> Commercial</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={useEditorial} onChange={(e) => setUseEditorial(e.target.checked)} /> Editorial</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={usePromotional} onChange={(e) => setUsePromotional(e.target.checked)} /> Promotional</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={useEducational} onChange={(e) => setUseEducational(e.target.checked)} /> Educational</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={useWeb} onChange={(e) => setUseWeb(e.target.checked)} /> Web</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={usePrint} onChange={(e) => setUsePrint(e.target.checked)} /> Print</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" checked={useSocial} onChange={(e) => setUseSocial(e.target.checked)} /> Social media</label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label className="block text-sm">
              <span className="text-slate-700">Territory</span>
              <select className="mt-1 w-full rounded border px-2 py-1" value={territory} onChange={(e) => setTerritory(e.target.value as typeof territory)}>
                <option value="worldwide">Worldwide</option>
                <option value="us">United States</option>
                <option value="specified">Specified</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="text-slate-700">Duration</span>
              <select className="mt-1 w-full rounded border px-2 py-1" value={duration} onChange={(e) => setDuration(e.target.value as typeof duration)}>
                <option value="perpetuity">In perpetuity</option>
                <option value="years">Specified years</option>
              </select>
            </label>
          </div>
          {territory === "specified" && (
            <input className="w-full rounded border px-2 py-1 text-sm" placeholder="Territory (e.g. United States and Canada)" value={territorySpec} onChange={(e) => setTerritorySpec(e.target.value)} />
          )}
          {duration === "years" && (
            <input className="w-full rounded border px-2 py-1 text-sm" placeholder="Years" value={durationYears} onChange={(e) => setDurationYears(e.target.value)} />
          )}
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <h3 className="font-semibold text-slate-900">Compensation &amp; credit</h3>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={noCompensation} onChange={(e) => setNoCompensation(e.target.checked)} />
            <span>No monetary compensation</span>
          </label>
          {!noCompensation && (
            <input className="w-full rounded border px-2 py-1 text-sm" placeholder="Amount ($)" value={compensation} onChange={(e) => setCompensation(e.target.value)} />
          )}
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={creditRequired} onChange={(e) => setCreditRequired(e.target.checked)} />
            <span>Credit required</span>
          </label>
          {creditRequired && (
            <input className="w-full rounded border px-2 py-1 text-sm" placeholder="Credit line" value={creditLine} onChange={(e) => setCreditLine(e.target.value)} />
          )}
          <label className="block text-sm">
            <span className="text-slate-700">Signature date</span>
            <input type="date" className="mt-1 w-full rounded border px-2 py-1" value={signatureDate} onChange={(e) => setSignatureDate(e.target.value)} />
          </label>
        </div>

        <div className="flex gap-2">
          <button type="button" onClick={() => window.print()} className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
            Print / Save as PDF
          </button>
          <button type="button" onClick={copyPlainText} className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50">
            Copy as text
          </button>
        </div>
      </div>

      {/* PREVIEW */}
      <div className="print:col-span-2">
        <div className="rounded-lg border bg-white p-8 shadow-sm" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          <div className="mb-6 rounded-lg border-2 border-amber-400 bg-amber-50 p-4 text-sm text-amber-900 print:border-amber-700">
            <strong>Not legal advice.</strong> This template is provided for reference only. Laws vary by jurisdiction. Have a licensed attorney review before signing.
          </div>

          <h1 className="text-center text-2xl font-bold tracking-widest" dangerouslySetInnerHTML={{ __html: releaseLabel }} />
          <p className="text-center text-xs text-slate-600 mb-6">Grant of rights to use likeness, photographs, and/or recordings</p>

          <p className="text-sm leading-relaxed">
            For good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, I, <span className="font-semibold">{modelName}</span>, residing at {modelAddress} (the &ldquo;Subject&rdquo;), hereby grant to <span className="font-semibold">{photographerName}</span>, located at {photographerAddress} (the &ldquo;Photographer&rdquo;), and to the Photographer&rsquo;s licensees, assigns, agents, and successors, the irrevocable, royalty-free, worldwide (subject to the Territory below) right and permission to use, reproduce, publish, edit, adapt, distribute, display, and exploit my name, voice, likeness, and the {mediaNoun} taken on <span className="font-semibold">{shootDate}</span> (collectively, the &ldquo;Materials&rdquo;).
          </p>

          <h2 className="mt-5 text-sm font-bold uppercase tracking-wider">Description of Session</h2>
          <p className="text-sm">{shootDescription}</p>

          <h2 className="mt-5 text-sm font-bold uppercase tracking-wider">Permitted Uses</h2>
          <p className="text-sm">The Materials may be used for the following purposes:</p>
          <ul className="mt-1 list-disc pl-6 text-sm">
            {usageList.length === 0 ? <li>(no usage selected)</li> : usageList.map((u) => <li key={u} className="capitalize">{u} use</li>)}
          </ul>
          <p className="mt-2 text-sm">
            <span className="font-semibold">Territory:</span> {territoryText}. <span className="font-semibold">Duration:</span> {durationText}.
          </p>

          <h2 className="mt-5 text-sm font-bold uppercase tracking-wider">Consideration</h2>
          <p className="text-sm">
            {noCompensation
              ? "The Subject acknowledges that no monetary compensation has been or will be paid, and that the opportunity to participate, together with the mutual promises herein, constitutes full and adequate consideration."
              : `The Photographer shall pay the Subject the sum of $${compensation} as full and final compensation for the rights granted herein.`}
          </p>

          {creditRequired && (
            <>
              <h2 className="mt-5 text-sm font-bold uppercase tracking-wider">Credit</h2>
              <p className="text-sm">Where practical, the Materials shall be accompanied by the following credit line: &ldquo;{creditLine}&rdquo;.</p>
            </>
          )}

          <h2 className="mt-5 text-sm font-bold uppercase tracking-wider">Release of Claims</h2>
          <p className="text-sm">
            I hereby release and discharge the Photographer, and all persons acting under the Photographer&rsquo;s authority, from any and all claims, demands, or causes of action arising out of or relating to the use of the Materials, including without limitation any claim for defamation, invasion of privacy, right of publicity, false light, or infringement of moral rights. I waive any right to inspect or approve the finished Materials, including any accompanying copy or text.
          </p>

          <h2 className="mt-5 text-sm font-bold uppercase tracking-wider">Acknowledgement</h2>
          <p className="text-sm">
            I am at least 18 years of age (or, if I am under 18, my parent or legal guardian has co-signed below). I have read this release in its entirety and understand it. I am signing it voluntarily.
          </p>

          {isMinor && (
            <div className="mt-5 rounded border border-slate-400 p-3">
              <h2 className="text-sm font-bold uppercase tracking-wider">Parent / Guardian Consent</h2>
              <p className="text-sm">
                I, <span className="font-semibold">{guardianName}</span>, am the {guardianRelationship.toLowerCase()} and legal guardian of the above-named minor Subject, residing at {guardianAddress}. I have read and understand this release and consent to it on the minor&rsquo;s behalf.
              </p>
            </div>
          )}

          <div className="mt-8 grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="border-b border-slate-800 pb-1 font-semibold">{modelName}</div>
              <div className="text-xs text-slate-600">Subject signature</div>
            </div>
            <div>
              <div className="border-b border-slate-800 pb-1 font-semibold">{signatureDate}</div>
              <div className="text-xs text-slate-600">Date</div>
            </div>
            {isMinor && (
              <>
                <div>
                  <div className="border-b border-slate-800 pb-1 font-semibold">{guardianName}</div>
                  <div className="text-xs text-slate-600">Parent / guardian signature</div>
                </div>
                <div>
                  <div className="border-b border-slate-800 pb-1 font-semibold">{signatureDate}</div>
                  <div className="text-xs text-slate-600">Date</div>
                </div>
              </>
            )}
            <div>
              <div className="border-b border-slate-800 pb-1">&nbsp;</div>
              <div className="text-xs text-slate-600">Photographer / witness (optional)</div>
            </div>
            <div>
              <div className="border-b border-slate-800 pb-1">&nbsp;</div>
              <div className="text-xs text-slate-600">Date</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
