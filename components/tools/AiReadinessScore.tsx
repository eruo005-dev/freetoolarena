"use client";

import { useMemo, useState } from "react";

interface Q { id: string; q: string; weight: number }

const QUESTIONS: Q[] = [
  { id: "use_cases", q: "We've identified 2-3 specific use cases where AI would help, not just 'AI in general'.", weight: 12 },
  { id: "data", q: "We have clean, accessible internal data the AI would need to be useful.", weight: 10 },
  { id: "champion", q: "There's at least one person on our team who actually wants to drive AI adoption.", weight: 10 },
  { id: "budget", q: "We have a defined monthly budget for AI tools (even just $20-200/seat).", weight: 8 },
  { id: "policy", q: "We have a written AI usage policy or have agreed on basic norms (data, citation, IP).", weight: 8 },
  { id: "privacy", q: "We've thought about which data should never be sent to third-party AIs.", weight: 10 },
  { id: "training", q: "We can spend ~30 min/person training the team on the chosen tool.", weight: 6 },
  { id: "evaluate", q: "We know how we'll measure whether AI is actually saving time.", weight: 8 },
  { id: "buy_in", q: "Leadership is supportive (not just neutral) on AI adoption.", weight: 8 },
  { id: "iterate", q: "We're prepared to switch tools or models if our first pick doesn't work.", weight: 6 },
  { id: "compliance", q: "If we're in a regulated industry, we've talked to legal/compliance about AI use.", weight: 8 },
  { id: "infra", q: "Our IT can deploy a new SaaS tool company-wide without it taking 3 months.", weight: 6 },
];

export function AiReadinessScore() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const total = useMemo(() => {
    return QUESTIONS.reduce((s, q) => s + (answers[q.id] ? q.weight : 0), 0);
  }, [answers]);

  const max = QUESTIONS.reduce((s, q) => s + q.weight, 0);
  const pct = (total / max) * 100;

  const verdict =
    pct >= 80 ? { label: "Ready — start picking tools", color: "border-emerald-300 bg-emerald-50 text-emerald-900", advice: "You're past the prep stage. Pick one tool, pilot with 5 people for 2 weeks, roll out from there." } :
    pct >= 60 ? { label: "Mostly ready — close the gaps", color: "border-amber-300 bg-amber-50 text-amber-900", advice: "Look at what you didn't check. The gaps tend to be policy, evaluation, or compliance — all fixable in a week." } :
    pct >= 40 ? { label: "Premature — do prep work first", color: "border-amber-300 bg-amber-50 text-amber-900", advice: "Going to AI before you've defined use cases or budget tends to produce a $20k/year unused subscription. Start with the use-case workshop." } :
    { label: "Far from ready", color: "border-rose-300 bg-rose-50 text-rose-900", advice: "Don't roll out AI yet. Start with the use case + champion conversations. Skipping the prep is how teams burn out on AI in 90 days." };

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-3 text-sm font-semibold text-slate-700">Answer each honestly (check if true)</h4>
        <ul className="space-y-2">
          {QUESTIONS.map((q) => (
            <li key={q.id}>
              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={Boolean(answers[q.id])}
                  onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.checked }))}
                  className="mt-1"
                />
                <span>{q.q} <span className="text-xs text-slate-400">(+{q.weight})</span></span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className={`rounded-lg border p-4 ${verdict.color}`}>
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-xs uppercase tracking-wide opacity-70">Readiness score</div>
            <div className="text-3xl font-bold">{total} / {max}</div>
          </div>
          <div className="text-sm font-semibold">{verdict.label}</div>
        </div>
        <p className="mt-3 text-sm">{verdict.advice}</p>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Where most teams fail:</strong> rolling out AI before defining use cases or assigning a champion. The
        $25/seat subscription bill becomes the most-noticed line item with no measurable output. The fix is the prep work
        scored above — boring but predictive.
      </div>
    </div>
  );
}
