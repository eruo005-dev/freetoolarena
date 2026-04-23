import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      MIME types &mdash; Multipurpose Internet Mail Extensions, now
      officially called &ldquo;media types&rdquo; &mdash; label a
      byte stream so the receiver knows what it is. Served in the
      <code> Content-Type</code> HTTP response header, stamped on
      every file upload, and handed around by the operating system
      for file-open dialogs, they decide whether your browser
      renders, downloads, or rejects the bytes. The format is
      simple: <code>type/subtype</code>, optionally with parameters.
      The registry behind it is maintained by IANA and holds
      thousands of entries. Getting the type wrong causes quiet
      bugs &mdash; images fail to render, JSON downloads instead
      of parsing, fonts fail silently in Firefox. This guide covers
      the structure of a MIME type, the common types you will
      actually meet, how IANA assignment works, file-extension
      mapping, the security implications of
      <code> X-Content-Type-Options: nosniff</code>, and why
      browsers sniff when you let them.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Structure of a media type</h2>
    <p>
      The general form is
      <code> type/subtype;parameter=value</code>. Example:
      <code> text/html; charset=utf-8</code>.
    </p>
    <p>
      <strong>Top-level type</strong> is one of a fixed set:
      <code> application</code>, <code>audio</code>,
      <code> example</code>, <code>font</code>,
      <code> image</code>, <code>message</code>,
      <code> model</code>, <code>multipart</code>,
      <code> text</code>, <code>video</code>.
    </p>
    <p>
      <strong>Subtype</strong> identifies the specific format:
      <code> html</code>, <code>json</code>, <code>png</code>.
    </p>
    <p>
      <strong>Parameters</strong> add context &mdash; charset for
      text, boundary for multipart, profile for linked-data JSON.
    </p>
    <p>
      <strong>Prefixes</strong> on subtypes signal status:
      <code> x-</code> was the pre-2012 convention for
      unregistered types (<code>application/x-custom</code>), now
      deprecated in favor of <code>vnd.</code> for
      vendor-specific, and <code>prs.</code> for personal use.
    </p>

    <h2>Structured syntax suffixes</h2>
    <p>
      A <code>+</code> in the subtype indicates a format built on a
      common syntax. Examples:
    </p>
    <p>
      <code>application/ld+json</code> &mdash; JSON-LD, JSON with
      linked-data semantics.
    </p>
    <p>
      <code>image/svg+xml</code> &mdash; SVG, which is XML.
    </p>
    <p>
      <code>application/atom+xml</code> &mdash; Atom feed, also
      XML.
    </p>
    <p>
      Parsers that recognize the base syntax
      (<code>+json</code>, <code>+xml</code>,
      <code> +cbor</code>, <code>+zip</code>) can fall back to
      generic handling if they do not know the specific type.
    </p>

    <h2>Common types you meet weekly</h2>
    <p>
      <strong>text/html</strong> &mdash; HTML documents.
    </p>
    <p>
      <strong>text/css</strong>, <strong>text/javascript</strong>
      &mdash; stylesheets and scripts. (Historically
      <code> application/javascript</code>; IANA now recommends
      <code> text/javascript</code>.)
    </p>
    <p>
      <strong>application/json</strong> &mdash; JSON. Note:
      <code> application</code>, not
      <code> text</code>, and no charset parameter by spec (JSON is
      defined as UTF-8).
    </p>
    <p>
      <strong>application/xml</strong>,
      <strong> text/xml</strong> &mdash; XML. Either works but
      <code> application/xml</code> is the RFC 7303 recommendation
      for machine-consumed XML.
    </p>
    <p>
      <strong>image/jpeg</strong> (not <code>jpg</code>),
      <strong> image/png</strong>,
      <strong> image/gif</strong>,
      <strong> image/webp</strong>,
      <strong> image/avif</strong>,
      <strong> image/svg+xml</strong>.
    </p>
    <p>
      <strong>application/pdf</strong>,
      <strong> application/zip</strong>,
      <strong> application/octet-stream</strong> (unknown binary).
    </p>
    <p>
      <strong>font/woff2</strong> (since 2017; previously
      <code> application/font-woff2</code>),
      <strong> font/woff</strong>,
      <strong> font/ttf</strong>.
    </p>
    <p>
      <strong>multipart/form-data</strong> &mdash; HTML file uploads.
      Includes a <code>boundary=</code> parameter the server needs
      to split the parts.
    </p>
    <p>
      <strong>application/x-www-form-urlencoded</strong> &mdash;
      standard HTML form submissions without files.
    </p>

    <h2>The IANA registry</h2>
    <p>
      Every officially recognized media type is registered with IANA
      at <code>iana.org/assignments/media-types</code>. The registry
      has four assignment trees:
    </p>
    <p>
      <strong>Standards tree</strong>: common, no prefix
      (<code>application/json</code>).
    </p>
    <p>
      <strong>Vendor tree</strong>: <code>vnd.</code> prefix
      (<code>application/vnd.ms-excel</code>,
      <code> application/vnd.google-earth.kml+xml</code>).
    </p>
    <p>
      <strong>Personal tree</strong>: <code>prs.</code> prefix, for
      personal or experimental types.
    </p>
    <p>
      <strong>Unregistered tree</strong>: <code>x.</code> prefix for
      private use. Legacy types used <code>x-</code> without the dot
      (<code>application/x-shockwave-flash</code>) and most are
      grandfathered in.
    </p>
    <p>
      Registering a new type is a short form plus a public review.
      For API authors: do not invent
      <code> application/my-custom-thing</code>; use
      <code> application/vnd.acme.thing+json</code> so it inherits
      JSON&rsquo;s handling in generic clients.
    </p>

    <h2>File extension mapping</h2>
    <p>
      MIME type and file extension are two ways of saying the same
      thing, and the mapping is almost always in a shared system
      table. On Linux <code>/etc/mime.types</code>; on Apache
      <code> mime.types</code>; Node.js has the <code>mime</code>
      {" "}package; every language ecosystem ships one.
    </p>
    <p>
      Some types have multiple valid extensions:
      <code> image/jpeg</code> &rarr; <code>.jpg</code>,
      <code> .jpeg</code>, <code>.jpe</code>. One extension can
      have multiple valid types depending on content:
      <code> .ogg</code> might be audio or video. Never deduce type
      from extension alone for user uploads &mdash; check the actual
      bytes.
    </p>

    <h2>Content-Type and charset</h2>
    <p>
      For text-based types, always include the charset:
      <code> Content-Type: text/html; charset=utf-8</code>. Without
      it, browsers guess, which can cause
      <code> mojibake</code> &mdash; &ldquo;&eacute;&rdquo; showing
      up as &ldquo;&Atilde;&copy;&rdquo; &mdash; when bytes are
      interpreted in the wrong encoding.
    </p>
    <p>
      For binary types, no charset is meaningful. Including one
      (<code>image/png; charset=utf-8</code>) is harmless but
      nonsensical and worth cleaning up.
    </p>

    <h2>MIME sniffing and nosniff</h2>
    <p>
      Browsers historically sniff the first few hundred bytes of a
      response and override the declared <code>Content-Type</code>
      if they disagree. This helped with mislabeled servers but
      opened a security hole: an attacker uploads a file labeled
      <code> text/plain</code> that browsers sniff as HTML and
      execute scripts from.
    </p>
    <p>
      The defense is the header
      <code> X-Content-Type-Options: nosniff</code>, which tells the
      browser &ldquo;trust my Content-Type, do not sniff.&rdquo;
      Send it on every response. Combined with correct types, it
      neutralizes a whole class of cross-site scripting attacks.
    </p>
    <p>
      <strong>Always send nosniff on user uploads and
      attachments.</strong> Combine with
      <code> Content-Disposition: attachment</code> to force
      download for types that browsers would otherwise render.
    </p>

    <h2>Wildcards in Accept</h2>
    <p>
      The <code>Accept</code> request header uses media types with
      wildcards and quality values (q-factors):
    </p>
    <pre>{`Accept: text/html,application/xhtml+xml,
        application/xml;q=0.9,
        image/webp,image/avif,*/*;q=0.8`}</pre>
    <p>
      <code>*/*</code> matches anything; <code>image/*</code>
      {" "}matches any image. <code>q</code> is a preference weight
      from 0 to 1, default 1. The server picks the most preferred
      type it can produce.
    </p>

    <h2>MIME for streaming and chunked content</h2>
    <p>
      Live-streaming formats have their own types:
    </p>
    <p>
      <strong>application/vnd.apple.mpegurl</strong> (HLS playlist).
    </p>
    <p>
      <strong>application/dash+xml</strong> (DASH manifest).
    </p>
    <p>
      <strong>text/event-stream</strong> (Server-Sent Events).
    </p>
    <p>
      For WebSocket, the initial upgrade is HTTP with
      <code> application/octet-stream</code>-ish payloads, but
      WebSocket itself does not use Content-Type per message.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Serving JSON as <code>text/plain</code>.</strong>
      {" "}Many clients (fetch, XHR) will still parse it on
      <code> response.json()</code>, but CORS preflights and content
      filters key off the declared type. Always declare
      <code> application/json</code>.
    </p>
    <p>
      <strong>Serving JS as <code>text/html</code>.</strong> Older
      CDN misconfigurations. Modern browsers with
      <code> nosniff</code> will refuse to execute, breaking your
      app. Check the <code>Content-Type</code> in dev tools.
    </p>
    <p>
      <strong>Trusting user-declared type on upload.</strong> A user
      renaming <code>malware.exe</code> to <code>image.png</code>
      {" "}and claiming <code>image/png</code> is trivial. Read the
      first bytes (&ldquo;magic numbers&rdquo;) to verify.
    </p>
    <p>
      <strong>Omitting charset on HTML.</strong> Leads to encoding
      guesses that vary by browser. Always declare
      <code> charset=utf-8</code>.
    </p>
    <p>
      <strong>Using <code>application/octet-stream</code> as a
      lazy default.</strong> Forces browsers to download rather
      than render. Acceptable for true binary blobs; annoying for
      actual text or images.
    </p>
    <p>
      <strong>Invented types.</strong>
      <code> application/x-my-widget-v2</code>. Use the vendor tree
      with a structured-syntax suffix:
      <code> application/vnd.mycompany.widget-v2+json</code>.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Look up any type or extension instantly with the{" "}
      <a href="/tools/mime-type-lookup">MIME type lookup</a>. Pair
      with the{" "}
      <a href="/tools/http-status-code-lookup">HTTP status code lookup</a>
      {" "}when Content-Type and response code both need diagnosing,
      and the{" "}
      <a href="/tools/user-agent-parser">user agent parser</a> for
      content-negotiation debugging where UA and Accept interact.
    </p>
  </>
);
