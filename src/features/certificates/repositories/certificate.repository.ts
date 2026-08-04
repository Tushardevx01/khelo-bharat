/* eslint-disable */
import { prisma } from "@/lib/prisma";
import type { Certificate } from "@prisma/client";

export const certificateRepository = {
  async findById(id: string): Promise<Certificate | null> {
    return prisma.certificate.findUnique({ where: { id } });
  },

  async findByRecipient(recipientId: string): Promise<Certificate[]> {
    return prisma.certificate.findMany({
      where: { recipientId },
      orderBy: { issuedAt: "desc" },
    });
  },

  async create(data: {
    title: string;
    description?: string;
    type: string;
    recipientId: string;
    issuerId: string;
    tournamentId?: string;
    athleteId?: string;
    qrCode?: string;
    pdfUrl?: string;
  }): Promise<Certificate> {
    return prisma.certificate.create({ data: data as any });
  },

  async count(): Promise<number> {
    return prisma.certificate.count();
  },

  async countByType(): Promise<Record<string, number>> {
    const counts = await prisma.certificate.groupBy({
      by: ["type"],
      _count: true,
    });
    return counts.reduce((acc, item) => {
      acc[item.type] = item._count;
      return acc;
    }, {} as Record<string, number>);
  },
};
