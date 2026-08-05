"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { PageHeader } from "@/components/layout/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, Handshake } from "lucide-react";

export default function SponsorsPage() {
  const [, setSearch] = useState("");

  const sponsors = [
    { id: "1", name: "Sports India", industry: "Sports Equipment", totalSponsored: 5000000, activeSponsorships: 12, verified: true },
    { id: "2", name: "Fit India", industry: "Fitness & Health", totalSponsored: 3000000, activeSponsorships: 8, verified: true },
    { id: "3", name: "PlayStrong", industry: "Nutrition", totalSponsored: 2000000, activeSponsorships: 6, verified: true },
    { id: "4", name: "AthleteFirst", industry: "Sports Apparel", totalSponsored: 4000000, activeSponsorships: 10, verified: true },
    { id: "5", name: "GameChanger", industry: "Technology", totalSponsored: 1500000, activeSponsorships: 4, verified: false },
    { id: "6", name: "ProSports", industry: "Media", totalSponsored: 2500000, activeSponsorships: 7, verified: true },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          title="Sponsors"
          description="Connect with leading sports sponsors in India."
        />

        <div className="mt-8">
          <SearchInput placeholder="Search sponsors..." onSearch={setSearch} />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((sponsor) => (
            <Card key={sponsor.id} className="transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                    <Building2 className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-neutral-900 dark:text-white">
                        {sponsor.name}
                      </h3>
                      {sponsor.verified && <Badge variant="success" className="text-xs">Verified</Badge>}
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {sponsor.industry}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
                    <TrendingUp className="h-4 w-4" />
                    ₹{(sponsor.totalSponsored / 100000).toFixed(1)}L sponsored
                  </div>
                  <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
                    <Handshake className="h-4 w-4" />
                    {sponsor.activeSponsorships} active
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}