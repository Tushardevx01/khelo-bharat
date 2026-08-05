"use server";

import { auth } from "@clerk/nextjs/server";
import { certificateService } from "@/services/certificate.service";

export async function createCertificate(data: {
  tournamentId?: string;
  title: string;
  description?: string;
  certificateType: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);

  return certificateService.createCertificate({
    ...data,
    userId: user.id,
  });
}

export async function getUserCertificates() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);

  return certificateService.getUserCertificates(user.id);
}

export async function verifyCertificate(code: string) {
  return certificateService.verifyCertificate(code);
}

export async function updateCertificateStatus(id: string, status: string, certificateUrl?: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return certificateService.updateStatus(id, status as never, certificateUrl);
}
