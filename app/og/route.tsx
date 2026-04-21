import { ImageResponse } from "next/og";
import { getPageBySlug, CATEGORIES, SITE_NAME, SITE_TAGLINE } from "@/lib/pages";

/**
 * Dynamic Open Graph image endpoint.
 *
 *   /og?slug=loan-calculator           -> uses manifest title + category
 *   /og?title=About&eyebrow=Free+Tool  -> ad-hoc for static pages
 *
 * Output is a 1200x630 PNG rendered via Next's Edge runtime ImageResponse,
 * which social scrapers (Twitter, LinkedIn, Slack, Discord) fetch and cache.
 */

export const runtime = "edge";

const BRAND = "#0f766e";
const BRAND_DARK = "#115e59";
const SLATE_50 = "#f8fafc";
const SLATE_200 = "#e2e8f0";
const SLATE_500 = "#64748b";
const SLATE_900 = "#0f172a";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Resolve title/eyebrow either from a slug lookup or from raw params.
  let title = searchParams.get("title") ?? SITE_NAME;
  let eyebrow = searchParams.get("eyebrow") ?? SITE_TAGLINE;
  let typeLabel: string | null = null;

  const slug = searchParams.get("slug");
  if (slug) {
    const page = getPageBySlug(slug);
    if (page) {
      title = page.h1;
      const cat = CATEGORIES[page.category]?.label ?? "Free";
      typeLabel = page.type === "tool" ? "Free tool" : "Guide";
      eyebrow = `${cat} · ${typeLabel}`;
    }
  }

  // Trim overlong titles — OG cards crop at ~90 chars visually.
  const safeTitle = title.length > 90 ? `${title.slice(0, 87)}…` : title;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: `linear-gradient(135deg, ${SLATE_50} 0%, #ffffff 60%)`,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top row: brand mark + site name */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: BRAND,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "26px",
              letterSpacing: "-0.02em",
            }}
          >
            FT
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: SLATE_900,
              letterSpacing: "-0.01em",
            }}
          >
            {SITE_NAME}
          </div>
        </div>

        {/* Middle: eyebrow + title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: BRAND_DARK,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: safeTitle.length > 50 ? "66px" : "82px",
              fontWeight: 800,
              color: SLATE_900,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
            }}
          >
            {safeTitle}
          </div>
        </div>

        {/* Bottom row: URL + accent bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${SLATE_200}`,
            paddingTop: "28px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              color: SLATE_500,
              fontWeight: 500,
            }}
          >
            freetoolarena.com
          </div>
          {typeLabel && (
            <div
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "white",
                background: BRAND,
                padding: "10px 20px",
                borderRadius: "999px",
                letterSpacing: "0.02em",
              }}
            >
              {typeLabel.toUpperCase()}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
