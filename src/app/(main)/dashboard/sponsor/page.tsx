"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Handshake, Users, TrendingUp, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SponsorDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Sponsor Dashboard"
          description="Manage your sponsorships and discover talent."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Active Sponsorships" value="8" icon={Handshake} trend={{ value: 2, isPositive: true }} />
          <StatCard title="Athletes Sponsored" value="15" icon={Users} trend={{ value: 3, isPositive: true }} />
          <StatCard title="Total Invested" value="₹25L" icon={TrendingUp} trend={{ value: 18, isPositive: true }} />
          <StatCard title="ROI Score" value="92" icon={BarChart3} trend={{ value: 5, isPositive: true }} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Active Sponsorships</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sponsor-marketplace">Browse Talent</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { athlete: "Aarav Singh", sport: "Cricket", amount: "₹5L", status: "ACTIVE" },
                  { athlete: "Diya Patel", sport: "Badminton", amount: "₹3L", status: "ACTIVE" },
                  { athlete: "Rohan Kumar", sport: "Football", amount: "₹2L", status: "PENDING" },
                ].map((sponsorship, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                        <span className="text-sm font-medium">{sponsorship.athlete.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">
                          {sponsorship.athlete}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{sponsorship.sport}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-neutral-900 dark:text-white">{sponsorship.amount}</p>
                      <Badge variant={sponsorship.status === "ACTIVE" ? "success" : "warning"} className="text-xs">
                        {sponsorship.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "Total Budget", value: "₹50L" },
                  { label: "Spent", value: "₹25L" },
                  { label: "Remaining", value: "₹25L" },
                  { label: "Avg. per Athlete", value: "₹1.67L" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">{item.label}</span>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">{item.value}</span>
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
