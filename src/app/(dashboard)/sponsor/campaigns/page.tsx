"use client";

import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Calendar, IndianRupee, TrendingUp } from "lucide-react";

const campaigns = [
  { id: "1", name: "Youth Athletics Sponsorship", status: "Active", budget: "₹5,00,000", spent: "₹3,20,000", start: "2026-06-01", end: "2026-12-31", progress: 64 },
  { id: "2", name: "School Cricket Program", status: "Active", budget: "₹3,00,000", spent: "₹1,80,000", start: "2026-07-01", end: "2026-11-30", progress: 60 },
  { id: "3", name: "Women in Sports Initiative", status: "Active", budget: "₹8,00,000", spent: "₹2,40,000", start: "2026-08-01", end: "2027-03-31", progress: 30 },
  { id: "4", name: "Rural Sports Development", status: "Completed", budget: "₹4,00,000", spent: "₹3,95,000", start: "2026-01-01", end: "2026-06-30", progress: 100 },
  { id: "5", name: "Swimming Excellence Fund", status: "Upcoming", budget: "₹2,50,000", spent: "₹0", start: "2026-09-01", end: "2027-02-28", progress: 0 },
];

const statusColors: Record<string, string> = {
  Active: "bg-green-500/10 text-green-600",
  Completed: "bg-gray-500/10 text-gray-500",
  Upcoming: "bg-blue-500/10 text-blue-500",
};

export default function SponsorCampaignsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader title="Campaign Management" subtitle="Create and manage your sponsorship campaigns." notificationCount={2} />

      <div className="flex items-center justify-end mb-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90" />}>
            <Plus className="w-4 h-4 mr-1" /> Create Campaign
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Campaign</DialogTitle>
              <DialogDescription>Start a new sponsorship campaign.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <Input placeholder="Campaign name" />
              <Input placeholder="Total budget (₹)" />
              <Input type="date" placeholder="Start date" />
              <Input type="date" placeholder="End date" />
              <Input placeholder="Description" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" onClick={() => setOpen(false)}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map((c) => (
          <Card key={c.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <Badge className={statusColors[c.status]}>{c.status}</Badge>
                <div className="text-right text-xs text-gray-500">
                  <Calendar className="w-3 h-3 inline mr-1" />{c.start} - {c.end}
                </div>
              </div>
              <h3 className="font-semibold mb-2">{c.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <IndianRupee className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-sm font-medium">{c.spent} / {c.budget}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] rounded-full transition-all" style={{ width: `${c.progress}%` }} />
              </div>
              <p className="text-xs text-gray-500 text-right">{c.progress}% utilized</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
