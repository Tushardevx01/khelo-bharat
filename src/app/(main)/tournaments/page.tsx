"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { PageHeader } from "@/components/layout/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { Pagination } from "@/components/shared/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users } from "lucide-react";
import { SPORT_CATEGORIES, TOURNAMENT_STATUSES } from "@/constants";
import Link from "next/link";

export default function TournamentsPage() {
  const [, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const tournaments = [
    {
      id: "1",
      title: "National Cricket Championship 2026",
      sportCategory: "CRICKET",
      status: "REGISTRATION_OPEN",
      startDate: "2026-03-15",
      location: "Mumbai, Maharashtra",
      totalParticipants: 128,
      maxParticipants: 256,
      entryFee: 5000,
      prizePool: 500000,
    },
    {
      id: "2",
      title: "Inter-State Football League",
      sportCategory: "FOOTBALL",
      status: "UPCOMING",
      startDate: "2026-04-01",
      location: "Delhi, NCR",
      totalParticipants: 64,
      maxParticipants: 128,
      entryFee: 3000,
      prizePool: 300000,
    },
    {
      id: "3",
      title: "All India Badminton Open",
      sportCategory: "BADMINTON",
      status: "REGISTRATION_OPEN",
      startDate: "2026-04-20",
      location: "Hyderabad, Telangana",
      totalParticipants: 32,
      maxParticipants: 64,
      entryFee: 2000,
      prizePool: 200000,
    },
    {
      id: "4",
      title: "State Athletics Meet",
      sportCategory: "ATHLETICS",
      status: "UPCOMING",
      startDate: "2026-05-10",
      location: "Bangalore, Karnataka",
      totalParticipants: 200,
      maxParticipants: 500,
      entryFee: 1000,
      prizePool: 100000,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          title="Tournaments"
          description="Discover and register for tournaments across India."
        />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <SearchInput placeholder="Search tournaments..." onSearch={setSearch} />
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {TOURNAMENT_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((tournament) => (
            <Link key={tournament.id} href={`/tournaments/${tournament.id}`}>
              <Card className="h-full transition-all hover:shadow-lg">
                <div className="h-40 rounded-t-xl bg-gradient-to-br from-neutral-800 to-neutral-950 p-4">
                  <Badge variant={tournament.status === "REGISTRATION_OPEN" ? "success" : "info"}>
                    {tournament.status.replace(/_/g, " ")}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2">
                    {tournament.sportCategory}
                  </Badge>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {tournament.title}
                  </h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(tournament.startDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                      <MapPin className="mr-2 h-4 w-4" />
                      {tournament.location}
                    </div>
                    <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                      <Users className="mr-2 h-4 w-4" />
                      {tournament.totalParticipants}/{tournament.maxParticipants} participants
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Prize Pool</p>
                      <p className="text-sm font-bold text-neutral-900 dark:text-white">
                        ₹{tournament.prizePool.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <Button size="sm">
                      {tournament.status === "REGISTRATION_OPEN" ? "Register Now" : "View Details"}
                    </Button>
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