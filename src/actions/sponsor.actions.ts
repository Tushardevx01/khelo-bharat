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

async function verifySponsorOwnership(sponsorId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);
  
  if (user.role === "SUPER_ADMIN") return;

  const sponsor = await sponsorService.getSponsorById(sponsorId);
  if (sponsor.userId !== user.id) {
    throw new Error("Forbidden: You do not have permission to modify this sponsor profile");
  }
}

export async function updateSponsorProfile(id: string, data: Record<string, unknown>) {
  await verifySponsorOwnership(id);
  return sponsorService.updateSponsorProfile(id, data);
}

export async function getAllSponsors(page: number = 1, limit: number = 10, search?: string) {
  return sponsorService.getAllSponsors({ page, limit, search });
}

export async function getVerifiedSponsors(limit?: number) {
  return sponsorService.getVerifiedSponsors(limit);
}
