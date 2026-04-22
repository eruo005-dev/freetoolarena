import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { HUBS, hubHref } from "@/lib/hubs";

export default function NotFound() {
  return (
    <Container size="narrow" className="py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">
        404
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-slate-600">
        That URL doesn&rsquo;t match anything we&rsquo;ve published. The tools
        and guides that do exist are one click away.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="/tools" variant="primary">
          Browse tools
        </ButtonLink>
        <ButtonLink href="/guides" variant="secondary">
          Browse guides
        </ButtonLink>
        <ButtonLink href="/best" variant="secondary">
          Curated lists
        </ButtonLink>
      </div>

      <section className="mt-14 text-left">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Start from a curated list
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {HUBS.map((hub) => (
            <li key={hub.slug}>
              <Link
                href={hubHref(hub)}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand hover:shadow-sm"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                  {hub.eyebrow}
                </span>
                <span className="mt-2 font-semibold text-slate-900">
                  {hub.h1}
                </span>
                <span className="mt-1 text-sm leading-relaxed text-slate-600">
                  {hub.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
