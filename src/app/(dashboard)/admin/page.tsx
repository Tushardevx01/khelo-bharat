"use client";

import { Users, GraduationCap, Medal, Handshake, Trophy, Calendar } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/shared/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const stats = [
  { title: "Total Users", value: "12,458", change: 12, icon: Users },
  { title: "Schools", value: "342", change: 8, icon: GraduationCap },
  { title: "Athletes", value: "8,721", change: 15, icon: Medal },
  { title: "Coaches", value: "1,245", change: 5, icon: Trophy },
  { title: "Sponsors", value: "89", change: 22, icon: Handshake },
  { title: "Tournaments", value: "156", change: -3, icon: Calendar },
];

const monthlyData = [
  { name: "Jan", users: 4000, athletes: 2400 },
  { name: "Feb", users: 3000, athletes: 1398 },
  { name: "Mar", users: 2000, athletes: 9800 },
  { name: "Apr", users: 2780, athletes: 3908 },
  { name: "May", users: 1890, athletes: 4800 },
  { name: "Jun", users: 2390, athletes: 3800 },
];

const pieData = [
  { name: "Athletes", value: 400, color: "#FF6B35" },
  { name: "Coaches", value: 300, color: "#D72638" },
  { name: "Schools", value: 200, color: "#FFA07A" },
  { name: "Sponsors", value: 100, color: "#FF4500" },
];

const recentUsers = [
  { name: "Priya Sharma", email: "priya@example.com", role: "Athlete", status: "Active" },
  { name: "Rahul Verma", email: "rahul@example.com", role: "Coach", status: "Active" },
  { name: "Anita Patel", email: "anita@example.com", role: "School Admin", status: "Pending" },
  { name: "Vikram Singh", email: "vikram@example.com", role: "Sponsor", status: "Active" },
  { name: "Neha Gupta", email: "neha@example.com", role: "Athlete", status: "Inactive" },
];

export default function AdminOverview() {
  return (
    <div>
      <DashboardHeader title="Admin Dashboard" subtitle="Overview of your platform" notificationCount={5} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#FF6B35" radius={[4, 4, 0, 0]} />
                <Bar dataKey="athletes" fill="#D72638" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                  {pieData.map((entry, index) => (
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
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Email</th>
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4 text-gray-500">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800">{user.role}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${user.status === "Active" ? "bg-green-100 text-green-700" : user.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                        {user.status}
                      </span>
                    </td>
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
