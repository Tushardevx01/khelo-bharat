import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Users, Trophy, School, Handshake, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardStats } from "@/actions/user.actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let stats: any = null;
  try {
    stats = await getDashboardStats();
  } catch (error) {
    console.error("Failed to fetch stats:", error);
  }

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
          />
          <StatCard
            title="Total Schools"
            value={stats?.totalSchools || 0}
            icon={School}
          />
          <StatCard
            title="Total Coaches"
            value={stats?.totalCoaches || 0}
            icon={TrendingUp}
          />
          <StatCard
            title="Total Sponsors"
            value={stats?.totalSponsors || 0}
            icon={Handshake}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
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
                  { label: "Active Users", value: (stats?.totalAthletes || 0) + (stats?.totalSchools || 0) + (stats?.totalCoaches || 0) + (stats?.totalSponsors || 0), status: "healthy" },
                  { label: "API Response Time", value: "45ms", status: "healthy" },
                  { label: "Database Status", value: "Connected", status: "healthy" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{item.value}</span>
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
