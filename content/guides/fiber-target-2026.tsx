import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Fiber is the most-undersold nutrient on the gym Twitter circuit. While protein dominates discussion, the
    average American gets 15g/day vs the recommended 25-38g. The downstream effects matter more than people realize.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The actual targets</h2>
    <ul>
      <li><strong>Women:</strong> 25g/day</li>
      <li><strong>Men:</strong> 38g/day</li>
      <li><strong>Over 50:</strong> 21g (women) / 30g (men) &mdash; calorie-adjusted</li>
    </ul>
    <h2>Why hitting it matters</h2>
    <ul>
      <li>10g/day fiber correlates with 10% lower mortality (multiple cohorts).</li>
      <li>Improves glycemic response: fiber + carbs spike blood sugar less than carbs alone.</li>
      <li>Feeds gut microbiome &mdash; downstream effects on mood, immunity, inflammation.</li>
      <li>Satiety: high-fiber foods are harder to overeat.</li>
    </ul>
    <h2>Easy wins</h2>
    <ul>
      <li>Beans + lentils: 12-15g per cup.</li>
      <li>Berries: 8g per cup raspberries.</li>
      <li>Chia seeds: 10g per 2 tbsp.</li>
      <li>Whole oats: 4g per half-cup dry.</li>
      <li>Avocado: 10g per medium fruit.</li>
      <li>Veggies in volume &mdash; broccoli, brussels, peppers all 5-8g per generous serving.</li>
    </ul>
    <h2>Mistakes</h2>
    <ul>
      <li>Adding 30g of fiber overnight &mdash; your gut will revolt. Add 5g/day per week.</li>
      <li>Relying on fiber bars (mostly added isolates that don&rsquo;t deliver the same benefits).</li>
      <li>Skipping water intake &mdash; high fiber + low water = constipation.</li>
    </ul>
  </>
);
