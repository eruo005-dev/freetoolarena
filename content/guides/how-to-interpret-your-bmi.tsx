import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      BMI is a weight-to-height ratio that was never meant to be used as a
      personal health assessment — it&rsquo;s a population-level screening
      statistic from the 1830s that got promoted to individual diagnostic
      because it&rsquo;s cheap to measure. The number is useful as a rough
      signal, and dangerous as a verdict. This guide walks through what
      BMI does and doesn&rsquo;t tell you, who it systematically
      mis-classifies, and what to look at instead when you&rsquo;re
      deciding whether to act on it.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The formula and the standard categories</h2>
    <p>
      <code>BMI = weight (kg) / height (m)<sup>2</sup></code>
    </p>
    <p>
      Imperial: <code>BMI = 703 × weight (lb) / height (in)<sup>2</sup></code>. WHO categories
      for adults: underweight (&lt;18.5), normal (18.5–24.9), overweight
      (25–29.9), obese class I (30–34.9), class II (35–39.9), class III
      (40+).
    </p>

    <h2>What BMI actually measures</h2>
    <p>
      BMI measures total body mass relative to height. It cannot tell
      muscle from fat, subcutaneous from visceral fat, or frame size from
      body composition. On a population of 10,000 sedentary adults, BMI
      correlates reasonably well with body fat percentage. On an
      individual, it can be wildly wrong.
    </p>

    <h2>Who BMI systematically misclassifies</h2>
    <p>
      <strong>Muscular athletes:</strong> A 5&rsquo;10&rdquo;, 200 lb
      defensive lineman has a BMI of 28.7 — technically &ldquo;overweight&rdquo; —
      while carrying 8% body fat. The NFL is full of &ldquo;obese&rdquo; men
      by BMI who have healthier body composition than most of the general
      population.
    </p>
    <p>
      <strong>Older adults losing muscle (sarcopenia):</strong> A 75-year-old
      who has dropped 10 lb of muscle mass but kept body fat constant can
      have a &ldquo;normal&rdquo; BMI while carrying above-healthy body-fat
      percentage. BMI looks fine; composition is not.
    </p>
    <p>
      <strong>Short or very tall people:</strong> The height-squared
      denominator over-corrects at extreme heights. BMI overestimates
      adiposity in tall people and underestimates in short.
    </p>
    <p>
      <strong>Different ethnicities:</strong> Asian populations have higher
      body-fat-for-BMI ratios; WHO suggests Asian-specific BMI thresholds
      (overweight ≥ 23, obese ≥ 27.5). Black individuals often have
      higher lean-mass-for-BMI; standard cutoffs over-diagnose.
    </p>

    <h2>What to measure instead (or alongside)</h2>
    <p>
      <strong>Waist circumference.</strong> Measured at the navel:
      &gt; 40&rdquo; (men) / &gt; 35&rdquo; (women) independently predicts
      cardiovascular risk. Probably the single most useful number you
      can measure with a tape. A &ldquo;normal BMI&rdquo; with a
      42&rdquo; waist is worse than a &ldquo;overweight BMI&rdquo; with a
      36&rdquo; waist.
    </p>
    <p>
      <strong>Waist-to-height ratio.</strong> Should be &lt; 0.5 for all
      adults regardless of height. Easier to communicate than absolute
      waist measurements and works across populations.
    </p>
    <p>
      <strong>Body-fat percentage.</strong> Bioimpedance scales are noisy
      (±3% typical error); DEXA scans are the gold standard (±1%). For
      men, healthy 10–20%; for women 18–28%.
    </p>
    <p>
      <strong>Resting heart rate + blood pressure + fasting glucose +
      HDL/LDL.</strong> Far better individual-health predictors than BMI
      alone. If these are all in range, a &ldquo;overweight&rdquo; BMI is
      likely not a problem. If several are out of range, a
      &ldquo;normal&rdquo; BMI doesn&rsquo;t protect you.
    </p>

    <h2>When BMI is actually useful</h2>
    <p>
      <strong>Population screening.</strong> Public-health studies use it
      because it&rsquo;s cheap, reproducible, and reasonably predictive
      across millions of people. Fine at that scale.
    </p>
    <p>
      <strong>Tracking change in yourself.</strong> If you go from BMI 28
      to BMI 24 at the same height, something changed — probably in a
      healthy direction. Trend within an individual is more meaningful
      than single-point classification.
    </p>
    <p>
      <strong>Quick screening for severe outliers.</strong> A BMI of 42
      is worth flagging regardless of body composition. A BMI under 16
      is worth flagging. The extremes are more reliable than the 24–28
      borderline zone.
    </p>

    <h2>Children and adolescents — different rules</h2>
    <p>
      BMI for people under 20 uses <strong>BMI-for-age percentiles</strong>,
      not the adult categories. The calculator only applies to adults.
      Overweight for children = 85th–94th percentile; obese = ≥ 95th
      percentile. Use a pediatric BMI percentile tool instead.
    </p>

    <h2>Pregnancy, breastfeeding, and recovery</h2>
    <p>
      BMI is not meaningful during pregnancy or for 6+ months post-partum;
      pre-pregnancy BMI is used clinically. Athletes rehabbing from injury
      who are temporarily losing muscle mass should not use BMI as a
      target during recovery.
    </p>

    <h2>Read the number, then look past it</h2>
    <p>
      Compute yours in the <a href="/tools/bmi-calculator">BMI calculator</a>.
      If you&rsquo;re in normal range with no concerning waist measurement
      or lab values, you&rsquo;re probably fine. If you&rsquo;re flagged,
      pair with a waist measurement and baseline labs before acting. The
      <a href="/tools/body-fat-calculator">body fat calculator</a> gives a
      Navy-method estimate from circumference measurements, and the{" "}
      <a href="/tools/ideal-weight-calculator">ideal weight calculator</a>{" "}
      gives four formula-based weight ranges to compare against if you&rsquo;re
      setting a goal.
    </p>
  </>
);
