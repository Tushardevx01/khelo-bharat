"use client";

import { useState } from "react";
import { Search, Plus, MoreHorizontal, TrendingUp } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const athletes = [
  { id: 1, name: "Aarav Kumar", sport: "Cricket", age: 16, performance: 92, status: "Active", trend: "+12%" },
  { id: 2, name: "Diya Patel", sport: "Tennis", age: 17, performance: 88, status: "Active", trend: "+8%" },
  { id: 3, name: "Riya Singh", sport: "Badminton", age: 15, performance: 95, status: "Active", trend: "+15%" },
  { id: 4, name: "Vivaan Sharma", sport: "Football", age: 18, performance: 85, status: "Active", trend: "+6%" },
  { id: 5, name: "Anika Gupta", sport: "Athletics", age: 16, performance: 90, status: "Inactive", trend: "+10%" },
  { id: 6, name: "Arjun Nair", sport: "Basketball", age: 17, performance: 82, status: "Active", trend: "+4%" },
  { id: 7, name: "Kavya Reddy", sport: "Swimming", age: 14, performance: 87, status: "Active", trend: "+9%" },
  { id: 8, name: "Aditya Verma", sport: "Hockey", age: 16, performance: 79, status: "Active", trend: "+3%" },
];

export default function CoachAthletesPage() {
  const [search, setSearch] = useState("");

  const filtered = athletes.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.sport.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <DashboardHeader title="My Athletes" subtitle="Manage your athletes" />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5 flex-1">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search athletes..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-green-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Athlete
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((athlete) => (
          <Card key={athlete.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-700 text-white">{athlete.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{athlete.name}</h3>
                  <p className="text-sm text-gray-500">{athlete.sport} • Age {athlete.age}</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-500">Performance</span>
                  <span className="font-medium">{athlete.performance}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${athlete.performance}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>{athlete.trend}</span>
                </div>
                <Badge variant={athlete.status === "Active" ? "default" : "destructive"}>{athlete.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
