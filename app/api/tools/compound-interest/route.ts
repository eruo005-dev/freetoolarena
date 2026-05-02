import { NextResponse } from "next/server";
import { compoundInterest } from "@/lib/calculations";

export const dynamic = "force-static";
export const revalidate = 86400;

const ALLOW_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/**
 * GET /api/tools/compound-interest?principal=10000&annualRate=7&years=30&monthlyContribution=500
 */
export function GET(request: Request) {
  const url = new URL(request.url);
  const principal = parseFloat(url.searchParams.get("principal") ?? "0");
  const annualRate = parseFloat(url.searchParams.get("annualRate") ?? "");
  const years = parseFloat(url.searchParams.get("years") ?? "");
  const monthlyContribution = parseFloat(url.searchParams.get("monthlyContribution") ?? "0");
  const compoundingPerYear = parseFloat(url.searchParams.get("compoundingPerYear") ?? "12");

  if (!Number.isFinite(annualRate) || !Number.isFinite(years)) {
    return NextResponse.json(
      {
        error: "Invalid input",
        message:
          "Required: annualRate, years. Optional: principal (default 0), monthlyContribution (default 0), compoundingPerYear (default 12).",
        example:
          "/api/tools/compound-interest?principal=10000&annualRate=7&years=30&monthlyContribution=500",
      },
      { status: 400, headers: ALLOW_HEADERS },
    );
  }

  try {
    const result = compoundInterest({
      principal,
      annualRate,
      years,
      monthlyContribution,
      compoundingPerYear,
    });
    return NextResponse.json(
      {
        ...result,
        input: { principal, annualRate, years, monthlyContribution, compoundingPerYear },
        _meta: {
          tool: "compound-interest-calculator",
          lastVerified: "2026-04-30",
          formula:
            "FV = P(1 + r/n)^(nt) + C × [((1+r/n)^(nt) − 1) / (r/n)] for monthly contributions",
          sources: [
            "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
          ],
          docs: "https://freetoolarena.com/api",
        },
      },
      { headers: ALLOW_HEADERS },
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Calculation failed", message: e instanceof Error ? e.message : String(e) },
      { status: 400, headers: ALLOW_HEADERS },
    );
  }
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: ALLOW_HEADERS });
}
