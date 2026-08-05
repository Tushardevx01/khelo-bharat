import { sponsorRepository } from "@/repositories/sponsor.repository";
import { NotFoundError } from "@/lib/errors";
import { PaginationInput } from "@/lib/validators";

export class SponsorService {
  async getSponsorByUserId(userId: string) {
    const sponsor = await sponsorRepository.findByUserId(userId);
    if (!sponsor) throw new NotFoundError("Sponsor profile");
    return sponsor;
  }

  async getSponsorById(id: string) {
    const sponsor = await sponsorRepository.findById(id);
    if (!sponsor) throw new NotFoundError("Sponsor");
    return sponsor;
  }

  async createSponsorProfile(userId: string, data: {
    companyName: string;
    companyType?: string;
    industry?: string;
    budget?: number;
    website?: string;
    logo?: string;
  }) {
    return sponsorRepository.create({ userId, ...data });
  }

  async updateSponsorProfile(id: string, data: Record<string, unknown>) {
    return sponsorRepository.update(id, data);
  }

  async getAllSponsors(pagination: PaginationInput) {
    return sponsorRepository.findAll(pagination);
  }

  async getVerifiedSponsors(limit?: number) {
    return sponsorRepository.getVerified(limit);
  }
}

export const sponsorService = new SponsorService();
