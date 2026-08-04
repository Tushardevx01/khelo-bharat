"use client";

import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Users, Trophy } from "lucide-react";

const sports = [
  { id: "1", name: "Cricket", athletes: 24, icon: "🏏", coaches: 3, tournaments: 5 },
  { id: "2", name: "Athletics", athletes: 18, icon: "🏃", coaches: 2, tournaments: 8 },
  { id: "3", name: "Swimming", athletes: 12, icon: "🏊", coaches: 2, tournaments: 3 },
  { id: "4", name: "Badminton", athletes: 15, icon: "🏸", coaches: 2, tournaments: 4 },
  { id: "5", name: "Football", athletes: 20, icon: "⚽", coaches: 2, tournaments: 6 },
  { id: "6", name: "Hockey", athletes: 16, icon: "🏑", coaches: 1, tournaments: 3 },
  { id: "7", name: "Wrestling", athletes: 8, icon: "🤼", coaches: 1, tournaments: 2 },
  { id: "8", name: "Tennis", athletes: 10, icon: "🎾", coaches: 1, tournaments: 4 },
];

export default function SchoolSportsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader title="Sports Management" subtitle="Manage sports programs and activities." notificationCount={0} />

      <div className="flex items-center justify-end mb-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90" />}>
            <Plus className="w-4 h-4 mr-1" /> Add Sport
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Sport</DialogTitle>
              <DialogDescription>Add a new sport to the program.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <Input placeholder="Sport name" />
              <Input placeholder="Number of coaches" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" onClick={() => setOpen(false)}>Add Sport</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sports.map((sport) => (
          <Card key={sport.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="text-3xl mb-3">{sport.icon}</div>
              <h3 className="font-semibold text-lg mb-1">{sport.name}</h3>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {sport.athletes} athletes</span>
                <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> {sport.tournaments} tournaments</span>
              </div>
              <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800">{sport.coaches} coaches</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
