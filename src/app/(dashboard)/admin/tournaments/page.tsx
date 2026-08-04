"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Eye, Trash2, MoreHorizontal, Trophy, Calendar, MapPin, Users, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardHeader from "@/components/layout/DashboardHeader";

const tournaments = [
  { id: "1", title: "National Cricket Championship 2024", sport: "Cricket", startDate: "2024-03-15", endDate: "2024-03-20", location: "New Delhi", format: "LEAGUE", maxParticipants: 16, prizePool: 500000, status: "REGISTRATION_OPEN", organizer: "Delhi Sports Council", registrations: 12 },
  { id: "2", title: "Inter-School Football Tournament", sport: "Football", startDate: "2024-04-01", endDate: "2024-04-05", location: "Mumbai", format: "KNOCKOUT", maxParticipants: 32, prizePool: 200000, status: "UPCOMING", organizer: "Mumbai Schools Association", registrations: 24 },
  { id: "3", title: "State Basketball League", sport: "Basketball", startDate: "2024-04-10", endDate: "2024-04-15", location: "Bangalore", format: "GROUP", maxParticipants: 20, prizePool: 300000, status: "REGISTRATION_OPEN", organizer: "Karnataka Basketball Association", registrations: 18 },
  { id: "4", title: "Youth Athletics Meet", sport: "Athletics", startDate: "2024-04-20", endDate: "2024-04-22", location: "Chennai", format: "LEAGUE", maxParticipants: 100, prizePool: 150000, status: "ONGOING", organizer: "Tamil Nadu Athletics Federation", registrations: 67 },
  { id: "5", title: "All India Swimming Championship", sport: "Swimming", startDate: "2024-05-01", endDate: "2024-05-03", location: "Hyderabad", format: "KNOCKOUT", maxParticipants: 50, prizePool: 400000, status: "UPCOMING", organizer: "Telangana Swimming Association", registrations: 35 },
  { id: "6", title: "School Cricket League - North Zone", sport: "Cricket", startDate: "2024-05-10", endDate: "2024-05-15", location: "Jaipur", format: "MIXED", maxParticipants: 24, prizePool: 250000, status: "REGISTRATION_OPEN", organizer: "Rajasthan Cricket Association", registrations: 16 },
  { id: "7", title: "National Tennis Open", sport: "Tennis", startDate: "2024-06-01", endDate: "2024-06-05", location: "Pune", format: "KNOCKOUT", maxParticipants: 64, prizePool: 600000, status: "COMPLETED", organizer: "Maharashtra Tennis Association", registrations: 64 },
  { id: "8", title: "State Hockey Championship", sport: "Hockey", startDate: "2024-06-10", endDate: "2024-06-15", location: "Bhopal", format: "GROUP", maxParticipants: 12, prizePool: 180000, status: "COMPLETED", organizer: "Madhya Pradesh Hockey Federation", registrations: 12 },
];

const ITEMS_PER_PAGE = 5;

export default function AdminTournamentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<typeof tournaments[0] | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const filtered = tournaments.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.sport.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = selectedStatus === "All" || t.status === selectedStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const statusColors: Record<string, string> = {
    REGISTRATION_OPEN: "bg-green-500",
    UPCOMING: "bg-blue-500",
    ONGOING: "bg-yellow-500",
    COMPLETED: "bg-gray-500",
  };

  return (
    <div className="space-y-6">
      <DashboardHeader title="Tournament Management" subtitle="Create and manage sports tournaments" notificationCount={3} />

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search tournaments..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex gap-3 items-center">
          <Select value={selectedStatus} onValueChange={(v) => v !== null && setSelectedStatus(v)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="REGISTRATION_OPEN">Registration Open</SelectItem>
              <SelectItem value="UPCOMING">Upcoming</SelectItem>
              <SelectItem value="ONGOING">Ongoing</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger render={<Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" />}>
              <Plus className="w-4 h-4 mr-1" /> Create Tournament
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Tournament</DialogTitle>
                <DialogDescription>Fill in the details to create a new tournament.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tournament Title</label>
                  <Input placeholder="Enter tournament title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sport</label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cricket">Cricket</SelectItem>
                        <SelectItem value="football">Football</SelectItem>
                        <SelectItem value="basketball">Basketball</SelectItem>
                        <SelectItem value="athletics">Athletics</SelectItem>
                        <SelectItem value="swimming">Swimming</SelectItem>
                        <SelectItem value="tennis">Tennis</SelectItem>
                        <SelectItem value="hockey">Hockey</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Format</label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="league">League</SelectItem>
                        <SelectItem value="knockout">Knockout</SelectItem>
                        <SelectItem value="group">Group</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input placeholder="Enter location" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max Participants</label>
                    <Input type="number" placeholder="e.g., 16" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prize Pool (₹)</label>
                    <Input type="number" placeholder="e.g., 500000" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" onClick={() => setIsCreateOpen(false)}>Create Tournament</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tournament</TableHead>
                <TableHead>Sport</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registrations</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((tournament) => (
                <TableRow key={tournament.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{tournament.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {tournament.location}</p>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline">{tournament.sport}</Badge></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      {tournament.startDate}
                    </div>
                  </TableCell>
                  <TableCell><Badge className={statusColors[tournament.status]}>{tournament.status.replace("_", " ")}</Badge></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm">{tournament.registrations}/{tournament.maxParticipants}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => { setSelectedTournament(tournament); setIsViewOpen(true); }}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => { setSelectedTournament(tournament); setIsDeleteOpen(true); }}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} tournaments
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page)} className={currentPage === page ? "bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" : ""}>
              {page}
            </Button>
          ))}
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedTournament?.title}</DialogTitle>
            <DialogDescription>Tournament Details</DialogDescription>
          </DialogHeader>
          {selectedTournament && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-muted-foreground">Sport</p>
                  <p className="font-medium">{selectedTournament.sport}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-muted-foreground">Format</p>
                  <p className="font-medium">{selectedTournament.format}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium">{selectedTournament.location}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-muted-foreground">Prize Pool</p>
                  <p className="font-medium">₹{selectedTournament.prizePool.toLocaleString("en-IN")}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-medium">{selectedTournament.startDate} to {selectedTournament.endDate}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-muted-foreground">Registrations</p>
                  <p className="font-medium">{selectedTournament.registrations}/{selectedTournament.maxParticipants}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Tournament</DialogTitle>
            <DialogDescription>Are you sure you want to delete &quot;{selectedTournament?.title}&quot;? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setIsDeleteOpen(false)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
