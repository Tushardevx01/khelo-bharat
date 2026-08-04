"use client";

import { useState } from "react";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/shared/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { title: "Today's Attendance", value: "92%", change: 2, icon: CheckCircle, color: "from-green-500 to-green-700" },
  { title: "Present", value: "1,150", icon: CheckCircle },
  { title: "Absent", value: "65", icon: XCircle, color: "from-red-500 to-red-700" },
  { title: "Late Arrivals", value: "35", icon: Clock, color: "from-yellow-500 to-yellow-700" },
];

const attendanceData = [
  { name: "Monday", present: 92, absent: 8 },
  { name: "Tuesday", present: 88, absent: 12 },
  { name: "Wednesday", present: 95, absent: 5 },
  { name: "Thursday", present: 90, absent: 10 },
  { name: "Friday", present: 93, absent: 7 },
];

const recentAttendance = [
  { student: "Aarav Kumar", status: "Present", time: "8:00 AM", sport: "Cricket" },
  { student: "Diya Patel", status: "Present", time: "7:55 AM", sport: "Tennis" },
  { student: "Riya Singh", status: "Late", time: "8:15 AM", sport: "Badminton" },
  { student: "Vivaan Sharma", status: "Absent", time: "-", sport: "Football" },
  { student: "Anika Gupta", status: "Present", time: "8:02 AM", sport: "Athletics" },
];

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState("2024-06-15");

  return (
    <div>
      <DashboardHeader title="Attendance Tracking" subtitle="Monitor student attendance" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} color={stat.color || "from-blue-500 to-blue-700"} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceData.map((day) => (
                <div key={day.name} className="flex items-center gap-4">
                  <span className="text-sm w-24">{day.name}</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: `${day.present}%` }} />
                  </div>
                  <span className="text-sm font-medium w-12">{day.present}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAttendance.map((record, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <div>
                    <p className="font-medium text-sm">{record.student}</p>
                    <p className="text-xs text-gray-500">{record.sport} • {record.time}</p>
                  </div>
                  <Badge variant={record.status === "Present" ? "default" : record.status === "Late" ? "outline" : "destructive"}>
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
