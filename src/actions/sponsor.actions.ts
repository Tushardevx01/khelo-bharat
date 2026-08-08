"use server";

import { sponsorService } from "@/services/sponsor.service";
import { ForbiddenError } from "@/lib/errors";
import { requireCurrentUser, requireRole } from "@/lib/auth";
import { createSponsorSchema } from "@/schemas/profile.schema";

export async function getSponsorProfile() {
  const user = await requireCurrentUser();
  return sponsorService.getSponsorByUserId(user.id);
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
  const user = await requireRole("SPONSOR");
  return sponsorService.createSponsorProfile(user.id, createSponsorSchema.parse(data));
}

async function verifySponsorOwnership(sponsorId: string) {
  const user = await requireCurrentUser();
  
  if (user.role === "SUPER_ADMIN") return user;

  const sponsor = await sponsorService.getSponsorById(sponsorId);
  if (sponsor.userId !== user.id) {
    throw new ForbiddenError("You do not have permission to modify this sponsor profile");
  }
  return user;
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
