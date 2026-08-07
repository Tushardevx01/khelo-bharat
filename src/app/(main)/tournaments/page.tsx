import { Header } from "@/components/layout/header";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Pagination } from "@/components/shared/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getAllTournaments } from "@/actions/tournament.actions";
import { TournamentsFilters } from "./_components/tournaments-filters";
import { TournamentStatus, SportCategory } from "@prisma/client";

export default async function TournamentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { userId } = await auth();
  const isSignedIn = !!userId;

  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page) : 1;
  const search = typeof params.search === "string" ? params.search : undefined;
  const sportCategory = typeof params.sport === "string" && params.sport !== "all" 
    ? (params.sport as SportCategory) 
    : undefined;
  const status = typeof params.status === "string" && params.status !== "all" 
    ? (params.status as TournamentStatus) 
    : undefined;

  const { data: tournaments, pagination: meta } = await getAllTournaments(page, 9, {
    sportCategory,
    status,
    search,
  } as any);

  const content = (
    <div className={isSignedIn ? "space-y-8" : ""}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Tournaments"
          description="Discover and register for tournaments across India."
        />
        {isSignedIn && (
          <Button asChild>
            <Link href="/tournaments/create">Create Tournament</Link>
          </Button>
        )}
      </div>

      <TournamentsFilters />

      {tournaments.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center text-center p-8 border border-dashed border-border rounded-xl bg-card">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground">No tournaments found</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            We couldn't find any tournaments matching your criteria. Try adjusting your filters or check back later.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((tournament) => (
            <Link key={tournament.id} href={`/tournaments/${tournament.id}`}>
              <Card className="h-full bg-card border-border transition-all hover:shadow-md shadow-sm">
                <div className="h-40 bg-muted p-4 flex flex-col justify-between" style={tournament.poster ? { backgroundImage: `url(${tournament.poster})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                  <div className="flex justify-between items-start">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                      {tournament.status.replace(/_/g, " ")}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 relative z-10 -mt-6 bg-card rounded-t-2xl border-t border-border">
                  <Badge variant="secondary" className="mb-2 border-0">
                    {tournament.sportCategory}
                  </Badge>
                  <h3 className="text-lg font-bold text-foreground line-clamp-1">
                    {tournament.title}
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-3 h-4 w-4 text-primary" />
                      {new Date(tournament.startDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-3 h-4 w-4 text-primary" />
                      {tournament.city}, {tournament.state}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-3 h-4 w-4 text-primary" />
                      {tournament.totalParticipants}/{tournament.maxParticipants || "∞"} participants
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Prize Pool</p>
                      <p className="text-sm font-bold text-accent">
                        ₹{tournament.prizePool.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <Button size="sm" className="font-medium">
                      {tournament.status === "REGISTRATION_OPEN" ? "Register Now" : "View Details"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {meta.totalPages > 1 && (
        <div className="mt-8">
          <Pagination currentPage={meta.page} totalPages={meta.totalPages} />
        </div>
      )}
    </div>
  );

  if (isSignedIn) {
    return (
      <DashboardLayout>
        {content}
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {content}
      </main>
    </div>
  );
}