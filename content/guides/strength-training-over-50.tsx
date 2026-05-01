import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Strength training after 50 isn&rsquo;t optional &mdash; it&rsquo;s the closest thing to a longevity drug that
    actually works. Sarcopenia, osteopenia, fall risk, and metabolic decline all bend toward better with two
    sessions/week. Here&rsquo;s the right way to start (or restart).
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Why it matters more after 50</h2>
    <p>
      Muscle mass declines ~1% per year after 30 without resistance training. By 70 the average person has lost
      30%. The downstream effects (falls, balance, blood sugar regulation, bone density) compound. Two strength
      sessions/week reverse most of this in 12 weeks.
    </p>
    <h2>The right starting structure</h2>
    <ul>
      <li><strong>2 full-body sessions/week.</strong> 3-4 lifts per session, 2-3 sets of 5-10 reps.</li>
      <li><strong>Compound first:</strong> squat, hinge (deadlift / hip-thrust), push (bench / overhead), pull (row / pulldown).</li>
      <li><strong>Form before load:</strong> hire a trainer for 4-6 sessions to dial form. Cheaper than an injury.</li>
      <li><strong>Progress weight ~2.5-5 lbs/wk</strong> on the big lifts in the first 8 weeks. Then slow it.</li>
    </ul>
    <h2>What to skip early</h2>
    <ul>
      <li>Heavy bilateral barbell work before form is solid.</li>
      <li>Aggressive HIIT / CrossFit-style intensity. Save it for month 4+.</li>
      <li>Cardio-first programs that crowd out strength.</li>
    </ul>
    <h2>Recovery</h2>
    <ul>
      <li>Protein 0.8-1.0 g per lb of body weight daily.</li>
      <li>7-9 hours of sleep is non-negotiable.</li>
      <li>48 hours minimum between sessions hitting the same muscle group.</li>
    </ul>
    <p>
      Pair with cardio: <a href="/tools/zone-2-heart-rate-calculator">zone 2 heart rate calculator</a> and{" "}
      <a href="/tools/vo2-max-estimator">VO2 max estimator</a> for the aerobic side.
    </p>
  </>
);
