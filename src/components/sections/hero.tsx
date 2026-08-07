"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-sm font-semibold tracking-[0.2em] text-[#6b7b59] uppercase">
              Making a bridge for the sports ecosystem
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 font-heading text-8xl font-bold uppercase tracking-tight text-primary sm:text-9xl"
          >
            KHELO भारत
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-3xl font-bold leading-tight text-foreground sm:text-4xl"
          >
            One platform connecting athletes, academies &<br />sponsors across India.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground"
          >
            A mobile-and-web sports ecosystem that helps grassroots athletes get discovered, academies run digitally, and sponsors find verified local talent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex items-center gap-x-6"
          >
            <Button size="xl" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8">
              <Link href="/sign-up">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="rounded-none px-8 border-foreground/20 text-foreground bg-transparent hover:bg-foreground/5 hover:text-foreground">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 border-t border-border pt-10 sm:mt-28"
        >
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Athletes", value: "50K+" },
              { label: "Schools", value: "1,200+" },
              { label: "Tournaments", value: "500+" },
              { label: "States", value: "28+" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-4xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-2 font-mono text-sm tracking-wider text-muted-foreground uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
