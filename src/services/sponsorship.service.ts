import { sponsorshipRepository } from "@/repositories/sponsorship.repository";
import { SponsorStatus } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";

export class SponsorshipService {
  async getSponsorshipById(id: string) {
    const sponsorship = await sponsorshipRepository.findById(id);
    if (!sponsorship) throw new NotFoundError("Sponsorship");
    return sponsorship;
  }

  async createSponsorship(data: {
    sponsorId: string;
    athleteId?: string;
    schoolId?: string;
    tournamentId?: string;
    amount: number;
    startDate: Date;
    endDate: Date;
    terms?: string;
    logo?: string;
  }) {
    return sponsorshipRepository.create({
      ...data,
      status: "PENDING",
    });
  }

  async updateStatus(id: string, status: SponsorStatus) {
    return sponsorshipRepository.updateStatus(id, status);
  }

  async getSponsorSponsorships(sponsorId: string) {
    return sponsorshipRepository.findBySponsor(sponsorId);
  }

  async getActiveSponsorships() {
    return sponsorshipRepository.findActive();
  }
}

export const sponsorshipService = new SponsorshipService();
