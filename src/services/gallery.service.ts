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
    return galleryRepository.create(data);
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
