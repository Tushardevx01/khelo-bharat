import { prisma } from "@/lib/prisma";
import { Prisma, CertificateStatus } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
import { generateVerificationCode } from "@/lib/utils";

export class CertificateRepository {
  async findById(id: string) {
    return prisma.certificate.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        tournament: { select: { id: true, title: true, sportCategory: true } },
      },
    });
  }

  async findByVerificationCode(code: string) {
    return prisma.certificate.findUnique({
      where: { verificationCode: code },
      include: {
        user: { select: { id: true, name: true } },
        tournament: { select: { id: true, title: true } },
      },
    });
  }

  async create(data: Prisma.CertificateCreateInput) {
    return prisma.certificate.create({
      data: {
        ...data,
        verificationCode: generateVerificationCode(),
      },
    });
  }

  async updateStatus(id: string, status: CertificateStatus, certificateUrl?: string) {
    const certificate = await prisma.certificate.findUnique({ where: { id } });
    if (!certificate) throw new NotFoundError("Certificate");
    return prisma.certificate.update({
      where: { id },
      data: {
        status,
        ...(certificateUrl && { certificateUrl }),
        ...(status === "DOWNLOADED" && { downloadedAt: new Date() }),
      },
    });
  }

  async findByUser(userId: string) {
    return prisma.certificate.findMany({
      where: { userId },
      include: {
        tournament: { select: { id: true, title: true, sportCategory: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async verify(code: string) {
    const certificate = await prisma.certificate.findUnique({
      where: { verificationCode: code },
      include: {
        user: { select: { id: true, name: true } },
        tournament: { select: { id: true, title: true } },
      },
    });

    if (!certificate) return null;

    return {
      isValid: certificate.status !== "REVOKED",
      certificate,
    };
  }
}

export const certificateRepository = new CertificateRepository();
