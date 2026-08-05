"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, Trophy, Award } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Sign up and create your athlete, coach, school, or sponsor profile.",
    step: "01",
  },
  {
    icon: Search,
    title: "Discover Opportunities",
    description: "Browse tournaments, connect with coaches, and find sponsorships.",
    step: "02",
  },
  {
    icon: Trophy,
    title: "Compete & Grow",
    description: "Participate in tournaments and track your performance.",
    step: "03",
  },
  {
    icon: Award,
    title: "Achieve & Earn",
    description: "Win certificates, build your reputation, and attract sponsors.",
    step: "04",
  },
];

export function HowItWorksSection() {
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
            How it works
          </h2>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
            Get started in four simple steps.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-4 -top-4 text-8xl font-bold text-neutral-100 dark:text-neutral-800">
                {step.step}
              </div>
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 dark:bg-white">
                  <step.icon className="h-6 w-6 text-white dark:text-neutral-900" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
