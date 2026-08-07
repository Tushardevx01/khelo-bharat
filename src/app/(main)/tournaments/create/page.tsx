import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { CreateTournamentForm } from "../_components/create-tournament-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CreateTournamentPage() {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Create Tournament"
          description="Organize a new tournament, set the rules, and open registrations."
        />
        
        <div className="mx-auto max-w-2xl">
          <CreateTournamentForm />
        </div>
      </div>
    </DashboardLayout>
  );
}
