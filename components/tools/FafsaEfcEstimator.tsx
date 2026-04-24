"use client";

import { useMemo, useState } from "react";

type Dependency = "dependent" | "independent";

export function FafsaEfcEstimator() {
  const [parentAgi, setParentAgi] = useState(85000);
  const [household, setHousehold] = useState(4);
  const [studentsInCollege, setStudentsInCollege] = useState(1);
  const [parentAssets, setParentAssets] = useState(20000);
  const [studentIncome, setStudentIncome] = useState(6000);
  const [studentAssets, setStudentAssets] = useState(2000);
  const [dependency, setDependency] = useState<Dependency>("dependent");
  const [cost, setCost] = useState(35000);

  const result = useMemo(() => {
    const vals = [parentAgi, household, studentsInCollege, parentAssets, studentIncome, studentAssets, cost];
    if (!vals.every((v) => Number.isFinite(v) && v >= 0)) return null;

    const incomeThreshold = 30000;
    const parentIncomeRate = parentAgi < 60000 ? 0.22 : parentAgi < 120000 ? 0.35 : 0.47;
    const parentIncomeContribution = Math.max(0, (parentAgi - incomeThreshold) * parentIncomeRate);
    const parentAssetContribution = parentAssets * 0.05;

    const studentIncomeThreshold = 7040;
    const studentIncomeContribution = Math.max(0, studentIncome - studentIncomeThreshold) * 0.5;
    const studentAssetContribution = studentAssets * 0.2;

    let efc = 0;
    if (dependency === "dependent") {
      const parentTotal = parentIncomeContribution + parentAssetContribution;
      const perStudent = studentsInCollege > 0 ? parentTotal / studentsInCollege : parentTotal;
      efc = perStudent + studentIncomeContribution + studentAssetContribution;
    } else {
      efc = studentIncomeContribution * 1.5 + studentAssetContribution;
    }
    efc = Math.max(0, Math.round(efc));
    const expectedAid = Math.max(0, cost - efc);
    return { efc, expectedAid };
  }, [parentAgi, household, studentsInCollege, parentAssets, studentIncome, studentAssets, dependency, cost]);

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white p-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Dependency status</label>
          <select
            value={dependency}
            onChange={(e) => setDependency(e.target.value as Dependency)}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          >
            <option value="dependent">Dependent student</option>
            <option value="independent">Independent student</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Cost of attendance ($/yr)</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Parent AGI ($)</label>
          <input
            type="number"
            value={parentAgi}
            onChange={(e) => setParentAgi(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Household size</label>
          <input
            type="number"
            min={1}
            value={household}
            onChange={(e) => setHousehold(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Students in college</label>
          <input
            type="number"
            min={1}
            value={studentsInCollege}
            onChange={(e) => setStudentsInCollege(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Parent assets ($, excl. home/retirement)</label>
          <input
            type="number"
            value={parentAssets}
            onChange={(e) => setParentAssets(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Student income ($/yr)</label>
          <input
            type="number"
            value={studentIncome}
            onChange={(e) => setStudentIncome(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Student assets ($)</label>
          <input
            type="number"
            value={studentAssets}
            onChange={(e) => setStudentAssets(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          />
        </div>
      </div>

      {result && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Estimated EFC / SAI</p>
              <p className="text-3xl font-bold text-brand">${result.efc.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Expected aid eligibility</p>
              <p className="text-3xl font-bold text-brand">${result.expectedAid.toLocaleString()}</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 pt-3 border-t border-slate-200">
            Note&nbsp;&mdash;&nbsp;2024 replaced EFC with SAI (Student Aid Index); the inputs are similar but some
            thresholds differ. This is a simplified estimate. Use the official FAFSA estimator at studentaid.gov for
            accurate numbers.
          </p>
        </div>
      )}
    </div>
  );
}
