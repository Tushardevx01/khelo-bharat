"use client";

import { useState } from "react";
import { Search, Calendar, MapPin, Users, Plus } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const tournaments = [
  { id: 1, name: "Inter-School Cricket Tournament", sport: "Cricket", date: "2024-07-15", location: "School Ground", participants: 64, status: "Upcoming" },
  { id: 2, name: "District Football Championship", sport: "Football", date: "2024-06-20", location: "City Stadium", participants: 128, status: "Ongoing" },
  { id: 3, name: "State Basketball League", sport: "Basketball", date: "2024-05-10", location: "State Arena", participants: 32, status: "Completed" },
  { id: 4, name: "Regional Tennis Open", sport: "Tennis", date: "2024-08-05", location: "Tennis Club", participants: 48, status: "Upcoming" },
];

export default function SchoolTournamentsPage() {
  const [search, setSearch] = useState("");

  const filtered = tournaments.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.sport.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <DashboardHeader title="Tournaments" subtitle="School tournament management" />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5 flex-1">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search tournaments..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Create Tournament
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((tournament) => (
          <Card key={tournament.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary">{tournament.sport}</Badge>
                <Badge variant={tournament.status === "Upcoming" ? "default" : tournament.status === "Ongoing" ? "outline" : "secondary"}>
                  {tournament.status}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg mb-3">{tournament.name}</h3>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{tournament.date}</span></div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{tournament.location}</span></div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>{tournament.participants} participants</span></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
