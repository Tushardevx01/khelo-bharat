import {
  type User as PrismaUser,
  type AthleteProfile as PrismaAthleteProfile,
  type SchoolProfile as PrismaSchoolProfile,
  type CoachProfile as PrismaCoachProfile,
  type SponsorProfile as PrismaSponsorProfile,
  type Tournament as PrismaTournament,
  type Certificate as PrismaCertificate,
  type Notification as PrismaNotification,
  type Achievement as PrismaAchievement,
  type Sport as PrismaSport,
} from "@prisma/client";

export type User = PrismaUser;
export type AthleteProfile = PrismaAthleteProfile;
export type SchoolProfile = PrismaSchoolProfile;
export type CoachProfile = PrismaCoachProfile;
export type SponsorProfile = PrismaSponsorProfile;
export type Tournament = PrismaTournament;
export type Certificate = PrismaCertificate;
export type Notification = PrismaNotification;
export type Achievement = PrismaAchievement;
export type Sport = PrismaSport;

export type UserWithoutPassword = Omit<User, "password">;

export type TournamentWithDetails = Tournament & {
  sport: Sport;
  organizer: { name: string; avatar: string | null };
  _count: { registrations: number };
};

export type AthleteWithProfile = User & {
  athleteProfile: AthleteProfile;
};

export type SchoolWithProfile = User & {
  schoolProfile: SchoolProfile;
};
