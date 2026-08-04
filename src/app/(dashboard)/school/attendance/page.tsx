"use client";

import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar, CheckCircle, XCircle, Clock, ChevronLeft, ChevronRight,
} from "lucide-react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const dates = ["04", "05", "06", "07", "08"];

const attendanceData = [
  { id: "1", name: "Arjun Mehta", attendance: [true, true, false, true, true] },
  { id: "2", name: "Priya Sharma", attendance: [true, true, true, true, true] },
  { id: "3", name: "Rohan Verma", attendance: [false, true, true, true, false] },
  { id: "4", name: "Sneha Patel", attendance: [true, true, true, true, true] },
  { id: "5", name: "Vikram Singh", attendance: [true, false, true, false, true] },
  { id: "6", name: "Ananya Das", attendance: [true, true, true, true, true] },
];

const stats = [
  { label: "Total Students", value: "120", icon: Calendar },
  { label: "Present Today", value: "98", icon: CheckCircle },
  { label: "Absent Today", value: "22", icon: XCircle },
  { label: "Avg Attendance", value: "82%", icon: Clock },
];

export default function SchoolAttendancePage() {
  const [selectedDate, setSelectedDate] = useState(0);

  return (
    <div>
      <DashboardHeader title="Attendance" subtitle="Track and manage student attendance." notificationCount={0} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Weekly Attendance</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon-sm"><ChevronLeft className="w-4 h-4" /></Button>
            <span className="text-sm font-medium">Aug 4-8, 2026</span>
            <Button variant="outline" size="icon-sm"><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium text-gray-500">Student</th>
                  {weekDays.map((day, i) => (
                    <th key={day} className="text-center py-2 font-medium text-gray-500">
                      <div>{day}</div>
                      <div className="text-xs">{dates[i]}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="py-3 font-medium">{student.name}</td>
                    {student.attendance.map((present, i) => (
                      <td key={i} className="text-center py-3">
                        {present ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
              <p className="text-3xl font-bold text-green-600">98</p>
              <p className="text-xs text-gray-500 mt-1">Present Today</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-red-50 dark:bg-red-900/20">
              <p className="text-3xl font-bold text-red-500">22</p>
              <p className="text-xs text-gray-500 mt-1">Absent Today</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-[#FF6B35]/10">
              <p className="text-3xl font-bold text-[#FF6B35]">82%</p>
              <p className="text-xs text-gray-500 mt-1">Avg Attendance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
