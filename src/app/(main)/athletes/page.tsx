"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { PageHeader } from "@/components/layout/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { Pagination } from "@/components/shared/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Trophy } from "lucide-react";
import { SPORT_CATEGORIES } from "@/constants";
import Link from "next/link";

export default function AthletesPage() {
  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("all");
  const [page, setPage] = useState(1);

  const athletes = [
    { id: "1", name: "Aarav Singh", sport: "CRICKET", location: "Mumbai, Maharashtra", ranking: 42, achievements: 8, avatar: "" },
    { id: "2", name: "Diya Patel", sport: "BADMINTON", location: "Hyderabad, Telangana", ranking: 15, achievements: 12, avatar: "" },
    { id: "3", name: "Rohan Kumar", sport: "FOOTBALL", location: "Delhi, NCR", ranking: 28, achievements: 6, avatar: "" },
    { id: "4", name: "Ananya Reddy", sport: "ATHLETICS", location: "Bangalore, Karnataka", ranking: 8, achievements: 15, avatar: "" },
    { id: "5", name: "Vikram Joshi", sport: "CRICKET", location: "Pune, Maharashtra", ranking: 35, achievements: 5, avatar: "" },
    { id: "6", name: "Nisha Sharma", sport: "TENNIS", location: "Chennai, Tamil Nadu", ranking: 22, achievements: 9, avatar: "" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          title="Athletes"
          description="Discover talented athletes across India."
        />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <SearchInput placeholder="Search athletes..." onSearch={setSearch} />
          </div>
          <Select value={sportFilter} onValueChange={setSportFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Sports" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              {SPORT_CATEGORIES.map((sport) => (
                <SelectItem key={sport.value} value={sport.value}>
                  {sport.icon} {sport.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {athletes.map((athlete) => (
            <Link key={athlete.id} href={`/athletes/${athlete.id}`}>
              <Card className="transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={athlete.avatar} />
                      <AvatarFallback>{athlete.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 dark:text-white">
                        {athlete.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <MapPin className="h-3 w-3" />
                        {athlete.location}
                      </div>
                    </div>
                    <Badge variant="secondary">{athlete.sport}</Badge>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
                      <Trophy className="h-4 w-4" />
                      {athlete.achievements} achievements
                    </div>
                    <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
                      <Star className="h-4 w-4" />
                      #{athlete.ranking}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
        </div>
      </main>
    </div>
  );
}