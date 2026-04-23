import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Volume is where unit confusion gets expensive, because the US and UK gallon are different
      (US gallon = 3.785 L, UK gallon = 4.546 L) and neither is the liter, and cooking
      measures split further into fluid ounces that aren&rsquo;t the same as weight ounces.
      Someone halving a British recipe in an American kitchen can easily be 20% off
      ingredient quantities without noticing why the cookies came out wrong. Shipping volumes
      use cubic feet and cubic meters, which require cubing linear conversion factors. Fluid
      versus dry measures in US cooking add another layer: a dry cup and a liquid cup have
      slightly different reference standards even though most people use them interchangeably.
      This guide covers metric volume, US and UK imperial volume, cooking measurements, US
      vs UK gallons, fluid vs dry distinctions, and the cubic volume calculations that come
      up in shipping and construction.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Metric volume</h2>
    <pre>{`1 cubic meter (m³) = 1,000 liters (L) = 1,000,000 mL = 1,000,000 cm³
1 liter (L)        = 1,000 mL = 1,000 cm³ = 1 dm³
1 mL               = 1 cm³
1 kL (kiloliter)   = 1,000 L = 1 m³`}</pre>
    <p>
      A liter is defined as exactly one cubic decimeter (10 cm on each side). One milliliter
      equals one cubic centimeter exactly&mdash;this equivalence is why medical dosing and lab
      work use cc and mL interchangeably. For water at 4&thinsp;&deg;C, 1 mL weighs exactly 1 g,
      making water the mental calibration point between mass and volume.
    </p>

    <h2>US imperial volume</h2>
    <pre>{`1 US gallon (gal)   = 4 quarts (qt) = 8 pints (pt) = 16 cups = 128 fl oz
1 quart             = 2 pints = 4 cups = 32 fl oz
1 pint              = 2 cups = 16 fl oz
1 cup               = 8 fl oz = 16 tbsp = 48 tsp
1 fluid ounce (fl oz)= 2 tbsp = 6 tsp
1 tablespoon (tbsp) = 3 teaspoons (tsp) = 0.5 fl oz

Exact: 1 US gallon = 3.785411784 L`}</pre>

    <h2>UK imperial volume</h2>
    <pre>{`1 UK gallon = 4 UK quarts = 8 UK pints = 160 UK fl oz
1 UK pint   = 20 UK fl oz   (not 16!)
1 UK fl oz  = 28.4131 mL    (not 29.5735 like US)

Exact: 1 UK gallon = 4.54609 L

Gallons: US 3.785 L vs UK 4.546 L — differ by 20%
Pints:   US 473 mL vs UK 568 mL — differ by 20%`}</pre>
    <p>
      The US pint is 16 fluid ounces; the UK pint is 20 fluid ounces. The US fluid ounce and
      UK fluid ounce are also slightly different sizes. For beer, wine, and home recipes, a
      20% difference is huge. Always check whether a recipe or a pub is using US or UK
      measures.
    </p>

    <h2>Metric &harr; US imperial</h2>
    <pre>{`1 US gallon = 3.7854 L
1 L         = 0.2642 US gal
1 US qt     = 0.9464 L     (close to a liter!)
1 US cup    = 236.6 mL
1 US fl oz  = 29.5735 mL
1 tbsp      = 14.787 mL
1 tsp       = 4.929 mL     (commonly rounded to 5 mL)

Memorable:
  1 quart ≈ 1 liter (off by 5%)
  1 cup ≈ 240 mL (off by 1.5%)
  1 tbsp ≈ 15 mL
  1 tsp ≈ 5 mL`}</pre>

    <h2>Fluid ounces vs weight ounces</h2>
    <p>
      A fluid ounce measures volume; a weight ounce measures mass. For water, 1 fl oz weighs
      about 1 oz (the system was designed around this). For denser liquids (honey, syrup) 1
      fl oz weighs more; for lighter (alcohol, oil) it weighs less. &ldquo;8 ounces&rdquo; on
      a nutrition label is weight; &ldquo;8 ounces&rdquo; on a measuring cup is volume. They
      coincide numerically only for water.
    </p>

    <h2>Dry vs liquid measures (US cooking)</h2>
    <p>
      US cooking has two cup standards. The <strong>liquid cup</strong> (8 fl oz = 237 mL) is
      designed with a spout for pouring. The <strong>dry cup</strong> (also ~237 mL in volume
      but defined by the &ldquo;level off&rdquo; measure) is used for flour and sugar. In
      practice, the volumes are equivalent; the shape differs so dry ingredients can be leveled
      with a knife. Some older references cite a 231 vs 237 mL distinction, but modern usage
      treats them as the same 237 mL.
    </p>

    <h2>Cubic volume</h2>
    <p>
      For 3D volumes (shipping, construction, tank sizes), remember to cube the linear
      conversion factor.
    </p>
    <pre>{`1 ft³     = 0.02832 m³
1 m³      = 35.315 ft³
1 yd³     = 27 ft³ = 0.7646 m³

A box 2 ft × 3 ft × 4 ft = 24 ft³ = 0.68 m³
Not 24 × 0.3048 = 7.3 m³ (off by a factor of 35)`}</pre>

    <h2>Cooking conversion table</h2>
    <pre>{`1 tsp    = 5 mL          (approximate)
1 tbsp   = 15 mL = 3 tsp
1/4 cup  = 60 mL = 4 tbsp
1/3 cup  = 80 mL
1/2 cup  = 120 mL
1 cup    = 240 mL
2 cups   = 480 mL (about 1 pint)
4 cups   = 950 mL (about 1 quart ≈ 1 L)
1 gallon = 3.8 L`}</pre>

    <h2>Shipping dimensions</h2>
    <p>
      Shipping companies use cubic feet or cubic meters for volume, sometimes billed as
      dimensional weight (volume-based pricing). A 1 m&sup3; container holds about 35.3 ft&sup3;.
      An intermodal shipping container (20-foot) holds about 33 m&sup3; of cargo. Freight quotes
      usually require length, width, height in the same unit; convert before multiplying.
    </p>

    <h2>Fuel and chemicals</h2>
    <p>
      Gasoline is sold by the US gallon in the US, by the liter almost everywhere else. Jet
      fuel is measured in US gallons, Imperial gallons, and liters depending on the airport,
      and sometimes by weight (pounds or kilograms) for flight planning. Industrial chemicals
      often come in 55-US-gallon drums (208 L) or 200-liter drums (53 US gal)&mdash;different
      containers despite similar appearance.
    </p>

    <h2>Medical dosing</h2>
    <p>
      Medical contexts use mL and cc interchangeably (they&rsquo;re identical by definition).
      Drops (gtt) are roughly 0.05 mL, so 20 drops &asymp; 1 mL, but this varies with dropper
      design. Never substitute volume for a weight-based dose (mg per kg) without knowing the
      concentration&mdash;a 1 mL pediatric dose of acetaminophen can be 100 mg or 160 mg
      depending on the formulation.
    </p>

    <h2>Fluid dram and minim</h2>
    <p>
      Older pharmaceutical and apothecary texts use <strong>fluid drams</strong> (1 fl dr =
      1/8 fl oz = 3.7 mL) and <strong>minims</strong> (1/60 fl dr = 0.062 mL). These are
      obsolete in modern practice but still appear on antique bottles and in historical
      recipes.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using US gallons when a recipe calls for UK gallons (or vice versa).</strong> The
      20% difference breaks recipes and inflates fuel bills. Always confirm the origin of the
      measurement.
    </p>
    <p>
      <strong>Applying linear conversion to cubic volume.</strong> 1 m = 3.28 ft, but 1 m&sup3;
      = 35.3 ft&sup3; (cube the factor). Linear conversion of a volume is off by a factor of
      ~11.
    </p>
    <p>
      <strong>Confusing fluid ounces with weight ounces.</strong> They&rsquo;re numerically
      equal only for water. For honey, oil, or flour, the weight and volume ounces diverge.
    </p>
    <p>
      <strong>Mixing US and UK pints.</strong> A US pint is 473 mL; a UK pint is 568 mL.
      Order a pint in London, you get more beer than in New York.
    </p>
    <p>
      <strong>Using volume for baking precision.</strong> A cup of flour ranges from 110 g to
      150 g depending on scoop technique. Weight measurements are reproducible; volume
      isn&rsquo;t.
    </p>
    <p>
      <strong>Forgetting tablespoons and teaspoons aren&rsquo;t universal.</strong> Australian
      tablespoons are 20 mL (not 15); Canadian and UK tablespoons are 15 mL. Recipes from
      Australia need adjustment.
    </p>
    <p>
      <strong>Misreading a gas mileage conversion.</strong> US MPG and UK MPG differ because
      the gallons differ. 30 MPG (US) is 36 MPG (UK) is 7.84 L/100km. European and North
      American fuel economy numbers are not directly comparable without converting.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Stop guessing whether a recipe means US or UK; drop your value into our{" "}
      <a href="/tools/volume-converter">volume converter</a> and get every standard unit at
      once. Pair it with the <a href="/tools/cooking-converter">cooking converter</a> for
      recipe-specific conversions involving weight and volume together, and the{" "}
      <a href="/tools/weight-converter">weight converter</a> for the flour-by-cup versus
      flour-by-gram problem.
    </p>
  </>
);
