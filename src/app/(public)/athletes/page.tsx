"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, MapPin, Trophy, Filter, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const MOCK_ATHLETES = [
  {
    _id: "a1",
    slug: "arjun-sharma",
    name: "Arjun Sharma",
    sport: "Cricket",
    city: "Mumbai",
    school: "Delhi Public School",
  },
  {
    _id: "a2",
    slug: "priya-verma",
    name: "Priya Verma",
    sport: "Athletics",
    city: "New Delhi",
    school: "Kendriya Vidyalaya",
  },
  {
    _id: "a3",
    slug: "rahul-patel",
    name: "Rahul Patel",
    sport: "Football",
    city: "Ahmedabad",
    school: "St. Xavier's School",
  },
  {
    _id: "a4",
    slug: "ananya-nair",
    name: "Ananya Nair",
    sport: "Badminton",
    city: "Kochi",
    school: "Loyola School",
  },
  {
    _id: "a5",
    slug: "vikram-singh",
    name: "Vikram Singh",
    sport: "Basketball",
    city: "Jaipur",
    school: "Mayo College",
  },
  {
    _id: "a6",
    slug: "meera-rao",
    name: "Meera Rao",
    sport: "Swimming",
    city: "Bangalore",
    school: "The Lawrence School",
  },
  {
    _id: "a7",
    slug: "kabir-das",
    name: "Kabir Das",
    sport: "Tennis",
    city: "Chennai",
    school: "Bishop Cotton School",
  },
  {
    _id: "a8",
    slug: "sneha-iyer",
    name: "Sneha Iyer",
    sport: "Hockey",
    city: "Hyderabad",
    school: "Osmania School",
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

export default function AthletesPage() {
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState("All Sports");

  const athletes = MOCK_ATHLETES;

  const filtered = useMemo(() => {
    return athletes.filter((a) => {
      const name = a.name ?? "";
      const sport = a.sport ?? "";
      const city = a.city ?? "";
      const school = a.school ?? "";
      const matchesSearch =
        name.toLowerCase().includes(search.toLowerCase()) ||
        sport.toLowerCase().includes(search.toLowerCase()) ||
        city.toLowerCase().includes(search.toLowerCase()) ||
        school.toLowerCase().includes(search.toLowerCase());
      const matchesSport = selectedSport === "All Sports" || sport === selectedSport;
      return matchesSearch && matchesSport;
    });
  }, [athletes, search, selectedSport]);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-white/80 mb-6">
                <User className="w-4 h-4 text-[#FF6B35]" />
                Athletes
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent">
                  Athletes
                </span>
              </h1>
              <p className="text-lg text-white/60 max-w-3xl mx-auto">
                Meet talented athletes from across India. Discover rising stars and track their
                achievements across multiple sports.
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
                  placeholder="Search athletes by name, sport, school, or city..."
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
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No athletes found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  Try adjusting your search or filter to find what you&apos;re looking for.
                </p>
              </motion.div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map((athlete, i) => (
                    <motion.div
                      key={athlete._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05 }}
                      layout
                    >
                      <Link href={`/athletes/${athlete.slug}`}>
                        <Card className="h-full hover:shadow-lg hover:shadow-[#FF6B35]/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer group text-center">
                          <CardHeader>
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center mx-auto mb-3 text-white text-xl font-bold">
                              {athlete.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <CardTitle className="text-lg group-hover:text-[#FF6B35] transition-colors">
                              {athlete.name}
                            </CardTitle>
                            <CardDescription className="flex items-center justify-center gap-2">
                              <Badge variant="outline" className="text-[#FF6B35] border-[#FF6B35]/30">
                                {athlete.sport}
                              </Badge>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                              {athlete.school && (
                                <div className="flex items-center justify-center gap-2">
                                  <Trophy className="w-4 h-4 text-[#D72638]" />
                                  <span>{athlete.school}</span>
                                </div>
                              )}
                              {athlete.city && (
                                <div className="flex items-center justify-center gap-2">
                                  <MapPin className="w-4 h-4 text-[#FF6B35]" />
                                  <span>{athlete.city}</span>
                                </div>
                              )}
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
