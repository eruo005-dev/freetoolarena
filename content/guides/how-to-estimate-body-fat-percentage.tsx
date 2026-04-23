import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Body fat percentage tells you what BMI can&rsquo;t: how much of your weight is fat
      versus lean mass. Two people at 75kg can have dramatically different health profiles
      — one at 15% body fat, the other at 30%. The catch is that every measurement method
      has significant error bars, and cheap methods can be off by 5-10 percentage points.
      This guide covers the Navy tape method (free, ~3-4% error), skinfold calipers (cheap,
      skill-dependent), DEXA and hydrostatic weighing (gold standard, expensive), bioimpedance
      scales (convenient, unreliable), and how to interpret all of it against health ranges
      by sex and age. Pick the method you&rsquo;ll actually use consistently.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>1. BMI vs body fat percentage</h2>
    <p>
      BMI uses only height and weight:
    </p>
    <pre>{`BMI = weight (kg) / height (m)²`}</pre>
    <p>
      It&rsquo;s useful at population scale but misleading for individuals. A muscular
      athlete can register as &ldquo;overweight&rdquo; at 28 BMI with 10% body fat. A
      sedentary office worker at the same BMI might carry 28% body fat. Body fat percentage
      corrects for body composition — the thing BMI was trying to approximate.
    </p>

    <h2>2. The US Navy tape method</h2>
    <p>
      The most practical free method. Requires a soft tape measure. Measurements:
    </p>
    <ul>
      <li><strong>Men:</strong> neck, waist at navel</li>
      <li><strong>Women:</strong> neck, waist at navel, hips at widest</li>
    </ul>
    <p>
      Plus height. The formulas (imperial inches):
    </p>
    <pre>{`Men:   %BF = 86.010 × log10(waist - neck) - 70.041 × log10(height) + 36.76
Women: %BF = 163.205 × log10(waist + hip - neck) - 97.684 × log10(height) - 78.387`}</pre>
    <p>
      Error range: ±3-4%. Used by the US military for fitness compliance. Works better for
      average builds than for very lean or very heavy subjects.
    </p>

    <h2>3. Skinfold calipers</h2>
    <p>
      Pinch a fold of skin-plus-fat at specified sites (typically 3 or 7) and read the
      thickness in millimeters. Jackson-Pollock 3-site for men (chest, abdomen, thigh) and
      women (triceps, suprailiac, thigh) is the most common. Cheap calipers run $20; pro
      models $200+.
    </p>
    <p>
      Accuracy depends almost entirely on <strong>technician skill</strong>. A trained
      assessor can hit ±3%. A novice self-measuring can be off by 8%+. If you go this route,
      measure the same sites at the same time of day, standing, hydrated.
    </p>

    <h2>4. DEXA scans</h2>
    <p>
      Dual-energy X-ray absorptiometry separates your body into bone, lean tissue, and fat
      using low-dose X-rays. Error: ±1-2%. Also gives regional breakdown (arms, legs, trunk)
      and bone density. Cost: $50-150 per scan in the US, free on some UK NHS pathways. For
      tracking changes every 3-6 months, DEXA is the reasonable gold standard.
    </p>

    <h2>5. Hydrostatic weighing and BodPod</h2>
    <p>
      Hydrostatic: submerge in water and measure displacement. Error: ±1.5%. Annoying to
      access. BodPod uses air displacement and is more convenient with similar accuracy.
      Both are available at university kinesiology labs for $25-75. Valid research methods
      but rarely practical for repeated home use.
    </p>

    <h2>6. Bioelectrical impedance (BIA) scales</h2>
    <p>
      Consumer smart scales pass a tiny current through the body and estimate fat from
      resistance. <em>Error can exceed 5% in either direction</em>, and readings swing day
      to day with hydration. Foot-only scales (Fitbit Aria, Renpho) are the least accurate;
      8-electrode scales (Tanita, Omron hand-plus-foot) are better. Useful for tracking
      <strong> trends</strong> over weeks if you measure at the same time daily, not for
      absolute numbers.
    </p>

    <h2>7. Photos and the mirror test</h2>
    <p>
      Monthly front/side/back photos in the same lighting and clothing show progress that
      any numeric method can miss. Combined with tape measurements at 3-4 body sites (chest,
      waist, hips, thigh), this is cheaper, more visual, and arguably more motivating than
      any percentage. Numbers lie; photos don&rsquo;t.
    </p>

    <h2>8. Health ranges by sex</h2>
    <p>
      American Council on Exercise ranges for adults:
    </p>
    <ul>
      <li>Essential fat: men 2-5%, women 10-13%</li>
      <li>Athletes: men 6-13%, women 14-20%</li>
      <li>Fitness: men 14-17%, women 21-24%</li>
      <li>Acceptable: men 18-24%, women 25-31%</li>
      <li>Obese: men 25%+, women 32%+</li>
    </ul>
    <p>
      Women carry more essential fat biologically (reproductive function, hormones). A 15%
      body fat man and a 22% body fat woman are equivalently lean.
    </p>

    <h2>9. Age adjustments</h2>
    <p>
      Healthy body fat drifts up slightly with age as lean mass declines. Add roughly 1-2%
      to &ldquo;acceptable&rdquo; ranges per decade after 30, unless you&rsquo;re actively
      resistance training. Sarcopenia (age-related muscle loss) starts accelerating around
      50; preserving lean mass is more important than chasing low body fat numbers past
      middle age.
    </p>

    <h2>10. Why waist circumference alone is useful</h2>
    <p>
      For health risk, waist-to-height ratio beats body fat percentage for simplicity:
    </p>
    <pre>{`Keep waist circumference < half your height`}</pre>
    <p>
      That&rsquo;s 35 inches for a 5&rsquo;10&rdquo; person. Above that, visceral fat risk
      climbs regardless of total body fat. One tape measurement catches most cardiovascular
      risk.
    </p>

    <h2>11. Tracking changes, not absolute numbers</h2>
    <p>
      Every method has systematic bias. If your BIA scale says 22% and a DEXA says 18%, both
      numbers can still show progress consistently. Pick one method, use it on the same day
      of the week, same time, same hydration state, for months. The direction and slope
      matter more than the absolute number.
    </p>

    <h2>12. Common mistakes</h2>
    <ul>
      <li>
        <strong>Comparing methods.</strong> A BIA scale and a DEXA will give different
        numbers on the same person on the same day. Don&rsquo;t mix sources.
      </li>
      <li>
        <strong>Measuring inconsistently.</strong> Morning fasted vs evening post-workout
        can swing BIA readings 3-5%. Lock in conditions.
      </li>
      <li>
        <strong>Chasing single-digit body fat.</strong> Below ~8% for men and ~14% for
        women, hormones, sleep, mood, and immune function deteriorate.
      </li>
      <li>
        <strong>Tape-measure technique drift.</strong> Pull too tight or too loose and the
        Navy formula breaks down. Use the same tension every time.
      </li>
      <li>
        <strong>Obsessing.</strong> Waist size, strength numbers, and how clothes fit are
        often better real-world feedback than a percentage.
      </li>
    </ul>

    <h2>13. Run the numbers</h2>
    <p>
      Plug in your tape measurements below to get an estimate using the Navy method, then
      compare it to your BMR and BMI numbers to get a full picture.
    </p>
    <p>
      <a href="/tools/body-fat-calculator">Body fat calculator</a>
      <a href="/tools/bmr-calculator">BMR calculator</a>
      <a href="/tools/bmi-calculator">BMI calculator</a>
    </p>
  </>
);
