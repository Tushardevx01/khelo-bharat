"use client";

import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/shared/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

const monthlyData = [
  { name: "Jan", revenue: 4000, users: 2400 },
  { name: "Feb", revenue: 3000, users: 1398 },
  { name: "Mar", revenue: 5000, users: 9800 },
  { name: "Apr", revenue: 4780, users: 3908 },
  { name: "May", revenue: 5890, users: 4800 },
  { name: "Jun", revenue: 6390, users: 3800 },
];

const sportData = [
  { name: "Cricket", value: 35, color: "#FF6B35" },
  { name: "Football", value: 25, color: "#D72638" },
  { name: "Basketball", value: 15, color: "#FFA07A" },
  { name: "Tennis", value: 12, color: "#FF4500" },
  { name: "Others", value: 13, color: "#CCC" },
];

const weeklyData = [
  { name: "Mon", sessions: 120 },
  { name: "Tue", sessions: 150 },
  { name: "Wed", sessions: 180 },
  { name: "Thu", sessions: 140 },
  { name: "Fri", sessions: 200 },
  { name: "Sat", sessions: 250 },
  { name: "Sun", sessions: 180 },
];

export default function AnalyticsPage() {
  return (
    <div>
      <DashboardHeader title="Analytics" subtitle="Platform performance metrics" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Page Views" value="124,563" change={18} icon={TrendingUp} />
        <StatsCard title="Active Users" value="8,432" change={12} icon={Users} color="from-blue-500 to-blue-700" />
        <StatsCard title="Revenue" value="₹12.5L" change={25} icon={DollarSign} color="from-green-500 to-green-700" />
        <StatsCard title="Engagement" value="78%" change={5} icon={Activity} color="from-purple-500 to-purple-700" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Users Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#FF6B35" strokeWidth={2} />
                <Line type="monotone" dataKey="users" stroke="#D72638" strokeWidth={2} />
              </LineChart>
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
                <Pie data={sportData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                  {sportData.map((entry, index) => (
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
          <CardTitle>Weekly Training Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sessions" fill="#FF6B35" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
