"use client";

import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, User, Award } from "lucide-react";

const coaches = [
  { id: "1", name: "Coach Rajesh Kumar", sport: "Athletics", experience: "12 years", athletes: 6, rating: 4.8 },
  { id: "2", name: "Coach Priya Verma", sport: "Swimming", experience: "8 years", athletes: 4, rating: 4.6 },
  { id: "3", name: "Coach Amit Singh", sport: "Cricket", experience: "15 years", athletes: 8, rating: 4.9 },
  { id: "4", name: "Coach Neha Gupta", sport: "Badminton", experience: "6 years", athletes: 5, rating: 4.5 },
  { id: "5", name: "Coach Suresh Patel", sport: "Wrestling", experience: "10 years", athletes: 3, rating: 4.7 },
];

export default function SchoolCoachesPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader title="Coach Management" subtitle="Manage coaches and their assignments." notificationCount={1} />

      <div className="flex items-center justify-end mb-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90" />}>
            <Plus className="w-4 h-4 mr-1" /> Add Coach
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Coach</DialogTitle>
              <DialogDescription>Register a new coach.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <Input placeholder="Coach name" />
              <Input placeholder="Sport specialty" />
              <Input placeholder="Experience (years)" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" onClick={() => setOpen(false)}>Add Coach</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coach</TableHead>
                <TableHead>Sport</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Athletes</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coaches.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center text-white text-xs font-bold">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{c.name}</span>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline">{c.sport}</Badge></TableCell>
                  <TableCell>{c.experience}</TableCell>
                  <TableCell>{c.athletes}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">{c.rating}</span>
                    </div>
                  </TableCell>
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
