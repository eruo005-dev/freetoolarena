import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      XML is the 30-year-old granddaddy of structured data — verbose,
      strict, and still everywhere you don&rsquo;t expect: RSS feeds,
      SOAP APIs, SVG images, Office file formats (.docx, .xlsx),
      Android layouts, Maven builds, sitemaps, and enterprise data
      exchange. JSON won the web, but XML won the enterprise. This
      guide covers XML syntax (elements, attributes, namespaces),
      when XML is the right choice versus JSON, how to parse and
      generate it safely (entity escaping, injection risks), schemas
      (DTD, XSD, Relax NG), XPath and XSLT, and the gotchas that
      trip up even experienced developers.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>XML basics — the syntax rules</h2>
    <p>
      Every XML document needs a single root element. Tags must
      nest properly. Attributes go in quotes. Case matters.
    </p>
    <p>
      <strong>Minimal valid XML:</strong>
    </p>
    <p>
      <code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</code>
      <br />
      <code>&lt;book id=&quot;42&quot;&gt;</code>
      <br />
      &nbsp;&nbsp;<code>&lt;title&gt;Dune&lt;/title&gt;</code>
      <br />
      &nbsp;&nbsp;<code>&lt;author&gt;Frank Herbert&lt;/author&gt;</code>
      <br />
      <code>&lt;/book&gt;</code>
    </p>
    <p>
      <strong>Elements vs attributes:</strong> elements are the
      boxes (<code>&lt;title&gt;Dune&lt;/title&gt;</code>); attributes
      describe them (<code>id=&quot;42&quot;</code>). Use elements for
      content, attributes for metadata. Content that might contain
      markup or needs structure goes in elements.
    </p>
    <p>
      <strong>Self-closing:</strong> empty elements use{" "}
      <code>&lt;br/&gt;</code> or <code>&lt;br&gt;&lt;/br&gt;</code>.
      Both are valid.
    </p>

    <h2>XML vs JSON — when each wins</h2>
    <p>
      <strong>JSON wins for:</strong> web APIs, JavaScript-native
      workflows, simple data exchange, anything developer-facing
      today. Lighter, parseable natively, human-readable without
      effort.
    </p>
    <p>
      <strong>XML wins for:</strong> document-centric formats (where
      mixed content matters — text with inline tags), schemas with
      strict validation (regulated industries), existing enterprise
      integrations (SOAP, SAP, IBM, banking), tools that require it
      (Office Open XML, Android layouts, SVG).
    </p>
    <p>
      <strong>XML has things JSON doesn&rsquo;t:</strong> namespaces
      (merging data from multiple sources without key collision),
      comments, mixed content (text + elements inline), strict
      schemas (XSD), attributes distinct from elements, XSLT
      transforms, XPath queries.
    </p>
    <p>
      <strong>JSON has things XML doesn&rsquo;t:</strong> array
      syntax, native number/boolean types, terseness, universal
      support in every modern language without a library.
    </p>

    <h2>Namespaces — the feature most people hate</h2>
    <p>
      Namespaces prevent collision when you mix XML from different
      sources. A <code>&lt;title&gt;</code> in HTML means something
      different from <code>&lt;title&gt;</code> in SVG.
    </p>
    <p>
      <strong>Declaration:</strong>{" "}
      <code>&lt;root xmlns:svg=&quot;http://www.w3.org/2000/svg&quot;&gt;</code>
    </p>
    <p>
      <strong>Usage:</strong> prefix element names:{" "}
      <code>&lt;svg:circle r=&quot;10&quot;/&gt;</code>.
    </p>
    <p>
      Namespaces are URIs but they&rsquo;re just identifiers — the
      URL doesn&rsquo;t have to resolve. Most developers copy
      namespaces from docs and never think about them again.
    </p>

    <h2>Escaping — the #1 bug source</h2>
    <p>
      Five characters need escaping in XML:
    </p>
    <p>
      <code>&lt;</code> → <code>&amp;lt;</code>
      <br />
      <code>&gt;</code> → <code>&amp;gt;</code>
      <br />
      <code>&amp;</code> → <code>&amp;amp;</code>
      <br />
      <code>&quot;</code> → <code>&amp;quot;</code> (in attribute values)
      <br />
      <code>&apos;</code> → <code>&amp;apos;</code> (in attribute values)
    </p>
    <p>
      <strong>CDATA sections</strong> let you embed raw text without
      escaping:
    </p>
    <p>
      <code>&lt;![CDATA[any &lt; or &amp; characters here are literal]]&gt;</code>
    </p>
    <p>
      Great for embedding code snippets, HTML content, or
      already-formatted text. Doesn&rsquo;t need to be nested — just
      wraps the block.
    </p>

    <h2>XML schema — validating structure</h2>
    <p>
      <strong>DTD (Document Type Definition):</strong> the original
      schema format. Ancient syntax, limited type system. Still seen
      in HTML/SGML doctypes. Don&rsquo;t write new DTDs.
    </p>
    <p>
      <strong>XSD (XML Schema Definition):</strong> the modern
      standard. Supports types (int, date, string patterns),
      enumerations, cardinality, inheritance. Verbose but powerful.
      The schema is itself XML.
    </p>
    <p>
      <strong>Relax NG:</strong> cleaner schema syntax, popular in
      open-source projects (DocBook). Less common in enterprise.
    </p>
    <p>
      <strong>When to validate:</strong> on input (reject malformed
      data) and on output (catch bugs before shipping). Validate
      selectively if schemas get huge — validating every message on
      a high-throughput pipe kills performance.
    </p>

    <h2>Parsing XML safely</h2>
    <p>
      <strong>XXE attacks:</strong> XML external entity attacks. An
      attacker sends XML with{" "}
      <code>&lt;!ENTITY xxe SYSTEM &quot;file:///etc/passwd&quot;&gt;</code>
      {" "}and your parser dutifully reads that file. Devastating if
      your parser loads external entities by default.
    </p>
    <p>
      <strong>Fix:</strong> disable external entity resolution in
      your XML parser. Every major parser has a flag:
      Python&rsquo;s <code>defusedxml</code>, Java&rsquo;s{" "}
      <code>XMLInputFactory.setProperty(SUPPORT_DTD, false)</code>,
      Node&rsquo;s <code>libxmljs</code> with{" "}
      <code>noent: false</code>.
    </p>
    <p>
      <strong>Billion laughs attack:</strong> nested entities that
      expand exponentially. 10 levels of 10x expansion = 10 billion
      characters. Crashes naive parsers. Modern parsers mostly defend
      against this but check your library.
    </p>
    <p>
      <strong>DOM vs SAX vs StAX:</strong>
    </p>
    <p>
      DOM loads the whole document into memory. Easy, slow, bad for
      large files.
    </p>
    <p>
      SAX is event-driven — parser calls your callbacks as it
      streams. Fast, memory-efficient, harder to write.
    </p>
    <p>
      StAX (pull parser) is the modern middle ground. You pull
      events when you want them. Good for large files with selective
      processing.
    </p>

    <h2>XPath and XSLT</h2>
    <p>
      <strong>XPath</strong> is a query language for XML. Like CSS
      selectors but more powerful. Examples:
    </p>
    <p>
      <code>/book/title</code> — direct child path
      <br />
      <code>//title</code> — any title anywhere
      <br />
      <code>//book[@id=&apos;42&apos;]/title</code> — filtered
      <br />
      <code>count(//book)</code> — function
    </p>
    <p>
      XPath ships with most languages. Learn the 20% that handles
      80% of queries: paths, attribute filters, text() nodes,
      position() filters.
    </p>
    <p>
      <strong>XSLT</strong> transforms XML into other XML, HTML, or
      text. Declarative template language. Powerful but esoteric —
      if you have a choice, use a regular language for
      transformations instead.
    </p>

    <h2>Formatting and indentation</h2>
    <p>
      XML whitespace rules are subtle. Indentation is usually
      ignored inside element content but preserved inside attributes
      and CDATA. Pretty-printers typically use 2- or 4-space
      indentation.
    </p>
    <p>
      When XML is generated programmatically (no pretty-print), it
      often arrives as one giant line. Formatters help developers
      read it. Don&rsquo;t assume the wire format matches what the
      formatter displays.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Forgetting to escape.</strong> Ampersand in data →
      parse error. Angle bracket in data → parse error. Use the
      library&rsquo;s serializer; don&rsquo;t concatenate strings.
    </p>
    <p>
      <strong>Wrong encoding declaration.</strong> Declaring UTF-8
      but writing CP1252 (common on Windows). Characters above ASCII
      127 break. Always save as UTF-8 without BOM.
    </p>
    <p>
      <strong>Mixing tabs and spaces.</strong> XML itself
      doesn&rsquo;t care, but diff tools and humans do. Pick one.
    </p>
    <p>
      <strong>Using XML when JSON would do.</strong> If your data is
      &ldquo;list of records, each with fields,&rdquo; use JSON.
      XML earns its verbosity on document-shaped or schema-heavy
      problems.
    </p>
    <p>
      <strong>Parsing XML with regex.</strong> Doesn&rsquo;t work.
      XML is not a regular language. Use a parser.
    </p>
    <p>
      <strong>Leaving XXE vulnerabilities open.</strong> Default
      parser settings in some languages are dangerous. Disable
      external entities explicitly.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Format and validate XML instantly with the{" "}
      <a href="/tools/xml-formatter">XML formatter</a>. Pair with the{" "}
      <a href="/tools/json-formatter">JSON formatter</a> for comparing
      payload formats, and the{" "}
      <a href="/tools/html-formatter">HTML formatter</a> when your
      XML is really HTML-flavored markup.
    </p>
  </>
);
