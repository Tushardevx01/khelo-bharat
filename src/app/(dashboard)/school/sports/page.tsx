"use client";

import { Trophy, Users, Medal, Plus } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sports = [
  { id: 1, name: "Cricket", athletes: 120, coach: "Rajesh Kumar", icon: "🏏" },
  { id: 2, name: "Football", athletes: 95, coach: "Suresh Patel", icon: "⚽" },
  { id: 3, name: "Basketball", athletes: 60, coach: "Amit Singh", icon: "🏀" },
  { id: 4, name: "Tennis", athletes: 45, coach: "Priya Sharma", icon: "🎾" },
  { id: 5, name: "Badminton", athletes: 50, coach: "Neha Gupta", icon: "🏸" },
  { id: 6, name: "Athletics", athletes: 80, coach: "Rajesh Kumar", icon: "🏃" },
  { id: 7, name: "Swimming", athletes: 35, coach: "Suresh Patel", icon: "🏊" },
  { id: 8, name: "Hockey", athletes: 55, coach: "Amit Singh", icon: "🏑" },
];

export default function SchoolSportsPage() {
  return (
    <div>
      <DashboardHeader title="Sports Management" subtitle="Sports offered at your school" />

      <div className="flex justify-end mb-6">
        <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Sport
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sports.map((sport) => (
          <Card key={sport.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-4">{sport.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{sport.name}</h3>
              <p className="text-sm text-gray-500 mb-3">Coach: {sport.coach}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                <span>{sport.athletes} athletes</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
