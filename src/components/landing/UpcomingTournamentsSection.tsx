"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin, Trophy, Users, ArrowRight } from "lucide-react";

const tournaments = [
  {
    sport: "🏏",
    name: "National Cricket Championship 2024",
    date: "15-20 Dec 2024",
    location: "New Delhi",
    prize: "₹5,00,000",
    participants: "64 Teams",
    category: "Open",
  },
  {
    sport: "⚽",
    name: "All India Football Cup",
    date: "8-12 Jan 2025",
    location: "Mumbai",
    prize: "₹3,00,000",
    participants: "32 Teams",
    category: "U-17",
  },
  {
    sport: "🏀",
    name: "Inter-State Basketball League",
    date: "22-28 Jan 2025",
    location: "Bangalore",
    prize: "₹2,50,000",
    participants: "24 Teams",
    category: "Open",
  },
];

export default function UpcomingTournamentsSection() {
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Upcoming{" "}
              <span className="text-gradient">Tournaments</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Don&apos;t miss out on the latest competitions
            </p>
          </div>
          <Link href="/tournaments">
            <Button
              variant="outline"
              className="rounded-full group"
            >
              View All
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament, i) => (
            <motion.div
              key={tournament.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-4xl">{tournament.sport}</div>
                    <span className="px-3 py-1 bg-[#FF6B35]/10 text-[#FF6B35] rounded-full text-xs font-medium">
                      {tournament.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl mt-4">
                    {tournament.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 text-[#FF6B35]" />
                      {tournament.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 text-[#FF6B35]" />
                      {tournament.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Users className="w-4 h-4 text-[#FF6B35]" />
                      {tournament.participants}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#D72638]">
                      <Trophy className="w-4 h-4" />
                      Prize Pool: {tournament.prize}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] hover:from-[#D72638] hover:to-[#FF6B35] text-white">
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
