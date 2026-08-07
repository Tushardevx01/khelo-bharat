import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Handshake, Users, TrendingUp, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSponsorSponsorships } from "@/actions/sponsorship.actions";

export const dynamic = "force-dynamic";

export default async function SponsorDashboardPage() {
  let sponsorships: any[] = [];
  try {
    sponsorships = await getSponsorSponsorships();
  } catch (error) {}

  const activeSponsorships = sponsorships.filter(s => s.status === "ACTIVE");
  const totalAmount = sponsorships.reduce((sum, s) => sum + s.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Sponsor Dashboard"
          description="Manage your sponsorships and discover talent."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Active Sponsorships" value={activeSponsorships.length} icon={Handshake} />
          <StatCard title="Athletes Sponsored" value={sponsorships.filter(s => s.athleteId).length} icon={Users} />
          <StatCard title="Total Invested" value={`₹${(totalAmount / 100000).toFixed(2)}L`} icon={TrendingUp} />
          <StatCard title="ROI Score" value="-" icon={BarChart3} />
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
                {activeSponsorships.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No active sponsorships</p>
                ) : (
                  activeSponsorships.slice(0, 3).map((sponsorship, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                          <span className="text-sm font-medium">
                            {sponsorship.athlete?.user?.name.charAt(0) || "T"}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-900 dark:text-white">
                            {sponsorship.athlete?.user?.name || "Tournament/School"}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {sponsorship.athlete?.sportCategory || ""}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-neutral-900 dark:text-white">
                          ₹{(sponsorship.amount / 100000).toFixed(2)}L
                        </p>
                        <Badge variant="success" className="text-xs">
                          {sponsorship.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
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
                  { label: "Total Budget", value: "-" },
                  { label: "Spent", value: `₹${(totalAmount / 100000).toFixed(2)}L` },
                  { label: "Remaining", value: "-" },
                  { label: "Avg. per Sponsorship", value: sponsorships.length ? `₹${((totalAmount / sponsorships.length) / 100000).toFixed(2)}L` : "₹0L" },
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
