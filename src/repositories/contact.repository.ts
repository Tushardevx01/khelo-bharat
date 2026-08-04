import { prisma } from "@/lib/prisma";
import type { ContactRequest } from "@prisma/client";

export const contactRepository = {
  async create(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<ContactRequest> {
    return prisma.contactRequest.create({ data });
  },

  async findMany(params: { page: number; pageSize: number; status?: string }) {
    const { page, pageSize, status } = params;
    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const [items, total] = await Promise.all([
      prisma.contactRequest.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.contactRequest.count({ where }),
    ]);

    return { items, total };
  },
};
