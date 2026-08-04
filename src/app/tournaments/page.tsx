"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Trophy, Users, Search, Filter, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const tournaments = [
  { id: "1", title: "National Cricket Championship 2024", sport: "Cricket", startDate: "2024-03-15", endDate: "2024-03-20", location: "Delhi", city: "New Delhi", state: "Delhi", format: "LEAGUE", maxParticipants: 16, prizePool: 500000, status: "REGISTRATION_OPEN", image: null, organizer: "Delhi Sports Council", registrations: 12 },
  { id: "2", title: "Inter-School Football Tournament", sport: "Football", startDate: "2024-04-01", endDate: "2024-04-05", location: "Mumbai", city: "Mumbai", state: "Maharashtra", format: "KNOCKOUT", maxParticipants: 32, prizePool: 200000, status: "UPCOMING", image: null, organizer: "Mumbai Schools Association", registrations: 24 },
  { id: "3", title: "State Basketball League", sport: "Basketball", startDate: "2024-04-10", endDate: "2024-04-15", location: "Bangalore", city: "Bangalore", state: "Karnataka", format: "GROUP", maxParticipants: 20, prizePool: 300000, status: "REGISTRATION_OPEN", image: null, organizer: "Karnataka Basketball Association", registrations: 18 },
  { id: "4", title: "Youth Athletics Meet", sport: "Athletics", startDate: "2024-04-20", endDate: "2024-04-22", location: "Chennai", city: "Chennai", state: "Tamil Nadu", format: "LEAGUE", maxParticipants: 100, prizePool: 150000, status: "UPCOMING", image: null, organizer: "Tamil Nadu Athletics Federation", registrations: 67 },
  { id: "5", title: "All India Swimming Championship", sport: "Swimming", startDate: "2024-05-01", endDate: "2024-05-03", location: "Hyderabad", city: "Hyderabad", state: "Telangana", format: "KNOCKOUT", maxParticipants: 50, prizePool: 400000, status: "UPCOMING", image: null, organizer: "Telangana Swimming Association", registrations: 35 },
  { id: "6", title: "School Cricket League - North Zone", sport: "Cricket", startDate: "2024-05-10", endDate: "2024-05-15", location: "Jaipur", city: "Jaipur", state: "Rajasthan", format: "MIXED", maxParticipants: 24, prizePool: 250000, status: "REGISTRATION_OPEN", image: null, organizer: "Rajasthan Cricket Association", registrations: 16 },
];

const sports = ["All", "Cricket", "Football", "Basketball", "Athletics", "Swimming", "Tennis", "Hockey"];
const statuses = ["All", "REGISTRATION_OPEN", "UPCOMING", "ONGOING", "COMPLETED"];

export default function TournamentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filtered = tournaments.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSport = selectedSport === "All" || t.sport === selectedSport;
    const matchStatus = selectedStatus === "All" || t.status === selectedStatus;
    return matchSearch && matchSport && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent">Tournaments</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Discover and register for sports tournaments across India</p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search tournaments..." className="pl-10 h-12 rounded-xl" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="flex gap-3 flex-wrap">
              {sports.slice(0, 5).map((sport) => (
                <Button key={sport} variant={selectedSport === sport ? "default" : "outline"} onClick={() => setSelectedSport(sport)} className={`rounded-full ${selectedSport === sport ? "bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" : ""}`}>
                  {sport}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tournament, i) => (
              <motion.div key={tournament.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-[#FF6B35]/10 to-[#D72638]/10 flex items-center justify-center relative">
                    <Trophy className="w-16 h-16 text-[#FF6B35]/30" />
                    <Badge className={`absolute top-4 right-4 ${tournament.status === "REGISTRATION_OPEN" ? "bg-green-500" : tournament.status === "UPCOMING" ? "bg-blue-500" : "bg-gray-500"}`}>
                      {tournament.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-3 text-[#FF6B35] border-[#FF6B35]/30">{tournament.sport}</Badge>
                    <h3 className="font-bold text-lg mb-3 group-hover:text-[#FF6B35] transition-colors">{tournament.title}</h3>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {tournament.startDate} to {tournament.endDate}</div>
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {tournament.city}, {tournament.state}</div>
                      <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {tournament.registrations}/{tournament.maxParticipants} registered</div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <span className="text-lg font-bold text-[#D72638]">₹{tournament.prizePool.toLocaleString("en-IN")}</span>
                      <Button size="sm" className="rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white">
                        Register <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
