"use client";

import { Users, Target, Trophy, Calendar, BarChart3, Award } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/shared/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { title: "My Athletes", value: "24", change: 8, icon: Users },
  { title: "Training Sessions", value: "48", change: 12, icon: Target },
  { title: "Tournaments", value: "6", change: 0, icon: Trophy },
  { title: "Performance Score", value: "87%", change: 5, icon: BarChart3 },
  { title: "Achievements", value: "15", change: 3, icon: Award },
  { title: "Upcoming Events", value: "4", icon: Calendar, color: "from-green-500 to-green-700" },
];

const weeklyData = [
  { name: "Mon", sessions: 4 },
  { name: "Tue", sessions: 6 },
  { name: "Wed", sessions: 3 },
  { name: "Thu", sessions: 5 },
  { name: "Fri", sessions: 7 },
  { name: "Sat", sessions: 8 },
  { name: "Sun", sessions: 2 },
];

const topAthletes = [
  { name: "Aarav Kumar", sport: "Cricket", improvement: "+12%", rank: 1 },
  { name: "Diya Patel", sport: "Tennis", improvement: "+8%", rank: 2 },
  { name: "Riya Singh", sport: "Badminton", improvement: "+15%", rank: 3 },
  { name: "Vivaan Sharma", sport: "Football", improvement: "+6%", rank: 4 },
];

export default function CoachOverview() {
  return (
    <div>
      <DashboardHeader title="Coach Dashboard" subtitle="Welcome back, Coach" notificationCount={2} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} color={stat.color || "from-green-500 to-green-700"} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Training Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sessions" fill="#22C55E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Athletes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topAthletes.map((athlete) => (
                <div key={athlete.rank} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-sm font-bold">
                    {athlete.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{athlete.name}</p>
                    <p className="text-sm text-gray-500">{athlete.sport}</p>
                  </div>
                  <span className="text-green-600 font-medium text-sm">{athlete.improvement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
