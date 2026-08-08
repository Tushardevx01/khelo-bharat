import { Header } from "@/components/layout/header";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, Handshake } from "lucide-react";
import { getAllSponsors } from "@/actions/sponsor.actions";
import { SponsorsFilters } from "./_components/sponsors-filters";
import { Pagination } from "@/components/shared/pagination";

export default async function SponsorsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page) : 1;
  const search = typeof params.search === "string" ? params.search : undefined;

  const { data: sponsors, pagination: meta } = await getAllSponsors(page, 9, search);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          title="Sponsors"
          description="Connect with leading sports sponsors in India."
        />

        <SponsorsFilters />

        {sponsors.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center text-center p-8 border border-dashed border-border rounded-xl bg-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Handshake className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No sponsors found</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              We couldn&apos;t find any sponsors matching your criteria.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sponsors.map((sponsor) => (
              <Card key={sponsor.id} className="transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground line-clamp-1">
                          {sponsor.companyName}
                        </h3>
                        {sponsor.isVerified && <Badge variant="success" className="text-xs border-0">Verified</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {sponsor.industry || "General Sponsor"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground font-medium">
                      <TrendingUp className="h-4 w-4 text-accent" />
                      ₹{(sponsor.totalSponsored / 100000).toFixed(1)}L sponsored
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground font-medium">
                      <Handshake className="h-4 w-4 text-accent" />
                      {sponsor.activeSponsorships} active
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {meta.totalPages > 1 && (
          <div className="mt-8">
            <Pagination currentPage={meta.page} totalPages={meta.totalPages} />
          </div>
        )}
      </main>
    </div>
  );
}
