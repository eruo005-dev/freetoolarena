import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Setting macros — the grams of protein, carbs, and fat you eat each
      day — is how you move from vague &ldquo;eat better&rdquo; goals to a
      number you can track. The math is simpler than the fitness industry
      makes it sound, but almost every calculator spits out numbers
      without telling you which assumptions they made. This guide walks
      through how macros translate to calories, the three common goal
      strategies (cut, maintain, bulk), and the protein floor worth
      defending even when everything else flexes.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The calorie-equivalents you need to memorize</h2>
    <p>
      <strong>Protein: 4 calories per gram.</strong>
    </p>
    <p>
      <strong>Carbohydrates: 4 calories per gram.</strong>
    </p>
    <p>
      <strong>Fat: 9 calories per gram.</strong>
    </p>
    <p>
      <strong>Alcohol: 7 calories per gram</strong> (not usually included
      in macro calculators but worth mentioning — a glass of wine is
      ~120 kcal with almost zero macro utility).
    </p>

    <h2>Step 1 — set your total daily calories</h2>
    <p>
      Start with TDEE (total daily energy expenditure), not a round number.
      Use our <a href="/guides/how-to-calculate-tdee-and-bmr">TDEE + BMR
      guide</a> to compute it. Then adjust based on goal:
    </p>
    <p>
      <strong>Fat loss:</strong> TDEE − 15 to 25%. 500/day deficit =
      ~1 lb/week. Don&rsquo;t go below TDEE − 30% — it tanks adherence and
      muscle retention.
    </p>
    <p>
      <strong>Maintenance:</strong> TDEE ±100 kcal. You&rsquo;re trying to
      hold current weight while improving body composition.
    </p>
    <p>
      <strong>Muscle gain (bulking):</strong> TDEE + 10 to 15% (lean bulk)
      or TDEE + 20% (traditional). More than +20% just adds fat you&rsquo;ll
      have to cut later.
    </p>

    <h2>Step 2 — lock protein first</h2>
    <p>
      Protein is the macro worth defending because it preserves muscle
      during a deficit and drives muscle-protein synthesis during a
      surplus. Evidence-based targets:
    </p>
    <p>
      <strong>0.7–1.0 g per lb of bodyweight</strong> for active adults
      trying to build or preserve muscle. For a 180 lb person, that&rsquo;s
      126–180 g/day.
    </p>
    <p>
      <strong>0.8–1.2 g per lb of target weight</strong> (or lean body
      mass if you know it) works better for overweight individuals where
      bodyweight × 1.0 inflates the number.
    </p>
    <p>
      <strong>Floor of 0.6 g/lb</strong> — anything lower compromises
      muscle retention even in a moderate deficit. Most Americans under-eat
      protein, averaging ~0.4 g/lb.
    </p>
    <p>
      180 lb × 0.8 g/lb = 144 g protein/day = 576 kcal (about 30% of a
      2,000 kcal plan).
    </p>

    <h2>Step 3 — set fat next</h2>
    <p>
      Fat supports hormonal function (especially testosterone, menstrual
      regularity) and satiety. Don&rsquo;t go below 0.3 g per lb
      bodyweight as a floor, and don&rsquo;t go above ~45% of calories
      unless you&rsquo;re doing keto.
    </p>
    <p>
      <strong>Sensible range:</strong> 0.3–0.5 g per lb bodyweight, or
      25–35% of total calories.
    </p>
    <p>
      180 lb × 0.4 g/lb = 72 g fat = 648 kcal (32% of 2,000 kcal).
    </p>

    <h2>Step 4 — carbs fill the rest</h2>
    <p>
      Carbs don&rsquo;t have an essential dietary requirement (unlike
      protein and fat), but they fuel performance and recovery. Whatever
      calories remain after protein and fat, divide by 4 for carb grams.
    </p>
    <p>
      2,000 − 576 (protein) − 648 (fat) = 776 kcal remaining ÷ 4 ={" "}
      <strong>194 g carbs</strong>.
    </p>
    <p>
      Final macro split for a 180 lb person at 2,000 kcal cut:{" "}
      <strong>144 g protein / 194 g carbs / 72 g fat.</strong>
    </p>

    <h2>Common goal archetypes</h2>
    <p>
      <strong>Fat loss:</strong> High protein (1.0 g/lb), moderate fat
      (0.35 g/lb), carbs from remaining calories. Preserves muscle and
      satiety.
    </p>
    <p>
      <strong>Muscle gain:</strong> Moderate-high protein (0.8 g/lb), low-
      to-moderate fat (0.35 g/lb), carbs high to fuel training. Surplus
      of 10–20% over TDEE.
    </p>
    <p>
      <strong>Endurance performance:</strong> Lower fat, higher carbs
      (50–65% of calories), moderate protein. Fuels glycogen demand.
    </p>
    <p>
      <strong>Keto / low-carb:</strong> 70–75% fat, 20–25% protein, 5–10%
      carbs. Therapeutic for specific conditions, not inherently superior
      for body composition.
    </p>

    <h2>Tracking and the 80% rule</h2>
    <p>
      Tracking macros with an app (MyFitnessPal, Cronometer, MacroFactor)
      for 2–4 weeks gives you calibration — you learn what 30 g of protein
      looks like on a plate. After that, most people transition to
      &ldquo;flexible tracking&rdquo; — protein every meal, portion-aware
      carbs and fats, one weigh-in per week.
    </p>
    <p>
      Hitting exactly on target every day is unnecessary. Being within
      ±10% of each target 5 days out of 7 drives the same physiological
      outcome as obsessive precision, with far better adherence.
    </p>

    <h2>Micronutrients — the invisible macro</h2>
    <p>
      Macro-focused eating without regard for fiber, vegetables, and
      micronutrient density is how people end up &ldquo;hitting macros&rdquo;
      on a diet of protein shakes and Pop-Tarts and feeling terrible.
      Target 25–35 g fiber/day and build 80%+ of meals around whole
      foods. Macros tell you <em>quantity</em>; food quality decides how
      well the number works for you.
    </p>

    <h2>Run yours</h2>
    <p>
      Enter your weight, goal, and activity level into the{" "}
      <a href="/tools/macro-calculator">macro calculator</a> to get a
      protein/carb/fat split. Pair with the{" "}
      <a href="/tools/calorie-calculator">calorie calculator</a> to verify
      total intake against your TDEE, and the{" "}
      <a href="/tools/bmi-calculator">BMI calculator</a> plus our{" "}
      <a href="/guides/how-to-interpret-your-bmi">BMI interpretation
      guide</a> to sanity-check the starting point — &ldquo;cut&rdquo; is
      the right macro if body composition is overweight, &ldquo;maintain
      plus resistance train&rdquo; may be better if you&rsquo;re already
      in a healthy range.
    </p>
  </>
);
