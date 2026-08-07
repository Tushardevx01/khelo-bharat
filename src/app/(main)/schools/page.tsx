"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { Pagination } from "@/components/shared/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export default function SchoolsPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const [, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const schools = [
    { id: "1", name: "Delhi Public School", location: "Mumbai, Maharashtra", rating: 4.8, students: 2500, verified: true },
    { id: "2", name: "St. Xavier's School", location: "Delhi, NCR", rating: 4.6, students: 1800, verified: true },
    { id: "3", name: "Ryan International School", location: "Bangalore, Karnataka", rating: 4.5, students: 2200, verified: true },
    { id: "4", name: "DPS RK Puram", location: "New Delhi", rating: 4.7, students: 3000, verified: true },
    { id: "5", name: "The Doon School", location: "Dehradun, Uttarakhand", rating: 4.9, students: 1200, verified: true },
    { id: "6", name: "Lawrence School", location: "Ooty, Tamil Nadu", rating: 4.4, students: 800, verified: false },
  ];

  const content = (
    <div className={isSignedIn ? "space-y-8" : ""}>
      <PageHeader
        title="Schools"
        description="Discover schools with excellent sports programs."
      />

      <div className="mt-8">
        <SearchInput placeholder="Search schools..." onSearch={setSearch} />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {schools.map((school) => (
          <Link key={school.id} href={`/schools/${school.id}`}>
            <Card className="transition-all hover:shadow-md shadow-sm border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {school.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-foreground">
                        {school.name}
                      </h3>
                      {school.verified && (
                        <Badge variant="success" className="text-xs border-0">Verified</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {school.location}
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                    <Users className="h-4 w-4 text-accent" />
                    {school.students.toLocaleString()} students
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    {school.rating}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />
      </div>
    </div>
  );

  if (!isLoaded) return null;

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