"use client";

import { Plus, Calendar, Users, Clock } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const programs = [
  { id: 1, name: "Cricket Basics", sport: "Cricket", duration: "6 weeks", athletes: 24, schedule: "Mon, Wed, Fri", status: "Active" },
  { id: 2, name: "Advanced Batting", sport: "Cricket", duration: "4 weeks", athletes: 12, schedule: "Tue, Thu", status: "Active" },
  { id: 3, name: "Fitness Training", sport: "General", duration: "8 weeks", athletes: 30, schedule: "Daily", status: "Active" },
  { id: 4, name: "Speed & Agility", sport: "General", duration: "6 weeks", athletes: 20, schedule: "Mon, Wed", status: "Completed" },
  { id: 5, name: "Tennis Fundamentals", sport: "Tennis", duration: "10 weeks", athletes: 15, schedule: "Tue, Thu, Sat", status: "Active" },
  { id: 6, name: "Recovery Program", sport: "General", duration: "2 weeks", athletes: 8, schedule: "Daily", status: "Upcoming" },
];

export default function TrainingPage() {
  return (
    <div>
      <DashboardHeader title="Training Programs" subtitle="Manage training schedules" />

      <div className="flex justify-end mb-6">
        <Button className="bg-gradient-to-r from-green-500 to-green-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Create Program
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <Card key={program.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary">{program.sport}</Badge>
                <Badge variant={program.status === "Active" ? "default" : program.status === "Completed" ? "outline" : "secondary"}>
                  {program.status}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg mb-3">{program.name}</h3>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{program.duration}</span></div>
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{program.schedule}</span></div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>{program.athletes} athletes</span></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
