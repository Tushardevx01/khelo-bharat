"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, Trophy, Award } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Sign up and create your athlete, coach, school, or sponsor profile.",
    step: "1",
  },
  {
    icon: Search,
    title: "Discover Opportunities",
    description: "Browse tournaments, connect with coaches, and find sponsorships.",
    step: "2",
  },
  {
    icon: Trophy,
    title: "Compete & Grow",
    description: "Participate in tournaments and track your performance.",
    step: "3",
  },
  {
    icon: Award,
    title: "Get Discovered",
    description: "Win certificates, build your reputation, and attract sponsors.",
    step: "4",
  },
];

export function HowItWorksSection() {
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
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started in four simple steps.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-card border border-border shadow-sm">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-4xl font-sans font-bold text-primary/10 sm:text-6xl">
                  {step.step}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
