"use client";

import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Users, Trophy, Building2, Handshake } from "lucide-react";

const schools = [
  { id: "1", name: "Delhi Public School", city: "Delhi", students: 2400, sports: ["Cricket", "Athletics", "Swimming", "Hockey"], logo: "DPS" },
  { id: "2", name: "St. Xavier's Academy", city: "Mumbai", students: 1800, sports: ["Badminton", "Tennis", "Table Tennis"], logo: "SXA" },
  { id: "3", name: "Bishop Cotton School", city: "Bangalore", students: 1200, sports: ["Cricket", "Football", "Basketball"], logo: "BCS" },
  { id: "4", name: "Kendriya Vidyalaya", city: "Hyderabad", students: 3000, sports: ["Athletics", "Volleyball", "Kabaddi"], logo: "KVS" },
  { id: "5", name: "Doon School", city: "Dehradun", students: 800, sports: ["Cricket", "Hockey", "Swimming", "Tennis"], logo: "DOS" },
  { id: "6", name: "La Martiniere", city: "Kolkata", students: 1500, sports: ["Football", "Athletics", "Cricket"], logo: "LMS" },
];

export default function SponsorSchoolsPage() {
  const [search, setSearch] = useState("");

  const filtered = schools.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <DashboardHeader title="Search Schools" subtitle="Partner with schools for grassroots sports development." notificationCount={2} />

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5 flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search schools..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((school) => (
          <Card key={school.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center text-white text-sm font-bold">
                  {school.logo}
                </div>
                <div>
                  <h3 className="font-semibold">{school.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {school.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {school.students.toLocaleString()} students</span>
                <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> {school.sports.length} sports</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {school.sports.map((sport, i) => (
                  <Badge key={i} variant="secondary" className="text-[10px] bg-gray-100 dark:bg-gray-800">{sport}</Badge>
                ))}
              </div>
              <Button className="w-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90" size="sm">
                <Handshake className="w-4 h-4 mr-1" /> Connect
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
