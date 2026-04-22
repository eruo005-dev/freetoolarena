import Link from "next/link";
import { SITE_NAME } from "@/lib/pages";
import { Container } from "@/components/ui/Container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-slate-900 hover:text-brand"
        >
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded-md bg-brand text-xs font-bold text-white"
          >
            FT
          </span>
          <span>{SITE_NAME}</span>
        </Link>
        <nav
          aria-label="Primary"
          className="flex items-center gap-1 text-sm font-medium text-slate-700"
        >
          <NavLink href="/tools">Tools</NavLink>
          <NavLink href="/guides">Guides</NavLink>
          <NavLink href="/favorites">
            <span aria-hidden>★ </span>Favorites
          </NavLink>
          <NavLink href="/about">About</NavLink>
        </nav>
      </Container>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-1.5 hover:bg-slate-100 hover:text-brand"
    >
      {children}
    </Link>
  );
}
