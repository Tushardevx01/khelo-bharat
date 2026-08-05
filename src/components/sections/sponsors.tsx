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
    <section className="bg-white py-24 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Trusted by Leading Brands
          </h2>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
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
              className="flex flex-col items-center justify-center rounded-xl border border-neutral-200 p-6 transition-all hover:shadow-md dark:border-neutral-800"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                <span className="text-xl font-bold text-neutral-600 dark:text-neutral-400">
                  {sponsor.name.charAt(0)}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-neutral-900 dark:text-white">
                {sponsor.name}
              </p>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {sponsor.tier} Sponsor
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
