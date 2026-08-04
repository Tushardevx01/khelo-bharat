"use client";

import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/shared/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { TrendingUp, Target, Clock, Medal } from "lucide-react";

const stats = [
  { title: "Overall Score", value: "87%", change: 5, icon: TrendingUp },
  { title: "Accuracy", value: "92%", change: 3, icon: Target, color: "from-blue-500 to-blue-700" },
  { title: "Avg. Time", value: "11.2s", change: -2, icon: Clock, color: "from-green-500 to-green-700" },
  { title: "Best Rank", value: "#3", icon: Medal, color: "from-purple-500 to-purple-700" },
];

const monthlyPerformance = [
  { month: "Jan", cricket: 72, athletics: 68, tennis: 60 },
  { month: "Feb", cricket: 75, athletics: 70, tennis: 65 },
  { month: "Mar", cricket: 80, athletics: 75, tennis: 70 },
  { month: "Apr", cricket: 82, athletics: 78, tennis: 72 },
  { month: "May", cricket: 85, athletics: 82, tennis: 75 },
  { month: "Jun", cricket: 88, athletics: 85, tennis: 78 },
];

const skillRadar = [
  { skill: "Batting", value: 90 },
  { skill: "Bowling", value: 75 },
  { skill: "Fielding", value: 85 },
  { skill: "Running", value: 80 },
  { skill: "Stamina", value: 88 },
  { skill: "Agility", value: 82 },
];

export default function AthleteAnalyticsPage() {
  return (
    <div>
      <DashboardHeader title="Performance Analytics" subtitle="Track your performance metrics" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} color={stat.color || "from-[#FF6B35] to-[#D72638]"} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[50, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="cricket" stroke="#FF6B35" strokeWidth={2} />
                <Line type="monotone" dataKey="athletics" stroke="#D72638" strokeWidth={2} />
                <Line type="monotone" dataKey="tennis" stroke="#FFA07A" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Radar</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillRadar}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="Skills" dataKey="value" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
