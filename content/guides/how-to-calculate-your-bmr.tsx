import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Basal metabolic rate is what your body burns when you do absolutely
      nothing &mdash; lying in bed, fasted, awake, at a comfortable
      temperature. It&rsquo;s the floor beneath every other calorie number you
      care about. Most people confuse BMR with maintenance calories; they
      differ by 30&ndash;70% depending on how active you are. Understanding
      BMR matters because it&rsquo;s the only part of the equation that
      responds to long deficits, aging, and muscle mass. This guide covers the
      definition, the formulas that estimate it, what actually moves the
      number, the concept of metabolic adaptation, and why even the best BMR
      formula is only a ballpark.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What BMR actually measures</h2>
    <p>
      BMR is the energy cost of basic physiological processes: heart beating,
      lungs breathing, kidneys filtering, liver metabolizing, brain running,
      cells repairing themselves. Measured in a lab: 12 hours fasted, lying
      still, neutral temperature, awake.
    </p>
    <p>
      <strong>RMR</strong> (resting metabolic rate) is the less-strict version
      most clinics actually measure &mdash; lying still but not necessarily
      fasted. RMR is typically 5&ndash;10% higher than BMR. In popular usage
      the terms are interchangeable.
    </p>

    <h2>Mifflin-St Jeor (current standard)</h2>
    <p>
      Published 1990, the best-validated formula for modern populations. Use
      this unless you have a specific reason not to.
    </p>
    <pre>{`Men:    BMR = 10*weight(kg) + 6.25*height(cm) - 5*age + 5
Women:  BMR = 10*weight(kg) + 6.25*height(cm) - 5*age - 161

30-year-old woman, 65kg, 165cm:
BMR = 650 + 1031.25 - 150 - 161 = 1,370 kcal/day`}</pre>
    <p>
      Accurate to within ~10% for 82% of normal-weight people. Accuracy drops
      at the extremes of age and body composition.
    </p>

    <h2>Harris-Benedict (revised 1984)</h2>
    <p>
      The older standard, still common in textbooks. Slightly overestimates
      for modern (heavier) populations.
    </p>
    <pre>{`Men:   88.362 + 13.397*weight(kg) + 4.799*height(cm) - 5.677*age
Women: 447.593 + 9.247*weight(kg) + 3.098*height(cm) - 4.330*age`}</pre>
    <p>
      Gives numbers ~100 kcal higher than Mifflin-St Jeor for the same
      person. Use only if you&rsquo;re matching an existing study or device
      that uses it.
    </p>

    <h2>Katch-McArdle (body-composition aware)</h2>
    <p>
      If you know your body fat percentage, this formula uses lean body mass
      and is more accurate for lean or muscular people whose fat-free mass
      deviates from average.
    </p>
    <pre>{`LBM = weight * (1 - body_fat_fraction)
BMR = 370 + 21.6 * LBM(kg)

Example: 70kg, 12% body fat
LBM = 70 * 0.88 = 61.6 kg
BMR = 370 + 21.6 * 61.6 = 1,700 kcal`}</pre>
    <p>
      For bodybuilders and athletes, Katch-McArdle beats Mifflin by 100&ndash;
      200 kcal. For sedentary people with higher body fat it slightly
      underestimates.
    </p>

    <h2>What actually determines your BMR</h2>
    <p>
      Four factors explain most of the variance:
    </p>
    <p>
      <strong>Lean mass.</strong> Muscle burns ~13 kcal/kg/day at rest;
      fat burns ~4.5. Two people of the same weight but different
      compositions can differ by 150+ kcal BMR.
    </p>
    <p>
      <strong>Age.</strong> BMR drops ~2% per decade after 30. Partly muscle
      loss, partly metabolic efficiency.
    </p>
    <p>
      <strong>Sex.</strong> Men have more muscle on average, so higher BMR at
      the same weight.
    </p>
    <p>
      <strong>Genetics.</strong> Identical twins raised in different homes
      have very similar BMRs. You inherit a range.
    </p>

    <h2>What doesn&rsquo;t matter as much as people say</h2>
    <p>
      <strong>Meal frequency.</strong> Six small meals vs three big ones makes
      almost no BMR difference. Thermic effect scales with total intake, not
      number of meals.
    </p>
    <p>
      <strong>Spicy food / green tea / cold showers.</strong> Real effects
      exist but round to 20&ndash;80 kcal/day. Not worth structuring your life
      around.
    </p>
    <p>
      <strong>Thyroid (within the normal range).</strong> Subclinical
      variation in thyroid doesn&rsquo;t meaningfully change BMR. Actual
      hypo/hyper-thyroidism does; get tested if you suspect it.
    </p>

    <h2>Metabolic adaptation</h2>
    <p>
      The most important concept most BMR calculators ignore: BMR is not a
      constant. Prolonged calorie restriction lowers BMR beyond what weight
      loss alone accounts for.
    </p>
    <pre>{`12 weeks in a 500-kcal deficit:
Expected BMR drop from weight loss:     ~80 kcal
Actual BMR drop (adaptation included):  ~160-250 kcal`}</pre>
    <p>
      This is why plateaus happen and why &ldquo;diet breaks&rdquo; help. A
      1&ndash;2 week return to maintenance partially reverses the
      adaptation. The Biggest Loser follow-up study is the most famous
      example &mdash; contestants had BMRs 400+ kcal below predicted even
      years later.
    </p>

    <h2>BMR and aging</h2>
    <p>
      The common claim is metabolism &ldquo;slows&rdquo; after 30 or 40. A
      2021 Science paper tracking 6,400 people showed the truth is less
      dramatic:
    </p>
    <ul>
      <li>0&ndash;12 months: BMR surges, +50% of adult rate</li>
      <li>1&ndash;20: gradual decline to adult baseline</li>
      <li>20&ndash;60: essentially flat after adjusting for body composition</li>
      <li>60+: real decline begins, about 0.7% per year</li>
    </ul>
    <p>
      Most &ldquo;metabolism slowed&rdquo; between 30 and 50 is actually
      activity and muscle loss, not a BMR change.
    </p>

    <h2>How to measure BMR for real</h2>
    <p>
      If accuracy matters (clinical, research), the gold standards are:
    </p>
    <p>
      <strong>Indirect calorimetry.</strong> A mask measures O2 intake and CO2
      output for 20&ndash;30 minutes; the ratio and volume give BMR. Available
      at some gyms and sports-medicine clinics for $100&ndash;200.
    </p>
    <p>
      <strong>Doubly-labeled water.</strong> The research gold standard. You
      drink water with stable isotopes, urinate samples for 10 days; BMR and
      TDEE computed from elimination rates. Expensive, used in studies.
    </p>
    <p>
      Fitness watches and smart scales estimate BMR with formulas under the
      hood; don&rsquo;t treat their output as measured.
    </p>

    <h2>Limitations of any BMR formula</h2>
    <p>
      <strong>Population averages.</strong> The formulas are regressions from
      thousands of people. Individual variation from the mean is ~10%
      standard deviation.
    </p>
    <p>
      <strong>Doesn&rsquo;t capture recent history.</strong> Two weeks of
      fasting or overfeeding shifts BMR temporarily; the formula
      doesn&rsquo;t know.
    </p>
    <p>
      <strong>Assumes standard body composition.</strong> Bodybuilders and
      marathoners skew the model; use Katch-McArdle.
    </p>
    <p>
      <strong>No feedback loop.</strong> A formula has no way to know if
      yours is adapted from a long cut. Adjust by 100&ndash;200 kcal if that
      describes you.
    </p>

    <h2>Why BMR matters even if you&rsquo;re not dieting</h2>
    <p>
      It sets the floor for fueling. Dropping below BMR with food intake
      means you&rsquo;re running a deficit even before any activity. Over
      weeks that drives muscle loss and metabolic adaptation. Even on a hard
      cut, eating at least your BMR is the usual prescription.
    </p>
    <p>
      Knowing BMR also lets you interpret food packaging. A 400-calorie meal
      is half a day for a small sedentary person and a fifth of a day for a
      large active one. &ldquo;Calorie dense&rdquo; is relative to BMR, not
      absolute.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Confusing BMR with maintenance.</strong> Maintenance = BMR
      &times; activity factor. BMR alone is what you&rsquo;d burn in a coma.
    </p>
    <p>
      <strong>Using Harris-Benedict in 2026.</strong> Mifflin-St Jeor is more
      accurate for modern populations. Switch.
    </p>
    <p>
      <strong>Ignoring body composition.</strong> A muscular person using the
      standard formula is underestimating by hundreds of calories.
    </p>
    <p>
      <strong>Recalculating every day.</strong> Your BMR doesn&rsquo;t change
      day to day. Recompute on meaningful body weight or composition shifts.
    </p>
    <p>
      <strong>Trusting fitness-watch BMR.</strong> They use a formula under
      the hood &mdash; don&rsquo;t treat it as measured.
    </p>
    <p>
      <strong>Eating below BMR on a cut.</strong> Aggravates adaptation, kills
      performance, burns muscle. Keep intake &gt;= BMR as a rule of thumb.
    </p>
    <p>
      <strong>Ignoring adaptation after a long cut.</strong> If you&rsquo;ve
      been dieting for months, your real BMR is lower than the calculator
      says.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Drop your stats into the{" "}
      <a href="/tools/bmr-calculator">BMR calculator</a> for a Mifflin-St
      Jeor number. Multiply by your activity factor in the{" "}
      <a href="/tools/calorie-calculator">calorie calculator</a> to get
      maintenance calories, and use the{" "}
      <a href="/tools/body-fat-calculator">body fat calculator</a> when you
      want to refine with Katch-McArdle using actual lean mass rather than
      the population-average formula.
    </p>
  </>
);
