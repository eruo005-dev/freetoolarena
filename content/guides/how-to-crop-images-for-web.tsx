import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A great photo badly cropped looks amateur. A mediocre photo well cropped looks
      intentional. Cropping for the web is less about taste than about hitting specific
      aspect ratios &mdash; Instagram wants 1:1 or 4:5, Twitter wants 16:9, LinkedIn
      header wants 4:1, Pinterest wants 2:3, and your own site&rsquo;s grid probably
      wants something else. Get the ratio wrong and the platform crops for you, usually
      badly. This guide covers the aspect ratios that matter, where to put the focal
      point, when to use smart-crop automation versus manual control, Retina 2x math,
      and the safe-zone rules that keep faces and key elements from being chopped off
      in unpredictable containers.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Aspect ratios by platform</h2>
    <pre>{`Context                         Aspect   Recommended size
Instagram feed (square)         1:1      1080x1080
Instagram feed (portrait)       4:5      1080x1350
Instagram story / Reels         9:16     1080x1920
Twitter/X inline                16:9     1200x675
Twitter/X header                3:1      1500x500
Facebook link share             1.91:1   1200x630
Facebook cover                  16:9     820x312
LinkedIn post image             1.91:1   1200x628
LinkedIn cover                  4:1      1584x396
Pinterest pin                   2:3      1000x1500
YouTube thumbnail               16:9     1280x720
Open Graph default              1.91:1   1200x630
Blog hero                       16:9     1920x1080
Product card                    1:1      800x800`}</pre>
    <p>
      These change occasionally &mdash; platforms update their specs &mdash; but the
      underlying aspect ratios are stable. Crop to the ratio, then resize to the target
      pixels.
    </p>

    <h2>The rule of thirds as a starting point</h2>
    <p>
      Divide the frame into a 3&times;3 grid. Place key subjects on the intersections
      of the lines or along the lines themselves. Horizons go on the upper or lower
      third, not dead center. Eyes in a portrait go on the top horizontal third. This
      isn&rsquo;t a rigid law &mdash; centered symmetry works for formal portraits and
      product shots &mdash; but it&rsquo;s the default that reads as composed rather
      than snapshotted.
    </p>

    <h2>Focal point: where the eye lands first</h2>
    <p>
      When you crop, you&rsquo;re choosing what the viewer sees first. For a portrait,
      that&rsquo;s usually the face. For a product, the product. For a landscape, the
      specific feature (the mountain, the lighthouse) rather than the whole vista. If
      the viewer&rsquo;s eye has to search the image to find the subject, the crop is
      wrong. Move the subject until it&rsquo;s obvious.
    </p>
    <p>
      For responsive images that may get cropped by the browser, set an explicit focal
      point with CSS:
    </p>
    <pre>{`img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: 50% 30%;  /* center horizontally,
                                 30% from top -> keeps faces */
}`}</pre>
    <p>
      The default <code>object-position: 50% 50%</code> crops equally from all sides,
      which cuts off heads in portraits. <code>50% 30%</code> is a safer default for
      portrait-heavy content.
    </p>

    <h2>Smart crop vs manual</h2>
    <p>
      Smart-crop algorithms (face detection, saliency detection) pick a center for you.
      They work well for batches of similar photos &mdash; a catalog of product shots
      or a gallery of portraits. They fail on complex compositions: two faces at
      different depths, a face far from center, images where the &ldquo;important&rdquo;
      element is contextual (a hand holding a watch, not the face next to it).
    </p>
    <p>
      For any hero image, marketing asset, or published thumbnail, crop manually. Five
      minutes per image beats the 15 minutes you spend fixing a smart-crop that cut off
      the CEO&rsquo;s head.
    </p>

    <h2>Retina and pixel density</h2>
    <p>
      High-density displays (iPhone, MacBook Retina, most modern Android) render at 2x
      or 3x the logical pixel count. A 400px-wide card on a Retina screen is actually
      800 physical pixels. Export your source at 2x the display size to keep it sharp.
    </p>
    <pre>{`Display size   Export at (2x)  Export at (3x)
200x200        400x400         600x600
400x400        800x800         1200x1200
800x600        1600x1200       2400x1800`}</pre>
    <p>
      3x export is overkill for most cases &mdash; the file size penalty isn&rsquo;t
      worth the barely-perceptible sharpness gain. 2x is the sensible baseline. Serve
      different densities with <code>srcset</code> to avoid pushing the 2x file to
      people on 1x screens.
    </p>

    <h2>Safe zones for responsive layouts</h2>
    <p>
      Your hero image might render as 16:9 on desktop, 4:5 on mobile, and get cropped by
      a share card as 1.91:1. Plan for the worst-case crop. Keep critical elements
      (faces, text, logos, CTAs) in the central <strong>safe zone</strong> &mdash;
      roughly the middle 50% horizontally and 60% vertically. Anything outside that
      zone might get cropped on some platform.
    </p>

    <h2>Avoiding face cropping</h2>
    <p>
      The most common crop failure is chopping the top of a head. Phone cameras compose
      with headroom; social crops remove it. Rules: leave at least 10% of the frame
      above the top of the subject&rsquo;s head. Never crop between the shoulders and
      the chin &mdash; cut at the shoulders or mid-chest. Never crop at a joint (knee,
      elbow, wrist) &mdash; it looks amputated; crop mid-limb instead.
    </p>

    <h2>Text in images</h2>
    <p>
      If your image includes overlaid text (a product label, a quote card, a CTA),
      keep that text inside the safe zone and leave 10&ndash;15% margin on all sides.
      Platforms penalize text-heavy images (Facebook used to reject ads with &gt;20%
      text) and any crop will chop unprotected text first.
    </p>

    <h2>Cropping versus extending</h2>
    <p>
      If a photo is 4:3 and you need 16:9, you have two options: crop off the top and
      bottom (loses content) or extend left and right (requires either blurred-edge
      fill, solid background, or generative fill). For most editorial contexts, crop.
      For formal logos, product packaging, or when the full composition matters,
      extend with a matching color background rather than crop.
    </p>

    <h2>Square vs portrait on mobile feeds</h2>
    <p>
      Instagram&rsquo;s feed used to be strictly square; now 4:5 portrait takes more
      vertical screen real estate and typically gets higher engagement. If you&rsquo;re
      shooting for social, prefer portrait aspect ratios for content, square for grid
      consistency. For Pinterest, 2:3 is non-negotiable &mdash; 1:1 pins get buried.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Cropping at joints.</strong> Cutting at the wrist, knee, or elbow makes
      subjects look amputated. Crop mid-forearm or mid-thigh instead.
    </p>
    <p>
      <strong>Centering every subject.</strong> Dead-center composition is fine for
      symmetric products but looks static for portraits and landscapes. Use the rule of
      thirds as a default.
    </p>
    <p>
      <strong>Ignoring headroom.</strong> Phone portraits have breathing room above
      the head; social crops remove it. Leave 10% above the hair line.
    </p>
    <p>
      <strong>Exporting at 1x for Retina screens.</strong> Images look soft on modern
      phones and laptops. Export at 2x the display size.
    </p>
    <p>
      <strong>Using one crop for all platforms.</strong> A 16:9 blog hero gets
      center-cropped to 1.91:1 by Open Graph, losing the top and bottom. Export a
      platform-specific variant or keep the subject in the safe zone.
    </p>
    <p>
      <strong>Cropping before resizing.</strong> If you&rsquo;re going to resize
      anyway, crop generously and let the resize step handle the final dimensions. You
      keep more flexibility.
    </p>
    <p>
      <strong>Forgetting text safe margins.</strong> Overlaid text at the edge of the
      frame gets clipped on any aggressive crop. Margin 10&ndash;15% inside the frame.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Crop to any aspect ratio with the{" "}
      <a href="/tools/image-cropper">image cropper</a>. Pair with the{" "}
      <a href="/tools/image-resizer">image resizer</a> to hit platform-specific pixel
      dimensions after the crop, and the{" "}
      <a href="/tools/image-compressor">image compressor</a> to ship the final asset at
      a file size that doesn&rsquo;t blow up page weight.
    </p>
  </>
);
