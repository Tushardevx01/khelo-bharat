"use client";

import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Medal, Award, FileText, Calendar, TrendingUp, ChevronRight,
  Trophy, Star, Target, User, BarChart3, ArrowRight,
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const COLORS = ["#FF6B35", "#D72638", "#1B2838", "#4CAF50", "#2196F3", "#9C27B0"];

const performanceData = [
  { month: "Jan", speed: 72, strength: 68, endurance: 75, overall: 72 },
  { month: "Feb", speed: 75, strength: 70, endurance: 78, overall: 74 },
  { month: "Mar", speed: 78, strength: 74, endurance: 80, overall: 77 },
  { month: "Apr", speed: 80, strength: 78, endurance: 82, overall: 80 },
  { month: "May", speed: 83, strength: 80, endurance: 85, overall: 83 },
  { month: "Jun", speed: 85, strength: 82, endurance: 88, overall: 85 },
];

const upcomingTournaments = [
  { id: "1", name: "State Athletics Championship", date: "2026-02-15", location: "Delhi", sport: "Athletics" },
  { id: "2", name: "District Sprint Meet", date: "2026-02-22", location: "Gurgaon", sport: "Sprint" },
  { id: "3", name: "National Youth Games", date: "2026-03-10", location: "Mumbai", sport: "Multi-sport" },
];

const recentAchievements = [
  { id: "1", title: "100m Sprint - Gold", event: "State Championship", date: "2026-01-20", points: 100 },
  { id: "2", title: "200m Sprint - Silver", event: "District Meet", date: "2026-01-15", points: 75 },
  { id: "3", title: "Long Jump - Bronze", event: "Inter-School", date: "2026-01-10", points: 50 },
];

const coachConnections = [
  { id: "1", name: "Coach Rajesh Kumar", sport: "Athletics", rating: 4.8, sessions: 24 },
  { id: "2", name: "Coach Priya Verma", sport: "Sprint Training", rating: 4.6, sessions: 12 },
];

const stats = [
  { label: "My Rank", value: "#156", change: "+12", icon: Medal, color: "from-[#FF6B35] to-[#D72638]" },
  { label: "Achievements", value: "28", change: "+5", icon: Award, color: "from-[#D72638] to-[#9C27B0]" },
  { label: "Certificates", value: "15", change: "+3", icon: FileText, color: "from-[#2196F3] to-[#1565C0]" },
  { label: "Tournaments", value: "12", change: "+2", icon: Calendar, color: "from-[#4CAF50] to-[#2E7D32]" },
];

export default function AthleteDashboard() {
  return (
    <div>
      <DashboardHeader title="Athlete Dashboard" subtitle="Track your performance and achievements." notificationCount={4} />

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="speed" stroke="#FF6B35" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="strength" stroke="#2196F3" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="endurance" stroke="#4CAF50" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="overall" stroke="#1B2838" strokeWidth={2} dot={{ r: 4 }} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" />
                <span className="text-gray-600">Speed</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2196F3]" />
                <span className="text-gray-600">Strength</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4CAF50]" />
                <span className="text-gray-600">Endurance</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1B2838]" />
                <span className="text-gray-600">Overall</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Coaches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {coachConnections.map((coach) => (
                <div key={coach.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{coach.name}</p>
                      <p className="text-xs text-gray-500">{coach.sport}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span>{coach.rating}</span>
                    </div>
                    <span className="text-gray-500">{coach.sessions} sessions</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Tournaments</CardTitle>
            <Button variant="outline" size="sm">
              Browse All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTournaments.map((tournament) => (
                <div key={tournament.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tournament.name}</p>
                      <p className="text-xs text-gray-500">{tournament.location} • {tournament.date}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{tournament.sport}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{achievement.title}</p>
                      <p className="text-xs text-gray-500">{achievement.event} • {achievement.date}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[#FF6B35] bg-[#FF6B35]/10">
                    +{achievement.points} pts
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1">Update Profile</h3>
            <p className="text-xs text-gray-500">Keep your info current</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B2838] to-[#2196F3] flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1">Browse Tournaments</h3>
            <p className="text-xs text-gray-500">Find competitions</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-1">View Analytics</h3>
            <p className="text-xs text-gray-500">Deep performance insights</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
