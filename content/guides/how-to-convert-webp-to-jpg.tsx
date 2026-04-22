import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      WebP is great for websites and a nuisance almost everywhere else.
      You&rsquo;ve probably saved an image from a browser, gone to upload it
      to a CMS or attach it to an email, and been told the format isn&rsquo;t
      supported. The fix is a quick conversion to JPG. Here&rsquo;s when to
      do it, what quality setting to pick, and how to handle the transparency
      quirk that catches people out.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Why WebP exists</h2>
    <p>
      Google built WebP to shrink web images. At comparable quality, a WebP
      file is typically 25-35% smaller than the equivalent JPG, which adds up
      when a page ships 20 images. Chrome, Firefox, Safari, and Edge all
      handle WebP natively, so most websites serve WebP and save on
      bandwidth. That&rsquo;s the whole story on the web.
    </p>

    <h2>Why JPG is still the safe default</h2>
    <p>
      The moment an image leaves the browser context, WebP support gets
      patchy. Specific places it breaks:
    </p>
    <ul>
      <li>
        <strong>Older CMSs</strong> (some WordPress installs without the right
        plugin, legacy enterprise tools) — the upload fails or the image
        won&rsquo;t render.
      </li>
      <li>
        <strong>Print shops</strong> — almost none of them accept WebP. JPG or
        TIFF, period.
      </li>
      <li>
        <strong>Some email clients</strong> — Outlook in particular. Ship a
        WebP as an inline image and half your recipients see a broken icon.
      </li>
      <li>
        <strong>iMessage photo previews</strong> — WebPs don&rsquo;t generate
        a preview reliably; JPGs do.
      </li>
      <li>
        <strong>Old slideshow and document software</strong> — PowerPoint,
        older Keynote, most Word versions before 2021.
      </li>
    </ul>
    <p>
      If you&rsquo;re not sure where an image is going, convert to JPG.
      You&rsquo;ll add 100KB and avoid a dozen possible failures.
    </p>

    <h2>Quality slider guidance</h2>
    <p>
      JPG quality is on a 0-100 scale. For photographs, <strong>92</strong> is
      the sweet spot: essentially indistinguishable from the source, reasonable
      file size. Drop to 85 for general web use, 75 for thumbnails. For
      screenshots or graphics with text (even though JPG isn&rsquo;t really
      the right format for those), stay at 95+ or the text edges go fuzzy.
    </p>
    <p>
      Don&rsquo;t crank quality to 100 thinking it&rsquo;s best. 100 disables
      most JPG compression and bloats the file with barely any visual
      improvement over 92. 92 is the practical max.
    </p>

    <h2>The transparency problem</h2>
    <p>
      WebP supports transparency (alpha channel). JPG does not. When you
      convert a WebP that has transparent areas to JPG, those transparent
      pixels need to become <em>something</em> — and if the converter
      silently picks black, you end up with a logo on a black square where
      you expected a clean cutout.
    </p>
    <p>
      The standard fix: flatten to white. Set the background to white before
      export, so transparent areas become white pixels. That matches most
      document and email backgrounds, so the image looks clean. If you know
      the final background (a specific brand color, a dark theme), flatten
      to that color instead.
    </p>
    <p>
      If you actually need transparency preserved, convert to PNG instead of
      JPG. Bigger file, but the alpha channel survives.
    </p>

    <h2>Batch conversion</h2>
    <p>
      Converting one file at a time is fine for a one-off. If you just
      downloaded 40 WebP images from a photo dump, drag them all into a
      batch converter at once. Our{" "}
      <a href="/tools/webp-to-jpg">WebP to JPG converter</a> handles batches
      in the browser, and the more general{" "}
      <a href="/tools/image-format-converter">image format converter</a>
      {" "}handles any format-to-format combination if you also have a few PNGs
      or HEICs mixed in.
    </p>

    <h2>One gotcha on filenames</h2>
    <p>
      If you&rsquo;re converting images destined for a CMS or a file share,
      make sure the filename extension actually changes from <code>.webp</code>
      {" "}to <code>.jpg</code>. Some tools keep the original name, which leaves
      you with <code>photo.webp</code> that&rsquo;s technically a JPG — some
      systems infer format from the extension and will reject it. Thirty
      seconds of rename saves the support ticket.
    </p>
  </>
);
