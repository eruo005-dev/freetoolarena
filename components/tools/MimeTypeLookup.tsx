"use client";

import { useMemo, useState } from "react";

type Mime = { mime: string; ext: string[]; desc: string; cat: string };

const TYPES: Mime[] = [
  // Images
  { mime: "image/jpeg", ext: ["jpg", "jpeg"], desc: "JPEG image", cat: "image" },
  { mime: "image/png", ext: ["png"], desc: "Portable Network Graphics", cat: "image" },
  { mime: "image/gif", ext: ["gif"], desc: "Graphics Interchange Format", cat: "image" },
  { mime: "image/webp", ext: ["webp"], desc: "WebP image", cat: "image" },
  { mime: "image/avif", ext: ["avif"], desc: "AV1 Image File Format", cat: "image" },
  { mime: "image/svg+xml", ext: ["svg"], desc: "Scalable Vector Graphics", cat: "image" },
  { mime: "image/bmp", ext: ["bmp"], desc: "Windows Bitmap", cat: "image" },
  { mime: "image/tiff", ext: ["tif", "tiff"], desc: "Tagged Image File Format", cat: "image" },
  { mime: "image/x-icon", ext: ["ico"], desc: "Icon image", cat: "image" },
  { mime: "image/heic", ext: ["heic"], desc: "High Efficiency Image Container", cat: "image" },
  { mime: "image/heif", ext: ["heif"], desc: "High Efficiency Image File Format", cat: "image" },
  { mime: "image/apng", ext: ["apng"], desc: "Animated PNG", cat: "image" },

  // Audio
  { mime: "audio/mpeg", ext: ["mp3"], desc: "MP3 audio", cat: "audio" },
  { mime: "audio/wav", ext: ["wav"], desc: "Waveform audio", cat: "audio" },
  { mime: "audio/ogg", ext: ["ogg", "oga"], desc: "Ogg audio", cat: "audio" },
  { mime: "audio/webm", ext: ["weba"], desc: "WebM audio", cat: "audio" },
  { mime: "audio/aac", ext: ["aac"], desc: "AAC audio", cat: "audio" },
  { mime: "audio/flac", ext: ["flac"], desc: "Free Lossless Audio Codec", cat: "audio" },
  { mime: "audio/mp4", ext: ["m4a"], desc: "MP4 audio", cat: "audio" },
  { mime: "audio/midi", ext: ["mid", "midi"], desc: "MIDI audio", cat: "audio" },
  { mime: "audio/x-ms-wma", ext: ["wma"], desc: "Windows Media Audio", cat: "audio" },

  // Video
  { mime: "video/mp4", ext: ["mp4"], desc: "MP4 video", cat: "video" },
  { mime: "video/webm", ext: ["webm"], desc: "WebM video", cat: "video" },
  { mime: "video/ogg", ext: ["ogv"], desc: "Ogg video", cat: "video" },
  { mime: "video/quicktime", ext: ["mov"], desc: "QuickTime video", cat: "video" },
  { mime: "video/x-msvideo", ext: ["avi"], desc: "AVI video", cat: "video" },
  { mime: "video/x-matroska", ext: ["mkv"], desc: "Matroska video", cat: "video" },
  { mime: "video/mpeg", ext: ["mpg", "mpeg"], desc: "MPEG video", cat: "video" },
  { mime: "video/x-flv", ext: ["flv"], desc: "Flash video", cat: "video" },
  { mime: "video/3gpp", ext: ["3gp"], desc: "3GPP video", cat: "video" },

  // Text
  { mime: "text/plain", ext: ["txt"], desc: "Plain text", cat: "text" },
  { mime: "text/html", ext: ["html", "htm"], desc: "HyperText Markup Language", cat: "text" },
  { mime: "text/css", ext: ["css"], desc: "Cascading Style Sheets", cat: "text" },
  { mime: "text/csv", ext: ["csv"], desc: "Comma-Separated Values", cat: "text" },
  { mime: "text/javascript", ext: ["js", "mjs"], desc: "JavaScript source", cat: "text" },
  { mime: "text/markdown", ext: ["md", "markdown"], desc: "Markdown", cat: "text" },
  { mime: "text/xml", ext: ["xml"], desc: "XML text", cat: "text" },
  { mime: "text/calendar", ext: ["ics"], desc: "iCalendar", cat: "text" },
  { mime: "text/vcard", ext: ["vcf"], desc: "vCard", cat: "text" },
  { mime: "text/yaml", ext: ["yml", "yaml"], desc: "YAML", cat: "text" },

  // Application
  { mime: "application/json", ext: ["json"], desc: "JSON document", cat: "application" },
  { mime: "application/xml", ext: ["xml"], desc: "XML document", cat: "application" },
  { mime: "application/javascript", ext: ["js"], desc: "JavaScript", cat: "application" },
  { mime: "application/pdf", ext: ["pdf"], desc: "Portable Document Format", cat: "application" },
  { mime: "application/zip", ext: ["zip"], desc: "ZIP archive", cat: "application" },
  { mime: "application/gzip", ext: ["gz"], desc: "GZIP archive", cat: "application" },
  { mime: "application/x-tar", ext: ["tar"], desc: "TAR archive", cat: "application" },
  { mime: "application/x-7z-compressed", ext: ["7z"], desc: "7-Zip archive", cat: "application" },
  { mime: "application/x-rar-compressed", ext: ["rar"], desc: "RAR archive", cat: "application" },
  { mime: "application/octet-stream", ext: ["bin"], desc: "Arbitrary binary data", cat: "application" },
  { mime: "application/x-www-form-urlencoded", ext: [], desc: "URL-encoded form data", cat: "application" },
  { mime: "application/graphql", ext: ["graphql"], desc: "GraphQL query", cat: "application" },
  { mime: "application/ld+json", ext: ["jsonld"], desc: "JSON-LD linked data", cat: "application" },
  { mime: "application/wasm", ext: ["wasm"], desc: "WebAssembly", cat: "application" },
  { mime: "application/rtf", ext: ["rtf"], desc: "Rich Text Format", cat: "application" },
  { mime: "application/sql", ext: ["sql"], desc: "SQL source", cat: "application" },
  { mime: "application/xhtml+xml", ext: ["xhtml"], desc: "XHTML", cat: "application" },
  { mime: "application/rss+xml", ext: ["rss"], desc: "RSS feed", cat: "application" },
  { mime: "application/atom+xml", ext: ["atom"], desc: "Atom feed", cat: "application" },
  { mime: "application/manifest+json", ext: ["webmanifest"], desc: "Web app manifest", cat: "application" },

  // Office
  { mime: "application/msword", ext: ["doc"], desc: "Microsoft Word (legacy)", cat: "office" },
  { mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", ext: ["docx"], desc: "Microsoft Word (OOXML)", cat: "office" },
  { mime: "application/vnd.ms-excel", ext: ["xls"], desc: "Microsoft Excel (legacy)", cat: "office" },
  { mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", ext: ["xlsx"], desc: "Microsoft Excel (OOXML)", cat: "office" },
  { mime: "application/vnd.ms-powerpoint", ext: ["ppt"], desc: "Microsoft PowerPoint (legacy)", cat: "office" },
  { mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation", ext: ["pptx"], desc: "Microsoft PowerPoint (OOXML)", cat: "office" },
  { mime: "application/vnd.oasis.opendocument.text", ext: ["odt"], desc: "OpenDocument Text", cat: "office" },
  { mime: "application/vnd.oasis.opendocument.spreadsheet", ext: ["ods"], desc: "OpenDocument Spreadsheet", cat: "office" },
  { mime: "application/vnd.oasis.opendocument.presentation", ext: ["odp"], desc: "OpenDocument Presentation", cat: "office" },
  { mime: "application/epub+zip", ext: ["epub"], desc: "EPUB e-book", cat: "office" },

  // Fonts
  { mime: "font/woff", ext: ["woff"], desc: "Web Open Font Format", cat: "font" },
  { mime: "font/woff2", ext: ["woff2"], desc: "Web Open Font Format 2", cat: "font" },
  { mime: "font/ttf", ext: ["ttf"], desc: "TrueType Font", cat: "font" },
  { mime: "font/otf", ext: ["otf"], desc: "OpenType Font", cat: "font" },
  { mime: "application/vnd.ms-fontobject", ext: ["eot"], desc: "Embedded OpenType font", cat: "font" },
  { mime: "font/collection", ext: ["ttc"], desc: "TrueType Collection", cat: "font" },

  // Code / Scripts
  { mime: "application/x-sh", ext: ["sh"], desc: "Shell script", cat: "application" },
  { mime: "application/x-python", ext: ["py"], desc: "Python source", cat: "application" },
  { mime: "application/x-perl", ext: ["pl"], desc: "Perl source", cat: "application" },
  { mime: "application/x-ruby", ext: ["rb"], desc: "Ruby source", cat: "application" },
  { mime: "application/x-php", ext: ["php"], desc: "PHP source", cat: "application" },
  { mime: "application/java-archive", ext: ["jar"], desc: "Java archive", cat: "application" },

  // Multipart / Message
  { mime: "multipart/form-data", ext: [], desc: "Multipart form data (file uploads)", cat: "multipart" },
  { mime: "multipart/byteranges", ext: [], desc: "Multipart byte ranges", cat: "multipart" },
  { mime: "multipart/alternative", ext: [], desc: "Alternative representations (email)", cat: "multipart" },
  { mime: "multipart/mixed", ext: [], desc: "Mixed multipart", cat: "multipart" },
  { mime: "message/rfc822", ext: ["eml"], desc: "Email message (RFC 822)", cat: "multipart" },

  // 3D / misc
  { mime: "model/gltf+json", ext: ["gltf"], desc: "glTF JSON 3D model", cat: "model" },
  { mime: "model/gltf-binary", ext: ["glb"], desc: "glTF binary 3D model", cat: "model" },
  { mime: "model/obj", ext: ["obj"], desc: "Wavefront OBJ 3D model", cat: "model" },
  { mime: "model/stl", ext: ["stl"], desc: "Stereolithography 3D model", cat: "model" },

  // Certificates / crypto
  { mime: "application/x-x509-ca-cert", ext: ["crt", "cer"], desc: "X.509 certificate", cat: "application" },
  { mime: "application/pkcs12", ext: ["p12", "pfx"], desc: "PKCS #12 archive", cat: "application" },
  { mime: "application/pkcs7-mime", ext: ["p7m"], desc: "PKCS #7 S/MIME", cat: "application" },
  { mime: "application/x-pem-file", ext: ["pem"], desc: "PEM encoded data", cat: "application" },

  // DB / Data
  { mime: "application/vnd.sqlite3", ext: ["sqlite", "db"], desc: "SQLite database", cat: "application" },
  { mime: "application/x-parquet", ext: ["parquet"], desc: "Apache Parquet", cat: "application" },

  // Containers
  { mime: "application/x-msdownload", ext: ["exe", "dll"], desc: "Windows executable", cat: "application" },
  { mime: "application/vnd.debian.binary-package", ext: ["deb"], desc: "Debian package", cat: "application" },
  { mime: "application/x-rpm", ext: ["rpm"], desc: "RPM package", cat: "application" },
  { mime: "application/vnd.android.package-archive", ext: ["apk"], desc: "Android package", cat: "application" },
  { mime: "application/x-iso9660-image", ext: ["iso"], desc: "ISO disk image", cat: "application" },
];

const CATEGORIES = ["all", "image", "audio", "video", "text", "application", "office", "font", "multipart", "model"];

export function MimeTypeLookup() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^\./, "");
    return TYPES.filter((t) => cat === "all" || t.cat === cat).filter((t) => {
      if (!q) return true;
      return (
        t.mime.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.ext.some((e) => e.toLowerCase().includes(q))
      );
    });
  }, [query, cat]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          Search
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by extension (pdf), MIME (image/png), or description"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = cat === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition capitalize ${
                active
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-slate-700 border-slate-300 hover:border-brand"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="text-left px-3 py-2 font-semibold">MIME Type</th>
              <th className="text-left px-3 py-2 font-semibold">Extensions</th>
              <th className="text-left px-3 py-2 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-3 py-4 text-slate-600">No matches.</td>
              </tr>
            ) : (
              filtered.map((t, i) => (
                <tr key={`${t.mime}-${i}`} className="even:bg-white odd:bg-slate-50">
                  <td className="px-3 py-2 font-mono text-slate-900">{t.mime}</td>
                  <td className="px-3 py-2 text-slate-700">
                    {t.ext.length ? t.ext.map((e) => `.${e}`).join(", ") : "—"}
                  </td>
                  <td className="px-3 py-2 text-slate-700">{t.desc}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">
        Showing {filtered.length} of {TYPES.length} types.
      </p>
    </div>
  );
}
