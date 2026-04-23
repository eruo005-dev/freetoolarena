import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A clean border turns a random photo into a product card. A garish one turns a
      product card into 2005. Borders seem like a tiny design decision until you
      realize they silently control three things: how the image separates from the
      page background, how it reads inside a grid of other images, and whether it
      feels like a polished asset or an amateur export. This guide covers border width
      in pixels versus percentages, color selection against different backgrounds,
      when to use rounded corners versus square, the difference between inner and
      outer borders, the polaroid effect, and the accessibility considerations most
      designers skip.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Pixels vs percentages</h2>
    <p>
      A <strong>fixed pixel border</strong> (say 4px) stays the same thickness no matter
      what size the image is displayed. A <strong>percentage border</strong> (say 2%)
      scales with the image. Fixed pixel borders are what CSS gives you by default and
      what feels right for UI elements &mdash; a 2px border on a 40px avatar reads the
      same as on a 400px banner.
    </p>
    <p>
      Percentage borders matter when you&rsquo;re baking the border into the image
      itself rather than adding it via CSS &mdash; a 2% border on a 1000px-wide photo
      is 20px, which scales appropriately if the image is later resized. For printed
      photos and polaroid effects, use percentages; for web UI, use fixed pixels.
    </p>

    <h2>Border width sensibilities</h2>
    <pre>{`Context                      Width       Notes
Avatar / profile circle      2-3 px      Fine, crisp
Thumbnail in grid            1-2 px      Barely visible separator
Product card                 1 px        Often just a 1px gray line
Hero image                   0 px        Rarely needs a border
Polaroid / frame effect      4-8% wide   Thicker at the bottom (10-15%)
Print photo mat              5-10% wide  White or cream
Instagram-style feed card    0-1 px      Flat is more modern`}</pre>
    <p>
      When in doubt, go thinner than you think. A 1px border almost always looks more
      professional than a 4px one. Borders that call attention to themselves age
      poorly; borders that silently define edges age well.
    </p>

    <h2>Color choice</h2>
    <p>
      The border should have enough contrast to define the edge but not enough to
      compete with the image. Three reliable approaches:
    </p>
    <p>
      <strong>Subtle neutral.</strong> A 1&ndash;2px border in <code>#e5e7eb</code>{" "}
      (light gray), <code>#d1d5db</code>, or a slightly darker shade than the page
      background. Use for product cards, thumbnails, anything in a grid.
      Practically invisible but prevents images from merging into the background.
    </p>
    <p>
      <strong>White on dark.</strong> For images placed on a dark page background, a
      white or near-white border creates a matted-photo effect. Works for portfolios
      and editorial layouts.
    </p>
    <p>
      <strong>Image-matched.</strong> For a polaroid effect, the border is cream or
      off-white &mdash; not pure white. <code>#faf8f3</code> or <code>#f5f1e8</code>{" "}
      reads as &ldquo;paper.&rdquo;
    </p>
    <p>
      Avoid black borders on dark photos &mdash; you can&rsquo;t see them. Avoid
      saturated colors (red, blue) unless you&rsquo;re deliberately doing a magazine
      or sticker effect.
    </p>

    <h2>Rounded vs square corners</h2>
    <p>
      <strong>Square corners</strong> feel formal, editorial, documentary. News
      photos, print design, corporate materials.
    </p>
    <p>
      <strong>Rounded corners</strong> feel friendly, app-like, modern. The default
      in consumer software since iOS 7 (2013). Border radius 4&ndash;8px for cards,
      8&ndash;16px for prominent images, 50% for circular avatars.
    </p>
    <p>
      Match the radius to surrounding UI. If your buttons have 8px radius, your image
      borders should too. Mixing 4px and 12px radii in one layout looks careless.
    </p>

    <h2>Inner vs outer borders</h2>
    <p>
      An <strong>outer border</strong> (CSS <code>border</code>) lives outside the
      image content &mdash; the image keeps its full resolution. An{" "}
      <strong>inner border</strong> (a frame drawn onto the image) eats into the image
      area. Baking the border into the image (inner) has one advantage: the border
      travels with the image when shared, downloaded, or embedded. Outer borders only
      exist in your CSS.
    </p>
    <pre>{`/* CSS outer border */
.photo {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

/* or outline (doesn't affect layout) */
.photo {
  outline: 2px solid #e5e7eb;
  outline-offset: 0;
}`}</pre>
    <p>
      Use CSS borders for web UI; bake borders into the image when you&rsquo;re
      exporting for social media, email, or print.
    </p>

    <h2>The polaroid effect</h2>
    <p>
      A polaroid frame has three characteristics: white-to-cream border, thicker at the
      bottom than the other three sides (historically 15% bottom, 5% sides and top),
      and usually a subtle drop shadow. Proportions roughly:
    </p>
    <pre>{`image 80% x 80% of frame
top border    5%
side borders  5% each
bottom border 15%  (for the handwritten caption)
drop shadow:  offset 2-4px down, 10-20px blur, ~15% opacity`}</pre>
    <p>
      The polaroid feel works for personal portfolios, wedding pages, vintage-styled
      brands. Avoid for corporate or tech &mdash; it reads as nostalgic and can clash
      with modern UI.
    </p>

    <h2>Borders for thumbnails</h2>
    <p>
      Thumbnails in a grid typically need borders to prevent images from visually
      merging. A 1px border in a very light gray, or a CSS gap between cells, does the
      job. If your thumbnails already have consistent backgrounds (white products on
      white), you need the border. If they have varied content, the content edges
      usually define themselves.
    </p>

    <h2>Borders and accessibility</h2>
    <p>
      A focus ring is a special case of border &mdash; it appears when a user tabs to
      an image link. Never disable the browser&rsquo;s focus outline on interactive
      images without replacing it with a visible equivalent. Keyboard users rely on it
      to know where they are on the page.
    </p>
    <pre>{`a:focus-visible .photo {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}`}</pre>
    <p>
      Also: borders are decorative, not informational. If information depends on a
      color (like a red border meaning &ldquo;out of stock&rdquo;), duplicate it with
      text or an icon for colorblind and screen-reader users.
    </p>

    <h2>Drop shadows instead of borders</h2>
    <p>
      A subtle drop shadow (<code>box-shadow: 0 2px 8px rgba(0,0,0,0.08)</code>) often
      replaces a border entirely. It lifts the image off the page, creates separation,
      and avoids the flatness of a 1px line. Works best on white or light-gray page
      backgrounds.
    </p>

    <h2>Borders for printed images</h2>
    <p>
      For print (newsletters, brochures, photo books), borders have more impact because
      there&rsquo;s no hover state or animation to create visual interest. A 2mm
      white matting around a photo in print is equivalent to a thick polaroid frame
      onscreen &mdash; intentional and noticeable. Plan for print bleed (3mm beyond the
      trim line) when designing borders that extend to the page edge.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Borders that compete with the image.</strong> A thick colored border
      draws attention away from the content. Go subtle; 1&ndash;2px neutrals beat
      anything loud.
    </p>
    <p>
      <strong>Mixing border radii.</strong> 4px here, 12px there, 0 elsewhere.
      Consistency across a layout matters more than the specific value.
    </p>
    <p>
      <strong>Black borders on photos.</strong> They rarely contrast with the image
      content well, and they read as dated. Use light neutrals instead.
    </p>
    <p>
      <strong>Inner borders that waste image area.</strong> If you bake a 10% border
      into a 1000px image, you&rsquo;ve lost 100px of content on each side. Render at
      full resolution, then add the border.
    </p>
    <p>
      <strong>Killing focus outlines on image links.</strong> Breaks keyboard
      accessibility. If you dislike the default, replace it with a visible custom
      outline, never suppress it entirely.
    </p>
    <p>
      <strong>Using border-radius on non-interactive images in a grid.</strong> Works
      visually but can cause performance issues with many rounded images on low-end
      mobile. Test on a real device.
    </p>
    <p>
      <strong>Forgetting that borders add layout space.</strong> A 10px border on four
      sides adds 20px to width and height. If the image container is fixed, the image
      itself has to shrink. Use <code>box-sizing: border-box</code> to keep sizes
      predictable.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Add consistent borders across a batch of images with the{" "}
      <a href="/tools/image-border-adder">image border adder</a>. Pair with the{" "}
      <a href="/tools/image-round-corners">image round corners</a> tool to combine the
      border with matching radii, and the{" "}
      <a href="/tools/image-resizer">image resizer</a> to normalize dimensions before
      the border pass so every card in a grid looks uniform.
    </p>
  </>
);
