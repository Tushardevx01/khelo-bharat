"use server";

import { auth } from "@clerk/nextjs/server";
import { sponsorshipService } from "@/services/sponsorship.service";

export async function createSponsorship(data: {
  athleteId?: string;
  schoolId?: string;
  tournamentId?: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  terms?: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);

  return sponsorshipService.createSponsorship({
    ...data,
    sponsorId: user.id,
  });
}

export async function getActiveSponsorships() {
  return sponsorshipService.getActiveSponsorships();
}

export async function getSponsorSponsorships() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);

  const { sponsorService } = await import("@/services/sponsor.service");
  const sponsor = await sponsorService.getSponsorByUserId(user.id);

  return sponsorshipService.getSponsorSponsorships(sponsor.id);
}

async function verifySponsorshipOwnership(sponsorshipId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);
  
  if (user.role === "SUPER_ADMIN") return;

  const { sponsorService } = await import("@/services/sponsor.service");
  const sponsor = await sponsorService.getSponsorByUserId(user.id);

  const sponsorship = await sponsorshipService.getSponsorshipById(sponsorshipId);
  if (sponsorship.sponsorId !== sponsor.id) {
    throw new Error("Forbidden: You do not have permission to modify this sponsorship");
  }
}

export async function updateSponsorshipStatus(id: string, status: string) {
  await verifySponsorshipOwnership(id);
  return sponsorshipService.updateStatus(id, status as never);
}
