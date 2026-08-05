import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import { redirect } from 'next/navigation';

export const requireAuth = async () => {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId }
  });

  if (!user) {
    // If the user isn't in our DB yet, they might need to complete onboarding or the webhook hasn't fired
    redirect('/login');
  }

  return user;
};

export const requireRole = async (roles: UserRole[]) => {
  const user = await requireAuth();
  
  if (!roles.includes(user.role)) {
    redirect('/dashboard');
  }

  return user;
};

export const requireAdmin = () => requireRole([UserRole.SUPER_ADMIN]);
export const requireSchool = () => requireRole([UserRole.SCHOOL_ADMIN, UserRole.SUPER_ADMIN]);
export const requireCoach = () => requireRole([UserRole.COACH, UserRole.SUPER_ADMIN]);
export const requireAthlete = () => requireRole([UserRole.ATHLETE, UserRole.SUPER_ADMIN]);
export const requireSponsor = () => requireRole([UserRole.SPONSOR, UserRole.SUPER_ADMIN]);

export const getCurrentUser = async () => {
  const { userId } = await auth();
  
  if (!userId) return null;

  return prisma.user.findUnique({
    where: { clerkId: userId }
  });
};
