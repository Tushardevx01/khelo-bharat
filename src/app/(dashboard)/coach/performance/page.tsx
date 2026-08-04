"use client";

import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from "recharts";
import { TrendingUp, Target, Award, FileText, ArrowUpRight } from "lucide-react";

const comparisonData = [
  { month: "Jan", arjun: 72, priya: 68, sneha: 75, rohan: 60 },
  { month: "Feb", arjun: 75, priya: 72, sneha: 78, rohan: 63 },
  { month: "Mar", arjun: 78, priya: 76, sneha: 82, rohan: 68 },
  { month: "Apr", arjun: 82, priya: 80, sneha: 85, rohan: 72 },
  { month: "May", arjun: 85, priya: 83, sneha: 88, rohan: 75 },
  { month: "Jun", arjun: 88, priya: 87, sneha: 91, rohan: 78 },
];

const effectivenessData = [
  { program: "Sprint", effectiveness: 85, completion: 92 },
  { program: "Swim", effectiveness: 78, completion: 88 },
  { program: "Cricket", effectiveness: 72, completion: 80 },
  { program: "Hockey", effectiveness: 82, completion: 90 },
  { program: "Badminton", effectiveness: 88, completion: 95 },
];

const progressReports = [
  { id: "1", athlete: "Arjun Mehta", sport: "Athletics", improvement: "+16", period: "Jan-Jun 2026", status: "Excellent" },
  { id: "2", athlete: "Priya Sharma", sport: "Swimming", improvement: "+19", period: "Jan-Jun 2026", status: "Excellent" },
  { id: "3", athlete: "Rohan Verma", sport: "Cricket", improvement: "+18", period: "Jan-Jun 2026", status: "Good" },
  { id: "4", athlete: "Sneha Patel", sport: "Badminton", improvement: "+16", period: "Jan-Jun 2026", status: "Excellent" },
  { id: "5", athlete: "Vikram Singh", sport: "Wrestling", improvement: "+12", period: "Jan-Jun 2026", status: "Average" },
  { id: "6", athlete: "Ananya Das", sport: "Hockey", improvement: "+14", period: "Jan-Jun 2026", status: "Good" },
];

const stats = [
  { label: "Avg Improvement", value: "+15.8", icon: TrendingUp, color: "from-[#FF6B35] to-[#D72638]" },
  { label: "Training Sessions", value: "142", icon: Target, color: "from-[#2196F3] to-[#1565C0]" },
  { label: "Achievements", value: "38", icon: Award, color: "from-[#4CAF50] to-[#2E7D32]" },
  { label: "Reports Generated", value: "24", icon: FileText, color: "from-[#9C27B0] to-[#6A1B9A]" },
];

const statusColors: Record<string, string> = {
  Excellent: "bg-green-500/10 text-green-600",
  Good: "bg-blue-500/10 text-blue-500",
  Average: "bg-yellow-500/10 text-yellow-600",
};

export default function CoachPerformancePage() {
  return (
    <div>
      <DashboardHeader title="Performance Tracking" subtitle="Monitor athlete progress and training effectiveness." notificationCount={1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
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
            <CardTitle>Athlete Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="arjun" stroke="#FF6B35" strokeWidth={2} name="Arjun" />
                <Line type="monotone" dataKey="priya" stroke="#2196F3" strokeWidth={2} name="Priya" />
                <Line type="monotone" dataKey="sneha" stroke="#4CAF50" strokeWidth={2} name="Sneha" />
                <Line type="monotone" dataKey="rohan" stroke="#D72638" strokeWidth={2} name="Rohan" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Effectiveness</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={effectivenessData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="program" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="effectiveness" fill="#FF6B35" radius={[4, 4, 0, 0]} name="Effectiveness %" />
                <Bar dataKey="completion" fill="#D72638" radius={[4, 4, 0, 0]} name="Completion %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Progress Reports</CardTitle>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-1" /> Export All
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Athlete</TableHead>
                <TableHead>Sport</TableHead>
                <TableHead>Improvement</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {progressReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.athlete}</TableCell>
                  <TableCell>{report.sport}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-green-600 font-medium">
                      <ArrowUpRight className="w-4 h-4" /> {report.improvement}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-500">{report.period}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[report.status]}>{report.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
