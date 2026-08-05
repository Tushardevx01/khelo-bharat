export type {
  User,
  Athlete,
  School,
  Coach,
  Sponsor,
  Tournament,
  TournamentRegistration,
  Match,
  Performance,
  Certificate,
  Achievement,
  Sponsorship,
  Message,
  Notification,
  Gallery,
  AuditLog,
  UserRole,
  SportCategory,
  TournamentStatus,
  CertificateStatus,
  SponsorStatus,
  Gender,
  NotificationType,
  MatchStatus,
} from "@prisma/client";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface DashboardStats {
  totalAthletes: number;
  totalSchools: number;
  totalCoaches: number;
  totalSponsors: number;
  totalTournaments: number;
  activeTournaments: number;
  totalCertificates: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: Date;
  userId?: string;
  userAvatar?: string;
}

export interface TournamentWithDetails {
  id: string;
  title: string;
  description: string | null;
  sportCategory: SportCategory;
  status: TournamentStatus;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date | null;
  location: string;
  city: string;
  state: string;
  latitude: number | null;
  longitude: number | null;
  maxParticipants: number | null;
  entryFee: number | null;
  prizePool: number | null;
  rules: string | null;
  poster: string | null;
  isFeatured: boolean;
  totalParticipants: number;
  organizer: {
    id: string;
    name: string;
    avatar: string | null;
  };
  registrations?: TournamentRegistration[];
  matches?: Match[];
}

export interface AthleteWithProfile {
  id: string;
  userId: string;
  sportCategory: SportCategory;
  height: number | null;
  weight: number | null;
  experience: string | null;
  achievementsCount: number;
  ranking: number | null;
  isFeatured: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    bio: string | null;
    location: string | null;
    phone: string | null;
  };
  school?: {
    id: string;
    schoolName: string;
  } | null;
  coach?: {
    id: string;
    user: {
      name: string;
    };
  } | null;
  achievements?: Achievement[];
  performances?: Performance[];
}

export interface SchoolWithProfile {
  id: string;
  userId: string;
  schoolName: string;
  schoolType: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number | null;
  longitude: number | null;
  website: string | null;
  principalName: string | null;
  establishedYear: number | null;
  totalStudents: number | null;
  sportsFacilities: string[];
  isVerified: boolean;
  rating: number;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
  athletes?: Athlete[];
}

export interface CoachWithProfile {
  id: string;
  userId: string;
  sportCategory: SportCategory;
  specialization: string | null;
  certifications: string[];
  experience: string | null;
  rating: number;
  hourlyRate: number | null;
  isAvailable: boolean;
  athletesCount: number;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    bio: string | null;
    location: string | null;
  };
}

export interface SponsorWithProfile {
  id: string;
  userId: string;
  companyName: string;
  companyType: string | null;
  industry: string | null;
  budget: number | null;
  website: string | null;
  logo: string | null;
  isVerified: boolean;
  totalSponsored: number;
  activeSponsorships: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
