"use client";

import { Button } from "@/components/ui/button";
import { markAllNotificationsAsRead } from "@/actions/notification.actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { CheckCheck } from "lucide-react";

export function MarkAllReadButton({ hasUnread }: { hasUnread: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleMarkAllRead = () => {
    startTransition(async () => {
      await markAllNotificationsAsRead();
      router.refresh();
    });
  };

  if (!hasUnread) return null;

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleMarkAllRead} 
      disabled={isPending}
    >
      <CheckCheck className="mr-2 h-4 w-4" />
      {isPending ? "Marking..." : "Mark all as read"}
    </Button>
  );
}
