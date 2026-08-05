"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-neutral-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-br from-neutral-800 to-neutral-900 p-8 text-center sm:p-12 lg:p-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to start your journey?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
            Join thousands of athletes, coaches, and schools already using Khelo Bharat to achieve their sporting dreams.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button size="xl" asChild className="bg-white text-neutral-900 hover:bg-neutral-100">
              <Link href="/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
