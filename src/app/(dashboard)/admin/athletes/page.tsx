"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Pencil, Trophy } from "lucide-react";
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

const mockAthletes = [
  { id: 1, name: "Virat Anand", sport: "Cricket", city: "New Delhi", ranking: "#3", achievements: "5 medals" },
  { id: 2, name: "Sakshi Mehta", sport: "Athletics", city: "Pune", ranking: "#1", achievements: "8 medals" },
  { id: 3, name: "Ravi Teja", sport: "Badminton", city: "Hyderabad", ranking: "#7", achievements: "3 medals" },
  { id: 4, name: "Neha Kapoor", sport: "Swimming", city: "Mumbai", ranking: "#2", achievements: "6 medals" },
  { id: 5, name: "Amitabh Das", sport: "Football", city: "Kolkata", ranking: "#5", achievements: "4 medals" },
  { id: 6, name: "Pooja Rani", sport: "Tennis", city: "Chennai", ranking: "#4", achievements: "7 medals" },
  { id: 7, name: "Kiran Bhat", sport: "Hockey", city: "Bhopal", ranking: "#9", achievements: "2 medals" },
  { id: 8, name: "Deepak Yadav", sport: "Basketball", city: "Jaipur", ranking: "#6", achievements: "3 medals" },
];

const stats = [
  { label: "Total Athletes", value: 8, icon: Trophy, color: "#FF6B35" },
  { label: "Sports Covered", value: 8, color: "#D72638" },
  { label: "Total Medals", value: 38, color: "#FF6B35" },
  { label: "Top Ranked", value: 3, color: "#D72638" },
];

export default function AthletesPage() {
  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("all");
  const [viewAthlete, setViewAthlete] = useState<typeof mockAthletes[0] | null>(null);

  const filtered = mockAthletes.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.city.toLowerCase().includes(search.toLowerCase());
    const matchSport = sportFilter === "all" || a.sport === sportFilter;
    return matchSearch && matchSport;
  });

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Athlete Management" subtitle="Track and manage athletes" notificationCount={0} />

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
              <CardTitle>Athletes</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search athletes..." className="pl-9 w-56" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Select value={sportFilter} onValueChange={(v) => setSportFilter(v || "")}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="All Sports" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sports</SelectItem>
                    <SelectItem value="Cricket">Cricket</SelectItem>
                    <SelectItem value="Football">Football</SelectItem>
                    <SelectItem value="Athletics">Athletics</SelectItem>
                    <SelectItem value="Swimming">Swimming</SelectItem>
                    <SelectItem value="Badminton">Badminton</SelectItem>
                    <SelectItem value="Tennis">Tennis</SelectItem>
                    <SelectItem value="Hockey">Hockey</SelectItem>
                    <SelectItem value="Basketball">Basketball</SelectItem>
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
                  <TableHead>Sport</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Ranking</TableHead>
                  <TableHead>Achievements</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((athlete) => (
                  <TableRow key={athlete.id}>
                    <TableCell className="font-medium">{athlete.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{athlete.sport}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{athlete.city}</TableCell>
                    <TableCell className="font-bold" style={{ color: "#FF6B35" }}>{athlete.ranking}</TableCell>
                    <TableCell className="text-muted-foreground">{athlete.achievements}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" onClick={() => setViewAthlete(athlete)}>
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

      <Dialog open={!!viewAthlete} onOpenChange={() => setViewAthlete(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Athlete Details</DialogTitle>
            <DialogDescription>Viewing athlete profile</DialogDescription>
          </DialogHeader>
          {viewAthlete && (
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{viewAthlete.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sport</span><Badge variant="outline">{viewAthlete.sport}</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">City</span><span className="font-medium">{viewAthlete.city}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Ranking</span><span className="font-bold" style={{ color: "#FF6B35" }}>{viewAthlete.ranking}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Achievements</span><span className="font-medium">{viewAthlete.achievements}</span></div>
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
