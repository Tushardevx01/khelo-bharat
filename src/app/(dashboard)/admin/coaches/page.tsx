"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Pencil, Dumbbell } from "lucide-react";
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

const mockCoaches = [
  { id: 1, name: "Rajesh Kumar", specialization: "Cricket", experience: "12 years", athletes: 24, city: "New Delhi" },
  { id: 2, name: "Sanjay Patil", specialization: "Football", experience: "8 years", athletes: 18, city: "Mumbai" },
  { id: 3, name: "Anil Sharma", specialization: "Athletics", experience: "15 years", athletes: 30, city: "Bangalore" },
  { id: 4, name: "Manoj Singh", specialization: "Swimming", experience: "6 years", athletes: 12, city: "Chennai" },
  { id: 5, name: "Suresh Reddy", specialization: "Basketball", experience: "10 years", athletes: 16, city: "Hyderabad" },
  { id: 6, name: "Prakash Nair", specialization: "Hockey", experience: "9 years", athletes: 20, city: "Kolkata" },
];

const stats = [
  { label: "Total Coaches", value: 6, icon: Dumbbell, color: "#FF6B35" },
  { label: "Total Athletes", value: 120, color: "#D72638" },
  { label: "Avg Experience", value: "10 yrs", color: "#FF6B35" },
  { label: "Specializations", value: 6, color: "#D72638" },
];

export default function CoachesPage() {
  const [search, setSearch] = useState("");
  const [specFilter, setSpecFilter] = useState("all");
  const [viewCoach, setViewCoach] = useState<typeof mockCoaches[0] | null>(null);

  const filtered = mockCoaches.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase());
    const matchSpec = specFilter === "all" || c.specialization === specFilter;
    return matchSearch && matchSpec;
  });

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Coach Management" subtitle="Manage all coaches" notificationCount={2} />

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
              <CardTitle>Coaches</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search coaches..." className="pl-9 w-56" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Select value={specFilter} onValueChange={(v) => setSpecFilter(v || "")}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Sports" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sports</SelectItem>
                    <SelectItem value="Cricket">Cricket</SelectItem>
                    <SelectItem value="Football">Football</SelectItem>
                    <SelectItem value="Athletics">Athletics</SelectItem>
                    <SelectItem value="Swimming">Swimming</SelectItem>
                    <SelectItem value="Basketball">Basketball</SelectItem>
                    <SelectItem value="Hockey">Hockey</SelectItem>
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
                  <TableHead>Specialization</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Athletes</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((coach) => (
                  <TableRow key={coach.id}>
                    <TableCell className="font-medium">{coach.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{coach.specialization}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{coach.experience}</TableCell>
                    <TableCell>{coach.athletes}</TableCell>
                    <TableCell className="text-muted-foreground">{coach.city}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" onClick={() => setViewCoach(coach)}>
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

      <Dialog open={!!viewCoach} onOpenChange={() => setViewCoach(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Coach Details</DialogTitle>
            <DialogDescription>Viewing coach information</DialogDescription>
          </DialogHeader>
          {viewCoach && (
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{viewCoach.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Specialization</span><Badge variant="outline">{viewCoach.specialization}</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Experience</span><span className="font-medium">{viewCoach.experience}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Athletes</span><span className="font-medium">{viewCoach.athletes}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">City</span><span className="font-medium">{viewCoach.city}</span></div>
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
