"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Trophy, Calendar, MapPin, Users, ChevronRight, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/layout/DashboardHeader";

const allTournaments = [
  { id: "1", title: "National Cricket Championship 2024", sport: "Cricket", startDate: "2024-03-15", endDate: "2024-03-20", location: "New Delhi", format: "LEAGUE", maxParticipants: 16, prizePool: 500000, status: "REGISTRATION_OPEN", registrations: 12, saved: false },
  { id: "2", title: "Inter-School Football Tournament", sport: "Football", startDate: "2024-04-01", endDate: "2024-04-05", location: "Mumbai", format: "KNOCKOUT", maxParticipants: 32, prizePool: 200000, status: "UPCOMING", registrations: 24, saved: true },
  { id: "3", title: "State Basketball League", sport: "Basketball", startDate: "2024-04-10", endDate: "2024-04-15", location: "Bangalore", format: "GROUP", maxParticipants: 20, prizePool: 300000, status: "REGISTRATION_OPEN", registrations: 18, saved: false },
  { id: "4", title: "Youth Athletics Meet", sport: "Athletics", startDate: "2024-04-20", endDate: "2024-04-22", location: "Chennai", format: "LEAGUE", maxParticipants: 100, prizePool: 150000, status: "UPCOMING", registrations: 67, saved: true },
  { id: "5", title: "All India Swimming Championship", sport: "Swimming", startDate: "2024-05-01", endDate: "2024-05-03", location: "Hyderabad", format: "KNOCKOUT", maxParticipants: 50, prizePool: 400000, status: "UPCOMING", registrations: 35, saved: false },
  { id: "6", title: "School Cricket League - North Zone", sport: "Cricket", startDate: "2024-05-10", endDate: "2024-05-15", location: "Jaipur", format: "MIXED", maxParticipants: 24, prizePool: 250000, status: "REGISTRATION_OPEN", registrations: 16, saved: false },
];

const sports = ["All", "Cricket", "Football", "Basketball", "Athletics", "Swimming", "Tennis", "Hockey"];
const locations = ["All", "New Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Jaipur"];
const statuses = ["All", "REGISTRATION_OPEN", "UPCOMING", "ONGOING", "COMPLETED"];

export default function AthleteTournamentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [tournaments, setTournaments] = useState(allTournaments);

  const toggleSave = (id: string) => {
    setTournaments((prev) => prev.map((t) => (t.id === id ? { ...t, saved: !t.saved } : t)));
  };

  const filtered = tournaments.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSport = selectedSport === "All" || t.sport === selectedSport;
    const matchLocation = selectedLocation === "All" || t.location === selectedLocation;
    const matchStatus = selectedStatus === "All" || t.status === selectedStatus;
    return matchSearch && matchSport && matchLocation && matchStatus;
  });

  const savedTournaments = tournaments.filter((t) => t.saved);

  const statusColors: Record<string, string> = {
    REGISTRATION_OPEN: "bg-green-500",
    UPCOMING: "bg-blue-500",
    ONGOING: "bg-yellow-500",
    COMPLETED: "bg-gray-500",
  };

  return (
    <div className="space-y-6">
      <DashboardHeader title="Discover Tournaments" subtitle="Find and register for tournaments" notificationCount={2} />

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Tournaments</TabsTrigger>
          <TabsTrigger value="saved">Saved ({savedTournaments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search tournaments..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="flex gap-3 flex-wrap">
              <Select value={selectedSport} onValueChange={(v) => v !== null && setSelectedSport(v)}>
                <SelectTrigger className="w-32"><SelectValue placeholder="Sport" /></SelectTrigger>
                <SelectContent>{sports.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={(v) => v !== null && setSelectedLocation(v)}>
                <SelectTrigger className="w-36"><SelectValue placeholder="Location" /></SelectTrigger>
                <SelectContent>{locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={(v) => v !== null && setSelectedStatus(v)}>
                <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>{statuses.map((s) => <SelectItem key={s} value={s}>{s === "All" ? "All Status" : s.replace("_", " ")}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tournament, i) => (
              <motion.div key={tournament.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-[#FF6B35]/10 to-[#D72638]/10 flex items-center justify-center relative">
                    <Trophy className="w-14 h-14 text-[#FF6B35]/30" />
                    <Badge className={`absolute top-3 right-3 ${statusColors[tournament.status]}`}>{tournament.status.replace("_", " ")}</Badge>
                    <Button variant="ghost" size="icon-sm" className="absolute top-3 left-3" onClick={() => toggleSave(tournament.id)}>
                      {tournament.saved ? <BookmarkCheck className="w-5 h-5 text-[#FF6B35] fill-[#FF6B35]" /> : <Bookmark className="w-5 h-5" />}
                    </Button>
                  </div>
                  <CardContent className="p-5">
                    <Badge variant="outline" className="mb-2 text-[#FF6B35] border-[#FF6B35]/30">{tournament.sport}</Badge>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#FF6B35] transition-colors">{tournament.title}</h3>
                    <div className="space-y-1.5 text-sm text-gray-500">
                      <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {tournament.startDate} to {tournament.endDate}</div>
                      <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {tournament.location}</div>
                      <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5" /> {tournament.registrations}/{tournament.maxParticipants} registered</div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                      <span className="font-bold text-[#D72638]">₹{tournament.prizePool.toLocaleString("en-IN")}</span>
                      {tournament.status === "REGISTRATION_OPEN" ? (
                        <Button size="sm" className="rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">Register <ChevronRight className="w-4 h-4 ml-1" /></Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled>Coming Soon</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500">No tournaments found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          {savedTournaments.length === 0 ? (
            <div className="text-center py-20">
              <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500">No saved tournaments</h3>
              <p className="text-gray-400 mt-2">Bookmark tournaments to view them here later</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedTournaments.map((tournament, i) => (
                <motion.div key={tournament.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                    <div className="h-40 bg-gradient-to-br from-[#FF6B35]/10 to-[#D72638]/10 flex items-center justify-center relative">
                      <Trophy className="w-14 h-14 text-[#FF6B35]/30" />
                      <Badge className={`absolute top-3 right-3 ${statusColors[tournament.status]}`}>{tournament.status.replace("_", " ")}</Badge>
                    </div>
                    <CardContent className="p-5">
                      <Badge variant="outline" className="mb-2 text-[#FF6B35] border-[#FF6B35]/30">{tournament.sport}</Badge>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-[#FF6B35] transition-colors">{tournament.title}</h3>
                      <div className="space-y-1.5 text-sm text-gray-500">
                        <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {tournament.startDate} to {tournament.endDate}</div>
                        <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {tournament.location}</div>
                        <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5" /> {tournament.registrations}/{tournament.maxParticipants} registered</div>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t">
                        <span className="font-bold text-[#D72638]">₹{tournament.prizePool.toLocaleString("en-IN")}</span>
                        {tournament.status === "REGISTRATION_OPEN" ? (
                          <Button size="sm" className="rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">Register <ChevronRight className="w-4 h-4 ml-1" /></Button>
                        ) : (
                          <Button size="sm" variant="outline" disabled>Coming Soon</Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
