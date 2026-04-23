import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A good circular profile picture does three things: it centers the face, it maintains enough padding that the circle doesn&rsquo;t cut off the chin or ears, and it exports at a resolution that still looks crisp on retina displays. Platforms crop user-uploaded avatars into circles on render, but if you want the circle baked into the file (for email signatures, PDFs, or presentations), you need to do the crop yourself and export with transparency. This guide covers framing the face, picking the right square crop, the avatar sizes each major platform actually uses, and how to export a transparent PNG that drops onto any background.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Start with a square</h2>
    <p>
      A circle is inscribed in a square, so the first step is always: crop your source photo to a square. The circular mask will then remove the four corner pieces of that square. If you start with a 1200&nbsp;&times;&nbsp;800 landscape photo and crop to a 800&nbsp;&times;&nbsp;800 square, you&rsquo;ll lose 400&nbsp;px of width; plan which 400 to lose.
    </p>
    <p>
      Tools that let you draw a circular crop directly on a rectangular photo do the square crop for you internally. Same operation, one step.
    </p>

    <h2>Center the face, not the photo</h2>
    <p>
      People instinctively center the crop on the photo, but what you want is the face centered in the circle. Pull the square box so the eyes sit on the upper third of the circle (where the eye line naturally reads) and the chin is well inside the lower edge.
    </p>
    <p>
      A good rule: roughly 20&ndash;30% of the circle diameter should be headroom above the hairline. Any less and the top of the head touches the edge; any more and the face looks small.
    </p>

    <h2>Leave room for the chin</h2>
    <p>
      The most common avatar error is a chin that kisses the bottom of the circle. Platforms sometimes render a border around the avatar, turning a perfect crop into a decapitation. Pad the bottom of the circle with at least 5% clearance below the chin.
    </p>
    <p>
      When in doubt, zoom out slightly. A face that fills 70% of the circle looks confident; one that fills 95% looks cramped.
    </p>

    <h2>Shoulder lines and framing cues</h2>
    <p>
      Just including the top of the shoulders (rather than the full collarbone) anchors the face visually and stops it from looking like a floating head. Avoid cropping at the neck &mdash; it&rsquo;s unflattering and reads as a mugshot. Either include the shoulders or crop tighter than the neck.
    </p>
    <p>
      If the original photo shows a lot of shoulder and torso, the correct crop is tighter than you think. The face should dominate.
    </p>

    <h2>Background selection</h2>
    <p>
      A clean or blurred background makes the face pop; a busy one competes for attention. If the source photo has a busy background, you have three options:
    </p>
    <ul>
      <li>Recrop tighter so the circle contains mostly face and minimal background.</li>
      <li>Use a background-removal pass before cropping, keeping only the subject and a solid or transparent background.</li>
      <li>Apply a subtle radial blur that keeps the face sharp and softens the edges of the circle.</li>
    </ul>

    <h2>Platform-specific sizes</h2>
    <p>
      Each platform specifies a recommended avatar size. Uploading at exactly that size or larger avoids compression surprises:
    </p>
    <pre>{`LinkedIn:   400 x 400 px (displays as small as 40 px)
Twitter/X:  400 x 400 px minimum
Instagram:  320 x 320 px displayed, 1080 recommended upload
Facebook:   170 x 170 px desktop, 128 x 128 mobile
GitHub:     500 x 500 px recommended
Slack:      512 x 512 px recommended
YouTube:    800 x 800 px recommended, displays at 98 x 98`}</pre>
    <p>
      The rule: upload at least 2&times; the largest display size to survive downsizing and retina rendering.
    </p>

    <h2>Transparent PNG for circular output</h2>
    <p>
      When you bake the circle into a file, the corners must be transparent or they&rsquo;ll show up as a box when the avatar lands on anything that isn&rsquo;t white. Only PNG and WebP (and AVIF) support the needed alpha channel.
    </p>
    <p>
      If the destination absolutely requires JPEG (some legacy HR systems), match the corner fill to the background color of the destination: white for white pages, black for dark UIs. Worth double-checking by placing the file on its real background before shipping.
    </p>

    <h2>Anti-aliasing the circle edge</h2>
    <p>
      A circular mask without anti-aliasing produces a pixel-jagged edge that screams &ldquo;amateur.&rdquo; Every modern tool does anti-aliasing by default, but if your exported avatar shows jagginess, confirm the tool isn&rsquo;t outputting a 1-bit mask (common in very old software or with GIF export).
    </p>
    <p>
      For extra smoothness, export at 2&times; the target size. The browser or platform will downscale and the averaging smooths the edge further.
    </p>

    <h2>Glasses, hats, and accessories</h2>
    <p>
      Glasses frames and hat brims often cross the edge of a tight circle. Check the exported avatar before shipping: a bottom frame of glasses clipped by the circle is visually awkward. Either crop wider to preserve them, or accept the partial clipping if it&rsquo;s subtle.
    </p>
    <p>
      The same goes for earrings, large necklaces, and beards &mdash; they can all encounter the edge. Know what&rsquo;s in the shot before you commit the crop.
    </p>

    <h2>Color, brightness, and uniformity</h2>
    <p>
      Teams that want their avatars to feel coordinated sometimes apply the same subtle filter: a small contrast bump, warm-tone shift, or black-and-white conversion. Even small unifying adjustments make a Team page look intentional rather than random.
    </p>
    <p>
      If everyone is on the same plain background (company-wide headshot session), the result feels premium. If people upload casual snapshots, a unifying filter is the next-best option.
    </p>

    <h2>Multiple sizes from one source</h2>
    <p>
      A single platform might request your avatar at multiple resolutions &mdash; LinkedIn uses 400&nbsp;px upload but displays at 40&ndash;240&nbsp;px across its UI. Export the master avatar at the largest size you&rsquo;ll need (800&ndash;1024&nbsp;px) and let downstream consumers resize down.
    </p>
    <p>
      For design systems that manage dozens of team avatars, a batch workflow that outputs 80&nbsp;px, 160&nbsp;px, 320&nbsp;px, and 640&nbsp;px versions from each master saves significant time later when the design calls for larger or smaller variants.
    </p>

    <h2>Backgrounds: solid, blurred, or transparent</h2>
    <p>
      Three common background treatments for a profile photo:
    </p>
    <ul>
      <li><strong>Transparent:</strong> most flexible; the avatar drops cleanly onto any page color.</li>
      <li><strong>Solid brand color:</strong> coordinated with the rest of the site; ensures contrast.</li>
      <li><strong>Blurred version of the photo itself:</strong> modern and atmospheric; keeps warmth without competing with the face.</li>
    </ul>
    <p>
      Avoid the mid-gray &ldquo;default photo&rdquo; background unless you genuinely want your avatar to look like an unclaimed profile slot.
    </p>

    <h2>Animated and video profile pics</h2>
    <p>
      Some platforms (Twitter/X, TikTok, LinkedIn in some regions) support animated GIF or short-video profile pictures. The framing rules are the same &mdash; face centered, padding for chin clearance &mdash; but add a stability check: the face should stay centered through the whole loop. Tracking cameras or fast head turns make avatars feel busy and unprofessional.
    </p>
    <p>
      Keep loops under 3 seconds, under 1&nbsp;MB where possible, and always provide a static-image fallback for platforms that strip animation.
    </p>

    <h2>Group photos and team grids</h2>
    <p>
      For Team or About pages with circular avatars in a grid, consistency is crucial. The crop scale should match across every subject: same face-to-circle ratio, same headroom above hair, same background treatment where possible.
    </p>
    <p>
      The easiest way to achieve consistency is a single photoshoot with identical framing. The second-easiest is a template overlay &mdash; a circular guide that every avatar must fit &mdash; applied to every photo during the crop. Mixed crop styles look unprofessional even when each individual photo is good.
    </p>

    <h2>Lighting and flatter expressions</h2>
    <p>
      Avatar-sized faces lose subtle expression detail the smaller they&rsquo;re displayed. For photos that will appear at 40&nbsp;px somewhere, exaggerated expressions translate better than neutral ones &mdash; a subtle smile becomes a non-smile at tiny sizes. Soft, even lighting also reads better at avatar scale than dramatic side-lighting, which can turn half the face into shadow at 40&nbsp;px.
    </p>
    <p>
      If you&rsquo;re shooting a new avatar, choose direct front-lighting or slightly-above eye-level soft light. Save the moody portraiture for full-size photos.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Exporting at the final display size (e.g. 98&nbsp;px for YouTube) instead of 2&times; or 3&times; that, and getting a blurry avatar on retina screens. Saving as JPEG and getting square corners instead of transparent ones. Cropping too tight so the platform&rsquo;s own border cuts the chin. Centering the photo rather than the face &mdash; the face should sit high in the frame, not dead-center. And the distinctive failure of uploading a landscape group photo and letting the platform auto-crop to a square that happens to cut off the subject entirely: crop manually first.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Our <a href="/tools/profile-pic-circle-cropper">profile pic circle cropper</a> handles square-first crop, face centering, transparent PNG export, and 2&times; retina sizing in one workflow. For non-circular rectangular crops, the <a href="/tools/image-cropper">image cropper</a> offers freeform ratio locks. And for official document-style portraits that need a specific size and background, the <a href="/tools/passport-photo-maker">passport photo maker</a> takes a headshot and outputs a compliant file.
    </p>
  </>
);
