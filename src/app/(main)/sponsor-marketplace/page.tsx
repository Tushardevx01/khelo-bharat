"use client";

import { Header } from "@/components/layout/header";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/shared/search-input";
import { Users, MapPin, Star, Handshake } from "lucide-react";

export default function SponsorMarketplacePage() {
  const athletes = [
    { id: "1", name: "Aarav Singh", sport: "CRICKET", location: "Mumbai", ranking: 42, achievements: 8, seekingSponsorship: true },
    { id: "2", name: "Diya Patel", sport: "BADMINTON", location: "Hyderabad", ranking: 15, achievements: 12, seekingSponsorship: true },
    { id: "3", name: "Rohan Kumar", sport: "FOOTBALL", location: "Delhi", ranking: 28, achievements: 6, seekingSponsorship: true },
    { id: "4", name: "Ananya Reddy", sport: "ATHLETICS", location: "Bangalore", ranking: 8, achievements: 15, seekingSponsorship: true },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          title="Sponsor Marketplace"
          description="Discover talented athletes seeking sponsorship opportunities."
        />

        <div className="mt-8">
          <SearchInput placeholder="Search athletes by name, sport, or location..." onSearch={() => {}} />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {athletes.map((athlete) => (
            <Card key={athlete.id} className="transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                      <span className="text-lg font-bold">{athlete.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white">
                        {athlete.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <MapPin className="h-3 w-3" />
                        {athlete.location}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{athlete.sport}</Badge>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-neutral-600">
                    <Star className="h-4 w-4" />
                    #{athlete.ranking}
                  </div>
                  <div className="flex items-center gap-1 text-neutral-600">
                    <Users className="h-4 w-4" />
                    {athlete.achievements} achievements
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button className="flex-1" size="sm">
                    <Handshake className="mr-2 h-4 w-4" />
                    Sponsor
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
