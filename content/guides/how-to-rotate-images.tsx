import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Rotating an image sounds trivial until you hit a sideways phone photo that refuses to flip, or a JPEG that loses quality every time you spin it. The modern pain points are EXIF orientation tags &mdash; invisible metadata that tells apps how to display a photo &mdash; and the difference between lossless and re-encoded rotation. Get both right and you can batch-rotate hundreds of scans or phone pics without fingerprints of degradation. This guide covers the 90/180/270&deg; rotations that cover 95% of cases, the arbitrary-angle rotations that don&rsquo;t, and how to detect and fix EXIF orientation issues once and for all.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The three rotations that matter</h2>
    <p>
      Ninety-five percent of rotation needs are 90&deg; clockwise, 90&deg; counter-clockwise, or 180&deg;. These are the only rotations that can be done losslessly on JPEGs, and they handle every &ldquo;I shot this sideways&rdquo; and &ldquo;this scan is upside down&rdquo; scenario. Any tool worth using exposes them as one-click buttons.
    </p>
    <p>
      Arbitrary angles &mdash; 7&deg; to level a horizon, 3&deg; to straighten a document scan &mdash; are different animals. They always require resampling, which means re-encoding, which means quality loss on JPEGs.
    </p>

    <h2>EXIF orientation: the invisible rotation</h2>
    <p>
      Phones don&rsquo;t physically rotate the sensor data when you turn the device. Instead, they write an <strong>Orientation</strong> EXIF tag that says &ldquo;display this rotated 90&deg; right&rdquo; (or left, or upside-down). Photo apps read the tag and rotate on the fly; naive tools ignore it and show the image sideways.
    </p>
    <p>
      The eight possible values of the EXIF Orientation tag:
    </p>
    <pre>{`1 = Normal
2 = Mirror horizontal
3 = Rotate 180
4 = Mirror vertical
5 = Mirror horizontal + rotate 270 CW
6 = Rotate 90 CW
7 = Mirror horizontal + rotate 90 CW
8 = Rotate 270 CW`}</pre>
    <p>
      Value 6 is the famous &ldquo;portrait iPhone photo&rdquo; case. The pixel buffer is landscape; the tag rotates it upright for display.
    </p>

    <h2>Why sideways photos happen on the web</h2>
    <p>
      Browsers &mdash; all modern ones &mdash; now respect EXIF orientation when rendering <code>&lt;img&gt;</code> tags. But the moment the image goes through a server-side resize, thumbnail generator, or CSS <code>background-image</code> with older pipelines, the tag can get lost or ignored. You end up with the pixel buffer in its raw landscape form, displayed sideways.
    </p>
    <p>
      The permanent fix is to <em>bake</em> the rotation: rotate the pixels physically and strip the Orientation tag. Every downstream tool then sees an upright image and nothing to argue about.
    </p>

    <h2>Lossless versus re-encoded rotation</h2>
    <p>
      JPEG stores pixels in 8&times;8 or 16&times;16 blocks called MCUs. Rotating by 90, 180, or 270&deg; rearranges the blocks without ever decoding them back to raw pixels &mdash; the math works out because a 90&deg; turn just reindexes the block grid. This is called <em>lossless rotation</em> and is why rotating a JPEG by 90&deg; with a good tool produces a byte-identical quality image.
    </p>
    <p>
      Any other angle, or any tool that naively decodes-rotates-reencodes, costs you a compression generation. Three or four round-trips and you&rsquo;ll see visible artifacts.
    </p>

    <h2>PNG, WebP, and other formats</h2>
    <p>
      PNG, WebP (lossless), AVIF (lossless), and TIFF are not JPEG and do not have the MCU alignment constraint. Rotation is always pixel-perfect because the codec is lossless. You can rotate by any angle as often as you like with no quality cost; only file size changes, and only marginally.
    </p>
    <p>
      Lossy WebP and lossy AVIF behave like JPEG: a true lossless 90&deg; path exists, but only if the tool uses it.
    </p>

    <h2>Arbitrary-angle rotation and the expanding canvas</h2>
    <p>
      When you rotate by, say, 7&deg; to level a horizon, the rotated rectangle no longer fits inside its original bounding box. Tools offer three choices:
    </p>
    <ul>
      <li><strong>Expand canvas:</strong> output grows to fit the rotated image; corners are transparent (PNG/WebP) or filled with a background color.</li>
      <li><strong>Crop to fit:</strong> keep the original aspect ratio; lose some content at the corners.</li>
      <li><strong>Crop to inscribed rectangle:</strong> keep the rotated content; lose more edges but no empty corners.</li>
    </ul>
    <p>
      For horizon-leveling, crop-to-inscribed is usually what you want. For creative effects, expand canvas with a solid color is more controllable.
    </p>

    <h2>Batch rotation workflows</h2>
    <p>
      Three common batch jobs:
    </p>
    <ol>
      <li><strong>Normalize EXIF:</strong> bake rotation into pixels and strip the Orientation tag for every file in a folder. Fixes sideways thumbnails forever.</li>
      <li><strong>Fix a scanner batch:</strong> every page came out 90&deg; off because the scanner feed was upside down &mdash; apply a single rotation to hundreds of files.</li>
      <li><strong>Rotate a subset by condition:</strong> only portrait-oriented files, only files matching a name pattern, etc.</li>
    </ol>
    <p>
      Good batch tools preview a single file first so you don&rsquo;t discover at file 847 that you chose the wrong direction.
    </p>

    <h2>Clockwise versus counter-clockwise</h2>
    <p>
      The convention in most software is that &ldquo;Rotate 90&deg;&rdquo; means clockwise unless stated otherwise. If you rotate a sideways portrait by 90&deg; and it ends up upside-down instead of upright, you needed counter-clockwise. No shame in always doing one, checking, and undoing if wrong.
    </p>
    <p>
      A useful mnemonic: imagine turning a steering wheel. 90&deg; right turns the top of the image toward the right side; 90&deg; left turns the top toward the left.
    </p>

    <h2>Flipping is not rotating</h2>
    <p>
      Horizontal flip (mirror) and 180&deg; rotation look similar on symmetric content but differ on text and faces. Rotating 180&deg; turns text upside-down but keeps its reading direction; flipping horizontally reverses every letter. Don&rsquo;t use a flip when you meant a rotation, or you&rsquo;ll hand someone a mirror-image business card.
    </p>

    <h2>Preserving metadata through rotation</h2>
    <p>
      When you bake rotation into pixels, a good tool keeps the rest of the EXIF (camera make/model, GPS, timestamp) and resets only the Orientation tag to 1. A bad tool strips everything, which may be fine for sharing but destructive if you need to keep authorship or capture data.
    </p>
    <p>
      If you want the rotation <em>and</em> the metadata gone (for privacy), combine rotation with a dedicated EXIF stripper rather than relying on a tool that does both invisibly.
    </p>

    <h2>Phone photos: the Orientation-baking workflow</h2>
    <p>
      If you&rsquo;re building a content pipeline (product uploads, user-submitted photos, a blog backend), bake Orientation on ingest:
    </p>
    <ol>
      <li>Read the EXIF Orientation tag.</li>
      <li>If it&rsquo;s anything other than 1, apply the corresponding pixel rotation.</li>
      <li>Reset the Orientation tag to 1.</li>
      <li>Save the result as the canonical version.</li>
    </ol>
    <p>
      Every downstream tool now sees an upright image with a neutral Orientation tag &mdash; no more sideways thumbnails when a naive resize strips the tag.
    </p>

    <h2>Rotation direction on touchscreens</h2>
    <p>
      Multi-touch rotation gestures (two fingers, rotate) rotate continuously, which is handy for creative work but unpredictable for precise 90&deg; results. Most good tools snap to 90&deg; increments near the cardinal directions. If your fine rotations are producing 89.7&deg; or 90.2&deg; results, look for a snap-to-90 setting or use the explicit 90&deg; button instead of the gesture.
    </p>

    <h2>Deskewing versus rotation</h2>
    <p>
      A scanned page that&rsquo;s 3&deg; off isn&rsquo;t a rotation problem, it&rsquo;s a deskew problem. Deskew tools detect the natural horizontal or vertical lines in an image (text baselines, horizon, building edges) and compute the correction automatically. Manual rotation to the same angle is fine for one file; for a stack of scans, auto-deskew saves hours.
    </p>
    <p>
      After deskew, you usually want to crop to the inscribed rectangle so the corners &mdash; now containing slivers of background &mdash; disappear cleanly. The order is always: deskew, then crop.
    </p>

    <h2>Rotation in the context of responsive design</h2>
    <p>
      CSS can rotate with <code>transform: rotate(7deg)</code> at render time, without touching the image file. This is the right choice when the rotation is a decorative effect and the source image should remain pristine for other uses. Bake the rotation only when:
    </p>
    <ul>
      <li>The destination doesn&rsquo;t support CSS transforms (email, some CMSes).</li>
      <li>You need the rotated image to have new bounding-box dimensions.</li>
      <li>The rotation is correcting an error in the source rather than styling.</li>
    </ul>

    <h2>Filename hygiene</h2>
    <p>
      After baking rotation, add a suffix to the output filename (<code>-rotated</code>, <code>-upright</code>) so you can distinguish the processed file from the original at a glance. This is especially useful for workflows where the original might still exist somewhere and you don&rsquo;t want to accidentally use the sideways source.
    </p>
    <p>
      Never overwrite the original when rotating; always write to a new filename. If you change your mind about the direction, the original is still there.
    </p>

    <h2>Common mistakes</h2>
    <p>
      The classic error is re-encoding a JPEG four times while trying each rotation direction. Each save bakes in more artifacts. Pick a direction, preview once, commit once. Another subtle trap: rotating a JPEG with dimensions that aren&rsquo;t multiples of 8 or 16 forces the tool to either crop a few edge pixels or fall back to lossy rotation &mdash; read the tool&rsquo;s warning carefully. Also watch out for tools that claim &ldquo;lossless rotation&rdquo; but actually re-encode with a high quality setting; the difference is measurable if not always visible. Finally, rotating PNGs that contain text to make vertical banners often produces ugly anti-aliasing at the new orientation &mdash; better to re-typeset than to rotate.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Our <a href="/tools/image-rotate">image rotate tool</a> handles 90/180/270&deg; rotations losslessly for JPEGs and supports arbitrary angles for other formats. If you actually need a mirror image rather than a rotation, the <a href="/tools/image-flip">image flip tool</a> is the right button. And when rotation has revealed crooked composition, the <a href="/tools/image-cropper">image cropper</a> recovers it.
    </p>
  </>
);
