import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FavoritesList } from "@/components/FavoritesList";
import { SITE_NAME } from "@/lib/pages";

export const metadata: Metadata = {
  title: `Your favorite tools — ${SITE_NAME}`,
  description:
    "Tools you've starred on Free Tool Arena. Saved in your browser only — no account, no tracking.",
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Favorites", href: "/favorites" },
        ]}
      />
      <PageHeader
        eyebrow="Personal"
        title="Your favorite tools"
        lede="Stored in your browser only — clearing site data clears them. No account required."
      />
      <FavoritesList />
    </Container>
  );
}
