"use client";

import { useState } from "react";
import { Search, Medal, Plus } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const athletes = [
  { id: 1, name: "Priya Sharma", sport: "Cricket", school: "Delhi Public School", age: 16, achievements: 12, status: "Active" },
  { id: 2, name: "Neha Gupta", sport: "Tennis", school: "Chennai Academy", age: 18, achievements: 8, status: "Active" },
  { id: 3, name: "Sunita Reddy", sport: "Athletics", school: "Hyderabad Public", age: 17, achievements: 15, status: "Active" },
  { id: 4, name: "Rohan Joshi", sport: "Football", school: "Mumbai Sports Academy", age: 15, achievements: 6, status: "Active" },
  { id: 5, name: "Ananya Das", sport: "Badminton", school: "Bangalore International", age: 19, achievements: 20, status: "Active" },
  { id: 6, name: "Karan Mehta", sport: "Basketball", school: "Kolkata Public School", age: 16, achievements: 9, status: "Inactive" },
  { id: 7, name: "Ishita Banerjee", sport: "Swimming", school: "Delhi Public School", age: 14, achievements: 11, status: "Active" },
  { id: 8, name: "Arjun Nair", sport: "Hockey", school: "Chennai Academy", age: 17, achievements: 7, status: "Active" },
];

export default function AthletesPage() {
  const [search, setSearch] = useState("");

  const filtered = athletes.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.sport.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <DashboardHeader title="Athlete Management" subtitle="Manage all athletes" />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5 flex-1">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search athletes..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
        <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Athlete
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((athlete) => (
          <Card key={athlete.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-br from-[#FF6B35] to-[#D72638] text-white">{athlete.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sm">{athlete.name}</h3>
                  <p className="text-xs text-gray-500">Age {athlete.age}</p>
                </div>
              </div>
              <Badge variant="secondary" className="mb-2">{athlete.sport}</Badge>
              <p className="text-xs text-gray-500 mb-3">{athlete.school}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm">
                  <Medal className="w-4 h-4 text-[#FF6B35]" />
                  <span>{athlete.achievements} awards</span>
                </div>
                <Badge variant={athlete.status === "Active" ? "default" : "destructive"} className="text-xs">{athlete.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
