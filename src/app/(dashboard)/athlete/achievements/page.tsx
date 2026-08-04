"use client";

import { Award, Trophy, Medal, Star } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/shared/StatsCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  { title: "Total Achievements", value: "12", icon: Award },
  { title: "Gold Medals", value: "5", icon: Trophy, color: "from-yellow-500 to-yellow-700" },
  { title: "Silver Medals", value: "4", icon: Medal, color: "from-gray-400 to-gray-600" },
  { title: "Bronze Medals", value: "3", icon: Medal, color: "from-orange-400 to-orange-600" },
];

const achievements = [
  { id: 1, title: "National Cricket Championship Winner", date: "May 2024", sport: "Cricket", type: "Gold", icon: "🏆" },
  { id: 2, title: "Best Batsman - State Tournament", date: "Apr 2024", sport: "Cricket", type: "Gold", icon: "🏏" },
  { id: 3, title: "100m Sprint - Gold Medal", date: "Mar 2024", sport: "Athletics", type: "Gold", icon: "🥇" },
  { id: 4, title: "Inter-School Football Runner-up", date: "Feb 2024", sport: "Football", type: "Silver", icon: "🥈" },
  { id: 5, title: "Tennis Doubles Champion", date: "Jan 2024", sport: "Tennis", type: "Gold", icon: "🎾" },
  { id: 6, title: "District Athletics 2nd Place", date: "Dec 2023", sport: "Athletics", type: "Silver", icon: "🥈" },
  { id: 7, title: "Cricket Man of the Match", date: "Nov 2023", sport: "Cricket", type: "Gold", icon: "⭐" },
  { id: 8, title: "School Sports Day Champion", date: "Oct 2023", sport: "Multi-sport", type: "Gold", icon: "🏅" },
];

export default function AchievementsPage() {
  return (
    <div>
      <DashboardHeader title="Achievements" subtitle="Your awards and accomplishments" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} color={stat.color || "from-[#FF6B35] to-[#D72638]"} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement) => (
          <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <Badge variant={achievement.type === "Gold" ? "default" : "secondary"}>
                      {achievement.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{achievement.sport} • {achievement.date}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
