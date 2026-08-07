"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-left pt-4 pb-12 sm:pt-12 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-sans text-xs font-semibold tracking-widest text-accent uppercase">
              Making a bridge for the sports ecosystem
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 font-sans text-5xl font-bold uppercase tracking-tight text-primary sm:text-7xl lg:text-9xl"
          >
            KHELO भारत
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-xl font-semibold leading-tight text-foreground sm:text-2xl lg:text-4xl max-w-3xl"
          >
            One platform connecting athletes, academies &<br className="hidden sm:block" />sponsors across India.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            A mobile-and-web sports ecosystem that helps grassroots athletes get discovered, academies run digitally, and sponsors find verified local talent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-x-4"
          >
            <Button size="lg" asChild>
              <Link href="/sign-up">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
