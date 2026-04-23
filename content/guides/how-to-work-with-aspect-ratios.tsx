import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Aspect ratio is the width-to-height ratio of a rectangle, and
      it shows up everywhere — 16:9 video, 4:3 photos, 1:1 social
      squares, 21:9 ultra-wide, 9:16 vertical video, the golden
      ratio in design. Getting it right means images don&rsquo;t
      squish, videos don&rsquo;t letterbox, and layouts don&rsquo;t
      jump as images load. This guide covers the standard ratios,
      the CSS <code>aspect-ratio</code> property, responsive
      techniques, platform-specific requirements for social media
      and video, and the arithmetic you&rsquo;ll use when resizing
      or cropping.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What a ratio actually is</h2>
    <p>
      A ratio is the relationship between two dimensions, written as
      <code> w:h</code>. It tells you proportion, not size.
    </p>
    <p>
      <strong>16:9:</strong> 16 units wide for every 9 units tall.
      Could be 1920×1080, 1280×720, 640×360 — all 16:9.
    </p>
    <p>
      <strong>Decimal form:</strong> 16/9 = 1.778. A single number
      describing the proportion.
    </p>
    <p>
      To check if an image is a given ratio, divide width by height.
      If the result matches the ratio&rsquo;s decimal form,
      you&rsquo;re in.
    </p>

    <h2>The ratios you&rsquo;ll encounter most</h2>
    <p>
      <strong>16:9 (1.778):</strong> HD video, YouTube, modern TVs,
      most monitors. The dominant ratio of the screen era.
    </p>
    <p>
      <strong>4:3 (1.333):</strong> old TVs, old digital cameras,
      most tablets (iPad), print photographs.
    </p>
    <p>
      <strong>1:1 (1.000):</strong> Instagram feed posts (historical
      default), album covers, app icons, profile pictures.
    </p>
    <p>
      <strong>3:2 (1.500):</strong> DSLR photos, most printed prints.
      35mm film. Still common in stock photography.
    </p>
    <p>
      <strong>21:9 (2.333):</strong> ultra-wide monitors, some
      cinematic video.
    </p>
    <p>
      <strong>9:16 (0.5625):</strong> vertical video — TikTok,
      Instagram Reels, YouTube Shorts, mobile phone portrait.
    </p>
    <p>
      <strong>2:3 (0.667):</strong> vertical Instagram posts,
      Pinterest pins, e-book covers.
    </p>
    <p>
      <strong>1.91:1 (1.910):</strong> Facebook/LinkedIn link
      preview, Open Graph images. Standard social-share dimension.
    </p>
    <p>
      <strong>Golden ratio (1.618):</strong> occasionally used in
      print layouts; rarely enforced in web UI.
    </p>

    <h2>The CSS aspect-ratio property</h2>
    <p>
      Modern CSS has a dedicated property:
    </p>
    <p>
      <code>.card {`{ aspect-ratio: 16 / 9; width: 100%; }`}</code>
    </p>
    <p>
      The element takes the full width, and the height is computed
      from the ratio. No padding hacks, no JS, widely supported
      since 2021.
    </p>
    <p>
      <strong>Common uses:</strong>
    </p>
    <p>
      <code>aspect-ratio: 16 / 9;</code> for video thumbnails and
      embeds.
    </p>
    <p>
      <code>aspect-ratio: 1;</code> for square cards, avatars,
      product tiles.
    </p>
    <p>
      <code>aspect-ratio: 4 / 5;</code> for portrait cards (Instagram
      feed images).
    </p>

    <h2>The padding-top hack (legacy)</h2>
    <p>
      Before <code>aspect-ratio</code> landed, the pattern was:
    </p>
    <p>
      <code>.wrapper {`{ position: relative; padding-top: 56.25%;
      /* 9 / 16 × 100 */ }`} .content {`{ position: absolute; top: 0;
      left: 0; width: 100%; height: 100%; }`}</code>
    </p>
    <p>
      The padding-top in percent is relative to the parent width,
      which simulates aspect ratio. Hacky but worked everywhere.
    </p>
    <p>
      <strong>When to still use it:</strong> supporting browsers
      older than 2021. Otherwise, use <code>aspect-ratio</code>.
    </p>

    <h2>Avoiding layout shift from images</h2>
    <p>
      Web Core Vitals penalize layout shifts. Images without
      explicit dimensions push content around when they load.
    </p>
    <p>
      <strong>Solution:</strong> always provide width and height
      attributes on <code>&lt;img&gt;</code>, even when using
      responsive CSS.
    </p>
    <p>
      <code>&lt;img src=&quot;photo.jpg&quot; width=&quot;1600&quot;
      height=&quot;900&quot; alt=&quot;...&quot;&gt;</code>
    </p>
    <p>
      Modern browsers use these to compute aspect ratio and reserve
      space before the image loads. Combined with <code>style=
      &quot;max-width: 100%; height: auto&quot;</code>, you get
      responsive images with no layout shift.
    </p>

    <h2>Social media platform requirements</h2>
    <p>
      <strong>Instagram feed:</strong> square (1:1), portrait (4:5),
      or landscape (1.91:1). Anything outside these ranges gets
      cropped.
    </p>
    <p>
      <strong>Instagram Stories &amp; Reels:</strong> 9:16 vertical,
      1080×1920 pixels.
    </p>
    <p>
      <strong>TikTok:</strong> 9:16, 1080×1920.
    </p>
    <p>
      <strong>YouTube video:</strong> 16:9, 1920×1080 (or higher).
    </p>
    <p>
      <strong>YouTube Shorts:</strong> 9:16, 1080×1920.
    </p>
    <p>
      <strong>Twitter/X feed image:</strong> 16:9 recommended;
      supports most ratios up to 1200×675.
    </p>
    <p>
      <strong>Facebook/LinkedIn link preview (OG image):</strong>
      1200×630, 1.91:1 ratio.
    </p>
    <p>
      <strong>Pinterest pin:</strong> 2:3 (1000×1500) for maximum
      visibility.
    </p>

    <h2>Cropping vs scaling</h2>
    <p>
      When an image doesn&rsquo;t match a required ratio, you have
      two choices:
    </p>
    <p>
      <strong>Scale (letterbox/pillarbox):</strong> preserve the
      whole image, add bars. Video players do this.
    </p>
    <p>
      <strong>Crop:</strong> cut off edges. Preserves visual area
      but loses content. Instagram and Facebook do this for
      over-wide images.
    </p>
    <p>
      <strong>object-fit in CSS:</strong>
    </p>
    <p>
      <code>object-fit: cover;</code> — scale to fill, crop excess.
      Default for most card images.
    </p>
    <p>
      <code>object-fit: contain;</code> — scale to fit, leave
      letterbox. Default for logos/icons.
    </p>
    <p>
      <code>object-fit: fill;</code> — stretch to fit (usually
      wrong — distorts the image).
    </p>

    <h2>Computing a new size from ratio</h2>
    <p>
      Given one dimension, compute the other:
    </p>
    <p>
      New height = new width × (ratio_h / ratio_w)
    </p>
    <p>
      Example: 16:9 at 800px wide → height = 800 × (9/16) = 450px.
    </p>
    <p>
      When cropping an image to a target ratio: calculate the target
      width and height that fit within the image, centered around the
      focal point.
    </p>

    <h2>Responsive ratios</h2>
    <p>
      Sometimes a single ratio across breakpoints looks wrong.
      Landscape cards on desktop might need to become square on
      mobile.
    </p>
    <p>
      <code>.card {`{ aspect-ratio: 4 / 3; }`} @media (max-width:
      640px) {`{ .card { aspect-ratio: 1; } }`}</code>
    </p>
    <p>
      Or use CSS custom properties controlled by breakpoint for
      cleaner theming.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Mixing decimal and ratio notation.</strong>
      <code> aspect-ratio: 0.5625</code> and <code>aspect-ratio:
      9/16</code> are equivalent but mixing them in a codebase is
      confusing. Pick one.
    </p>
    <p>
      <strong>Forgetting width/height on img tags.</strong> Causes
      layout shift and hurts Core Web Vitals.
    </p>
    <p>
      <strong>Using fill instead of cover or contain.</strong>
      <code> object-fit: fill</code> stretches; almost always wrong
      for photos.
    </p>
    <p>
      <strong>Not respecting platform ratio limits.</strong>
      Uploading a 21:9 image to Instagram wastes pixels — it gets
      cropped.
    </p>
    <p>
      <strong>Hardcoding pixel dimensions instead of ratio.</strong>
      A 1200×800 card works until someone resizes the viewport.
      Define the ratio, let the browser compute the pixel size.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Compute target dimensions instantly with the{" "}
      <a href="/tools/aspect-ratio-calculator">aspect ratio calculator</a>.
      Pair with the{" "}
      <a href="/tools/image-resizer">image resizer</a> to produce
      pixel-perfect resizes at your target ratio, and the{" "}
      <a href="/tools/image-cropper">image cropper</a> when you need
      to match a specific platform crop.
    </p>
  </>
);
