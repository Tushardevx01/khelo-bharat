import { Header } from "@/components/layout/header";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Pagination } from "@/components/shared/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Building2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getAllSchools } from "@/actions/school.actions";
import { SchoolsFilters } from "./_components/schools-filters";

export default async function SchoolsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { userId } = await auth();
  const isSignedIn = !!userId;

  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page) : 1;
  const search = typeof params.search === "string" ? params.search : undefined;

  const { data: schools, pagination: meta } = await getAllSchools(page, 9, search);

  const content = (
    <div className={isSignedIn ? "space-y-8" : ""}>
      <PageHeader
        title="Schools"
        description="Discover schools with excellent sports programs."
      />

      <SchoolsFilters />

      {schools.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center text-center p-8 border border-dashed border-border rounded-xl bg-card">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground">No schools found</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            We couldn&apos;t find any schools matching your search. Check back later as more schools join the platform.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schools.map((school) => (
            <Link key={school.id} href={`/schools/${school.id}`}>
              <Card className="transition-all hover:shadow-md shadow-sm border-border bg-card h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 border border-border">
                      <AvatarImage src={school.user.avatar || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {school.schoolName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-foreground line-clamp-1">
                          {school.schoolName}
                        </h3>
                        {school.isVerified && (
                          <Badge variant="success" className="text-xs border-0 whitespace-nowrap">Verified</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        <span className="line-clamp-1">
                          {school.city ? `${school.city}, ${school.state}` : "Location not provided"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                      <Users className="h-4 w-4 text-accent" />
                      {school.totalStudents.toLocaleString()} students
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      {school.rating.toFixed(1)}
                    </div>
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
