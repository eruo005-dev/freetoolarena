import Link from "next/link";

/**
 * Compact row of trust signals. Use at the top of landing pages, under
 * the hero, or on the guides hub. Keep it honest — every claim here has
 * to be true of every page on the site.
 */
export function TrustBar({
  variant = "inline",
  className = "",
}: {
  variant?: "inline" | "stacked";
  className?: string;
}) {
  if (variant === "stacked") {
    return (
      <div
        className={`grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2 md:grid-cols-4 ${className}`}
      >
        {TRUST_ITEMS.map((t) => (
          <TrustItem key={t.title} {...t} />
        ))}
      </div>
    );
  }
  return (
    <div
      role="list"
      aria-label="Site guarantees"
      className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-600 ${className}`}
    >
      {TRUST_ITEMS.map((t) => (
        <span
          key={t.title}
          role="listitem"
          className="inline-flex items-center gap-1.5"
        >
          <CheckIcon />
          {t.short}
        </span>
      ))}
      <Link
        href="/trust"
        className="ml-1 inline-flex items-center text-xs font-semibold text-brand hover:text-brand-dark"
      >
        How we keep this safe →
      </Link>
    </div>
  );
}

function TrustItem({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3">
      <span
        aria-hidden
        className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/10 text-brand"
      >
        <CheckIcon strong />
      </span>
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{body}</p>
      </div>
    </div>
  );
}

function CheckIcon({ strong = false }: { strong?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={strong ? "h-4 w-4" : "h-3.5 w-3.5 text-brand"}
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.5 7.6a1 1 0 0 1-1.42.006l-3.5-3.5a1 1 0 0 1 1.414-1.415l2.79 2.79 6.796-6.889a1 1 0 0 1 1.414-.006Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const TRUST_ITEMS: { title: string; body: string; short: string }[] = [
  {
    title: "Runs in your browser",
    body: "Every calculator and converter runs on your device. Your files and inputs never leave your computer.",
    short: "100% in-browser",
  },
  {
    title: "No downloads needed",
    body: "No installers, no executables, no browser extensions. Open the page — use the tool.",
    short: "No downloads",
  },
  {
    title: "No sign-up, no ads-wall",
    body: "No accounts, no email capture, no pop-ups in front of the thing you came for.",
    short: "No sign-up",
  },
  {
    title: "Safe & malware-free",
    body: "Static site, no third-party trackers beyond privacy-friendly analytics. Scanned clean.",
    short: "Malware-free",
  },
];
