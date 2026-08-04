"use client";

import { useState } from "react";
import { Search, Filter, Star, MapPin } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const athletes = [
  { id: 1, name: "Priya Sharma", sport: "Cricket", school: "Delhi Public School", location: "New Delhi", rating: 4.8, achievements: 12, potential: "High" },
  { id: 2, name: "Rohan Joshi", sport: "Football", school: "Mumbai Sports Academy", location: "Mumbai", rating: 4.6, achievements: 8, potential: "High" },
  { id: 3, name: "Sunita Reddy", sport: "Athletics", school: "Hyderabad Public", location: "Hyderabad", rating: 4.9, achievements: 15, potential: "Very High" },
  { id: 4, name: "Ananya Das", sport: "Badminton", school: "Bangalore International", location: "Bangalore", rating: 4.7, achievements: 20, potential: "High" },
  { id: 5, name: "Vivaan Sharma", sport: "Basketball", school: "Kolkata Public School", location: "Kolkata", rating: 4.5, achievements: 9, potential: "Medium" },
  { id: 6, name: "Ishita Banerjee", sport: "Swimming", school: "Delhi Public School", location: "New Delhi", rating: 4.8, achievements: 11, potential: "High" },
];

export default function SponsorAthletesPage() {
  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("All");

  const sports = ["All", "Cricket", "Football", "Athletics", "Badminton", "Basketball", "Swimming"];
  const filtered = athletes.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchSport = sportFilter === "All" || a.sport === sportFilter;
    return matchSearch && matchSport;
  });

  return (
    <div>
      <DashboardHeader title="Search Athletes" subtitle="Find athletes to sponsor" />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5 flex-1">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search athletes..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {sports.map((sport) => (
            <Button key={sport} variant={sportFilter === sport ? "default" : "outline"} size="sm" onClick={() => setSportFilter(sport)} className={sportFilter === sport ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white" : ""}>
              {sport}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((athlete) => (
          <Card key={athlete.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-14 h-14">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-700 text-white">{athlete.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{athlete.name}</h3>
                  <Badge variant="secondary">{athlete.sport}</Badge>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{athlete.location}</span></div>
                <div className="flex items-center gap-2"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span>{athlete.rating} rating</span></div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm">{athlete.achievements} achievements</span>
                <Badge variant={athlete.potential === "Very High" ? "default" : "outline"} className={athlete.potential === "Very High" ? "bg-purple-600" : ""}>
                  {athlete.potential} Potential
                </Badge>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white">Sponsor Athlete</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
