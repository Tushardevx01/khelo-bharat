"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, Trophy, Medal, GraduationCap,
  Settings, Bell, FileText, BarChart3, Calendar, MapPin,
  ChevronLeft, ChevronRight, LogOut, User, Target,
  Image, Award, MessageSquare, Handshake, Megaphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface DashboardSidebarProps {
  role: string;
  user: { name: string; email: string; avatar: string | null };
  notificationCount?: number;
}

const roleConfigs: Record<string, { links: SidebarLink[]; color: string }> = {
  SUPER_ADMIN: {
    color: "from-[#FF6B35] to-[#D72638]",
    links: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Schools", href: "/admin/schools", icon: GraduationCap },
      { label: "Coaches", href: "/admin/coaches", icon: Target },
      { label: "Athletes", href: "/admin/athletes", icon: Medal },
      { label: "Sponsors", href: "/admin/sponsors", icon: Handshake },
      { label: "Sports", href: "/admin/sports", icon: Trophy },
      { label: "Tournaments", href: "/admin/tournaments", icon: Calendar },
      { label: "Certificates", href: "/admin/certificates", icon: Award },
      { label: "Messages", href: "/admin/messages", icon: MessageSquare },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { label: "Reports", href: "/admin/reports", icon: FileText },
    ],
  },
  SCHOOL_ADMIN: {
    color: "from-blue-500 to-blue-700",
    links: [
      { label: "Dashboard", href: "/school", icon: LayoutDashboard },
      { label: "Students", href: "/school/students", icon: Users },
      { label: "Coaches", href: "/school/coaches", icon: Target },
      { label: "Sports", href: "/school/sports", icon: Trophy },
      { label: "Tournaments", href: "/school/tournaments", icon: Calendar },
      { label: "Attendance", href: "/school/attendance", icon: BarChart3 },
      { label: "Certificates", href: "/school/certificates", icon: Award },
      { label: "Calendar", href: "/school/calendar", icon: Calendar },
      { label: "Reports", href: "/school/reports", icon: FileText },
      { label: "Messages", href: "/school/messages", icon: MessageSquare },
    ],
  },
  COACH: {
    color: "from-green-500 to-green-700",
    links: [
      { label: "Dashboard", href: "/coach", icon: LayoutDashboard },
      { label: "My Athletes", href: "/coach/athletes", icon: Users },
      { label: "Training", href: "/coach/training", icon: Target },
      { label: "Tournaments", href: "/coach/tournaments", icon: Calendar },
      { label: "Performance", href: "/coach/performance", icon: BarChart3 },
      { label: "Schedule", href: "/coach/schedule", icon: Calendar },
      { label: "Messages", href: "/coach/messages", icon: MessageSquare },
    ],
  },
  ATHLETE: {
    color: "from-[#FF6B35] to-[#D72638]",
    links: [
      { label: "Dashboard", href: "/athlete", icon: LayoutDashboard },
      { label: "Profile", href: "/athlete/profile", icon: User },
      { label: "Sports", href: "/athlete/sports", icon: Trophy },
      { label: "Achievements", href: "/athlete/achievements", icon: Award },
      { label: "Certificates", href: "/athlete/certificates", icon: FileText },
      { label: "Tournaments", href: "/athlete/tournaments", icon: Calendar },
      { label: "Analytics", href: "/athlete/analytics", icon: BarChart3 },
      { label: "Gallery", href: "/athlete/gallery", icon: Image },
      { label: "Messages", href: "/athlete/messages", icon: MessageSquare },
    ],
  },
  SPONSOR: {
    color: "from-purple-500 to-purple-700",
    links: [
      { label: "Dashboard", href: "/sponsor", icon: LayoutDashboard },
      { label: "Search Athletes", href: "/sponsor/athletes", icon: Users },
      { label: "Search Schools", href: "/sponsor/schools", icon: GraduationCap },
      { label: "Rankings", href: "/sponsor/rankings", icon: Trophy },
      { label: "Sponsorships", href: "/sponsor/sponsorships", icon: Handshake },
      { label: "Campaigns", href: "/sponsor/campaigns", icon: Megaphone },
      { label: "Analytics", href: "/sponsor/analytics", icon: BarChart3 },
      { label: "Messages", href: "/sponsor/messages", icon: MessageSquare },
    ],
  },
};

export default function DashboardSidebar({ role, user, notificationCount = 0 }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const config = roleConfigs[role] || roleConfigs.ATHLETE;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 72 : 280 }}
      className="fixed left-0 top-0 bottom-0 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 z-40 flex flex-col"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <Link href="/" className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center flex-shrink-0`}>
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-lg font-bold whitespace-nowrap">
                Khelo Bharat
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src={user.avatar || undefined} />
            <AvatarFallback className={`bg-gradient-to-br ${config.color} text-white`}>
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {config.links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <link.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"}`} />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">
                    {link.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {link.badge && !isCollapsed && (
                <Badge className="ml-auto bg-red-500 text-white text-xs">{link.badge}</Badge>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
        {notificationCount > 0 && (
          <Link
            href="/notifications"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <Bell className="w-5 h-5" />
            {!isCollapsed && (
              <>
                <span>Notifications</span>
                <Badge className="ml-auto bg-red-500 text-white text-xs">{notificationCount}</Badge>
              </>
            )}
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 w-full"
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>Logout</span>}
        </button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full rounded-xl"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>
    </motion.aside>
  );
}
