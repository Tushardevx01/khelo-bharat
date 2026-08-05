"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Video, Plus, Heart, MessageSquare } from "lucide-react";

export default function GalleryPage() {
  const media = [
    { id: "1", type: "image", title: "Tournament Final", likes: 124, comments: 18 },
    { id: "2", type: "image", title: "Team Celebration", likes: 89, comments: 12 },
    { id: "3", type: "video", title: "Match Highlights", likes: 256, comments: 34 },
    { id: "4", type: "image", title: "Training Session", likes: 67, comments: 8 },
    { id: "5", type: "image", title: "Award Ceremony", likes: 178, comments: 22 },
    { id: "6", type: "video", title: "Best Moments", likes: 312, comments: 45 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <PageHeader
            title="Gallery"
            description="Share and view your sports moments."
          />
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Upload Media
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {media.map((item) => (
            <Card key={item.id} className="group overflow-hidden transition-all hover:shadow-lg">
              <div className="relative aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
                {item.type === "video" ? (
                  <Video className="absolute inset-0 m-auto h-8 w-8 text-neutral-400" />
                ) : (
                  <Image className="absolute inset-0 m-auto h-8 w-8 text-neutral-400" />
                )}
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-neutral-900 dark:text-white">{item.title}</h3>
                <div className="mt-2 flex items-center gap-4 text-sm text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {item.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {item.comments}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
