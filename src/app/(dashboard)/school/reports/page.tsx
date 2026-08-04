"use client";

import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText, Download, Users, BarChart3, Trophy, TrendingUp,
} from "lucide-react";

const reportCards = [
  {
    id: "1",
    title: "Student Performance Report",
    description: "Academic and athletic performance of all students",
    icon: BarChart3,
    color: "from-[#FF6B35] to-[#D72638]",
    stats: { students: 120, avgScore: 82, topPerformers: 15 },
  },
  {
    id: "2",
    title: "Attendance Report",
    description: "Monthly attendance statistics and trends",
    icon: Users,
    color: "from-[#2196F3] to-[#1565C0]",
    stats: { avgAttendance: "82%", present: 98, absent: 22 },
  },
  {
    id: "3",
    title: "Sports Achievement Report",
    description: "Tournament results and achievements summary",
    icon: Trophy,
    color: "from-[#4CAF50] to-[#2E7D32]",
    stats: { tournaments: 12, medals: 28, participants: 85 },
  },
  {
    id: "4",
    title: "Monthly Progress Report",
    description: "Overall progress and improvements across all departments",
    icon: TrendingUp,
    color: "from-[#9C27B0] to-[#6A1B9A]",
    stats: { improvement: "+12%", goalsMet: "85%", upcomingEvents: 8 },
  },
];

export default function SchoolReportsPage() {
  return (
    <div>
      <DashboardHeader title="Reports" subtitle="Generate and view comprehensive reports." notificationCount={0} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {reportCards.map((report) => (
          <Card key={report.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${report.color} flex items-center justify-center`}>
                  <report.icon className="w-6 h-6 text-white" />
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" /> Export
                </Button>
              </div>
              <h3 className="text-lg font-semibold mb-1">{report.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{report.description}</p>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(report.stats).map(([key, value]) => (
                  <div key={key} className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <p className="text-lg font-bold">{value}</p>
                    <p className="text-[10px] text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
