import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/shared/stat-card";
import { BarChart3, TrendingUp, Target, Trophy } from "lucide-react";
import { requireCurrentUser } from "@/lib/auth";
import { athleteService } from "@/services/athlete.service";
import { performanceService } from "@/services/performance.service";
import { EmptyState } from "@/components/shared/empty-state";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const user = await requireCurrentUser();
  const athlete = user.role === "ATHLETE"
    ? await athleteService.getAthleteByUserId(user.id).catch(() => null)
    : null;
  const stats = athlete ? await performanceService.getAthleteStats(athlete.id) : null;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader title="Analytics" description="Performance insights calculated from your recorded results." />

        {!athlete || !stats || stats.totalCompetitions === 0 ? (
          <EmptyState
            icon={BarChart3}
            title="No analytics available yet"
            description="Record performance results to see competition, ranking, and score insights here."
          />
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard title="Recorded results" value={stats.totalCompetitions} icon={BarChart3} />
              <StatCard title="Wins" value={stats.wins} icon={Trophy} />
              <StatCard title="Average rank" value={stats.averageRank?.toFixed(1) ?? "—"} icon={TrendingUp} />
              <StatCard title="Average score" value={stats.averageScore?.toFixed(1) ?? "—"} icon={Target} />
            </div>

            <Card>
              <CardHeader><CardTitle>Recent performance</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {stats.recentForm.map((performance) => (
                  <div key={`${performance.date.toISOString()}-${performance.tournament ?? "record"}`} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium">{performance.tournament ?? "Independent performance record"}</p>
                      <p className="text-xs text-muted-foreground">{performance.date.toLocaleDateString("en-IN")}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {performance.rank ? `Rank #${performance.rank}` : "Rank not recorded"}
                      {performance.score !== null ? ` · Score ${performance.score}` : ""}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
