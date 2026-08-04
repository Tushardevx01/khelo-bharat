"use client";

import { useState } from "react";
import { Search, MapPin, Users, Plus } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const schools = [
  { id: 1, name: "Delhi Public School", location: "New Delhi", students: 1250, coaches: 18, sports: 12, status: "Active" },
  { id: 2, name: "Mumbai Sports Academy", location: "Mumbai", students: 980, coaches: 15, sports: 10, status: "Active" },
  { id: 3, name: "Bangalore International School", location: "Bangalore", students: 1100, coaches: 20, sports: 14, status: "Active" },
  { id: 4, name: "Chennai Sports Academy", location: "Chennai", students: 750, coaches: 12, sports: 8, status: "Pending" },
  { id: 5, name: "Kolkata Public School", location: "Kolkata", students: 890, coaches: 14, sports: 9, status: "Active" },
  { id: 6, name: "Hyderabad Academy", location: "Hyderabad", students: 650, coaches: 10, sports: 7, status: "Inactive" },
];

export default function SchoolsPage() {
  const [search, setSearch] = useState("");

  const filtered = schools.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.location.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <DashboardHeader title="School Management" subtitle="Manage registered schools" />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5 flex-1">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search schools..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
        <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add School
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((school) => (
          <Card key={school.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-lg">{school.name}</h3>
                <Badge variant={school.status === "Active" ? "default" : school.status === "Pending" ? "outline" : "destructive"}>
                  {school.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span>{school.location}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-[#FF6B35]">{school.students}</p>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#D72638]">{school.coaches}</p>
                  <p className="text-xs text-gray-500">Coaches</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-700">{school.sports}</p>
                  <p className="text-xs text-gray-500">Sports</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
