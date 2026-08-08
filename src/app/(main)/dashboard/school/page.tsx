import Link from "next/link";
import { Award, School, Trophy, Users } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireCurrentUser } from "@/lib/auth";
import { schoolService } from "@/services/school.service";

export const dynamic = "force-dynamic";

export default async function SchoolDashboardPage() {
  const user = await requireCurrentUser();
  const school = await schoolService.getSchoolByUserId(user.id).catch(() => null);
  return <DashboardLayout><div className="space-y-8">
    <PageHeader title="School Dashboard" description="Manage your institution's sports community from real records." />
    {!school ? <EmptyState icon={School} title="Complete your institution profile" description="Add your school information to start managing athletes and sports activities." action={{ label: "Complete profile", href: "/profile" }} /> : <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Athletes" value={school.athletes.length} icon={Users} />
        <StatCard title="Sports facilities" value={school.sportsFacilities.length} icon={Trophy} />
        <StatCard title="Verified athletes" value={school.athletes.filter((athlete) => athlete.user.isVerified).length} icon={Award} />
        <StatCard title="Institution rating" value={school.rating > 0 ? school.rating.toFixed(1) : "Not rated"} icon={School} />
      </div>
      <div className="grid gap-4 md:grid-cols-2"><Card><CardHeader className="flex flex-row items-center justify-between"><CardTitle>Recent Athletes</CardTitle><Button variant="ghost" size="sm" asChild><Link href="/athletes">View all</Link></Button></CardHeader><CardContent className="space-y-4">{school.athletes.length ? school.athletes.slice(0, 3).map((athlete) => <div key={athlete.id} className="flex items-center justify-between"><div><p className="text-sm font-medium">{athlete.user.name}</p><p className="text-xs text-muted-foreground">{athlete.sportCategory}</p></div></div>) : <p className="py-4 text-center text-sm text-muted-foreground">No athletes are connected to this institution.</p>}</CardContent></Card><Card><CardHeader><CardTitle>Sports Facilities</CardTitle></CardHeader><CardContent>{school.sportsFacilities.length ? <div className="flex flex-wrap gap-2">{school.sportsFacilities.map((facility) => <span key={facility} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">{facility}</span>)}</div> : <p className="py-4 text-center text-sm text-muted-foreground">No facilities registered.</p>}</CardContent></Card></div>
    </>}
  </div></DashboardLayout>;
}
