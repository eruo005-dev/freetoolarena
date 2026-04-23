import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      XML looks like HTML&rsquo;s stricter cousin, but the stricter part matters. Unlike HTML,
      where browsers forgive mismatched tags and missing quotes, XML parsers reject anything
      malformed&mdash;a single unescaped ampersand halts processing. That strictness is the point:
      XML is used where data integrity across systems is more important than author convenience,
      which is why it still powers SOAP, SAML, RSS, SVG, OOXML, and a long tail of industry
      formats. Formatting XML for humans means balancing readability against parser-significant
      whitespace, attribute order stability for diffs, CDATA preservation, and namespace clarity.
      This guide covers the XML declaration, DOCTYPE, namespaces, attribute ordering, whitespace
      handling inside and outside content, CDATA blocks, and the difference between pretty-print
      and canonical XML.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The XML declaration</h2>
    <p>
      The declaration <code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</code>
      must be the first line of the document if present, with no leading whitespace or
      byte-order-mark visible ahead of it. It tells the parser which XML version (1.0 is
      universal; 1.1 adds support for more Unicode characters in names but is rarely used) and
      which character encoding applies. The declaration is optional for UTF-8 and UTF-16 content,
      but including it explicitly avoids ambiguity when files are transferred across systems that
      might re-encode silently.
    </p>
    <pre>{`<?xml version="1.0" encoding="UTF-8"?>
<root>
  <child>content</child>
</root>`}</pre>

    <h2>DOCTYPE and schema references</h2>
    <p>
      DOCTYPE declarations are used in XML to reference a DTD (Document Type Definition). They
      appear after the XML declaration and before the root element. Modern XML usage mostly
      replaces DTDs with XSD schemas, referenced via <code>xsi:schemaLocation</code> or
      <code>xsi:noNamespaceSchemaLocation</code> attributes on the root element. Formatters
      should leave DOCTYPE and schema references alone&mdash;moving them or altering whitespace
      inside them can invalidate the document.
    </p>

    <h2>Namespaces</h2>
    <p>
      XML namespaces prevent element-name collisions when documents combine vocabularies from
      multiple sources. A namespace is declared with <code>xmlns=&quot;URI&quot;</code> for the
      default namespace or <code>xmlns:prefix=&quot;URI&quot;</code> for a prefixed one. The URI
      is an identifier, not a URL the parser fetches. Consistent prefix choices make documents
      easier to read: <code>xs</code> or <code>xsd</code> for XML Schema, <code>xsi</code> for
      XML Schema Instance, <code>soap</code> for SOAP Envelope, <code>atom</code> for Atom feeds.
      Formatters preserve the exact prefix and URI because changing them changes the semantics of
      every child element.
    </p>

    <h2>Attribute order and equality</h2>
    <p>
      XML has no required attribute order&mdash;two elements with the same name and attributes in
      different orders are semantically equal. However, <em>textual</em> diffs care about order,
      so consistent attribute ordering reduces noise in version control. Alphabetical order is the
      simplest rule and is what XML Canonicalization (C14N) uses. A more readable convention
      places <code>xmlns</code> declarations first, followed by <code>id</code> and
      <code>name</code>, then domain-specific attributes. Pick one and let the formatter enforce
      it.
    </p>

    <h2>Significant versus insignificant whitespace</h2>
    <p>
      Whitespace between tags outside text content is usually insignificant, and formatters add
      newlines and indentation freely there. Whitespace <em>inside</em> text content is
      significant by default&mdash;an XML parser reports the whitespace to the consuming
      application. The <code>xml:space=&quot;preserve&quot;</code> attribute flags an element
      whose whitespace must not be altered, and <code>xml:space=&quot;default&quot;</code> allows
      the formatter to treat whitespace normally. When pretty-printing, respect these attributes
      or you risk corrupting content that downstream systems interpret literally.
    </p>
    <pre>{`<root>
  <code xml:space="preserve">
    def hello():
        return "world"
  </code>
  <description>Allow reformatting here.</description>
</root>`}</pre>

    <h2>CDATA sections</h2>
    <p>
      CDATA sections <code>&lt;![CDATA[ ... ]]&gt;</code> are used to include literal text that
      would otherwise need extensive escaping&mdash;code, HTML, or anything full of angle
      brackets and ampersands. Inside CDATA, all characters are taken literally except the
      closing <code>]]&gt;</code> sequence, which you have to split across two CDATA sections if
      your content contains it. Formatters must never reformat CDATA contents. The only valid
      transformation is converting CDATA to escaped text or vice versa, and that is a semantic
      change the formatter should not make automatically.
    </p>

    <h2>Character escaping</h2>
    <p>
      Five characters have special meaning in XML text content and attribute values: <code>&amp;</code>,
      <code>&lt;</code>, <code>&gt;</code>, <code>&apos;</code> (apostrophe), and <code>&quot;</code>.
      They must be escaped as <code>&amp;amp;</code>, <code>&amp;lt;</code>, <code>&amp;gt;</code>,
      <code>&amp;apos;</code>, and <code>&amp;quot;</code> respectively. Numeric character references
      like <code>&amp;#x2014;</code> (em dash) are legal anywhere. A formatter should not silently
      switch between named and numeric entities because the choice may be meaningful to consumers.
    </p>

    <h2>Pretty-print versus canonical XML</h2>
    <p>
      Pretty-printing rewrites an XML document to be human-readable: consistent indentation,
      newlines between elements, and wrapped attributes. Canonical XML (C14N) rewrites a document
      into a byte-identical normalized form used for digital signatures and hash comparisons.
      C14N rules include: no XML declaration, sorted attribute order, normalized whitespace in
      attribute values, resolved namespace declarations, and replacement of empty-element tags
      with start-and-end-tag pairs. C14N output is not especially readable but is reproducible,
      which is what matters for cryptographic operations on SAML assertions or XML-DSig documents.
    </p>

    <h2>Handling large XML files</h2>
    <p>
      Pretty-printing a 500 MB XML file in memory will exhaust most environments. Streaming
      formatters that use a pull parser (StAX in Java, <code>xml.etree.iterparse</code> in
      Python) can pretty-print arbitrarily large documents. For occasional cleanup, splitting the
      file on a known boundary element, formatting chunks, and reassembling works well enough.
      For production pipelines, prefer tools that emit formatted output during serialization
      rather than reformatting after the fact.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Reformatting <code>xml:space=&quot;preserve&quot;</code> content.</strong> Strip
      whitespace there and you corrupt the semantics of the document. A good formatter honors the
      attribute automatically.
    </p>
    <p>
      <strong>Breaking CDATA with indentation.</strong> Formatters that indent inside CDATA add
      leading whitespace to the literal content, which changes what consumers see. CDATA content
      must be untouched.
    </p>
    <p>
      <strong>Changing attribute order in signed documents.</strong> SAML and XML-DSig rely on
      canonical form for signature verification. Reformatting a signed document breaks the
      signature unless you reapply canonicalization identically.
    </p>
    <p>
      <strong>Forgetting to escape ampersands.</strong> A raw <code>&amp;</code> in text or an
      attribute value produces a parser error. Always escape as <code>&amp;amp;</code>.
    </p>
    <p>
      <strong>Mixing attribute quote styles.</strong> XML allows either single or double quotes
      around attribute values, but mixed quoting makes diffs noisy. Pick double quotes and let
      the formatter enforce it.
    </p>
    <p>
      <strong>Assuming empty-element collapse is free.</strong> <code>&lt;tag&gt;&lt;/tag&gt;</code>
      and <code>&lt;tag/&gt;</code> parse to identical infosets, but a formatter that collapses
      them can change the byte signature of a document. For most uses this is harmless; for
      canonical documents it matters.
    </p>
    <p>
      <strong>Editing BOM-containing files without care.</strong> A byte-order-mark before the
      XML declaration is legal in some encodings and illegal in others. Formatters that silently
      add or remove a BOM can break downstream parsers.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Pretty-print, collapse, or canonicalize XML in the browser with the{" "}
      <a href="/tools/xml-formatter">XML formatter</a>. Pair with the{" "}
      <a href="/tools/html-formatter">HTML formatter</a> for XHTML and SVG documents where both
      specs overlap, and the{" "}
      <a href="/tools/json-formatter">JSON formatter</a> when you are translating legacy SOAP/XML
      payloads into JSON REST equivalents.
    </p>
  </>
);
