"use client";

import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus, Calendar, Clock, Users, Dumbbell, Target, ChevronRight,
} from "lucide-react";

const programs = [
  { id: "1", name: "Sprint Endurance Block", sport: "Athletics", duration: "4 weeks", athletes: 6, status: "Active", nextSession: "2026-08-05 06:00 AM" },
  { id: "2", name: "Swim Power Phase", sport: "Swimming", duration: "6 weeks", athletes: 4, status: "Active", nextSession: "2026-08-05 07:30 AM" },
  { id: "3", name: "Cricket Agility Training", sport: "Cricket", duration: "3 weeks", athletes: 8, status: "Upcoming", nextSession: "2026-08-10 05:00 PM" },
  { id: "4", name: "Hockey Skills Development", sport: "Hockey", duration: "8 weeks", athletes: 5, status: "Active", nextSession: "2026-08-06 04:00 PM" },
  { id: "5", name: "Wrestling Strength Camp", sport: "Wrestling", duration: "5 weeks", athletes: 3, status: "Completed", nextSession: "—" },
  { id: "6", name: "Badminton Footwork Drills", sport: "Badminton", duration: "2 weeks", athletes: 4, status: "Active", nextSession: "2026-08-05 06:30 PM" },
];

const calendarEvents = [
  { date: "2026-08-05", title: "Sprint Session", time: "06:00 AM", type: "training" },
  { date: "2026-08-05", title: "Swim Power", time: "07:30 AM", type: "training" },
  { date: "2026-08-06", title: "Hockey Skills", time: "04:00 PM", type: "training" },
  { date: "2026-08-07", title: "Performance Review", time: "10:00 AM", type: "review" },
  { date: "2026-08-08", title: "Badminton Drills", time: "06:30 PM", type: "training" },
];

const statusColors: Record<string, string> = {
  Active: "bg-green-500/10 text-green-600",
  Upcoming: "bg-blue-500/10 text-blue-500",
  Completed: "bg-gray-500/10 text-gray-500",
};

export default function CoachTrainingPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader title="Training Programs" subtitle="Manage training sessions and schedules." notificationCount={2} />

      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-[#FF6B35] text-[#FF6B35]">All</Button>
          <Button variant="ghost" size="sm">Active</Button>
          <Button variant="ghost" size="sm">Upcoming</Button>
          <Button variant="ghost" size="sm">Completed</Button>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90" />}>
            <Plus className="w-4 h-4 mr-1" /> Create Session
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Training Session</DialogTitle>
              <DialogDescription>Set up a new training session for your athletes.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <Input placeholder="Session name" />
              <Input placeholder="Sport" />
              <Input type="date" />
              <Input type="time" placeholder="Time" />
              <Input placeholder="Duration (e.g., 1 hour)" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" onClick={() => setOpen(false)}>Create Session</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {programs.map((program, i) => (
          <Card key={program.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <Badge className={statusColors[program.status]}>{program.status}</Badge>
              </div>
              <h3 className="font-semibold mb-1">{program.name}</h3>
              <p className="text-xs text-gray-500 mb-3">{program.sport} • {program.duration}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" /> {program.athletes} athletes
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {program.nextSession}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {calendarEvents.map((event, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date} • {event.time}</p>
                  </div>
                </div>
                <Badge variant="outline" className={event.type === "review" ? "border-[#D72638] text-[#D72638]" : ""}>
                  {event.type === "review" ? "Review" : "Training"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
