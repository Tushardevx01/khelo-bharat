import { athleteRepository } from "@/repositories/athlete.repository";
import { SportCategory } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
import { PaginationInput } from "@/lib/validators";

export class AthleteService {
  async getAthleteByUserId(userId: string) {
    const athlete = await athleteRepository.findByUserId(userId);
    if (!athlete) throw new NotFoundError("Athlete profile");
    return athlete;
  }

  async getAthleteById(id: string) {
    const athlete = await athleteRepository.findById(id);
    if (!athlete) throw new NotFoundError("Athlete");
    return athlete;
  }

  async createAthleteProfile(userId: string, data: {
    sportCategory: SportCategory;
    schoolId?: string;
    coachId?: string;
    height?: number;
    weight?: number;
    experience?: string;
  }) {
    return athleteRepository.create({
      userId,
      ...data,
    });
  }

  async updateAthleteProfile(id: string, data: {
    sportCategory?: SportCategory;
    height?: number;
    weight?: number;
    experience?: string;
  }) {
    return athleteRepository.update(id, data);
  }

  async getAllAthletes(pagination: PaginationInput, sportCategory?: SportCategory) {
    return athleteRepository.findAll(pagination, sportCategory);
  }

  async getFeaturedAthletes(limit?: number) {
    return athleteRepository.getFeatured(limit);
  }

  async updateRanking(id: string, ranking: number) {
    return athleteRepository.updateRanking(id, ranking);
  }
}

export const athleteService = new AthleteService();
