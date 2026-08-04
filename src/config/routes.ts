export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  ABOUT: "/about",
  CONTACT: "/contact",
  TOURNAMENTS: "/tournaments",
  ATHLETES: "/athletes",
  SCHOOLS: "/schools",
  DASHBOARD: {
    ADMIN: "/admin",
    SCHOOL: "/school",
    COACH: "/coach",
    ATHLETE: "/athlete",
    SPONSOR: "/sponsor",
  },
  API: {
    AUTH: {
      REGISTER: "/api/auth/register",
      LOGIN: "/api/auth/login",
      LOGOUT: "/api/auth/logout",
      ME: "/api/auth/me",
    },
    TOURNAMENTS: "/api/tournaments",
    ATHLETES: "/api/athletes",
    CERTIFICATES: "/api/certificates",
    NOTIFICATIONS: "/api/notifications",
    CONTACT: "/api/contact",
    HEALTH: "/api/health",
  },
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.ABOUT,
  ROUTES.CONTACT,
  ROUTES.TOURNAMENTS,
  ROUTES.ATHLETES,
  ROUTES.SCHOOLS,
] as const;

export const API_ROUTES = ["/api"] as const;
