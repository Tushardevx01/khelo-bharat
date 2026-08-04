"use client";

import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Trophy, Calendar, MapPin } from "lucide-react";

const tournaments = [
  { id: "1", name: "Inter-School Cricket Championship", sport: "Cricket", date: "2026-08-15", location: "School Ground", participants: 12, status: "Upcoming" },
  { id: "2", name: "District Athletics Meet", sport: "Athletics", date: "2026-09-01", location: "District Stadium", participants: 20, status: "Upcoming" },
  { id: "3", name: "Annual Sports Day", sport: "Multi-sport", date: "2026-10-10", location: "School Campus", participants: 150, status: "Upcoming" },
  { id: "4", name: "Swimming Relay Championship", sport: "Swimming", date: "2026-07-20", location: "Aquatic Center", participants: 8, status: "Completed" },
  { id: "5", name: "Badminton Singles Cup", sport: "Badminton", date: "2026-07-15", location: "Indoor Court", participants: 16, status: "Completed" },
];

const statusColors: Record<string, string> = {
  Upcoming: "bg-blue-500/10 text-blue-500",
  Completed: "bg-green-500/10 text-green-600",
  Ongoing: "bg-[#FF6B35]/10 text-[#FF6B35]",
};

export default function SchoolTournamentsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader title="Tournaments" subtitle="Host and manage school tournaments." notificationCount={1} />

      <div className="flex items-center justify-end mb-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90" />}>
            <Plus className="w-4 h-4 mr-1" /> Host Tournament
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Host Tournament</DialogTitle>
              <DialogDescription>Create a new tournament event.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <Input placeholder="Tournament name" />
              <Input placeholder="Sport" />
              <Input type="date" />
              <Input placeholder="Location" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" onClick={() => setOpen(false)}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tournament</TableHead>
                <TableHead>Sport</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tournaments.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-[#FF6B35]" />
                      <span className="font-medium">{t.name}</span>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline">{t.sport}</Badge></TableCell>
                  <TableCell className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {t.date}</TableCell>
                  <TableCell className="flex items-center gap-1 text-gray-500"><MapPin className="w-3 h-3" /> {t.location}</TableCell>
                  <TableCell>{t.participants}</TableCell>
                  <TableCell><Badge className={statusColors[t.status]}>{t.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
