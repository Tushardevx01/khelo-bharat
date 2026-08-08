import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { requireCurrentUser } from "@/lib/auth";
import { athleteService } from "@/services/athlete.service";
import { coachService } from "@/services/coach.service";
import { schoolService } from "@/services/school.service";
import { sponsorService } from "@/services/sponsor.service";
import { ProfileSetup } from "./profile-setup";

export default async function ProfilePage() {
  const user = await requireCurrentUser();
  const profileExists = await (async () => {
    switch (user.role) {
      case "ATHLETE": return Boolean(await athleteService.getAthleteByUserId(user.id).catch(() => null));
      case "COACH": return Boolean(await coachService.getCoachByUserId(user.id).catch(() => null));
      case "SCHOOL_ADMIN": return Boolean(await schoolService.getSchoolByUserId(user.id).catch(() => null));
      case "SPONSOR": return Boolean(await sponsorService.getSponsorByUserId(user.id).catch(() => null));
      default: return true;
    }
  })();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader title="Profile" description="Complete the information needed to participate in Khelo Bharat." />
        <ProfileSetup role={user.role} profileExists={profileExists} />
      </div>
    </DashboardLayout>
  );
}
