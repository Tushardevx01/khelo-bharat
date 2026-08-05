import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardContent from "./DashboardContent";

import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  
  const user = await currentUser();
  
  let dbUser = null;
  if (user) {
    dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id }
    });
  }

  if (!dbUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DashboardSidebar
        role={dbUser.role}
        user={{ 
          name: `${dbUser.firstName} ${dbUser.lastName}`, 
          email: dbUser.email, 
          avatar: dbUser.imageUrl 
        }}
      />
      <DashboardContent>
        {children}
      </DashboardContent>
    </div>
  );
}
