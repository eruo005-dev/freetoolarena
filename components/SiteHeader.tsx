"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE_NAME } from "@/lib/pages";
import { Container } from "@/components/ui/Container";

const FAV_KEY = "fta.favorites.v1";

/**
 * Sticky site header. Desktop: full nav + favorites chip. Mobile: hamburger
 * that toggles a full-width drawer. Favorites count reads from localStorage
 * (same storage key as FavoriteButton) so users see their saved count
 * without a round-trip.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [favCount, setFavCount] = useState<number | null>(null);

  useEffect(() => {
    const read = () => {
      try {
        const raw = window.localStorage.getItem(FAV_KEY);
        if (!raw) return setFavCount(0);
        const arr = JSON.parse(raw);
        setFavCount(Array.isArray(arr) ? arr.length : 0);
      } catch {
        setFavCount(0);
      }
    };
    read();
    window.addEventListener("fta:favorites-changed", read);
    return () => window.removeEventListener("fta:favorites-changed", read);
  }, []);

  // Close drawer on route change (anchor nav covers most cases, but this
  // also handles programmatic back/forward).
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-slate-900 hover:text-brand"
          onClick={() => setOpen(false)}
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
          className="hidden items-center gap-1 text-sm font-medium text-slate-700 md:flex"
        >
          <NavLink href="/tools">Tools</NavLink>
          <NavLink href="/guides">Guides</NavLink>
          <NavLink href="/best">Best of</NavLink>
          <NavLink href="/favorites">
            <span aria-hidden>★ </span>
            Favorites
            {favCount !== null && favCount > 0 && (
              <span className="ml-1 inline-flex min-w-[1.25rem] justify-center rounded-full bg-amber-100 px-1.5 text-[11px] font-semibold text-amber-800">
                {favCount}
              </span>
            )}
          </NavLink>
          <NavLink href="/about">About</NavLink>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100 md:hidden"
        >
          <span aria-hidden className="text-xl leading-none">
            {open ? "×" : "☰"}
          </span>
        </button>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white md:hidden"
        >
          <Container className="py-3">
            <ul className="flex flex-col text-sm font-medium text-slate-700">
              <MobileLink href="/tools" onClick={() => setOpen(false)}>
                All tools
              </MobileLink>
              <MobileLink href="/guides" onClick={() => setOpen(false)}>
                Guides
              </MobileLink>
              <MobileLink href="/best" onClick={() => setOpen(false)}>
                Best-of lists
              </MobileLink>
              <MobileLink href="/compare" onClick={() => setOpen(false)}>
                Comparisons
              </MobileLink>
              <MobileLink href="/favorites" onClick={() => setOpen(false)}>
                <span aria-hidden className="mr-1">★</span>
                Favorites
                {favCount !== null && favCount > 0 && (
                  <span className="ml-2 inline-flex min-w-[1.25rem] justify-center rounded-full bg-amber-100 px-1.5 text-[11px] font-semibold text-amber-800">
                    {favCount}
                  </span>
                )}
              </MobileLink>
              <MobileLink href="/about" onClick={() => setOpen(false)}>
                About
              </MobileLink>
              <MobileLink href="/trust" onClick={() => setOpen(false)}>
                Trust &amp; safety
              </MobileLink>
              <MobileLink href="/contact" onClick={() => setOpen(false)}>
                Contact
              </MobileLink>
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-md px-3 py-1.5 hover:bg-slate-100 hover:text-brand"
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="flex items-center rounded-md px-2 py-2.5 hover:bg-slate-50 hover:text-brand"
      >
        {children}
      </Link>
    </li>
  );
}
