"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Trophy } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const initialSports = [
  { id: 1, name: "Cricket", icon: "🏏", athletes: 120 },
  { id: 2, name: "Football", icon: "⚽", athletes: 95 },
  { id: 3, name: "Basketball", icon: "🏀", athletes: 45 },
  { id: 4, name: "Athletics", icon: "🏃", athletes: 80 },
  { id: 5, name: "Swimming", icon: "🏊", athletes: 55 },
  { id: 6, name: "Tennis", icon: "🎾", athletes: 35 },
  { id: 7, name: "Hockey", icon: "🏑", athletes: 60 },
  { id: 8, name: "Badminton", icon: "🏸", athletes: 40 },
];

export default function SportsPage() {
  const [sports, setSports] = useState(initialSports);
  const [addOpen, setAddOpen] = useState(false);
  const [editSport, setEditSport] = useState<typeof initialSports[0] | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("");

  const handleAdd = () => {
    if (newName && newIcon) {
      setSports([...sports, { id: Date.now(), name: newName, icon: newIcon, athletes: 0 }]);
      setNewName("");
      setNewIcon("");
      setAddOpen(false);
    }
  };

  const handleEdit = () => {
    if (editSport && newName) {
      setSports(sports.map((s) => (s.id === editSport.id ? { ...s, name: newName, icon: newIcon || s.icon } : s)));
      setEditSport(null);
      setNewName("");
      setNewIcon("");
    }
  };

  const handleDelete = () => {
    if (deleteId) {
      setSports(sports.filter((s) => s.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Sports Management" subtitle="Manage sports categories" notificationCount={0} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Sports</CardTitle>
              <Button
                style={{ backgroundColor: "#FF6B35", color: "white" }}
                onClick={() => { setNewName(""); setNewIcon(""); setAddOpen(true); }}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Sport
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sports.map((sport, i) => (
                <motion.div
                  key={sport.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="hover:ring-2 transition-all" style={{ ["--tw-ring-color" as string]: "#FF6B35" }}>
                    <CardContent className="flex flex-col items-center py-6 gap-3">
                      <span className="text-4xl">{sport.icon}</span>
                      <h3 className="font-semibold text-lg">{sport.name}</h3>
                      <p className="text-muted-foreground text-sm">{sport.athletes} Athletes</p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => { setEditSport(sport); setNewName(sport.name); setNewIcon(sport.icon); }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" onClick={() => setDeleteId(sport.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Sport</DialogTitle>
            <DialogDescription>Create a new sport category</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Sport name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <Input placeholder="Icon (emoji)" value={newIcon} onChange={(e) => setNewIcon(e.target.value)} />
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button style={{ backgroundColor: "#FF6B35", color: "white" }} onClick={handleAdd}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editSport} onOpenChange={() => setEditSport(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Sport</DialogTitle>
            <DialogDescription>Update sport details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Sport name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <Input placeholder="Icon (emoji)" value={newIcon} onChange={(e) => setNewIcon(e.target.value)} />
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button style={{ backgroundColor: "#FF6B35", color: "white" }} onClick={handleEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Sport</DialogTitle>
            <DialogDescription>Are you sure? This will remove the sport and cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
