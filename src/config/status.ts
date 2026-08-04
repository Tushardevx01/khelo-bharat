export const TOURNAMENT_STATUS = {
  DRAFT: "DRAFT",
  UPCOMING: "UPCOMING",
  REGISTRATION_OPEN: "REGISTRATION_OPEN",
  REGISTRATION_CLOSED: "REGISTRATION_CLOSED",
  ONGOING: "ONGOING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type TournamentStatus = (typeof TOURNAMENT_STATUS)[keyof typeof TOURNAMENT_STATUS];

export const TOURNAMENT_STATUS_COLORS: Record<TournamentStatus, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  UPCOMING: "bg-blue-100 text-blue-700",
  REGISTRATION_OPEN: "bg-green-100 text-green-700",
  REGISTRATION_CLOSED: "bg-yellow-100 text-yellow-700",
  ONGOING: "bg-orange-100 text-orange-700",
  COMPLETED: "bg-purple-100 text-purple-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export const TOURNAMENT_FORMAT = {
  LEAGUE: "LEAGUE",
  KNOCKOUT: "KNOCKOUT",
  GROUP: "GROUP",
  MIXED: "MIXED",
} as const;

export type TournamentFormat = (typeof TOURNAMENT_FORMAT)[keyof typeof TOURNAMENT_FORMAT];

export const REGISTRATION_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED",
} as const;

export type RegistrationStatus = (typeof REGISTRATION_STATUS)[keyof typeof REGISTRATION_STATUS];

export const CERTIFICATE_TYPE = {
  PARTICIPATION: "PARTICIPATION",
  ACHIEVEMENT: "ACHIEVEMENT",
  MERIT: "MERIT",
  COMPLETION: "COMPLETION",
} as const;

export type CertificateType = (typeof CERTIFICATE_TYPE)[keyof typeof CERTIFICATE_TYPE];

export const NOTIFICATION_TYPE = {
  INFO: "INFO",
  SUCCESS: "SUCCESS",
  WARNING: "WARNING",
  ERROR: "ERROR",
} as const;

export type NotificationType = (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE];

export const CONTACT_STATUS = {
  PENDING: "PENDING",
  READ: "READ",
  REPLIED: "REPLIED",
  ARCHIVED: "ARCHIVED",
} as const;

export type ContactStatus = (typeof CONTACT_STATUS)[keyof typeof CONTACT_STATUS];

export const SPONSORSHIP_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED",
} as const;

export type SponsorshipStatus = (typeof SPONSORSHIP_STATUS)[keyof typeof SPONSORSHIP_STATUS];
