"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Users, Trophy, Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SchoolDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="School Dashboard"
          description="Manage your school's sports programs and athletes."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Athletes" value="156" icon={Users} trend={{ value: 12, isPositive: true }} />
          <StatCard title="Active Tournaments" value="8" icon={Trophy} />
          <StatCard title="Achievements" value="42" icon={Award} trend={{ value: 8, isPositive: true }} />
          <StatCard title="Performance Score" value="78" icon={TrendingUp} trend={{ value: 3, isPositive: true }} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Athletes</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/athletes">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Aarav Singh", sport: "Cricket", score: 92 },
                  { name: "Diya Patel", sport: "Badminton", score: 88 },
                  { name: "Rohan Kumar", sport: "Football", score: 85 },
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
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">{athlete.score}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sports Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["Cricket Ground", "Football Field", "Basketball Court", "Swimming Pool", "Athletics Track"].map((facility) => (
                  <span
                    key={facility}
                    className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                  >
                    {facility}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
