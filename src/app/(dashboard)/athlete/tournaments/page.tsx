"use client";

import { useState } from "react";
import { Search, Calendar, MapPin, Users, Trophy } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const tournaments = [
  { id: 1, name: "National Youth Cricket Championship", sport: "Cricket", date: "2024-07-15", location: "New Delhi", participants: 256, status: "Open", prize: "₹5L" },
  { id: 2, name: "State Athletics Meet", sport: "Athletics", date: "2024-06-25", location: "Mumbai", participants: 512, status: "Open", prize: "₹2L" },
  { id: 3, name: "Inter-State Tennis Open", sport: "Tennis", date: "2024-08-05", location: "Chennai", participants: 96, status: "Open", prize: "₹1L" },
  { id: 4, name: "District Cricket League", sport: "Cricket", date: "2024-06-10", location: "Local Ground", participants: 128, status: "Registered", prize: "₹50K" },
  { id: 5, name: "School Sports Festival", sport: "Multi-sport", date: "2024-06-30", location: "School Campus", participants: 1000, status: "Open", prize: "Medals" },
  { id: 6, name: "Junior Tennis Championship", sport: "Tennis", date: "2024-09-12", location: "Hyderabad", participants: 64, status: "Open", prize: "₹75K" },
];

export default function AthleteTournamentsPage() {
  const [search, setSearch] = useState("");

  const filtered = tournaments.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.sport.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <DashboardHeader title="Tournaments" subtitle="Discover and register for tournaments" />

      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5 mb-6">
        <Search className="w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search tournaments..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tournament) => (
          <Card key={tournament.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary">{tournament.sport}</Badge>
                <Badge variant={tournament.status === "Open" ? "default" : "outline"}>
                  {tournament.status}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg mb-3">{tournament.name}</h3>
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{tournament.date}</span></div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{tournament.location}</span></div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>{tournament.participants} participants</span></div>
                <div className="flex items-center gap-2"><Trophy className="w-4 h-4 text-[#FF6B35]" /><span>Prize: {tournament.prize}</span></div>
              </div>
              <Button className="w-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" disabled={tournament.status === "Registered"}>
                {tournament.status === "Registered" ? "Registered" : "Register Now"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
