"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Trophy, Award, TrendingUp, Calendar, Star } from "lucide-react";
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
                      <p className="text-sm font-bold text-foreground">
                        {tournament.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 text-primary" />
                        {tournament.date}
                      </div>
                    </div>
                    <Badge variant={tournament.status === "REGISTRATION_OPEN" ? "success" : "info"} className="border-0">
                      {tournament.status.replace(/_/g, " ")}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4 mb-4">
              <CardTitle>Recent Achievements</CardTitle>
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary">
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
                      <p className="text-sm font-bold text-foreground">
                        {achievement.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {achievement.sport} • {achievement.date}
                      </p>
                    </div>
                    <Award className="h-4 w-4 text-accent" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="border-b border-border pb-4 mb-4">
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: "Matches Played", value: "24", change: "+3" },
                { label: "Win Rate", value: "72%", change: "+5%" },
                { label: "Avg. Score", value: "45.2", change: "+2.1" },
              ].map((stat, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                  <p className="mt-2 text-xs font-medium text-green-600">{stat.change} from last month</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
