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
import { Plus, Award, Download, FileText } from "lucide-react";

const certificates = [
  { id: "1", name: "Sports Excellence Certificate", recipient: "Arjun Mehta", type: "Achievement", date: "2026-08-01", status: "Generated" },
  { id: "2", name: "Best Athlete Award", recipient: "Sneha Patel", type: "Award", date: "2026-07-28", status: "Generated" },
  { id: "3", name: "Tournament Winner Certificate", recipient: "Priya Sharma", type: "Tournament", date: "2026-07-25", status: "Generated" },
  { id: "4", name: "Participation Certificate", recipient: "Rohan Verma", type: "Participation", date: "2026-07-20", status: "Generated" },
  { id: "5", name: "Coaching Excellence Award", recipient: "Coach Rajesh Kumar", type: "Award", date: "2026-08-02", status: "Pending" },
];

const typeColors: Record<string, string> = {
  Achievement: "bg-[#FF6B35]/10 text-[#FF6B35]",
  Award: "bg-yellow-500/10 text-yellow-600",
  Tournament: "bg-blue-500/10 text-blue-500",
  Participation: "bg-green-500/10 text-green-600",
};

export default function SchoolCertificatesPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader title="Certificates" subtitle="Generate and manage certificates." notificationCount={0} />

      <div className="flex items-center justify-end mb-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white hover:opacity-90" />}>
            <Plus className="w-4 h-4 mr-1" /> Generate Certificate
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Generate Certificate</DialogTitle>
              <DialogDescription>Create a new certificate.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <Input placeholder="Certificate name" />
              <Input placeholder="Recipient name" />
              <Input placeholder="Type (Achievement/Award/Tournament)" />
              <Input type="date" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" onClick={() => setOpen(false)}>Generate</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certificate</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#FF6B35]" />
                      <span className="font-medium">{c.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{c.recipient}</TableCell>
                  <TableCell><Badge className={typeColors[c.type]}>{c.type}</Badge></TableCell>
                  <TableCell className="text-gray-500">{c.date}</TableCell>
                  <TableCell>
                    <Badge variant={c.status === "Generated" ? "default" : "secondary"}>{c.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-1" /> Download
                    </Button>
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
