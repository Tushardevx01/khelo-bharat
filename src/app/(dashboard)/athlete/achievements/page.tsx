"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Plus, Calendar, Medal, Star, Award, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import DashboardHeader from "@/components/layout/DashboardHeader";

const initialAchievements = [
  { id: "1", title: "State Cricket Championship Winner", date: "2024-02-15", category: "Gold", description: "Led the team to victory in the state-level cricket championship, scoring 145 runs in the final match.", image: "" },
  { id: "2", title: "Best Bowler Award", date: "2024-01-20", category: "Special", description: "Awarded for taking 5 wickets in a single innings during the inter-district tournament.", image: "" },
  { id: "3", title: "National Youth Games - Silver Medal", date: "2023-11-10", category: "Silver", description: "Secured second place in the national youth cricket tournament representing Delhi.", image: "" },
  { id: "4", title: "School Sports Day Champion", date: "2023-09-05", category: "Bronze", description: "Won bronze in 100m sprint and gold in relay at annual school sports meet.", image: "" },
  { id: "5", title: "U-19 Inter-State Tournament", date: "2023-07-22", category: "Gold", description: "Top scorer of the tournament with 320 runs across 6 matches.", image: "" },
  { id: "6", title: "Fitness Excellence Award", date: "2023-05-10", category: "Special", description: "Recognized for maintaining peak physical fitness standards throughout the season.", image: "" },
];

const categories = ["Gold", "Silver", "Bronze", "Special"];

const categoryColors: Record<string, string> = {
  Gold: "bg-yellow-500",
  Silver: "bg-gray-400",
  Bronze: "bg-orange-600",
  Special: "bg-[#D72638]",
};

const categoryIcons: Record<string, React.ReactNode> = {
  Gold: <Trophy className="w-4 h-4" />,
  Silver: <Medal className="w-4 h-4" />,
  Bronze: <Award className="w-4 h-4" />,
  Special: <Star className="w-4 h-4" />,
};

export default function AthleteAchievementsPage() {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [filter, setFilter] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
    date: "",
    category: "Gold",
  });

  const filtered = filter === "All" ? achievements : achievements.filter((a) => a.category === filter);

  const handleAdd = () => {
    if (!newAchievement.title || !newAchievement.date) return;
    setAchievements((prev) => [
      {
        id: String(Date.now()),
        ...newAchievement,
        image: "",
      },
      ...prev,
    ]);
    setNewAchievement({ title: "", description: "", date: "", category: "Gold" });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashboardHeader title="Achievements" subtitle="Your accomplishments and milestones" notificationCount={0} />
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90" />}>
            <Plus className="w-4 h-4 mr-1" /> Add Achievement
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Achievement</DialogTitle>
              <DialogDescription>Record a new accomplishment or milestone.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={newAchievement.title}
                  onChange={(e) => setNewAchievement((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. State Championship Winner"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Describe your achievement..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={newAchievement.date}
                    onChange={(e) => setNewAchievement((p) => ({ ...p, date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    value={newAchievement.category}
                    onChange={(e) => setNewAchievement((p) => ({ ...p, category: e.target.value }))}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Image (optional)</Label>
                <div className="border-2 border-dashed rounded-xl p-4 text-center text-sm text-gray-400 hover:border-[#FF6B35] transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 mx-auto mb-1" />
                  Click to upload image
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd} className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">Add Achievement</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Badges */}
      <div className="flex gap-2 flex-wrap">
        {["All", ...categories].map((cat) => (
          <Button
            key={cat}
            variant={filter === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(cat)}
            className={filter === cat ? "bg-[#FF6B35] text-white" : ""}
          >
            {cat !== "All" && categoryIcons[cat]}
            {cat}
          </Button>
        ))}
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((achievement, i) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden h-full">
              <div className="h-40 bg-gradient-to-br from-[#FF6B35]/10 to-[#D72638]/10 flex items-center justify-center relative">
                <Trophy className="w-14 h-14 text-[#FF6B35]/30" />
                <Badge className={`absolute top-3 right-3 ${categoryColors[achievement.category]} text-white`}>
                  {achievement.category}
                </Badge>
              </div>
              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-2 group-hover:text-[#FF6B35] transition-colors">{achievement.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(achievement.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{achievement.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-500">No achievements found</h3>
          <p className="text-gray-400 mt-2">Add your first achievement to get started</p>
        </div>
      )}
    </div>
  );
}
