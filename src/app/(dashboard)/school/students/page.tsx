"use client";

import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, User } from "lucide-react";

const students = [
  { id: "1", name: "Arjun Mehta", grade: "10th", sport: "Athletics", performance: 92, status: "Active" },
  { id: "2", name: "Priya Sharma", grade: "9th", sport: "Swimming", performance: 87, status: "Active" },
  { id: "3", name: "Rohan Verma", grade: "11th", sport: "Cricket", performance: 78, status: "Active" },
  { id: "4", name: "Sneha Patel", grade: "10th", sport: "Badminton", performance: 95, status: "Active" },
  { id: "5", name: "Vikram Singh", grade: "12th", sport: "Wrestling", performance: 82, status: "Inactive" },
  { id: "6", name: "Ananya Das", grade: "9th", sport: "Hockey", performance: 74, status: "Active" },
  { id: "7", name: "Kabir Joshi", grade: "11th", sport: "Tennis", performance: 90, status: "Active" },
  { id: "8", name: "Nisha Gupta", grade: "10th", sport: "Kabaddi", performance: 69, status: "Inactive" },
];

const statusColors: Record<string, string> = {
  Active: "bg-green-500/10 text-green-600",
  Inactive: "bg-gray-500/10 text-gray-500",
};

export default function SchoolStudentsPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.sport.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <DashboardHeader title="Student Management" subtitle="Manage student athletes and their records." notificationCount={2} />

      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5 flex-1 max-w-sm">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search students..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90" />}>
            <Plus className="w-4 h-4 mr-1" /> Add Student
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Student</DialogTitle>
              <DialogDescription>Register a new student athlete.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <Input placeholder="Student name" />
              <Input placeholder="Grade" />
              <Input placeholder="Sport" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" onClick={() => setOpen(false)}>Add Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Sport</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center text-white text-xs font-bold">
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="font-medium">{s.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{s.grade}</TableCell>
                  <TableCell><Badge variant="outline">{s.sport}</Badge></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] rounded-full" style={{ width: `${s.performance}%` }} />
                      </div>
                      <span className="text-sm font-medium">{s.performance}</span>
                    </div>
                  </TableCell>
                  <TableCell><Badge className={statusColors[s.status]}>{s.status}</Badge></TableCell>
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
