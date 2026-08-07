"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Users, Trophy, TrendingUp, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function CoachDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Coach Dashboard"
          description="Manage your athletes and track their progress."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="My Athletes" value="24" icon={Users} trend={{ value: 4, isPositive: true }} />
          <StatCard title="Active Programs" value="6" icon={Trophy} />
          <StatCard title="Performance Score" value="82" icon={TrendingUp} trend={{ value: 7, isPositive: true }} />
          <StatCard title="Rating" value="4.8" icon={Star} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Athletes</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/athletes">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Aarav Singh", sport: "Cricket", progress: 85 },
                  { name: "Diya Patel", sport: "Badminton", progress: 78 },
                  { name: "Rohan Kumar", sport: "Football", progress: 72 },
                  { name: "Ananya Reddy", sport: "Athletics", progress: 90 },
                ].map((athlete, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                        <span className="text-sm font-medium">{athlete.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">
                          {athlete.name}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{athlete.sport}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-neutral-900 dark:text-white">{athlete.progress}%</p>
                      <div className="mt-1 h-1.5 w-16 rounded-full bg-neutral-100 dark:bg-neutral-800">
                        <div
                          className="h-full rounded-full bg-neutral-900 dark:bg-white"
                          style={{ width: `${athlete.progress}%` }}
                        />
                      </div>
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
              <div className="space-y-4">
                {[
                  { title: "Cricket Practice", time: "Today, 4:00 PM", athletes: 12 },
                  { title: "Fitness Training", time: "Tomorrow, 6:00 AM", athletes: 24 },
                  { title: "Strategy Meeting", time: "Wed, 10:00 AM", athletes: 8 },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">{session.title}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">{session.time}</p>
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {session.athletes} athletes
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
