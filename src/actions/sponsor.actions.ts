"use server";

import { auth } from "@clerk/nextjs/server";
import { sponsorService } from "@/services/sponsor.service";

export async function getSponsorProfile() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return sponsorService.getSponsorByUserId(userId);
}

export async function getSponsorById(id: string) {
  return sponsorService.getSponsorById(id);
}

export async function createSponsorProfile(data: {
  companyName: string;
  companyType?: string;
  industry?: string;
  budget?: number;
  website?: string;
  logo?: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return sponsorService.createSponsorProfile(userId, data);
}

export async function updateSponsorProfile(id: string, data: Record<string, unknown>) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return sponsorService.updateSponsorProfile(id, data);
}

export async function getAllSponsors(page: number = 1, limit: number = 10) {
  return sponsorService.getAllSponsors({ page, limit });
}

export async function getVerifiedSponsors(limit?: number) {
  return sponsorService.getVerifiedSponsors(limit);
}
