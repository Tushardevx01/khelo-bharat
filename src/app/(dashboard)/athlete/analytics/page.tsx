"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Trophy, Target, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import DashboardHeader from "@/components/layout/DashboardHeader";

const performanceData = [
  { month: "Jan", score: 72, events: 3, winRate: 60 },
  { month: "Feb", score: 78, events: 4, winRate: 65 },
  { month: "Mar", score: 85, events: 5, winRate: 72 },
  { month: "Apr", score: 82, events: 4, winRate: 68 },
  { month: "May", score: 90, events: 6, winRate: 80 },
  { month: "Jun", score: 88, events: 5, winRate: 75 },
  { month: "Jul", score: 95, events: 7, winRate: 85 },
  { month: "Aug", score: 92, events: 6, winRate: 82 },
  { month: "Sep", score: 97, events: 8, winRate: 90 },
  { month: "Oct", score: 94, events: 7, winRate: 88 },
  { month: "Nov", score: 98, events: 9, winRate: 92 },
  { month: "Dec", score: 96, events: 8, winRate: 90 },
];

const trainingLog = [
  { date: "2024-12-01", activity: "Morning Run", duration: "45 min", intensity: "Medium", notes: "Completed 5K run" },
  { date: "2024-11-30", activity: "Cricket Practice", duration: "2 hrs", intensity: "High", notes: "nets session with bowling drills" },
  { date: "2024-11-29", activity: "Strength Training", duration: "1 hr", intensity: "High", notes: "upper body focus" },
  { date: "2024-11-28", activity: "Swimming", duration: "30 min", intensity: "Low", notes: "recovery swim" },
  { date: "2024-11-27", activity: "Cricket Match", duration: "6 hrs", intensity: "High", notes: "inter-college match" },
  { date: "2024-11-26", activity: "Yoga & Stretching", duration: "40 min", intensity: "Low", notes: "flexibility work" },
];

const dateRanges = ["This Week", "This Month", "Last 3 Months", "Last 6 Months", "This Year"];

export default function AthleteAnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState("This Year");

  const stats = [
    { label: "Best Performance", value: "98", suffix: "pts", change: "+5", up: true, icon: Trophy, color: "#FF6B35" },
    { label: "Average Score", value: "89.6", suffix: "pts", change: "+3.2", up: true, icon: TrendingUp, color: "#D72638" },
    { label: "Total Events", value: "69", suffix: "", change: "+12", up: true, icon: BarChart3, color: "#FF6B35" },
    { label: "Win Rate", value: "80", suffix: "%", change: "-2%", up: false, icon: Target, color: "#D72638" },
  ];

  return (
    <div className="space-y-6">
      <DashboardHeader title="Performance Analytics" subtitle="Track your progress and performance metrics" notificationCount={0} />

      {/* Date Range Selector */}
      <div className="flex gap-2 flex-wrap">
        {dateRanges.map((range) => (
          <Button
            key={range}
            variant={selectedRange === range ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRange(range)}
            className={selectedRange === range ? "bg-[#FF6B35] text-white" : ""}
          >
            <Calendar className="w-3.5 h-3.5 mr-1" />
            {range}
          </Button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-3xl font-bold mt-1">
                      {stat.value}
                      <span className="text-sm font-normal text-gray-400 ml-1">{stat.suffix}</span>
                    </p>
                    <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${stat.up ? "text-green-600" : "text-red-500"}`}>
                      {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {stat.change} from last month
                    </div>
                  </div>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}15` }}>
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[#FF6B35]" /> Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#FF6B35" strokeWidth={2} dot={{ fill: "#FF6B35" }} name="Score" />
                  <Line type="monotone" dataKey="winRate" stroke="#D72638" strokeWidth={2} dot={{ fill: "#D72638" }} name="Win Rate %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bar Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5 text-[#D72638]" /> Events Per Month</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="events" fill="#FF6B35" radius={[4, 4, 0, 0]} name="Events" />
                  <Bar dataKey="winRate" fill="#D72638" radius={[4, 4, 0, 0]} opacity={0.7} name="Win Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Training Log Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>Training Log</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Intensity</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainingLog.map((entry, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{new Date(entry.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</TableCell>
                    <TableCell>{entry.activity}</TableCell>
                    <TableCell>{entry.duration}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          entry.intensity === "High"
                            ? "text-[#D72638] border-[#D72638]/30"
                            : entry.intensity === "Medium"
                            ? "text-[#FF6B35] border-[#FF6B35]/30"
                            : "text-green-600 border-green-600/30"
                        }
                      >
                        {entry.intensity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500 max-w-[200px] truncate">{entry.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
