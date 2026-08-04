"use client";

import { useState } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const students = [
  { id: 1, name: "Aarav Kumar", grade: "10th", sport: "Cricket", status: "Active", gpa: "9.2" },
  { id: 2, name: "Diya Patel", grade: "11th", sport: "Tennis", status: "Active", gpa: "8.8" },
  { id: 3, name: "Riya Singh", grade: "9th", sport: "Badminton", status: "Active", gpa: "9.5" },
  { id: 4, name: "Vivaan Sharma", grade: "12th", sport: "Football", status: "Active", gpa: "8.5" },
  { id: 5, name: "Anika Gupta", grade: "10th", sport: "Athletics", status: "Inactive", gpa: "9.0" },
  { id: 6, name: "Arjun Nair", grade: "11th", sport: "Basketball", status: "Active", gpa: "8.7" },
  { id: 7, name: "Kavya Reddy", grade: "9th", sport: "Swimming", status: "Active", gpa: "9.3" },
  { id: 8, name: "Aditya Verma", grade: "12th", sport: "Hockey", status: "Active", gpa: "8.9" },
];

export default function StudentsPage() {
  const [search, setSearch] = useState("");

  const filtered = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.sport.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <DashboardHeader title="Student Management" subtitle="Manage school students" />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5 flex-1">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search students..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Student
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-900">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Grade</th>
                  <th className="text-left py-3 px-4 font-medium">Sport</th>
                  <th className="text-left py-3 px-4 font-medium">GPA</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{student.grade}</td>
                    <td className="py-3 px-4"><Badge variant="secondary">{student.sport}</Badge></td>
                    <td className="py-3 px-4 font-medium">{student.gpa}</td>
                    <td className="py-3 px-4">
                      <Badge variant={student.status === "Active" ? "default" : "destructive"}>{student.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
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
