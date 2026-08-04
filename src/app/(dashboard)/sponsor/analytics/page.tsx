/* eslint-disable */
"use client";

import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/shared/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { DollarSign, Users, TrendingUp, Target } from "lucide-react";

const stats = [
  { title: "Total Spent", value: "₹18.5L", change: 22, icon: DollarSign, color: "from-purple-500 to-purple-700" },
  { title: "Athletes Reached", value: "45", change: 12, icon: Users },
  { title: "Brand Impressions", value: "2.5L", change: 35, icon: TrendingUp, color: "from-green-500 to-green-700" },
  { title: "Conversion Rate", value: "12%", change: 5, icon: Target, color: "from-purple-500 to-purple-700" },
];

const roiData = [
  { month: "Jan", investment: 800000, returns: 1200000 },
  { month: "Feb", investment: 950000, returns: 1500000 },
  { month: "Mar", investment: 1200000, returns: 2000000 },
  { month: "Apr", investment: 1100000, returns: 1800000 },
  { month: "May", investment: 1500000, returns: 2800000 },
  { month: "Jun", investment: 1800000, returns: 3500000 },
];

const campaignPerformance = [
  { name: "Cricket", impressions: 45000, conversions: 120 },
  { name: "Football", impressions: 35000, conversions: 95 },
  { name: "Athletics", impressions: 28000, conversions: 80 },
  { name: "Badminton", impressions: 22000, conversions: 65 },
];

const channelData = [
  { name: "Social Media", value: 45, color: "#8B5CF6" },
  { name: "Events", value: 25, color: "#FF6B35" },
  { name: "Schools", value: 20, color: "#D72638" },
  { name: "Other", value: 10, color: "#CCC" },
];

export default function SponsorAnalyticsPage() {
  return (
    <div>
      <DashboardHeader title="Analytics" subtitle="Sponsorship performance metrics" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} color={stat.color || "from-purple-500 to-purple-700"} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>ROI Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => `₹${((value as number) / 100000).toFixed(1)}L`} />
                <Line type="monotone" dataKey="investment" stroke="#8B5CF6" strokeWidth={2} />
                <Line type="monotone" dataKey="returns" stroke="#22C55E" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channel Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={channelData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                  {channelData.map((entry, index) => (
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
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="impressions" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="conversions" fill="#FF6B35" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
