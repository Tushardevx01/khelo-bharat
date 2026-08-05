import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PaginationInput, createPaginatedResponse } from "@/lib/validators";

export class AuditRepository {
  async create(data: Prisma.AuditLogCreateInput) {
    return prisma.auditLog.create({ data });
  }

  async findAll(pagination: PaginationInput, filters?: { userId?: string; action?: string; entity?: string }) {
    const { page, limit, search, sortOrder } = pagination;
    const skip = (page - 1) * limit;

    const where: Prisma.AuditLogWhereInput = {
      ...(filters?.userId && { userId: filters.userId }),
      ...(filters?.action && { action: filters.action }),
      ...(filters?.entity && { entity: filters.entity }),
      ...(search && {
        OR: [
          { action: { contains: search, mode: "insensitive" } },
          { entity: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        include: { user: { select: { id: true, name: true, avatar: true } } },
        skip,
        take: limit,
        orderBy: { createdAt: sortOrder || "desc" },
      }),
      prisma.auditLog.count({ where }),
    ]);

    return createPaginatedResponse(logs, total, page, limit);
  }

  async findByEntity(entity: string, entityId: string) {
    return prisma.auditLog.findMany({
      where: { entity, entityId },
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });
  }
}

export const auditRepository = new AuditRepository();
