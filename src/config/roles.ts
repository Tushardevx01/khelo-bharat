export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  SCHOOL_ADMIN: "SCHOOL_ADMIN",
  COACH: "COACH",
  ATHLETE: "ATHLETE",
  SPONSOR: "SPONSOR",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: "Super Admin",
  SCHOOL_ADMIN: "School Admin",
  COACH: "Coach",
  ATHLETE: "Athlete",
  SPONSOR: "Sponsor",
};

export const ROLE_DASHBOARD_PATHS: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin",
  SCHOOL_ADMIN: "/school",
  COACH: "/coach",
  ATHLETE: "/athlete",
  SPONSOR: "/sponsor",
};

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  SUPER_ADMIN: 5,
  SCHOOL_ADMIN: 4,
  COACH: 3,
  SPONSOR: 3,
  ATHLETE: 1,
};
