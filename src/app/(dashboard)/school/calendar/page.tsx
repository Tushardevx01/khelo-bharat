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
import { Plus, ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";

const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);
const firstDayOffset = 5; // Friday (Aug 1, 2026 is a Saturday)

const events = [
  { date: 5, title: "Cricket Practice", time: "4:00 PM", type: "training", color: "from-[#FF6B35] to-[#D72638]" },
  { date: 7, title: "Sports Day Planning", time: "10:00 AM", type: "meeting", color: "from-[#2196F3] to-[#1565C0]" },
  { date: 10, title: "Inter-School Tournament", time: "9:00 AM", type: "tournament", color: "from-[#4CAF50] to-[#2E7D32]" },
  { date: 15, title: "Independence Day Event", time: "8:00 AM", type: "event", color: "from-[#9C27B0] to-[#6A1B9A]" },
  { date: 20, title: "Parent-Teacher Meeting", time: "3:00 PM", type: "meeting", color: "from-[#2196F3] to-[#1565C0]" },
  { date: 25, title: "Swimming Championship", time: "7:00 AM", type: "tournament", color: "from-[#FF6B35] to-[#D72638]" },
];

const upcomingEvents = [
  { title: "Cricket Practice", date: "2026-08-05", time: "4:00 PM", type: "training" },
  { title: "Sports Day Planning", date: "2026-08-07", time: "10:00 AM", type: "meeting" },
  { title: "Inter-School Tournament", date: "2026-08-10", time: "9:00 AM", type: "tournament" },
];

const typeColors: Record<string, string> = {
  training: "bg-[#FF6B35]/10 text-[#FF6B35]",
  meeting: "bg-blue-500/10 text-blue-500",
  tournament: "bg-green-500/10 text-green-600",
  event: "bg-purple-500/10 text-purple-500",
};

export default function SchoolCalendarPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader title="Event Calendar" subtitle="Manage school events and activities." notificationCount={2} />

      <div className="flex items-center justify-end mb-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90" />}>
            <Plus className="w-4 h-4 mr-1" /> Add Event
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Event</DialogTitle>
              <DialogDescription>Create a new calendar event.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <Input placeholder="Event name" />
              <Input type="date" />
              <Input type="time" />
              <Input placeholder="Type (training/meeting/tournament/event)" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" onClick={() => setOpen(false)}>Add Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>August 2026</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon-sm"><ChevronLeft className="w-4 h-4" /></Button>
              <Button variant="outline" size="icon-sm"><ChevronRight className="w-4 h-4" /></Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} className="py-2 font-medium text-gray-500">{d}</div>
              ))}
              {Array.from({ length: firstDayOffset }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {monthDays.map((day) => {
                const dayEvents = events.filter((e) => e.date === day);
                return (
                  <div key={day} className={`p-1 min-h-[60px] rounded-lg ${day === 4 ? "bg-[#FF6B35]/10 ring-1 ring-[#FF6B35]" : "hover:bg-gray-50 dark:hover:bg-gray-900"}`}>
                    <div className={`text-sm font-medium ${day === 4 ? "text-[#FF6B35]" : ""}`}>{day}</div>
                    {dayEvents.map((ev, i) => (
                      <div key={i} className={`text-[9px] px-1 py-0.5 rounded bg-gradient-to-r ${ev.color} text-white truncate mt-0.5`}>
                        {ev.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event, i) => (
                <div key={i} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${events[i].color}`} />
                    <span className="text-sm font-medium">{event.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 ml-4">
                    <Calendar className="w-3 h-3" /> {event.date}
                    <Clock className="w-3 h-3" /> {event.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
