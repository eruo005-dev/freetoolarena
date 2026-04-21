import type { ReactNode } from "react";

/**
 * Single source of truth for horizontal page width + gutter.
 * `narrow` for article + tool reading pages; `wide` for index/homepage grids.
 */
export function Container({
  children,
  size = "wide",
  className = "",
}: {
  children: ReactNode;
  size?: "narrow" | "wide";
  className?: string;
}) {
  const max = size === "narrow" ? "max-w-3xl" : "max-w-6xl";
  return (
    <div className={`mx-auto ${max} px-4 sm:px-6 ${className}`}>{children}</div>
  );
}
