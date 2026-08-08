import { platformRepository } from "@/repositories/platform.repository";

export class PlatformService {
  async getPublicStats() {
    return platformRepository.getPublicStats();
  }
}

export const platformService = new PlatformService();
