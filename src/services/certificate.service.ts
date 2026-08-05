import { certificateRepository } from "@/repositories/certificate.repository";
import { CertificateStatus } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
import { generateVerificationCode } from "@/lib/utils";

export class CertificateService {
  async getCertificateById(id: string) {
    const certificate = await certificateRepository.findById(id);
    if (!certificate) throw new NotFoundError("Certificate");
    return certificate;
  }

  async createCertificate(data: {
    userId: string;
    tournamentId?: string;
    title: string;
    description?: string;
    certificateType: string;
  }) {
    return certificateRepository.create({
      user: { connect: { id: data.userId } },
      tournament: data.tournamentId ? { connect: { id: data.tournamentId } } : undefined,
      title: data.title,
      description: data.description,
      certificateType: data.certificateType,
      verificationCode: generateVerificationCode(),
    });
  }

  async updateStatus(id: string, status: CertificateStatus, certificateUrl?: string) {
    return certificateRepository.updateStatus(id, status, certificateUrl);
  }

  async getUserCertificates(userId: string) {
    return certificateRepository.findByUser(userId);
  }

  async verifyCertificate(code: string) {
    return certificateRepository.verify(code);
  }
}

export const certificateService = new CertificateService();
