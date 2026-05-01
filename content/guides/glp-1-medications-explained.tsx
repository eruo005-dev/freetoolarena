import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    GLP-1 receptor agonists &mdash; Ozempic, Wegovy, Mounjaro, Zepbound, Trulicity &mdash; reshape diabetes care
    and weight loss in 2026. Here&rsquo;s a non-medical, fact-first overview of what they are, how they work, and
    what the cultural conversation often gets wrong. Not medical advice; talk to your doctor.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What they are</h2>
    <p>
      Glucagon-like peptide-1 (GLP-1) is a natural gut hormone released after eating. GLP-1 agonists are synthetic
      versions taken weekly (or daily, in older formulations) that mimic this hormone. They were originally
      developed for type-2 diabetes; the weight-loss effect was a discovered side effect that became the headline.
    </p>

    <h2>The current lineup</h2>
    <ul>
      <li><strong>Semaglutide (Ozempic, Wegovy, Rybelsus)</strong> &mdash; weekly injection (Ozempic / Wegovy) or daily oral (Rybelsus).</li>
      <li><strong>Tirzepatide (Mounjaro, Zepbound)</strong> &mdash; weekly. GLP-1 + GIP dual agonist; modestly more potent.</li>
      <li><strong>Liraglutide (Saxenda, Victoza)</strong> &mdash; daily injection; older.</li>
      <li><strong>Retatrutide</strong> &mdash; triple agonist, late-stage trials in 2026, expected to be even more potent.</li>
    </ul>

    <h2>How weight loss works</h2>
    <p>
      Slowed gastric emptying + reduced appetite signaling. People feel full sooner and stay full longer. Average
      weight loss in trials: ~15% of body weight on semaglutide, ~22% on tirzepatide. Compare to behavioral-only
      programs at 5-7%.
    </p>

    <h2>Trade-offs</h2>
    <ul>
      <li><strong>Side effects:</strong> nausea, constipation, fatigue (early weeks). Most resolve.</li>
      <li><strong>Muscle loss:</strong> ~25-40% of weight lost can be lean mass without strength training. Lift weights.</li>
      <li><strong>Stop = regain:</strong> most people regain 60-80% of weight within a year of stopping. They&rsquo;re generally a long-term medication.</li>
      <li><strong>Cost:</strong> $900-1,500/month US retail; insurance coverage is uneven. Compounded versions cheaper but less reliable.</li>
    </ul>

    <h2>What gets oversimplified</h2>
    <ul>
      <li>It&rsquo;s not a &ldquo;quick fix&rdquo; &mdash; without diet + strength training, results are inferior and easier to lose.</li>
      <li>It&rsquo;s not just for the obese &mdash; doctors prescribe at lower BMIs for cardiometabolic risk in 2026.</li>
      <li>The cultural &ldquo;Ozempic face&rdquo; is real (subcutaneous fat loss) but reversible with hydration + protein + lifting.</li>
    </ul>

    <p>
      For longevity-style fitness practices to layer alongside, see{" "}
      <a href="/tools/zone-2-heart-rate-calculator">zone 2 heart rate calculator</a> and{" "}
      <a href="/tools/vo2-max-estimator">VO2 max estimator</a>. <em>This page is informational, not medical advice.</em>
    </p>
  </>
);
