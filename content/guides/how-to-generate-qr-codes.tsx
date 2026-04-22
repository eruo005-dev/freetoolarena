import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Generating a QR code takes ten seconds. Generating one that actually scans
      reliably on a menu, a business card, or a banner — that takes a minute of
      thought about what&rsquo;s going inside the code, how big it&rsquo;ll print,
      and where it&rsquo;s going to live. Skip that minute and you&rsquo;ll be
      the person whose conference badge nobody can scan. Here&rsquo;s how to
      avoid it.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What a QR code actually encodes</h2>
    <p>
      A QR code is just a 2D barcode that stores text. Any text — a URL, a phone
      number, a Wi-Fi password, a plain sentence. The important bit: the more
      characters you encode, the denser the code becomes, and the harder it is
      to scan at small sizes or on curved surfaces. A 20-character short URL
      scans cleanly from across a room. A 200-character tracking URL with UTM
      parameters becomes a grid of microscopic dots.
    </p>

    <h2>Shorten the URL first</h2>
    <p>
      If you&rsquo;re encoding a link, do yourself a favor and shorten it before
      generating. A Bitly link, a branded short domain, or a clean custom slug on
      your own site — all three keep the code sparse and scannable.
      There&rsquo;s a second benefit: if the destination ever changes, a short
      URL redirects, but a QR code pointing at the long original is locked in
      forever on whatever printed material it&rsquo;s on.
    </p>
    <p>
      Our <a href="/tools/qr-code-generator">QR code generator</a> makes one for
      any string, but the quality of your code starts with the quality of the
      URL you feed it.
    </p>

    <h2>Error correction levels</h2>
    <p>
      QR codes have four redundancy levels: L (7%), M (15%), Q (25%), H (30%).
      Higher levels let the code survive damage — a smudge, a logo in the
      middle, a fold — but they also make the code denser for the same data.
    </p>
    <ul>
      <li>
        <strong>L</strong>: clean digital contexts (on a screen, in an email).
      </li>
      <li>
        <strong>M</strong>: the sane default for most print jobs.
      </li>
      <li>
        <strong>Q</strong>: outdoor signage, anywhere that might get dirty or
        worn.
      </li>
      <li>
        <strong>H</strong>: when you want to put a logo in the center of the
        code — the logo covers part of the pattern, and H can survive that.
      </li>
    </ul>

    <h2>Minimum print size</h2>
    <p>
      A reasonable baseline: at error correction M with a short URL (under 30
      characters), 1 inch square prints reliably for scanning from 10-12 inches
      away. Longer URLs or higher error correction push that up. For a poster
      scanned from across a room, scale proportionally — the rule of thumb is
      the code should be about 1/10th of the viewing distance.
    </p>
    <p>
      Smaller is always riskier. If the code has to live on a business card,
      keep the URL genuinely short and test on real paper, not just on a
      screen.
    </p>

    <h2>Test from 2-3 phones</h2>
    <p>
      Before you print 500 of anything, scan the code with at least two
      different phones — ideally one iPhone, one Android, one older device.
      Scan from the distance and angle people will actually scan at. About 1 in
      10 codes that look fine on screen fail on a real phone in real light.
      Finding that out after the print run is expensive.
    </p>

    <h2>What breaks QR codes in the wild</h2>
    <p>
      Three things wreck scans more than anything else. <strong>Glossy
      coatings</strong>: a laminated menu under restaurant lighting often reflects
      right where the code is. Matte finishes scan much better.{" "}
      <strong>Curved surfaces</strong>: a code on a coffee cup or a water bottle
      distorts when the surface wraps; keep the code on the flattest face.{" "}
      <strong>Low contrast</strong>: a dark gray code on a black background is
      pretty and unscannable. Dark code on light background, period. Inverting
      the colors works in theory but many scanner apps don&rsquo;t support it.
    </p>

    <h2>One more habit</h2>
    <p>
      Print the URL underneath the QR code in small text. Some phones fail,
      some people don&rsquo;t know how to scan, and typing a short URL is a
      one-second fallback. A QR code should complement a URL, not replace it.
    </p>
  </>
);
