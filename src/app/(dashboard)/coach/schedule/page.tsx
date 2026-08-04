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
import { Calendar, Clock, MapPin, Plus, ChevronLeft, ChevronRight, Users, Edit } from "lucide-react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = ["04", "05", "06", "07", "08", "09", "10"];

const weekSchedule: Record<string, { title: string; time: string; type: string }[]> = {
  Mon: [{ title: "Sprint Training", time: "6:00-8:00 AM", type: "training" }],
  Tue: [
    { title: "Swim Session", time: "7:00-9:00 AM", type: "training" },
    { title: "Hockey Drills", time: "4:00-6:00 PM", type: "training" },
  ],
  Wed: [{ title: "Strength & Conditioning", time: "6:00-8:00 AM", type: "training" }],
  Thu: [{ title: "Sprint Training", time: "6:00-8:00 AM", type: "training" }, { title: "Badminton", time: "5:00-7:00 PM", type: "training" }],
  Fri: [{ title: "Swim Session", time: "7:00-9:00 AM", type: "training" }],
  Sat: [{ title: "Performance Review", time: "10:00-12:00 PM", type: "review" }, { title: "Cricket Practice", time: "3:00-5:00 PM", type: "training" }],
  Sun: [{ title: "Rest Day", time: "—", type: "rest" }],
};

const upcomingSessions = [
  { id: "1", title: "Sprint Training", date: "2026-08-05", time: "06:00 AM", location: "Track Field A", athletes: 6 },
  { id: "2", title: "Swim Session", date: "2026-08-05", time: "07:00 AM", location: "Pool Complex", athletes: 4 },
  { id: "3", title: "Hockey Drills", date: "2026-08-05", time: "04:00 PM", location: "Hockey Ground", athletes: 5 },
  { id: "4", title: "Strength & Conditioning", date: "2026-08-06", time: "06:00 AM", location: "Gymnasium", athletes: 8 },
  { id: "5", title: "Performance Review", date: "2026-08-09", time: "10:00 AM", location: "Meeting Room", athletes: 6 },
];

export default function CoachSchedulePage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader title="Schedule" subtitle="Plan and manage your weekly training schedule." notificationCount={2} />

      <div className="flex items-center justify-end mb-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90" />}>
            <Plus className="w-4 h-4 mr-1" /> Create Session
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Session</DialogTitle>
              <DialogDescription>Schedule a new training session.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <Input placeholder="Session title" />
              <Input type="date" />
              <Input type="time" />
              <Input placeholder="Location" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" onClick={() => setOpen(false)}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Weekly Calendar</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon-sm"><ChevronLeft className="w-4 h-4" /></Button>
            <span className="text-sm font-medium px-2">Aug 4 - Aug 10, 2026</span>
            <Button variant="outline" size="icon-sm"><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, i) => (
              <div key={day} className="text-center">
                <div className="text-xs font-medium text-gray-500 mb-1">{day}</div>
                <div className={`text-sm font-bold mb-2 ${i === 0 ? "text-[#FF6B35]" : ""}`}>{dates[i]}</div>
                <div className="space-y-1.5">
                  {weekSchedule[day].map((event, j) => (
                    <div
                      key={j}
                      className={`text-xs p-1.5 rounded-lg ${
                        event.type === "rest"
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-500"
                          : event.type === "review"
                          ? "bg-[#D72638]/10 text-[#D72638]"
                          : "bg-[#FF6B35]/10 text-[#FF6B35]"
                      }`}
                    >
                      <p className="font-medium truncate">{event.title}</p>
                      <p className="opacity-70">{event.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{session.title}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" /> {session.date} {session.time}
                      <MapPin className="w-3 h-3 ml-1" /> {session.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users className="w-3 h-3" /> {session.athletes}
                  </div>
                  <Button variant="ghost" size="icon-sm"><Edit className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
