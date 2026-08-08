import { userRepository } from "@/repositories/user.repository";
import { UserRole } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
import { PaginationInput } from "@/lib/validators";

export class UserService {
  async getOrCreateUser(data: {
    clerkId: string;
    email: string;
    name: string;
    avatar?: string;
    role?: UserRole;
  }) {
    return userRepository.upsertFromIdentity({
      clerkId: data.clerkId,
      email: data.email,
      name: data.name,
      avatar: data.avatar || null,
      role: data.role || "ATHLETE",
    });
  }

  async getUserByClerkId(clerkId: string) {
    const user = await userRepository.findByClerkId(clerkId);
    if (!user) throw new NotFoundError("User");
    return user;
  }

  async getUserById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new NotFoundError("User");
    return user;
  }

  async updateUser(id: string, data: { name?: string; phone?: string; bio?: string; location?: string; latitude?: number; longitude?: number }) {
    return userRepository.update(id, data);
  }

  async updateAvatar(id: string, avatar: string) {
    return userRepository.update(id, { avatar });
  }

  async updateRole(id: string, role: UserRole) {
    return userRepository.updateRole(id, role);
  }

  async getAllUsers(pagination: PaginationInput, role?: UserRole) {
    return userRepository.findAll(pagination, role);
  }

  async getDashboardStats() {
    const [athletes, schools, coaches, sponsors] = await Promise.all([
      userRepository.findAll({ page: 1, limit: 1 }, "ATHLETE"),
      userRepository.findAll({ page: 1, limit: 1 }, "SCHOOL_ADMIN"),
      userRepository.findAll({ page: 1, limit: 1 }, "COACH"),
      userRepository.findAll({ page: 1, limit: 1 }, "SPONSOR"),
    ]);

    return {
      totalAthletes: athletes.pagination.total,
      totalSchools: schools.pagination.total,
      totalCoaches: coaches.pagination.total,
      totalSponsors: sponsors.pagination.total,
    };
  }

  async updateLastLogin(id: string) {
    return userRepository.update(id, { lastLoginAt: new Date() });
  }

  async deleteUserByClerkId(clerkId: string) {
    return userRepository.deleteByClerkId(clerkId);
  }
}

export const userService = new UserService();
