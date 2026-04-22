import { ImageResponse } from "next/og";
import {
  getPageBySlug,
  CATEGORIES,
  SITE_NAME,
  SITE_TAGLINE,
  type Category,
} from "@/lib/pages";
import { CATEGORY_OG_THEME, getOgHero } from "@/lib/og-heroes";

/**
 * Dynamic Open Graph image endpoint.
 *
 *   /og?slug=loan-calculator           -> uses manifest title + category +
 *                                          per-category accent color +
 *                                          (for top calculators) a preview of
 *                                          the answer the tool computes
 *   /og?title=About&eyebrow=Free+Tool  -> ad-hoc for static pages
 *
 * Output is a 1200x630 PNG rendered via Next's Edge runtime ImageResponse,
 * which social scrapers (Twitter, LinkedIn, Slack, Discord) fetch and cache.
 *
 * Design goals:
 *  - Instantly recognizable as part of our site (brand mark, URL).
 *  - Distinct per-category accent so multi-link shares don't visually blur.
 *  - For calculators with known defaults, show a *result teaser* so the
 *    social card previews the answer — higher share-CTR than a bare title.
 */

export const runtime = "edge";

const DEFAULT_ACCENT = "#0f766e";
const DEFAULT_ACCENT_DARK = "#115e59";
const DEFAULT_TINT = "#f8fafc";
const SLATE_200 = "#e2e8f0";
const SLATE_500 = "#64748b";
const SLATE_600 = "#475569";
const SLATE_900 = "#0f172a";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Resolve title/eyebrow either from a slug lookup or from raw params.
  let title = searchParams.get("title") ?? SITE_NAME;
  let eyebrow = searchParams.get("eyebrow") ?? SITE_TAGLINE;
  let typeLabel: string | null = null;
  let category: Category | null = null;
  let hero = null as ReturnType<typeof getOgHero>;

  const slug = searchParams.get("slug");
  if (slug) {
    const page = getPageBySlug(slug);
    if (page) {
      title = page.h1;
      category = page.category;
      const cat = CATEGORIES[page.category]?.label ?? "Free";
      typeLabel = page.type === "tool" ? "Free tool" : "Guide";
      eyebrow = `${cat} · ${typeLabel}`;
      hero = getOgHero(slug);
    }
  }

  // Pick the color theme based on category (falls back to teal brand).
  const theme = category
    ? CATEGORY_OG_THEME[category]
    : { accent: DEFAULT_ACCENT, accentDark: DEFAULT_ACCENT_DARK, tint: DEFAULT_TINT };

  // Trim overlong titles — OG cards crop at ~90 chars visually. When a hero
  // is rendered, the title competes for vertical space, so trim tighter.
  const titleLimit = hero ? 70 : 90;
  const safeTitle =
    title.length > titleLimit ? `${title.slice(0, titleLimit - 1)}…` : title;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: `linear-gradient(135deg, ${theme.tint} 0%, #ffffff 55%, ${theme.tint} 100%)`,
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
              background: theme.accent,
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

        {/* Middle: eyebrow + title + optional hero teaser */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: hero ? "16px" : "20px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: theme.accentDark,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize:
                safeTitle.length > 50 ? (hero ? "54px" : "66px") : hero ? "66px" : "82px",
              fontWeight: 800,
              color: SLATE_900,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
            }}
          >
            {safeTitle}
          </div>

          {hero && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "22px",
                marginTop: "8px",
                padding: "20px 26px",
                background: "white",
                borderRadius: "20px",
                border: `2px solid ${theme.accent}`,
                boxShadow: `0 10px 30px -12px ${theme.accent}55`,
                maxWidth: "1000px",
              }}
            >
              <div
                aria-hidden
                style={{
                  width: "6px",
                  minHeight: "70px",
                  borderRadius: "3px",
                  background: theme.accent,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: SLATE_500,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                  }}
                >
                  {hero.label}
                </div>
                <div
                  style={{
                    fontSize: "60px",
                    fontWeight: 800,
                    color: theme.accentDark,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    marginTop: "2px",
                  }}
                >
                  {hero.value}
                </div>
                {hero.inputs && (
                  <div
                    style={{
                      fontSize: "20px",
                      color: SLATE_600,
                      marginTop: "4px",
                    }}
                  >
                    {hero.inputs}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom row: URL + accent bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${SLATE_200}`,
            paddingTop: "26px",
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
                background: theme.accent,
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
