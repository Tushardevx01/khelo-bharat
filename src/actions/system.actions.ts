"use server";

import { platformService } from "@/services/platform.service";

export async function getPlatformStats() {
  return platformService.getPublicStats();
}
