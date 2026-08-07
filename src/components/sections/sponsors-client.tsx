"use client";

import { motion } from "framer-motion";

interface SponsorsClientProps {
  sponsors: any[];
}

export function SponsorsClient({ sponsors }: SponsorsClientProps) {
  if (sponsors.length === 0) return null;

  return (
    <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
      {sponsors.map((sponsor, index) => (
        <motion.div
          key={sponsor.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="flex flex-col items-center justify-center p-6 group cursor-pointer"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-colors group-hover:border-primary group-hover:bg-primary/5 overflow-hidden">
            {sponsor.logo ? (
              <img src={sponsor.logo} alt={sponsor.companyName} className="h-full w-full object-cover" />
            ) : (
              <span className="text-2xl font-sans font-bold text-muted-foreground group-hover:text-primary">
                {sponsor.companyName.charAt(0)}
              </span>
            )}
          </div>
          <p className="mt-6 text-sm font-semibold text-foreground text-center line-clamp-1">
            {sponsor.companyName}
          </p>
          <p className="mt-1 text-xs text-muted-foreground text-center line-clamp-1">
            {sponsor.industry || "Sponsor"}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
