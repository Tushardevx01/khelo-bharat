"use client";

import { useState } from "react";
import { Search, MapPin, Users, Trophy } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const schools = [
  { id: 1, name: "Delhi Public School", location: "New Delhi", students: 1250, sports: 12, reputation: 4.8, status: "Partnered" },
  { id: 2, name: "Mumbai Sports Academy", location: "Mumbai", students: 980, sports: 10, reputation: 4.7, status: "Partnered" },
  { id: 3, name: "Bangalore International", location: "Bangalore", students: 1100, sports: 14, reputation: 4.9, status: "Available" },
  { id: 4, name: "Chennai Sports Academy", location: "Chennai", students: 750, sports: 8, reputation: 4.5, status: "Available" },
  { id: 5, name: "Kolkata Public School", location: "Kolkata", students: 890, sports: 9, reputation: 4.6, status: "Partnered" },
  { id: 6, name: "Hyderabad Academy", location: "Hyderabad", students: 650, sports: 7, reputation: 4.4, status: "Available" },
];

export default function SponsorSchoolsPage() {
  const [search, setSearch] = useState("");

  const filtered = schools.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.location.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <DashboardHeader title="Search Schools" subtitle="Find schools to partner with" />

      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5 mb-6">
        <Search className="w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search schools..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((school) => (
          <Card key={school.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg">{school.name}</h3>
                <Badge variant={school.status === "Partnered" ? "default" : "outline"} className={school.status === "Partnered" ? "bg-purple-600" : ""}>
                  {school.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{school.location}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <p className="text-xl font-bold text-purple-600">{school.students}</p>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-[#FF6B35]">{school.sports}</p>
                  <p className="text-xs text-gray-500">Sports</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-yellow-500">{school.reputation}</p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white" disabled={school.status === "Partnered"}>
                {school.status === "Partnered" ? "Partnered" : "Partner School"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
