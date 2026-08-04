"use client";

import { useState } from "react";
import { Search, Star, Award, Plus } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const coaches = [
  { id: 1, name: "Rahul Verma", sport: "Cricket", school: "Mumbai Sports Academy", experience: "8 years", rating: 4.8, athletes: 24, status: "Active" },
  { id: 2, name: "Amit Kumar", sport: "Football", school: "Kolkata Sports School", experience: "12 years", rating: 4.9, athletes: 30, status: "Active" },
  { id: 3, name: "Suresh Raina", sport: "Basketball", school: "Delhi Public School", experience: "6 years", rating: 4.5, athletes: 18, status: "Active" },
  { id: 4, name: "Priyanka Jaiswal", sport: "Tennis", school: "Bangalore International", experience: "10 years", rating: 4.7, athletes: 15, status: "Active" },
  { id: 5, name: "Deepak Sharma", sport: "Athletics", school: "Chennai Academy", experience: "5 years", rating: 4.3, athletes: 20, status: "Inactive" },
  { id: 6, name: "Kavita Singh", sport: "Badminton", school: "Hyderabad Academy", experience: "7 years", rating: 4.6, athletes: 12, status: "Active" },
];

export default function CoachesPage() {
  const [search, setSearch] = useState("");

  const filtered = coaches.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.sport.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <DashboardHeader title="Coach Management" subtitle="Manage all coaches" />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5 flex-1">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search coaches..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
        <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Coach
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((coach) => (
          <Card key={coach.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-14 h-14">
                  <AvatarFallback className="bg-gradient-to-br from-[#FF6B35] to-[#D72638] text-white">{coach.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{coach.name}</h3>
                  <p className="text-sm text-gray-500">{coach.sport}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-3">{coach.school}</p>
              <div className="flex items-center gap-4 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{coach.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-[#FF6B35]" />
                  <span>{coach.experience}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{coach.athletes} athletes</span>
                <Badge variant={coach.status === "Active" ? "default" : "destructive"}>{coach.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
