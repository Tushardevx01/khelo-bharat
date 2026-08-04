"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  notificationCount?: number;
}

export default function DashboardHeader({ title, subtitle, notificationCount = 0 }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
        {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-xl px-4 py-2.5">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-48" />
        </div>
        <Button variant="outline" size="icon" className="relative rounded-xl">
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {notificationCount > 9 ? "9+" : notificationCount}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
}
