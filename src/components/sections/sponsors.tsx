"use client";

import { motion } from "framer-motion";

const sponsors = [
  { name: "Sports India", tier: "Platinum" },
  { name: "Fit India", tier: "Gold" },
  { name: "PlayStrong", tier: "Gold" },
  { name: "AthleteFirst", tier: "Silver" },
  { name: "GameChanger", tier: "Silver" },
  { name: "ProSports", tier: "Silver" },
];

export function SponsorsSection() {
  return (
    <section className="bg-background py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Trusted by Leading Brands
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Partnering with top organizations to support India&apos;s athletes.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex flex-col items-center justify-center p-6 group cursor-pointer"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-colors group-hover:border-primary group-hover:bg-primary/5">
                <span className="text-2xl font-sans font-bold text-muted-foreground group-hover:text-primary">
                  {sponsor.name.charAt(0)}
                </span>
              </div>
              <p className="mt-6 text-sm font-semibold text-foreground text-center">
                {sponsor.name}
              </p>
              <p className="mt-1 text-xs text-muted-foreground text-center">
                {sponsor.tier} Sponsor
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
