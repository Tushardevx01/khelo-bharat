import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Users, Trophy, Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { userService } from "@/services/user.service";
import { schoolService } from "@/services/school.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function SchoolDashboardPage() {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await userService.getUserByClerkId(userId);

  let school: any = null;
  try {
    school = await schoolService.getSchoolByUserId(user.id);
  } catch (error) {}

  const athletes = school?.athletes || [];
  const facilities = school?.facilities || [];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="School Dashboard"
          description="Manage your school's sports programs and athletes."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Athletes" value={athletes.length} icon={Users} />
          <StatCard title="Active Tournaments" value="-" icon={Trophy} />
          <StatCard title="Achievements" value="-" icon={Award} />
          <StatCard title="Performance Score" value="-" icon={TrendingUp} />
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
                {athletes.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No athletes found</p>
                ) : (
                  athletes.slice(0, 3).map((athlete: any) => (
                    <div key={athlete.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={athlete.user.avatar || undefined} />
                          <AvatarFallback>{athlete.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {athlete.user.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{athlete.sportCategory}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-foreground">{athlete.points || 0} pts</span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sports Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              {facilities.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No facilities registered</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {facilities.map((facility: string) => (
                    <span
                      key={facility}
                      className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
