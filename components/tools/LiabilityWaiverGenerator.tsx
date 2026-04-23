"use client";

import { useMemo, useState } from "react";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia",
  "Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland",
  "Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
  "New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
  "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

export function LiabilityWaiverGenerator() {
  const [activityName, setActivityName] = useState("Rock Climbing at Summit Vertical Gym");
  const [activityDescription, setActivityDescription] = useState(
    "Indoor top-rope and lead climbing on walls up to 45 feet, auto-belay use, bouldering on pads, and optional instructor-led clinics."
  );

  const [organizerName, setOrganizerName] = useState("Summit Vertical Gym, LLC");
  const [organizerAddress, setOrganizerAddress] = useState("480 Industrial Way, Denver, CO 80223");

  const [participantName, setParticipantName] = useState("Morgan L. Blake");
  const [participantDob, setParticipantDob] = useState("1990-11-22");

  const [isMinor, setIsMinor] = useState(false);
  const [guardianName, setGuardianName] = useState("Patricia Blake");
  const [guardianRelationship, setGuardianRelationship] = useState("Mother");

  const [eventStart, setEventStart] = useState("2026-05-15");
  const [eventEnd, setEventEnd] = useState("2026-05-15");

  const [knownRisks, setKnownRisks] = useState(
    "Falls from height; bruises, abrasions, sprains, strains, dislocations, and fractures; rope burn; equipment failure; collision with walls, holds, or other climbers; serious injury, permanent disability, paralysis, and death."
  );

  const [insuranceConfirmed, setInsuranceConfirmed] = useState(true);
  const [emergencyName, setEmergencyName] = useState("Jamie Blake");
  const [emergencyRelationship, setEmergencyRelationship] = useState("Spouse");
  const [emergencyPhone, setEmergencyPhone] = useState("(555) 662-8821");
  const [medicalConditions, setMedicalConditions] = useState("Mild asthma &mdash; carries rescue inhaler.");

  const [photoRelease, setPhotoRelease] = useState(true);
  const [governingLaw, setGoverningLaw] = useState("Colorado");

  const [signatureDate, setSignatureDate] = useState("2026-04-23");

  const eventDateText = useMemo(() => {
    if (!eventEnd || eventStart === eventEnd) return eventStart;
    return `${eventStart} to ${eventEnd}`;
  }, [eventStart, eventEnd]);

  const plainText = useMemo(() => {
    const lines: string[] = [];
    lines.push("WAIVER AND RELEASE OF LIABILITY");
    lines.push("");
    lines.push(`Activity: ${activityName}`);
    lines.push(`Description: ${activityDescription}`);
    lines.push(`Organizer / Host: ${organizerName}, ${organizerAddress}`);
    lines.push(`Event date(s): ${eventDateText}`);
    lines.push(`Participant: ${participantName} (DOB ${participantDob})`);
    if (isMinor) lines.push(`Parent / Guardian: ${guardianName} (${guardianRelationship})`);
    lines.push("");
    lines.push("ASSUMPTION OF RISK");
    lines.push(`I acknowledge that ${activityName} involves inherent and substantial risks, including without limitation: ${knownRisks.replace(/&mdash;/g, "—")}`);
    lines.push("");
    lines.push("WAIVER AND RELEASE");
    lines.push(`I hereby release, waive, discharge, and covenant not to sue ${organizerName}, its owners, officers, employees, agents, volunteers, and affiliates (collectively, the "Released Parties") from any and all liability, claims, demands, actions, and causes of action arising out of or related to any loss, damage, or injury sustained in connection with my participation, except for loss or injury caused by the Released Parties' gross negligence or willful misconduct.`);
    lines.push("");
    lines.push("INDEMNIFICATION");
    lines.push(`I agree to indemnify and hold harmless the Released Parties from any loss, liability, damage, or cost (including reasonable attorneys' fees) they may incur arising out of my participation, whether caused by the negligence of any Released Party or otherwise, to the fullest extent permitted by law.`);
    lines.push("");
    lines.push("MEDICAL AUTHORIZATION");
    lines.push(`I authorize the Released Parties to secure emergency medical treatment on my behalf if I am unable to consent. I agree to be financially responsible for any such treatment. Medical insurance confirmed: ${insuranceConfirmed ? "yes" : "no"}.`);
    lines.push(`Emergency contact: ${emergencyName} (${emergencyRelationship}) - ${emergencyPhone}`);
    if (medicalConditions) lines.push(`Medical conditions disclosed: ${medicalConditions.replace(/&mdash;/g, "—")}`);
    lines.push("");
    if (photoRelease) {
      lines.push("PHOTO / VIDEO RELEASE");
      lines.push(`I consent to the use of my likeness in photographs and video taken during the activity for promotional, editorial, and marketing purposes, without compensation.`);
      lines.push("");
    }
    if (isMinor) {
      lines.push("PARENT / GUARDIAN CONSENT");
      lines.push(`As the parent or legal guardian of the minor participant above, I have read and understand this waiver, consent to the minor's participation, and agree to be bound by its terms on behalf of the minor and myself.`);
      lines.push("");
    }
    lines.push(`Governing law: State of ${governingLaw}.`);
    lines.push("");
    lines.push(`Participant: ${participantName}`);
    lines.push(`Date: ${signatureDate}`);
    if (isMinor) {
      lines.push(`Parent / Guardian: ${guardianName}`);
      lines.push(`Date: ${signatureDate}`);
    }
    return lines.join("\n");
  }, [
    activityName,
    activityDescription,
    organizerName,
    organizerAddress,
    eventDateText,
    participantName,
    participantDob,
    isMinor,
    guardianName,
    guardianRelationship,
    knownRisks,
    insuranceConfirmed,
    emergencyName,
    emergencyRelationship,
    emergencyPhone,
    medicalConditions,
    photoRelease,
    governingLaw,
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
          <h3 className="font-semibold text-slate-900">Activity</h3>
          <input className="w-full rounded border px-2 py-1 text-sm" placeholder="Activity name" value={activityName} onChange={(e) => setActivityName(e.target.value)} />
          <textarea rows={3} className="w-full rounded border px-2 py-1 text-sm" placeholder="Description" value={activityDescription} onChange={(e) => setActivityDescription(e.target.value)} />
          <div className="grid grid-cols-2 gap-2">
            <label className="block text-sm">
              <span className="text-slate-700">Event start</span>
              <input type="date" className="mt-1 w-full rounded border px-2 py-1" value={eventStart} onChange={(e) => setEventStart(e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="text-slate-700">Event end (same day if single)</span>
              <input type="date" className="mt-1 w-full rounded border px-2 py-1" value={eventEnd} onChange={(e) => setEventEnd(e.target.value)} />
            </label>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <h3 className="font-semibold text-slate-900">Organizer / Host</h3>
          <input className="w-full rounded border px-2 py-1 text-sm" placeholder="Name / company" value={organizerName} onChange={(e) => setOrganizerName(e.target.value)} />
          <input className="w-full rounded border px-2 py-1 text-sm" placeholder="Address" value={organizerAddress} onChange={(e) => setOrganizerAddress(e.target.value)} />
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <h3 className="font-semibold text-slate-900">Participant</h3>
          <input className="w-full rounded border px-2 py-1 text-sm" placeholder="Full name" value={participantName} onChange={(e) => setParticipantName(e.target.value)} />
          <label className="block text-sm">
            <span className="text-slate-700">Date of birth</span>
            <input type="date" className="mt-1 w-full rounded border px-2 py-1" value={participantDob} onChange={(e) => setParticipantDob(e.target.value)} />
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isMinor} onChange={(e) => setIsMinor(e.target.checked)} />
            <span>Participant is under 18 (minor)</span>
          </label>
          {isMinor && (
            <div className="space-y-2 rounded border border-dashed border-slate-300 p-2">
              <input className="w-full rounded border px-2 py-1 text-sm" placeholder="Parent / Guardian name" value={guardianName} onChange={(e) => setGuardianName(e.target.value)} />
              <input className="w-full rounded border px-2 py-1 text-sm" placeholder="Relationship" value={guardianRelationship} onChange={(e) => setGuardianRelationship(e.target.value)} />
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <h3 className="font-semibold text-slate-900">Risks &amp; medical</h3>
          <textarea rows={4} className="w-full rounded border px-2 py-1 text-sm" placeholder="Specific known risks" value={knownRisks} onChange={(e) => setKnownRisks(e.target.value)} />
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={insuranceConfirmed} onChange={(e) => setInsuranceConfirmed(e.target.checked)} />
            <span>I confirm I have medical insurance</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input className="rounded border px-2 py-1 text-sm" placeholder="Emergency name" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} />
            <input className="rounded border px-2 py-1 text-sm" placeholder="Relationship" value={emergencyRelationship} onChange={(e) => setEmergencyRelationship(e.target.value)} />
            <input className="rounded border px-2 py-1 text-sm" placeholder="Phone" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} />
          </div>
          <textarea rows={2} className="w-full rounded border px-2 py-1 text-sm" placeholder="Medical conditions / allergies (optional)" value={medicalConditions} onChange={(e) => setMedicalConditions(e.target.value)} />
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <h3 className="font-semibold text-slate-900">Additional</h3>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={photoRelease} onChange={(e) => setPhotoRelease(e.target.checked)} />
            <span>I also consent to photos / video during the activity</span>
          </label>
          <label className="block text-sm">
            <span className="text-slate-700">Governing law (state)</span>
            <select className="mt-1 w-full rounded border px-2 py-1" value={governingLaw} onChange={(e) => setGoverningLaw(e.target.value)}>
              {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
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

          <h1 className="text-center text-2xl font-bold tracking-widest">WAIVER AND RELEASE OF LIABILITY</h1>
          <p className="text-center text-sm text-slate-600 mb-6">Read carefully before signing &mdash; this document affects your legal rights.</p>

          <dl className="mb-4 grid grid-cols-2 gap-y-1 text-sm">
            <dt className="font-semibold">Activity:</dt><dd>{activityName}</dd>
            <dt className="font-semibold">Organizer:</dt><dd>{organizerName}, {organizerAddress}</dd>
            <dt className="font-semibold">Event date(s):</dt><dd>{eventDateText}</dd>
            <dt className="font-semibold">Participant:</dt><dd>{participantName} (DOB {participantDob})</dd>
            {isMinor && (<><dt className="font-semibold">Parent / Guardian:</dt><dd>{guardianName} ({guardianRelationship})</dd></>)}
          </dl>

          <p className="mb-4 text-sm">
            <span className="font-semibold">Description of activity.</span> {activityDescription}
          </p>

          <h2 className="mt-5 text-sm font-bold uppercase tracking-wider">1. Assumption of Risk</h2>
          <p className="mt-1 text-sm">
            <span className="font-bold">I UNDERSTAND AND ACKNOWLEDGE</span> that the activity described above (the &ldquo;Activity&rdquo;) involves inherent and substantial risks that cannot be eliminated, including without limitation:
          </p>
          <p className="mt-1 text-sm italic">{knownRisks}</p>
          <p className="mt-1 text-sm">
            I voluntarily assume full responsibility for any and all such risks, known and unknown, and for any loss, damage, or injury (including death) I may sustain as a result of participating.
          </p>

          <h2 className="mt-5 text-sm font-bold uppercase tracking-wider">2. Waiver and Release of Claims</h2>
          <p className="mt-1 text-sm">
            In consideration of being permitted to participate, I, on behalf of myself, my heirs, personal representatives, and assigns, <span className="font-bold">HEREBY RELEASE, WAIVE, DISCHARGE, AND COVENANT NOT TO SUE</span> {organizerName}, its owners, officers, directors, employees, agents, volunteers, contractors, and affiliates (collectively, the &ldquo;Released Parties&rdquo;) from any and all liability, claims, demands, actions, or causes of action arising out of or related to any loss, damage, or injury that may be sustained by me in connection with the Activity, whether caused by the negligence of the Released Parties or otherwise. This waiver <span className="font-semibold">does not</span> apply to claims arising from the gross negligence or willful misconduct of the Released Parties.
          </p>

          <h2 className="mt-5 text-sm font-bold uppercase tracking-wider">3. Indemnification</h2>
          <p className="mt-1 text-sm">
            I agree to <span className="font-semibold">indemnify, defend, and hold harmless</span> the Released Parties from any loss, liability, damage, or cost, including reasonable attorneys&rsquo; fees, they may incur arising out of my participation in the Activity, to the fullest extent permitted by the laws of the State of {governingLaw}.
          </p>

          <h2 className="mt-5 text-sm font-bold uppercase tracking-wider">4. Medical Treatment Authorization</h2>
          <p className="mt-1 text-sm">
            I authorize the Released Parties to secure, at my expense, such emergency medical treatment as they deem necessary in the event I am unable to consent. I confirm that I {insuranceConfirmed ? "have" : "do NOT have"} medical insurance covering injuries sustained during the Activity.
          </p>
          <p className="mt-1 text-sm">
            <span className="font-semibold">Emergency contact:</span> {emergencyName} ({emergencyRelationship}) &mdash; {emergencyPhone}
          </p>
          {medicalConditions && (
            <p className="mt-1 text-sm"><span className="font-semibold">Medical conditions / allergies disclosed:</span> {medicalConditions}</p>
          )}

          {photoRelease && (
            <>
              <h2 className="mt-5 text-sm font-bold uppercase tracking-wider">5. Photo / Video Release</h2>
              <p className="mt-1 text-sm">
                I consent to the use of my name, likeness, photograph, and video recording taken during the Activity for promotional, editorial, educational, and marketing purposes, without compensation and without further notice.
              </p>
            </>
          )}

          {isMinor && (
            <>
              <h2 className="mt-5 text-sm font-bold uppercase tracking-wider">{photoRelease ? "6" : "5"}. Parent / Guardian Consent</h2>
              <p className="mt-1 text-sm">
                I, <span className="font-semibold">{guardianName}</span>, certify that I am the {guardianRelationship.toLowerCase()} and legal guardian of the minor participant named above. I have read and understand this waiver, consent to the minor&rsquo;s participation in the Activity, and agree to be bound by its terms on behalf of the minor and myself.
              </p>
            </>
          )}

          <h2 className="mt-5 text-sm font-bold uppercase tracking-wider">Governing Law &amp; Severability</h2>
          <p className="mt-1 text-sm">
            This waiver shall be governed by the laws of the State of {governingLaw}. If any provision is held unenforceable, the remainder shall remain in full force and effect.
          </p>

          <p className="mt-5 text-sm font-bold">
            I HAVE READ THIS WAIVER, UNDERSTAND THAT IT IS A RELEASE OF LIABILITY, AND SIGN IT VOLUNTARILY.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="border-b border-slate-800 pb-1 font-semibold">{participantName}</div>
              <div className="text-xs text-slate-600">Participant printed name &amp; signature</div>
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
              <div className="text-xs text-slate-600">Witness (optional)</div>
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
