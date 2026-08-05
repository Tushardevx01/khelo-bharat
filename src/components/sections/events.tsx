"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const events = [
  {
    id: "1",
    title: "National Cricket Championship",
    date: "2026-03-15",
    location: "Mumbai, Maharashtra",
    participants: 256,
    category: "CRICKET",
    status: "UPCOMING",
  },
  {
    id: "2",
    title: "Inter-State Football League",
    date: "2026-04-01",
    location: "Delhi, NCR",
    participants: 128,
    category: "FOOTBALL",
    status: "REGISTRATION_OPEN",
  },
  {
    id: "3",
    title: "All India Badminton Open",
    date: "2026-04-20",
    location: "Hyderabad, Telangana",
    participants: 64,
    category: "BADMINTON",
    status: "UPCOMING",
  },
];

export function EventsSection() {
  return (
    <section className="bg-neutral-50 py-24 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Upcoming Events
            </h2>
            <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
              Don&apos;t miss out on exciting tournaments.
            </p>
          </div>
          <Button variant="outline" className="hidden sm:flex">
            View All Events
          </Button>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="transition-all hover:shadow-lg">
                <div className="h-40 rounded-t-xl bg-gradient-to-br from-neutral-800 to-neutral-950 p-4">
                  <Badge variant={event.status === "REGISTRATION_OPEN" ? "success" : "info"}>
                    {event.status.replace(/_/g, " ")}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2">
                    {event.category}
                  </Badge>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {event.title}
                  </h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                      <MapPin className="mr-2 h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                      <Users className="mr-2 h-4 w-4" />
                      {event.participants} participants
                    </div>
                  </div>
                  <Button className="mt-4 w-full" variant="outline">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
