import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      You found a sunset photo, a sneaker shot, or a competitor&rsquo;s landing page and
      you want the exact colors. Eyeballing hex values from a screenshot is a waste of
      time and usually off by 10-15 points of lightness. A color extractor reads the
      pixels directly and hands you a usable palette in seconds. This guide covers how
      the extraction actually works, when to trust the output, and when to override it.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Dominant color vs full palette</h2>
    <p>
      There are two different jobs people confuse. <strong>Dominant color</strong> is a
      single hex value — useful for setting a hero background that matches a product
      photo, or picking a card accent that feels like the image. <strong>Full palette
      </strong> is usually 5-8 colors — useful for mood boards, brand systems, and
      checking whether a photo has enough contrast for a headline overlay.
    </p>
    <p>
      If you ask for a palette when you really want a dominant color, you&rsquo;ll end up
      averaging a background that should have been a saturated accent. Decide up front
      which you need.
    </p>

    <h2>How auto extractors actually work</h2>
    <p>
      Under the hood, most extractors run color quantization — usually k-means or a
      median-cut algorithm. The image is sampled (often downscaled first for speed),
      every pixel is plotted in RGB space, and the algorithm finds N cluster centers.
      Each cluster center becomes a palette color, weighted by how many pixels fell into
      its bucket.
    </p>
    <p>
      That means the output is not &ldquo;the colors a designer would pick.&rdquo; It&rsquo;s
      &ldquo;the statistically average color of the biggest blobs of pixels.&rdquo; Most
      of the time that&rsquo;s the same thing. Sometimes it isn&rsquo;t.
    </p>

    <h2>When to trust it, when to eyeball adjust</h2>
    <p>
      Trust the extractor on clean product shots, flat illustrations, and photos with a
      clear subject. The dominant color will be what you expect.
    </p>
    <p>
      Override it on images with heavy gradients, skin tones, or mixed lighting. A
      sunset photo will hand you six muddy oranges that all look the same in your UI.
      Pick the two that are furthest apart in saturation and drop the rest. Similarly,
      photos with a lot of sky will return blue as the dominant — even if the subject
      is a red car.
    </p>

    <h2>Use case: matching hero backgrounds to product photos</h2>
    <p>
      Drop the product image into <a href="/tools/color-extractor">our color extractor</a>,
      grab the second or third color from the palette (not the first — that&rsquo;s
      usually the background of the photo itself), and use it as your hero background.
      The image visually sits on the page instead of floating on top of it. Five-minute
      fix, huge polish win.
    </p>

    <h2>Use case: mood boards and brand systems</h2>
    <p>
      Collect 5-10 reference images that feel like the brand you want. Extract a
      palette from each, then cross-reference. Colors that show up across multiple images
      are your brand direction. Colors that only appear once are noise — cut them.
    </p>

    <h2>Use case: logo contrast checks</h2>
    <p>
      Drop a photo you plan to overlay a logo on into the extractor. If the dominant
      colors are all in the 40-70% lightness range, your logo will disappear. Either
      darken the image with an overlay, move the logo to a corner with clearer contrast,
      or pick a different photo. Once you have the hex values, pass them through{" "}
      <a href="/tools/color-converter">a color converter</a> to get HSL — lightness is
      easier to reason about than RGB when you&rsquo;re debugging contrast.
    </p>

    <h2>The two adjustments you&rsquo;ll almost always make</h2>
    <p>
      First, bump saturation up 5-10% on the extracted values. Real photos average out
      toward gray, and the raw output tends to feel washed on screen. Second, shift the
      darkest color another 10-15% darker for body text — extracted &ldquo;dark&rdquo;
      colors are usually still too light to meet WCAG AA contrast on white backgrounds.
      Two small tweaks, and the extracted palette goes from &ldquo;close&rdquo; to
      &ldquo;shippable.&rdquo;
    </p>
  </>
);
