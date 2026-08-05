"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Trophy, Award, MessageSquare, Settings, CheckCircle } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    { id: "1", type: "TOURNAMENT", title: "Tournament Registration Open", message: "National Cricket Championship 2026 is now open for registration.", time: "5 minutes ago", read: false },
    { id: "2", type: "ACHIEVEMENT", title: "Achievement Verified", message: "Your State Championship achievement has been verified.", time: "2 hours ago", read: false },
    { id: "3", type: "MESSAGE", title: "New Message", message: "Rajesh Kumar sent you a message.", time: "3 hours ago", read: true },
    { id: "4", type: "SPONSOR", title: "Sponsorship Opportunity", message: "Sports India is interested in sponsoring you.", time: "1 day ago", read: true },
    { id: "5", type: "SYSTEM", title: "Profile Update Required", message: "Please update your profile information.", time: "2 days ago", read: true },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "TOURNAMENT": return Trophy;
      case "ACHIEVEMENT": return Award;
      case "MESSAGE": return MessageSquare;
      case "SPONSOR": return CheckCircle;
      default: return Settings;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <PageHeader
            title="Notifications"
            description="Stay updated with your activities."
          />
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon = getIcon(notification.type);
            return (
              <Card
                key={notification.id}
                className={`transition-all hover:shadow-md ${
                  !notification.read ? "border-l-4 border-l-neutral-900 dark:border-l-white" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
                      <Icon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${!notification.read ? "text-neutral-900 dark:text-white" : "text-neutral-600 dark:text-neutral-400"}`}>
                          {notification.title}
                        </p>
                        <span className="text-xs text-neutral-500">{notification.time}</span>
                      </div>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
