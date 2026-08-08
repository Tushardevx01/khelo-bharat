import { schoolRepository } from "@/repositories/school.repository";
import { NotFoundError } from "@/lib/errors";
import { PaginationInput } from "@/lib/validators";

export class SchoolService {
  async getSchoolByUserId(userId: string) {
    const school = await schoolRepository.findByUserId(userId);
    if (!school) throw new NotFoundError("School profile");
    return school;
  }

  async getSchoolById(id: string) {
    const school = await schoolRepository.findById(id);
    if (!school) throw new NotFoundError("School");
    return school;
  }

  async createSchoolProfile(userId: string, data: {
    schoolName: string;
    schoolType: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    latitude?: number;
    longitude?: number;
    website?: string;
    principalName?: string;
    establishedYear?: number;
    totalStudents?: number;
    sportsFacilities?: string[];
  }) {
    return schoolRepository.create({ 
      user: { connect: { id: userId } }, 
      ...data,
      members: {
        create: {
          userId: userId,
          role: "ADMIN"
        }
      }
    });
  }

  async updateSchoolProfile(id: string, data: Record<string, unknown>) {
    return schoolRepository.update(id, data);
  }

  async getAllSchools(pagination: PaginationInput, filters?: { city?: string; state?: string }) {
    return schoolRepository.findAll(pagination, filters);
  }

  async getVerifiedSchools(limit?: number) {
    return schoolRepository.getVerified(limit);
  }
}

export const schoolService = new SchoolService();
