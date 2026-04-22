import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Body fat percentage tells you what your weight is actually made of.
      Two people at 170 lbs can look — and be — completely different: one at
      15% body fat is a lean athlete, one at 30% is average and probably
      carrying more visceral fat than they want. BMI can&rsquo;t distinguish
      them. This guide walks through the five ways to measure body fat %, why
      the US Navy tape method is the best free option for most people, and how
      to track it reliably.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Why body fat % matters more than BMI</h2>
    <p>
      BMI is a two-number ratio — height and weight — that was never designed
      for individual diagnosis. It was built in the 1830s for population
      statistics. A lifter at 5&apos;10&quot;, 200 lbs, and 12% body fat shows
      up as &ldquo;overweight&rdquo; on the BMI chart despite carrying less
      fat than 90% of the population. Meanwhile a sedentary office worker at
      the same height and 160 lbs might read as &ldquo;healthy&rdquo; BMI but
      carry 30% fat and corresponding metabolic risk.
    </p>
    <p>
      Body fat percentage is what doctors, coaches, and insurance actuaries
      actually care about under the hood. If you can measure only one thing
      beyond the scale, measure this.
    </p>

    <h2>The five methods, ranked by accuracy</h2>
    <p>
      <strong>1. DEXA scan.</strong> X-ray based, ±1% accuracy, splits fat
      from lean mass and bone. The research-grade standard. Runs $50–$150 per
      scan at a local clinic.
    </p>
    <p>
      <strong>2. BodPod.</strong> Air-displacement plethysmography. ±2%
      accuracy. Similar cost to DEXA, less widely available.
    </p>
    <p>
      <strong>3. Skinfold calipers.</strong> A trained operator pinches 3 or
      7 sites and maps to a body fat %. ±3% if done by a pro; ±6% if
      self-measured. Cheap and repeatable but operator-dependent.
    </p>
    <p>
      <strong>4. US Navy tape method.</strong> Free, needs only a flexible
      tape. ±3–4% accuracy for most adults. Based on neck and waist
      circumference (plus hip for women). This is the best no-cost option.
    </p>
    <p>
      <strong>5. Bioimpedance (BIA) scales.</strong> Zap a low current
      through your body and estimate from resistance. The numbers swing by
      3–5% with hydration alone, so day-to-day trends are noisy. Better than
      nothing, but the tape wins on consistency.
    </p>

    <h2>The US Navy tape method in practice</h2>
    <p>
      The Navy formula has been used by the US military since 1984 for PFA
      compliance. It works because abdominal fat is the dominant
      differentiator between body compositions at the same height.
    </p>
    <p>
      For men:{" "}
      <code>
        BF% = 86.010 × log10(waist − neck) − 70.041 × log10(height) + 36.76
      </code>
      . For women:{" "}
      <code>
        BF% = 163.205 × log10(waist + hip − neck) − 97.684 × log10(height)
        − 78.387
      </code>
      . You measure in inches. Don&rsquo;t do the math by hand — the{" "}
      <a href="/tools/body-fat-calculator">body fat calculator</a> handles it
      instantly.
    </p>
    <p>
      <strong>Measure correctly.</strong> Waist at the navel, tape level all
      the way around, do not suck in. Neck just below the larynx, tape flat.
      Hips (women) at the widest point. Measure first thing in the morning
      before eating or drinking — a full stomach can add half an inch to the
      waist and swing the result 1–2 percentage points.
    </p>

    <h2>Healthy ranges</h2>
    <p>
      The American Council on Exercise bands body fat percentages roughly as
      follows. Men: 2–5% essential, 6–13% athletic, 14–17% fit, 18–24%
      average, 25%+ high. Women carry more essential fat: 10–13% essential,
      14–20% athletic, 21–24% fit, 25–31% average, 32%+ high. These shift
      slightly with age.
    </p>
    <p>
      &ldquo;Healthy&rdquo; isn&rsquo;t the same as &ldquo;low.&rdquo; Men
      below 6% and women below 14% can lose menstrual function, bone density,
      immune health, and testosterone. The athletic range is a better target
      than the essential one for almost everyone.
    </p>

    <h2>How often to measure</h2>
    <p>
      Once every 2–4 weeks is enough. Body fat doesn&rsquo;t swing
      meaningfully day-to-day — the scale does, but most of that is water
      and glycogen. If you measure daily you&rsquo;ll drive yourself
      insane chasing noise.
    </p>
    <p>
      Track two numbers over 8 weeks: body fat % and waist circumference. If
      both trend down, you&rsquo;re losing fat. If waist drops but body fat
      holds, it&rsquo;s probably hydration. If body fat rises while weight
      holds, you&rsquo;re losing muscle — slow the cut or eat more protein.
    </p>

    <h2>What actually moves the number</h2>
    <p>
      There&rsquo;s no secret. A caloric deficit of 300–500/day (tracked
      honestly), 0.8–1.0 grams of protein per pound of target weight,
      resistance training 3+ days a week, and 7+ hours of sleep. Over 12
      weeks that combination drops 2–4 points of body fat in most people —
      repeatable by almost anyone, which is why it&rsquo;s not an advertised
      magic protocol.
    </p>
    <p>
      Pair the body fat calculator with our{" "}
      <a href="/tools/bmr-calculator">BMR calculator</a> to set the calorie
      target, and the <a href="/tools/calorie-calculator">calorie
      calculator</a> for a goal-based intake number. See the{" "}
      <a href="/guides/how-to-build-muscle-as-a-beginner">build muscle as a
      beginner</a> guide for the training side.
    </p>
  </>
);
