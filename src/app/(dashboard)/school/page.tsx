"use client";

import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line,
} from "recharts";
import {
  Users, Target, Trophy, Calendar, TrendingUp, Plus, Award,
  ChevronRight, GraduationCap, Activity, BookOpen, Star,
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const COLORS = ["#FF6B35", "#D72638", "#1B2838", "#4CAF50", "#2196F3", "#9C27B0"];

const studentPerformance = [
  { month: "Jan", performance: 65, attendance: 85 },
  { month: "Feb", performance: 68, attendance: 88 },
  { month: "Mar", performance: 72, attendance: 82 },
  { month: "Apr", performance: 75, attendance: 90 },
  { month: "May", performance: 78, attendance: 87 },
  { month: "Jun", performance: 82, attendance: 92 },
];

const upcomingEvents = [
  { id: "1", name: "Inter-School Cricket Championship", date: "2026-02-10", type: "Tournament", status: "Upcoming" },
  { id: "2", name: "Annual Sports Day", date: "2026-02-15", type: "Event", status: "Upcoming" },
  { id: "3", name: "Football League Finals", date: "2026-02-20", type: "Tournament", status: "Upcoming" },
  { id: "4", name: "Coach Training Workshop", date: "2026-02-25", type: "Workshop", status: "Upcoming" },
];

const recentActivities = [
  { id: "1", action: "New student registered", student: "Rahul Verma", time: "2 hours ago" },
  { id: "2", action: "Certificate issued", student: "Sneha Patel", time: "4 hours ago" },
  { id: "3", action: "Achievement added", student: "Kiran Kumar", time: "6 hours ago" },
  { id: "4", action: "Tournament enrollment", student: "Anjali Singh", time: "8 hours ago" },
  { id: "5", action: "Coach assigned", student: "Vikram Singh", time: "1 day ago" },
];

const stats = [
  { label: "Total Students", value: "1,240", change: "+8%", icon: Users, color: "from-[#2196F3] to-[#1565C0]" },
  { label: "Active Coaches", value: "24", change: "+4%", icon: Target, color: "from-[#4CAF50] to-[#2E7D32]" },
  { label: "Sports", value: "12", change: "+2", icon: Trophy, color: "from-[#FF6B35] to-[#D72638]" },
  { label: "Tournaments", value: "18", change: "+32%", icon: Calendar, color: "from-[#9C27B0] to-[#6A1B9A]" },
];

export default function SchoolDashboard() {
  return (
    <div>
      <DashboardHeader title="School Dashboard" subtitle="Welcome to Delhi Public School's sports hub." notificationCount={3} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Student Performance & Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={studentPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="performance" stroke="#FF6B35" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="attendance" stroke="#2196F3" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" />
                <span className="text-gray-600">Performance</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2196F3]" />
                <span className="text-gray-600">Attendance</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Events</CardTitle>
            <Button variant="outline" size="sm">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2196F3] to-[#1565C0] flex items-center justify-center">
                      {event.type === "Tournament" ? <Trophy className="w-5 h-5 text-white" /> :
                       event.type === "Event" ? <Calendar className="w-5 h-5 text-white" /> :
                       <BookOpen className="w-5 h-5 text-white" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{event.name}</p>
                      <p className="text-xs text-gray-500">{event.date}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.student}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2196F3] to-[#1565C0] flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1">Add Student</h3>
            <p className="text-xs text-gray-500">Register a new student</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1">Host Tournament</h3>
            <p className="text-xs text-gray-500">Create a new tournament</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1">Generate Certificate</h3>
            <p className="text-xs text-gray-500">Create achievement certificates</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
