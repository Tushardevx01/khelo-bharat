import { prisma } from "@/lib/prisma";
import { Prisma, SponsorStatus } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";

export class SponsorshipRepository {
  async findById(id: string) {
    return prisma.sponsorship.findUnique({
      where: { id },
      include: {
        sponsor: { include: { user: { select: { name: true, avatar: true } } } },
        athlete: { include: { user: { select: { name: true, avatar: true } } } },
        school: { select: { id: true, schoolName: true } },
        tournament: { select: { id: true, title: true } },
      },
    });
  }

  async create(data: Prisma.SponsorshipCreateInput) {
    return prisma.sponsorship.create({ data });
  }

  async updateStatus(id: string, status: SponsorStatus) {
    const sponsorship = await prisma.sponsorship.findUnique({ where: { id } });
    if (!sponsorship) throw new NotFoundError("Sponsorship");
    return prisma.sponsorship.update({ where: { id }, data: { status } });
  }

  async findBySponsor(sponsorId: string) {
    return prisma.sponsorship.findMany({
      where: { sponsorId },
      include: {
        athlete: { include: { user: { select: { name: true, avatar: true } } } },
        school: { select: { id: true, schoolName: true } },
        tournament: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findActive() {
    return prisma.sponsorship.findMany({
      where: { status: "ACTIVE" },
      include: {
        sponsor: { include: { user: { select: { name: true, avatar: true } } } },
        athlete: { include: { user: { select: { name: true, avatar: true } } } },
      },
      orderBy: { amount: "desc" },
    });
  }
}

export const sponsorshipRepository = new SponsorshipRepository();
