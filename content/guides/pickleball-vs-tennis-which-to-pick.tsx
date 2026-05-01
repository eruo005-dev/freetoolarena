import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Pickleball passed tennis in US weekly participation in 2025. If you&rsquo;re picking between them as your new
    racket sport, the answer mostly comes down to age, joint health, social fit, and how serious you want to get.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Pickleball wins on</h2>
    <ul>
      <li><strong>Learning curve:</strong> playable in 30 min, fun in a week.</li>
      <li><strong>Court availability:</strong> 4 pickleball courts fit on 1 tennis court &mdash; supply is exploding.</li>
      <li><strong>Joint impact:</strong> smaller court, less running. Easier on knees and hips.</li>
      <li><strong>Social density:</strong> doubles is the default; meet 3 people every game.</li>
      <li><strong>Cost:</strong> a $50 paddle gets you started. Tennis racquets are $150+.</li>
    </ul>
    <h2>Tennis wins on</h2>
    <ul>
      <li><strong>Aerobic ceiling:</strong> you can play tennis for 2 hours and never stop moving.</li>
      <li><strong>Skill depth:</strong> 30 years of mastery still leaves room.</li>
      <li><strong>Watching the pros:</strong> the WTA / ATP product is more spectator-friendly.</li>
      <li><strong>Solo training:</strong> wall practice + ball machine work is more effective than in pickleball.</li>
    </ul>
    <h2>Pick by age + intent</h2>
    <ul>
      <li><strong>Under 35, athletic:</strong> tennis if you have access; pickleball as a fun add.</li>
      <li><strong>35-55, recreational:</strong> pickleball &mdash; faster ROI, social network forms quickly.</li>
      <li><strong>55+:</strong> pickleball clearly &mdash; lower injury risk + huge senior community.</li>
      <li><strong>Already in pickleball:</strong> a tennis crossover is easier than the reverse.</li>
    </ul>
    <p>
      Estimate your level with the <a href="/tools/pickleball-rating-calculator">pickleball rating calculator</a>.
    </p>
  </>
);
