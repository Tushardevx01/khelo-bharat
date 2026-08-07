import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Trophy, Award, TrendingUp, Calendar, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAthleteAchievements } from "@/actions/achievement.actions";
import { getAllTournaments } from "@/actions/tournament.actions";
import { auth } from "@clerk/nextjs/server";
import { userService } from "@/services/user.service";

export default async function AthleteDashboardPage() {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await userService.getUserByClerkId(userId);

  let achievements: any[] = [];
  try {
    achievements = await getAthleteAchievements(user.id);
  } catch (error) {}

  let tournaments: any[] = [];
  try {
    const res = await getAllTournaments(1, 3);
    tournaments = res.data || [];
  } catch (error) {}

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Athlete Dashboard"
          description="Track your progress and discover opportunities."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Tournaments"
            value="-"
            icon={Trophy}
          />
          <StatCard
            title="Achievements"
            value={achievements.length}
            icon={Award}
          />
          <StatCard
            title="Performance Score"
            value="-"
            icon={TrendingUp}
          />
          <StatCard
            title="Ranking"
            value="-"
            icon={Star}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Tournaments</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/tournaments">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tournaments.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No upcoming tournaments</p>
                ) : (
                  tournaments.map((tournament) => (
                    <div key={tournament.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-foreground line-clamp-1">
                          {tournament.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3 text-primary" />
                          {new Date(tournament.startDate).toLocaleDateString("en-IN")}
                        </div>
                      </div>
                      <Badge variant={tournament.status === "REGISTRATION_OPEN" ? "success" : "info"} className="border-0">
                        {tournament.status.replace(/_/g, " ")}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4 mb-4">
              <CardTitle>Recent Achievements</CardTitle>
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary">
                <Link href="/achievements">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No recent achievements</p>
                ) : (
                  achievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-foreground line-clamp-1">
                          {achievement.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(achievement.date).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                      <Award className="h-4 w-4 text-accent" />
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
