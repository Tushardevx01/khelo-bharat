"use client";

import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus, Search, TrendingUp, Eye, User, Award, Calendar,
} from "lucide-react";

const athletes = [
  { id: "1", name: "Arjun Mehta", sport: "Athletics", level: "National", score: 92, lastTraining: "2026-08-02", avatar: "AM" },
  { id: "2", name: "Priya Sharma", sport: "Swimming", level: "State", score: 87, lastTraining: "2026-08-03", avatar: "PS" },
  { id: "3", name: "Rohan Verma", sport: "Cricket", level: "District", score: 78, lastTraining: "2026-08-01", avatar: "RV" },
  { id: "4", name: "Sneha Patel", sport: "Badminton", level: "National", score: 95, lastTraining: "2026-08-04", avatar: "SP" },
  { id: "5", name: "Vikram Singh", sport: "Wrestling", level: "State", score: 82, lastTraining: "2026-07-31", avatar: "VS" },
  { id: "6", name: "Ananya Das", sport: "Hockey", level: "District", score: 74, lastTraining: "2026-08-02", avatar: "AD" },
];

const levelColors: Record<string, string> = {
  National: "bg-[#FF6B35]/10 text-[#FF6B35]",
  State: "bg-[#D72638]/10 text-[#D72638]",
  District: "bg-blue-500/10 text-blue-500",
};

export default function CoachAthletesPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = athletes.filter(
    (a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.sport.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <DashboardHeader title="My Athletes" subtitle="Manage and track your coached athletes." notificationCount={3} />

      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5 flex-1 max-w-sm">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search athletes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90" />}>
            <Plus className="w-4 h-4 mr-1" /> Add Athlete
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Athlete</DialogTitle>
              <DialogDescription>Add a new athlete to your coaching roster.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <Input placeholder="Athlete name" />
              <Input placeholder="Sport" />
              <Input placeholder="Level (National/State/District)" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" onClick={() => setOpen(false)}>Add Athlete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Athlete</TableHead>
                <TableHead>Sport</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Performance Score</TableHead>
                <TableHead>Last Training</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((athlete) => (
                <TableRow key={athlete.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center text-white text-xs font-bold">
                        {athlete.avatar}
                      </div>
                      <span className="font-medium">{athlete.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{athlete.sport}</TableCell>
                  <TableCell>
                    <Badge className={levelColors[athlete.level] || ""}>{athlete.level}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] rounded-full" style={{ width: `${athlete.score}%` }} />
                      </div>
                      <span className="text-sm font-medium">{athlete.score}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500">{athlete.lastTraining}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
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
