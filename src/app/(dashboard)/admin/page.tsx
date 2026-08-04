"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from "recharts";
import {
  Users, GraduationCap, Target, Trophy, Calendar, DollarSign,
  TrendingUp, Plus, FileText, Eye, ChevronRight, Activity,
  UserPlus, School, Medal, Megaphone,
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const COLORS = ["#FF6B35", "#D72638", "#1B2838", "#4CAF50", "#2196F3", "#9C27B0"];

const monthlyRegistrations = [
  { month: "Jan", users: 120, athletes: 45, schools: 8 },
  { month: "Feb", users: 180, athletes: 62, schools: 12 },
  { month: "Mar", users: 250, athletes: 88, schools: 15 },
  { month: "Apr", users: 310, athletes: 105, schools: 20 },
  { month: "May", users: 280, athletes: 95, schools: 18 },
  { month: "Jun", users: 350, athletes: 120, schools: 22 },
  { month: "Jul", users: 420, athletes: 145, schools: 28 },
  { month: "Aug", users: 380, athletes: 130, schools: 25 },
  { month: "Sep", users: 450, athletes: 160, schools: 30 },
  { month: "Oct", users: 520, athletes: 185, schools: 35 },
  { month: "Nov", users: 480, athletes: 170, schools: 32 },
  { month: "Dec", users: 550, athletes: 200, schools: 38 },
];

const userDistribution = [
  { name: "Athletes", value: 4500 },
  { name: "Schools", value: 850 },
  { name: "Coaches", value: 320 },
  { name: "Sponsors", value: 120 },
];

const recentUsers = [
  { id: "1", name: "Arjun Singh", email: "arjun@example.com", role: "ATHLETE", status: "Active", joined: "2026-01-15" },
  { id: "2", name: "Delhi Public School", email: "admin@dps.com", role: "SCHOOL_ADMIN", status: "Active", joined: "2026-01-14" },
  { id: "3", name: "Coach Rajesh", email: "rajesh@example.com", role: "COACH", status: "Pending", joined: "2026-01-13" },
  { id: "4", name: "Priya Sharma", email: "priya@example.com", role: "ATHLETE", status: "Active", joined: "2026-01-12" },
  { id: "5", name: "Nike India", email: "sponsors@nike.com", role: "SPONSOR", status: "Active", joined: "2026-01-11" },
];

const stats = [
  { label: "Total Users", value: "12,450", change: "+18%", icon: Users, color: "from-[#FF6B35] to-[#D72638]" },
  { label: "Athletes", value: "8,500", change: "+24%", icon: Medal, color: "from-[#D72638] to-[#9C27B0]" },
  { label: "Schools", value: "850", change: "+12%", icon: School, color: "from-[#1B2838] to-[#2196F3]" },
  { label: "Coaches", value: "320", change: "+8%", icon: Target, color: "from-[#4CAF50] to-[#2196F3]" },
  { label: "Tournaments", value: "156", change: "+32%", icon: Trophy, color: "from-[#FF6B35] to-[#FF9800]" },
  { label: "Revenue", value: "₹24.5L", change: "+15%", icon: DollarSign, color: "from-[#2196F3] to-[#9C27B0]" },
];

export default function AdminDashboard() {
  return (
    <div>
      <DashboardHeader title="Super Admin Dashboard" subtitle="Welcome back! Here's your platform overview." notificationCount={5} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <Badge variant="secondary" className="text-[#4CAF50] bg-[#4CAF50]/10">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRegistrations}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="users" fill="#FF6B35" radius={[4, 4, 0, 0]} />
                <Bar dataKey="athletes" fill="#D72638" radius={[4, 4, 0, 0]} />
                <Bar dataKey="schools" fill="#1B2838" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {userDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-4">
              {userDistribution.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Users</CardTitle>
          <Button variant="outline" size="sm">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role.replace("_", " ")}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joined}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1">Add Sport</h3>
            <p className="text-xs text-gray-500">Register a new sport</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B2838] to-[#2196F3] flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1">Create Tournament</h3>
            <p className="text-xs text-gray-500">Set up a new tournament</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#2196F3] flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1">View Reports</h3>
            <p className="text-xs text-gray-500">Analytics & insights</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
