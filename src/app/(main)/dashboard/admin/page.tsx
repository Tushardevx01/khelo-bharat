import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Users, School, Handshake, TrendingUp } from "lucide-react";
import { getDashboardStats } from "@/actions/user.actions";
import { requireRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireRole("SUPER_ADMIN");
  const stats = await getDashboardStats();

  return <DashboardLayout><div className="space-y-8">
    <PageHeader title="Admin Dashboard" description="Live platform user totals from the business database." />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Athletes" value={stats.totalAthletes} icon={Users} />
      <StatCard title="Total Schools" value={stats.totalSchools} icon={School} />
      <StatCard title="Total Coaches" value={stats.totalCoaches} icon={TrendingUp} />
      <StatCard title="Total Sponsors" value={stats.totalSponsors} icon={Handshake} />
    </div>
  </div></DashboardLayout>;
}
