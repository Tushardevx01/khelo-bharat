"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Users, Trophy, GraduationCap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const schools = [
  { id: "1", name: "Delhi Public School", city: "New Delhi", state: "Delhi", students: 2500, sports: 12, type: "Senior Secondary", rating: 4.8 },
  { id: "2", name: "St. Xavier's School", city: "Mumbai", state: "Maharashtra", students: 1800, sports: 10, type: "Senior Secondary", rating: 4.7 },
  { id: "3", name: "The Doon School", city: "Dehradun", state: "Uttarakhand", students: 500, sports: 15, type: "Boarding", rating: 4.9 },
  { id: "4", name: "Sainik School", city: "Bangalore", state: "Karnataka", students: 600, sports: 14, type: "Military", rating: 4.6 },
  { id: "5", name: "Kendriya Vidyalaya", city: "Chennai", state: "Tamil Nadu", students: 2000, sports: 8, type: "Government", rating: 4.4 },
  { id: "6", name: "Ryan International School", city: "Pune", state: "Maharashtra", students: 1500, sports: 9, type: "Private", rating: 4.3 },
];

export default function SchoolsPage() {
  const [search, setSearch] = useState("");

  const filtered = schools.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent">Schools & Institutions</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Top sports schools and institutions across India</p>
          </motion.div>

          <div className="relative max-w-xl mx-auto mb-12">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Search schools by name or city..." className="pl-10 h-12 rounded-xl" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((school, i) => (
              <motion.div key={school.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 text-white">
                        <GraduationCap className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg group-hover:text-[#FF6B35] transition-colors">{school.name}</h3>
                        <Badge variant="outline" className="mt-1">{school.type}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                      <MapPin className="w-4 h-4" /> {school.city}, {school.state}
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <Users className="w-4 h-4 mx-auto text-gray-400 mb-1" />
                        <p className="text-sm font-semibold">{school.students.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Students</p>
                      </div>
                      <div className="text-center">
                        <Trophy className="w-4 h-4 mx-auto text-gray-400 mb-1" />
                        <p className="text-sm font-semibold">{school.sports}</p>
                        <p className="text-xs text-gray-500">Sports</p>
                      </div>
                      <div className="text-center">
                        <span className="text-yellow-500">★</span>
                        <p className="text-sm font-semibold">{school.rating}</p>
                        <p className="text-xs text-gray-500">Rating</p>
                      </div>
                    </div>
                    <Button className="w-full mt-4 rounded-full" variant="outline">
                      View Details <ChevronRight className="w-4 h-4 ml-1" />
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
