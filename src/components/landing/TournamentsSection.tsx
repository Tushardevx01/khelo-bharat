"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TOURNAMENTS = [
  {
    title: "National School Cricket Championship",
    date: "Mar 15 - Mar 22, 2026",
    location: "New Delhi",
    participants: "256 Teams",
    sport: "Cricket",
    status: "Registration Open",
  },
  {
    title: "Inter-State Football League",
    date: "Apr 1 - Apr 30, 2026",
    location: "Mumbai",
    participants: "32 Teams",
    sport: "Football",
    status: "Coming Soon",
  },
  {
    title: "Khelo Bharat Athletics Grand Prix",
    date: "May 10 - May 15, 2026",
    location: "Bengaluru",
    participants: "500+ Athletes",
    sport: "Athletics",
    status: "Registration Open",
  },
];

const STATUS_COLORS: Record<string, string> = {
  "Registration Open": "bg-green-500/10 text-green-500",
  "Coming Soon": "bg-yellow-500/10 text-yellow-500",
};

export default function TournamentsSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D72638]/10 text-[#D72638] text-sm font-medium mb-4">
            Upcoming
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent">
              Tournaments
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't miss out on the biggest sporting events across India.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOURNAMENTS.map((tournament, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="h-2 bg-gradient-to-r from-[#FF6B35] to-[#D72638]" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    {tournament.sport}
                  </span>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[tournament.status]}`}
                  >
                    {tournament.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#FF6B35] transition-colors">
                  {tournament.title}
                </h3>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 text-[#FF6B35]" />
                    {tournament.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-[#D72638]" />
                    {tournament.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4 text-[#FF6B35]" />
                    {tournament.participants}
                  </div>
                </div>

                <Link href="/tournaments">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-gray-200 dark:border-gray-700 group-hover:border-[#FF6B35] group-hover:text-[#FF6B35] transition-all"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/tournaments">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-gray-300 dark:border-gray-700"
            >
              View All Tournaments
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
