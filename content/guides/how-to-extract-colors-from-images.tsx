import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Pulling a palette out of an image looks like magic but it&rsquo;s just
      clustering. Given a photo of millions of pixels, you reduce them to a
      handful of representative colors and output the result as a set of hex
      codes. Designers use this to derive palettes from moodboards, brands use
      it to reverse-engineer competitor assets, and developers use it to match
      UI accents to uploaded content. This guide covers the two algorithms that
      matter (k-means and median-cut), the difference between &ldquo;dominant&rdquo;
      and &ldquo;average,&rdquo; how to extract clean palettes from logos, and the
      gotchas &mdash; JPEG artifacts, transparent PNGs, near-duplicate colors
      &mdash; that make naive extractions look messy.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What &ldquo;extracting colors&rdquo; actually means</h2>
    <p>
      An image is a cloud of points in 3D color space (R, G, B). Extracting a
      palette of N colors is the task of finding N cluster centers that best
      represent that cloud. Different algorithms define &ldquo;best&rdquo;
      differently, which is why two tools can give you two different palettes
      from the same photo.
    </p>
    <p>
      All extractors do some version of: downsample the image, choose a color
      space, pick N centroids, iterate. The quality bar is &ldquo;does the
      output reproduce the feel of the image.&rdquo;
    </p>

    <h2>K-means clustering</h2>
    <p>
      The workhorse algorithm. Pick N random centers, assign each pixel to its
      nearest center, recompute centers as the mean of their assigned pixels,
      repeat until stable.
    </p>
    <pre>{`1. init N centroids randomly
2. for each pixel: assign to nearest centroid
3. update each centroid = mean of its pixels
4. repeat 2-3 until movement < epsilon`}</pre>
    <p>
      <strong>Pros:</strong> simple, predictable, gives you exactly N colors.{" "}
      <strong>Cons:</strong> sensitive to initial seeds, can merge distinct
      small-but-important colors (a brand red inside a mostly-blue image), and
      distances in raw RGB don&rsquo;t match human perception.
    </p>

    <h2>Median-cut</h2>
    <p>
      The algorithm GIF and PNG palette builders use. Recursively split the
      color space: find the channel with the widest range, split at its median,
      repeat on each half until you have N boxes.
    </p>
    <pre>{`box = all pixels
while box count < N:
  pick the box with the largest channel range
  split it at that channel's median
output = average color of each final box`}</pre>
    <p>
      <strong>Pros:</strong> deterministic, good at preserving outliers,
      standard for image-quantization tasks. <strong>Cons:</strong> can give
      you oddly-similar neighbors if the image has narrow distributions.
    </p>

    <h2>Dominant vs average</h2>
    <p>
      These are two different questions:
    </p>
    <p>
      <strong>Dominant color</strong> = the most common color (the largest
      cluster). For a photo of a sunset, the dominant color is the dominant
      cloud/sky color, not some weighted blend.
    </p>
    <p>
      <strong>Average color</strong> = the mean of all pixels. For a red-and-blue
      image, the average is muddy purple &mdash; a color that doesn&rsquo;t
      actually appear in the image.
    </p>
    <p>
      Use dominant when picking a single representative accent. Average is
      usually wrong; it tends to output dirty browns for anything colorful.
    </p>

    <h2>Perceptually uniform color spaces</h2>
    <p>
      Clustering in raw RGB means distances don&rsquo;t match what your eye
      sees. Two blues that look nearly identical can be 40 units apart in RGB
      while a dark green and a light yellow are only 30 apart. Better results
      come from Lab, OKLab, or HSL.
    </p>
    <pre>{`RGB:  fast, wrong (doesn't match perception)
HSL:  okay, intuitive, weak on luminance
Lab:  perceptually uniform, mildly slow
OKLab: newer, perceptually excellent, fast`}</pre>
    <p>
      If your output palette has near-duplicate colors, the extractor is
      probably clustering in RGB. Switch tools or convert to Lab/OKLab first.
    </p>

    <h2>Extracting brand colors from a logo</h2>
    <p>
      Logos are special: they usually have 2&ndash;4 sharp, flat colors with
      transparent or white backgrounds. Extraction rules:
    </p>
    <ul>
      <li>Ignore pure white pixels (they&rsquo;re usually the background).</li>
      <li>Ignore near-transparent pixels (rendering artifacts).</li>
      <li>Collapse colors that are within 5 units of each other.</li>
      <li>Return 3&ndash;5 colors max &mdash; brand palettes are small.</li>
    </ul>
    <p>
      If your logo is a JPEG, you&rsquo;ll pull compression artifacts: halos
      around edges, subtle banding. Convert to SVG or redraw in Figma before
      extracting for color spec.
    </p>

    <h2>Extracting palettes from photos</h2>
    <p>
      Photos have gradients. Millions of unique colors. Extraction choices:
    </p>
    <p>
      <strong>How many colors?</strong> Five is the sweet spot for a palette
      people can read. Eight gives you tint variation. Above ten, users
      can&rsquo;t tell some swatches apart.
    </p>
    <p>
      <strong>Saturation filter?</strong> Dropping low-saturation pixels before
      clustering emphasizes the &ldquo;colorful&rdquo; colors and avoids a
      palette full of beige. Useful for moodboards.
    </p>
    <p>
      <strong>Resize before processing.</strong> A 4K photo has 8M pixels;
      resizing to 200px wide is 50K pixels and 99% as accurate. Always
      downsample first.
    </p>

    <h2>The &ldquo;muddy middle&rdquo; problem</h2>
    <p>
      K-means on a photo with lots of skin tones tends to pull a narrow range
      of tans &mdash; all technically correct, all visually useless. Mitigations:
    </p>
    <p>
      Cluster more centers (say 16) then keep the 5 most spread out. This
      &ldquo;over-extract and deduplicate&rdquo; trick reliably produces
      interesting palettes.
    </p>
    <p>
      Weight pixels by saturation before clustering, so vivid colors have more
      influence than neutrals.
    </p>

    <h2>Transparent PNGs</h2>
    <p>
      If you skip the alpha channel, fully-transparent pixels contribute
      &ldquo;colors&rdquo; that depend on the image&rsquo;s undefined RGB for
      transparent areas &mdash; often arbitrary. Always filter pixels by
      alpha &gt; 50% before clustering.
    </p>

    <h2>Output formats</h2>
    <p>
      Hex is what developers want; RGB is what some design tools want; HSL is
      what CSS loves. A good extraction tool outputs all three plus the
      percentage of the image each swatch represents.
    </p>
    <pre>{`#4a6fa5  RGB(74,111,165)    HSL(215,36%,47%)   38%
#c8a862  RGB(200,168,98)    HSL(41,51%,58%)    24%
#2e2b29  RGB(46,43,41)      HSL(24,6%,17%)     18%
#e4e1d7  RGB(228,225,215)   HSL(46,17%,87%)    12%
#8c3a2f  RGB(140,58,47)     HSL(7,50%,37%)     8%`}</pre>

    <h2>Reproducibility</h2>
    <p>
      K-means with random seeds is non-deterministic &mdash; run it twice, get
      slightly different palettes. Good tools seed the PRNG for stable output
      or use median-cut which is deterministic by construction. If you&rsquo;re
      extracting palettes as part of a design pipeline, reproducibility
      matters.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Trusting average color.</strong> It&rsquo;s almost never what you
      want. Use dominant or the top-N cluster centers.
    </p>
    <p>
      <strong>Extracting from a compressed JPEG.</strong> JPEG chroma subsampling
      and block artifacts introduce colors that aren&rsquo;t really in the
      original. Work from PNG or raw source when possible.
    </p>
    <p>
      <strong>Skipping the alpha channel.</strong> Transparent PNGs contribute
      ghost colors if you don&rsquo;t filter.
    </p>
    <p>
      <strong>Clustering in RGB and wondering why the palette looks wrong.</strong>{" "}
      Lab or OKLab align with human vision far better.
    </p>
    <p>
      <strong>Asking for 20 colors.</strong> The human eye can only distinguish
      5&ndash;8 palette entries reliably. More than that is noise.
    </p>
    <p>
      <strong>Not downsampling.</strong> Extracting from a 24MP photo at full
      resolution is wasteful and doesn&rsquo;t improve accuracy.
    </p>
    <p>
      <strong>Forgetting to rank by frequency.</strong> A palette sorted
      aesthetically can bury the dominant color. Rank by pixel count so users
      know which one is the hero.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Drop an image into the{" "}
      <a href="/tools/color-extractor">color extractor</a> for an instant
      palette with hex, RGB, and HSL. Fine-tune a single color with the{" "}
      <a href="/tools/color-picker">color picker</a> and convert any swatch
      between formats with the{" "}
      <a href="/tools/color-converter">color converter</a> when you need the
      value in a format your design tool actually understands.
    </p>
  </>
);
