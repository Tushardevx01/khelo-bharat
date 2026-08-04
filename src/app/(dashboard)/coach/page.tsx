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
  Users, Target, Trophy, Award, TrendingUp, Plus, Calendar,
  ChevronRight, Activity, Clock, Star, Medal,
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const COLORS = ["#FF6B35", "#D72638", "#1B2838", "#4CAF50", "#2196F3", "#9C27B0"];

const athletePerformance = [
  { name: "Arjun", sprint: 85, endurance: 78, agility: 90 },
  { name: "Priya", sprint: 78, endurance: 85, agility: 82 },
  { name: "Rohit", sprint: 92, endurance: 70, agility: 88 },
  { name: "Sneha", sprint: 80, endurance: 88, agility: 75 },
  { name: "Vikram", sprint: 88, endurance: 82, agility: 85 },
];

const trainingSchedule = [
  { id: "1", title: "Morning Sprint Training", time: "06:00 AM - 08:00 AM", athletes: 15, status: "Completed" },
  { id: "2", title: "Endurance Drills", time: "09:00 AM - 11:00 AM", athletes: 12, status: "In Progress" },
  { id: "3", title: "Technique Workshop", time: "02:00 PM - 04:00 PM", athletes: 20, status: "Upcoming" },
  { id: "4", title: "Recovery Session", time: "05:00 PM - 06:30 PM", athletes: 18, status: "Upcoming" },
];

const recentAchievements = [
  { id: "1", athlete: "Arjun Singh", achievement: "100m Sprint - Gold Medal", event: "State Championship", date: "2026-01-20" },
  { id: "2", athlete: "Priya Sharma", achievement: "Long Jump - Silver Medal", event: "District Meet", date: "2026-01-18" },
  { id: "3", athlete: "Rohit Kumar", achievement: "400m Relay - Gold Medal", event: "Zonal Competition", date: "2026-01-15" },
  { id: "4", athlete: "Sneha Patel", achievement: "Shot Put - Bronze Medal", event: "State Championship", date: "2026-01-12" },
];

const stats = [
  { label: "My Athletes", value: "48", change: "+6", icon: Users, color: "from-[#4CAF50] to-[#2E7D32]" },
  { label: "Active Training", value: "12", change: "+2", icon: Target, color: "from-[#2196F3] to-[#1565C0]" },
  { label: "Tournaments", value: "8", change: "+3", icon: Trophy, color: "from-[#FF6B35] to-[#D72638]" },
  { label: "Achievements", value: "35", change: "+12", icon: Award, color: "from-[#9C27B0] to-[#6A1B9A]" },
];

export default function CoachDashboard() {
  return (
    <div>
      <DashboardHeader title="Coach Dashboard" subtitle="Track your athletes and training progress." notificationCount={2} />

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
            <CardTitle>Athlete Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={athletePerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={60} />
                <Tooltip />
                <Bar dataKey="sprint" fill="#FF6B35" radius={[0, 4, 4, 0]} />
                <Bar dataKey="endurance" fill="#2196F3" radius={[0, 4, 4, 0]} />
                <Bar dataKey="agility" fill="#4CAF50" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" />
                <span className="text-gray-600">Sprint</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2196F3]" />
                <span className="text-gray-600">Endurance</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4CAF50]" />
                <span className="text-gray-600">Agility</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Today's Schedule</CardTitle>
            <Button variant="outline" size="sm">
              View Full <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trainingSchedule.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      session.status === "Completed" ? "bg-[#4CAF50]/10" :
                      session.status === "In Progress" ? "bg-[#FF6B35]/10" :
                      "bg-gray-100 dark:bg-gray-800"
                    }`}>
                      <Clock className={`w-5 h-5 ${
                        session.status === "Completed" ? "text-[#4CAF50]" :
                        session.status === "In Progress" ? "text-[#FF6B35]" :
                        "text-gray-400"
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{session.title}</p>
                      <p className="text-xs text-gray-500">{session.time}</p>
                    </div>
                  </div>
                  <Badge variant={
                    session.status === "Completed" ? "default" :
                    session.status === "In Progress" ? "secondary" :
                    "outline"
                  }>
                    {session.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Athlete</TableHead>
                <TableHead>Achievement</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAchievements.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.athlete}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Medal className="w-4 h-4 text-[#FF6B35]" />
                      {item.achievement}
                    </div>
                  </TableCell>
                  <TableCell>{item.event}</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1">Add Athlete</h3>
            <p className="text-xs text-gray-500">Register a new athlete</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2196F3] to-[#1565C0] flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1">Schedule Training</h3>
            <p className="text-xs text-gray-500">Create a new session</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center mx-auto mb-3">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1">View Reports</h3>
            <p className="text-xs text-gray-500">Analytics & performance</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
