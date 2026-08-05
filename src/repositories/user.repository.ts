import { prisma } from "@/lib/prisma";
import { Prisma, UserRole } from "@prisma/client";
import { NotFoundError, ConflictError } from "@/lib/errors";
import { PaginationInput, createPaginatedResponse } from "@/lib/validators";

export class UserRepository {
  async findByClerkId(clerkId: string) {
    const user = await prisma.user.findUnique({ where: { clerkId } });
    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new ConflictError("User with this email already exists");
    return prisma.user.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError("User");
    return prisma.user.update({ where: { id }, data });
  }

  async delete(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError("User");
    return prisma.user.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async findAll(pagination: PaginationInput, role?: UserRole) {
    const { page, limit, search, sortBy, sortOrder } = pagination;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      deletedAt: null,
      ...(role && { role }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy || "createdAt"]: sortOrder },
      }),
      prisma.user.count({ where }),
    ]);

    return createPaginatedResponse(users, total, page, limit);
  }

  async updateRole(id: string, role: UserRole) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError("User");
    return prisma.user.update({ where: { id }, data: { role } });
  }
}

export const userRepository = new UserRepository();
