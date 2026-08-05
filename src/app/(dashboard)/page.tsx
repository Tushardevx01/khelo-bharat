import { requireAuth } from '@/features/auth/utils/auth';
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';

export default async function DashboardRedirect() {
  const user = await requireAuth();

  switch (user.role) {
    case UserRole.SUPER_ADMIN:
      redirect('/admin');
    case UserRole.SCHOOL_ADMIN:
      redirect('/school');
    case UserRole.COACH:
      redirect('/coach');
    case UserRole.ATHLETE:
      redirect('/athlete');
    case UserRole.SPONSOR:
      redirect('/sponsor');
    default:
      redirect('/');
  }
}
