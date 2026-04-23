import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      SVGs are vector images: infinitely scalable, tiny when simple, and perfect for logos, icons, and diagrams in browsers and modern design tools. But plenty of destinations &mdash; social media uploads, email, Office docs, legacy software, print providers &mdash; want raster pixels. Converting SVG to PNG sounds easy, but getting the output resolution right, preserving transparency, and avoiding jagged edges all take a little thought. This guide covers when you actually need PNG output, how to pick an export size, the transparency and antialiasing details that make or break the result, and the cases where leaving SVG as SVG is the smarter move.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Vector versus raster in one sentence</h2>
    <p>
      Vectors describe shapes (lines, curves, fills) mathematically and render at any size; rasters describe a grid of colored pixels at a fixed resolution. Scale a vector up and it stays crisp; scale a raster up and it gets blurry or jagged.
    </p>
    <p>
      SVG is vector; PNG is raster. Converting SVG to PNG picks a fixed resolution for that PNG and locks in the pixel grid at that size.
    </p>

    <h2>When you actually need PNG</h2>
    <p>
      SVG is better in most modern web contexts, but PNG wins when:
    </p>
    <ul>
      <li><strong>Social media uploads</strong> &mdash; almost no platform accepts SVG.</li>
      <li><strong>Email signatures and HTML emails</strong> &mdash; Outlook and many clients strip SVG.</li>
      <li><strong>Office and PDF documents</strong> &mdash; raster pastes more reliably across versions.</li>
      <li><strong>Favicons</strong> &mdash; historically ICO or PNG; SVG favicons are modern but not universal.</li>
      <li><strong>Print providers and photo labs</strong> &mdash; expect rasters at specified DPI.</li>
      <li><strong>Legacy or restrictive CMSes</strong> &mdash; block SVG for security reasons.</li>
    </ul>
    <p>
      If you&rsquo;re not in one of those buckets, keep it SVG.
    </p>

    <h2>Picking the output resolution</h2>
    <p>
      The single biggest decision in converting SVG to PNG is the output pixel size. Ask: how big will the largest display of this image be, in pixels?
    </p>
    <p>
      For a 40&nbsp;px icon that will never display larger, export at 80&nbsp;px (2&times; for retina) or 120&nbsp;px (3&times; for newer phones). For a logo that might appear as a hero image on a 1440p monitor at 500&nbsp;px wide, export at 1000&nbsp;px or 1500&nbsp;px. For a print logo at 2 inches wide, at 300 DPI: 600&nbsp;px wide.
    </p>
    <p>
      When uncertain, export large. Scaling a PNG down in the browser looks fine; scaling it up looks bad. The marginal file-size cost of &ldquo;too big&rdquo; is almost always worth the insurance.
    </p>

    <h2>Transparency</h2>
    <p>
      SVGs default to transparent backgrounds; PNGs support full alpha channel. When converting, keep transparency unless you know the destination needs a solid background. A logo on a transparent PNG drops cleanly onto any background; the same logo on a white PNG leaves a white rectangle around itself on any non-white page.
    </p>
    <p>
      If the destination requires opacity (some older tools), explicitly fill with a background color that matches the target surface. Not white by default &mdash; the target might be a dark UI.
    </p>

    <h2>Antialiasing at the output size</h2>
    <p>
      Vectors are mathematically sharp, but any pixel grid has finite resolution, so the converter has to decide how to color pixels that fall on edges. Good antialiasing produces soft, smooth edges; bad antialiasing produces jagged stair-stepping.
    </p>
    <p>
      Every modern SVG rasterizer does subpixel antialiasing by default. The main thing to check: if your PNG output looks jagged, verify you&rsquo;re exporting at the actual target size rather than a smaller size that the browser will upscale. Upscaling a small antialiased PNG produces the jaggies; rendering at the correct size does not.
    </p>

    <h2>Stroke weight gotcha</h2>
    <p>
      SVG strokes are vector widths. At small output sizes, a 1-unit stroke can be fractions of a pixel wide, which antialiases into a barely-visible gray line. When rasterizing tiny icons, you sometimes have to bump stroke weights or choose an output size where strokes land on integer pixels.
    </p>
    <p>
      A good rule: for icons smaller than 24&nbsp;px, design with minimum 1.5&nbsp;px strokes at final size or accept the softness.
    </p>

    <h2>Multiple export sizes at once</h2>
    <p>
      For icon sets and favicons, one SVG often needs to produce PNGs at multiple sizes: 16, 32, 48, 64, 128, 256, 512 for favicons; 48, 72, 96, 144, 192 for PWA icons; and so on. Good converters offer a preset-export-all feature.
    </p>
    <p>
      Each size can and sometimes should use slightly different versions of the source SVG (simpler shapes at small sizes) for crispness &mdash; a technique called &ldquo;pixel hinting&rdquo; in icon design.
    </p>

    <h2>Color space and profile</h2>
    <p>
      SVGs usually don&rsquo;t declare a color space, which means colors are interpreted as sRGB. PNGs can embed an ICC profile. For most web uses, no profile is fine (viewers assume sRGB). For print, embed the appropriate print profile if the printer requests one.
    </p>
    <p>
      Wide-gamut colors in an SVG (e.g. P3 colors in modern CSS) will be clamped to sRGB in the PNG output unless the converter and destination both handle wide gamut.
    </p>

    <h2>File size considerations</h2>
    <p>
      PNG file size is driven by pixel count and color complexity. A 512&nbsp;&times;&nbsp;512 icon with a few solid colors compresses to 10&ndash;30&nbsp;KB. The same size as a photograph would be 500&nbsp;KB+. For icons, PNG is efficient; for anything approaching photo complexity, JPEG or WebP output from the SVG is probably smaller.
    </p>
    <p>
      Tools like <code>pngquant</code> perform lossy PNG compression with minimal visible cost, often halving file sizes. A good converter either runs this by default or offers it as an option.
    </p>

    <h2>When to keep SVG instead</h2>
    <p>
      For web icons, logos, diagrams, and simple illustrations, SVG beats PNG on almost every axis:
    </p>
    <ul>
      <li>Smaller file size for simple shapes.</li>
      <li>Infinite scalability &mdash; one file handles 16&nbsp;px favicons and 2000&nbsp;px hero logos.</li>
      <li>Styleable via CSS (color changes, hover effects, animations).</li>
      <li>Crisp at every zoom level and screen density.</li>
    </ul>
    <p>
      Only convert to PNG when you need to, not by default.
    </p>

    <h2>Batch converting an icon set</h2>
    <p>
      For design systems with dozens of SVG icons that need PNG mirrors (for docs, Figma previews, or legacy support), batch tools take a folder of SVGs and output one or more PNG sizes for each. Look for:
    </p>
    <ul>
      <li>Recursive folder input.</li>
      <li>Size preset (single size or multi-size export).</li>
      <li>Naming template (<code>icon-name@2x.png</code> style suffixes).</li>
      <li>Transparent or colored background toggle.</li>
    </ul>

    <h2>SVG to PNG for social media preview</h2>
    <p>
      Open Graph and Twitter Card previews need raster images (PNG or JPEG); SVG is not accepted. If your site&rsquo;s branding is SVG-native, set up a conversion pipeline:
    </p>
    <ul>
      <li>Render the SVG into a 1200&nbsp;&times;&nbsp;630 PNG at build time.</li>
      <li>Place on a branded background rather than pure transparent &mdash; previews show on feed backgrounds that are unpredictable.</li>
      <li>Test the preview in debugging tools (Facebook&rsquo;s Sharing Debugger, Twitter&rsquo;s Card Validator) before shipping.</li>
    </ul>

    <h2>Embedded fonts and external references</h2>
    <p>
      An SVG that references a font by name (e.g. <code>font-family: &quot;Inter&quot;</code>) relies on the viewer having that font installed. Browsers might have it; an SVG rasterizer running server-side usually doesn&rsquo;t. Options:
    </p>
    <ul>
      <li>Convert text to paths (outline the text) before rasterization &mdash; the font becomes shapes, no longer needs to be installed.</li>
      <li>Embed the font as base64 in a <code>&lt;style&gt;</code> block inside the SVG.</li>
      <li>Use a converter that lets you upload or specify the font.</li>
    </ul>
    <p>
      Same issue applies to external <code>&lt;image&gt;</code> references and external SVG filter definitions &mdash; anything not self-contained in the SVG can go missing during conversion.
    </p>

    <h2>SVG viewBox and output cropping</h2>
    <p>
      The SVG <code>viewBox</code> attribute defines the visible area of the graphic. If a graphic has content outside its viewBox, that content is invisible in normal rendering but may or may not render in conversion, depending on the tool.
    </p>
    <p>
      When an exported PNG looks cut off or misaligned, check the source SVG&rsquo;s viewBox. Expanding the viewBox or adjusting the <code>preserveAspectRatio</code> attribute often fixes the issue.
    </p>

    <h2>Rasterization at build time</h2>
    <p>
      For projects that need PNGs generated from SVG masters, automate the conversion at build time rather than doing it manually. Node-based tools like <code>sharp</code> or <code>resvg-js</code> can take a folder of SVGs and output sized PNGs as part of a <code>npm run build</code> step.
    </p>
    <pre>{`// build-icons.js (simplified)
import sharp from 'sharp';
import { readdirSync } from 'fs';

for (const file of readdirSync('icons')) {
  if (!file.endsWith('.svg')) continue;
  await sharp('icons/' + file)
    .resize(256)
    .png()
    .toFile('dist/' + file.replace('.svg', '.png'));
}`}</pre>
    <p>
      SVG masters stay the source of truth; PNG outputs regenerate whenever the build runs.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Exporting a logo PNG at 72 DPI because the preview looked fine, then discovering the print proof is pixelated. Exporting too small and counting on the browser to upscale &mdash; it can&rsquo;t, not cleanly. Flattening the transparency into white without checking the destination, then finding ugly white boxes around logos on dark pages. Forgetting that SVG strokes need care at tiny output sizes. Converting an SVG that uses external fonts or filters that don&rsquo;t fully support rasterization, and ending up with missing text or broken effects. Finally, converting to PNG when the destination actually accepts SVG &mdash; you&rsquo;ve just thrown away infinite scalability for no reason.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Our <a href="/tools/svg-to-png">SVG to PNG converter</a> handles single files and batches with multi-size export, transparency support, and high-quality antialiasing. For conversions between other formats (PNG to JPEG, JPEG to WebP), the <a href="/tools/image-format-converter">image format converter</a> does the rest. And for the specific case of icons for a browser tab, the <a href="/tools/favicon-generator">favicon generator</a> produces the full size bundle from a single source.
    </p>
  </>
);
