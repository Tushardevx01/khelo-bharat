/* eslint-disable */
import { prisma } from "@/lib/prisma";
import type { User, AthleteProfile, SchoolProfile, CoachProfile, SponsorProfile } from "@prisma/client";
import type { PaginationInput } from "@/types";

type UserWithProfile = User & {
  athleteProfile?: AthleteProfile | null;
  schoolProfile?: SchoolProfile | null;
  coachProfile?: CoachProfile | null;
  sponsorProfile?: SponsorProfile | null;
};

export const userRepository = {
  async findById(id: string): Promise<UserWithProfile | null> {
    return prisma.user.findUnique({
      where: { id },
      include: {
        athleteProfile: true,
        schoolProfile: true,
        coachProfile: true,
        sponsorProfile: true,
      },
    });
  },

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  },

  async create(data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    role: string;
  }): Promise<User> {
    return prisma.user.create({ data: { ...data, role: data.role as any } });
  },

  async update(
    id: string,
    data: Partial<Pick<User, "name" | "phone" | "avatar" | "emailVerified" | "isActive">>
  ): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  },

  async findMany(params: PaginationInput & { role?: string }): Promise<{ users: User[]; total: number }> {
    const { page, pageSize, search, role } = params;
    const where: Record<string, unknown> = {};

    if (role) where.role = role;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total };
  },

  async count(): Promise<number> {
    return prisma.user.count();
  },

  async countByRole(): Promise<Record<string, number>> {
    const counts = await prisma.user.groupBy({
      by: ["role"],
      _count: true,
    });
    return counts.reduce((acc, item) => {
      acc[item.role] = item._count;
      return acc;
    }, {} as Record<string, number>);
  },

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  },

  async createAthleteProfile(userId: string): Promise<AthleteProfile> {
    return prisma.athleteProfile.create({ data: { userId } });
  },

  async createSchoolProfile(userId: string, data: { name: string; type: string; address: string; city: string; state: string }): Promise<SchoolProfile> {
    return prisma.schoolProfile.create({ data: { userId, ...data } });
  },

  async createCoachProfile(userId: string): Promise<CoachProfile> {
    return prisma.coachProfile.create({ data: { userId } });
  },

  async createSponsorProfile(userId: string): Promise<SponsorProfile> {
    return prisma.sponsorProfile.create({ data: { userId, companyName: "" } });
  },
};
