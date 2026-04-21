import type { ReactNode } from "react";

/**
 * Thin wrapper around the `.prose-body` CSS class defined in globals.css.
 * Keeps component code free of raw class-name strings for article bodies.
 */
export function Prose({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`prose-body ${className}`.trim()}>{children}</div>;
}
