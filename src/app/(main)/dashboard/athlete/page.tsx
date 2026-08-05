"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Trophy, Award, TrendingUp, Calendar, Target, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AthleteDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Athlete Dashboard"
          description="Track your progress and discover opportunities."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Tournaments"
            value="12"
            icon={Trophy}
            trend={{ value: 3, isPositive: true }}
          />
          <StatCard
            title="Achievements"
            value="8"
            icon={Award}
            trend={{ value: 2, isPositive: true }}
          />
          <StatCard
            title="Performance Score"
            value="85"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Ranking"
            value="#42"
            icon={Star}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Tournaments</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/tournaments">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "National Cricket Championship", date: "Mar 15, 2026", status: "UPCOMING" },
                  { name: "State Athletics Meet", date: "Apr 2, 2026", status: "REGISTRATION_OPEN" },
                  { name: "District Badminton Open", date: "Apr 20, 2026", status: "UPCOMING" },
                ].map((tournament, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {tournament.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                        <Calendar className="h-3 w-3" />
                        {tournament.date}
                      </div>
                    </div>
                    <Badge variant={tournament.status === "REGISTRATION_OPEN" ? "success" : "info"}>
                      {tournament.status.replace(/_/g, " ")}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Achievements</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/achievements">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "State Championship Winner", date: "Feb 2026", sport: "Cricket" },
                  { title: "Best Bowler Award", date: "Jan 2026", sport: "Cricket" },
                  { title: "District Level Runner-up", date: "Dec 2025", sport: "Cricket" },
                ].map((achievement, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {achievement.title}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {achievement.sport} • {achievement.date}
                      </p>
                    </div>
                    <Award className="h-4 w-4 text-yellow-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Matches Played", value: "24", change: "+3" },
                { label: "Win Rate", value: "72%", change: "+5%" },
                { label: "Avg. Score", value: "45.2", change: "+2.1" },
              ].map((stat, i) => (
                <div key={i} className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
                  <p className="mt-1 text-xs text-green-600">{stat.change} from last month</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
