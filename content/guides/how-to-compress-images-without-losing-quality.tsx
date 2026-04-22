import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      &ldquo;Without losing quality&rdquo; is technically a lie — every lossy
      compressor loses something. The real question is whether you can tell.
      With the right format, the right dimensions, and a reasonable quality
      setting, you can cut a 4MB photo to 200KB and no one — not even you — will
      see the difference. This guide is the short version of what actually moves
      the needle, and what doesn&rsquo;t.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The three quality levers</h2>
    <p>
      Every image compression decision is really three decisions, and most people
      only touch one. The levers are <strong>format</strong> (JPG, PNG, WebP,
      AVIF), <strong>dimensions</strong> (pixel width and height), and{" "}
      <strong>compression quality</strong> (the 0-100 slider). Pull all three and
      the file gets dramatically smaller. Pull only the slider and you&rsquo;re
      leaving most of the savings on the table.
    </p>

    <h2>When JPG beats PNG</h2>
    <p>
      JPG is for photographs — anything with continuous tones, skin, sky,
      landscapes. PNG is for anything with sharp edges and flat color: logos,
      icons, screenshots of UI, text. Save a photo as PNG and you&rsquo;ll end up
      with a 4MB file that a 300KB JPG would match visually. Save a logo as JPG
      and you&rsquo;ll get ugly compression halos around the edges.
    </p>
    <p>
      Rough rule: if the image has a camera in its history, it&rsquo;s a JPG. If
      it came out of Figma, Illustrator, or a screenshot, it&rsquo;s a PNG.
    </p>

    <h2>When WebP and AVIF win</h2>
    <p>
      WebP is usually 25-35% smaller than JPG at the same visual quality, and
      supports transparency like PNG. AVIF goes further — often 50% smaller than
      JPG — but encoders are slower and ancient software doesn&rsquo;t understand
      it. For a modern website or a blog image, WebP is the default answer.
      AVIF if you control the whole stack and care about the last 20% of savings.
    </p>
    <p>
      For anything leaving your site — email, Slack, a print shop, iMessage — stay
      in JPG or PNG. The recipient&rsquo;s tool chain may or may not handle the
      newer formats.
    </p>

    <h2>Resize before you compress</h2>
    <p>
      This is the move that gets skipped most often and saves the most bytes. A
      photo straight off a phone is 4032×3024 pixels. A blog hero image displays
      at maybe 1600px wide. Shipping the phone resolution to a browser is a 6x
      waste. Resize first with an <a href="/tools/image-resizer">image resizer</a>,
      then run the result through an{" "}
      <a href="/tools/image-compressor">image compressor</a>. Compression after
      resizing is vastly more effective than compression alone.
    </p>

    <h2>Acceptable file sizes in the wild</h2>
    <p>
      Rough targets, after both resizing and compression:
    </p>
    <ul>
      <li>
        <strong>Blog hero image</strong> (1600px wide): 150-300KB. Over 500KB and
        your page speed score will notice.
      </li>
      <li>
        <strong>Product photo</strong> (1200px wide): 80-180KB per image. You
        probably have a dozen on the page, so every kilobyte compounds.
      </li>
      <li>
        <strong>Email attachment photo</strong> (1600px wide, decent quality):
        200-400KB. Under that and it starts looking compressed on larger screens.
      </li>
      <li>
        <strong>Social upload</strong>: the platform will recompress anyway, so
        there&rsquo;s no point shipping more than 2MB in.
      </li>
    </ul>

    <h2>Testing with a quality slider</h2>
    <p>
      The honest way to pick a quality setting: export at 90, 80, and 70, open all
      three side by side at 100% zoom, and pick the lowest number where you
      genuinely can&rsquo;t tell the difference from the original. For most
      photos, that&rsquo;s 80-85. For screenshots with text, stay at 90+ or
      you&rsquo;ll see fringing on letters. Don&rsquo;t trust your memory — open
      them side by side.
    </p>

    <h2>What doesn&rsquo;t help</h2>
    <p>
      Running a file through two compressors in a row does nothing good — you
      just compound artifacts. Saving a JPG as JPG repeatedly (opening, editing,
      re-saving) degrades it every time; keep a PNG or RAW master if you&rsquo;re
      going to edit. And obsessing over the last 5KB on a file that&rsquo;s already
      under 200KB is almost never worth it.
    </p>
  </>
);
