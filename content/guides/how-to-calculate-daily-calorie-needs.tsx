import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Your daily calorie target is the single most useful number in fitness,
      and also the one most commonly miscomputed. Apps spit out a figure
      without showing their work; online calculators disagree by hundreds of
      calories; and the number itself is only an estimate of a body that
      doesn&rsquo;t behave like a spreadsheet. The math is actually simple:
      estimate your BMR, multiply by an activity factor, add or subtract a
      deficit. This guide walks through the Mifflin-St Jeor equation, the
      activity multipliers that actually match real life, how to set a deficit
      or surplus for weight goals, and why calorie math should be treated as
      a starting point, not a contract.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>TDEE = BMR &times; activity factor</h2>
    <p>
      <strong>TDEE</strong> (total daily energy expenditure) is how many
      calories your body burns in a full day. It&rsquo;s the number you want to
      match, beat, or undercut depending on your goal.
    </p>
    <p>
      <strong>BMR</strong> (basal metabolic rate) is what your body burns at
      complete rest &mdash; just keeping the lights on. It accounts for
      roughly 60&ndash;70% of TDEE for a sedentary person, less for an active
      one.
    </p>
    <pre>{`TDEE = BMR x activity factor`}</pre>

    <h2>Mifflin-St Jeor equation</h2>
    <p>
      The current standard for BMR estimation. More accurate than the older
      Harris-Benedict for modern populations.
    </p>
    <pre>{`Men:    BMR = 10*weight(kg) + 6.25*height(cm) - 5*age + 5
Women:  BMR = 10*weight(kg) + 6.25*height(cm) - 5*age - 161

Example: 35-year-old man, 80kg, 180cm
BMR = 800 + 1125 - 175 + 5 = 1,755 kcal`}</pre>
    <p>
      In pounds and inches:{" "}
      <code>weight(lb) * 4.536</code>, <code>height(in) * 2.54</code>.
    </p>

    <h2>Activity multipliers</h2>
    <p>
      Pick the number that matches how you actually live, not how you want to
      live.
    </p>
    <pre>{`1.2    Sedentary        Desk job, little exercise
1.375  Light            1-3 days/week of light exercise
1.55   Moderate         3-5 days/week of moderate exercise
1.725  Very active      6-7 days/week of hard exercise
1.9    Extra active     Physical job + daily training`}</pre>
    <p>
      Most people overestimate. A white-collar worker who goes to the gym
      three times a week is almost always <em>light</em> (1.375), not
      <em> moderate</em>. Two hours of training doesn&rsquo;t make up for
      sitting sixteen. Err on the low side; you can always eat more if
      progress stalls.
    </p>

    <h2>Putting it together</h2>
    <pre>{`Same 35/80kg/180cm man, moderately active:
TDEE = 1,755 x 1.55 = 2,720 kcal/day`}</pre>
    <p>
      That&rsquo;s your maintenance. Eat 2,720 and weight stays steady over
      weeks, within a margin of error.
    </p>

    <h2>Setting a deficit for weight loss</h2>
    <p>
      A pound of body fat is ~3,500 kcal. A 500-calorie daily deficit =
      ~1 lb/week, 1,000-calorie deficit = ~2 lb/week.
    </p>
    <pre>{`To lose 1 lb/week:   TDEE - 500
To lose 2 lb/week:   TDEE - 1000 (aggressive)
Floor:                1,200 kcal women / 1,500 kcal men`}</pre>
    <p>
      Don&rsquo;t drop below those floors without medical supervision. Rapid
      loss on very low intake means losing disproportionate muscle,
      tanking metabolism, and higher rebound risk. Slow and steady beats
      crash diets on every outcome that matters past twelve weeks.
    </p>

    <h2>Setting a surplus for gains</h2>
    <p>
      For muscle gain, aim for a modest surplus &mdash; 250&ndash;500 kcal
      above TDEE. Bigger surpluses don&rsquo;t build muscle faster; they just
      add fat.
    </p>
    <pre>{`Lean bulk:   TDEE + 200-300
Standard:    TDEE + 300-500
Dirty bulk:  TDEE + 500+   (not recommended)`}</pre>
    <p>
      Muscle growth is capped by protein synthesis rate, not by total calories.
      You can&rsquo;t force extra growth by eating more. The extra just stores.
    </p>

    <h2>Protein, fat, carbs</h2>
    <p>
      Once the calorie number is set, split into macros:
    </p>
    <pre>{`Protein: 0.7-1.0 g per lb bodyweight (1.6-2.2 g/kg)
Fat:     20-30% of calories (minimum ~0.3 g/lb for hormones)
Carbs:   remainder`}</pre>
    <p>
      Protein matters most in a deficit &mdash; it&rsquo;s what protects
      muscle when the body is short on energy. In a surplus, protein plus
      resistance training is what converts calories into muscle rather than
      fat.
    </p>

    <h2>Why calorie math is approximate</h2>
    <p>
      Your actual expenditure can differ from the estimate by 200&ndash;400
      kcal:
    </p>
    <ul>
      <li>BMR variation between individuals of the same stats: +/- 10%</li>
      <li>NEAT (non-exercise activity thermogenesis) swings by hundreds</li>
      <li>Thermic effect of food varies with macro split (+5-30%)</li>
      <li>Food labels are legally allowed +/- 20% accuracy</li>
      <li>Home cooking portion estimates: wildly variable</li>
    </ul>
    <p>
      So the prescription is: compute the number, eat to it for 2&ndash;3
      weeks, measure the trend, and adjust by 100&ndash;200 kcal rather than
      recalculating from scratch.
    </p>

    <h2>Tracking accuracy</h2>
    <p>
      A food scale beats cups. Cups beat eyeballs. Eyeballs beat nothing.
      Logging for the first two weeks &mdash; even loosely &mdash; calibrates
      your sense of portion sizes; after that you can usually coast with just
      scale-based protein tracking.
    </p>
    <p>
      The biggest blind spots: cooking oil, condiments, drinks, bites off a
      partner&rsquo;s plate. Two tablespoons of olive oil is 240 kcal.
    </p>

    <h2>Metabolic adaptation</h2>
    <p>
      Running a deficit for weeks triggers adaptive thermogenesis &mdash; your
      body reduces BMR and NEAT. A plateau at week 8 doesn&rsquo;t mean the
      math is wrong; it means the TDEE has drifted down. Options:
    </p>
    <ul>
      <li>Eat at maintenance for 1&ndash;2 weeks (diet break)</li>
      <li>Cut another 100&ndash;200 kcal</li>
      <li>Add training volume (cardio or steps)</li>
    </ul>
    <p>
      Never try to out-deficit adaptation. The path out of a plateau is a diet
      break or more activity, not fewer calories.
    </p>

    <h2>When the calculator is wrong for you</h2>
    <p>
      The Mifflin-St Jeor formula assumes average body composition. If
      you&rsquo;re very lean (sub-10% body fat for men, sub-18% for women), it
      underestimates BMR. If you&rsquo;re carrying a lot of body fat, it
      slightly overestimates. For high body-fat cases, calculate with
      Katch-McArdle using lean body mass instead:
    </p>
    <pre>{`Katch-McArdle:  BMR = 370 + 21.6 * LBM(kg)
LBM = weight * (1 - body_fat_fraction)`}</pre>

    <h2>Common mistakes</h2>
    <p>
      <strong>Overestimating activity level.</strong> The single most common
      error. Drop one tier from what you first picked.
    </p>
    <p>
      <strong>Chasing the exact number.</strong> Your daily TDEE fluctuates by
      hundreds of calories naturally. Target a weekly average, not a daily
      bullseye.
    </p>
    <p>
      <strong>Ignoring liquid calories.</strong> A 16oz latte is 250&ndash;350
      kcal, beer is 150, wine is 120. They don&rsquo;t register as food so
      they get forgotten.
    </p>
    <p>
      <strong>Under-eating protein during a cut.</strong> You lose more muscle
      than necessary. Keep protein high even when slashing everything else.
    </p>
    <p>
      <strong>Recalculating every week.</strong> Your stats don&rsquo;t change
      that fast. Recompute after a 5&ndash;10 lb weight change, not weekly.
    </p>
    <p>
      <strong>Skipping the measurement phase.</strong> The number is a guess
      until you eat to it for two weeks and see what the scale does. Trust
      the data, not the formula.
    </p>
    <p>
      <strong>Extreme deficits for fast results.</strong> You&rsquo;ll lose
      muscle, feel awful, and rebound. Slow losses stick.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Plug your stats into the{" "}
      <a href="/tools/calorie-calculator">calorie calculator</a> for a
      TDEE with deficit and surplus options. For just the baseline number, the{" "}
      <a href="/tools/bmr-calculator">BMR calculator</a> skips the activity
      multiplier, and the{" "}
      <a href="/tools/macro-calculator">macro calculator</a> splits your
      target calories into protein, fat, and carbs so you know what to
      actually put on the plate.
    </p>
  </>
);
