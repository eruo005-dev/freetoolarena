import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      An eyedropper is the fastest way to grab a color that already exists in
      the world. Instead of squinting at a screenshot and guessing hex codes,
      you click a pixel and copy the value. Every operating system and design
      tool ships an eyedropper now, and browsers finally support the EyeDropper
      API natively. The tricky part isn&rsquo;t the click &mdash; it&rsquo;s
      picking the <em>right</em> pixel, because compressed images, anti-aliased
      edges, and gamma-shifted displays can hand you a value that doesn&rsquo;t
      match what your eyes actually see. This guide covers the tools, sampling
      strategy, handling screenshots, brand-matching workflows, and the
      accessibility caveats that make &ldquo;just use the eyedropper&rdquo; not
      quite the full answer.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What an eyedropper actually does</h2>
    <p>
      It reads the RGB value of one pixel at the cursor and gives you that
      value in whatever format you asked for &mdash; hex, RGB, HSL, OKLCH. No
      magic, just a pixel read. Everything interesting is in <em>which</em>{" "}
      pixel you sample.
    </p>
    <p>
      A single-pixel sample is brittle. A 3x3 or 5x5 average is more reliable
      on photos, JPEGs, and anything with noise. Most desktop tools default to
      a single pixel but let you change the sample size in settings.
    </p>

    <h2>The browser EyeDropper API</h2>
    <p>
      Chrome, Edge, and Opera support <code>window.EyeDropper</code>. One
      method, one promise, one hex string back:
    </p>
    <pre>{`const eyeDropper = new EyeDropper();
const { sRGBHex } = await eyeDropper.open();
console.log(sRGBHex); // "#3b82f6"`}</pre>
    <p>
      The cursor becomes a magnifier and the user clicks anywhere on the
      screen. Works across browser windows, the desktop, other apps &mdash; it
      pulls from the actual rendered pixels. Safari and Firefox don&rsquo;t yet
      support this; feature-detect before relying on it.
    </p>

    <h2>OS-level eyedroppers</h2>
    <p>
      macOS Digital Color Meter (built-in), Windows PowerToys Color Picker, the
      GNOME Color Picker &mdash; all let you sample any pixel on screen and
      copy the value to clipboard. Shortcut keys matter; train yourself to use
      them rather than opening the app each time.
    </p>
    <ul>
      <li>macOS: Shift-Cmd-4, press Space bar in Digital Color Meter</li>
      <li>PowerToys (Windows): Win-Shift-C by default</li>
      <li>Figma: press I with a layer selected</li>
      <li>Photoshop: I</li>
      <li>Chrome DevTools: the color swatch next to any color value</li>
    </ul>

    <h2>Sampling strategy</h2>
    <p>
      A good sample avoids:
    </p>
    <p>
      <strong>Anti-aliased edges.</strong> The pixel one over from the edge is
      a blend of foreground and background. Move toward the center of a solid
      region.
    </p>
    <p>
      <strong>JPEG block boundaries.</strong> At quality 80, every 8x8 block
      has mild color shift. Sample the center of a block, not the seam.
    </p>
    <p>
      <strong>Gradients.</strong> The value depends on exactly where you
      clicked. Decide which end of the gradient you want; then sample there,
      not halfway.
    </p>
    <p>
      <strong>Shadows and highlights.</strong> If you&rsquo;re trying to match
      a brand, ignore specular highlights and pure-black shadows &mdash; sample
      the mid-tone area.
    </p>

    <h2>Sampling from screenshots</h2>
    <p>
      Screenshots go through gamma, color profile, and (if shared) compression.
      The screenshot is not necessarily the same color as the original. To
      match brand colors reliably:
    </p>
    <ul>
      <li>Work from the original PNG or SVG, not a screenshot.</li>
      <li>If only a screenshot is available, take it at 1x zoom.</li>
      <li>Disable OS-level &ldquo;improve colors&rdquo; / HDR before sampling.</li>
      <li>Sample 5x5 and use the average, not a single pixel.</li>
    </ul>

    <h2>Matching colors across tools</h2>
    <p>
      Hex round-trips perfectly: <code>#3b82f6</code> in Figma is the same in
      CSS. RGB-255 round-trips perfectly. Where it gets flaky:
    </p>
    <p>
      <strong>Percentages.</strong> Some tools store RGB as 0&ndash;1 floats,
      and rounding can drift. Use integer RGB when transferring.
    </p>
    <p>
      <strong>Color profiles.</strong> A sRGB color sampled from an Adobe-RGB
      export will not look the same. Always export in sRGB for web work.
    </p>
    <p>
      <strong>HSL.</strong> HSL &harr; hex is lossy at the edges because of
      integer rounding in the saturation/lightness percentages. Store the hex
      as source-of-truth.
    </p>

    <h2>Getting brand-exact colors</h2>
    <p>
      Sampling the logo PNG is approximate. To get the real brand value:
    </p>
    <ul>
      <li>Check the brand guideline PDF if there is one.</li>
      <li>Inspect the brand&rsquo;s website CSS for <code>:root</code> variables.</li>
      <li>Download the SVG logo and read the fill attribute.</li>
      <li>Look in their GitHub repo for <code>tailwind.config.js</code> or theme files.</li>
    </ul>
    <p>
      Only fall back to the eyedropper when none of those work. The eyedropper
      is a last resort for brand spec because of the compression and profile
      issues above.
    </p>

    <h2>HDR and wide-gamut displays</h2>
    <p>
      On an HDR monitor, the eyedropper might return values outside sRGB. Most
      web workflows assume sRGB so the value gets clamped. If you&rsquo;re
      seeing unexpected hex codes (things like <code>#101010</code> when the
      pixel looked black), your monitor might be in HDR mode. Switch to SDR
      when picking for web use.
    </p>

    <h2>The 5x5 average trick</h2>
    <p>
      For photos, always sample 3x3 or 5x5 rather than a single pixel. The
      single-pixel value on a photo is dominated by noise. A 5x5 average gives
      you the local mean, which is what a human actually perceives.
    </p>
    <pre>{`Single pixel on a red wall:      #c5302a
5x5 average on the same wall:    #c73330
Human-perceived color:           closer to the 5x5 value`}</pre>

    <h2>Accessibility caveats</h2>
    <p>
      Eyedroppers solve &ldquo;what color is this pixel&rdquo; but not
      &ldquo;what color should this pixel be.&rdquo; Just because you sampled
      a brand&rsquo;s gray-on-white subtitle doesn&rsquo;t mean you should
      copy it &mdash; it might fail WCAG. Always re-check contrast after
      picking.
    </p>
    <p>
      Also: color blindness. A color that pops for you might merge with its
      background for a deuteranope. After picking, run the pair through a
      simulator &mdash; don&rsquo;t trust your own eyes as the judge of
      accessibility.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Sampling at anti-aliased edges.</strong> Move to the center of
      a solid region. The edge is always a blend.
    </p>
    <p>
      <strong>Picking from a screenshot when the original is available.</strong>{" "}
      Each step of compression shifts the color slightly.
    </p>
    <p>
      <strong>Single-pixel samples on photos.</strong> Noise dominates. Use
      an averaged sample area.
    </p>
    <p>
      <strong>Ignoring display color profile.</strong> A sRGB pick on a
      wide-gamut monitor can return a value that doesn&rsquo;t reproduce on
      standard monitors.
    </p>
    <p>
      <strong>Not verifying contrast.</strong> You picked it, it&rsquo;s
      brand-consistent, and it still fails AA. Run the numbers.
    </p>
    <p>
      <strong>Treating RGBA alpha as a color property.</strong> Picking{" "}
      <code>#000</code> at 40% opacity gives you a blend with the background,
      not a new color. If you want the effective color for a flat replacement,
      sample the blended pixel directly.
    </p>
    <p>
      <strong>Forgetting to disable HDR/Night Shift/True Tone.</strong> They
      shift your perception of color, and some shift the actual rendered
      values too.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Pick a hex from any uploaded image with the{" "}
      <a href="/tools/color-picker">color picker</a>. For a full palette (not
      just a single sample), use the{" "}
      <a href="/tools/color-extractor">color extractor</a>, and pipe the hex
      through the <a href="/tools/color-converter">color converter</a> when
      your design tool wants RGB, HSL, or OKLCH instead of the hex you just
      grabbed.
    </p>
  </>
);
