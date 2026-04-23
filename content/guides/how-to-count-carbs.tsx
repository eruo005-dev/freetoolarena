import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Carb counting started as a survival tool for type 1 diabetics and has since become
      standard practice for anyone managing blood sugar, weight, athletic performance, or
      a ketogenic diet. The skill is the same: read labels, weigh servings, subtract fiber
      when appropriate, and understand the difference between grams on a package and grams
      in your body. This guide covers total vs net carbs, the glycemic index and glycemic
      load, how diabetic insulin dosing actually works, the 20-50g keto thresholds, and the
      label-reading tricks that catch hidden sugars. By the end, you should be able to
      accurately estimate the carbs in any meal within a few grams.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>1. Total carbs vs net carbs</h2>
    <p>
      <strong>Total carbs</strong> = sugars + starches + fiber + sugar alcohols. That&rsquo;s
      what&rsquo;s printed on the main line of a nutrition label.
    </p>
    <p>
      <strong>Net carbs</strong> = total carbs − fiber − (most) sugar alcohols. This is the
      portion that actually raises blood glucose.
    </p>
    <pre>{`net carbs = total carbs - fiber - sugar alcohols
(US label math; EU labels already exclude fiber)`}</pre>
    <p>
      EU and UK labels list carbs as &ldquo;carbohydrate&rdquo; (already fiber-excluded) and
      &ldquo;of which sugars.&rdquo; US labels list carbs as total and break out fiber
      separately. Same food, different numbers on the box.
    </p>

    <h2>2. Why fiber is subtracted</h2>
    <p>
      Fiber isn&rsquo;t digested by human enzymes. It passes through without raising blood
      glucose, so it doesn&rsquo;t require insulin. For diabetics and keto dieters, subtract
      the full fiber amount if it&rsquo;s &gt; 5g per serving, or half if &lt; 5g (common
      clinical practice).
    </p>

    <h2>3. Sugar alcohols: partial subtraction</h2>
    <p>
      Erythritol, xylitol, maltitol, and sorbitol are counted in &ldquo;total carbs&rdquo;
      but absorbed inconsistently. Guidelines:
    </p>
    <ul>
      <li>Erythritol: subtract fully (0 glycemic impact)</li>
      <li>Xylitol, sorbitol: subtract fully for most adults</li>
      <li>Maltitol: subtract only half &mdash; it does raise blood sugar</li>
      <li>Allulose: subtract fully (not metabolized as a carb)</li>
    </ul>

    <h2>4. Glycemic index vs glycemic load</h2>
    <p>
      <strong>Glycemic index (GI)</strong> ranks how fast a fixed 50g dose of a food&rsquo;s
      carbs raises blood sugar versus pure glucose (100). A watermelon GI is 76, white bread
      is 75, lentils are 32.
    </p>
    <p>
      <strong>Glycemic load (GL)</strong> corrects for portion size:
    </p>
    <pre>{`GL = (GI × carbs per serving) / 100`}</pre>
    <p>
      Watermelon has a high GI but only 11g of carbs per cup, so GL = 8 (low). A bagel has
      medium GI but 50g carbs, so GL = 35 (very high). <strong>GL is the number that
      matters</strong> for meal planning. Anything &lt;10 is low, 11-19 is medium, 20+ is
      high.
    </p>

    <h2>5. Diabetic carb counting and insulin ratios</h2>
    <p>
      Type 1 diabetics dose insulin based on an <strong>insulin-to-carb ratio</strong>
      (e.g., 1 unit per 10g of carbs) plus a correction factor for current blood glucose.
      Miscounting by 15g can mean a 1.5-unit error — enough to trigger a hypo. Type 2
      diabetics on metformin alone don&rsquo;t need this precision but benefit from keeping
      meals under ~45-60g carbs each. Always work with a certified diabetes educator when
      setting ratios; never copy someone else&rsquo;s.
    </p>

    <h2>6. Keto thresholds</h2>
    <ul>
      <li>Strict keto: &lt;20g net carbs/day</li>
      <li>Moderate keto: 20-50g net carbs/day</li>
      <li>Low-carb (not keto): 50-100g/day</li>
      <li>Standard US/UK diet: 200-300g/day</li>
    </ul>
    <p>
      Ketosis typically kicks in within 2-4 days below 20g. Cheating with a 100g meal knocks
      you out for 1-3 days. Measure with urine strips (first week only — they stop being
      accurate) or blood ketone meters (~$40).
    </p>

    <h2>7. Reading a US nutrition label</h2>
    <p>
      Focus on three lines: serving size, total carbohydrate, dietary fiber. Then:
    </p>
    <pre>{`1. Multiply by actual portion / serving size
2. Subtract fiber (fully)
3. Subtract sugar alcohols per the rules above
4. That is your net carb number`}</pre>
    <p>
      Serving sizes are often ridiculously small. Cereal boxes typically list 30-40g
      servings. A real bowl is 80-100g — so double or triple the numbers.
    </p>

    <h2>8. Hidden carbs and sneaky ingredients</h2>
    <ul>
      <li>Sauces: BBQ, teriyaki, ketchup — 6-15g per tbsp</li>
      <li>Salad dressings: some 7g per 2 tbsp</li>
      <li>Protein bars: 15-30g of mostly sugar</li>
      <li>Flavored yogurts: 20g+ added sugar</li>
      <li>Breaded proteins: 10-15g per piece</li>
      <li>Smoothies: 40-70g carbs in one drink</li>
      <li>Restaurant stir-fry sauce: 25-40g per dish</li>
    </ul>
    <p>
      &ldquo;Healthy&rdquo; doesn&rsquo;t mean low-carb. A granola bowl can top 70g.
    </p>

    <h2>9. Weighing vs eyeballing</h2>
    <p>
      Cooked rice: 45g carbs per cup — but 1 cup varies by 30% depending on how you scoop.
      A kitchen scale ($15) eliminates the guessing. Weigh high-carb staples (rice, pasta,
      bread, cereal, potato) for two weeks to calibrate your eye. After that, estimates
      get reliable within ±10%.
    </p>

    <h2>10. Carbs per common portion</h2>
    <ul>
      <li>1 cup cooked rice (158g): 45g</li>
      <li>1 cup cooked pasta (140g): 43g</li>
      <li>1 medium potato (173g): 37g</li>
      <li>1 slice bread: 15-20g</li>
      <li>1 flour tortilla (10&rdquo;): 35g</li>
      <li>1 banana (medium): 27g</li>
      <li>1 apple (medium): 25g</li>
      <li>1 cup milk: 12g</li>
      <li>1 cup broccoli: 6g (4g net)</li>
      <li>1 cup berries: 15g (8g net)</li>
    </ul>

    <h2>11. Matching carbs to activity</h2>
    <p>
      Carbs fuel anaerobic and high-intensity work. A 90-minute soccer match burns ~200g of
      stored glycogen. If you&rsquo;re sedentary, daily carb needs are much lower. Rough
      bands for athletes: 3-5 g/kg for light training, 5-7 g/kg for moderate, 6-10 g/kg for
      heavy endurance. Align carb timing with workouts (pre, during, post) and cut carbs on
      rest days.
    </p>

    <h2>12. Common mistakes</h2>
    <ul>
      <li>
        <strong>Using &ldquo;cups&rdquo; loosely.</strong> A loose-packed cup and a
        firm-packed cup of rice differ by 50%.
      </li>
      <li>
        <strong>Ignoring cooked vs raw.</strong> 100g raw pasta is ~75g carbs. 100g cooked
        pasta is ~25g carbs. Know which your label references.
      </li>
      <li>
        <strong>Forgetting liquid carbs.</strong> Juice, soda, flavored coffee, and sports
        drinks can add 60g before you notice.
      </li>
      <li>
        <strong>Trusting &ldquo;keto&rdquo; labels.</strong> Keto cookies often use
        maltitol — half-subtract, not full-subtract.
      </li>
      <li>
        <strong>Counting vegetables obsessively.</strong> Non-starchy veg (leafy greens,
        broccoli, peppers) are worth eating freely even on keto.
      </li>
    </ul>

    <h2>13. Run the numbers</h2>
    <p>
      Use the calculator below to plug in your goal (keto, diabetic, athletic, maintenance)
      and calorie target, and get a daily carb number to aim for.
    </p>
    <p>
      <a href="/tools/carbohydrate-calculator">Carbohydrate calculator</a>
      <a href="/tools/macro-calculator">Macro calculator</a>
      <a href="/tools/calorie-calculator">Calorie calculator</a>
    </p>
  </>
);
