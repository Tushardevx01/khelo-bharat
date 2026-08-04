"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image, Video, Grid3X3, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import DashboardHeader from "@/components/layout/DashboardHeader";

interface GalleryItem {
  id: string;
  type: "image" | "video";
  title: string;
  color: string;
  height: string;
}

const galleryItems: GalleryItem[] = [
  { id: "1", type: "image", title: "Championship Final", color: "from-[#FF6B35] to-[#D72638]", height: "h-48" },
  { id: "2", type: "video", title: "Training Highlights", color: "from-[#D72638] to-[#8B0000]", height: "h-64" },
  { id: "3", type: "image", title: "Team Victory", color: "from-[#FF6B35]/80 to-[#FF6B35]", height: "h-40" },
  { id: "4", type: "image", title: "Award Ceremony", color: "from-yellow-500 to-[#FF6B35]", height: "h-56" },
  { id: "5", type: "video", title: "Match Recap", color: "from-blue-500 to-[#D72638]", height: "h-44" },
  { id: "6", type: "image", title: "Pre-match Warmup", color: "from-green-500 to-emerald-600", height: "h-52" },
  { id: "7", type: "image", title: "Medal Ceremony", color: "from-[#FF6B35] to-yellow-500", height: "h-36" },
  { id: "8", type: "video", title: "Best Moments 2024", color: "from-purple-500 to-[#D72638]", height: "h-60" },
  { id: "9", type: "image", title: "Practice Session", color: "from-cyan-500 to-blue-600", height: "h-48" },
  { id: "10", type: "image", title: "Stadium View", color: "from-[#FF6B35] to-purple-600", height: "h-44" },
  { id: "11", type: "image", title: "Team Bus", color: "from-gray-500 to-gray-700", height: "h-52" },
  { id: "12", type: "video", title: "Press Conference", color: "from-[#D72638] to-[#FF6B35]", height: "h-40" },
];

const filters = ["All", "Images", "Videos"];

export default function AthleteGalleryPage() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = filter === "All" ? galleryItems : galleryItems.filter((item) => item.type === (filter === "Images" ? "image" : "video"));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <DashboardHeader title="Gallery" subtitle="Your photos and videos" notificationCount={0} />
        <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90">
          <Upload className="w-4 h-4 mr-2" /> Upload
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {filters.map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f)}
            className={filter === f ? "bg-[#FF6B35] text-white" : ""}
          >
            {f === "Images" && <Image className="w-3.5 h-3.5 mr-1" />}
            {f === "Videos" && <Video className="w-3.5 h-3.5 mr-1" />}
            {f === "All" && <Grid3X3 className="w-3.5 h-3.5 mr-1" />}
            {f}
          </Button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="break-inside-avoid"
          >
            <Card
              className={`relative overflow-hidden cursor-pointer group ${item.height} bg-gradient-to-br ${item.color}`}
              onClick={() => setLightbox(item)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {item.type === "video" ? (
                  <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-sm">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-12 border-l-white ml-1" />
                  </div>
                ) : (
                  <Image className="w-10 h-10 text-white/40" />
                )}
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-4">
                <div className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium text-sm">{item.title}</p>
                      <Badge variant="outline" className="text-white border-white/40 mt-1 text-xs">
                        {item.type === "video" ? "Video" : "Photo"}
                      </Badge>
                    </div>
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-500">No media found</h3>
          <p className="text-gray-400 mt-2">Upload photos and videos to see them here</p>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`w-full aspect-video rounded-xl bg-gradient-to-br ${lightbox.color} flex items-center justify-center`}>
                {lightbox.type === "video" ? (
                  <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-sm">
                    <div className="w-0 h-0 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent border-l-[20px] border-l-white ml-2" />
                  </div>
                ) : (
                  <Image className="w-20 h-20 text-white/40" />
                )}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white text-xl font-bold">{lightbox.title}</h3>
                  <Badge variant="outline" className="text-white border-white/40 mt-2">
                    {lightbox.type === "video" ? "Video" : "Photo"}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="text-white hover:text-white/80" onClick={() => setLightbox(null)}>
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
