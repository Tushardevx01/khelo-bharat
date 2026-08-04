"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          router.push("/login");
          return;
        }
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => router.push("/login"));
  }, [router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar role={user.role} user={user} />
      <main className="ml-[280px] p-6 lg:p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
