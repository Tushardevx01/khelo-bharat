"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard, Trophy, BarChart3, Award, MessageSquare,
  Bell, Image, Settings, Users, FileText, ScrollText, Handshake,
  GraduationCap, ChevronLeft, ChevronRight
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Trophy,
  BarChart3,
  Award,
  MessageSquare,
  Bell,
  Image,
  Settings,
  Users,
  FileText,
  ScrollText,
  Handshake,
  School: GraduationCap,
};

interface SidebarProps {
  role: string;
}

export function Sidebar({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const getMenuItems = () => {
    switch (role) {
      case "SUPER_ADMIN":
        return [
          { label: "Overview", href: "/dashboard/admin", icon: "LayoutDashboard" },
          { label: "Users", href: "/dashboard/admin/users", icon: "Users" },
          { label: "Tournaments", href: "/dashboard/admin/tournaments", icon: "Trophy" },
          { label: "Schools", href: "/dashboard/admin/schools", icon: "School" },
          { label: "Sponsors", href: "/dashboard/admin/sponsors", icon: "Handshake" },
          { label: "Reports", href: "/dashboard/admin/reports", icon: "FileText" },
          { label: "Audit Logs", href: "/dashboard/admin/audit-logs", icon: "ScrollText" },
          { label: "Settings", href: "/dashboard/admin/settings", icon: "Settings" },
        ];
      case "SCHOOL_ADMIN":
        return [
          { label: "Dashboard", href: "/dashboard/school", icon: "LayoutDashboard" },
          { label: "Athletes", href: "/dashboard/school/athletes", icon: "Users" },
          { label: "Tournaments", href: "/dashboard/school/tournaments", icon: "Trophy" },
          { label: "Achievements", href: "/dashboard/school/achievements", icon: "Award" },
          { label: "Settings", href: "/dashboard/school/settings", icon: "Settings" },
        ];
      case "COACH":
        return [
          { label: "Dashboard", href: "/dashboard/coach", icon: "LayoutDashboard" },
          { label: "Athletes", href: "/dashboard/coach/athletes", icon: "Users" },
          { label: "Analytics", href: "/dashboard/coach/analytics", icon: "BarChart3" },
          { label: "Messages", href: "/dashboard/coach/messages", icon: "MessageSquare" },
          { label: "Settings", href: "/dashboard/coach/settings", icon: "Settings" },
        ];
      case "SPONSOR":
        return [
          { label: "Dashboard", href: "/dashboard/sponsor", icon: "LayoutDashboard" },
          { label: "Sponsorships", href: "/dashboard/sponsor/sponsorships", icon: "Handshake" },
          { label: "Athletes", href: "/dashboard/sponsor/athletes", icon: "Users" },
          { label: "Reports", href: "/dashboard/sponsor/reports", icon: "FileText" },
          { label: "Settings", href: "/dashboard/sponsor/settings", icon: "Settings" },
        ];
      default:
        return [
          { label: "Dashboard", href: "/dashboard/athlete", icon: "LayoutDashboard" },
          { label: "Tournaments", href: "/dashboard/athlete/tournaments", icon: "Trophy" },
          { label: "Performance", href: "/dashboard/athlete/performance", icon: "BarChart3" },
          { label: "Certificates", href: "/dashboard/athlete/certificates", icon: "Award" },
          { label: "Achievements", href: "/dashboard/athlete/achievements", icon: "Award" },
          { label: "Messages", href: "/dashboard/athlete/messages", icon: "MessageSquare" },
          { label: "Notifications", href: "/dashboard/athlete/notifications", icon: "Bell" },
          { label: "Settings", href: "/dashboard/athlete/settings", icon: "Settings" },
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-neutral-200 bg-white transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-950",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <Link href="/" className="text-lg font-bold text-neutral-900 dark:text-white">
            Khelo Bharat
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <Separator />

      <nav className="flex-1 space-y-1 p-2">
        {menuItems.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <Separator />

      <div className="p-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </aside>
  );
}
