import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      HEIC is the default photo format on iPhones since iOS 11, and it&rsquo;s still a compatibility headache nearly everywhere else. Windows users double-click a shared HEIC and get an error; older photo-printing kiosks reject it; many web publishing tools and CMSes choke on it. JPEG, by contrast, works everywhere, at the cost of larger files and no support for features like HDR or multi-image burst storage. Converting is usually one-click, but there are quality, metadata, and workflow choices worth making consciously. This guide explains why HEIC exists, when to convert, and how to keep EXIF through the conversion.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Why iPhones shoot HEIC</h2>
    <p>
      HEIC (High Efficiency Image Container) uses the HEVC codec to compress photos roughly 50% smaller than JPEG at the same visual quality. On a 256&nbsp;GB iPhone that&rsquo;s real money: your Photos library holds about twice as many pictures.
    </p>
    <p>
      It also supports multi-image containers (Live Photos, burst sequences), wider color gamut, and 10-bit color for richer HDR. These are the reasons Apple switched to it by default. The downside: HEIC is patent-encumbered HEVC, which has kept it out of many third-party ecosystems.
    </p>

    <h2>Where HEIC breaks compatibility</h2>
    <p>
      HEIC works in Apple&rsquo;s ecosystem and modern versions of most major platforms, but has gaps:
    </p>
    <ul>
      <li><strong>Windows 10/11:</strong> needs an extension pack (sometimes paid) to preview.</li>
      <li><strong>Older Android:</strong> partial support; depends on OEM.</li>
      <li><strong>Many CMSes and forums:</strong> rejected as unsupported upload.</li>
      <li><strong>Print kiosks and photo labs:</strong> often require JPEG.</li>
      <li><strong>Legacy desktop apps:</strong> Microsoft Office, many PDF generators, older image editors.</li>
      <li><strong>Email previews:</strong> recipients on older mail clients see nothing.</li>
    </ul>
    <p>
      If the destination is outside the Apple/iCloud bubble, JPEG (or WebP/PNG) is safer.
    </p>

    <h2>The quality cost of conversion</h2>
    <p>
      Converting HEIC to JPEG means decoding the HEIC, then re-encoding as JPEG. JPEG is less efficient, so a quality-matched JPEG is roughly 2&times; the file size of the original HEIC. A quality-90 JPEG typically looks indistinguishable from the HEIC source on a phone screen; dropping to quality 75 saves substantial bytes with minor visible cost.
    </p>
    <p>
      Don&rsquo;t convert and then re-compress repeatedly. Each round trip bakes in more artifacts. Pick a quality setting once and stick with the converted file.
    </p>

    <h2>Keep EXIF through the conversion</h2>
    <p>
      HEIC files carry full EXIF &mdash; capture date, GPS, camera settings. A good converter copies all of it into the JPEG. A bad converter drops metadata, which can cause:
    </p>
    <ul>
      <li>Sideways photos (lost Orientation tag).</li>
      <li>Photos appearing in &ldquo;no date&rdquo; sections of photo libraries.</li>
      <li>Lost GPS data for map views.</li>
      <li>Lost authorship and copyright for professional files.</li>
    </ul>
    <p>
      Check the output of any new converter against one of your files before trusting it for a batch.
    </p>

    <h2>Live Photos and multi-image HEICs</h2>
    <p>
      A Live Photo is a HEIC image paired with a short MOV video. Converting the HEIC gives you the still image; the motion is lost unless the tool extracts the MOV separately. Some converters output both a JPEG and an MP4; most just give you the still frame.
    </p>
    <p>
      Burst HEICs (multiple frames in one container) typically convert to the first or &ldquo;key&rdquo; frame unless the tool lets you extract all frames.
    </p>

    <h2>Batch conversion</h2>
    <p>
      The most common batch scenario: you transferred a folder of iPhone photos to a Windows PC for editing. Every file is HEIC and nothing wants to open them. A good batch converter:
    </p>
    <ul>
      <li>Handles recursive folder trees.</li>
      <li>Lets you set one quality level for the whole run.</li>
      <li>Preserves EXIF.</li>
      <li>Bakes orientation before stripping the tag.</li>
      <li>Outputs to a separate folder to preserve the HEIC originals.</li>
    </ul>

    <h2>Alternative targets: WebP and PNG</h2>
    <p>
      JPEG is the default HEIC conversion target because of ubiquity, but it&rsquo;s not the only option:
    </p>
    <ul>
      <li><strong>WebP</strong> matches HEIC&rsquo;s efficiency roughly and is supported in all modern browsers and many tools. Good for web upload.</li>
      <li><strong>PNG</strong> is lossless &mdash; use when converting screenshots or images with text/UI elements for archival quality.</li>
      <li><strong>AVIF</strong> matches or beats HEIC efficiency and is gaining support; still too new for some pipelines.</li>
    </ul>
    <p>
      If the destination is a website you control, converting HEIC straight to WebP skips the JPEG step entirely.
    </p>

    <h2>iPhone: stop shooting HEIC if you prefer JPEG</h2>
    <p>
      If HEIC consistently causes friction in your workflow, change the capture setting on the iPhone itself:
    </p>
    <pre>{`Settings > Camera > Formats > Most Compatible`}</pre>
    <p>
      This switches capture to JPEG (and H.264 video) at the cost of storage. Existing HEICs don&rsquo;t convert retroactively, but all new photos will be JPEG from that point forward.
    </p>

    <h2>AirDrop and share-sheet auto-conversion</h2>
    <p>
      iOS tries to be helpful: when you AirDrop a HEIC to a Mac, it stays HEIC; when you share to many third-party apps, iOS often converts on the fly to JPEG. This is why some HEICs reach a Windows PC as JPEGs already &mdash; not because the source was JPEG, but because the share path converted.
    </p>
    <p>
      If you&rsquo;re getting inconsistent formats from different transfer methods, this is why. For predictability, either set Capture to &ldquo;Most Compatible&rdquo; or always transfer the originals (iCloud Photos download or a cable copy of DCIM).
    </p>

    <h2>Preserve color space</h2>
    <p>
      iPhones shoot in Display P3, a wider color gamut than the standard sRGB. When converting to JPEG, the tool can either:
    </p>
    <ul>
      <li>Embed the P3 profile in the JPEG (modern browsers and apps respect it, colors look correct).</li>
      <li>Convert colors to sRGB (safer for dumb viewers; wide-gamut colors get compressed).</li>
    </ul>
    <p>
      For web upload where reach matters more than saturation, sRGB is the pragmatic choice. For photo printing and archival, keep the P3 profile if the printer or destination supports it.
    </p>

    <h2>Browser-based versus desktop conversion</h2>
    <p>
      Three categories of tools:
    </p>
    <ul>
      <li><strong>Browser-based (client-side):</strong> files never leave your device; runs WebAssembly locally. Best for privacy; limited by browser memory on huge batches.</li>
      <li><strong>Online services with upload:</strong> fast and scalable, but your photos are on someone else&rsquo;s server. Read the privacy policy.</li>
      <li><strong>Desktop apps:</strong> best for huge libraries and repeat workflows; slower to set up.</li>
    </ul>
    <p>
      For sensitive photos &mdash; medical records, family photos, document scans &mdash; client-side tools are the only safe option. For mundane snapshots, upload-based conversion is faster and usually fine.
    </p>

    <h2>Handling conversion errors</h2>
    <p>
      Some HEIC files fail to convert because they contain features unsupported by the converter: Live Photo video streams, depth maps for portrait mode, or vendor-specific HDR containers. When a conversion errors:
    </p>
    <ul>
      <li>Try a different tool &mdash; different libraries handle different edge cases.</li>
      <li>Open the HEIC in Photos (Mac) or the iPhone and re-export to JPEG from there.</li>
      <li>If the file is on iCloud Photos, set &ldquo;Transfer to Mac or PC&rdquo; to &ldquo;Automatic&rdquo; in iPhone settings &mdash; this auto-converts to JPEG during sync.</li>
    </ul>

    <h2>Disk space impact</h2>
    <p>
      Converting a library of HEICs to JPEGs roughly doubles storage use for the image collection. A 200&nbsp;GB iCloud library becomes a 400&nbsp;GB folder of JPEGs. Think about whether you need all of them as JPEG or only specific ones (the ones you&rsquo;re sharing, editing, or printing).
    </p>
    <p>
      A selective-conversion workflow &mdash; keep HEIC as the master library, convert on demand for specific uses &mdash; beats full-library conversion for most users. Apple&rsquo;s own Photos app does exactly this when you share outside the ecosystem.
    </p>

    <h2>Naming conventions for mixed libraries</h2>
    <p>
      If you&rsquo;re mid-transition (some HEIC, some JPEG) and want to keep both, a clear naming suffix avoids confusion:
    </p>
    <pre>{`IMG_1234.heic       (original iPhone file)
IMG_1234.jpg        (converted, same content)
IMG_1234-edited.jpg (post-conversion edits)`}</pre>
    <p>
      Some converters append <code>_converted</code> automatically. Pick one pattern and stick with it &mdash; mixed conventions in a library with 5000 photos is a permanent organization problem.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Using a converter that drops EXIF silently, and discovering weeks later that your converted library has no dates or GPS. Converting a HEIC to JPEG at quality 60, saving over the original, and losing detail that never comes back. Ignoring the Orientation tag and publishing sideways photos. Trying to email someone a HEIC and wondering why they can&rsquo;t open it &mdash; convert first. And the subtle one: converting HEIC to PNG thinking PNG is &ldquo;higher quality&rdquo; &mdash; technically lossless, yes, but you can&rsquo;t un-compress what HEIC already threw away, and the resulting PNG is often 4&ndash;8&times; larger for no visible gain.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Our <a href="/tools/heic-to-jpg">HEIC to JPG converter</a> handles single files and batches, preserves EXIF, bakes orientation safely, and offers quality presets. For other format conversions &mdash; PNG to WebP, JPEG to AVIF &mdash; the more general <a href="/tools/image-format-converter">image format converter</a> covers them all. And if the converted files are still bloated, the <a href="/tools/image-compressor">image compressor</a> trims them without touching pixel dimensions.
    </p>
  </>
);
