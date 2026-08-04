"use client";

import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Trophy, Star, Handshake, Filter } from "lucide-react";

const athletes = [
  { id: "1", name: "Arjun Mehta", sport: "Athletics", city: "Delhi", ranking: "#12", achievements: ["State Gold", "National Qualifier"], avatar: "AM" },
  { id: "2", name: "Priya Sharma", sport: "Swimming", city: "Mumbai", ranking: "#8", achievements: ["National Silver", "Record Holder"], avatar: "PS" },
  { id: "3", name: "Rohan Verma", sport: "Cricket", city: "Bangalore", ranking: "#25", achievements: ["District MVP", "U-19 Selection"], avatar: "RV" },
  { id: "4", name: "Sneha Patel", sport: "Badminton", city: "Hyderabad", ranking: "#5", achievements: ["National Gold", "Asian Games Qualifier"], avatar: "SP" },
  { id: "5", name: "Vikram Singh", sport: "Wrestling", city: "Chandigarh", ranking: "#18", achievements: ["State Champion", "Junior Nationals"], avatar: "VS" },
  { id: "6", name: "Ananya Das", sport: "Hockey", city: "Kolkata", ranking: "#32", achievements: ["State Silver", "School Nationals"], avatar: "AD" },
  { id: "7", name: "Kabir Joshi", sport: "Tennis", city: "Pune", ranking: "#15", achievements: ["ITF Junior", "National Bronze"], avatar: "KJ" },
  { id: "8", name: "Meera Nair", sport: "Boxing", city: "Kochi", ranking: "#7", achievements: ["National Gold", "Youth Olympics"], avatar: "MN" },
];

export default function SponsorAthletesPage() {
  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("All");

  const sports = ["All", ...Array.from(new Set(athletes.map((a) => a.sport)))];
  const filtered = athletes.filter(
    (a) => (a.name.toLowerCase().includes(search.toLowerCase()) || a.sport.toLowerCase().includes(search.toLowerCase())) &&
      (sportFilter === "All" || a.sport === sportFilter)
  );

  return (
    <div>
      <DashboardHeader title="Search Athletes" subtitle="Discover talented athletes to sponsor." notificationCount={5} />

      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5 flex-1 max-w-sm">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search athletes..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {sports.map((sport) => (
            <Button key={sport} variant={sportFilter === sport ? "default" : "outline"} size="sm" onClick={() => setSportFilter(sport)} className={sportFilter === sport ? "bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" : ""}>
              {sport}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((athlete) => (
          <Card key={athlete.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center mb-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center text-white text-lg font-bold mb-3">
                  {athlete.avatar}
                </div>
                <h3 className="font-semibold">{athlete.name}</h3>
                <p className="text-xs text-gray-500">{athlete.sport}</p>
              </div>
              <div className="flex items-center justify-center gap-4 mb-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {athlete.city}</span>
                <span className="flex items-center gap-1 text-[#FF6B35] font-medium"><Trophy className="w-3 h-3" /> {athlete.ranking}</span>
              </div>
              <div className="space-y-1 mb-3">
                {athlete.achievements.map((ach, i) => (
                  <Badge key={i} variant="secondary" className="text-[10px] w-full justify-start bg-gray-100 dark:bg-gray-800">
                    <Star className="w-3 h-3 mr-1 text-yellow-500" /> {ach}
                  </Badge>
                ))}
              </div>
              <Button className="w-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90" size="sm">
                <Handshake className="w-4 h-4 mr-1" /> Sponsor
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
