"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Users, Trophy, School, Handshake, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/actions/user.actions";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<{
    totalAthletes: number;
    totalSchools: number;
    totalCoaches: number;
    totalSponsors: number;
  } | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    }
    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Admin Dashboard"
          description="Overview of your platform metrics and activity."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Athletes"
            value={stats?.totalAthletes || 0}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Schools"
            value={stats?.totalSchools || 0}
            icon={School}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Total Coaches"
            value={stats?.totalCoaches || 0}
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Total Sponsors"
            value={stats?.totalSponsors || 0}
            icon={Handshake}
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "New athlete registered", time: "2 minutes ago", icon: Users },
                  { action: "Tournament created", time: "15 minutes ago", icon: Trophy },
                  { action: "New school joined", time: "1 hour ago", icon: School },
                  { action: "Sponsor partnership", time: "3 hours ago", icon: Handshake },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
                      <activity.icon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "System Uptime", value: "99.9%", status: "healthy" },
                  { label: "Active Users", value: "1,234", status: "healthy" },
                  { label: "API Response Time", value: "45ms", status: "healthy" },
                  { label: "Database Status", value: "Connected", status: "healthy" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">{item.value}</span>
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
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
