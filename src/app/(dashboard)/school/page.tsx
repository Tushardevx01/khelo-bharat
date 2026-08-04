"use client";

import { Users, Target, Trophy, Calendar, Award, BarChart3 } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/shared/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { title: "Total Students", value: "1,250", change: 10, icon: Users },
  { title: "Active Coaches", value: "18", change: 5, icon: Target },
  { title: "Sports Offered", value: "12", change: 0, icon: Trophy },
  { title: "Tournaments", value: "24", change: 15, icon: Calendar },
  { title: "Certificates", value: "340", change: 8, icon: Award },
  { title: "Attendance Rate", value: "92%", change: 3, icon: BarChart3 },
];

const monthlyData = [
  { name: "Jan", students: 1100, attendance: 88 },
  { name: "Feb", students: 1120, attendance: 90 },
  { name: "Mar", students: 1150, attendance: 85 },
  { name: "Apr", students: 1180, attendance: 92 },
  { name: "May", students: 1200, attendance: 91 },
  { name: "Jun", students: 1250, attendance: 93 },
];

const recentActivities = [
  { title: "Cricket practice session completed", time: "2 hours ago", type: "Training" },
  { title: "New student registration: Aarav Kumar", time: "4 hours ago", type: "Registration" },
  { title: "Inter-school football match scheduled", time: "1 day ago", type: "Event" },
  { title: "Coach certification renewed for Rajesh Sir", time: "2 days ago", type: "Admin" },
];

export default function SchoolOverview() {
  return (
    <div>
      <DashboardHeader title="School Dashboard" subtitle="Delhi Public School" notificationCount={3} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} color="from-blue-500 to-blue-700" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Enrollment</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
