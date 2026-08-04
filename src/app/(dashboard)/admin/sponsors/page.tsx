"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Pencil, Handshake } from "lucide-react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const mockSponsors = [
  { id: 1, company: "Tata Sports", industry: "Conglomerate", budget: "₹50L", campaigns: 3 },
  { id: 2, company: "Adidas India", industry: "Sportswear", budget: "₹1Cr", campaigns: 5 },
  { id: 3, company: "JSW Group", industry: "Infrastructure", budget: "₹75L", campaigns: 2 },
  { id: 4, company: "Amul", industry: "FMCG", budget: "₹30L", campaigns: 4 },
  { id: 5, company: "Hero MotoCorp", industry: "Automobile", budget: "₹60L", campaigns: 3 },
];

const stats = [
  { label: "Total Sponsors", value: 5, icon: Handshake, color: "#FF6B35" },
  { label: "Total Budget", value: "₹3.15Cr", color: "#D72638" },
  { label: "Active Campaigns", value: 17, color: "#FF6B35" },
  { label: "Industries", value: 5, color: "#D72638" },
];

export default function SponsorsPage() {
  const [search, setSearch] = useState("");
  const [viewSponsor, setViewSponsor] = useState<typeof mockSponsors[0] | null>(null);

  const filtered = mockSponsors.filter((s) =>
    s.company.toLowerCase().includes(search.toLowerCase()) || s.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Sponsor Management" subtitle="Manage platform sponsors" notificationCount={0} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardContent className="flex items-center gap-4 py-4">
                {s.icon && (
                  <div className="p-3 rounded-xl" style={{ backgroundColor: `${s.color}15` }}>
                    <s.icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                )}
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle>Sponsors</CardTitle>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search sponsors..." className="pl-9 w-56" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Active Campaigns</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((sponsor) => (
                  <TableRow key={sponsor.id}>
                    <TableCell className="font-medium">{sponsor.company}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{sponsor.industry}</Badge>
                    </TableCell>
                    <TableCell className="font-bold" style={{ color: "#FF6B35" }}>{sponsor.budget}</TableCell>
                    <TableCell>{sponsor.campaigns}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" onClick={() => setViewSponsor(sponsor)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon-sm">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={!!viewSponsor} onOpenChange={() => setViewSponsor(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sponsor Details</DialogTitle>
            <DialogDescription>Viewing sponsor information</DialogDescription>
          </DialogHeader>
          {viewSponsor && (
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-muted-foreground">Company</span><span className="font-medium">{viewSponsor.company}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Industry</span><Badge variant="outline">{viewSponsor.industry}</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Budget</span><span className="font-bold" style={{ color: "#FF6B35" }}>{viewSponsor.budget}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Campaigns</span><span className="font-medium">{viewSponsor.campaigns}</span></div>
            </div>
          )}
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
