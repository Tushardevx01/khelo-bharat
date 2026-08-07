"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, CheckCircle, Clock, Plus } from "lucide-react";

export default function AchievementsPage() {
  const achievements = [
    { id: "1", title: "State Championship Winner", sport: "Cricket", date: "Feb 2026", verified: true },
    { id: "2", title: "Best Bowler Award", sport: "Cricket", date: "Jan 2026", verified: true },
    { id: "3", title: "District Level Runner-up", sport: "Cricket", date: "Dec 2025", verified: false },
    { id: "4", title: "School Sports Day Champion", sport: "Athletics", date: "Nov 2025", verified: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <PageHeader
            title="Achievements"
            description="Showcase your accomplishments."
          />
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Achievement
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
                    <Award className="h-6 w-6 text-yellow-500" />
                  </div>
                  {achievement.verified ? (
                    <Badge variant="success" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="warning" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Pending
                    </Badge>
                  )}
                </div>
                <h3 className="mt-4 font-semibold text-neutral-900 dark:text-white">
                  {achievement.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {achievement.sport} • {achievement.date}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
