"use client";

import { useState } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Check, X, Clock } from "lucide-react";

const sponsorships = [
  { id: "1", name: "Arjun Mehta", type: "Athlete", amount: "₹50,000", status: "Pending", date: "2026-08-01" },
  { id: "2", name: "Delhi Public School", type: "School", amount: "₹2,00,000", status: "Approved", date: "2026-07-28" },
  { id: "3", name: "Priya Sharma", type: "Athlete", amount: "₹75,000", status: "Approved", date: "2026-07-25" },
  { id: "4", name: "Bishop Cotton School", type: "School", amount: "₹1,50,000", status: "Rejected", date: "2026-07-20" },
  { id: "5", name: "Sneha Patel", type: "Athlete", amount: "₹1,00,000", status: "Pending", date: "2026-08-02" },
  { id: "6", name: "St. Xavier's Academy", type: "School", amount: "₹3,00,000", status: "Pending", date: "2026-08-03" },
  { id: "7", name: "Vikram Singh", type: "Athlete", amount: "₹40,000", status: "Approved", date: "2026-07-15" },
];

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500/10 text-yellow-600",
  Approved: "bg-green-500/10 text-green-600",
  Rejected: "bg-red-500/10 text-red-500",
};

export default function SponsorSponsorshipsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader title="Sponsorship Requests" subtitle="Manage sponsorship requests and approvals." notificationCount={4} />

      <div className="flex items-center justify-end mb-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90" />}>
            <Plus className="w-4 h-4 mr-1" /> New Request
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>New Sponsorship Request</DialogTitle>
              <DialogDescription>Create a new sponsorship request.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <Input placeholder="Athlete or School name" />
              <Input placeholder="Type (Athlete/School)" />
              <Input placeholder="Amount (₹)" />
              <Input placeholder="Description" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" onClick={() => setOpen(false)}>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Athlete / School</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sponsorships.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell><Badge variant="outline">{s.type}</Badge></TableCell>
                  <TableCell className="font-medium">{s.amount}</TableCell>
                  <TableCell><Badge className={statusColors[s.status]}>{s.status}</Badge></TableCell>
                  <TableCell className="text-gray-500">{s.date}</TableCell>
                  <TableCell className="text-right">
                    {s.status === "Pending" ? (
                      <div className="flex items-center gap-1 justify-end">
                        <Button variant="ghost" size="icon-sm" className="text-green-600 hover:text-green-700">
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="text-red-500 hover:text-red-600">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" /> {s.status === "Approved" ? "Completed" : "Closed"}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
