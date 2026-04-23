import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Roughly 95% of adults in the US and UK miss the daily fiber target. The recommended
      floor is <strong>25g for women and 38g for men</strong>, and most people land between
      12-18g. Fiber lowers cholesterol, stabilizes blood sugar, feeds the gut microbiome,
      reduces colorectal cancer risk, and keeps bowel movements predictable. Unlike protein,
      you can&rsquo;t supplement your way out of a low-fiber diet easily &mdash; the best
      sources are whole plant foods. This guide shows you exactly which foods deliver the
      most fiber per serving, how to ramp up without gas and bloating, and why the soluble
      vs insoluble distinction still matters.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>1. The targets and where they come from</h2>
    <p>
      The US Institute of Medicine sets adequate intake at 14g of fiber per 1,000 calories
      consumed. For a 2,000 kcal woman that&rsquo;s 25g; for a 2,700 kcal man, 38g. The UK
      recommends 30g for all adults. Children need roughly &ldquo;age + 5&rdquo; grams per
      day. Target the upper end — most research benefits plateau around 35-50g.
    </p>

    <h2>2. Soluble vs insoluble</h2>
    <p>
      <strong>Soluble fiber</strong> dissolves in water and forms a gel. It slows digestion,
      lowers LDL cholesterol, and stabilizes blood glucose. Found in oats, beans, apples,
      psyllium, and flaxseed.
    </p>
    <p>
      <strong>Insoluble fiber</strong> doesn&rsquo;t dissolve. It adds bulk to stool and
      speeds transit time. Found in wheat bran, whole grains, nuts, and vegetable skins.
    </p>
    <p>
      You need both. Most whole plant foods contain a mix, so eating a variety handles the
      ratio automatically.
    </p>

    <h2>3. The cheapest 10g of fiber</h2>
    <ul>
      <li>1/2 cup (100g) cooked black beans: 7.5g</li>
      <li>1/2 cup (100g) cooked lentils: 8g</li>
      <li>1 cup (80g) raspberries: 8g</li>
      <li>2 tbsp chia seeds: 10g</li>
      <li>1 cup (100g) cooked split peas: 8g</li>
      <li>1 medium pear (with skin): 5.5g</li>
      <li>1 cup (40g) bran cereal: 7g</li>
      <li>1 medium avocado: 10g</li>
    </ul>

    <h2>4. A sample 35g fiber day</h2>
    <pre>{`Breakfast: oats (1 cup) + berries + chia         → 12g
Snack:     apple with skin                         → 4.5g
Lunch:     lentil soup + whole grain bread         → 11g
Snack:     handful of almonds (30g)                → 3.5g
Dinner:    black beans + brown rice + broccoli     → 13g
Total:                                              ~44g`}</pre>
    <p>
      Once you build two or three of these meals into rotation, hitting the target becomes
      automatic.
    </p>

    <h2>5. The ramp-up rule</h2>
    <p>
      Going from 15g to 40g overnight guarantees gas, bloating, and cramping. Increase by
      <strong> 5g per week</strong> and drink more water as you go. Your gut bacteria need
      2-4 weeks to adapt their populations. If you&rsquo;ve been low-fiber for years, plan
      for a one-month ramp. Symptoms during transition are normal, not harmful.
    </p>

    <h2>6. Water scales with fiber</h2>
    <p>
      Fiber absorbs water. Without enough fluid intake, insoluble fiber can actually worsen
      constipation. Rough rule: add 250ml of water for each additional 10g of fiber above
      your baseline. Most people already under-hydrate, so this is a double win.
    </p>

    <h2>7. Beans are the highest-leverage food</h2>
    <p>
      One cup of cooked beans provides 12-16g of fiber for about $0.40 and 15g of protein.
      No other food category comes close on the cost-fiber-protein triple. Canned beans
      (drained and rinsed) keep 90% of the fiber of home-cooked. Lentils cook in 20 minutes
      with no soaking. If you add one cup of beans per day, you&rsquo;re already halfway
      to 30g.
    </p>

    <h2>8. Fruit: eat whole, not juiced</h2>
    <p>
      Orange juice has essentially no fiber. A whole orange has 3g. Apple juice: 0g. Apple
      with skin: 4.5g. Juicing strips the exact part of the plant you want. Smoothies are
      better than juice (fiber stays intact) but still cause faster sugar absorption than
      chewing. For fruit, chew first.
    </p>

    <h2>9. Supplements as a backup, not a base</h2>
    <p>
      Psyllium husk is the best-studied fiber supplement: 1 tbsp provides ~5g of mostly
      soluble fiber and reliably lowers LDL. Useful as a top-up or for specific goals
      (cholesterol, IBS). But it doesn&rsquo;t replace the micronutrients, polyphenols, and
      resistant starch that come with whole plant foods. Supplements should add to a
      plant-heavy diet, not substitute for it.
    </p>

    <h2>10. &ldquo;High-fiber&rdquo; label math</h2>
    <p>
      US FDA rules: &ldquo;high fiber&rdquo; = 5g+ per serving; &ldquo;good source&rdquo; =
      2.5-4.9g. But serving sizes are often unrealistic (30g of cereal, 1 slice of bread).
      Check per-100g fiber content instead. A rule of thumb for whole grains: aim for
      <strong> at least 3g of fiber per 100 kcal</strong> or a carb-to-fiber ratio under 10.
    </p>

    <h2>11. Common mistakes</h2>
    <ul>
      <li>
        <strong>Assuming &ldquo;whole grain&rdquo; means high fiber.</strong> Many breads
        have 2g per slice — barely better than white. Look for 5g+ per 100g.
      </li>
      <li>
        <strong>Relying on salad.</strong> A big salad is maybe 4-6g of fiber. Useful, but
        beans and oats do more per plate.
      </li>
      <li>
        <strong>Peeling everything.</strong> Most of an apple, pear, cucumber, or potato&rsquo;s
        fiber lives in the skin. Wash, don&rsquo;t peel.
      </li>
      <li>
        <strong>Ramping too fast.</strong> Bloating and abandonment is the usual failure
        mode. 5g per week is the speed limit.
      </li>
      <li>
        <strong>Forgetting water.</strong> Fiber without fluid causes the exact problem
        fiber is supposed to fix.
      </li>
    </ul>

    <h2>12. Run the numbers</h2>
    <p>
      Use the calculator to set your target based on your calorie intake, then track a week
      of meals to see where you land. Most people are shocked by how few grams a typical
      day contains.
    </p>
    <p>
      <a href="/tools/fiber-intake-calculator">Fiber intake calculator</a>
      <a href="/tools/carbohydrate-calculator">Carbohydrate calculator</a>
      <a href="/tools/calorie-calculator">Calorie calculator</a>
    </p>
  </>
);
