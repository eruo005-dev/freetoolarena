import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      BMR is the calories you&rsquo;d burn in a coma. TDEE is the calories
      you burn actually living your life. Both numbers matter, but if
      you&rsquo;re trying to lose, gain, or maintain weight, TDEE is the one
      you eat toward. This guide explains how to calculate both with the
      Mifflin-St Jeor equation — the current clinical standard — and how to
      translate TDEE into a calorie target for your actual goal.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>BMR vs TDEE — what&rsquo;s the difference?</h2>
    <p>
      <strong>BMR (Basal Metabolic Rate)</strong> is the energy your body
      burns just to stay alive: heart beating, lungs breathing, brain
      running, cells dividing. Lying perfectly still in a dark room at
      neutral temperature, 24 hours a day. For most adults BMR is between
      1,400 and 1,800 kcal/day.
    </p>
    <p>
      <strong>TDEE (Total Daily Energy Expenditure)</strong> is BMR plus
      everything else: walking to the kitchen, typing, digesting food,
      thermoregulating, and any deliberate exercise. TDEE is typically
      1.2–1.9× BMR depending on how active you are.
    </p>
    <p>
      You don&rsquo;t eat to BMR. You eat to TDEE, then add or subtract to
      shift weight.
    </p>

    <h2>The Mifflin-St Jeor equation</h2>
    <p>
      Adopted as the standard by the Academy of Nutrition and Dietetics in
      the 1990s after studies showed it beat Harris-Benedict (1919) on
      accuracy for modern body compositions.
    </p>
    <p>
      For men:{" "}
      <code>BMR = (10 × kg) + (6.25 × cm) − (5 × age) + 5</code>. For women:{" "}
      <code>BMR = (10 × kg) + (6.25 × cm) − (5 × age) − 161</code>. Weight in
      kilograms, height in centimeters, age in years.
    </p>
    <p>
      A 32-year-old man at 82 kg (180 lbs) and 178 cm (5&apos;10&quot;) has a
      BMR of <code>(10 × 82) + (6.25 × 178) − (5 × 32) + 5 = 820 + 1113 −
      160 + 5 = 1,778 kcal</code>. The{" "}
      <a href="/tools/bmr-calculator">BMR calculator</a> handles the
      imperial-to-metric conversion and activity multiplier in one step.
    </p>

    <h2>The activity multiplier — and why most people get it wrong</h2>
    <p>
      Multiply BMR by the factor that matches your week honestly:
    </p>
    <p>
      <strong>1.2 — sedentary.</strong> Desk job, almost no deliberate
      exercise, walking less than 5,000 steps a day. If you work from home
      and don&rsquo;t train, this is you.
    </p>
    <p>
      <strong>1.375 — lightly active.</strong> Desk job but walking 5,000–
      10,000 steps daily or exercising 1–3 days a week at moderate intensity.
    </p>
    <p>
      <strong>1.55 — moderately active.</strong> Exercise 4–5 days a week.
      Most recreational lifters and runners land here.
    </p>
    <p>
      <strong>1.725 — very active.</strong> Daily training, often multiple
      sessions, or physically demanding job. Construction workers, touring
      musicians moving gear, military in field training.
    </p>
    <p>
      <strong>1.9 — extra active.</strong> Elite endurance athletes in heavy
      training blocks. Almost nobody reading this qualifies.
    </p>
    <p>
      The universal mistake is picking a factor one level above reality.
      Three weekly gym sessions is 1.375, not 1.55. If you pick too high,
      your calculated TDEE exceeds your real burn, and your &ldquo;deficit&rdquo;
      becomes maintenance. That&rsquo;s the usual explanation for &ldquo;I
      stopped losing weight.&rdquo;
    </p>

    <h2>Turning TDEE into a goal target</h2>
    <p>
      A pound of body fat is roughly 3,500 kcal. Split across 7 days, a daily
      deficit of 500 kcal produces about 1 lb/week of loss. The same math
      works in reverse for gains.
    </p>
    <p>
      <strong>Cut (fat loss):</strong> TDEE − 300 to 500 kcal/day. Aggressive
      cuts work short-term but hurt training recovery and hormones. 500/day
      is a sensible ceiling; 300/day is what competitive physique coaches
      use for preserving muscle.
    </p>
    <p>
      <strong>Maintenance:</strong> TDEE ± 100 kcal. This is where body
      recomposition happens — slow lean-mass gain while fat holds or drops,
      driven by training and protein, not calorie manipulation.
    </p>
    <p>
      <strong>Lean gain:</strong> TDEE + 200 to 300 kcal/day. &ldquo;Dirty
      bulks&rdquo; at +700 kcal/day produce about as much muscle as +250 and
      three times as much fat. Slow is better.
    </p>

    <h2>Protein first, calories second</h2>
    <p>
      Hit 0.8–1.0 grams of protein per pound of target body weight before
      worrying about carb/fat ratios. Protein preserves lean mass in a
      deficit, is the most satiating macro, and costs more calories to
      digest than carbs or fat. A 180-lb target means 145–180 g/day —
      roughly a palm-sized serving of chicken, fish, or Greek yogurt at each
      meal.
    </p>

    <h2>When to recalculate</h2>
    <p>
      Every 10 lbs of weight change or every 3 months, whichever hits first.
      BMR scales with body mass, so dropping 20 lbs means your maintenance
      calories are ~200 kcal/day lower than when you started. Failing to
      recalculate is the second most common reason for stalled fat loss
      (after lying about the activity multiplier).
    </p>
    <p>
      Use the <a href="/tools/bmr-calculator">BMR calculator</a> for the
      number, the <a href="/tools/calorie-calculator">calorie calculator</a>{" "}
      for goal-based targets, and the{" "}
      <a href="/tools/macro-calculator">macro calculator</a> to split TDEE
      into protein, carbs, and fat once you have a calorie floor.
    </p>
  </>
);
