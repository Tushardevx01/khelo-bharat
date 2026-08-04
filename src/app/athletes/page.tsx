"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Trophy, Medal, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const athletes = [
  { id: "1", name: "Priya Sharma", sport: "Cricket", city: "Mumbai", state: "Maharashtra", ranking: 1, achievements: 15, avatar: null, level: "National" },
  { id: "2", name: "Arjun Patel", sport: "Football", city: "Delhi", state: "Delhi", ranking: 2, achievements: 12, avatar: null, level: "State" },
  { id: "3", name: "Sneha Reddy", sport: "Athletics", city: "Hyderabad", state: "Telangana", ranking: 3, achievements: 20, avatar: null, level: "National" },
  { id: "4", name: "Vikram Singh", sport: "Basketball", city: "Jaipur", state: "Rajasthan", ranking: 5, achievements: 8, avatar: null, level: "District" },
  { id: "5", name: "Ananya Nair", sport: "Swimming", city: "Kochi", state: "Kerala", ranking: 4, achievements: 18, avatar: null, level: "National" },
  { id: "6", name: "Rahul Verma", sport: "Tennis", city: "Chennai", state: "Tamil Nadu", ranking: 7, achievements: 10, avatar: null, level: "State" },
  { id: "7", name: "Kavya Iyer", sport: "Badminton", city: "Bangalore", state: "Karnataka", ranking: 6, achievements: 14, avatar: null, level: "National" },
  { id: "8", name: "Aditya Joshi", sport: "Hockey", city: "Bhopal", state: "Madhya Pradesh", ranking: 8, achievements: 9, avatar: null, level: "State" },
  { id: "9", name: "Meera Gupta", sport: "Cricket", city: "Kolkata", state: "West Bengal", ranking: 9, achievements: 11, avatar: null, level: "District" },
  { id: "10", name: "Karan Malhotra", sport: "Football", city: "Pune", state: "Maharashtra", ranking: 10, achievements: 7, avatar: null, level: "State" },
];

const sports = ["All", "Cricket", "Football", "Basketball", "Athletics", "Swimming", "Tennis", "Badminton", "Hockey"];

export default function AthletesPage() {
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState("All");

  const filtered = athletes.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.city.toLowerCase().includes(search.toLowerCase());
    const matchSport = selectedSport === "All" || a.sport === selectedSport;
    return matchSearch && matchSport;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent">Athletes</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Discover talented athletes from across India</p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search athletes by name or city..." className="pl-10 h-12 rounded-xl" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mb-8">
            {sports.map((sport) => (
              <Button key={sport} variant={selectedSport === sport ? "default" : "outline"} onClick={() => setSelectedSport(sport)} className={`rounded-full ${selectedSport === sport ? "bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" : ""}`}>
                {sport}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((athlete, i) => (
              <motion.div key={athlete.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                      {athlete.name.charAt(0)}
                    </div>
                    <h3 className="font-bold text-lg group-hover:text-[#FF6B35] transition-colors">{athlete.name}</h3>
                    <Badge variant="outline" className="mt-2 text-[#FF6B35] border-[#FF6B35]/30">{athlete.sport}</Badge>
                    <div className="flex items-center justify-center gap-1 mt-2 text-sm text-gray-500">
                      <MapPin className="w-3 h-3" /> {athlete.city}, {athlete.state}
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-lg font-bold text-[#FF6B35]">#{athlete.ranking}</p>
                        <p className="text-xs text-gray-500">Rank</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold">{athlete.achievements}</p>
                        <p className="text-xs text-gray-500">Achievements</p>
                      </div>
                      <div className="text-center">
                        <Badge className={athlete.level === "National" ? "bg-[#D72638]" : athlete.level === "State" ? "bg-[#FF6B35]" : "bg-gray-500"}>{athlete.level}</Badge>
                      </div>
                    </div>
                    <Button className="w-full mt-4 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] text-white" size="sm">
                      View Profile <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
