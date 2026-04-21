import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container size="narrow" className="py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">
        404
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-slate-600">
        That URL doesn&rsquo;t match anything we&rsquo;ve published. The
        tools and guides that do exist are one click away.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <ButtonLink href="/tools" variant="primary">
          Browse tools
        </ButtonLink>
        <ButtonLink href="/guides" variant="secondary">
          Browse guides
        </ButtonLink>
      </div>
    </Container>
  );
}
