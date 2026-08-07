"use client";

import { motion } from "framer-motion";

interface StatsClientProps {
  stats: {
    label: string;
    value: string;
  }[];
}

export function StatsClient({ stats }: StatsClientProps) {
  return (
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
  );
}
