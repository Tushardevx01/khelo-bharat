import { getPlatformStats } from "@/actions/system.actions";
import { StatsClient } from "./stats-client";

export async function StatsSection() {
  let statsData: Awaited<ReturnType<typeof getPlatformStats>> | null = null;

  try {
    statsData = await getPlatformStats();
  } catch {
    statsData = null;
  }

  if (!statsData) return null;

  const stats = [
    { label: "Active Athletes", value: statsData.athletes.toLocaleString("en-IN") },
    { label: "Partner Schools", value: statsData.schools.toLocaleString("en-IN") },
    { label: "Tournaments Hosted", value: statsData.tournaments.toLocaleString("en-IN") },
    { label: "States Covered", value: statsData.states.toLocaleString("en-IN") },
  ];

  return (
    <section className="bg-card py-10 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StatsClient stats={stats} />
      </div>
    </section>
  );
}
