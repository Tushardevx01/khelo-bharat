"use server";

import { auth } from "@clerk/nextjs/server";
import { galleryService } from "@/services/gallery.service";

export async function addMedia(data: {
  tournamentId?: string;
  title: string;
  description?: string;
  mediaUrl: string;
  mediaType: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return galleryService.addMedia({
    ...data,
    userId,
  });
}

export async function getUserMedia() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return galleryService.getUserMedia(userId);
}

export async function getTournamentMedia(tournamentId: string) {
  return galleryService.getTournamentMedia(tournamentId);
}

export async function getRecentMedia(limit?: number) {
  return galleryService.getRecentMedia(limit);
}
