import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Star, Trophy, Users } from "lucide-react";
import { requireCurrentUser } from "@/lib/auth";
import { coachService } from "@/services/coach.service";

export const dynamic = "force-dynamic";

export default async function CoachDashboardPage() {
  const user = await requireCurrentUser();
  const coach = await coachService.getDashboard(user.id).catch(() => null);

  return <DashboardLayout><div className="space-y-8">
    <PageHeader title="Coach Dashboard" description="Manage athlete relationships and scheduled training." />
    {!coach ? <EmptyState icon={Users} title="Complete your coach profile" description="Add your coaching information before managing athletes and sessions." action={{ label: "Complete profile", href: "/profile" }} /> : <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Assigned athletes" value={coach._count.athletes + coach._count.coachRelationships} icon={Users} />
        <StatCard title="Upcoming sessions" value={coach.trainingSessions.length} icon={Calendar} />
        <StatCard title="Active relationships" value={coach._count.coachRelationships} icon={Trophy} />
        <StatCard title="Rating" value={coach.rating > 0 ? coach.rating.toFixed(1) : "Not rated"} icon={Star} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card><CardHeader className="flex flex-row items-center justify-between"><CardTitle>My Athletes</CardTitle><Button variant="ghost" size="sm" asChild><Link href="/athletes">View all</Link></Button></CardHeader><CardContent className="space-y-3">{coach.athletes.length ? coach.athletes.map((athlete) => <div key={athlete.id} className="flex items-center justify-between"><div><p className="text-sm font-medium">{athlete.user.name}</p><p className="text-xs text-muted-foreground">{athlete.sportCategory}</p></div></div>) : <p className="text-center text-sm text-muted-foreground">No athletes are assigned yet.</p>}</CardContent></Card>
        <Card><CardHeader><CardTitle>Upcoming Sessions</CardTitle></CardHeader><CardContent className="space-y-3">{coach.trainingSessions.length ? coach.trainingSessions.map((session) => <div key={session.id} className="rounded-lg border border-border p-3"><p className="text-sm font-medium">{session.title}</p><p className="text-xs text-muted-foreground">{session.startsAt.toLocaleString("en-IN")} · {session._count.records} athlete{session._count.records === 1 ? "" : "s"}</p></div>) : <p className="text-center text-sm text-muted-foreground">No upcoming sessions.</p>}</CardContent></Card>
      </div>
    </>}
  </div></DashboardLayout>;
}
