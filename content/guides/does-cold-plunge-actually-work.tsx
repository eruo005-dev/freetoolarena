import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Cold plunges blew up via Andrew Huberman, Wim Hof, and the recovery culture &mdash; but the actual evidence
    is more mixed than the influencer message. Here&rsquo;s the honest 2026 picture.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What the research actually says</h2>
    <ul>
      <li><strong>Mood + alertness:</strong> consistent, robust. Norepinephrine + dopamine surge; effect lasts hours.</li>
      <li><strong>Recovery from soreness:</strong> real, modest. Helpful for endurance recovery; may BLUNT muscle protein synthesis if done within 4 hours of strength training.</li>
      <li><strong>Brown fat / metabolism:</strong> small effect (~few hundred extra cal/week). Marketed bigger than it is.</li>
      <li><strong>Immunity boost:</strong> weak evidence, often overstated.</li>
      <li><strong>Mental discipline / cold tolerance:</strong> definitely improves with practice; transfers to non-cold contexts (anecdotal but plausible).</li>
    </ul>
    <h2>If you do it</h2>
    <ul>
      <li>50-60°F for 60-180 sec is the well-studied range.</li>
      <li>2-3 sessions/week is the sweet spot. More isn&rsquo;t better.</li>
      <li>Strength athletes: NEVER within 4 hours of lifting; rest days only.</li>
      <li>Skip if you have heart conditions, are pregnant, or are intoxicated.</li>
    </ul>
    <h2>What probably matters more</h2>
    <p>
      Sleep, protein intake, zone 2 cardio, strength training. Cold plunges are the cherry, not the cake. Don&rsquo;t
      replace fundamentals with cold exposure.
    </p>
    <p>
      Build a personalized protocol with the <a href="/tools/cold-plunge-protocol-builder">cold plunge protocol builder</a>.
    </p>
  </>
);
