import { Header } from "@/components/layout/header";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MapPin, Star, Handshake } from "lucide-react";
import { getAllAthletes } from "@/actions/athlete.actions";
import { MarketplaceFilters } from "./_components/marketplace-filters";
import { Pagination } from "@/components/shared/pagination";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function SponsorMarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page) : 1;
  const search = typeof params.search === "string" ? params.search : undefined;
  const sport = typeof params.sport === "string" ? params.sport : undefined;
  const location = typeof params.location === "string" ? params.location : undefined;

  const { data: athletes, pagination: meta } = await getAllAthletes(page, 12, { sport, location, search } as any);

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          title="Sponsor Marketplace"
          description="Discover talented athletes seeking sponsorship opportunities."
        />

        <MarketplaceFilters />

        {athletes.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center text-center p-8 border border-dashed border-border rounded-xl bg-card">
            <h3 className="text-xl font-bold text-foreground">No athletes found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search criteria.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {athletes.map((athlete) => (
                <Card key={athlete.id} className="transition-all hover:shadow-lg bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border border-border">
                          <AvatarImage src={athlete.user.avatar || undefined} />
                          <AvatarFallback>{athlete.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {athlete.user.name}
                          </h3>
                        </div>
                      </div>
                      <Badge variant="secondary">{athlete.sportCategory}</Badge>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      {athlete.user.location && (
                        <Badge variant="outline" className="flex items-center gap-1 bg-background/50 border-neutral-800">
                          <MapPin className="h-3 w-3" />
                          {athlete.user.location}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 rounded-lg bg-neutral-900/50 p-4 mt-4">
                      <div>
                        <p className="text-xs text-neutral-400">Ranking</p>
                        <p className="font-semibold text-white">
                          #{athlete.ranking || '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400">Achievements</p>
                        <p className="font-semibold text-white">
                          {athlete.achievementsCount}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                      <Button className="flex-1" size="sm">
                        <Handshake className="mr-2 h-4 w-4" />
                        Sponsor
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/athletes/${athlete.id}`}>
                          View Profile
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {meta.totalPages > 1 && (
              <div className="mt-8">
                <Pagination currentPage={meta.page} totalPages={meta.totalPages} />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
