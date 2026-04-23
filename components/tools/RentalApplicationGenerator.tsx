"use client";

import { useMemo, useState } from "react";

export function RentalApplicationGenerator() {
  const [fullName, setFullName] = useState("Jordan A. Martinez");
  const [dob, setDob] = useState("1993-06-14");
  const [ssnLast4, setSsnLast4] = useState("4821");
  const [email, setEmail] = useState("jordan.martinez@example.com");
  const [phone, setPhone] = useState("(555) 214-7788");
  const [currentAddress, setCurrentAddress] = useState("128 Maplewood Ave, Apt 3B, Portland, OR 97204");
  const [moveInDate, setMoveInDate] = useState("2026-06-01");

  const [currentLandlord, setCurrentLandlord] = useState("Riverbend Property Management");
  const [currentLandlordPhone, setCurrentLandlordPhone] = useState("(555) 339-2210");
  const [currentRent, setCurrentRent] = useState("1850");
  const [reasonForLeaving, setReasonForLeaving] = useState("Relocating closer to new job");
  const [lengthOfResidence, setLengthOfResidence] = useState("3 years, 2 months");

  const [hasPrevious, setHasPrevious] = useState(true);
  const [previousAddress, setPreviousAddress] = useState("42 Birch Street, Eugene, OR 97401");

  const [employer, setEmployer] = useState("Northwest Tech Solutions, LLC");
  const [position, setPosition] = useState("Senior UX Designer");
  const [employmentStart, setEmploymentStart] = useState("2022-09-12");
  const [supervisor, setSupervisor] = useState("Priya Chen");
  const [workPhone, setWorkPhone] = useState("(555) 881-4040");
  const [monthlyIncome, setMonthlyIncome] = useState("7200");
  const [otherIncome, setOtherIncome] = useState("Freelance design &mdash; approx. $800/mo");

  const [ref1Name, setRef1Name] = useState("Dr. Samuel Okafor");
  const [ref1Rel, setRef1Rel] = useState("Former colleague, 6 years");
  const [ref1Phone, setRef1Phone] = useState("(555) 410-6631");
  const [ref2Name, setRef2Name] = useState("Elena Vasquez");
  const [ref2Rel, setRef2Rel] = useState("Personal friend, 10 years");
  const [ref2Phone, setRef2Phone] = useState("(555) 772-1908");

  const [emergencyName, setEmergencyName] = useState("Maria Martinez (mother)");
  const [emergencyPhone, setEmergencyPhone] = useState("(555) 223-9007");

  const [hasPets, setHasPets] = useState(true);
  const [petType, setPetType] = useState("Dog");
  const [petBreed, setPetBreed] = useState("Goldendoodle");
  const [petWeight, setPetWeight] = useState("45 lbs");

  const [vehicleYear, setVehicleYear] = useState("2019");
  const [vehicleMake, setVehicleMake] = useState("Toyota");
  const [vehicleModel, setVehicleModel] = useState("RAV4");
  const [vehiclePlate, setVehiclePlate] = useState("OR 7XY-442");

  const [smoker, setSmoker] = useState(false);

  const [felonyConviction, setFelonyConviction] = useState(false);
  const [felonyExplanation, setFelonyExplanation] = useState("");
  const [priorEviction, setPriorEviction] = useState(false);
  const [evictionExplanation, setEvictionExplanation] = useState("");

  const [coApplicants, setCoApplicants] = useState("Alex Martinez (spouse), DOB 1994-02-09");

  const [signatureName, setSignatureName] = useState("Jordan A. Martinez");
  const [signatureDate, setSignatureDate] = useState("2026-04-23");

  const plainText = useMemo(() => {
    return [
      "RENTAL APPLICATION",
      "",
      "APPLICANT INFORMATION",
      `Full Legal Name: ${fullName}`,
      `Date of Birth: ${dob}`,
      `SSN (last 4): ${ssnLast4 || "not provided"}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Current Address: ${currentAddress}`,
      `Requested Move-in Date: ${moveInDate}`,
      "",
      "RESIDENCE HISTORY",
      `Current Landlord: ${currentLandlord}`,
      `Landlord Phone: ${currentLandlordPhone}`,
      `Current Rent: $${currentRent}`,
      `Length of Residence: ${lengthOfResidence}`,
      `Reason for Leaving: ${reasonForLeaving}`,
      hasPrevious ? `Previous Address: ${previousAddress}` : "",
      "",
      "EMPLOYMENT",
      `Employer: ${employer}`,
      `Position: ${position}`,
      `Start Date: ${employmentStart}`,
      `Supervisor: ${supervisor}`,
      `Work Phone: ${workPhone}`,
      `Monthly Income: $${monthlyIncome}`,
      otherIncome ? `Other Income: ${otherIncome}` : "",
      "",
      "REFERENCES",
      `1) ${ref1Name} | ${ref1Rel} | ${ref1Phone}`,
      `2) ${ref2Name} | ${ref2Rel} | ${ref2Phone}`,
      "",
      "EMERGENCY CONTACT",
      `${emergencyName} | ${emergencyPhone}`,
      "",
      "PETS",
      hasPets ? `${petType} / ${petBreed} / ${petWeight}` : "No pets",
      "",
      "VEHICLES",
      `${vehicleYear} ${vehicleMake} ${vehicleModel} | Plate: ${vehiclePlate}`,
      "",
      `Smoker: ${smoker ? "Yes" : "No"}`,
      "",
      "DISCLOSURES",
      `Felony conviction in past 7 years: ${felonyConviction ? "Yes" : "No"}`,
      felonyConviction && felonyExplanation ? `Explanation: ${felonyExplanation}` : "",
      `Prior eviction: ${priorEviction ? "Yes" : "No"}`,
      priorEviction && evictionExplanation ? `Explanation: ${evictionExplanation}` : "",
      "",
      "CO-APPLICANTS / OCCUPANTS",
      coApplicants,
      "",
      "AUTHORIZATION",
      "I certify that the information above is true and complete. I authorize the landlord to verify this information, including credit, criminal background, employment, and prior rental history. I understand that submitting false information is grounds for immediate denial.",
      "",
      `Signature: ${signatureName}`,
      `Date: ${signatureDate}`,
    ]
      .filter(Boolean)
      .join("\n");
  }, [
    fullName,
    dob,
    ssnLast4,
    email,
    phone,
    currentAddress,
    moveInDate,
    currentLandlord,
    currentLandlordPhone,
    currentRent,
    lengthOfResidence,
    reasonForLeaving,
    hasPrevious,
    previousAddress,
    employer,
    position,
    employmentStart,
    supervisor,
    workPhone,
    monthlyIncome,
    otherIncome,
    ref1Name,
    ref1Rel,
    ref1Phone,
    ref2Name,
    ref2Rel,
    ref2Phone,
    emergencyName,
    emergencyPhone,
    hasPets,
    petType,
    petBreed,
    petWeight,
    vehicleYear,
    vehicleMake,
    vehicleModel,
    vehiclePlate,
    smoker,
    felonyConviction,
    felonyExplanation,
    priorEviction,
    evictionExplanation,
    coApplicants,
    signatureName,
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
          <h3 className="font-semibold text-slate-900">Applicant</h3>
          <label className="block text-sm">
            <span className="text-slate-700">Full legal name</span>
            <input className="mt-1 w-full rounded border px-2 py-1" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="block text-sm">
              <span className="text-slate-700">Date of birth</span>
              <input type="date" className="mt-1 w-full rounded border px-2 py-1" value={dob} onChange={(e) => setDob(e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="text-slate-700">SSN (last 4, optional)</span>
              <input className="mt-1 w-full rounded border px-2 py-1" value={ssnLast4} onChange={(e) => setSsnLast4(e.target.value)} placeholder="####" />
            </label>
          </div>
          <p className="text-xs text-slate-500">Some landlords require the last 4 of your SSN for credit checks. Leave blank if uncomfortable &mdash; ask the landlord.</p>
          <div className="grid grid-cols-2 gap-2">
            <label className="block text-sm">
              <span className="text-slate-700">Email</span>
              <input className="mt-1 w-full rounded border px-2 py-1" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="text-slate-700">Phone</span>
              <input className="mt-1 w-full rounded border px-2 py-1" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
          </div>
          <label className="block text-sm">
            <span className="text-slate-700">Current address</span>
            <input className="mt-1 w-full rounded border px-2 py-1" value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="text-slate-700">Requested move-in date</span>
            <input type="date" className="mt-1 w-full rounded border px-2 py-1" value={moveInDate} onChange={(e) => setMoveInDate(e.target.value)} />
          </label>
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <h3 className="font-semibold text-slate-900">Residence history</h3>
          <div className="grid grid-cols-2 gap-2">
            <label className="block text-sm">
              <span className="text-slate-700">Current landlord</span>
              <input className="mt-1 w-full rounded border px-2 py-1" value={currentLandlord} onChange={(e) => setCurrentLandlord(e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="text-slate-700">Landlord phone</span>
              <input className="mt-1 w-full rounded border px-2 py-1" value={currentLandlordPhone} onChange={(e) => setCurrentLandlordPhone(e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="text-slate-700">Current monthly rent ($)</span>
              <input className="mt-1 w-full rounded border px-2 py-1" value={currentRent} onChange={(e) => setCurrentRent(e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="text-slate-700">Length of residence</span>
              <input className="mt-1 w-full rounded border px-2 py-1" value={lengthOfResidence} onChange={(e) => setLengthOfResidence(e.target.value)} />
            </label>
          </div>
          <label className="block text-sm">
            <span className="text-slate-700">Reason for leaving</span>
            <input className="mt-1 w-full rounded border px-2 py-1" value={reasonForLeaving} onChange={(e) => setReasonForLeaving(e.target.value)} />
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={hasPrevious} onChange={(e) => setHasPrevious(e.target.checked)} />
            <span>Less than 2 years at current address (provide previous)</span>
          </label>
          {hasPrevious && (
            <label className="block text-sm">
              <span className="text-slate-700">Previous address</span>
              <input className="mt-1 w-full rounded border px-2 py-1" value={previousAddress} onChange={(e) => setPreviousAddress(e.target.value)} />
            </label>
          )}
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <h3 className="font-semibold text-slate-900">Employment</h3>
          <div className="grid grid-cols-2 gap-2">
            <label className="block text-sm">
              <span className="text-slate-700">Employer</span>
              <input className="mt-1 w-full rounded border px-2 py-1" value={employer} onChange={(e) => setEmployer(e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="text-slate-700">Position</span>
              <input className="mt-1 w-full rounded border px-2 py-1" value={position} onChange={(e) => setPosition(e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="text-slate-700">Start date</span>
              <input type="date" className="mt-1 w-full rounded border px-2 py-1" value={employmentStart} onChange={(e) => setEmploymentStart(e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="text-slate-700">Supervisor</span>
              <input className="mt-1 w-full rounded border px-2 py-1" value={supervisor} onChange={(e) => setSupervisor(e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="text-slate-700">Work phone</span>
              <input className="mt-1 w-full rounded border px-2 py-1" value={workPhone} onChange={(e) => setWorkPhone(e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="text-slate-700">Monthly income ($)</span>
              <input className="mt-1 w-full rounded border px-2 py-1" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} />
            </label>
          </div>
          <label className="block text-sm">
            <span className="text-slate-700">Other income source (optional)</span>
            <input className="mt-1 w-full rounded border px-2 py-1" value={otherIncome} onChange={(e) => setOtherIncome(e.target.value)} />
          </label>
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <h3 className="font-semibold text-slate-900">References</h3>
          <div className="grid grid-cols-3 gap-2">
            <input className="rounded border px-2 py-1 text-sm" placeholder="Name" value={ref1Name} onChange={(e) => setRef1Name(e.target.value)} />
            <input className="rounded border px-2 py-1 text-sm" placeholder="Relationship" value={ref1Rel} onChange={(e) => setRef1Rel(e.target.value)} />
            <input className="rounded border px-2 py-1 text-sm" placeholder="Phone" value={ref1Phone} onChange={(e) => setRef1Phone(e.target.value)} />
            <input className="rounded border px-2 py-1 text-sm" placeholder="Name" value={ref2Name} onChange={(e) => setRef2Name(e.target.value)} />
            <input className="rounded border px-2 py-1 text-sm" placeholder="Relationship" value={ref2Rel} onChange={(e) => setRef2Rel(e.target.value)} />
            <input className="rounded border px-2 py-1 text-sm" placeholder="Phone" value={ref2Phone} onChange={(e) => setRef2Phone(e.target.value)} />
          </div>
          <h3 className="font-semibold text-slate-900 pt-2">Emergency contact</h3>
          <div className="grid grid-cols-2 gap-2">
            <input className="rounded border px-2 py-1 text-sm" placeholder="Name" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} />
            <input className="rounded border px-2 py-1 text-sm" placeholder="Phone" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} />
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <h3 className="font-semibold text-slate-900">Pets &amp; vehicles</h3>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={hasPets} onChange={(e) => setHasPets(e.target.checked)} />
            <span>I have pets</span>
          </label>
          {hasPets && (
            <div className="grid grid-cols-3 gap-2">
              <input className="rounded border px-2 py-1 text-sm" placeholder="Type" value={petType} onChange={(e) => setPetType(e.target.value)} />
              <input className="rounded border px-2 py-1 text-sm" placeholder="Breed" value={petBreed} onChange={(e) => setPetBreed(e.target.value)} />
              <input className="rounded border px-2 py-1 text-sm" placeholder="Weight" value={petWeight} onChange={(e) => setPetWeight(e.target.value)} />
            </div>
          )}
          <div className="grid grid-cols-4 gap-2 pt-2">
            <input className="rounded border px-2 py-1 text-sm" placeholder="Year" value={vehicleYear} onChange={(e) => setVehicleYear(e.target.value)} />
            <input className="rounded border px-2 py-1 text-sm" placeholder="Make" value={vehicleMake} onChange={(e) => setVehicleMake(e.target.value)} />
            <input className="rounded border px-2 py-1 text-sm" placeholder="Model" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} />
            <input className="rounded border px-2 py-1 text-sm" placeholder="Plate" value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} />
          </div>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={smoker} onChange={(e) => setSmoker(e.target.checked)} />
            <span>I smoke / vape</span>
          </label>
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <h3 className="font-semibold text-slate-900">Disclosures</h3>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={felonyConviction} onChange={(e) => setFelonyConviction(e.target.checked)} />
            <span>I have been convicted of a felony in the past 7 years</span>
          </label>
          {felonyConviction && (
            <textarea rows={2} className="w-full rounded border px-2 py-1 text-sm" placeholder="Explanation" value={felonyExplanation} onChange={(e) => setFelonyExplanation(e.target.value)} />
          )}
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={priorEviction} onChange={(e) => setPriorEviction(e.target.checked)} />
            <span>I have been evicted in the past</span>
          </label>
          {priorEviction && (
            <textarea rows={2} className="w-full rounded border px-2 py-1 text-sm" placeholder="Explanation" value={evictionExplanation} onChange={(e) => setEvictionExplanation(e.target.value)} />
          )}
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <h3 className="font-semibold text-slate-900">Co-applicants / occupants</h3>
          <textarea rows={2} className="w-full rounded border px-2 py-1 text-sm" value={coApplicants} onChange={(e) => setCoApplicants(e.target.value)} />
          <h3 className="font-semibold text-slate-900 pt-2">Signature</h3>
          <div className="grid grid-cols-2 gap-2">
            <input className="rounded border px-2 py-1 text-sm" placeholder="Signature (typed)" value={signatureName} onChange={(e) => setSignatureName(e.target.value)} />
            <input type="date" className="rounded border px-2 py-1 text-sm" value={signatureDate} onChange={(e) => setSignatureDate(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Print / Save as PDF
          </button>
          <button
            type="button"
            onClick={copyPlainText}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            Copy as text
          </button>
        </div>
      </div>

      {/* PREVIEW */}
      <div className="print:col-span-2">
        <div className="rounded-lg border bg-white p-8 shadow-sm" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          <div className="mb-6 rounded-lg border-2 border-amber-400 bg-amber-50 p-4 text-sm text-amber-900 print:border-amber-700">
            <strong>Landlord notice:</strong> Fair-housing laws restrict what landlords may legally ask. Do not inquire about race, religion, national origin, familial status, disability, or (in many states) source of income. Have this form reviewed by counsel before use.
          </div>

          <h1 className="text-center text-2xl font-bold tracking-wide">RENTAL APPLICATION</h1>
          <p className="text-center text-sm text-slate-600 mb-6">Please complete all sections. Incomplete applications may be delayed.</p>

          <section className="mb-5">
            <h2 className="border-b border-slate-400 pb-1 text-sm font-bold uppercase tracking-wider text-slate-700">Applicant Information</h2>
            <dl className="mt-2 grid grid-cols-2 gap-y-1 text-sm">
              <dt className="font-semibold">Full legal name:</dt><dd>{fullName}</dd>
              <dt className="font-semibold">Date of birth:</dt><dd>{dob}</dd>
              <dt className="font-semibold">SSN (last 4):</dt><dd>{ssnLast4 ? `xxx-xx-${ssnLast4}` : "(not provided)"}</dd>
              <dt className="font-semibold">Email:</dt><dd>{email}</dd>
              <dt className="font-semibold">Phone:</dt><dd>{phone}</dd>
              <dt className="font-semibold">Current address:</dt><dd>{currentAddress}</dd>
              <dt className="font-semibold">Requested move-in:</dt><dd>{moveInDate}</dd>
            </dl>
          </section>

          <section className="mb-5">
            <h2 className="border-b border-slate-400 pb-1 text-sm font-bold uppercase tracking-wider text-slate-700">Residence History</h2>
            <dl className="mt-2 grid grid-cols-2 gap-y-1 text-sm">
              <dt className="font-semibold">Current landlord:</dt><dd>{currentLandlord}</dd>
              <dt className="font-semibold">Landlord phone:</dt><dd>{currentLandlordPhone}</dd>
              <dt className="font-semibold">Monthly rent:</dt><dd>${currentRent}</dd>
              <dt className="font-semibold">Length of residence:</dt><dd>{lengthOfResidence}</dd>
              <dt className="font-semibold">Reason for leaving:</dt><dd>{reasonForLeaving}</dd>
              {hasPrevious && (<><dt className="font-semibold">Previous address:</dt><dd>{previousAddress}</dd></>)}
            </dl>
          </section>

          <section className="mb-5">
            <h2 className="border-b border-slate-400 pb-1 text-sm font-bold uppercase tracking-wider text-slate-700">Employment &amp; Income</h2>
            <dl className="mt-2 grid grid-cols-2 gap-y-1 text-sm">
              <dt className="font-semibold">Employer:</dt><dd>{employer}</dd>
              <dt className="font-semibold">Position:</dt><dd>{position}</dd>
              <dt className="font-semibold">Start date:</dt><dd>{employmentStart}</dd>
              <dt className="font-semibold">Supervisor:</dt><dd>{supervisor}</dd>
              <dt className="font-semibold">Work phone:</dt><dd>{workPhone}</dd>
              <dt className="font-semibold">Monthly income:</dt><dd>${monthlyIncome}</dd>
              {otherIncome && (<><dt className="font-semibold">Other income:</dt><dd>{otherIncome}</dd></>)}
            </dl>
          </section>

          <section className="mb-5">
            <h2 className="border-b border-slate-400 pb-1 text-sm font-bold uppercase tracking-wider text-slate-700">References</h2>
            <ol className="mt-2 list-decimal pl-5 text-sm space-y-1">
              <li>{ref1Name} &mdash; {ref1Rel} &mdash; {ref1Phone}</li>
              <li>{ref2Name} &mdash; {ref2Rel} &mdash; {ref2Phone}</li>
            </ol>
            <p className="mt-2 text-sm"><span className="font-semibold">Emergency contact:</span> {emergencyName} &mdash; {emergencyPhone}</p>
          </section>

          <section className="mb-5">
            <h2 className="border-b border-slate-400 pb-1 text-sm font-bold uppercase tracking-wider text-slate-700">Pets, Vehicles &amp; Lifestyle</h2>
            <p className="mt-2 text-sm"><span className="font-semibold">Pets:</span> {hasPets ? `${petType}, ${petBreed}, ${petWeight}` : "None"}</p>
            <p className="text-sm"><span className="font-semibold">Vehicle:</span> {vehicleYear} {vehicleMake} {vehicleModel} (plate {vehiclePlate})</p>
            <p className="text-sm"><span className="font-semibold">Smoker:</span> {smoker ? "Yes" : "No"}</p>
            <p className="text-sm"><span className="font-semibold">Co-applicants / occupants:</span> {coApplicants}</p>
          </section>

          <section className="mb-5">
            <h2 className="border-b border-slate-400 pb-1 text-sm font-bold uppercase tracking-wider text-slate-700">Disclosures</h2>
            <p className="mt-2 text-sm"><span className="font-semibold">Felony conviction in past 7 years:</span> {felonyConviction ? "Yes" : "No"}{felonyConviction && felonyExplanation ? ` &mdash; ${felonyExplanation}` : ""}</p>
            <p className="text-sm"><span className="font-semibold">Prior eviction:</span> {priorEviction ? "Yes" : "No"}{priorEviction && evictionExplanation ? ` &mdash; ${evictionExplanation}` : ""}</p>
          </section>

          <section className="mb-5 rounded border-2 border-slate-400 p-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">Authorization &amp; Signature</h2>
            <p className="mt-2 text-sm">
              I certify under penalty of perjury that the information provided in this application is true, complete, and accurate. I authorize the landlord, their agents, and any screening service to verify the information above, including but not limited to credit reports, criminal background checks, employment and income verification, and prior rental history.
            </p>
            <p className="mt-2 text-sm font-bold">
              Submitting false information is grounds for immediate denial of this application and, if discovered after occupancy, may be grounds for termination of tenancy.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
              <div>
                <div className="border-b border-slate-800 pb-1 font-semibold">{signatureName}</div>
                <div className="text-xs text-slate-600">Applicant signature</div>
              </div>
              <div>
                <div className="border-b border-slate-800 pb-1 font-semibold">{signatureDate}</div>
                <div className="text-xs text-slate-600">Date</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
