import { Header } from "@/components/layout/header";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Pagination } from "@/components/shared/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getAllAthletes } from "@/actions/athlete.actions";
import { AthletesFilters } from "./_components/athletes-filters";

export default async function AthletesPage({
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
    ? params.sport 
    : undefined;

  const { data: athletes, pagination: meta } = await getAllAthletes(page, 9, sportCategory, search);

  const content = (
    <div className={isSignedIn ? "space-y-8" : ""}>
      <PageHeader
        title="Athletes"
        description="Discover talented athletes across India."
      />

      <AthletesFilters />

      {athletes.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center text-center p-8 border border-dashed border-border rounded-xl bg-card">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground">No athletes found</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            We couldn't find any athletes matching your criteria. Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {athletes.map((athlete) => (
            <Link key={athlete.id} href={`/athletes/${athlete.id}`}>
              <Card className="transition-all hover:shadow-md shadow-sm border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 border border-border">
                      <AvatarImage src={athlete.user.avatar || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {athlete.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground line-clamp-1">
                        {athlete.user.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {athlete.user.location || "Location not provided"}
                      </div>
                    </div>
                    <Badge variant="secondary" className="border-0 bg-secondary/60 text-foreground">
                      {athlete.sportCategory}
                    </Badge>
                  </div>
                  <div className="mt-5 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                      <Trophy className="h-4 w-4 text-accent" />
                      {athlete.achievementsCount} achievements
                    </div>
                    {athlete.ranking && (
                      <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                        <Star className="h-4 w-4 text-accent" />
                        #{athlete.ranking}
                      </div>
                    )}
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