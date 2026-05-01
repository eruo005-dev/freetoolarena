import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Treats are a tool for training, bonding, and dental help &mdash; not a fourth meal. The
    fastest way to overshoot daily calories on an otherwise healthy dog is to free-pour the
    treat jar. The veterinary rule of thumb &mdash; the 10% rule &mdash; gives you a clean
    daily budget and keeps the rest of the food doing the nutritional work it&rsquo;s
    designed to do.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The 10% rule, plain English</h2>
    <p>
      Treats should make up no more than 10% of total daily calories. The remaining 90% comes
      from a balanced complete-and-balanced diet (kibble, fresh, raw, however you feed). The
      AAFCO and AAHA both back this number because complete diets are formulated assuming
      that&rsquo;s where most calories are coming from. Push treats much past 10% and you
      start short-changing the dog on micronutrients while increasing total energy intake
      &mdash; the perfect setup for slow weight gain.
    </p>

    <h2>How to find your dog&rsquo;s actual budget</h2>
    <p>
      Start with resting energy requirement (RER), then multiply by an activity factor:
    </p>
    <ul>
      <li><strong>RER</strong> = 70 &times; (body weight in kg)<sup>0.75</sup></li>
      <li><strong>Daily energy requirement (DER)</strong> = RER &times; activity factor</li>
      <li><strong>Treat budget</strong> = DER &times; 0.10</li>
    </ul>
    <p>
      Activity factors run roughly 1.2 (low: senior, neutered, couch dog), 1.6 (moderate:
      daily walks), 1.8 (active: working/sporting/intact). Pregnant, nursing, growing puppies,
      and underweight rescues need special handling &mdash; ask your vet.
    </p>

    <p>
      A 40-pound moderately active adult dog: ~18 kg, RER &asymp; 612 kcal, DER &asymp; 980 kcal,
      treat budget &asymp; 98 kcal/day. That&rsquo;s about one bully stick, three medium training
      sessions worth of small biscuits, or a quarter cup of plain canned pumpkin.
    </p>

    <h2>Watch out for hidden calorie bombs</h2>
    <ul>
      <li><strong>Bully sticks and rawhides:</strong> 80&ndash;120 kcal each &mdash; that&rsquo;s
        the whole budget for a small dog.</li>
      <li><strong>Cheese:</strong> 110 kcal per ounce &mdash; the most over-fed treat in dog
        ownership.</li>
      <li><strong>Peanut butter:</strong> 95 kcal per tablespoon. Useful for hiding pills, but
        a teaspoon is enough.</li>
      <li><strong>Dental chews like Greenies or Dentastix:</strong> 30&ndash;100 kcal each
        depending on size. Track them.</li>
      <li><strong>Table scraps:</strong> a single chicken thigh skin can blow the daily
        budget for a small breed.</li>
    </ul>

    <h2>Low-calorie alternatives that work</h2>
    <p>
      For training-volume work &mdash; where you&rsquo;re handing out 50&ndash;100 reinforcers
      in a session &mdash; switch to ultra-low-calorie options so the count doesn&rsquo;t
      blow up:
    </p>
    <ul>
      <li>Plain training treats labeled &ldquo;1 kcal each&rdquo; or &ldquo;low cal&rdquo;
        (3&ndash;5 kcal/piece is realistic).</li>
      <li>Frozen blueberries (1 kcal each) &mdash; great in summer.</li>
      <li>Carrot sticks (4 kcal per medium baby carrot, satisfying to chew).</li>
      <li>Plain rice cakes broken into quarters (~9 kcal each).</li>
      <li>Cucumber rounds (negligible calories).</li>
      <li>A small portion of the dog&rsquo;s normal kibble pulled from the day&rsquo;s ration
        &mdash; zero net calorie impact.</li>
    </ul>

    <h2>Foods to never give a dog</h2>
    <p>
      The 10% rule applies to <em>safe</em> treats. Some human foods are toxic regardless of
      portion size:
    </p>
    <ul>
      <li>Chocolate &mdash; theobromine is toxic, dark chocolate especially.</li>
      <li>Grapes and raisins &mdash; can cause acute kidney failure.</li>
      <li>Onions, garlic, leeks, chives &mdash; allium toxicity damages red blood cells.</li>
      <li>Xylitol (sweetener in sugar-free gum, peanut butter, baking) &mdash; severe insulin
        spike, often fatal.</li>
      <li>Macadamia nuts &mdash; cause weakness and tremors.</li>
      <li>Cooked bones &mdash; splinter and perforate. Raw, large recreational bones are a
        separate (and debated) topic.</li>
      <li>Raw bread dough &mdash; expands in the stomach and ferments alcohol.</li>
    </ul>
    <p>
      If you&rsquo;re unsure about a food, the ASPCA Animal Poison Control hotline (888-426-4435)
      is staffed 24/7. There may be a fee, but it&rsquo;s far cheaper than an ER visit.
    </p>

    <h2>Adjusting for weight loss</h2>
    <p>
      If your dog needs to drop weight, the protocol is to reduce <em>total</em> calories by
      roughly 10&ndash;20% and keep the treat fraction at or below 10% of the new total &mdash;
      not the old total. Switching to lower-calorie treats and reducing the volume of meals
      is more effective than abruptly cutting treats to zero, because the begging behavior
      that triggered overfeeding doesn&rsquo;t resolve when the dog is hungry. Discuss any
      meaningful weight-loss plan with your vet first.
    </p>

    <h2>Run the math on your dog</h2>
    <p>
      Our <a href="/tools/dog-treat-calorie-budget">dog treat calorie budget calculator</a>
      takes weight and activity level and returns the daily calorie need plus the 10% treat
      cap. It also lists 12 common treats with how many of each fit under that cap so you
      can pick a strategy without doing the math each time.
    </p>
  </>
);
