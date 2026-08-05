import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/user.actions";


export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const roleRedirects: Record<string, string> = {
    SUPER_ADMIN: "/dashboard/admin",
    SCHOOL_ADMIN: "/dashboard/school",
    COACH: "/dashboard/coach",
    SPONSOR: "/dashboard/sponsor",
    ATHLETE: "/dashboard/athlete",
  };

  redirect(roleRedirects[user.role] || "/dashboard/athlete");
}
