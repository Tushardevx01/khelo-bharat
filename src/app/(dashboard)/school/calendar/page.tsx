"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, Plus } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const events = [
  { id: 1, title: "Cricket Practice", date: "2024-06-15", time: "4:00 PM - 6:00 PM", location: "School Ground", type: "Training" },
  { id: 2, title: "Inter-School Football Match", date: "2024-06-18", time: "10:00 AM - 12:00 PM", location: "City Stadium", type: "Match" },
  { id: 3, title: "Annual Sports Day", date: "2024-06-25", time: "9:00 AM - 5:00 PM", location: "School Campus", type: "Event" },
  { id: 4, title: "Basketball Training", date: "2024-06-16", time: "3:00 PM - 5:00 PM", location: "Indoor Court", type: "Training" },
  { id: 5, title: "Coach Meeting", date: "2024-06-20", time: "2:00 PM - 3:00 PM", location: "Conference Room", type: "Meeting" },
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

export default function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState(15);

  return (
    <div>
      <DashboardHeader title="Calendar" subtitle="School event calendar" />

      <div className="flex justify-end mb-6">
        <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>June 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {days.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    day === selectedDay
                      ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-900"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="p-3 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <Badge variant="secondary" className="text-xs">{event.type}</Badge>
                  </div>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex items-center gap-2"><CalendarIcon className="w-3 h-3" /><span>{event.date}</span></div>
                    <div className="flex items-center gap-2"><Clock className="w-3 h-3" /><span>{event.time}</span></div>
                    <div className="flex items-center gap-2"><MapPin className="w-3 h-3" /><span>{event.location}</span></div>
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
