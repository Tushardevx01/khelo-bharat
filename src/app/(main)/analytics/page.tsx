"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Target, Award } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Analytics"
          description="Track your performance and progress over time."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Matches", value: "24", icon: BarChart3, change: "+3" },
            { label: "Win Rate", value: "72%", icon: TrendingUp, change: "+5%" },
            { label: "Avg. Score", value: "45.2", icon: Target, change: "+2.1" },
            { label: "Achievements", value: "8", icon: Award, change: "+2" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <stat.icon className="h-5 w-5 text-neutral-500" />
                  <span className="text-xs text-green-600">{stat.change}</span>
                </div>
                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-neutral-500">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-neutral-500">
                  <p>Performance chart will be displayed here using Recharts.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="performance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-neutral-500">
                  <p>Performance trends will be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tournaments" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tournament History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-neutral-500">
                  <p>Tournament history will be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
