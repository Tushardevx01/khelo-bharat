"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/20 via-neutral-950 to-neutral-950" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-1.5 text-sm text-neutral-300 backdrop-blur-sm">
              🏆 India&apos;s Premier Sports Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            One Platform.{" "}
            <span className="bg-gradient-to-r from-white via-neutral-300 to-neutral-500 bg-clip-text text-transparent">
              Every Athlete.
            </span>{" "}
            Every Opportunity.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-neutral-400"
          >
            Connect with coaches, discover tournaments, secure sponsorships, and track your
            performance — all in one place. Built for India&apos;s sporting future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Button size="xl" asChild className="bg-white text-neutral-900 hover:bg-neutral-100">
              <Link href="/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="border-neutral-700 text-white hover:bg-neutral-800">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-2 backdrop-blur-sm sm:mt-24"
        >
          <div className="rounded-xl bg-neutral-950 p-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { label: "Athletes", value: "50K+" },
                { label: "Schools", value: "1,200+" },
                { label: "Tournaments", value: "500+" },
                { label: "States", value: "28+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-neutral-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
