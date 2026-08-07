"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface EventsClientProps {
  events: any[];
}

export function EventsClient({ events }: EventsClientProps) {
  if (events.length === 0) return null;

  return (
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
                  {event.sportCategory}
                </Badge>
                <Badge variant={event.status === "ONGOING" ? "default" : "secondary"} className="border-0">
                  {event.status.replace(/_/g, " ")}
                </Badge>
              </div>
            </div>
            <CardContent className="p-6 -mt-8 bg-card relative z-10 rounded-t-2xl border-t border-border">
              <h3 className="text-xl font-bold text-foreground line-clamp-1">
                {event.title}
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-3 h-4 w-4 text-primary" />
                  {new Date(event.startDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-3 h-4 w-4 text-primary" />
                  {event.location}
                </div>
              </div>
              <Link href={`/tournaments/${event.id}`} className="block mt-6">
                <Button className="w-full font-medium">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
