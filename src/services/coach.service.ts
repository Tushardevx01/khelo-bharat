import { coachRepository } from "@/repositories/coach.repository";
import { SportCategory } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
import { PaginationInput } from "@/lib/validators";

export class CoachService {
  async getCoachByUserId(userId: string) {
    const coach = await coachRepository.findByUserId(userId);
    if (!coach) throw new NotFoundError("Coach profile");
    return coach;
  }

  async getCoachById(id: string) {
    const coach = await coachRepository.findById(id);
    if (!coach) throw new NotFoundError("Coach");
    return coach;
  }

  async getDashboard(userId: string) {
    const coach = await coachRepository.findDashboardByUserId(userId);
    if (!coach) throw new NotFoundError("Coach profile");
    return coach;
  }

  async createCoachProfile(userId: string, data: {
    sportCategory: SportCategory;
    specialization?: string;
    certifications?: string[];
    experience?: number;
    hourlyRate?: number;
  }) {
    return coachRepository.create({ user: { connect: { id: userId } }, ...data });
  }

  async updateCoachProfile(id: string, data: Record<string, unknown>) {
    return coachRepository.update(id, data);
  }

  async getAllCoaches(pagination: PaginationInput, sportCategory?: SportCategory) {
    return coachRepository.findAll(pagination, sportCategory);
  }

  async getAvailableCoaches(sportCategory?: SportCategory) {
    return coachRepository.getAvailable(sportCategory);
  }
}

export const coachService = new CoachService();
