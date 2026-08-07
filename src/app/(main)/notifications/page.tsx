import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award, MessageSquare, Settings, CheckCircle, BellRing, Bell } from "lucide-react";
import { getNotifications } from "@/actions/notification.actions";
import { MarkAllReadButton } from "./_components/mark-all-read-button";
import { formatDistanceToNow } from "date-fns";

const getIcon = (type: string) => {
  switch (type) {
    case "TOURNAMENT": return Trophy;
    case "ACHIEVEMENT": return Award;
    case "MESSAGE": return MessageSquare;
    case "SPONSOR": return CheckCircle;
    case "SYSTEM": return BellRing;
    default: return Settings;
  }
};

export default async function NotificationsPage() {
  let notifications: any[] = [];
  try {
    notifications = await getNotifications();
  } catch (error) {
    // User might not be logged in or have profile set up
  }

  const hasUnread = notifications.some((n) => !n.read);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <PageHeader
            title="Notifications"
            description="Stay updated with your activities."
          />
          <MarkAllReadButton hasUnread={hasUnread} />
        </div>

        {notifications.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center text-center p-8 border border-dashed border-border rounded-xl bg-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No notifications</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              You're all caught up! We'll notify you when there's new activity on your account.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => {
              const Icon = getIcon(notification.type);
              return (
                <Card
                  key={notification.id}
                  className={`transition-all hover:shadow-md bg-card border-border ${
                    !notification.read ? "border-l-4 border-l-primary" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <p className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                            {notification.title}
                          </p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className={`mt-1 text-sm ${!notification.read ? "text-muted-foreground" : "text-muted-foreground/80"}`}>
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
