"use client";

import { motion } from "framer-motion";
import { STATS } from "@/constants";

const stats = [
  { label: "Active Athletes", value: STATS.athletes },
  { label: "Partner Schools", value: STATS.schools },
  { label: "Tournaments Hosted", value: STATS.tournaments },
  { label: "States Covered", value: STATS.states },
];

export function StatsSection() {
  return (
    <section className="bg-white py-16 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
