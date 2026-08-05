import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class GalleryRepository {
  async create(data: Prisma.GalleryCreateInput) {
    return prisma.gallery.create({ data });
  }

  async findByUser(userId: string) {
    return prisma.gallery.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findByTournament(tournamentId: string) {
    return prisma.gallery.findMany({
      where: { tournamentId },
      include: { user: { select: { id: true, name: true, avatar: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  async delete(id: string) {
    return prisma.gallery.delete({ where: { id } });
  }

  async findAll(limit: number = 20) {
    return prisma.gallery.findMany({
      include: { user: { select: { id: true, name: true, avatar: true } } },
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }
}

export const galleryRepository = new GalleryRepository();
