import Link from "next/link";
import { Trophy, Award, TrendingUp, Calendar, Star } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { requireCurrentUser } from "@/lib/auth";
import { athleteService } from "@/services/athlete.service";
import { performanceService } from "@/services/performance.service";
import { tournamentService } from "@/services/tournament.service";

export const dynamic = "force-dynamic";

export default async function AthleteDashboardPage() {
  const user = await requireCurrentUser();
  const athlete = await athleteService.getAthleteByUserId(user.id).catch(() => null);
  const [stats, tournaments] = athlete ? await Promise.all([
    performanceService.getAthleteStats(athlete.id), tournamentService.getUpcomingTournaments(3),
  ]) : [null, []] as const;

  return <DashboardLayout><div className="space-y-8">
    <PageHeader title="Athlete Dashboard" description="Track recorded results and discover live tournament opportunities." />
    {!athlete || !stats ? <EmptyState icon={Trophy} title="Complete your athlete profile" description="Add your primary sport before registering for tournaments or recording results." action={{ label: "Complete profile", href: "/profile" }} /> : <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Recorded results" value={stats.totalCompetitions} icon={Trophy} />
        <StatCard title="Achievements" value={athlete.achievements.length} icon={Award} />
        <StatCard title="Wins" value={stats.wins} icon={TrendingUp} />
        <StatCard title="Ranking" value={athlete.ranking ? `#${athlete.ranking}` : "Not ranked"} icon={Star} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Registrations</CardTitle>
            <Button variant="ghost" size="sm" asChild><Link href="/tournaments">Find More</Link></Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {athlete.registrations?.length ? athlete.registrations.map((reg: any) => (
              <div key={reg.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">{reg.tournament.title}</p>
                  <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 text-primary" />{reg.tournament.startDate.toLocaleDateString("en-IN")}
                  </p>
                </div>
                <Badge variant={reg.status === "CONFIRMED" ? "success" : "info"} className="border-0">{reg.status}</Badge>
              </div>
            )) : <p className="py-4 text-center text-sm text-muted-foreground">Not registered for any tournaments.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Achievements</CardTitle>
            <Button variant="ghost" size="sm" asChild><Link href="/achievements">View all</Link></Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {athlete.achievements?.length ? athlete.achievements.slice(0, 3).map((achievement) => (
              <div key={achievement.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">{achievement.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{achievement.date?.toLocaleDateString("en-IN") ?? "Date not recorded"}</p>
                </div>
                <Award className="h-4 w-4 text-accent" />
              </div>
            )) : <p className="py-4 text-center text-sm text-muted-foreground">No achievements yet.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Sponsorship Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {athlete.sponsorshipRequests?.length ? athlete.sponsorshipRequests.map((req: any) => (
              <div key={req.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">{req.sponsor.companyName}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Status: {req.status}</p>
                </div>
              </div>
            )) : <p className="py-4 text-center text-sm text-muted-foreground">No sponsorship requests.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Coaches</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {athlete.coachRelationships?.length ? athlete.coachRelationships.map((rel: any) => (
              <div key={rel.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">{rel.coach.user.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Status: {rel.status}</p>
                </div>
              </div>
            )) : <p className="py-4 text-center text-sm text-muted-foreground">No coaches added.</p>}
          </CardContent>
        </Card>
      </div>
    </>}
  </div></DashboardLayout>;
}
