"use client";

import { Image, Upload, Calendar } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const photos = [
  { id: 1, title: "Cricket Championship Final", date: "May 20, 2024", category: "Tournament", color: "from-[#FF6B35] to-[#D72638]" },
  { id: 2, title: "Training Session", date: "May 15, 2024", category: "Training", color: "from-green-500 to-green-700" },
  { id: 3, title: "Award Ceremony", date: "Apr 28, 2024", category: "Award", color: "from-yellow-500 to-yellow-700" },
  { id: 4, title: "Team Photo", date: "Apr 10, 2024", category: "Team", color: "from-blue-500 to-blue-700" },
  { id: 5, title: "Athletics Meet", date: "Mar 22, 2024", category: "Tournament", color: "from-[#FF6B35] to-[#D72638]" },
  { id: 6, title: "Sports Day", date: "Mar 5, 2024", category: "Event", color: "from-purple-500 to-purple-700" },
  { id: 7, title: "Fitness Training", date: "Feb 20, 2024", category: "Training", color: "from-green-500 to-green-700" },
  { id: 8, title: "Victory Celebration", date: "Feb 10, 2024", category: "Celebration", color: "from-yellow-500 to-yellow-700" },
];

export default function GalleryPage() {
  return (
    <div>
      <DashboardHeader title="Gallery" subtitle="Your sports photo gallery" />

      <div className="flex justify-end mb-6">
        <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">
          <Upload className="w-4 h-4 mr-2" /> Upload Photo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <Card key={photo.id} className="hover:shadow-lg transition-shadow overflow-hidden cursor-pointer">
            <div className={`h-48 bg-gradient-to-br ${photo.color} flex items-center justify-center`}>
              <Image className="w-12 h-12 text-white/50" />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-sm">{photo.title}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <Calendar className="w-3 h-3" />
                <span>{photo.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
