import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Rounded corners are a modern design default &mdash; cards, avatars, app icons, product tiles. Most of the time the browser handles them with a single CSS <code>border-radius</code> property, but sometimes you need the corners baked into the image file itself: for email, where CSS support is patchy; for exports to PDFs and presentations; for thumbnails rendered outside a styled environment; and for any case where you want transparent corners around a non-rectangular shape. This guide covers when to bake corners into the pixels, when to leave them as CSS, and how to pick the right radius for avatars, cards, and circular crops.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>CSS radius versus baked-in corners</h2>
    <p>
      If you control the HTML and CSS, <code>border-radius</code> is almost always the right answer. It&rsquo;s a single line, it&rsquo;s resolution-independent, and you can change the shape without re-exporting the image.
    </p>
    <pre>{`.card img {
  border-radius: 12px;
  overflow: hidden;
}`}</pre>
    <p>
      You need baked-in corners when the consuming environment strips CSS (email clients like Outlook), renders outside a browser (office docs, messaging apps), or needs a true image file with an alpha channel (PNG/WebP with transparent corners).
    </p>

    <h2>Radius in pixels versus percent</h2>
    <p>
      A fixed <strong>pixel radius</strong> (e.g. 12&nbsp;px) keeps the same physical roundness regardless of the image size. A 200&nbsp;px avatar and a 1000&nbsp;px card both get 12&nbsp;px of curve &mdash; visually tight on the big one, pronounced on the small one.
    </p>
    <p>
      A <strong>percentage radius</strong> scales with the image: 10% of the shorter side. A 200&nbsp;px square at 10% gets 20&nbsp;px of curve; a 1000&nbsp;px square at 10% gets 100&nbsp;px. Use percent when you want the shape to feel consistent across sizes &mdash; think app icons where the same squircle shape appears at 16, 32, 64, 128, and 512&nbsp;px.
    </p>

    <h2>Going full circle: 50% radius</h2>
    <p>
      A <code>border-radius</code> of 50% on a square produces a perfect circle; on a rectangle it produces a pill or ellipse. This is the standard shape for user avatars. When baking it into a file, you need both a square source image and a format that supports transparency (PNG, WebP, AVIF). JPEGs cannot hold a circular transparent background &mdash; they&rsquo;ll fill the corners with whatever background color you specify, usually white.
    </p>
    <p>
      If you&rsquo;re going to paste a circular avatar onto an unpredictable background, always export PNG or WebP. If you know the placement background is solid white and unchanging, JPEG with white corner fill works and saves bytes.
    </p>

    <h2>Transparency: PNG, WebP, AVIF</h2>
    <p>
      Transparent rounded corners require an alpha channel. Your format options:
    </p>
    <ul>
      <li><strong>PNG</strong> &mdash; ubiquitous support, lossless, larger files. Safe default.</li>
      <li><strong>WebP</strong> &mdash; 25&ndash;35% smaller than PNG at similar quality, supported in all modern browsers.</li>
      <li><strong>AVIF</strong> &mdash; even smaller, slower to encode, growing support.</li>
      <li><strong>GIF</strong> &mdash; supports only binary transparency (fully opaque or fully transparent), so the corner edge will look jagged. Avoid for this.</li>
    </ul>
    <p>
      JPEG is simply not an option for transparent corners; it has no alpha channel.
    </p>

    <h2>Anti-aliasing the curve</h2>
    <p>
      A round corner against a transparent background needs anti-aliasing: partially-transparent pixels along the curve edge so it doesn&rsquo;t look jagged. Good tools do this by default; bad ones produce a stair-step edge that&rsquo;s obvious at small sizes.
    </p>
    <p>
      If your exported image shows visible jaggies, check whether the tool is exporting at the target size or at a reduced size and then letting the browser scale up. Rendering at the final size with anti-aliasing on gives the cleanest curve.
    </p>

    <h2>Picking a radius for the job</h2>
    <ul>
      <li><strong>Photo cards in a feed:</strong> 8&ndash;12&nbsp;px for a subtle modern look, 16&ndash;20&nbsp;px for a softer feel.</li>
      <li><strong>App icons (iOS style):</strong> ~22.37% of the side (the iOS &ldquo;squircle&rdquo; formula), or use a dedicated squircle tool.</li>
      <li><strong>Avatars:</strong> 50% for circle, or 25&ndash;35% for a rounded-square look.</li>
      <li><strong>Product images:</strong> 4&ndash;8&nbsp;px for near-rectangular with a hint of softness.</li>
      <li><strong>Hero banners:</strong> usually 0&nbsp;px (sharp edges) or 12&ndash;16&nbsp;px if they&rsquo;re inset in a colored container.</li>
    </ul>

    <h2>Individual corner radii</h2>
    <p>
      Not all corners need the same radius. A common pattern for photo-text cards is to round only the top two corners (where the photo is) and leave the bottom square so the text section below aligns cleanly. The CSS:
    </p>
    <pre>{`img.card-top {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}`}</pre>
    <p>
      For baked-in asymmetric corners, pick a tool that exposes all four corner radii individually.
    </p>

    <h2>Elliptical (non-circular) corners</h2>
    <p>
      A border radius can actually accept two values per corner: one for the horizontal curve, one for the vertical curve, producing an elliptical corner. In CSS:
    </p>
    <pre>{`border-radius: 40px / 20px; /* wide-short ellipse at every corner */`}</pre>
    <p>
      Elliptical corners are rare in baked image form but useful for distinctive brand shapes or large hero images that shouldn&rsquo;t look like they have an identical curve to every card on the page.
    </p>

    <h2>Shadows and rounded corners together</h2>
    <p>
      If you&rsquo;re baking corners in because the target environment doesn&rsquo;t support CSS, odds are it doesn&rsquo;t support <code>box-shadow</code> either. In those cases, bake the shadow into the image too &mdash; export at a larger canvas, draw the rounded rectangle, add a soft shadow underneath, and save the whole composite as a transparent PNG.
    </p>
    <p>
      This approach also solves the dreaded &ldquo;shadow clipped by the rounded mask&rdquo; problem that appears when CSS <code>overflow: hidden</code> on a rounded container crops the shadow of a child element.
    </p>

    <h2>Batch rounding</h2>
    <p>
      For product catalogs, team photo galleries, or icon sets, batch tools round hundreds of files with the same radius in one pass. Useful options to look for: maintain aspect ratio, choose output format per file, add a transparent padding around the rounded shape to prevent cropping when the image is pasted.
    </p>

    <h2>Safe padding for drop-in placement</h2>
    <p>
      When you export a rounded-corner image that will be pasted into another composition, add a few pixels of transparent padding around the shape. This prevents the edge of the rounding from touching the container border awkwardly and gives you wiggle room for alignment.
    </p>
    <pre>{`Source image: 500 x 500
Target rounded output: 500 x 500
Safer output: 520 x 520 with 10 px transparent padding`}</pre>
    <p>
      The padded version still reads as 500&nbsp;px but gives downstream editors a clean drop-in asset.
    </p>

    <h2>Accessibility implications</h2>
    <p>
      Heavy rounding on buttons and interactive elements can hurt perceived tappability for some users &mdash; the shape starts to resemble decorative elements rather than controls. Design conventions suggest 4&ndash;8&nbsp;px radius for interactive elements so they still read as &ldquo;tappable thing,&rdquo; even if the rest of your design uses 16+&nbsp;px.
    </p>
    <p>
      For users with cognitive or motor accessibility needs, consistent shape language across buttons matters: a button with 16&nbsp;px radius, a card with 16&nbsp;px radius, and a pill-shaped tag can all live together, but buttons shouldn&rsquo;t vary randomly between radii in the same interface.
    </p>

    <h2>Email clients and rounded corners</h2>
    <p>
      Outlook, in particular, is famously inconsistent with CSS <code>border-radius</code>. For email signatures and marketing emails, bake the corners into the image file and ship PNG. Inline <code>&lt;img&gt;</code> tags with baked-in PNG corners survive every email client; CSS rules survive some and get ignored by others.
    </p>
    <p>
      The same applies to many older PDF generators, Word-to-PDF converters, and some enterprise document systems. When the render environment is unpredictable, bake.
    </p>

    <h2>Mask versus crop</h2>
    <p>
      Rounding corners via a mask keeps the whole image intact and just hides the corner regions. Cropping to a circle (or rounded shape) actually removes pixels. For most purposes they&rsquo;re equivalent, but masks let you undo or change the mask later without losing the source; crops are permanent.
    </p>
    <p>
      In CSS, <code>border-radius</code> is effectively a mask. In image editors, look for &ldquo;add layer mask&rdquo; or &ldquo;non-destructive round&rdquo; options if you want to preserve the original underneath.
    </p>

    <h2>Rounding ratio across sizes</h2>
    <p>
      If your design system uses the same radius across icon sizes 16&ndash;512&nbsp;px, the smallest icons end up barely rounded (a 2&nbsp;px curve on a 16&nbsp;px icon is nearly square) and the largest look harsh. A proportional scale works better:
    </p>
    <pre>{`16 px icon  -> 3 px radius
24 px icon  -> 4 px radius
32 px icon  -> 6 px radius
64 px icon  -> 10 px radius
128 px icon -> 20 px radius
512 px app icon -> 100 px radius (roughly iOS squircle ratio)`}</pre>
    <p>
      Roughly 15&ndash;20% of the side length produces a consistent &ldquo;friendly rounded&rdquo; feel across all sizes.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Saving rounded corners as JPEG and ending up with an ugly white corner fill on every asset &mdash; a confusion that costs designers a day when they discover all 400 exports have to be redone as PNG. Another frequent mistake: using a percentage radius on a rectangular rather than square canvas and getting a pill shape when you expected a rounded rectangle &mdash; remember that 50% of a 800&nbsp;&times;&nbsp;400 rectangle is 400&nbsp;px, which produces rounded half-circles at each short end. If you want a circle, the source must be square; if you want a rounded rectangle, use pixel values or a smaller percentage. Finally, baking corners into images you could have styled with CSS locks you out of easy redesigns &mdash; prefer CSS whenever the render environment supports it.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Our <a href="/tools/image-round-corners">image round corners tool</a> bakes rounded corners into any image with per-corner radius control and transparent PNG/WebP output. For the CSS-first version when you have control of the markup, the <a href="/tools/border-radius-generator">border-radius generator</a> produces the exact rule. And for the specific case of circular avatars, the <a href="/tools/profile-pic-circle-cropper">profile pic circle cropper</a> handles the square-first crop and the 50% round in one step.
    </p>
  </>
);
