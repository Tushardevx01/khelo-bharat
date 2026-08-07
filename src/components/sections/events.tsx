"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const events = [
  {
    id: "1",
    title: "Kolkata Football Championship",
    date: "2026-03-15",
    location: "Kolkata, WB",
    participants: 256,
    category: "Football",
    status: "REGISTRATION_OPEN",
  },
  {
    id: "2",
    title: "New Delhi Football League",
    date: "2026-04-01",
    location: "Delhi, NCR",
    participants: 128,
    category: "Football",
    status: "REGISTRATION_OPEN",
  },
  {
    id: "3",
    title: "All India Football Open",
    date: "2026-04-20",
    location: "Hyderabad, TS",
    participants: 64,
    category: "Football",
    status: "UPCOMING",
  },
];

export function EventsSection() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between"
        >
          <div>
            <h2 className="font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Upcoming Events
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Don&apos;t miss out on exciting tournaments.
            </p>
          </div>
          <Button variant="outline" className="hidden sm:flex text-primary border-primary hover:bg-primary/5">
            View All Events
          </Button>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card border-border overflow-hidden group shadow-sm transition-shadow hover:shadow-md">
                <div className="h-48 bg-muted p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                      {event.category}
                    </Badge>
                    <Badge variant={event.status === "REGISTRATION_OPEN" ? "default" : "secondary"} className="border-0">
                      {event.status.replace(/_/g, " ")}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 -mt-8 bg-card relative z-10 rounded-t-2xl border-t border-border">
                  <h3 className="text-xl font-bold text-foreground">
                    {event.title}
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-3 h-4 w-4 text-primary" />
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-3 h-4 w-4 text-primary" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-3 h-4 w-4 text-primary" />
                      {event.participants} participants
                    </div>
                  </div>
                  <Button className="mt-6 w-full font-medium">
                    Register Now
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
