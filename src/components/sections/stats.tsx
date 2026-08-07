"use client";

import { motion } from "framer-motion";
import { STATS } from "@/constants";

const stats = [
  { label: "Active Athletes", value: STATS.athletes || "50,000+" },
  { label: "Partner Schools", value: STATS.schools || "1,200+" },
  { label: "Tournaments Hosted", value: STATS.tournaments || "500+" },
  { label: "States Covered", value: STATS.states || "28+" },
];

export function StatsSection() {
  return (
    <section className="bg-card py-10 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap divide-y md:divide-y-0 md:divide-x divide-border">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-1 text-center py-6 md:py-0"
            >
              <p className="font-heading text-4xl font-bold text-accent">{stat.value}</p>
              <p className="mt-2 text-sm font-medium tracking-wide text-muted-foreground uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
