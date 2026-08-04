"use client";

import { Trophy, Users, TrendingUp } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mySports = [
  { id: 1, name: "Cricket", level: "Advanced", coach: "Rajesh Kumar", team: "School First XI", icon: "🏏", stats: { matches: 24, runs: 1250, average: 52.1 } },
  { id: 2, name: "Athletics", level: "Intermediate", coach: "Suresh Patel", team: "School Track Team", icon: "🏃", stats: { events: 8, medals: 3, bestTime: "11.2s" } },
  { id: 3, name: "Tennis", level: "Beginner", coach: "Priya Sharma", team: "School Tennis Club", icon: "🎾", stats: { matches: 6, wins: 4, ranking: 12 } },
];

export default function AthleteSportsPage() {
  return (
    <div>
      <DashboardHeader title="My Sports" subtitle="Sports you participate in" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mySports.map((sport) => (
          <Card key={sport.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{sport.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg">{sport.name}</h3>
                  <Badge variant="secondary">{sport.level}</Badge>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">Coach: {sport.coach} • {sport.team}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {Object.entries(sport.stats).map(([key, value]) => (
                  <div key={key} className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <p className="text-lg font-bold text-[#FF6B35]">{value}</p>
                    <p className="text-xs text-gray-500 capitalize">{key}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
