import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, CheckCircle, Clock, Plus, Trophy } from "lucide-react";
import Link from "next/link";
import { getAthleteProfile } from "@/actions/athlete.actions";
import { getAthleteAchievements } from "@/actions/achievement.actions";

export default async function AchievementsPage() {
  let athlete = null;
  let achievements: any[] = [];
  
  try {
    athlete = await getAthleteProfile();
    if (athlete) {
      achievements = await getAthleteAchievements(athlete.id);
    }
  } catch (error) {
    // User might not be an athlete, or not registered yet
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <PageHeader
            title="Achievements"
            description="Showcase your accomplishments."
          />
          {athlete && (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Achievement
            </Button>
          )}
        </div>

        {!athlete ? (
          <div className="mt-12 flex flex-col items-center justify-center text-center p-8 border border-dashed border-border rounded-xl bg-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Athlete Profile Required</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              You need to complete your athlete profile to start adding achievements.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/settings">Complete Profile</Link>
            </Button>
          </div>
        ) : achievements.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center text-center p-8 border border-dashed border-border rounded-xl bg-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No achievements yet</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              Add your sports achievements here to showcase them to sponsors and scouts.
            </p>
            <Button className="mt-6">
              <Plus className="mr-2 h-4 w-4" />
              Add First Achievement
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="transition-all hover:shadow-lg bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    {achievement.isVerified ? (
                      <Badge variant="success" className="flex items-center gap-1 border-0">
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="warning" className="flex items-center gap-1 border-0">
                        <Clock className="h-3 w-3" />
                        Pending
                      </Badge>
                    )}
                  </div>
                  <h3 className="mt-4 font-bold text-foreground line-clamp-1">
                    {achievement.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground font-medium">
                    {achievement.sport} • {achievement.date ? new Date(achievement.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'Unknown Date'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
