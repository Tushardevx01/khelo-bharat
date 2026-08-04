/* eslint-disable */
import { redirect } from "next/navigation";
import { Trophy, Medal, Award, Calendar, BarChart3, Target } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import StatsCard from "@/components/shared/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardAction } from "@/features/athletes/actions/athlete.actions";

export default async function AthleteOverview() {
  const result = await getDashboardAction();

  if (!result.success && result.error === "Athlete profile not found") {
    redirect("/athlete/setup");
  }

  if (!result.success || !result.data) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load dashboard data. Please try again later.
      </div>
    );
  }

  const { profile, upcomingEvents } = result.data;
  
  // Safe defaults if there are no achievements or performance records yet
  const achievementsCount = profile.achievementsCount || 0;
  const certificatesCount = profile.certificatesCount || 0;
  const rank = profile.ranking || "Unranked";
  const name = profile.user?.name || "Athlete";

  const stats = [
    { title: "My Sports", value: profile.sports?.split(",").length.toString() || "0", icon: Trophy },
    { title: "Achievements", value: achievementsCount.toString(), icon: Medal },
    { title: "Tournaments", value: upcomingEvents.length.toString(), icon: Calendar },
    { title: "Performance", value: "N/A", icon: BarChart3 }, // Compute from performanceRecords in the future
    { title: "Certificates", value: certificatesCount.toString(), icon: Award },
    { title: "Rank", value: rank.toString(), icon: Target, color: "from-[#FF6B35] to-[#D72638]" },
  ];

  return (
    <div>
      <DashboardHeader title="Athlete Dashboard" subtitle={`Welcome back, ${name}`} notificationCount={0} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} color={stat.color || "from-[#FF6B35] to-[#D72638]"} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-xl text-gray-400">
               No performance data available yet.
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length === 0 ? (
              <div className="p-6 text-center text-gray-500 border-2 border-dashed rounded-xl">
                No upcoming events registered.
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map((event: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center text-white text-sm font-bold">
                      T
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{event.tournament?.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(event.tournament?.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
