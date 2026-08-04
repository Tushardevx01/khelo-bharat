"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, School, MapPin, Users, Trophy, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const MOCK_SCHOOLS = [
  {
    _id: "s1",
    slug: "delhi-public-school",
    name: "Delhi Public School",
    city: "New Delhi",
    state: "Delhi",
    sport: "Cricket",
    students: 2400,
    tournaments: 18,
  },
  {
    _id: "s2",
    slug: "kendriya-vidyalaya",
    name: "Kendriya Vidyalaya",
    city: "Mumbai",
    state: "Maharashtra",
    sport: "Athletics",
    students: 3200,
    tournaments: 24,
  },
  {
    _id: "s3",
    slug: "st-xaviers-school",
    name: "St. Xavier's School",
    city: "Kolkata",
    state: "West Bengal",
    sport: "Football",
    students: 1800,
    tournaments: 12,
  },
  {
    _id: "s4",
    slug: "loyola-school",
    name: "Loyola School",
    city: "Chennai",
    state: "Tamil Nadu",
    sport: "Badminton",
    students: 1500,
    tournaments: 15,
  },
  {
    _id: "s5",
    slug: "mayo-college",
    name: "Mayo College",
    city: "Jaipur",
    state: "Rajasthan",
    sport: "Basketball",
    students: 1200,
    tournaments: 10,
  },
  {
    _id: "s6",
    slug: "bishop-cotton-school",
    name: "Bishop Cotton School",
    city: "Bangalore",
    state: "Karnataka",
    sport: "Swimming",
    students: 2100,
    tournaments: 20,
  },
];

export default function SchoolsPage() {
  const [search, setSearch] = useState("");

  const schools = MOCK_SCHOOLS;

  const filtered = useMemo(() => {
    return schools.filter((s) => {
      const name = s.name ?? "";
      const city = s.city ?? "";
      const state = s.state ?? "";
      const sport = s.sport ?? "";
      const matchesSearch =
        name.toLowerCase().includes(search.toLowerCase()) ||
        city.toLowerCase().includes(search.toLowerCase()) ||
        state.toLowerCase().includes(search.toLowerCase()) ||
        sport.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [schools, search]);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-white/80 mb-6">
                <School className="w-4 h-4 text-[#FF6B35]" />
                Schools
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Partner{" "}
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent">
                  Schools
                </span>
              </h1>
              <p className="text-lg text-white/60 max-w-3xl mx-auto">
                Explore schools across India that are part of the Khelo Bharat ecosystem. Find
                institutions nurturing the next generation of champions.
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
              className="mb-8"
            >
              <div className="relative max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search schools by name, city, state, or sport..."
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
            </motion.div>

            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
                  <School className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No schools found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  Try adjusting your search to find what you&apos;re looking for.
                </p>
              </motion.div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map((school, i) => (
                    <motion.div
                      key={school._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05 }}
                      layout
                    >
                      <Link href={`/schools/${school.slug}`}>
                        <Card className="h-full hover:shadow-lg hover:shadow-[#FF6B35]/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                          <CardHeader>
                            <div className="flex items-center gap-4 mb-2">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D72638] flex items-center justify-center shrink-0 text-white font-bold text-lg">
                                {school.name.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                <CardTitle className="text-lg group-hover:text-[#FF6B35] transition-colors truncate">
                                  {school.name}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {[school.city, school.state].filter(Boolean).join(", ") || "India"}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {school.sport && (
                                <Badge variant="outline" className="text-[#FF6B35] border-[#FF6B35]/30">
                                  {school.sport}
                                </Badge>
                              )}
                              <div className="grid grid-cols-2 gap-3">
                                {school.students !== undefined && (
                                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <Users className="w-4 h-4 text-[#FF6B35]" />
                                    <span>{school.students} students</span>
                                  </div>
                                )}
                                {school.tournaments !== undefined && (
                                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <Trophy className="w-4 h-4 text-[#D72638]" />
                                    <span>{school.tournaments} events</span>
                                  </div>
                                )}
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
