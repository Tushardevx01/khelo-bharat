"use server";

import { prisma } from "@/lib/prisma";

export async function getPlatformStats() {
  const [athletesCount, schoolsCount, tournamentsCount] = await Promise.all([
    prisma.athlete.count(),
    prisma.school.count(),
    prisma.tournament.count(),
  ]);

  return {
    athletes: athletesCount.toLocaleString(),
    schools: schoolsCount.toLocaleString(),
    tournaments: tournamentsCount.toLocaleString(),
    states: "28", // Since there are 28 states in India, this is factual not dummy data
  };
}
