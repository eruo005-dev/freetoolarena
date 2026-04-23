import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Protein is the one macronutrient almost everyone under-eats when they&rsquo;re trying
      to lose fat, build muscle, or age well. The default recommendation of 0.8 g/kg was
      designed to prevent deficiency in sedentary adults, not to optimize body composition.
      Modern sports nutrition research consistently lands at <strong>1.6-2.2 g/kg</strong>
      for anyone training hard. Getting there requires planning: spreading protein across
      meals, hitting the leucine threshold each time, and knowing which foods actually
      deliver. This guide walks through the targets, the distribution, and the specific
      foods that get you there &mdash; whether you eat animals or not.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>1. What &ldquo;g/kg&rdquo; actually means</h2>
    <p>
      Targets are expressed in grams of protein per kilogram of body weight per day. A 70kg
      (154lb) person eating 1.8 g/kg needs <code>70 × 1.8 = 126g of protein daily</code>. In
      pounds, the rough shortcut is &ldquo;grams per pound = 0.7-1.0&rdquo; — close enough
      for practical planning.
    </p>

    <h2>2. Target ranges by goal</h2>
    <ul>
      <li><strong>Sedentary maintenance:</strong> 0.8 g/kg (RDA floor, not optimal)</li>
      <li><strong>General health / active adult:</strong> 1.2-1.6 g/kg</li>
      <li><strong>Building muscle (strength training):</strong> 1.6-2.2 g/kg</li>
      <li><strong>Fat loss while preserving muscle:</strong> 1.8-2.4 g/kg</li>
      <li><strong>Older adults (50+):</strong> 1.2-1.6 g/kg to fight sarcopenia</li>
      <li><strong>Endurance athletes:</strong> 1.4-1.8 g/kg</li>
    </ul>
    <p>
      The top of these ranges isn&rsquo;t dangerous for healthy kidneys — decades of research
      show no harm up to 3+ g/kg in athletes. The ceiling is appetite and budget, not safety.
    </p>

    <h2>3. Distribute across 3-5 meals</h2>
    <p>
      Muscle protein synthesis peaks after each protein-containing meal and then returns to
      baseline. Eating 150g of protein in one sitting is less effective than splitting it
      across 4 meals of ~37g. Aim for <strong>0.3-0.4 g/kg per meal</strong>, every 3-5
      hours. For a 70kg person that&rsquo;s 25-30g per meal.
    </p>

    <h2>4. The leucine threshold</h2>
    <p>
      Leucine is the amino acid that triggers muscle protein synthesis. The threshold for a
      full anabolic response is roughly <strong>2.5-3g of leucine per meal</strong>, which
      corresponds to ~25-30g of high-quality animal protein or ~40g of plant protein. Below
      this threshold, the signal is weak. Above it, diminishing returns. Every meal should
      cross the leucine line.
    </p>

    <h2>5. Protein content of common animal foods</h2>
    <ul>
      <li>Chicken breast (100g cooked): 31g protein</li>
      <li>Lean beef (100g cooked): 26g protein</li>
      <li>Salmon (100g cooked): 25g protein</li>
      <li>Greek yogurt (200g, 0% fat): 20g protein</li>
      <li>Cottage cheese (100g): 11g protein</li>
      <li>Eggs (2 large): 12g protein</li>
      <li>Whey protein scoop (30g): 24g protein</li>
      <li>Tuna can (drained, 120g): 26g protein</li>
    </ul>

    <h2>6. Plant protein sources that actually hit the target</h2>
    <p>
      Vegans need slightly more total protein (add ~10%) because plant proteins are less
      digestible and lower in leucine. Still very achievable with:
    </p>
    <ul>
      <li>Firm tofu (100g): 15g protein</li>
      <li>Tempeh (100g): 20g protein</li>
      <li>Seitan (100g): 25g protein</li>
      <li>Lentils, cooked (200g): 18g protein</li>
      <li>Edamame (100g): 11g protein</li>
      <li>Soy milk (250ml): 7-8g protein</li>
      <li>Pea or soy protein scoop (30g): 24g protein</li>
      <li>Chickpeas, cooked (200g): 15g protein</li>
    </ul>
    <p>
      Soy and pea protein isolates cross the leucine threshold as easily as whey. Mixed
      grain-plus-legume meals also work (rice + beans, hummus + pita).
    </p>

    <h2>7. A sample day at 150g</h2>
    <pre>{`Breakfast: 3 eggs + 200g Greek yogurt        → 38g
Lunch:     150g chicken breast + quinoa      → 50g
Snack:     whey scoop + milk                 → 32g
Dinner:    200g salmon + lentils             → 60g
Total:                                         180g`}</pre>
    <p>
      Easy to overshoot when you plan intentionally. The hard part is hitting the first 30g
      at breakfast — most Western breakfasts are protein-poor.
    </p>

    <h2>8. Fix breakfast first</h2>
    <p>
      A typical breakfast (toast, cereal, pastry, coffee) delivers 5-10g of protein. That&rsquo;s
      a wasted meal from a muscle-building perspective. Swap in Greek yogurt, eggs, cottage
      cheese, smoked salmon, tofu scramble, or a whey shake. Getting breakfast to 30g
      single-handedly fixes most protein-intake problems.
    </p>

    <h2>9. Do you need supplements?</h2>
    <p>
      No, but they&rsquo;re convenient. A whey or plant protein shake is the cheapest and
      fastest way to add 25g per serving. One scoop per day replaces 150g of chicken breast
      at roughly 1/3 the cost and 10 seconds of prep. Not a magic bullet — just efficient food.
    </p>

    <h2>10. Kidneys, bones, and the old myths</h2>
    <p>
      The claim that &ldquo;high protein damages kidneys&rdquo; applies to people with
      pre-existing kidney disease. In healthy adults, intakes of 2-3 g/kg show no adverse
      effect on renal function. The &ldquo;protein leaches calcium from bones&rdquo; myth
      was debunked decades ago — higher protein intake is associated with better bone density
      when calcium is adequate.
    </p>

    <h2>11. Common mistakes</h2>
    <ul>
      <li>
        <strong>Eyeballing portions.</strong> A &ldquo;chicken breast&rdquo; varies from 80g
        to 300g. Weigh food for two weeks to calibrate.
      </li>
      <li>
        <strong>Counting total food weight as protein.</strong> 100g of yogurt isn&rsquo;t
        100g of protein — it&rsquo;s 5-20g depending on type.
      </li>
      <li>
        <strong>Skipping breakfast protein.</strong> You can&rsquo;t cram a full day&rsquo;s
        target into dinner effectively.
      </li>
      <li>
        <strong>Relying on &ldquo;high-protein&rdquo; labels.</strong> Many products market
        15g per serving but use 50g servings most people double. Read per-100g columns.
      </li>
      <li>
        <strong>Ignoring plant protein incompleteness.</strong> Single plant sources can be
        low in one essential amino acid — vary sources across the day.
      </li>
    </ul>

    <h2>12. Run the numbers</h2>
    <p>
      Enter your weight and training status below to get a personalized g/day target, then
      slot it into your daily calorie and macro plan.
    </p>
    <p>
      <a href="/tools/protein-intake-calculator">Protein intake calculator</a>
      <a href="/tools/macro-calculator">Macro calculator</a>
      <a href="/tools/calorie-calculator">Calorie calculator</a>
    </p>
  </>
);
