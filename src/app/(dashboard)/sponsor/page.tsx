/* eslint-disable */
"use client";

import { Users, GraduationCap, Trophy, Handshake, DollarSign, BarChart3 } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/shared/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const stats = [
  { title: "Athletes Sponsored", value: "45", change: 12, icon: Users },
  { title: "Schools Partnered", value: "18", change: 5, icon: GraduationCap, color: "from-purple-500 to-purple-700" },
  { title: "Active Campaigns", value: "6", icon: Trophy },
  { title: "Total Investment", value: "₹1.2Cr", change: 20, icon: DollarSign, color: "from-green-500 to-green-700" },
  { title: "Sponsorships", value: "12", change: 8, icon: Handshake, color: "from-purple-500 to-purple-700" },
  { title: "ROI", value: "285%", change: 15, icon: BarChart3 },
];

const investmentData = [
  { month: "Jan", amount: 800000 },
  { month: "Feb", amount: 950000 },
  { month: "Mar", amount: 1200000 },
  { month: "Apr", amount: 1100000 },
  { month: "May", amount: 1500000 },
  { month: "Jun", amount: 1800000 },
];

const sportDistribution = [
  { name: "Cricket", value: 40, color: "#FF6B35" },
  { name: "Football", value: 25, color: "#D72638" },
  { name: "Athletics", value: 20, color: "#8B5CF6" },
  { name: "Others", value: 15, color: "#CCC" },
];

const topAthletes = [
  { name: "Priya Sharma", sport: "Cricket", impact: "High", invested: "₹5L" },
  { name: "Rohan Joshi", sport: "Football", impact: "High", invested: "₹3L" },
  { name: "Sunita Reddy", sport: "Athletics", impact: "Medium", invested: "₹2L" },
  { name: "Ananya Das", sport: "Badminton", impact: "High", invested: "₹4L" },
];

export default function SponsorOverview() {
  return (
    <div>
      <DashboardHeader title="Sponsor Dashboard" subtitle="Welcome, Tata Group" notificationCount={3} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} color={stat.color || "from-purple-500 to-purple-700"} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Investment Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={investmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => `₹${((value as number) / 100000).toFixed(1)}L`} />
                <Bar dataKey="amount" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sport Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={sportDistribution} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                  {sportDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Sponsored Athletes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Athlete</th>
                  <th className="text-left py-3 px-4 font-medium">Sport</th>
                  <th className="text-left py-3 px-4 font-medium">Impact</th>
                  <th className="text-left py-3 px-4 font-medium">Invested</th>
                </tr>
              </thead>
              <tbody>
                {topAthletes.map((athlete, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="py-3 px-4 font-medium">{athlete.name}</td>
                    <td className="py-3 px-4">{athlete.sport}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${athlete.impact === "High" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {athlete.impact}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">{athlete.invested}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
