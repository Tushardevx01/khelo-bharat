"use client";

import { Calendar, Clock, MapPin, Users, Plus } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const schedule = [
  { id: 1, title: "Morning Cricket Practice", time: "6:00 AM - 8:00 AM", location: "School Ground", athletes: 24, type: "Training", day: "Monday" },
  { id: 2, title: "Fitness Session", time: "8:00 AM - 9:00 AM", location: "Gym", athletes: 30, type: "Fitness", day: "Monday" },
  { id: 3, title: "Batting Drills", time: "4:00 PM - 6:00 PM", location: "Practice Nets", athletes: 12, type: "Training", day: "Tuesday" },
  { id: 4, title: "Team Meeting", time: "2:00 PM - 3:00 PM", location: "Conference Room", athletes: 0, type: "Meeting", day: "Wednesday" },
  { id: 5, title: "Inter-School Match", time: "10:00 AM - 2:00 PM", location: "City Stadium", athletes: 16, type: "Match", day: "Thursday" },
  { id: 6, title: "Recovery Session", time: "5:00 PM - 6:00 PM", location: "Pool", athletes: 8, type: "Recovery", day: "Friday" },
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function SchedulePage() {
  return (
    <div>
      <DashboardHeader title="Schedule" subtitle="Your training schedule" />

      <div className="flex justify-end mb-6">
        <Button className="bg-gradient-to-r from-green-500 to-green-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Event
        </Button>
      </div>

      <div className="space-y-6">
        {daysOfWeek.map((day) => {
          const daySchedule = schedule.filter((s) => s.day === day);
          if (daySchedule.length === 0) return null;
          return (
            <Card key={day}>
              <CardHeader>
                <CardTitle className="text-lg">{day}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {daySchedule.map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg border hover:shadow-md transition-shadow">
                      <div className="w-16 text-center">
                        <p className="text-xs text-gray-500">{event.time.split(" - ")[0]}</p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{event.title}</h4>
                          <Badge variant="secondary" className="text-xs">{event.type}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1"><Clock className="w-3 h-3" /><span>{event.time}</span></div>
                          <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /><span>{event.location}</span></div>
                          {event.athletes > 0 && <div className="flex items-center gap-1"><Users className="w-3 h-3" /><span>{event.athletes} athletes</span></div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
