"use client";

import { useMemo, useState } from "react";

type StatusCode = {
  code: number;
  name: string;
  description: string;
  mnemonic?: string;
  causes?: string;
  use?: string;
};

const CODES: StatusCode[] = [
  { code: 100, name: "Continue", description: "The server has received the request headers and the client should proceed to send the request body.", mnemonic: "Keep going", causes: "Initial part of a request with Expect: 100-continue header", use: "Large file uploads where client wants to verify server is ready" },
  { code: 101, name: "Switching Protocols", description: "The server is switching protocols as requested by the client.", mnemonic: "Protocol upgrade", causes: "Client sent Upgrade header (e.g., WebSocket)", use: "WebSocket handshake" },
  { code: 102, name: "Processing", description: "The server has received and is processing the request, but no response is available yet.", causes: "Long-running WebDAV requests", use: "Prevent client timeout during long operations" },
  { code: 103, name: "Early Hints", description: "Used to return some response headers before final HTTP message.", causes: "Server wants client to preload resources", use: "Resource preloading hints" },

  { code: 200, name: "OK", description: "The request has succeeded.", mnemonic: "Everything is fine", causes: "Successful GET, POST, etc.", use: "Standard success response" },
  { code: 201, name: "Created", description: "The request has been fulfilled and resulted in a new resource being created.", mnemonic: "New thing made", causes: "Successful POST or PUT creating a resource", use: "REST API resource creation" },
  { code: 202, name: "Accepted", description: "The request has been accepted for processing, but the processing has not been completed.", causes: "Async job submitted", use: "Background job queuing" },
  { code: 203, name: "Non-Authoritative Information", description: "The server is a transforming proxy that received a 200 OK from its origin.", causes: "Proxy modified the response", use: "Caching proxies" },
  { code: 204, name: "No Content", description: "The server has successfully fulfilled the request and there is no additional content to send.", mnemonic: "Done, nothing to say", causes: "Successful DELETE or PUT", use: "DELETE endpoints, form submissions with no redirect" },
  { code: 205, name: "Reset Content", description: "Tells the user agent to reset the document which sent this request.", causes: "Form submission", use: "Clear form after submit" },
  { code: 206, name: "Partial Content", description: "The server is delivering only part of the resource due to a range header sent by the client.", causes: "Range request (e.g., video seeking)", use: "Byte-range downloads, video streaming" },
  { code: 207, name: "Multi-Status", description: "Conveys information about multiple resources in situations where multiple status codes might be appropriate.", causes: "WebDAV batch operations", use: "WebDAV" },
  { code: 208, name: "Already Reported", description: "The members of a DAV binding have already been enumerated in a preceding part of the response.", causes: "WebDAV binding", use: "WebDAV" },
  { code: 226, name: "IM Used", description: "The server has fulfilled a request for the resource, and the response is a representation of the result of instance manipulations.", use: "Delta encoding" },

  { code: 300, name: "Multiple Choices", description: "Indicates multiple options for the resource from which the client may choose.", causes: "Server has multiple representations", use: "Content negotiation" },
  { code: 301, name: "Moved Permanently", description: "This and all future requests should be directed to the given URI.", mnemonic: "Moved for good", causes: "URL restructure, domain change", use: "Permanent redirects, SEO migrations" },
  { code: 302, name: "Found", description: "Tells the client to look at another URL (temporarily).", mnemonic: "Temporary detour", causes: "Temporary redirect", use: "Login redirects, A/B tests" },
  { code: 303, name: "See Other", description: "The response to the request can be found under another URI using a GET method.", causes: "After POST, redirect to GET", use: "POST-Redirect-GET pattern" },
  { code: 304, name: "Not Modified", description: "Indicates that the resource has not been modified since the version specified by the request headers.", mnemonic: "Nothing changed", causes: "If-Modified-Since or If-None-Match matched", use: "HTTP caching" },
  { code: 305, name: "Use Proxy", description: "The requested resource is available only through a proxy.", causes: "Proxy required", use: "Deprecated" },
  { code: 307, name: "Temporary Redirect", description: "The request should be repeated with another URI with the same method.", causes: "Temporary redirect preserving method", use: "Temporary redirects that must keep POST/PUT" },
  { code: 308, name: "Permanent Redirect", description: "The request and all future requests should be repeated using another URI with the same method.", causes: "Permanent redirect preserving method", use: "Permanent redirects that must keep method" },

  { code: 400, name: "Bad Request", description: "The server cannot or will not process the request due to an apparent client error.", mnemonic: "Client screwed up", causes: "Malformed syntax, invalid request framing", use: "Validation failures" },
  { code: 401, name: "Unauthorized", description: "Authentication is required and has failed or has not yet been provided.", mnemonic: "Who are you?", causes: "Missing or invalid credentials", use: "Auth required endpoints" },
  { code: 402, name: "Payment Required", description: "Reserved for future use; originally intended for digital cash systems.", causes: "Paywall, quota exceeded", use: "Some APIs for billing" },
  { code: 403, name: "Forbidden", description: "The request was valid, but the server is refusing action.", mnemonic: "I know you, go away", causes: "Insufficient permissions", use: "Authorization failures" },
  { code: 404, name: "Not Found", description: "The requested resource could not be found but may be available in the future.", mnemonic: "Where is it?", causes: "Resource doesn't exist, bad URL", use: "Missing pages or records" },
  { code: 405, name: "Method Not Allowed", description: "A request method is not supported for the requested resource.", causes: "POST to a GET-only endpoint", use: "API method restrictions" },
  { code: 406, name: "Not Acceptable", description: "The requested resource is capable of generating only content not acceptable according to the Accept headers.", causes: "Content negotiation failure", use: "Accept header mismatch" },
  { code: 407, name: "Proxy Authentication Required", description: "The client must first authenticate itself with the proxy.", causes: "Proxy auth needed", use: "Corporate proxies" },
  { code: 408, name: "Request Timeout", description: "The server timed out waiting for the request.", causes: "Slow client", use: "Idle connection cleanup" },
  { code: 409, name: "Conflict", description: "Indicates that the request could not be processed because of conflict in the current state of the resource.", causes: "Concurrent edit, unique constraint violation", use: "Version conflicts in REST APIs" },
  { code: 410, name: "Gone", description: "Indicates that the resource requested is no longer available and will not be available again.", mnemonic: "Permanently deleted", causes: "Intentionally removed", use: "SEO-aware deletion" },
  { code: 411, name: "Length Required", description: "The request did not specify the length of its content, which is required by the requested resource.", causes: "Missing Content-Length", use: "Strict servers" },
  { code: 412, name: "Precondition Failed", description: "The server does not meet one of the preconditions that the requester put on the request.", causes: "If-Match failed", use: "Optimistic concurrency" },
  { code: 413, name: "Payload Too Large", description: "The request is larger than the server is willing or able to process.", causes: "Upload exceeds limit", use: "Upload size guards" },
  { code: 414, name: "URI Too Long", description: "The URI provided was too long for the server to process.", causes: "Very long query string", use: "URL length limits" },
  { code: 415, name: "Unsupported Media Type", description: "The request entity has a media type which the server or resource does not support.", causes: "Wrong Content-Type", use: "API type checks" },
  { code: 416, name: "Range Not Satisfiable", description: "The client has asked for a portion of the file, but the server cannot supply that portion.", causes: "Invalid Range header", use: "Partial downloads" },
  { code: 417, name: "Expectation Failed", description: "The server cannot meet the requirements of the Expect request-header field.", causes: "Expect header issue", use: "Rarely used" },
  { code: 418, name: "I'm a teapot", description: "Any attempt to brew coffee with a teapot should result in the error code 418.", mnemonic: "Joke code from RFC 2324", causes: "April Fools' RFC", use: "Easter eggs" },
  { code: 421, name: "Misdirected Request", description: "The request was directed at a server that is not able to produce a response.", causes: "Wrong server in connection reuse", use: "HTTP/2 connection coalescing" },
  { code: 422, name: "Unprocessable Entity", description: "The request was well-formed but was unable to be followed due to semantic errors.", mnemonic: "Syntactically correct but wrong", causes: "Validation failed after parsing", use: "REST/GraphQL validation errors" },
  { code: 423, name: "Locked", description: "The resource that is being accessed is locked.", causes: "WebDAV lock", use: "WebDAV" },
  { code: 424, name: "Failed Dependency", description: "The request failed because it depended on another request that failed.", causes: "Dependent operation failed", use: "WebDAV" },
  { code: 425, name: "Too Early", description: "Indicates that the server is unwilling to risk processing a request that might be replayed.", causes: "0-RTT replay risk", use: "TLS 1.3 early data" },
  { code: 426, name: "Upgrade Required", description: "The client should switch to a different protocol.", causes: "Protocol upgrade needed", use: "Force protocol upgrades" },
  { code: 428, name: "Precondition Required", description: "The origin server requires the request to be conditional.", causes: "Missing If-Match", use: "Avoid lost updates" },
  { code: 429, name: "Too Many Requests", description: "The user has sent too many requests in a given amount of time.", mnemonic: "Slow down", causes: "Rate limit exceeded", use: "API throttling" },
  { code: 431, name: "Request Header Fields Too Large", description: "The server is unwilling to process the request because its header fields are too large.", causes: "Oversized headers", use: "Header size limits" },
  { code: 451, name: "Unavailable For Legal Reasons", description: "A server operator has received a legal demand to deny access to a resource.", mnemonic: "Fahrenheit 451", causes: "Court order, censorship", use: "Content takedowns" },

  { code: 500, name: "Internal Server Error", description: "A generic error message, given when an unexpected condition was encountered.", mnemonic: "Server blew up", causes: "Unhandled exception, bug", use: "Catch-all server error" },
  { code: 501, name: "Not Implemented", description: "The server either does not recognize the request method, or it lacks the ability to fulfil the request.", causes: "Feature not built", use: "Placeholder endpoints" },
  { code: 502, name: "Bad Gateway", description: "The server was acting as a gateway or proxy and received an invalid response from the upstream server.", mnemonic: "Upstream broken", causes: "Upstream crashed or returned garbage", use: "Reverse proxy errors" },
  { code: 503, name: "Service Unavailable", description: "The server cannot handle the request (because it is overloaded or down for maintenance).", mnemonic: "Come back later", causes: "Overloaded, maintenance", use: "Maintenance mode, capacity overload" },
  { code: 504, name: "Gateway Timeout", description: "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.", causes: "Upstream too slow", use: "Reverse proxy timeouts" },
  { code: 505, name: "HTTP Version Not Supported", description: "The server does not support the HTTP protocol version used in the request.", causes: "Old/new HTTP version", use: "Protocol policy" },
  { code: 506, name: "Variant Also Negotiates", description: "Transparent content negotiation for the request results in a circular reference.", causes: "Config error", use: "Rare" },
  { code: 507, name: "Insufficient Storage", description: "The server is unable to store the representation needed to complete the request.", causes: "Disk full", use: "WebDAV" },
  { code: 508, name: "Loop Detected", description: "The server detected an infinite loop while processing the request.", causes: "Recursive WebDAV binding", use: "WebDAV" },
  { code: 510, name: "Not Extended", description: "Further extensions to the request are required for the server to fulfil it.", causes: "Extension required", use: "Rare" },
  { code: 511, name: "Network Authentication Required", description: "The client needs to authenticate to gain network access.", causes: "Captive portal", use: "Public WiFi login" },
];

