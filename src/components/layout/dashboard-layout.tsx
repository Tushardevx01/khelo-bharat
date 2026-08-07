"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    async function fetchRole() {
      try {
        const { getOrCreateCurrentUser } = await import("@/actions/user.actions");
        const user = await getOrCreateCurrentUser();
        if (user) {
          setRole(user.role);
        }
      } catch {
        setRole("ATHLETE");
      }
    }

    if (isSignedIn) {
      fetchRole();
    }
  }, [isSignedIn]);

  if (!isLoaded || !role) {
    return (
      <div className="flex h-screen">
        <div className="hidden w-64 border-r border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950 md:block">
          <Skeleton className="h-8 w-32" />
          <div className="mt-8 space-y-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
        <div className="flex-1 p-4 sm:p-6 md:p-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      <Sidebar role={role} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
