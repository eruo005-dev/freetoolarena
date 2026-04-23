import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Intermittent fasting is eating within a restricted window each day and
      not eating for the rest. It&rsquo;s not a diet in the traditional
      sense &mdash; there&rsquo;s no prescribed food list &mdash; just a
      schedule. People use it to simplify meal planning, manage weight,
      improve metabolic markers, or get the convenience of skipping
      breakfast without feeling guilty. The research case is real but more
      modest than influencer videos suggest; the main mechanism for weight
      change is still calorie reduction, not fasting magic. This guide
      covers the common schedules (16:8, 18:6, OMAD), what actually breaks
      a fast, the benefits and risks, how to ramp in sensibly, and the
      people who should skip this approach entirely.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The most common schedules</h2>
    <p>
      Intermittent fasting (IF) is a family, not a single protocol:
    </p>
    <pre>{`16:8     16-hour fast, 8-hour eating window     most popular, easiest
18:6     18-hour fast, 6-hour eating window     more strict
20:4     20-hour fast, 4-hour window             "warrior diet"
OMAD     one meal a day, ~1-hour window         aggressive
5:2      normal eating 5 days, ~500 kcal 2 days  weekly cadence
ADF      alternate day fasting                    aggressive, hard to sustain
24-hr    full-day fast 1-2x per week              episodic`}</pre>
    <p>
      Most people who stick with IF land on 16:8 or a lighter 14:10. The
      stricter variants work if you like them but don&rsquo;t deliver
      proportionally more benefit.
    </p>

    <h2>How 16:8 actually looks</h2>
    <pre>{`Option A (skip breakfast)
  Eat:  12:00 PM - 8:00 PM
  Fast: 8:00 PM - 12:00 PM next day
  During fast: water, black coffee, plain tea

Option B (early eaters)
  Eat:  8:00 AM - 4:00 PM
  Fast: 4:00 PM - 8:00 AM next day`}</pre>
    <p>
      Option B aligns better with circadian rhythms and tends to show
      slightly better metabolic markers in studies. Option A is easier
      socially for most people.
    </p>

    <h2>What actually breaks a fast</h2>
    <p>
      Strict definition: anything with calories. Practical definition:
      anything that causes a meaningful insulin response.
    </p>
    <pre>{`Breaks a fast: any food, sweetened drinks, milk in coffee,
               juice, broth, gum with sugar alcohols, fruit

Usually okay:  water, black coffee, plain tea, seltzer,
               trace electrolytes (pinch of salt)

Gray area:     stevia, diet soda (no calories but possible
               insulin response), MCT oil (calories but
               minimal insulin impact), bone broth`}</pre>
    <p>
      If your goal is weight management, the strict definition
      doesn&rsquo;t matter &mdash; total calories still drive the
      outcome. If your goal is autophagy or fasting&rsquo;s claimed
      metabolic effects, stick to the strict list.
    </p>

    <h2>Claimed benefits</h2>
    <ul>
      <li>Weight loss &mdash; real, but via calorie reduction from the smaller window</li>
      <li>Improved insulin sensitivity &mdash; modest, similar to continuous caloric restriction</li>
      <li>
        Reduced visceral fat &mdash; some trials show slight advantage over
        non-fasting equicaloric diets
      </li>
      <li>
        Cellular autophagy &mdash; demonstrated in animal models; human
        evidence is thinner, and requires longer fasts than 16 hours
      </li>
      <li>Simpler meal planning &mdash; undervalued but real</li>
      <li>Stable energy (in habituated fasters) &mdash; anecdotally consistent</li>
    </ul>

    <h2>Claimed benefits that don&rsquo;t hold up</h2>
    <p>
      <strong>Dramatic fat loss over equivalent calorie deficits.</strong>{" "}
      Meta-analyses show IF matches, not beats, continuous calorie
      restriction on body composition.
    </p>
    <p>
      <strong>Massive growth-hormone spike.</strong> Real but short-lived
      and clinically insignificant for most people.
    </p>
    <p>
      <strong>Works for hypertrophy/muscle gain.</strong> Hard to hit
      protein and calorie targets in a short window; not optimal for
      aggressive gain goals.
    </p>

    <h2>The beginner ramp</h2>
    <p>
      Jumping straight to 16:8 from grazing all day usually backfires with
      hunger, irritability, and binging at the window open. Ease in:
    </p>
    <pre>{`Week 1:  12:12   (stop eating 3 hours before bed)
Week 2:  14:10
Week 3:  15:9
Week 4:  16:8`}</pre>
    <p>
      Most people acclimatize within two weeks. Hunger in the morning
      fades; coffee and water handle the first 3&ndash;4 hours.
    </p>

    <h2>What to eat in the window</h2>
    <p>
      Fasting isn&rsquo;t a free pass. If your 8-hour window is pizza and
      ice cream, you won&rsquo;t lose weight even with a perfect fasting
      schedule. Structure the window:
    </p>
    <ul>
      <li>Prioritize protein &mdash; 0.8&ndash;1 g per lb body weight across meals</li>
      <li>Include fiber &mdash; keeps satiety through the fast</li>
      <li>Carbs and fat based on your overall calorie target</li>
      <li>Avoid huge blood-sugar swings at window-open (slam of refined carbs on an empty stomach is uncomfortable)</li>
    </ul>

    <h2>Exercise and fasting</h2>
    <p>
      Fasted cardio is fine and can work well for habituated people.
      Fasted lifting is doable but sub-optimal for strength gains; if
      strength is a priority, break the fast before heavy sessions.
    </p>
    <p>
      Post-workout meal: protein within a couple of hours matters more
      than in the 30-minute &ldquo;anabolic window&rdquo; panic of the
      90s. Don&rsquo;t end a hard session at 10 PM right when your fast
      is starting &mdash; it compromises recovery.
    </p>

    <h2>Risks and side effects</h2>
    <p>
      First 2&ndash;3 weeks are the roughest:
    </p>
    <ul>
      <li>Headaches (usually dehydration or caffeine withdrawal)</li>
      <li>Irritability at the end of the fast window</li>
      <li>Sleep disruption if eating too close to bed</li>
      <li>Digestive adjustment when meals become larger</li>
      <li>Lightheadedness with electrolyte depletion</li>
    </ul>
    <p>
      Most issues resolve with better timing, salt, and water. If
      symptoms persist past 3&ndash;4 weeks, IF may not be right for
      you.
    </p>

    <h2>Who should not do IF</h2>
    <p>
      Medical caution or contraindication for:
    </p>
    <ul>
      <li>History of eating disorders (any restriction can re-trigger)</li>
      <li>Pregnancy or breastfeeding</li>
      <li>Type 1 diabetes or insulin-dependent T2 (without medical guidance)</li>
      <li>Underweight or undernourished individuals</li>
      <li>Children and teens</li>
      <li>People on medications that require food</li>
      <li>Competitive athletes in season (hard to fuel performance)</li>
    </ul>

    <h2>Women and IF</h2>
    <p>
      Some women report menstrual cycle disruption on strict IF (long
      fasts or under-eating). If you see cycle changes, shorten the
      fast window or add kilocalories. Research here is mixed and
      individual response varies &mdash; pay attention to your body
      rather than the protocol.
    </p>

    <h2>Coffee, tea, and electrolytes</h2>
    <p>
      Plain black coffee and plain tea are standard during the fast.
      Milk, cream, oat milk break the fast by the strict definition
      (and spike insulin). Artificial sweeteners are a gray zone; some
      research suggests they can break insulin-response fasts.
    </p>
    <p>
      A pinch of salt in water during a longer fast helps. Commercial
      electrolyte drinks usually contain sugar &mdash; check the
      label.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Jumping straight to OMAD.</strong> Almost guaranteed to
      rebound. Ease in over weeks.
    </p>
    <p>
      <strong>Eating garbage in the window.</strong> IF is a schedule,
      not a diet. If your overall intake is low-quality or
      over-calorie, IF won&rsquo;t save you.
    </p>
    <p>
      <strong>Not drinking enough.</strong> Most &ldquo;fasting
      headaches&rdquo; are dehydration. Water and salt.
    </p>
    <p>
      <strong>Making the window too short.</strong> Trying to eat 2,800
      kcal in a 4-hour window is uncomfortable and usually undereats.
    </p>
    <p>
      <strong>Ignoring protein.</strong> Easy to under-eat protein on
      OMAD or 18:6. Budget it into the first meal.
    </p>
    <p>
      <strong>Using IF as a binge-restrict cycle.</strong> Restrict
      &ndash; binge &ndash; restrict is disordered, not disciplined.
      If this is your pattern, step away from IF.
    </p>
    <p>
      <strong>Ignoring how you feel.</strong> If 16:8 makes you
      miserable for three months, find another tool. There is no
      benefit worth persistent misery.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Track your eating window with the{" "}
      <a href="/tools/fasting-timer">fasting timer</a>. Set your
      calorie target for the window with the{" "}
      <a href="/tools/calorie-calculator">calorie calculator</a> (IF
      still follows TDEE math), and watch water intake with the{" "}
      <a href="/tools/water-intake-calculator">water intake calculator</a>{" "}
      since proper hydration is the biggest single lever for feeling
      good during the fast.
    </p>
  </>
);
