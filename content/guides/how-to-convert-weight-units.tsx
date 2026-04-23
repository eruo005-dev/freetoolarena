import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Weight conversion hides a surprising amount of nuance behind what looks like simple
      multiplication. Mass and weight are technically different&mdash;weight is the force
      gravity exerts on mass, mass is the amount of matter&mdash;but in daily use the two
      words are used interchangeably when gravity is approximately constant (i.e., on Earth).
      Beyond that, pounds come in two flavors (avoirdupois for everyday, troy for precious
      metals), ounces in three (avoirdupois, troy, fluid), and grains show up in ammunition
      and pharmaceutical contexts. Kitchen scales use grams; bathroom scales use pounds or
      kilograms depending on the country; shipping uses kilograms or pounds; bullets use
      grains; gold uses troy ounces. This guide covers metric and imperial mass units, the
      troy versus avoirdupois distinction, grains, carats, and where each is the professional
      standard.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Mass versus weight</h2>
    <p>
      Scientifically, <strong>mass</strong> is the amount of matter in an object, measured in
      kilograms. <strong>Weight</strong> is the force gravity exerts on that mass, measured in
      newtons. On Earth, 1 kg of mass weighs about 9.81 N. Outside physics class, people say
      &ldquo;weight&rdquo; and mean &ldquo;mass&rdquo;&mdash;your bathroom scale reads a force
      and converts internally. On the Moon, 1 kg of mass weighs about 1.6 N (your scale would
      read lower), but the mass is unchanged. For Earth-bound conversion, the distinction
      almost never matters; for aerospace or lunar contexts it absolutely does.
    </p>

    <h2>The metric ladder</h2>
    <pre>{`1 tonne (metric ton) = 1,000 kg = 1,000,000 g
1 kilogram (kg)      = 1,000 g
1 gram (g)           = 1,000 mg (milligrams)
1 mg                 = 1,000 µg (micrograms)

Note: the "metric ton" is the tonne, 1,000 kg.
The US "short ton" is 2,000 lb (about 907 kg).
The UK "long ton" is 2,240 lb (about 1,016 kg).`}</pre>

    <h2>The imperial ladder (avoirdupois)</h2>
    <p>
      Avoirdupois is the everyday system used for grocery scales, body weight, shipping, and
      cooking in the US.
    </p>
    <pre>{`1 pound (lb)  = 16 ounces (oz)
1 stone       = 14 pounds  (UK body weight)
1 short ton   = 2,000 lb   (US)
1 long ton    = 2,240 lb   (UK)
1 ounce       = 437.5 grains
1 pound       = 7,000 grains`}</pre>

    <h2>Metric &harr; imperial</h2>
    <pre>{`1 kg      = 2.20462 lb
1 lb      = 0.45359 kg  (exact: 0.45359237)
1 oz      = 28.3495 g
1 g       = 0.03527 oz
1 stone   = 6.35 kg

Memorable approximations:
  kg → lb: multiply by 2.2
  lb → kg: divide by 2.2 (or multiply by 0.45)
  oz → g: multiply by 28.35
  g → oz: divide by 28.35`}</pre>
    <p>
      The exact conversion was fixed in 1959 by international agreement: 1 pound = 0.45359237
      kg. Every other avoirdupois conversion follows from that.
    </p>

    <h2>Troy vs. avoirdupois</h2>
    <p>
      Precious metals (gold, silver, platinum) are weighed in <strong>troy</strong> units,
      which are different from the everyday avoirdupois system.
    </p>
    <pre>{`1 troy ounce (oz t) = 31.1035 g  (heavier than a regular ounce!)
1 regular ounce     = 28.3495 g
1 troy pound        = 12 troy ounces = 373.24 g  (lighter than a regular pound!)
1 regular pound     = 16 ounces = 453.59 g`}</pre>
    <p>
      A troy ounce is about 10% heavier than an avoirdupois ounce, but a troy pound is about
      18% <em>lighter</em> than an avoirdupois pound because it contains only 12 (not 16) troy
      ounces. This is why gold prices quoted per ounce sound different in different contexts.
      The London Bullion Market always means troy ounces.
    </p>

    <h2>Grains</h2>
    <p>
      A grain is 64.79891 milligrams, roughly the mass of a single grain of barley. Modern
      uses: <strong>ammunition</strong> (bullet weights, e.g. 55 grain 5.56 mm), <strong>
      pharmaceuticals</strong> (some older drug doses, e.g. aspirin was historically 5 grains),
      and <strong>archery</strong> (arrow weights). 437.5 grains make an avoirdupois ounce;
      480 grains make a troy ounce.
    </p>

    <h2>Carats and karats</h2>
    <p>
      A <strong>carat</strong> (gemstones) is 200 milligrams. A 1-carat diamond weighs 0.2
      grams. A <strong>karat</strong> (gold purity) is a fraction out of 24: 24-karat gold is
      99.9% pure, 18-karat is 75% pure. Same word, two completely different meanings. Never
      confuse a 5-carat gemstone with 5-karat gold; the first is size, the second is purity.
    </p>

    <h2>Cooking measurements</h2>
    <p>
      US recipes often use volume (cups, tablespoons) for solids, which is imprecise because
      flour packs differently. European recipes use weight (grams), which is reproducible.
      Common conversions:
    </p>
    <pre>{`1 cup all-purpose flour ≈ 125 g
1 cup granulated sugar  ≈ 200 g
1 cup butter           = 227 g  (2 sticks)
1 stick butter         = 113 g = 4 oz
1 oz                   = 28.35 g`}</pre>
    <p>
      Serious bakers use digital scales and weight-based recipes for consistency. Volume
      measurements of solids can vary by 20% depending on packing.
    </p>

    <h2>Shipping and cargo</h2>
    <p>
      Shipping uses <strong>gross weight</strong> (package plus contents), <strong>net weight
      </strong> (contents only), and <strong>tare weight</strong> (container only). Air freight
      also uses <strong>dimensional weight</strong>, which charges by volume if the package is
      light relative to its size. A 30-inch cube weighing 5 pounds might be billed as 50
      pounds. Dimensional weight is typically calculated as length &times; width &times;
      height divided by a factor (139 for US domestic, 166 international, varies by carrier).
    </p>

    <h2>Body weight</h2>
    <p>
      The US uses pounds. The UK uses stones and pounds (&ldquo;12 stone 5&rdquo; = 173 lb).
      Most of the rest of the world uses kilograms. BMI calculations demand consistent
      units&mdash;BMI = kg / m&sup2;, and the imperial version is different (lb /
      in&sup2; &times; 703). Mixing units in a BMI calculation is a common source of laughable
      results.
    </p>

    <h2>Scientific conventions</h2>
    <p>
      SI uses the kilogram. Chemistry uses grams and molar masses. Physics uses kilograms in
      formulas and tolerates grams for small samples. Pharmacology uses milligrams and
      micrograms for drug doses (mcg, mg, g), where a factor-of-1000 error is a dispensing
      disaster. Always carry units through calculations; never divide a gram by a kilogram
      without noting the factor-of-1000.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using troy ounces when you meant avoirdupois.</strong> A troy ounce is 31.1 g,
      avoirdupois is 28.35 g. A gold price of $2,000 per troy ounce and the same price per
      avoirdupois ounce differ by 10%.
    </p>
    <p>
      <strong>Assuming a &ldquo;ton&rdquo; is universal.</strong> Metric tonne = 1,000 kg. US
      short ton = 907 kg. UK long ton = 1,016 kg. Shipping quotes often don&rsquo;t specify,
      and a 10% error on cargo is expensive.
    </p>
    <p>
      <strong>Confusing carats and karats.</strong> Different spellings, different meanings.
      A 14-karat gold ring is gold purity (58.3%). A 14-carat ring is a gem that weighs 2.8
      grams. Jewelers use both contexts and non-experts get them backwards.
    </p>
    <p>
      <strong>Off-by-1000 in pharmacology.</strong> mg and mcg differ by 1,000&times;. A 500
      mg aspirin isn&rsquo;t a 500 mcg aspirin (the latter would be ineffective). Medication
      errors from unit confusion are one of the most tracked and most fatal classes of
      hospital mistakes.
    </p>
    <p>
      <strong>Using volume to measure flour.</strong> A &ldquo;cup&rdquo; of flour ranges from
      110 g to 150 g depending on scooping technique. Weigh it.
    </p>
    <p>
      <strong>Forgetting gravity matters for weight-but-not-mass.</strong> On the Moon,
      objects feel lighter because weight is smaller, but the mass (and inertia) is unchanged.
      Hit yourself in the face with a moon rock and it still breaks your nose.
    </p>
    <p>
      <strong>Ignoring dimensional weight in shipping.</strong> A lightweight but bulky package
      gets billed by volume. Knowing this before you quote a customer saves painful invoice
      surprises.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Use our <a href="/tools/weight-converter">weight converter</a> for metric, imperial,
      troy, and grain conversions without hunting for the exact factor. Pair it with the{" "}
      <a href="/tools/unit-converter">unit converter</a> when your problem involves multiple
      dimensions at once, and the{" "}
      <a href="/tools/cooking-converter">cooking converter</a> when the recipe mixes weight
      and volume for ingredients.
    </p>
  </>
);
