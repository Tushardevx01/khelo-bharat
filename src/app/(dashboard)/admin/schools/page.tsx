"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Pencil, Building2 } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const mockSchools = [
  { id: 1, name: "Delhi Public School", city: "New Delhi", state: "Delhi", students: 1200, sports: 8, status: "Active" },
  { id: 2, name: "St. Xavier's Academy", city: "Mumbai", state: "Maharashtra", students: 950, sports: 6, status: "Active" },
  { id: 3, name: "Kendriya Vidyalaya", city: "Bangalore", state: "Karnataka", students: 1500, sports: 10, status: "Active" },
  { id: 4, name: "The Doon School", city: "Dehradun", state: "Uttarakhand", students: 600, sports: 7, status: "Pending" },
  { id: 5, name: "Modern School", city: "Lucknow", state: "Uttar Pradesh", students: 800, sports: 5, status: "Active" },
  { id: 6, name: "Bishop Cotton School", city: "Chandigarh", state: "Punjab", students: 700, sports: 9, status: "Inactive" },
];

const stats = [
  { label: "Total Schools", value: 6, icon: Building2, color: "#FF6B35" },
  { label: "Active", value: 4, color: "#D72638" },
  { label: "Total Students", value: "5,750", color: "#FF6B35" },
  { label: "Sports Offered", value: 45, color: "#D72638" },
];

export default function SchoolsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewSchool, setViewSchool] = useState<typeof mockSchools[0] | null>(null);

  const filtered = mockSchools.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen">
      <DashboardHeader title="School Management" subtitle="Manage registered schools" notificationCount={1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardContent className="flex items-center gap-4 py-4">
                {s.icon && (
                  <div className="p-3 rounded-xl" style={{ backgroundColor: `${s.color}15` }}>
                    <s.icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                )}
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle>Schools</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search schools..." className="pl-9 w-56" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Sports</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell className="font-medium">{school.name}</TableCell>
                    <TableCell className="text-muted-foreground">{school.city}</TableCell>
                    <TableCell className="text-muted-foreground">{school.state}</TableCell>
                    <TableCell>{school.students.toLocaleString()}</TableCell>
                    <TableCell>{school.sports}</TableCell>
                    <TableCell>
                      <Badge variant={school.status === "Active" ? "default" : school.status === "Pending" ? "secondary" : "destructive"}>
                        {school.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" onClick={() => setViewSchool(school)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon-sm">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={!!viewSchool} onOpenChange={() => setViewSchool(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>School Details</DialogTitle>
            <DialogDescription>Viewing school information</DialogDescription>
          </DialogHeader>
          {viewSchool && (
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{viewSchool.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">City</span><span className="font-medium">{viewSchool.city}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">State</span><span className="font-medium">{viewSchool.state}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Students</span><span className="font-medium">{viewSchool.students.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sports</span><span className="font-medium">{viewSchool.sports}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge variant={viewSchool.status === "Active" ? "default" : "destructive"}>{viewSchool.status}</Badge></div>
            </div>
          )}
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
