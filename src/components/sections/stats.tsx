import { getPlatformStats } from "@/actions/system.actions";
import { StatsClient } from "./stats-client";

export async function StatsSection() {
  let statsData = {
    athletes: "0",
    schools: "0",
    tournaments: "0",
    states: "28",
  };

  try {
    statsData = await getPlatformStats();
  } catch (error) {
    console.error("Error fetching platform stats:", error);
  }

  const stats = [
    { label: "Active Athletes", value: statsData.athletes },
    { label: "Partner Schools", value: statsData.schools },
    { label: "Tournaments Hosted", value: statsData.tournaments },
    { label: "States Covered", value: statsData.states },
  ];

  return (
    <section className="bg-card py-10 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StatsClient stats={stats} />
      </div>
    </section>
  );
}
