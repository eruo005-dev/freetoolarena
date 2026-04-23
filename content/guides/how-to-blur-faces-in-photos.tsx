import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Blurring faces in photos is a routine privacy task for journalists, bloggers, real estate agents, and anyone who shares photos of crowds, children, or bystanders online. The job sounds simple &mdash; smudge the face &mdash; but doing it well requires knowing how much blur is enough to make recognition impossible, which techniques are reversible (and therefore unsafe), and how to handle extras like number plates and ID cards in the same frame. Pixelation that can be reconstructed, Gaussian blurs that are too mild, or censor boxes that still leak information are all real failures. This guide covers the safe techniques, the unsafe ones, and batch workflows.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The one rule: blurring must be irreversible</h2>
    <p>
      The only safe blur is one that destroys the original information. Any technique that merely obscures it &mdash; where the original pixels could in theory be recovered &mdash; fails under scrutiny. This rules out:
    </p>
    <ul>
      <li><strong>Twirl or swirl filters</strong> &mdash; literally reversible with the inverse operation.</li>
      <li><strong>Weak Gaussian blur</strong> &mdash; AI super-resolution models can hallucinate plausible faces.</li>
      <li><strong>Low-resolution pixelation</strong> &mdash; researchers have demonstrated pixelated text and faces being recovered.</li>
      <li><strong>Emoji or sticker overlays</strong> &mdash; safe only if the layer below is flattened before export; otherwise the original lives in the file.</li>
    </ul>
    <p>
      For robust redaction, solid black bars (or solid colored fills) on a flattened export remain the bulletproof choice.
    </p>

    <h2>Gaussian blur versus pixelation</h2>
    <p>
      <strong>Gaussian blur</strong> smooths pixels into a soft blob, losing fine detail gradually with radius. It looks organic and is usually the first choice aesthetically.
    </p>
    <p>
      <strong>Pixelation</strong> (mosaic) replaces blocks of pixels with their average color. It reads as &ldquo;censored&rdquo; more immediately and is visually associated with privacy by convention.
    </p>
    <p>
      For recognizability destruction, both need to be aggressive. A 2&nbsp;px Gaussian blur is cosmetic, not redactive. A useful rule of thumb: the shortest feature (eye, nose, mouth) should span fewer than 3&ndash;4 &ldquo;bins&rdquo; of the blur. For a 40&nbsp;px face in the frame, that means a Gaussian sigma around 15&ndash;20&nbsp;px or a pixelation block size of 12&ndash;16&nbsp;px.
    </p>

    <h2>How much blur is enough</h2>
    <p>
      A good test: display the blurred face next to unblurred thumbnails of possible subjects. If you can still pick the right one reliably, the blur is too weak. For public use, you want an output where <em>you</em>, with unlimited time, cannot confidently identify the subject.
    </p>
    <p>
      When in doubt, double the blur radius. Over-blurring costs nothing; under-blurring defeats the purpose.
    </p>

    <h2>Faces and everything around them</h2>
    <p>
      Redaction isn&rsquo;t just faces. In a single frame you might also need to obscure:
    </p>
    <ul>
      <li><strong>License plates</strong> on cars in the background.</li>
      <li><strong>House numbers and street signs</strong> in real estate photos where privacy matters.</li>
      <li><strong>Badges, name tags, ID cards</strong> worn by subjects or visible on desks.</li>
      <li><strong>Computer screens and phone screens</strong> showing private information.</li>
      <li><strong>Signatures</strong> on documents in the frame.</li>
      <li><strong>Tattoos</strong> that could identify a person even with their face blurred.</li>
    </ul>
    <p>
      Scan every inch of the frame before publishing. The cost of missing one item is the cost of having blurred nothing.
    </p>

    <h2>Automatic face detection</h2>
    <p>
      Modern tools can detect faces automatically and apply blur to each one. For crowd photos or batch processing, this is a huge time save. Caveats:
    </p>
    <ul>
      <li>Detection misses profiles and partially visible faces, especially from behind.</li>
      <li>Children&rsquo;s faces and non-standard angles are missed more often.</li>
      <li>You must review every output, not trust the detector blindly.</li>
    </ul>
    <p>
      Treat auto-detection as a first pass. Always manually sweep the image for missed targets.
    </p>

    <h2>Flatten and re-export</h2>
    <p>
      The most insidious mistake: applying blur as a filter layer in Photoshop or Affinity, saving the layered file, and sharing the original. The original face lives underneath the blur layer and anyone with the tool can reveal it. Always <strong>flatten</strong> the image and export to a single-layer format (JPEG, PNG) before sharing.
    </p>
    <p>
      Same rule with emoji stickers on iPhone Messages &mdash; the sticker is a separate layer in the edit metadata, and the original is recoverable. Export via &ldquo;Save As&rdquo; to a clean JPEG, don&rsquo;t just tap Share.
    </p>

    <h2>Blur strength presets</h2>
    <p>
      Approximate settings that work well for faces at typical sizes (using a 40&ndash;80&nbsp;px face in the frame):
    </p>
    <pre>{`Gaussian blur:    radius 15-25 px, 2-3 passes
Pixelation:       block size 12-20 px
Strong pixelation: block size 25-40 px
Solid black box:  largest safe margin around the face`}</pre>
    <p>
      Adjust proportionally for larger faces. A 300&nbsp;px face needs a much larger blur to be comparably redactive.
    </p>

    <h2>Batch blurring a folder</h2>
    <p>
      For journalism workflows &mdash; a gallery of crowd photos from a protest, or 200 real-estate photos with bystanders &mdash; batch tools apply auto-detection and the same blur preset across all files. Good batch tools:
    </p>
    <ul>
      <li>Show previews of detected faces for each file before running.</li>
      <li>Let you tune detection sensitivity (strict vs permissive).</li>
      <li>Support manual corrections &mdash; add a face the detector missed, remove a false positive.</li>
      <li>Write outputs to a separate folder and preserve originals.</li>
    </ul>

    <h2>Number plate specifics</h2>
    <p>
      License plate redaction is harder than face redaction because plates are small and often at odd angles. A Gaussian blur strong enough to scramble a face is often too weak on a plate because plate characters are higher-contrast and the blur radius interacts differently.
    </p>
    <p>
      For plates, a solid colored box or aggressive pixelation is safer than soft blur. Draw a rectangle over the full plate with 5&ndash;10&nbsp;px margin and fill it solid; plates recovered from soft blurs have been demonstrated in security research.
    </p>

    <h2>Children and vulnerable subjects</h2>
    <p>
      When the subject is a child, someone in a protest, or anyone whose identification could put them at risk, err on the side of heavier redaction. Consider solid black or colored boxes rather than aesthetic blurs. The few seconds of &ldquo;style points&rdquo; from a tasteful Gaussian aren&rsquo;t worth a reconstruction.
    </p>

    <h2>Masking versus in-place blurring</h2>
    <p>
      Two approaches exist:
    </p>
    <ul>
      <li><strong>In-place blur:</strong> the pixels in the face region are replaced with blurred versions of themselves. Fast and intuitive.</li>
      <li><strong>Masked composite:</strong> a blurred copy of the whole image is composited on top via a mask limited to the face region. More flexible (you can feather the mask edge, adjust blur later).</li>
    </ul>
    <p>
      For public release, either works if you flatten before export. For workflows where you might revise the redaction later, masked composite is more forgiving &mdash; just keep the source file private.
    </p>

    <h2>Privacy-first workflow</h2>
    <p>
      When redacting photos for public release, use a process that minimizes metadata leaks in parallel with the pixel redaction:
    </p>
    <ol>
      <li>Duplicate the source file so the original is preserved untouched.</li>
      <li>Strip EXIF (GPS, timestamps, serial numbers) from the copy.</li>
      <li>Apply face/plate/badge redaction.</li>
      <li>Flatten all layers.</li>
      <li>Export as a clean JPEG or PNG under a new filename.</li>
      <li>Review the output visually for missed redactions.</li>
      <li>Open the export in an EXIF viewer to confirm no stripped data survived.</li>
    </ol>
    <p>
      Skipping any step creates a leak. Most privacy failures are workflow failures, not technique failures.
    </p>

    <h2>Video considerations</h2>
    <p>
      Blurring faces in video is a stricter version of the photo problem &mdash; every frame needs the blur, and face positions move between frames. Modern video tools offer motion-tracking redaction: mark the face once, let the tool follow it through the clip.
    </p>
    <p>
      Manual frame-by-frame is only practical for short clips. For anything over a few seconds, use a tracker. Always scrub through the result at normal speed and at slow motion to catch frames where tracking lost the face.
    </p>

    <h2>Legal considerations and consent</h2>
    <p>
      Beyond the technical privacy angle, different jurisdictions have different rules about photographing people in public, publishing images of minors, and using images for commercial purposes. Blurring faces doesn&rsquo;t automatically make a photo legal to publish:
    </p>
    <ul>
      <li>GDPR considers even blurred images personal data in some cases if re-identification is possible.</li>
      <li>Some countries require consent regardless of blurring.</li>
      <li>Crowd-scene exceptions vary widely.</li>
    </ul>
    <p>
      For commercial publishing or sensitive content, consult a lawyer. Blurring is a tool, not a legal shield.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Blurring the face but leaving a name tag, tattoo, or t-shirt slogan that identifies the subject anyway. Using weak Gaussian blur that AI can reverse. Saving the layered source file instead of the flattened export, preserving the original under the blur. Trusting auto-detection without manual review &mdash; detectors miss children, profiles, and small background faces. Forgetting that reflective surfaces (mirrors, glass doors, car windows) carry additional recognizable imagery. And the social-media special: applying the platform&rsquo;s built-in &ldquo;blur face&rdquo; tool and trusting that the export is clean when some apps ship the original pixels in metadata. Flatten, re-export, inspect.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Our <a href="/tools/image-blur-censor">image blur censor</a> offers auto face detection, adjustable blur strength, solid-box option, and flattens before export &mdash; so the original is never recoverable. For file-size optimization after redaction, the <a href="/tools/image-compressor">image compressor</a> trims the output. And for a final privacy pass that strips location and camera metadata, run the result through the <a href="/tools/exif-remover">EXIF remover</a>.
    </p>
  </>
);
