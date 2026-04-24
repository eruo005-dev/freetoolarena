import Link from "next/link";
import type { Category } from "@/lib/pages";
import {
  DISCLAIMER_COPY,
  DISCLAIMER_LABEL,
  disclaimerKindFor,
} from "@/lib/disclaimers";

/**
 * Renders a compact amber note for tools in a risk category (finance,
 * medical, gaming, home). Returns `null` for categories where no
 * disclaimer is warranted, so callers can drop it in unconditionally.
 */
export function CategoryDisclaimer({
  category,
  className = "",
}: {
  category: Category;
  className?: string;
}) {
  const kind = disclaimerKindFor(category);
  if (!kind) return null;

  return (
    <aside
      role="note"
      className={`rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 ${className}`}
    >
      <p className="font-semibold text-amber-900">{DISCLAIMER_LABEL[kind]}</p>
      <p className="mt-1 text-amber-900/90">
        {DISCLAIMER_COPY[kind]}{" "}
        <Link href="/disclaimers" className="underline hover:text-amber-700">
          Read full disclaimers
        </Link>
        .
      </p>
    </aside>
  );
}
