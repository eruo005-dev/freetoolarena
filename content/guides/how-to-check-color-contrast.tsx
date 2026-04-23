import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Color contrast is the single most-violated accessibility rule on the web,
      and it&rsquo;s also one of the easiest to fix. WCAG defines numeric ratios
      between foreground and background luminance; fail them and people with low
      vision, poor displays, or sunlit screens cannot read your text. The good
      news is the math is fully automatable and the thresholds are well-defined.
      This guide explains what the ratios mean, the difference between AA and
      AAA, where large-text leniency applies, how luminance is actually
      calculated, and the subtler cases &mdash; link colors, disabled states,
      dark mode &mdash; that trip up teams who check the hero text once and call
      it a day.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The WCAG thresholds</h2>
    <p>
      Contrast is expressed as a ratio between 1:1 (no contrast) and 21:1 (pure
      white on pure black). The thresholds you need to memorize:
    </p>
    <pre>{`                     Normal text    Large text   UI components
WCAG AA              4.5 : 1        3 : 1        3 : 1
WCAG AAA             7 : 1          4.5 : 1      n/a`}</pre>
    <p>
      <strong>Normal text</strong> is anything under 18pt (roughly 24px) regular
      or 14pt bold. <strong>Large text</strong> is 18pt+ regular or 14pt+ bold.{" "}
      <strong>UI components</strong> include form borders, icons, focus
      indicators &mdash; anything non-text that carries meaning.
    </p>

    <h2>AA vs AAA</h2>
    <p>
      <strong>AA is the legal baseline</strong> in most jurisdictions (ADA,
      Section 508, EN 301 549, AODA). If you&rsquo;re shipping a public product,
      aim for AA at minimum.
    </p>
    <p>
      <strong>AAA is the gold standard</strong>. It&rsquo;s required only for
      government services in a few places. For product work, hitting AAA on body
      copy is a reasonable north star &mdash; it costs you nothing and gives you
      headroom for bad displays, direct sunlight, and aging users.
    </p>

    <h2>How luminance is calculated</h2>
    <p>
      Contrast ratio comes from relative luminance, not raw RGB. Each channel is
      normalized to 0&ndash;1, gamma-decoded, then weighted by how sensitive the
      human eye is to that color:
    </p>
    <pre>{`L = 0.2126 R + 0.7152 G + 0.0722 B`}</pre>
    <p>
      Green dominates. A pure green (#00ff00) has luminance 0.7152; pure red is
      0.2126; pure blue is 0.0722. That&rsquo;s why dark blue on black looks
      horrible (both have tiny luminance) while dark red on black reads at least
      a little.
    </p>
    <pre>{`contrast ratio = (L_lighter + 0.05) / (L_darker + 0.05)`}</pre>
    <p>
      The <code>+ 0.05</code> prevents division by zero and accounts for
      flare. The practical upshot: you can&rsquo;t intuit contrast from
      &ldquo;how different the colors look.&rdquo; Run the numbers.
    </p>

    <h2>Large-text leniency</h2>
    <p>
      Bigger text is easier to read, so WCAG lets you drop to 3:1 for large
      text. This is what lets you use medium-gray headlines that would fail on
      body copy. The cutoffs:
    </p>
    <pre>{`18pt regular  =  24px           (AA large allowed)
14pt bold     =  18.66px bold    (AA large allowed)`}</pre>
    <p>
      A common mistake: using the leniency for 18px bold subheads. 18px bold is
      not 14pt bold &mdash; it&rsquo;s ~13.5pt. Measure in pt, not px, to stay
      honest.
    </p>

    <h2>Link colors inside paragraphs</h2>
    <p>
      Links need <em>two</em> contrasts: against the page background{" "}
      <strong>and</strong> against the surrounding body text. WCAG 1.4.1 says
      color alone can&rsquo;t be the only signal. Two ways to pass:
    </p>
    <p>
      <strong>Underline the link.</strong> Now the underline carries the signal
      and contrast of the link color only needs to meet the text-vs-background
      ratio.
    </p>
    <p>
      <strong>Use a 3:1 color difference</strong> between the link and the body
      text in addition to a passing contrast against the background.
    </p>
    <p>
      If you&rsquo;re stripping underlines for aesthetics, you need the
      3:1-to-text test, plus another signal (bold, hover underline) to cover
      non-color signaling.
    </p>

    <h2>Disabled states</h2>
    <p>
      WCAG explicitly exempts disabled controls from the contrast requirements
      &mdash; but that doesn&rsquo;t mean &ldquo;invisible is fine.&rdquo;
      Users still need to see there&rsquo;s a button, they just need to
      understand it&rsquo;s not interactive. A common pattern: keep the text
      contrast at ~3:1 against the button, and lighten the background fill.
      Reduced opacity works visually; just don&rsquo;t drop below ~2:1 or the
      control becomes impossible to locate.
    </p>

    <h2>Placeholder text</h2>
    <p>
      Most browsers ship with placeholder text at ~40% opacity, which almost
      always fails AA. Override it:
    </p>
    <pre>{`::placeholder {
  color: #6b7280; /* gray-500, ~4.6:1 on white */
  opacity: 1;
}`}</pre>
    <p>
      And remember placeholders should never replace labels. Even at passing
      contrast they disappear the moment the user starts typing.
    </p>

    <h2>Dark mode</h2>
    <p>
      Pure white text on pure black is 21:1 &mdash; technically perfect but
      actually painful on OLED screens. Soften both ends:
    </p>
    <pre>{`bg:   #0a0a0a   (off-black)
text: #e5e5e5   (off-white)
ratio: 14.5 : 1   (plenty, easier on the eyes)`}</pre>
    <p>
      Check your dark-mode palette separately. Teams often nail light mode and
      then invert colors without re-checking contrast for every component.
      Border colors, disabled states, and brand colors usually need bespoke
      dark-mode values.
    </p>

    <h2>Images with text overlays</h2>
    <p>
      Hero images with headlines are where contrast fails most dramatically
      because the background is not a flat color. Options:
    </p>
    <p>
      <strong>Dark overlay.</strong> A 40&ndash;60% black gradient over the
      image pushes average luminance down enough for white text to pass.
    </p>
    <p>
      <strong>Text shadow.</strong> A subtle <code>text-shadow: 0 1px 3px rgba(0,0,0,0.6)</code>{" "}
      adds local contrast without touching the image.
    </p>
    <p>
      <strong>Contained background.</strong> Put the text on a semi-opaque
      panel rather than directly on the image.
    </p>

    <h2>Brand colors that fail</h2>
    <p>
      A surprising number of brand palettes fail AA at their default weights.
      Medium greens (#4caf50-ish) on white are usually 2.2:1. Sky blues
      (#3b82f6-ish) land around 3.7:1 &mdash; fine for large text or a button
      background, but not for 14px body copy. When you inherit a failing brand
      color:
    </p>
    <p>
      Darken the shade for body use and keep the original for illustrations and
      icons. Most design systems ship both &mdash; call them <code>blue-500</code>{" "}
      and <code>blue-700</code> &mdash; and prescribe which is for text.
    </p>

    <h2>Automated vs manual checks</h2>
    <p>
      Automated tools catch the arithmetic failures &mdash; flat color on flat
      color &mdash; but miss:
    </p>
    <ul>
      <li>Text over images or gradients</li>
      <li>Content that depends on runtime theme state</li>
      <li>Dynamically generated colors (user avatars, charts)</li>
      <li>Focus indicators that only appear on keyboard nav</li>
    </ul>
    <p>
      Run axe or Lighthouse as a baseline; then manually spot-check your top
      ten pages in both light and dark mode, with focus visible.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Checking only the primary text color.</strong> Secondary, tertiary,
      disabled, and placeholder colors all need their own pass.
    </p>
    <p>
      <strong>Testing once on a beautiful monitor.</strong> Low-end mobile
      screens, projectors, and sunlight effectively reduce contrast. AA leaves
      headroom for that &mdash; don&rsquo;t spend it all in the design review.
    </p>
    <p>
      <strong>Using gray-on-gray for &ldquo;subtle&rdquo; UI.</strong> Subtle
      shouldn&rsquo;t mean unreadable. If your timestamp copy fails AA, raise
      its contrast or accept that it will be skipped entirely.
    </p>
    <p>
      <strong>Relying on color to convey state.</strong> Red text for
      &ldquo;error&rdquo; and green for &ldquo;success&rdquo; should always
      pair with an icon or label.
    </p>
    <p>
      <strong>Forgetting focus indicators.</strong> Focus rings need 3:1
      against the adjacent colors. The default browser ring usually passes;
      custom rings often don&rsquo;t.
    </p>
    <p>
      <strong>Picking gradients as text backgrounds.</strong> The worst-case
      spot in the gradient is what you need to test, not the average.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Feed foreground and background values into the{" "}
      <a href="/tools/contrast-checker">contrast checker</a> for an instant AA /
      AAA verdict. When you need to massage a color into the passing range
      without losing the brand, the{" "}
      <a href="/tools/color-converter">color converter</a> lets you nudge hex,
      HSL, and OKLCH side by side, and the{" "}
      <a href="/tools/color-picker">color picker</a> pulls exact values out of
      existing assets so you start from the real source, not a guess.
    </p>
  </>
);
