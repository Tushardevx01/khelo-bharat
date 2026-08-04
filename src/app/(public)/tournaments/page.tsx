"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trophy, Calendar, MapPin, Users, Filter, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const MOCK_TOURNAMENTS = [
  {
    _id: "t1",
    slug: "khelo-india-cricket-2026",
    name: "Khelo India Cricket Championship 2026",
    description: "National level cricket tournament for under-17 athletes across all states.",
    sport: "Cricket",
    city: "Mumbai",
    state: "Maharashtra",
    startDate: "2026-09-15",
    status: "UPCOMING",
    participants: 256,
  },
  {
    _id: "t2",
    slug: "delhi-football-league",
    name: "Delhi Football League",
    description: "Inter-school football league featuring teams from Delhi NCR region.",
    sport: "Football",
    city: "New Delhi",
    state: "Delhi",
    startDate: "2026-08-20",
    status: "ONGOING",
    participants: 128,
  },
  {
    _id: "t3",
    slug: "bangalore-basketball-open",
    name: "Bangalore Basketball Open",
    description: "Open basketball tournament for college and university teams.",
    sport: "Basketball",
    city: "Bangalore",
    state: "Karnataka",
    startDate: "2026-07-10",
    status: "COMPLETED",
    participants: 64,
  },
  {
    _id: "t4",
    slug: "chennai-swimming-meet",
    name: "Chennai Swimming Grand Prix",
    description: "Annual swimming meet with events across multiple age categories.",
    sport: "Swimming",
    city: "Chennai",
    state: "Tamil Nadu",
    startDate: "2026-10-05",
    status: "UPCOMING",
    participants: 192,
  },
  {
    _id: "t5",
    slug: "kolkata-athletics-cup",
    name: "Kolkata Athletics Cup",
    description: "State-level athletics competition covering track and field events.",
    sport: "Athletics",
    city: "Kolkata",
    state: "West Bengal",
    startDate: "2026-08-01",
    status: "ONGOING",
    participants: 320,
  },
  {
    _id: "t6",
    slug: "hyderabad-badminton-series",
    name: "Hyderabad Badminton Series",
    description: "Professional badminton series with top junior players from South India.",
    sport: "Badminton",
    city: "Hyderabad",
    state: "Telangana",
    startDate: "2026-06-15",
    status: "COMPLETED",
    participants: 96,
  },
];

const SPORTS = [
  "All Sports",
  "Cricket",
  "Football",
  "Basketball",
  "Athletics",
  "Swimming",
  "Badminton",
  "Tennis",
  "Hockey",
  "Volleyball",
] as const;

const STATUS_COLORS: Record<string, string> = {
  UPCOMING: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
  ONGOING: "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400",
  COMPLETED: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

export default function TournamentsPage() {
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState("All Sports");

  const tournaments = MOCK_TOURNAMENTS;

  const filtered = useMemo(() => {
    return tournaments.filter((t) => {
      const name = t.name ?? "";
      const sport = t.sport ?? "";
      const city = t.city ?? "";
      const matchesSearch =
        name.toLowerCase().includes(search.toLowerCase()) ||
        sport.toLowerCase().includes(search.toLowerCase()) ||
        city.toLowerCase().includes(search.toLowerCase());
      const matchesSport = selectedSport === "All Sports" || sport === selectedSport;
      return matchesSearch && matchesSport;
    });
  }, [tournaments, search, selectedSport]);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-white/80 mb-6">
                <Trophy className="w-4 h-4 text-[#FF6B35]" />
                Tournaments
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Discover{" "}
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent">
                  Tournaments
                </span>
              </h1>
              <p className="text-lg text-white/60 max-w-3xl mx-auto">
                Find and register for sports tournaments happening across India. From local
                school events to national championships.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tournaments by name, sport, or city..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35] transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="h-10 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35] transition-all"
                >
                  {SPORTS.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
                  <Trophy className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No tournaments found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  Try adjusting your search or filter to find what you&apos;re looking for.
                </p>
              </motion.div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map((tournament, i) => (
                    <motion.div
                      key={tournament._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05 }}
                      layout
                    >
                      <Link href={`/tournaments/${tournament.slug}`}>
                        <Card className="h-full hover:shadow-lg hover:shadow-[#FF6B35]/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                          <CardHeader>
                            <div className="flex items-start justify-between mb-2">
                              <Badge
                                variant="secondary"
                                className={STATUS_COLORS[tournament.status]}
                              >
                                {tournament.status}
                              </Badge>
                              <Badge variant="outline" className="text-[#FF6B35] border-[#FF6B35]/30">
                                {tournament.sport}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg group-hover:text-[#FF6B35] transition-colors">
                              {tournament.name}
                            </CardTitle>
                            <CardDescription>{tournament.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#FF6B35]" />
                                <span>
                                  {tournament.startDate
                                    ? new Date(tournament.startDate).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      })
                                    : "TBA"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#D72638]" />
                                <span>
                                  {[tournament.city, tournament.state]
                                    .filter(Boolean)
                                    .join(", ") || "TBA"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-[#FF6B35]" />
                                <span>{tournament.participants} participants</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
