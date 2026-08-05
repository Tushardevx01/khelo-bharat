import { galleryRepository } from "@/repositories/gallery.repository";

export class GalleryService {
  async addMedia(data: {
    userId: string;
    tournamentId?: string;
    title: string;
    description?: string;
    mediaUrl: string;
    mediaType: string;
  }) {
    return galleryRepository.create({
      user: { connect: { id: data.userId } },
      ...(data.tournamentId && { tournament: { connect: { id: data.tournamentId } } }),
      title: data.title,
      description: data.description,
      mediaUrl: data.mediaUrl,
      mediaType: data.mediaType,
    });
  }

  async getUserMedia(userId: string) {
    return galleryRepository.findByUser(userId);
  }

  async getTournamentMedia(tournamentId: string) {
    return galleryRepository.findByTournament(tournamentId);
  }

  async deleteMedia(id: string) {
    return galleryRepository.delete(id);
  }

  async getRecentMedia(limit?: number) {
    return galleryRepository.findAll(limit);
  }
}

export const galleryService = new GalleryService();
