import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Finnish sauna research is one of the few longevity practices with hard mortality data behind it. Here&rsquo;s
    what 2026 evidence supports, what doesn&rsquo;t, and a practical protocol.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The headline finding</h2>
    <p>
      The KIHD study (2,300+ middle-aged Finnish men, 20-yr follow-up) found a 40% reduction in all-cause mortality
      for 4-7 sessions/week vs 1 session, with sessions of 19+ min at 175°F+. Effect held after controlling for
      smoking, BMI, age, alcohol, exercise.
    </p>
    <h2>Beyond the headline</h2>
    <ul>
      <li><strong>Cardio benefit:</strong> sauna mimics moderate-intensity exercise on heart rate and stroke volume.</li>
      <li><strong>Endothelial function:</strong> regular sauna improves blood vessel reactivity comparable to aerobic training.</li>
      <li><strong>BP reduction:</strong> 4-7 sessions/week associated with 32% lower BP over years.</li>
      <li><strong>Sleep:</strong> sauna 90-120 min before bed accelerates sleep onset.</li>
    </ul>
    <h2>Practical</h2>
    <ul>
      <li>Hydrate before; replace electrolytes after.</li>
      <li>Step out at first dizziness or nausea.</li>
      <li>Skip with heart conditions, pregnancy, blood-pressure meds (talk to doctor).</li>
      <li>Cold contrast (60-90 sec) between rounds amplifies the cardiovascular signal.</li>
    </ul>
    <p>
      Build a session protocol with the <a href="/tools/sauna-protocol-calculator">sauna protocol calculator</a>.
    </p>
  </>
);