const CATEGORIES = [
  { key: "all", label: "All", range: [100, 599] as [number, number] },
  { key: "1xx", label: "1xx Informational", range: [100, 199] as [number, number] },
  { key: "2xx", label: "2xx Success", range: [200, 299] as [number, number] },
  { key: "3xx", label: "3xx Redirection", range: [300, 399] as [number, number] },
  { key: "4xx", label: "4xx Client Error", range: [400, 499] as [number, number] },
  { key: "5xx", label: "5xx Server Error", range: [500, 599] as [number, number] },
];

export function HttpStatusCodeLookup() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const activeCat = CATEGORIES.find((c) => c.key === cat) ?? CATEGORIES[0];
    const [lo, hi] = activeCat.range;
    const q = query.trim().toLowerCase();
    return CODES.filter((c) => c.code >= lo && c.code <= hi).filter((c) => {
      if (!q) return true;
      return (
        String(c.code).includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
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
          placeholder="Search by number or name (e.g. 404, Not Found)"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = cat === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setCat(c.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                active
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-slate-700 border-slate-300 hover:border-brand"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-600 text-sm">
            No status codes match your search.
          </div>
        ) : (
          filtered.map((c) => (
            <div key={c.code} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <button
                type="button"
                onClick={() => setExpanded(expanded === c.code ? null : c.code)}
                className="w-full flex items-center justify-between text-left"
              >
                <div>
                  <span className="font-mono font-semibold text-slate-900">{c.code}</span>
                  <span className="ml-3 font-semibold text-slate-900">{c.name}</span>
                </div>
                <span className="text-xs text-slate-500">
                  {expanded === c.code ? "Hide" : "Show"}
                </span>
              </button>
              <p className="mt-2 text-sm text-slate-700">{c.description}</p>
              {expanded === c.code && (
                <div className="mt-3 grid sm:grid-cols-3 gap-3 text-sm border-t border-slate-200 pt-3">
                  {c.mnemonic && (
                    <div>
                      <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 block">Mnemonic</span>
                      <span className="text-slate-700">{c.mnemonic}</span>
                    </div>
                  )}
                  {c.causes && (
                    <div>
                      <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 block">Common Causes</span>
                      <span className="text-slate-700">{c.causes}</span>
                    </div>
                  )}
                  {c.use && (
                    <div>
                      <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 block">Typical Use</span>
                      <span className="text-slate-700">{c.use}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
