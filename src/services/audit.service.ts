import { auditRepository } from "@/repositories/audit.repository";

export class AuditService {
  async record(input: {
    userId?: string;
    action: string;
    entity: string;
    entityId?: string;
    oldData?: Record<string, unknown>;
    newData?: Record<string, unknown>;
  }) {
    return auditRepository.create({
      user: input.userId ? { connect: { id: input.userId } } : undefined,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId,
      oldData: input.oldData as never,
      newData: input.newData as never,
    });
  }
}

export const auditService = new AuditService();
