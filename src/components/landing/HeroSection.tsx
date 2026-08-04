"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Timer, Target, Star } from "lucide-react";

const floatingIcons = [
  { icon: Trophy, delay: 0, x: "10%", y: "20%", size: 40 },
  { icon: Medal, delay: 0.5, x: "85%", y: "15%", size: 36 },
  { icon: Timer, delay: 1, x: "75%", y: "70%", size: 32 },
  { icon: Target, delay: 1.5, x: "15%", y: "75%", size: 38 },
  { icon: Star, delay: 2, x: "50%", y: "10%", size: 34 },
];

const stats = [
  { label: "Athletes", value: "10K+" },
  { label: "Schools", value: "500+" },
  { label: "Tournaments", value: "1000+" },
  { label: "Sponsors", value: "100+" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-90" />

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>

      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-white/20 dark:text-white/10"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          <item.icon size={item.size} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white/90 text-sm font-medium">
              India&apos;s #1 Sports Platform
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            India&apos;s Premier
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
              Sports Ecosystem
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Connecting athletes, schools, coaches, tournament organizers, and
            sponsors on one unified platform. Empowering sports talent across
            every state in India.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 py-6 text-lg rounded-full bg-white text-[#FF6B35] hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all"
              >
                Get Started Free
              </Button>
            </Link>
            <Link href="/tournaments">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8 py-6 text-lg rounded-full border-white/30 text-white hover:bg-white/10"
              >
                Explore Tournaments
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="bg-white/10 backdrop-blur-xl border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
