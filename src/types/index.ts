export type UserRole = "SUPER_ADMIN" | "SCHOOL_ADMIN" | "COACH" | "ATHLETE" | "SPONSOR";

export interface DashboardStats {
  totalUsers: number;
  totalAthletes: number;
  totalSchools: number;
  totalCoaches: number;
  totalSponsors: number;
  totalTournaments: number;
  activeTournaments: number;
  totalCertificates: number;
}

export interface TournamentWithDetails {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  location: string;
  city: string;
  state: string;
  format: string;
  maxParticipants: number;
  entryFee: number;
  prizePool: number;
  status: string;
  imageUrl: string | null;
  sport: { name: string; icon: string | null };
  organizer: { name: string; avatar: string | null };
  _count: { registrations: number };
}

export interface AthleteWithProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  athleteProfile: {
    dateOfBirth: Date | null;
    gender: string | null;
    city: string | null;
    state: string | null;
    bio: string | null;
    sports: string | null;
    position: string | null;
    ranking: number | null;
    achievementsCount: number;
    certificatesCount: number;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
