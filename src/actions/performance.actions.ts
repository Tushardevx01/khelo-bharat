"use server";

import { auth } from "@clerk/nextjs/server";
import { performanceService } from "@/services/performance.service";

export async function addPerformance(data: {
  athleteId: string;
  tournamentId?: string;
  sport: string;
  score?: string;
  rank?: number;
  stats?: Record<string, unknown>;
  notes?: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return performanceService.addPerformance(data);
}

export async function getAthletePerformances(athleteId: string, limit?: number) {
  return performanceService.getAthletePerformances(athleteId, limit);
}

export async function getAthleteStats(athleteId: string) {
  return performanceService.getAthleteStats(athleteId);
}
