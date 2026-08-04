"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Trophy,
  Users,
  Target,
  Zap,
  Star,
  ArrowRight,
  Play,
  Globe,
  Award,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FLOATING_ICONS = [
  { Icon: Trophy, delay: 0, x: "10%", y: "20%", size: 48 },
  { Icon: Users, delay: 0.5, x: "85%", y: "15%", size: 40 },
  { Icon: Target, delay: 1, x: "75%", y: "70%", size: 36 },
  { Icon: Star, delay: 1.5, x: "15%", y: "75%", size: 32 },
  { Icon: Zap, delay: 2, x: "50%", y: "10%", size: 28 },
  { Icon: Flame, delay: 0.8, x: "90%", y: "50%", size: 34 },
  { Icon: Award, delay: 1.2, x: "5%", y: "45%", size: 30 },
  { Icon: Globe, delay: 1.8, x: "60%", y: "85%", size: 26 },
];

const STATS = [
  { value: "50K+", label: "Athletes" },
  { value: "200+", label: "Schools" },
  { value: "1K+", label: "Tournaments" },
  { value: "₹10Cr+", label: "Prize Pool" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D72638]/10 rounded-full blur-3xl" />
      </div>

      {FLOATING_ICONS.map(({ Icon, delay, x, y, size }, i) => (
        <motion.div
          key={i}
          className="absolute text-white/10"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon size={size} />
          </motion.div>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-white/80 mb-8"
        >
          <Flame className="w-4 h-4 text-[#FF6B35]" />
          India's Premier Sports Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          Unleash Your
          <br />
          <span className="bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent">
            Sporting Spirit
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10"
        >
          Connecting athletes, schools, coaches, and sponsors on one platform.
          Compete in tournaments, track progress, and celebrate victories.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/register">
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D72638] hover:from-[#D72638] hover:to-[#FF6B35] text-white shadow-lg hover:shadow-[#FF6B35]/25 px-8 h-12"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/tournaments">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-white/20 text-white hover:bg-white/10 px-8 h-12"
            >
              <Play className="w-4 h-4 mr-2" />
              Explore Tournaments
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#D72638] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-white/50 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
