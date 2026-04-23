import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Area conversion is sneaky. Everyone knows 1 meter is 3.28 feet, but too many people
      assume 1 square meter is 3.28 square feet. It&rsquo;s actually 10.76 square feet,
      because you have to square the linear conversion factor. This single error&mdash;applying
      a linear factor to a squared quantity&mdash;shows up in real estate listings, contractor
      estimates, and gardening calculators daily. Add in the fact that area has its own
      dedicated units (acres, hectares, square miles) that aren&rsquo;t powers of anything
      familiar, and the confusion multiplies. This guide covers the metric area ladder,
      imperial area units including acres and square miles, hectares as the international
      land standard, why squared conversion factors are squared, how to compute areas of
      rectangular and irregular shapes, and the contexts where each unit is standard.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The core insight: square the linear factor</h2>
    <p>
      When you convert a length from feet to meters, you multiply by 0.3048. When you convert
      an area, you multiply by <code>0.3048<sup>2</sup> = 0.0929</code>. Why? Because area is
      length times length, and each length picks up the conversion factor.
    </p>
    <pre>{`1 ft  = 0.3048 m
1 ft² = 0.3048² m² = 0.0929 m²

1 m  = 3.2808 ft
1 m² = 3.2808² ft² = 10.7639 ft²

A 20 ft × 15 ft room = 300 ft² = 27.87 m²
Not 300 × 0.3048 = 91.4 m² (wrong by a factor of 3.28)`}</pre>

    <h2>Metric area units</h2>
    <pre>{`1 km²         = 1,000,000 m² = 100 hectares
1 hectare (ha)= 10,000 m² = 100 m × 100 m square
1 are (a)     = 100 m²  (rarely used, except in "hectare")
1 m²          = 10,000 cm²
1 cm²         = 100 mm²`}</pre>
    <p>
      The hectare is the workhorse unit for land internationally&mdash;farm sizes, forest
      plots, land-use surveys. It&rsquo;s exactly 10,000 m&sup2; and fits comfortably between
      m&sup2; (too small for land) and km&sup2; (too large for individual parcels).
    </p>

    <h2>Imperial area units</h2>
    <pre>{`1 mi²        = 640 acres
1 acre       = 43,560 ft² = 4,840 yd²
1 yd²        = 9 ft²
1 ft²        = 144 in²
1 in²        = 1/144 ft²

An acre is 660 ft × 66 ft (a historical furlong × chain),
roughly a football field excluding the end zones.`}</pre>

    <h2>Metric &harr; imperial</h2>
    <pre>{`1 m²      = 10.7639 ft²
1 ft²     = 0.0929 m²
1 acre    = 4,046.86 m² = 0.4047 hectare
1 hectare = 2.4711 acres
1 km²     = 0.3861 mi²
1 mi²     = 2.5900 km²

Memorable:
  hectare ≈ 2.5 acres (off by 1%)
  km² ≈ 0.4 mi² (acceptable for rough work)
  m² to ft²: multiply by 10 (off by 7%, good enough for quick estimates)`}</pre>

    <h2>Acres and hectares for land</h2>
    <p>
      The US and UK sell land by the acre. Most of the rest of the world uses the hectare.
      Conversions worth knowing: a quarter-acre lot is about 1,012 m&sup2;. A hectare is about
      2.47 acres. A football field (US) is about 1.32 acres, European football field about
      0.7 hectares. A square mile is 640 acres, which is the historical &ldquo;section&rdquo; in
      US land surveying&mdash;the Public Land Survey grid is built on mile squares divided into
      160-acre quarter-sections.
    </p>

    <h2>Rectangular areas</h2>
    <p>
      For a rectangle, area = length &times; width. Convert one dimension at a time and
      compute the area in the target unit, or compute in the source unit and apply the squared
      factor. The second approach is error-prone if you forget to square the factor.
    </p>
    <pre>{`Room: 12 ft × 15 ft
Area in ft²:  12 × 15 = 180 ft²
Area in m²:   (12 × 0.3048) × (15 × 0.3048) = 3.66 × 4.57 = 16.72 m²
       or:    180 × 0.0929 = 16.72 m²  ✓`}</pre>

    <h2>Irregular areas</h2>
    <p>
      For non-rectangular shapes, split them into rectangles and triangles, or use the
      appropriate formula (circle = &pi;r&sup2;, triangle = &frac12; base &times; height).
      For truly irregular land parcels, surveyors use coordinate geometry (the shoelace
      formula) or GPS-based tools that report area directly.
    </p>

    <h2>Cooking and baking: pan sizes</h2>
    <p>
      A recipe calling for a 9&times;13 inch pan has area 117 in&sup2; = 754 cm&sup2;. An 8&times;8
      square pan is 64 in&sup2; = 413 cm&sup2;. If you scale a recipe between pan sizes, scale
      by the area ratio, not the linear ratio&mdash;doubling an 8-inch round (50 in&sup2;) to
      fit a 12-inch round (113 in&sup2;) is actually a 2.26&times; scale.
    </p>
    <pre>{`8" round:   π × 4² = 50.3 in²
9" round:   π × 4.5² = 63.6 in²
10" round:  π × 5² = 78.5 in²
8" × 8":    64 in²
9" × 13":   117 in²
10" × 15":  150 in²`}</pre>

    <h2>Flooring, paint, and wallpaper</h2>
    <p>
      Flooring is sold by the square foot or square meter. Paint coverage is usually quoted in
      square feet per gallon or m&sup2; per liter (typical: 350 ft&sup2; per US gallon, 10&ndash;12
      m&sup2; per liter for one coat on smooth walls). For wallpaper, rolls are measured by
      linear length and width; multiply for area and add 10&ndash;15% for waste and pattern
      matching.
    </p>

    <h2>Real estate conventions</h2>
    <p>
      US real estate uses square feet exclusively for interior area. Japanese real estate uses
      <em>tsubo</em> (1 tsubo = 3.306 m&sup2; = 2 tatami mats). Indian real estate uses square
      feet in cities, bigha and katha in rural areas (with regional variations: a bihar bigha
      &asymp; 1,338 m&sup2;, a west bengal bigha &asymp; 1,337 m&sup2;, a gujarat bigha &asymp;
      1,618 m&sup2;). Always confirm the unit when buying land internationally.
    </p>

    <h2>Map scale and area</h2>
    <p>
      A 1:24,000 map has a linear scale of 1:24,000. The area scale is
      <code> 1:24,000<sup>2</sup> = 1:576,000,000</code>. One square inch on the map represents
      576 million square inches = 4 million square feet &asymp; 92 acres on the ground. This
      is why estimating acreage from a map requires care.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using a linear factor for an area conversion.</strong> Multiplying square feet
      by 0.3048 gives you a number that&rsquo;s off by a factor of 3.28. You must square:
      0.3048&sup2; = 0.0929.
    </p>
    <p>
      <strong>Confusing hectare and acre.</strong> 1 hectare = 2.47 acres. They&rsquo;re close
      enough to swap casually, but a 10-acre parcel is not a 10-hectare parcel&mdash;they
      differ by 15 acres.
    </p>
    <p>
      <strong>Doubling a recipe linearly instead of by area.</strong> Doubling an 8-inch round
      to a 16-inch round increases area by 4&times;, not 2&times;. Your cake will overflow or
      your oven will melt.
    </p>
    <p>
      <strong>Forgetting paint needs multiple coats.</strong> A gallon covers 350 ft&sup2; for
      <em>one coat</em>. For two coats you need double. Always check coverage claims against
      real-world conditions.
    </p>
    <p>
      <strong>Treating irregular land as a single rectangle.</strong> Survey parcels rarely
      have four 90-degree angles. Treat the property as a polygon with measured sides and
      compute area accordingly.
    </p>
    <p>
      <strong>Mixing square feet and square yards.</strong> 1 yd&sup2; = 9 ft&sup2;. Flooring
      estimates in yards versus feet differ by 9&times;. Always check which unit the vendor
      quoted.
    </p>
    <p>
      <strong>Ignoring waste factor.</strong> When buying flooring, tile, or wallpaper, add
      10&ndash;15% for cuts, waste, and mistakes. The raw area calculation is the minimum,
      not the order quantity.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Stop squaring conversion factors by hand; our{" "}
      <a href="/tools/area-converter">area converter</a> handles m&sup2;, ft&sup2;, acres,
      hectares, and square miles without the squared-factor trap. Pair it with the{" "}
      <a href="/tools/length-converter">length converter</a> when you&rsquo;re starting from
      one-dimensional measurements, and the{" "}
      <a href="/tools/volume-converter">volume converter</a> when the problem extends to three
      dimensions.
    </p>
  </>
);
