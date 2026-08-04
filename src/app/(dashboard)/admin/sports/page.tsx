"use client";

import { Trophy, Users, Medal, Plus } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sports = [
  { id: 1, name: "Cricket", athletes: 2450, schools: 120, icon: "🏏" },
  { id: 2, name: "Football", athletes: 1890, schools: 95, icon: "⚽" },
  { id: 3, name: "Basketball", athletes: 1200, schools: 70, icon: "🏀" },
  { id: 4, name: "Tennis", athletes: 890, schools: 55, icon: "🎾" },
  { id: 5, name: "Badminton", athletes: 1100, schools: 65, icon: "🏸" },
  { id: 6, name: "Athletics", athletes: 1650, schools: 110, icon: "🏃" },
  { id: 7, name: "Swimming", athletes: 750, schools: 45, icon: "🏊" },
  { id: 8, name: "Hockey", athletes: 980, schools: 60, icon: "🏑" },
  { id: 9, name: "Volleyball", athletes: 820, schools: 50, icon: "🏐" },
  { id: 10, name: "Table Tennis", athletes: 650, schools: 40, icon: "🏓" },
  { id: 11, name: "Kabaddi", athletes: 1300, schools: 80, icon: "🤼" },
  { id: 12, name: "Wrestling", athletes: 540, schools: 35, icon: "🤼" },
];

export default function SportsPage() {
  return (
    <div>
      <DashboardHeader title="Sports Management" subtitle="Manage all sports categories" />

      <div className="flex justify-end mb-6">
        <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Sport
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sports.map((sport) => (
          <Card key={sport.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-4">{sport.icon}</div>
              <h3 className="font-semibold text-lg mb-3">{sport.name}</h3>
              <div className="flex justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{sport.athletes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  <span>{sport.schools}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
