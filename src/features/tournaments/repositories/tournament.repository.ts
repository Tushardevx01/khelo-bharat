import { BaseRepository } from "@/core/database/BaseRepository";
import { Tournament, Prisma } from "@prisma/client";

export class TournamentRepository extends BaseRepository<
  Tournament,
  Prisma.TournamentUncheckedCreateInput,
  Prisma.TournamentUpdateInput
> {
  constructor() {
    super("tournament");
  }

  async findActiveTournaments() {
    return this.model.findMany({
      where: {
        status: {
          in: ["UPCOMING", "REGISTRATION_OPEN", "ONGOING", "COMPLETED"],
        },
      },
      include: {
        sport: true,
        _count: {
          select: { registrations: true },
        },
      },
      orderBy: { startDate: "asc" },
    });
  }
}
