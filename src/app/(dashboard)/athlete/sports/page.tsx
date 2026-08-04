"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Plus, Award, Target, TrendingUp, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const initialSports = [
  { id: "1", name: "Cricket", level: "State Level", achievements: 12, hoursPerWeek: 15, coach: "Rajesh Kumar", since: "2016", icon: "🏏" },
  { id: "2", name: "Football", level: "District Level", achievements: 5, hoursPerWeek: 8, coach: "Amit Singh", since: "2019", icon: "⚽" },
  { id: "3", name: "Athletics", level: "School Level", achievements: 8, hoursPerWeek: 6, coach: "Priya Verma", since: "2020", icon: "🏃" },
  { id: "4", name: "Swimming", level: "Club Level", achievements: 3, hoursPerWeek: 4, coach: "Sanjay Mehta", since: "2021", icon: "🏊" },
];

const stats = [
  { label: "Total Sports", value: "4", icon: Activity, color: "#FF6B35" },
  { label: "Total Achievements", value: "28", icon: Trophy, color: "#D72638" },
  { label: "Training Hours/Week", value: "33", icon: Target, color: "#FF6B35" },
  { label: "Avg Level", value: "State", icon: TrendingUp, color: "#D72638" },
];

const levels = ["School Level", "District Level", "State Level", "National Level", "Club Level"];

export default function AthleteSportsPage() {
  const [sports, setSports] = useState(initialSports);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newSport, setNewSport] = useState({ name: "", level: "School Level", coach: "", since: "" });

  const handleAdd = () => {
    if (!newSport.name) return;
    setSports((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: newSport.name,
        level: newSport.level,
        achievements: 0,
        hoursPerWeek: 0,
        coach: newSport.coach,
        since: newSport.since || "2024",
        icon: "🏅",
      },
    ]);
    setNewSport({ name: "", level: "School Level", coach: "", since: "" });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <DashboardHeader title="My Sports" subtitle="Sports you participate in" notificationCount={0} />
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90" />}>
            <Plus className="w-4 h-4 mr-1" /> Add Sport
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Sport</DialogTitle>
              <DialogDescription>Add a new sport to your profile.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Sport Name</Label>
                <Input
                  value={newSport.name}
                  onChange={(e) => setNewSport((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Tennis"
                />
              </div>
              <div className="space-y-2">
                <Label>Level</Label>
                <select
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  value={newSport.level}
                  onChange={(e) => setNewSport((p) => ({ ...p, level: e.target.value }))}
                >
                  {levels.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Coach</Label>
                  <Input
                    value={newSport.coach}
                    onChange={(e) => setNewSport((p) => ({ ...p, coach: e.target.value }))}
                    placeholder="Coach name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Since (Year)</Label>
                  <Input
                    type="number"
                    value={newSport.since}
                    onChange={(e) => setNewSport((p) => ({ ...p, since: e.target.value }))}
                    placeholder="2020"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd} className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">Add Sport</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${stat.color}15` }}>
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Sports List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sports.map((sport, i) => (
          <motion.div
            key={sport.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{sport.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl group-hover:text-[#FF6B35] transition-colors">{sport.name}</h3>
                      <Badge variant="outline" className="text-[#FF6B35] border-[#FF6B35]/30">{sport.level}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Coach: {sport.coach} • Since {sport.since}</p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-gradient-to-br from-[#FF6B35]/10 to-[#D72638]/10 rounded-xl p-3 text-center">
                        <Trophy className="w-5 h-5 text-[#FF6B35] mx-auto mb-1" />
                        <p className="text-2xl font-bold">{sport.achievements}</p>
                        <p className="text-xs text-gray-500">Achievements</p>
                      </div>
                      <div className="bg-gradient-to-br from-[#D72638]/10 to-[#FF6B35]/10 rounded-xl p-3 text-center">
                        <Target className="w-5 h-5 text-[#D72638] mx-auto mb-1" />
                        <p className="text-2xl font-bold">{sport.hoursPerWeek}</p>
                        <p className="text-xs text-gray-500">Hrs/Week</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {sports.length === 0 && (
        <div className="text-center py-20">
          <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-500">No sports added yet</h3>
          <p className="text-gray-400 mt-2">Add your first sport to get started</p>
        </div>
      )}
    </div>
  );
}
