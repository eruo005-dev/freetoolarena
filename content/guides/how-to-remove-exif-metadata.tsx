import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Every photo you take records hidden metadata called EXIF: camera model, shutter speed, ISO, the exact GPS coordinates where the shot was taken, the date and time down to the second, and sometimes the serial number of the device. Most of this is useful for photographers and catastrophic for privacy. Share a phone photo with someone online and you may have shared your home address. Removing EXIF before publishing is a one-click habit that every creator should pick up, and the stripping can be done without touching a single pixel of the image itself. This guide covers what EXIF contains, when to strip it, and when keeping it matters.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What&rsquo;s actually in an EXIF record</h2>
    <p>
      EXIF (Exchangeable Image File Format) is a standard metadata block attached to JPEG, TIFF, and increasingly WebP/HEIC files. A typical record includes:
    </p>
    <ul>
      <li><strong>Camera make and model</strong> (e.g. Apple iPhone 15 Pro)</li>
      <li><strong>Lens make and model</strong>, focal length, aperture</li>
      <li><strong>Shutter speed, ISO, exposure compensation</strong></li>
      <li><strong>Date and time of capture</strong>, sometimes with timezone</li>
      <li><strong>GPS latitude, longitude, and altitude</strong> &mdash; often precise to a few meters</li>
      <li><strong>Orientation tag</strong> (rotation hint for display)</li>
      <li><strong>Device serial number</strong> (on some cameras)</li>
      <li><strong>Artist/owner name</strong> if configured in-camera</li>
      <li><strong>Software</strong> used to process the file (Lightroom, Photoshop, filter apps)</li>
    </ul>

    <h2>Why privacy matters here</h2>
    <p>
      GPS coordinates are the big one. A parent posts their kid&rsquo;s first-day-of-school picture; the EXIF says latitude 40.748847, longitude -73.985368, and anyone who reads the metadata now knows the family&rsquo;s home or the child&rsquo;s school. Real-estate scammers, stalkers, and casual creeps all know to check this.
    </p>
    <p>
      Timestamps are the second risk. Combined with other public info, an &ldquo;I&rsquo;m working from Paris today&rdquo; post with an EXIF timestamp from 6 hours ago Paris-time verifies someone&rsquo;s location and schedule more precisely than they&rsquo;d like.
    </p>

    <h2>Which platforms strip EXIF and which don&rsquo;t</h2>
    <p>
      Don&rsquo;t rely on platforms to protect you &mdash; behavior varies:
    </p>
    <ul>
      <li><strong>Instagram, Facebook, Twitter/X, LinkedIn:</strong> strip most EXIF on upload, including GPS.</li>
      <li><strong>WhatsApp:</strong> strips most EXIF from photos; forwarded &ldquo;document&rdquo; files may not be stripped.</li>
      <li><strong>Email attachments:</strong> usually untouched.</li>
      <li><strong>Personal websites and blogs:</strong> untouched unless the CMS explicitly strips.</li>
      <li><strong>File transfer services (Dropbox, iCloud):</strong> untouched.</li>
      <li><strong>Image boards and forums:</strong> varies widely.</li>
    </ul>
    <p>
      The safe habit: strip before upload, every time.
    </p>

    <h2>Lossless stripping</h2>
    <p>
      Removing EXIF does not touch the pixel data. Good tools edit only the metadata blocks; the image itself is byte-identical in its pixel representation, and JPEGs stay at their original compression quality. A file will typically shrink by a few KB (sometimes tens of KB if a full-resolution thumbnail preview is stored).
    </p>
    <p>
      Avoid tools that &ldquo;strip EXIF&rdquo; by re-saving the JPEG, which re-encodes and loses quality. A dedicated EXIF tool should be a metadata-only operation.
    </p>

    <h2>The Orientation tag trap</h2>
    <p>
      When you strip EXIF, the Orientation tag goes with it. If the image was a sideways pixel buffer relying on the tag for upright display, it will now show sideways everywhere. The fix: rotate the pixels physically first, then strip the tag.
    </p>
    <p>
      Good EXIF strippers detect the Orientation tag, bake the rotation into the pixels, then strip. Bad ones strip blindly and leave you with sideways photos.
    </p>

    <h2>What else gets stripped</h2>
    <p>
      Beyond EXIF, photos often carry:
    </p>
    <ul>
      <li><strong>IPTC</strong> &mdash; caption, keywords, copyright, authorship (popular with news and stock).</li>
      <li><strong>XMP</strong> &mdash; Adobe&rsquo;s extended metadata (edit history, ratings, keywords).</li>
      <li><strong>ICC profiles</strong> &mdash; color space description.</li>
      <li><strong>Thumbnail previews</strong> &mdash; small copies embedded inside the file.</li>
    </ul>
    <p>
      Most strippers clear EXIF, IPTC, and XMP together. Keep the ICC profile unless you know the destination handles missing color info gracefully &mdash; colors can shift visibly if you strip the profile and the viewer assumes sRGB when the source was Adobe RGB.
    </p>

    <h2>Batch stripping workflows</h2>
    <p>
      For bulk jobs &mdash; entire photo libraries before sharing, all the vacation pics before uploading to cloud storage &mdash; batch strippers process hundreds of files in seconds. Look for:
    </p>
    <ul>
      <li>Recursive folder support.</li>
      <li>Filter by type (JPEG only, skip RAW).</li>
      <li>Keep-originals option (write output to a separate folder).</li>
      <li>Orientation-safe mode.</li>
      <li>Selective strip (keep copyright, remove GPS).</li>
    </ul>

    <h2>When EXIF is useful to keep</h2>
    <p>
      Not every use case demands full stripping:
    </p>
    <ul>
      <li><strong>Professional photography portfolios:</strong> camera, lens, settings are part of the content and interested visitors read them.</li>
      <li><strong>Photo journalism:</strong> timestamps and sometimes GPS are evidence of when and where a photo was taken.</li>
      <li><strong>Insurance and legal claims:</strong> capture metadata can matter as proof.</li>
      <li><strong>Personal photo library organization:</strong> dates and GPS drive map and timeline features.</li>
      <li><strong>Scientific imagery:</strong> capture parameters are part of the data.</li>
    </ul>
    <p>
      For these cases, strip only GPS and author fields before public sharing; keep the rest.
    </p>

    <h2>Selective stripping</h2>
    <p>
      The safest middle ground is selective stripping: remove GPS and author name, keep everything else. Most advanced EXIF tools offer per-field control.
    </p>
    <pre>{`Remove: GPSLatitude, GPSLongitude, GPSAltitude,
        GPSTimeStamp, Artist, OwnerName,
        CameraOwnerName, SerialNumber
Keep:   Make, Model, ExposureTime, FNumber,
        ISO, DateTimeOriginal, ICC profile`}</pre>
    <p>
      This balance keeps the photographic craft visible and the personal data private.
    </p>

    <h2>Verify after stripping</h2>
    <p>
      Don&rsquo;t trust &mdash; verify. After running the strip, open the file in an EXIF viewer and confirm the sensitive fields are actually gone. A tool that claims to strip but leaves a GPS field somewhere is worse than no tool at all because it builds false confidence.
    </p>
    <p>
      Running a file through two different strippers occasionally exposes what one missed. For sensitive content, belt-and-braces is fine.
    </p>

    <h2>Operating system quick-strip options</h2>
    <p>
      Some operating systems offer basic EXIF stripping without a dedicated tool:
    </p>
    <ul>
      <li><strong>Windows:</strong> right-click a file, Properties, Details tab, &ldquo;Remove Properties and Personal Information.&rdquo; Works on a per-file or whole-folder basis.</li>
      <li><strong>macOS:</strong> Preview&rsquo;s &ldquo;Export&rdquo; with the &ldquo;Keep metadata&rdquo; checkbox unchecked strips most fields. For GPS specifically, Photos app&rsquo;s &ldquo;Image &gt; Location &gt; Hide Location&rdquo; works before export.</li>
      <li><strong>iOS:</strong> when sharing, tap &ldquo;Options&rdquo; at the top of the share sheet and toggle off &ldquo;Location.&rdquo;</li>
      <li><strong>Android:</strong> varies by OEM; Google Photos has a &ldquo;Remove geolocation&rdquo; per-file option.</li>
    </ul>
    <p>
      These built-ins handle the common cases. Dedicated tools still beat them for batch work and selective stripping.
    </p>

    <h2>Legal and journalistic considerations</h2>
    <p>
      For journalism, never strip EXIF from evidence photos without a clean copy retained for source verification. The metadata is often the difference between &ldquo;this claim is credible&rdquo; and &ldquo;we can&rsquo;t verify this.&rdquo; Keep originals; publish stripped derivatives.
    </p>
    <p>
      For legal discovery, metadata is part of the document and stripping it can itself be an issue. Consult counsel before bulk stripping anything related to litigation.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Stripping EXIF with a tool that re-encodes the JPEG, silently losing quality. Stripping without baking orientation and ending up with sideways photos. Trusting a social platform to strip when it strips some fields but not all. Forgetting that the strip only applies to the current file &mdash; if you share the original HEIC from your phone later, you&rsquo;re back to square one. And the subtle one: some privacy-conscious users strip EXIF but leave the filename &ldquo;IMG_20250810_142355.jpg&rdquo;, which still leaks the capture date. Rename files too for full hygiene.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Our <a href="/tools/exif-remover">EXIF remover</a> performs a lossless metadata strip, bakes orientation safely, and offers selective-keep for fields that are legitimately useful. To confirm the result, the <a href="/tools/exif-viewer">EXIF viewer</a> shows exactly what&rsquo;s in any file. And for a privacy pass that also reduces file size, run stripped files through the <a href="/tools/image-compressor">image compressor</a> afterwards.
    </p>
  </>
);
